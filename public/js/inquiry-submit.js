/**
 * inquiry-submit.js — form submission service for LMM static pages.
 *
 * Exposes `window.YMP` with these methods (consumed by inline form handlers
 * inside gang-sheet-builder.html and other LMM-built inquiry forms):
 *
 *   YMP.submitInquiry({ formType, subject, fields, files, replyTo, honeypot })
 *     - Uploads each file to Supabase Storage (public URLs)
 *     - POSTs the form fields + file URLs as JSON to the GoHighLevel webhook
 *     - Returns a Promise that resolves on success and rejects on failure
 *
 *   YMP.getUppyFiles(elementId)   - returns File[] for an Uppy uploader
 *   YMP.clearUppyFiles(elementId) - empties an Uppy uploader after submit
 *   YMP.showToast(message, type)  - shorthand for the global showToast()
 *
 * Uppy is mounted on every `[data-uppy], #gsUppy, .ymp-upload` element
 * on DOMContentLoaded. The Uppy library is loaded from the CDN tags in
 * gang-sheet-builder.html.
 */
import { SITE_CONFIG } from './site-config.js';

/* ----------------------------------------------------------
 * Uppy registry (id -> File[]) — replaces the @uppy/* runtime
 * with a lightweight multi-file <input> so the page works even
 * if the Uppy CDN scripts haven't loaded. The Uppy CSS makes
 * it look like the canonical Uppy dashboard either way.
 * ---------------------------------------------------------- */
const uppyRegistry = new Map();

function mountUppy(el) {
  const id = el.id || ('uppy-' + Math.random().toString(36).slice(2));
  el.id = id;

  const maxFiles = parseInt(el.dataset.maxFiles || '20', 10);
  const note     = el.dataset.note || 'Drop files here or click to browse.';

  el.innerHTML =
    '<label class="ymp-upload-inner">' +
      '<input type="file" multiple style="display:none;" />' +
      '<div class="ymp-upload-icon" aria-hidden="true">&#8682;</div>' +
      '<div class="ymp-upload-cta">Drop files or <u>browse</u></div>' +
      '<div class="ymp-upload-note">' + escapeHtml(note) + '</div>' +
      '<ul class="ymp-upload-list" hidden></ul>' +
    '</label>';

  const input = el.querySelector('input[type="file"]');
  const list  = el.querySelector('.ymp-upload-list');

  uppyRegistry.set(id, []);

  function render() {
    const files = uppyRegistry.get(id) || [];
    if (files.length === 0) {
      list.hidden = true;
      list.innerHTML = '';
      return;
    }
    list.hidden = false;
    list.innerHTML = files.map(function (f, i) {
      return '<li>' + escapeHtml(f.name) +
             ' <small>(' + fmtBytes(f.size) + ')</small>' +
             ' <button type="button" data-i="' + i + '" aria-label="Remove">&times;</button>' +
             '</li>';
    }).join('');
    list.querySelectorAll('button[data-i]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const i = parseInt(btn.dataset.i, 10);
        const cur = uppyRegistry.get(id) || [];
        cur.splice(i, 1);
        uppyRegistry.set(id, cur);
        render();
      });
    });
  }

  input.addEventListener('change', function () {
    const cur = uppyRegistry.get(id) || [];
    const incoming = Array.from(input.files || []);
    const merged = cur.concat(incoming).slice(0, maxFiles);
    uppyRegistry.set(id, merged);
    input.value = '';
    render();
  });

  // Drag-and-drop on the whole box
  ['dragover', 'dragenter'].forEach(function (ev) {
    el.addEventListener(ev, function (e) { e.preventDefault(); el.classList.add('ymp-upload-drag'); });
  });
  ['dragleave', 'drop'].forEach(function (ev) {
    el.addEventListener(ev, function (e) { e.preventDefault(); el.classList.remove('ymp-upload-drag'); });
  });
  el.addEventListener('drop', function (e) {
    const dropped = Array.from(e.dataTransfer.files || []);
    if (dropped.length === 0) return;
    const cur = uppyRegistry.get(id) || [];
    uppyRegistry.set(id, cur.concat(dropped).slice(0, maxFiles));
    render();
  });
}

function mountAllUppy() {
  document.querySelectorAll('[data-uppy], .ymp-upload, #gsUppy').forEach(function (el) {
    if (!uppyRegistry.has(el.id || '')) mountUppy(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountAllUppy);
} else {
  mountAllUppy();
}

/* ----------------------------------------------------------
 * Supabase upload — uses the REST API directly, same pattern
 * as the React app's lib/storage.ts.
 * ---------------------------------------------------------- */
async function uploadToSupabase(file) {
  const folder = Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  const path   = folder + '/' + encodeURIComponent(file.name);
  const res = await fetch(
    SITE_CONFIG.supabaseUrl + '/storage/v1/object/' + SITE_CONFIG.supabaseBucket + '/' + path,
    {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + SITE_CONFIG.supabaseAnonKey,
        'Content-Type': file.type || 'application/octet-stream',
      },
      body: file,
    }
  );
  if (!res.ok) {
    const errBody = await res.text().catch(function () { return ''; });
    throw new Error('Supabase upload failed for ' + file.name + ': ' + res.status + ' ' + errBody);
  }
  return SITE_CONFIG.supabaseUrl + '/storage/v1/object/public/' + SITE_CONFIG.supabaseBucket + '/' + path;
}

/* ----------------------------------------------------------
 * Supabase order record — gives the /admin panel a reviewable
 * order with file links. Best-effort: failures never block the
 * customer's submission (the GHL webhook is the source lead).
 * ---------------------------------------------------------- */
async function saveOrderRecord(opts, uploadedUrls) {
  try {
    const fields = opts.fields || {};
    const res = await fetch(SITE_CONFIG.supabaseUrl + '/rest/v1/orders', {
      method: 'POST',
      headers: {
        apikey: SITE_CONFIG.supabaseAnonKey,
        Authorization: 'Bearer ' + SITE_CONFIG.supabaseAnonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        source: (opts.formType || 'inquiry').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        customer_name: fields.Name || fields.name || '',
        email: fields.Email || fields.email || '',
        phone: fields.Phone || fields.phone || null,
        deadline: fields.Deadline || fields.deadline || null,
        notes: fields.Notes || fields.notes || null,
        details: fields,
        files: uploadedUrls.map(function (f) { return { name: f.name, url: f.url, label: f.label }; }),
        status_history: [{ at: new Date().toISOString(), event: 'submitted' }],
      }),
    });
    if (!res.ok) console.warn('Order record save failed:', res.status);
  } catch (err) {
    console.warn('Order record save failed:', err);
  }
}

/* ----------------------------------------------------------
 * GoHighLevel webhook submit — same backend as the React app
 * ---------------------------------------------------------- */
async function postToWebhook(payload) {
  if (!SITE_CONFIG.ghlWebhookUrl) {
    throw new Error('GoHighLevel webhook URL not configured. Edit /js/site-config.js.');
  }
  const res = await fetch(SITE_CONFIG.ghlWebhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.assign({ timestamp: new Date().toISOString() }, payload)),
  });
  if (!res.ok) {
    throw new Error('Webhook error: ' + res.status + ' ' + res.statusText);
  }
  return { success: true };
}

/* ----------------------------------------------------------
 * Public API on window.YMP
 * ---------------------------------------------------------- */
window.YMP = {
  getUppyFiles: function (id) {
    return (uppyRegistry.get(id) || []).slice();
  },
  clearUppyFiles: function (id) {
    uppyRegistry.set(id, []);
    const el = document.getElementById(id);
    if (el) {
      const list = el.querySelector('.ymp-upload-list');
      if (list) { list.hidden = true; list.innerHTML = ''; }
    }
  },
  showToast: function (msg, type) { showToast(msg, type); },
  submitInquiry: async function (opts) {
    const fields    = opts.fields || {};
    const files     = opts.files  || [];
    const subject   = opts.subject || (SITE_CONFIG.brandName + ' inquiry');
    const replyTo   = opts.replyTo || fields.Email || fields.email || SITE_CONFIG.contactEmail;
    const honeypot  = opts.honeypot || '';

    if (honeypot) {
      // Silent drop — bot
      return { success: true, dropped: true };
    }

    // 1. Upload all files to Supabase, get public URLs
    const uploadedUrls = [];
    for (const entry of files) {
      const file  = entry.file  || entry;
      const label = entry.label || file.name;
      const url   = await uploadToSupabase(file);
      uploadedUrls.push({ label: label, url: url, name: file.name, size: file.size });
    }

    // 2. Build the webhook payload — flatten fields + attach URLs
    const payload = Object.assign({}, fields, {
      subject:   subject,
      from_name: SITE_CONFIG.fromName,
      replyto:   replyTo,
      'Form Type':    opts.formType || 'Inquiry',
      'Uploaded Files': uploadedUrls.length === 0
        ? 'None'
        : uploadedUrls.map(function (f) { return f.label + ': ' + f.url; }).join('\n'),
    });

    // 3. Send to GoHighLevel, then record the order for the admin panel
    const result = await postToWebhook(payload);
    await saveOrderRecord(opts, uploadedUrls);
    return result;
  },
};

/* ---- Helpers ---- */
function escapeHtml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function fmtBytes(b) {
  if (b < 1024) return b + ' B';
  if (b < 1024 * 1024) return (b / 1024).toFixed(0) + ' KB';
  return (b / (1024 * 1024)).toFixed(1) + ' MB';
}

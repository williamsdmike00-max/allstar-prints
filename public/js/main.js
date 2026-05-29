/**
 * main.js — generic site JS for LMM static pages.
 *
 * Provides:
 *   - Nav hamburger toggle (binds #navHamburger <-> #navMobile)
 *   - Footer year stamp (binds #footerYear)
 *   - Global showToast(message, type) used by inline form handlers
 */
(function () {
  'use strict';

  /* ---- Nav hamburger ---- */
  document.addEventListener('DOMContentLoaded', function () {
    const burger = document.getElementById('navHamburger');
    const mobile = document.getElementById('navMobile');
    if (burger && mobile) {
      burger.addEventListener('click', function () {
        const open = mobile.classList.toggle('open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.classList.toggle('open', open);
      });
      mobile.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          mobile.classList.remove('open');
          burger.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    const yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* ---- Scrolled navbar shadow ---- */
    const nav = document.getElementById('navbar');
    if (nav) {
      const onScroll = function () {
        if (window.scrollY > 20) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  });

  /* ---- Toast notifications ---- */
  let toastWrap = null;
  function ensureToastWrap() {
    if (toastWrap) return toastWrap;
    toastWrap = document.createElement('div');
    toastWrap.id = 'lmm-toast-wrap';
    toastWrap.setAttribute('aria-live', 'polite');
    toastWrap.setAttribute('role', 'status');
    document.body.appendChild(toastWrap);
    return toastWrap;
  }

  window.showToast = function (msg, type) {
    const wrap = ensureToastWrap();
    const t = document.createElement('div');
    t.className = 'lmm-toast lmm-toast-' + (type || 'info');
    t.textContent = msg;
    wrap.appendChild(t);
    // Force layout, then animate in
    void t.offsetWidth;
    t.classList.add('in');
    setTimeout(function () {
      t.classList.remove('in');
      t.classList.add('out');
      setTimeout(function () { t.remove(); }, 300);
    }, type === 'error' ? 6000 : 3500);
  };
})();

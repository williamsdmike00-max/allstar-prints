/**
 * Per-site configuration for AllStar Prints.
 * Supabase Storage receives uploaded artwork. The lead (with file links)
 * is posted to the GoHighLevel webhook — the same backend the React app's
 * forms use — which creates/updates the contact and triggers automations.
 *
 * Imported as a module by js/inquiry-submit.js.
 *
 * NOTE: Supabase URL + anon key are reused from the React app's .env.local
 * (artwork-uploads bucket).
 */
export const SITE_CONFIG = {
  // Supabase project — upload bucket for customer artwork
  supabaseUrl:        'https://dgsdftbkpxpfhttgwhze.supabase.co',
  supabaseAnonKey:    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnc2RmdGJrcHhwZmh0dGd3aHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5NjMxODksImV4cCI6MjA5MjUzOTE4OX0.Xa4_CzSG1LUd4LJKhS4EoHqJ7uYFH9djwevPP87CCvI',
  supabaseBucket:     'artwork-uploads',

  // GoHighLevel webhook — receives the form submission as a lead
  ghlWebhookUrl:      'https://services.leadconnectorhq.com/hooks/9Q2FZWe88ng4QFaejG5G/webhook-trigger/9ef217d6-375e-429e-8d95-26557503f12a',

  // Brand display info (used in the lead subject and from-name)
  brandName:          'AllStar Prints',
  fromName:           'AllStar Prints Order Form',
  contactEmail:       'allstarprints2019@gmail.com',
};

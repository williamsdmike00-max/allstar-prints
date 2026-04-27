# CLAUDE.md

## Project Overview
This project is an AI-powered web application with a React frontend and a Node/Express backend. The goal is to build a clean, production-ready app with reliable API integrations, clear code structure, and simple deployment.

## Primary Goals
- Build features in small, testable steps
- Keep the UI clean and mobile-friendly
- Prefer readable code over clever code
- Fix root causes instead of patching symptoms
- Keep secrets and environment variables out of source control

## Tech Stack
- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express
- Payments: Stripe
- Database: Supabase
- Optional integrations: Twilio, webhooks, third-party APIs

## Working Style
When making changes to this project:
1. Read the existing files before editing
2. Preserve the current architecture unless there is a strong reason to improve it
3. Make the smallest safe change that solves the problem
4. Explain what changed in plain English
5. Flag any risks, missing environment variables, or follow-up work

## Code Standards
- Use TypeScript where possible
- Prefer clear function and variable names
- Keep components focused and not overly large
- Avoid duplicate logic
- Add comments only where they help explain intent
- Validate user input on both frontend and backend
- Handle loading, success, and error states cleanly

## Frontend Guidelines
- Keep components reusable and easy to scan
- Use Tailwind classes consistently
- Prefer controlled form inputs
- Show clear validation and friendly error messages
- Keep routing straightforward
- Do not break existing styling unless improving it intentionally

## Backend Guidelines
- Keep routes, controllers, and service logic organized
- Validate request bodies
- Return clear status codes and JSON responses
- Log useful debugging information without exposing secrets
- Handle webhook verification carefully
- Do not hardcode API keys, tokens, or secrets

## Stripe / Payments
- Never trust payment success from the frontend alone
- Use webhooks to confirm completed payments
- Store payment metadata needed for fulfillment
- Make sure duplicate webhook events do not create duplicate records
- Keep Stripe keys in environment variables only

## Supabase Rules
- Use service role keys only on secure backend code
- Do not expose privileged keys in frontend files
- Respect row-level security rules
- Check schema names and column names carefully before inserts or updates

## Debugging Process
When debugging:
1. Identify the exact error message
2. Trace where the data enters and fails
3. Check environment variables
4. Check API requests and responses
5. Confirm database schema and assumptions
6. Fix the issue with the least invasive change
7. Verify the fix with a realistic test

## Output Expectations
When helping on this project, provide:
- What the issue is
- Why it is happening
- What file(s) need to change
- The exact code change
- How to test it
- Any follow-up cleanup or hardening steps

## File Safety
- Do not delete large sections of working code without a clear reason
- Do not rename files unless necessary
- If a refactor is needed, say so before making broad structural changes
- Preserve business logic unless the requested change requires updating it

## Environment Variables
Typical environment variables may include:
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- FRONTEND_URL
- PORT
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_PHONE_NUMBER

## Preferred Assistant Behavior
- Be direct and practical
- Do not over-explain
- Suggest the next best step after each fix
- Keep changes production-minded
- When unsure, state the assumption clearly

## Common Commands
### Frontend
```bash
npm install
npm run dev
npm run build
```

### Backend
```bash
npm install
npm run dev
node server.js
```

### Stripe Webhook Testing
```bash
stripe listen --forward-to http://localhost:4242/webhook
```

## Definition of Done
A task is complete when:
- The code runs
- The requested feature or fix works
- The main error path is handled
- No secrets are exposed
- The user can test it easily
- The next step is clear

## Brand & Business Context (Allstar Prints LLC)
The site is for a real custom-apparel print shop. Use these facts as the ground truth for any homepage copy, customizer logic, marketing pages, or schema markup. Do not invent alternates.

- **Location / service area:** Dallas–Fort Worth, TX (the design prototype originally said "Glenn Heights" — that is wrong; do not reintroduce it).
- **Phone:** (817) 507-4553
- **Status:** Veteran owned.
- **Services they actually offer (price-sheet aligned):** custom t-shirts, hoodies, hats, DTF transfers. Do **not** surface "Screen / DTG / Embroidery" as customer-facing print-method choices — those are internal production methods, not menu items.
- **T-shirt pricing tiers (front print included, premium ringspun):**
  | Qty | Price each |
  | --- | --- |
  | 1 | $25 |
  | 2–5 | $22 |
  | 6–11 | $18 |
  | 12–24 | $16 |
  | 25–50 | $14 |
  | 51–100 | $12 |
  | 101+ | Custom Quote |
- **Garment upgrades (per shirt):** Tri-Blend +$3, Heavy Cotton +$5.
- **Add-on prints (per shirt):** Back +$5, Sleeve +$3, Name/Number +$4, Full-front oversize >12" +$4.
- **Rush fees:** 48-hr +20%, Same-week (3–5 day) +10%, Same-day = call.
- **Misc:** $25 artwork setup fee if needed; 50% deposit on 12+ shirt orders; bulk pricing applies to identical designs.

## Asset Conventions
- **Mockups for the blanks gallery:** `public/mockups/<style>-<color>.jpg` (one product photo per card).
- **Mockups for the customizer color preview:** `public/mockups/customizer/64000-<color>.jpg` (one Gildan Softstyle 64000 model-front shot per swatch hex). The active color photo is keyed off the customizer's `shirtColors` array — keep the `photo` field in sync if you add/remove colors.
- **Hero shirt:** `public/allstar-hero-shirt.png` (transparent background, ~1024×1024). If you replace it, regenerate transparency by flood-filling solid backgrounds from the image edges so dark logo elements aren't lost.
- Do **not** check in `_design_extract/`, `*.pdf`, or large source images dropped at the repo root — they are excluded by `.gitignore` or untracked on purpose.

## Vendor Reference: SanMar
The shop sources blanks from SanMar; product photos are licensed to authorized account holders. When a blank needs to be added or a color swatch updated:

- Product page URL: `https://www.sanmar.com/p/{PID}_{ColorSlug}` (color slugs are case-sensitive — e.g. `Black`, `White`, `Natural`, `SportsGrey`, `Charcoal`, `Navy`, `Maroon`, `ForestGrn`).
- Highest-res photo URL is the `1200W_..._ModelFront*.jpg` variant on `cdnp.sanmar.com`. Once you have the URL, the CDN is publicly hotlinkable, but always **download to `public/mockups/`** rather than hotlink — SanMar can change paths.
- SanMar PIDs already used in this site:
  - `3480` → Gildan Softstyle 64000 (Premium Ringspun Tee)
  - `152` → Gildan Ultra Cotton 2000 (Heavy Cotton Tee)
  - `9267` → BELLA+CANVAS 3413 (Tri-Blend Tee)
  - `819` → Gildan G2400 (Long Sleeve)
  - `115` → Gildan 18500 (Pullover Hoodie)
  - `73184` → Port Authority C112 (Snapback Trucker Cap)
- The product page is JS-rendered — server HTML does not contain CDN URLs. To scrape new ones, use Chrome MCP (the user is logged in) and read `<img>` `src` from the live DOM after a 2–3 second settle.

## Homepage Notes
The homepage at `src/pages/Home.tsx` was redesigned from a Claude Design handoff. A few things to know before editing it:

- It uses **inline styles** rather than Tailwind for layout/visuals — that's intentional, ported from the design prototype for fidelity. Adding a Tailwind class is fine, but don't mass-convert without a reason.
- It sits inside the existing `Layout` (Navbar + Footer + FloatingQuoteButton). Don't add a second Nav or Footer here.
- It loads four extra Google Fonts via `index.html`: Archivo, Archivo Black, Bricolage Grotesque, JetBrains Mono. Keep them in the `<link>` if you keep the design language.
- The customizer's `tierPrice()` function is the canonical pricing logic for the homepage and must match the price sheet exactly. If pricing on the price sheet ever changes, update both the function and any copy that hard-codes the same numbers (hero stats, marquees, floating chips).

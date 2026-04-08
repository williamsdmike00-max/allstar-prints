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

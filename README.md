# InsureLeague

A production-ready insurance company website: public marketing site + a
secure admin portal for managing callback requests.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Supabase
(PostgreSQL + Auth) · Vercel

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in your Supabase + Resend values
npm run dev
```

Open http://localhost:3000.

New here? Start with **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** — it walks
through creating your Supabase and Vercel accounts from scratch.

## Project structure

```
app/                    # Routes (App Router)
  (public pages)/        Home, About, Services, Corporate, Individual, ...
  corporate/[slug]/       Dynamic corporate policy pages
  individual/[slug]/      Dynamic individual policy pages
  admin/                  Admin portal (login, dashboard, request detail)
  api/                    Route handlers (callback, newsletter, admin actions)
components/
  layout/                 Header, Footer, nav, mobile menu
  forms/                  CallbackForm, NewsletterForm
  admin/                  Admin-only UI (status select, notes, delete)
data/                    Static content: navigation.ts, products.ts
lib/
  supabase/               Browser / server / service-role Supabase clients
  validations/            Zod schemas
  email.ts, rate-limit.ts, audit-log.ts, utils.ts
supabase/migrations/     SQL schema
docs/                    Deployment, admin setup, test checklist
middleware.ts            Protects /admin routes, refreshes Supabase session
```

## Key features

- **Public site** matching the supplied blueprint: responsive header with
  desktop mega-menus and a mobile drawer, all product/service pages.
- **Callback form** with client + server Zod validation, dependent
  category→product dropdowns, honeypot spam trap, duplicate-submission
  guard (same phone within 5 minutes), and IP-based rate limiting.
- **Admin portal** at `/admin` (not linked anywhere in public nav): stats
  dashboard, search/filter/sort/pagination, status updates, internal notes,
  delete with confirmation, CSV export — all behind Supabase Auth.
- **Security**: HTTPS (via Vercel), CSP + secure headers (`next.config.ts`),
  Zod input validation everywhere, RLS deny-all on every table (all access
  goes through server-side service-role calls after an auth check), rate
  limiting on the callback form and admin login, audit logging for every
  admin action, environment variables for all secrets.

## Adding your logo

Replace `public/images/logo/insureleague-logo.jpg` with your real logo (same
filename), or update the `src` in `components/layout/Header.tsx` and
`components/layout/Footer.tsx` if you rename the file. Nothing else needs to
change — the logo is isolated to those two references.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint |
| `npm run type-check` | TypeScript check with no emit |

## Documentation

- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) — Supabase + Vercel setup, env vars, production checklist
- [docs/ADMIN_SETUP.md](docs/ADMIN_SETUP.md) — Creating and managing the admin account
- [docs/TEST_CHECKLIST.md](docs/TEST_CHECKLIST.md) — Full QA checklist before launch

## Extending

The architecture is built to grow without rework:

- **Multiple admins** — just create more Supabase Auth users; audit logging
  already tracks by email.
- **New insurance products** — add an entry to `data/products.ts`; the
  dynamic `[slug]` routes pick it up automatically.
- **CRM / WhatsApp / analytics** — hook into `app/api/callback/route.ts`
  right after the successful insert.
- **Appointment scheduling** — new table + admin page following the same
  pattern as `callback_requests`.

# Deployment Guide

This guide assumes you're starting from zero — no Supabase or Vercel account yet.

## 1. Create a Supabase project (~5 min)

1. Go to https://supabase.com → **Sign up** (free tier is enough to start).
2. Click **New project**. Choose an organization, name it `insureleague`,
   set a strong database password (save it somewhere safe), pick a region
   close to your users (e.g. Mumbai/Singapore for India).
3. Wait ~2 minutes for provisioning.
4. Go to **SQL Editor** → **New query**, paste the contents of
   `supabase/migrations/0001_initial_schema.sql`, and click **Run**.
5. Go to **Project Settings → API** and copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
6. Follow `docs/ADMIN_SETUP.md` to create your admin login.

## 2. Set up email notifications (~3 min, optional but recommended)

1. Go to https://resend.com → sign up (free tier: 3,000 emails/month).
2. Create an API key → this is `RESEND_API_KEY`.
3. For production, verify your own sending domain under **Domains** so email
   doesn't come from `onboarding@resend.dev`. Until then, that default works
   for testing.
4. Set `ADMIN_NOTIFICATION_EMAIL` to the inbox that should receive callback
   request alerts.

## 3. Run locally first

```bash
npm install
cp .env.example .env.local   # fill in the values from steps 1–2
npm run dev
```

Visit `http://localhost:3000`. Replace the placeholder logo at
`public/images/logo/insureleague-logo.jpg` with your real logo (same filename,
or update the path in `components/layout/Header.tsx` and `Footer.tsx`).

Test the callback form on `/consultation`, then confirm the row appears in
Supabase under **Table Editor → callback_requests**, and log in at
`/admin` with the account you created.

## 4. Deploy to Vercel (~5 min)

1. Push this project to a GitHub repository.
2. Go to https://vercel.com → sign up / log in → **Add New → Project**.
3. Import your GitHub repo.
4. In **Environment Variables**, add every variable from `.env.example` with
   your real values (all of them — Vercel does not read `.env.local`).
5. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g.
   `https://insureleague.vercel.app`, or your custom domain once attached).
6. Click **Deploy**.

Vercel will build and give you a live `https://your-project.vercel.app` URL.

## 5. Attach a custom domain (optional)

Vercel → your project → **Settings → Domains** → add your domain and follow
the DNS instructions (usually a CNAME or A record at your registrar).

## Production checklist

- [ ] Real logo uploaded, placeholder removed
- [ ] Supabase migration run, tables visible in Table Editor
- [ ] Admin user created and login tested on the live URL
- [ ] All environment variables set in Vercel (not just locally)
- [ ] Resend domain verified (or accept the `onboarding@resend.dev` sender for now)
- [ ] Test callback form submission end-to-end on the live site
- [ ] Confirm `/admin` is not linked anywhere in the public nav (it isn't, by design)
- [ ] Confirm `robots.txt` / metadata keeps `/admin` out of search indexing (already set via layout metadata)
- [ ] Run through `docs/TEST_CHECKLIST.md`

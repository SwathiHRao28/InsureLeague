# Admin Credentials Setup Guide

InsureLeague uses **Supabase Auth** for the single admin account — there is no
custom password table to manage, and passwords are hashed and stored securely
by Supabase itself.

## Create the admin user

1. Open your Supabase project dashboard.
2. Go to **Authentication → Users**.
3. Click **Add user → Create new user**.
4. Enter the admin's email and a strong password.
5. **Uncheck** "Auto Confirm User" only if you want to verify by email first —
   for a single internal admin, checking "Auto Confirm User" is simplest.
6. Click **Create user**.

That's it — this is the only account that can sign in at `/admin/login`.

## Change the admin password later

Authentication → Users → select the user → **Send password recovery** (email
flow), or use "Reset password" to set one directly from the dashboard.

## Adding a second admin (future-ready)

The schema and auth checks already support multiple admins with no changes —
just create another user in Authentication → Users. If you want per-admin
audit trails (already logged by email) or role-based permissions later, that
builds on top of `admin_audit_log`, which already records `admin_email` on
every action.

## Security notes

- Admin credentials are never stored in this codebase or in `.env` files.
- Passwords are hashed by Supabase (bcrypt) — the app never sees or stores them.
- Sessions are held in HTTP-only cookies managed by `@supabase/ssr`; there is
  no token in `localStorage` for XSS to grab.
- Login attempts are rate-limited (5 per 15 minutes per IP) and every login
  attempt, success or failure, is written to `admin_audit_log`.

# Test Checklist

## Public site
- [ ] All nav links work on desktop (Corporate/Individual mega-menus open on hover)
- [ ] Mobile drawer opens/closes, accordions expand for Corporate/Individual
- [ ] All 8 policy pages load correctly (5 corporate + 3 individual)
- [ ] Home, About, Services, Employee Benefits, Partners, Newsletter, Contact, Consultation render with no console errors
- [ ] Site is usable at 375px, 768px, 1024px, 1440px widths

## Callback form (Consultation & Contact pages)
- [ ] Submitting with empty fields shows validation errors, does not submit
- [ ] Invalid email format is rejected
- [ ] Invalid phone number (not 10 digits / wrong prefix) is rejected
- [ ] Selecting a category populates the correct dependent product dropdown
- [ ] Unchecking consent blocks submission
- [ ] Valid submission shows loading state, then success message
- [ ] Row appears in Supabase `callback_requests` table with status `New`
- [ ] Submitting the same phone number twice within 5 minutes is blocked with a friendly message
- [ ] Submitting 4+ times in a minute from the same IP triggers the rate limit
- [ ] Admin notification email arrives (check spam folder on first test)

## Newsletter
- [ ] Valid email subscribes successfully
- [ ] Duplicate email does not error (upsert)
- [ ] Invalid email is rejected

## Admin portal
- [ ] `/admin` redirects to `/admin/login` when logged out
- [ ] Wrong password shows a generic error (does not reveal if email exists)
- [ ] 6 failed logins in a row trigger the rate limit message
- [ ] Correct credentials log in and redirect to the dashboard
- [ ] Dashboard stat cards match actual counts in Supabase
- [ ] Search by name/phone/email filters correctly
- [ ] Status filter and sort dropdowns work
- [ ] Pagination works past 15 records
- [ ] Opening a request detail page shows all submitted fields
- [ ] Changing status persists and reflects on the dashboard
- [ ] Adding a note saves and reloads correctly
- [ ] Delete requires confirmation, then removes the row
- [ ] CSV export downloads and opens correctly in Excel/Sheets
- [ ] Logout clears the session — reloading `/admin` redirects to login
- [ ] `admin_audit_log` table has rows for login, logout, status_update, note_added, request_deleted, export_csv

## Security
- [ ] `/admin` does not appear in any public navigation link
- [ ] Viewing page source on `/admin/*` confirms `noindex, nofollow` meta
- [ ] Direct DB access with the anon key (e.g. via `curl` + anon key) returns no rows from `callback_requests` (RLS deny-all confirmed)
- [ ] `.env.local` is in `.gitignore` and never committed
- [ ] HTTPS is enforced in production (Vercel does this automatically)

## Pre-launch
- [ ] Real logo replaces the placeholder
- [ ] All copy reviewed for placeholder text ("XXXXXXX" IRDAI number, phone numbers, etc.)
- [ ] Favicon added
- [ ] 404 page checked (default Next.js 404 renders correctly)

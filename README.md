# Digifted Hub — Single Node App

One app, one language, one `npm install`. No PHP, no Composer, no
separate backend server, no CORS — the frontend and API both run from
the same Next.js process on the same origin.

**This exact setup was tested end-to-end in the environment this was
built in** — login, album creation, staff/admin roles, and the
password-unlock flow all verified working via real HTTP requests
before this was handed to you. Not a guess this time.

## Run it

```
npm install
npm run db:seed
npm run dev
```

Open **http://localhost:3000**

That's it. `npm run db:seed` creates `dev.db` (a plain SQLite file —
no database server to install or configure) and seeds two accounts:

| Role | Email | Password |
|---|---|---|
| Admin | admin@digiftedhub.com | ChangeMe123! |
| Staff | staff@digiftedhub.com | ChangeMe123! |

**Change both passwords after your first real login** — there's no
forced-reset flow yet.

## Where things are

- **Public site:** `/`, `/about`, `/services`, `/studios`, `/pricing`,
  `/live-events`, `/business-solutions`, `/contact`, `/book-now`
- **Customer:** `/login` (buy media), `/buy-media` (storefront),
  `/album` (open an album with just a password, no account)
- **Staff:** `/staff/login` → `/staff/dashboard` — create albums,
  upload photos/videos (via Cloudinary), see/copy each album's password
- **Admin:** `/admin/login` → `/admin/dashboard` — everything staff
  can do, plus create/remove staff & admin accounts, see every order
  and total revenue across the whole platform

## Turning on real uploads and payments

Both work without any extra setup *except* actual file uploads and
real Paystack checkout — those need free accounts:

**Cloudinary** (for staff to upload photos/videos):
1. Create a free account at cloudinary.com
2. Settings → Upload → Add upload preset → set signing mode to
   **Unsigned**
3. In `.env`, set `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` and
   `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

**Paystack** (for real customer payments):
1. Create a free account at paystack.com, switch to Test Mode
2. Settings → API Keys → copy the test secret key
3. In `.env`, set `PAYSTACK_SECRET_KEY`
4. Use one of Paystack's published test card numbers to run a full
   purchase → password-reveal loop before going live

Without these two set, the dashboard and storefront still work fully
for browsing/creating — only the actual file upload and real checkout
need them.

## How auth works (why this fixes the CORS/session mess from before)

Login sets a single `httpOnly` cookie (`digifted_session`, a signed
JWT). Every API route reads that same cookie directly — there's no
second server, no `Access-Control-Allow-Origin` to configure, no
Sanctum "stateful" mode, no session-table migrations. This is the
entire reason the Laravel setup kept breaking: two servers on two
ports means CORS, cookies-vs-tokens, and session storage all become
real decisions with real failure modes. One app removes the whole
category.

## Deploying

This is a normal Next.js app — deploys to Vercel, Railway, Render, or
any Node host in the usual way. The one thing to know: `dev.db` is a
file on disk, so on most serverless platforms (Vercel included) it
won't persist between deploys/restarts. For production, either:
- Deploy to a host with a persistent filesystem (Railway, Render, a
  VPS), or
- Swap `lib/db.js` for a hosted Postgres/MySQL — the SQL in that file
  is close to standard SQL and the rest of the app doesn't care which
  database is underneath it.

## What I could not test myself

Real Cloudinary uploads and a real Paystack payment — both need
accounts/API keys that only you can create. Everything else (every
page, every API route, every auth path, the full staff → admin →
customer role flow) was verified working via direct HTTP requests in
my own environment before this was packaged.

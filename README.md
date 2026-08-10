# Highlight Creations

Next.js (App Router) + Tailwind CSS wedding site for Agra — **Supabase-only** backend (DB, Auth, Storage). No Cloudflare/R2.

## Free-tier map

| Resource | Supabase Free | How we use it |
|----------|---------------|---------------|
| Database | 500 MB | Postgres tables (`banners`, `blog_posts`, leads, etc.) |
| File storage | 1 GB | Single public bucket `media` — blog images + banner videos |
| Egress | 5 GB / mo | Public site + Storage CDN |
| Auth | 50k MAU | Single admin login |

Compress banner videos (ffmpeg) before upload. Blog images ≤ 5 MB; banner videos ≤ 80 MB.

## Quick start

```bash
npm install
cp .env.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

- Site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor (tables + `media` bucket + RLS).
3. Auth → create an admin user (email + password) → sign in at `/admin/login`.
   The password is stored **only** in Supabase Auth (hashed). Do not put passwords in `.env` or the repo.
4. Deploy to Vercel; add the same env vars plus `CRON_SECRET`.

### Keep-alive (avoid 7-day pause)

Vercel Cron hits `/api/cron/keep-alive` every 6 days (`vercel.json`). Set `CRON_SECRET` in Vercel so only the cron can call it.

Manual test:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-domain.com/api/cron/keep-alive
```

## Stack

| Piece | Service |
|-------|---------|
| Frontend | Next.js + Tailwind → Vercel |
| DB + Auth + Storage | Supabase |
| Reels | Instagram oEmbed |
| Keep-alive | Vercel Cron → `/api/cron/keep-alive` |

## Pages

- `/` — Hero, reels, Google reviews, venue CTA
- `/venues`, `/blog`, `/portfolio`, `/price-beat-challenge`, `/about`, `/services`, `/contact`, `/faq`, `/privacy`, `/terms`
- `/admin` — Banners, reels, reviews, venues, blog, portfolio, enquiries, stats, settings

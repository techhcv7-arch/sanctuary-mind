# SanctuaryMind Web

Frontend for SanctuaryMind, built with Next.js 16 and Supabase auth/data.

## Required environment variables

Copy `.env.example` to `.env.local` for local development and set the same values in Vercel for production:

```bash
cp .env.example .env.local
```

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL`

`NEXT_PUBLIC_APP_URL` must match the deployed site URL so OAuth and password-reset redirects resolve correctly.

## Local development

```bash
npm install
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run lint
npm run build
```

## Deploying the frontend to Vercel

This app is suitable for direct Vercel deployment as a Next.js frontend.

Before deploying:

1. Add the production environment variables in Vercel.
2. Make sure Supabase redirect URLs include:
   - `https://your-domain.com/auth/callback`
   - `http://localhost:3000/auth/callback` for local development
3. Apply the SQL migrations in `supabase/migrations/` to the target Supabase project.

After that, connect the `web/` directory to Vercel as the project root and deploy the `feat/arctic-tectonic-design` branch or your production branch.

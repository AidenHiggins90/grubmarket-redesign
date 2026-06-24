# Launching the GrubMarket redesign

This is a **static site** (plain HTML/CSS/JS — no build step). It deploys to
Vercel directly from GitHub. Supabase powers the contact/lead form.

Order: **GitHub → Supabase → wire keys → Vercel.**

---

## 1. Push the code to GitHub

The repo is already initialized and committed locally on the `main` branch.

1. Create a new **empty** repo on GitHub (no README/license) — e.g. `grubmarket-redesign`.
2. From this folder (`grubmarket-redesign/`), connect and push:

   ```bash
   git remote add origin https://github.com/<your-username>/grubmarket-redesign.git
   git push -u origin main
   ```

   (If you use the GitHub CLI: `gh repo create grubmarket-redesign --public --source=. --push`.)

---

## 2. Set up Supabase (for the contact form)

1. Create a project at <https://supabase.com> (free tier is fine).
2. In the dashboard → **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql) and **Run**. This creates the
   `leads` table and a secure *insert-only* policy.
3. Go to **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key  ← the public one. *Not* `service_role`.

---

## 3. Connect the form to Supabase

Open [`js/config.js`](js/config.js) and paste your two values:

```js
window.GM_SUPABASE = {
  url: "https://YOUR-PROJECT-REF.supabase.co",
  anonKey: "YOUR-ANON-PUBLIC-KEY"
};
```

The anon key is **safe to commit** because Row Level Security only allows
inserts (see the SQL). Commit and push:

```bash
git commit -am "Connect contact form to Supabase"
git push
```

> Want to keep keys out of the repo instead? Since this is a static site with no
> build step, the browser needs these values at runtime, so they can't come from
> Vercel env vars without adding a bundler. The anon-key-in-client + RLS pattern
> above is the standard, supported approach for static Supabase sites.

---

## 4. Deploy on Vercel

1. Go to <https://vercel.com> → **Add New… → Project** → **Import** your GitHub repo.
2. Framework preset: **Other** (it's static). Leave Build Command empty and
   Output Directory as the repo root (default). No environment variables needed.
3. **Deploy.** You'll get a `*.vercel.app` URL in ~20 seconds.
4. Every `git push` to `main` now auto-deploys. Add a custom domain under
   **Project → Settings → Domains** when ready.

---

## 5. Verify

- Open the deployed URL → **Explore ▾ → Contact** (or any "Request a demo" /
  "Become a supplier" button).
- Submit the form → you should see "Thanks — we'll be in touch soon."
- Check **Supabase → Table Editor → leads** — the row should appear.

---

## Notes / next steps

- **Assets:** fonts and most photos currently load from `grubmarket.com`'s CDN.
  That's fine for a demo, but for a real launch, self-host them (download into
  `assets/` and update the URLs) so the site doesn't depend on their server.
- **Spam:** the form has no bot protection yet. Before promoting it widely, add
  a captcha (e.g. Cloudflare Turnstile or hCaptcha) and/or a Supabase rate limit.
- **Clean URLs:** Vercel serves `/contact.html`. If you want `/contact`, add a
  `vercel.json` with `{ "cleanUrls": true }` (existing `.html` links keep working).

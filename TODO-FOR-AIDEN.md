# What I need from you — GrubMarket redesign

Live: https://grubmarket-redesign.vercel.app · Last updated 2026-07-28

Everything here is blocked on a decision or an asset only you can provide. Items
I could resolve myself are already done and not listed.

---

## 1. Blocking — I can't guess these

### Meeting-note items whose meaning I couldn't work out
From `7-23 grub msite meeting.docx`. I applied everything I understood; these
three I left alone rather than guess wrong.

| Note | Why I'm stuck |
|---|---|
| "Delete S — sellable today" | Can't tell what "S" is. A module? A page? SPUD? Deleting the wrong thing is costly. |
| "Food prep over traceability? Hasp, Prisma, inspection" | Researched this. **No food-safety or produce product called "Prisma" exists publicly** — I checked the food-safety software market and GrubMarket's acquisition history. "Hasp" is almost certainly HACCP, which is already on the Food Safety module. So either Prisma is an internal/unannounced tool you'll have to describe to me, or the transcription garbled another name. Note the acquisition **Parsemony** is phonetically close — but it's ERP/accounting, not food safety, and it's already on the ERP module. |
| "Rid of service states" | The 15-state list appears in the homepage About block and on about.html. Remove the list entirely, or just stop framing it as service territory? |
| "Change verbiage into our terms on pop-ups" | Which terms? Give me 3–4 words you'd swap in and I'll apply the pattern across all 8 module pop-ups. |
| ~~"Market intelligence"~~ / ~~EDI's product~~ | **Resolved.** EDI now carries WholesaleWare EDI, whose real integrations (Produce Alliance, Restaurant365) are named in the module detail, plus Procurant as the trading platform. |

### Content decisions
- **Homepage headline.** The note says *"America to world for home page"* but the h1
  currently reads "the **American** food supply chain industry." Do you want
  "global food supply chain," or keep America in the h1 and broaden elsewhere?
  This is the single most-read sentence on the site, so I didn't touch it.
- **"Tech" nav label.** Applied as the notes mandated. It's the shortest and most
  casual word in the nav bar. Confirm it stays, or switch to "Technology."

### Legal
- **Sign-off on privacy.html and terms.html.** These are verbatim from
  grubmarket.com. Someone on your side should confirm they're the current
  versions and that reproducing them on this domain is fine.

---

## 2. Accuracy risks — placeholder content that could mislead

- **Investor Relations stock + analyst sections.** Ticker shows AMRKT per the
  notes. Every number is an em-dash and firms read "Research firm A/B/C —
  Not rated," with a disclaimer saying so. Nothing is fabricated, but it will
  look unfinished to a real investor. I need either real figures/a data feed, or
  permission to cut the sections until you have them.
- **Customer stories.** Marked "illustrative — named case studies to follow."
  Real quotes from Coast Citrus and Schoenmann are in place and sourced. If you
  want named case studies, I need approved copy.
- ~~**Careers.**~~ **Done** — the five invented sample roles are gone, replaced
  with GrubMarket's six actual openings, each linking to the live board at
  grubmarket.com/jobs/openings. These will go stale as roles change; the page
  says the official board is authoritative. Long term, an ATS feed would keep it
  current automatically.

---

## 3. Infrastructure — needs your account access

- **Custom domain.** 43 files hardcode `grubmarket-redesign.vercel.app` in
  canonical tags, Open Graph URLs, and the sitemap. Give me the real domain and
  I'll rewrite them all in one pass. Until then search engines will index the
  Vercel URL.
- **Analytics.** No tracking installed anywhere. Send a GA4 measurement ID (or
  say you want Vercel Analytics) and I'll wire it up.
- **Contact-form backend — CONFIRMED BROKEN, needs your Supabase project.**
  I tested it. The project ref in `js/config.js`
  (`ncdkgvdljfekfhzienxi.supabase.co`) does not resolve in DNS — it behaves
  exactly like a project that was deleted or never created. Every submission
  since launch has failed.
  I've made the failure safe rather than silent: the form now offers a prefilled
  mailto that routes by role (investors@ / press@ / support@), so a visitor still
  reaches a human in one click. **But this is a workaround.** To fix it properly I
  need either a working Supabase URL + anon key, or a decision to drop Supabase
  and use a form service (Formspree, Vercel Forms) instead — tell me which and
  I'll wire it up.
- ~~**Vercel ↔ GitHub auto-deploy.**~~ **Done.** The Vercel GitHub App is
  installed and the project link is no longer `sourceless`. Every push to `main`
  now deploys to production on its own, and pushes to other branches get their
  own preview URL. No more manual CLI deploys.
- **Deployment protection.** The site is publicly reachable. If it shouldn't be
  yet, turn on password protection in Vercel project settings.

---

## 4. My open offers — say the word and I'll do it

- **Photos on the 4 concrete module cubes** (Field Labor, Food Safety, Warehouse,
  Transportation), keeping gradients on the abstract four. The other four — EDI,
  Commerce, AI, ERP — have no honest photographic subject.
- **Real photography for 14 gradient hero pages**: wholesale, about, delivery,
  orders-io, enterprise-ai, investors, sustainability, community, contact, blog,
  recognition, find-a-wholesaler, corporate-governance, sec-filings. Name any and
  I'll source and visually verify.
- **Dark mode.** Design tokens are already centralized, so this is maybe an hour.
- **Nav/footer notes from the meeting doc.** You told me to skip that section.
  Since then I've applied *"standardize footer"* (columns now mirror the nav) and
  *"no segments on Procurant"* (it appeared in two module cubes, now only EDI).
  Nothing else in that section is outstanding — say if you want it revisited.

---

## Fastest path

Two things unblock the most work per sentence you type:

1. **A working form backend** (Supabase keys, or pick a form service). This is
   the only item on the list actively costing you something — the mailto
   fallback catches leads now, but it depends on the visitor having a mail
   client, so some will still drop.
2. **The real domain**, which lets me fix 43 files of canonical/OG/sitemap URLs
   in one pass and stop search engines indexing the Vercel address.

After that, the three remaining meeting-note questions in section 1.

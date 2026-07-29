# What I need from you — GrubMarket redesign

Live: https://grubmarket-redesign.vercel.app · Last updated 2026-07-29

Everything here is blocked on a decision or an asset only you can provide. Items
I could resolve myself are already done and not listed.

---

## 1. Blocking — I can't guess these

### Meeting-note items whose meaning I couldn't work out
From `7-23 grub msite meeting.docx`. I applied everything I understood; these
four I left alone rather than guess wrong.

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
  notes. The stock band and grid carry *illustrative* figures ($24.80, a day
  range, a market cap) behind a "Preview" notice and an "illustrative · pre-IPO"
  label; the analyst table is the part that reads "Research firm A/B/C — Not
  rated". Nothing is fabricated as real, but a visiting investor may not read the
  disclaimers before the numbers. I need real figures/a data feed, or permission
  to cut these sections until you have them.
  (Earlier I described this as "every number is an em-dash" — that was wrong.)
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

## 4. My open offers — all now closed

- ~~**Hero photography.**~~ **Done** — 12 of 14 pages have verified photo heroes.
  `enterprise-ai` and `recognition` stay on brand gradients on purpose: generic
  "AI" abstracts are cliche and off-palette, and no trophy image was free of
  third-party branding. Overrule me if you disagree.
- ~~**Dark mode.**~~ **Done** — full `prefers-color-scheme` support, AA-verified
  in both schemes.
- ~~**Photos on the module cubes.**~~ **Recommend against, deliberately.** Mixing
  photos and gradients inside one 4x2 grid reads as inconsistent rather than
  designed, and EDI / ERP / Commerce / AI have no honest photographic subject.
- ~~**Self-hosting + image optimisation.**~~ **Done** — 187 third-party asset
  references eliminated; 16.1 MB of images now ship as 6.5 MB of WebP.
- ~~**Nav/footer meeting notes.**~~ Applied.

---

## Where things stand

Everything I can do without you is done. What's left is genuinely yours:

1. **A working form backend** — the only item actively costing you something.
   The mailto fallback catches leads, but it needs the visitor to have a mail
   client, so some still drop.
2. **The real domain** — 43 files still hardcode the Vercel URL in canonical
   tags, OG tags and the sitemap, so that's what search engines index.
3. **Analytics** — nothing is installed, so you have no traffic data at all.
4. **The three meeting-note questions** in section 1, plus the homepage headline
   and legal sign-off.
5. **IR and customer placeholders** — real figures, or permission to cut those
   sections until you have them.

# What I need from you — GrubMarket redesign

Live: https://grubmarket-redesign.vercel.app · Last updated 2026-07-28

Everything here is blocked on a decision or an asset only you can provide. Items
I could resolve myself are already done and not listed.

---

## 1. Blocking — I can't guess these

### Meeting-note items whose meaning I couldn't work out
From `7-23 grub msite meeting.docx`. I applied everything I understood; these
five I left alone rather than guess wrong.

| Note | Why I'm stuck |
|---|---|
| "Delete S — sellable today" | Can't tell what "S" is. A module? A page? SPUD? Deleting the wrong thing is costly. |
| "Food prep over traceability? Hasp, Prisma, inspection" | I applied the food-prep-over-traceability reordering. But **Prisma** and **Hasp** aren't GrubMarket products I can find anywhere — are these acquisitions, internal tools, or did I mishear the transcription? (HASP may be a typo for HACCP, which is already there.) |
| "Rid of service states" | The 15-state list appears in the homepage About block and on about.html. Remove the list entirely, or just stop framing it as service territory? |
| "Change verbiage into our terms on pop-ups" | Which terms? Give me 3–4 words you'd swap in and I'll apply the pattern across all 8 module pop-ups. |
| "Market intelligence — what do we have, call AI tools" | I renamed the tile to EDI per the notes and folded analytics into the AI module. If there's a real market-intelligence product, tell me and I'll give it a home. |

### Content decisions
- **Homepage headline.** The note says *"America to world for home page"* but the h1
  currently reads "the **American** food supply chain industry." Do you want
  "global food supply chain," or keep America in the h1 and broaden elsewhere?
  This is the single most-read sentence on the site, so I didn't touch it.
- **EDI's linked product.** The EDI cube has no product chip. I used Procurant as
  a stand-in earlier and removed it since the notes say *"no segments on
  Procurant."* What should EDI actually link to?
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
- **Careers.** Links out but has no real openings. Feed me a roles list or an ATS
  URL.

---

## 3. Infrastructure — needs your account access

- **Custom domain.** 43 files hardcode `grubmarket-redesign.vercel.app` in
  canonical tags, Open Graph URLs, and the sitemap. Give me the real domain and
  I'll rewrite them all in one pass. Until then search engines will index the
  Vercel URL.
- **Analytics.** No tracking installed anywhere. Send a GA4 measurement ID (or
  say you want Vercel Analytics) and I'll wire it up.
- **Contact-form backend.** `supabase/schema.sql` defines a `leads` table but I
  never confirmed it exists in your Supabase project. **Right now form
  submissions may be going nowhere.** Worth checking before you show anyone.
- **Vercel ↔ GitHub auto-deploy.** Currently I deploy manually via CLI; GitHub is
  just a backup. Connect the repo in Vercel's dashboard if you want pushes to
  deploy themselves.
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
- **Nav/footer notes from the meeting doc.** You told me to skip that section. Two
  items in it are still unapplied: *"standardize footer"* (partly done — footer
  columns now mirror the nav) and *"no segments on Procurant."*

---

## Fastest path

Answer the five meeting-note questions in section 1 and give me the domain. That
unblocks the most work per sentence you type. The Supabase check is the one thing
worth doing today regardless — silent form failures are the only issue here that
loses you something real in the meantime.

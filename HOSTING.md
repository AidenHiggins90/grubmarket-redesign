# GrubMarket redesign — hosting notes

Static site. No build step, no server-side runtime, no database required to
serve it. Any web server that can serve files will run it: IIS, Apache, nginx,
or a static host.

## To host
Serve the repository root as the web root. `index.html` is the entry point.
Nothing needs to be compiled or installed.

## Requirements
- HTTPS recommended (the site sets HSTS when served by Vercel).
- Serve `.webp` as `image/webp` and `.woff2` as `font/woff2`, or images and
  fonts will fall back or fail. Most servers do this by default; older IIS
  installs may need the MIME types added.

## What `vercel.json` does
Vercel-specific config. If you move off Vercel it is ignored, and you lose:
- Two redirects: `/awards.html` and `/awards` -> `/recognition.html`
- Security headers: CSP, X-Content-Type-Options, Referrer-Policy,
  X-Frame-Options, Permissions-Policy, HSTS
- Cache-Control: 1 year immutable on fonts, 7 days on images
Replicate these in your server config. The CSP in particular is scoped to what
the site actually loads (self, plus cdn.jsdelivr.net for supabase-js).

## Known open items
See TODO-FOR-AIDEN.md. The two that matter for hosting:
- The contact form points at a Supabase project that does not resolve. It fails
  safe (offers a prefilled mailto) but captures nothing.
- 43 files hardcode https://grubmarket-redesign.vercel.app in canonical tags,
  Open Graph tags and sitemap.xml. These must be rewritten to the real hostname
  or search engines will keep indexing the Vercel URL.

## Regenerating the search index
`python3 tools/build-search-index.py` after any copy change, or search results
go stale.

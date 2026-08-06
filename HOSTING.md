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

## Authentication

The site is static, so authentication belongs on the web server, not in the
project. Ready-made config is in `deploy/`:

- `deploy/web.config` — IIS. Enable Windows Authentication and disable
  Anonymous; the file also carries the MIME types, headers and redirects.
- `deploy/nginx.conf` — nginx. Uses `auth_basic`; create the htpasswd file with
  `htpasswd -c /etc/nginx/.htpasswd grubmarket`.

Windows Auth is preferable to a shared password: access follows domain accounts,
so it tracks people joining and leaving without anyone rotating a secret.

Do not gate this site with JavaScript. Every file is static and served directly;
a client-side login can be bypassed by viewing source or requesting a page URL.

If the server is only reachable on the corporate network, check whether network
access control already covers this before adding a second login.

## Indexing

Every page carries `<meta name="robots" content="noindex, nofollow">` and the
server configs set `X-Robots-Tag`. Keep these while the site contains
placeholder investor figures and the hypothetical Form 10-K. Remove them
deliberately when the content is real and the site is meant to be found.

Note `robots.txt` still allows crawling on purpose — a `Disallow` would stop
crawlers fetching pages, so they would never see the `noindex` and anything
already indexed would linger.

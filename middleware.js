/**
 * HTTP Basic Authentication for the whole site, at the edge.
 *
 * This runs on Vercel's edge network BEFORE any file is served, so it protects
 * every page and every asset — including someone requesting /investors.html or
 * an image URL directly. That is why it belongs here and not in page
 * JavaScript: the files are static, and a client-side login could be bypassed
 * by viewing source or hitting a URL straight.
 *
 * Credentials come from environment variables and are never committed. Set them
 * in Vercel: Project → Settings → Environment Variables.
 *   BASIC_AUTH_USER
 *   BASIC_AUTH_PASSWORD
 *
 * If either is missing the site returns 503 rather than serving pages. A
 * security control that quietly does nothing when misconfigured is worse than
 * no control at all, because it looks like it is working.
 */

export const config = {
  // Everything except Vercel's own internals. Assets included on purpose.
  matcher: '/((?!_vercel|_next/static).*)',
};

/** Compare without leaking length or position through timing. */
function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function challenge() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="GrubMarket redesign", charset="UTF-8"',
      'Cache-Control': 'no-store',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}

export default function middleware(request) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;

  if (!user || !pass) {
    return new Response(
      'Access control is not configured yet.\n\n' +
      'Set BASIC_AUTH_USER and BASIC_AUTH_PASSWORD in the Vercel project\n' +
      'environment variables, then redeploy.\n',
      { status: 503, headers: { 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' } }
    );
  }

  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');
  if (scheme !== 'Basic' || !encoded) return challenge();

  let decoded;
  try {
    decoded = atob(encoded);
  } catch {
    return challenge();
  }

  // Split on the FIRST colon only — passwords may legitimately contain colons.
  const sep = decoded.indexOf(':');
  if (sep === -1) return challenge();

  const givenUser = decoded.slice(0, sep);
  const givenPass = decoded.slice(sep + 1);

  // Evaluate both so a wrong username and a wrong password cost the same.
  const okUser = safeEqual(givenUser, user);
  const okPass = safeEqual(givenPass, pass);
  if (okUser && okPass) return; // authenticated — continue to the static file

  return challenge();
}

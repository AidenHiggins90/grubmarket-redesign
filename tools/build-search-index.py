#!/usr/bin/env python3
"""Regenerate js/search-index.js from the HTML pages.

The site has no build step, so the search index is a committed artifact. Run
this after editing page copy, or search results will quietly go stale:

    python3 tools/build-search-index.py

Schema per entry (kept deliberately short — it ships to every visitor):
    u = url, t = title, d = meta description, b = visible body text (truncated)
"""
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BODY_LIMIT = 1500

# Pages that exist for machines or navigation, not for searching.
SKIP = {"404.html", "search.html"}


def strip_chrome(markup: str) -> str:
    """Drop everything that isn't page copy: scripts, styles, SVG, hidden lists."""
    markup = re.sub(r"<(script|style|svg|noscript)\b[^>]*>.*?</\1>", " ", markup, flags=re.S | re.I)
    # NB: keep [hidden] lists. On grubos.html the product names (Parsemony,
    # Frantoni, WaudWare…) live only in hidden <ul>s — the visible chips are
    # injected by grubos.js at runtime, so dropping these would make every
    # acquired-product name unsearchable.
    return markup


def text_of(markup: str) -> str:
    markup = re.sub(r"<[^>]+>", " ", markup)
    return re.sub(r"\s+", " ", html.unescape(markup)).strip()


def build():
    entries = []
    for name in sorted(os.listdir(ROOT)):
        if not name.endswith(".html") or name in SKIP:
            continue
        raw = open(os.path.join(ROOT, name), encoding="utf8").read()

        title = re.search(r"<title>(.*?)</title>", raw, re.S)
        title = html.unescape(title.group(1)).split("—")[0].strip() if title else name
        desc = re.search(r'<meta name="description" content="(.*?)"', raw, re.S)
        desc = html.unescape(desc.group(1)).strip() if desc else ""

        main = re.search(r"<main\b[^>]*>(.*?)</main>", raw, re.S)
        body = text_of(strip_chrome(main.group(1) if main else raw))

        entries.append({"u": name, "t": title, "d": desc, "b": body[:BODY_LIMIT]})

    out = "window.GM_SEARCH_INDEX = " + json.dumps(entries, ensure_ascii=False) + ";\n"
    path = os.path.join(ROOT, "js", "search-index.js")
    open(path, "w", encoding="utf8").write(out)
    return entries, path


if __name__ == "__main__":
    entries, path = build()
    print("wrote %s — %d pages, %d KB" % (path, len(entries), len(open(path).read()) // 1024))
    missing = [e["u"] for e in entries if not e["d"]]
    if missing:
        print("WARNING: no meta description on: " + ", ".join(missing), file=sys.stderr)

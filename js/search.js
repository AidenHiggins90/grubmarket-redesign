/* Client-side site search. Reads the prebuilt window.GM_SEARCH_INDEX
   (js/search-index.js) — no server or network needed. Ranks title >
   description > body, highlights matches, and supports a ?q= deep link. */
(function () {
  var input = document.getElementById("searchInput");
  var results = document.getElementById("searchResults");
  var summary = document.getElementById("searchSummary");
  var index = window.GM_SEARCH_INDEX || [];
  if (!input || !results) return;

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function highlight(text, tokens) {
    var out = esc(text);
    tokens.forEach(function (tk) {
      var re = new RegExp("(" + tk.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
      out = out.replace(re, "<mark>$1</mark>");
    });
    return out;
  }

  // build a ~160-char snippet centred on the first matched token
  function snippet(item, tokens) {
    if (item.d) return highlight(item.d, tokens);
    var body = item.b || "";
    var low = body.toLowerCase();
    var pos = -1;
    for (var i = 0; i < tokens.length; i++) {
      var p = low.indexOf(tokens[i]);
      if (p > -1 && (pos === -1 || p < pos)) pos = p;
    }
    if (pos === -1) return highlight(body.slice(0, 160) + (body.length > 160 ? "…" : ""), tokens);
    var start = Math.max(0, pos - 60);
    var frag = (start > 0 ? "…" : "") + body.slice(start, start + 160) + (start + 160 < body.length ? "…" : "");
    return highlight(frag, tokens);
  }

  function search(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      summary.textContent = "Type above to search the site.";
      return;
    }
    var tokens = q.split(/\s+/).filter(Boolean);
    var scored = [];
    index.forEach(function (it) {
      var t = it.t.toLowerCase(), d = (it.d || "").toLowerCase(), b = (it.b || "").toLowerCase();
      var score = 0, matchedAll = true;
      tokens.forEach(function (tk) {
        var hit = 0;
        if (t.indexOf(tk) > -1) hit += 5;
        if (d.indexOf(tk) > -1) hit += 3;
        if (b.indexOf(tk) > -1) hit += 1;
        if (hit === 0) matchedAll = false;
        score += hit;
      });
      if (matchedAll && score > 0) scored.push({ it: it, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });

    if (!scored.length) {
      results.innerHTML = "";
      summary.textContent = 'No results for "' + q + '". Try a different term.';
      return;
    }
    summary.textContent = scored.length + ' result' + (scored.length > 1 ? "s" : "") + ' for "' + q + '"';
    results.innerHTML = scored.map(function (r) {
      return '<li><a class="sr-item" href="' + r.it.u + '">' +
               '<span class="sr-title">' + highlight(r.it.t, tokens) + '</span>' +
               '<span class="sr-snip">' + snippet(r.it, tokens) + '</span>' +
               '<span class="sr-url">' + r.it.u + '</span>' +
             '</a></li>';
    }).join("");
  }

  var params = new URLSearchParams(location.search);
  var initial = params.get("q") || "";
  if (initial) { input.value = initial; }
  search(initial);
  input.focus();

  var t;
  input.addEventListener("input", function () {
    clearTimeout(t);
    t = setTimeout(function () { search(input.value); }, 120);
  });
  // keep the URL shareable without reloading
  input.addEventListener("change", function () {
    var u = new URL(location.href);
    if (input.value.trim()) u.searchParams.set("q", input.value.trim());
    else u.searchParams.delete("q");
    history.replaceState(null, "", u);
  });
})();

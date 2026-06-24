/* Sticky section nav — highlight the section currently in view. */
(function () {
  var nav = document.querySelector(".ir-nav");
  if (!nav) return;
  var links = [].slice.call(nav.querySelectorAll('a[href^="#"]'));
  var map = links.map(function (a) {
    return { a: a, el: document.getElementById(a.getAttribute("href").slice(1)) };
  }).filter(function (m) { return m.el; });
  function topOf(el) { return el.getBoundingClientRect().top + window.scrollY; }
  function onScroll() {
    var pos = window.scrollY + 150;       // header + sticky nav offset
    var current = null;
    map.forEach(function (m) { if (topOf(m.el) <= pos) current = m; });
    links.forEach(function (a) { a.classList.remove("active"); });
    if (current) current.a.classList.add("active");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
})();

/* Investor email-alert signup — writes to the Supabase `leads` table. */
(function () {
  var form = document.getElementById("irAlertForm");
  if (!form) return;
  var status = document.getElementById("irAlertStatus");
  var cfg = window.GM_SUPABASE || {};
  var client = (window.supabase && cfg.url && cfg.anonKey && cfg.anonKey.indexOf("YOUR-") === -1)
    ? window.supabase.createClient(cfg.url, cfg.anonKey) : null;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.className = "ir-alert-status";
    var email = document.getElementById("irEmail").value.trim();
    if (!email || email.indexOf("@") === -1) {
      status.textContent = "Please enter a valid email address.";
      status.classList.add("err"); return;
    }
    if (!client) {
      status.textContent = "Alerts aren't connected yet — add your Supabase keys in js/config.js.";
      status.classList.add("err"); return;
    }
    var btn = form.querySelector("button");
    btn.disabled = true; var label = btn.textContent; btn.textContent = "Subscribing…";
    client.from("leads")
      .insert({ name: "IR alert subscriber", email: email, role: "investor", source: "ir-email-alerts" })
      .then(function (res) {
        btn.disabled = false; btn.textContent = label;
        if (res.error) {
          status.textContent = "Something went wrong — please try again.";
          status.classList.add("err"); return;
        }
        form.reset();
        status.textContent = "You're subscribed — investor updates are on the way.";
        status.classList.add("ok");
      });
  });
})();

/* Lead-capture form → Supabase `leads` table.
   Uses the public anon key (config.js) + an insert-only RLS policy. */
(function () {
  var form = document.getElementById("leadForm");
  if (!form) return;
  var statusEl = document.getElementById("formStatus");
  var params = new URLSearchParams(location.search);

  // Prefill the role + remember which CTA sent the visitor
  var role = params.get("role");
  if (role) {
    var sel = document.getElementById("f-role");
    if (sel && [].some.call(sel.options, function (o) { return o.value === role; })) sel.value = role;
  }

  var cfg = window.GM_SUPABASE || {};
  var connected = !!(window.supabase && cfg.url && cfg.anonKey &&
    cfg.url.indexOf("YOUR-") === -1 && cfg.anonKey.indexOf("YOUR-") === -1);
  var client = connected ? window.supabase.createClient(cfg.url, cfg.anonKey) : null;

  function say(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }

  // Route the email fallback to whoever the visitor actually needs.
  var INBOX = { investor: "investors@grubmarket.com", press: "press@grubmarket.com" };

  /* If the backend can't be reached, the lead must not just evaporate — offer a
     prefilled mailto so the visitor can still get through in one click, and
     don't tell them to "try again" at something that will keep failing. */
  function offerEmailFallback(data) {
    var to = INBOX[data.role] || "support@grubmarket.com";
    var subject = "Website enquiry" + (data.company ? " — " + data.company : "");
    var body = "Name: " + data.name + "\nEmail: " + data.email +
      (data.company ? "\nCompany: " + data.company : "") +
      (data.role ? "\nI am a: " + data.role : "") +
      (data.message ? "\n\n" + data.message : "");
    statusEl.className = "form-status err";
    statusEl.innerHTML = "We couldn't submit the form just now. " +
      '<a href="mailto:' + to + "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body) + '">Email us instead</a> — ' +
      "your details are already filled in, or reach us directly at " +
      '<a href="mailto:' + to + '">' + to + "</a>.";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = {
      name: document.getElementById("f-name").value.trim(),
      email: document.getElementById("f-email").value.trim(),
      company: document.getElementById("f-company").value.trim(),
      role: document.getElementById("f-role").value,
      message: document.getElementById("f-message").value.trim(),
      source: params.get("source") || "contact"
    };
    if (!data.name || !data.email) { say("Please enter your name and email.", "err"); return; }
    if (!client) { offerEmailFallback(data); return; }

    var btn = form.querySelector("button[type=submit]");
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending…";

    function done() { btn.disabled = false; btn.textContent = label; }

    client.from("leads").insert(data).then(function (res) {
      done();
      if (res.error) {
        // A DNS/network/CORS failure means the project is unreachable, not that
        // the visitor did anything wrong — hand them the email route instead.
        offerEmailFallback(data);
        return;
      }
      form.reset();
      say("Thanks — we'll be in touch soon.", "ok");
    }).catch(function () {
      // insert() can reject outright; without this the button would stay stuck
      // on "Sending…" and the visitor would get no feedback at all.
      done();
      offerEmailFallback(data);
    });
  });
})();

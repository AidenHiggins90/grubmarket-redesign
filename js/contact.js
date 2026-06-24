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
    if (!client) { say("Form isn't connected yet — add your Supabase keys in js/config.js.", "err"); return; }

    var btn = form.querySelector("button[type=submit]");
    var label = btn.textContent;
    btn.disabled = true; btn.textContent = "Sending…";

    client.from("leads").insert(data).then(function (res) {
      btn.disabled = false; btn.textContent = label;
      if (res.error) { say("Something went wrong — please try again.", "err"); return; }
      form.reset();
      say("Thanks — we'll be in touch soon.", "ok");
    });
  });
})();

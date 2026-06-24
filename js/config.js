/* ------------------------------------------------------------------
   Supabase connection for the lead-capture form.

   Paste your project's values below (Supabase dashboard →
   Project Settings → API):
     • url      = "Project URL"
     • anonKey  = "anon public" API key

   The anon (public) key is SAFE to commit and ship in the browser
   AS LONG AS Row Level Security is on and only an insert policy is
   granted to the `anon` role (see supabase/schema.sql). Never put the
   service_role key here.
------------------------------------------------------------------ */
window.GM_SUPABASE = {
  url: "https://YOUR-PROJECT-REF.supabase.co",
  anonKey: "YOUR-ANON-PUBLIC-KEY"
};

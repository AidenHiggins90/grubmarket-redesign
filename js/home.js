/* Homepage hooks: rotating hero word + count-up stats. */

/* 1) Rotating eyebrow word — cycles through who we serve. */
(function () {
  var el = document.querySelector(".hero .rotator");
  if (!el) return;
  var words = (el.getAttribute("data-words") || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
  if (words.length < 2) return;
  var i = 0;
  el.style.transition = "opacity .25s ease";
  setInterval(function () {
    el.style.opacity = "0";
    setTimeout(function () {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.style.opacity = "1";
    }, 250);
  }, 2200);
})();

/* 2) Count-up the credibility stats when scrolled into view. */
(function () {
  var els = [].slice.call(document.querySelectorAll(".proof .pstat .n"));
  if (!els.length || !("IntersectionObserver" in window)) return;

  function fmt(v, dec, comma) {
    var s = dec ? v.toFixed(dec) : String(Math.round(v));
    if (comma) {
      var parts = s.split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      s = parts.join(".");
    }
    return s;
  }

  els.forEach(function (el) {
    var raw = el.textContent.trim();
    var m = raw.match(/^([^0-9]*)([0-9.,]+)(.*)$/);   // prefix, number, suffix
    if (!m) { el.dataset.skip = "1"; return; }
    var numStr = m[2].replace(/,/g, "");
    el.dataset.prefix = m[1];
    el.dataset.suffix = m[3];
    el.dataset.value = numStr;
    el.dataset.decimals = numStr.indexOf(".") > -1 ? numStr.split(".")[1].length : 0;
    el.dataset.comma = m[2].indexOf(",") > -1 ? "1" : "0";
    el.textContent = m[1] + "0" + m[3];               // start at zero
  });

  function run(el) {
    var target = parseFloat(el.dataset.value), dec = +el.dataset.decimals,
        comma = +el.dataset.comma, pre = el.dataset.prefix, suf = el.dataset.suffix;
    var dur = 1300, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(target * eased, dec, comma) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting && !e.target.dataset.done && !e.target.dataset.skip) {
        e.target.dataset.done = "1";
        run(e.target);
      }
    });
  }, { threshold: 0.5 });

  els.forEach(function (el) { if (!el.dataset.skip) io.observe(el); });
})();

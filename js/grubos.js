/* GrubOS directory — each module is a cube. Clicking one opens an
   informational modal (role=dialog) describing the module, with the
   products inside it as links. ESC / overlay / X close it; focus is
   managed and background scroll locked. */
(function () {
  var cubes = document.querySelectorAll(".os-cube");
  if (!cubes.length) return;

  var overlay = document.createElement("div");
  overlay.className = "gm-modal-overlay";
  overlay.setAttribute("hidden", "");
  overlay.innerHTML =
    '<div class="gm-modal" role="dialog" aria-modal="true" aria-labelledby="gmModalName">' +
      '<button class="gm-modal-close" type="button" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<span class="gm-modal-tag">GrubOS module</span>' +
      '<h3 id="gmModalName"></h3>' +
      '<p class="gm-modal-desc"></p>' +
      '<div class="gm-modal-links"></div>' +
    '</div>';
  document.body.appendChild(overlay);

  var elName = overlay.querySelector("#gmModalName");
  var elDesc = overlay.querySelector(".gm-modal-desc");
  var elLinks = overlay.querySelector(".gm-modal-links");
  var closeBtn = overlay.querySelector(".gm-modal-close");
  var arrowExt = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';
  var arrowInt = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var lastFocus = null;

  function openModal(cube) {
    lastFocus = cube;
    elName.innerHTML = cube.getAttribute("data-module") || "";
    elDesc.textContent = cube.getAttribute("data-detail") || "";

    var links = cube.querySelectorAll(".os-links a");
    var html = links.length ? '<h4>' + (links.length > 1 ? "Products in this module" : "In this module") + '</h4>' : "";
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      var external = /^https?:/.test(href);
      var attrs = external ? ' target="_blank" rel="noopener"' : "";
      html += '<a href="' + href + '"' + attrs + '>' +
                '<span>' + a.textContent + '</span>' + (external ? arrowExt : arrowInt) +
              '</a>';
    });
    elLinks.innerHTML = html;

    overlay.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () { overlay.classList.add("open"); });
    closeBtn.focus();
    document.addEventListener("keydown", onKey);
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.removeEventListener("keydown", onKey);
    document.body.style.overflow = "";
    setTimeout(function () { overlay.setAttribute("hidden", ""); }, 200);
    if (lastFocus) lastFocus.focus();
  }

  function onKey(e) { if (e.key === "Escape") closeModal(); }

  // fill each cube's body with product chips + an "Explore" cue so it
  // reads as content rather than a blank square
  cubes.forEach(function (c) {
    var anchor = c.querySelector(".os-links");
    var names = [].map.call(c.querySelectorAll(".os-links a"), function (a) { return a.textContent.trim(); });
    if (names.length && anchor) {
      var tags = document.createElement("span");
      tags.className = "os-tags";
      var shown = names.slice(0, 3);
      tags.innerHTML = shown.map(function (n) { return "<span>" + n + "</span>"; }).join("") +
        (names.length > 3 ? '<span class="os-tag-more">+' + (names.length - 3) + " more</span>" : "");
      c.insertBefore(tags, anchor);
    }
    var more = document.createElement("span");
    more.className = "os-more";
    more.innerHTML = 'Explore module <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    if (anchor) c.insertBefore(more, anchor); else c.appendChild(more);

    c.addEventListener("click", function () { openModal(c); });
  });
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
})();

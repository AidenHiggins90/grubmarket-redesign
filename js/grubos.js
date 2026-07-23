/* GrubOS directory — intercept product-tile clicks and show an
   informational modal (with the outbound link inside) instead of
   navigating away. Progressive enhancement: middle-click, cmd/ctrl-click,
   and no-JS all still follow the anchor normally. */
(function () {
  var tiles = document.querySelectorAll(".app-tile");
  if (!tiles.length) return;

  var overlay = document.createElement("div");
  overlay.className = "gm-modal-overlay";
  overlay.setAttribute("hidden", "");
  overlay.innerHTML =
    '<div class="gm-modal" role="dialog" aria-modal="true" aria-labelledby="gmModalName">' +
      '<button class="gm-modal-close" type="button" aria-label="Close">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
      '</button>' +
      '<span class="gm-modal-tag"></span>' +
      '<h3 id="gmModalName"></h3>' +
      '<p class="gm-modal-desc"></p>' +
      '<a class="btn solid gm-modal-link" href="#"></a>' +
    '</div>';
  document.body.appendChild(overlay);

  var elTag = overlay.querySelector(".gm-modal-tag");
  var elName = overlay.querySelector("#gmModalName");
  var elDesc = overlay.querySelector(".gm-modal-desc");
  var elLink = overlay.querySelector(".gm-modal-link");
  var closeBtn = overlay.querySelector(".gm-modal-close");
  var lastFocus = null;

  function textOf(tile, sel) {
    var el = tile.querySelector(sel);
    return el ? el.textContent.trim() : "";
  }

  function openModal(tile) {
    lastFocus = tile;
    var url = tile.getAttribute("href");
    var external = /^https?:/.test(url);
    var meta = textOf(tile, ".app-meta");

    elTag.textContent = meta;
    elTag.style.display = meta ? "" : "none";
    elName.textContent = textOf(tile, ".app-name");
    elDesc.textContent = tile.getAttribute("data-detail") || textOf(tile, ".app-desc");
    elLink.setAttribute("href", url);
    if (external) {
      elLink.setAttribute("target", "_blank");
      elLink.setAttribute("rel", "noopener");
      elLink.textContent = "Visit site ↗";
    } else {
      elLink.removeAttribute("target");
      elLink.removeAttribute("rel");
      elLink.textContent = "Open page →";
    }

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

  tiles.forEach(function (t) {
    t.addEventListener("click", function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return; // let new-tab through
      e.preventDefault();
      openModal(t);
    });
  });
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
})();

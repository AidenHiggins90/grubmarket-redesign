/* ============================================================
   Shared layout: header (with Explore dropdown) + footer.
   Injected on every page so navigation stays consistent and DRY.
   ALL links are internal to this site — except the food hubs.
   ============================================================ */
(function () {
  // ---- inline SVG icons (stroke-based, professional) ----
  var I = {
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2 12.5a1.5 1.5 0 0 0 1.5 1.2h9.6a1.5 1.5 0 0 0 1.5-1.2L20 7H5.4"/></svg>',
    cpu:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2"/></svg>',
    ai:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z"/><path d="M18.5 14.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z"/></svg>',
    truck:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>',
    leaf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-8 6-13 15-13 0 9-5 15-13 15-1.5 0-2-.6-2-2z"/><path d="M5 19c3-5 6-7 10-8"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M19 19H6"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.8-5.2A8 8 0 1 1 21 12z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
    arr:  '<svg class="arr" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  };
  window.GM_ICONS = I;

  var LOGO   = "https://www.grubmarket.com/hello/assets/icons/logo_black.svg";
  var LOGO_W = "https://www.grubmarket.com/hello/assets/icons/logo.svg";

  // ---- navigation model (everything internal) ----
  var NAV = [
    { h: "Platform", items: [
      { t: "GrubOS",         d: "Open every GrubMarket platform in one place", href: "grubos.html", i: "grid" },
      { t: "Buy Wholesale",  d: "B2B marketplace across the U.S. & Canada", href: "wholesale.html",     i: "cart" },
      { t: "ERP Software",   d: "AI inventory, warehouse & eCommerce tools", href: "software.html",      i: "cpu"  },
      { t: "Enterprise AI",  d: "Food supply chain AI & automation",         href: "enterprise-ai.html", i: "ai"   }
    ]},
    { h: "For You", items: [
      { t: "Growers & Farmers",      d: "Reach more buyers and get paid on time", href: "growers.html",       i: "leaf"  },
      { t: "Home & Office Delivery", d: "Farm-fresh food up to 50% off retail", href: "index.html#delivery", i: "truck" },
      { t: "Sustainability",         d: "Sustainable California initiative",     href: "sustainability.html", i: "leaf"  },
      { t: "Who We Are",             d: "Our story, footprint & mission",        href: "index.html#about",    i: "info"  }
    ]},
    { h: "Company", items: [
      { t: "Blog",            d: "News & insights",      href: "blog.html",         i: "book" },
      { t: "Careers",         d: "Join the team",        href: "careers.html",      i: "user" },
      { t: "Contact",         d: "Talk to the right team", href: "contact.html",    i: "chat" }
    ]}
  ];

  function megaCols() {
    return NAV.map(function (col) {
      var links = col.items.map(function (it) {
        return '<a class="mega-link" href="' + it.href + '">' +
                 '<span class="mi">' + I[it.i] + '</span>' +
                 '<span><span class="t">' + it.t + '</span>' +
                 '<span class="d">' + it.d + '</span></span></a>';
      }).join("");
      return '<div class="mega-col"><h4>' + col.h + '</h4>' + links + '</div>';
    }).join("");
  }

  function mobileLinks() {
    return NAV.map(function (col) {
      return '<h4>' + col.h + '</h4>' +
        col.items.map(function (it) { return '<a href="' + it.href + '">' + it.t + '</a>'; }).join("");
    }).join("") + '<a class="btn solid" href="wholesale.html">Buy Wholesale</a>';
  }

  var header =
    '<header class="site-header" id="siteHeader"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="GrubMarket home"><img src="' + LOGO + '" alt="GrubMarket"/></a>' +
      '<nav class="nav" id="nav">' +
        '<div class="dropdown" id="dropdown">' +
          '<button class="nav-trigger" id="navTrigger" aria-expanded="false" aria-haspopup="true">Explore <span class="chev"></span></button>' +
          '<div class="mega" role="menu">' + megaCols() + '</div>' +
        '</div>' +
        '<a class="btn solid sm nav-cta" href="wholesale.html">Buy Wholesale</a>' +
      '</nav>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<div class="mobile-panel" id="mobilePanel">' + mobileLinks() + '</div>';

  var footer =
    '<footer class="footer"><div class="wrap"><div class="cols">' +
      '<div><img class="logo" src="' + LOGO_W + '" alt="GrubMarket"/>' +
        '<p class="blurb">Digitally transforming the American food supply chain industry — wholesale, software, AI, and delivery in one network.</p></div>' +
      '<div><h5>Platform</h5><a href="wholesale.html">Buy Wholesale</a><a href="software.html">ERP Software</a><a href="enterprise-ai.html">Enterprise AI</a></div>' +
      '<div><h5>Explore</h5><a href="index.html#delivery">Delivery</a><a href="sustainability.html">Sustainability</a><a href="index.html#about">About</a></div>' +
      '<div><h5>Company</h5><a href="blog.html">Blog</a><a href="careers.html">Careers</a><a href="contact.html">Contact</a><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a></div>' +
    '</div>' +
    '<div class="bottom"><span>© 2026 GrubMarket. All rights reserved.</span>' +
      '<span><a href="terms.html">Terms of Service</a> &nbsp;·&nbsp; <a href="privacy.html">Privacy Policy</a></span></div>' +
    '</div></footer>';

  // ---- inject ----
  var hMount = document.getElementById("site-header-mount");
  var fMount = document.getElementById("site-footer-mount");
  if (hMount) hMount.outerHTML = header;
  if (fMount) fMount.outerHTML = footer;

  // ---- highlight the current page in nav, dropdown, footer ----
  (function () {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll("#nav .nav-link, .mega-link, #mobilePanel a, .footer a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.indexOf("#") !== -1) return;   // in-page anchors aren't a "current page" match
      var page = href.split("#")[0].toLowerCase();
      if (page && page === here) a.classList.add("is-active");
    });
  })();

  // ---- interactions ----
  var dropdown  = document.getElementById("dropdown");
  var trigger   = document.getElementById("navTrigger");
  var hamburger = document.getElementById("hamburger");
  var panel     = document.getElementById("mobilePanel");
  var headerEl  = document.getElementById("siteHeader");

  function closeDropdown(){ dropdown.classList.remove("open"); trigger.setAttribute("aria-expanded","false"); }
  function closePanel(){ panel.classList.remove("open"); hamburger.setAttribute("aria-expanded","false"); }

  trigger.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = dropdown.classList.toggle("open");
    trigger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("click", function (e) { if (!dropdown.contains(e.target)) closeDropdown(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeDropdown(); closePanel(); } });
  dropdown.querySelectorAll('a[href*="#"]').forEach(function (a) { a.addEventListener("click", closeDropdown); });

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = panel.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closePanel); });

  // header shadow on scroll
  function onScroll(){ headerEl.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ============================================================
   Shared layout: header (5 mega-dropdowns) + footer.
   Injected on every page so navigation stays consistent and DRY.
   Structure/interaction pattern modeled on Manhattan Associates'
   mega-menu; branding/design tokens are GrubMarket's own.
   ============================================================ */
(function () {
  var LOGO   = "https://www.grubmarket.com/hello/assets/icons/logo_black.svg";
  var LOGO_W = "https://www.grubmarket.com/hello/assets/icons/logo.svg";
  var IMG    = "https://www.grubmarket.com/hello/assets/images/";

  // ---- navigation model: 5 top-level dropdowns, each with grouped
  //      subsections (like Manhattan's mega-menus) + a featured card ----
  var NAV = [
    { label: "Platform", groups: [
        { h: "Software", items: [
          { t: "GrubOS",        d: "Every acquisition, one platform",   href: "grubos.html" },
          { t: "ERP Software",  d: "Inventory, warehouse & eCommerce",  href: "software.html" },
          { t: "WholesaleWare Login", d: "Sign in to the ERP platform", href: "https://erp.wholesaleware.com/#/" },
          { t: "Orders IO",     d: "Custom-branded mobile B2B ordering", href: "orders-io.html" }
        ]},
        { h: "AI & Payments", items: [
          { t: "Enterprise AI", d: "GrubAssist AI agents & automation",  href: "enterprise-ai.html" },
          { t: "GrubPay",       d: "Integrated payments rail",           href: "grubpay.html" }
        ]}
      ],
      featured: { tag: "Platform", title: "Inside GrubOS", desc: "A decade of acquisitions, unified under one login.", href: "grubos.html", img: "farm_gpt_carousel_scaled628x1200.png" }
    },

    { label: "Marketplace", groups: [
        { h: "Buy", items: [
          { t: "Buy Wholesale",  d: "B2B marketplace across the U.S. & Canada", href: "wholesale.html" },
          { t: "Product Catalog", d: "Browse quality products by category",     href: "catalog.html" }
        ]},
        { h: "Sell & Deliver", items: [
          { t: "Sell Your Harvest",      d: "For growers & farmers",           href: "growers.html" },
          { t: "Home & Office Delivery", d: "Farm-fresh food, delivered (B2C)", href: "delivery.html" }
        ]}
      ],
      featured: { tag: "Marketplace", title: "Buy Wholesale", desc: "Exclusive products at low prices, delivered on your schedule.", href: "wholesale.html", img: "boxes_anim.jpg" }
    },

    { label: "Who We Serve", groups: [
        { h: "Businesses", items: [
          { t: "Grocers & Restaurants",     d: "Source quality products at low prices", href: "grocers.html" },
          { t: "Distributors & Wholesalers", d: "Run your operation on one platform",    href: "distributors.html" }
        ]},
        { h: "Growers & Consumers", items: [
          { t: "Growers & Farmers", d: "Reach more buyers, get paid on time", href: "growers.html" },
          { t: "Home & Office",     d: "Farm-fresh food delivered to you",    href: "delivery.html" }
        ]}
      ],
      featured: { tag: "Find your GrubMarket", title: "Whoever you are in food", desc: "There's a door for you — grow, distribute, sell, or source.", href: "index.html", img: "image%2022.png" }
    },

    { label: "Resources", groups: [
        { h: "Newsroom", items: [
          { t: "Newsroom",    d: "News, insights & press releases", href: "blog.html" },
          { t: "Events",      d: "Webcasts & investor events",      href: "events.html" },
          { t: "Trade Shows", d: "Where to meet the team",          href: "trade-shows.html" }
        ]},
        { h: "Community", items: [
          { t: "Customer Stories", d: "How partners grow with GrubMarket", href: "customers.html" },
          { t: "Community Hub",    d: "Connect with the network",          href: "community.html" },
          { t: "Sustainability",   d: "Sustainable California initiative",  href: "sustainability.html" }
        ]}
      ],
      featured: { tag: "Newsroom", title: "The latest from GrubMarket", desc: "Three years of stories on food, technology, and growth.", href: "blog.html", img: "bg3.jpg" }
    },

    { label: "Company", groups: [
        { h: "About", items: [
          { t: "Who We Are",         d: "Our story, footprint & mission", href: "about.html" },
          { t: "Leadership Team",    d: "The people leading GrubMarket",  href: "leadership.html" },
          { t: "Awards & Accolades", d: "Recognition & industry honors",  href: "awards.html" }
        ]},
        { h: "Connect", items: [
          { t: "Investor Relations", d: "Financials, filings & investor kit", href: "investors.html" },
          { t: "Careers",            d: "Join the team",                      href: "careers.html" },
          { t: "Contact",            d: "Talk to the right team",             href: "contact.html" }
        ]}
      ],
      featured: { tag: "Careers", title: "Life at GrubMarket", desc: "Build the future of food technology with us.", href: "careers.html", img: "GettyImages-1182645061SMALL.jpg" }
    }
  ];

  // ---- render one dropdown ----
  function megaFor(entry, idx) {
    var groups = entry.groups.map(function (g) {
      var links = g.items.map(function (it) {
        var ext = /^https?:/.test(it.href) ? ' target="_blank" rel="noopener"' : '';
        return '<a class="m-link" role="menuitem" href="' + it.href + '"' + ext + '>' +
                 '<span class="m-t">' + it.t + (ext ? ' <span class="m-ext" aria-hidden="true">↗</span>' : '') + '</span>' +
                 '<span class="m-d">' + it.d + '</span></a>';
      }).join("");
      return '<div class="mega-group"><h4>' + g.h + '</h4>' + links + '</div>';
    }).join("");

    var f = entry.featured;
    var featured = f ? (
      '<a class="mega-featured" href="' + f.href + '">' +
        '<span class="mf-img" style="background-image:url(\'' + IMG + f.img + '\')"></span>' +
        '<span class="mf-body">' +
          '<span class="mf-tag">' + f.tag + '</span>' +
          '<span class="mf-title">' + f.title + '</span>' +
          '<span class="mf-desc">' + f.desc + '</span>' +
          '<span class="mf-link">Learn more →</span>' +
        '</span></a>'
    ) : "";

    var panelId = "mega-" + idx;
    return '<div class="dropdown">' +
      '<button class="nav-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="' + panelId + '">' +
        entry.label + ' <span class="chev" aria-hidden="true"></span></button>' +
      '<div class="mega" id="' + panelId + '" role="menu" aria-label="' + entry.label + '">' +
        '<div class="mega-inner">' +
          '<div class="mega-groups">' + groups + '</div>' + featured +
        '</div>' +
      '</div></div>';
  }

  function navHTML() { return NAV.map(megaFor).join(""); }

  function mobileLinks() {
    return NAV.map(function (entry) {
      var groups = entry.groups.map(function (g) {
        return '<h5>' + g.h + '</h5>' +
          g.items.map(function (it) {
            var ext = /^https?:/.test(it.href) ? ' target="_blank" rel="noopener"' : '';
            return '<a href="' + it.href + '"' + ext + '>' + it.t + (ext ? ' ↗' : '') + '</a>';
          }).join("");
      }).join("");
      return '<div class="mp-section"><h4>' + entry.label + '</h4>' + groups + '</div>';
    }).join("") + '<a class="btn solid" href="wholesale.html">Buy Wholesale</a>';
  }

  var header =
    '<header class="site-header" id="siteHeader"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="GrubMarket home"><img src="' + LOGO + '" alt="GrubMarket"/></a>' +
      '<nav class="nav" id="nav" aria-label="Primary">' + navHTML() +
        '<a class="btn solid sm nav-cta" href="wholesale.html">Buy Wholesale</a>' +
      '</nav>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<div class="mobile-panel" id="mobilePanel">' + mobileLinks() + '</div>';

  var footer =
    '<footer class="footer"><div class="wrap"><div class="cols">' +
      '<div><img class="logo" src="' + LOGO_W + '" alt="GrubMarket"/>' +
        '<p class="blurb">Digitally transforming the American food supply chain industry — wholesale, software, AI, and delivery in one network.</p></div>' +
      '<div><h5>Platform</h5><a href="grubos.html">GrubOS</a><a href="wholesale.html">Buy Wholesale</a><a href="software.html">ERP Software</a><a href="enterprise-ai.html">Enterprise AI</a></div>' +
      '<div><h5>Resources</h5><a href="blog.html">Newsroom</a><a href="events.html">Events</a><a href="customers.html">Customer Stories</a><a href="sustainability.html">Sustainability</a></div>' +
      '<div><h5>Company</h5><a href="leadership.html">Leadership</a><a href="awards.html">Awards</a><a href="careers.html">Careers</a><a href="investors.html">Investor Relations</a></div>' +
      '<div><h5>Legal</h5><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a><a href="cookie-policy.html">Cookie Policy</a><a href="accessibility.html">Accessibility</a></div>' +
    '</div>' +
    '<div class="bottom"><span>© 2026 GrubMarket. All rights reserved.</span>' +
      '<span><a href="terms.html">Terms of Service</a> &nbsp;·&nbsp; <a href="privacy.html">Privacy Policy</a></span></div>' +
    '</div></footer>';

  // ---- inject ----
  var hMount = document.getElementById("site-header-mount");
  var fMount = document.getElementById("site-footer-mount");
  if (hMount) hMount.outerHTML = header;
  if (fMount) fMount.outerHTML = footer;

  // ---- highlight the current page ----
  (function () {
    var here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    document.querySelectorAll(".m-link, #mobilePanel a, .footer a").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.indexOf("#") !== -1) return;
      var page = href.split("#")[0].toLowerCase();
      if (page && page === here) a.classList.add("is-active");
    });
  })();

  // ---- dropdown interactions (hover + click + keyboard) ----
  var dropdowns = [].slice.call(document.querySelectorAll(".dropdown"));
  var closeTimer;

  function closeAll(except) {
    dropdowns.forEach(function (d) {
      if (d !== except) {
        d.classList.remove("open");
        d.querySelector(".nav-trigger").setAttribute("aria-expanded", "false");
      }
    });
  }
  function openDrop(d) {
    clearTimeout(closeTimer);
    closeAll(d);
    d.classList.add("open");
    d.querySelector(".nav-trigger").setAttribute("aria-expanded", "true");
  }
  function closeDrop(d) {
    d.classList.remove("open");
    d.querySelector(".nav-trigger").setAttribute("aria-expanded", "false");
  }

  dropdowns.forEach(function (d) {
    var trig = d.querySelector(".nav-trigger");
    d.addEventListener("mouseenter", function () { clearTimeout(closeTimer); openDrop(d); });
    d.addEventListener("mouseleave", function () { closeTimer = setTimeout(function () { closeDrop(d); }, 140); });
    trig.addEventListener("click", function (e) {
      e.stopPropagation();
      if (d.classList.contains("open")) closeDrop(d); else openDrop(d);
    });
    trig.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (d.classList.contains("open")) closeDrop(d); else openDrop(d);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        openDrop(d);
        var first = d.querySelector(".m-link");
        if (first) first.focus();
      }
    });
    d.addEventListener("focusout", function (e) {
      if (!d.contains(e.relatedTarget)) closeDrop(d);
    });
    d.querySelectorAll('a[href*="#"]').forEach(function (a) {
      a.addEventListener("click", function () { closeDrop(d); });
    });
  });

  document.addEventListener("click", function (e) { if (!e.target.closest(".dropdown")) closeAll(); });

  // ---- mobile panel ----
  var hamburger = document.getElementById("hamburger");
  var panel     = document.getElementById("mobilePanel");
  var headerEl  = document.getElementById("siteHeader");

  function closePanel() { panel.classList.remove("open"); hamburger.setAttribute("aria-expanded", "false"); }
  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = panel.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  panel.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closePanel); });

  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeAll(); closePanel(); } });

  // header shadow on scroll
  function onScroll() { headerEl.classList.toggle("scrolled", window.scrollY > 8); }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

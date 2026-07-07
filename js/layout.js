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
    { label: "Platform",
      intro: { eyebrow: "The Platform", text: "One connected system for ordering, running, and getting paid — every tool built specifically for fresh, perishable food." },
      groups: [
        { h: "Software", items: [
          { t: "GrubOS",        d: "The single front door to a decade of GrubMarket acquisitions — one login, one data layer, six connected modules spanning ERP, commerce, safety, and AI.", href: "grubos.html" },
          { t: "ERP Software",  d: "WholesaleWare is the food industry's fastest-growing cloud ERP, running inventory, warehouse ops, grower accounting, manufacturing, HR, and general ledger for wholesalers and distributors.", href: "software.html" },
          { t: "WholesaleWare Login", d: "Existing customers sign in here to run daily operations — inventory, purchasing, lot tracking, and accounting — on the live WholesaleWare platform.", href: "https://erp.wholesaleware.com/#/" },
          { t: "Orders IO",     d: "A custom-branded ordering app for your business — customers place orders, browse deals, and check status any hour of day, on iOS or Android.", href: "orders-io.html" }
        ]},
        { h: "AI & Payments", items: [
          { t: "Enterprise AI", d: "GrubAssist, the food industry's first virtual AI assistant, plus AI Orders, which extracts orders 24/7 from voicemails, emails, and texts straight into your ERP.", href: "enterprise-ai.html" },
          { t: "GrubPay",       d: "Accept ACH and credit card payments in one secure, simple workflow — built for distributors, retail stores, and online shops alike.", href: "grubpay.html" }
        ]}
      ],
      featured: { tag: "Platform", img: "farm_gpt_carousel_scaled628x1200.png", href: "grubos.html", linkText: "Explore the platform →",
        quote: "We focused on our customers' real challenges and delivered powerful solutions that deliver immediate, positive impact to their businesses.",
        name: "Genevieve Wang", role: "Chief Software Product Officer, GrubMarket" }
    },

    { label: "Marketplace",
      intro: { eyebrow: "The Marketplace", text: "Buy, sell, and deliver fresh food through a nationwide network — exclusive pricing and reliable fulfillment, all on one platform." },
      groups: [
        { h: "Buy", items: [
          { t: "Buy Wholesale",  d: "GrubMarket's B2B network serves grocers, foodservice operators, schools, government buyers, and restaurants across the U.S. and Canada at exclusive wholesale prices.", href: "wholesale.html" },
          { t: "Find a Wholesaler", d: "Search by state to see GrubMarket's active regional partners and nationwide wholesale coverage.", href: "find-a-wholesaler.html" },
          { t: "Product Catalog", d: "Thousands of products by category — fresh produce, proteins, dairy, pantry staples, floral, and specialty organic items — sourced from a nationwide grower network.", href: "catalog.html" }
        ]},
        { h: "Sell & Deliver", items: [
          { t: "Sell Your Harvest",      d: "List your harvest, manage CSA boxes and shares through Farmigo, and reach GrubMarket's nationwide buyer network with reliable payouts built in.", href: "growers.html" },
          { t: "Home & Office Delivery", d: "Farm-fresh groceries delivered through local hubs like Good Eggs and FreshGOGO, for up to 50% less than grocery store prices.", href: "delivery.html" }
        ]}
      ],
      featured: { tag: "Marketplace", img: "boxes_anim.jpg", href: "wholesale.html", linkText: "Buy wholesale →",
        quote: "Our ability to offer superior services and the finest quality produce year after year is powered by our deep operational know-how and our investments in world-class digital transformation.",
        name: "Carole Shandler", role: "President, Shapiro-Gilman Shandler at GrubMarket" }
    },

    { label: "Who We Serve",
      intro: { eyebrow: "Who We Serve", text: "Grower or grocer, distributor or family — GrubMarket meets you where you are in the food supply chain." },
      groups: [
        { h: "Businesses", items: [
          { t: "Grocers & Restaurants",     d: "Keep shelves and menus stocked through GrubMarket's B2B network — quality inventory at wholesale prices, delivered across the U.S. and Canada.", href: "grocers.html" },
          { t: "Distributors & Wholesalers", d: "Run inventory, warehouse, purchasing, HR, and accounting on WholesaleWare — the food industry's fastest-growing ERP — instead of disconnected legacy tools.", href: "distributors.html" }
        ]},
        { h: "Growers & Consumers", items: [
          { t: "Growers & Farmers", d: "List your harvest, manage CSA boxes through Farmigo, and get paid reliably through a nationwide buyer network — no middlemen.", href: "growers.html" },
          { t: "Home & Office",     d: "Order fresh groceries online and get them delivered through local food hubs — Good Eggs, FreshGOGO, and DO Organics.", href: "delivery.html" }
        ]}
      ],
      featured: { tag: "Partner voice", img: "image%2022.png", href: "customers.html", linkText: "Read customer stories →",
        quote: "GrubMarket's commitment to AI technology and innovation aligns perfectly with our vision to elevate our capabilities and drive future growth through technology integration.",
        name: "Isabel Freeland", role: "President & CEO, Coast Citrus Distributors" }
    },

    { label: "Resources",
      intro: { eyebrow: "Resources", text: "News, customer stories, and events from across the food supply chain — three years of insight, all in one place." },
      groups: [
        { h: "Newsroom", items: [
          { t: "Newsroom",    d: "From the Sales AI Agent launch to the Spring 2026 software release and TIME100 recognition — GrubMarket's product news and milestones.", href: "blog.html" },
          { t: "Events",      d: "Quarterly earnings webcasts, investor summits, and company milestones — see what's coming and register to attend.", href: "events.html" },
          { t: "Trade Shows", d: "Meet the team and see WholesaleWare, AI Orders, and Orders IO live at produce, foodservice, and food-tech industry events.", href: "trade-shows.html" }
        ]},
        { h: "Community", items: [
          { t: "Customer Stories", d: "Real accounts from partners like Coast Citrus Distributors and Schoenmann Produce on scaling their business with GrubMarket.", href: "customers.html" },
          { t: "Community Hub",    d: "Share feedback, join the customer product council, and connect with other grocers, growers, and distributors on the platform.", href: "community.html" },
          { t: "Sustainability",   d: "The Sustainable California initiative has sponsored 230,000+ trees with One Tree Planted and funded organic certification through CCOF.", href: "sustainability.html" }
        ]}
      ],
      featured: { tag: "Newsroom", img: "bg3.jpg", href: "article-schoenmann.html", linkText: "Read the story →",
        quote: "Joining GrubMarket reflects an important moment in the continued evolution of Schoenmann Produce.",
        name: "Mark Steakley", role: "President, Schoenmann Produce" }
    },

    { label: "Company",
      intro: { eyebrow: "Company", text: "Founded in 2014, GrubMarket is the largest private food technology company in the U.S. — and we're just getting started." },
      groups: [
        { h: "About", items: [
          { t: "Who We Are",         d: "Founded in 2014, GrubMarket now operates across 15 states and provinces as the largest private food technology company in the U.S.", href: "about.html" },
          { t: "Leadership Team",    d: "Led by founder & CEO Mike Xu and Chief Software Product Officer Genevieve Wang, building the platform behind a decade of acquisitions.", href: "leadership.html" },
          { t: "Awards & Accolades", d: "TIME100 Companies Industry Leaders, CNBC Disruptor 50 for three straight years (2023–2025), and the Shelby Report's Sustainability award.", href: "awards.html" }
        ]},
        { h: "Connect", items: [
          { t: "Investor Relations", d: "See GrubMarket's $2.4B revenue, $4.5B valuation, Series H round, financial dashboard, filings, and how to request the investor kit.", href: "investors.html" },
          { t: "Careers",            d: "Open roles in engineering, AI, operations, and sales — join the team behind a decade of acquisitions and a fast-growing AI platform.", href: "careers.html" },
          { t: "Contact",            d: "Tell us who you are — grocer, grower, distributor, investor, or press — and we'll route you to the right team.", href: "contact.html" }
        ]}
      ],
      featured: { tag: "From our CEO", img: "GettyImages-1182645061SMALL.jpg", href: "leadership.html", linkText: "Meet the team →",
        quote: "Our mission is to digitally transform the food supply chain through AI, eCommerce, and vertical Software-as-a-Service — driven by our team's relentless pursuit of operational excellence and sustainable growth.",
        name: "Mike Xu", role: "Founder & CEO, GrubMarket" }
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
      '<div class="mega-featured">' +
        '<span class="mf-img" style="background-image:url(\'' + IMG + f.img + '\')"></span>' +
        '<div class="mf-body">' +
          '<span class="mf-tag">' + f.tag + '</span>' +
          '<span class="mf-quotemark" aria-hidden="true">&ldquo;</span>' +
          '<blockquote class="mf-quote">' + f.quote + '</blockquote>' +
          '<span class="mf-name">' + f.name + '</span>' +
          '<span class="mf-role">' + f.role + '</span>' +
          '<a class="mf-link" href="' + f.href + '">' + f.linkText + '</a>' +
        '</div></div>'
    ) : "";

    var intro = entry.intro ? (
      '<div class="mega-intro"><span class="mi-eyebrow">' + entry.intro.eyebrow + '</span>' +
        '<p class="mi-text">' + entry.intro.text + '</p></div>'
    ) : "";

    var panelId = "mega-" + idx;
    return '<div class="dropdown">' +
      '<button class="nav-trigger" aria-haspopup="true" aria-expanded="false" aria-controls="' + panelId + '">' +
        entry.label + ' <span class="chev" aria-hidden="true"></span></button>' +
      '<div class="mega" id="' + panelId + '" role="menu" aria-label="' + entry.label + '">' +
        '<div class="mega-inner">' +
          '<div class="mega-main">' + intro + '<div class="mega-groups">' + groups + '</div></div>' + featured +
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
      // A click is always preceded by the mouse moving onto the trigger,
      // which already opens it via mouseenter/CSS :hover — so a click
      // should just keep it open (never toggle it closed on the way in).
      e.stopPropagation();
      openDrop(d);
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

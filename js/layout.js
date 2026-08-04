/* ============================================================
   Shared layout: header (5 mega-dropdowns) + footer.
   Injected on every page so navigation stays consistent and DRY.
   Structure/interaction pattern modeled on Manhattan Associates'
   mega-menu; branding/design tokens are GrubMarket's own.
   ============================================================ */
(function () {
  var LOGO   = "assets/icons/gm-logo-black.svg";
  var LOGO_W = "assets/icons/gm-logo-white.svg";
  var IMG    = "assets/img/gm/";   // self-hosted; no dependency on grubmarket.com

  // ---- navigation model: 5 top-level dropdowns, each with grouped
  //      subsections (like Manhattan's mega-menus) + a featured card ----
  var NAV = [
    { label: "Tech",
      intro: { eyebrow: "Tech", text: "One connected system for ordering, running, and getting paid — every tool built specifically for fresh, perishable food." },
      groups: [
        { h: "ERP & Ordering", items: [
          { t: "Enterprise AI",        d: "Eight connected modules, one login.", href: "grubos.html" },
          { t: "ERP Software",  d: "WholesaleWare cloud ERP for distributors.", href: "software.html" },
          { t: "WholesaleWare Login", d: "Sign in to the live platform.", href: "https://erp.wholesaleware.com/#/" },
          { t: "Orders IO",     d: "Custom-branded ordering app for your buyers.", href: "orders-io.html" }
        ]},
        { h: "AI & Payments", items: [
          { t: "GrubAssist", d: "AI assistant plus 24/7 order capture.", href: "enterprise-ai.html" },
          { t: "GrubPay",       d: "ACH and card payments in one flow.", href: "grubpay.html" }
        ]}
      ],
      featured: { tag: "Tech", img: "assets/img/remote/unsplash-1551288049-bebda4e38f71.jpg", href: "grubos.html", linkText: "Explore Enterprise AI →",
        quote: "We focused on our customers' real challenges and delivered powerful solutions that deliver immediate, positive impact to their businesses.",
        name: "Genevieve Wang", role: "Chief Software Product Officer, GrubMarket" }
    },

    { label: "Buy & Sell",
      intro: { eyebrow: "Buy & Sell", text: "Buy, sell, and deliver fresh food through a nationwide network — exclusive wholesale pricing and reliable fulfillment, all in one place." },
      groups: [
        { h: "Buy", items: [
          { t: "Buy Wholesale",  d: "Source at exclusive wholesale prices.", href: "wholesale.html" },
          { t: "Find a Wholesaler", d: "See our coverage state by state.", href: "find-a-wholesaler.html" },
          { t: "Product Catalog", d: "Browse every category we carry.", href: "catalog.html" }
        ]},
        { h: "Sell", items: [
          { t: "Sell Your Harvest",      d: "Reach more buyers and get paid on time.", href: "growers.html" }
        ]},
        { h: "Home & Office Delivery", items: [
          { t: "How delivery works", d: "Farm-fresh delivery to your home or office.", href: "delivery.html" },
          { t: "Good Eggs",    href: "https://www.goodeggs.com/home" },
          { t: "SPUD",         href: "https://www.spud.ca/" },
          { t: "FreshGOGO",    href: "https://www.freshgogo.com/?language=en" },
          { t: "DO Organics",  href: "https://doorganics.grubmarket.com/" }
        ]}
      ],
      featured: { tag: "Buy & Sell", img: "boxes.jpg", href: "wholesale.html", linkText: "Buy wholesale →",
        quote: "Our ability to offer the finest quality produce year after year is powered by our investments in world-class digital transformation.",
        name: "Carole Shandler", role: "President, Shapiro-Gilman-Shandler at GrubMarket" }
    },

    { label: "Who We Serve",
      intro: { eyebrow: "Who We Serve", text: "Grower or grocer, distributor or family — GrubMarket meets you where you are in the food supply chain." },
      groups: [
        { h: "Businesses", items: [
          { t: "Grocers & Restaurants",     d: "Stock shelves and menus at wholesale.", href: "grocers.html" },
          { t: "Distributors & Wholesalers", d: "Run your whole operation on WholesaleWare.", href: "distributors.html" }
        ]},
        { h: "Growers & Consumers", items: [
          { t: "Growers & Farmers", d: "Reach more buyers, get paid reliably.", href: "growers.html" },
          { t: "Home & Office",     d: "Fresh groceries delivered by a local hub.", href: "delivery.html" }
        ]}
      ],
      featured: { tag: "Partner voice", img: "partner-voice.png", href: "customers.html", linkText: "Read customer stories →",
        quote: "GrubMarket's commitment to AI aligns perfectly with our vision to drive future growth through technology.",
        name: "Isabel Freeland", role: "President & CEO, Coast Citrus Distributors" }
    },

    { label: "News",
      intro: { eyebrow: "News", text: "News, customer stories, and events from across the food supply chain — three years of insight, all in one place." },
      groups: [
        { h: "News & Events", items: [
          { t: "In the News", d: "Product news and company milestones.", href: "blog.html" },
          { t: "Events",      d: "Webcasts, summits, and investor days.", href: "events.html" },
          { t: "Trade Shows", d: "Where to meet us on the floor.", href: "trade-shows.html" }
        ]},
        { h: "Community", items: [
          { t: "Customer Stories", d: "How partners grow with GrubMarket.", href: "customers.html" },
          { t: "Community Hub",    d: "Share feedback and connect with peers.", href: "community.html" },
          { t: "Sustainability",   d: "Trees planted and organic certification.", href: "sustainability.html" }
        ]}
      ],
      featured: { tag: "In the News", img: "news-bg.jpg", href: "article-schoenmann.html", linkText: "Read the story →",
        quote: "Joining GrubMarket reflects an important moment in the continued evolution of Schoenmann Produce.",
        name: "Mark Steakley", role: "President, Schoenmann Produce" }
    },

    { label: "Company",
      intro: { eyebrow: "Company", text: "Founded in 2014, GrubMarket is the largest private food technology company in the U.S. — and we're just getting started." },
      groups: [
        { h: "About", items: [
          { t: "Who We Are",         d: "Founded in 2014, now across 15 states.", href: "about.html" },
          { t: "Leadership Team",    d: "The people behind the platform.", href: "leadership.html" },
          { t: "Recognition", d: "TIME100, CNBC Disruptor 50, and more.", href: "recognition.html" }
        ]},
        { h: "Connect", items: [
          { t: "Investor Relations", d: "Revenue, funding, filings, and contact.", href: "investors.html" },
          { t: "Careers",            d: "Open roles across the company.", href: "careers.html" },
          { t: "Contact",            d: "Tell us who you are and we'll route you.", href: "contact.html" }
        ]}
      ],
      featured: { tag: "From our CEO", img: "assets/img/remote/unsplash-1521737604893-d14cc237f11d.jpg", href: "leadership.html", linkText: "Meet the team →",
        quote: "Our mission is to digitally transform the food supply chain through AI, eCommerce, and vertical Software-as-a-Service.",
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
                 (it.d ? '<span class="m-d">' + it.d + '</span>' : '') + '</a>';
      }).join("");
      return '<div class="mega-group"><h4>' + g.h + '</h4>' + links + '</div>';
    }).join("");
    // three groups would otherwise wrap to a second row and make the panel
    // too tall for shorter laptop screens — give them their own column each
    var groupCols = entry.groups.length >= 3 ? " cols-3" : "";

    var f = entry.featured;
    var featured = f ? (
      '<div class="mega-featured">' +
        '<span class="mf-img" style="background-image:url(\'' + (/^(https?:|assets\/)/.test(f.img) ? f.img : IMG + f.img) + '\')"></span>' +
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
          '<div class="mega-main">' + intro + '<div class="mega-groups' + groupCols + '">' + groups + '</div></div>' + featured +
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
    }).join("") + '<a class="mp-search" href="search.html"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg> Search the site</a>' +
      '<a class="btn solid" href="wholesale.html">Buy Wholesale</a>';
  }

  var header =
    '<a class="skip-link" href="#main">Skip to content</a>' +
    '<header class="site-header" id="siteHeader"><div class="wrap">' +
      '<a class="brand" href="index.html" aria-label="GrubMarket home">' +
        // the dark wordmark disappears on a dark header, so serve the white one there
        '<picture><source media="(prefers-color-scheme: dark)" srcset="' + LOGO_W + '" />' +
        '<img src="' + LOGO + '" alt="GrubMarket" width="284" height="54"/></picture></a>' +
      '<nav class="nav" id="nav" aria-label="Primary">' + navHTML() +
        '<a class="nav-search" href="search.html" aria-label="Search the site"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg></a>' +
        '<a class="btn solid sm nav-cta" href="wholesale.html">Buy Wholesale</a>' +
      '</nav>' +
      '<button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
    '</div></header>' +
    '<div class="mobile-panel" id="mobilePanel">' + mobileLinks() + '</div>';

  var footer =
    '<footer class="footer"><div class="wrap"><div class="cols">' +
      '<div><img class="logo" src="' + LOGO_W + '" alt="GrubMarket" width="225" height="41"/>' +
        '<p class="blurb">Digitally transforming the American food supply chain industry — wholesale, software, AI, and delivery in one network.</p></div>' +
      '<div><h5>Buy &amp; Sell</h5><a href="wholesale.html">Buy Wholesale</a><a href="catalog.html">Product Catalog</a><a href="growers.html">Sell Your Harvest</a><a href="delivery.html">Home &amp; Office Delivery</a></div>' +
      '<div><h5>Tech</h5><a href="grubos.html">Enterprise AI</a><a href="software.html">ERP Software</a><a href="orders-io.html">Orders IO</a><a href="enterprise-ai.html">GrubAssist</a></div>' +
      '<div><h5>News</h5><a href="blog.html">In the News</a><a href="events.html">Events</a><a href="customers.html">Customer Stories</a><a href="sustainability.html">Sustainability</a></div>' +
      '<div><h5>Company</h5><a href="leadership.html">Leadership</a><a href="recognition.html">Recognition</a><a href="careers.html">Careers</a><a href="investors.html">Investor Relations</a></div>' +
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

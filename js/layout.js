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
      featured: { tag: "Platform", img: "farm_gpt_carousel_scaled628x1200.png", href: "grubos.html", linkText: "Explore the platform →",
        quote: "We focused on our customers' real challenges and delivered powerful solutions that deliver immediate, positive impact to their businesses.",
        name: "Genevieve Wang", role: "Chief Software Product Officer, GrubMarket" }
    },

    { label: "Marketplace",
      intro: { eyebrow: "The Marketplace", text: "Buy, sell, and deliver fresh food through a nationwide network — exclusive pricing and reliable fulfillment, all on one platform." },
      groups: [
        { h: "Buy", items: [
          { t: "Buy Wholesale",  d: "B2B marketplace across the U.S. & Canada", href: "wholesale.html" },
          { t: "Product Catalog", d: "Browse quality products by category",     href: "catalog.html" }
        ]},
        { h: "Sell & Deliver", items: [
          { t: "Sell Your Harvest",      d: "For growers & farmers",           href: "growers.html" },
          { t: "Home & Office Delivery", d: "Farm-fresh food, delivered (B2C)", href: "delivery.html" }
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
          { t: "Grocers & Restaurants",     d: "Source quality products at low prices", href: "grocers.html" },
          { t: "Distributors & Wholesalers", d: "Run your operation on one platform",    href: "distributors.html" }
        ]},
        { h: "Growers & Consumers", items: [
          { t: "Growers & Farmers", d: "Reach more buyers, get paid on time", href: "growers.html" },
          { t: "Home & Office",     d: "Farm-fresh food delivered to you",    href: "delivery.html" }
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
      featured: { tag: "Newsroom", img: "bg3.jpg", href: "article-schoenmann.html", linkText: "Read the story →",
        quote: "Joining GrubMarket reflects an important moment in the continued evolution of Schoenmann Produce.",
        name: "Mark Steakley", role: "President, Schoenmann Produce" }
    },

    { label: "Company",
      intro: { eyebrow: "Company", text: "Founded in 2014, GrubMarket is the largest private food technology company in the U.S. — and we're just getting started." },
      groups: [
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

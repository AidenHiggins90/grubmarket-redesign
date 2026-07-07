/* Find a Wholesaler — state search + region map + detail panel.
   Only real, currently active GrubMarket companies are named; every
   other state gets an honest "reachable via our network" message
   instead of an invented distributor name. */
(function () {
  var page = document.getElementById("finderMap");
  if (!page) return;

  var ICON_BUILDING = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1"/></svg>';
  var ICON_TRUCK    = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>';

  // ---- data: 50 states + DC, grouped into the 4 standard U.S. Census regions ----
  var REGIONS = [
    { h: "Northeast", states: ["CT","ME","MA","NH","RI","VT","NJ","NY","PA"] },
    { h: "Midwest",   states: ["IL","IN","MI","OH","WI","IA","KS","MN","MO","NE","ND","SD"] },
    { h: "South",     states: ["DE","FL","GA","MD","NC","SC","VA","WV","DC","AL","KY","MS","TN","AR","LA","OK","TX"] },
    { h: "West",      states: ["AZ","CO","ID","MT","NV","NM","UT","WY","AK","CA","HI","OR","WA"] }
  ];

  var NAMES = {
    AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",
    DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",
    IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",
    MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",
    NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",
    OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",
    TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",
    WI:"Wisconsin",WY:"Wyoming"
  };

  // Real, currently-active named companies only (sourced from GrubMarket's own
  // acquisition announcements). Nothing here is invented or discontinued.
  var PARTNERS = {
    TX: [
      { name: "Schoenmann Produce", meta: "Houston, TX · Gulf Coast distributor since 1910", ico: ICON_BUILDING },
      { name: "Coast Citrus Distributors", meta: "McAllen, TX · GrubMarket's largest acquisition to date", ico: ICON_TRUCK }
    ],
    CA: [
      { name: "Coast Citrus Distributors", meta: "San Diego & Union City, CA facilities", ico: ICON_TRUCK },
      { name: "Good Eggs", meta: "Home & office delivery hub", ico: ICON_BUILDING },
      { name: "FreshGOGO", meta: "Home & office delivery hub", ico: ICON_BUILDING },
      { name: "DO Organics", meta: "Home & office delivery hub", ico: ICON_BUILDING }
    ],
    AZ: [ { name: "Delta Fresh Produce", meta: "Arizona produce distributor, acquired 2025", ico: ICON_TRUCK } ],
    FL: [ { name: "Coast Citrus Distributors", meta: "Princeton, FL facility", ico: ICON_TRUCK } ]
  };

  // States GrubMarket operates in directly, per its own "Who We Are" copy,
  // without a specific named distributor to list here yet.
  var OPERATING = ["CT","GA","MI","NY","NJ","MO","MA","NV","OR","PA","WA"];

  var ALL_ABBR = Object.keys(NAMES).sort(function (a, b) { return NAMES[a].localeCompare(NAMES[b]); });

  // ---- load the real (public-domain) US states map and wire it up ----
  fetch("assets/img/us-states-map.svg")
    .then(function (r) { return r.text(); })
    .then(function (svgText) {
      // strip the file's own <style> block — we style states with our own CSS
      svgText = svgText.replace(/<style[\s\S]*?<\/style>/, "");
      // strip the root-level <title> — it renders as a native tooltip that
      // covers the map on hover; per-state <title> tags inside each path
      // are kept, since those give real accessible names per state.
      svgText = svgText.replace(/<title>Blank map[^<]*<\/title>\s*/, "");
      // make it scale responsively instead of a fixed pixel size
      svgText = svgText.replace('<svg xmlns="http://www.w3.org/2000/svg" width="959" height="593">',
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 959 593" id="usMapSvg">');
      page.innerHTML = svgText;

      var svg = document.getElementById("usMapSvg");
      if (!svg) return;

      // pass 1: classify every state and wire up interaction — no layout
      // reads here, since interleaving getBBox() with style/class changes
      // was corrupting later elements' computed fill in some browsers.
      var partnerEls = [];
      ALL_ABBR.forEach(function (abbr) {
        var el = svg.querySelector("." + abbr.toLowerCase());
        if (!el) return;
        el.classList.add("st");
        el.setAttribute("data-abbr", abbr);
        el.setAttribute("tabindex", "0");
        el.setAttribute("role", "button");
        el.setAttribute("aria-label", NAMES[abbr]);
        if (PARTNERS[abbr]) {
          el.classList.add("has-partner");
          partnerEls.push(el);
        }
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); showState(abbr); }
        });
      });

      // pass 2: now that all classes are applied, read layout (getBBox)
      // and drop a marker dot at each partner state's visual center.
      partnerEls.forEach(function (el) {
        var box = el.getBBox();
        var dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", box.x + box.width / 2);
        dot.setAttribute("cy", box.y + box.height / 2);
        dot.setAttribute("r", 4.5);
        dot.setAttribute("class", "map-partner-dot");
        dot.setAttribute("pointer-events", "none");
        svg.appendChild(dot);
      });
    });

  // ---- render alphabetical list ----
  var listEl = document.getElementById("finderList");
  function renderList(filter) {
    var q = (filter || "").trim().toLowerCase();
    var items = ALL_ABBR.filter(function (abbr) {
      if (!q) return true;
      if (NAMES[abbr].toLowerCase().indexOf(q) > -1 || abbr.toLowerCase() === q) return true;
      var partners = PARTNERS[abbr] || [];
      return partners.some(function (p) { return p.name.toLowerCase().indexOf(q) > -1; });
    });
    if (!items.length) {
      listEl.innerHTML = '<li class="fl-empty">No states or companies match "' + filter + '".</li>';
      return;
    }
    listEl.innerHTML = items.map(function (abbr) {
      var hasPartner = PARTNERS[abbr] ? " has-partner" : "";
      return '<li><button data-abbr="' + abbr + '" type="button" class="' + hasPartner.trim() + '">' +
               NAMES[abbr] + '<span class="fl-dot"></span><span class="chev"></span></button></li>';
    }).join("");
  }
  renderList("");

  // ---- detail panel ----
  var detail = document.getElementById("finderDetail");
  function showState(abbr) {
    var name = NAMES[abbr];
    var partners = PARTNERS[abbr];
    var html = '<span class="eyebrow">' + name + '</span>';
    if (partners) {
      html += '<h3>Active GrubMarket partners in ' + name + '</h3>';
      html += partners.map(function (p) {
        return '<div class="fd-partner"><span class="fd-ico">' + p.ico + '</span>' +
                 '<span><span class="fd-name">' + p.name + '</span><span class="fd-meta">' + p.meta + '</span></span></div>';
      }).join("");
    } else if (OPERATING.indexOf(abbr) > -1) {
      html += '<h3>GrubMarket operates in ' + name + '</h3>' +
              '<p style="margin:6px 0 0">' + name + ' is one of GrubMarket\'s active operating states. A named regional partner isn\'t listed here yet — <a href="contact.html?role=grocer">reach out</a> and we\'ll connect you directly.</p>';
    } else {
      html += '<h3>Reach ' + name + ' through our network</h3>' +
              '<p style="margin:6px 0 0">GrubMarket ships wholesale nationwide. We don\'t have a named regional partner in ' + name + ' listed yet, but our marketplace can still get product to you here.</p>';
    }
    html += '<p style="margin-top:16px"><a class="btn link" href="wholesale.html">Buy Wholesale <svg class="arr" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></p>';
    detail.innerHTML = html;

    document.querySelectorAll(".finder-map .st, .finder-list button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-abbr") === abbr);
    });
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-abbr]");
    if (btn) showState(btn.getAttribute("data-abbr"));
  });

  // ---- search ----
  var search = document.getElementById("finderSearch");
  var clearBtn = document.getElementById("finderClear");
  search.addEventListener("input", function () { renderList(search.value); });
  clearBtn.addEventListener("click", function () { search.value = ""; renderList(""); search.focus(); });
})();

/* SEC Filings table — client-side filter by form type, year, and keyword. */
(function () {
  var table = document.getElementById("filingTable");
  if (!table) return;

  var typeSel = document.getElementById("ffType");
  var yearSel = document.getElementById("ffYear");
  var keyword = document.getElementById("ffKeyword");
  var resetBtn = document.getElementById("ffReset");
  var empty = document.getElementById("ftEmpty");
  var countEl = document.getElementById("ftCount");
  var rows = [].slice.call(table.querySelectorAll("tbody tr"));
  var total = rows.length;

  function applyFilters() {
    var type = typeSel.value;
    var year = yearSel.value;
    var q = keyword.value.trim().toLowerCase();
    var visible = 0;

    rows.forEach(function (row) {
      var matchesType = !type || row.getAttribute("data-form") === type;
      var matchesYear = !year || row.getAttribute("data-year") === year;
      var matchesKeyword = !q || row.getAttribute("data-desc").indexOf(q) > -1;
      var show = matchesType && matchesYear && matchesKeyword;
      row.style.display = show ? "" : "none";
      if (show) visible++;
    });

    empty.style.display = visible === 0 ? "" : "none";
    countEl.textContent = visible;
  }

  typeSel.addEventListener("change", applyFilters);
  yearSel.addEventListener("change", applyFilters);
  keyword.addEventListener("input", applyFilters);
  resetBtn.addEventListener("click", function () {
    typeSel.value = ""; yearSel.value = ""; keyword.value = "";
    applyFilters();
  });

  countEl.textContent = total;
})();

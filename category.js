(function () {
  var programs = window.SUPPORT_PROGRAMS || [];
  var category = document.body.getAttribute("data-category");
  var list = document.querySelector("[data-category-list]");
  var count = document.querySelector("[data-category-count]");
  var search = document.querySelector("[data-category-search]");
  var chips = document.querySelectorAll("[data-filter-status]");

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function resolveLink(link) {
    var value = String(link || "#");
    if (/^https?:\/\//.test(value) || value.charAt(0) === "#") return value;
    if (window.location.pathname.indexOf("/categories/") > -1 && value.indexOf("./") === 0) {
      return "." + value;
    }
    return value;
  }

  function normalizeSearch(value) {
    return String(value || "").toLowerCase().replace(/\s+/g, "");
  }

  function card(program) {
    return [
      '<article class="program-card category-program-card">',
      "  <div>",
      '    <span class="badge ' + escapeHtml(program.categoryTone) + '">' + escapeHtml(program.category) + "</span>",
      '    <span class="badge ' + escapeHtml(program.statusTone) + '">' + escapeHtml(program.status) + "</span>",
      '    <h3><a href="' + escapeHtml(resolveLink(program.link)) + '">' + escapeHtml(program.title) + "</a></h3>",
      "    <dl>",
      "      <div><dt>" + escapeHtml(program.periodLabel) + "</dt><dd>" + escapeHtml(program.period) + "</dd></div>",
      "      <div><dt>대상</dt><dd>" + escapeHtml(program.target) + "</dd></div>",
      "      <div><dt>지원금</dt><dd>" + escapeHtml(program.amount) + "</dd></div>",
      '      <div><dt>출처</dt><dd><a class="source-link" href="' + escapeHtml(program.sourceUrl) + '" target="_blank" rel="noopener">' + escapeHtml(program.sourceName) + "</a></dd></div>",
      "    </dl>",
      "  </div>",
      '  <button class="save-button" type="button" aria-label="' + escapeHtml(program.title) + ' 저장">♡</button>',
      "</article>"
    ].join("");
  }

  function currentStatus() {
    var active = document.querySelector("[data-filter-status].active");
    return active ? active.getAttribute("data-filter-status") : "전체";
  }

  function render() {
    if (!list) return;
    var keyword = search ? search.value.trim().toLowerCase() : "";
    var normalizedKeyword = normalizeSearch(keyword);
    var status = currentStatus();
    var items = programs.filter(function (program) {
      var categoryMatch = category === "전체" || program.category === category;
      var statusMatch = status === "전체" || program.status === status;
      var haystack = [
        program.title,
        program.category,
        program.status,
        program.target,
        program.amount,
        program.sourceName
      ].join(" ").toLowerCase();
      var keywordMatch = !keyword || haystack.indexOf(keyword) > -1 || normalizeSearch(haystack).indexOf(normalizedKeyword) > -1;
      return categoryMatch && statusMatch && keywordMatch;
    }).sort(function (a, b) {
      return String(b.updatedAt || "").localeCompare(String(a.updatedAt || ""));
    });

    if (count) count.textContent = items.length + "건";
    list.innerHTML = items.length ? items.map(card).join("") : '<p class="empty-message">조건에 맞는 지원사업이 없습니다. 공식 공고가 확인되면 업데이트됩니다.</p>';
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (item) { item.classList.remove("active"); });
      chip.classList.add("active");
      render();
    });
  });

  if (search) search.addEventListener("input", render);
  render();
}());

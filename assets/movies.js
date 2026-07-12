// movies.js — renders the film archive table with search / filter / sort
// and a detail drawer. Reads window.MOVIES (see movies-data.js).
// Vanilla JS, no dependencies.

(function () {
  "use strict";

  var MOVIES = Array.isArray(window.MOVIES) ? window.MOVIES : [];

  // Restrained genre → category-tint mapping (falls back to neutral).
  var GENRE_TINT = {
    "sci-fi": "science", "science fiction": "science", "documentary": "advice",
    "comedy": "nonfiction", "romance": "nonfiction", "horror": "fiction",
    "thriller": "fiction", "drama": "neutral", "animation": "science",
    "adventure": "advice",
  };

  var els = {};
  var state = { q: "", genre: "all", status: "all", sort: "year-desc" };
  var lastFocused = null;

  function tintFor(genre) {
    return GENRE_TINT[(genre || "").toLowerCase()] || "neutral";
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // ---- Filtering / sorting ----------------------------------------
  function apply() {
    var q = state.q.trim().toLowerCase();
    var rows = MOVIES.filter(function (m) {
      if (state.status !== "all" && m.status !== state.status) return false;
      if (state.genre !== "all" &&
        !m.genre.map(String).map(function (g) { return g.toLowerCase(); })
          .includes(state.genre.toLowerCase())) return false;
      if (!q) return true;
      var hay = [m.title, m.director, m.note, m.genre.join(" "), m.tags.join(" ")]
        .join(" ").toLowerCase();
      return hay.indexOf(q) !== -1;
    });

    rows.sort(function (a, b) {
      switch (state.sort) {
        case "title-asc": return a.title.localeCompare(b.title);
        case "year-asc": return a.year - b.year;
        case "year-desc": return b.year - a.year;
        case "rating-desc": return (b.rating || 0) - (a.rating || 0);
        case "rating-asc": return (a.rating || 0) - (b.rating || 0);
        default: return 0;
      }
    });
    return rows;
  }

  function render() {
    var rows = apply();
    els.count.textContent = rows.length + (rows.length === 1 ? " film" : " films");

    if (!rows.length) {
      els.list.innerHTML = "";
      els.empty.hidden = false;
      return;
    }
    els.empty.hidden = true;

    els.list.innerHTML = rows.map(function (m) {
      var primaryGenre = m.genre[0] || "—";
      var ratingCell = m.rating == null
        ? '<span class="rating rating--empty" aria-label="Unrated">–</span>'
        : '<span class="rating" aria-label="Rating ' + m.rating + ' of 10">' + m.rating + '</span>';
      var tags = m.tags.slice(0, 2).map(function (t) {
        return '<span class="tag">' + esc(t) + '</span>';
      }).join("");
      var extra = m.tags.length > 2 ? '<span class="tag">+' + (m.tags.length - 2) + '</span>' : "";

      return (
        '<button class="archive__row" type="button" data-id="' + esc(m.id) + '" aria-expanded="false">' +
        '<span class="cell-title">' + esc(m.title) + '</span>' +
        '<span class="cell-genre"><span class="pill pill--cat pill--' + tintFor(primaryGenre) + '">' + esc(primaryGenre.toLowerCase()) + '</span></span>' +
        '<span class="cell-year">' + m.year + '</span>' +
        '<span class="cell-dir col-hide-md">' + esc(m.director) + '</span>' +
        '<span class="cell-rating-wrap">' + ratingCell + '</span>' +
        '<span class="cell-tags">' + tags + extra + '</span>' +
        '</button>'
      );
    }).join("");
  }

  // ---- Drawer ------------------------------------------------------
  function openDrawer(id, triggerEl) {
    var m = MOVIES.find(function (x) { return x.id === id; });
    if (!m) return;
    lastFocused = triggerEl || document.activeElement;

    els.drawerTitle.textContent = m.title;
    els.drawerMeta.innerHTML =
      '<span class="pill pill--cat pill--' + tintFor(m.genre[0]) + '">' + esc((m.genre[0] || "").toLowerCase()) + '</span>' +
      '<span>' + m.year + '</span><span>·</span>' +
      '<span>' + fmtRuntime(m.runtime) + '</span><span>·</span>' +
      '<span>' + esc(m.director) + '</span>';

    if (m.poster) {
      els.drawerPoster.hidden = false;
      els.drawerPoster.innerHTML = '<img src="' + esc(m.poster) + '" alt="Poster or still from ' + esc(m.title) + '" loading="lazy" />';
    } else {
      els.drawerPoster.hidden = true;
      els.drawerPoster.innerHTML = "";
    }

    els.drawerFields.innerHTML =
      field("Rating", m.rating == null ? "—" : m.rating + " / 10") +
      field("Watched", m.watched || "—") +
      field("Status", m.status === "watchlist" ? "Watchlist" : "Watched") +
      field("Runtime", fmtRuntime(m.runtime)) +
      field("Year", String(m.year)) +
      field("Genre", esc(m.genre.join(", ")));

    els.drawerReview.textContent = m.note && m.note.trim() ? m.note : "No note yet.";
    els.drawerTags.innerHTML = m.tags.length
      ? m.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("")
      : '<span class="tag">no tags</span>';

    // mark the active row
    var row = els.list.querySelector('[data-id="' + cssEscape(id) + '"]');
    if (row) row.setAttribute("aria-expanded", "true");

    els.backdrop.setAttribute("data-open", "");
    els.drawer.setAttribute("data-open", "");
    els.drawer.setAttribute("aria-hidden", "false");
    els.drawerClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    els.backdrop.removeAttribute("data-open");
    els.drawer.removeAttribute("data-open");
    els.drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    els.list.querySelectorAll('[aria-expanded="true"]').forEach(function (r) {
      r.setAttribute("aria-expanded", "false");
    });
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }

  function isOpen() { return els.drawer.hasAttribute("data-open"); }

  function field(label, value) {
    return '<div><div class="drawer__field-label">' + label + '</div>' +
      '<div class="drawer__field-value">' + value + '</div></div>';
  }
  function fmtRuntime(min) {
    if (!min) return "—";
    var h = Math.floor(min / 60), m = min % 60;
    return h ? (h + "h" + (m ? m + "m" : "")) : (m + "m");
  }
  function cssEscape(s) { return String(s).replace(/"/g, '\\"'); }

  // ---- Filter chips ------------------------------------------------
  function buildFilters() {
    var genres = {};
    MOVIES.forEach(function (m) { m.genre.forEach(function (g) { genres[g] = true; }); });
    var genreList = Object.keys(genres).sort();

    var html = '<span class="visually-hidden" id="genre-filter-label">Filter by genre</span>';
    html += chip("all", "All", state.genre === "all", "genre");
    genreList.forEach(function (g) {
      html += chip(g, g, state.genre === g, "genre");
    });
    els.filters.innerHTML = html;

    els.status.innerHTML =
      chip("all", "All", state.status === "all", "status") +
      chip("watched", "Watched", state.status === "watched", "status") +
      chip("watchlist", "Watchlist", state.status === "watchlist", "status");
  }
  function chip(value, label, pressed, group) {
    return '<button class="chip" type="button" data-group="' + group + '" data-value="' + esc(value) +
      '" aria-pressed="' + (pressed ? "true" : "false") + '">' + esc(label) + '</button>';
  }

  // ---- Wire up -----------------------------------------------------
  function init() {
    els.search = document.querySelector("[data-movie-search]");
    els.sort = document.querySelector("[data-movie-sort]");
    els.filters = document.querySelector("[data-movie-genres]");
    els.status = document.querySelector("[data-movie-status]");
    els.count = document.querySelector("[data-movie-count]");
    els.list = document.querySelector("[data-movie-list]");
    els.empty = document.querySelector("[data-movie-empty]");
    els.drawer = document.querySelector("[data-drawer]");
    els.backdrop = document.querySelector("[data-drawer-backdrop]");
    els.drawerTitle = document.querySelector("[data-drawer-title]");
    els.drawerMeta = document.querySelector("[data-drawer-meta]");
    els.drawerPoster = document.querySelector("[data-drawer-poster]");
    els.drawerFields = document.querySelector("[data-drawer-fields]");
    els.drawerReview = document.querySelector("[data-drawer-review]");
    els.drawerTags = document.querySelector("[data-drawer-tags]");
    els.drawerClose = document.querySelector("[data-drawer-close]");

    if (!els.list) return;

    buildFilters();
    render();

    els.search.addEventListener("input", function () { state.q = this.value; render(); });
    els.sort.addEventListener("change", function () { state.sort = this.value; render(); });

    document.addEventListener("click", function (e) {
      var chipEl = e.target.closest(".chip");
      if (chipEl) {
        var group = chipEl.dataset.group;
        state[group] = chipEl.dataset.value;
        buildFilters();
        render();
        return;
      }
      var row = e.target.closest(".archive__row");
      if (row) { openDrawer(row.dataset.id, row); return; }
      if (e.target === els.backdrop) closeDrawer();
    });

    els.drawerClose.addEventListener("click", closeDrawer);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { e.preventDefault(); closeDrawer(); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

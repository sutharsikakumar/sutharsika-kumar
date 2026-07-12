// books.js — renders the bookshelf (shelves + spines), an open-book
// transition, and a detail drawer. Reads window.BOOKS (see books-data.js).
// Mirrors the Movie Corner interaction pattern (overlay drawer) with a
// book-opening animation. Vanilla JS, no dependencies.

(function () {
  "use strict";

  var BOOKS = Array.isArray(window.BOOKS) ? window.BOOKS : [];

  // Named tints reuse the site's category palette; anything else is a
  // literal CSS colour.
  var TINT_VAR = {
    science: "var(--tag-science)",
    fiction: "var(--tag-fiction)",
    advice: "var(--tag-advice)",
    nonfiction: "var(--tag-nonfiction)",
    neutral: "var(--tag-neutral)",
  };

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var els = {};
  var lastFocused = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function spineColor(b) { return TINT_VAR[b.spine] || b.spine || "var(--tag-neutral)"; }
  function clamp(n, lo, hi) { return Math.max(lo, Math.min(hi, n)); }

  // ---- Shelves ------------------------------------------------------
  // Group books by their `shelf` index; any without one auto-flow into
  // rows of five so the arrangement stays intentional.
  function groupShelves() {
    var map = {}, order = [], auto = 0;
    BOOKS.forEach(function (b) {
      var s = (typeof b.shelf === "number") ? b.shelf : ("auto-" + Math.floor(auto++ / 5));
      if (!map[s]) { map[s] = []; order.push(s); }
      map[s].push(b);
    });
    order.sort(function (a, b) {
      var na = ("" + a).replace("auto-", ""), nb = ("" + b).replace("auto-", "");
      return (parseFloat(na) || 0) - (parseFloat(nb) || 0);
    });
    return order.map(function (k) { return map[k]; });
  }

  // ---- Spine component ---------------------------------------------
  function renderSpine(b) {
    var w = Math.round(clamp(b.width || 1, 0.7, 1.6) * 34);        // thickness px
    var h = Math.round(clamp(b.height || 1, 0.75, 1) * 216);        // height px
    var label = b.title + " by " + b.author +
      (b.rating != null ? ", rated " + b.rating + " out of 10" : "");
    var tipAuthor = b.author ? '<span class="book-spine__tip-author">' + esc(b.author) + '</span>' : "";

    if (b.lie) {
      return (
        '<button class="book-spine book-spine--flat" type="button" role="listitem" ' +
          'data-id="' + esc(b.id) + '" aria-label="' + esc(label) + '" ' +
          'style="--w:' + Math.round(h * 0.62) + 'px;--h:' + Math.max(26, Math.round(w * 0.9)) + 'px;background:' + spineColor(b) + ';">' +
          '<span class="book-spine__title">' + esc(b.title) + '</span>' +
          '<span class="book-spine__tip" aria-hidden="true"><span class="book-spine__tip-title">' + esc(b.title) + '</span>' + tipAuthor + '</span>' +
        '</button>'
      );
    }
    return (
      '<button class="book-spine" type="button" role="listitem" ' +
        'data-id="' + esc(b.id) + '" aria-label="' + esc(label) + '" ' +
        'style="--w:' + w + 'px;--h:' + h + 'px;background:' + spineColor(b) + ';">' +
        '<span class="book-spine__title">' + esc(b.title) + '</span>' +
        '<span class="book-spine__author">' + esc(b.author) + '</span>' +
        '<span class="book-spine__tip" aria-hidden="true"><span class="book-spine__tip-title">' + esc(b.title) + '</span>' + tipAuthor + '</span>' +
      '</button>'
    );
  }

  function renderShelf(books) {
    return '<div class="shelf"><div class="shelf__books" role="list">' +
      books.map(renderSpine).join("") +
      '</div><div class="shelf__ledge" aria-hidden="true"></div></div>';
  }

  function render() {
    if (!els.shelf) return;
    if (!BOOKS.length) {
      els.shelf.innerHTML = '<p class="state state--empty">No books on the shelf yet.</p>';
      return;
    }
    els.shelf.innerHTML = groupShelves().map(renderShelf).join("");
  }

  // ---- Open-book transition ----------------------------------------
  // A small book at the click origin swings open, then the drawer opens.
  function playOpen(b, done) {
    if (reduceMotion || !els.stage) { done(); return; }
    els.stage.innerHTML =
      '<div class="book-open" style="--spine:' + spineColor(b) + ';">' +
        '<div class="book-open__page"></div>' +
        '<div class="book-open__cover"></div>' +
      '</div>';
    els.stage.setAttribute("data-open", "");
    var node = els.stage.querySelector(".book-open");
    // next frame -> trigger the CSS animation
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { node.classList.add("is-open"); });
    });
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      done();
    }
    node.addEventListener("animationend", finish, { once: true });
    setTimeout(finish, 620); // fallback if animationend never fires
  }

  function clearStage() {
    if (!els.stage) return;
    els.stage.removeAttribute("data-open");
    els.stage.innerHTML = "";
  }

  // ---- Drawer -------------------------------------------------------
  function field(label, value) {
    return '<div><div class="drawer__field-label">' + label + '</div>' +
           '<div class="drawer__field-value">' + value + '</div></div>';
  }

  function fillDrawer(b) {
    els.title.textContent = b.title;
    els.meta.innerHTML =
      '<span>' + esc(b.author) + '</span><span>·</span>' +
      '<span>' + b.year + '</span>' +
      (b.read ? '<span>·</span><span>read ' + esc(b.read) + '</span>' : "");

    if (b.cover) {
      els.cover.hidden = false;
      els.cover.innerHTML = '<img src="' + esc(b.cover) + '" alt="Cover of ' + esc(b.title) + '" loading="lazy" />';
    } else {
      els.cover.hidden = true;
      els.cover.innerHTML = "";
    }

    els.fields.innerHTML =
      field("Rating", b.rating == null ? "—" : b.rating + " / 10") +
      field("Read", b.read ? esc(b.read) : "—") +
      field("Published", String(b.year)) +
      field("Author", esc(b.author));

    els.review.textContent = b.review && b.review.trim() ? b.review : "No thoughts written yet.";

    if (b.quote && b.quote.trim()) {
      els.quoteWrap.hidden = false;
      els.quote.textContent = "“" + b.quote + "”";
    } else {
      els.quoteWrap.hidden = true;
      els.quote.textContent = "";
    }

    if (b.notes && b.notes.trim()) {
      els.notesWrap.hidden = false;
      els.notes.textContent = b.notes;
    } else {
      els.notesWrap.hidden = true;
      els.notes.textContent = "";
    }

    els.tags.innerHTML = (b.themes && b.themes.length)
      ? b.themes.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join("")
      : '<span class="tag">no themes</span>';
  }

  function openDrawer(id, triggerEl) {
    var b = BOOKS.find(function (x) { return x.id === id; });
    if (!b) return;
    lastFocused = triggerEl || document.activeElement;
    if (triggerEl) triggerEl.setAttribute("aria-expanded", "true");

    playOpen(b, function () {
      clearStage();
      fillDrawer(b);
      els.backdrop.setAttribute("data-open", "");
      els.drawer.setAttribute("data-open", "");
      els.drawer.setAttribute("aria-hidden", "false");
      els.close.focus();
      document.body.style.overflow = "hidden";
    });
  }

  function closeDrawer() {
    els.backdrop.removeAttribute("data-open");
    els.drawer.removeAttribute("data-open");
    els.drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    els.shelf.querySelectorAll('[aria-expanded="true"]').forEach(function (r) {
      r.setAttribute("aria-expanded", "false");
    });
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }
  function isOpen() { return els.drawer.hasAttribute("data-open"); }

  // ---- Keyboard: roving arrows between spines -----------------------
  function onShelfKeydown(e) {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(e.key) === -1) return;
    var spines = Array.prototype.slice.call(els.shelf.querySelectorAll(".book-spine"));
    var i = spines.indexOf(document.activeElement);
    if (i === -1) return;
    e.preventDefault();
    var next = (e.key === "ArrowLeft" || e.key === "ArrowUp") ? i - 1 : i + 1;
    if (next < 0) next = spines.length - 1;
    if (next >= spines.length) next = 0;
    spines[next].focus();
  }

  // ---- Wire up ------------------------------------------------------
  function init() {
    els.shelf     = document.querySelector("[data-bookshelf]");
    els.stage     = document.querySelector("[data-book-stage]");
    els.drawer    = document.querySelector("[data-drawer]");
    els.backdrop  = document.querySelector("[data-drawer-backdrop]");
    els.title     = document.querySelector("[data-drawer-title]");
    els.meta      = document.querySelector("[data-drawer-meta]");
    els.cover     = document.querySelector("[data-drawer-cover]");
    els.fields    = document.querySelector("[data-drawer-fields]");
    els.review    = document.querySelector("[data-drawer-review]");
    els.quoteWrap = document.querySelector("[data-drawer-quote-wrap]");
    els.quote     = document.querySelector("[data-drawer-quote]");
    els.notesWrap = document.querySelector("[data-drawer-notes-wrap]");
    els.notes     = document.querySelector("[data-drawer-notes]");
    els.tags      = document.querySelector("[data-drawer-tags]");
    els.close     = document.querySelector("[data-drawer-close]");

    if (!els.shelf) return;
    render();

    els.shelf.addEventListener("click", function (e) {
      var spine = e.target.closest(".book-spine");
      if (spine) openDrawer(spine.dataset.id, spine);
    });
    els.shelf.addEventListener("keydown", onShelfKeydown);

    document.addEventListener("click", function (e) {
      if (e.target === els.backdrop) closeDrawer();
    });
    els.close.addEventListener("click", closeDrawer);
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

// books.js — renders the bookshelf (two flat shelves of uniform spines)
// and a detail drawer. Reads window.BOOKS (see books-data.js).
// Mirrors the Movie Corner interaction pattern (overlay drawer).
// Vanilla JS, no dependencies.

(function () {
  "use strict";

  var BOOKS = Array.isArray(window.BOOKS) ? window.BOOKS : [];

  // Every spine looks the same; the shelf it sits on is the only grouping.
  var SHELVES = [
    { key: "read", label: "Read", empty: "Nothing here yet." },
    { key: "to-read", label: "Want to read", empty: "Nothing on the stack." },
  ];

  var els = {};
  var lastFocused = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // A book counts as read unless it says otherwise (or has no read date).
  function shelfOf(b) {
    if (b.status === "to-read" || b.status === "read") return b.status;
    return b.read ? "read" : "to-read";
  }

  // ---- Rendering ----------------------------------------------------
  function renderSpine(b, i) {
    var label = b.title + " by " + b.author +
      (b.rating != null ? ", rated " + b.rating + " out of 10" : "");

    return (
      '<button class="book-spine" type="button" role="listitem" ' +
        'data-id="' + esc(b.id) + '" aria-expanded="false" aria-label="' + esc(label) + '" ' +
        'title="' + esc(label) + '" style="--i:' + i + ';">' +
        '<span class="book-spine__title">' + esc(b.title) + '</span>' +
        '<span class="book-spine__author">' + esc(b.author) + '</span>' +
      '</button>'
    );
  }

  function renderShelf(shelf) {
    var books = BOOKS.filter(function (b) { return shelfOf(b) === shelf.key; });
    var count = books.length + (books.length === 1 ? " book" : " books");
    var body = books.length
      ? '<div class="shelf__books" role="list">' + books.map(renderSpine).join("") + '</div>' +
        '<div class="shelf__ledge" aria-hidden="true"></div>'
      : '<p class="shelf__empty">' + shelf.empty + '</p>';

    return (
      '<section class="shelf" aria-label="' + shelf.label + '">' +
        '<h2 class="shelf__head">' + shelf.label +
          '<span class="shelf__count">' + count + '</span></h2>' +
        body +
      '</section>'
    );
  }

  function render() {
    if (!els.shelf) return;
    if (!BOOKS.length) {
      els.shelf.innerHTML = '<p class="state state--empty">No books on the shelf yet.</p>';
      return;
    }
    els.shelf.innerHTML = SHELVES.map(renderShelf).join("");
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

    fillDrawer(b);
    els.backdrop.setAttribute("data-open", "");
    els.drawer.setAttribute("data-open", "");
    els.drawer.setAttribute("aria-hidden", "false");
    els.close.focus();
    document.body.style.overflow = "hidden";
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

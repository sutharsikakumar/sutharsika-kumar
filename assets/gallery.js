// gallery.js — salon-wall gallery + accessible lightbox.
// Reads each `.art` trigger's data-* attributes; builds one lightbox with
// prev/next, arrow-key nav, Escape to close, and focus restore.
// Vanilla JS, no dependencies.

(function () {
  "use strict";

  var items = [];   // {src, title, medium, year, desc}
  var triggers = [];
  var current = -1;
  var lastFocused = null;
  var lb = {};

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function buildLightbox() {
    var el = document.createElement("div");
    el.className = "lightbox";
    el.setAttribute("data-gallery-lightbox", "");
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Artwork viewer");
    el.innerHTML =
      '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">×</button>' +
      '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous artwork">‹</button>' +
      '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next artwork">›</button>' +
      '<div class="lightbox__stage">' +
        '<img class="lightbox__img" alt="" />' +
        '<figcaption class="lightbox__caption"></figcaption>' +
      '</div>';
    document.body.appendChild(el);

    lb.root  = el;
    lb.img   = el.querySelector(".lightbox__img");
    lb.cap   = el.querySelector(".lightbox__caption");
    lb.close = el.querySelector(".lightbox__close");
    lb.prev  = el.querySelector(".lightbox__prev");
    lb.next  = el.querySelector(".lightbox__next");

    lb.close.addEventListener("click", closeLb);
    lb.prev.addEventListener("click", function () { step(-1); });
    lb.next.addEventListener("click", function () { step(1); });
    el.addEventListener("click", function (e) { if (e.target === el) closeLb(); });
  }

  function show(i) {
    current = (i + items.length) % items.length;
    var it = items[current];
    // fade the swap to avoid a hard flash / layout shift
    lb.img.style.opacity = "0";
    var pre = new Image();
    pre.onload = function () {
      lb.img.src = it.src;
      lb.img.alt = it.title + (it.medium ? ", " + it.medium : "");
      lb.img.style.opacity = "1";
    };
    pre.src = it.src;
    lb.cap.innerHTML =
      "<strong>" + esc(it.title) + "</strong>" +
      (it.medium || it.year ? " — " + esc([it.medium, it.year].filter(Boolean).join(", ")) : "") +
      (it.desc ? '<span class="lb-desc">' + esc(it.desc) + "</span>" : "");
    lb.prev.hidden = lb.next.hidden = items.length < 2;
  }

  function step(d) { show(current + d); }

  function openLb(i, trigger) {
    lastFocused = trigger || document.activeElement;
    show(i);
    lb.root.setAttribute("data-open", "");
    document.body.style.overflow = "hidden";
    lb.close.focus();
  }

  function closeLb() {
    lb.root.removeAttribute("data-open");
    document.body.style.overflow = "";
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  }

  function isOpen() { return lb.root.hasAttribute("data-open"); }

  function init() {
    triggers = Array.prototype.slice.call(document.querySelectorAll(".art"));
    if (!triggers.length) return;

    buildLightbox();

    triggers.forEach(function (t, i) {
      items.push({
        src: t.dataset.full || (t.querySelector("img") && t.querySelector("img").src),
        title: t.dataset.title || "",
        medium: t.dataset.medium || "",
        year: t.dataset.year || "",
        desc: t.dataset.desc || "",
      });
      t.addEventListener("click", function () { openLb(i, t); });
      // Reveal images without layout shift once decoded.
      var img = t.querySelector("img");
      if (img) {
        img.classList.add("is-loading");
        var done = function () { img.classList.remove("is-loading"); };
        if (img.complete) done();
        else img.addEventListener("load", done, { once: true });
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!isOpen()) return;
      if (e.key === "Escape") { e.preventDefault(); closeLb(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

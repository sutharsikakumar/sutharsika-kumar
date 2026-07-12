// site.js — shared behaviour for every page.
// Vanilla JS, no dependencies.
//   1. Footer social links
//   2. Primary-nav dropdowns (hover + tap/click + keyboard)
//   3. Interactive crow speech bubble (homepage)

const X_URL = "https://x.com/sutharsikakumar";
const LINKEDIN_URL = "https://www.linkedin.com/in/sutharsikakumar/";
const GITHUB_URL = "https://github.com/sutharsikakumar";
const GOOGLE_SCHOLAR_URL = "https://scholar.google.com/citations?user=6qV586oAAAAJ&hl=en";

(function () {
  "use strict";

  var ICONS = {
    x: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>',
    linkedin: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
    github: '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  };

  var FOOTER_ITEMS = [
    { label: "X", url: X_URL, icon: ICONS.x },
    { label: "LinkedIn", url: LINKEDIN_URL, icon: ICONS.linkedin },
    { label: "GitHub", url: GITHUB_URL, icon: ICONS.github },
    { label: "Google Scholar", url: GOOGLE_SCHOLAR_URL, icon: null },
  ];

  // 1. Footer -------------------------------------------------------
  function renderFooter() {
    var footer = document.querySelector("[data-footer]");
    if (!footer) return;
    FOOTER_ITEMS.forEach(function (item) {
      var el;
      if (item.url) {
        el = document.createElement("a");
        el.className = "footer-item";
        el.href = item.url;
        el.target = "_blank";
        el.rel = "noopener";
        el.setAttribute("aria-label", item.label);
      } else {
        el = document.createElement("span");
        el.className = "footer-item footer-item--disabled";
        el.setAttribute("aria-label", item.label + " (link not set)");
      }
      if (item.icon) el.innerHTML = item.icon;
      else el.textContent = item.label;
      footer.appendChild(el);
    });
  }

  // 2. Nav dropdowns ------------------------------------------------
  function closeAllGroups(except) {
    document.querySelectorAll(".nav-group.open").forEach(function (group) {
      if (group === except) return;
      group.classList.remove("open");
      var btn = group.querySelector("button");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  }

  function initDropdowns() {
    var groups = document.querySelectorAll(".nav-group");
    if (!groups.length) return;

    groups.forEach(function (group) {
      var btn = group.querySelector("button");
      if (!btn) return;
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var willOpen = !group.classList.contains("open");
        closeAllGroups(group);
        group.classList.toggle("open", willOpen);
        btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllGroups(null);
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav-group")) closeAllGroups(null);
    });
  }

  // 3. Interactive crow --------------------------------------------
  var CROW_LINES = [
    "You have excellent taste in tabs.",
    "I remember every interesting thing you almost finished.",
    "This website contains traces of ambition.",
    "I collect shiny ideas, not shiny objects.",
    "You should probably open another research paper.",
    "The human made this instead of sleeping.",
    "I have reviewed the archive. It is sufficiently strange.",
    "Somewhere, a half-finished project is waiting.",
  ];

  function initCrow() {
    var crow = document.querySelector("[data-crow]");
    var bubble = document.querySelector("[data-crow-bubble]");
    if (!crow || !bubble) return;

    var order = shuffle(CROW_LINES.slice());
    var idx = 0;
    var pinned = false; // set by tap/click on touch devices
    var hovering = false;

    function nextLine() {
      if (idx >= order.length) { order = shuffle(order); idx = 0; }
      return order[idx++];
    }

    function show() {
      bubble.textContent = nextLine();
      bubble.setAttribute("data-visible", "");
    }
    function hide() {
      bubble.removeAttribute("data-visible");
    }

    // Pointer hover (desktop)
    crow.addEventListener("mouseenter", function () {
      hovering = true;
      if (!pinned) show();
    });
    crow.addEventListener("mouseleave", function () {
      hovering = false;
      if (!pinned) hide();
    });

    // Keyboard focus
    crow.addEventListener("focus", function () { if (!pinned) show(); });
    crow.addEventListener("blur", function () { if (!pinned) hide(); });

    // Tap / click toggles a pinned bubble (mobile + click parity)
    crow.addEventListener("click", function (e) {
      e.stopPropagation();
      pinned = !pinned;
      if (pinned) show();
      else if (!hovering) hide();
      crow.setAttribute("aria-expanded", pinned ? "true" : "false");
    });

    // Tap elsewhere / Escape dismisses a pinned bubble
    document.addEventListener("click", function (e) {
      if (pinned && !e.target.closest("[data-crow]")) {
        pinned = false;
        hide();
        crow.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && pinned) {
        pinned = false;
        hide();
        crow.setAttribute("aria-expanded", "false");
      }
    });
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  function init() {
    renderFooter();
    initDropdowns();
    initCrow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

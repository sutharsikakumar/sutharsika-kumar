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
  // Page-specific dialogue, addressed to whoever is visiting the site.
  // The active set is chosen from the page's body[data-crow-page]
  // value; "default" is the fallback.
  var CROW_DIALOGUE = {
    sidequests: [
      "A stranger's hobbies, studied closely. Unusual methodology.",
      "The main quest is a convention, not a law.",
      "Digression is underrated as a research strategy.",
      "Whatever you were meant to be doing, this is more interesting.",
      "Curiosity is rarely fatal. Proceed.",
      "You have been here four minutes. That constitutes a body of work.",
    ],
    bookshelf: [
      "A shelf is an argument. You are permitted to disagree.",
      "You are already choosing which one to borrow indefinitely.",
      "Nobody has finished every book they own. This is a universal law.",
      "Scanning for one you've read, to feel briefly validated. Understandable.",
      "Add one to the list. Neglect it for a year. This is the ritual.",
      "I cannot read. I admire the covers on formal grounds.",
    ],
    movies: [
      "Two hours, no wings, and still humanity's finest output.",
      "You will dispute one of these ratings and think about it all day.",
      "Not a plot hole. A plot lifestyle.",
      "Insufficient birds throughout. A recurring flaw in the medium.",
      "You scrolled for one you'd seen. Everyone does.",
      "I saw the twist from a power line six blocks away.",
      "Everything is a 7. Accept this and be free.",
    ],
    photography: [
      "Take your time. The images will wait. I will not.",
      "There is a bird in one of these. We are no longer speaking.",
      "That is a cloud, not a symbol. Let it go.",
      "Rule of thirds, rule of shiny. Both are defensible.",
      "Looking is sufficient. No caption is required.",
      "You have chosen a favorite. Sit with the consequences.",
    ],
    art: [
      "Not an error. Texture. The wall label agrees, presumably.",
      "Every gallery requires one confused bird. I have volunteered.",
      "Step back. Squint. Nod slowly. You are now an art person.",
      "Comprehension is optional. I live here and understand nothing.",
      "Liking it for no reason is the entire system working correctly.",
    ],
    default: [
      "Forty-seven tabs, and yet you opened another. Bold.",
      "This site contains trace ambition and exactly one (1) bird.",
      "You clicked the crow. A revealing choice.",
      "You could close this tab. You won't. I respect that.",
      "Nothing here bites. I bite situationally.",
      "Welcome. There is no newsletter. There is only this.",
    ],
  };

  // Pages where the crow always shows up, uninvited.
  var CROW_ALWAYS = ["movies"];

  function currentPageKey() {
    var key = document.body.getAttribute("data-crow-page");
    return key && CROW_DIALOGUE[key] ? key : "default";
  }

  // Resolve the assets/ directory from this script's own src so an
  // injected crow image works at any page depth.
  function assetsBase() {
    var s = document.querySelector('script[src$="site.js"]');
    if (!s) return "assets/";
    return s.getAttribute("src").replace(/site\.js.*$/, "");
  }

  // Deterministic per-page-per-day decision — stable across reloads
  // (no hydration flicker), but varies by page and day.
  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function crowShouldAppear(pageKey) {
    if (CROW_ALWAYS.indexOf(pageKey) !== -1) return true;
    var day = new Date().toISOString().slice(0, 10);
    return hashStr(pageKey + "|" + day) % 100 < 55; // ~55% of days
  }

  // Wire hover / focus / click behaviour onto a crow + its bubble.
  function wireCrow(crow, bubble, lines) {
    var order = shuffle(lines.slice());
    var idx = 0;
    var pinned = false;
    var hovering = false;

    function nextLine() {
      if (idx >= order.length) { order = shuffle(order); idx = 0; }
      return order[idx++];
    }
    function show() {
      bubble.textContent = nextLine();
      bubble.setAttribute("data-visible", "");
    }
    function hide() { bubble.removeAttribute("data-visible"); }

    crow.addEventListener("mouseenter", function () {
      hovering = true;
      if (!pinned) show();
    });
    crow.addEventListener("mouseleave", function () {
      hovering = false;
      if (!pinned) hide();
    });
    crow.addEventListener("focus", function () { if (!pinned) show(); });
    crow.addEventListener("blur", function () { if (!pinned) hide(); });
    crow.addEventListener("click", function (e) {
      e.stopPropagation();
      pinned = !pinned;
      if (pinned) show();
      else if (!hovering) hide();
      crow.setAttribute("aria-expanded", pinned ? "true" : "false");
    });
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

  function initCrow() {
    var lines = CROW_DIALOGUE[currentPageKey()];

    // Explicit crow present in the markup (homepage, beside Side-Quests).
    var crow = document.querySelector("[data-crow]");
    var bubble = document.querySelector("[data-crow-bubble]");
    if (crow && bubble) { wireCrow(crow, bubble, lines); return; }

    // Otherwise, maybe inject a floating crow on an eligible sub-page.
    var pageKey = document.body.getAttribute("data-crow-page");
    if (!pageKey || !CROW_DIALOGUE[pageKey]) return;
    if (!crowShouldAppear(pageKey)) return;

    var host = document.createElement("div");
    host.className = "crow-float";
    host.innerHTML =
      '<button class="crow crow--floating" data-crow type="button" ' +
        'aria-expanded="false" aria-describedby="crow-bubble" ' +
        'aria-label="A curious crow. Activate to hear what it has to say.">' +
        '<img src="' + assetsBase() + 'crow.png" alt="" width="76" />' +
      '</button>' +
      '<div class="crow-bubble crow-bubble--floating" id="crow-bubble" ' +
        'data-crow-bubble role="status" aria-live="polite"></div>';
    document.body.appendChild(host);
    wireCrow(host.querySelector("[data-crow]"), host.querySelector("[data-crow-bubble]"), lines);
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

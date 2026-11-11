// site.js — shared behaviour for every page.
// Vanilla JS, no dependencies.
//   1. Primary-nav dropdowns (hover + tap/click + keyboard)
//   2. Interactive crow speech bubble
// (Footer + find popup now live in shell.js; links in site-config.js.)

(function () {
  "use strict";

  // Nav dropdowns ------------------------------------------------
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
  var CROW_ALWAYS = [];

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
    initDropdowns();
    initCrow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

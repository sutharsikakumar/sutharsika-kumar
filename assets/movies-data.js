// movies-data.js — the film archive's data source.
//
// ⚠️  PLACEHOLDER DATA. Every entry below is a stand-in with obviously fake
//     titles/directors and empty notes. Replace them with your own films,
//     ratings, and reviews. Delete any you don't need. The page reads this
//     array directly — no build step.
//
// Rating scale: 1–10, or null if unrated.
// status: "watched" | "watchlist"
// watched: "M.D.YY" display string, or null.

/**
 * @typedef {Object} Movie
 * @property {string}        id       Unique slug.
 * @property {string}        title
 * @property {number}        year
 * @property {string}        director
 * @property {string[]}      genre    One or more genres.
 * @property {number}        runtime  Minutes.
 * @property {number|null}   rating   1–10, or null if unrated.
 * @property {string|null}   watched  Display date "M.D.YY", or null.
 * @property {("watched"|"watchlist")} status
 * @property {string}        note     Short review / reaction (may be empty).
 * @property {string|null}   poster   Path to a poster/still image, or null.
 * @property {string[]}      tags     Free-form tags.
 */

/** @type {Movie[]} */
window.MOVIES = [
  {
    id: "laapataa_ladies",
    title: "Laapataa Ladies",
    year: 2025,
    director: "Kiran Rao",
    genre: ["Dramedy"],
    runtime: 122,
    rating: 9,
    watched: "many times",
    status: "watched",
    note: "One of the most empowering movies coming out of Indian cinema in my opinion. The portrayal of each character as well as narrative for each backstory is flawless. It explores difficult topics like arranged marriages, loss, lack of women's rights in very accessible ways. I didn't expect the plot twist at the end either. Great songs as part of the movie as well.",
    poster: null,
    tags: ["empowering", "funny"],
  },
  {
    id: "avatar-the-last-airbender",
    title: "Avatar: The Last Airbender",
    year: 2005,
    director: ["Dave Filoni", " Lauren MacMullan", " Giancarlo Volpe"],
    genre: ["Animation", "Adventure"],
    runtime: 1400,
    rating: 10,
    watched: "Summer 2024",
    status: "watched",
    note: "This show needs much deeper analysis than the one I have provided here, however, an overview would include the notable character arc of Zuko, the guidance of Iroh, and the combination of Aang, Sokka, Toph, and Katara. It is absolutely a must watch.",
    poster: null,
    tags: ["animation", "must-watch"],
  },
  {
    id: "ducktales-2017",
    title: "Ducktales (2017)",
    year: 2017,
    director: ["Matthew Humphreys", "Jason Zurek", "Tanner Johnson"],
    genre: ["Animation", "Adventure"],
    runtime: 1675,
    rating: 8,
    watched: "many times",
    status: "watched",
    note: "This show was so good I've rewatched it every time I wanted to return to something familiar. The rating is lower because I'm personally not too fond of the ending, but the first and second seasons were the best television I had witnessed. Notable characters include Magica DeSpell, Scrooge McDuck, and many more. The world building in this show is very well-though out, especially the character development of Llewellyn Duck.",
    poster: null,
    tags: ["must-watch", "empowering"],
  },
  {
    id: "taare-zameen-par",
    title: "Taare Zameen Par",
    year: 2007,
    director: "Aamir Khan",
    genre: ["Family", "Musical"],
    runtime: 165,
    rating: 8,
    watched: "2021",
    status: "watched",
    note: "Could be considered the film adaptation of Fish in a Tree, explores the life of a young boy who has dyslexia in a time when it was not commonly known.",
    poster: null,
    tags: ["must-watch", "education"],
  },
  {
    id: "enola-holmes",
    title: "Enola Holmes (1, 2, 3)",
    year: 2008,
    director: ["Harry Bradbeer", "Philip Barantini"],
    genre: ["Mystery", "Adventure"],
    runtime: 105,
    rating: 7,
    watched: "Summer 2025",
    status: "watched",
    note: "Action-packed and exciting.",
    poster: null,
    tags: ["mystery", "exciting", "good casting"],
  },
];

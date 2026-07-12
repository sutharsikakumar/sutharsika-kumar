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
    id: "placeholder-a",
    title: "Placeholder Film A",
    year: 2021,
    director: "Director Name",
    genre: ["Drama"],
    runtime: 118,
    rating: 8,
    watched: "3.14.26",
    status: "watched",
    note: "Replace this with your own note about the film.",
    poster: null,
    tags: ["placeholder", "replace-me"],
  },
  {
    id: "placeholder-b",
    title: "Placeholder Film B",
    year: 2019,
    director: "Director Name",
    genre: ["Sci-Fi", "Thriller"],
    runtime: 134,
    rating: 9,
    watched: "1.2.26",
    status: "watched",
    note: "Replace this with your own note about the film.",
    poster: null,
    tags: ["placeholder"],
  },
  {
    id: "placeholder-c",
    title: "Placeholder Film C",
    year: 2015,
    director: "Director Name",
    genre: ["Documentary"],
    runtime: 92,
    rating: 7,
    watched: "11.30.25",
    status: "watched",
    note: "Replace this with your own note about the film.",
    poster: null,
    tags: ["placeholder"],
  },
  {
    id: "placeholder-d",
    title: "Placeholder Film D",
    year: 2023,
    director: "Director Name",
    genre: ["Comedy", "Romance"],
    runtime: 101,
    rating: null,
    watched: null,
    status: "watchlist",
    note: "",
    poster: null,
    tags: ["placeholder", "watchlist"],
  },
  {
    id: "placeholder-e",
    title: "Placeholder Film E",
    year: 2008,
    director: "Director Name",
    genre: ["Animation", "Adventure"],
    runtime: 96,
    rating: 10,
    watched: "9.5.25",
    status: "watched",
    note: "Replace this with your own note about the film.",
    poster: null,
    tags: ["placeholder", "favorite"],
  },
  {
    id: "placeholder-f",
    title: "Placeholder Film F",
    year: 2017,
    director: "Director Name",
    genre: ["Horror"],
    runtime: 88,
    rating: 6,
    watched: "8.19.25",
    status: "watched",
    note: "Replace this with your own note about the film.",
    poster: null,
    tags: ["placeholder"],
  },
];

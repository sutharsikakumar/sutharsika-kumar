// books-data.js — the bookshelf's data source.
//
// ⚠️  PLACEHOLDER DATA. Every entry below is a stand-in. Replace them with
//     your own books, ratings, and reviews — the page reads this array
//     directly, no build step. To ADD a book: copy one { … } block, give it a
//     unique `id`, and edit the fields. To REMOVE one: delete its block.
//
// Rating scale: 1–10, or null if unrated.
//
// Spine appearance is data-driven so the shelf feels arranged, not gridded:
//   shelf   → which shelf it sits on (0-based). Books on the same shelf keep
//             their array order, left → right. Omit to auto-flow.
//   spine   → colour swatch: "science" | "fiction" | "advice" | "nonfiction"
//             | "neutral" (reuses the site's category tints), OR any CSS colour.
//   width   → relative spine thickness, ~0.8–1.4 (1 = default).
//   height  → relative spine height, ~0.8–1 (1 = tallest).
//   lie     → true renders the book lying flat as a shelf accent (optional).

/**
 * @typedef {Object} Book
 * @property {string}        id       Unique slug.
 * @property {string}        title
 * @property {string}        author
 * @property {number}        year     Publication year.
 * @property {string|null}   read     Display date/year read ("2025", "3.14.26"), or null.
 * @property {number|null}   rating   1–10, or null if unrated.
 * @property {string|null}   cover    Path to a cover image, or null.
 * @property {string}        review   My thoughts / reaction (may be empty).
 * @property {string}        quote    A favourite quote (may be empty).
 * @property {string}        notes    Why the book mattered to me (optional).
 * @property {string[]}      themes   Free-form themes / tags.
 * @property {number}        [shelf]  Shelf index (0-based). Omit to auto-flow.
 * @property {string}        [spine]  Tint name or CSS colour.
 * @property {number}        [width]  Relative spine thickness (~0.8–1.4).
 * @property {number}        [height] Relative spine height (~0.8–1).
 * @property {boolean}       [lie]    Lay the book flat as a shelf accent.
 */

/** @type {Book[]} */
window.BOOKS = [
  {
    id: "placeholder-a",
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: 1969,
    read: "2024",
    rating: 9,
    cover: null,
    review: "Replace this with your own thoughts. What stayed with you? What surprised you?",
    quote: "Light is the left hand of darkness, and darkness the right hand of light.",
    notes: "A placeholder note about why this one mattered.",
    themes: ["science-fiction", "identity", "favorite"],
    shelf: 0, spine: "science", width: 1.0, height: 1.0,
  },
  {
    id: "placeholder-b",
    title: "Just Kids",
    author: "Patti Smith",
    year: 2010,
    read: "2023",
    rating: 8,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "In my way of thinking, anything was possible.",
    notes: "",
    themes: ["memoir", "art"],
    shelf: 0, spine: "fiction", width: 0.85, height: 0.92,
  },
  {
    id: "placeholder-c",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    read: "2025",
    rating: 7,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "Nothing in life is as important as you think it is while you are thinking about it.",
    notes: "",
    themes: ["psychology", "nonfiction"],
    shelf: 0, spine: "nonfiction", width: 1.3, height: 1.0,
  },
  {
    id: "placeholder-d",
    title: "The Overstory",
    author: "Richard Powers",
    year: 2018,
    read: "2024",
    rating: 9,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "The best arguments in the world won't change a person's mind. The only thing that can do that is a good story.",
    notes: "A placeholder note about why this one mattered.",
    themes: ["fiction", "nature", "favorite"],
    shelf: 0, spine: "advice", width: 1.1, height: 0.97,
  },
  {
    id: "placeholder-e",
    title: "Bird by Bird",
    author: "Anne Lamott",
    year: 1994,
    read: "2022",
    rating: 8,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "You own everything that happened to you. Tell your stories.",
    notes: "",
    themes: ["writing", "advice"],
    shelf: 1, spine: "neutral", width: 0.9, height: 0.88,
  },
  {
    id: "placeholder-f",
    title: "The Emperor of All Maladies",
    author: "Siddhartha Mukherjee",
    year: 2010,
    read: "2025",
    rating: 9,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "Cancer is a disease of our own growth, our own inevitability.",
    notes: "",
    themes: ["science", "history", "nonfiction"],
    shelf: 1, spine: "science", width: 1.35, height: 1.0,
  },
  {
    id: "placeholder-g",
    title: "Piranesi",
    author: "Susanna Clarke",
    year: 2020,
    read: "2023",
    rating: 10,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "The Beauty of the House is immeasurable; its Kindness infinite.",
    notes: "A placeholder note about why this one mattered.",
    themes: ["fiction", "mystery", "favorite"],
    shelf: 1, spine: "fiction", width: 0.95, height: 0.95,
  },
  {
    id: "placeholder-h",
    title: "A Little Life",
    author: "Hanya Yanagihara",
    year: 2015,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes: "On the to-read stack.",
    themes: ["fiction", "to-read"],
    shelf: 1, spine: "neutral", width: 1.4, height: 0.98,
  },
  {
    id: "placeholder-i",
    title: "Braiding Sweetgrass",
    author: "Robin Wall Kimmerer",
    year: 2013,
    read: "2024",
    rating: 9,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "All flourishing is mutual.",
    notes: "",
    themes: ["essays", "nature", "nonfiction"],
    shelf: 2, spine: "advice", width: 1.05, height: 0.94,
  },
  {
    id: "placeholder-j",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    year: 2021,
    read: "2025",
    rating: 8,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "The sun always has ways to reach us.",
    notes: "",
    themes: ["science-fiction", "fiction"],
    shelf: 2, spine: "science", width: 0.9, height: 0.9,
  },
  {
    id: "placeholder-k",
    title: "The Art Spirit",
    author: "Robert Henri",
    year: 1923,
    read: "2022",
    rating: 7,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "The object isn't to make art, it's to be in that wonderful state which makes art inevitable.",
    notes: "",
    themes: ["art", "advice"],
    shelf: 2, spine: "nonfiction", width: 1.15, height: 1.0, lie: true,
  },
  {
    id: "placeholder-l",
    title: "Station Eleven",
    author: "Emily St. John Mandel",
    year: 2014,
    read: "2023",
    rating: 8,
    cover: null,
    review: "Replace this with your own note about the book.",
    quote: "Survival is insufficient.",
    notes: "",
    themes: ["fiction", "post-apocalyptic"],
    shelf: 2, spine: "fiction", width: 1.0, height: 0.96,
  },
];

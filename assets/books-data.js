// books-data.js — the bookshelf's data source.
//
// ⚠️  PLACEHOLDER DATA. Every entry below is a stand-in. Replace them with
//     your own books, ratings, and reviews — the page reads this array
//     directly, no build step. To ADD a book: copy one { … } block, give it a
//     unique `id`, and edit the fields. To REMOVE one: delete its block.
//
// Rating scale: 1–10, or null if unrated.
//
// Shelves: a book sits on the "Read" shelf or the "Want to read" shelf.
//   status  → "read" | "to-read". Omit it and the shelf is inferred from
//             `read` (a read date means read).

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
 * @property {string}        [status] "read" | "to-read" (inferred from `read` if omitted).
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
    status: "read",
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
    status: "read",
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
    status: "read",
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
    status: "read",
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
    status: "read",
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
    status: "read",
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
    status: "read",
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
    status: "to-read",
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
    status: "read",
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
    status: "read",
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
    status: "read",
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
    status: "read",
  },
];

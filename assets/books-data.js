// books-data.js — the bookshelf's data source.
//
// The page reads this array directly, no build step. To ADD a book: copy one
// { … } block, give it a unique `id`, and edit the fields. To REMOVE one:
// delete its block.
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
  // ---- Read ---------------------------------------------------------
  {
    id: "the-tell-tale-heart",
    title: "The Tell-Tale Heart",
    author: "Edgar Allan Poe",
    year: 1843,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes: "",
    themes: ["short-story", "gothic", "horror", "psychological"],
    status: "read",
  },
  {
    id: "americanah",
    title: "Americanah",
    author: "Chimamanda Ngozi Adichie",
    year: 2013,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes: "",
    themes: ["literary-fiction", "race", "identity", "immigration"],
    status: "read",
  },
  {
    id: "gora",
    title: "Gora",
    author: "Rabindranath Tagore",
    year: 1910,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes: "",
    themes: [
      "classic",
      "indian-literature",
      "identity",
      "religion",
      "nationalism",
    ],
    status: "read",
  },
  {
    id: "dream-of-the-red-chamber",
    title: "Dream of the Red Chamber",
    author: "Cao Xueqin",
    year: 1791,
    read: "2025",
    rating: 9,
    cover: null,
    review:
      "A whole world inside one household — hundreds of characters, poetry contests, garden politics, and underneath it all the slow certainty that everything beautiful here is going to fade. It asks a lot of you and gives back more.",
    quote:
      "Truth becomes fiction when the fiction's true; real becomes not-real where the unreal's real.",
    notes:
      "One of the four great classical Chinese novels. Kept a character list open the entire time and it was worth it.",
    themes: ["classic", "chinese-literature", "family", "favorite"],
    status: "read",
  },
  {
    id: "journey-to-the-west",
    title: "Journey to the West",
    author: "Wu Cheng'en",
    year: 1592,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes:
      "One of the four great classical Chinese novels, following the pilgrimage of the monk Tang Sanzang and his companions, including the Monkey King.",
    themes: [
      "classic",
      "chinese-literature",
      "mythology",
      "adventure",
    ],
    status: "read",
  },

  // ---- Want to read --------------------------------------------------
  {
    id: "the-trial",
    title: "The Trial",
    author: "Franz Kafka",
    year: 1925,
    read: null,
    rating: 6,
    cover: null,
    review: "",
    quote: "",
    notes: "",
    themes: [
      "classic",
      "absurdism",
      "bureaucracy",
      "legal-oppression",
      "to-read",
    ],
    status: "to-read",
  },
  {
    id: "crime-and-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    year: 1866,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes: "",
    themes: [
      "classic",
      "russian-literature",
      "morality",
      "psychological",
      "to-read",
    ],
    status: "to-read",
  },
  {
    id: "the-god-of-small-things",
    title: "The God of Small Things",
    author: "Arundhati Roy",
    year: 1997,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes: "",
    themes: [
      "literary-fiction",
      "indian-literature",
      "caste",
      "family",
      "to-read",
    ],
    status: "to-read",
  },
  {
    id: "the-poppy-war",
    title: "The Poppy War",
    author: "R. F. Kuang",
    year: 2018,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes:
      "Fantasy built on Chinese history and shamanic gods — the bridge between the two halves of this shelf.",
    themes: ["fantasy", "chinese-mythology", "to-read"],
    status: "to-read",
  },
];
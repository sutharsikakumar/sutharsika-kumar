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
    id: "the-lightning-thief",
    title: "The Lightning Thief",
    author: "Rick Riordan",
    year: 2005,
    read: "2024",
    rating: 9,
    cover: null,
    review:
      "The book that makes Greek mythology feel like it was always hiding in plain sight — Olympus above the Empire State Building, the entrance to the Underworld in LA. Percy's voice is what carries it: sarcastic, warm, and completely unimpressed by gods.",
    quote: "Look, I didn't want to be a half-blood.",
    notes:
      "Where it all started. The chapter titles alone are worth the price of admission.",
    themes: ["greek-mythology", "fantasy", "percy-jackson", "favorite"],
    status: "read",
  },
  {
    id: "the-sea-of-monsters",
    title: "The Sea of Monsters",
    author: "Rick Riordan",
    year: 2006,
    read: "2024",
    rating: 8,
    cover: null,
    review:
      "The Odyssey compressed into a summer road trip through the Bermuda Triangle. Tyson is the heart of this one — the book quietly asks what family actually means while throwing hydras at you.",
    quote: "Families are messy. Immortal families are eternally messy.",
    notes: "",
    themes: ["greek-mythology", "fantasy", "percy-jackson"],
    status: "read",
  },
  {
    id: "the-titans-curse",
    title: "The Titan's Curse",
    author: "Rick Riordan",
    year: 2007,
    read: "2024",
    rating: 8,
    cover: null,
    review:
      "The series gets darker here and it's better for it — real stakes, real losses, and Percy holding up the sky. The Hunters of Artemis are a great addition, and Nico's arrival changes everything.",
    quote: "Let us find the dam snack bar.",
    notes: "The dam jokes chapter is peak Riordan.",
    themes: ["greek-mythology", "fantasy", "percy-jackson"],
    status: "read",
  },
  {
    id: "the-battle-of-the-labyrinth",
    title: "The Battle of the Labyrinth",
    author: "Rick Riordan",
    year: 2008,
    read: "2024",
    rating: 9,
    cover: null,
    review:
      "The best-plotted book in the series. Daedalus's labyrinth sprawling under the whole country is such a good idea, and the ending — the choice Daedalus makes — hits harder than a middle-grade book has any right to.",
    quote: "The best people have the rottenest luck.",
    notes: "",
    themes: ["greek-mythology", "fantasy", "percy-jackson", "favorite"],
    status: "read",
  },
  {
    id: "the-last-olympian",
    title: "The Last Olympian",
    author: "Rick Riordan",
    year: 2009,
    read: "2024",
    rating: 10,
    cover: null,
    review:
      "Everything the first four books set up pays off — the prophecy, Luke, the siege of Manhattan. Riordan sticks the landing in a way most series never manage. Percy turning down godhood is one of my favorite endings anywhere.",
    quote:
      "With great power... comes great need to take a nap. Wake me up later.",
    notes: "Finished it in one sitting. No regrets.",
    themes: ["greek-mythology", "fantasy", "percy-jackson", "favorite"],
    status: "read",
  },
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
    id: "the-song-of-achilles",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    year: 2011,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes:
      "Greek mythology again, but grown up — the Iliad retold through Patroclus. Everyone says it wrecks you.",
    themes: ["greek-mythology", "retelling", "to-read"],
    status: "to-read",
  },
  {
    id: "circe",
    title: "Circe",
    author: "Madeline Miller",
    year: 2018,
    read: null,
    rating: null,
    cover: null,
    review: "",
    quote: "",
    notes:
      "The witch from the Odyssey gets her own story. Feels like the natural next step after Percy Jackson.",
    themes: ["greek-mythology", "retelling", "to-read"],
    status: "to-read",
  },
  {
    id: "the-trial",
    title: "The Trial",
    author: "Franz Kafka",
    year: 1925,
    read: null,
    rating: null,
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
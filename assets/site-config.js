// site-config.js — single source of truth for the nav tabs, the ⌘F find popup, and the footer.
// Edit here; every page picks it up through assets/shell.js.

export const SITE = {
  name: 'Sutharsika Kumar',
  url: 'https://sutharsikakumar.org',
  description: 'Sutharsika Kumar — ML research on world models and reinforcement learning. About, research, projects, writing and CV.',
  ogImage: '/assets/world-model-fallback.png',
};

// `nav: true` → shown as a tab (homepage + inner-page header). Every entry is searchable in the find popup.
export const PAGES = [
  { label: 'About',      path: '/about/',    nav: true, description: 'Bio, education, what I am working toward' },
  { label: 'Technical',  path: '/projects/', nav: true, description: 'Things I have built' },
  { label: 'Writing',    path: '/writing/',  nav: true, description: 'Essays and technical write-ups' },
  { label: 'Past Lives', path: '/cv/',       nav: true, description: 'Education, experience, publications' },
  { label: 'Research',   path: '/research/', description: 'Interests, publications, ongoing work' },
  { label: 'Home',     path: '/',          description: 'World-model animation' },
  { label: 'Artwork',     path: '/side-quests/artwork/',     description: 'Side quests: drawings' },
  { label: 'Baking',      path: '/side-quests/baking/',      description: 'Side quests: baking' },
  { label: 'Photography', path: '/side-quests/photography/', description: 'Side quests: photos' },
];

// Footer links (order is display order).
export const SOCIAL = [
  { label: 'Email',          url: 'mailto:sutharsika.kumar07@gmail.com' },
  { label: 'GitHub',         url: 'https://github.com/sutharsikakumar' },
  { label: 'Twitter',        url: 'https://x.com/sutharsikakumar' },
  { label: 'Google Scholar', url: 'https://scholar.google.com/citations?user=6qV586oAAAAJ&hl=en' },
  { label: 'LinkedIn',       url: 'https://www.linkedin.com/in/sutharsikakumar/' },
];

// Site-wide constants. Single source of truth for the site.

export const SITE = {
  name: 'Joe Neiman',
  url: 'https://joeneiman.com',
  locale: 'en-US',
  // Flip to true at launch, after Joe approves the copy. While false, every
  // page carries noindex and the draft ribbon shows.
  launched: false,
  description:
    'Entrepreneur and pilot. Co-founder of ACV Auctions, founder of DealerClub. Buying and building dealerships, flying, and writing about what it all taught me.',
  // Shorter version for the footer
  tagline: 'Entrepreneur and pilot. Co-founder of ACV Auctions, founder of DealerClub.',
  // Profiles that belong to Joe, used for Person schema sameAs. Add only
  // ones Joe confirms.
  sameAs: [
    'https://www.linkedin.com/in/joe-neiman-577181aa/',
  ],
};

// Header links. Contact is the "Get in Touch" button, not a nav item.
export const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Giving', href: '/giving' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Writing', href: '/writing' },
];

// Footer columns
export const FOOTER_GROUPS = [
  {
    title: 'Joe',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Ventures', href: '/ventures' },
      { label: 'Advisory', href: '/advisory' },
    ],
  },
  {
    title: 'Around here',
    links: [
      { label: 'Giving', href: '/giving' },
      { label: 'Speaking', href: '/speaking' },
      { label: 'Writing', href: '/writing' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'LinkedIn', href: SITE.sameAs[0], external: true },
    ],
  },
];

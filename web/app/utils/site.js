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

// Footer keeps the full list
export const FOOTER_NAV = [...NAV, { label: 'Contact', href: '/contact' }];

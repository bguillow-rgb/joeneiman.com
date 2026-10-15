// Site-wide constants. Single source of truth for the Astro site.

export const SITE = {
  name: 'Joe Neiman',
  url: 'https://joeneiman.com',
  locale: 'en-US',
  // Flip to true only after Joe has approved the launch copy. While false,
  // the homepage is a name-only holding page and every page is noindex.
  launched: false,
  // Approved one-line description. Stays empty until Joe signs off on it.
  description: '',
  // Profiles that belong to Joe, used for Person schema sameAs. Add only
  // ones Joe confirms.
  sameAs: [
    'https://www.linkedin.com/in/joe-neiman-577181aa/',
  ],
  analytics: {
    ga4Id: import.meta.env.PUBLIC_GA4_ID ?? '',
    gscVerification: import.meta.env.PUBLIC_GSC_VERIFICATION ?? '',
    indexNowKey: import.meta.env.PUBLIC_INDEXNOW_KEY ?? '',
  },
};

// Navigation for the full site. Rendered only after launch.
export const NAV = [
  { label: 'About', href: '/about' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Advisory', href: '/advisory' },
  { label: 'Giving', href: '/giving' },
  { label: 'Speaking', href: '/speaking' },
  { label: 'Writing', href: '/writing' },
  { label: 'Contact', href: '/contact' },
];

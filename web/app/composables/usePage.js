import { SITE } from '~/utils/site';

// Per-page <head>: title, description, canonical, robots, and (after launch)
// Open Graph tags. Call once at the top of each page's <script setup>.
//
// opts: { title, description, path, noindex }
export const usePage = (opts = {}) => {
  const { title, description = SITE.description, path = '', noindex = false } = opts;

  const canonical = `${SITE.url}${path}`;
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
  const hideFromSearch = noindex || !SITE.launched;

  const meta = [];
  if (description) meta.push({ name: 'description', content: description });
  if (hideFromSearch) meta.push({ name: 'robots', content: 'noindex,nofollow' });

  if (SITE.launched) {
    meta.push(
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:url', content: canonical },
      { property: 'og:site_name', content: SITE.name },
    );
    if (description) meta.push({ property: 'og:description', content: description });
  }

  useHead({
    title: fullTitle,
    meta,
    link: [{ rel: 'canonical', href: canonical }],
  });
};

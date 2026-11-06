import { SITE } from '~/utils/site';

// Per-page <head>: title, description, canonical, robots, and the Open Graph
// and Twitter tags that give the link a preview card in Slack, iMessage,
// LinkedIn and the like. Call once at the top of each page's <script setup>.
//
// opts: { title, description, path, image, noindex }
//   image: root-relative path to a 1200x630 JPEG under /public, defaulting to
//   the site-wide card in /assets/og
export const usePage = (opts = {}) => {
  const {
    title,
    description = SITE.description,
    path = '',
    image = '/assets/og/joe-neiman.jpg',
    noindex = false,
  } = opts;

  const config = useRuntimeConfig();
  const canonical = `${SITE.url}${path}`;
  // Share images need an absolute URL on the host that is actually serving
  // the build, so the preview build points at the preview host
  const imageUrl = `${config.public.siteUrl}${config.app.baseURL}${image.replace(/^\//, '')}`;
  // Every page title starts with the site name: "Joe Neiman - About"
  const fullTitle = title ? `${SITE.name} - ${title}` : SITE.name;
  const hideFromSearch = noindex || !SITE.launched;

  const meta = [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:locale', content: SITE.locale || 'en_US' },
    { property: 'og:title', content: fullTitle },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: imageUrl },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: fullTitle },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:image', content: imageUrl },
  ];
  if (description) {
    meta.push(
      { name: 'description', content: description },
      { property: 'og:description', content: description },
      { name: 'twitter:description', content: description },
    );
  }
  if (hideFromSearch) meta.push({ name: 'robots', content: 'noindex,nofollow' });

  useHead({
    title: fullTitle,
    meta,
    link: [{ rel: 'canonical', href: canonical }],
  });
};

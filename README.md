# joeneiman.com

Joe Neiman's personal site. Nuxt 4 static site in `web/`, generated into
`web/.output/public/` and published to GitHub Pages by the workflow in
`.github/workflows/deploy.yml` on every push to `main`.

**Live preview:** https://bguillow-rgb.github.io/joeneiman.com/
(The real domain gets pointed at launch; until then the site is noindexed and
wears a draft ribbon.)

## Stack

- **Nuxt 4** (plain JavaScript, no TypeScript), prerendered with `nuxt generate`.
- **Bootstrap 5** via npm. `web/app/assets/scss/main.scss` is the global
  stylesheet: it imports `_constants.scss` first (colors, type, layout values,
  and Bootstrap variable overrides), then Bootstrap, then the site partials.
  The constants are also auto-injected into every component
  `<style lang="scss">` block, so `$muted`, `$font-sans`, etc. work anywhere.
  Bootstrap's JS is loaded client-side by `web/app/plugins/bootstrap.client.js`.
- **Font Awesome** via the site's kit script, added in `nuxt.config.js`
  under `app.head.script`. Use icons as `<i class="fa-solid fa-plane"></i>`.
- **Sitemap** via `@nuxtjs/sitemap`, written to `/sitemap.xml`. Pages that
  carry `noindex` (all of them until launch) are left out automatically.

## For Kurt

The content wireframe is done: every page, all the words, real photos in
`web/public/assets/photos/`. The current CSS is a deliberate placeholder.
**The design is yours**: edit the SCSS under `web/app/assets/scss/`, restructure
the layout in `web/app/layouts/default.vue` and the pages in `web/app/pages/`
however you want. Two things to keep:

1. The words. Copy is drafted from Joe's own answers and is pending his
   approval; the yellow `pending` marks and "wireframe note" boxes flag open
   questions. Leave those visible until launch review.
2. Internal links use `<NuxtLink to="/about">` (Nuxt adds the preview base
   path itself). Static files from `web/public/` (photos, favicon) go through
   the `useUrl()` composable so they resolve on the preview URL and on
   joeneiman.com later.

### Where things live

```
web/
  nuxt.config.js            site URL / base path, head (Font Awesome), SCSS, sitemap
  app/
    app.vue                 root: layout + page
    error.vue               client-side error page
    layouts/default.vue     header, nav, footer, analytics, schema
    pages/*.vue             one file per route; 404.vue becomes 404.html
    components/             SiteAnalytics, schema/Person, schema/WebSite
    composables/usePage.js  per-page <head>: title, description, canonical, robots, OG
    composables/useUrl.js   base-path-aware URL helper for /public assets
    utils/site.js           SITE constants, NAV, launched flag
    assets/scss/            main.scss, _constants.scss, _base.scss, _layout.scss
    plugins/bootstrap.client.js
  public/                   photos, favicon, robots.txt, .nojekyll
```

### Working on it

```bash
cd web
npm install
npm run serve                      # dev server at http://localhost:8080 (opens browser)
npm run generate                   # static build into .output/public
bash scripts/deploy-to-docs.sh     # manual fallback: build the preview into ../docs
cd .. && git add -A && git commit -m "design: ..." && git push
```

Pushing to `main` triggers the workflow, which builds and publishes the
preview in about a minute. Nuxt 4 wants Node 22 or newer (the workflow uses
22); Node 20 builds today with a warning.

Analytics IDs come from env vars at build time: `NUXT_PUBLIC_GA4_ID`,
`NUXT_PUBLIC_GSC_VERIFICATION`, `NUXT_PUBLIC_INDEXNOW_KEY`. GA4 only fires in
production builds when the ID is set.

## Launch (later, one time)

1. Joe approves the copy; remove the pending marks and wireframe notes.
2. Set `launched: true` in `web/app/utils/site.js`. That drops the noindex
   tag, turns on Open Graph tags and Person/WebSite schema, and lets the
   sitemap fill.
3. In `.github/workflows/deploy.yml`, set `PREVIEW` to `""` so the build
   uses the root base path and `https://joeneiman.com` as the site URL.
4. Point DNS for joeneiman.com at GitHub Pages, add the custom domain in
   Settings > Pages, enforce HTTPS.

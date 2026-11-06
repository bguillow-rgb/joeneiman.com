# joeneiman.com

Joe Neiman's personal site.

## Built with

- [Nuxt 4](https://nuxt.com) (plain JavaScript, no TypeScript), prerendered to static HTML with `nuxt generate`
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/) with SCSS. Global styles live in `web/app/assets/scss/`; `_constants.scss` holds every color, type and layout value
- [Inter Variable](https://rsms.me/inter/), self-hosted via `@fontsource-variable/inter`
- [Font Awesome](https://fontawesome.com) via the site's kit script
- [VeeValidate](https://vee-validate.logaretm.com/v4/) + [Yup](https://github.com/jquense/yup) for forms (`web/app/components/forms/`)
- [@nuxtjs/sitemap](https://nuxtseo.com/sitemap) for `/sitemap.xml`

## Requirements

Node 22 (see `web/.nvmrc`). With nvm:

```bash
cd web
nvm use
```

## Running it

```bash
cd web
npm install
npm run serve      # http://localhost:8080
```

## Building it

```bash
cd web
npm run generate   # static site in web/.output/public
npm run preview    # serve the build locally
```

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

## Project layout

```
web/
  nuxt.config.js     site config: head, SCSS, sitemap, base path
  app/
    pages/           one file per route
    layouts/         default.vue: header, footer, closing CTA
    components/      site components; forms/ for inputs, schema/ for JSON-LD
    composables/     usePage (head tags), useUrl (base-path-aware URLs), useFormField, useAlerts
    utils/site.js    site constants, nav, launched flag
    assets/scss/     global styles
  public/            photos, favicon, robots.txt
```

Analytics IDs come from env vars at build time: `NUXT_PUBLIC_GA4_ID`, `NUXT_PUBLIC_GSC_VERIFICATION`, `NUXT_PUBLIC_INDEXNOW_KEY`.

## Launch checklist

1. Wire the forms. `ContactForm.vue` and `NewsletterForm.vue` both mock their submit (see the `TODO` in each `onSubmit`): they show the success state and discard the input. Until a backend is connected, nothing sent through them is received.
2. Set `launched: true` in `web/app/utils/site.js`. This drops the `noindex` tag, fills the sitemap, and turns on the Person and WebSite schema. Open Graph and Twitter card tags are always on, with a 1200x630 image per page under `web/public/assets/og/`.
3. In `.github/workflows/deploy.yml`, set `PREVIEW` to `""` so the build uses the root base path and `https://joeneiman.com`.
4. Put the custom domain in place: copy `CNAME.launch` to `web/public/CNAME`, point DNS at GitHub Pages, add the domain in Settings > Pages, enforce HTTPS.
5. Optional: set `NUXT_PUBLIC_GA4_ID` and `NUXT_PUBLIC_GSC_VERIFICATION` in the build environment to turn on analytics and Search Console verification. Empty values keep both off.
6. Share a page URL in Slack or iMessage to confirm the link preview card shows up.

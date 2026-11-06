// PREVIEW=1 builds for the GitHub Pages preview URL
// (https://bguillow-rgb.github.io/joeneiman.com/). Launch builds drop the
// base so the site lives at the domain root. The deploy workflow and
// scripts/deploy-to-docs.sh set PREVIEW; plain `npm run serve` uses neither.
const preview = !!process.env.PREVIEW;
// site.url is origin only; the sitemap module appends app.baseURL itself.
const siteUrl = preview ? 'https://bguillow-rgb.github.io' : 'https://joeneiman.com';
const baseURL = preview ? '/joeneiman.com/' : '/';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: true,

  // Plain JavaScript project. Nuxt still generates its own types under
  // .nuxt/ for editor hints, but nothing here is type-checked or written in TS.
  typescript: {
    typeCheck: false,
    strict: false,
  },

  modules: ['@nuxtjs/sitemap', '@vee-validate/nuxt'],

  // Keep bare component names: <InputText>, not <FormsInputText>
  components: [{ path: '~/components', pathPrefix: false }],

  // Prefix VeeValidate's own components so they don't read like native <form>
  veeValidate: {
    autoImports: true,
    componentNames: {
      Form: 'VeeForm',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      ErrorMessage: 'VeeErrorMessage',
    },
  },

  devServer: {
    port: 8080,
  },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en-US' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'apple-mobile-web-app-title', content: 'Joe Neiman' },
        { name: 'theme-color', content: '#0a0b0d' },
      ],
      link: [
        // Icons live under /icons; the manifest's own paths are relative to it
        { rel: 'icon', type: 'image/png', href: `${baseURL}icons/favicon-96x96.png`, sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: `${baseURL}icons/favicon.svg` },
        { rel: 'shortcut icon', href: `${baseURL}icons/favicon.ico` },
        { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseURL}icons/apple-touch-icon.png` },
        { rel: 'manifest', href: `${baseURL}icons/site.webmanifest` },
      ],
      script: [
        // Font Awesome kit for this site.
        {
          src: 'https://kit.fontawesome.com/802660a0e8.js',
          crossorigin: 'anonymous',
          defer: true,
        },
      ],
    },
  },

  // Bootstrap 5 + site styles. main.scss imports the constants file first so
  // every Bootstrap variable can be overridden from one place. additionalData
  // makes the same constants available inside component <style lang="scss">
  // blocks without an explicit import (main.scss is skipped since it imports
  // them itself).
  css: ['@fontsource-variable/inter', '~/assets/scss/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (source, filename) =>
            filename.endsWith('main.scss') ? source : `@use "~/assets/scss/constants" as *;\n${source}`,
          quietDeps: true,
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
        },
      },
    },
  },

  // Public values are read from NUXT_PUBLIC_* env vars at build time
  // (NUXT_PUBLIC_GA4_ID, NUXT_PUBLIC_GSC_VERIFICATION, NUXT_PUBLIC_INDEXNOW_KEY).
  runtimeConfig: {
    public: {
      // Absolute origin for share images and other links that must be absolute
      siteUrl,
      ga4Id: '',
      gscVerification: '',
      indexNowKey: '',
    },
  },

  site: {
    url: siteUrl,
    name: 'Joe Neiman',
  },
  // Note: pages that render a noindex robots tag (every page while
  // SITE.launched is false) are left out of the sitemap by the module.
  // The sitemap fills in on its own at launch.
  sitemap: {
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    },
  },

  // `nuxt generate` prerenders every page into .output/public. No preset is
  // pinned so Nitro can auto-detect the host (GitHub Pages via the workflow,
  // or Vercel if the repo is ever connected there).
  // autoSubfolderIndex: false writes /about as about.html (same shape as the
  // old Astro build) so GitHub Pages serves extensionless URLs without a
  // trailing-slash redirect.
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      autoSubfolderIndex: false,
    },
  },
});

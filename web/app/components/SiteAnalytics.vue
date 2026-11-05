<script setup>
// GA4 + GSC verification, both gated on production builds and on the
// presence of an env-set ID (NUXT_PUBLIC_GA4_ID, NUXT_PUBLIC_GSC_VERIFICATION).
// Local dev never fires analytics. Forks / PR previews on platforms that
// don't set the env vars never fire.
//
// AI-referrer tracking uses GA4's built-in referrer dimension. Filter
// reports by referrer matching:
//   chatgpt.com OR chat.openai.com OR perplexity.ai OR
//   gemini.google.com OR claude.ai OR copilot.microsoft.com
// No special tracking code needed; the referrer header is captured
// automatically by gtag's page_view event.
const { ga4Id, gscVerification } = useRuntimeConfig().public;

const isProd = !import.meta.dev;
const enableAnalytics = isProd && Boolean(ga4Id);

const meta = [];
if (gscVerification) meta.push({ name: 'google-site-verification', content: gscVerification });

const script = [];
if (enableAnalytics) {
  script.push(
    { src: `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`, async: true },
    {
      innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(ga4Id)}, { anonymize_ip: true, send_page_view: true });`,
    },
  );
}

useHead({ meta, script });
</script>

<template>
  <span hidden />
</template>

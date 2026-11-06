<script setup>
import { SITE } from '~/utils/site';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: SITE.url,
  inLanguage: SITE.locale,
};

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
});
</script>

<template>
  <span hidden />
</template>

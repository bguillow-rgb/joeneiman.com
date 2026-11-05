<script setup>
import { SITE } from '~/utils/site';

// Person schema for Joe. Emitted site-wide after launch so search and AI
// engines tie joeneiman.com to the right Joe Neiman. Only approved facts go
// in here.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE.name,
  url: SITE.url,
  ...(SITE.description ? { description: SITE.description } : {}),
  sameAs: SITE.sameAs.filter(Boolean),
};

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(schema) }],
});
</script>

<template>
  <span hidden />
</template>

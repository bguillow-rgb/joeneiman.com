<script setup>
// Rendered for any error, including the prerendered 404.html that GitHub
// Pages serves for unknown URLs.
defineProps({ error: Object });
usePage({ title: 'Page not found', noindex: true });
</script>

<template>
  <NuxtLayout>
    <h1>Page not found</h1>
    <p>This one sold already. <NuxtLink to="/">Back to the homepage</NuxtLink>.</p>
  </NuxtLayout>
</template>

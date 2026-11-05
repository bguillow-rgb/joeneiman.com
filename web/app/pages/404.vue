<script setup>
// Prerendered to 404.html, which GitHub Pages serves for unknown URLs.
// app/error.vue covers client-side navigation errors.
usePage({ title: 'Page not found', noindex: true });
</script>

<template>
  <div>
    <h1>Page not found</h1>
    <p>This one sold already. <NuxtLink to="/">Back to the homepage</NuxtLink>.</p>
  </div>
</template>

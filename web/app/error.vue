<script setup>
// Rendered for any error, including the prerendered 404.html that GitHub
// Pages serves for unknown URLs. Anything other than a 404 says so.
const props = defineProps({ error: Object });
const notFound = computed(() => !props.error || Number(props.error.statusCode) === 404);
usePage({ title: notFound.value ? 'Page not found' : 'Something went wrong', noindex: true });
</script>

<template>
  <NuxtLayout>
    <template v-if="notFound">
      <h1>Page not found</h1>
      <p>This one sold already. <NuxtLink to="/">Back to the homepage</NuxtLink>.</p>
    </template>
    <template v-else>
      <h1>Something went wrong</h1>
      <p>
        Error {{ error.statusCode }}. Try again in a moment, or
        <NuxtLink to="/">head back to the homepage</NuxtLink>.
      </p>
    </template>
  </NuxtLayout>
</template>

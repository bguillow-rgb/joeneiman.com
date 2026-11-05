<script setup>
import { SITE, NAV } from '~/utils/site';

// Pages opt into the wide measure with definePageMeta({ wide: true }).
const route = useRoute();
const wide = computed(() => Boolean(route.meta.wide));
</script>

<template>
  <div>
    <header class="site-header">
      <NuxtLink class="site-name" to="/">{{ SITE.name }}</NuxtLink>
      <nav class="site-nav">
        <NuxtLink v-for="item in NAV" :key="item.href" :to="item.href">{{ item.label }}</NuxtLink>
      </nav>
    </header>

    <main :class="{ wide }">
      <slot />
    </main>

    <footer class="site-footer">
      <p>Joe Neiman</p>
      <nav>
        <NuxtLink v-for="item in NAV" :key="item.href" :to="item.href">{{ item.label }}</NuxtLink>
      </nav>
    </footer>

    <SiteAnalytics />
    <template v-if="SITE.launched">
      <SchemaPerson />
      <SchemaWebSite />
    </template>
  </div>
</template>

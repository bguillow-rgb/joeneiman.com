<script setup>
import { SITE, FOOTER_NAV } from '~/utils/site';

// Pages opt into the wide measure with definePageMeta({ wide: true }) and
// into a tucked hero (no top padding on main) with { hero: true }.
const route = useRoute();
const wide = computed(() => Boolean(route.meta.wide));
const hasHero = computed(() => Boolean(route.meta.hero));
// Every page closes with the Get in Touch band, except the contact page itself
const showCta = computed(() => route.path !== '/contact');
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <a class="visually-hidden-focusable" href="#main">Skip to content</a>
    <SiteHeader />

    <main id="main" class="flex-grow-1" :class="{ wide, 'has-hero': hasHero }">
      <slot />
    </main>

    <CtaBand v-if="showCta">
      A dealership, an airplane, an early-stage company, or a room that wants a
      real story. If it's one of those, I want to hear about it.
    </CtaBand>

    <footer class="site-footer">
      <p>Joe Neiman</p>
      <nav>
        <NuxtLink v-for="item in FOOTER_NAV" :key="item.href" :to="item.href">{{ item.label }}</NuxtLink>
      </nav>
    </footer>

    <AlertStack />
    <SiteAnalytics />
    <template v-if="SITE.launched">
      <SchemaPerson />
      <SchemaWebSite />
    </template>
  </div>
</template>

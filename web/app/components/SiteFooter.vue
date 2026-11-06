<template>
  <footer class="site-footer">
    <div class="container contained">
      <div class="row">
        <div class="col-12 col-lg-4">
          <div class="footer-brand">
            <BrandMark />
          </div>
          <p class="tagline">{{ SITE.tagline }}</p>
        </div>

        <div v-for="group in FOOTER_GROUPS" :key="group.title" class="col-6 col-md-3 col-lg-2">
          <ul class="list-unstyled" :aria-label="group.title">
            <li v-for="link in group.links" :key="link.label">
              <a v-if="link.external" :href="link.href" target="_blank" rel="noopener">{{ link.label }}</a>
              <NuxtLink v-else :to="link.href">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-12 col-md-3 col-lg-2 text-md-end cta-col">
          <NuxtLink class="btn btn-primary" to="/contact">Get in Touch</NuxtLink>
        </div>

        <div class="col-12"><hr></div>

        <div class="col-12 fine">&copy; {{ year }} {{ SITE.name }}. All rights reserved.</div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { SITE, FOOTER_GROUPS } from '~/utils/site';

const year = new Date().getFullYear();
</script>

<style scoped lang="scss">
.site-footer {
  padding: 60px 0;
  background: var(--bg);

  @media (min-width: $md-min) {
    padding: 80px 0;
  }
}

.footer-brand {
  margin-bottom: 24px;
}

.tagline {
  @include type('body-reduced');
  max-width: 28ch;
  margin: 0 0 40px;
  color: var(--muted);
}

// Same size as the header's button, so the two line up down the right edge
.cta-col {
  margin-bottom: 40px;

  .btn {
    --bs-btn-padding-y: 6px;
    --bs-btn-padding-x: 12px;
    --bs-btn-font-size: #{$nav-font-size};
    --bs-btn-line-height: #{$nav-line-height};
    --bs-btn-border-radius: #{$nav-btn-radius};
  }
}

ul {
  @include type('body-reduced');
  margin-bottom: 40px;

  a {
    display: block;
    margin-bottom: 10px;
    color: var(--muted);
    text-decoration: none;

    &:hover { color: var(--fg); }
  }
}

hr {
  margin: 20px 0 32px;
  border: 0;
  height: 1px;
  background: $hairline;
  opacity: 1;
}

.fine {
  @include type('caption');
  color: var(--muted);
}
</style>

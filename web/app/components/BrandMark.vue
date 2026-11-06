<template>
  <NuxtLink class="brand-mark" to="/" :title="SITE.name" :aria-label="`${SITE.name}, home`">
    JN<span class="dot">.</span><span class="visually-hidden"> {{ SITE.name }}</span>
  </NuxtLink>
</template>

<script setup>
import { SITE } from '~/utils/site';
</script>

<style scoped lang="scss">
// The wordmark: extra-bold "JN" with a primary-blue period. The box is one
// 24px line; the larger period sits on the same baseline with a zero
// line-height so it adds nothing to the box.
.brand-mark {
  display: block;
  height: 24px;
  font-family: $font-display;
  font-size: 24px;
  font-weight: 800;
  line-height: 24px;
  letter-spacing: -0.04em;
  color: #fff;
  text-decoration: none;
  white-space: nowrap;

  &:hover { color: #fff; text-decoration: none; }

  .dot {
    color: var(--bs-primary);
    font-size: 30px;
    line-height: 0;
    vertical-align: baseline;
  }
}
</style>

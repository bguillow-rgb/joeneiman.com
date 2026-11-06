<template>
  <FloatingBar>
    <NuxtLink class="navbar-brand" to="/" :title="SITE.name" :aria-label="`${SITE.name}, home`">JN<span class="dot">.</span><span class="visually-hidden"> {{ SITE.name }}</span></NuxtLink>

    <button
      class="navbar-toggler border-0"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#siteMenu"
      aria-controls="siteMenu"
      aria-label="Open menu"
    >
      <span class="navbar-toggler-icon" aria-hidden="true" />
    </button>

    <div id="siteMenu" class="offcanvas offcanvas-end" tabindex="-1" aria-labelledby="siteMenuLabel">
      <div class="offcanvas-header border-bottom">
        <NuxtLink id="siteMenuLabel" class="navbar-brand offcanvas-title" to="/" :title="SITE.name" :aria-label="`${SITE.name}, home`">JN<span class="dot">.</span><span class="visually-hidden"> {{ SITE.name }}</span></NuxtLink>
        <button
          type="button"
          class="drawer-close"
          data-bs-dismiss="offcanvas"
          data-bs-target="#siteMenu"
          aria-label="Close menu"
        >
          <span class="x" aria-hidden="true" />
        </button>
      </div>

      <div class="offcanvas-body">
        <ul class="navbar-nav">
          <li v-for="item in NAV" :key="item.href" class="nav-item">
            <NuxtLink class="nav-link" :to="item.href" active-class="active">{{ item.label }}</NuxtLink>
          </li>
        </ul>

        <div class="actions ms-lg-auto">
          <NuxtLink class="btn btn-primary" to="/contact">Get in Touch</NuxtLink>
        </div>
      </div>
    </div>
  </FloatingBar>
</template>

<script setup>
import { SITE, NAV } from '~/utils/site';
</script>

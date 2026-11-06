<template>
  <header ref="root" class="site-header">
    <nav class="bar navbar navbar-dark" :class="[{ 'navbar-expand-xl': expand }, `nav-${navAlign}`]" :aria-label="label">
      <slot />
    </nav>
  </header>
</template>

<script setup>
defineProps({
  // false for bars with no menu
  expand: { type: Boolean, default: true },
  label: { type: String, default: 'Main' },
  // 'center' puts the links in the middle of the bar; 'start' runs them after the brand
  navAlign: { type: String, default: 'center' },
});

const root = ref(null);
const route = useRoute();
const { $bootstrap } = useNuxtApp();

watch(
  () => route.fullPath,
  () => {
    const drawer = root.value?.querySelector('.offcanvas');
    if (drawer) $bootstrap?.Offcanvas.getInstance(drawer)?.hide();
  },
);
</script>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: -($header-gap - $header-settle);
  margin-top: $header-offset;
  padding: $header-gap $header-inset 0;
  z-index: 1045;
  container-type: inline-size;
  // Own compositor layer without a transform (a transform here would trap the
  // fixed-position drawer), so the sticky header doesn't repaint on scroll
  backface-visibility: hidden;
}

.bar {
  position: relative;
  max-width: $header-max-width;
  margin: 0 auto;
  height: $header-bar-height;
  padding: 0 $bar-padding-x;
  // Keep the bar's contents on the body text's left edge as the bar narrows:
  // 25px while the bar is capped, less as the contained column closes in
  // (the 32px header inset sets the floor).
  padding-inline: clamp(
    #{$grid-gutter-width * 0.5},
    calc((100cqw - #{$contained-max-width - 2 * $header-inset}) / 2 - #{$header-inset - $grid-gutter-width * 0.5}),
    #{$bar-padding-x}
  );
  border-radius: $bar-radius;

  // The fill and blur live on a pseudo-element rather than the bar, so the
  // filter can't make the bar the containing block for the fixed-position
  // drawer inside it. The blur radius is kept small: the cost of a backdrop
  // blur on scroll scales with its radius.
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    background: $bar-bg;
    -webkit-backdrop-filter: blur($bar-blur);
    backdrop-filter: blur($bar-blur);
    box-shadow: $bar-shadow;
    will-change: transform;
    transform: translateZ(0);
  }

  // The base stylesheet gives every li a bottom margin; nav items get none
  :deep(.nav-item) {
    margin: 0;
  }

  // The brand is a two-letter mark, set extra bold. The box is exactly one
  // 24px line so the bar centers it; the larger period sits on the same
  // baseline with a zero line-height, so it adds nothing to the box.
  // The wordmark itself is BrandMark.vue; this only places it in the bar
  :deep(.navbar-brand) {
    padding: 0;
    margin-right: 20px;
    // Caps sit high in a line box (descender space below); nudge to optical center
    position: relative;
    top: 1px;
  }

  // Links and buttons in the bar share one size: 14px on a 28px line, 40px tall
  :deep(.nav-link),
  :deep(.btn) {
    font-size: $nav-font-size;
    line-height: $nav-line-height;
    padding: 6px 12px;
    border-radius: $nav-btn-radius;
  }

  :deep(.nav-link) {
    font-weight: 500;
    color: var(--fg-soft);

    &:hover,
    &.active {
      color: #fff;
    }
  }

  :deep(.btn) {
    --bs-btn-padding-y: 6px;
    --bs-btn-padding-x: 12px;
    --bs-btn-font-size: #{$nav-font-size};
    --bs-btn-line-height: #{$nav-line-height};
    --bs-btn-border-radius: #{$nav-btn-radius};
    --bs-btn-font-weight: 700;
  }

  :deep(.actions) {
    display: flex;
    gap: 5px;
    margin-left: auto;
  }

  :deep(.navbar-toggler) {
    width: 50px;
    height: 50px;
    padding: 0;
    margin-right: -10px;
    align-items: center;
    justify-content: center;

    &:focus { box-shadow: none; outline: none; }
    &:focus-visible { outline: 2px solid var(--accent); outline-offset: -6px; border-radius: $nav-btn-radius; }

    // The button stays a 50px touch target; the icon itself is 25px
    .navbar-toggler-icon {
      width: 25px;
      height: 25px;
    }
  }

  // Bootstrap hides the toggler from xl up; keep that, and make it flex below
  @media (max-width: $header-break-max) {
    :deep(.navbar-toggler) {
      display: flex;
    }
  }

  @media (min-width: $header-break) {
    :deep(.offcanvas-body),
    :deep(.navbar-nav) {
      align-items: center;
    }

    :deep(.navbar-nav) {
      --bs-navbar-nav-link-padding-x: 12px;
      gap: 0;
      margin: 0;
    }

    // Centered in the bar itself, not in the space left between the brand and the button
    &.nav-center :deep(.navbar-nav) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    // Left-aligned: the links run on from the brand, first link flush with its edge
    &.nav-start :deep(.navbar-nav) {
      margin-left: -12px;
    }
  }
}

// Compact horizontal geometry: the bar sits 12px inside a full-bleed hero
@media (max-width: $header-compact-max) {
  .site-header {
    padding-left: $header-inset-mobile;
    padding-right: $header-inset-mobile;
  }

  .bar {
    max-width: none;
    padding-inline: $bar-padding-mobile;
  }
}

// Mobile vertical rhythm: shorter gap, no offset above the hero
@media (max-width: $header-mobile-max) {
  .site-header {
    top: -($header-gap-mobile - $header-settle-mobile);
    margin-top: 0;
    padding-top: $header-gap-mobile;
  }

  .bar {
    height: $header-bar-height-mobile;
  }
}

// Slide-in drawer below the xl breakpoint
@media (max-width: $header-break-max) {
  .bar :deep(.offcanvas) {
    --bs-offcanvas-width: #{$drawer-width};
    --bs-offcanvas-bg: #{$bg-alt};
    --bs-offcanvas-color: #{$fg};
    --bs-offcanvas-padding-x: 30px;
    --bs-offcanvas-padding-y: 30px;
    --bs-offcanvas-border-width: 0;
  }

  .bar :deep(.offcanvas-header) {
    height: $drawer-header-height;
    padding: 0 0 0 30px;
    align-items: center;
    background: $bg-nav;
    border-bottom: 0 !important;

    .navbar-brand { margin: 0; }

    // Close button: a 60x80 touch target holding a 25x25 X drawn from two
    // 2px strokes, the same weight and footprint as the hamburger icon
    .drawer-close {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: $drawer-header-height;
      margin: 0 0 0 auto;
      padding: 0;
      border: 0;
      border-radius: 0;
      background: none;
      color: var(--fg);
      opacity: 0.85;
      cursor: pointer;

      &:hover { opacity: 1; }

      // No ring after a tap; keyboard focus gets a tight outline instead
      &:focus { box-shadow: none; outline: none; }
      &:focus-visible { outline: 2px solid var(--accent); outline-offset: -6px; border-radius: $nav-btn-radius; }

      .x {
        position: relative;
        display: block;
        width: 25px;
        height: 25px;

        &::before,
        &::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 25px;
          height: 2px;
          background: currentColor;
          border-radius: 1px;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        &::after { transform: translate(-50%, -50%) rotate(-45deg); }
      }
    }
  }

  .bar :deep(.offcanvas-body) {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }

  .bar :deep(.navbar-nav) {
    position: static;
    transform: none;
  }

  .bar :deep(.nav-item) {
    border-bottom: 1px solid $hairline;
  }

  .bar :deep(.nav-link) {
    display: block;
    padding: 5px 12px;
    margin: 0 -12px;
    font-size: 18px;
    font-weight: 500;
    line-height: 45px;
    color: var(--fg);
    border-radius: $nav-btn-radius;

    &:hover,
    &.active {
      background: $surface;
      color: #fff;
    }
  }

  .bar :deep(.actions) {
    display: grid;
    gap: 10px;
    margin: auto -30px 0;
    padding: 20px 30px 0;
    border-top: 1px solid $hairline;

    .btn {
      display: block;
      text-align: center;
      --bs-btn-padding-y: 12px;
      --bs-btn-line-height: 1.4;
      --bs-btn-font-size: 16px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-header :deep(*) {
    transition: none !important;
  }
}
</style>

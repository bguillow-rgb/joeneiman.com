<template>
  <section class="container" :class="{ tuck }">
    <div class="hero" :class="[`hero-${size}`, { 'hero-welcome': welcome, 'hero-fade': fade }]">
      <img
        class="photo"
        :src="url(image)"
        :alt="alt"
        :width="width || undefined"
        :height="height || undefined"
        loading="eager"
        fetchpriority="high"
        :style="{ objectPosition: position }"
      >
      <div class="dots" :style="{ backgroundImage: `url(${url('/assets/dot-matrix.png')})` }" aria-hidden="true" />
      <div class="shade" aria-hidden="true" />

      <div class="body">
        <slot name="top" />
        <p v-if="eyebrow || $slots.eyebrow" class="eyebrow">
          <slot name="eyebrow">{{ eyebrow }}</slot>
        </p>
        <h1 :class="welcome ? 'typography-welcome-headline' : null">
          <slot name="title">{{ title }}</slot>
        </h1>
        <div v-if="$slots.default" class="lede">
          <slot />
        </div>
        <div v-if="$slots.actions" class="actions">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  eyebrow: { type: String, default: '' },
  // Root-relative path under /public, e.g. /assets/photos/cockpit.jpg
  image: { type: String, required: true },
  alt: { type: String, default: '' },
  width: { type: [Number, String], default: '' },
  height: { type: [Number, String], default: '' },
  // CSS object-position for the crop
  position: { type: String, default: 'center 40%' },
  // 'lg' | 'sm'
  size: { type: String, default: 'lg' },
  // Home page: the largest headline style
  welcome: { type: Boolean, default: false },
  // Pull up under the floating header so the bar sits over the image
  tuck: { type: Boolean, default: true },
  // Dissolve the photo into the page background instead of a hard rounded edge
  fade: { type: Boolean, default: true },
});

const url = useUrl();
</script>

<style scoped lang="scss">
.tuck {
  margin-top: -$header-height;

  .hero {
    padding-top: $header-height;
  }

  @media (max-width: $header-mobile-max) {
    margin-top: -$header-height-mobile;

    .hero {
      padding-top: $header-height-mobile;
    }
  }
}

// The copy is anchored bottom-left: the hero has a minimum height and the
// body is pushed to the bottom of it.
.hero {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: clamp(420px, 72vh, 760px);
  border-radius: $radius-hero;
  margin-bottom: 3rem;
  background: var(--bg-alt);
  color: var(--fg);
}

.hero-lg {
  min-height: clamp(480px, 84vh, 840px);
}

// Faded variant: the photo and texture dissolve into the page background at
// the bottom edge; the sides and top keep the rounded card edge.
.hero-fade {
  border-radius: $radius-hero $radius-hero 0 0;
  background: transparent;

  // Only the bottom quarter dissolves; the hero keeps its full height
  .photo,
  .dots {
    -webkit-mask-image: linear-gradient(to bottom, #000 72%, transparent 100%);
    mask-image: linear-gradient(to bottom, #000 72%, transparent 100%);
  }

  .shade {
    background: linear-gradient(to top, var(--bg) 0%, rgba(0, 0, 0, 0.75) 22%, rgba(0, 0, 0, 0.4) 45%, rgba(0, 0, 0, 0) 75%);
  }
}

.photo {
  position: absolute;
  inset: 0;
  z-index: -3;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

// Dot-matrix texture over the photo, under the gradient
.dots {
  position: absolute;
  inset: 0;
  z-index: -2;
  background-repeat: repeat;
  background-position: center;
  background-size: 10px 10px;
  opacity: 0.3;
}

.shade {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.92) 0%, rgba(0, 0, 0, 0.55) 40%, rgba(0, 0, 0, 0) 75%);
}

// The section is a size container so the copy inset can be derived from the
// hero's actual width (see .body)
.container {
  container-type: inline-size;
}

// Copy sits lower-left; the top padding only keeps it clear of the bar.
// The horizontal inset is half the difference between the hero and the
// contained column, so the copy's left edge matches the body text at every
// viewport: 90.5px when the hero is capped, shrinking to 0 as it narrows.
.body {
  position: relative;
  // Phones: copy sits on the bar's contents (inset + bar padding)
  padding: (140px - $header-height-mobile) ($header-inset-mobile + $bar-padding-mobile) 48px;

  // Tablets and small desktops keep the desktop vertical rhythm with the
  // compact 24px inset
  @media (min-width: $lg-min) {
    padding-block: (200px - $header-height) 72px;
  }

  // Capped container: the inset is derived from the hero's width so the copy
  // lands on the contained column
  @media (min-width: $header-desktop-min) {
    padding-inline: max(0px, calc((100cqw - #{$contained-max-width - $grid-gutter-width}) / 2));
  }
}

.hero-sm {
  min-height: 0;

  .body {
    padding-block: 2.5rem 3.5rem;

    @media (min-width: $md-min) {
      padding-block: 4rem 5rem;
    }
  }
}

.eyebrow {
  @include type('eyebrow-reduced');
  margin: 0 0 0.75rem;
  color: var(--accent);
}

h1 {
  margin: 0 0 0.5rem;
  color: #fff;
}

.lede {
  @include type('intro');
  font-weight: 500;
  max-width: 40rem;
  margin: 0;
  color: var(--fg-soft);

  :deep(p) {
    @include type('intro');
    font-weight: 500;
    margin: 0;
  }
}

// <b> anywhere in the hero copy is pure white, semibold
.body :deep(b),
.body :deep(strong) {
  color: #fff;
  font-weight: 600;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

// Compact range: the hero runs edge to edge under the inset bar
@media (max-width: $header-compact-max) {
  .hero,
  .hero-lg {
    margin: 0 calc(var(--bs-gutter-x) * -0.5) 2.5rem;
    border-radius: 0;
  }
}

// Phones: a full-height hero (small-viewport height, so browser chrome doesn't
// hide the bottom), capped so tall or landscape screens don't overdo it
@media (max-width: $sm-max) {
  .hero,
  .hero-lg {
    min-height: 100vh;
    min-height: min(100svh, 900px);
  }

  .hero-sm {
    min-height: 0;
  }
}
</style>

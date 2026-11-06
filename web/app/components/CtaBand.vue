<template>
  <section class="container cta-wrap">
    <div class="cta-band">
      <img class="photo" :src="url(image)" alt="" :style="{ objectPosition: position }" loading="lazy">
      <div class="dots" :style="{ backgroundImage: `url(${url('/assets/dot-matrix.png')})` }" aria-hidden="true" />
      <div class="shade" aria-hidden="true" />

      <div class="body" v-reveal.children>
        <p class="upper-tag">{{ eyebrow }}</p>
        <h2 class="title">{{ title }}</h2>
        <p class="copy"><slot /></p>
        <div class="actions">
          <NuxtLink class="btn btn-primary" :to="to">{{ linkText }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: 'Get in touch' },
  title: { type: String, default: 'Got something worth a look?' },
  to: { type: String, default: '/contact' },
  linkText: { type: String, default: 'Get in Touch' },
  image: { type: String, default: '/assets/photos/wing-sunset.jpg' },
  position: { type: String, default: 'center 60%' },
});

const url = useUrl();
</script>

<style scoped lang="scss">
// Same footprint and copy inset as the hero, so the band's edge and text
// line up with everything above it
.cta-wrap {
  container-type: inline-size;
  margin-bottom: $band-margin;

  @media (max-width: $sm-max) {
    margin-bottom: $band-margin-mobile;
  }
}

.cta-band {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: $radius-tile;
  background: var(--bg-alt);
  color: var(--fg);
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

// Dots sit above the gradient here, since the band's shade is heavy enough
// to hide them otherwise
.dots {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-repeat: repeat;
  background-position: center;
  background-size: 10px 10px;
  opacity: 0.5;
}

.shade {
  position: absolute;
  inset: 0;
  z-index: -2;
  background: linear-gradient(to right, rgba(10, 11, 13, 0.92) 0%, rgba(10, 11, 13, 0.7) 55%, rgba(10, 11, 13, 0.35) 100%);
}

.body {
  position: relative;
  padding: 60px ($header-inset-mobile + $bar-padding-mobile);

  @media (min-width: $lg-min) {
    padding-block: 120px;
  }

  @media (min-width: $header-desktop-min) {
    padding-inline: max(0px, calc((100cqw - #{$contained-max-width - $grid-gutter-width}) / 2));
  }
}

.upper-tag {
  @include type('body-reduced');
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin: 0 0 0.75rem;
}

.title {
  @include type('headline-elevated');
  max-width: 14ch;
  margin: 0 0 1rem;
  color: #fff;
  text-wrap: balance;
}

.copy {
  @include type('intro');
  font-weight: 500;
  max-width: 40rem;
  margin: 0;
  color: var(--fg-soft);
}

.actions {
  margin-top: 1.75rem;
}
</style>

<template>
  <NuxtLink :to="to" class="feature-card">
    <div class="row g-0">
      <div class="col-md-4 media">
        <img class="card-img" :src="url(image)" :alt="alt" :style="{ objectPosition: position }" loading="lazy">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <p v-if="eyebrow" class="upper-tag">{{ eyebrow }}</p>
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-text"><slot /></p>
          <span class="more">{{ linkText }} <i class="fa-solid fa-chevron-right" aria-hidden="true" /></span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  to: { type: String, required: true },
  // Root-relative path under /public
  image: { type: String, required: true },
  alt: { type: String, default: '' },
  position: { type: String, default: 'center' },
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  linkText: { type: String, default: 'Learn more' },
});

const url = useUrl();
</script>

<style scoped lang="scss">
// One link, image left, copy right. Stacks on phones.
.feature-card {
  display: block;
  overflow: hidden;
  margin-bottom: 25px;
  background: var(--bg-alt);
  border-radius: $radius-tile;
  color: var(--fg);
  text-decoration: none;
  box-shadow: 0 0 0 1px $hairline;
  transition:
    box-shadow 0.4s cubic-bezier(0.19, 1, 0.22, 1),
    transform 0.4s cubic-bezier(0.19, 1, 0.22, 1),
    background-color 0.15s ease;
  // Keep a stable compositor layer: the hover transform otherwise creates and
  // destroys one as the blurred header scrolls past, which flickers
  will-change: transform;
  backface-visibility: hidden;

  &:hover {
    color: var(--fg);
    text-decoration: none;
    background: var(--surface);
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.14), 0 12px 32px rgba(0, 0, 0, 0.5);
    transform: translateY(-2px);

    .more i { transform: translateX(3px); }
  }

  @media (max-width: $sm-max) {
    margin-bottom: 20px;
  }
}

// The image fills whatever height the copy sets, and the copy is kept
// compact so the card stays around $card-height on desktop.
$card-height: 240px;

.media {
  position: relative;

  @media (min-width: $md-min) {
    min-height: $card-height;
  }
}

.card-img {
  display: block;
  width: 100%;
  object-fit: cover;
  border-radius: 0;

  @media (min-width: $md-min) {
    position: absolute;
    inset: 0;
    height: 100%;
  }

  @media (max-width: $sm-max) {
    aspect-ratio: 16 / 10;
  }
}

.card-body {
  padding: 28px 32px;

  @media (min-width: $md-min) {
    min-height: $card-height;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: $sm-max) {
    padding: 30px 25px;
  }
}

.upper-tag {
  @include type('body-reduced');
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--accent);
  margin: 0 0 0.5rem;
}

.card-title {
  @include type('eyebrow');
  margin: 0 0 12px;
  color: #fff;
}

.card-text {
  color: var(--fg-soft);
  margin: 0 0 1rem;
}

.more {
  @include type('body');
  font-weight: 500;
  color: var(--accent);

  i {
    font-size: 0.75em;
    margin-left: 0.35em;
    transition: transform 0.15s ease;
  }
}
</style>

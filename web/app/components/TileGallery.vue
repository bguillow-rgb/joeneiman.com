<template>
  <section class="container contained tile-gallery">
    <div class="intro" v-reveal.children>
      <p v-if="eyebrow" class="upper-tag">{{ eyebrow }}</p>
      <h2 v-if="title">{{ title }}</h2>
      <div class="lede-copy"><slot /></div>
    </div>

    <div ref="scroller" :class="fixed ? 'grid' : 'scroller'" @scroll.passive="update" v-reveal.children>
      <NuxtLink
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        :target="item.target"
        class="tile"
      >
        <div class="media" :style="item.bg ? { background: item.bg } : null">
          <img
            :src="url(item.image)"
            :alt="item.alt"
            :style="{ objectPosition: item.position || 'center', objectFit: item.fit || 'cover', mixBlendMode: item.blend || null }"
            loading="lazy"
          >
        </div>
        <p class="caption"><b>{{ item.title }}.</b> {{ item.text }}</p>
        <p v-if="item.showUrl" class="link">
          {{ hostOf(item.to) }}
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
        </p>
      </NuxtLink>
    </div>

    <div v-if="!fixed" class="controls" v-reveal="{ with: '.scroller .tile', delay: 180 }">
      <button type="button" class="paddle" :disabled="atStart" aria-label="Previous" @click="step(-1)">
        <i class="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>
      <button type="button" class="paddle" :disabled="atEnd" aria-label="Next" @click="step(1)">
        <i class="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  // [{ image, alt, position, fit, bg, blend, title, text, to, target, showUrl }]
  // fit: 'contain' with a bg colour shows a product shot whole instead of cropping it;
  // blend: 'multiply' with a bg colour tints a white-background shot to that colour
  items: { type: Array, required: true },
  // Lay the tiles out in a plain two-up grid instead of the swipeable row
  fixed: { type: Boolean, default: false },
});

const url = useUrl();
// "marici.org" for an external link's display line
const hostOf = (to) => to.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

const scroller = ref(null);
const atStart = ref(true);
const atEnd = ref(false);

function update() {
  const el = scroller.value;
  if (!el) return;
  atStart.value = el.scrollLeft <= 2;
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
}

function step(dir) {
  const el = scroller.value;
  if (!el) return;
  const first = el.querySelector('.tile');
  const by = first ? first.getBoundingClientRect().width + 24 : el.clientWidth * 0.6;
  el.scrollBy({ left: dir * by, behavior: 'smooth' });
}

onMounted(() => {
  update();
  window.addEventListener('resize', update, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('resize', update));
</script>

<style scoped lang="scss">
$gap: 24px;

.tile-gallery {
  margin-bottom: $band-margin;

  @media (max-width: $sm-max) {
    margin-bottom: $band-margin-mobile;
  }
}

.intro {
  max-width: 48rem;
  margin-bottom: 56px;

  h2 {
    margin: 0 0 2rem;
  }

  @media (max-width: $sm-max) {
    margin-bottom: 62px;
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

// Same treatment as the "What I'm looking for" copy
.lede-copy :deep(p) {
  @include type('intro');
  font-weight: 500;
  color: var(--fg-soft);
  margin: 0 0 2rem;

  &:last-child { margin-bottom: 0; }

  b, strong { color: #fff; font-weight: 600; }
}

// The row starts on the content edge and runs off the right edge of the
// viewport; the trailing padding lets the last tile scroll fully into view
.scroller {
  display: flex;
  gap: $gap;
  // Starts on the content edge, extends to the viewport's right edge
  width: calc(100% + (50vw - 50%));
  margin-right: calc(50% - 50vw);
  padding-right: calc(50vw - 50%);
  // Room for the reveal rise so the tiles aren't clipped while animating
  padding-bottom: 32px;
  margin-bottom: -32px;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  touch-action: pan-x pan-y;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar { display: none; }
}

// Fixed variant: two tiles side by side, stacked on phones
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $gap;

  @media (min-width: $md-min) {
    grid-template-columns: repeat(2, 1fr);
  }

  .tile { width: auto; }
}

.tile {
  flex: 0 0 auto;
  width: 42%;
  scroll-snap-align: start;
  color: var(--fg);
  text-decoration: none;

  // Phones and tablets: one full tile plus a third of the next in view,
  // so the row reads as swipeable
  @media (max-width: $md-max) {
    width: calc((100% - #{$gap}) * 0.75);
  }

  &:hover { color: var(--fg); text-decoration: none; }
}

.media {
  aspect-ratio: 3 / 2;
  overflow: hidden;

  // Shorter frames on desktop
  @media (min-width: $lg-min) {
    aspect-ratio: 16 / 9;
  }
  border-radius: $radius-tile;
  background: var(--bg-alt);
  box-shadow: 0 0 0 1px $hairline;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }
}

.caption {
  @include type('body');
  max-width: 44ch;
  margin: 1.25rem 0 0;
  padding-right: 24px;
  color: var(--muted);

  b { color: var(--fg); font-weight: 600; }
}

// External link line under the caption
.link {
  @include type('body');
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin: 0.75rem 0 0;
  color: var(--accent);

  i { font-size: 0.7em; }
}

.tile:hover .link { color: var(--accent-hover); }

.controls {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
}

.paddle {
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: var(--bg-alt);
  color: var(--fg);
  box-shadow: 0 0 0 1px $hairline;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) { background: var(--surface); }
  &:disabled { opacity: 0.35; cursor: default; }
  &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
}
</style>

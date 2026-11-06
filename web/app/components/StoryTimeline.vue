<template>
  <section class="container contained story-timeline">
    <div v-if="eyebrow || title || $slots.default" class="intro" v-reveal.children>
      <p v-if="eyebrow" class="upper-tag">{{ eyebrow }}</p>
      <h2 v-if="title">{{ title }}</h2>
      <div v-if="$slots.default" class="lede-copy"><slot /></div>
    </div>

    <div ref="spine" class="chapters">
      <span ref="fill" class="fill" aria-hidden="true" />

      <ol class="list">
      <li v-for="item in items" :key="item.key" class="chapter" v-reveal>
        <div class="card">
          <div
            v-if="item.media?.length"
            class="media"
            :class="`n${Math.min(item.media.length, 4)}`"
            :style="{ aspectRatio: item.ratio || '16 / 9' }"
          >
            <div v-for="(m, i) in item.media" :key="i" class="cell" :class="m.type === 'video' ? 'video' : 'image'">
              <VideoFrame
                v-if="m.type === 'video'"
                :embed="m.embed"
                :src="local(m.src)"
                :poster="local(m.poster)"
                :autoplay="m.autoplay"
                :loop="m.loop"
                :title="m.title || item.title"
                :style="m.zoom ? { transform: `scale(${m.zoom})` } : null"
              />
              <img
                v-else
                :src="url(m.src)"
                :alt="m.alt || ''"
                :width="m.width || undefined"
                :height="m.height || undefined"
                :style="{ objectPosition: m.position || 'center' }"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>

          <div class="copy">
            <p v-if="item.eyebrow" class="upper-tag">{{ item.eyebrow }}</p>
            <h3 v-if="item.title">{{ item.title }}</h3>
            <div class="text"><slot :name="item.key" /></div>
            <p v-if="item.caption" class="caption">{{ item.caption }}</p>
          </div>
        </div>
      </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
// A vertical timeline with no dates: one spine down the middle, chapters
// alternating left and right of it, each one a raised tile with its media on
// top and the site's usual eyebrow / headline / copy block below. The spine
// fills with the accent colour as the reader scrolls down it. On phones and
// tablets the spine moves to the left edge and the tiles stack.
//
//   items: [{
//     key,                  // names the slot that holds the chapter's copy
//     eyebrow, title,
//     caption,              // optional line under the copy, for photo credits
//     ratio,                // CSS aspect-ratio of the media frame, default 16 / 9
//     media: [
//       { type: 'image', src, alt, position, width, height },
//       { type: 'video', embed | src, poster, autoplay, loop, title, zoom },
//     ],
//   }]
//
// `zoom` scales a player up a touch (1.03 = 3%) so the frame clips its
// edges, for a source with a stray line baked into it.
//
// The media frame is one fixed box however many items it holds: one fills
// it; two sit side by side; three put the first item tall on the left and
// stack the other two on the right; four make a 2 x 2 grid.
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  items: { type: Array, required: true },
});

const url = useUrl();
// Root-relative paths get the base URL; hosted URLs pass through
const local = (p) => (p && p.startsWith('/') ? url(p) : p || '');

// The accent fill runs from the top of the spine down to a point a little
// above the middle of the viewport, so it keeps pace with the reader
const spine = ref(null);
const fill = ref(null);
let frame = 0;

function update() {
  frame = 0;
  if (!spine.value || !fill.value) return;
  const r = spine.value.getBoundingClientRect();
  const reach = window.innerHeight * 0.6 - r.top;
  fill.value.style.height = `${Math.max(0, Math.min(r.height, reach))}px`;
}
function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

onMounted(() => {
  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', schedule);
  window.removeEventListener('resize', schedule);
  cancelAnimationFrame(frame);
});
</script>

<style scoped lang="scss">
$dot: 12px;
$line: 2px;
$reach: 72px;           // spine to card edge on desktop
$dot-top: 44px;         // dot's offset from the card's top edge
$overlap: 160px;        // each card starts this far above the previous one's bottom
$gap-mobile: 28px;
$marker-mobile: 40px;   // spine column on phones and tablets
$cell-gap: 4px;

.story-timeline {
  margin-bottom: $band-margin;

  @media (max-width: $sm-max) {
    margin-bottom: $band-margin-mobile;
  }
}

// Same intro block as the tile gallery and the path grid
.intro {
  max-width: 48rem;
  margin-bottom: 64px;

  h2 {
    margin: 0 0 2rem;
  }

  @media (max-width: $sm-max) {
    margin-bottom: 48px;
  }
}

.upper-tag {
  @include type('body-reduced');
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0;
  color: var(--accent);
  margin: 0 0 0.75rem;
}

.lede-copy :deep(p) {
  @include type('intro');
  font-weight: 500;
  color: var(--fg-soft);
  margin: 0 0 2rem;

  &:last-child { margin-bottom: 0; }

  b, strong { color: #fff; font-weight: 600; }
}

// The spine: a divider-coloured line with the accent fill laid over it. The
// fill sits beside the list, not in it, so the list holds only items.
.chapters {
  position: relative;

  &::before,
  .fill {
    content: '';
    position: absolute;
    top: 0;
    width: $line;
    border-radius: $line;
    pointer-events: none;
  }

  &::before {
    bottom: 0;
    background: var(--line);
  }

  .fill {
    height: 0;
    background: var(--accent);
  }
}

.list {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

.chapter {
  position: relative;
  margin: 0;

  // Dot on the spine and the tick that joins it to the card
  &::before,
  &::after {
    content: '';
    position: absolute;
    pointer-events: none;
  }

  &::before {
    top: $dot-top;
    width: $dot;
    height: $dot;
    border-radius: 50%;
    background: var(--bg);
    box-shadow: inset 0 0 0 $line var(--line);
    transition: box-shadow 0.5s ease, background-color 0.5s ease;
    z-index: 1;
  }

  &::after {
    top: $dot-top + ($dot - 1px) * 0.5;
    height: 1px;
    background: var(--line);
  }

  // The dot lights up as the card reveals
  &.is-visible::before {
    background: var(--accent);
    box-shadow: inset 0 0 0 $line var(--accent), 0 0 0 4px var(--bg);
  }
}

// Phones and tablets: spine down the left, cards stacked beside it
@media (max-width: $md-max) {
  .chapters {
    padding-top: 8px;

    &::before,
    .fill {
      left: ($dot - $line) * 0.5;
    }
  }

  .chapter {
    margin-left: $marker-mobile;
    margin-bottom: $gap-mobile;

    &:last-child { margin-bottom: 0; }

    &::before { left: -$marker-mobile; }

    &::after {
      left: -($marker-mobile - $dot);
      width: $marker-mobile - $dot;
    }
  }
}

// Desktop: spine down the centre, cards alternating sides and overlapping
// vertically so the sequence zig-zags down the page. The overlap assumes
// every card is taller than twice $overlap, which a 16:9 frame guarantees.
@media (min-width: $lg-min) {
  .chapters {
    padding-top: 12px;

    &::before,
    .fill {
      left: 50%;
      margin-left: -$line * 0.5;
    }
  }

  .chapter {
    width: calc(50% - #{$reach});
    margin-top: -$overlap;

    &:first-child { margin-top: 0; }

    &:nth-child(odd) {
      align-self: flex-start;

      &::before { right: -($reach + $dot * 0.5); }
      &::after { right: -($reach - $dot * 0.5); width: $reach - $dot * 0.5; }
    }

    &:nth-child(even) {
      align-self: flex-end;

      &::before { left: -($reach + $dot * 0.5); }
      &::after { left: -($reach - $dot * 0.5); width: $reach - $dot * 0.5; }
    }
  }
}

// The tile: media flush at the top, copy below, like the feature cards
.card {
  overflow: hidden;
  background: var(--bg-alt);
  border-radius: $radius-tile;
  box-shadow: 0 0 0 1px $hairline;
}

// One fixed frame, divided between however many items it holds. The frame's
// height comes from its aspect ratio alone: every item is positioned out of
// flow, so a tall photo can't stretch its row.
.media {
  display: grid;
  grid-auto-rows: minmax(0, 1fr);
  gap: $cell-gap;
  background: var(--bg-alt);

  &.n2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }

  &.n3 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));

    .cell:first-child { grid-row: 1 / span 2; }
  }

  &.n4 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
}

.cell {
  position: relative;
  min-width: 0;
  min-height: 0;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0;
  }

  // The player fills its cell instead of setting its own 16:9
  :deep(.video-wrapper) {
    position: absolute;
    inset: 0;
    aspect-ratio: auto;
    margin: 0;
    border-radius: 0;
  }
}

.copy {
  padding: 32px 36px 36px;

  @media (max-width: $sm-max) {
    padding: 28px 25px 30px;
  }

  h3 {
    @include type('eyebrow-elevated');
    margin: 0 0 0.75rem;
    color: #fff;
  }
}

.text :deep(p) {
  color: var(--fg-soft);
  margin: 0 0 1rem;

  &:last-child { margin-bottom: 0; }

  b, strong { color: #fff; font-weight: 600; }
}

.caption {
  @include type('body-reduced');
  color: var(--muted);
  margin: 1.25rem 0 0;
}
</style>

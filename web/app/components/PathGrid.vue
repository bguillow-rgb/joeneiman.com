<template>
  <section class="container contained path-grid">
    <div class="intro" v-reveal.children>
      <p v-if="eyebrow" class="upper-tag">{{ eyebrow }}</p>
      <h2 v-if="title">{{ title }}</h2>
      <div class="lede-copy"><slot /></div>
    </div>

    <ul class="grid" v-reveal.children>
      <li v-for="item in items" :key="item.to">
        <NuxtLink :to="item.to" class="tile">
          <span v-if="item.icon" class="icon" aria-hidden="true"><i :class="item.icon" /></span>
          <span class="title">{{ item.title }}</span>
          <span class="text">{{ item.text }}</span>
          <span class="more">
            {{ item.more || 'Learn more' }}
            <i class="fa-solid fa-chevron-right" aria-hidden="true" />
          </span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  // [{ to, title, text, more, icon }]
  items: { type: Array, required: true },
});
</script>

<style scoped lang="scss">
$gap: 24px;

.path-grid {
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
    margin-bottom: 40px;
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

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: $gap;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (min-width: $md-min) {
    grid-template-columns: repeat(2, 1fr);
  }
}

li {
  margin: 0;
  min-width: 0;
}

// Each tile is one link: icon, headline, copy, then the "more" line held
// at the bottom so the four line up
.tile {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  padding: 40px;
  background: var(--bg-alt);
  border-radius: $radius-tile;
  color: var(--fg);
  text-decoration: none;
  transition: background-color 0.2s ease;

  @media (max-width: $sm-max) {
    min-height: 0;
    padding: 32px 28px;
  }

  &:hover,
  &:focus-visible {
    background: var(--surface);
    color: var(--fg);
    text-decoration: none;

    .more i { transform: translate3d(3px, 0, 0); }
  }
}

.icon {
  display: block;
  font-size: 30px;
  line-height: 1;
  color: var(--accent);
  margin-bottom: 1.5rem;
}

.title {
  @include type('eyebrow-elevated');
  display: block;
  color: #fff;
  margin-bottom: 0.75rem;
}

.text {
  @include type('body');
  display: block;
  color: var(--muted);
  max-width: 32rem;
}

.more {
  @include type('body');
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  margin-top: auto;
  padding-top: 1.75rem;
  color: var(--accent);

  i {
    font-size: 0.7em;
    transition: transform 0.2s ease;
  }
}
</style>

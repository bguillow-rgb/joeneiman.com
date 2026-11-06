<template>
  <section class="container contained sticky-section">
    <div class="row">
      <div class="col-12 col-lg-4">
        <div class="sticky-copy" v-reveal.children>
          <p v-if="eyebrow || $slots.eyebrow" class="upper-tag">
            <slot name="eyebrow">{{ eyebrow }}</slot>
          </p>
          <h2 v-if="title || $slots.title">
            <slot name="title">{{ title }}</slot>
          </h2>
          <slot name="copy" />
          <div v-if="$slots.actions" class="actions">
            <slot name="actions" />
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
});
</script>

<style scoped lang="scss">
.sticky-section {
  margin-bottom: $band-margin;

  @media (max-width: $sm-max) {
    margin-bottom: $band-margin-mobile;
  }

  @media (max-width: $md-max) {
    max-width: 650px;
  }
}

// The copy stays put while the cards scroll past it. The offset clears the
// stuck header bar plus the part of its gap that stays visible.
.sticky-copy {
  margin-bottom: 60px;

  @media (min-width: $lg-min) {
    position: sticky;
    top: $header-bar-height + $header-settle + 40px;
    margin-bottom: 20px;
    padding-right: 30px;
    // Own layer: a sticky block under a blurred sticky header is otherwise
    // re-rasterized on every scroll frame
    will-change: transform;
  }

  h2 {
    @include type('headline-reduced');
    margin: 0 0 1rem;
  }

  :deep(p) {
    color: var(--fg-soft);
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

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>

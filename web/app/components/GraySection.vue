<template>
  <section class="container band-wrap">
    <div class="band">
      <div class="container contained position-relative">
        <p v-if="eyebrow || $slots.eyebrow" class="eyebrow">
          <slot name="eyebrow">{{ eyebrow }}</slot>
        </p>
        <h2 v-if="title || $slots.title" class="band-title">
          <slot name="title">{{ title }}</slot>
        </h2>
        <p v-if="lead || $slots.lead" class="lede band-lead">
          <slot name="lead">{{ lead }}</slot>
        </p>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  lead: { type: String, default: '' },
});
</script>

<style scoped lang="scss">
// The band spans the full container; the copy sits in the contained width.
.band {
  background: var(--bg-alt);
  border-radius: $radius-tile;
  padding: $band-padding 0;
  margin-bottom: $band-margin;

  @media (max-width: $sm-max) {
    padding: $band-padding-mobile 0;
    margin-bottom: $band-margin-mobile;
  }
}

.eyebrow {
  @include type('eyebrow-reduced');
  margin: 0 0 0.75rem;
  color: var(--accent);
}

.band-title {
  margin-top: 0;
}

.band-lead {
  max-width: 40rem;
  margin-bottom: 2rem;
  color: var(--fg-soft);
}
</style>

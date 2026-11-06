<template>
  <div class="video-wrapper">
    <iframe
      v-if="embed"
      :src="embed"
      :title="title"
      loading="lazy"
      allow="autoplay; fullscreen; picture-in-picture"
      allowfullscreen
    />
    <video
      v-else
      :src="src"
      :poster="poster"
      :autoplay="autoplay"
      :muted="autoplay"
      :loop="loop"
      playsinline
      :controls="!autoplay"
      preload="metadata"
    />
  </div>
</template>

<script setup>
defineProps({
  // Hosted player URL (Vimeo, YouTube) rendered in an iframe
  embed: { type: String, default: '' },
  // Or a self-hosted file
  src: { type: String, default: '' },
  poster: { type: String, default: '' },
  autoplay: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  title: { type: String, default: 'Video' },
});
</script>

<style scoped lang="scss">
// Rounded 16:9 frame
.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #000;
  border-radius: $radius-tile;

  @media (max-width: $md-max) {
    margin-bottom: 30px;
  }

  iframe,
  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: cover;
  }
}
</style>

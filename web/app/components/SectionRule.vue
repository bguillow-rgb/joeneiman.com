<template>
  <hr class="section-rule">
</template>

<style scoped lang="scss">
// A hairline across the full viewport between sections. Its margins collapse
// with the neighbouring sections' margins, so the line always sits
// $band-margin from the content on both sides.
.section-rule {
  width: 100vw;
  height: 1px;
  margin: $band-margin 0 $band-margin calc(50% - 50vw);
  border: 0;
  background: $hairline;
  opacity: 1;

  @media (max-width: $sm-max) {
    margin-top: $band-margin-mobile;
    margin-bottom: $band-margin-mobile;
  }
}
</style>

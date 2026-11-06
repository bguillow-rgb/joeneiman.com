<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Writing',
  path: '/writing',
  description: 'Essays from Joe Neiman on entrepreneurship, deals, flying, and health. A book is on the way.',
});
</script>

<template>
  <div>
    <PageHero
      eyebrow="Essays"
      title="Writing"
      image="/assets/photos/joe-neiman-skiing.jpg"
      alt="Joe Neiman in backcountry ski gear on a mountain ridge"
      width="3000"
      height="2000"
      position="66.667% 20%"
    >
      One substantial piece at a time: a decision I just made, an opportunity I
      chased or passed on, a story from the auction business or the hangar, and
      what each one taught me.
    </PageHero>

    <div class="page-body">
      <div class="signup" v-reveal.children>
        <p class="upper-tag">Newsletter</p>
        <h2>Get the essays</h2>
        <p>
          The essays are on their way, and they all feed the bigger project: a book
          about entrepreneurship built from what actually happened to me, the wins and
          the mistakes both. Leave an email and each one lands in your inbox when it's done.
        </p>
        <NewsletterForm />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// One centered column: heading, a line of copy, the form
.signup {
  max-width: 36rem;
  margin: 0 auto;
  padding: 1rem 0 $band-margin;
  text-align: center;

  h2 { margin: 0 0 1.5rem; }

  .upper-tag { margin-bottom: 0.75rem; }

  p:not(.upper-tag) {
    @include type('intro');
    font-weight: 500;
    color: var(--fg-soft);
    margin: 0 0 2rem;
  }

  :deep(.newsletter) { margin: 0 auto; }

  // Phones: left-aligned, like the rest of the body copy
  @media (max-width: $sm-max) {
    padding-bottom: $band-margin-mobile;
    margin: 0;
    text-align: left;

    :deep(.newsletter) { margin: 0; }
  }
}
</style>

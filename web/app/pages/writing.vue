<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Writing',
  path: '/writing',
  description: 'Essays from Joe Neiman on entrepreneurship, deals, flying, and health. A book is on the way.',
});
const url = useUrl();
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
    <div class="split">
      <div>
        <p>
          The essays are on their way, and they all feed the bigger project, which is a
          book about entrepreneurship built from what actually happened to me, the wins
          and the mistakes both.
        </p>
        <h2>Get the essays</h2>
        <p class="muted">Want the pieces as they come out? Leave an email.</p>
        <NewsletterForm />
      </div>
      <figure>
        <img :src="url('/assets/photos/joe-911-roof.jpg')" alt="Joe Neiman leaning on the roof of his white Porsche 911" width="1800" height="1200" loading="eager">
      </figure>
    </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Speaking',
  path: '/speaking',
  image: '/assets/og/speaking.jpg',
  description: 'Joe Neiman speaks about entrepreneurship, recognizing opportunity, and building a business without wrecking your health. Fireside chats preferred.',
});
const url = useUrl();
</script>

<template>
  <div>
    <PageHero
      eyebrow="Talks"
      title="Speaking"
      image="/assets/photos/joe-neiman-speaking.jpg"
      alt="Joe Neiman in conversation on stage, seated in front of a Carfax banner"
      width="2592"
      height="1632"
      position="center 40%"
      focus="33.333%"
    >
      I say yes to a few rooms a year, where the audience wants real stories from
      somebody who has actually been through it, and where my time does some good.
    </PageHero>

    <div class="page-body">
    <div class="row g-4 g-lg-5 align-items-center looking">
      <div class="col-12 col-lg-6">
        <p class="upper-tag">On stage</p>
        <h2>What I talk about</h2>
        <p>
          <b>Recognizing opportunity</b>, and having the confidence to go after it.
          <b>Building and scaling companies</b>, from a yellow legal pad to a $5B IPO,
          with every mistake included. And <b>what the grind actually costs</b>: stress,
          health, and building a business without putting the rest of your life on hold.
        </p>
        <p>
          I've done this at <b>Startup Grind Buffalo</b>, on 43North's <b>Latitude</b>
          podcast taped live in Buffalo, on industry panels like Used Carpalooza, and on
          <b>NEXT with Michael Sonnenfeldt</b>, talking about stress, meditation, and
          reinvention.
        </p>
        <p>
          <b>Fireside chats and moderated conversations</b> are where I'm best. I don't
          have a canned deck, and the rooms that get the most out of it are the ones that
          come with real questions.
        </p>
      </div>
      <div class="col-12 col-lg-6 order-first order-lg-last">
        <div class="bento">
          <img class="tall" :src="url('/assets/photos/studio-set.jpg')" alt="Joe Neiman on a video set before a recording" loading="lazy">
          <img :src="url('/assets/photos/ipo-day-nasdaq.jpg')" alt="ACV Auctions on the Nasdaq board on IPO day" loading="lazy">
          <img :src="url('/assets/photos/43north-win.jpg')" alt="The ACV team celebrating the 43North win" loading="lazy">
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// Same air before the closing band as the home page's last section
.looking {
  margin-bottom: $band-margin;

  @media (max-width: $sm-max) {
    margin-bottom: $band-margin-mobile;
  }
}
</style>

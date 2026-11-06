<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Speaking',
  path: '/speaking',
  description: 'Joe Neiman speaks about entrepreneurship, recognizing opportunity, and building a business without wrecking your health. Fireside chats preferred.',
});
const url = useUrl();
</script>

<template>
  <div>
    <PageHero
      title="Speaking"
      image="/assets/photos/waco.jpg"
      alt="Red Waco YMF-5 biplane in a hangar"
      width="1600"
      height="1200"
      position="center 50%"
    >
      I say yes to a few rooms a year, where the audience wants real stories from
      somebody who has actually been through it, and where my time does some good.
    </PageHero>

    <div class="page-body">
    <div class="split">
      <div>
        <h2>What I talk about</h2>
        <ul>
          <li>Recognizing opportunity, and having the confidence to go after it.</li>
          <li>Building and scaling companies: from a yellow legal pad to a $5B IPO, with every mistake included.</li>
          <li>What the grind actually costs. Stress, health, and building a business without putting the rest of your life on hold.</li>
        </ul>
        <h2>Where I've done this</h2>
        <ul>
          <li>Startup Grind Buffalo, fireside chat on building ACV.</li>
          <li>43North's Latitude podcast, taped live in Buffalo.</li>
          <li>Industry panels, including Used Carpalooza.</li>
          <li>NEXT with Michael Sonnenfeldt, on stress, meditation, and reinvention.</li>
        </ul>
        <h2>Format</h2>
        <p>
          Fireside chats and moderated conversations are where I'm best. I don't have a
          canned deck, and honestly the rooms that get the most out of it are the ones
          that come with real questions.
        </p>
        <NuxtLink class="cta" to="/contact">Book a conversation</NuxtLink>
      </div>
      <figure>
        <img :src="url('/assets/photos/studio-set.jpg')" alt="Joe Neiman on a video set before a recording" width="1600" height="1200" loading="lazy">
      </figure>
    </div>
    </div>
  </div>
</template>

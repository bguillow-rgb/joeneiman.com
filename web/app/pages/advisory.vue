<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Advisory',
  path: '/advisory',
  description: 'Where Joe Neiman advises and mentors: startup scaling, marketplaces, the auto business, and founders who want a sounding board.',
});
const roles = [
  {
    image: '/assets/photos/02-four-packs.webp',
    alt: 'Four packs of FoodNerd Mega Puffs',
    position: 'center',
    bg: '#f6f0e4',
    blend: 'multiply',
    title: 'FoodNerd',
    text: 'Buffalo-based toddler snacks: organic, freeze-dried puffs made from fruit, vegetables, and sprouted seeds with nothing added. Advisor and mentor.',
    to: 'https://foodnerdinc.com',
    target: '_blank',
    showUrl: true,
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="Mentoring"
      title="Advisory"
      image="/assets/photos/joe-porsche-lean.jpg"
      alt="Joe Neiman leaning on a white Porsche 911 with blue stripes"
      width="1800"
      height="1200"
      position="center 10%"
    >
      Mostly I just dabble and get pulled into things in a very informal way: a
      founder who needs a gut check, a dealer weighing a sale, somebody staring at a
      term sheet. The areas where I can actually help are startup scaling,
      marketplaces, the auto dealer and used car business, and general aviation.
    </PageHero>

    <TileGallery eyebrow="Current roles" title="Where I'm involved" :items="roles" fixed>
      <p>
        I was on the other side of this for years. The advice that actually helped me
        came from people who had done the thing themselves and would tell me the truth
        about it, and that's the kind I try to give.
      </p>
      <p>
        If you're building something in my lanes and want a straight answer,
        <NuxtLink to="/contact">reach out</NuxtLink>.
      </p>
    </TileGallery>
  </div>
</template>

<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Giving',
  path: '/giving',
  description: "The causes Joe Neiman supports: Merici's fight against child trafficking, and Angel Flight missions with SkyHope.",
});
const url = useUrl();
</script>

<template>
  <div>
    <PageHero
      title="Giving"
      image="/assets/photos/fbo-sunset-wide.jpg"
      alt="Jets on the ramp at an FBO under a red sunset"
      width="3000"
      height="2000"
      position="center 62%"
    >
      Two places my money and my flying go. Merici, which is dismantling child
      trafficking and giving those kids a second chance, and SkyHope, where the
      plane and the ratings get patients where they need to be at no cost to them.
      Neither one is complicated. Both are the best use of what I've got.
    </PageHero>

    <div class="page-body">
    <div class="split">
      <div>
        <h2>Merici</h2>
        <p>
          Merici is my primary cause. Merici is dismantling global child trafficking
          through a proven effective process, including rehabilitation of the victims.
          I have spent a fair amount of time with the founder, Om, who has dedicated his
          life to this mission. Eliminating this pure evil and giving these children a
          second chance helps to alleviate trauma that holds back future generations.
          At this point my role is philanthropy through investment and collaboration.
        </p>
        <h2>SkyHope</h2>
        <p>
          I'm starting to fly Angel Flight missions for SkyHope, using the plane and the
          ratings to get patients and their families where they need to be, at no cost
          to them.
        </p>
      </div>
      <figure>
        <img :src="url('/assets/photos/tbm-door.jpg')" alt="Joe Neiman giving a thumbs-up from the open door of his TBM on the ramp" width="1200" height="1600" loading="lazy">
      </figure>
    </div>
    </div>
  </div>
</template>

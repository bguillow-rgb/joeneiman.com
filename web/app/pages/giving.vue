<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Giving',
  path: '/giving',
  description: "The causes Joe Neiman supports: Marici's fight against child trafficking, and Angel Flight missions with SkyHope.",
});
const causes = [
  {
    image: '/assets/photos/card-criminology.webp',
    alt: 'A child peering over a wall between wooden bars',
    position: 'center',
    title: 'Marici',
    text: 'Dismantling global child sex trafficking: taking down the networks, and healing the kids who come out of them.',
    to: 'https://marici.org',
    target: '_blank',
    showUrl: true,
  },
  {
    image: '/assets/photos/avanti.jpg',
    alt: 'A Piaggio Avanti on the ramp',
    position: 'center',
    title: 'SkyHope',
    text: 'Free flights with volunteer pilots for patients and families who need to get to medical care far from home.',
    to: 'https://www.skyhope.org',
    target: '_blank',
    showUrl: true,
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="Causes"
      title="Giving"
      image="/assets/photos/giving.jpg"
      alt="Joe Neiman giving a thumbs-up from the open door of his TBM on the ramp"
      width="3000"
      height="2000"
      position="center 40%"
      focus="62%"
    >
      I'm constantly on the hunt for new ways to give back and improve the world in any way that I can.
    </PageHero>

    <TileGallery eyebrow="Current Causes" title="Where I try to help" :items="causes" fixed>
      <p>
        <b>Marici</b> is my primary cause. They're dismantling global child trafficking
        through a proven, effective process, including rehabilitation of the victims.
        I've spent a fair amount of time with the founder, <b>Om</b>, who has dedicated
        his life to this mission. Eliminating this pure evil and giving these children a
        second chance helps alleviate trauma that holds back future generations. At this
        point my role is philanthropy through investment and collaboration.
      </p>
      <p>
        <b>SkyHope</b> is newer for me. I'm starting to fly Angel Flight missions for
        them, using the plane and the ratings to get patients and their families where
        they need to be, at no cost to them.
      </p>
    </TileGallery>
  </div>
</template>

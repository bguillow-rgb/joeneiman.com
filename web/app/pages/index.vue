<script setup>
definePageMeta({ wide: true, hero: true });
usePage({ title: 'Entrepreneur and Pilot', path: '' });
const paths = [
  {
    to: '/advisory',
    icon: 'fa-solid fa-comments',
    title: 'Advisory',
    text: 'A gut check for founders and dealers. Startup scaling, marketplaces, the used-car business, and general aviation, kept informal.',
    more: 'How I help',
  },
  {
    to: '/giving',
    icon: 'fa-solid fa-hand-holding-heart',
    title: 'Giving',
    text: 'Marici, which is dismantling child trafficking, and SkyHope, where the plane gets patients where they need to be at no cost to them.',
    more: 'Where it goes',
  },
  {
    to: '/speaking',
    icon: 'fa-solid fa-microphone-lines',
    title: 'Speaking',
    text: 'A few rooms a year, for audiences who want real stories from somebody who has actually been through it.',
    more: 'Book a talk',
  },
  {
    to: '/writing',
    icon: 'fa-solid fa-pen-nib',
    title: 'Writing',
    text: 'One substantial essay at a time: decisions, deals, and lessons from the auction business and the hangar, on the way to a book.',
    more: 'Read the essays',
  },
];

const url = useUrl();

const ventures = [
  {
    to: '/ventures',
    image: '/assets/photos/joe-neiman-acv-43n-win.jpg',
    alt: 'The ACV founders on stage with the 43North trophy, fists raised',
    position: 'center 30%',
    title: 'ACV Auctions',
    text: 'Co-founder. Online wholesale auto auctions, Buffalo, NY. From 50 cars a month to 50,000+, through a 2021 Nasdaq IPO at a valuation over $5 billion.',
  },
  {
    to: '/ventures',
    image: '/assets/photos/nada-cars-commerce.jpg',
    alt: 'Joe Neiman and the team at the NADA Show announcement that DealerClub is now part of Cars Commerce',
    title: 'DealerClub',
    text: 'Founder. The reputation-based wholesale auction. Self-funded, built with the team behind it, acquired by Cars Commerce.',
  },
  {
    to: '/about',
    image: '/assets/photos/in-demand-auto.jpg',
    alt: 'The In Demand Auto showroom: a black Ferrari, a red Mustang convertible and the Carfax fox',
    position: 'center 45%',
    title: 'In Demand Auto',
    text: 'Where it started. A used car dealership in Albany that sold 40+ cars a month, largely on eBay, years before online car sales were normal.',
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="Entrepreneur"
      welcome
      title="Joe Neiman"
      image="/assets/photos/joe-neiman.jpg"
      alt="Joe Neiman leaning on the hood of his white Porsche 911 with blue stripes"
      width="3000"
      height="2000"
      position="66.667% 15%"
    >
      I'm an average guy who has been able to achieve some pretty incredible
      outcomes through a combination of <b>thinking big</b>, trusting my gut, learning
      from failures and mistakes, pushing the boundaries of what is reasonable
      or realistic, <b>trying hard</b>, and plenty of luck along the way.
    </PageHero>

    <TileGallery eyebrow="Ventures" title="What I've built" :items="ventures">
      <p>
        I started buying and selling cars in my parents' driveway at 15 years old.
        That turned into a dealership, then into co-founding <b>ACV Auctions</b>, and later
        founding <b>DealerClub</b>. These days I fly, I look for good deals, I support causes
        I believe in, and I'm working on turning two decades of lessons into a book.
      </p>
    </TileGallery>

    <SectionRule />

    <div class="page-body">
    <div class="row g-4 g-lg-5 align-items-center looking">
      <div class="col-12 col-lg-6">
        <p class="upper-tag">Buying now</p>
        <h2>What I'm looking for</h2>
        <p>
          I'm building a portfolio of <b>franchise car dealerships</b> because I believe in the
          resiliency of the US auto industry and the cultural stronghold that automobiles
          hold. I buy and sell airplanes.
        </p>
        <p>
          <b>I'm interested in early stage companies</b> doing
          neat things with health and wellness, marketplaces, and transportation, and I
          am always interested in air-cooled Porsches and other specialty cars and trucks.
          If you've got one of those, <b>I want to hear about it</b>.
        </p>
        <NuxtLink class="cta" to="/contact">Bring me a deal</NuxtLink>
      </div>
      <div class="col-12 col-lg-6 order-first order-lg-last">
        <div class="bento">
          <img class="tall" :src="url('/assets/photos/joe-porsche-wide.jpg')" alt="Joe Neiman standing beside a white air-cooled Porsche 911" width="1800" height="1200" loading="lazy" decoding="async">
          <img :src="url('/assets/photos/waco.jpg')" alt="Red Waco YMF-5 biplane in a hangar" width="1600" height="1200" loading="lazy" decoding="async">
          <img :src="url('/assets/photos/tbm-door.jpg')" alt="Joe Neiman giving a thumbs-up from the open door of his TBM" width="1200" height="1600" loading="lazy" decoding="async">
        </div>
      </div>
    </div>

    </div>

    <SectionRule />

    <PathGrid eyebrow="Beyond the deals" title="Where the rest of my time goes" :items="paths">
      <p>
        Dealerships and airplanes are the day to day. The rest goes to founders who
        want a gut check, causes I care about, a few stages a year, and the essays and book I'm working on.
      </p>
    </PathGrid>
  </div>
</template>

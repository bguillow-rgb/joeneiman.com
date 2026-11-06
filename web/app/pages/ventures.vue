<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Ventures',
  path: '/ventures',
  description: "What Joe Neiman has built and what he's buying now: ACV Auctions, DealerClub, franchise dealerships, and airplanes.",
});
const url = useUrl();
</script>

<template>
  <div>
    <PageHero
      eyebrow="Built and Sold"
      title="Ventures"
      image="/assets/photos/joe-neiman-acv-43n-win.jpg"
      alt="The ACV founders on stage with the 43North trophy, fists raised"
      width="3000"
      height="2000"
      position="center 30%"
      focus="33.333%"
    >
      Every one of these started the same way: a car I thought I could sell for
      more than I paid. The driveway turned into a dealership, the dealership
      turned into ACV, and ACV turned into a habit of building things. These days
      I'm mostly buying instead of building, and I'm still looking.
    </PageHero>

    <div class="page-body">
    <h2>Built</h2>
    <ul>
      <li><strong>ACV Auctions</strong>, co-founder. Online wholesale auto auctions, Buffalo, NY. From 50 cars a month to 50,000+, through a 2021 Nasdaq IPO at a valuation over $5 billion.</li>
      <li><strong>DealerClub</strong>, founder. The reputation-based wholesale auction. Self-funded, built with the team behind it, acquired by Cars Commerce.</li>
      <li>Before all of that: a used car dealership in Albany that sold 40+ cars a month, largely on eBay, years before online car sales were normal.</li>
    </ul>

    <div class="split flip">
      <div>
        <h2>Buying now</h2>
        <p>
          I'm looking to build a portfolio of franchise car dealerships because I believe
          in the resiliency of the US auto industry and the overall dependency and cultural
          stronghold that automobiles provide. I also buy and sell airplanes for fun.
        </p>
        <h2>Interested in</h2>
        <ul>
          <li>Franchise car dealerships: buying, selling, and brokering.</li>
          <li>Airplanes worth owning or trading.</li>
          <li>Early stage companies doing neat things with health and wellness, marketplaces, and transportation.</li>
          <li>Air-cooled Porsches and other specialty cars and trucks.</li>
        </ul>
        <NuxtLink class="cta" to="/contact">Bring me a deal</NuxtLink>
      </div>
      <figure>
        <img :src="url('/assets/photos/cessna-ttx.jpg')" alt="Joe Neiman on the ramp with a Cessna TTx" width="1200" height="1600" loading="lazy">
      </figure>
    </div>
    </div>
  </div>
</template>

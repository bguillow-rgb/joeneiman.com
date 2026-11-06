<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Ventures',
  path: '/ventures',
  description: "What Joe Neiman has built and what he's buying now: ACV Auctions, DealerClub, franchise dealerships, and airplanes.",
});
const built = [
  {
    to: 'https://www.acvauctions.com',
    target: '_blank',
    showUrl: true,
    image: '/assets/photos/ipo-day-nasdaq.jpg',
    alt: 'ACV Auctions on the Nasdaq board on IPO day',
    position: 'center 30%',
    title: 'ACV Auctions',
    text: 'Co-founder. Online wholesale auto auctions, Buffalo, NY. From 50 cars a month to 50,000+, through a 2021 Nasdaq IPO at a valuation over $5 billion.',
  },
  {
    to: 'https://dealerclub.com',
    target: '_blank',
    showUrl: true,
    image: '/assets/photos/nada-cars-commerce.jpg',
    alt: 'The DealerClub team at the NADA show after the Cars Commerce announcement',
    position: 'center',
    title: 'DealerClub',
    text: 'Founder. The reputation-based wholesale auction. Self-funded, built with the team behind it, acquired by Cars Commerce.',
  },
  {
    to: '/about',
    image: '/assets/photos/in-demand-auto.jpg',
    alt: 'The In Demand Auto lot in Albany',
    position: 'center 45%',
    title: 'In Demand Auto',
    text: 'Where it started. A used car dealership in Albany that sold 40+ cars a month, largely on eBay, years before online car sales were normal.',
  },
];

const interests = [
  {
    to: '/contact',
    icon: 'fa-solid fa-store',
    title: 'Franchise dealerships',
    text: 'Buying, selling, and brokering. Sellers who would rather skip the public listing are welcome.',
    more: 'Bring me a deal',
  },
  {
    to: '/contact',
    icon: 'fa-solid fa-plane-up',
    title: 'Airplanes',
    text: 'Ones worth owning or trading. I fly what I buy, and I know what a good one looks like.',
    more: 'Bring me a deal',
  },
  {
    to: '/contact',
    icon: 'fa-solid fa-rocket',
    title: 'Early-stage companies',
    text: 'Doing neat things with health and wellness, marketplaces, and transportation.',
    more: 'Bring me a deal',
  },
  {
    to: '/contact',
    icon: 'fa-solid fa-car',
    title: 'Specialty cars and trucks',
    text: 'Air-cooled Porsches first, and anything else unusual enough to be worth a conversation.',
    more: 'Bring me a deal',
  },
];
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

    <TileGallery eyebrow="The track record" title="What I've built" :items="built">
      <p>
        Finding new ways to move cars better than the last way. A lot on
        eBay before that was normal, then the transformation of the online wholesale auction, then
        the one built on reputation. <b>ACV</b> went public on the Nasdaq in 2021 and
        <b>DealerClub</b> was acquired by Cars Commerce.
      </p>
    </TileGallery>

    <SectionRule />

    <PathGrid eyebrow="Buying now" title="What I'm interested in" :items="interests">
      <p>
        I'm looking to build a portfolio of franchise car dealerships because I believe
        in the resiliency of the US auto industry and the overall dependency and cultural
        stronghold that automobiles provide. I also buy and sell airplanes for fun. If
        you've got one of these, <b>I want to hear about it</b>.
      </p>
    </PathGrid>
  </div>
</template>

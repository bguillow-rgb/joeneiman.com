<script setup>
definePageMeta({ wide: true, hero: true });
usePage({ title: 'Entrepreneur and Pilot', path: '' });
const url = useUrl();
</script>

<template>
  <div>
    <PageHero
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

    <StickySection eyebrow="Ventures" title="What I've built">
      <template #copy>
        <p>
          I started buying and selling cars in my parents' driveway at 15 years old.
          That turned into a dealership, then into co-founding ACV Auctions, and later
          founding DealerClub. These days I fly, I look for good deals, I support causes
          I believe in, and I'm working on turning two decades of lessons into a book.
        </p>
      </template>
      <template #actions>
        <NuxtLink class="btn btn-primary" to="/ventures">See the ventures</NuxtLink>
      </template>

      <FeatureCard
        to="/ventures"
        image="/assets/photos/ipo-day-nasdaq.jpg"
        alt="Joe Neiman at the Nasdaq podium on ACV's IPO day"
        position="center 20%"
        eyebrow="Co-founder"
        title="ACV Auctions"
      >
        Online wholesale auto auctions, Buffalo, NY. From 50 cars a month to 50,000+,
        through a 2021 Nasdaq IPO at a valuation over $5 billion.
      </FeatureCard>

      <FeatureCard
        to="/ventures"
        image="/assets/photos/nada-cars-commerce.jpg"
        alt="Joe Neiman and the team at the NADA Show announcement that DealerClub is now part of Cars Commerce"
        eyebrow="Founder"
        title="DealerClub"
      >
        The reputation-based wholesale auction. Self-funded, built with the team behind
        it, acquired by Cars Commerce.
      </FeatureCard>

      <FeatureCard
        to="/about"
        image="/assets/photos/joe-porsche-wide.jpg"
        alt="Joe Neiman standing beside a white air-cooled Porsche 911"
        eyebrow="Where it started"
        title="In Demand Auto"
        link-text="The story"
      >
        A used car dealership in Albany that sold 40+ cars a month, largely on eBay,
        years before online car sales were normal.
      </FeatureCard>
    </StickySection>

    <div class="page-body">
    <div class="split">
      <div>
        <h2>What I'm looking for</h2>
        <p>
          I'm building a portfolio of franchise car dealerships because I believe in the
          resiliency of the US auto industry and the cultural stronghold that automobiles
          hold. I buy and sell airplanes. I'm interested in early stage companies doing
          neat things with health and wellness, marketplaces, and transportation, and I
          am always interested in air-cooled Porsches and other specialty cars and trucks.
          If you've got one of those, <NuxtLink to="/contact">I want to hear about it</NuxtLink>.
        </p>
        <NuxtLink class="cta" to="/contact">Bring me a deal</NuxtLink>
      </div>
      <figure>
        <img :src="url('/assets/photos/joe-porsche-wide.jpg')" alt="Joe Neiman standing beside a white air-cooled Porsche 911" width="1800" height="1200" loading="lazy">
      </figure>
    </div>

    </div>

    <section class="container">
      <figure class="photo-band">
        <img :src="url('/assets/photos/wing-sunset.jpg')" alt="Sunset over the wing at altitude" width="1800" height="1350" loading="lazy">
      </figure>
    </section>

    <div class="page-body">
    <div class="band" style="border-top: 0; margin-top: 0;">
      <h2>Around here</h2>
      <ul class="card-grid">
        <li><NuxtLink to="/about"><span class="card-title">The story</span><span class="card-sub">The $35 Honda Civic, the dealership, ACV, DealerClub, and the health battle that ran underneath all of it.</span></NuxtLink></li>
        <li><NuxtLink to="/giving"><span class="card-title">Giving</span><span class="card-sub">Where the money and the flying go.</span></NuxtLink></li>
        <li><NuxtLink to="/speaking"><span class="card-title">Speaking</span><span class="card-sub">The handful of talks I say yes to.</span></NuxtLink></li>
        <li><NuxtLink to="/writing"><span class="card-title">Writing</span><span class="card-sub">Essays on the way, and eventually the book.</span></NuxtLink></li>
      </ul>
    </div>
    </div>
  </div>
</template>

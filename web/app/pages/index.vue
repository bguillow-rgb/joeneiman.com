<script setup>
definePageMeta({ wide: true });
usePage({ path: '' });
const url = useUrl();
</script>

<template>
  <div>
    <div class="hero-full full-bleed">
      <img :src="url('/assets/photos/joe-porsche-lean.jpg')" alt="Joe Neiman leaning on a white Porsche 911 with blue stripes" width="1800" height="1200" loading="eager" style="object-position: center 10%;">
      <div class="hero-overlay">
        <h1>Joe Neiman</h1>
        <p class="lede">
          I'm an average guy who has been able to achieve some pretty incredible
          outcomes through a combination of thinking big, trusting my gut, learning
          from failures and mistakes, pushing the boundaries of what is reasonable
          or realistic, trying hard, and plenty of luck along the way.
        </p>
      </div>
    </div>

    <div class="split">
      <div>
        <p>
          I started buying and selling cars in my parents' driveway at 15 years old.
          That turned into a dealership, then into co-founding
          <NuxtLink to="/about">ACV Auctions</NuxtLink>, and later founding DealerClub.
          These days I fly, I look for good deals, I support causes I believe in, and
          I'm working on turning two decades of lessons into a book.
        </p>
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

    <figure class="full-bleed" style="margin: 2.5rem 0 0;">
      <img :src="url('/assets/photos/wing-sunset.jpg')" alt="Sunset over the wing at altitude" width="1800" height="1350" loading="lazy" style="width: 100%; height: min(46vh, 480px); object-fit: cover; border-radius: 0;">
    </figure>

    <div class="band" style="border-top: 0;">
      <h2>Around here</h2>
      <ul class="card-grid">
        <li><NuxtLink to="/about"><span class="card-title">The story</span><span class="card-sub">The $35 Honda Civic, the dealership, ACV, DealerClub, and the health battle that ran underneath all of it.</span></NuxtLink></li>
        <li><NuxtLink to="/giving"><span class="card-title">Giving</span><span class="card-sub">Where the money and the flying go.</span></NuxtLink></li>
        <li><NuxtLink to="/speaking"><span class="card-title">Speaking</span><span class="card-sub">The handful of talks I say yes to.</span></NuxtLink></li>
        <li><NuxtLink to="/writing"><span class="card-title">Writing</span><span class="card-sub">Essays on the way, and eventually the book.</span></NuxtLink></li>
      </ul>
    </div>
  </div>
</template>

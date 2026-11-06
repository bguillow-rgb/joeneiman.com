<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'About',
  path: '/about',
  image: '/assets/og/about.jpg',
  description: "Joe Neiman's story: flipping cars at 15, co-founding ACV Auctions through its $5B IPO, founding DealerClub, flying, and healing.",
});

// The chapters, in order. Each entry's copy is the slot of the same key below.
const chapters = [
  {
    key: 'first-car',
    eyebrow: 'Where it started',
    title: 'The first car',
    media: [
      { type: 'image', src: '/assets/photos/honda-civic-jn.jpg', alt: 'The 1989 Honda Civic hatchback, cleaned up, in an empty parking lot', width: 1800, height: 1199, position: 'center 60%' },
    ],
  },
  {
    key: 'dealership',
    eyebrow: 'In Demand Auto',
    title: 'Lemons into lemonade',
    caption: 'The actual In Demand Auto commercial.',
    media: [
      // Zoomed a touch to clip a white line along the top of the source
      { type: 'video', embed: 'https://player.vimeo.com/video/84672070', title: 'In Demand Auto commercial', zoom: 1.03 },
    ],
  },
  {
    key: 'acv',
    eyebrow: 'ACV Auctions',
    title: 'A yellow legal pad',
    caption: 'Winning 43North, and IPO day at the Nasdaq.',
    media: [
      { type: 'image', src: '/assets/photos/43north-win.jpg', alt: 'The ACV team celebrating on stage at 43North', width: 920, height: 627 },
      { type: 'image', src: '/assets/photos/ipo-day-nasdaq.jpg', alt: "Joe Neiman at the Nasdaq podium on ACV's IPO day", width: 568, height: 696, position: 'center 30%' },
    ],
  },
  {
    key: 'dealerclub',
    eyebrow: 'DealerClub',
    title: 'Starting again',
    caption: 'The announcement at the NADA Show.',
    media: [
      { type: 'image', src: '/assets/photos/nada-cars-commerce.jpg', alt: 'Joe Neiman and the team at the NADA Show announcement that DealerClub is now part of Cars Commerce', width: 1600, height: 1200 },
    ],
  },
  {
    key: 'health',
    eyebrow: 'The health story',
    title: 'An open book',
    media: [
      { type: 'image', src: '/assets/photos/backcountry-ski.jpg', alt: 'Joe Neiman in backcountry ski gear on a mountain', width: 1050, height: 1400 },
      { type: 'image', src: '/assets/photos/ski-selfie.jpg', alt: 'Joe Neiman giving a thumbs-up on the ski slope', width: 1050, height: 1400 },
    ],
  },
  {
    key: 'flying',
    eyebrow: 'Flying',
    title: 'Zero to a thousand hours',
    caption: 'At altitude, the Waco YMF-5, and the Piaggio Avanti P180.',
    media: [
      { type: 'image', src: '/assets/photos/flying-headset.jpg', alt: 'Joe Neiman at altitude, headset on', width: 1200, height: 1600, position: 'center 30%' },
      { type: 'image', src: '/assets/photos/waco.jpg', alt: 'Red Waco YMF-5 biplane in a hangar', width: 1600, height: 1200 },
      { type: 'image', src: '/assets/photos/avanti.jpg', alt: 'Piaggio Avanti P180 in a hangar', width: 1600, height: 1200 },
    ],
  },
];
</script>

<template>
  <div>
    <PageHero
      eyebrow="The story"
      title="About"
      image="/assets/photos/joe-neiman-flying.jpg"
      alt="Joe Neiman in the cockpit of his TBM at sunset, headset on"
      width="3000"
      height="2000"
      position="66.667% 35%"
    >
      I grew up outside Albany, New York, in a town nobody has heard of. I learned
      the value of <b>hard work</b> early on through a combination of manual labor as a
      landscaper and construction worker and mechanic, as well as buying and selling
      cars in my parents' driveway starting at <b>15 years old</b>.
    </PageHero>

    <StoryTimeline eyebrow="The chapters" title="How I got here" :items="chapters">
      <p>
        A driveway, a dealership, two companies, a long fight with my own health,
        and a hangar. <b>The short version of a long story.</b>
      </p>

      <template #first-car>
        <p>
          At 14 I worked summers at my uncle's car repair shop, doing the grunt work.
          The next summer he told me to buy an abandoned 1989 Honda Civic a customer
          had left behind. It cost $35, the scrap value. I put about $200 into tires,
          a battery, and an exhaust, cleaned it up, and sold it through a newspaper ad
          for $900. That was a moment for sure, because I rolled it into another car,
          and then another. By senior year of high school I had a BMW and
          $20k in the bank while my friends were borrowing movie money from their parents.
        </p>
      </template>

      <template #dealership>
        <p>
          After college I started a dealership with a friend. I knew better, I ignored
          my gut, and eleven months later he skipped town and left me about $100,000 in
          the hole. Over the next four years I rebuilt from nothing into a former Chevy
          dealership facility, a dozen employees, 40-plus cars a month, and a top-rated
          seller account on eBay, before Carvana existed.
        </p>
      </template>

      <template #acv>
        <p>
          ACV started on a yellow legal pad: notes and hand-drawn sketches of a 20-minute
          online auction, born out of my own frustration with losing whole days at
          physical auctions. We launched in Buffalo in 2015. That October we won the
          43North competition and its $1 million first place prize, six days after my
          daughter was born. From there we grew from 50 cars a month to more than
          50,000, raised roughly $300 million of venture capital, and went public on
          the Nasdaq in March 2021 at a valuation over $5 billion. My eight years there
          were many lifetimes of experience condensed into a whirlwind pressure cooker.
        </p>
      </template>

      <template #dealerclub>
        <p>
          In 2023 I started again. DealerClub was the wholesale auction rebuilt around
          reputation, so honest sellers get rewarded for being honest. Cars Commerce
          acquired it three months after we went live commercially.
        </p>
      </template>

      <template #health>
        <p>
          I'm an open book on this one. Ulcerative colitis showed up at 19 and stayed
          with me, on and off, for more than 15 years. I ran down every rabbit hole
          there is. My experience and my truth is that my disease was driven by
          excessive stress and anxiety, which is the space I lived in secretly for most
          of my life. Until I actually learned how to identify that and manage it and
          restore balance to my body, nothing would work. I have actually experienced
          instantaneous healing, where active symptoms resolved themselves overnight
          after I was able to reframe my disease in my mind. I'm not a doctor and this
          isn't medical advice. It's just what happened to me, and it changed how I
          build, work, and live.
        </p>
      </template>

      <template #flying>
        <p>
          In five years I went from zero hours to more than a thousand, and a commercial
          instrument multi-engine certificate. The two extremes of my hangar say it all:
          an open-cockpit Waco biplane and a Piaggio Avanti. Flying my family from
          Florida to New York in three hours, above the airliners, feels like a
          superpower. Being a true adult student taught me more about self-discipline
          than any business ever did. Any fool with too much money can buy a Bugatti,
          but you're still stuck driving from one traffic light to the next.
        </p>
      </template>
    </StoryTimeline>
  </div>
</template>

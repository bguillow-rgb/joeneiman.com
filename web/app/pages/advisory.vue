<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Advisory',
  path: '/advisory',
  description: 'Where Joe Neiman advises and mentors: startup scaling, marketplaces, the auto business, and founders who want a sounding board.',
});
const url = useUrl();
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

    <div class="page-body">
    <div class="split narrow-img">
      <div>
        <h2>How I think about it</h2>
        <p>
          I was on the other side of this for years. The advice that actually helped me
          came from people who had done the thing themselves and would tell me the truth
          about it, and that's the kind I try to give.
        </p>
        <p>
          If you're building something in my lanes and want a straight answer,
          <NuxtLink to="/contact">reach out</NuxtLink>.
        </p>
      </div>
      <div>
        <figure style="max-width: 360px;">
          <img :src="url('/assets/photos/joe-headshot-brick.jpg')" alt="Joe Neiman headshot against a brick wall" width="754" height="754" loading="eager">
        </figure>
        <h2 style="margin-top: 1rem;">Current roles</h2>
        <ul>
          <li><strong>FoodNerd</strong>, advisor and mentor.</li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

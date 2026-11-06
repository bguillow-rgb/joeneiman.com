<script setup>
definePageMeta({ wide: true, hero: true });
usePage({
  title: 'Contact',
  path: '/contact',
  description: 'Reach Joe Neiman about dealerships, airplanes, early-stage companies, speaking, or Merici.',
});
const url = useUrl();
</script>

<template>
  <div>
    <PageHero
      title="Contact"
      image="/assets/photos/flying-headset.jpg"
      alt="Joe Neiman at altitude, headset on"
      width="1200"
      height="1600"
      position="center 35%"
    >
      The short version of what belongs in my inbox is below. If it's one of those,
      send it over.
    </PageHero>

    <div class="page-body">
    <div class="split narrow-img">
      <div>
        <ul class="card-grid static">
          <li>A franchise dealership for sale, or a seller who'd rather skip the public listing.</li>
          <li>An airplane worth a look.</li>
          <li>An early-stage company in health and wellness, marketplaces, or transportation.</li>
          <li>A speaking invitation where real stories are welcome.</li>
          <li>Anything Merici-related.</li>
        </ul>
      </div>
      <figure>
        <img :src="url('/assets/photos/joe-911-vertical.jpg')" alt="Joe Neiman standing beside his white Porsche 911" width="738" height="1600" loading="eager">
      </figure>
    </div>

    <div class="band">
      <h2>Send it over</h2>
      <ContactForm />
    </div>
    </div>
  </div>
</template>

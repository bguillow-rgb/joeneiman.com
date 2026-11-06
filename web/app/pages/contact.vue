<script setup>
definePageMeta({ wide: true });
usePage({
  title: 'Contact',
  path: '/contact',
  description: 'Reach Joe Neiman about dealerships, airplanes, early-stage companies, speaking, or Marici.',
});

const topics = [
  { icon: 'fa-solid fa-car', text: "A franchise dealership for sale, or a seller who'd rather skip the public listing." },
  { icon: 'fa-solid fa-plane', text: 'An airplane worth a look.' },
  { icon: 'fa-solid fa-rocket', text: 'An early-stage company in health and wellness, marketplaces, or transportation.' },
  { icon: 'fa-solid fa-microphone-lines', text: 'A speaking invitation where real stories are welcome.' },
  { icon: 'fa-solid fa-hand-holding-heart', text: 'Anything Marici-related.' },
];
</script>

<template>
  <div class="contact">
    <header class="intro" v-reveal.children>
      <p class="upper-tag">Get in touch</p>
      <h1>Contact</h1>
      <p class="lede">
        The short version of what belongs in my inbox is below. If it's one of
        those, send it over.
      </p>
    </header>

    <ul class="topics" v-reveal.children>
      <li v-for="t in topics" :key="t.text">
        <span class="icon" aria-hidden="true"><i :class="t.icon" /></span>
        <span class="text">{{ t.text }}</span>
      </li>
    </ul>

    <div class="form-wrap" v-reveal>
      <ContactForm />
    </div>
  </div>
</template>

<style scoped lang="scss">
$column: 44rem;

.contact {
  padding: 2rem 0 $band-margin;

  @media (max-width: $sm-max) {
    padding: 0.5rem 0 $band-margin-mobile;
  }
}

// Centered heading block, like the newsletter sign-up
.intro {
  max-width: $column;
  margin: 0 auto 48px;
  text-align: center;

  .upper-tag { margin-bottom: 0.75rem; }

  h1 { margin: 0 0 1.25rem; }

  .lede {
    @include type('intro');
    font-weight: 500;
    color: var(--fg-soft);
    max-width: 36rem;
    margin: 0 auto;
  }
}

// What belongs in the inbox: one hairline list, icon and line each
.topics {
  max-width: $column;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  border-top: 1px solid $hairline;

  li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.1rem 0;
    margin: 0;
    border-bottom: 1px solid $hairline;
  }

  // The kit swaps the <i> for an SVG, so the colour and size live on the wrapper
  .icon {
    flex: 0 0 28px;
    margin-top: 0.15em;
    font-size: 18px;
    line-height: 1;
    text-align: center;
    color: var(--accent);
  }

  .text {
    @include type('body');
    color: var(--fg-soft);
  }
}

.form-wrap {
  max-width: $column;
  margin: 56px auto 0;
}

// Phones: everything left-aligned with the body copy
@media (max-width: $sm-max) {
  .intro {
    text-align: left;
    margin-bottom: 40px;

    .lede { margin: 0; }
  }

  .form-wrap { margin-top: 40px; }
}
</style>

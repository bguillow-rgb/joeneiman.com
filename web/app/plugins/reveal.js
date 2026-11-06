// Scroll reveal: blocks fade in and ease up as they enter the viewport.
//
//   <div v-reveal>            one block
//   <div v-reveal.children>   each child, staggered
//
// Common content blocks are picked up automatically after each page renders
// (see AUTO below). Nothing is hidden until JS runs, so prerendered HTML and
// crawlers see the page complete; reduced-motion users see no movement.

const AUTO = [
  '.page-body > h2',
  '.page-body > p',
  '.page-body > ul',
  '.page-body > .split',
  '.page-body > .photo-row',
  '.page-body > .band',
  '.page-body > .looking',
  '.photo-band',
  '.card-grid > li',
].join(',');

const STAGGER = 90;

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    nuxtApp.vueApp.directive('reveal', { getSSRProps: () => ({}) });
    return;
  }

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('reveal-ready');

  // Elements that reveal together with another element (their trigger)
  const followers = new Map();

  function show(el) {
    el.classList.add('is-visible');
    for (const f of followers.get(el) || []) f.classList.add('is-visible');
    followers.delete(el);
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        io.unobserve(entry.target);
      }
    },
    // Start once the block is ~12% into the viewport from the bottom
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  );

  function arm(el, delay = 0, trigger = null) {
    if (el.dataset.reveal) return;
    el.dataset.reveal = '1';
    el.classList.add('reveal');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);
    if (reduced) { el.classList.add('is-visible'); return; }
    if (trigger) {
      // Reveal when the trigger does (or now, if it already has)
      if (trigger.classList.contains('is-visible')) el.classList.add('is-visible');
      else followers.set(trigger, [...(followers.get(trigger) || []), el]);
      return;
    }
    io.observe(el);
  }

  function armChildren(el) {
    Array.from(el.children).forEach((child, i) => arm(child, i * STAGGER));
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      if (binding.modifiers.children) return armChildren(el);
      // v-reveal="{ with: '.selector', delay: 270 }" reveals alongside a sibling
      const opts = binding.value && typeof binding.value === 'object' ? binding.value : {};
      const trigger = opts.with ? el.parentElement?.querySelector(opts.with) : null;
      arm(el, opts.delay || 0, trigger);
    },
    getSSRProps: () => ({}),
  });

  // Auto-pass over page content, after each page has rendered
  function sweep() {
    document.querySelectorAll(AUTO).forEach((el) => arm(el));
  }
  nuxtApp.hook('page:finish', () => requestAnimationFrame(sweep));
  nuxtApp.hook('app:mounted', () => requestAnimationFrame(sweep));
});

// Bootstrap 5 JavaScript (collapse, dropdown, modal, tooltip, etc.), loaded
// client-side only since it touches `document`. Available in components as
// `const { $bootstrap } = useNuxtApp()`; data-bs-* attributes work without it.
import * as bootstrap from 'bootstrap';

export default defineNuxtPlugin(() => {
  return {
    provide: {
      bootstrap,
    },
  };
});

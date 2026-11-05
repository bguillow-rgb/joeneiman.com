// Prefix a root-relative path with the build's base URL, so static assets in
// /public resolve on the GitHub Pages preview (/joeneiman.com/...) and on the
// real domain. <NuxtLink> already handles the base for internal routes; use
// this for <img src>, favicons, and anything else that is a plain URL.
export const useUrl = () => {
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '');
  return (p) => (p === '/' ? (base || '/') : base + p);
};

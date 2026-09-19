// Simple scroll utility — no Lenis, no GSAP
export function scrollToElement(selector, offset = -80) {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

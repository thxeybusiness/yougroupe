// Header border on scroll
const hdr = document.getElementById('hdr');
if (hdr) {
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navlinks = document.getElementById('navlinks');
if (menuBtn && navlinks) {
  menuBtn.addEventListener('click', () => {
    const open = navlinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navlinks.addEventListener('click', (e) => {
    if (e.target.closest('a')) { navlinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); }
  });
}

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = Math.min(i % 6, 5) * 55 + 'ms';
  io.observe(el);
});

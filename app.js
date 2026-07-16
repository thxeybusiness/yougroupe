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

// Contact form -> compose an email in the visitor's mail client (no backend)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = (id) => (document.getElementById(id)?.value || '').trim();
    const nom = val('cf-nom'), email = val('cf-email'), sujet = val('cf-sujet'), message = val('cf-message');
    const subject = encodeURIComponent(sujet ? `${sujet} — ${nom}` : `Contact yougroupe.com — ${nom || 'Sans nom'}`);
    const body = encodeURIComponent(`${message}\n\n— ${nom}\n${email}`);
    window.location.href = `mailto:contact@yougroupe.com?subject=${subject}&body=${body}`;
  });
}

/* ── Custom cursor ── */
const cur = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => (cur.style.opacity = '0'));
document.addEventListener('mouseenter', () => (cur.style.opacity = '1'));

/* ── Sticky nav ── */
const nav = document.getElementById('nav');
window.addEventListener(
  'scroll',
  () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  },
  { passive: true }
);

/* ── Scroll reveal ── */
const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = i * 0.05 + 's';
        e.target.classList.add('visible');
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach((el) => ro.observe(el));

/* ── Skill bar animation ── */
const so = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach((b) => {
          setTimeout(() => {
            b.style.width = b.dataset.width + '%';
          }, 150);
        });
        so.unobserve(e.target);
      }
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll('.skills-grid').forEach((el) => so.observe(el));

/* ── Active nav link ── */
const sections = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');
window.addEventListener(
  'scroll',
  () => {
    let cur = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    links.forEach((l) => {
      const active = l.getAttribute('href') === '#' + cur;
      l.style.color = active ? 'var(--text)' : '';
    });
  },
  { passive: true }
);


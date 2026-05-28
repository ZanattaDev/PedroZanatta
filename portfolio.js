/* portfolio.js */

/* ── Custom cursor ── */
const cur = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
  if (!cur) return;
  cur.style.left = e.clientX + 'px';
  cur.style.top  = e.clientY + 'px';
});
document.addEventListener('mouseleave', () => { if (cur) cur.style.opacity = '0'; });
document.addEventListener('mouseenter', () => { if (cur) cur.style.opacity = '1'; });

/* ── Sticky nav ── */
const nav = document.getElementById('nav');
window.addEventListener(
  'scroll',
  () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
  },
  { passive: true }
);

/* ── Scroll reveal (Seu Observer Original) ── */
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
            // Correção para ler o estilo inline que adicionamos ou o data-width original
            const targetWidth = b.dataset.width || b.style.width.replace('%', '');
            b.style.width = targetWidth + '%';
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
    let curId = '';
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) curId = s.id;
    });
    links.forEach((l) => {
      const active = l.getAttribute('href') === '#' + curId;
      l.style.color = active ? 'var(--text)' : '';
    });
  },
  { passive: true }
);

/* ══════════════════════════════════════════════
     NOVOS EFEITOS ADICIONADOS (DIGITAÇÃO & REVEAL)
   ══════════════════════════════════════════════ */

// Efeito de Digitação (Typing Effect)
const words = ["de verdade.", "o seu negócio.", "Web & iOS.", "o Futuro."];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 150;
const erasingDelay = 75;
const newWordDelay = 2000;
const typingTextElement = document.getElementById("typing-text");

function type() {
  if (!typingTextElement) return;
  const currentWord = words[wordIndex];
  
  if (isDeleting) {
    typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    isDeleting = true;
    setTimeout(type, newWordDelay);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(type, 500);
  } else {
    setTimeout(type, isDeleting ? erasingDelay : typingDelay);
  }
}

// Inicializa os efeitos novos assim que o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  // Inicia a digitação
  if (typingTextElement) setTimeout(type, 500);
  
  // Configura o ScrollReveal externo para os textos principais da Hero
  if (typeof ScrollReveal !== 'undefined') {
    window.sr = ScrollReveal({ 
      reset: false,
      distance: '40px',
      duration: 1000,
      delay: 100
    });

    sr.reveal('.hero-heading', { origin: 'top' });
    sr.reveal('.hero-desc', { origin: 'bottom', delay: 200 });
    sr.reveal('.hero-actions', { origin: 'bottom', delay: 300 });
  }

  // Inicializa o efeito 3D nos cards caso a biblioteca tenha carregado com sucesso
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
      max: 12,
      speed: 400,
      glare: true,
      "max-glare": 0.15,
    });
  }
});

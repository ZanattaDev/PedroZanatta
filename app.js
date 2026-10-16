/* Pedro Zanatta — UI, scroll e animações (GSAP + ScrollTrigger + Lenis)
   O estado em window.PZ.state é lido pela cena 3D (scene.js) */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const icon = name => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${name}.svg`;

  const TECH = [
    { name: 'Swift', cat: 'Aprendendo agora', color: '#F05138', icon: icon('swift/swift-original'), desc: 'Meu foco de estudo. Já fiz o app da Atus Reformas em SwiftUI.' },
    { name: 'Node.js', cat: 'Backend', color: '#5FA04E', icon: icon('nodejs/nodejs-original'), desc: 'Onde está a maioria dos meus sistemas: Express, NestJS e integrações.' },
    { name: 'TypeScript', cat: 'Backend e web', color: '#3178C6', icon: icon('typescript/typescript-original'), desc: 'Uso no Manager AI e na plataforma jurídica, do NestJS ao Next.js.' },
    { name: 'Java', cat: 'Backend', color: '#E76F00', icon: icon('java/java-original'), desc: 'Orientação a objetos e acesso a banco com JDBC.' },
    { name: 'PostgreSQL', cat: 'Banco de dados', color: '#336791', icon: icon('postgresql/postgresql-original'), desc: 'Com Prisma e com Supabase, incluindo Row Level Security.' },
    { name: 'MySQL', cat: 'Banco de dados', color: '#00758F', icon: icon('mysql/mysql-original'), desc: 'Usei no servidor de FiveM e no ConectaGov, com cache de consultas.' },
    { name: 'Docker', cat: 'Infra', color: '#2496ED', icon: icon('docker/docker-original'), desc: 'Para subir Postgres local e empacotar APIs com docker compose.' },
    { name: 'Python', cat: 'Automação', color: '#3776AB', icon: icon('python/python-original'), desc: 'Scripts e automações quando preciso resolver algo rápido.' }
  ];

  const state = { coreX: 2.6, coreY: 0, coreScale: 1, spread: 0.62, coreTilt: 0.35, ringShow: 0, ringRot: 0, intro: reduced ? 1 : 0 };
  window.PZ = { state, tech: TECH };

  if ('scrollRestoration' in history && !location.hash) { history.scrollRestoration = 'manual'; scrollTo(0, 0); }
  $('#year').textContent = new Date().getFullYear();

  /* Menu */
  let lenis = null;
  const header = $('#nav');
  const toggle = $('.nav-toggle');
  const closeMenu = () => { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); lenis?.start(); };
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
    open ? lenis?.stop() : lenis?.start();
  });
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 30);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Link ativo */
  const links = $$('.nav-links a');
  const navSections = $$('main section[id]');
  let activeId = '';
  const updateActive = () => {
    let id = 'home';
    navSections.forEach(sec => { if (sec.getBoundingClientRect().top <= innerHeight * .45) id = sec.id; });
    if (id === activeId) return;
    activeId = id;
    links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  };
  addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  /* Stack: lista lateral */
  const techList = $('#tech-list');
  techList.innerHTML = TECH.map((t, i) => `<li><button data-i="${i}">${t.name}</button></li>`).join('');
  $('#tech-total').textContent = TECH.length;

  /* Formulário */
  const form = $('#contact-form');
  const status = $('#form-status');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Enviando…';
    const data = { nome: form.nome.value, email: form.email.value, assunto: form.assunto.value, mensagem: form.mensagem.value };
    fetch('https://script.google.com/macros/s/AKfycbwN-zFlL0hW4pSOD88aGbFYLBOiS5CUeozCXf9GunbK5yIfa1sPzO2W6z1jVBQt941v/exec', {
      method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)
    }).then(() => {
      form.reset();
      status.className = 'form-status ok';
      status.textContent = 'Recebi sua mensagem. Valeu!';
    }).catch(() => {
      status.className = 'form-status err';
      status.textContent = 'Não consegui enviar. Me chama pelo email ou WhatsApp.';
    }).finally(() => { btn.disabled = false; });
  });

  /* Rótulos da stack */
  const N = TECH.length;
  const tName = $('#tech-name'), tCat = $('#tech-cat'), tDesc = $('#tech-desc'), tIdx = $('#tech-idx');
  const prev = $('#tech-prev'), next = $('#tech-next');
  let current = -1;
  function updateTech(i) {
    current = i;
    const t = TECH[i];
    tName.textContent = t.name;
    tCat.textContent = t.cat;
    tDesc.textContent = t.desc;
    tIdx.textContent = i + 1;
    prev.disabled = i === 0;
    next.disabled = i === N - 1;
    $$('button', techList).forEach((b, k) => b.classList.toggle('active', k === i));
    if (window.gsap && !reduced) gsap.fromTo([tCat, tName, tDesc], { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: .45, stagger: .04, ease: 'power3.out', overwrite: true });
  }
  updateTech(0);

  /* Sem GSAP: página funciona estática */
  if (!window.gsap || !window.ScrollTrigger) { state.intro = 1; return; }
  gsap.registerPlugin(ScrollTrigger);

  /* Smooth scroll */
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const scrollToY = y => lenis ? lenis.scrollTo(y, { duration: 1.2 }) : scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const target = id === '#home' ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    scrollToY(id === '#home' ? 0 : target.getBoundingClientRect().top + scrollY);
  }));

  /* Entrada */
  if (!reduced) {
    gsap.timeline({ delay: .15 })
      .from('[data-intro-line]', { yPercent: 105, duration: 1, ease: 'power4.out' })
      .from('[data-intro]', { y: 18, opacity: 0, duration: .8, ease: 'power3.out', stagger: .07 }, '-=.75')
      .to(state, { intro: 1, duration: 1.6, ease: 'power3.out' }, 0);
  }

  /* Marquee */
  gsap.fromTo('.marquee-track', { xPercent: 0 }, {
    xPercent: -30, ease: 'none',
    scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 }
  });

  /* Coreografia 3D por seção */
  let pinST = null;
  function seg(trigger, start, end, from, to) {
    gsap.fromTo(state, { ...from }, { ...to, ease: 'none', immediateRender: false, scrollTrigger: { trigger, start, end, scrub: 1 } });
  }

  const mm = gsap.matchMedia();
  mm.add({ desktop: '(min-width: 761px)', mobile: '(max-width: 760px)' }, ctx => {
    const S = ctx.conditions.desktop ? {
      hero:  { coreX: 2.6,  coreY: 0,   coreScale: 1,    spread: .62, coreTilt: .35, ringShow: 0 },
      about: { coreX: -2.9, coreY: -.1, coreScale: 1.05, spread: 1.05, coreTilt: .62, ringShow: 0 },
      focus: { coreX: -2.9, coreY: 2.6, coreScale: 0,    spread: .5,  coreTilt: .3,  ringShow: 0 },
      stack: { coreX: -2.9, coreY: 2.6, coreScale: 0,    spread: .5,  coreTilt: .3,  ringShow: 1 },
      gone:  { coreX: 0,    coreY: 0,   coreScale: 0,    spread: .6,  coreTilt: .4,  ringShow: 0 }
    } : {
      hero:  { coreX: 0,    coreY: 1.6, coreScale: .62,  spread: .6,  coreTilt: .4,  ringShow: 0 },
      about: { coreX: .9,   coreY: 3.4, coreScale: 0,    spread: .9,  coreTilt: .6,  ringShow: 0 },
      focus: { coreX: .9,   coreY: 3.4, coreScale: 0,    spread: .9,  coreTilt: .6,  ringShow: 0 },
      stack: { coreX: .9,   coreY: 3.4, coreScale: 0,    spread: .9,  coreTilt: .6,  ringShow: 1 },
      gone:  { coreX: 0,    coreY: 0,   coreScale: 0,    spread: .6,  coreTilt: .4,  ringShow: 0 }
    };

    gsap.set(state, { ...S.hero, ringRot: 0 });
    seg('#about', 'top bottom', 'top 20%', S.hero, S.about);
    seg('#focus', 'top bottom', 'top 15%', S.about, S.focus);
    seg('#stack', 'top bottom', 'top top', S.focus, S.stack);

    const tween = gsap.fromTo(state, { ringRot: 0 }, {
      ringRot: N - 1, ease: 'none', immediateRender: false,
      scrollTrigger: {
        trigger: '#stack', start: 'top top', end: () => '+=' + innerHeight * (N - 1) * .5,
        pin: true, scrub: .8, invalidateOnRefresh: true,
        snap: { snapTo: 1 / (N - 1), duration: { min: .2, max: .6 }, ease: 'power2.inOut', delay: .05 }
      }
    });
    pinST = tween.scrollTrigger;

    seg('#projects', 'top bottom', 'top 35%', { ...S.gone, ringShow: 1 }, S.gone);
    return () => { pinST = null; };
  });

  gsap.ticker.add(() => {
    const i = Math.min(N - 1, Math.max(0, Math.round(state.ringRot)));
    if (i !== current) updateTech(i);
  });

  function goTo(i) {
    if (!pinST) return;
    scrollToY(pinST.start + (pinST.end - pinST.start) * (i / (N - 1)) + 1);
  }
  prev.addEventListener('click', () => goTo(Math.max(0, current - 1)));
  next.addEventListener('click', () => goTo(Math.min(N - 1, current + 1)));
  techList.addEventListener('click', e => { const b = e.target.closest('button'); if (b) goTo(+b.dataset.i); });

  /* Reveals (depois do pin) */
  if (!reduced) {
    $$('[data-reveal]').forEach(el => gsap.from(el, {
      y: 36, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    }));
  }

  addEventListener('load', () => ScrollTrigger.refresh());
})();

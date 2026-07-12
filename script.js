/* ═══════════════════════════════════════════
   script.js — Animações e Interações Base
   Pedro Henrique Zanatta · Portfolio
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────
      CURSOR CUSTOMIZADO
  ───────────────────────────── */
  const cur  = document.getElementById('cur');
  const ring = document.getElementById('cur-ring');

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cur.style.left = mouseX + 'px';
    cur.style.top  = mouseY + 'px';
  });

  // Ring segue com suavidade via lerp
  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.addEventListener('mouseleave', function () {
    cur.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    cur.style.opacity  = '1';
    ring.style.opacity = '1';
  });

  // Ring expande em links e botões
  document.querySelectorAll('a, button').forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      ring.style.width       = '46px';
      ring.style.height      = '46px';
      ring.style.borderColor = 'rgba(255,255,255,0.3)';
    });
    el.addEventListener('mouseleave', function () {
      ring.style.width       = '32px';
      ring.style.height      = '32px';
      ring.style.borderColor = 'rgba(255,255,255,0.15)';
    });
  });


  /* ─────────────────────────────
      NAV — SCROLL STICKY
  ───────────────────────────── */
  var nav = document.getElementById('nav');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ─────────────────────────────
      NAV — LINK ATIVO
  ───────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', function () {
    var current = '';
    sections.forEach(function (sec) {
      if (window.scrollY >= sec.offsetTop - 130) {
        current = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });


  /* ─────────────────────────────
      SCROLL REVEAL
  ───────────────────────────── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.rev').forEach(function (el) {
    revealObserver.observe(el);
  });


  /* ─────────────────────────────
      SKILL BARS — ANIMAÇÃO AO SCROLL
  ───────────────────────────── */
  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.sk-fill').forEach(function (bar) {
          setTimeout(function () {
            bar.style.width = bar.getAttribute('data-w') + '%';
          }, 120);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.sk-grid').forEach(function (el) {
    skillObserver.observe(el);
  });


  /* ─────────────────────────────
      ENVIO DO FORMULÁRIO (GOOGLE APPS SCRIPT)
  ───────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Impede a página de recarregar

      // URL gerada na implantação do Google Apps Script
      const urlGoogleScript = "https://script.google.com/macros/s/AKfycbwN-zFlL0hW4pSOD88aGbFYLBOiS5CUeozCXf9GunbK5yIfa1sPzO2W6z1jVBQt941v/exec";

      // Captura os dados mapeando direto pelos IDs ou Names dos inputs
      const dadosFormulario = {
        nome: contactForm.querySelector('[name="nome"]')?.value || contactForm.querySelector('#nome')?.value || '',
        email: contactForm.querySelector('[name="email"]')?.value || contactForm.querySelector('#email')?.value || '',
        assunto: contactForm.querySelector('[name="assunto"]')?.value || contactForm.querySelector('#assunto')?.value || '',
        mensagem: contactForm.querySelector('[name="mensagem"]')?.value || contactForm.querySelector('#mensagem')?.value || ''
      };

      // Envia os dados para o Google Script via POST
      fetch(urlGoogleScript, {
        method: "POST",
        mode: "no-cors", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosFormulario)
      })
      .then(() => {
        alert('Mensagem enviada com sucesso direto para o meu Gmail!');
        contactForm.reset(); // Limpa o formulário
      })
      .catch(error => {
        alert('Ops, erro ao enviar a mensagem.');
        console.error('Erro:', error);
      });
    });
  }

});

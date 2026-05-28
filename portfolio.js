/* ═══════════════════════════════════════════
   portfolio.js — Efeitos Específicos do Portfólio
   Pedro Henrique Zanatta · Portfolio
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────
     EFEITO DE DIGITAÇÃO — HERO
  ───────────────────────────── */
  var typingEl = document.getElementById('typing-text');

  // ✏️ Editar as palavras abaixo para mudar o que aparece no efeito
  var words    = ['você.', 'recrutadores.', 'devs.', 'freelancers.', 'o mundo.'];
  var wordIndex = 0;
  var charIndex = 0;
  var isDeleting = false;

  function typeLoop() {
    if (!typingEl) return;

    var currentWord = words[wordIndex];

    if (!isDeleting) {
      // Digitando
      typingEl.textContent = currentWord.slice(0, ++charIndex);

      if (charIndex === currentWord.length) {
        // Palavra completa — pausa antes de deletar
        isDeleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 90);

    } else {
      // Deletando
      typingEl.textContent = currentWord.slice(0, --charIndex);

      if (charIndex === 0) {
        // Palavra deletada — próxima palavra
        isDeleting = false;
        wordIndex  = (wordIndex + 1) % words.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 45);
    }
  }

  // Inicia o efeito após 0.8s (aguarda as animações de entrada)
  setTimeout(typeLoop, 800);


  /* ─────────────────────────────
     PROJETO ITEMS — EFEITO DE HOVER SUAVE
  ───────────────────────────── */
  document.querySelectorAll('.proj-item').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      this.style.paddingLeft = '0.5rem';
      this.style.transition  = 'padding 0.2s ease, background 0.18s';
    });
    item.addEventListener('mouseleave', function () {
      this.style.paddingLeft = '';
    });
  });


  /* ─────────────────────────────
     FORM — SUBMIT FEEDBACK VISUAL
  ───────────────────────────── */
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function (e) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Enviando…';
        btn.style.opacity = '0.7';
        btn.disabled = true;
      }
    });
  }


  /* ─────────────────────────────
     SERVIÇOS — HOVER BORDER HIGHLIGHT
  ───────────────────────────── */
  document.querySelectorAll('.srv-cell').forEach(function (cell) {
    cell.addEventListener('mouseenter', function () {
      this.style.borderLeft = '2px solid rgba(255,255,255,0.12)';
    });
    cell.addEventListener('mouseleave', function () {
      this.style.borderLeft = '';
    });
  });

});

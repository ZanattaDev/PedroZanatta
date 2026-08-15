/* ═══════════════════════════════════════════
   portfolio.js — Efeitos Específicos do Portfólio
   Pedro Henrique Zanatta · Portfolio
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {

  /* ─────────────────────────────
     EFEITO DE DIGITAÇÃO — HERO
  ───────────────────────────── */
  var typingEl = document.getElementById('typing-text');
  var words = ['você.', 'recrutadores.', 'devs.', 'freelancers.', 'o mundo.'];
  var wordIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    if (!typingEl) return;
    var currentWord = words[wordIndex];
    if (!isDeleting) {
      typingEl.textContent = currentWord.slice(0, ++charIndex);
      if (charIndex === currentWord.length) { isDeleting = true; setTimeout(typeLoop, 1800); return; }
      setTimeout(typeLoop, 90);
    } else {
      typingEl.textContent = currentWord.slice(0, --charIndex);
      if (charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(typeLoop, 400); return; }
      setTimeout(typeLoop, 45);
    }
  }
  setTimeout(typeLoop, 800);

  /* ─────────────────────────────
     PROJETOS / SERVIÇOS — HOVER
  ───────────────────────────── */
  document.querySelectorAll('.proj-item').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      this.style.paddingLeft = '0.5rem';
      this.style.transition = 'padding 0.2s ease, background 0.18s, transform 0.25s ease';
    });
    item.addEventListener('mouseleave', function () { this.style.paddingLeft = ''; });
  });

  document.querySelectorAll('.srv-cell').forEach(function (cell) {
    cell.addEventListener('mouseenter', function () { this.style.borderLeft = '2px solid rgba(255,255,255,0.18)'; });
    cell.addEventListener('mouseleave', function () { this.style.borderLeft = ''; });
  });

  /* ─────────────────────────────
     FORM — FEEDBACK VISUAL
  ───────────────────────────── */
  var form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', function () {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.textContent = 'Enviando…'; btn.style.opacity = '0.7'; btn.disabled = true; }
    });
  }

  /* ═══════════════════════════════════════════
     DEV MODE — CAMADA VISUAL
     Mantém o design editorial original, mas
     adiciona linguagem de IDE/terminal sem
     transformar o portfólio em um site neon.
  ═══════════════════════════════════════════ */

  var devStyle = document.createElement('style');
  devStyle.textContent = `
    /* Fundo de editor / terminal, bem sutil */
    body.dev-mode::before { opacity:.72; }
    .dev-grid { position:fixed; inset:0; pointer-events:none; z-index:0; opacity:.22; background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px); background-size:56px 56px; mask-image:linear-gradient(to bottom,rgba(0,0,0,.8),transparent 70%); }
    .dev-scan { position:fixed; left:0; right:0; top:-10%; height:18vh; pointer-events:none; z-index:997; opacity:.06; background:linear-gradient(to bottom,transparent,rgba(255,255,255,.45),transparent); animation:devScan 9s linear infinite; }
    @keyframes devScan { from{transform:translateY(-20vh)} to{transform:translateY(620vh)} }

    /* Pequena etiqueta de terminal no Hero */
    .dev-terminal { margin-top:2.25rem; max-width:590px; border:1px solid rgba(255,255,255,.09); border-radius:9px; overflow:hidden; background:rgba(10,10,10,.72); box-shadow:0 18px 55px rgba(0,0,0,.24); font-family:var(--mono); font-size:.68rem; color:#777; backdrop-filter:blur(12px); }
    .dev-terminal-head { height:30px; display:flex; align-items:center; gap:6px; padding:0 10px; border-bottom:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.025); }
    .dev-dot { width:6px; height:6px; border-radius:50%; background:#555; }
    .dev-terminal-title { margin-left:6px; opacity:.55; }
    .dev-terminal-body { padding:12px 14px; line-height:1.8; }
    .dev-prompt { color:#8bd5a6; }
    .dev-caret { display:inline-block; width:6px; height:11px; margin-left:3px; vertical-align:-1px; background:#ddd; animation:devBlink .85s step-end infinite; }
    @keyframes devBlink { 50%{opacity:0} }

    /* Código decorativo atrás das seções */
    .code-watermark { position:absolute; right:2%; top:2.5rem; font:500 clamp(4rem,12vw,10rem)/.8 var(--mono); letter-spacing:-.08em; color:rgba(255,255,255,.018); pointer-events:none; user-select:none; white-space:pre; }

    /* Cursor mantém o original, mas ganha estados de interação */
    body.dev-hover #cur-ring { width:48px!important; height:48px!important; border-color:rgba(255,255,255,.38)!important; }
    body.dev-hover #cur { transform:translate(-50%,-50%) scale(1.55)!important; }

    /* Barra fina de leitura / progresso */
    #dev-progress { position:fixed; top:0; left:0; height:1px; width:0; z-index:10001; background:linear-gradient(90deg,#666,#fff); box-shadow:0 0 9px rgba(255,255,255,.28); pointer-events:none; }

    /* Cards ganham uma luz de editor no hover */
    .dev-tilt { transform-style:preserve-3d; will-change:transform; }
    .dev-tilt::after { content:""; position:absolute; inset:0; pointer-events:none; border-radius:inherit; background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.07),transparent 32%); opacity:0; transition:opacity .25s ease; }
    .dev-tilt:hover::after { opacity:1; }

    @media(max-width:700px){ .dev-terminal{font-size:.62rem}.code-watermark{display:none}.dev-grid{background-size:42px 42px;opacity:.14} }
    @media(prefers-reduced-motion:reduce){ .dev-scan,.dev-caret{animation:none!important}.dev-tilt{transform:none!important} }
  `;
  document.head.appendChild(devStyle);
  document.body.classList.add('dev-mode');

  var grid = document.createElement('div');
  grid.className = 'dev-grid';
  document.body.prepend(grid);

  var scan = document.createElement('div');
  scan.className = 'dev-scan';
  document.body.appendChild(scan);

  var progress = document.createElement('div');
  progress.id = 'dev-progress';
  document.body.appendChild(progress);

  /* Terminal no Hero — linguagem de desenvolvedor */
  var hero = document.querySelector('#home .wrap');
  if (hero) {
    var terminal = document.createElement('div');
    terminal.className = 'dev-terminal';
    terminal.innerHTML = '<div class="dev-terminal-head"><span class="dev-dot"></span><span class="dev-dot"></span><span class="dev-dot"></span><span class="dev-terminal-title">pedro@zanatta: ~/portfolio</span></div>' +
      '<div class="dev-terminal-body"><div><span class="dev-prompt">$</span> whoami</div><div>Pedro Zanatta · FullStack Developer</div><div><span class="dev-prompt">$</span> stack --active</div><div>Java · Python · JS/TS · PHP · Lua · C/C++ · MySQL</div><div><span class="dev-prompt">$</span> status</div><div style="color:#8bd5a6">● online / disponível para projetos <span class="dev-caret"></span></div></div>';
    var heroButtons = hero.querySelector('.hero-btns');
    if (heroButtons) heroButtons.after(terminal); else hero.appendChild(terminal);
  }

  /* Marcas de código nas seções: visual de IDE sem poluir o conteúdo */
  document.querySelectorAll('.section').forEach(function(section, index){
    var watermark = document.createElement('div');
    watermark.className = 'code-watermark';
    var labels = ['01','{ }','</>','[]','=>','//','0x'];
    watermark.textContent = labels[index % labels.length];
    section.appendChild(watermark);
  });

  /* Tilt suave — projetos, skills e cards */
  document.querySelectorAll('.proj-item,.sk-cat,.acard').forEach(function(el){
    el.classList.add('dev-tilt');
    el.addEventListener('pointermove',function(e){
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      var r=el.getBoundingClientRect();
      var x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      el.style.setProperty('--mx',((x+.5)*100)+'%');
      el.style.setProperty('--my',((y+.5)*100)+'%');
      el.style.transform='perspective(900px) rotateX('+(-y*2.2)+'deg) rotateY('+(x*3)+'deg) translateY(-2px)';
    });
    el.addEventListener('pointerleave',function(){ el.style.transform=''; });
  });

  /* Cursor inteligente */
  document.querySelectorAll('a,button,.proj-item,.sk-cat,.acard,.srv-cell').forEach(function(el){
    el.addEventListener('mouseenter',function(){document.body.classList.add('dev-hover');});
    el.addEventListener('mouseleave',function(){document.body.classList.remove('dev-hover');});
  });

  /* Progresso do scroll */
  function updateProgress(){
    var max=document.documentElement.scrollHeight-window.innerHeight;
    progress.style.width=(max>0?(window.scrollY/max)*100:0)+'%';
  }
  window.addEventListener('scroll',updateProgress,{passive:true});
  updateProgress();

  /* Pequeno efeito de "terminal decode" nos títulos de seção */
  var glyphs='01<>/{}[]$#';
  document.querySelectorAll('.sec-lbl').forEach(function(label){
    var original=label.textContent;
    label.addEventListener('mouseenter',function(){
      var step=0;
      var timer=setInterval(function(){
        label.textContent=original.split('').map(function(ch,i){
          return i<step?ch:glyphs[Math.floor(Math.random()*glyphs.length)];
        }).join('');
        step++;
        if(step>original.length){clearInterval(timer);label.textContent=original;}
      },30);
    });
  });

});

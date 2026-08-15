(() => {
  'use strict';

  const css = `
:root{
  --zx:#ff2d86;--zx2:#8b5cf6;--zx3:#22d3ee;--zgreen:#55ff9a;
  --zbg:#050509;--zpanel:rgba(12,10,18,.68);--zline:rgba(255,255,255,.09);
}
body{background:radial-gradient(circle at 75% 10%,rgba(255,45,134,.10),transparent 25rem),radial-gradient(circle at 15% 55%,rgba(139,92,246,.07),transparent 25rem),#050509!important;}
body:after{content:"";position:fixed;inset:0;pointer-events:none;z-index:998;background:repeating-linear-gradient(0deg,transparent 0 3px,rgba(255,255,255,.012) 4px),linear-gradient(90deg,transparent 0 49.9%,rgba(255,45,134,.035) 50%,transparent 50.1%);mix-blend-mode:screen;}
#zx-stage{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden;opacity:.95}
#zx-grid{position:absolute;inset:-25%;background-image:linear-gradient(rgba(255,45,134,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,45,134,.07) 1px,transparent 1px);background-size:55px 55px;transform:perspective(700px) rotateX(66deg) translateY(18%);transform-origin:center bottom;mask-image:linear-gradient(to top,black,transparent 70%);animation:zxGrid 18s linear infinite}
#zx-glow{position:absolute;width:65vw;height:65vw;left:55%;top:5%;transform:translate(-50%,-20%);background:radial-gradient(circle,rgba(255,45,134,.13),rgba(139,92,246,.05) 35%,transparent 68%);filter:blur(8px);animation:zxFloat 7s ease-in-out infinite alternate}
#zx-canvas{position:absolute;inset:0;width:100%;height:100%}
@keyframes zxGrid{to{transform:perspective(700px) rotateX(66deg) translateY(8%)}}
@keyframes zxFloat{to{transform:translate(-47%,-24%) scale(1.08)}}
#nav{border-bottom-color:rgba(255,45,134,.08)!important}
.nav-logo{color:#ff7eb4!important}.nav-logo em{color:#fff!important}.nav-pill{box-shadow:0 0 30px rgba(255,45,134,.08);border-color:rgba(255,45,134,.2)!important}.dot-green{background:var(--zgreen)!important;box-shadow:0 0 16px var(--zgreen)!important}
#home{z-index:1;isolation:isolate}#home>.wrap{z-index:3}
.hero-eyebrow .ey-line{background:var(--zx)!important;box-shadow:0 0 14px rgba(255,45,134,.7)}.ey-txt{color:#b9a9b4!important}
.hero-h1{font-size:clamp(3.2rem,8vw,7.3rem)!important;letter-spacing:-.045em!important;text-shadow:0 0 50px rgba(255,45,134,.06)}.hero-h1 em{color:#fff!important;text-shadow:0 0 35px rgba(255,45,134,.25)}
#typing-text{color:#ff4b9a!important;border-color:#ff4b9a!important;text-shadow:0 0 18px rgba(255,45,134,.75)}.hero-desc{max-width:600px!important;color:#a99ca6!important}
.btn-solid{background:linear-gradient(135deg,#fff,#ffd5e7)!important;box-shadow:0 0 35px rgba(255,45,134,.16)!important}.btn-outline{border-color:rgba(255,45,134,.3)!important;color:#eee!important}.btn-outline:after{background:var(--zx)!important}
.hero-tech-art{position:absolute;right:-5%;top:50%;width:min(42vw,480px);height:min(42vw,480px);transform:translateY(-50%);z-index:2;pointer-events:none;perspective:1200px}
.zx-orb{position:absolute;inset:18%;border-radius:50%;transform-style:preserve-3d;animation:zxSpin 16s linear infinite;filter:drop-shadow(0 0 35px rgba(255,45,134,.22))}.zx-orb:before,.zx-orb:after{content:"";position:absolute;inset:4%;border:1px solid rgba(255,45,134,.65);border-radius:50%;box-shadow:0 0 25px rgba(255,45,134,.2) inset}.zx-orb:after{inset:13%;border-color:rgba(34,211,238,.45);transform:rotateX(70deg) rotateY(35deg)}
.zx-core{position:absolute;left:50%;top:50%;width:90px;height:90px;transform:translate(-50%,-50%);border-radius:22px;background:radial-gradient(circle at 35% 30%,#fff, #ff4b9a 12%,#8b5cf6 45%,#07070b 73%);box-shadow:0 0 35px #ff2d86,0 0 90px rgba(139,92,246,.5);animation:zxCore 3s ease-in-out infinite alternate}.zx-core:after{content:"</>";position:absolute;inset:0;display:grid;place-items:center;color:#fff;font:600 18px Geist Mono,monospace;text-shadow:0 0 15px #fff}
.zx-ring{position:absolute;left:50%;top:50%;width:88%;height:24%;border:1px solid rgba(255,45,134,.45);border-radius:50%;transform:translate(-50%,-50%) rotateX(68deg);box-shadow:0 0 22px rgba(255,45,134,.15);animation:zxRing 5s ease-in-out infinite}.zx-ring.r2{width:70%;height:18%;border-color:rgba(34,211,238,.4);transform:translate(-50%,-50%) rotateX(68deg) rotateZ(45deg);animation-duration:7s}
.zx-label{position:absolute;font:10px Geist Mono,monospace;letter-spacing:.18em;color:#ff75b2;text-transform:uppercase;padding:7px 9px;border:1px solid rgba(255,45,134,.22);background:rgba(5,5,9,.6);backdrop-filter:blur(10px);animation:zxLabel 4s ease-in-out infinite}.zx-label.a{top:12%;right:0}.zx-label.b{bottom:13%;left:2%;animation-delay:-2s}.zx-label.c{top:44%;left:-3%;animation-delay:-1s}
@keyframes zxSpin{to{transform:rotateX(62deg) rotateY(360deg)}}@keyframes zxCore{to{transform:translate(-50%,-50%) scale(1.13) rotate(6deg)}}@keyframes zxRing{50%{opacity:.25;transform:translate(-50%,-50%) rotateX(68deg) scale(1.08)}100%{transform:translate(-50%,-50%) rotateX(68deg) scale(.94)}}@keyframes zxLabel{50%{transform:translateY(-7px);box-shadow:0 0 25px rgba(255,45,134,.12)}}
.section{position:relative;z-index:2;background:linear-gradient(180deg,rgba(5,5,9,.7),rgba(5,5,9,.9))!important;border-top-color:rgba(255,45,134,.10)!important}.sec-lbl{color:#ff6dab!important}.sec-lbl:before{background:var(--zx)!important;box-shadow:0 0 10px rgba(255,45,134,.6)}.sec-h em{color:#ff6dab!important;text-shadow:0 0 25px rgba(255,45,134,.22)}
.about-photo,.acard,.sk-cat,.proj-item,.srv-cell,.detail-table,.contact-form,.contact-info{background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,45,134,.018))!important;border-color:rgba(255,45,134,.12)!important;box-shadow:inset 0 1px rgba(255,255,255,.04),0 20px 80px rgba(0,0,0,.18)}.about-photo{box-shadow:0 0 45px rgba(255,45,134,.12),inset 0 0 40px rgba(255,45,134,.08)!important}.sk-fill{background:linear-gradient(90deg,#8b5cf6,#ff2d86,#ff9dc8)!important;box-shadow:0 0 12px rgba(255,45,134,.55)}
.proj-item{position:relative;overflow:hidden!important;transition:transform .5s cubic-bezier(.16,1,.3,1),border-color .3s!important}.proj-item:before{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 30%,rgba(255,45,134,.09),transparent 65%);transform:translateX(-100%);transition:transform .8s}.proj-item:hover:before{transform:translateX(100%)}.proj-item:hover{transform:translateY(-5px)!important;border-color:rgba(255,45,134,.35)!important;box-shadow:0 20px 60px rgba(255,45,134,.09)!important}
.soc:hover,.nav-links a:hover,.nav-links a.active{color:#ff6dab!important;text-shadow:0 0 15px rgba(255,45,134,.4)}
.zx-terminal{margin-top:2rem;border:1px solid rgba(255,45,134,.18);background:rgba(4,4,8,.72);box-shadow:0 25px 90px rgba(0,0,0,.35),0 0 35px rgba(255,45,134,.06);border-radius:12px;overflow:hidden;font:12px/1.7 Geist Mono,monospace;color:#b8aeb7}.zx-term-head{height:34px;display:flex;align-items:center;gap:7px;padding:0 12px;border-bottom:1px solid rgba(255,255,255,.07);background:rgba(255,255,255,.025)}.zx-dot{width:7px;height:7px;border-radius:50%}.zx-dot:nth-child(1){background:#ff5f57}.zx-dot:nth-child(2){background:#febc2e}.zx-dot:nth-child(3){background:#28c840}.zx-term-body{padding:16px}.zx-p{color:#ff6dab}.zx-caret{display:inline-block;width:7px;height:14px;background:#ff2d86;vertical-align:-2px;animation:blink .8s infinite}
#zx-progress{position:fixed;top:0;left:0;height:2px;width:0;background:linear-gradient(90deg,#8b5cf6,#ff2d86,#22d3ee);box-shadow:0 0 15px #ff2d86;z-index:10000}.zx-reveal{opacity:0;transform:translateY(28px) scale(.985);filter:blur(5px);transition:1s cubic-bezier(.16,1,.3,1)}.zx-reveal.zx-in{opacity:1;transform:none;filter:none}
@media(max-width:900px){.hero-tech-art{opacity:.34;right:-20%;width:80vw;height:80vw}.hero-h1{font-size:clamp(3rem,13vw,5rem)!important}.nav-links{display:none}}@media(max-width:600px){.hero-tech-art{top:28%;right:-33%;opacity:.22}.hero-desc{font-size:.9rem}.hero-foot{margin-top:3rem}.zx-terminal{font-size:10px}.zx-label{display:none}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important}.zx-reveal{transition:none!important}}
`;
  const style=document.createElement('style'); style.id='zanatta-x-effects'; style.textContent=css; document.head.appendChild(style);

  const stage=document.createElement('div'); stage.id='zx-stage'; stage.innerHTML='<div id="zx-grid"></div><div id="zx-glow"></div><canvas id="zx-canvas"></canvas>'; document.body.prepend(stage);
  const progress=document.createElement('div'); progress.id='zx-progress'; document.body.appendChild(progress);

  const home=document.querySelector('#home');
  if(home){
    const art=document.createElement('div'); art.className='hero-tech-art'; art.innerHTML='<div class="zx-orb"><div class="zx-ring"></div><div class="zx-ring r2"></div><div class="zx-core"></div></div><div class="zx-label a">SYSTEM // ONLINE</div><div class="zx-label b">FULLSTACK // 07</div><div class="zx-label c">BUILDING // 2026</div>'; home.appendChild(art);
    const term=document.createElement('div'); term.className='zx-terminal'; term.innerHTML='<div class="zx-term-head"><i class="zx-dot"></i><i class="zx-dot"></i><i class="zx-dot"></i><span style="margin-left:auto;opacity:.5">pedro@zanatta:~</span></div><div class="zx-term-body"><div><span class="zx-p">$</span> whoami</div><div>Pedro Zanatta — FullStack Developer</div><div><span class="zx-p">$</span> stack --active</div><div>Java · Python · JS/TS · PHP · Lua · C/C++ · MySQL</div><div><span class="zx-p">$</span> status</div><div style="color:#55ff9a">● AVAILABLE FOR PROJECTS <span class="zx-caret"></span></div></div>';
    const aboutRight=document.querySelector('.about-right'); if(aboutRight) aboutRight.appendChild(term);
  }

  const cur=document.getElementById('cur'), ring=document.getElementById('cur-ring'); let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
  addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px'}},{passive:true});
  function cursorLoop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursorLoop)} cursorLoop();
  document.querySelectorAll('a,button,.proj-item,.acard,.sk-cat,.srv-cell').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'))});

  const typing=document.getElementById('typing-text'); const words=['você.','recrutadores.','devs.','freelancers.','o mundo.']; let wi=0,ci=0,del=false;
  function type(){if(!typing)return;const w=words[wi];typing.textContent=del?w.slice(0,--ci):w.slice(0,++ci);if(!del&&ci===w.length){del=true;setTimeout(type,1500);return}if(del&&ci===0){del=false;wi=(wi+1)%words.length;setTimeout(type,300);return}setTimeout(type,del?40:75)} setTimeout(type,700);

  const revealEls=document.querySelectorAll('.rev,.proj-item,.acard,.sk-cat,.srv-cell');
  revealEls.forEach((el,i)=>{el.classList.add('zx-reveal');el.style.transitionDelay=Math.min(i%6*.06,.3)+'s'});
  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('zx-in','in');obs.unobserve(e.target)}}),{threshold:.08}); revealEls.forEach(e=>obs.observe(e));

  const skillObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.sk-fill').forEach(b=>b.style.width=(b.dataset.w||0)+'%');skillObs.unobserve(e.target)}}),{threshold:.2}); document.querySelectorAll('.sk-grid').forEach(e=>skillObs.observe(e));

  addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?(scrollY/max)*100:0)+'%';const art=document.querySelector('.hero-tech-art');if(art&&scrollY<innerHeight*1.2)art.style.transform=\`translateY(calc(-50% + \${scrollY*.10}px)) rotate(\${scrollY*.012}deg)\`},{passive:true});

  document.querySelectorAll('.btn-s,.nav-pill,.soc').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();const x=(e.clientX-(r.left+r.width/2))*.12,y=(e.clientY-(r.top+r.height/2))*.12;el.style.transform=\`translate(\${x}px,\${y}px)\`});el.addEventListener('pointerleave',()=>el.style.transform='')});
  document.querySelectorAll('.proj-item,.acard,.sk-cat').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=\`perspective(800px) rotateX(\${-y*4}deg) rotateY(\${x*5}deg) translateY(-3px)\`});el.addEventListener('pointerleave',()=>el.style.transform='')});

  const canvas=document.getElementById('zx-canvas'),ctx=canvas.getContext('2d'); let pts=[];
  function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;canvas.style.width=innerWidth+'px';canvas.style.height=innerHeight+'px';ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:Math.min(95,Math.floor(innerWidth/13))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.4+.3}))} resize(); addEventListener('resize',resize);
  function particles(){ctx.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;const dx=p.x-mx,dy=p.y-my,d=Math.hypot(dx,dy);if(d<130&&d>0){p.x+=dx/d*.18;p.y+=dy/d*.18}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(255,90,160,.55)';ctx.fill()}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<105){ctx.strokeStyle=\`rgba(255,45,134,\${.11*(1-d/105)})\`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}requestAnimationFrame(particles)} particles();

  const chars='01アイウエオ<>/\\\\{}[]#$%'; document.querySelectorAll('.sec-lbl').forEach(el=>{const original=el.textContent.trim();el.addEventListener('mouseenter',()=>{let n=0;const id=setInterval(()=>{el.textContent=original.split('').map((c,i)=>i<n?c:chars[Math.floor(Math.random()*chars.length)]).join('');n++;if(n>original.length){clearInterval(id);el.textContent=original}},35)})});
})();

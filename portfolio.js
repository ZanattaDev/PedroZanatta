/* Pedro Zanatta — visual effects + career layer */
document.addEventListener('DOMContentLoaded',()=>{
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
setTimeout(()=>document.body.classList.add('loaded'),1350);

/* typewriter */
const typing=$('#typing-text'),words=['você.','recrutadores.','devs.','empresas.','o mundo.'];let wi=0,ci=0,del=false;
function type(){if(!typing)return;const w=words[wi];if(!del){typing.textContent=w.slice(0,++ci);if(ci===w.length){del=true;setTimeout(type,1500);return}setTimeout(type,70)}else{typing.textContent=w.slice(0,--ci);if(ci===0){del=false;wi=(wi+1)%words.length;setTimeout(type,300);return}setTimeout(type,38)}}setTimeout(type,900);

/* terminal command */
const command=$('#command-text'),commands=['build --something-useful','git commit -m "make it better"','./solve-problem.sh','code --focus','search --internship'];let cmd=0,cc=0;
function commandLoop(){if(!command)return;const w=commands[cmd];if(cc<w.length){command.textContent=w.slice(0,++cc);setTimeout(commandLoop,45)}else setTimeout(()=>{cc=0;cmd=(cmd+1)%commands.length;commandLoop()},1700)}setTimeout(commandLoop,1400);

/* cursor */
const cur=$('#cur'),ring=$('#cur-ring');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px'}},{passive:true});
(function cursor(){rx+=(mx-rx)*.14;ry+=(my-ry)*.14;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursor)})();
$$('a,button,.proj-item,.project-feature,.acard,.sk-cat,.srv-cell,.cv-skill').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('hovering'));el.addEventListener('mouseleave',()=>document.body.classList.remove('hovering'))});

/* navigation */
const nav=$('#nav'),sections=$$('main section[id]'),navlinks=$$('.nav-links a');
function updateNav(){nav?.classList.toggle('scrolled',scrollY>45);let active='home';sections.forEach(s=>{if(scrollY>=s.offsetTop-180)active=s.id});navlinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+active))}addEventListener('scroll',updateNav,{passive:true});updateNav();

/* scroll progress */
const progress=document.createElement('div');progress.id='dev-scroll-progress';document.body.append(progress);Object.assign(progress.style,{position:'fixed',top:'0',left:'0',height:'1px',width:'0',background:'linear-gradient(90deg,#555,#fff)',boxShadow:'0 0 10px rgba(255,255,255,.35)',zIndex:10001,pointerEvents:'none'});
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max?scrollY/max*100:0)+'%'},{passive:true});

/* reveal */
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}}),{threshold:.08});$$('.rev').forEach(e=>observer.observe(e));
const skillObs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('.sk-track i').forEach((bar,i)=>setTimeout(()=>bar.style.width=bar.dataset.w+'%',i*100));skillObs.unobserve(e.target)}}),{threshold:.2});$$('.sk-grid').forEach(e=>skillObs.observe(e));

/* 3D cards + magnetic controls */
if(!reduced){
$$('.project-feature,.proj-item,.sk-cat,.acard,.srv-cell,.cv-skill').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;el.style.setProperty('--spot-x',x+'px');el.style.setProperty('--spot-y',y+'px');if(!el.classList.contains('proj-item'))el.style.transform=`perspective(900px) rotateX(${-(y/r.height-.5)*2}deg) rotateY(${(x/r.width-.5)*3}deg) translateY(-3px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
$$('.btn-s,.soc,.nav-pill').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;el.style.transform=`translate(${x*5}px,${y*3}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const light=document.createElement('div');light.className='mouse-light';Object.assign(light.style,{position:'fixed',width:'300px',height:'300px',borderRadius:'50%',pointerEvents:'none',zIndex:1,background:'radial-gradient(circle,rgba(255,255,255,.035),transparent 68%)',transform:'translate(-50%,-50%)',transition:'left .12s ease-out,top .12s ease-out'});document.body.append(light);addEventListener('pointermove',e=>{light.style.left=e.clientX+'px';light.style.top=e.clientY+'px'},{passive:true});
}

/* curriculum section — dados públicos e profissionais do currículo enviado; documentos pessoais não são expostos */
const experience=document.querySelector('#experience');
if(!experience){
const section=document.createElement('section');section.id='experience';section.className='section cv-section';section.innerHTML=`
<div class="wrap">
<div class="sec-lbl">03 · Experiência & formação</div>
<div class="cv-head"><div><h2 class="sec-h">O que estou <em>construindo.</em></h2><p class="sec-sub">Minha trajetória atual, apresentada de forma objetiva para recrutadores e empresas.</p></div><span class="cv-badge">OPEN TO WORK</span></div>
<div class="cv-grid rev">
<div class="cv-panel"><div class="cv-panel-label">Objetivo profissional</div><div class="cv-objective">Aplicar conhecimento técnico em uma primeira experiência de <em>Tecnologia da Informação</em> e transformar teoria em prática.</div>
<div class="cv-timeline">
<div class="cv-item"><span class="cv-year">ATUAL</span><div><h3>Técnico em Informática — CEDUP Abílio Paulo</h3><p>Segundo ano do ensino médio e técnico, desenvolvendo base em programação, manutenção e raciocínio lógico.</p></div></div>
<div class="cv-item"><span class="cv-year">PROJETO</span><div><h3>Desenvolvimento e manutenção de servidor FiveM</h3><p>Lógica de scripts, gerenciamento de banco de dados e configuração de ambientes.</p></div></div>
<div class="cv-item"><span class="cv-year">BASE</span><div><h3>Hardware, manutenção e redes</h3><p>Diagnóstico de hardware, montagem e manutenção de computadores e conhecimentos de redes básicas.</p></div></div>
</div></div>
<div class="cv-panel"><div class="cv-panel-label">Conhecimentos técnicos</div><div class="cv-skills">
<div class="cv-skill"><span>Java · PHP · JavaScript ES6+</span><span>DEV</span></div><div class="cv-skill"><span>HTML5 · CSS3</span><span>WEB</span></div><div class="cv-skill"><span>SQL · MySQL · PostgreSQL</span><span>DATA</span></div><div class="cv-skill"><span>MongoDB · Firebase</span><span>NOSQL</span></div><div class="cv-skill"><span>APIs · Integração de sistemas</span><span>BACKEND</span></div><div class="cv-skill"><span>Arduino · ESP32</span><span>IOT</span></div><div class="cv-skill"><span>Scratch / Blockly</span><span>LOGIC</span></div><div class="cv-skill"><span>Office · Excel · Word · PowerPoint</span><span>TOOLS</span></div></div>
<div class="cv-highlight"><div class="cv-highlight-title">SOFT SKILLS</div><p>Resolução de problemas e raciocínio lógico como pontos fortes, desenvolvidos pela combinação de programação e manutenção.</p></div>
<div class="cv-metric-row"><div class="cv-metric"><strong>7+</strong><span>Tecnologias</span></div><div class="cv-metric"><strong>2º</strong><span>Ano técnico</span></div><div class="cv-metric"><strong>TI</strong><span>Objetivo</span></div></div>
<div class="cv-cta"><a class="btn-s btn-outline" href="mailto:pedrohztt30@gmail.com?subject=Oportunidade%20em%20TI">Entrar em contato <span>→</span></a></div>
</div></div></div>`;
const projects=document.querySelector('#projects');if(projects)projects.before(section);else document.querySelector('main')?.append(section);
}

/* smooth CV button if a real PDF is later added */
$('#cv-button')?.addEventListener('click',()=>{});

/* contact form */
$('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget,btn=form.querySelector('button');btn.disabled=true;btn.innerHTML='Enviando…';const data={nome:form.nome.value,email:form.email.value,assunto:form.assunto.value,mensagem:form.mensagem.value};const endpoint='https://script.google.com/macros/s/AKfycbwN-zFlL0hW4pSOD88aGbFYLBOiS5CUeozCXf9GunbK5yIfa1sPzO2W6z1jVBQt941v/exec';fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(()=>{form.reset();btn.disabled=false;btn.innerHTML='Mensagem enviada ✓'}).catch(()=>{btn.disabled=false;btn.innerHTML='Tentar novamente →'})});
});

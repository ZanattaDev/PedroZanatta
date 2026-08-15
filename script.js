/* Pedro Zanatta — interaction engine */
document.addEventListener('DOMContentLoaded',function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const cur=$('#cur'),ring=$('#cur-ring');let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;if(cur){cur.style.left=mx+'px';cur.style.top=my+'px';}},{passive:true});
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px';}requestAnimationFrame(loop)})();
document.addEventListener('mouseleave',()=>{if(cur)cur.style.opacity=0;if(ring)ring.style.opacity=0});document.addEventListener('mouseenter',()=>{if(cur)cur.style.opacity=1;if(ring)ring.style.opacity=1});
const nav=$('#nav'),sections=$$('section[id]'),links=$$('.nav-links a');
function navUpdate(){if(nav)nav.classList.toggle('scrolled',scrollY>40);let id='';sections.forEach(s=>{if(scrollY>=s.offsetTop-140)id=s.id});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));}addEventListener('scroll',navUpdate,{passive:true});navUpdate();
const style=document.createElement('style');style.textContent=`
#dev-scroll-progress{position:fixed;top:0;left:0;height:1px;width:0;background:linear-gradient(90deg,#777,#fff);box-shadow:0 0 10px #fff;z-index:10001;pointer-events:none}
#dev-canvas{mix-blend-mode:screen}
.dev-interactive-card{position:relative;overflow:hidden;transform-style:preserve-3d;transition:transform .35s cubic-bezier(.16,1,.3,1),border-color .3s,box-shadow .3s!important}
.dev-interactive-card:after{content:"";position:absolute;inset:0;pointer-events:none;border-radius:inherit;background:radial-gradient(circle at var(--spot-x,50%) var(--spot-y,50%),rgba(255,255,255,.08),transparent 35%);opacity:0;transition:opacity .25s}
.dev-interactive-card:hover:after{opacity:1}.project-focus{border-color:rgba(255,255,255,.18)!important;box-shadow:0 18px 55px rgba(0,0,0,.28)!important}
#home .wrap{transform:translate3d(var(--hero-x,0),var(--hero-y,0),0);transition:transform .25s ease-out}
.section{--section-shift:0px}.section>.wrap{transform:translateY(var(--section-shift));transition:transform .15s linear}
@media(hover:none){.dev-interactive-card{transform:none!important}.section>.wrap{transform:none!important}}
`;$('head').appendChild(style);
const progress=document.createElement('div');progress.id='dev-scroll-progress';document.body.appendChild(progress);
function scrollFx(){let max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';if(!reduce)$$('.section').forEach(s=>{let r=s.getBoundingClientRect(),d=(r.top+r.height/2-innerHeight/2)/innerHeight;s.style.setProperty('--section-shift',(d*4).toFixed(2)+'px')});}addEventListener('scroll',scrollFx,{passive:true});scrollFx();
/* particle network */
if(!reduce){const c=document.createElement('canvas');c.id='dev-canvas';Object.assign(c.style,{position:'fixed',inset:0,width:'100%',height:'100%',pointerEvents:'none',zIndex:0,opacity:.32});document.body.prepend(c);const x=c.getContext('2d');let p=[];function size(){let d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;x.setTransform(d,0,0,d,0,0);p=Array.from({length:Math.min(64,Math.max(25,innerWidth/24))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()+.2}))}size();addEventListener('resize',size,{passive:true});(function draw(){x.clearRect(0,0,innerWidth,innerHeight);p.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>innerWidth)a.vx*=-1;if(a.y<0||a.y>innerHeight)a.vy*=-1;x.fillStyle='rgba(255,255,255,.35)';x.beginPath();x.arc(a.x,a.y,a.r,0,7);x.fill()});for(let i=0;i<p.length;i++)for(let j=i+1;j<p.length;j++){let a=p[i],b=p[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<100){x.strokeStyle='rgba(255,255,255,'+(.045*(1-d/100))+')';x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}requestAnimationFrame(draw)})()}
/* reveal */
const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');observer.unobserve(e.target)}}),{threshold:.08});$$('.rev').forEach(e=>observer.observe(e));
/* skills */
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){$$('.sk-fill',e.target).forEach((b,i)=>setTimeout(()=>b.style.width=b.dataset.w+'%',i*90));so.unobserve(e.target)}}),{threshold:.15});$$('.sk-grid').forEach(e=>so.observe(e));
/* magnetic controls */
if(!reduce)$$('.btn-s,.soc,.nav-pill').forEach(el=>{el.addEventListener('pointermove',e=>{let r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/r.width,y=(e.clientY-r.top-r.height/2)/r.height;el.style.transform=`translate(${x*6}px,${y*4}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
/* 3D cards */
if(!reduce)$$('.proj-item,.sk-cat,.acard,.srv-cell').forEach(el=>{el.classList.add('dev-interactive-card');el.addEventListener('pointermove',e=>{let r=el.getBoundingClientRect(),x=e.clientX/r.width-r.left/r.width-.5,y=e.clientY/r.height-r.top/r.height-.5;el.style.setProperty('--spot-x',((e.clientX-r.left)/r.width*100)+'%');el.style.setProperty('--spot-y',((e.clientY-r.top)/r.height*100)+'%');el.style.transform=`perspective(850px) rotateX(${-y*2.5}deg) rotateY(${x*3}deg) translateY(-3px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
/* hacker decode */
const glyph='01<>/{}[]$#@';$$('.sec-lbl').forEach(el=>el.addEventListener('mouseenter',()=>{if(el.dataset.busy)return;el.dataset.busy=1;let text=el.textContent,n=0,t=setInterval(()=>{el.textContent=text.split('').map((c,i)=>i<n?c:glyph[Math.floor(Math.random()*glyph.length)]).join('');if(++n>text.length){clearInterval(t);el.textContent=text;delete el.dataset.busy}},30)}));
/* form */
const form=$('#contact-form');if(form)form.addEventListener('submit',function(e){e.preventDefault();const btn=this.querySelector('button[type=submit]');const data={nome:this.querySelector('[name=nome]')?.value||'',email:this.querySelector('[name=email]')?.value||'',assunto:this.querySelector('[name=assunto]')?.value||'',mensagem:this.querySelector('[name=mensagem]')?.value||''};const url='https://script.google.com/macros/s/AKfycbwN-zFlL0hW4pSOD88aGbFYLBOiS5CUeozCXf9GunbK5yIfa1sPzO2W6z1jVBQt941v/exec';if(btn)btn.textContent='Enviando…';fetch(url,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(()=>{alert('Mensagem enviada com sucesso!');form.reset();if(btn)btn.textContent='Enviar'}).catch(()=>{alert('Ops, erro ao enviar.');if(btn)btn.textContent='Enviar'});});
});

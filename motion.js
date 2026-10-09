(() => {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const fine=matchMedia('(hover: hover) and (pointer: fine)');
  let paused=false;
  try{sessionStorage.removeItem('hakka-motion-paused');}catch{}
  const hero=document.querySelector('.hero');
  const art=document.querySelector('.hero-art');
  const control=document.createElement('button');
  control.className='motion-toggle';control.type='button';
  control.setAttribute('aria-label','暫停裝飾動畫');
  const strip=document.createElement('div');strip.className='idea-ribbon';strip.setAttribute('aria-hidden','true');
  const track=document.createElement('div');track.className='idea-track';
  for(let i=0;i<2;i++){const group=document.createElement('span');group.className='idea-group';group.innerHTML='<span>創意 IMAGINE</span><b>✳</b><span>創新 CREATE</span><b>✿</b><span>創業 CONNECT</span><b>↗</b>';track.append(group);}
  strip.append(track);hero.after(strip);
  const world=art.querySelector('svg > g[transform]');
  if(world){const wrap=document.createElementNS('http://www.w3.org/2000/svg','g');wrap.classList.add('motion-world');world.before(wrap);wrap.append(world);}
  const h1=hero.querySelector('h1');
  const first=document.createElement('span');first.className='hero-line';first.textContent='讓客家，被看見。';
  const second=document.createElement('span');second.className='hero-line';second.append('讓想法，');
  const emphasis=document.createElement('em');emphasis.textContent='長出可能。';second.append(emphasis);h1.replaceChildren(first,second);
  // Content stays visible without JavaScript or when animation is disabled.
  const targets=[...document.querySelectorAll('.intro-grid > *, .section-heading, .principle, .project-card, .event-copy, .calendar-shell, .photo, .archive-layout > *, .closing h2')];
  let observer;
  if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-revealed');observer.unobserve(entry.target);}}},{threshold:0.08,rootMargin:'0px 0px -24px 0px'});targets.forEach((n,i)=>{if(n.getBoundingClientRect().top<innerHeight){n.classList.add('is-revealed');}n.classList.add('reveal');n.style.setProperty('--reveal-delay',`${i%3*85}ms`);observer.observe(n);});}
  let frame=0,x=0,y=0;
  function active(){return !paused&&!reduced.matches;}
  function resetParallax(){art.style.removeProperty('--pointer-x');art.style.removeProperty('--pointer-y');}
  function sync(){const enabled=active();document.documentElement.classList.toggle('motion-on',enabled);document.documentElement.classList.toggle('motion-paused',!enabled);control.textContent=enabled?'Ⅱ 暫停動畫':'▷ 開啟動畫';control.setAttribute('aria-label',enabled?'暫停裝飾動畫':'開啟裝飾動畫');control.setAttribute('aria-pressed',String(!enabled));control.disabled=reduced.matches;control.title=reduced.matches?'依照裝置的減少動態設定，動畫已關閉':'';if(!enabled){resetParallax();targets.forEach(n=>n.classList.add('is-revealed'));}}
  control.addEventListener('click',()=>{paused=!paused;try{sessionStorage.setItem('hakka-motion-paused',String(paused));}catch{}sync();});reduced.addEventListener('change',sync);
  hero.addEventListener('pointermove',e=>{if(!active()||!fine.matches)return;const r=hero.getBoundingClientRect();x=(e.clientX-r.left)/r.width-.5;y=(e.clientY-r.top)/r.height-.5;if(!frame)frame=requestAnimationFrame(()=>{art.style.setProperty('--pointer-x',`${x*16}px`);art.style.setProperty('--pointer-y',`${y*12}px`);frame=0;});},{passive:true});
  hero.addEventListener('pointerleave',resetParallax);fine.addEventListener('change',resetParallax);
  document.addEventListener('visibilitychange',()=>document.documentElement.classList.toggle('page-hidden',document.hidden));
  document.addEventListener('focusin',e=>{const target=e.target.closest?.('.reveal');if(target)target.classList.add('is-revealed');});
  document.querySelector('#project-filters').addEventListener('click',()=>{if(!active())return;document.querySelectorAll('.project-card').forEach((card,i)=>card.animate([{opacity:0,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:420,delay:i*65,easing:'cubic-bezier(.2,.7,.2,1)',fill:'backwards'}));});
  sync();
})();

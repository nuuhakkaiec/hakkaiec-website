(()=>{
const track=document.querySelector('#photo-grid');if(!track||track.children.length<2)return;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const controls=document.createElement('div');controls.className='gallery-controls';controls.setAttribute('aria-label','照片瀏覽控制');
function button(label,text){const b=document.createElement('button');b.type='button';b.textContent=text;b.setAttribute('aria-label',label);controls.append(b);return b;}
const prev=button('上一張照片','←'),pause=document.createElement('button'),next=button('下一張照片','→');
track.after(controls);
let stopped=false,hover=false,focused=false,visible=false,last=0,hold=0;
const blocked=()=>focused||!visible||reduced.matches||document.hidden||document.documentElement.classList.contains('motion-paused')||document.body.classList.contains('modal-open');
new IntersectionObserver(([entry])=>visible=entry.isIntersecting,{threshold:.05}).observe(track);
track.addEventListener('pointerenter',()=>hover=true);track.addEventListener('pointerleave',()=>hover=false);
track.addEventListener('focusin',()=>focused=true);track.addEventListener('focusout',event=>focused=track.contains(event.relatedTarget));
track.addEventListener('pointerdown',()=>hold=performance.now()+5000);
track.addEventListener('wheel',()=>hold=performance.now()+5000,{passive:true});
pause.addEventListener('click',()=>{stopped=!stopped;pause.textContent=stopped?'開始播放':'暫停播放';pause.setAttribute('aria-label',stopped?'開始照片自動播放':'暫停照片自動播放');pause.setAttribute('aria-pressed',String(stopped));});
function step(){return track.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap);}
function recycle(){const width=step();if(track.scrollLeft>=width){track.append(track.firstElementChild);track.scrollLeft-=width;}}
next.addEventListener('click',()=>{hold=performance.now()+5000;track.scrollLeft+=step();recycle();});
prev.addEventListener('click',()=>{hold=performance.now()+5000;track.prepend(track.lastElementChild);track.scrollLeft+=step();track.scrollLeft-=step();});
function tick(now){const dt=Math.min(now-last,40);last=now;if(!blocked()&&now>hold){track.scrollLeft+=dt*.035;recycle();}requestAnimationFrame(tick);}
requestAnimationFrame(tick);
})();


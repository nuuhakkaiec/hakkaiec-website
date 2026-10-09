/* Lenis 1.3.26 — local distribution, native touch, accessible fallbacks. */
(() => {
 if(typeof Lenis!=='function')return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let instance;
 function sync(){
  const disabled=reduced.matches||document.documentElement.classList.contains('motion-paused');
  if(disabled){instance?.destroy();instance=undefined;return;}
  if(!instance)instance=new Lenis({
   autoRaf:true,lerp:0.085,wheelMultiplier:1,smoothWheel:true,syncTouch:false,
   respectReducedMotion:true,stopInertiaOnNavigate:true,
   prevent:node=>node.matches?.('dialog,iframe,.calendar-shell,.photo-grid,.polaroid-track,input,textarea,select,[contenteditable=true]'),
   virtualScroll:({event})=>!event.ctrlKey&&!event.metaKey&&!event.shiftKey
  });
  if(document.body.classList.contains('modal-open'))instance.stop();else instance.start();
 }
 // Only react to the user's pause preference, not Lenis's own class updates.
 let paused=document.documentElement.classList.contains('motion-paused');
 new MutationObserver(()=>{const next=document.documentElement.classList.contains('motion-paused');if(next!==paused){paused=next;sync();}}).observe(document.documentElement,{attributes:true,attributeFilter:['class']});
 new MutationObserver(sync).observe(document.body,{attributes:true,attributeFilter:['class']});
 reduced.addEventListener('change',sync);
 document.addEventListener('click',event=>{
  const a=event.target.closest('a[href]');if(!a||!instance||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||a.target==='_blank')return;
  const url=new URL(a.href,location.href);if(url.origin!==location.origin||url.pathname!==location.pathname||url.search!==location.search||!url.hash)return;
  let target;try{target=document.getElementById(decodeURIComponent(url.hash.slice(1)));}catch{return;}if(!target)return;
  event.preventDefault();const offset=-(document.querySelector('.site-header')?.offsetHeight||0)-16;
  instance.scrollTo(target,{offset,onComplete:()=>{history.pushState(null,'',url.hash);if(!target.hasAttribute('tabindex')){target.setAttribute('tabindex','-1');target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});}target.focus({preventScroll:true});}});
 });
 addEventListener('keydown',event=>{if(instance&&['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' ','Tab'].includes(event.key))instance.scrollTo(window.scrollY,{immediate:true});});
 addEventListener('pagehide',()=>{instance?.destroy();instance=undefined;});addEventListener('pageshow',sync);sync();
})();

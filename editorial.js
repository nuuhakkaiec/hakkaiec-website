(() => {
 const header=document.querySelector('.site-header');
 const photos=document.querySelector('#photo-grid');
 photos.tabIndex=0;photos.setAttribute('role','region');photos.setAttribute('aria-label',document.querySelector('#moments h2').textContent);
 photos.addEventListener('keydown',event=>{if(event.target!==photos||!['ArrowLeft','ArrowRight'].includes(event.key))return;event.preventDefault();photos.scrollBy({left:(event.key==='ArrowRight'?1:-1)*photos.clientWidth*.7,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
 let scheduled=false;
 function update(){header.classList.toggle('is-scrolled',scrollY>30);scheduled=false;}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});update();
})();

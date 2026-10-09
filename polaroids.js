(() => {
 const root=document.querySelector('#project-grid');
 document.querySelector('#project-filters').hidden=true;
 root.replaceChildren();root.className='polaroid-track';root.tabIndex=0;root.setAttribute('aria-label','照片拍立得');
 const items=window.CLUB_CONTENT.polaroids||[];
 const make=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 items.forEach((p,i)=>{
  const card=make('article','polaroid');
  const frame=make('div','polaroid-frame');
  if(p.src){const img=make('img','');img.src=p.src;img.alt=p.title||'';img.loading='lazy';frame.append(img);}else{frame.append(make('span','placeholder-label','照片待更新'));}
  card.append(frame,make('h3',p.title?'':'placeholder-copy',p.title||'標題待更新'),make('p',p.text?'':'placeholder-copy',p.text||'文字待更新'));
  root.append(card);
 });
 root.addEventListener('keydown',e=>{if(e.target!==root||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();root.scrollBy({left:(e.key==='ArrowRight'?1:-1)*root.clientWidth*.7,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});});
})();

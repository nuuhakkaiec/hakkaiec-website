(() => {
 const data=window.CLUB_MEMBERS, tabs=document.querySelector('.term-tabs'), panel=document.querySelector('#members-panel'), list=document.querySelector('#member-list');
 const node=(tag,cls,text)=>{const n=document.createElement(tag);n.className=cls;if(text)n.textContent=text;return n;};
 function render(id,updateHash=false){
  const term=data.find(t=>t.id===id)||data[2];
  tabs.querySelectorAll('button').forEach(b=>{const active=b.dataset.term===term.id;b.setAttribute('aria-selected',String(active));b.tabIndex=active?0:-1;});
  panel.setAttribute('aria-labelledby','tab-'+term.id);document.querySelector('#term-heading').textContent=term.label;list.replaceChildren();
  term.members.forEach(m=>{const card=node('article','member');const visual=node('div','member-photo');
   if(m.photo){const img=node('img','');img.src=m.photo;img.alt=m.name||m.role;img.loading='lazy';visual.append(img);}else visual.append(node('span','photo-placeholder','照片待更新'));
   const copy=node('div','member-copy');copy.append(node('h3',m.name?'':'placeholder',m.name||'姓名待更新'),node('p','role',m.role),node('p',m.bio?'bio':'bio placeholder',m.bio||'個人介紹待更新'));card.append(visual,copy);list.append(card);
  });
  if(updateHash)history.replaceState(null,'','#'+term.id);
 }
 data.forEach((t,i)=>{const b=node('button','term-tab',t.label);b.type='button';b.id='tab-'+t.id;b.dataset.term=t.id;b.setAttribute('role','tab');b.setAttribute('aria-controls','members-panel');b.addEventListener('click',()=>render(t.id,true));b.addEventListener('keydown',e=>{let next=i;if(e.key==='ArrowRight')next=(i+1)%data.length;else if(e.key==='ArrowLeft')next=(i+data.length-1)%data.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=data.length-1;else return;e.preventDefault();render(data[next].id,true);tabs.children[next].focus();});tabs.append(b);});
 addEventListener('hashchange',()=>render(location.hash.slice(1)));render(location.hash.slice(1)||'third');
})();
// 載入最新三屆幹部名單（不含照片）。
(() => {
  const rosterScript = document.createElement('script');
  rosterScript.src = 'members-updated.js';
  document.head.append(rosterScript);
})();


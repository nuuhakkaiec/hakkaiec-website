(() => {
  'use strict';
  const data=window.CLUB_CONTENT, art=window.CLUB_ART;
  const $=s=>document.querySelector(s);
  const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
  function safeUrl(value){try{const u=new URL(value,location.href);return ['https:','http:'].includes(u.protocol)?u.href:null;}catch{return null;}}
  function artwork(kind,cls){const n=el('div',cls);n.innerHTML=art[kind]||art.village; n.setAttribute('aria-hidden','true');return n;}
  $('#hero-art').innerHTML=art.garden;$('#hero-art').setAttribute('aria-hidden','true');
  $('#about-copy').textContent=data.about;
  document.querySelectorAll('[data-instagram]').forEach(a=>a.href=data.instagram);
  document.querySelectorAll('[data-draft]').forEach(n=>n.hidden=!data.draft);
  const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));$('#nav').classList.toggle('open',open);});
  $('#nav').addEventListener('click',e=>{if(e.target.closest('a')){menu.setAttribute('aria-expanded','false');$('#nav').classList.remove('open');}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.click();menu.focus();}});
  data.principles.forEach((p,i)=>{const card=el('article','principle'),icon=el('div','principle-icon');icon.append(el('span','',['✳','✿','↗'][i]),el('small','',p.en));card.append(icon,el('h3','',p.title),el('p','',p.text));$('#principle-grid').append(card);});
  const dialog=$('#detail-dialog');let opener;
  function openDialog(nodes){opener=document.activeElement;$('#dialog-content').replaceChildren(...nodes);dialog.showModal();document.body.classList.add('modal-open');$('.close-dialog').focus();}
  $('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus();});
  function heading(text){const h=el('h2','',text);h.id='dialog-title';return h;}
  function filters(container,items,callback){container.replaceChildren();items.forEach((label,i)=>{const b=el('button','filter',label);b.type='button';b.setAttribute('aria-pressed',String(i===0));b.addEventListener('click',()=>{container.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));callback(label,i);});container.append(b);});}
  function renderProjects(category='全部專案'){$('#project-grid').replaceChildren();const list=data.projects.filter(p=>category==='全部專案'||p.category===category);list.forEach((p,i)=>{const b=el('button','project-card');b.type='button';const pic=artwork(p.art,'project-image');if(p.demo)pic.append(el('span','demo','版型示意 · 非實際專案'));const meta=el('div','project-meta');meta.append(el('span','',p.category),el('span','',`0${i+1} ↗`));b.append(pic,meta,el('h3','',p.title),el('p','',p.summary));b.addEventListener('click',()=>{const nodes=[el('p','section-number',p.category),heading(p.title),artwork(p.art,'dialog-art'),el('p','',p.body)];if(p.demo)nodes.push(el('p','draft-note','此專案僅示範版型，內容待社團提供。'));if(p.url&&safeUrl(p.url)){const a=el('a','button primary','查看專案成果 ↗');a.href=safeUrl(p.url);a.target='_blank';a.rel='noopener noreferrer';nodes.push(a);}openDialog(nodes);});$('#project-grid').append(b);});if(!list.length)$('#project-grid').append(el('p','','專案內容整理中。'));}
  filters($('#project-filters'),['全部專案',...new Set(data.projects.map(p=>p.category))],renderProjects);renderProjects();
  if(data.signupUrl&&safeUrl(data.signupUrl)){$('#signup-link').href=safeUrl(data.signupUrl);$('#signup-link').hidden=false;$('#signup-pending').hidden=true;}
  let calendarValid=false;if(data.calendarEmbedUrl){try{const u=new URL(data.calendarEmbedUrl);if(u.protocol==='https:'&&u.hostname==='calendar.google.com'&&u.pathname.startsWith('/calendar/embed')){const f=el('iframe');f.src=u.href;f.title='客家創新創業社 Google 行事曆';f.loading='lazy';$('#calendar-content').append(f);calendarValid=true;}}catch{}}
  if(!calendarValid){const n=el('div','calendar-placeholder');n.append(el('span','calendar-symbol','▦'),el('h3','','活動日曆準備中'),el('p','','社團行事曆接上後，活動會顯示在這裡。'),el('p','','最新消息請先查看社團 Instagram。'));$('#calendar-content').append(n);}
  if(data.calendarUrl&&safeUrl(data.calendarUrl)){$('#calendar-link').href=safeUrl(data.calendarUrl);$('#calendar-link').hidden=false;}
  function renderPhotos(year='全部年份'){$('#photo-grid').replaceChildren();const photos=data.photos.filter(p=>year==='全部年份'||String(p.year)===year);photos.forEach(p=>{const b=el('button','photo');b.type='button';const img=el('img','photo-visual');img.src=p.src;img.alt=p.alt||p.caption;img.loading='lazy';b.append(img,el('span','',p.caption));b.addEventListener('click',()=>{const full=el('img');full.src=p.src;full.alt=p.alt||p.caption;openDialog([heading(p.caption),full,el('p','',String(p.year||''))]);});$('#photo-grid').append(b);});}
  if(data.photos.length){filters($('#photo-filters'),['全部年份',...new Set(data.photos.map(p=>String(p.year)).filter(Boolean))],renderPhotos);renderPhotos();}else{$('#photo-filters').hidden=true;['village','market','flower'].forEach((kind,i)=>{const n=el('div','photo photo-empty');n.append(artwork(kind,'photo-visual'),el('span','',['相遇的日常 · 活動照片待補','一起動手 · 活動照片待補','留住回憶 · 活動照片待補'][i]));$('#photo-grid').append(n);});}
  function renderGeneration(_,index=0){const g=data.generations[index],root=$('#generation-content');root.replaceChildren();if(!g){root.append(el('p','','歷屆資料整理中。'));return;}const title=el('h3','',g.label);title.append(el('small','',g.period));const columns=el('div','generation-columns');[['歷屆幹部',g.members,'幹部名單整理中。'],['活動與成果',g.achievements,'活動成果整理中。']].forEach(([label,items,pending],i)=>{const col=el('div');const heading=el('h4','');if(i===0){const link=el('a','members-page-link',label+' ↗');link.href='members.html';heading.append(link);}else heading.textContent=label;col.append(heading);if(items?.length){const ul=el('ul');items.forEach(v=>ul.append(el('li','',i===0?`${v.role}｜${v.name}`:v)));col.append(ul);}else col.append(el('p','',pending));columns.append(col);});root.append(columns);}
  $('#generation-tabs').hidden=true;renderGeneration();
  if(!data.resources.length)$('#resource-list').append(el('p','resource-empty','資料整理中，敬請期待。'));else data.resources.forEach(r=>{if(!safeUrl(r.url))return;const a=el('a','resource-link',r.title+' ↗');a.href=safeUrl(r.url);a.target='_blank';a.rel='noopener noreferrer';a.append(el('small','',r.description));$('#resource-list').append(a);});
})();

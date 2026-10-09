(()=>{
const root=document.querySelector('#deeds-list');if(!root)return;
root.classList.add('folder-stack');
const data=window.CLUB_CONTENT.deeds||[];
for(let i=0;i<3;i++){
const item=data[i]||{},card=document.createElement('article');card.className='deed-folder';card.id='deed-folder-'+i;card.style.setProperty('--folder-index',i);
if ((item.title || '').includes('哈客松') && (item.title || '').includes('創點子')) item.image='assets/哈客松.png';
const tab=document.createElement('button');tab.type='button';tab.className='folder-tab';tab.textContent=String(i+1).padStart(2,'0');tab.setAttribute('aria-label','查看社團事跡檔案夾 '+(i+1));
const body=document.createElement('div');body.className='folder-body';
const copy=document.createElement('div');copy.className='folder-copy';
const title=document.createElement('h3');title.textContent=item.title||'標題待更新';
const text=document.createElement('p');text.textContent=item.text||'內容待更新';
if(item.date){const date=document.createElement('p');date.className='folder-date';date.textContent=item.date;copy.append(date);}
copy.append(title,text);
if(item.url){try{const u=new URL(item.url,location.href);if(['http:','https:'].includes(u.protocol)){const link=document.createElement('a');link.className='button';link.href=u.href;link.target='_blank';link.rel='noopener noreferrer';link.textContent='查看內容 ↗';copy.append(link);}}catch{}}
const visual=document.createElement('div');visual.className='folder-visual';
if(item.image){const img=document.createElement('img');img.src=item.image;img.alt=item.title||'';img.loading='lazy';visual.append(img);}else{visual.textContent='照片待更新';}
body.append(copy,visual);card.append(tab,body);root.append(card);
tab.addEventListener('click',()=>{card.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});});
}
})();

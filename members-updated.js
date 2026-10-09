// 在這裡修改歷屆幹部；所有幹部均不放照片。
(() => {
const generations = [
{title:'第一屆', members:[
{role:'創社社長',name:'曾昇富',intro:`iˊ mong jia iuˇ iaˋ ge sa tonˇ zo dedˋ viˇ hagˋ zongˊ dai loiˇ
希望藉由這個社團做得為客莊帶來
moˇ kiung iong ge hiˊ mong，me zo dedˋ viˇ iaˋ sa tonˇ zeuˊ
無共樣个希望，乜做得為這社團招
lamˋ loiˇ cii moˇ kiung iong zonˊ ngiab ge hog senˊ，kiung ha di
攬來自無共樣專業个學生，共下在
hagˋ gaˊ vunˇ fa fadˋ zanˋ hong cudˋ idˋ fun ximˊ lid！
客家文化發展項出一份心力！`},
{role:'副社長',name:'劉佳玲',intro:`ia iuˇ sa tonˇ pan liˊ ziiˊ hagˋ zongˊ fad tung，dai denˋmoˇ
藉由社團辦理之客庄活動，帶領不
kiung iong liangˊvedˋziiˊsa ienˇfu xiongˊhog xib，siid ji cauˊzogˋ
同領域之社員相互學習，實際操作
ziinˋgagˋ，mong siiˋdedˋtonˇ cui kiung ha siinˇzongˋ，zeuˊ hiong
整合，望能使團隊共同成長，朝向
hagˋzongˊ tuiˊ gongˋ mai jin
客庄推廣邁進！`},
{role:'美宣',name:'顏冠昕',intro:`kiˇhiˋiaˋge sa tonˇsiiˋdedˋbunˊgo ka doˊnginˇciimˊngib liauˋ
期許這個社團使得分過較多人深入
gieˋ hagˋ gaˊ vunˇ fa ge jinˊ suiˇ tungˇ mi lid，teu go fad
了解客家文化的精髓與魅力，透過
tung tungˇ gauˊ liuˇ，biˋ ciiˋ hog xib、funˊ hiongˋ，kiung ha
活動與交流，彼此學習、分享，共
cugˋjin hagˋgaˊvunˇfa ge conˇsiin iˇfadˋ zanˋ，siiˇgien gaˊ
同促進客家文化个傳承與發展，使
doˊ nginˇ su idˋ di iaˋ fun pongˊ pai ge vunˇ fa viˇ sanˋ。
更多人受益於這份豐富的文化遺產。`},
{role:'總務',name:'許峰嫙'}, {role:'文書',name:'葉品均'},
{role:'美宣',name:'高甯麗'}, {role:'活動',name:'王禹蘋'}]},
{title:'第二屆',members:[{role:'社長',name:'劉佳玲'},{role:'活動長',name:'王禹蘋'},{role:'總務文書',name:'Rita承茹'}]},
{title:'第三屆',members:[{role:'社長',name:'楊子瑩'},{role:'副社長',name:'徐愛'},{role:'總務',name:'王文惠'},{role:'公關',name:'劉佳玲'}]}
];
function renderRoster(){
 const main=document.querySelector('main');
 if(!main)return;
 const style=document.createElement('style');
 style.textContent=`main.roster-page{display:block;width:100%;max-width:1200px;margin:0 auto;padding:160px 28px 80px;box-sizing:border-box}.roster-page .roster-heading{font-size:clamp(32px,5vw,64px);margin:0 0 48px}.roster-page .roster-section{margin:0 0 56px;padding:0}.roster-page .roster-title{font-size:30px;margin:0 0 24px;padding-bottom:16px;border-bottom:1px solid currentColor}.roster-page .roster-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:20px}.roster-page .roster-card{display:block;padding:28px;border:1px solid #b8d3be;border-radius:24px;background:#f7f8ee;color:#20554d;min-width:0}.roster-page .roster-role{margin:0 0 8px;font-size:16px;font-weight:700}.roster-page .roster-name{margin:0;font-size:28px}.roster-page .roster-intro{margin:20px 0 0;font-size:16px;line-height:1.9;white-space:pre-line;overflow-wrap:anywhere}@media(max-width:760px){main.roster-page{padding:120px 20px 48px}.roster-page .roster-grid{grid-template-columns:1fr}.roster-page .roster-card{padding:22px}}`;
 style.textContent = `
 main.roster-page{display:block;width:100%;max-width:none;margin:0;padding:140px 0 70px;box-sizing:border-box;color:#20554d;background:#f7f8f2}
 .roster-page *{box-sizing:border-box}
 .roster-heading{font-size:clamp(36px,5vw,64px);margin:0 6vw 60px;line-height:1.2}
 .roster-section{padding:0;margin:0 0 80px;scroll-margin-top:110px}
 .roster-title{font-size:30px;margin:0 6vw 28px}
 .roster-grid{display:flex;gap:28px;overflow-x:auto;scroll-snap-type:x mandatory;padding:12px 6vw 28px;scrollbar-width:thin;scrollbar-color:#83a77b transparent}
 .roster-card{position:relative;flex:0 0 360px;min-width:0;align-self:stretch;padding:26px 30px 58px;background:#fff;border-radius:22px;box-shadow:0 5px 24px #20554d06;scroll-snap-align:center}
 .roster-portrait{height:225px;position:relative;display:flex;align-items:center;justify-content:center;margin:0 0 24px;border-bottom:1px dotted #83a77b;padding:20px 28px 28px}
 .roster-photo{display:block;width:175px;height:175px;object-fit:cover;border-radius:50%;background:#e5eee0}
 .roster-placeholder{display:grid;place-content:center;gap:8px;text-align:center;width:175px;height:175px;border-radius:50%;background:#e5eee0;color:#527e48}
 .roster-placeholder svg{width:75px;height:75px;margin:auto}
 .roster-placeholder span{font-size:13px}
 .roster-number{position:absolute;left:0;top:0;font-size:25px;color:#527e48;transform:rotate(-12deg);font-weight:700}
 .roster-role{position:absolute;right:-8px;top:0;margin:0;writing-mode:vertical-rl;letter-spacing:3px;font-size:15px;font-weight:700;color:#527e48}
 .roster-name{font-size:27px;margin:0 0 14px;color:#527e48}
 .roster-excerpt{font-size:16px;line-height:1.85;margin:0;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
 .roster-more{position:absolute;bottom:-10px;right:14px;width:52px;height:52px;border:0;border-radius:50%;background:#527e48;color:white;font-size:32px;cursor:pointer;box-shadow:0 4px 14px #20554d15}
 .roster-controls{display:flex;justify-content:center;align-items:center;gap:18px;margin:10px 0 0}
 .roster-controls button{width:52px;height:52px;border:0;border-radius:50%;background:#20554d;color:white;font-size:25px;cursor:pointer}
 .roster-controls button:disabled{opacity:.3;cursor:default}
 .roster-page button:focus-visible,.roster-grid:focus-visible{outline:3px solid #b5bb57;outline-offset:5px}
 .roster-dialog{width:min(650px,calc(100% - 32px));max-height:85vh;padding:36px;border:0;border-radius:24px;color:#20554d;background:#fff}
 .roster-dialog::backdrop{background:#12332999}
 .roster-dialog h2{font-size:28px;margin:16px 0}
 .roster-dialog p{white-space:pre-line;overflow-wrap:anywhere;line-height:1.9;font-size:16px}
 .roster-close{float:right;background:#e5eee0;border:0;border-radius:24px;padding:10px 18px;color:#20554d;cursor:pointer}
 @media(max-width:600px){main.roster-page{padding-top:115px}.roster-heading{margin-bottom:40px}.roster-grid{gap:18px}.roster-card{flex-basis:84vw;padding:24px 24px 52px}.roster-portrait{height:215px}.roster-dialog{padding:24px}}
 `;
 style.textContent += `
 .roster-page .roster-portrait{height:270px;padding:0 20px;margin-bottom:24px;overflow:hidden;align-items:flex-start}
 .roster-page .roster-photo{width:100%;height:285px;object-fit:cover;object-position:50% 18%;border-radius:0;background:white}
 .roster-page .roster-number,.roster-page .roster-role{z-index:1;background:#ffffffdf;border-radius:8px;padding:4px}
 .roster-page .roster-role{right:0}
 .roster-page .roster-placeholder{margin-top:30px}
 @media(max-width:600px){.roster-page .roster-portrait{height:250px}.roster-page .roster-photo{height:270px}}
 `;
 document.head.append(style);
 main.className='roster-page';
 const make=(tag,cls,text)=>{const node=document.createElement(tag);node.className=cls;node.textContent=text;return node;};
 main.replaceChildren(make('h1','roster-heading','歷屆幹部'));
 for(const [generationIndex,generation] of generations.entries()){
  const section=make('section','roster-section','');
  section.id=['first','second','third'][generationIndex];
  const grid=make('div','roster-grid','');
  grid.tabIndex=0;
  grid.setAttribute('aria-label',generation.title+'幹部，可左右捲動');
  for(const [memberIndex,member] of generation.members.entries()){
   const card=make('article','roster-card','');
   const portrait=make('div','roster-portrait','');
   const placeholder=make('div','roster-placeholder','');
   placeholder.innerHTML='<svg viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="26" r="14" fill="none" stroke="currentColor" stroke-width="3"/><path d="M13 70c0-24 54-24 54 0" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg><span>照片待更新</span>';
   // 照片依屆數與卡片順序命名，例如 assets/members/1-01.jpg。
   // 也可在上方 member 資料加入 photo: 'assets/你的照片.jpg' 指定路徑。
   const photo=make('img','roster-photo','');
   photo.alt=member.name+'｜'+member.role+'角色圖';
   // 圖片在載入完成前隱藏，不能使用 lazy，否則可能永遠不觸發載入。
   photo.loading='eager';
   photo.hidden=true;
   photo.style.display='none';
   photo.addEventListener('load',()=>{placeholder.remove();photo.hidden=false;photo.style.display='block';});
   const roleImage = member.role.includes('副社長') ? '副社長.png'
    : member.role.includes('社長') ? '社長.png'
    : /總務|文書/.test(member.role) ? '總務文書.png'
    : member.role.includes('公關') ? '公關.png' : '幹部.png';
   photo.addEventListener('error',()=>photo.remove());
   photo.src=member.photo || new URL('assets/'+encodeURIComponent(roleImage), document.baseURI).href;
   portrait.append(placeholder,photo,make('span','roster-number',String(memberIndex+1).padStart(2,'0')),make('p','roster-role',member.role));
   card.append(portrait,make('h3','roster-name',member.name));
   if(member.intro){
    const excerpt=member.intro.split('\n').filter(line=>/[\u3400-\u9fff]/.test(line)).join('');
    card.append(make('p','roster-excerpt',excerpt));
    const more=make('button','roster-more','＋');
    more.type='button';
    more.setAttribute('aria-label','閱讀'+member.name+'的完整介紹');
    more.addEventListener('click',()=>{
     const dialog=make('dialog','roster-dialog','');
     const close=make('button','roster-close','關閉');
     close.type='button';
     close.addEventListener('click',()=>dialog.close());
     dialog.append(close,make('h2','',member.role+'｜'+member.name),make('p','',member.intro));
     dialog.addEventListener('close',()=>{dialog.remove();more.focus();},{once:true});
     dialog.addEventListener('click',event=>{if(event.target===dialog){const box=dialog.getBoundingClientRect();if(event.clientX<box.left||event.clientX>box.right||event.clientY<box.top||event.clientY>box.bottom)dialog.close();}});
     document.body.append(dialog);dialog.showModal();
    });
    card.append(more);
   }
   grid.append(card);
  }
  const controls=make('div','roster-controls','');
  const previous=make('button','','‹');
  const next=make('button','','›');
  previous.type=next.type='button';
  previous.setAttribute('aria-label',generation.title+'上一位幹部');
  next.setAttribute('aria-label',generation.title+'下一位幹部');
  const move=direction=>grid.scrollBy({left:direction*(grid.firstElementChild.getBoundingClientRect().width+parseFloat(getComputedStyle(grid).gap)),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  previous.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
  const update=()=>{previous.disabled=grid.scrollLeft<=1;next.disabled=grid.scrollLeft+grid.clientWidth>=grid.scrollWidth-2;};
  grid.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);
  controls.append(previous,next);
  section.append(make('h2','roster-title',generation.title),grid,controls);
  main.append(section);
  requestAnimationFrame(update);
 }
 const anchor=document.getElementById(location.hash.slice(1));
 if(anchor&&main.contains(anchor))requestAnimationFrame(()=>anchor.scrollIntoView());
}
if(document.readyState==='complete')renderRoster();
else window.addEventListener('load',renderRoster,{once:true});
})();

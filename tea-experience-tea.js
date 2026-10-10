const $=s=>document.querySelector(s);
const bowl=$('#bowl'), mixture=$('#mixture'), powder=$('#powder'), pestle=$('#pestle');
let quantities={leaves:0,sesame:0,peanuts:0}, progress=0, state='select', pointer=null, last=null, rotation=0;
const labels={leaves:'茶葉',sesame:'芝麻',peanuts:'花生'};
function words(chapter,title,hint,status){$('#chapter').textContent=chapter;$('#title').textContent=title;$('#hint').textContent=hint;$('#status').textContent=status;}
function step(n){document.querySelectorAll('.steps li').forEach((li,i)=>li.classList.toggle('active',i===n));}
function updateRecipe(){
 const {leaves,sesame,peanuts}=quantities,total=leaves+sesame+peanuts;
 const strength=total ? leaves/total : 1/3;
 const brightness=1.19-strength*.57, saturation=.65+strength*.85;
 $('#tea-color').style.filter=`brightness(${brightness}) saturate(${saturation})`;
 $('#recipe').textContent=`茶葉 ${leaves} 匙 · 芝麻 ${sesame} 匙 · 花生 ${peanuts} 匙`;
 $('#start').disabled=total===0;
 $('#progress-label').textContent=total ? `你的配方 · ${strength>.55?'濃綠茶色':strength<.25?'柔淺茶色':'溫潤茶色'}` : '等待香氣入碗';
}
document.querySelectorAll('[data-ingredient]').forEach(button=>button.addEventListener('click',()=>{
 if(state!=='select')return;
 const key=button.dataset.ingredient;quantities[key]++;
 button.querySelector('b').textContent=`${quantities[key]} 匙 ＋`;
 const layer=$(`[data-layer="${key}"]`);layer.classList.add('added');layer.style.scale=1+Math.min(quantities[key]-1,8)*.055;
 $('#bowl-note').hidden=true;updateRecipe();$('#status').textContent=`加入一匙${labels[key]}。可以繼續加料，或開始研磨。`;
}));
$('#start').addEventListener('click',()=>{
 if(state!=='select'||Object.values(quantities).every(n=>n===0))return;
 state='grind';$('#start').hidden=true;document.querySelectorAll('[data-ingredient]').forEach(b=>b.disabled=true);
 bowl.classList.add('grinding');$('#grind').hidden=false;step(1);$('#progress-label').textContent='香氣，慢慢醒來';words('02 ／ 用一點時間，換一碗香','按住，慢慢畫個圈。','在碗裡按住滑鼠或手指畫圈。也可以點「幫我擂一下」，或聚焦擂缽後按空白鍵。','配方選好了，跟著自己的節奏磨。');
});
function advance(amount){if(state!=='grind')return;progress=Math.min(100,progress+amount);rotation+=amount*4;$('#fill').style.width=progress+'%';mixture.style.opacity=1-progress/100;mixture.style.transform=`rotate(${rotation}deg)`;powder.style.opacity=progress/100;$('#progress-label').textContent=progress<35?'香氣，慢慢醒來':progress<75?'細細磨，香氣漸濃':'快好了，再磨一會兒';
 if(progress===100){state='ready';pointer=null;last=null;bowl.classList.remove('grinding');$('#grind').hidden=true;$('#pour').hidden=false;$('#progress-label').textContent='磨好了 · 等一碗暖茶';words('03 ／ 沖開一碗暖意','香氣已經準備好了。','點一下「沖一碗茶」，看茶湯慢慢舒展。','研磨完成，可以沖茶了。');step(2);$('#bird-note').innerHTML='聞到了嗎？<br>是一起完成的香氣。';}}
function point(e){const r=bowl.getBoundingClientRect();return {x:(e.clientX-r.left)/r.width-.5,y:(e.clientY-r.top)/r.height-.52};}
function inside(p){return p.x*p.x/(.36*.36)+p.y*p.y/(.32*.32)<1;}
bowl.addEventListener('pointerdown',e=>{if(state!=='grind'||(e.pointerType==='mouse'&&e.button!==0))return;const p=point(e);if(!inside(p))return;e.preventDefault();pointer=e.pointerId;last=p;bowl.setPointerCapture(pointer);});
bowl.addEventListener('pointermove',e=>{if(e.pointerId!==pointer||state!=='grind')return;const p=point(e);if(!inside(p)){last=null;return;}pestle.style.transform=`translate(${p.x*150}px,${p.y*120}px) rotate(${p.x*24}deg)`;if(last){const dist=Math.hypot(p.x-last.x,p.y-last.y);advance(Math.min(dist,.08)*13);}last=p;});
function release(){pointer=null;last=null;}bowl.addEventListener('pointerup',release);bowl.addEventListener('pointercancel',release);bowl.addEventListener('lostpointercapture',release);
bowl.addEventListener('keydown',e=>{if((e.code==='Space'||e.code==='Enter')&&state==='grind'){e.preventDefault();advance(5);}});
$('#grind').addEventListener('click',()=>{advance(8);pestle.style.transform=`rotate(${Math.sin(rotation)*8}deg)`;});
$('#pour').addEventListener('click',()=>{if(state!=='ready')return;state='done';bowl.classList.add('finished');powder.style.opacity=0;$('#pour').hidden=true;$('#progress-label').textContent='共下食茶 · 慢慢享受';words('完成 ／ 留一點暖，給自己','這碗茶，有你的用心。','停一下，讓茶香陪你。謝謝你一起完成這段小小的時光。','茶沖好了！想再體驗一次，可以按「再擂一碗」。');$('#reset').textContent='再擂一碗 ↺';$('#bird-note').innerHTML='辛苦了！<br>共下食茶。';});
$('#reset').addEventListener('click',()=>{quantities={leaves:0,sesame:0,peanuts:0};updateRecipe();$('#start').hidden=false;progress=0;state='select';release();rotation=0;bowl.classList.remove('grinding','finished');mixture.style.opacity=1;mixture.style.transform='';powder.style.opacity=0;pestle.style.transform='';document.querySelectorAll('[data-layer]').forEach(el=>{el.classList.remove('added');el.style.scale='';});document.querySelectorAll('[data-ingredient]').forEach(el=>{el.disabled=false;el.querySelector('b').textContent='＋';});$('#fill').style.width='0%';$('#grind').hidden=true;$('#pour').hidden=true;$('#bowl-note').hidden=false;$('#reset').textContent='重新開始 ↺';$('#progress-label').textContent='等待香氣入碗';$('#bird-note').innerHTML='我也在這裡，<br>陪你慢慢來。';step(0);words('01 ／ 把香氣放進碗裡','調一碗自己的滋味。','材料可以重複添加，自由搭配份量；選好後，再開始研磨。','不趕時間，也沒有分數。跟著自己的節奏就好。');});

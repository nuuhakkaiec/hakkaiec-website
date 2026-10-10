'use strict';
const $=id=>document.getElementById(id), food=$('food'), pic=$('food-img'), scene=$('scene');
const steps=[
['01 ／ 草香與糯米','先加一點艾草。','點一下艾草，讓草香落進白麵糰。','加入艾草'],
['02 ／ 揉進艾草','揉一揉，慢慢變綠。','按住麵糰來回揉，也可以輕點揉壓。','揉一下'],
['03 ／ 壓出粿皮','壓一壓，留一個小窩。','點壓麵糰，讓它慢慢攤開。','壓一下'],
['04 ／ 包住好滋味','把餡料放進來。','餡料可以一直加，第五份起會撐破粿皮！','包起來'],
['05 ／ 捏合封口','往中間，捏一捏。','從粿皮邊緣往中央拖，把餡料包住。','捏一下'],
['06 ／ 準備入籠','送進蒸籠裡。','把草仔粿往蒸籠中央拖，或點一下放入。','放入蒸籠'],
['07 ／ 留住草香','蓋上蓋子，蒸一蒸。','點擊竹蓋，讓草仔粿暖暖地蒸熟。','蓋上蒸籠'],
['08 ／ 香氣慢慢升起','蒸氣冒出來了。','再等一小會兒，草香就要出籠。','蒸煮中…'],
['09 ／ 熟囉','掀開蓋子，收下香氣。','向上拖開竹蓋，或點一下掀蓋。','掀蓋出籠'],
['10 ／ 軟 Q 出籠','你的草仔粿，做好了！','再戳一下，讓大大的草仔粿彈起來。','戳戳草仔粿']
];
let step=0,n=0,fill=0,timer,gestureTimer,pointer=null,bigStart=0,bigAnim;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function image(name){pic.src='herb-experience-'+name+'.png';pic.alt=({white:'白色糯米糰',green:'揉好的艾草麵糰',wrapper:'壓平的綠色粿皮',half:'包到一半的草仔粿',sealed:'包好的草仔粿',served:'蒸熟的草仔粿'})[name]||'草仔粿';}
function jiggle(el=food,amount=1){if(reduced.matches)return;el.animate([{transform:'scale(1,1)'},{transform:'scale('+ (1+.12*amount)+','+(1-.12*amount)+') rotate(-3deg)'},{transform:'scale(.96,1.04) rotate(2deg)'},{transform:'none'}],{duration:380});}
function render(){
const s=steps[step];$('step').textContent=s[0];$('heading').textContent=s[1];$('hint').textContent=s[2];$('action').textContent=s[3];$('action').disabled=step===7;
$('progress').style.width=(step/9*100)+'%';$('caption').textContent=step<7?'一點一點，親手做出柔軟。':step===7?'蒸氣裡，藏著一口草香。':'草仔粿出籠囉！';
$('ingredient').classList.toggle('hidden',step!==0&&step!==3);$('ingredient').querySelector('img').src='herb-experience-'+(step===3?'filling':'herbs')+'.png';$('ingredient').querySelector('span').textContent=step===3?'蘿蔔絲餡 ＋':'加入艾草 ＋';$('ingredient').setAttribute('aria-label',step===3?'加入蘿蔔絲餡':'加入艾草');
food.setAttribute('aria-label',step===4?'從邊緣向中央捏合粿皮':step===5?'放入蒸籠':step===9?'查看大草仔粿':'揉壓麵糰');
food.disabled=step===6||step===7||step===8;$('lid').setAttribute('aria-label',step===8?'掀開蒸籠':'蓋上蒸籠');
}
function go(s){step=s;n=0;render();if(s===1||s===4){$('gesture').classList.remove('show');void $('gesture').offsetWidth;$('gesture').classList.add('show');}}
function add(){if(step===0){$('status').textContent='艾草加好了，來揉一揉。';go(1);}else if(step===3){fill++;$('filling-overlay').style.opacity=1;$('filling-overlay').style.transform='scale('+(0.65+Math.min(fill,5)*.16)+')';$('status').textContent='已加入 '+fill+' 份餡料';jiggle();if(fill>=5){image('burst');$('filling-overlay').style.opacity=0;$('status').textContent='哎呀，爆餡了！已加 '+fill+' 份，還可以繼續加。';$('action').textContent='換張粿皮，再包一次';jiggle(food,1.8);}}}
function act(){
if(step===0)return add();
if(step===1){n++;$('green-overlay').style.opacity=Math.min(1,n/10);jiggle();$('status').textContent='揉進艾草 '+Math.min(10,n)+' / 10';if(n>=10){image('green');$('green-overlay').style.opacity=0;go(2);}return;}
if(step===2){n++;jiggle();food.style.scale=(1+n*.035)+' '+(1-n*.035);if(n>=5){food.style.scale='';image('wrapper');go(3);$('status').textContent='粿皮好了，放進喜歡的餡料。';}return;}
if(step===3){if(fill>=5){fill=0;image('wrapper');$('filling-overlay').style.opacity=0;render();$('status').textContent='新粿皮準備好了！';return;}if(!fill){$('status').textContent='先放一份餡料，再包起來。';return;}go(4);return;}
if(step===4){n++;jiggle();if(n>=2){$('filling-overlay').style.opacity=0;image('half');}if(n>=5){image('sealed');scene.classList.add('in-basket');$('basket').classList.remove('hidden');go(5);$('status').textContent='封口完成！';}return;}
if(step===5){scene.classList.add('in-basket');$('lid').classList.remove('hidden');$('lid').classList.add('ready');go(6);return;}
if(step===6){$('lid').classList.remove('ready');scene.classList.add('steaming');go(7);$('status').textContent='草仔粿正在蒸煮…';timer=setTimeout(()=>{image('served');go(8);$('status').textContent='熟囉！掀開蓋子吧。';},4000);return;}
if(step===8){$('lid').classList.add('open');go(9);timer=setTimeout(showFinish,750);return;}
if(step===9)showFinish();
}
let flightFrame=0,lastTime=0,fx=0,fy=0,vx=260,vy=-210,held=false;
function stopFlight(){cancelAnimationFrame(flightFrame);flightFrame=0;lastTime=0;held=false;}
function fly(t){
 if(!$('finish').open){stopFlight();return;}
 const dt=Math.min(.035,(t-(lastTime||t))/1000);lastTime=t;
 const area=$('flight'),maxX=Math.max(0,area.clientWidth-$('big').offsetWidth),maxY=Math.max(0,area.clientHeight-$('big').offsetHeight);
 if(!held){fx+=vx*dt;fy+=vy*dt;
 if(fx<0||fx>maxX){fx=Math.max(0,Math.min(maxX,fx));vx=-vx;jiggle($('big').querySelector('img'));}
 if(fy<0||fy>maxY){fy=Math.max(0,Math.min(maxY,fy));vy=-vy;jiggle($('big').querySelector('img'));}
 }else{fx=Math.min(maxX,fx);fy=Math.min(maxY,fy);}
 $('big').style.transform='translate('+fx+'px,'+fy+'px)';
 flightFrame=requestAnimationFrame(fly);
}
function showFinish(){scene.classList.remove('steaming');if(!$('finish').open)$('finish').showModal();stopFlight();fx=20;fy=20;vx=260;vy=210;if(!reduced.matches)flightFrame=requestAnimationFrame(fly);}
function bounce(power){held=false;vx=(vx<0?-1:1)*(260+power*180);vy=(vy<0?-1:1)*(210+power*130);jiggle($('big').querySelector('img'),1.5);}
function reset(){stopFlight();clearTimeout(timer);pointer=null;step=0;n=0;fill=0;image('white');food.style.scale='';$('green-overlay').style.opacity=0;$('filling-overlay').style.opacity=0;$('basket').classList.add('hidden');$('lid').className='hidden';scene.className='';$('status').textContent='';$('gesture').classList.remove('show');if($('finish').open)$('finish').close();if(bigAnim)bigAnim.cancel();render();}
$('action').onclick=act;$('ingredient').onclick=add;$('reset').onclick=reset;$('again').onclick=reset;$('back').onclick=()=>$('finish').close();
food.onpointerdown=e=>{if(food.disabled)return;food.setPointerCapture(e.pointerId);pointer={x:e.clientX,y:e.clientY,lastX:e.clientX,lastY:e.clientY,d:0,step};};
food.onpointermove=e=>{if(!pointer)return;const d=Math.hypot(e.clientX-pointer.lastX,e.clientY-pointer.lastY);pointer.d+=d;pointer.lastX=e.clientX;pointer.lastY=e.clientY;if(step===1&&pointer.step===1&&pointer.d>24){pointer.d=0;act();}};
food.onpointerup=e=>{if(!pointer)return;const p=pointer;pointer=null;if(step!==p.step)return;if(step===4){const r=food.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const inward=Math.hypot(p.x-cx,p.y-cy)-Math.hypot(e.clientX-cx,e.clientY-cy);if(inward>12||Math.hypot(e.clientX-p.x,e.clientY-p.y)<10)act();else $('status').textContent='從外側往中央捏，就能把餡包住。';}else act();};
food.onpointercancel=()=>{pointer=null;};food.onclick=e=>{if(e.detail===0)act();};
let lidY=null;$('lid').onpointerdown=e=>{lidY=e.clientY;$('lid').setPointerCapture(e.pointerId);};$('lid').onpointerup=e=>{if(step===6||step===8){act();}lidY=null;};$('lid').onclick=e=>{if(e.detail===0)act();};
$('finish').addEventListener('close',stopFlight);
$('big').onpointerdown=e=>{held=true;bigStart=performance.now();$('big').setPointerCapture(e.pointerId);jiggle($('big').querySelector('img'));};
$('big').onpointerup=()=>bounce(Math.min(1.6,(performance.now()-bigStart)/700+.3));$('big').onpointercancel=()=>bounce(.3);$('big').onclick=e=>{if(e.detail===0)bounce(.8);};
reset();

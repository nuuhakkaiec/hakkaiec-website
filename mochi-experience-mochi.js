const $=s=>document.querySelector(s),button=$('#pound'),mallet=$('#mallet'),dough=$('#dough'),page=$('#page');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
let amount=0,holding=false,started=0,frame=0,busy=false,timer=0,pointer=null,animations=[];
let celebrated=false;
function animate(el,keys,options){const a=el.animate(keys,options);animations.push(a);a.onfinish=()=>{animations=animations.filter(x=>x!==a)};return a;}
function charge(){if(!holding)return;const power=Math.min((performance.now()-started)/1200,1);$('#charge').style.width=power*100+'%';if(!reduced.matches)mallet.style.transform=`translateY(${-power*45}px) rotate(${power*16}deg)`;frame=requestAnimationFrame(charge);}
function begin(){if(holding||busy)return;holding=true;started=performance.now();charge();}
function cancel(){holding=false;pointer=null;cancelAnimationFrame(frame);mallet.style.transform='';$('#charge').style.width='0%';}
function release(){if(!holding)return;const power=Math.min((performance.now()-started)/1200,1);cancel();hit(power);}
function hit(power=0){if(busy)return;busy=true;const lift=power*45;
 if(!reduced.matches)animate(mallet,[{transform:`translateY(${-lift}px) rotate(${power*16}deg)`},{transform:'translateY(70px) rotate(-13deg)',offset:.34},{transform:'translateY(0) rotate(0deg)'}],{duration:520,easing:'cubic-bezier(.4,0,.4,1)'});
 timer=setTimeout(()=>{amount=Math.min(100,amount+6+power*7);render();
 const strength=reduced.matches?0:(5+power*9);
 if(strength)animate(page,[{transform:'translate(0,0)'},{transform:`translate(${-strength}px,${strength*.7}px) rotate(-.3deg)`},{transform:`translate(${strength}px,${-strength*.6}px) rotate(.25deg)`},{transform:`translate(${-strength*.5}px,${strength*.3}px)`},{transform:`translate(${strength*.2}px,0)`},{transform:'translate(0,0)'}],{duration:360,easing:'ease-out'});
 if(!reduced.matches){animate(dough,[{transform:'scale(1)'},{transform:`scale(${1.16+power*.08},.70)`,offset:.22},{transform:'scale(.94,1.08)',offset:.6},{transform:'scale(1)'}],{duration:450});animate($('#impact'),[{opacity:0,transform:'scale(.6)'},{opacity:1,transform:'scale(1)',offset:.2},{opacity:0,transform:'translateY(-20px) scale(1.15)'}],{duration:500});}
 timer=setTimeout(()=>{busy=false;if(amount===100&&!celebrated){celebrated=true;$('#finish').showModal();}},400);
 },reduced.matches?0:175);}
function render(){const p=amount/100;$('#progress').style.width=amount+'%';$('#rice').style.opacity=Math.max(0,1-p*2.5);$('#half').style.opacity=p<.5?Math.min(1,p*2.5):Math.max(0,(1-p)*2);$('#smooth').style.opacity=Math.max(0,(p-.45)/.55);
 const done=amount===100,mid=amount>=40;$('#step').textContent=done?'03 ／ 軟糯，剛剛好':mid?'02 ／ 慢慢黏在一起':'01 ／ 米粒，準備好了';$('#heading').textContent=done?'這份柔軟，是你搗出來的。':mid?'越搗，越有默契。':'來，先搗一下。';$('#status').textContent=done?'粢粑完成了！可以繼續搗著玩，或再做一份。':mid?'米粒漸漸融合，粢粑開始變柔軟了。':'一下一下，糯米慢慢成形。';$('#hint').innerHTML=done?'留一點柔軟，給今天的自己。<br>想再體驗一次，就點「再捶一份」。':'輕點木臼就能搗一下。<br>按住蓄力，再放開，感受紮實的一搗。';$('#reset').textContent=done?'再捶一份 ↺':'重新開始 ↺';}
button.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'&&e.button!==0)return;if(busy||holding)return;e.preventDefault();pointer=e.pointerId;button.setPointerCapture(pointer);begin();});
button.addEventListener('pointerup',e=>{if(e.pointerId===pointer)release();});button.addEventListener('pointercancel',cancel);button.addEventListener('lostpointercapture',()=>{if(holding)cancel();});
button.addEventListener('keydown',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();if(!e.repeat)begin();}});button.addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='Enter'){e.preventDefault();release();}});button.addEventListener('click',e=>{if(e.detail===0&&!busy&&!holding)hit();});
window.addEventListener('blur',cancel);button.addEventListener('blur',cancel);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
$('#reset').addEventListener('click',()=>{cancel();clearTimeout(timer);animations.forEach(a=>a.cancel());animations=[];busy=false;amount=0;celebrated=false;if($('#finish').open)$('#finish').close();render();$('#status').textContent='木臼裡的糯米，等你開動。';});

$('#again').addEventListener('click',()=>{$('#reset').click();button.focus();});
$('#close-finish').addEventListener('click',()=>{$('#finish').close();button.focus();});

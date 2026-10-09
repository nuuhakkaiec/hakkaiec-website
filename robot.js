(() => {
  const area=document.querySelector('.hero-art');
  area.classList.add('robot-stage');area.removeAttribute('aria-hidden');
  area.replaceChildren();
  const button=document.createElement('button');button.className='robot-button';button.type='button';button.setAttribute('aria-label','和機器人打招呼，讓她揮手');
  button.innerHTML=window.CLUB_ART.robot;
  const svg=button.querySelector('svg');svg.setAttribute('aria-hidden','true');
  const kiwi=svg.querySelector('#kiwi-companion');
  if(kiwi){
    kiwi.setAttribute('aria-label','戴領帶的奇異鳥社長');
    kiwi.innerHTML='<defs><clipPath id="kiwi-photo-clip"><ellipse cx="528" cy="493" rx="84" ry="96"/></clipPath></defs><ellipse cx="528" cy="589" rx="62" ry="7" fill="#82704e" opacity=".12"/><g class="kiwi-peek"><image href="assets/kiwi-transparent.png" x="400" y="326" width="270" height="270" preserveAspectRatio="xMidYMid meet"/></g>';
  }
  const bubble=document.createElement('p');bubble.className='robot-speech';bubble.setAttribute('role','status');bubble.setAttribute('aria-live','polite');
  area.append(button,bubble);
  let timer;let count=0;const greetings=['嗨！一起讓好點子發芽吧！','創意、創新、創業，一起出發！','歡迎來到客家創新創業社！'];
  function greet(){
    if(button.classList.contains('is-waving'))return;
    bubble.textContent=greetings[count++%greetings.length];bubble.classList.add('is-speaking');button.classList.add('is-waving');
    clearTimeout(timer);timer=setTimeout(()=>{button.classList.remove('is-waving');bubble.classList.remove('is-speaking');},2600);
  }
  button.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse'||event.pointerType==='pen')greet();});
  button.addEventListener('focus',greet);
  button.addEventListener('click',greet);
})();

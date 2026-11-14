const url=(id:string)=>'photos/'+id+'.webp';
function Gallery({event}) {
 return <div className="photos">{event.photos.map(([id, alt]) => (
   <figure key={id}><img src={url(id)} alt={alt} loading="lazy"/></figure>
 ))}</div>
}
function PhotoEssay({event}) {
 const featured = event.photos.slice(0, 4);
 const remaining = event.photos.slice(4);
 return <article className="photo-essay">
   <div className="essay-board">
     <div className="essay-copy"><small>{event.status}</small><h4>{event.name}</h4>
       <p>{event.steps.map(([,description]) => description).join('')}</p>
     </div>
     {featured.map(([id,caption],i) => <figure className={'essay-photo essay-photo-'+(i+1)} key={id}>
       <img src={url(id)} alt={caption} loading="lazy"/>
     </figure>)}
   </div>
   {remaining.length > 0 && <div className="essay-roll" tabIndex={0} role="region" aria-label={event.name+'照片'}>
     {remaining.map(([id,caption]) => <figure key={id}><img loading="lazy" src={url(id)} alt={caption}/></figure>)}
   </div>}
 </article>
}
function Catalog(){
 const [group,change]=React.useState(food);
 return <><div className="filters flex flex-wrap">{[food,ai,local].map(g=><button key={g} aria-pressed={group===g} onClick={()=>change(g)}>{g}</button>)}</div>{activities.filter(e=>e.category===group).map(e=>e.category===food || e.category===local ? <PhotoEssay key={e.id} event={e}/> : <article key={e.id}><div><small>{e.status}</small><h4>{e.name}</h4>{e.category === ai ? <ol className="course-steps">{e.steps.map(([label, description], index) => (
 <li key={label}><span className="step-number">{String(index + 1).padStart(2, '0')}</span><strong>{label}</strong><span>{description}</span></li>
))}</ol> : <p>{e.steps.map(([,description]) => description).join('')}</p>}{e.links?.map(href => <a className="pill" key={href} href={href}>課程成果總攬 ↗</a>)}</div>{e.photos.length?<Gallery event={e}/>:null}</article>)}</>
}
ReactDOM.createRoot(document.querySelector('#catalog')).render(<Catalog/>);
function Impact(){return <div className="stats">{metrics.map(([n,u,l])=><div key={l}><b><span data-number={n}>{n}</span><small>{u}</small></b><p>{l}</p></div>)}</div>}
ReactDOM.createRoot(document.querySelector('#numbers')).render(<Impact/>);
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
 gsap.from('.hero-copy > *',{y:16,opacity:0,duration:.55,stagger:.08});
 const hero=document.querySelector('.hero');window.addEventListener('scroll',()=>{if(scrollY<hero.clientHeight)gsap.set('.blob',{y:scrollY*.1})},{passive:true});
 const observer=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(!isIntersecting)return;observer.unobserve(target);gsap.from(target,{y:12,duration:.55});if(target.id==='impact')target.querySelectorAll('[data-number]').forEach(el=>{const n=Number(el.dataset.number),counter={n:0};gsap.to(counter,{n,duration:1,onUpdate(){el.textContent=counter.n.toFixed((String(n).split('.')[1]||'').length)}})})}));
 document.querySelectorAll('#about,#works,#impact,footer').forEach(el=>observer.observe(el));
}


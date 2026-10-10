// Convex polygon splitting keeps each cut aligned with the user's stroke.
function polygonArea(p){return Math.abs(p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a.x*b.y-b.x*a.y},0)/2)}
function splitPolygon(poly,a,b){const side=p=>(b.x-a.x)*(p.y-a.y)-(b.y-a.y)*(p.x-a.x);const halves=[[],[]];for(let i=0;i<poly.length;i++){const p=poly[i],q=poly[(i+1)%poly.length],d=side(p),e=side(q);if(d>=-1e-8)halves[0].push(p);if(d<=1e-8)halves[1].push(p);if(d*e<0){const t=d/(d-e),cross={x:p.x+t*(q.x-p.x),y:p.y+t*(q.y-p.y)};halves[0].push(cross);halves[1].push(cross)}}return halves.every(p=>p.length>=3&&polygonArea(p)>18)?halves:[poly]}
if(typeof module!=='undefined')module.exports={splitPolygon,polygonArea};

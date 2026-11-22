/* An illustrative surface, not a visualization of experimental results. */
(() => {
  const canvas = document.getElementById('landscape');
  const wrap = document.getElementById('landscape-wrap');
  if (!canvas || !wrap) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let width=500, height=440, angle=-.53, targetAngle=-.53, tilt=.96;
  let dragging=false, previousX=0, visible=true, lastFrame=0, frame=0;
  const divisions=37, extent=2.45, surface=[];
  const value=(x,z) => 1.8*Math.exp(-((x+.6)**2/.75+(z+.3)**2/1.65)) + 1.48*Math.exp(-((x-1.02)**2/1.05+(z-.85)**2/.7)) - .65*Math.exp(-((x-.3)**2/.55+(z+.5)**2/.8)) + .17*Math.sin(x*2.2+z*1.8);
  for(let j=0;j<=divisions;j++) {
    surface[j]=[];
    for(let i=0;i<=divisions;i++) {
      const x=(i/divisions*2-1)*extent,z=(j/divisions*2-1)*extent;
      surface[j][i]={x,z,y:value(x,z)};
    }
  }
  function resize() {
    const rect=wrap.getBoundingClientRect();
    width=rect.width;height=rect.height;
    const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    draw(0);
  }
  function project(p) {
    const x=p.x*Math.cos(angle)-p.z*Math.sin(angle);
    const z=p.x*Math.sin(angle)+p.z*Math.cos(angle);
    const scale=width/7.25;
    return {x:width*.5+x*scale,y:height*.61+z*scale*.48-p.y*scale*tilt,depth:z};
  }
  function draw(time) {
    ctx.clearRect(0,0,width,height);
    const dark=document.documentElement.dataset.theme==='dark';
    const points=surface.map(row=>row.map(project));
    const shadow=ctx.createRadialGradient(width*.5,height*.72,0,width*.5,height*.72,width*.4);
    shadow.addColorStop(0,dark?'rgba(14,26,59,.4)':'rgba(70,101,172,.11)');shadow.addColorStop(1,'rgba(70,101,172,0)');
    ctx.save();ctx.translate(0,height*.17);ctx.scale(1,.36);ctx.fillStyle=shadow;ctx.fillRect(0,0,width,height*2);ctx.restore();
    const cells=[];
    for(let j=0;j<divisions;j++) for(let i=0;i<divisions;i++) {
      const a=points[j][i],b=points[j][i+1],c=points[j+1][i+1],d=points[j+1][i];
      cells.push({p:[a,b,c,d],depth:(a.depth+b.depth+c.depth+d.depth)/4,h:(surface[j][i].y+surface[j+1][i+1].y)/2});
    }
    cells.sort((a,b)=>a.depth-b.depth);
    cells.forEach(cell=>{
      const light=Math.max(37,Math.min(74,57+cell.h*8-cell.depth*3));
      ctx.beginPath();cell.p.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
      ctx.fillStyle=`hsla(${224+cell.h*3},${dark?73:86}%,${dark?light-8:light}%,${dark?.77:.8})`;ctx.fill();
      ctx.strokeStyle=dark?'rgba(165,191,255,.35)':'rgba(202,217,255,.67)';ctx.lineWidth=.55;ctx.stroke();
    });
    const t=reducedMotion.matches?.32:(time/18000)%1;
    const x=-1.6+t*3.2,z=.18+Math.sin(t*Math.PI*2)*.62;
    const point=project({x,z,y:value(x,z)+.045});
    ctx.beginPath();ctx.arc(point.x,point.y,7,0,Math.PI*2);ctx.fillStyle=dark?'rgba(255,225,172,.2)':'rgba(249,185,81,.23)';ctx.fill();
    ctx.beginPath();ctx.arc(point.x,point.y,3.4,0,Math.PI*2);ctx.fillStyle='#f8cf81';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=1.3;ctx.stroke();
  }
  function tick(time) {
    if(visible&&time-lastFrame>40){lastFrame=time;angle+=(targetAngle-angle)*.035;draw(time);}
    if(!reducedMotion.matches) frame=requestAnimationFrame(tick);
  }
  canvas.addEventListener('pointerdown',e=>{dragging=true;previousX=e.clientX;canvas.classList.add('dragging');canvas.setPointerCapture(e.pointerId);});
  canvas.addEventListener('pointermove',e=>{if(!dragging)return;targetAngle+=(e.clientX-previousX)*.008;previousX=e.clientX;if(reducedMotion.matches){angle=targetAngle;draw(0);}});
  const stop=()=>{dragging=false;canvas.classList.remove('dragging');};
  canvas.addEventListener('pointerup',stop);canvas.addEventListener('pointercancel',stop);canvas.addEventListener('lostpointercapture',stop);
  document.getElementById('rotate-landscape').addEventListener('click',()=>{targetAngle+=Math.PI/4;if(reducedMotion.matches){angle=targetAngle;draw(0);}});
  new ResizeObserver(resize).observe(wrap);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{rootMargin:'100px'}).observe(wrap);
  new MutationObserver(()=>draw(performance.now())).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
  reducedMotion.addEventListener('change',()=>{cancelAnimationFrame(frame);if(reducedMotion.matches)draw(0);else frame=requestAnimationFrame(tick);});
  resize();if(!reducedMotion.matches)frame=requestAnimationFrame(tick);
  wrap.dataset.active='true';
})();

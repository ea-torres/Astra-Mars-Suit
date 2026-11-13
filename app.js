// Lógica de CURIOSITY EVA. Los datos se editan en config.js
const $=id=>document.getElementById(id),cv=$("c"),cx=cv.getContext("2d"),st=$("stage");
const RM=matchMedia("(prefers-reduced-motion:reduce)").matches;
let W=0,H=0,hd=SCENE.heading,ar=true,key="nominal",sc=SCEN.nominal,gs=-1,dl=0,tdl=0,sp=0,tsp=0,tm=[],on={},raf=0,T=0,done=false;
const R=Array.from({length:SCENE.rocks},(_,i)=>({b:(i*137.5)%360,z:((i*47)%100)/100})).sort((a,b)=>a.z-b.z);
const P=Array.from({length:110},(_,i)=>({x:((i*97)%1000)/1000,y:((i*53)%1000)/1000,s:.5+((i*29)%10)/10}));
const SP=Array.from({length:70},(_,i)=>({x:((i*131)%100)/100,y:((i*71)%100)/100,r:1+(i%4)}));
const tr=(d,f,s)=>Math.sin(d*f+s)+.5*Math.sin(d*f*2.3+s*1.7)+.25*Math.sin(d*f*5.1+s*3.1);
const dx=b=>((b-hd)%360+540)%360-180;

function ridge(c,a,f,par,s,off){const p=W/90;cx.beginPath();cx.moveTo(0,H);for(let x=0;x<=W+4;x+=4){const d=(hd+(x-W/2)/p)*par;cx.lineTo(x,H*.5+off-a*H*(1+tr(d,f,s))/2.75)}cx.lineTo(W,H);cx.closePath();cx.fillStyle=c;cx.fill()}
function draw(){
  const hz=H*.5,p=W/90;
  let g=cx.createLinearGradient(0,0,0,hz);g.addColorStop(0,SCENE.sky[0]);g.addColorStop(.6,SCENE.sky[1]);g.addColorStop(1,SCENE.sky[2]);
  cx.fillStyle=g;cx.fillRect(0,0,W,H);
  const sx=dx(SCENE.sun)*p+W/2,sy=hz*.5,sg=cx.createRadialGradient(sx,sy,0,sx,sy,W*.3);
  sg.addColorStop(0,"rgba(255,248,236,1)");sg.addColorStop(.04,"rgba(255,236,210,.7)");sg.addColorStop(1,"rgba(255,222,185,0)");
  cx.fillStyle=sg;cx.fillRect(0,0,W,hz);
  SCENE.ridges.forEach(r=>ridge(r[0],r[1],r[2],r[3],r[4],r[5]*H));
  g=cx.createLinearGradient(0,hz+H*.06,0,H);g.addColorStop(0,SCENE.ground[0]);g.addColorStop(1,SCENE.ground[1]);
  cx.fillStyle=g;cx.fillRect(0,hz+H*.06,W,H);
  g=cx.createLinearGradient(0,hz-H*.04,0,hz+H*.16);g.addColorStop(0,"rgba(236,191,143,0)");g.addColorStop(.35,"rgba(236,191,143,.4)");g.addColorStop(1,"rgba(236,191,143,0)");
  cx.fillStyle=g;cx.fillRect(0,hz-H*.04,W,H*.2);
  R.forEach(r=>{const o=dx(r.b);if(Math.abs(o)>52)return;
    const x=W/2+o*p,y=hz+H*.08+(H*.5-H*.08)*Math.pow(r.z,1.5),s=3+r.z*r.z*H*.09;
    cx.fillStyle=SCENE.rock[0];cx.beginPath();cx.ellipse(x,y,s*1.3,s*.6,0,0,7);cx.fill();
    cx.fillStyle=SCENE.rock[1];cx.beginPath();cx.ellipse(x-s*.2,y-s*.18,s*.9,s*.35,0,0,7);cx.fill()});
  if(dl>.01){
    const fx=dx(70)*p+W/2,g2=cx.createRadialGradient(fx,hz,0,fx,hz,W*.55);
    g2.addColorStop(0,`rgba(105,52,28,${.8*dl})`);g2.addColorStop(1,"rgba(105,52,28,0)");cx.fillStyle=g2;cx.fillRect(0,0,W,H);
    cx.fillStyle=`rgba(190,110,65,${.34*dl})`;cx.fillRect(0,0,W,H);
    cx.strokeStyle=`rgba(245,205,165,${.5*dl})`;cx.lineWidth=1.2;cx.beginPath();
    P.forEach(q=>{const x=(q.x*W+T*140*q.s)%W,y=q.y*H;cx.moveTo(x,y);cx.lineTo(x-22*q.s,y+4)});cx.stroke();
  }
  if(sp>.01){cx.fillStyle=`rgba(150,85,50,${.75*sp})`;SP.forEach(s=>{cx.beginPath();cx.ellipse(s.x*W,s.y*H,s.r*1.6,s.r,0,0,7);cx.fill()})}
}
function upd(){
  draw();const p=W/90;let h="";
  for(let d=0;d<360;d+=15){const o=dx(d);if(Math.abs(o)<46){const c=d%90===0?"NESW"[d/90]:d%45===0?["NE","SE","SW","NW"][(d-45)/90]:"|";h+=`<span style="left:${W/2+o*p}px">${c}</span>`}}
  $("tape").innerHTML=h;$("hdg").textContent=String(Math.round((hd%360+360)%360)).padStart(3,"0")+"°";
  M.forEach(m=>{if(!m.e){m.e=document.createElement("div");m.e.className="mk "+m.k;m.e.innerHTML=`<span class="lb">${m.n}</span><i></i>`;$("ar").appendChild(m.e)}
    const o=dx(m.b);if(!ar||m.s!==key||done||Math.abs(o)>46){m.e.style.display="none";return}
    m.e.style.display="";m.e.style.left=(W/2+o*p)+"px";m.e.style.top=(H*.62)+"px"});
}
function loop(t){T=RM?0:t/1000;dl+=(tdl-dl)*.03;sp+=(tsp-sp)*.04;
  if(tdl>.01||Math.abs(tdl-dl)>.004||Math.abs(tsp-sp)>.004){draw();raf=requestAnimationFrame(loop)}else{dl=tdl;sp=tsp;raf=0;draw()}}
function kick(){if(!raf)raf=requestAnimationFrame(loop)}
function size(){const r=st.getBoundingClientRect(),q=Math.min(devicePixelRatio||1,1.5);W=r.width;H=r.height;cv.width=W*q;cv.height=H*q;cx.setTransform(q,0,0,q,0,0);upd()}
let drag=false;
st.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;drag=true;st.setPointerCapture(e.pointerId)});
st.addEventListener("pointerup",()=>drag=false);
st.addEventListener("pointermove",e=>{if(!drag)return;hd=(hd-e.movementX/(W/90)*.9+360)%360;upd()});
st.addEventListener("keydown",e=>{if(e.key==="ArrowLeft"){hd=(hd-5+360)%360;upd()}if(e.key==="ArrowRight"){hd=(hd+5)%360;upd()}});
addEventListener("resize",size);

// ---------- Alex’s patch: simulated readings, rules and states ----------
const hm=m=>Math.floor(m/60)+":"+String(m%60).padStart(2,"0");
const run=(a,f)=>{let n=0;for(let i=a.length-1;i>=0&&f(a[i]);i--)n++;return n};
let base={...SCEN.nominal.v},rd={...base,bad:false},LB=[],HB=[],gA=false,lA=false,hA=false,pG=false,pL=false,pH=false,dec=null,cr={on:false,ph:0,left:0},feed=[],t2=[];
const later=(ms,f)=>t2.push(setTimeout(f,ms));
function log(x){feed.unshift("T+"+hm(+$("t").value)+" · "+x);feed=feed.slice(0,8)}

function tick(){
  const bad=Math.random()<ST.invalid;rd.bad=bad;
  if(dec&&base.glu<RC.target)base.glu=Math.min(RC.target,base.glu+RC[dec]);
  if(!bad){
    const j=k=>(Math.random()*2-1)*ST.noise[k];
    rd.glu=Math.round(base.glu+j("glu"));rd.lac=+(base.lac+j("lac")).toFixed(1);rd.h2o2=Math.round(base.h2o2+j("h2o2"));
    LB.push(rd.lac);HB.push(rd.h2o2);if(LB.length>RULES.need)LB.shift();if(HB.length>RULES.need)HB.shift();
    gA=rd.glu<RULES.glu;
  }
  lA=run(LB,x=>x>RULES.lacHi)>=RULES.need;hA=run(HB,x=>x>RULES.h2Hi)>=RULES.need;
  if(gA&&!pG)log("Low glucose warning · shared with the habitat, awaiting human review");
  if(lA&&!pL)log("Lactate above Alex’s 2–5 mmol/L range in one reading · shared with the habitat");
  if(hA&&!pH)log("Unusual activity: H₂O₂ index above 150 in one reading (experimental index) · shared with the habitat");
  pG=gA;pL=lA;pH=hA;
  drawVit();renderAI();
}
function drawVit(){
  const def=[["glu",gA],["lac",lA],["h2o2",hA]];
  $("vit").innerHTML=`<small style="color:#8fd3c9">Alex · skin patch, 3 analytes</small>`
    +def.map(([k,al])=>{const l=LABELS[k];return `<div class="fr ${al?"c":""}"><span>${l[0]}<small>${l[2]}</small></span><b>${rd[k]} <small style="display:inline">${l[1]}</small></b></div>`}).join("")
    +`<small style="color:#8fd3c9">${rd.bad?"Reading unavailable":"Sensor status: active"}</small>`;
}
function mode(){return key==="dust"?"dust":cr.on?"crit":gA?"gluc":dec&&!gA?"rec":(lA||hA)?"info":"ok"}
function renderAI(){
  const al=$("al"),m=gs>=0?"guide":mode();let c="",h="";
  if(m==="guide"){const G=GUIDES[sc.guide],q=G.steps[gs];$("hbase").innerHTML=G.base;$("hov").innerHTML=q[2];$("holo").classList.add("on");
    c="crit";h=`<h3>Step ${gs+1} of ${G.steps.length} · ${q[0]}</h3><p>${q[1]}</p><div class="acts"><button data-a="next">${gs===G.steps.length-1?"Finish guide":"Next step"}</button></div>`}
  else if(m==="dust"){c=done?"":"warn";h=done?`<h3>${GUIDES.dust.doneTitle}</h3><p>${GUIDES.dust.doneMsg}</p>`:`<h3>Heavy dust detected</h3><p>A dust front is arriving. HoloConnect AI is protecting the suit automatically. Head back to the airlock.</p><div class="acts"><button data-a="guide">Open decontamination guide</button><button data-a="doc">Call suit engineer</button></div><small id="auto"></small>`}
  else if(m==="crit"){const q=cr.ph;c="crit";
    h=`<h3>${q<4?"Alex may be unresponsive":"Emergency protocol active"}</h3><ul class="ck">${q>=1?"<li>Glucose far below 70 mg/dL</li>":""}${q>=2?"<li>Lactate and H₂O₂ index above range in one reading</li><li>No movement, no voice reply, no haptic response</li>":""}${q>=4?"<li>Epinephrine auto-injected under the pre-authorized protocol</li>":""}${q>=5?"<li>Flight surgeon at the habitat called · readings and log sent</li>":""}</ul>${q===2?"<p>Prompting Alex by voice and haptic cue…</p>":""}${q===3?`<p>Pre-authorized protocol: epinephrine auto-injection in <b id="cd"></b> s unless Alex responds.</p><div class="acts"><button data-a="cancel">Simulate: Alex responds</button></div>`:""}<small>Alerts shared with the habitat for human review.</small>`}
  else if(m==="gluc"){c="warn";const pend=!dec||dec==="decline";
    h=`<h3>${dec==="decline"?"Treatment declined":pend?"Low glucose warning":"Treatment in progress"}</h3><p>${pend?"Glucose is below 70 mg/dL. HoloConnect AI suggests <b>glucagon</b>"+(dec==="decline"?" again. Do you authorize it?"):dec==="glucagon"?"Glucagon delivered. HoloConnect AI is watching your glucose recover.":"Glucose gel authorized. Take it from the feeding port by your chin while HoloConnect AI watches your glucose."}</p>${pend?`<div class="acts"><button data-a="glucagon">Authorize glucagon</button><button data-a="gel">Use glucose gel instead</button><button data-a="decline">Decline</button></div>`:""}<small>Alert shared with the habitat for human review.</small>`}
  else if(m==="rec"){h=`<h3>Glucose recovered</h3><p>Glucose is back in range after ${dec==="gel"?"the glucose gel":"glucagon"}. The habitat team keeps the log for review.</p>`}
  else if(m==="info"){c="warn";h=`<h3>${lA&&hA?"Lactate and H₂O₂ alerts":lA?"Lactate above Alex’s range":"Unusual activity"}</h3><p>${lA?"Lactate stayed above 5 mmol/L (Alex’s usual: 2–5 in moderate work) in one reading. ":""}${hA?"The H₂O₂ index stayed above 150 (usual 120) in one reading. It is an experimental simulation scale, not a concentration or a diagnosis of damage. ":""}Slow down and recheck.</p><div class="acts"><button data-a="doc">Call flight surgeon</button></div><small>Alerts shared with the habitat for human review.</small>`}
  else{h=`<h3>Alex · all readings normal</h3><p>Glucose, lactate and the H₂O₂ index are within Alex’s profile for moderate work. HoloConnect AI continues monitoring the readings.</p>`}
  al.className="pl ai "+c;if(al.dataset.h!==h){al.innerHTML=h;al.dataset.h=h}
  const cd=$("cd");if(cd)cd.textContent=cr.left;renderProt();
}
$("al").addEventListener("click",e=>{
  const b=e.target.closest("button");if(!b)return;const a=b.dataset.a;
  if(a==="glucagon"||a==="gel"){dec=a;log((a==="gel"?"Glucose gel":"Glucagon")+" authorized by Alex");if(a==="glucagon"){showInj("GLUCAGON");later(3500,()=>$("holo").classList.remove("on"))}}
  else if(a==="decline"){dec="decline";log("Alex declined treatment · habitat informed")}
  else if(a==="doc")$("doc").classList.toggle("on");
  else if(a==="guide")gs=0;
  else if(a==="next")return nx();
  else if(a==="cancel")cancelCrit();
  renderAI();
});
function showInj(label){
  $("hbase").innerHTML=`<g fill="none" stroke="#5fe3d0" stroke-width="2" opacity=".8"><circle cx="100" cy="38" r="18"/><path d="M60 150c0-40 18-84 40-84s40 44 40 84"/><path d="M82 150l-6 36M118 150l6 36"/></g>`;
  $("hov").innerHTML=`<circle class="pulse" cx="124" cy="150" r="12" fill="rgba(255,90,90,.3)" stroke="#ff5a5a" stroke-width="2"/><text x="100" y="12" text-anchor="middle" fill="#bff5ec" font-size="11" font-family="Chakra Petch">${label}</text>`;
  $("holo").classList.add("on");
}
function startCrit(){
  later(300,()=>{cr.on=true;cr.ph=1;st.classList.add("faint");renderAI()});
  later(1300,()=>{cr.ph=2;renderAI()});
  later(2300,()=>{cr.ph=3;cr.left=6;renderAI()});
  for(let i=1;i<=6;i++)later(2300+i*1000,()=>{cr.left=6-i;if(i<6)renderAI();else inject()});
}
function inject(){
  cr.ph=4;log("Epinephrine auto-injected under the pre-authorized protocol (no response from Alex)");showInj("EPINEPHRINE");renderAI();
  later(1200,()=>{cr.ph=5;$("doc").classList.add("on");log("Flight surgeon at the habitat called · readings and injection log sent");renderAI()});
}
function cancelCrit(){
  t2.forEach(clearTimeout);t2=[];cr.on=false;st.classList.remove("faint");$("holo").classList.remove("on");log("Alex responded · auto-injection cancelled");later(100,tick);
}
function nx(){
  const G=GUIDES[sc.guide];if(gs<G.steps.length-1){gs++;renderAI();return}
  gs=-1;done=true;$("holo").classList.remove("on");tm.forEach(clearTimeout);on={};tdl=0;tsp=0;kick();upd();renderAI();
}
function renderProt(){const a=$("auto");if(!a)return;const n=PROT.filter((p,i)=>on[i]).map(p=>p[0]);a.textContent="Auto-protection: "+(n.length?n.join(" · "):"starting…")}
function setProt(){tm.forEach(clearTimeout);tm=[];on={};if(key!=="dust")return;PROT.forEach((p,i)=>tm.push(setTimeout(()=>{on[i]=true;if(p[1]==="shield")tsp=.05;renderProt();kick()},700+i*800)))}


function pick(k){
  key=k;sc=SCEN[k];t2.forEach(clearTimeout);t2=[];gs=-1;done=false;dec=null;cr={on:false,ph:0,left:0};
  gA=lA=hA=pG=pL=pH=false;LB=[];HB=[];feed=[];
  base={...sc.v};rd={...base,bad:false};
  $("doc").classList.remove("on");$("holo").classList.remove("on");st.classList.remove("faint");
  $("doctxt").innerHTML=k==="dust"?"Suit engineer · Habitat<br><span style='color:#8fd3c9'>Live hologram. HoloConnect AI already sent the dust data.</span>":"Flight surgeon · Habitat<br><span style='color:#8fd3c9'>Live hologram. HoloConnect AI already sent Alex’s readings and log.</span>";
  tdl=sc.dust||0;tsp=k==="dust"?.9:0;setProt();drawVit();renderAI();upd();kick();
  later(500,tick);if(sc.unresp)startCrit();
}
document.querySelectorAll(".sc button").forEach(b=>b.onclick=()=>{
  document.querySelectorAll(".sc button").forEach(x=>x.classList.remove("sel"));b.classList.add("sel");pick(b.dataset.s)});
$("artog").onclick=e=>{ar=!ar;st.classList.toggle("noar",!ar);e.target.setAttribute("aria-pressed",ar);e.target.textContent="Augmented reality: "+(ar?"on":"off");upd()};
function res(){const t=+$("t").value,o=Math.round(100-t/480*88),p=Math.round(100-t/480*92);
  $("tt").textContent="T+"+hm(t);$("tr").textContent=hm(480-t);$("o2v").textContent=o+"%";$("pwv").textContent=p+"%";$("o2b").style.width=o+"%";$("pwb").style.width=p+"%";
  $("lat").textContent=480-t<=60?"Return to habitat: under 1 h of reserve":"Earth link: 3–22 min delay"}
$("t").oninput=res;
res();size();pick("nominal");setInterval(tick,ST.tick);

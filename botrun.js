// robô de técnico: escala o melhor XI, muda tática por adversário/mando, mexe no intervalo e aos 70', faz substituições
const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const [sig,obj,NS,out]=[process.argv[2],process.argv[3],+process.argv[4]||10,process.argv[5]];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window,d=w.document;
const click=sel=>{const e=d.querySelector(sel);if(!e)throw new Error('no '+sel+' @ '+d.body.textContent.slice(0,120));e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}))};
const A=(a,x='')=>click(`[data-a="${a}"]${x}`);
const ev=s=>w.eval(s);
const id=ev(`G.clubs.find(c=>c.sig==='${sig}').id`);
A('pickclub',`[data-id="${id}"]`);A('pickphil');A('pickasst');A('pickobj',`[data-o="${obj}"]`);A('begin');A('pickspon');
const PRE=`(function(){const c=userClub(),fx=G.fixtures[G.round][userFixtureIdx()],home=fx[0]===c.id,opp=C(fx[0]===c.id?fx[1]:fx[0]);
 const dd=strength(c)-strength(opp)+(home?1.5:-1.5);let f,st,mk;
 if(dd>=3){f='4-3-3';st='Ofensivo';mk='Leve'}else if(dd>=-2){f='4-4-2';st='Equilibrado';mk='Leve'}else if(dd>=-6){f='4-5-1';st='Contra-ataque';mk='Pesada'}else{f='5-4-1';st='Defensivo';mk='Muito pesada'}
 c.formation=f;c.style=st;c.mark=mk;c.focus=(f==='4-3-3')?'Pelas laterais':'Pelo meio';autoPick(c);return f+'|'+st})()`;
const MID=min=>`(function(){const m=R.ms[R.ui],k=userSide(m),s=m[k],o=m[k==='h'?'a':'h'];while(m.min<${min}&&!m.done)stepAll();if(m.done)return 'done';
 const gf=k==='h'?m.hg:m.ag,ga=k==='h'?m.ag:m.hg;const dif=gf-ga;let act=[];
 if(dif<0){s.formation=dif<=-2?'3-4-3':'4-3-3';s.style='Ofensivo';s.mark='Leve';reassign(s);act.push('ataque')}
 else if(dif>0&&${min}>=45){s.formation='4-5-1';s.style=dif>=2?'Posse':'Contra-ataque';s.mark='Pesada';reassign(s);act.push('segura')}
 let n=0;const idx=s.lineup.map((id,i)=>[id,i]).filter(([id,i])=>s.slots[i]!=='GK'&&!s.sent.includes(id)).sort((a,b)=>(m.en[a[0]]??P(a[0]).en)-(m.en[b[0]]??P(b[0]).en));
 for(const [id,i] of idx){if(n>=2||s.subs>=5)break;const en=m.en[id]??P(id).en;if(en>=55&&!(dif<0&&${min}>=70&&n<1))continue;
  const g=P(id).pos;const cand=s.bench.filter(b=>P(b).pos===g&&P(b).inj===0).sort((a,b)=>P(b).ovr-P(a).ovr)[0];if(cand&&subPlayer(m,k,id,cand)){n++;act.push('sub')}}
 return act.join(',')||'-'})()`;
const L={seasons:[],fired:0,decisions:{pre:{},mid:{}},rounds:0};
let cur=null;const newCur=()=>({res:{hw:0,dw:0,aw:0,goals:0,n:0,zz:0,big:0,max:0},strengths:ev(`G.clubs.map(c=>[c.sig,+strength(c).toFixed(1),c.rep,c.id])`),userStart:ev(`userClub().sig`),pen:0,yc:0,rc:0,inj:0});
cur=newCur();let seasonsDone=0,guard=0;
while(seasonsDone<NS&&guard++<4000){
 if(d.querySelector('[data-a="newseason"]')){
  const S1=ev(`(function(){const t=tableRows();const u=userClub();const ps=Object.values(G.players);return {table:t.map(c=>[c.sig,c.P,c.V,c.E,c.D,c.GP,c.GC]),user:[u.sig,posOf(u),u.P],caixa:+G.fin.caixa.toFixed(1),debt:+(u.debt||0).toFixed(0),conf:Math.round(G.board.conf),top:ps.sort((a,b)=>b.goals-a.goals).slice(0,3).map(p=>[p.name,p.goals]),ovr85:ps.filter(p=>p.ovr>=85).length,ovrAvg:+(ps.reduce((s,p)=>s+p.ovr,0)/ps.length).toFixed(1),n:ps.length,ageAvg:+(ps.reduce((s,p)=>s+p.age,0)/ps.length).toFixed(1)}})()`);
  Object.assign(cur,S1);L.seasons.push(cur);seasonsDone++;if(seasonsDone>=NS)break;A('newseason');cur=newCur();continue}
 if(d.querySelector('[data-a="pickspon"]')){A('pickspon');continue}
 if(d.querySelector('[data-a="takejob"]')){L.fired++;A('takejob');continue}
 if(d.querySelector('[data-a="roundok"]')){A('roundok');continue}
 if(d.querySelector('[data-a="mend"]')){
  const lr=ev(`(function(){const R2=G.lastRound?G.lastRound.results:[];return R2.map(r=>[r.hg,r.ag])})()`);
  for(const [h,a] of lr){cur.res.n++;cur.res.goals+=h+a;if(h>a)cur.res.hw++;else if(h===a)cur.res.dw++;else cur.res.aw++;if(h+a===0)cur.res.zz++;if(h+a>=5)cur.res.big++;cur.res.max=Math.max(cur.res.max,h+a)}
  A('mend');L.rounds++;continue}
 if(d.querySelector('[data-a="play"]')){
  if(d.querySelector('[data-a="press"]'))A('press','[data-i="0"]');
  const pre=ev(PRE);L.decisions.pre[pre]=(L.decisions.pre[pre]||0)+1;
  A('play');ev('clearInterval(S.timer)');
  const m1=ev(MID(45));L.decisions.mid['45:'+m1]=(L.decisions.mid['45:'+m1]||0)+1;
  const m2=ev(MID(70));L.decisions.mid['70:'+m2]=(L.decisions.mid['70:'+m2]||0)+1;
  const ms=ev(`(function(){const m=R.ms[R.ui];return [m.ev.filter(e=>e.pen).length,m.ev.filter(e=>e.type==='yellow').length,m.ev.filter(e=>e.type==='red').length]})()`);
  cur.pen+=ms[0];cur.yc+=ms[1];cur.rc+=ms[2];
  A('mskip');continue}
 throw new Error('stuck '+d.body.textContent.slice(0,150));
}
if(process.env.EVAL)console.log(ev(process.env.EVAL));fs.writeFileSync(out,JSON.stringify(L));console.log('ok',sig,L.seasons.length,'fired',L.fired);process.exit(0);

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["ARG",0],["ARG",20]]){
const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.boost=()=>{for(const id of userClub().squad){const q=P(id);q.ovr=99;for(const a in q.at)q.at[a]=99;q.en=100;q.inj=0}};
 window.ro=()=>{G.board.conf=95;boost();startRound();const x=G._x&&G._x.kind==='po51'?G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x,lr:G.lastRound&&G.lastRound.cup&&G.lastRound.cup.note}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(k,idx,await T(()=>userClub().name+' ('+G.abroad.k+')'));
for(let s=0;s<3;s++){
 const r=await T(()=>{let po=[],g=0,out;
  while(g++<140){const r=ro();if(r.x)po.push(r.x.replace(/^.*· /,'')+(r.lr?'→'+r.lr:''));out=r.o;if(out==='seasonEnd')break}
  const pos=posOf(userClub());const left=!!G.po51;endSeason();const sm=G.summary;const h=(G.lg51.hist||[]).filter(x=>x.s===G.season);
  const res='T'+G.season+' pos'+pos+' out='+out+' left='+left+' NR='+NR()+'\n  '+po.join('\n  ')+'\n  champ '+sm.champ+' | '+h.map(x=>x.n+'→'+x.champ).join('; ')+' | trof '+(G.trophyEst||0);
  newSeason();G.phase='play';return res});
 console.log(r);if(!r)break}
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

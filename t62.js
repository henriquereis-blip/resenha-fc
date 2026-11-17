const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["ARG",6],["ARG",14],["MEX",3],["COL",2],["USA",9]]){
const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,160));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();const x=G._x&&G._x.kind==='po51'?G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(k,idx,await T(()=>userClub().name+' ('+G.abroad.k+') NR'+NR()));
for(let s=0;s<3;s++){
 const r=await T(()=>{const nr0=NR();let po=[],g=0,out,maxJ=0;
  while(g++<120){const r=ro();if(r.x)po.push(r.x.replace(/^.*· /,''));out=r.o;maxJ=Math.max(maxJ,userClub().J);if(out==='seasonEnd')break}
  const left=!!G.po51;const pos=posOf(userClub());const nr1=NR();endSeason();const sm=G.summary;const h=(G.lg51.hist||[]).filter(x=>x.s===G.season);
  const res='T'+G.season+' pos'+pos+' po='+po.length+' ['+po.join('|')+'] out='+out+' po51left='+left+' NR '+nr0+'→'+nr1+' maxJ='+maxJ+' | champ '+sm.champ+' | hist '+h.map(x=>x.n+'→'+x.champ).join('; ');
  newSeason();G.phase='play';return res});
 console.log(r);if(!r)break}
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

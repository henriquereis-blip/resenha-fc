const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["MEX",0],["USA",0]]){
const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.boost=()=>{for(const id of userClub().squad){const q=P(id);q.ovr=99;for(const a in q.at)q.at[a]=99;q.en=100;q.inj=0}};
 window.ro=()=>{G.board.conf=95;boost();startRound();const x=G._x&&G._x.kind==='po51'?G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
const r=await T(()=>{let n=0,out,g=0,rt=0;
 while(g++<140){const r=ro();if(r.x)n++;out=r.o;
   // recarrega o save (JSON) no meio do mata-mata
   if(G.po51&&G.po51.pend&&rt<4){const j=JSON.stringify(G);G=JSON.parse(j);rt++;}
   if(out==='seasonEnd')break}
 const res={n,rt,out,left:!!G.po51,NR:NR(),dfx:G.dfx[userClub().div].length,fx:G.fixtures.length};
 endSeason();res.champ=G.summary.champ;newSeason();G.phase='play';res.after=NR()+'/'+G.fixtures.length;return JSON.stringify(res)});
console.log(k,r);await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

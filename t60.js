const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["MEX",3],["COL",2],["USA",5]]){
const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,120));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(await T(()=>userClub().name+' ('+G.abroad.k+') NR'+NR()+' lg51:'+!!lg51()));
for(let s=0;s<3;s++){
 const r=await T(()=>{let mid=null,g=0;while(G.round<NR()&&g++<80){ro();if(G.round===Math.floor(NR()/2)&&!mid)mid=JSON.stringify({J:userClub().J,P:userClub().P,pp:userClub().pp,half:G.lg51&&G.lg51.half})}
  endSeason();const sm=G.summary;const h=(G.lg51.hist||[]).filter(x=>x.s===G.season);
  const out='T'+G.season+' mid '+mid+' | champ '+sm.champ+' | hist '+h.map(x=>x.n+'→'+x.champ).join('; ')+' | txt: '+sm.txt.slice(-110)+' | stages '+(sm.liguilla||[]).slice(0,3).join(' // ');
  newSeason();G.phase='play';return out});
 console.log(r);if(!r)break}
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

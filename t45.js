const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["ENG",19],["ESP",18],["ITA",17],["ARG",17],["USA",5]]){
const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,80));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(await T(()=>userClub().name+' ('+G.abroad.k+') div'+userClub().div+' 1ª:'+G.clubs.filter(x=>x.div===4).length+' 2ª:'+G.clubs.filter(x=>x.div===5).length));
for(let s=0;s<4;s++){
 const r=await T(()=>{let g=0;while(G.round<NR()&&g++<60)ro();const d0=userClub().div,pos=posOf(userClub());endSeason();const sm=G.summary;
  const t4=tableRows(4).map(c=>c.sig),t5=tableRows(5).map(c=>c.sig);newSeason();G.phase='play';
  return 'T'+G.season+' div'+d0+' pos'+pos+' rel'+sm.rel+' promo'+sm.promo+' desce '+t4.slice(-3)+' sobe '+t5.slice(0,3)+' → agora div'+userClub().div+' NR'+NR()+' 1ª:'+G.clubs.filter(x=>x.div===4).length+' 2ª:'+G.clubs.filter(x=>x.div===5).length});
 console.log(r);if(!r)break}
console.log(await T(()=>{save();loadSave();render();S.lig='tabela';G.view='liga';render();const h=app.innerHTML;return 'reload '+userClub().name+' div'+userClub().div+' abd '+h.includes('data-a="abd"')+' z4 '+(h.match(/ z4/g)||[]).length+' g4 '+(h.match(/ g4/g)||[]).length+' NaN '+/NaN/.test(h)}));
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [['ENG',19],['ESP',18],['ITA',17],['GER',16],['ARG',25],['USA',20],['KSA',15]]){
const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,100));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[Math.min(idx,wd().lg[k].cl.length-1)].id)},[k,idx]);
console.log(await T(()=>{const f=G.clubs.slice(80).filter(c=>!c.stub);return userClub().name+' ('+G.abroad.k+') div'+userClub().div+' NR'+NR()+' | divs '+G.pyr.dv.map(x=>x.d+':'+x.c+'c/'+x.rd+'r').join(' ')+' | completos '+f.length+' leves '+G.pyr.L.length+' | save KB '+Math.round(JSON.stringify(G).length/1024)}));
for(let s=0;s<3;s++){
 const r=await T(()=>{let g=0;while(G.round<NR()&&g++<60)ro();const d0=userClub().div,pos=posOf(userClub());endSeason();const sm=G.summary;
  const lg=(G.pyr.log||[]).slice(0,3).join(' || ');const L=G.pyr.L.length;newSeason();G.phase='play';
  const cnt={};G.clubs.slice(80).filter(c=>!c.stub).forEach(c=>cnt[c.div]=(cnt[c.div]||0)+1);G.pyr.L.forEach(c=>cnt[c.div]=(cnt[c.div]||0)+1);
  return 'T'+G.season+' div'+d0+' pos'+pos+' rel'+sm.rel+' promo'+sm.promo+' → div'+userClub().div+' NR'+NR()+' tam '+JSON.stringify(cnt)+' LOG['+lg+'] completos '+G.clubs.slice(80).filter(c=>!c.stub).length+' save '+Math.round(JSON.stringify(G).length/1024)+'KB'});
 console.log(r);if(!r)break}
console.log(await T(()=>{save();loadSave();render();S.lig='tabela';G.view='liga';render();const h=app.innerHTML;return 'reload '+userClub().name+' div'+userClub().div+' abas '+(h.match(/data-a="abd"/g)||[]).length+' NaN '+/NaN|undefined/.test(h)}));
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

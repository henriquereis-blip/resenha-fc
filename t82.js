const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["MEX",3],["PER",5]]){const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
console.log(k,await p.evaluate(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id);
for(let s=0;s<2;s++){let g=0;while(g++<160&&ro()!=='seasonEnd');endSeason();newSeason();G.phase='play';render()}
return JSON.stringify((G.superHist||[]).map(x=>x.n+': '+x.t))+' hist='+JSON.stringify((G.lg51.hist||[]).map(h=>h.n+' '+h.champ))},[k,idx]).catch(e=>'FALHA '+e.message.slice(0,150)))
await p.close()}console.log(errs.slice(0,5));await b.close()})();

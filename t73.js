const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const out=[];for(let s=0;s<6;s++){let g=0;while(g++<80){G.board.conf=95;startRound();while(!roundDone())stepAll();if(finishRound()==='seasonEnd')break}
  endSeason();newSeason();G.phase='play';const h=G.wd.hist[G.wd.hist.length-1];out.push(h.ucl+'/'+h.uel+'/'+h.lib)}
 const lg=k=>wTable(k).slice(0,2).map(c=>c.n).join('+');return out.join(' | ')+' || '+['NED','BEL','TUR','SCO'].map(lg).join(' ; ')}));
console.log(errs);await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg.ECU.cl[3].id);
let g=0;while(g++<140&&ro()!=='seasonEnd');endSeason();return JSON.stringify(G.lg51.hist.slice(-1))+' | '+(G.summary&&G.summary.liguilla)+' | wd '+JSON.stringify(wd().hist?wd().hist.slice(-1):'')}));
console.log(errs);await b.close()})();

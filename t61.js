const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const r=await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg.USA.cl[5].id);
 let g=0;while(G.round<NR()&&g++<80)ro();endSeason();return {s:G.summary.liguilla,txt:G.summary.txt.slice(-90),news:G.news.slice(0,3).map(n=>n.t),paper:G.paper.slice(0,2).map(n=>n.h+' | '+n.sub)}});
console.log(JSON.stringify(r,null,1));console.log(errs);await b.close()})();

const {chromium}=require('playwright');
(async()=>{
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:800}});const p=await ctx.newPage();
p.on('pageerror',e=>console.log('PE',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CE',m.text().slice(0,160))});
await p.goto('file://'+__dirname+'/index.html');await p.waitForTimeout(1200);
console.log(JSON.stringify(await p.evaluate(()=>{
 localStorage.clear();newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';
 const u=G.clubs.find(c=>c.name==='Santos');startCareer(u.id,'T','Direto',null);ex&&ex();
 const o={};
 // rodar 4 temporadas pra ver base de IA
 for(let s=0;s<4;s++){let g=0;while(G.round<NR()&&g++<80){G.board.conf=95;startRound();while(!roundDone())stepAll();finishRound()}
  try{endSeason();newSeason()}catch(e){o.err=e.message;break}}
 o.rep=youthReport();o.n=G.yLog&&G.yLog.n;
 const por=G.clubs.find(c=>c.name==='Portuguesa');o.por=por.youth.map(y=>y.stars).join('');
 o.sant=userClub().youth.map(y=>y.stars).join('');
 return o})));
await b.close()})();

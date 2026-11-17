const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>console.log('C',m.text().slice(0,150)));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg.ENG.cl[19].id);window.step=0});
for(const [n,f] of [['jogar',()=>{let g=0;while(G.round<NR()&&g++<60)ro();return G.round}],['endSeason',()=>{endSeason();return 'ok'}],['newSeason(inclui promoRel)',()=>{newSeason();return G.season+' div'+userClub().div}],['prep',()=>{G.phase='play';return G.round+' NR '+NR()+' fx '+G.fixtures.length+' u '+G.user+' '+userClub().div}],['r1',()=>{startRound();return 'sr ok'}],['sim',()=>{let n=0;while(!roundDone()&&n++<500)stepAll();return 'steps '+n}],['fin',()=>{finishRound();return 'fin'}],['jogar2',()=>{let g=0;while(G.round<NR()&&g++<60)ro();return G.round}]]){
 try{console.log(n,await Promise.race([p.evaluate(f),new Promise((_,r)=>setTimeout(()=>r(new Error('timeout')),60000))]))}catch(e){console.log(n,'FAIL',e.message);break}}
await b.close()})();

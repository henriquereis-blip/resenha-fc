const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('ERR',e.message));p.on('crash',()=>console.log('CRASH'));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg.ENG.cl[19].id)});
const T=(n,f)=>p.evaluate(f).then(r=>console.log(n,r),e=>{console.log(n,'FAIL',e.message.slice(0,80));process.exit()});
for(let s=0;s<3;s++){
await T('T'+s+' jogar',()=>{let g=0;while(G.round<NR()&&g++<60)ro();return G.round+' div'+userClub().div});
await T('end',()=>{endSeason();return 'pos'+G.summary.pos+' rel'+G.summary.rel+' promo'+G.summary.promo});
await T('new',()=>{newSeason();G.phase='play';return 'T'+G.season+' div'+userClub().div+' r'+G.round});
await T('save',()=>{save();loadSave();return 'ok'});
await T('render',()=>{S.lig='tabela';G.view='liga';render();return app.innerHTML.length});
}
await b.close()})();

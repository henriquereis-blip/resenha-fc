const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/resenha-fc/index.html');await p.waitForTimeout(600);
const ok=[];const chk=(n,c)=>ok.push(n+':'+(c?'ok':'FALHOU'));
// 1) tela de modo aparece depois de "Começar jogo novo"
await p.evaluate(()=>{localStorage.clear();S.step='home';render()});
await p.waitForTimeout(200);
await p.click('[data-a="newgame"]').catch(()=>{});
await p.waitForTimeout(300);
const t1=await p.evaluate(()=>document.body.innerText.toLowerCase());
chk('tela modo',t1.includes('modo de jogo')&&t1.includes('rápido')&&t1.includes('completo'));
// 2) rápido
await p.evaluate(()=>{S.qm='quick';S.step='coach';render()});
// 3) rodando carreira em modo rápido
const r=await p.evaluate(()=>{const o={};
 S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.name==='Flamengo').id,'T','Direto',null);ex();G.phase='play';S.modal=null;
 o.quick=G.quick;o.tutDone=G.tutDone;
 G.board.conf=0;G.round=9;o.fireRapido=shouldFire();
 o.alertsRapido=staffAlerts().length;
 G.fin.caixa=-50;o.negBid=makeBid(G.clubs.find(c=>c.name==='Flamengo').squad[0],0)&&1;
 return o});
chk('rapido flag',r.quick===true);chk('rapido sem tutorial',r.tutDone===true);chk('rapido sem demissao',r.fireRapido===false);chk('rapido sem avisos',r.alertsRapido===0);
// 4) completo
const r2=await p.evaluate(()=>{S.qm=null;S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.name==='Flamengo').id,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const o={quick:G.quick};G.board.conf=0;G.round=9;o.fireFull=shouldFire();return o});
chk('completo flag',r2.quick===false);
console.log(ok.join(' | '));console.log('errs',JSON.stringify(errs.slice(0,3)));await b.close()})();

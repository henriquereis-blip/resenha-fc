const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780},deviceScaleFactor:2})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();const o=finishRound();ex();return o};
 for(let i=0;i<12;i++)ro();
 // abre modal de propostas via "pedir pra sair" com forçando foreign offers
 S.modal={t:'fired',offs:jobOffers(false),resign:true,foffs:wd().lg.ENG.cl.slice(5,7).map(x=>x.id).concat(wd().lg.ARG.cl.slice(8,9).map(x=>x.id))};render()});
await p.waitForTimeout(150);await p.screenshot({path:'../../p17/f42_0.png'});
await p.click('[data-a="fjobgo"]');await p.waitForTimeout(300);
await p.evaluate(()=>{S.modal=null;G.view='inicio';render()});await p.waitForTimeout(150);await p.screenshot({path:'../../p17/f42_1.png'});
await p.evaluate(()=>{window.scrollTo(0,500)});await p.waitForTimeout(100);await p.screenshot({path:'../../p17/f42_2.png'});
await p.evaluate(()=>{G.view='liga';render();window.scrollTo(0,0)});await p.waitForTimeout(150);await p.screenshot({path:'../../p17/f42_3.png'});
console.log(errs);await b.close()})();

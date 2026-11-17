const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},deviceScaleFactor:2,isMobile:true,hasTouch:true});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-test.html');await p.waitForTimeout(400);
await p.evaluate(()=>{S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();
for(let s=0;s<3;s++){for(let r=0;r<40&&!G.summary;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();if(G.summary||G.phase==='end')break}if(!G.summary)endSeason();newSeason()}
for(let r=0;r<10;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound()}
G.phase='play';G.view='comp';S.ctab='mundo';S.wc=null;render()});
await p.waitForTimeout(300);await p.screenshot({path:'p17/n1.png'});
await p.evaluate(()=>{window.scrollTo(0,520)});await p.waitForTimeout(150);await p.screenshot({path:'p17/n2.png'});
await p.evaluate(()=>{window.scrollTo(0,1100)});await p.waitForTimeout(150);await p.screenshot({path:'p17/n3.png'});
await p.evaluate(()=>{S.wc='MEX';render();window.scrollTo(0,0)});await p.waitForTimeout(200);await p.evaluate(()=>window.scrollTo(0,650));await p.waitForTimeout(150);await p.screenshot({path:'p17/n4.png'});
await p.evaluate(()=>{S.wc=null;G.view='mercado';S.tab='mundo';render();window.scrollTo(0,0)});await p.waitForTimeout(200);await p.screenshot({path:'p17/n5.png'});
console.log(errs);await b.close()})();

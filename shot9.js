const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 // joga 6 rodadas
 for(let i=0;i<6;i++){await p.evaluate(()=>{startRound();while(!roundDone())stepAll();finishRound();render()}).catch(e=>errs.push(String(e)))}
 await p.evaluate(()=>{G.mk.slots.manga=slotOffers('manga')[0];G.mk.slots.forn=slotOffers('forn')[1];G.mk.slots.costas=slotOffers('costas')[2];render()});
 for(const v of ['marketing','torcida','estadio','base']){
  await p.evaluate(v=>{G.view=v;render();window.scrollTo(0,0)},v);await p.waitForTimeout(100);
  await p.screenshot({path:'n9_'+v+'.png',fullPage:true});
 }
 console.log(errs);await b.close();
})();

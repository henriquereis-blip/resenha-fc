const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="mgp"][data-k="mago"]');
 await p.screenshot({path:'n10_start.png',fullPage:false});
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 for(let i=0;i<8;i++){await p.evaluate(()=>{startRound();while(!roundDone())stepAll();finishRound();render()}).catch(e=>errs.push(String(e)))}
 const info=await p.evaluate(()=>JSON.stringify({mgr:G.mgr,listed:Object.values(G.players).filter(x=>x.listed&&x.club!==G.user).length,loanable:Object.values(G.players).filter(x=>x.loanable).length}));
 console.log(info);
 for(const [v,t] of [['meutec',null],['clube',null],['mercado','emp']]){
  await p.evaluate(([v,t])=>{G.view=v;if(t)S.tab=t;render();window.scrollTo(0,0)},[v,t]);await p.waitForTimeout(100);
  await p.screenshot({path:'n10_'+v+'.png',fullPage:true});
 }
 console.log(errs);await b.close();
})();

const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 for(let i=0;i<14;i++){await p.evaluate(()=>{startRound();while(!roundDone())stepAll();finishRound();render()}).catch(e=>errs.push(String(e)))}
 // força uma lesão grave
 await p.evaluate(()=>{const c=userClub();const p=P(c.squad[2]);giveInj(p,'jogo');p.inj=11;p.injN=11;p.injT='Lesão de menisco';p.injG='joelho';const q=P(c.squad[5]);q.inj=4;q.injN=4;q.injT='Estiramento na coxa';q.injG='musc';render()});
 for(const v of ['medico','dir','tatica']){
  await p.evaluate(v=>{G.view=v;S.prof=null;S.paper=false;render();window.scrollTo(0,0)},v);await p.waitForTimeout(100);
  await p.screenshot({path:'n11_'+v+'.png',fullPage:true});
 }
 console.log(errs);await b.close();
})();

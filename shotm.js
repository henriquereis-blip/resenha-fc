const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 // joga 6 rodadas pra ter lesão/histórico
 await p.evaluate(()=>{for(let i=0;i<6;i++){autoPick(userClub());startRound();while(!roundDone())stepAll();finishRound()}render()});
 await p.screenshot({path:'m0_inicio.png'});
 await p.evaluate(()=>{G.view='tatica';render()});await p.click('[data-a="play"]').catch(async()=>{await p.click('text=JOGAR')});
 await p.evaluate(()=>{S.speed=2});
 const shots=[[10,'m1_min10'],[30,'m2_min30'],[45,'m3_intervalo'],[75,'m4_min75']];
 for(const [min,name] of shots){
  await p.waitForFunction(m=>R&&R.ms[R.ui].min>=m,min,{timeout:60000});
  if(name==='m3_intervalo'){await p.waitForTimeout(300)}
  await p.screenshot({path:name+'.png'});
  if(S_paused=await p.evaluate(()=>S.paused)){ /* painel aberto */ }
  if(name==='m3_intervalo'){await p.click('[data-a="mgo"]').catch(()=>{})}
 }
 await p.waitForFunction(()=>R&&roundDone(),{timeout:60000}).catch(()=>{});await p.waitForTimeout(500);
 await p.screenshot({path:'m5_fim.png'});
 console.log(errs);await b.close();
})();

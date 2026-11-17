const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 await p.evaluate(()=>{for(let i=0;i<9;i++){autoPick(userClub());startRound();while(!roundDone())stepAll();finishRound()}render()});
 const go=async(v,n)=>{await p.evaluate(v=>{G.view=v;render()},v);await p.waitForTimeout(150);await p.screenshot({path:'p2/'+n+'.png'})};
 await go('tatica','01_tatica');
 await p.evaluate(()=>{userClub().style='Posse';render()});await p.waitForTimeout(100);await p.screenshot({path:'p2/02_tatica_posse.png'});
 await go('treino','03_treino');await go('vest','04_vestiario');await go('assist','05_auxiliar');
 await p.evaluate(()=>{G.view='tatica';render()});await p.click('[data-a="play"]');await p.evaluate(()=>{S.speed=2});
 for(const [min,name] of [[30,'06_jogo_min30'],[45,'07_intervalo']]){
  await p.waitForFunction(m=>R&&R.ms[R.ui].min>=m,min,{timeout:60000});await p.waitForTimeout(250);await p.screenshot({path:'p2/'+name+'.png'});}
 console.log(JSON.stringify(await p.evaluate(()=>({fam:userClub().fam,vest:G.vest&&G.vest.clima,tips:G.tips.length}))));
 console.log(errs);await b.close();
})();

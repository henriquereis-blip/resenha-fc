const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 await p.evaluate(()=>{G.el.termEnd=G.season;for(let i=0;i<38;i++){autoPick(userClub());startRound();while(!roundDone())stepAll();const o=finishRound();if(G.round>=38)break};endSeason();G.phase='seasonEnd';S.modal={t:'season'};render()});
 await p.screenshot({path:'n12_season.png',fullPage:true});
 await p.evaluate(()=>{S.modal=null;S.paper=true;render()});await p.screenshot({path:'n12_jornal.png',fullPage:true});
 await p.evaluate(()=>{S.paper=false;G.view='dir';render()});await p.screenshot({path:'n12_dir.png',fullPage:true});
 await p.evaluate(()=>{G.view='tatica';render()});await p.screenshot({path:'n12_tatica.png',fullPage:false});
 await p.evaluate(()=>{G.view='inicio';render()});await p.screenshot({path:'n12_inicio.png',fullPage:true});
 console.log(errs);await b.close();
})();

const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="cdiv"][data-v="1"]');await p.screenshot({path:'n13_start.png'});
 await p.click('[data-a="pickclub"][data-id="21"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 await p.evaluate(()=>{for(let i=0;i<20;i++){autoPick(userClub());startRound();while(!roundDone())stepAll();finishRound()}G.view='liga';render()});
 await p.screenshot({path:'n13_liga.png',fullPage:true});
 await p.evaluate(()=>{G.view='dir';render()});await p.screenshot({path:'n13_dir.png',fullPage:false});
 await p.evaluate(()=>{for(let i=0;i<18;i++){autoPick(userClub());startRound();while(!roundDone())stepAll();finishRound()}endSeason();const s=G.summary;s.rel=true;s.fired=true;G.phase='seasonEnd';S.modal={t:'season'};render()});
 await p.screenshot({path:'n13_fim.png',fullPage:true});
 console.log(errs);await b.close();
})();

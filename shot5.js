const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 for(const s of ['[data-a="pickclub"][data-id="0"]','[data-a="pickphil"]','[data-a="pickasst"]','[data-a="begin"]','[data-a="pickspon"]'])await p.click(s);
 await p.screenshot({path:'h1.png'});
 await p.click('[data-a="hrow"]');await p.screenshot({path:'h2.png',fullPage:true});
 await p.click('.nav2 .go');await p.waitForTimeout(400);
 await p.evaluate('(()=>{const m=R.ms[R.ui];m.hg++;m.ev.push({min:m.min,side:userSide(m),type:"goal",pid:null,text:"GOL! Teste"});m.scorers.push({pid:null,ast:null,min:m.min,side:userSide(m)})})()');
 await p.waitForTimeout(500);await p.screenshot({path:'h3.png'});
 console.log(errs);await b.close();
})();

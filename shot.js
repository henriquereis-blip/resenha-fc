const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 const c=sel=>p.click(sel);
 await p.screenshot({path:'s0.png'});
 await c('[data-a="pickclub"][data-id="0"]');await c('[data-a="pickphil"]');await c('[data-a="pickasst"]');
 await p.screenshot({path:'s1.png',fullPage:true});
 await c('[data-a="begin"]');await c('[data-a="pickspon"]');
 await p.screenshot({path:'s2.png'});
 await c('.nav [data-v="tatica"]');await p.screenshot({path:'s3.png',fullPage:true});
 await c('.nav [data-v="inicio"]');await c('[data-a="play"]');await p.waitForTimeout(1500);await p.screenshot({path:'s4.png',fullPage:true});
 await c('[data-a="mtac"]');await p.waitForTimeout(200);await p.screenshot({path:'s5.png',fullPage:true});
 // drag test
 const tok=await p.$('.pitch .tok');const ben=await p.$('.bench .bn');
 const tb=await tok.boundingBox(),bb=await ben.boundingBox();
 await p.mouse.move(bb.x+20,bb.y+15);await p.mouse.down();await p.mouse.move(tb.x+20,tb.y+20,{steps:8});await p.mouse.up();
 await p.waitForTimeout(200);
 console.log('subs text',await p.textContent('.ph'));
 console.log(errs);await b.close();
})();

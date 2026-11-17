const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.screenshot({path:'f_clubs.png',fullPage:true});
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.waitForTimeout(200);
 await p.evaluate(()=>{const h=[...document.querySelectorAll('h2')].find(x=>x.textContent.startsWith('4'));h.scrollIntoView()});
 await p.screenshot({path:'f_obj.png'});
 await p.click('[data-a="pickobj"][data-o="rec"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 await p.screenshot({path:'f_home.png'});
 await p.click('.nav2 [data-v="clube"]');await p.waitForTimeout(150);await p.screenshot({path:'f_clube.png'});
 console.log(errs);await b.close();
})();

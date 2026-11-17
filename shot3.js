const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 for(const s of ['[data-a="pickclub"][data-id="0"]','[data-a="pickphil"]','[data-a="pickasst"]','[data-a="begin"]','[data-a="pickspon"]'])await p.click(s);
 for(let i=0;i<3;i++){await p.click('[data-a="play"]');await p.click('[data-a="mskip"]');await p.click('[data-a="mend"]');await p.click('[data-a="roundok"]')}
 await p.click('.nav [data-v="clube"]');await p.click('[data-v="historia"]');
 await p.click('[data-a="hs"][data-v="tdr"]');await p.screenshot({path:'s7.png',fullPage:true});
 console.log(await p.evaluate('G.tdrs.map(x=>x.xi.length).join()'));
 await p.click('[data-a="hs"][data-v="conf"]');await p.screenshot({path:'s8.png',fullPage:true});
 console.log(errs);await b.close();
})();

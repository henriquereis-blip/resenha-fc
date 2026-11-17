const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 for(const s of ['[data-a="pickclub"][data-id="0"]','[data-a="pickphil"]','[data-a="pickasst"]','[data-a="begin"]','[data-a="pickspon"]','[data-a="play"]'])await p.click(s);
 await p.waitForTimeout(600);
 await p.evaluate('mkPen(R.ms[R.ui],"h")');
 await p.waitForTimeout(4200);
 await p.screenshot({path:'s6.png'});
 console.log(await p.evaluate('JSON.stringify(R.ms[R.ui].ev.filter(e=>e.pen).map(e=>e.pen.lines))'));
 await p.waitForTimeout(9000);console.log('pen after',await p.evaluate('String(S.pen)'),errs);
 await b.close();
})();

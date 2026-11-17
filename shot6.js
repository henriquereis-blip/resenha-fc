const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 for(const [w,h,tag] of [[400,820,'m'],[1280,720,'d']]){
 const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 for(const s of ['[data-a="pickclub"][data-id="0"]','[data-a="pickphil"]','[data-a="pickasst"]','[data-a="pickobj"]','[data-a="begin"]','[data-a="pickspon"]','.nav2 [data-v="tatica"]'])await p.click(s);
 await p.waitForTimeout(300);
 const m=await p.evaluate(()=>{const f=document.querySelector('.fit'),pt=document.querySelector('.pitch').getBoundingClientRect();return {docH:document.documentElement.scrollHeight,vh:innerHeight,fitH:f.getBoundingClientRect().height,pitch:[pt.top|0,pt.bottom|0,pt.width|0,pt.height|0]}});
 console.log(tag,'tatica',JSON.stringify(m));
 await p.screenshot({path:'t_'+tag+'.png'});
 await p.click('.nav2 [data-v="inicio"]');await p.click('[data-a="play"]');await p.waitForTimeout(4500);
 const m2=await p.evaluate(()=>({docH:document.documentElement.scrollHeight,vh:innerHeight}));console.log(tag,'jogo',JSON.stringify(m2));
 await p.screenshot({path:'j_'+tag+'.png'});
 await p.waitForTimeout(9000);await p.screenshot({path:'j2_'+tag+'.png'});
 await p.close();}
 console.log(errs);await b.close();
})();

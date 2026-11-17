const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 for(const s of ['[data-a="pickclub"][data-id="0"]','[data-a="pickphil"]','[data-a="pickasst"]','[data-a="pickobj"]','[data-a="begin"]','[data-a="pickspon"]','.nav2 [data-v="tatica"]'])await p.click(s);
 const forms=await p.$$eval('#form option',o=>o.map(x=>x.value));
 for(const f of forms){await p.selectOption('#form',f);const n=await p.$$eval('.pitch .tok',t=>t.length);if(n!==11)console.log('BAD',f,n)}
 await p.selectOption('#mark','Muito pesada');await p.selectOption('#focus','Pelas laterais');
 await p.click('[data-a="tsv"]');await p.click('[data-a="tsave"][data-i="0"]');await p.selectOption('#form','4-4-2');await p.click('[data-a="tload"][data-i="0"]');
 console.log('form after load',await p.evaluate('userClub().formation+"|"+userClub().mark'));
 await p.selectOption('#form','4-2-3-1');await p.screenshot({path:'s9.png',fullPage:true});
 await p.click('.nav2 [data-v="inicio"]');await p.click('[data-a="play"]');await p.click('[data-a="mtac"]');
 await p.selectOption('#mmark','Pesada');await p.selectOption('#mform','5-4-1');await p.click('[data-a="mgo"]');await p.click('[data-a="mskip"]');
 console.log(errs);await b.close();
})();

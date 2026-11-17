const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780},deviceScaleFactor:2});
const fl=fs.readdirSync('/tmp/views').sort();const man=[];
for(const f of fl){await p.route(/^https?:\/\//,r=>r.abort());await p.goto('file:///tmp/views/'+f);await p.waitForTimeout(300);
 const o='p16/'+f.replace('.html','.png');await p.screenshot({path:o,fullPage:false});man.push(o);
 // segunda tela rolada
 await p.evaluate(()=>window.scrollTo(0,700));await p.waitForTimeout(200);const o2=o.replace('.png','_b.png');await p.screenshot({path:o2});man.push(o2);}
console.log(JSON.stringify(man));await b.close()})();

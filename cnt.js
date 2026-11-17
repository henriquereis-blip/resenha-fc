const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>WLD.map(L=>L.k+':'+L.cl.length+'/rd'+((WRULES[L.k]||{}).rd)).join(' ')));await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');startCareer(3,'T','Direto',null);
return Object.keys(G).map(k=>{let s=0;try{s=JSON.stringify(G[k]).length}catch(e){}return k+':'+s}).join(' ')}));
await b.close()})();

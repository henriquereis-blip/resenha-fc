const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
return Object.keys(G).map(k=>k+':'+(JSON.stringify(G[k])||'').length).join(' ')}));await b.close()})();

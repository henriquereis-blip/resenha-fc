const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;G.view='inicio';render()});
for(let i=0;i<22;i++){await p.click('[data-a=nav][data-v='+(i%2?'tatica':'mercado')+']')}
console.log(JSON.stringify(await p.evaluate(()=>{G.view='opcoes';render();return {use:G.use.n,v:G.use.v,txt:document.body.innerText.includes('Como você joga')}})),errs);await b.close()})();

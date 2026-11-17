const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const pl=Object.values(G.players).filter(p=>p.club>=0&&p.club!==G.user).sort((a,b)=>b.ovr-a.ovr)[20];pl.listed=true;S.prof=pl.id;G.view='mercado';render();
 const r=negStart(pl.id);return JSON.stringify({r,modal:S.modal,neg:G.neg&&Object.keys(G.neg),toast:document.querySelector('.toast')&&document.querySelector('.toast').textContent,ovr:pl.ovr,fee:askPrice(pl)})}));
console.log(errs);await b.close()})();

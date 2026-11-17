const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780},hasTouch:true})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;
 Object.values(G.players).filter(p=>p.club>=0&&p.club!==G.user).sort((a,b)=>b.ovr-a.ovr).slice(15,25).forEach(p=>p.listed=true);G.view='mercado';S.tab='venda';render()});
await p.click('.mrow[data-a="prof"]');
await p.click('[data-a="bidopen"]');await p.waitForTimeout(100);
console.log('modal:',await p.evaluate(()=>JSON.stringify(S.modal)),'| texto:',(await p.evaluate(()=>document.body.innerText)).replace(/\s+/g,' ').slice(0,260));
// aumenta/ofertar
const btns=await p.evaluate(()=>[...document.querySelectorAll('[data-a]')].map(e=>e.dataset.a+':'+e.textContent.trim().slice(0,16)).join(' | '));console.log(btns);
console.log(errs);await b.close()})();

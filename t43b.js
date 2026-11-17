const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780},hasTouch:true})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 for(let i=0;i<3;i++){startRound();while(!roundDone())stepAll();finishRound();ex()}G.phase='play';
 Object.values(G.players).filter(x=>x.club>=0&&x.club!==G.user).slice(0,40).forEach(x=>x.listed=true)});
const Y=()=>p.evaluate(()=>Math.round(scrollY));
async function t(nome,setup,sel){await p.evaluate(setup);await p.waitForTimeout(100);await p.evaluate(()=>window.scrollTo(0,500));await p.waitForTimeout(100);const a=await Y();
 await p.evaluate(s=>{const l=[...document.querySelectorAll(s)];l[Math.min(12,l.length-1)].click()},sel);await p.waitForTimeout(200);
 const mid=await Y();
 await p.evaluate(()=>{const e=document.querySelector('[data-a="back"]');e&&e.click()});await p.waitForTimeout(400);const d=await Y();
 console.log(nome,'antes',a,'no perfil',mid,'depois',d,Math.abs(a-d)<=3?'OK':'FALHOU')}
await t('elenco',()=>{G.view='inicio';S.prof=null;render()},'tr[data-a="hrow"]');
await t('mercado',()=>{G.view='mercado';S.tab='venda';S.prof=null;render()},'.mrow[data-a="prof"]');
await t('mercado-busca',()=>{G.view='mercado';S.tab='busca';S.prof=null;render()},'[data-a="prof"]');
console.log(errs);await b.close()})();

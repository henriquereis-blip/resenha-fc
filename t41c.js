const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;Object.values(G.players).filter(p=>p.club>=0&&p.club!==G.user).slice(0,8).forEach(p=>p.listed=true);G.view='mercado';S.tab='venda';render()});
const out=[];
await p.click('.mrow[data-a="prof"]');out.push('perfil abriu: '+await p.evaluate(()=>S.prof!==null));
out.push(await p.evaluate(()=>[...document.querySelectorAll('[data-a]')].map(e=>e.dataset.a+':'+e.textContent.trim().slice(0,18)).filter(x=>!/^(nav|paper|back)/.test(x)).join(' | ')));
// tenta cada botão de ação do perfil
const acts=await p.evaluate(()=>[...document.querySelectorAll('[data-a]')].map((e,i)=>[i,e.dataset.a,e.textContent.trim().slice(0,20)]).filter(x=>!/^(nav|paper|back|prof)$/.test(x[1])));
const snap=await p.evaluate(()=>JSON.stringify(G));
for(const [i,a,t] of acts){const r=await p.evaluate(([i,snap])=>{G=JSON.parse(snap);const pid=S.prof;render();const el=document.querySelectorAll('[data-a]')[i];const a=JSON.stringify(G).length+document.body.innerHTML.length+JSON.stringify(S.modal||0);el.click();return (JSON.stringify(G).length+document.body.innerHTML.length+JSON.stringify(S.modal||0))!==a?'ok':'DEAD'},[i,snap]);out.push(a+' "'+t+'" '+r)}
console.log(out.join('\n'));console.log(errs);await b.close()})();

const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:760},deviceScaleFactor:2});let er=0;p.on('pageerror',e=>{er++;console.log('ERR',e.message)});
await p.goto('file://'+process.cwd()+'/resenha-fc-v2.html');await p.waitForTimeout(500);
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.view='inicio';render()});
const out='/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/m/';
for(const [v,n] of [['inicio','a'],['vest','b'],['liga','c']]){await p.evaluate(v=>{G.view=v;render();window.scrollTo(0,0)},v);await p.waitForTimeout(200);await p.screenshot({path:out+'f'+n+'.png',clip:{x:0,y:0,width:400,height:230}})}
await p.click('.c46 .all');await p.waitForTimeout(200);await p.screenshot({path:out+'fg.png'});
await p.click('#p46 [data-v=tecnicos]');await p.waitForTimeout(200);console.log('grid nav ->',await p.evaluate(()=>G.view+' panelHidden='+document.getElementById('p46').hidden));
// todas as 19 telas via UI
const vs=['agenda','liga','meutec','dir','medico','treino','vest','assist','staff','comp','marketing','torcida','estadio','base','times','mercado','tecnicos','historia','opcoes'];let miss=[];
for(const v of vs){await p.evaluate(()=>{G.view='inicio';render()});await p.click('.c46 .all');await p.click('#p46 [data-v="'+v+'"]');await p.waitForTimeout(60);if(await p.evaluate(()=>G.view)!==v)miss.push(v)}
for(const v of vs){await p.evaluate(()=>{G.view='inicio';render()});const ci=await p.evaluate(v=>CAT46.findIndex(c=>c[4].includes(v)),v);await p.click('.c46 button:nth-child('+(ci+1)+')');const s='.s46 [data-v="'+v+'"]';if(await p.$(s))await p.click(s);await p.waitForTimeout(60);if(await p.evaluate(()=>G.view)!==v)miss.push('sub:'+v)}
console.log('missing',miss.join()||'none','errors',er);await b.close()})();

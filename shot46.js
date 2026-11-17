const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:760},deviceScaleFactor:2});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/resenha-fc-v2.html');await p.waitForTimeout(500);
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.view='inicio';render()});
const out='/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/';
for(const [v,n] of [['inicio','a'],['vest','b'],['liga','c'],['mercado','d']]){await p.evaluate(v=>{G.view=v;render();window.scrollTo(0,0)},v);await p.waitForTimeout(250);await p.screenshot({path:out+'menu46'+n+'.png',clip:{x:0,y:0,width:400,height:300}})}
// click flow
await p.click('.c46 button:nth-child(1)');await p.waitForTimeout(200);console.log('after cat click view',await p.evaluate(()=>G.view));
await p.click('.s46 button:nth-child(2)');await p.waitForTimeout(200);console.log('sub click view',await p.evaluate(()=>G.view));
await p.evaluate(()=>{S.paper=true;render()});console.log('paper has sub',await p.evaluate(()=>!!document.querySelector('.s46')));
await b.close()})();

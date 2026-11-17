const fs=require('fs');const {chromium}=require('playwright');
const src=['head.html','data.js','logic.js',...fs.readdirSync('.').filter(f=>/^(ext|ui)\d*\.js$/.test(f))].map(f=>fs.readFileSync(f,'utf8')).join('\n');
const used=new Set();for(const m of src.matchAll(/data-a=\\?"([a-zA-Z0-9_]+)\\?"/g))used.add(m[1]);
for(const m of src.matchAll(/data-a=\$\{[^}]*\}/g)){}
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const keys=await p.evaluate(()=>Object.keys(A));const miss=[...used].filter(u=>!keys.includes(u));console.log('data-a usados',used.size,'handlers',keys.length);console.log('SEM HANDLER:',miss);
await b.close()})();

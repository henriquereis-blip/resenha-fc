const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},deviceScaleFactor:1.5,hasTouch:true});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-test.html');
fs.mkdirSync('p14',{recursive:true});let n=0;const man=[];
const shot=async(cap,full)=>{n++;const f='p14/'+String(n).padStart(2,'0')+'.png';await p.screenshot({path:f,fullPage:!!full});man.push({f,c:cap})};
const click=async(sel)=>{const e=await p.$(sel);if(e){await e.tap().catch(()=>{});await p.waitForTimeout(250);return true}return false};
const clickT=async(t)=>{const e=await p.$('text='+t);if(e){await e.tap().catch(()=>{});await p.waitForTimeout(250);return true}return false};
await shot('Abertura');
await click('[data-a="newgame"]');await shot('Criar treinador');
await p.fill('#coach','Henrique').catch(()=>{});
await click('[data-a="step"][data-v="club"]');await shot('Escolher clube');

const das=async()=>console.log(await p.evaluate(()=>[...new Set([...document.querySelectorAll('[data-a]')].map(e=>e.dataset.a))].join(',')));
await p.evaluate(()=>{const e=[...document.querySelectorAll('[data-a="pickclub"]')].find(x=>x.textContent.includes('Vasco'));e&&e.click()});await p.waitForTimeout(300);await shot('Prévia do clube');console.log(await p.evaluate(()=>[...document.querySelectorAll('button.btn,button.big')].map(e=>e.dataset.a+':'+e.textContent.trim().slice(0,30)).join(' | ')));
fs.writeFileSync('p14/manifest.json',JSON.stringify(man));console.log(errs);await b.close()})();

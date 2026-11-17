const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8130,async()=>{
const b=await chromium.launch();const c=await b.newContext({viewport:{width:400,height:850},deviceScaleFactor:2});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8130/');await p.waitForTimeout(800);
await p.screenshot({path:'f56_title.png'});
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.round=3;G.view='inicio';render()});await p.waitForTimeout(300);
await p.click('.nav2 [data-v=mercado]');await p.waitForTimeout(400);
console.log('bottom->view',await p.evaluate(()=>G.view));
await p.screenshot({path:'f56_merc.png'});
await p.click('.c46 [data-c=clube],.c46 button:first-child');await p.waitForTimeout(300);
console.log('subtabs',await p.evaluate(()=>[...document.querySelectorAll('.s46 button')].map(x=>x.textContent.trim()).join('|')));
await p.click('.s46 button:first-child');await p.waitForTimeout(300);
console.log('finanças view',await p.evaluate(()=>G.view+' '+(/Finan/i.test(document.body.innerText))));
await p.screenshot({path:'f56_fin.png'});
await b.close();srv.close()});

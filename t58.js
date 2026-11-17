const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8132,async()=>{
const b=await chromium.launch();const c=await b.newContext({viewport:{width:400,height:850},deviceScaleFactor:2});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8132/');await p.waitForTimeout(800);
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.round=3;G.view='mercado';S.tab='livres';render()});await p.waitForTimeout(300);
console.log('sem estrela solta na lista',await p.evaluate(()=>document.querySelectorAll('.mrow .fav49').length===0));
await p.click('.mrow >> nth=0');await p.waitForTimeout(300);
console.log('perfil estrela vazia',await p.evaluate(()=>document.querySelector('.starp49').textContent));
await p.screenshot({path:'f58_a.png'});
await p.click('.starp49');await p.waitForTimeout(200);
console.log('depois de tocar',await p.evaluate(()=>document.querySelector('.starp49').textContent+' favs '+G.fav.length));
await p.screenshot({path:'f58_b.png'});
// jogador do elenco também
await p.evaluate(()=>{S.prof=userClub().squad[0];render()});await p.waitForTimeout(200);
await p.click('.starp49');console.log('elenco fav',await p.evaluate(()=>G.fav.length));
// mundo
await p.evaluate(()=>{S.prof=null;G.view='mercado';S.tab='mundo';render()});await p.waitForTimeout(300);
await p.click('.mrow >> nth=0');await p.waitForTimeout(300);
console.log('card mundo',await p.evaluate(()=>!!S.wp&&!!document.querySelector('.starp49')));
await p.screenshot({path:'f58_c.png'});
await p.click('.starp49');console.log('wfav',await p.evaluate(()=>G.favw.length));
await p.click('[data-a=wback]');await p.waitForTimeout(200);
console.log('estrela na linha',await p.evaluate(()=>document.querySelectorAll('.mrow .fs49').length));
await p.evaluate(()=>{S.tab='fav';render()});await p.waitForTimeout(200);
console.log('fav tab rows',await p.evaluate(()=>document.querySelectorAll('.mrow').length));
await p.screenshot({path:'f58_d.png'});
await p.click('.mrow[data-a=wprof]');await p.waitForTimeout(200);
console.log('abre card do mundo pela aba',await p.evaluate(()=>!!S.wp));
await p.evaluate(()=>{save()});console.log('save',await p.evaluate(()=>/"favw":\[\{/.test(SKV.getItem(SAVE_KEY))));
await b.close();srv.close()});

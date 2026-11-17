const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8125,async()=>{
const b=await chromium.launch();const c=await b.newContext({viewport:{width:400,height:850}});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
const db={};const cors={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'};
await c.route('**/*.supabase.co/**',async rt=>{const u=rt.request().url(),m=rt.request().method();
 if(m==='OPTIONS')return rt.fulfill({status:204,headers:cors});
 if(u.includes('/auth/v1/'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify({access_token:'a',refresh_token:'r',expires_in:3600,user:{id:'u1',email:'t@t.com'}})});
 const sl=(u.match(/slot=eq\.(\d+)/)||[])[1];
 if(m==='POST'){const j=JSON.parse(rt.request().postData());db[j.slot]=j;return rt.fulfill({status:201,headers:cors,body:''})}
 if(m==='DELETE'){delete db[sl];return rt.fulfill({status:204,headers:cors})}
 if(u.includes('select=data')){return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(db[sl]?[{data:db[sl].data}]:[])})}
 return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(Object.values(db).sort((a,b)=>a.slot-b.slot).map(x=>({slot:x.slot,club:x.club,season:x.season,round:x.round,updated_at:x.updated_at})))})});
await p.goto('http://localhost:8125/');await p.waitForTimeout(800);
console.log('title has cloud btn',await p.evaluate(()=>app.innerHTML.includes('Saves na nuvem')));
await p.evaluate(()=>{S.step='saves';render()});await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','123456');await p.click('[data-a=sbin]');await p.waitForTimeout(800);
console.log('saves page logged',await p.evaluate(()=>(app.innerHTML.match(/Saves na nuvem/g)||[]).length+' cards; msg='+SB.msg));
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.view='opcoes';G.round=5;render()});await p.waitForTimeout(300);
await p.click('[data-a=sbsave][data-i="2"]');await p.waitForTimeout(800);
await p.evaluate(()=>{G.round=9;render()});await p.click('[data-a=sbsave][data-i="3"]');await p.waitForTimeout(800);
console.log('slots',Object.keys(db).join(),'| round2',db[2]&&db[2].round,'round3',db[3]&&db[3].round);
await p.screenshot({path:'/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/cloud-opcoes.png',fullPage:false});
await p.evaluate(()=>{G.phase='start';S.step='home';render()});await p.waitForTimeout(300);
console.log('title sub',await p.evaluate(()=>(app.innerHTML.match(/\d+ saves? na nuvem[^<]*/)||['none'])[0]));
await p.evaluate(()=>{S.step='saves';render()});await p.click('[data-a=sbload][data-i="2"]');await p.waitForTimeout(1200);
console.log('loaded slot2 -> round',await p.evaluate(()=>G.round+' phase='+G.phase));
await p.evaluate(()=>{G.view='opcoes';render()});await p.click('[data-a=sbdel][data-i="3"]');await p.waitForTimeout(800);
console.log('after del',Object.keys(db).join());
await b.close();srv.close()});

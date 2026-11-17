const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8128,async()=>{
const b=await chromium.launch();const c=await b.newContext({viewport:{width:400,height:850}});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
const db={};const cors={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'};
await c.route('**/*.supabase.co/**',async rt=>{const u=rt.request().url(),m=rt.request().method();
 if(m==='OPTIONS')return rt.fulfill({status:204,headers:cors});
 if(u.includes('/auth/v1/'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify({access_token:'a',refresh_token:'r',expires_in:3600,user:{id:'u1',email:'t@t.com'}})});
 if(u.includes('/profiles'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:'[]'});
 const sl=(u.match(/slot=eq\.(\d+)/)||[])[1];
 if(m==='POST'){const j=JSON.parse(rt.request().postData());db[j.slot]=j;return rt.fulfill({status:201,headers:cors,body:''})}
 if(m==='DELETE'){delete db[sl];return rt.fulfill({status:204,headers:cors})}
 if(u.includes('select=data'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(db[sl]?[{data:db[sl].data}]:[])});
 return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(Object.values(db).sort((a,b)=>a.slot-b.slot).map(x=>({slot:x.slot,club:x.club,season:x.season,round:x.round,updated_at:x.updated_at})))})});
await p.goto('http://localhost:8128/');await p.waitForTimeout(800);
await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','123456');await p.click('[data-a=sbup]');await p.waitForTimeout(2000);
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.round=3;save();});
await p.evaluate(()=>sync48(1));await p.waitForTimeout(1500);
console.log('1 online sync: cloud0 round',db[0]&&db[0].round,'synced',await p.evaluate(()=>synced48()));
await c.setOffline(true);await p.waitForTimeout(300);
await p.evaluate(()=>{G.round=6;save();sync48(0,1)});await p.waitForTimeout(800);
console.log('2 offline: cloud still',db[0].round,'local kept',await p.evaluate(()=>!!SKV.getItem(SAVE_KEY)),'synced',await p.evaluate(()=>synced48()));
await p.evaluate(()=>{A.tomenu()});await p.waitForTimeout(800);
console.log('3 menu offline: local kept',await p.evaluate(()=>!!SKV.getItem(SAVE_KEY)),'| status',await p.evaluate(()=>(app.innerText.match(/sem internet[^\n]*/)||['-'])[0]));
await p.click('[data-a=cont48]');await p.waitForTimeout(1200);
console.log('4 continue offline: phase',await p.evaluate(()=>G.phase+' round '+G.round));
await p.evaluate(()=>{G.round=8;save()});
await c.setOffline(false);await p.evaluate(()=>window.dispatchEvent(new Event('online')));await p.waitForTimeout(2500);
console.log('5 back online: cloud0 round',db[0].round,'synced',await p.evaluate(()=>synced48()));
await p.evaluate(()=>{A.tomenu()});await p.waitForTimeout(1500);
console.log('6 menu online: status',await p.evaluate(()=>(app.innerText.match(/sincronizado[^\n]*/)||['-'])[0]),'local kept',await p.evaluate(()=>!!SKV.getItem(SAVE_KEY)));
await b.close();srv.close()});

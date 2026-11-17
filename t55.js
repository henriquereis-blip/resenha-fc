const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8129,async()=>{
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
await p.goto('http://localhost:8129/');await p.waitForTimeout(800);
await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','123456');await p.click('[data-a=sbup]');await p.waitForTimeout(2500);
console.log('1 verifier saved',await p.evaluate(()=>!!lvGet('t@t.com')));
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.round=3;save();});
await p.evaluate(()=>sync48(1));await p.waitForTimeout(1200);
await p.evaluate(()=>{A.tomenu();A.sbout()});await c.setOffline(true);await p.waitForTimeout(300);
await p.evaluate(()=>{S.step='home';render()});
console.log('2 gate offline hint',await p.evaluate(()=>app.innerText.includes('Sem internet? Pode entrar')));
await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','errada');await p.click('[data-a=sbin]');await p.waitForTimeout(800);
console.log('3 wrong pw blocked',await p.evaluate(()=>!SB.ses&&SB.msg));
await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','123456');await p.click('[data-a=sbin]');await p.waitForTimeout(800);
console.log('4 offline login ok',await p.evaluate(()=>!!SB.ses&&/continuar carreira/i.test(app.innerText)));
await p.click('[data-a=cont48]');await p.waitForTimeout(1000);
await p.evaluate(()=>{G.round=7;save()});
await c.setOffline(false);await p.evaluate(()=>window.dispatchEvent(new Event('online')));await p.waitForTimeout(2500);
console.log('5 token refreshed/synced cloud round',db[0].round);
// conta nova sem verificador
await p.evaluate(()=>{A.tomenu();A.sbout()});await c.setOffline(true);await p.evaluate(()=>{S.step='home';render()});
await p.waitForTimeout(600);await p.fill('#sb_em','novo@x.com');await p.fill('#sb_pw','abcdef');await p.click('[data-a=sbin]');await p.waitForTimeout(800);
console.log('6 pending session',await p.evaluate(()=>JSON.stringify({p:pend48(),s:SB.ses,m:SB.msg,t:app.innerText.slice(0,150)})));
await c.setOffline(false);await p.evaluate(()=>{window.dispatchEvent(new Event('online'));render()});await p.waitForTimeout(800);
console.log('7 banner confirma',await p.evaluate(()=>app.innerText.includes('Confirma sua conta')));
await p.fill('#sb_pw','abcdef');await p.click('[data-a=sbin]');await p.waitForTimeout(2500);
console.log('8 confirmed, pend gone',await p.evaluate(()=>!pend48()&&SB.ses.email));
await b.close();srv.close()});

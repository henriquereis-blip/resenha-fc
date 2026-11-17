const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8126,async()=>{
const b=await chromium.launch();const c=await b.newContext({viewport:{width:400,height:850},deviceScaleFactor:2});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
let prof=null;const cors={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'};
await c.route('**/*.supabase.co/**',async rt=>{const u=rt.request().url(),m=rt.request().method();
 if(m==='OPTIONS')return rt.fulfill({status:204,headers:cors});
 if(u.includes('/auth/v1/'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify({access_token:'a',refresh_token:'r',expires_in:3600,user:{id:'u1',email:'t@t.com'}})});
 if(u.includes('/profiles')){if(m==='POST'){prof=JSON.parse(rt.request().postData());return rt.fulfill({status:201,headers:cors,body:''})}return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(prof?[{nick:prof.nick}]:[])})}
 return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:'[]'})});
const out='/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/m/';
await p.goto('http://localhost:8126/');await p.waitForTimeout(800);
await p.screenshot({path:out+'t1.png'});
await p.click('[data-a=step][data-v=mpl]');await p.waitForTimeout(200);console.log('mpl',await p.evaluate(()=>app.innerHTML.includes('Em construção')));await p.screenshot({path:out+'t2.png'});
await p.click('[data-a=step][data-v=home]');await p.click('[data-a=mpo]');await p.waitForTimeout(200);
console.log('mpo asks login',await p.evaluate(()=>app.innerHTML.includes('1 · Entre na conta')));await p.screenshot({path:out+'t3.png'});
await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','123456');await p.click('[data-a=sbup]');await p.waitForTimeout(2000);
console.log('asks nick',await p.evaluate(()=>app.innerHTML.includes('Seu apelido')));await p.screenshot({path:out+'t4.png'});
await p.fill('#sb_nick','Henrique');await p.click('[data-a=nick47]');await p.waitForTimeout(800);
console.log('lobby',await p.evaluate(()=>app.innerHTML.includes('Tudo pronto, Henrique')));await p.screenshot({path:out+'t5.png'});
await p.click('[data-a=step][data-v=home]');await p.waitForTimeout(300);
console.log('title shows nick',await p.evaluate(()=>app.innerHTML.includes('Conectado como Henrique')));
await b.close();srv.close()});

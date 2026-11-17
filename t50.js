const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8124,async()=>{
const b=await chromium.launch();const c=await b.newContext();const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
let store=null,log=[];
await c.route('**/*.supabase.co/**',async rt=>{const u=rt.request().url(),m=rt.request().method();log.push(m+' '+u.replace(/^.*supabase.co/,'').slice(0,50));
 const cors={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'};
 if(m==='OPTIONS')return rt.fulfill({status:204,headers:cors});
 if(u.includes('/auth/v1/signup')||u.includes('grant_type=password'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify({access_token:'a',refresh_token:'r',expires_in:3600,user:{id:'u1',email:'t@t.com'}})});
 if(m==='POST'&&u.includes('/rest/v1/saves')){store=JSON.parse(rt.request().postData());return rt.fulfill({status:201,headers:cors,body:''})}
 if(u.includes('/rest/v1/saves'))return rt.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(store?[{data:store.data,slot:0,club:store.club,season:store.season,round:store.round,updated_at:store.updated_at}]:[])});
 rt.fulfill({status:404,headers:cors,body:'{}'})});
await p.goto('http://localhost:8124/');await p.waitForTimeout(800);
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.view='opcoes';render()});
await p.fill('#sb_em','t@t.com');await p.fill('#sb_pw','123456');await p.click('[data-a=sbup]');await p.waitForTimeout(1000);
console.log('after click',await p.evaluate(()=>SB.msg+' ses='+!!SB.ses+' | '+(document.querySelector('#sb_em')?'form':'logged')));
console.log(log.join(' | '));
await b.close();srv.close()});

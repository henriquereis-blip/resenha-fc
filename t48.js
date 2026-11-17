const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8123,async()=>{
const b=await chromium.launch();const c=await b.newContext();const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8123/');await p.waitForTimeout(2500);
console.log('sw',await p.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();return !!(r&&(r.active||r.waiting||r.installing))}),'manifest',await p.evaluate(()=>!!document.querySelector('link[rel=manifest]')));
await c.setOffline(true);await p.reload();await p.waitForTimeout(1500);
console.log('offline ok',await p.evaluate(()=>typeof G!=='undefined'&&!!document.querySelector('#app').innerHTML.length));
await b.close();srv.close()});

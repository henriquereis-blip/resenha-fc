const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':p.endsWith('.js')?'text/javascript':'text/html'});r.end(d)}})}).listen(8134,async()=>{
const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8134/');await p.waitForTimeout(800);
const out=await p.evaluate(()=>{
  const o={};
  o.WRULES=Object.keys(WRULES).map(k=>({k,...Object.fromEntries(Object.entries(WRULES[k]).filter(([a,b])=>typeof b!=='object'&&typeof b!=='function'))}));
  o.PYR=Object.keys(PYR).map(k=>({k,divs:PYR[k].map?PYR[k].map(d=>({n:d.n,t:d.t,rd:d.rd,g:d.g,up:d.up,dn:d.dn,po:d.po&&JSON.stringify(d.po)})):JSON.stringify(PYR[k]).slice(0,300)}));
  o.worldKeys=Object.keys(G).filter(k=>/world|abroad|wd|lite|ctry|ctr/i.test(k));
  return o});
console.log(JSON.stringify(out.worldKeys));
console.log(JSON.stringify(out.WRULES,null,0).slice(0,3500));
console.log(JSON.stringify(out.PYR,null,0).slice(0,5000));
await b.close();srv.close()});

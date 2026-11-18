const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':p.endsWith('.js')?'text/javascript':'text/html'});r.end(d)}})}).listen(8136,async()=>{
const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8136/');await p.waitForTimeout(800);
const out=await p.evaluate(()=>{
  const o={};
  o.top=WLD.map(w=>({k:w.k,n:w.n,div1:w.cl.length,min:Math.min(...w.cl.map(c=>c[1])),max:Math.max(...w.cl.map(c=>c[1]))}));
  const cand=Object.keys(window).filter(k=>{try{const v=window[k];return typeof v==='object'&&v&&!Array.isArray(v)&&(v.ENG||v.ESP)&&!/^(WRULES|PYR)$/.test(k)}catch(e){return false}});
  o.cand=cand;
  try{o.PYRfull=Object.keys(PYR).map(k=>({k,divs:PYR[k].map(d=>({n:d.n,nc:d.nc||d.cl&&d.cl.length||d.c&&d.c.length,keys:Object.keys(d).join(',')}))}))}catch(e){}
  return o});
console.log(JSON.stringify(out.top));console.log(JSON.stringify(out.cand));console.log(JSON.stringify(out.PYRfull).slice(0,2500));
await b.close();srv.close()});

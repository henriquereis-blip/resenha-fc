const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':p.endsWith('.js')?'text/javascript':'text/html'});r.end(d)}})}).listen(8135,async()=>{
const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8135/');await p.waitForTimeout(800);
const out=await p.evaluate(()=>{
  const o={};
  o.Gkeys=Object.keys(G);
  o.abroadKeys=G.abroad?Object.keys(G.abroad):null;
  try{const W=wd();o.wdKeys=Object.keys(W);o.wdLeagues=W.lg?Object.keys(W.lg).map(k=>({k,n:(W.lg[k].clubs||W.lg[k]).length||Object.keys(W.lg[k]).length})):null}catch(e){o.wdErr=e.message}
  o.clubsByDiv={};G.clubs.forEach(c=>{o.clubsByDiv[c.div]=(o.clubsByDiv[c.div]||0)+1});
  o.sampleClub=G.clubs.find(c=>c.div===0);o.sampleClubKeys=Object.keys(o.sampleClub);
  o.globals=Object.keys(window).filter(k=>/^[A-Z][A-Z0-9_]{2,}$/.test(k)&&typeof window[k]==='object'&&window[k]!==null).slice(0,200);
  return o});
console.log(JSON.stringify(out).slice(0,4000));
await b.close();srv.close()});

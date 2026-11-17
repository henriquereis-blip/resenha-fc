const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';fs.readFile(path.join(process.cwd(),f),(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':'text/html'});r.end(d)}})}).listen(8128,async()=>{
const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:620},deviceScaleFactor:2});await p.goto('http://localhost:8128/');await p.waitForTimeout(800);
await p.screenshot({path:'/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/m/gate.png'});await b.close();srv.close()});

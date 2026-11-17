// uso: node mkpdf.js manifest.json out.pdf  (manifest: [{f:'p2/01.png',c:'Foto 1 – legenda'}...])
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const man=JSON.parse(fs.readFileSync(process.argv[2],'utf8'));const out=process.argv[3];
 const cells=man.map((m,i)=>`<figure><img src="data:image/png;base64,${fs.readFileSync(m.f).toString('base64')}"><figcaption><b>Foto ${i+1}</b> · ${m.c}</figcaption></figure>`).join('');
 const html=`<html><body style="margin:0;font-family:Arial,sans-serif;background:#fff"><style>@page{size:A4;margin:10mm}.g{display:grid;grid-template-columns:repeat(3,1fr);gap:8mm}figure{margin:0;page-break-inside:avoid}img{width:100%;border:1px solid #ccc;border-radius:6px}figcaption{font-size:10.5px;margin-top:3px;color:#222}h1{font-size:16px}</style><h1>Resenha FC · fotos da simulação</h1><div class="g">${cells}</div></body></html>`;
 const b=await chromium.launch();const p=await b.newPage();await p.setContent(html);await p.pdf({path:out,format:'A4',printBackground:true});await b.close();console.log('ok',out)})();

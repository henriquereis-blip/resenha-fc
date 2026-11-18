const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const SA=['ARG','URU','COL','CHI','PAR','ECU','PER','BOL','VEN'];const nm=new Map();for(const L of WLD)for(const c of L.cl)nm.set(c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'),L.k);
const out={};for(const d of FCPOOL){const k=nm.get(d[0])||'(base)';out[k]=(out[k]||0)+1}return JSON.stringify(out)+' total='+FCPOOL.length+' base='+FCPOOL.filter(d=>!nm.has(d[0])).map(d=>d[0]).join(',')}));await b.close()})();

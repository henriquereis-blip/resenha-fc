const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{localStorage.clear();const bad=[];
for(let i=0;i<30;i++){S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);contInit('LIB');for(const id of G.cont.ids.slice(1))bad.push(C(id).name);const o=contKoOpp();bad.push(C(o).name)}
const SA=['ARG','URU','COL','CHI','PAR','ECU','PER','BOL','VEN'];const ok=new Set(WLD.filter(L=>SA.includes(L.k)).flatMap(L=>L.cl.map(c=>c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'))));
return 'rivais='+bad.length+' fora='+bad.filter(n=>!ok.has(n)).length+' pool='+FCPOOL.length}));
console.log(errs.slice(0,3));await b.close()})();

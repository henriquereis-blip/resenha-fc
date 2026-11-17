const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text().slice(0,160))});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();const o=finishRound();ex();return o};
 let n=0;while(G.round<38&&n<120){const o=ro();n++;if(o==='fired')break}
 const W=wd();const out=['calls '+n+' round '+G.round];
 for(const k of ['ENG','ARG','USA','CHI']){const T=wTable(k);out.push(k+' J max '+Math.max(...T.map(x=>x.J))+' min '+Math.min(...T.map(x=>x.J)))}
 return out.join(' | ')}));console.log(errs);await b.close()})();

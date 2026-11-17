const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;for(let i=0;i<6;i++){startRound();while(!roundDone())stepAll();finishRound();ex()}G.phase='play';G.view='tecnicos';render()});
for(const s of ['pais','liga','mundo']){await p.click('[data-a="rs"][data-v="'+s+'"]');console.log(s,await p.evaluate(()=>{const r=[...document.querySelectorAll('.tbl .tr.t2:not(.hd)')];return r.length+' linhas | '+r.slice(0,3).map(x=>x.textContent.replace(/\s+/g,' ')).join(' ; ')+' | eu: '+(document.querySelector('.tr.me')||{}).textContent}))}
console.log(errs);await b.close()})();

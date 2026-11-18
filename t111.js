const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:800},isMobile:true,hasTouch:true})).newPage();
p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/resenha-fc/index.html');await p.waitForTimeout(1200);
const o=await p.evaluate(()=>{localStorage.clear();
 S.coachName='Teste';S.sc=G.clubs.find(c=>c.name==='Portuguesa').id;S.sp='Passe';S.obj='equ';S.mg=mgNew('equil');S.asst=asstCandidates('Passe');S.sa=0;
 A.begin();return {ask:!!document.getElementById('tut71'),txt:document.getElementById('tut71')&&document.getElementById('tut71').innerText.slice(0,40)}});
console.log(JSON.stringify(o));
await p.click('[data-a=tutgo]');await p.waitForTimeout(200);
let seq=[];for(let i=0;i<7;i++){seq.push(await p.evaluate(()=>document.querySelector('#tut71 h3').textContent+'|'+G.view));await p.click('#tut71 [data-a=tutnext]');await p.waitForTimeout(150)}
console.log(seq.join('\n'));
console.log('fim',await p.evaluate(()=>[!!document.getElementById('tut71'),G.tutDone]));
await p.evaluate(()=>{G.view='opcoes';render()});console.log('opcoes',await p.evaluate(()=>document.body.innerText.includes('Fazer o tutorial')));
await p.screenshot({path:'o_tut.png'});console.log(errs);await b.close()})();

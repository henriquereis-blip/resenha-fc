const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();const o=finishRound();ex();return o};
 for(let i=0;i<8;i++)ro();const o=['antes '+G.round];
 const W=wd();const lite=W.lg.ENG.cl.slice().sort((a,b)=>a.r-b.r)[4];
 const nid=natify('ENG',lite.id);o.push('natify '+G.round);
 const f=takeJob;takeJob(nid);o.push('takeJob '+G.round);genAllFx();o.push('gen '+G.round);return o.join(' | ')}));await b.close()})();

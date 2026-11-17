const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:800},deviceScaleFactor:2})).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;window.ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg.ENG.cl[12].id);for(let i=0;i<12;i++)ro();G.view='liga';S.lig='tabela';S.abd=null;render()});
const d='/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/';
await p.screenshot({path:d+'a.png'});
await p.click('[data-a="abd"][data-v="7"]');await p.waitForTimeout(200);await p.screenshot({path:d+'b.png'});
await b.close()})();

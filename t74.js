const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
// 1) Copa do Brasil no Brasil
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<14;i++)ro();G.view='comp';S.ctab='cup';render();return 'BR cup st='+(G.cup&&G.cup.st)+' hist='+(G.cup&&G.cup.hist.length)+' cols='+document.querySelectorAll('.br54 .col').length+' boxes='+document.querySelectorAll('.br54 .m').length}));
await p.screenshot({path:'/home/claude/foto_chave_br.png'});
// 2) playoff ARG
console.log(await p.evaluate(()=>{window.boost=()=>{for(const id of userClub().squad){const q=P(id);q.ovr=99;for(const a in q.at)q.at[a]=99;q.en=100;q.inj=0}};
 const ro2=()=>{G.board.conf=95;boost();startRound();while(!roundDone())stepAll();return finishRound()};
 emigrate(wd().lg.ARG.cl[0].id);let g=0,seen=0;while(g++<80){ro2();if(G.po51&&G.po51.log.length){seen=1;break}}
 G.view='comp';S.ctab='cup';render();return 'PO seen='+seen+' label='+(G.po51&&G.po51.label)+' log='+(G.po51&&G.po51.log.length)+' ties='+(G.po51&&G.po51.ties.length)+' cols='+document.querySelectorAll('.br54 .col').length}));
await p.screenshot({path:'/home/claude/foto_chave_po.png'});
console.log(errs);await b.close()})();

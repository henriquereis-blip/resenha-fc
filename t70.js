const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()}
 for(let i=0;i<2;i++)ro();emigrate(wd().lg.ESP.cl[8].id);
 let g=0;while(g++<60){ro();if(G.nc&&G.nc.st>=2)break}
 G.view='comp';S.ctab='cup';render();return 'nc '+G.nc.name+' st'+G.nc.st+' hist'+G.nc.hist.length+' html='+document.querySelectorAll('.br54 .m').length+' cols='+document.querySelectorAll('.br54 .col').length}));
await p.screenshot({path:'/home/claude/foto_chave1.png'});
console.log(await p.evaluate(()=>{let g=0;while(g++<140){const o=ro();if(o==='seasonEnd')break}G.view='comp';S.ctab='cup';render();const t=document.querySelector('.br54');return 'fim champ='+(G.nc.champ!=null)+' cols='+document.querySelectorAll('.br54 .col').length+' txt='+document.querySelector('.cp19').innerText.slice(0,160).replace(/\n/g,' | ')}));
await p.screenshot({path:'/home/claude/foto_chave2.png'});
console.log(await p.evaluate(()=>{S.ctab='cont';render();const a=document.querySelector('.cp19').innerText.length;S.ctab='est';render();return 'outras abas ok '+a}));
console.log(errs);await b.close()})();

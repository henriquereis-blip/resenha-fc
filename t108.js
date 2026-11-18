// t108: migração de save antigo no exterior (sem a divisão-reserva) continua funcionando
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(250);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg.NED.cl[5].id);
 const P=G.pyr;const rd=P.dv.pop();P.L=P.L.filter(s=>s.div!==rd.d);const T=PYR.NED;T.pop();delete T[1].dn;T.push({n:'Divisão inferior (reserva)',c:12,up:2,res:1});T[1].dn=2;
 G=JSON.parse(JSON.stringify(G));
 let g=0,out;while(g++<160){out=ro();if(out==='seasonEnd')break}endSeason();newSeason();G.phase='play';render();
 const m={};for(const c of G.clubs.slice(brn()))if(!c.stub&&c.div>=4&&c.div<99)m[c.div]=(m[c.div]||0)+1;for(const s of G.pyr.L)m[s.div]=(m[s.div]||0)+1;
 return 'dv='+G.pyr.dv.length+' '+JSON.stringify(m)}));
console.log('ERROS',[...new Set(errs)]);await b.close()})();

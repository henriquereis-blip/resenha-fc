const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log('FALHA',e.message.slice(0,250));return null}};
await T(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();const x=G._x?G._x.label:null;while(!roundDone())stepAll();return {o:finishRound(),x}}
 for(let i=0;i<2;i++)ro();emigrate(wd().lg.ARG.cl[6].id)});
console.log(await T(()=>{const z=G.argZ,fx=G.dfx[z.d],cnt={},inter={},zonal={};
 let bad=0;fx.forEach((rd,ri)=>{const seen=new Set();for(const [h,a] of rd){if(seen.has(h)||seen.has(a))bad++;seen.add(h);seen.add(a);cnt[h]=(cnt[h]||0)+1;cnt[a]=(cnt[a]||0)+1;const zh=zoneOf55(h),za=zoneOf55(a);if(zh!==za){inter[h]=(inter[h]||0)+1;inter[a]=(inter[a]||0)+1}}if(seen.size!==30)bad+=100});
 const pairs=new Set();let dup=0;fx.forEach(rd=>rd.forEach(([h,a])=>{const k=h+'-'+a;if(pairs.has(k))dup++;pairs.add(k)}));
 return 'zonas '+z.A.length+'/'+z.B.length+' rodadas='+fx.length+' jogosPorClube='+[...new Set(Object.values(cnt))]+' interzonais='+[...new Set(Object.values(inter))]+' rodadasRuins='+bad+' mandosRepetidos='+dup+' NR='+NR()+' G.fixtures='+G.fixtures.length}));
await T(()=>{G.view='liga';S.lig='tabela';S.zt='A';render()});
console.log(await T(()=>'tabela zona A linhas='+document.querySelectorAll('.tbl .tr:not(.hd)').length+' | '+document.querySelector('.seg.sm').innerText.replace(/\n/g,' ')));
await p.screenshot({path:'/home/claude/foto_zonas.png'});
await T(()=>{S.zt=null;render()});
for(let s=0;s<3;s++){
 console.log(await T(()=>{let po=[],g=0,o;while(g++<160){const r=ro();if(r.x)po.push(r.x.replace(/^.*· /,''));o=r.o;if(o==='seasonEnd')break}
  const z=G.argZ;const res='T'+G.season+' po='+po.length+' '+po.slice(0,6).join('/')+' zonaUser='+zoneOf55(G.user)+' hist='+(G.lg51&&G.lg51.hist?G.lg51.hist.filter(h=>h.s===G.season).map(h=>h.n+':'+h.champ).join(' | '):'-');
  endSeason();newSeason();G.phase='play';return res+' -> novas zonas '+(G.argZ?G.argZ.A.length+'/'+G.argZ.B.length+' s'+G.argZ.s:'nenhuma')+' NR='+NR()}))}
console.log(await T(()=>{G=JSON.parse(JSON.stringify(G));render();return 'json ok zonas='+!!G.argZ+' '+userClub().name}));
console.log(errs);await b.close()})();

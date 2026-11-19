const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/resenha-fc/resenha-fc-v2.html');await p.waitForTimeout(400);
const ok=[];const chk=(n,c)=>ok.push(n+':'+(c?'ok':'FALHOU'));
const r=await p.evaluate(()=>{const o={};
 o.pool=wcPool48().length;o.uniq=new Set(wcPool48()).size;
 const t=ntTourney48(wcPool48(),'x');o.champ=!!NTN[t.champ];o.pools=[...new Set(wcPool48())].length;
 localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
 startCareer(G.clubs.find(c=>c.name==='Flamengo').id,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const W=wd();o.seu=W.lg.SEU?W.lg.SEU.cl.length:0;
 const lc=W.lg.SEU.cl.find(c=>c.n==='Espanha');o.em=emigrate(lc.id);o.club=userClub().name;o.fx=G.fixtures.length;
 let guard=0;while(G.phase==='play'&&guard++<70){startRound();while(!roundDone())stepAll();const x=finishRound();if(x==='fired')break;if(G.round>=G.fixtures.length){endSeason();newSeason()}}
 o.season=G.season;o.nat=userClub().squad.map(id=>P(id).nat).filter(n=>n==='ESP').length;
 return o});
chk('48 seleções',r.pool===48&&r.uniq===48);chk('torneio 48 tem campeão',r.champ);
chk('SEU 10 seleções',r.seu===10);chk('carreira europeia 18 rodadas',r.fx===18);chk('elenco da nacionalidade',r.nat>=10);chk('2+ temporadas sem erro',r.season>=2);
console.log(ok.join(' | '),'| club',r.club,'season',r.season,'errs',JSON.stringify(errs.slice(0,3)));await b.close()})();

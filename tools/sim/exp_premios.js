// Prêmios após 1 temporada: top 20 em nota média, top 10 da Bola de Ouro (composição por posição,
// quantos são do clube campeão da liga), e quantos da Bola de Ouro são convocados.
// Uso: node tools/sim/exp_premios.js
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(()=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  startCareer(G.clubs.find(c=>c.name==='Juventude').id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  let g=0,o;while(g++<200){startRound();while(!roundDone())stepAll();o=finishRound();if(o==='seasonEnd'||o==='fired')break}
  if(!G.summary||G.summary.season!==G.season)endSeason();
  const cnt=l=>{const c={};for(const p of l)c[p.pos]=(c[p.pos]||0)+1;return c};
  const lead=leaders('rating',20).map(x=>x[0]);const bo=bolaOuro().slice(0,10).map(x=>x.p);
  const champ=(G.champs&&G.champs.length)?G.champs[G.champs.length-1].cid:null;
  return {rodadas:G.round,top20nota:cnt(lead),bolaOuroTop10:cnt(bo),
    bolaOuroDoCampeao:bo.filter(p=>p.club===champ).length,
    bolaOuroConvocados:bo.filter(p=>p.aw&&p.aw.calls&&p.aw.calls.s===G.season&&p.aw.calls.n>0).length,
    bolaOuro1:bo[0]?bo[0].pos+' '+bo[0].name+' '+(bo[0].rsum/bo[0].rn).toFixed(2):null};
});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

// Prêmios por nota: posição dos 20 melhores em nota média (leaders 'rating') e do top 10 da Bola de Ouro após 1 temporada.
// Uso: node tools/sim/exp_premios.js
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(()=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  startCareer(G.clubs.find(c=>c.name==='Juventude').id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  let g=0,o;while(g++<200){startRound();while(!roundDone())stepAll();o=finishRound();if(o==='seasonEnd'||o==='fired')break}
  const cnt=l=>{const c={};for(const p of l)c[p.pos]=(c[p.pos]||0)+1;return c};
  const lead=leaders('rating',20).map(x=>x[0]);const bo=bolaOuro().slice(0,10).map(x=>x.p);
  return {rodadas:G.round,top20nota:cnt(lead),bolaOuroTop10:cnt(bo),bolaOuro1:bo[0]?bo[0].pos+' '+bo[0].name+' '+(bo[0].rsum/bo[0].rn).toFixed(2):null};
});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

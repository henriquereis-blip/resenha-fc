// Receita de bilheteria por tier (A1 padrão, A2, B3): uma temporada da Série A com o clube do usuário (Palmeiras, Juventude, Vasco).
// Soma a bilheteria dos jogos em casa (f.last.gate) e o público médio. Uso: node tools/sim/exp_ingressos.js TIER CLUBE
const {open}=require('./setup_common');
const TIER=process.argv[2]||'A1',CLUBE=process.argv[3]||'Palmeiras';
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({TIER,CLUBE})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  startCareer(G.clubs.find(c=>c.name===CLUBE).id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  G.fin.tier=TIER;
  let gate=0,att=0,n=0,g=0,o;
  while(g++<60){startRound();while(!roundDone())stepAll();o=finishRound();
    if(G.fin.last&&G.fin.last.home){gate+=G.fin.last.gate;att+=G.fin.last.att;n++}
    if(o==='seasonEnd'||o==='fired')break}
  return {tier:TIER,clube:CLUBE,jogosCasa:n,bilheteriaTotalMi:+gate.toFixed(1),publicoMedio:n?Math.round(att/n):0,capacidade:userClub().cap*1000};
},{TIER,CLUBE});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

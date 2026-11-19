// Sugestão de formação do auxiliar: regra antiga (dc=0, só encaixe) x nova (desconta zagueiro que sai).
// Para 4 clubes da Série A: joga N partidas com a formação atual, com a sugestão antiga e com a nova (mesmo elenco), vs 8 adversários.
// Uso: node tools/sim/exp_aux.js N
const {open}=require('./setup_common');
const N=+(process.argv[2]||400);
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({N})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const A=G.clubs.filter(c=>c.div===0);const out=[];
  for(const cl of A.slice(0,4)){
    startCareer(cl.id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
    const U=userClub();const opps=A.filter(c=>c.id!==U.id).slice(0,8);
    const old=auxPick(U,0),neu=auxPick(U);const cur=U.formation,sq=U.squad.slice();
    const run=(f)=>{U.formation=f;U.squad=sq.slice();autoPick(U);let pts=0,n=0,ga=0;
      for(let i=0;i<N;i++){const o=opps[i%opps.length];const home=i%2===0;const H=home?U:o,Aw=home?o:U;
        const snap=[...H.squad,...Aw.squad].map(x=>[x,JSON.stringify(P(x))]);
        const m=newMatch(H,Aw);while(!m.done)stepMinute(m);
        const uf=home?m.hg:m.ag,ua=home?m.ag:m.hg;pts+=uf>ua?3:uf===ua?1:0;ga+=ua;n++;
        for(const [x,s] of snap)Object.assign(P(x),JSON.parse(s))}
      return {pts:+(pts/n).toFixed(3),ga:+(ga/n).toFixed(2)}};
    const r={clube:U.name,atual:cur,antiga:old.best,novaSug:neu.best,novaGain:+neu.gain.toFixed(1),novaLost:neu.lost};
    r.p_atual=run(cur);r.p_antiga=old.best!==cur?run(old.best):null;r.p_nova=neu.best!==cur?run(neu.best):null;
    out.push(r);
    U.formation=cur;U.squad=sq.slice();autoPick(U)}
  return out;
},{N});
console.log(JSON.stringify(res,null,1));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

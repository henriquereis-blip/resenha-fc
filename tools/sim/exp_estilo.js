// Retorno de cada estilo: o clube do usuário (Posse, Direto etc.) joga N partidas contra um mesmo grupo de adversários
// com estilo Equilibrado, e mede pontos por jogo. Também mede Posse x cada estilo (campo neutro, mesmo elenco).
// Uso: node tools/sim/exp_estilo.js N [filosofia]
const {open}=require('./setup_common');
const N=+(process.argv[2]||600);const PHIL=process.argv[3]||'Direto';
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({N,PHIL})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const A=G.clubs.filter(c=>c.div===0);const U=A[0];
  startCareer(U.id,'Teste',PHIL,null);ex();G.phase='play';S.modal=null;
  const opps=A.filter(c=>c.id!==U.id).slice(0,8);
  const run=(style)=>{const sv=U.style;U.style=style;let pts=0,gf=0,ga=0,n=0;
    for(let i=0;i<N;i++){const o=opps[i%opps.length];o.style='Equilibrado';const home=i%2===0;
      const H=home?U:o,Aw=home?o:U;const snap=[...H.squad,...Aw.squad].map(x=>[x,JSON.stringify(P(x))]);
      const m=newMatch(H,Aw);while(!m.done)stepMinute(m);
      const uf=home?m.hg:m.ag,ua=home?m.ag:m.hg;gf+=uf;ga+=ua;n++;pts+=uf>ua?3:uf===ua?1:0;
      for(const [x,s] of snap)Object.assign(P(x),JSON.parse(s))}
    U.style=sv;return {pts:+(pts/n).toFixed(3),gf:+(gf/n).toFixed(2),ga:+(ga/n).toFixed(2)}};
  const out={phil:PHIL,vsEquilibrado:{}};
  for(const st of ['Posse','Equilibrado','Ofensivo','Defensivo','Contra-ataque'])out.vsEquilibrado[st]=run(st);
  return out;
},{N,PHIL});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

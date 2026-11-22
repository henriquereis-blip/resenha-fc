// Impacto percentual das opções de tática atuais (marcação e lado do ataque) contra a configuração padrão
// (marcação Leve, ataque Pelo meio). Mesmo clube, mesmos 8 adversários (Série A), mandante e visitante alternados.
// Mede: pontos por jogo, gols pró e contra, cartões amarelos e energia média ao fim da partida.
// Uso: node tools/sim/exp_taticas.js N CLUBE
const {open}=require('./setup_common');
const N=+(process.argv[2]||1200),CL=process.argv[3]||'Palmeiras';
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({N,CL})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const A=G.clubs.filter(c=>c.div===0);const U=A.find(c=>c.name===CL)||A[0];
  startCareer(U.id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const opps=A.filter(c=>c.id!==U.id).slice(0,8);
  const cfgs={padrao:{mark:'Leve',focus:'Pelo meio'},pesada:{mark:'Pesada',focus:'Pelo meio'},muitoPesada:{mark:'Muito pesada',focus:'Pelo meio'},laterais:{mark:'Leve',focus:'Pelas laterais'},
    individual:{mark:'Leve',focus:'Pelo meio',marc:'Individual'},pressaoAlta:{mark:'Leve',focus:'Pelo meio',marc:'Pressão alta'},peloAlto:{mark:'Leve',focus:'Pelo alto'},
    controlar:{mark:'Leve',focus:'Pelo meio',ritmo:'Controlar o jogo'},abafa:{mark:'Leve',focus:'Pelo meio',ritmo:'Abafa no fim'}};
  U.style='Equilibrado';
  const run=(cfg)=>{U.mark=cfg.mark;U.focus=cfg.focus;U.marc=cfg.marc||'Zona';U.ritmo=cfg.ritmo||'Normal';let pts=0,gf=0,ga=0,yc=0,en=0,n=0;
    for(let i=0;i<N;i++){const o=opps[i%opps.length];const home=i%2===0;const H=home?U:o,Aw=home?o:U;
      const snap=[...H.squad,...Aw.squad].map(x=>[x,JSON.stringify(P(x))]);
      const m=newMatch(H,Aw);while(!m.done)stepMinute(m);
      const uf=home?m.hg:m.ag,ua=home?m.ag:m.hg;pts+=uf>ua?3:uf===ua?1:0;gf+=uf;ga+=ua;n++;
      const sd=home?m.h:m.a;yc+=m.ev.filter(e=>e.type==='yellow'&&e.side===(home?'h':'a')).length;
      en+=sd.lineup.map(id=>m.en[id]).reduce((a,x)=>a+x,0)/sd.lineup.length;
      for(const [x,s] of snap)Object.assign(P(x),JSON.parse(s))}
    return {aproveitamento:+(100*pts/(3*n)).toFixed(1),pts:+(pts/n).toFixed(3),gf:+(gf/n).toFixed(3),ga:+(ga/n).toFixed(3),amarelosPorJogo:+(yc/n).toFixed(3),energiaFim:+(en/n).toFixed(1)}};
  const out={clube:U.name};
  for(const k in cfgs)out[k]=run(cfgs[k]);
  return out;
},{N,CL});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

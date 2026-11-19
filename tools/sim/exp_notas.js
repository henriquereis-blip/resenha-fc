// Notas por posição: média e desvio da nota de partida (titulares) por setor, e do goleiro por gols sofridos e por defesas.
// Também correlação nota do goleiro x ovr e x gols sofridos. Partidas isoladas (estado restaurado), pares aleatórios da Série A.
// Uso: node tools/sim/exp_notas.js N   (N partidas)
const {open}=require('./setup_common');
const N=+(process.argv[2]||2000);
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({N})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const A=G.clubs.filter(c=>c.div===0);
  startCareer(A[0].id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const acc={};const add=(k,v)=>{(acc[k]=acc[k]||[]).push(v)};
  const gk=[];
  for(let i=0;i<N;i++){
    const h=pick(A);let a=pick(A);while(a===h)a=pick(A);
    const snap=[...h.squad,...a.squad].map(x=>[x,JSON.stringify(P(x))]);
    const m=newMatch(h,a);while(!m.done)stepMinute(m);
    for(const k of ['h','a']){const s=m[k],ga=k==='h'?m.ag:m.hg,gf=k==='h'?m.hg:m.ag;
      s.lineup.forEach((id,j)=>{const sl=s.slots[j];if(s.outs&&s.outs.includes(id))return;add(sl,m.rt[id]);
        if(sl==='GK'){const shT=k==='h'?m.stats.saT:m.stats.shT;gk.push({r:m.rt[id],ga,gf,ovr:P(id).ovr,shT,sv:shT-ga})}})}
    for(const [x,s] of snap)Object.assign(P(x),JSON.parse(s));
  }
  const st=a=>{const n=a.length,mu=a.reduce((x,v)=>x+v,0)/n,sd=Math.sqrt(a.reduce((x,v)=>x+(v-mu)**2,0)/n);return {n,media:+mu.toFixed(2),dp:+sd.toFixed(2),min:Math.min(...a),max:Math.max(...a)}};
  const corr=(xs,ys)=>{const n=xs.length,mx=xs.reduce((a,v)=>a+v,0)/n,my=ys.reduce((a,v)=>a+v,0)/n;let sxy=0,sxx=0,syy=0;for(let i=0;i<n;i++){sxy+=(xs[i]-mx)*(ys[i]-my);sxx+=(xs[i]-mx)**2;syy+=(ys[i]-my)**2}return +(sxy/Math.sqrt(sxx*syy)).toFixed(3)};
  const setor={};for(const k in acc)setor[k]=st(acc[k]);
  const porGA={};for(const g of gk){const k=Math.min(g.ga,3)+(g.ga>=3?'+':'');(porGA[k]=porGA[k]||[]).push(g.r)}
  for(const k in porGA)porGA[k]=st(porGA[k]);
  const porSV={};for(const g of gk){const k=Math.min(g.sv,5)+(g.sv>=5?'+':'');(porSV[k]=porSV[k]||[]).push(g.r)}
  for(const k in porSV)porSV[k]=st(porSV[k]);
  /* mesma partida sem sofrer gol: o gol do próprio time mexe na nota do goleiro? */
  const cs=gk.filter(g=>g.ga===0&&g.sv===0);const porGF={};for(const g of cs){const k=Math.min(g.gf,3);(porGF[k]=porGF[k]||[]).push(g.r)}
  for(const k in porGF)porGF[k]=st(porGF[k]);
  return {N,setor,goleiro:{porGolsSofridos:porGA,porDefesas:porSV,semGolSemDefesa_porGolsDoTime:porGF,
    corrOvr:corr(gk.map(g=>g.ovr),gk.map(g=>g.r)),corrGolsSofridos:corr(gk.map(g=>g.ga),gk.map(g=>g.r)),corrGolsDoTime:corr(gk.map(g=>g.gf),gk.map(g=>g.r)),corrDefesas:corr(gk.map(g=>g.sv),gk.map(g=>g.r))}};
},{N});
console.log(JSON.stringify(res,null,1));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

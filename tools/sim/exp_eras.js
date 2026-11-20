// Eras táticas (ext83): com era x sem era. Mesma liga e mesmas medidas do exp_formIA.
// Mede a liga da Série A do mundo jogável (sem o clube do usuário competindo): correlação entre força (rankByStrength) e posição final,
// desvio médio |pos − esperada| e nº de anomalias (|diff| ≥ 8). Uso: node tools/sim/exp_eras.js MODO(fixa|dinamica) K
const {open}=require('./setup_common');
const MODO=process.argv[2]||"com",K=+(process.argv[3]||4);
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({MODO,K})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  ERA_ON=MODO==="com";
  startCareer(G.clubs.find(c=>c.name==='Juventude').id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const rows=[];let anom=0,n=0,sumAbs=0;
  for(let s=0;s<K;s++){let g=0,o;
    while(g++<200){startRound();while(!roundDone())stepAll();o=finishRound();if(o==='seasonEnd'||o==='fired')break}
    const div=G.clubs.filter(c=>c.div===0);const byS=div.slice().sort((a,b)=>strength(b)-strength(a));
    const T=tableRows(0);
    for(const c of div){if(c.id===G.user)continue;const pos=T.findIndex(x=>x.id===c.id)+1,exp=byS.findIndex(x=>x.id===c.id)+1;
      rows.push([exp,pos]);n++;sumAbs+=Math.abs(pos-exp);if(Math.abs(pos-exp)>=8)anom++}
    if(!G.summary||G.summary.season!==G.season)endSeason();
    if(o==='fired'){const of=fireOffers();takeJob(of[0])}
    newSeason();G.phase='play';S.modal=null}
  const xs=rows.map(r=>r[0]),ys=rows.map(r=>r[1]);const mx=xs.reduce((a,v)=>a+v,0)/xs.length,my=ys.reduce((a,v)=>a+v,0)/ys.length;
  let sxy=0,sxx=0,syy=0;for(let i=0;i<xs.length;i++){sxy+=(xs[i]-mx)*(ys[i]-my);sxx+=(xs[i]-mx)**2;syy+=(ys[i]-my)**2}
  return {modo:MODO,temporadas:K,clubesAmostra:n,corrForcaPosicao:+(sxy/Math.sqrt(sxx*syy)).toFixed(3),desvioMedio:+(sumAbs/n).toFixed(2),anomalias8:anom};
},{MODO,K});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

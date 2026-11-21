/* ext91 (v117): garotos da base em meia estrela (0,5 a 5) e desenvolvimento até os 21 anos.
   Teto de estrelas: qualidade da base (baseIdx) + divisão. Base fraca não gera 5★; base forte gera mais.
   Ovr de um jovem: a meta (T) é proporcional ao clube: L (média dos titulares) + (estrelas−3)·4, mais +10 se for superestrela rara (0,5%).
   Antes de chegar lá, ele sobe em curva: começa em T−14 aos 16 anos e chega a T aos 21.
   Treinador da base de qualidade alta adianta a curva (q × 0,2 de ano). */
function divAdj91(c){return c&&c.div>=0?[0,-0.5,-1,-1.5][Math.min(3,c.div)]:0}
function starCap91(ix,c){return clamp(1.5+ix/22+divAdj91(c),0.5,5)}
function roundHalf91(x){return clamp(Math.round(x*2)/2,0.5,5)}
function youthStars91(ix,c){
  const cap=starCap91(ix,c);
  // base forte espalha mais (chega perto do teto); base fraca concentra no meio-baixo
  const v=0.5+(cap-0.5)*Math.pow(Math.random(),0.8+(100-ix)/120);
  return roundHalf91(v);
}
function trainerQ91(c){const b=c&&c.id===G.user&&G.mk?G.mk.base:null;return b&&b.staff&&b.staff.trei?b.staff.trei.q:0}
/* referência do clube: média dos 11 titulares (L) e o titular mais fraco (W) */
function refLevel91(c){
  const xi=c&&c.squad?c.squad.slice(0,11).map(id=>P(id)).filter(Boolean):[];
  if(!xi.length)return {L:60,W:55};
  const ov=xi.map(p=>p.ovr);
  return {L:ov.reduce((a,b)=>a+b,0)/ov.length,W:Math.min(...ov)};
}
globalThis.refLevel91=refLevel91;
/* meta do garoto = nível dos titulares do clube (L). 3★ chega ao nível de L; abaixo disso, mais fraco; acima, melhor.
   Cada meia estrela muda 2 de ovr: 0,5★ = L−10 · 1★ = L−8 · 2★ = L−4 · 3★ = L · 4★ = L+4 · 5★ = L+8.
   Superestrela (rara, sorteada na geração): +10 por cima do alvo. */
function youthT91(stars,c,rare){
  const {L}=refLevel91(c);
  return Math.round(L+(stars-3)*4+(rare?10:0));
}
function youthOvr91(y,q,c){
  const T=youthT91(y.stars,c,y.rare),start=T-14;
  const prog=clamp((y.age-16+(q||0)*0.2)/5,0,1);
  return Math.round(start+(T-start)*prog);
}
globalThis.youthOvr91=youthOvr91;globalThis.youthT91=youthT91;globalThis.youthStars91=youthStars91;
/* meia estrela na tela: ★★★½☆ */
function starsTxt91(n){const f=Math.floor(n),h=n%1>=0.5;return '★'.repeat(f)+(h?'½':'')+'☆'.repeat(Math.max(0,5-f-(h?1:0)))}
globalThis.starsTxt91=starsTxt91;
/* novos garotos: estrelas pela base (genYouth9 monta o jovem; aqui só trocamos as estrelas e o valor) */
hookAround('genYouth9','ext91_gy',function(next,__a){
  const c=__a[0];const antes=c.youth.length;const r=next(...__a);
  try{const ix=baseIdx(c);for(const y of c.youth.slice(antes)){y.stars=youthStars91(ix,c);y.rare=Math.random()<0.005;y.value=+(0.02+y.stars*0.012+rnd(0,0.02)).toFixed(3);y.value=+(y.value*(1+ix/80)).toFixed(3)}}catch(e){console.error('ext91 gy '+e.message)}
  return r;
});

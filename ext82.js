/* ext82 (v99): Bola de Ouro além da nota. Soma à nota média da temporada:
   - títulos do clube na temporada (campeão da liga e da copa);
   - convocações para a seleção (cada data FIFA em que o jogador foi chamado; teto);
   - desempenho em jogo decisivo (semifinal e final da copa): média das notas nesses jogos, pesada pelo nº de jogos.
   Tudo guardado por temporada (p.aw), então zera sozinho quando a temporada vira. */
const AW={titleLg:0.25,titleCup:0.2,titleEst:0.15,call:0.03,callMax:0.15,clutchMax:0.4,clutchMin:-0.2,selMax:0.2};
function awOf(p){if(!p.aw)p.aw={};return p.aw}
/* chamado pela quickMatch (ext18) só nas semifinais e finais de copa */
function clutchRec(m){
  for(const k of ['h','a'])for(const id of m[k].lineup){
    const p=P(id),b=awOf(p);
    if(!b.cl||b.cl.s!==G.season)b.cl={s:G.season,sum:0,n:0};
    b.cl.sum+=m.rt[id];b.cl.n++;
  }
}
function clutchBonus(p){
  const c=awOf(p).cl;if(!c||c.s!==G.season||!c.n)return 0;
  const media=c.sum/c.n;
  return clamp((media-6)*0.5*Math.min(c.n,3)/3,AW.clutchMin,AW.clutchMax);
}
function titlesBonus(p){
  let t=0;const s=G.season;
  for(const x of (G.champs||[]))if(x.s===s&&x.cid===p.club)t+=AW.titleLg;
  for(const x of (G.cupHist||[]))if(x.s===s&&x.champ===p.club)t+=AW.titleCup;
  return t;
}
function callsBonus(p){const c=awOf(p).calls;return c&&c.s===G.season?Math.min(AW.callMax,c.n*AW.call):0}
function estTitlesBonus(p){return (G.estHist||[]).filter(x=>x.s===G.season&&x.champ===p.club).length*AW.titleEst}
/* seleção: quanto mais longe o Brasil foi na Copa do Mundo ou na Copa América, mais pontos pros convocados.
   (a seleção é simulada de forma abstrata, então o prêmio segue a fase do Brasil, não a nota do jogo) */
const SEL_STAGE={'Campeão':AW.selMax,'Final':0.12,'Semifinal':0.08,'Quartas':0.04,'Oitavas':0.02};
function selStage(t){
  if(!t||t.s!==G.season)return 0;
  if(t.champ==='BRA')return AW.selMax;
  return SEL_STAGE[t.braOut]||0;
}
function selBonus(p){
  if(natOf(p)!=='BRA'||!braSquad().includes(p.id))return 0;
  const b=ntBox();return Math.max(selStage(b.wc),selStage(b.ca));
}
/* a Bola de Ouro é nota média + bônus */
function awardOf(p){return p.rsum/p.rn+titlesBonus(p)+estTitlesBonus(p)+callsBonus(p)+clutchBonus(p)+selBonus(p)}
/* guarda a temporada em que a Copa do Mundo e a Copa América foram disputadas */
hookAfter('ntWC','aw82wc',function(){const b=ntBox();if(b.wc)b.wc.s=G.season});
hookAfter('ntCA','aw82ca',function(){const b=ntBox();if(b.ca)b.ca.s=G.season});
/* convocações: toda data FIFA anunciada chama a seleção (braSquad, de todos os clubes), não só o time do usuário */
hookAround('ntAnnounce','aw82',function(next,__a){
  const r=next();
  for(const id of braSquad()){const p=P(id),a=awOf(p);
    if(!a.calls||a.calls.s!==G.season)a.calls={s:G.season,n:0};
    a.calls.n++}
  return r;
});

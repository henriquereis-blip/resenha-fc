/* ext95 (v129–v130): finanças em equilíbrio e confiança da diretoria com inércia.
   Caixa: acima de 50% da receita anual (scaleOf), 25% do excedente sai por temporada (imposto + manutenção).
     Vale para todos os clubes (IA e usuário), evitando acúmulo infinito no topo.
   Confiança: as quedas de cada rodada valem 40% (a diretoria demora a perder a paciência); as subidas não mudam. */
const CX95={teto:0.5,taxa:0.25},CONF95=0.4;
hookAfter('newSeason','ext95_ns',function(){
  try{
    for(const c of G.clubs){
      const sc=scaleOf(c);if(!(sc>0))continue;
      if(c.id===G.user){const ex=G.fin.caixa-CX95.teto*sc;if(ex>0){const t=+(ex*CX95.taxa).toFixed(1);G.fin.caixa=+(G.fin.caixa-t).toFixed(1);addNews('Impostos e manutenção sobre o caixa alto: R$ '+t.toFixed(1)+' mi.')}}
      else{const ex=(c.caixa||0)-CX95.teto*sc;if(ex>0)c.caixa=+(c.caixa-ex*CX95.taxa).toFixed(1)}
    }
  }catch(e){console.error('ext95 cx '+e.message)}
});
hookAround('boardRound','ext95_br',function(next,__a){
  const c0=G.board.conf;const r=next(...__a);
  try{const d=G.board.conf-c0;if(d<0)G.board.conf=clamp(+(c0+d*CONF95).toFixed(1),0,100)}catch(e){}
  return r;
});

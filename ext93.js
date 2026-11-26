/* ext93 (v125): estabilidade do técnico. Quem cumpre o objetivo (ou fica perto) ano a ano fica mais protegido;
   quem erra feio seguido é demitido com mais facilidade. Vale para o técnico do usuário.
   Por temporada registra: cumpriu (pos ≤ meta+1), ficou perto (meta+2 e meta+3), errou (meta+4 ou mais).
   Multiplicador sobre a chance de demissão nas datas (rodadas 9, 19, 29, 37):
     · cada temporada cumprida no mesmo clube: ×0,55 (piso ×0,25)
     · temporada que errou: ×1,3 (teto ×2,0)
     · fator geral ×0,8 sobre a chance base nas datas
     · temporada perto (meta+2 a +3): ×1,0 (neutra)
   O tempo no cargo (tenureMult, ext75) continua valendo por cima. */
/* v140: era hookAfter e lia G.summary, que o newSeason zera no fim (logic.js): nunca gravava nada e a estabilidade ficava em x1,0. Agora hookBefore. */
hookBefore('newSeason','ext93_ns',function(){
  try{
    const u=userClub(),sm=G.summary;if(!u||!sm||sm.season!==G.season)return;
    G.stab93=G.stab93||[];
    const d=sm.pos-sm.meta;
    const k=d<=1?'ok':d<=3?'perto':'erro';
    G.stab93.push({s:sm.season,c:u.id,k});
    if(G.stab93.length>12)G.stab93.shift();
  }catch(e){console.error('ext93 '+e.message)}
});
function stabMult93(c){
  const h=(G.stab93||[]).filter(x=>x.c===c.id).slice(-5);
  let m=1,ok=0;
  for(const x of h){if(x.k==='ok'){ok++;m*=0.55}else if(x.k==='erro'){m*=1.3}}
  return clamp(m,0.25,2);
}
globalThis.stabMult93=stabMult93;
hookAround('shouldFire','ext93_sf',function(next,__a){
  const p=next();
  if(![9,19,29,37].includes(G.round))return p;   /* v140: a 2ª chance valia em qualquer rodada (nunca rodou antes, pois a estabilidade não era gravada) */
  const c=userClub();if(!c)return p;
  const m=stabMult93(c);
  if(p)return Math.random()<clamp(m*0.8,0,1);   /* fator geral 0,8: a chance base nas datas estava alta (v126: 58% das temporadas) */
  return (m>1&&G.board.conf<40)?Math.random()<0.3*(m-1):false; /* a decisão base não demitiu: erro seguido dá uma segunda chance (0,3 por ponto acima de 1), só com a confiança baixa */
});

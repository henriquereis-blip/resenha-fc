/* ext92 (v119): contrato vencido no clube que o técnico deixou. Antes só o clube atual do usuário tinha o vencimento
   processado; depois de uma demissão (takeJob), os jogadores do clube antigo com contrato vencido ficavam no elenco. */
function releaseExp92(c){
  if(!c||!c.squad)return;
  const venc=c.squad.map(id=>P(id)).filter(p=>p&&ctOf(p)<=G.season);
  /* mesma regra do clube do usuário (ct76): fica com pelo menos 20 jogadores; quem sobraria é renovado por 1 ano */
  const gone=[];let n=c.squad.filter(id=>P(id)).length;
  for(const p of venc){if(n-gone.length<=20){p.ct=G.season+1;continue}gone.push(p)}
  for(const p of gone){
    c.squad=c.squad.filter(id=>id!==p.id);p.club=-1;p.listed=false;delete p.wage;delete p.ct;
    G.free=G.free||[];G.free.push(p.id);
  }
  return gone.length;
}
hookBefore('takeJob','ext92_tj',function(){if(G.user!=null)G.exClub92=G.user});
/* antes da virada: a renovação automática da IA (ext80) roda na virada e renovaria o jogador do clube antigo */
hookBefore('newSeason','ext92_nsb',function(){
  try{if(G.exClub92!=null&&G.exClub92!==G.user){const c=C(G.exClub92);if(c)releaseExp92(c)}}catch(e){console.error('ext92 '+e.message)}
  G.exClub92=null;
});

/* ext8: limpeza de jogadores órfãos, talento novo, inflação de salários e crescimento de receita */
function purgePlayers(){
  const keep=new Set();G.clubs.forEach(c=>{c.squad.forEach(id=>keep.add(id))});
  G.free.forEach(id=>keep.add(id));G.offers.forEach(o=>keep.add(o.pid));(G.recs||[]).forEach(r=>keep.add(r.pid));
  if(G.sres)G.sres.forEach(id=>keep.add(id));if(S&&S.prof!==null&&S.prof!==undefined)keep.add(S.prof);
  for(const id of Object.keys(G.players)){if(!keep.has(+id))delete G.players[id]}
}
const _fr8=finishRound;finishRound=function(){const r=_fr8();if(G.round%6===0)purgePlayers();return r};
const _ns8=newSeason;newSeason=function(){
  const r=_ns8();
  G.salMult=+((G.salMult||1)*1.09).toFixed(4);
  for(const p of Object.values(G.players)){if(p.age>=23&&p.age<=27&&p.ovr<p.pot&&Math.random()<0.55)p.ovr=Math.min(p.pot,p.ovr+1)}
  for(const c of G.clubs){c.tv=+(c.tv*1.03).toFixed(1);c.spBase=+(c.spBase*1.03).toFixed(1)}
  // revelações: cada clube pode ganhar 0-2 prospectos com teto alto (repõe o talento que envelhece)
  for(const c of G.clubs){if(c.id===G.user&&G.fx)continue;const n=Math.random()<0.55?(Math.random()<0.3?2:1):0;
    for(let i=0;i<n;i++){const role=pick(['GOL','ZAG','ZAG','LAT','VOL','MEI','PNT','ATA','ATA']);
      const p=mkPlayer(role,c.rep-11+ri(-3,4),ri(17,19),c.id);p.pot=clamp(p.ovr+ri(15,32),p.ovr,94);c.squad.push(p.id)}
    while(c.squad.length>32){const worst=c.squad.slice().sort((a,b)=>P(a).ovr-P(b).ovr)[0];c.squad=c.squad.filter(x=>x!==worst);delete G.players[worst]}
    autoPick(c)}
  purgePlayers();
  return r;
};
const _so8=salOf;salOf=function(p){return +(_so8(p)*(G.salMult||1)).toFixed(2)};

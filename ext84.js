/* ext84 (v109): Supercopa do Brasil. Campeão do Brasileirão x campeão da Copa do Brasil, jogo único na virada da temporada.
   Se o mesmo clube ganhou as duas, joga o segundo melhor do país (maior força). Só o clube do usuário ganha prêmio. */
hookAround('newSeason','ext84_sbr',function(next,__a){
  let A=null,B=null,s=G.season;
  try{
    const ch=(G.champs||[]).filter(x=>x.s===s).slice(-1)[0];
    const cu=(G.cupHist||[]).filter(x=>x.s===s).slice(-1)[0];
    A=ch?G.clubs.find(c=>c.id===ch.cid):null;
    B=cu?G.clubs.find(c=>c.id===cu.champ):null;
    if(A&&B&&A===B){B=G.clubs.filter(c=>c.div===0&&c!==A).sort((a,b)=>b.rep-a.rep)[0]||null}
  }catch(e){A=B=null}
  const r=next();
  try{
    if(A&&B&&A!==B){
      const g=wMatch({r:A.rep,f:1},{r:B.rep,f:1});let pen=null,w=g[0]>g[1]?A:g[0]<g[1]?B:null;
      if(!w){pen=shootout(A.rep,B.rep);w=pen[0]>pen[1]?A:B}
      const txt=A.name+' '+g[0]+'–'+g[1]+' '+B.name+(pen?' ('+pen[0]+'–'+pen[1]+' pên.)':'');
      paperLine(w.name+' conquista a Supercopa do Brasil',txt);
      G.superBR=(G.superBR||[]).concat({s,champ:w.id,n:'Supercopa do Brasil',t:txt}).slice(-12);
      const me=userClub();
      if(me&&(me===A||me===B)){
        if(w===me){const pz=+(1*Math.max(.7,scaleOf(me)/100)).toFixed(1);G.fin.caixa=+(G.fin.caixa+pz).toFixed(1);me.humor=clamp(me.humor+4,5,100);addNews('🏆 Campeão da Supercopa do Brasil! Prêmio R$ '+pz+' mi. ('+txt+')')}
        else addNews('Você perdeu a Supercopa do Brasil: '+txt+'.')}
      else addNews('Supercopa do Brasil: '+w.name+' levou ('+txt+').');
    }
  }catch(e){console.error('ext84 '+e.message)}
  return r;
});

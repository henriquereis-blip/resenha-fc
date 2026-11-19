/* ext80 (v94): contratos dos clubes da IA. No começo de cada temporada, quem venceu renova (1 a 3 anos), então sempre há jogadores vencendo e o desconto aparece. */
hookAfter('newSeason','ct80',function(){
  try{
    for(const c of G.clubs){if(c.id===G.user)continue;
      for(const id of c.squad){const p=G.players[id];if(!p)continue;
        if(p.ct===undefined||p.ct<G.season){p.ct=G.season+Math.floor(Math.random()*3)}}}
  }catch(e){console.error('ct80 '+e.message)}
});

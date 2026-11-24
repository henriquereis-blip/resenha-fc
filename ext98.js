/* ext98 (v135): Brasileirão Série A com elenco REAL (base BRA1, via RS72) já no mundo inicial.
   Antes: elencos do data.js (desatualizados, escala própria). Aqui o nome, idade, posição, nacionalidade e overall vêm da base,
   e os ajustes manuais do dono (MAN72) continuam valendo por cima. Divisões B-D seguem geradas. */
(function(){
hookAfter('newWorld','ext98_nw',function(){
  try{
    if(typeof real73!=='function'||!G||!G.clubs)return;
    const want={};if(typeof MAN72!=='undefined')for(const k in MAN72)want[(typeof ALIAS97!=='undefined'&&ALIAS97[k])||k]=MAN72[k];
    for(const c of G.clubs.slice(0,20)){
      const R=real73(c.name);if(!R||R.length<18)continue;
      const gen=c.squad.map(id=>G.players[id]).filter(Boolean),used=new Set(),keep=[];
      for(const r of R){
        let p=gen.find(x=>x.role===r.role&&!used.has(x.id));
        const o=want[r.n]||r.ovr;
        if(p){used.add(p.id);const d=o-p.ovr;p.name=r.n;p.real=true;p.nat=r.nat;p.age=r.age;p.ovr=o;p.pot=Math.max(o,r.pot);
          for(const k in p.at)p.at[k]=clamp(Math.round(p.at[k]+d),25,96)}
        else{p=mkPlayer(r.role,o,r.age,c.id,r.n,true);p.nat=r.nat;p.pot=Math.max(p.ovr,r.pot);try{p.fit[c.phil]=clamp(p.fit[c.phil]+10,5,99)}catch(e){}}
        keep.push(p.id);try{NATF[r.n]=r.nat}catch(e){}NMS.add(r.n)}
      for(const p of gen)if(!used.has(p.id))delete G.players[p.id];   // sobra do elenco antigo sai (nome antigo não fica fantasma)
      c.squad=keep;autoPick(c)}
  }catch(e){console.error('ext98 '+e.message)}
});
})();

/* ext88 (v114, fase D): estilo do jogador. Cada jogador tem um estilo preferido (o de maior encaixe).
   Quando joga em clube de outra filosofia, o encaixe com a filosofia do clube fica baixo (penalidade já existente no motor).
   Ao fim de cada temporada ele se adapta: jovem rápido, veterano devagar. O estilo preferido muda quando o encaixe com o clube passa o antigo. */
function estOf88(p){
  if(!p.est){let b=null,v=-1;for(const ph of PHN){if(p.fit[ph]>v){v=p.fit[ph];b=ph}}p.est=b}
  return p.est;
}
globalThis.estOf88=estOf88;
const ADP88=age=>age<=23?6:age<=28?4:2;
hookAfter('newSeason','ext88_ns',function(){
  try{
    for(const c of G.clubs){
      for(const id of c.squad){const p=P(id);if(!p||!p.fit)continue;
        const before=estOf88(p);
        p.fit[c.phil]=clamp(p.fit[c.phil]+ADP88(p.age),5,98);
        for(const ph of PHN)if(ph!==c.phil)p.fit[ph]=clamp(p.fit[ph]-1,5,98);
        const after=p.fit[c.phil]>p.fit[before]?c.phil:before;
        if(after!==before){p.est=after;if(c.id===G.user)addNews(lastName(p.name)+' já joga no estilo '+after+' do clube.')}
      }
    }
  }catch(e){console.error('ext88 '+e.message)}
});

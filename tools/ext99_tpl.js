(function(){
const LET={G:'GOL',Z:'ZAG',L:'LAT',V:'VOL',M:'MEI',P:'PNT',A:'ATA'};
const cache={};
function rsw(name){
  if(cache[name]!==undefined)return cache[name];
  const s=RSW[name];if(!s)return cache[name]=null;
  return cache[name]=s.split(';').map(e=>{const a=e.split('|');return {n:a[0],role:LET[a[1]],age:+a[2],nat:a[3],num:+a[4]}});
}
globalThis.rsw99=rsw;
/* clube estrangeiro completo (carreira lá): nomes reais no lugar dos gerados. O overall segue a distribuição já calibrada do clube:
   por papel, o melhor overall gerado vai para o jogador de melhor 'ordem' (camisa baixa e idade de auge), e assim por diante. */
hookAround('mkNat42','mk99',function(next,__a){
  const c=next();
  try{ if(typeof real73==='function'&&real73(c.name))return c;
    const R=rsw(c.name);if(!R)return c;
    const gen=c.squad.map(id=>G.players[id]).filter(Boolean);
    const ord=r=>(r.num>=99?30:r.num)+Math.abs(r.age-27)*1.3;   // camisa 1-11 e idade perto do auge = mais provável titular
    for(const role of Object.keys(LET).map(k=>LET[k])){
      const rs=R.filter(r=>r.role===role).sort((a,b)=>ord(a)-ord(b));
      const gs=gen.filter(p=>p.role===role).sort((a,b)=>b.ovr-a.ovr);
      rs.forEach((r,i)=>{
        let p=gs[i];
        if(p){const o=p.ovr;p.name=r.n;p.real=true;p.nat=r.nat;p.age=r.age;p.pot=Math.max(o,o+Math.round(Math.max(0,24-r.age)*1.2))}
        else{const base=gs.length?gs[gs.length-1].ovr-3:55;p=mkPlayer(role,clamp(base,40,90),r.age,c.id,r.n,true);p.nat=r.nat;c.squad.push(p.id)}
        try{NATF[r.n]=r.nat}catch(e){}NMS.add(r.n)});
      gs.slice(rs.length).forEach(p=>{const k=c.squad.indexOf(p.id);if(k>=0&&c.squad.length>20){c.squad.splice(k,1);delete G.players[p.id]}});
    }
    autoPick(c);
  }catch(e){console.error('ext99 '+e.message)}
  return c});
})();

(function(){
const LET={G:'GOL',Z:'ZAG',L:'LAT',V:'VOL',M:'MEI',P:'PNT',A:'ATA'};
const cache={};
function rsw(name){
  if(cache[name]!==undefined)return cache[name];
  const s=RSW[name];if(!s)return cache[name]=null;
  return cache[name]=s.split(';').map(e=>{const a=e.split('|');return {n:a[0],role:LET[a[1]],age:+a[2],nat:a[3],num:+a[4],o:+a[5]||0}});
}
globalThis.rsw99=rsw;
/* clube estrangeiro completo (carreira lá): nomes reais no lugar dos gerados. O overall segue a distribuição já calibrada do clube:
   por papel, o melhor overall gerado vai para o jogador de melhor 'ordem' (camisa baixa e idade de auge), e assim por diante. */
hookAround('mkNat42','mk99',function(next,__a){
  const c=next();
  try{ if(typeof real73==='function'&&real73(c.name))return c;
    const R=rsw(c.name);if(!R)return c;
    const gen=c.squad.map(id=>G.players[id]).filter(Boolean);
    const ord=r=>(r.num>=99?30:r.num)+Math.abs(r.age-27)*0.6;   // camisa 1-11 e idade perto do auge = mais provável titular
    for(const role of Object.keys(LET).map(k=>LET[k])){
      const rs=R.filter(r=>r.role===role).sort((a,b)=>ord(a)-ord(b));
      const gs=gen.filter(p=>p.role===role).sort((a,b)=>b.ovr-a.ovr);
      const pool=gs.slice();   // vagas geradas ainda livres
      const take=(i)=>pool.splice(i,1)[0];
      /* 1) quem tem overall do FC26 ocupa a vaga gerada de overall mais próximo (a distribuição do clube se mantém); a nota passa a ser a do FC26 */
      rs.filter(r=>r.o).forEach(r=>{
        let p=null;
        if(pool.length){let bi=0;for(let j=1;j<pool.length;j++)if(Math.abs(pool[j].ovr-r.o)<Math.abs(pool[bi].ovr-r.o))bi=j;p=take(bi)}
        if(p){const d=r.o-p.ovr;p.ovr=r.o;for(const k in p.at)p.at[k]=clamp(Math.round(p.at[k]+d),25,96);p.name=r.n;p.real=true;p.nat=r.nat;p.age=r.age;p.pot=Math.max(r.o,r.o+Math.round(Math.max(0,24-r.age)*1.2))}
        else{p=mkPlayer(role,clamp(r.o,40,95),r.age,c.id,r.n,true);p.nat=r.nat;p.pot=Math.max(p.ovr,r.o);c.squad.push(p.id)}
        r.done=1;try{NATF[r.n]=r.nat}catch(e){}NMS.add(r.n)});
      /* 2) o resto (sem nota) preenche as vagas que sobraram, por ordem de titularidade */
      pool.sort((a,b)=>b.ovr-a.ovr);
      rs.filter(r=>!r.o).forEach(r=>{
        let p=pool.shift();
        if(p){const o=p.ovr;p.name=r.n;p.real=true;p.nat=r.nat;p.age=r.age;p.pot=Math.max(o,o+Math.round(Math.max(0,24-r.age)*1.2))}
        else{const base=gs.length?gs[gs.length-1].ovr-3:55;p=mkPlayer(role,clamp(base,40,90),r.age,c.id,r.n,true);p.nat=r.nat;c.squad.push(p.id)}
        try{NATF[r.n]=r.nat}catch(e){}NMS.add(r.n)});
      pool.forEach(p=>{const k=c.squad.indexOf(p.id);if(k>=0&&c.squad.length>20){c.squad.splice(k,1);delete G.players[p.id]}});
    }
    autoPick(c);
  }catch(e){console.error('ext99 '+e.message)}
  return c});
})();

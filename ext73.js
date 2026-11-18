/* ext73 (v90): liga os elencos REAIS (ext72/RS72) às ligas principais: carreira no exterior, Times > Internacionais e mercado mundial. */
(function(){
const LET={G:'GOL',Z:'ZAG',L:'LAT',V:'VOL',M:'MEI',P:'PNT',A:'ATA'};
const cache={};
function real73(name){
  if(cache[name]!==undefined)return cache[name];
  const s=RS72[name];if(!s)return cache[name]=null;
  return cache[name]=s.split(';').map(e=>{const a=e.split('|');return {n:a[0],role:LET[a[1]],age:+a[2],ovr:+a[3],pot:+a[4],nat:a[5],v:+a[6]}});
}
globalThis.real73=real73;
/* 1) clube estrangeiro completo (carreira lá): troca o elenco gerado pelo real */
const _mk73=mkNat42;mkNat42=function(){
  const c=_mk73.apply(this,arguments);
  try{const R=real73(c.name);if(R){
    const gen=c.squad.map(id=>G.players[id]).filter(Boolean),used=new Set();
    for(const r of R){
      let p=gen.find(x=>x.role===r.role&&!used.has(x.id));
      if(p){used.add(p.id);const d=r.ovr-p.ovr;p.name=r.n;p.real=true;p.nat=r.nat;p.age=r.age;p.ovr=r.ovr;p.pot=Math.max(r.ovr,r.pot);
        for(const k in p.at)p.at[k]=clamp(Math.round(p.at[k]+d),25,96)}
      else{p=mkPlayer(r.role,r.ovr,r.age,c.id,r.n,true);p.nat=r.nat;p.pot=Math.max(p.ovr,r.pot);c.squad.push(p.id);try{p.fit[c.phil]=clamp(p.fit[c.phil]+10,5,99)}catch(e){}}
      try{NATF[r.n]=r.nat}catch(e){}NMS.add(r.n)}
    autoPick(c)}
  }catch(e){console.error('real73 '+e.message)}
  return c};
/* 2) Times > Internacionais: elenco real quando existir */
const _ws73=globalThis.wSquad69;
if(typeof _ws73==='function'){}
/* 3) mercado mundial: jogadores reais dos clubes com dados */
const _wm73=wmRefresh;wmRefresh=function(){
  _wm73.apply(this,arguments);
  try{const W=wd(),used=new Set();
    W.mk.l=W.mk.l.map(it=>{const R=real73(it.club);if(!R)return it;
      const cand=R.filter(r=>r.role!=='GOL'||it.role==='GOL').filter(r=>!used.has(r.n)).sort((a,b)=>Math.abs(a.ovr-it.ovr)-Math.abs(b.ovr-it.ovr));
      const r=cand[Math.floor(Math.random()*Math.min(3,cand.length))];if(!r)return it;used.add(r.n);
      const fee=+(valueOf({ovr:r.ovr,age:r.age})*rnd(1.0,1.3)).toFixed(1);
      try{NATF[r.n]=r.nat}catch(e){}
      return Object.assign({},it,{n:r.n,role:r.role,ovr:r.ovr,age:r.age,nat:r.nat,fee})}).sort((a,b)=>b.ovr-a.ovr)}catch(e){console.error('wm73 '+e.message)}
};
})();

// v141: confere elenco real na Série B/C/D do Brasil. Uso: node tools/sim/exp_bra_baixas.js
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
const r=await p.evaluate(()=>{newWorld();const out=[];
  for(const [div,n] of [[1,'Fortaleza'],[1,'Sport'],[2,'Náutico'],[2,'Brusque'],[3,null]]){
    const c=n?G.clubs.find(x=>x.name===n):G.clubs.filter(x=>x.div===div)[0];if(!c){out.push({n,erro:'sem clube'});continue}
    const sq=c.squad.map(id=>G.players[id]).filter(Boolean);
    out.push({clube:c.name,div:c.div,n:sq.length,top14:+(sq.map(x=>x.ovr).sort((a,b)=>b-a).slice(0,14).reduce((a,x)=>a+x,0)/14).toFixed(1),nomes:sq.slice(0,4).map(x=>x.name+' '+x.ovr)})}
  const real=G.clubs.slice(20,80).filter(c=>c.squad.map(i=>G.players[i]).some(p=>p&&p.real)).length;
  return {out,clubesComNomeReal:real,de:60}});
console.log(JSON.stringify(r,null,1));console.log(errs.slice(0,3));await b.close()})();

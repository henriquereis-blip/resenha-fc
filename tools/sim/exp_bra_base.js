// v135: compara elenco do jogo (Série A) com a base real BRA1. Uso: node tools/sim/exp_bra_base.js
const {open}=require('./setup_common');
(async()=>{const {b,p}=await open();
const r=await p.evaluate(()=>{newWorld();return G.clubs.slice(0,20).map(c=>{const o=c.squad.map(id=>G.players[id]).filter(Boolean).map(x=>x.ovr).sort((a,b)=>b-a);const t=o.slice(0,14);return {n:c.name,rep:c.rep,n_sq:o.length,top14:+(t.reduce((a,x)=>a+x,0)/t.length).toFixed(1),max:o[0]}})});
console.log(JSON.stringify(r));await b.close()})();

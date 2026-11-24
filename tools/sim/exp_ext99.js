// v136: confere se o elenco real (ext99) entra em clube estrangeiro. Uso: node tools/sim/exp_ext99.js "Peñarol"
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
const r=await p.evaluate((nm)=>{newWorld();const W=wd();const out={};
  for(const k in W.lg){const x=W.lg[k].cl.find(c=>c.n===nm);if(x){out.k=k;out.lid=x.id;break}}
  if(!out.k)return {erro:'clube não achado',lgs:Object.keys(W.lg)};
  const nid=natify(out.k,out.lid);const c=G.clubs[nid];
  const sq=c.squad.map(id=>G.players[id]).filter(Boolean);
  out.n=sq.length;out.nomes=sq.slice(0,12).map(x=>x.name+' '+x.role+' '+x.age+' '+x.ovr+' '+x.nat);
  out.top14=+(sq.map(x=>x.ovr).sort((a,b)=>b-a).slice(0,14).reduce((a,x)=>a+x,0)/14).toFixed(1);return out},process.argv[2]||'Peñarol');
console.log(JSON.stringify(r,null,1),errs);await b.close()})();

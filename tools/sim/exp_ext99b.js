// v138: confere elenco real de divisão baixa (ENG3 Wrexham, ENG4 Bradford City, GER3 Dynamo Dresden) numa carreira no exterior.
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
for(const [k,club] of [['ENG','Wrexham'],['ENG','Bradford City'],['ENG','Leicester City'],['GER','Dynamo Dresden']]){
 const r=await p.evaluate(([k,club])=>{newWorld();const W=wd();const x=W.lg[k].cl[0];natify(k,x.id);
  const c=G.clubs.find(c=>c.name===club);if(!c)return {club,erro:'não está no mundo',n:G.clubs.length,divs:[...new Set(G.clubs.map(c=>c.div))]};
  const sq=c.squad.map(id=>G.players[id]).filter(Boolean);return {club,div:c.div,n:sq.length,top14:+(sq.map(x=>x.ovr).sort((a,b)=>b-a).slice(0,14).reduce((a,x)=>a+x,0)/14).toFixed(1),nomes:sq.slice(0,5).map(x=>x.name+' '+x.ovr)}},[k,club]);
 console.log(JSON.stringify(r))}
console.log(errs);await b.close()})();

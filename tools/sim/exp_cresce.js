// v140: confere o crescimento do clube do técnico (ext102) com temporadas fictícias acima e abaixo da meta.
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
const r=await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  startCareer(G.clubs.find(c=>c.name==='Chapecoense').id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const out=[];const c0=userClub();out.push({passo:'início',rep:c0.rep,sp:c0.spBase,tv:c0.tv});
  for(const [pos,meta,champ] of [[3,12,0],[2,12,0],[1,12,1],[8,12,0],[18,12,0],[19,12,0]]){
    G.summary={season:G.season,pos,meta,champ:!!champ,goals:[],pat:{bd:50,fan:50},conf:60,pat2:0};
    newSeason();G.phase='play';S.modal=null;const c=userClub();
    out.push({pos,meta,champ,rep:c.rep,sp:c.spBase,tv:c.tv,div:c.div})}
  return {out,log:G.growLog}});
console.log(JSON.stringify(r));console.log(errs.slice(0,3));await b.close()})();

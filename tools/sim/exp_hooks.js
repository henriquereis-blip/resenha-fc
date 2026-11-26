// v140: auditoria de hooks mortos. Conta quantas vezes cada hook (core.js) dispara em 3 temporadas simuladas e lista os que nunca dispararam.
// Hooks de tela/clique naturalmente ficam em zero; o que importa é hook de motor (newSeason, finishRound, boardRound...) em zero.
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
const r=await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  for(const h of Object.values(HOOKS))for(const e of h.list){e.calls=0;const f=e.fn;e.fn=function(){e.calls++;return f.apply(this,arguments)}}
  startCareer(G.clubs.find(c=>c.name==='Palmeiras').id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  for(let s=0;s<3;s++){let g=0,o;while(g++<200){if(G.round%6===3)autoPick(userClub());startRound();while(!roundDone())stepAll();o=finishRound();if(o==='fired'||o==='seasonEnd')break}
    if(o==='fired'){const of=fireOffers();takeJob(of[0])}else if(!G.summary||G.summary.season!==G.season)endSeason();newSeason();G.phase='play';S.modal=null}
  const dead=[],alive=[];for(const h of Object.values(HOOKS))for(const e of h.list)(e.calls?alive:dead).push(h.fname+':'+e.label);
  return {total:dead.length+alive.length,vivos:alive.length,mortos:dead}});
console.log(JSON.stringify(r));console.log(errs.slice(0,3));await b.close()})();

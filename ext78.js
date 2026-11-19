/* ext78 (v92): modo de jogo. "Começar jogo novo" abre a escolha: COMPLETO (tudo: auxiliar, diretoria, tutorial, contratos)
   ou RÁPIDO (sem comissão/avisos, sem demissão, sem tutorial, sem veto, elenco renovado sozinho). Multiplayer continua separado. */
(function(){
const MODES=[
  {k:'full',ic:'🧩',t:'Completo',d:'Tudo: auxiliar e comissão avisam, diretoria cobra e pode demitir, contratos, tutorial.'},
  {k:'quick',ic:'⚡',t:'Rápido',d:'Só o jogo: sem avisos de comissão, sem demissão, sem veto da diretoria, sem tutorial. Elenco renova sozinho.'}
];
Object.assign(A,{
  newgame(){S.step=(S.mpSame||S.mplNew)?'coach':'modo';S.sc=null;S.sp=null;S.sa=null;S.obj=null;render();window.scrollTo(0,0)},
  qmode(d){S.qm=d.v==='quick'?'quick':'full';S.step='coach';render();window.scrollTo(0,0)}
});
function vModo(){
  const cards=MODES.map(m=>`<button class="mb20 pri" data-a="qmode" data-v="${m.k}"><span class="ic">${m.ic}</span><span><b>${m.t}</b><small>${m.d}</small></span></button>`).join('');
  return `<div class="wrap ti20"><button class="back" data-a="step" data-v="home">‹ Início</button>
  <h2>Modo de jogo</h2><p class="lead">Você pode mudar isso depois só começando outro jogo.</p>
  ${cards}
  <p class="foot">Quer jogar com os primos? Use Multiplayer local ou online na tela inicial.</p></div>`;
}
hookAround('vStart','vs78',function(next,__a){if((S.step||'home')==='modo')return vModo();return next()});
/* começo de carreira: marca o modo; rápido pula o tutorial */
hookAfter('startCareer','mode78',function(){
  G.quick=!!(S.qm==='quick');
  if(G.quick){G.tutDone=true;G._tutAsked=true}
  S.qm=null;
});
/* comissão some no modo rápido */
hookAround('staffAlerts','mode78',function(next,__a){if(G&&G.quick)return [];return next()});
/* demissão some no modo rápido */
hookAround('shouldFire','mode78',function(next,__a){if(G&&G.quick)return false;return next()});
/* no modo rápido o elenco renova sozinho antes da virada da temporada */
hookBefore('newSeason','mode78',function(){
  try{if(!G.quick)return;const c=userClub();if(!c)return;
    for(const id of c.squad){const p=P(id);if(p)p.ct=G.season+2}}catch(e){}
});
})();

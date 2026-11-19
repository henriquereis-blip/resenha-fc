/* ui12: divisões na interface, rebaixamento com demissão */
hookAround('vModal','vm12',function(next,__a){
  let h=next();const md=S.modal;
  if(md&&md.t==='season'&&G.summary&&G.summary.fired){
    h=h.replace('<button class="btn big" data-a="newseason">Próxima temporada</button>','<div class="x9"><div class="card alert9"><h3>🚪 Fim de ciclo</h3><p class="news">A diretoria decidiu não renovar com você após o rebaixamento. Hora de ouvir propostas.</p></div></div><button class="btn big" data-a="firedgo">Ver propostas de clubes</button>');
  }
  if(md&&md.t==='season'&&G.summary&&G.summary.divName){const s=G.summary;
    h=h.replace('<h3>Fim da temporada '+s.season+'</h3>','<h3>Fim da temporada '+s.season+' · '+s.divName+'</h3>');}
  return h;
});
const _tj12b=A.takejob;A.takejob=function(d){if(G.summary&&G.summary.fired){G.summary.fired=false}return _tj12b(d)};

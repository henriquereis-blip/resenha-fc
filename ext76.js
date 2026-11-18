/* ext76 (v92): contratos — duração, vencimento, renovação (1–5 anos) com salário individual e luvas, aviso do auxiliar. Usa só hooks. */
(function(){
const YF={1:1.10,2:1.03,3:1.0,4:0.97,5:0.95};   /* contrato mais longo = salário menor por ano */
const SPREAD=[0,1,1,2,2,3,3];
function ctOf(p){
  if(!p)return 0;
  if(p.ct===undefined){
    if(p.club===G.user&&p.wage!==undefined)p.ct=G.season+2;
    else p.ct=G.season+SPREAD[(p.id*13)%7]-(p.age>=33?1:0)+(p.age<=21?1:0);
    if(p.ct<G.season)p.ct=G.season;
  }
  return p.ct;
}
globalThis.ctOf=ctOf;
const yrsLeft=p=>ctOf(p)-G.season+1;
function terms(p,y){
  const cur=salOf(p),fair=(typeof wageFair==='function'?wageFair(p):cur)*(G.salMult||1);
  const q=pers(p),mood=q&&q.pm!==undefined?q.pm:60;
  const wage=+Math.max(fair*1.04*YF[y],cur*0.92).toFixed(2);
  const luvas=+(wage*0.12*y*(mood<45?1.3:1)).toFixed(2);
  return {wage,luvas,mood};
}
function canRenew(p,y){
  const c=userClub(),t=terms(p,y);
  if(t.mood<30)return 'Não quer renovar: está insatisfeito. Melhore o clima (jogos, moral) e tente depois.';
  if(p.age>=33&&y>2)return 'Com '+p.age+' anos ele só aceita até 2 anos.';
  if(p.age>=36&&y>1)return 'Com '+p.age+' anos ele só aceita 1 ano.';
  const bud=wageBudget(),pay=payroll(c)-salOf(p)+t.wage;
  if(pay>bud*(1+(G.board.conf-50)/250))return 'A diretoria barrou: a folha passaria do teto de '+mi(bud)+'.';
  if(G.fin.caixa<t.luvas)return 'Caixa insuficiente para as luvas ('+mi(t.luvas)+').';
  return null;
}
Object.assign(A,{
  rnw(d){const p=P(+d.id),y=+d.y;if(!p||p.club!==G.user||!YF[y])return;
    const e=canRenew(p,y);if(e){toast(e);return}
    const t=terms(p,y);G.fin.caixa=+(G.fin.caixa-t.luvas).toFixed(2);
    p.wage=t.wage;p.ct=Math.min(G.season+5,Math.max(ctOf(p),G.season)+y);
    const q=pers(p);if(q&&q.pm!==undefined)q.pm=clamp(q.pm+4,0,100);
    G.raises=(G.raises||[]).filter(r=>r.pid!==p.id);
    save();toast(lastName(p.name)+' renovou por '+y+' ano(s): '+mi(t.wage)+'/ano, luvas '+mi(t.luvas)+'.');render()}
});
/* card de contrato no perfil de jogador do SEU time */
hookAround('vPerfil','ct76',function(next,__a){
  let h=next();
  try{const p=P(S.prof);if(p&&p.club===G.user){
    const left=yrsLeft(p),tag=left<=1?'<b style="color:#e8a33d">vence esta temporada</b>':left+' temporadas';
    const btns=[1,2,3,4,5].map(y=>{const t=terms(p,y);return `<button class="btn sm ghost" data-a="rnw" data-id="${p.id}" data-y="${y}">${y} ano${y>1?'s':''} · ${mi(t.wage)}/ano · luvas ${mi(t.luvas)}</button>`}).join('');
    const card=`<div class="card"><div class="k">Contrato</div><div class="res"><span>Vai até</span><b>${ctOf(p)} (${tag})</b></div><div class="res"><span>Salário atual</span><b>${mi(salOf(p))}/ano</b></div><p class="news">Renovar: contrato maior = salário por ano menor, mas luvas maiores.</p><div class="row" style="flex-wrap:wrap;gap:6px">${btns}</div></div>`;
    h=h.replace('<div class="card"><div class="k">Estado e contrato</div>',card+'<div class="card"><div class="k">Estado e contrato</div>');
  }}catch(e){console.error('ct76 '+e.message)}
  return h;
});
/* vencimento: no começo da temporada, quem não renovou vai embora (livre). Sempre fica ao menos 20 jogadores */
hookAfter('newSeason','ct76',function(){
  const c=userClub();if(!c)return;
  const gone=c.squad.map(id=>P(id)).filter(p=>ctOf(p)<G.season).sort((a,b)=>b.ovr-a.ovr);
  if(!gone.length)return;
  const out=[];
  for(const p of gone){
    if(c.squad.length-out.length<=20){p.ct=G.season;p.wage=+(salOf(p)*1.0).toFixed(2);addNews('Sem opção no elenco, '+lastName(p.name)+' ganhou renovação automática de 1 ano.');continue}
    out.push(p);
  }
  for(const p of out){
    c.squad=c.squad.filter(id=>id!==p.id);p.club=-1;p.listed=false;delete p.wage;delete p.ct;
    G.free=G.free||[];G.free.push(p.id);
  }
  if(out.length){addNews('Fim de contrato: '+out.slice(0,4).map(p=>lastName(p.name)).join(', ')+(out.length>4?' e mais '+(out.length-4):'')+' deixaram o clube.');try{autoPick(c)}catch(e){}}
});
/* contratos de início de carreira ficam espalhados */
hookAfter('startCareer','ct76',function(){try{for(const id of userClub().squad)ctOf(P(id))}catch(e){}});
/* aviso do auxiliar */
hookAfter('staffAlerts','ct76',function(out){
  try{const c=userClub();if(!c||G.round<12)return;
    const l=c.squad.map(id=>P(id)).filter(p=>ctOf(p)<=G.season&&p.ovr>=c.squad.map(i=>P(i).ovr).sort((a,b)=>b-a)[13]).sort((a,b)=>b.ovr-a.ovr);
    if(l.length){const p=l[0];out.push({k:'ct',sev:G.round>=26?3:2,ic:'📝',txt:`${l.length} titular(es)/reserva importante(s) com contrato acabando (${l.slice(0,3).map(x=>lastName(x.name)).join(', ')}). Quem não renovar vai embora de graça no fim do ano.`,btn:'Ver '+lastName(p.name),a:'prof',id:p.id});out.sort((a,b)=>b.sev-a.sev)}
  }catch(e){}
});
})();

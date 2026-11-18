/* ext7: pilar financeiro — dívidas reais, orçamento, reunião com a diretoria, financiamento, manchetes */
/* Dados reais: dívida = ranking Fair Play (balanços até dez/2025, divulgado 22/10/2026); receita 2025 = Sports Value (mai/2026).
   [dívida R$ mi, receita R$ mi, situação no Fair Play Financeiro, estimado?]  Coritiba, Chapecoense e Remo: receita estimada (não está no top 20 da Sports Value). */
const FINREAL={
 PAL:[1130,1696,'ok'],FLA:[950,2089,'ok'],BOT:[1780,1388,'warn'],CAM:[2210,670,'warn45'],FLU:[1040,1022,'pend'],
 SAO:[917,1085,'warn45'],INT:[1050,655,'warn45'],GRE:[811,737,'warn45'],COR:[2080,971,'warn'],CRU:[1280,677,'rj'],
 BAH:[357,562,'ok'],VAS:[963,570,'warn'],CAP:[374,436,'closed'],SAN:[999,679,'warn'],RBB:[727,637,'ok'],
 VIT:[288,200,'warn'],CFC:[155,150,'closed',1],MIR:[7.4,180,'ok'],CHA:[171,120,'ok',1],REM:[37,110,'warn',1]};
const FPTXT={ok:'Sem pendências no Fair Play Financeiro/CBF',warn:'Advertido pelo Fair Play Financeiro por atrasos de pagamento',warn45:'Advertido: 45 dias para regularizar, risco de bloqueio de registro',rj:'Em recuperação judicial',pend:'Caso em análise no Fair Play Financeiro',closed:'Atrasos reconhecidos, caso encerrado'};
const FPMUL={ok:1,pend:.95,closed:1,warn:.9,warn45:.8,rj:.7};
const bi=v=>v>=1000?'R$ '+(v/1000).toFixed(2).replace('.',',')+' bi':'R$ '+(v>=100?Math.round(v):v.toFixed(1).replace('.',','))+' mi';
const fr=c=>FINREAL[c.sig]||[0,100,'ok'];
const baseInc=c=>c.tv+c.spBase;
const ratio0=c=>fr(c)[0]/fr(c)[1];
const clampN=(v,a,b)=>Math.max(a,Math.min(b,v));
function ex7(){
  if(!G)return;
  if(!G.fx)G.fx={obj:null,pay:.35,sd:.35,loanN:0,loanS:0,cut:null,advS:0,debt0:0,warned:false,warnDebt:0,ban:false,ms:{},zeroed:false,positive:false};
  for(const c of G.clubs){
    if(!c.rb){const m=clampN(fr(c)[1]/8/baseInc(c),1,1.35);c.tv=+(c.tv*m).toFixed(1);c.spBase=+(c.spBase*m).toFixed(1);c.rb=1}
    if(c.debt===undefined)c.debt=+(ratio0(c)*baseInc(c)).toFixed(1);
  }
}
const _ex7=ex;ex=function(){_ex7();ex7()};
ACH.saneador=['🧾','Saneador','Reduza a dívida do clube em 25%'];
ACH.zerou=['🏦','Dívida zero','Quite toda a dívida do clube'];
ACH.idolo=['🌟','Ídolo da torcida','Torcida acima de 88% com a dívida em queda'];

/* orçamento inicial: saúde financeira × riqueza × objetivo */
function budgetFor(c,o){
  const r=ratio0(c),h=clampN(1.25-0.62*r,0,1.25),w=clampN(fr(c)[1]/1200,0.6,1.35);
  return +(baseInc(c)*0.22*h*w*(FPMUL[fr(c)[2]]||1)*(o?o.bm:1)).toFixed(1);
}
function healthOf(c){const r=c.debt/baseInc(c);return r<.8?['ok','Saudável']:r<1.5?['warn','Atenção']:['bad','Crítica']}
function metaText(mp){return mp<=3?'Brigar pelo título (top '+mp+')':mp<=6?'Classificar para a Libertadores (top '+mp+')':mp<=11?'Terminar na parte de cima (top '+mp+')':'Fugir do rebaixamento (top '+mp+')'}
function objOptions(c){
  const M=metaFor(c),r=ratio0(c),mk=off=>typeof off==='string'?+off.slice(1):clampN(M+off,1,17);
  const O=(id,t,d,off,sd,pay,bm,conf,loan)=>({id,t,d,off,meta:mk(off),mt:metaText(mk(off)),sd,pay,bm,conf,loan:loan||0});
  if(r>=1.5)return[
   O('rec','Reconstrução financeira','Sem cair de divisão. Vende com inteligência, enxuga a folha e arruma a casa. A diretoria te dá tempo.','a16',.6,.55,1,72),
   O('equ','Equilibrar e sair do sufoco','Meio de tabela com as contas sob controle. Metade do dinheiro das vendas vai pra dívida.',0,.45,.4,1,62),
   O('apo','Aposta alta com empréstimo','Resultado já. Um empréstimo libera caixa agora, mas a dívida cresce e a cobrança é pesada.',-3,.25,.2,1,52,.3)];
  if(r>=.8)return[
   O('rec','Ajeitar a casa','Prioridade é pagar dívida e formar base. Orçamento mais enxuto.','a13',.55,.5,.8,68),
   O('equ','Equilíbrio e vaga continental','Brigar por cima sem estourar o caixa.',-1,.35,.3,1,60),
   O('tit','Brigar por título','Orçamento maior, mas a diretoria quer troféu.',-4,.2,.15,1.2,54)];
  return[
   O('tit','Título','O clube tem fôlego financeiro. A cobrança é por taça.',-4,.1,.1,1.25,55),
   O('lib','Competir com responsabilidade','Vaga continental e caixa saudável.',-1,.2,.2,1,62),
   O('pro','Projeto sustentável','Juniores e vendas inteligentes. Menos pressão, mais futuro.',+4,.35,.3,.8,70)];
}
function applyObj(id){
  ex7();const c=userClub(),o=objOptions(c).find(x=>x.id===id)||objOptions(c)[1];
  G.fx.obj=o.id;G.fx.pay=o.pay;G.fx.sd=o.sd;G.fx.ms={};G.fx.warned=false;G.fx.ban=false;G.fx.zeroed=false;G.fx.positive=false;G.fx.cut=null;G.fx.loanN=0;
  G.board.meta=o.meta;G.board.metaTxt=o.mt;G.board.conf=o.conf;
  G.fin.caixa=budgetFor(c,o);
  if(o.loan){const a=+(baseInc(c)*o.loan).toFixed(1);G.fin.caixa=+(G.fin.caixa+a).toFixed(1);c.debt=+(c.debt+a*1.15).toFixed(1);G.fx.loanN=1;G.fx.loanS=G.season}
  c.caixa=G.fin.caixa;G.fx.debt0=c.debt;G.fx.startS=G.season;
  const poor=G.fin.caixa<baseInc(c)*0.04;
  paperLine(poor?c.name+': '+G.coach+' assume com cofre vazio':G.coach+' assume o '+c.name+' com '+(o.id==='rec'?'missão de arrumar a casa':'novo projeto'),`${o.t}. Dívida de ${bi(fr(c)[0])} segue como herança. ${o.mt}.`);
}
const _sc7=startCareer;startCareer=function(id,coach,phil,asst){_sc7(id,coach,phil,asst);applyObj(S.obj);save()};
const _tj7=takeJob;takeJob=function(id){const r=_tj7(id);ex7();applyObj('equ');return r};

/* bloqueio de registro (estilo CBF/Fair Play) */
const _mb7=makeBid;makeBid=function(pid,fee){if(G&&G.fx&&G.fx.ban)return {ok:false,msg:'Registro bloqueado pela CBF até regularizar a dívida.'};return _mb7(pid,fee)};
const _sf7=signFree;signFree=function(pid){if(G&&G.fx&&G.fx.ban)return 'Registro bloqueado pela CBF até regularizar a dívida.';return _sf7(pid)};

/* parte das vendas vai pra dívida */
const _sl7=sellPlayer;sellPlayer=function(id){
  ex7();const o=G.offers.find(x=>x.id===id);const c=userClub();const d0=c.debt;
  const r=_sl7(id);
  if(!r&&o){const share=Math.min(c.debt,+(o.fee*G.fx.sd).toFixed(2));if(share>0){G.fin.caixa=+(G.fin.caixa-share).toFixed(2);c.debt=+(c.debt-share).toFixed(2);
    if(share>=2)paperLine('Venda de '+nameOf(P(o.pid)).replace('*','')+' alivia as contas do '+c.name,'Parte dos '+mi(o.fee)+' vai direto pra dívida: '+mi(share)+'.')}}
  return r;
};

/* dinâmica por rodada */
hookAround('finishRound','ext7_fr7',function(next,A){
  ex7();const c=userClub();const f=G.fin;const c0=f.caixa;
  const cf0=G.board.conf;
  const out=next();
  if(!c||c.id!==G.user)return out;
  {const dl=G.board.conf-cf0,pt={rec:.5,equ:.3}[G.fx.obj]||0;if(dl<0&&pt)G.board.conf=clampN(+(G.board.conf-dl*pt).toFixed(1),0,100)}
  const l=f.last||{net:0};
  const prevDebt=c.debt;
  const juros=c.debt*0.05/38;c.debt+=juros;
  let cut=0;if(G.fx.cut&&G.fx.cut.season===G.season)cut=G.fx.cut.val/38;
  const rr=c.debt/baseInc(c);const enc=(0.08+0.10*Math.min(rr,2.5))*baseInc(c)/38; // estrutura + encargos financeiros pagos em dinheiro
  f.caixa=+(f.caixa-enc-cut).toFixed(2);
  const sup=Math.max(0,l.net-enc-cut);
  const pay=Math.min(c.debt,sup*G.fx.pay);
  f.caixa=+(f.caixa-pay).toFixed(2);c.debt=+(c.debt-pay).toFixed(2);
  if(c.debt<0)c.debt=0;
  l.fin={juros:+juros.toFixed(2),enc:+enc.toFixed(2),pay:+pay.toFixed(2),cut:+cut.toFixed(2)};
  // confiança: queda de dívida agrada a diretoria
  const drop=prevDebt-c.debt;
  G.board.conf=clampN(+(G.board.conf+clampN(drop/baseInc(c)*20,-0.6,0.6)).toFixed(1),0,100);
  // marcos
  const d0=G.fx.debt0||1,pct=Math.round((1-c.debt/d0)*100);
  for(const m of [10,25,50,75]){if(pct>=m&&!G.fx.ms[m]){G.fx.ms[m]=1;
    paperLine(c.name+': dívida cai '+m+'% sob '+G.coach,m>=50?'Torcida já fala em ídolo. "Nunca vi o clube tão arrumado."':'Gestão financeira começa a aparecer no balanço.');
    if(m>=25)award('saneador')}}
  if(c.debt<=0.05&&!G.fx.zeroed&&d0>5){G.fx.zeroed=true;paperLine(c.name+' zera a dívida!','Sob o comando de '+G.coach+', o clube vira a página. Festa na arquibancada.');award('zerou')}
  if(!G.fx.positive&&c0<baseInc(c)*0.04&&f.caixa>baseInc(c)*0.1){G.fx.positive=true;paperLine('Cofre respira no '+c.name,'Caixa volta ao azul e a diretoria libera orçamento pra reforços.')}
  if(c.humor>=88&&c.debt<d0*0.8)award('idolo');
  // fair play financeiro
  const rn=c.debt/baseInc(c);
  if(rn>2&&G.round>=8&&!G.fx.warned&&c.debt>=d0*0.97){G.fx.warned=true;G.fx.warnDebt=c.debt;paperLine('Fair Play Financeiro notifica o '+c.name,'Prazo de 45 dias pra regularizar a dívida ou fica proibido de registrar jogadores.');addNews('Fiscalização notificou o clube: reduza a dívida.')}
  if(G.fx.warned&&!G.fx.ban&&G.round>=16&&c.debt>=G.fx.warnDebt*0.99&&rn>2){G.fx.ban=true;paperLine('Registro de jogadores bloqueado no '+c.name,'Sem acordo com o Fair Play Financeiro, o clube não pode contratar até pagar parte da dívida.')}
  if(G.fx.warned&&(c.debt<G.fx.warnDebt*0.97||rn<=2)){const was=G.fx.ban;G.fx.ban=false;G.fx.warned=false;paperLine(was?c.name+' regulariza e volta ao mercado':c.name+' cumpre acordo com o Fair Play Financeiro',was?'Bloqueio de registro é suspenso.':'Dívida em queda tira o clube da lista de risco.')}
  return out;
});
const _es7=endSeason;endSeason=function(){
  ex7();const c=userClub();const c0=G.fin.caixa;const r=_es7();
  const gain=G.fin.caixa-c0;const share=Math.min(c.debt,Math.max(0,gain*G.fx.sd*0.5));
  if(share>0){G.fin.caixa=+(G.fin.caixa-share).toFixed(1);c.debt=+(c.debt-share).toFixed(1)}
  if(G.summary)G.summary.txt+=` Dívida: ${mi(c.debt)} (${Math.round((1-c.debt/(G.fx.debt0||1))*100)}% a menos que no início da sua gestão).`;
  G.fx.cut=G.fx.cut&&G.fx.cut.season>G.season?G.fx.cut:null;
  return r;
};
hookAfter('newSeason','ext7_ns7',function(r,A){ex7();G.fx.loanN=0;});

/* telas */
function finTag(c){ex7();const f=fr(c),r=ratio0(c);return `dívida ${bi(f[0])} · ${r.toFixed(1)}× a receita · orçamento ~${mi(budgetFor(c,null))}`}
function objStep(sc){
  const c=C(sc);ex7();const opts=objOptions(c);if(S.obj&&!opts.find(o=>o.id===S.obj))S.obj=null;
  const f=fr(c),r=ratio0(c);const hc=r>=1.5?['bad','Crítica']:r>=.8?['warn','Atenção']:['ok','Saudável'];
  return `<h2>4 · Reunião com a diretoria</h2><div class="card fin"><div class="k">Situação do ${c.name}</div>
  <div class="res"><span>Dívida real (balanços de dez/2025)</span><b>${bi(f[0])}</b></div>
  <div class="res"><span>Receita 2025${f[3]?' (estimada)':''}</span><b>${bi(f[1])}</b></div>
  <div class="res"><span>Dívida / receita</span><b class="${hc[0]}">${r.toFixed(1)}× · ${hc[1]}</b></div>
  <div class="res"><span>No Fair Play Financeiro</span><b style="font:600 13px var(--fb);text-align:right;max-width:62%">${FPTXT[f[2]]}</b></div>
  <p class="news">No jogo a dívida é proporcional à receita do clube (${mi(+(r*baseInc(c)).toFixed(1))}). O que muda é o orçamento: clube endividado larga com pouco dinheiro e tem que se recuperar vendendo bem e economizando. Nada te impede de brigar por título.</p></div>
  <div class="phils">${opts.map(o=>`<button class="phil ${S.obj===o.id?'sel':''}" data-a="pickobj" data-o="${o.id}"><b>${o.t}</b><small>${o.d}<br><b>Meta:</b> ${o.mt} · <b>Orçamento inicial:</b> ${(()=>{const v=+(budgetFor(c,o)+(o.loan?baseInc(c)*o.loan:0)).toFixed(1);return v<0.05?'zero':mi(v)})()}${o.loan?' (com empréstimo)':''} · <b>${Math.round(o.sd*100)}%</b> das vendas pagam dívida</small></button>`).join('')}</div>`;
}
function finCard(){
  ex7();const c=userClub(),fx=G.fx,h=healthOf(c),d0=fx.debt0||c.debt||1,pct=clampN(Math.round((1-c.debt/d0)*100),-99,100);
  const loanAmt=+(baseInc(c)*0.22).toFixed(1),advAmt=+(c.tv*0.35).toFixed(1);
  const canLoan=(fx.loanS!==G.season?true:fx.loanN<2)&&!fx.ban||true;
  const l=G.fin.last&&G.fin.last.fin;
  return `<div class="card fin"><div class="k">Pilar financeiro · ${c.name}</div>
  <div class="res"><span>Dívida no jogo</span><b>${mi(c.debt)} <span class="pill ${h[0]}">${h[1]}</span></b></div>
  <div class="res"><span>Dívida real do clube (2025)</span><b>${bi(fr(c)[0])}</b></div>
  <div class="res"><span>Desde que você chegou</span><b class="${pct>=0?'ok':'bad'}">${pct===0?'':pct>0?'−':'+'}${Math.abs(pct)}% (${mi(d0)} → ${mi(c.debt)})</b></div>
  <div class="meter"><i class="${pct>=25?'ok':pct>=0?'warn':'bad'}" style="width:${clampN(pct,0,100)}%"></i></div>
  ${l?`<div class="k">Última rodada: juros +${mi(l.juros)} · estrutura e encargos ${mi(l.enc)} · amortização ${mi(l.pay)}${l.cut?' · TV antecipada −'+mi(l.cut):''}</div>`:''}
  <div class="k" style="margin-top:8px">Superávit usado pra pagar dívida: <b id="paylbl">${Math.round(fx.pay*100)}%</b></div><input type="range" id="paysl" min="0" max="70" step="5" value="${Math.round(fx.pay*100)}">
  <div class="k">Vendas que vão pra dívida: <b id="sdlbl">${Math.round(fx.sd*100)}%</b></div><input type="range" id="sdsl" min="0" max="70" step="5" value="${Math.round(fx.sd*100)}">
  <p class="news">Quanto mais você paga, menos sobra pra contratar. Dívida alta demais por muito tempo vira advertência do Fair Play Financeiro e, no limite, bloqueio de registro.${fx.warned?' <b>Você está em prazo do Fair Play Financeiro.</b>':''}${fx.ban?' <b class="bad">Registro bloqueado.</b>':''}</p>
  <div class="row2"><button class="btn ghost" data-a="loan">Empréstimo ${mi(loanAmt)}</button><button class="btn ghost" data-a="adv" ${fx.cut&&fx.cut.season>=G.season?'disabled':''}>Antecipar TV ${mi(advAmt)}</button></div>
  <div class="k">Empréstimo: entra caixa agora e a dívida sobe 18% do valor (máx. 2 por temporada). Antecipação: recebe 35% da TV agora e perde essa grana na temporada seguinte.</div></div>`;
}
const _vc7=vClube;vClube=function(){ex7();return _vc7().replace('<div class="wrap">','<div class="wrap">'+finCard())};
Object.assign(A,{
 pickobj(d){S.obj=d.o;render()},
 loan(){ex7();const c=userClub();if(G.fx.loanS!==G.season){G.fx.loanS=G.season;G.fx.loanN=0}
  if(G.fx.loanN>=2)return toast('Limite de 2 empréstimos por temporada.');
  const a=+(baseInc(c)*0.22).toFixed(1);G.fin.caixa=+(G.fin.caixa+a).toFixed(1);c.debt=+(c.debt+a*1.18).toFixed(1);G.fx.loanN++;G.board.conf=clampN(G.board.conf-2,0,100);
  paperLine(c.name+' toma empréstimo de '+mi(a),'Diretoria justifica reforços, oposição reclama da dívida.');toast('Empréstimo de '+mi(a)+' liberado.');save();render()},
 adv(){ex7();const c=userClub();if(G.fx.cut&&G.fx.cut.season>=G.season)return toast('Já existe uma antecipação ativa.');
  const a=+(c.tv*0.35).toFixed(1);G.fin.caixa=+(G.fin.caixa+a).toFixed(1);G.fx.cut={season:G.season+1,val:a};
  paperLine(c.name+' antecipa cotas de TV','Entram '+mi(a)+' agora; a receita do ano que vem fica menor.');toast('Antecipação de '+mi(a)+' recebida.');save();render()}
});
const _pc7=A.pickclub;A.pickclub=function(d){S.obj=null;return _pc7(d)};
document.addEventListener('input',e=>{const t=e.target;if(!t||!G||!G.fx)return;
  if(t.id==='paysl'){G.fx.pay=+t.value/100;const el=document.getElementById('paylbl');if(el)el.textContent=t.value+'%'}
  if(t.id==='sdsl'){G.fx.sd=+t.value/100;const el=document.getElementById('sdlbl');if(el)el.textContent=t.value+'%'}});
document.addEventListener('change',e=>{const t=e.target;if(t&&(t.id==='paysl'||t.id==='sdsl'))save()});

const _sm7=setMeta;setMeta=function(){_sm7();
  if(!G||!G.fx||!G.fx.obj||G.user===null||G.user===undefined)return;
  const c=userClub(),o=objOptions(c).find(x=>x.id===G.fx.obj);if(!o)return;
  const ss=Math.max(0,G.season-(G.fx.startS||G.season)),M=metaFor(c);
  const mp=typeof o.off==='string'?clampN(+o.off.slice(1)-2*ss,M,17):clampN(M+o.off,1,17);
  G.board.meta=mp;G.board.metaTxt=metaText(mp);
};

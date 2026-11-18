/* ext64 — lote 1 do feedback: livro-caixa financeiro, finanças clicáveis, agenda com forma em bolinhas,
   tema claro de verdade, opções/saves mais limpos, escolher país já no começo da carreira */

/* ---------- nome da competição do usuário (nada de "Série A" fixo) ---------- */
function compName64(){
  try{const m=ligaHead().match(/<b>([^<]+)<\/b>/);if(m)return m[1].replace(/&amp;/g,'&')}catch(e){}
  try{return 'Brasileirão '+DIVN[userDiv()]}catch(e){return 'Campeonato'}
}

/* ---------- LIVRO-CAIXA ---------- */
const LC64={
  gate:['Bilheteria','in'],tv:['TV','in'],sp:['Patrocínio','in'],bonus:['Bônus de patrocínio','in'],sale:['Venda de jogadores','in'],
  prize:['Copas, prêmios e outras receitas','in'],oin:['Outras receitas','in'],
  sal:['Salários','out'],mant:['Estádio','out'],buy:['Compra de jogadores','out'],glove:['Luvas e bônus de assinatura','out'],
  debt:['Juros e encargos','out'],obras:['Obras, base e marketing','out'],multa:['Multas e rescisões','out'],oout:['Outras despesas','out'],
  loan:['Empréstimo (entrada de caixa)','cap'],pay:['Pagamento de dívida','cap']
};
function led64(k,v,t,r){
  if(!G||!isFinite(v)||Math.abs(v)<.005)return;
  G.led=G.led||[];
  G.led.push({s:G.season,r:r==null?G.round:r,d:(typeof ymd==='function'?ymd(r==null?G.round:r):''),k,v:+v.toFixed(2),t:t||LC64[k][0]});
  if(G.led.length>1200)G.led=G.led.slice(-900);
}
const kind64=k=>LC64[k]?LC64[k][1]:'out';
function ledSum64(s){
  const t={in:0,out:0,cap:0},by={};
  for(const e of (G.led||[])){if(e.s!==s)continue;const kd=kind64(e.k);t[kd]+=e.v;by[e.k]=(by[e.k]||0)+e.v}
  return {t,by};
}

/* contexto de transferências (para dar nome às movimentações) */
let LCTX64=null;
if(typeof logX==='function'){const _lx64=logX;logX=function(p,from,to,fee){
  try{if(LCTX64){if(to===G.user)LCTX64.push({k:'buy',t:'Compra de '+nameOf(p)+(from>=0?' ('+C(from).sig+')':' (livre)')});else if(from===G.user)LCTX64.push({k:'sale',t:'Venda de '+nameOf(p)+(to>=0?' ('+C(to).sig+')':'')})}}catch(e){}
  return _lx64.apply(this,arguments)}}

/* rodada: quebra o que entrou/saiu por categoria; o resto vira "outras" (o livro sempre fecha com o caixa) */
const _fnr64=financeRound;financeRound=function(){G._fr64=1;return _fnr64.apply(this,arguments)};
const _fr64=finishRound;finishRound=function(){
  const G0=G;if(!G0||!G0.fin||!userClub())return _fr64.apply(this,arguments);
  const b0=G0.fin.caixa,rd=G0.round+1;G0._fr64=0;
  const out=_fr64.apply(this,arguments);
  try{
    if(G!==G0||!G.fin)return out;
    const L=G.fin.last;let sum=0;
    if(G._fr64&&L){
      const fl=L.fin||{};
      const items=[['gate',L.gate],['tv',L.tv],['sp',L.sp],['bonus',L.bonus],['sal',-L.sal],['mant',-L.mant],['debt',-((fl.juros||0)+(fl.enc||0))],['pay',-(fl.pay||0)]];
      for(const [k,v] of items){if(v&&Math.abs(v)>=.005){led64(k,v,null,rd-1);sum+=v}}
    }
    const resid=+(G.fin.caixa-b0-sum).toFixed(2);
    if(Math.abs(resid)>=.005)led64(resid>0?'prize':'oout',resid,resid>0?(G._fr64?'Outras receitas da rodada':'Copas, prêmios e outras receitas'):'Outras despesas da rodada',rd-1);
    let i=0,o=0;for(const e of G.led||[]){if(e.s===G.season&&e.r===rd-1&&e.k!=='_'){const kd=kind64(e.k);if(kd==='in')i+=e.v;else if(kd==='out')o+=e.v}}
    S.rfin={n:rd,in:+i.toFixed(2),out:+o.toFixed(2),net:+(i+o).toFixed(2)};
  }catch(e){console.error('led64 '+e.message)}
  return out;
};

/* ações do jogador que mexem no caixa (compras, vendas, obras, multas, patrocínios...) */
const LSKIP64=/^(sl|sb|mp|cloud|imp|exp|reset|tomenu|newgame|begin|pickclub|fjobgo|step|nav|theme)/;
function ledAct64(k,dd,ctx){
  const lbl={sponsor:'Patrocínio assinado',spnmode:'Patrocínio assinado',spnslot:'Patrocínio extra'}[k];
  if(ctx&&ctx.length){
    const kd=ctx[0].k;led64(kd==='buy'?'buy':'sale',dd,ctx.map(c=>c.t).join(' + '));return;
  }
  if(/spn|sponsor|slot|naming|mkt?s?ign|mk.*(sign|take)/i.test(k)&&dd>0){led64('sp',dd,lbl||'Patrocínio recebido (à vista)');return}
  if(/loan|emprest|dir.*prest|board.*loan/i.test(k)){led64(dd>0?'loan':'pay',dd,dd>0?'Empréstimo da diretoria':'Pagamento de empréstimo');return}
  if(/multa|resc|fee/i.test(k)){led64('multa',dd);return}
  if(dd<0&&/est|obra|build|mk|mark|base|torc|stad|youth|cmd|aux|asst|coach|staff/i.test(k)){led64('obras',dd);return}
  led64(dd>0?'oin':'oout',dd,(dd>0?'Receita: ':'Gasto: ')+k);
}
(function(){
  for(const k of Object.keys(A)){
    const f=A[k];if(typeof f!=='function'||f._lw||LSKIP64.test(k))continue;
    A[k]=Object.assign(function(d){
      const G0=G,s0=G&&G.season,f0=G&&G.fin,b=f0?f0.caixa:null,prev=LCTX64;LCTX64=[];let r;
      try{r=f.apply(this,arguments)}
      finally{
        const ctx=LCTX64;LCTX64=prev;
        try{if(b!==null&&G===G0&&G.fin&&G.season===s0&&G.phase!=='start'&&!S.match){const dd=+(G.fin.caixa-b).toFixed(2);if(Math.abs(dd)>=.005)ledAct64(k,dd,ctx)}}catch(e){}
      }
      return r;
    },{_lw:1});
  }
})();

/* ---------- Finanças: receita/despesa/folha clicáveis ---------- */
function entRow64(e){
  const kd=kind64(e.k);
  return `<div class="res"><span>${esc(e.t)}<br><small class="k">${esc(e.d||'')} · ${esc((LC64[e.k]||[''])[0])}</small></span><b class="${e.v>=0?'ok':'bad'}">${e.v>=0?'+':''}${mi(e.v)}</b></div>`;
}
function vLed64(){
  const v=S.ledv,c=userClub(),{t,by}=ledSum64(G.season);
  const back=`<button class="btn ghost sm" data-a="ledclose">← Voltar às finanças</button>`;
  if(v==='sal'){
    const rows=c.squad.map(id=>P(id)).sort((a,b)=>salOf(b)-salOf(a));
    const tot=rows.reduce((s,p)=>s+salOf(p),0);
    return `<div class="wrap x9">${back}<h2>Folha de salários</h2>
    <p class="news">A folha anual de <b>${mi(tot)}</b> não sai de uma vez: ela é dividida em 38 parcelas e <b>${mi(tot/38)}</b> é debitado do caixa depois de cada rodada.</p>
    <div class="card">${rows.map(p=>`<div class="res"><span>${esc(nameOf(p))}<br><small class="k">${roleLabel(p)} · ${p.age} anos${p.ct!=null?' · contrato até '+(2026+G.season+p.ct-1):''}</small></span><b>${mi(salOf(p))}<small class="k">/ano</small></b></div>`).join('')}</div></div>`;
  }
  const kind=v==='in'?'in':'out';
  const cats=Object.keys(by).filter(k=>kind64(k)===kind).sort((a,b)=>Math.abs(by[b])-Math.abs(by[a]));
  const ents=(G.led||[]).filter(e=>e.s===G.season&&kind64(e.k)===kind).slice().reverse().slice(0,80);
  const cap=(G.led||[]).filter(e=>e.s===G.season&&kind64(e.k)==='cap').slice().reverse().slice(0,10);
  return `<div class="wrap x9">${back}<h2>${v==='in'?'Receita':'Despesa'} da temporada</h2>
  <div class="fh"><div class="lab">Total</div><div class="cx">${mi(Math.abs(t[kind]))}</div></div>
  <div class="card"><div class="k">Por categoria</div>${cats.length?cats.map(k=>`<div class="res"><span>${esc(LC64[k]?LC64[k][0]:k)}</span><b>${mi(Math.abs(by[k]))}</b></div>`).join(''):'<p class="news">Nada registrado ainda. Jogue uma rodada.</p>'}</div>
  <div class="card"><div class="k">Movimentações (mais recentes)</div>${ents.length?ents.map(entRow64).join(''):'<p class="news">Sem movimentações.</p>'}</div>
  ${cap.length?`<div class="card"><div class="k">Financiamento (não conta como receita nem despesa)</div>${cap.map(entRow64).join('')}</div>`:''}</div>`;
}
const _vcl64=vClube;vClube=function(){
  if(S.ledv)return vLed64();
  let h=_vcl64.apply(this,arguments);
  try{
    const {t}=ledSum64(G.season),inc=t.in,exp=-t.out,res=inc-exp,c=userClub();
    const folha=c.squad.reduce((s,id)=>s+salOf(P(id)),0);
    const a=h.indexOf('<div class="row2">');
    if(a>=0){
      const bEnd=h.indexOf('Folha anual',a);const e=h.indexOf('</div></div></div>',bEnd);
      if(bEnd>0&&e>0){
        const blk=`<div class="row2">
 <button class="kp tap64" data-a="ledopen" data-v="in"><div class="k">Receita da temporada ›</div><div class="v ok">${mi(inc)}</div></button>
 <button class="kp tap64" data-a="ledopen" data-v="out"><div class="k">Despesa da temporada ›</div><div class="v bad">${mi(exp)}</div></button>
 <div class="kp"><div class="k">Resultado</div><div class="v ${res>=0?'ok':'bad'}">${res>=0?'+':''}${mi(res)}</div></div>
 <button class="kp tap64" data-a="ledopen" data-v="sal"><div class="k">Folha anual ›</div><div class="v">${mi(folha)}</div></button>`;
        h=h.slice(0,a)+blk+h.slice(e+'</div></div>'.length);
      }
    }
    if(S.rfin){
      const r=S.rfin,card=`<div class="card"><div class="k">Última rodada (${r.n})</div><div class="res"><span>Entrou</span><b class="ok">+${mi(r.in)}</b></div><div class="res"><span>Saiu</span><b class="bad">${mi(r.out)}</b></div><div class="res"><span>Saldo</span><b class="${r.net>=0?'ok':'bad'}">${r.net>=0?'+':''}${mi(r.net)}</b></div></div>`;
      h=h.replace('<div class="row2">',card+'<div class="row2">');
    }
  }catch(e){console.error('vcl64 '+e.message)}
  return h;
};
Object.assign(A,{
  ledopen(d){S.ledv=d.v;render();window.scrollTo(0,0)},
  ledclose(){S.ledv=null;render();window.scrollTo(0,0)}
});
/* mostra o dinheiro da rodada no fim de cada rodada */
const _vm64=vModal;vModal=function(){
  let h=_vm64.apply(this,arguments);
  try{const md=S.modal;if(md&&md.t==='round'&&S.rfin){
    const r=S.rfin,k='<button class="btn big" data-a="roundok">';
    const card=`<div class="card"><div class="k">💰 Balanço financeiro da rodada</div><div class="res"><span>Entrou</span><b class="ok">+${mi(r.in)}</b></div><div class="res"><span>Saiu</span><b class="bad">${mi(r.out)}</b></div><div class="res"><span>Saldo</span><b class="${r.net>=0?'ok':'bad'}">${r.net>=0?'+':''}${mi(r.net)}</b></div></div>`;
    if(h.includes(k))h=h.replace(k,card+k);
  }}catch(e){}
  return h;
};

/* ---------- Agenda: adversário com as últimas 5 rodadas em bolinhas ---------- */
function dots64(id){
  const f=formOf(id,5);
  return `<span class="dots64">${f.map(x=>`<i class="${x}"></i>`).join('')}${'<i class="n"></i>'.repeat(Math.max(0,5-f.length))}</span>`;
}
vAgenda=function(){
  const out=[];for(let r=G.round;r<Math.min(NR(),G.round+10);r++){const f=fixMine(r);if(f)out.push([r,f])}
  return `<div class="wrap"><h2>Agenda</h2><div class="card"><div class="k">Próximos adversários · ${esc(compName64())}</div>${out.map(([r,f])=>{
    const home=f[0]===G.user,o=C(home?f[1]:f[0]);
    return `<div class="ag64"><em class="${home?'h':'a'}">${home?'CASA':'FORA'}</em><div class="tm">${crest(o,22)}<div><b>${esc(o.name)}</b>${dots64(o.id)}</div></div></div>`}).join('')||'<p class="news">Sem jogos.</p>'}</div>
  <div class="card"><div class="k">Resultados</div>${G.myres.length?G.myres.slice().reverse().slice(0,20).map(m=>`<div class="res"><span>${esc(C(m.h).name)} <b>${m.hg}–${m.ag}</b> ${esc(C(m.a).name)}</span></div>`).join(''):'<p class="news">Nenhum jogo disputado.</p>'}</div></div>`;
};

/* ---------- Tabelas: a tabela vem primeiro, resultados da rodada vão pra baixo ---------- */
const _vl64=vLiga;vLiga=function(){
  let h=_vl64.apply(this,arguments);
  try{const a=h.indexOf('<div class="card res40">');if(a>=0){const e=h.indexOf('<div class="tbl',a);if(e>a){const card=h.slice(a,e);h=h.slice(0,a)+h.slice(e)+card}}}catch(x){}
  return h;
};

/* ---------- Opções mais limpas ---------- */
function cut64(h,startMark,nextMark){
  const a=h.indexOf(startMark);if(a<0)return h;
  const e=h.indexOf(nextMark,a+startMark.length);
  return e>a?h.slice(0,a)+h.slice(e):h;
}
const _vo64=vOpcoes;vOpcoes=function(){
  let h=_vo64.apply(this,arguments);
  try{
    h=h.replace('<div class="card"><button class="btn ghost" data-a="posrules">📐 Regras de jogador fora de posição</button></div>','');
    h=cut64(h,'<div class="card"><div class="k">💾 Backup em arquivo</div>','<div class="card">');
    h=cut64(h,'<div class="card"><div class="k">☁️ Backup na nuvem</div>','<div class="card">');
    h=h.replace('<button class="btn sm ghost" data-a="theme" data-v="">Auto</button>','');
    h=h.replace(/<button class="btn sm" data-a="sbload" data-i="\d">Carregar<\/button>/g,'');
    h=h.replace('<div class="card"><div class="k">Salvar jogo</div>','<div class="card"><button class="btn big" data-a="tomenu">🏠 Voltar ao início</button><p class="news">Seu jogo é salvo antes de sair. Pra carregar outro save, é pela tela inicial.</p></div><div class="card"><div class="k">Salvar jogo</div>');
  }catch(e){console.error('vo64 '+e.message)}
  return h;
};

/* "Brasileirão - Série A" fixo na home: troca pelo nome certo da competição */
const _rd64=render;render=function(){
  const r=_rd64.apply(this,arguments);
  try{if(G&&G.phase!=='start'&&!S.match){const nm=compName64().replace(/^Brasileirão\s+/,'Brasileirão - ');
    document.querySelectorAll('.sm,.sm2').forEach(el=>{if(el.textContent.indexOf('Brasileirão - Série A')>=0&&!/Série A/.test(nm))el.textContent=el.textContent.replace('Brasileirão - Série A',nm)})}}catch(e){}
  return r;
};

/* ---------- Escolher país já na criação da carreira ---------- */
const _vcs64=vClubStep;vClubStep=function(){
  let h=_vcs64.apply(this,arguments);
  try{
    const chips=`<div class="cw64"><button class="${S.cwk==null?'on':''}" data-a="cwk" data-v="">🇧🇷 Brasil</button>${WLD.map(w=>`<button class="${S.cwk===w.k?'on':''}" data-a="cwk" data-v="${w.k}">${w.f} ${esc(w.n)}</button>`).join('')}</div>`;
    h=h.replace('<div class="seg sm">',chips+'<div class="seg sm">');
    if(S.cwk!=null){
      const w=WLD.find(x=>x.k===S.cwk);
      if(w){
        const list=w.cl.map((c,i)=>[c,i]).sort((a,b)=>b[0][1]-a[0][1]);
        h=h.replace(/<div class="seg sm">[\s\S]*?<\/div>\s*<div class="clubs">[\s\S]*<\/div><\/div>$/,
          `<p class="hint">${w.f} ${esc(w.lg)} — você começa numa proposta de lá; as divisões de baixo aparecem com acesso e rebaixamento.</p><div class="clubs">${list.map(([c,i])=>`<button class="club ${S.cwi===i?'sel':''}" data-a="cwpick" data-i="${i}"><span class="cn">${esc(c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'))}<small>${esc(w.lg)}</small></span><span class="rep">${c[1]}</span></button>`).join('')}</div></div>`);
      }
    }
  }catch(e){console.error('vcs64 '+e.message)}
  return h;
};
Object.assign(A,{
  cwk(d){S.cwk=d.v||null;S.cwi=null;S.sc=null;render()},
  cwpick(d){
    const w=WLD.find(x=>x.k===S.cwk);if(!w)return;
    const i=+d.i,rep=w.cl[i][1];S.cwi=i;
    /* clube-base só pra montar objetivos/auxiliares; vira o clube de fora logo depois */
    const base=G.clubs.slice(0,20).sort((a,b)=>Math.abs(a.rep-rep)-Math.abs(b.rep-rep))[0];
    S.sc=base.id;S.cpv='res';S.sp=null;S.sa=null;S.obj=null;S.step='setup';render();window.scrollTo(0,0)
  }
});
const _vsu64=vSetup;vSetup=function(){
  let h=_vsu64.apply(this,arguments);
  try{if(S.cwk!=null&&S.cwi!=null){const w=WLD.find(x=>x.k===S.cwk),nm=w.cl[S.cwi][0].replace(/-(URU|PAR|ECU)$/,' ($1)');
    h=h.replace(/‹ [^<]*<\/button>/,'‹ Clubes</button>').replace('<h2>Filosofia do clube</h2>',`<h2>${esc(nm)}</h2><p class="hint">${w.f} ${esc(w.lg)}</p><h2>Filosofia do clube</h2>`).replace('data-v="preview"','data-v="club"')}}catch(e){}
  return h;
};
const _bg64=A.begin;A.begin=function(){
  if(S.cwk==null||S.cwi==null)return _bg64.apply(this,arguments);
  const k=S.cwk,i=S.cwi;
  _bg64.apply(this,arguments);
  try{
    ex();const lid=wd().lg[k].cl[i].id;G.phase='play';
    if(emigrate(lid)){G.board&&(G.board.conf=60);G.news=[];G.view='inicio';S.modal={t:'sponsor'}}
  }catch(e){console.error('cw64 '+e.message)}
  S.cwk=null;S.cwi=null;render();window.scrollTo(0,0);
};

/* ---------- visual ---------- */
(function(){const st=document.createElement('style');st.id='ds64';st.textContent=`
.tap64{display:block;width:100%;text-align:left;font:inherit;color:inherit;cursor:pointer;-webkit-tap-highlight-color:transparent}
.tap64:active{transform:scale(.98)}
.dots64{display:flex;gap:4px;margin-top:5px}
.dots64 i{width:9px;height:9px;border-radius:50%;background:#2fd36f}
.dots64 i.E{background:#9aa3b5}.dots64 i.D{background:#ff5c70}.dots64 i.n{background:transparent;border:1px solid var(--line)}
.ag64{display:flex;align-items:center;gap:12px;padding:11px 2px;border-bottom:1px solid var(--line)}
.ag64:last-child{border-bottom:0}
.ag64 em{font:800 10px/1 var(--fh);letter-spacing:.1em;font-style:normal;padding:5px 7px;border-radius:7px;min-width:46px;text-align:center;background:var(--card2);color:var(--mut)}
.ag64 em.h{background:rgba(53,240,160,.14);color:var(--accent)}
.ag64 .tm{display:flex;align-items:center;gap:10px;min-width:0}.ag64 .tm b{display:block;font-size:15px}
.cw64{display:flex;gap:6px;overflow-x:auto;padding:2px 0 10px;margin:0 -2px;-webkit-overflow-scrolling:touch}
.cw64 button{flex:0 0 auto;border:1px solid var(--line);background:var(--card);color:var(--fg);border-radius:999px;padding:8px 12px;font:600 13px var(--fb);white-space:nowrap}
.cw64 button.on{background:var(--accent);color:#04120c;border-color:var(--accent)}
/* tema claro de verdade */
:root[data-theme="light"]{--bg:#f2f5fa;--card:#ffffff;--card2:#eaeff7;--fg:#10182b;--mut:#5a6683;--line:#d3dbea;--accent:#0c9a68;--accent2:#a87a00;--blue:#2457d6;--bad:#d1334a;--warn:#b86e0a;--ok:#0c9a68;--nav:#ffffff;--navfg:#10182b;--glow:0 6px 18px rgba(12,154,104,.18);color-scheme:light}
:root[data-theme="light"] html,html[data-theme="light"]{background:#f2f5fa}
:root[data-theme="light"] body{background:var(--bg)!important;color:var(--fg)}
:root[data-theme="light"] .btn:not(.ghost){color:#fff}
:root[data-theme="light"] .btn.ghost,:root[data-theme="light"] .btn.sm.ghost{color:var(--fg);border-color:var(--line)}
:root[data-theme="light"] .card,:root[data-theme="light"] .kp,:root[data-theme="light"] .fh{box-shadow:0 1px 3px rgba(16,24,43,.08)}
`;document.head.appendChild(st)})();

/* lembra o tema escolhido */
(function(){try{const v=SKV.getItem('rfc_theme');if(v)document.documentElement.setAttribute('data-theme',v)}catch(e){}})();
const _th64=A.theme;A.theme=function(d){try{SKV.setItem('rfc_theme',d.v||'dark')}catch(e){}return _th64.apply(this,arguments)};

/* ---------- proposta recebida: botão pra ver o perfil do jogador ---------- */
const _mh64=mailHtml;mailHtml=function(){
  let h=_mh64.apply(this,arguments);
  try{const md=S.modal;if(md&&md.id){const m=mailBox().find(x=>x.id===md.id);
    if(m&&m.acts){let pid=null;for(const a of m.acts){if(a.p&&a.p.oid!=null){const o=(G.offers||[]).find(x=>x.id===a.p.oid);if(o){pid=o.pid;break}}if(a.p&&a.p.pid!=null){pid=a.p.pid;break}}
      if(pid!=null&&P(pid)){const btn=`<button class="btn ghost" data-a="mprof" data-id="${pid}">👤 Ver perfil de ${esc(nameOf(P(pid)))}</button> `;h=h.replace('<div><button class="btn','<div>'+btn+'<button class="btn')}}}}catch(e){}
  return h;
};
Object.assign(A,{mprof(d){S.modal=null;G.view='elenco';S.prof=+d.id;render();window.scrollTo(0,0)}});

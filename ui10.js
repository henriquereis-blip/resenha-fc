/* ui10: técnico RPG, empréstimos no mercado, dashboard financeiro */
(function(){const st=document.createElement('style');st.textContent=`
.x9 .mgrow{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}.x9 .mgrow:last-child{border:0}
.x9 .mgrow .ic{width:34px;height:34px;border-radius:9px;background:var(--line);display:grid;place-items:center;font-size:17px}
.x9 .mgrow b.t{font:800 17px var(--fh);letter-spacing:.03em;text-transform:uppercase}.x9 .mgrow .mb{height:9px;background:var(--line);border-radius:9px;overflow:hidden;margin:3px 0}.x9 .mgrow .mb i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),#6ee7a2)}
.x9 .mgrow small{display:block;color:var(--mut);font-size:12px;line-height:1.25}.x9 .stp{display:flex;align-items:center;gap:6px}.x9 .stp b{font:800 22px var(--fh);min-width:20px;text-align:center}
.x9 .stp button{width:30px;height:30px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:inherit;font:800 18px var(--fh);cursor:pointer}.x9 .stp button:disabled{opacity:.3}
.x9 .pre{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:10px}.x9 .pre button{display:flex;gap:8px;align-items:center;text-align:left;padding:8px;border-radius:10px;border:1.5px solid var(--line);background:var(--card);color:inherit;cursor:pointer;font:inherit}
.x9 .pre button.sel{border-color:var(--accent);background:rgba(10,154,74,.1)}.x9 .pre button span{font-size:24px}.x9 .pre button b{font:800 16px var(--fh);letter-spacing:.03em;text-transform:uppercase;display:block}.x9 .pre button small{font-size:11px;color:var(--mut);line-height:1.2;display:block}
.x9 .xp{height:10px;background:rgba(255,255,255,.18);border-radius:10px;overflow:hidden}.x9 .xp i{display:block;height:100%;background:#ffcc00}
.x9 .fh{background:linear-gradient(150deg,#0c2a1c,#14503a);color:#fff;border-radius:18px;padding:16px}.x9 .fh .lab{font:700 12px var(--fh);letter-spacing:.12em;text-transform:uppercase;opacity:.75}
.x9 .fh .cx{font:800 46px var(--fh);line-height:1;margin:2px 0}.x9 .fh .dl{display:inline-block;padding:3px 10px;border-radius:14px;background:rgba(255,255,255,.14);font:700 13px var(--fh);letter-spacing:.04em}.x9 .fh .dl.up{background:rgba(47,211,111,.28)}.x9 .fh .dl.dn{background:rgba(255,90,82,.3)}
.x9 .kp{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px}.x9 .kp .v{font:800 26px var(--fh);line-height:1.05}.x9 .kp .v.ok{color:var(--ok)}.x9 .kp .v.bad{color:var(--bad)}.x9 .kp .k{font-size:11px}
.x9 .area{width:100%;height:120px}.x9 .exp{display:grid;grid-template-columns:96px minmax(0,1fr) auto;gap:8px;align-items:center;padding:4px 0;font-size:13px}.x9 .exp .pb{height:8px;background:var(--line);border-radius:8px;overflow:hidden}.x9 .exp .pb i{display:block;height:100%;background:var(--bad);opacity:.8}.x9 .exp b{font:800 15px var(--fh)}
.x9 .go{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.x9 .go button{border:1px solid var(--line);background:var(--card);color:inherit;border-radius:12px;padding:10px 4px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;font:700 12px var(--fh);letter-spacing:.04em;text-transform:uppercase}.x9 .go button span{font-size:22px}
.x9 .tg{display:flex;gap:6px;flex-wrap:wrap}.x9 .tg .pill{cursor:default}
`;document.head.appendChild(st)})();

/* ---------- criação do técnico ---------- */
function mgCreator(){
  const s=S.mg,pool=MGPOOL0-mgSum(s.a);
  return `<h2>Seu técnico</h2><p class="hint">Cada ponto muda o jogo de verdade: partida, treino, dinheiro, mercado, base e torcida. Escolha um estilo pronto ou monte o seu (${MGPOOL0} pontos, máx. ${MGMAX0} por atributo). Você ganha mais pontos subindo de nível.</p>
  <div class="x9"><div class="pre">${Object.entries(MGP).map(([k,p])=>`<button class="${s.k===k?'sel':''}" data-a="mgp" data-k="${k}"><span>${p.e}</span><div><b>${p.n}</b><small>${p.d}</small></div></button>`).join('')}</div>
  <div class="card"><div class="res"><span><b>${mgTitle(s.a)}</b></span><span class="pill ${pool===0?'ok':''}">${pool} ponto(s) livre(s)</span></div>
  ${MGA.map(([k,n,e])=>`<div class="mgrow"><div class="ic">${e}</div><div><b class="t">${n}</b><div class="mb"><i style="width:${s.a[k]*10}%"></i></div><small>${MGFX[k](s.a[k])}</small></div><div class="stp"><button data-a="mgadj" data-k="${k}" data-d="-1" ${s.a[k]<=2?'disabled':''}>−</button><b>${s.a[k]}</b><button data-a="mgadj" data-k="${k}" data-d="1" ${s.a[k]>=MGMAX0||pool<=0?'disabled':''}>+</button></div></div>`).join('')}</div></div>`;
}
const _vs10=vStart;vStart=function(){
  if(!S.mg)S.mg=mgNew('equil');
  return _vs10().replace('<h2>1 · Escolha o clube</h2>',mgCreator()+'<h2>1 · Escolha o clube</h2>');
};

/* ---------- Meu técnico ---------- */
function vMeuTec(){
  ex();const m=mgrOf(),c=userClub(),need=mgXpNeed(m.lvl);
  return `<div class="wrap x9"><h2>Meu técnico</h2>
  <div class="hero9" style="grid-template-columns:1fr"><div><div class="s">${esc(G.coach)}</div><div class="t">${mgTitle(m.a)}</div>
   <div class="chips"><span class="chip">Nível ${m.lvl}</span><span class="chip">${m.pts>0?m.pts+' ponto(s) para gastar':'sem pontos livres'}</span><span class="chip">${c.name}</span></div>
   <div class="s" style="margin-top:10px">XP ${m.xp} / ${need}</div><div class="xp"><i style="width:${m.xp/need*100}%"></i></div>
   <div class="s" style="margin-top:6px">Vitória +10 XP · empate +4 · fim de temporada +40 (+50 no G-4, +120 pelo título)</div></div></div>
  <section class="sec card"><h3>Atributos<small>${m.pts>0?m.pts+' ponto(s)':'nível '+m.lvl}</small></h3>
  ${MGA.map(([k,n,e])=>`<div class="mgrow"><div class="ic">${e}</div><div><b class="t">${n}</b><div class="mb"><i style="width:${m.a[k]*10}%"></i></div><small>${MGFX[k](m.a[k])}</small></div><div class="stp"><b>${m.a[k]}</b><button data-a="mgspend" data-k="${k}" ${m.pts>0&&m.a[k]<10?'':'disabled'}>+</button></div></div>`).join('')}
  <p class="foot">Atributo 4 é neutro. Acima disso você ganha vantagem, abaixo vira desvantagem. Pontos só podem ser colocados, nunca tirados.</p></section></div>`;
}

/* ---------- Mercado: empréstimos ---------- */
const _vm10=vMercado;vMercado=function(){
  let r=_vm10();
  const m=r.match(/^<div class="wrap">(<div class="seg[\s\S]*?<\/div>)/);if(!m)return r;
  const tabs=m[1].replace(/<\/div>$/,`<button class="${S.tab==='emp'?'on':''}" data-a="tab" data-t="emp">Empréstimos (${Object.values(G.players).filter(p=>p.loanable).length})</button></div>`);
  if(S.tab!=='emp')return '<div class="wrap">'+tabs+r.slice(m[0].length);
  const outs=loanOuts(),ins=loanIns();
  const row=p=>`<div class="mrow"><span class="pos">${roleLabel(p)}</span><button class="nm" data-a="prof" data-id="${p.id}" style="background:none;border:0;text-align:left;color:inherit;font:inherit;padding:0">${esc(nameOf(p))}<small>${p.club>=0?C(p.club).sig+' · ':''}${p.age}a · valor ${mi(valueOf(p))}</small></button><span class="ovr">${p.ovr}</span></div>`;
  const av=Object.values(G.players).filter(p=>p.loanable&&p.club>=0&&p.club!==G.user).sort((a,b)=>b.ovr-a.ovr).slice(0,50);
  return '<div class="wrap x9">'+tabs+`<div class="hint">Empréstimo dura até o fim da temporada. Você paga uma taxa e o salário, e pode exercer a opção de compra. Emprestar garoto seu rende taxa e ele volta mais experiente.</div>
  ${outs.length?`<section class="sec card"><h3>Emprestados por mim<small>${outs.length}</small></h3>${outs.map(p=>`<div class="rank"><span class="pos">${p.ovr}</span><div class="pn col"><span>${esc(nameOf(p))}</span><small class="k">${p.age}a · no ${C(p.club).name} · volta no fim do ano</small></div></div>`).join('')}</section>`:''}
  ${ins.length?`<section class="sec card"><h3>Aqui por empréstimo<small>${ins.length}</small></h3>${ins.map(p=>`<div class="mrow"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>de ${C(p.loan.from).name} · opção ${mi(loanInOffer(p.id).buy)}</small></span><button class="btn sm" data-a="loanbuy" data-id="${p.id}">Comprar</button></div>`).join('')}</section>`:''}
  <section class="sec card"><h3>Disponíveis<small>${av.length}</small></h3>${av.length?av.map(p=>`<div class="mrow"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>${C(p.club).sig} · ${p.age}a · OVR ${p.ovr} · taxa ${mi(loanInOffer(p.id).fee)}</small></span><span class="col"><button class="btn sm" data-a="loanin" data-id="${p.id}">Pedir</button><button class="btn sm ghost" data-a="prof" data-id="${p.id}">Ver</button></span></div>`).join(''):'<p class="news">Ninguém liberado agora. Os clubes abrem vagas ao longo do ano.</p>'}</section></div>`;
};
const _vp10=vPerfil;vPerfil=function(){
  let r=_vp10();const p=P(S.prof);if(!p)return r;
  let ex_='';
  if(p.club===G.user){
    if(p.loan&&p.loan.to===G.user)ex_=`<div class="x9"><div class="card"><div class="k">Emprestado por ${C(p.loan.from).name}</div><button class="btn big" data-a="loanbuy" data-id="${p.id}">Exercer opção de compra · ${mi(loanInOffer(p.id).buy)}</button></div></div>`;
    else ex_=`<div class="x9"><button class="btn big ghost" data-a="loanopen" data-id="${p.id}">Emprestar jogador</button>${S.loanFor===p.id?loanOutOffers(p.id).map((o,i)=>`<button class="off" data-a="loanpick" data-id="${p.id}" data-i="${i}"><span><b>${esc(C(o.club).name)}</b><small>${o.games} · cobre ${o.cover}% do salário</small></span><b>+${mi(o.fee)}</b></button>`).join(''):''}</div>`;
  }else if(p.loan&&p.loan.from===G.user){ex_=`<div class="card"><div class="k">Emprestado ao ${C(p.club).name} até o fim da temporada</div></div>`}
  else if(p.loanable&&p.club>=0){ex_=`<div class="x9"><button class="btn big ghost" data-a="loanin" data-id="${p.id}">Pedir por empréstimo · taxa ${mi(loanInOffer(p.id).fee)}</button></div>`}
  return r.replace(/<\/div>$/,ex_+'</div>');
};

/* ---------- Dashboard financeiro ---------- */
function areaH(arr){
  if(arr.length<2)return '<p class="news">Jogue algumas rodadas para ver a curva do caixa.</p>';
  const mn=Math.min(...arr),mx=Math.max(...arr),sp=(mx-mn)||1;
  const pts=arr.map((v,i)=>[(i/(arr.length-1)*200),44-((v-mn)/sp)*38]);
  const line=pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  return `<svg class="area" viewBox="0 0 200 50" preserveAspectRatio="none"><defs><linearGradient id="ag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fd36f" stop-opacity=".45"/><stop offset="1" stop-color="#2fd36f" stop-opacity="0"/></linearGradient></defs><polygon points="0,50 ${line} 200,50" fill="url(#ag)"/><polyline points="${line}" fill="none" stroke="#2fd36f" stroke-width="2" vector-effect="non-scaling-stroke"/></svg><div class="res"><span class="k">mín ${mi(mn)}</span><span class="k">máx ${mi(mx)}</span></div>`;
}
vClube=function(){
  ex();ex7();const c=userClub(),f=G.fin,l=f.last,mk=G.mk,a=G.asst,sp=G.sponsor,h=healthOf(c);
  const acc=mk.acc;
  const folha=c.squad.reduce((s,id)=>s+salOf(P(id)),0);
  const rev=acc.gate+acc.tv+acc.sp+acc.spx+acc.shirt+acc.soc+acc.social+acc.naming;
  const exp=(acc.sal||0)+(acc.mant||0)+acc.cost;
  const res=rev-exp;
  const delta=mk.cash&&mk.cash.length>1?mk.cash[mk.cash.length-1]-mk.cash[mk.cash.length-2]:(l?l.net:0);
  const parts=[['Bilheteria',acc.gate,'#2fd36f'],['TV',acc.tv,'#4aa3ff'],['Patroc. master',acc.sp,'#ffcc00'],['Patroc. extras',acc.spx,'#ff9f1c'],['Camisas',acc.shirt,'#e63946'],['Sócios',acc.soc,'#b388ff'],['Naming',acc.naming,'#00c2a8'],['Redes',acc.social,'#ff6fb5']].filter(x=>x[1]>.01);
  const exps=[['Salários',acc.sal||0],['Estádio',acc.mant||0],['Comissão e marketing',acc.cost]].filter(x=>x[1]>.01);
  const emax=Math.max(1,...exps.map(x=>x[1]));
  const go=[['marketing','📣','Marketing'],['torcida','🔥','Torcida'],['estadio','🏟️','Estádio'],['base','🌱','Base'],['meutec','🧠','Técnico'],['agenda','📅','Agenda'],['tecnicos','🏆','Ranking'],['historia','📜','História']];
  return `<div class="wrap x9"><h2>Finanças · ${esc(c.name)}</h2>
  <div class="fh"><div class="lab">Caixa</div><div class="cx">${mi(f.caixa)}</div><span class="dl ${delta>=0?'up':'dn'}">${delta>=0?'▲':'▼'} ${mi(Math.abs(delta))} na última rodada</span> <span class="dl">Dívida ${mi(c.debt)} · ${h[1]}</span></div>
  <div class="row2">
   <div class="kp"><div class="k">Receita da temporada</div><div class="v ok">${mi(rev)}</div></div>
   <div class="kp"><div class="k">Despesa da temporada</div><div class="v bad">${mi(exp)}</div></div>
   <div class="kp"><div class="k">Resultado</div><div class="v ${res>=0?'ok':'bad'}">${res>=0?'+':''}${mi(res)}</div></div>
   <div class="kp"><div class="k">Folha anual</div><div class="v">${mi(folha)}</div></div></div>
  ${sec9('Caixa ao longo do tempo',areaH((mk.cash||[]).slice(-40)))}
  ${sec9('De onde vem',parts.length?donutH(parts,mi(rev)):'<p class="news">Jogue uma rodada para ver as receitas.</p>')}
  ${sec9('Para onde vai',exps.length?exps.map(([n,v])=>`<div class="exp"><span>${n}</span><div class="pb"><i style="width:${v/emax*100}%"></i></div><b>${mi(v)}</b></div>`).join(''):'<p class="news">Sem despesas registradas ainda.</p>')}
  ${finCard()}
  <section class="sec card"><h3>Patrocínio master</h3>${sp?`<div class="res"><span>${esc(sp.name)}</span><b>${mi(sp.fixed)}/ano</b></div><p class="news">${spnSummary(sp)}</p>`:`<button class="btn" data-a="sponsor">Escolher patrocinador</button>`}</section>
  <section class="sec card"><h3>Diretoria</h3><div class="meter"><i class="${G.board.conf<35?'bad':G.board.conf<55?'warn':'ok'}" style="width:${G.board.conf}%"></i></div><p class="news">${esc(G.board.metaTxt)}.</p></section>
  <section class="sec card"><h3>Ir para</h3><div class="go">${go.map(([v,e,t])=>`<button data-a="nav" data-v="${v}"><span>${e}</span>${t}</button>`).join('')}</div></section>
  <section class="sec card"><h3>Comissão e filosofia</h3><div class="res"><span>Filosofia</span><b>${c.phil}</b></div><div class="res"><span>Auxiliar</span><b>${a?esc(a.name):'–'}</b></div>${PHN.map(n=>{const v=Math.round(c.squad.reduce((s,id)=>s+P(id).fit[n],0)/c.squad.length);return `<div class="at ${n===c.phil?'me':''}"><span>${n}</span>${bar(v)}<b>${v}%</b></div>`}).join('')}</section>
  <div class="card"><button class="btn ghost" data-a="reset">Reiniciar jogo</button></div></div>`;
};

Object.assign(A,{
 mgp(d){S.mg=mgNew(d.k);render()},
 mgadj(d){const dd=+d.d,s=S.mg;const v=s.a[d.k]+dd;if(v<2||v>MGMAX0)return;if(dd>0&&MGPOOL0-mgSum(s.a)<=0)return;s.a[d.k]=v;s.k='custom';render()},
 mgspend(d){const m=mgrOf();if(m.pts<=0||m.a[d.k]>=10)return;m.a[d.k]++;m.pts--;save();toast('+1 em '+MGA.find(x=>x[0]===d.k)[1]);render()},
 loanopen(d){S.loanFor=S.loanFor===+d.id?null:+d.id;render()},
 loanpick(d){const r=loanOut(+d.id,+d.i);S.loanFor=null;save();toast(r||'Empréstimo fechado.');if(!r)S.prof=null;render()},
 loanin(d){const r=loanIn(+d.id);save();toast(r||'Empréstimo fechado!');render()},
 loanbuy(d){const r=loanBuy(+d.id);save();toast(r||'Opção de compra exercida!');render()}
});

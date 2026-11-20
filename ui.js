/* ===== Resenha FC v2 — interface ===== */
const S={tab:'livres',lig:'tabela',pg:'todos',sort:'pos',prof:null,modal:null,paper:false,toast:'',sc:null,sp:null,sa:null,asst:null,coachName:'',
  psel:null,match:false,timer:null,speed:1,paused:false,panel:false,bid:null,filt:{},sres:null,mh:null,confirmReset:false};
const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mi=v=>{const a=Math.abs(v);return (v<0?'−':'')+'R$ '+(a>=100?a.toFixed(0):a>=10?a.toFixed(1):a.toFixed(2)).replace('.',',')+' mi'};
function toast(t){S.toast=t;render();setTimeout(()=>{if(S.toast===t){S.toast='';render()}},2600)}
const lum=hex=>{const n=parseInt(hex.slice(1),16);return ((n>>16)*299+((n>>8)&255)*587+(n&255)*114)/1000};
const onC=hex=>lum(hex)>150?'#101010':'#ffffff';

/* ---------- escudos e camisas (originais, nas cores do clube) ---------- */
function crest(c,s=30){
  const id='cp'+c.id,w=s,h=Math.round(s*1.12);
  const a=c.c1,b=c.c2,d=c.c3;let body='';
  const P='M3 2h26v16c0 8-7 13-13 16C10 31 3 26 3 18z';
  switch(c.pat){
    case 'v':for(let i=0;i<6;i++)body+=`<rect x="${3+i*4.4}" y="0" width="4.5" height="40" fill="${i%2?b:a}"/>`;break;
    case 'h':for(let i=0;i<7;i++)body+=`<rect x="0" y="${2+i*5.2}" width="32" height="5.3" fill="${i%2?b:a}"/>`;break;
    case 'half':body=`<rect x="0" y="0" width="16" height="40" fill="${a}"/><rect x="16" y="0" width="16" height="40" fill="${b}"/>`;break;
    case 'tri':body=`<rect x="0" y="0" width="11" height="40" fill="${a}"/><rect x="11" y="0" width="10" height="40" fill="${b}"/><rect x="21" y="0" width="11" height="40" fill="${d}"/>`;break;
    case 'hb':body=`<rect x="0" y="0" width="32" height="13" fill="${a}"/><rect x="0" y="13" width="32" height="10" fill="${b}"/><rect x="0" y="23" width="32" height="15" fill="${d}"/>`;break;
    case 'diag':body=`<rect width="32" height="40" fill="${a}"/><polygon points="0,26 0,16 32,6 32,16" fill="${b}"/>`;break;
    default:body=`<rect width="32" height="40" fill="${a}"/><path d="${P}" fill="none" stroke="${b}" stroke-width="2.4" transform="translate(1.6 1.6) scale(.9)"/>`;
  }
  const tc=c.pat==='solid'?onC(a):(c.pat==='half'||c.pat==='diag'?'#ffffff':onC(a));
  const sh=c.pat==='solid'?'none':'#000';
  return `<svg class="crest" width="${w}" height="${h}" viewBox="0 0 32 36" aria-hidden="true"><defs><clipPath id="${id}"><path d="${P}"/></clipPath></defs><g clip-path="url(#${id})">${body}</g><path d="${P}" fill="none" stroke="rgba(0,0,0,.55)" stroke-width="1.2"/><text x="16" y="21" text-anchor="middle" font-family="InterE,Inter,sans-serif" font-weight="800" font-size="10" fill="${tc}" stroke="${sh}" stroke-width=".5" paint-order="stroke">${c.sig}</text></svg>`;
}
function kitBg(c){
  const a=c.c1,b=c.c2,d=c.c3;
  switch(c.pat){
    case 'v':return `repeating-linear-gradient(90deg,${a} 0 5px,${b} 5px 10px)`;
    case 'h':return `repeating-linear-gradient(0deg,${a} 0 5px,${b} 5px 10px)`;
    case 'half':return `linear-gradient(90deg,${a} 50%,${b} 50%)`;
    case 'tri':return `linear-gradient(90deg,${a} 33%,${b} 33% 66%,${d} 66%)`;
    case 'hb':return `linear-gradient(180deg,${a} 33%,${b} 33% 66%,${d} 66%)`;
    case 'diag':return `linear-gradient(160deg,${a} 38%,${b} 38% 62%,${a} 62%)`;
    default:return a;
  }
}
function bar(v,cls=''){return `<span class="mini ${cls}"><i style="width:${clamp(v,0,100)}%"></i></span>`}
function traitChips(p){return p.tr.map(t=>`<span class="chip">${TN[t][0]}</span>`).join('')}

/* ---------- gramado tático ---------- */
function layout(slots,form){
  if(form&&/^4-2-3-1/.test(form)){const r=layoutBase(slots);const mids=[];slots.forEach((s,i)=>{if(s==='MID')mids.push(i)});[[35,53],[65,53],[20,33],[50,31],[80,33]].forEach((q,j)=>{r[mids[j]]={x:q[0],y:q[1]}});return r}
  return layoutBase(slots);
}
function layoutBase(slots){
  const rows={ATA:[],MID:[],DEF:[],GK:[]};slots.forEach((s,i)=>rows[s].push(i));
  const y={ATA:15,MID:41,DEF:67,GK:88};const pos=[];
  for(const g in rows){const arr=rows[g],n=arr.length;arr.forEach((i,j)=>{pos[i]={x:n===1?50:13+j*(74/(n-1)),y:y[g]}})}
  return pos;
}
function selId(cfg){const s=S.psel;if(!s)return null;return (s.k==='l'?cfg.lineup:s.k==='b'?cfg.bench:cfg.reserves)[s.i]}
function dropAction(a,b){ // a e b: {k,i}
  if(a.k===b.k&&a.i===b.i)return;
  if(!S.match||S.panel===false&&!R){ // modo clube
    const c=userClub();const ix=o=>o.k==='l'?o.i:o.k==='b'?11+o.i:18+o.i;
    const x=ix(a),y=ix(b);[c.squad[x],c.squad[y]]=[c.squad[y],c.squad[x]];S.psel=null;save();render();return;
  }
  const m=R.ms[R.ui],k=userSide(m),s=m[k];
  if(a.k==='l'&&b.k==='l'){[s.lineup[a.i],s.lineup[b.i]]=[s.lineup[b.i],s.lineup[a.i]];S.psel=null;render();return}
  const l=a.k==='l'?a:b,bb=a.k==='l'?b:a;
  if(l.k==='l'&&bb.k==='b'){
    if(s.subs>=5){S.psel=null;toast('Limite de 5 substituições.');return}
    if(s.sent.includes(s.lineup[l.i])){S.psel=null;toast('Jogador expulso não pode ser substituído.');return}
    const ok=subPlayer(m,k,s.lineup[l.i],s.bench[bb.i]);S.psel=null;if(!ok)toast('Não foi possível substituir.');else render();return;
  }
  S.psel=null;render();
}
/* arrastar e soltar + toque */
let drag=null;
document.addEventListener('pointerdown',e=>{
  const t=e.target.closest('[data-drag]');
  if(!t){return}
  drag={el:t,k:t.dataset.k,i:+t.dataset.i,x:e.clientX,y:e.clientY,moved:false,ghost:null,id:e.pointerId};
});
document.addEventListener('pointermove',e=>{
  if(!drag)return;
  const dx=e.clientX-drag.x,dy=e.clientY-drag.y;
  if(!drag.moved&&Math.hypot(dx,dy)>9){
    drag.moved=true;const g=drag.el.cloneNode(true);g.className+=' ghost';g.style.position='fixed';g.style.pointerEvents='none';g.style.zIndex=99;
    g.style.transform='translate(-50%,-50%)';document.body.appendChild(g);drag.ghost=g;drag.el.classList.add('dragging');
  }
  if(drag.moved){drag.ghost.style.left=e.clientX+'px';drag.ghost.style.top=e.clientY+'px';e.preventDefault()}
},{passive:false});
function endDrag(e,cancel){
  if(!drag)return;const d=drag;drag=null;
  if(d.moved){
    d.ghost.remove();d.el.classList.remove('dragging');
    if(cancel)return;
    const el=document.elementFromPoint(e.clientX,e.clientY);const t=el&&el.closest('[data-drop]');
    if(t)dropAction({k:d.k,i:d.i},{k:t.dataset.k,i:+t.dataset.i});
    d.swallow=true;S._swallow=Date.now();
  }
}
document.addEventListener('pointerup',e=>endDrag(e,false));
document.addEventListener('pointercancel',e=>endDrag(e,true));
function tapSlot(k,i){
  if(Date.now()-(S._swallow||0)<250)return;
  if(!S.psel){S.psel={k,i};render();return}
  if(S.psel.k===k&&S.psel.i===i){S.psel=null;render();return}
  const a=S.psel;dropAction(a,{k,i});
}

/* ---------- telas ---------- */
function vStart(){
  const has=(()=>{try{return !!SKV.getItem(SAVE_KEY)}catch(e){return false}})();
  const list=G.clubs.filter(c=>c.div===(S.cdiv||0)).sort((a,b)=>b.rep-a.rep);
  let h=`<div class="wrap"><div class="logo"><b>RESENHA</b><span>FC</span></div><p class="lead">Melhor que Brasfoot, menos burocrático que Football Manager. Demo do Brasil, jogando sozinho.</p>
  ${has?`<button class="btn big" data-a="cont">Continuar carreira</button>`:''}
  <label class="fld">Seu nome de técnico<input id="coach" value="${esc(S.coachName)}" placeholder="Ex.: Henrique" maxlength="24"></label>
  <h2>1 · Escolha o clube</h2><div class="seg sm">${['A','B','C','D'].map((x,i)=>`<button class="${(S.cdiv||0)===i?'on':''}" data-a="cdiv" data-v="${i}">Série ${x}</button>`).join('')}</div><div class="clubs">${list.map(c=>`<button class="club ${S.sc===c.id?'sel':''}" data-a="pickclub" data-id="${c.id}">${crest(c,34)}<span class="cn">${c.name}<small>${finTag(c)}</small></span><span class="rep">${c.rep}</span></button>`).join('')}</div>`;
  if(S.sc!==null){
    h+=`<h2>2 · Filosofia do clube</h2><p class="hint">Define o estilo do clube. Jogadores com bom encaixe rendem mais; o encaixe evolui com o treino.</p><div class="phils">${PHILS.map(([n,d])=>`<button class="phil ${S.sp===n?'sel':''}" data-a="pickphil" data-p="${n}"><b>${n}</b><small>${d}</small></button>`).join('')}</div>
    ${S.sp&&S.asst?`<h2>3 · Auxiliar técnico</h2><p class="hint">Só treina bem a filosofia que ele domina. Se for diferente da sua, o treino rende pouco.</p><div class="phils">${S.asst.map((a,i)=>`<button class="phil ${S.sa===i?'sel':''}" data-a="pickasst" data-i="${i}"><b>${a.name}</b><small>Domina: ${a.phil} · qualidade ${'★'.repeat(a.q)} · salário ${mi(a.sal)}/ano · ${S.sp===a.phil?'combina com o clube':'não combina'}</small></button>`).join('')}</div>
    `:''}
    ${S.sp&&S.sa!==null?objStep(S.sc):''}
    <button class="btn big" data-a="begin" ${S.sp&&S.sa!==null&&S.obj?'':'disabled'}>Começar</button>`;
  }
  return h+`<p class="foot">Elencos baseados em dados de memória (podem estar desatualizados). Nomes reais marcados com *. Atributos e escudos são inventados.</p></div>`;
}
function vPerfil(){
  const p=P(S.prof);if(!p){S.prof=null;return vInicio()}
  const mine=p.club===G.user;const c=p.club>=0?C(p.club):null;const uc=userClub();
  const bonus=((p.fit[uc.phil]-55)/45*3).toFixed(1);
  const row=(k,v)=>`<div class="res"><span>${k}</span><b>${v}</b></div>`;
  return `<div class="wrap"><button class="back" data-a="back">‹ Voltar</button>
  <div class="card pf"><div class="pfo"><b>${p.ovr}</b><small>OVR</small></div><div class="pfi"><h3>${esc(nameOf(p))}</h3><div class="k">${SUBN[subOf(p)]} · perna ${FOOTN[footOf(p)].toLowerCase()} · ${p.age} anos · ${c?c.name:'Sem clube'}</div><div class="chips">${traitChips(p)}</div></div>${c?crest(c,40):''}</div>
  <div class="card"><div class="k">Atributos</div>${Object.entries(p.at).map(([k,v])=>`<div class="at"><span>${k}</span>${bar(v)}<b>${v}</b></div>`).join('')}</div>
  ${!mine&&!scoutLvl()?`<div class="card"><div class="k">Encaixe e potencial</div><p class="news">Contrate um olheiro (Mercado, Olheiros) para ver o encaixe nas filosofias e o potencial de jogadores de outros clubes.</p></div>`:`<div class="card"><div class="k">Encaixe com cada filosofia</div>${PHN.map(n=>`<div class="at ${n===uc.phil?'me':''}"><span>${n}</span>${bar(p.fit[n])}<b>${Math.round(p.fit[n])}%</b></div>`).join('')}<p class="news">Na filosofia do seu clube (${uc.phil}) ele rende ${bonus>0?'+':''}${bonus} de OVR.</p></div>`}
  <div class="card"><div class="k">Temporada</div>${row('Jogos',p.games)}${row('Gols',p.goals)}${row('Assistências',p.ast)}${row('Nota média',p.rn?(p.rsum/p.rn).toFixed(2):'–')}${row('Cartões','🟨 '+p.yc+'  🟥 '+p.rc)}</div>
  ${p.car&&p.car.length?`<div class="card"><div class="k">Histórico de carreira</div><div class="res"><span>Ano · Time</span><b>J · G · A · Nota</b></div>${p.car.map(x=>`<div class="res"><span>T${x.s} · ${x.club}</span><b>${x.J} · ${x.G} · ${x.A} · ${x.nm??'–'}</b></div>`).join('')}</div>`:''}
  <div class="card"><div class="k">Estado e contrato</div>${row('Fôlego',Math.round(p.en)+'%')}${row('Moral',p.mor)}${row('Lesão',p.inj>0?p.inj+' rodadas':'apto')}${row('Valor de mercado',mi(valueOf(p)))}${row('Salário',mi(salOf(p))+'/ano')}${row('Potencial',mine?p.pot:potTxt(p))}</div>
  ${mine?`<button class="btn big ghost" data-a="plist" data-id="${p.id}">${p.listed?'Tirar da lista de venda':'Colocar à venda'}</button>`:(p.club>=0?`<button class="btn big" data-a="bidopen" data-id="${p.id}">Fazer proposta</button>`:`<button class="btn big" data-a="sign" data-id="${p.id}">Contratar (livre)</button>`)}</div>`;
}
function vLiga(){
  const segs=[['tabela','Tabela'],['rodada','Rodada'],['gols','Gols'],['ast','Assist.'],['nota','Notas'],['cart','Cartões'],['times','Times']];
  let b='';
  if(S.lig==='tabela'){
    const rows=tableRows();
    b=`<div class="tbl"><div class="tr hd"><span>#</span><span class="tc">Clube</span><span>J</span><span>V</span><span>SG</span><span>P</span></div>
    ${rows.map((c,i)=>`<div class="tr ${c.id===G.user?'me':''} ${i<4?'g4':(i>=16&&userDiv()<3)?'z4':''}"><span>${i+1}</span><span class="tc">${crest(c,20)}${c.name}</span><span>${c.J}</span><span>${c.V}</span><span>${c.GP-c.GC}</span><b>${c.P}</b></div>`).join('')}</div><p class="foot">${userDiv()===4?'Verde: vagas continentais (top 4). Nesta versão a liga do exterior não tem rebaixamento nem acesso.':userDiv()===0?'Verde: Libertadores · Vermelho: rebaixamento para a Série B.':userDiv()===3?'Verde: acesso à Série C · sem rebaixamento na Série D (demo).':'Verde: acesso à '+DIVN[userDiv()-1]+' · Vermelho: rebaixamento para a '+DIVN[userDiv()+1]+'.'}</p>`;
  }else if(S.lig==='rodada'){
    b=G.lastRound?`<div class="card"><div class="k">Rodada ${G.lastRound.n}</div>${G.lastRound.results.map(r=>`<div class="res ${r.u?'me':''}"><span>${crest(C(r.h),18)} ${C(r.h).name}</span><b>${r.hg} – ${r.ag}</b><span class="rt">${C(r.a).name} ${crest(C(r.a),18)}</span></div>`).join('')}</div>`:'<p class="news">Nenhuma rodada jogada.</p>';
  }else if(S.lig==='times'){
    const rows=tableRows().filter(c=>c.J>0);
    b=`<div class="tbl"><div class="tr hd t2"><span>#</span><span class="tc">Clube</span><span>GP</span><span>GC</span><span>Méd</span><span>Vit%</span></div>${rows.map((c,i)=>`<div class="tr t2 ${c.id===G.user?'me':''}"><span>${i+1}</span><span class="tc">${crest(c,18)}${c.sig}</span><span>${c.GP}</span><span>${c.GC}</span><span>${(c.GP/c.J).toFixed(1)}</span><span>${Math.round(c.V/c.J*100)}%</span></div>`).join('')}</div>`;
  }else{
    const kind={gols:'goals',ast:'ast',nota:'rating',cart:'cards'}[S.lig];const L=leaders(kind,12);
    b=L.length?`<div class="card">${L.map(([p,v],i)=>`<button class="res lk" data-a="prof" data-id="${p.id}"><span>${i+1}. ${esc(nameOf(p))} <small>${C(p.club).sig} · ${roleLabel(p)}</small></span><b>${v}</b></button>`).join('')}</div>`:'<p class="news">Sem dados ainda. Jogue algumas rodadas.</p>';
  }
  return `<div class="wrap">${ligaHead()}<div class="seg sm scroll">${segs.map(([k,l])=>`<button class="${S.lig===k?'on':''}" data-a="lig" data-v="${k}">${l}</button>`).join('')}</div>${b}</div>`;
}
function vMercado(){
  const c=userClub();
  const nv=Object.values(G.players).filter(p=>p.listed&&p.club>=0&&p.club!==G.user).length;
  const tabs=`<div class="seg sm scroll">${[['livres','Livres'],['venda','À venda ('+nv+')'],['buscar','Buscar'],['olheiros','Olheiros ('+G.scouts.length+')'],['ofertas','Ofertas ('+G.offers.length+')']].map(([k,l])=>`<button class="${S.tab===k?'on':''}" data-a="tab" data-t="${k}">${l}</button>`).join('')}</div>`;
  let b='';
  const prow=p=>`<button class="mrow" data-a="prof" data-id="${p.id}"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>${p.club>=0?C(p.club).sig+' · ':'livre · '}${p.age}a · ${trAbb(p)} · valor ${mi(valueOf(p))}</small></span><span class="ovr">${p.ovr}</span></button>`;
  if(S.tab==='livres'){
    b=`<div class="hint">Livres pagam só as luvas (10% do valor) e podem recusar. Elenco: ${c.squad.length}/30.</div>`+G.free.map(id=>prow(P(id))).join('');
  }else if(S.tab==='venda'){
    const L=Object.values(G.players).filter(p=>p.listed&&p.club>=0&&p.club!==G.user).sort((a,b)=>b.ovr-a.ovr);
    b=`<div class="hint">Jogadores que os clubes colocaram na lista de transferência. Saem uns 20% mais baratos e aceitam mais fácil.</div>`+(L.map(p=>`<button class="mrow" data-a="prof" data-id="${p.id}"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>${C(p.club).sig} · ${p.age}a · ${trAbb(p)} · pedem ~${mi(askPrice(p))}</small></span><span class="ovr">${p.ovr}</span></button>`).join('')||'<p class="news">Ninguém na lista agora. Vai mudando a cada rodada.</p>');
  }else if(S.tab==='olheiros'){
    b=`<div class="hint">Olheiros revelam potencial e encaixe de jogadores de outros clubes e recomendam contratações. Custam salário por temporada e rendem conforme a qualidade. Máximo de 3.</div>
    <div class="card"><div class="k">Seus olheiros (${G.scouts.length}/3)</div>${G.scouts.map((s,i)=>`<div class="res"><span>${esc(s.name)}<br><small class="k">${s.spec} · ${'★'.repeat(s.q)} · ${mi(s.sal)}/ano</small></span><button class="btn sm ghost" data-a="fscout" data-i="${i}">Dispensar</button></div>`).join('')||'<p class="news">Nenhum. Sem olheiro você não vê o potencial dos outros jogadores.</p>'}</div>
    ${G.scouts.length<3?`<div class="card"><div class="k">Candidatos</div>${G.spool.map((s,i)=>`<div class="res"><span>${esc(s.name)}<br><small class="k">${s.spec} · ${'★'.repeat(s.q)} · ${mi(s.sal)}/ano</small></span><button class="btn sm" data-a="hscout" data-i="${i}">Contratar</button></div>`).join('')}</div>`:''}
    <div class="card"><div class="k">Recomendações</div>${G.recs.filter(r=>P(r.pid)&&P(r.pid).club!==G.user).map(r=>{const p=P(r.pid);return `<button class="mrow" data-a="prof" data-id="${p.id}"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>${p.club>=0?C(p.club).sig:'livre'} · ${p.age}a · ${mi(valueOf(p))} · ${r.scout}<br>${esc(recNote(r))}</small></span><span class="ovr">${p.ovr}</span></button>`}).join('')||'<p class="news">Sem recomendações. Contrate um olheiro (elas atualizam a cada 3 rodadas).</p>'}</div>`;
  }else if(S.tab==='buscar'){
    const f=S.filt;
    b=`<div class="card filt"><label class="fld">Nome<input id="f_name" value="${esc(f.name||'')}" placeholder="Parte do nome"></label>
    <div class="grid2"><label class="fld">Posição<select id="f_role"><option value="">Qualquer</option>${Object.keys(ROLEABB).map(r=>`<option value="${r}" ${f.role===r?'selected':''}>${ROLEABB[r]}</option>`).join('')}</select></label>
    <label class="fld">Clube<select id="f_club"><option value="">Qualquer</option>${G.clubs.filter(x=>x.id!==G.user).map(x=>`<option value="${x.id}" ${String(f.club)===String(x.id)?'selected':''}>${x.name}</option>`).join('')}</select></label>
    <label class="fld">OVR mínimo<input id="f_ovr" type="number" min="40" max="95" value="${f.minOvr||''}" placeholder="70"></label>
    <label class="fld">Idade máxima<input id="f_age" type="number" min="16" max="42" value="${f.maxAge||''}" placeholder="30"></label>
    <label class="fld">Característica<select id="f_tr"><option value="">Qualquer</option>${Object.keys(TN).map(t=>`<option value="${t}" ${f.tr===t?'selected':''}>${TN[t][0]}</option>`).join('')}</select></label>
    <label class="fld">Encaixe ≥ (na sua filosofia)<input id="f_fit" type="number" min="0" max="100" value="${f.philMin||''}" placeholder="60"></label></div>
    <label class="chk"><input type="checkbox" id="f_listed" ${f.listed?'checked':''}> Só jogadores à venda</label>
    <button class="btn" data-a="search">Procurar</button></div>
    ${S.sres?`<div class="hint">${S.sres.length} jogador(es) (máx. 60)</div>`+S.sres.map(id=>prow(P(id))).join(''):''}`;
  }else{
    b=G.offers.length?G.offers.map(o=>{const p=P(o.pid);return `<div class="mrow"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>OVR ${p.ovr} · valor ${mi(valueOf(p))}<br>${C(o.buyer).name} oferece ${mi(o.fee)} · expira em ${o.exp-G.round} rod.</small></span><span class="col"><button class="btn sm" data-a="sell" data-id="${o.id}">Aceitar</button><button class="btn sm ghost" data-a="decline" data-id="${o.id}">Recusar</button></span></div>`}).join(''):'<p class="news">Nenhuma oferta no momento. Jogadores à venda atraem mais propostas.</p>';
  }
  return `<div class="wrap">${tabs}${b}</div>`;
}
function vClube(){
  const c=userClub(),f=G.fin,l=f.last,sp=G.sponsor,a=G.asst;
  const folha=c.squad.reduce((s,id)=>s+salOf(P(id)),0);
  const amatch=a&&a.phil===c.phil;
  return `<div class="wrap"><div class="grid2">${[['agenda','📅 Agenda','jogos e resultados'],['marketing','📣 Marketing','camisas, patrocínios, sócios, redes'],['torcida','🔥 Torcida','ídolos, vaiados, êxodo'],['estadio','🏟️ Estádio','obras, ingressos, naming'],['base','🌱 Base','olheiro, treinador, Sub-20'],['tecnicos','🏆 Técnicos','ranking e pontos'],['historia','📜 História','campeões, bola de ouro, confrontos']].map(([v,t,d])=>`<button class="card tile" data-a="nav" data-v="${v}"><b>${t}</b><span class="k">${d}</span></button>`).join('')}</div><div class="card"><div class="k">Caixa</div><div class="big">${mi(f.caixa)}</div><div class="k">Folha ${mi(folha)}/ano · manutenção do estádio ${mi(c.cap/1000*0.25)}/ano · TV ${mi(c.tv)}/ano</div></div>
  ${l?`<div class="card"><div class="k">Último jogo (${l.home?'em casa':'fora'})</div>${l.home?`<div class="res"><span>Público</span><b>${l.att.toLocaleString('pt-BR')}</b></div><div class="res"><span>Bilheteria</span><b>${mi(l.gate)}</b></div>`:''}<div class="res"><span>TV + patrocínio</span><b>${mi(l.tv+l.sp+l.bonus)}</b></div><div class="res"><span>Salários + manutenção</span><b>−${mi(l.sal+l.mant).replace('R$ ','R$ ')}</b></div><div class="res"><span>Saldo da rodada</span><b class="${l.net>=0?'ok':'bad'}">${mi(l.net)}</b></div></div>`:''}
  <div class="card"><div class="k">Filosofia e comissão</div><div class="res"><span>Filosofia do clube</span><b>${c.phil}</b></div><div class="res"><span>Auxiliar técnico</span><b>${a?esc(a.name):'–'}</b></div>
  <p class="news">${a?(amatch?`Ele domina ${a.phil}, a mesma filosofia do clube. O treino melhora o encaixe do elenco.`:`Ele domina ${a.phil}, mas o clube joga ${c.phil}. O treino rende pouco.`):''}</p>
  <div class="k">Encaixe médio do elenco</div>${PHN.map(n=>{const v=Math.round(c.squad.reduce((s,id)=>s+P(id).fit[n],0)/c.squad.length);return `<div class="at ${n===c.phil?'me':''}"><span>${n}</span>${bar(v)}<b>${v}%</b></div>`}).join('')}</div>
  ${tierCard86(c)}
  <div class="card"><div class="k">Patrocínio master</div>${sp?`<div class="res"><span>${esc(sp.name)}</span><b>${mi(sp.fixed)}/ano</b></div><p class="news">${spnSummary(sp)}</p>`:`<button class="btn" data-a="sponsor">Escolher patrocinador</button>`}</div>
  <div class="card"><div class="k">Diretoria</div><div class="meter"><i class="${G.board.conf<35?'bad':G.board.conf<55?'warn':'ok'}" style="width:${G.board.conf}%"></i></div><p class="news">${esc(G.board.metaTxt)}.</p></div>
  <div class="card"><button class="btn ghost" data-a="reset">Reiniciar jogo</button></div></div>`;
}
function vJornal(){
  const P0=G.paper[0];
  return `<div class="wrap"><button class="back" data-a="back">‹ Voltar</button>
  ${P0?`<div class="gazeta"><div class="mast big">${esc(P0.paper)}</div><div class="dateline">Temporada ${P0.s} · Rodada ${P0.r+1} · Edição nacional</div><h2 class="mh">${esc(P0.h)}</h2><p class="by">por ${esc(P0.by)}</p><p class="sub">${esc(P0.sub)}</p></div>
  <div class="cols">${G.paper.slice(1,14).map(n=>`<article><div class="pp">${esc(n.paper)} · R${n.r+1}</div><h4>${esc(n.h)}</h4><p>${esc(n.sub)}</p><small>${esc(n.by)}</small></article>`).join('')}</div>`:'<p class="news">Sem edições ainda. Jogue uma rodada.</p>'}
  ${G.press?`<div class="card press"><div class="k">Entrevista · ${esc(G.press.who)}</div><p class="q">${esc(G.press.q)}</p>${G.press.opts.map((o,i)=>`<button class="opt" data-a="press" data-i="${i}">${esc(o.t)}</button>`).join('')}<button class="opt ghost" data-a="press" data-i="-1">Não responder</button></div>`:''}</div>`;
}

/* ---------- partida ---------- */
function startMatch(){
  startRound();S.seen={};S.flash=null;S.paused=false;S.panel=false;S.psel=null;S.match=true;render();tick();
}
const pauseMinutes=()=>G.pauseExtra?[25,45,70]:[45];
function tick(){
  clearInterval(S.timer);
  S.timer=setInterval(()=>{
    if(!R||S.paused||S.pen)return;const m=R.ms[R.ui];if(roundDone())return;
    stepAll();
    const fe=R.ms[R.focus].ev;const pe=fe[fe.length-1];
    {const pq=R.ms[R.focus].penq;if(pq&&!pq.shown)penStart(pq);else if(pe&&pe.pen&&!pe.seen){pe.seen=1}}
    S.seen=S.seen||{};
    R.ms.forEach((mm,mi2)=>{const n0=S.seen[mi2]||0;const evs=mm.ev;for(let q=n0;q<evs.length;q++){const e=evs[q];if(e.type==='goal'&&(mi2===R.ui||mi2===R.focus)){const mine=mi2===R.ui&&e.side===userSide(mm);if(mi2===R.ui){S.flash={t:mine?'GOOOL!':'Gol sofrido',s:e.text.replace(/^GOL!( de pênalti!)? ?/,''),cls:mine?'win':'lose',until:Date.now()+1900};setTimeout(render,1950);mine?(SFX.goal(),vib([80,40,80])):(SFX.sad(),vib(200))}else SFX.goal()}if(e.type==='red'&&mi2===R.ui)SFX.pen()}S.seen[mi2]=evs.length});
    if(m.min===1||m.min===46||m.min===90)SFX.whistle();
    if(pauseMinutes().includes(m.min)){S.paused=true;S.panel=true}
    if(roundDone())clearInterval(S.timer);
    render();
  },S.speed===1?170:60);
}
function endMatch(){
  clearInterval(S.timer);const out=finishRound();S.match=false;S.panel=false;S.psel=null;
  G.lastOutcome=out;S.modal={t:'round',out};render();
}

/* ---------- modais (em fluxo normal, sem sobreposição) ---------- */
function vModal(){
  const md=S.modal;
  if(md.t==='round'){
    const lr=G.lastRound;const c=userClub();
    const top=Object.entries(lr.ratings).map(([id,r])=>[+id,r]).filter(([id])=>P(id)&&P(id).club===c.id).sort((a,b)=>b[1]-a[1])[0];
    const ur=lr.results.find(r=>r.u);const won=ur&&((ur.h===G.user&&ur.hg>ur.ag)||(ur.a===G.user&&ur.ag>ur.hg));
    return `${won?confettiH():''}<div class="wrap"><div class="card"><h3>${won?'Vitória! ':''}Fim da rodada ${lr.n}</h3>${lr.results.map(r=>`<div class="res ${r.u?'me':''}"><span>${crest(C(r.h),18)} ${C(r.h).name}</span><b>${r.hg} – ${r.ag}</b><span class="rt">${C(r.a).name} ${crest(C(r.a),18)}</span></div>`).join('')}
    ${top?`<p class="news">Melhor do seu time: ${esc(nameOf(P(top[0])))} (nota ${top[1].toFixed(1)}).</p>`:''}</div>
    ${G.paper.length?`<div class="card paperc"><div class="mast">${esc(G.paper[0].paper)}</div><h3>${esc(G.paper[0].h)}</h3><p>${esc(G.paper[0].sub)}</p></div>`:''}
    <button class="btn big" data-a="roundok">Continuar</button></div>`;
  }
  if(md.t==='sponsor')return `<div class="wrap"><h2>Patrocinador master</h2><p class="news">Escolha com cuidado. O contrato vale a temporada inteira.</p>${sponsorOffers().map((o,i)=>`<button class="offer" data-a="pickspon" data-i="${i}"><b>${o.name}</b><span>${mi(o.fixed)}/ano fixo</span><small>${o.desc}${o.perWin?' ('+mi(o.perWin)+' por vitória)':''}${o.topN?' (top '+o.topN+': '+mi(o.topBonus)+' · título: '+mi(o.titleBonus)+')':''}</small></button>`).join('')}</div>`;
  if(md.t==='fired'){md.offs=md.offs||fireOffers();return `<div class="wrap"><h2>Você foi demitido</h2><p class="news">A diretoria do ${userClub().name} decidiu trocar o comando. Chegaram propostas:</p>${md.offs.map(id=>`<button class="offer" data-a="takejob" data-id="${id}"><b>${crest(C(id),22)} ${C(id).name}</b><span>reputação ${C(id).rep}</span><small>${posOf(C(id))}º na tabela · caixa ${mi(C(id).caixa)}</small></button>`).join('')}</div>`}
  if(md.t==='season'){const s=G.summary;return `<div class="wrap"><div class="card"><h3>Fim da temporada ${s.season}</h3><p class="news">Campeão: <b>${s.champ}</b>. Você terminou em ${s.pos}º (meta: top ${s.meta}).</p><p class="news">${s.txt}</p><p class="news">Premiação: ${mi(s.prize)}${s.sp?' · bônus do patrocinador: '+mi(s.sp):''}. Confiança da diretoria: ${Math.round(s.conf)}.</p><div class="k">Artilheiros</div>${s.scorers.map(x=>`<div class="res"><span>${esc(x.n)} (${x.c})</span><b>${x.g}</b></div>`).join('')}</div><button class="btn big" data-a="newseason">Próxima temporada</button></div>`}
  if(md.t==='bid'){
    const p=P(md.pid),ask=askPrice(p);const fee=S.bid;
    return `<div class="wrap"><button class="back" data-a="bidclose">‹ Cancelar</button><div class="card"><h3>Proposta por ${esc(nameOf(p))}</h3><div class="k">${C(p.club).name} · OVR ${p.ovr} · valor de mercado ${mi(valueOf(p))}</div><div class="big">${mi(fee)}</div><input type="range" id="bidr" min="${Math.round(valueOf(p)*70)/100}" max="${Math.round(ask*170)/100}" step="0.1" value="${fee}"><p class="news">Quanto mais perto do que o clube pede, maior a chance. Depois, o jogador também precisa aceitar. Caixa: ${mi(G.fin.caixa)}.</p><button class="btn big" data-a="bidgo">Enviar proposta</button></div></div>`;
  }
  return '';
}

/* ---------- render ---------- */
const toastH=()=>S.toast?`<div class="toast">${esc(S.toast)}</div>`:'';
function bind(){
  const f=$('#form');if(f)f.onchange=()=>{const c=userClub();c.formation=f.value;autoPick(c);S.psel=null;save();render()};
  const mk=$('#mark');if(mk)mk.onchange=()=>{userClub().mark=mk.value;save();render()};
  const fc=$('#focus');if(fc)fc.onchange=()=>{userClub().focus=fc.value;save();render()};
  const st=$('#style');if(st)st.onchange=()=>{userClub().style=st.value;save();render()};
  
  const mf=$('#mform');if(mf)mf.onchange=()=>{const m=R.ms[R.ui];const s=m[userSide(m)];s.formation=mf.value;reassign(s);S.psel=null;render()};
  const mm=$('#mmark');if(mm)mm.onchange=()=>{const m=R.ms[R.ui];m[userSide(m)].mark=mm.value;render()};
  const mf2=$('#mfocus');if(mf2)mf2.onchange=()=>{const m=R.ms[R.ui];m[userSide(m)].focus=mf2.value;render()};
  const ms=$('#mstyle');if(ms)ms.onchange=()=>{const m=R.ms[R.ui];m[userSide(m)].style=ms.value;render()};
  const co=$('#coach');if(co)co.oninput=()=>{S.coachName=co.value};
  const br=$('#bidr');if(br)br.oninput=()=>{S.bid=+br.value;br.previousElementSibling.previousElementSibling.textContent=mi(S.bid)};
}
function readFilters(){
  const g=id=>{const e=$(id);return e?e.value:''};
  S.filt={name:g('#f_name'),role:g('#f_role'),club:g('#f_club'),minOvr:+g('#f_ovr')||0,maxAge:+g('#f_age')||0,tr:g('#f_tr'),philMin:+g('#f_fit')||0,listed:$('#f_listed')&&$('#f_listed').checked};
}

/* ---------- ações ---------- */
const A={
 cont(){if(loadSave()){if(G.round>=NR()){if(!G.summary)endSeason();G.phase='seasonEnd';S.modal={t:'season'}}render()}},
 pickclub(d){S.sc=+d.id;render()},
 pickphil(d){if(S.sp!==d.p){S.sp=d.p;S.asst=asstCandidates(d.p);S.sa=null}render()},
 pickasst(d){S.sa=+d.i;render()},
 begin(){if(S.sc===null||!S.sp||S.sa===null||!S.obj)return;startCareer(S.sc,S.coachName.trim()||'Técnico',S.sp,S.asst[S.sa]);G.view='inicio';S.modal={t:'sponsor'};render();window.scrollTo(0,0)},
 nav(d){G.view=d.v;S.prof=null;S.paper=false;S.psel=null;render();window.scrollTo(0,0)},
 back(){S.prof=null;S.paper=false;render()},
 paper(){S.paper=true;S.prof=null;render();window.scrollTo(0,0)},
 px(){G.pauseExtra=!G.pauseExtra;save()},
 play(){if(!G.sponsor){S.modal={t:'sponsor'};render();return}startMatch();window.scrollTo(0,0)},
 tsv(){S.tsv=!S.tsv;render()},
 tsave(d){saveTactic(+d.i);save();toast('Tática '+(+d.i+1)+' salva.')},
 tload(d){const r=loadTactic(+d.i);S.psel=null;save();toast(r||'Tática carregada.')},
 hscout(d){const r=hireScout(+d.i);save();toast(r||'Olheiro contratado.')},
 fscout(d){fireScout(+d.i);save();render()},
 ready(){G.ready=G.round+'-'+G.season;save();toast('Escalação confirmada. (No online, o jogo só começa quando todos confirmarem.)')},
 auto(){autoPick(userClub());S.psel=null;save();toast('Escalação automática aplicada.')},
 pprof(){const cfg=S.match?matchCfg():clubCfg();const id=selId(cfg);S.prof=id;S.psel=null;if(S.match){S.panel=false;S.paused=true;S.match=false;S._back=true}render()},
 punsel(){S.psel=null;render()},
 pg(d){S.pg=d.v;render()},sort(d){S.sort=d.v;render()},
 prof(d){S.prof=+d.id;render();window.scrollTo(0,0)},
 plist(d){const p=P(+d.id);p.listed=!p.listed;save();toast(p.listed?p.name+' colocado à venda.':'Removido da lista.')},
 lig(d){S.lig=d.v;render()},
 tab(d){S.tab=d.t;render()},
 search(){readFilters();const f=S.filt;S.sres=searchPlayers({name:f.name,role:f.role,club:f.club,minOvr:f.minOvr,maxAge:f.maxAge,tr:f.tr,phil:(f.philMin&&scoutLvl())?userClub().phil:'',philMin:scoutLvl()?f.philMin:0,listed:f.listed}).map(p=>p.id);render()},
 sign(d){const r=signFree(+d.id);S.prof=null;save();toast(r||'Contratação fechada!')},
 bidopen(d){const p=P(+d.id);S.bid=+(askPrice(p)*1.05).toFixed(1);S.modal={t:'bid',pid:p.id};render();window.scrollTo(0,0)},
 bidclose(){S.modal=null;render()},
 bidgo(){const r=makeBid(S.modal.pid,S.bid);S.modal=null;if(r.ok)S.prof=null;save();toast(r.msg)},
 sell(d){const r=sellPlayer(+d.id);save();toast(r||'Venda concluída.')},
 decline(d){G.offers=G.offers.filter(o=>o.id!==+d.id);save();render()},
 sponsor(){S.modal={t:'sponsor'};render()},
 pickspon(d){G.sponsor=sponsorOffers()[+d.i];S.modal=null;save();render()},
 press(d){answerPress(+d.i);render()},
 reset(){if(S.confirmReset){wipe();location.reload()}else{S.confirmReset=true;toast('Toque de novo em Reiniciar para apagar tudo.');setTimeout(()=>S.confirmReset=false,4000)}},
 mtoggle(){if(roundDone())return;S.paused=!S.paused;if(!S.paused)S.panel=false;render()},
 spd(d){S.speed=+d.v;tick();render()},
 mskip(){clearInterval(S.timer);S.pen=null;S.panel=false;S.paused=false;while(!roundDone())stepAll();render()},
 mtac(){S.paused=true;S.panel=true;render()},
 mgo(){S.panel=false;S.paused=false;S.psel=null;render();window.scrollTo(0,0)},
 mfocus(d){R.focus=+d.i;render()},
 mend(){endMatch()},
 roundok(){const out=G.lastOutcome;S.modal=null;
  if(out==='fired'){if(G.round>=NR()&&(!G.summary||G.summary.season!==G.season))endSeason();S.modal={t:'fired'}}
  else if(out==='seasonEnd'){endSeason();G.phase='seasonEnd';S.modal={t:'season'}}
  G.view='inicio';render();window.scrollTo(0,0)},
 takejob(d){takeJob(+d.id);S.modal=G.phase==='seasonEnd'?{t:'season'}:{t:'sponsor'};G.view='inicio';render()},
 newseason(){newSeason();G.phase='play';S.modal={t:'sponsor'};G.view='inicio';render()}
};
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-a],[data-drop]');if(!t||t.tagName==='INPUT')return;
  if(t.dataset.drop!==undefined&&!t.dataset.a){tapSlot(t.dataset.k,+t.dataset.i);return}
  const f=A[t.dataset.a];if(f)f(t.dataset);
});
document.addEventListener('change',e=>{if(e.target.id==='px')A.px()});
document.addEventListener('keydown',e=>{if(e.code==='Space'&&S.match&&R&&!roundDone()&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();A.mtoggle()}});

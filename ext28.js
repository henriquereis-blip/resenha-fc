/* ext28: contraste, caixa de e-mails + mercado ativo, contratos de patrocínio travados, naming rights visível,
   penalidade de posição maior, Copinha passiva, base dos outros com negociação dura, rivais negociam menos */
(function(){const st=document.createElement('style');st.textContent=`
/* ---- contraste garantido ---- */
.paperc,.gazeta{background:#f4ecd8!important;color:#1b1710!important;border:1px solid #cdbf98!important;border-left:4px solid #8a6d1f!important}
.paperc *,.gazeta *{color:#1b1710!important}
.paperc .k,.gazeta .by,.gazeta .dateline{color:#52452a!important}
.paperc .mast,.gazeta .mast{border-bottom:2px double #1b1710!important;text-align:center}
.pitch .tn i,.pitch .tn small,.pitch .tn b,.pitch .wt,.pitch .rt{color:#fff!important;text-shadow:0 1px 2px #000,0 0 3px #000a!important}
button.sch{text-shadow:0 1px 2px #000a}
.bar2 b{color:#fff!important;text-shadow:0 0 3px #000,0 1px 2px #000}
.hd{color:#5d72a8!important}
.badge.red,.nbadge{background:#c62828!important;color:#fff!important}
html,body{overflow-x:clip!important;overflow-y:visible!important}
/* ---- celular: nada de altura fixa, botão de continuar sempre à mão ---- */
@media (max-width:759px),(max-height:719px){
 .wrap.fit{height:auto!important;overflow:visible!important}
 .mt .ctrl2{position:sticky;bottom:0;z-index:30;padding:10px 0 calc(10px + env(safe-area-inset-bottom,0px));background:linear-gradient(180deg,#07110b00,#07110b 28%)}
 .mt .ctrl2 .btn.big{width:100%;min-height:54px;font-size:17px}
 .x9 .slot{flex-wrap:wrap}.x9 .slot .nm{flex:1 1 55%;min-width:0}.x9 .slot .nm b{white-space:normal!important;overflow:visible!important;text-overflow:clip!important}
 .x9 .slot>span{margin-left:auto}
}
/* ---- barra de e-mail e janela ---- */
.mbar{display:flex;gap:8px;align-items:center;padding:4px 10px 6px;font:700 12px var(--fh)}
.mbar button{border:0;font:inherit;color:inherit;cursor:pointer;border-radius:999px;padding:6px 12px;min-height:34px;display:inline-flex;align-items:center;gap:6px}
.mbar .mail{background:#1b2a4a;color:#eaf0ff}.mbar .mail b{background:#ff5a52;color:#fff;border-radius:999px;padding:0 7px;font-size:11px;line-height:18px}
.mbar .dt2{font:800 12px var(--fh);color:var(--accent2);white-space:nowrap}
.mbar .wchip{flex:1;min-width:0;background:#0f2a1e;color:#aef5c9;justify-content:flex-start;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.mbar .wchip.off{background:#3a1515;color:#ffc9c4}
.pen.card.ov,.pen.ov{background:#0b1410!important;opacity:1!important}
.mrow28{display:block;width:100%;text-align:left;padding:12px;margin:0 0 8px;border-radius:12px;background:var(--card);border:1px solid var(--line);color:var(--fg)}
.mrow28.un{border-left:4px solid var(--accent2);background:var(--card2,var(--card))}.mrow28 b{display:block;font-size:14px}.mrow28 small{color:var(--mut);display:block;margin-top:3px}
.mail28 p{margin:6px 0;line-height:1.45}.mail28 .btn{margin:4px 6px 0 0}
.ask28{border:1px dashed var(--line);border-radius:12px;padding:10px;margin-top:8px}.ask28 .btn{margin:4px 6px 0 0}
.lock28 .res b{color:var(--fg)}.chip28{display:inline-block;background:#1b2a4a;color:#eaf0ff;border-radius:999px;padding:2px 9px;font-size:11px;margin-left:6px}
`;document.head.appendChild(st)})();

/* ======== penalidade de posição bem mais pesada ======== */

/* ======== rivais ======== */
function isRival(a,b){if(!a||!b)return false;return (typeof RIVAL!=='undefined')&&(((RIVAL[a.sig]||[]).includes(b.sig))||((RIVAL[b.sig]||[]).includes(a.sig)))}

/* ======== caixa de e-mails ======== */
function mailBox(){if(!G.inbox)G.inbox=[];if(!G.mkt)G.mkt={auto:false,lastNo:-9,nid:1};return G.inbox}
function mail(kind,title,body,acts,tag){
  mailBox();
  if(tag)G.inbox=G.inbox.filter(m=>!(m.tag===tag&&m.acts&&m.acts.length));
  const m={id:G.mkt.nid++,r:G.round,s:G.season,kind,title,body,acts:acts||[],read:false,tag:tag||''};
  G.inbox.unshift(m);
  if(G.inbox.length>300){for(let i=G.inbox.length-1;i>=0&&G.inbox.length>300;i--){if(G.inbox[i].read&&!(G.inbox[i].acts&&G.inbox[i].acts.length))G.inbox.splice(i,1)}}
  return m;
}
function unreadN(){return mailBox().filter(m=>!m.read).length}
const MACT={
  sell(p,m){const r=sellPlayer(p.oid);return r?{ok:false,t:r}:{ok:true,t:'Venda fechada.'}},
  decline(p){G.offers=G.offers.filter(o=>o.id!==p.oid);return {ok:true,t:'Proposta recusada.'}},
  cut(p){let n=0;userClub().squad.forEach(id=>{const q=P(id);if(q.listed){q.ask=+Math.max(valueOf(q)*.45,(q.ask||valueOf(q)*1.15)*(1-p.pct/100)).toFixed(2);n++}});return {ok:true,t:'Baixei '+p.pct+'% do preço de '+n+' jogador(es). Vou avisar quando chegar proposta.'}},
  auto(){G.mkt.auto=true;return {ok:true,t:'Corte automático ligado: −5% no preço a cada rodada sem proposta (até 55% do valor).'}},
  wait(){return {ok:true,t:'Beleza, vamos esperar mais um pouco.'}},
  goto(p){S.modal=null;S.prof=null;S.paper=false;G.view=p.v;return {ok:true,t:'',keep:true}},
  prof(p){S.modal=null;S.prof=p.pid;return {ok:true,t:'',keep:true}}
};
function mailAct(mid,k){
  const m=mailBox().find(x=>x.id===mid);if(!m)return;const a=m.acts[k];if(!a)return;
  const f=MACT[a.k];if(!f)return;const r=f(a.p||{},m);
  if(!r.keep){m.acts=[];m.res=r.t||'';m.read=true}
  save();
  if(r.t&&!r.keep){toast(r.t);return}
  render();window.scrollTo(0,0);
}
Object.assign(A,{
  inbox(){mailBox();S.modal={t:'inbox'};render();window.scrollTo(0,0)},
  mopen(d){const m=mailBox().find(x=>x.id===+d.id);if(m)m.read=true;S.modal={t:'inbox',id:+d.id};render();window.scrollTo(0,0)},
  mlist(){S.modal={t:'inbox'};render()},
  mact(d){mailAct(+d.m,+d.k)},
  mxclose(){S.modal=null;render()},
  mclear(){mailBox().forEach(m=>{if(!m.acts||!m.acts.length)m.read=true});G.inbox=G.inbox.filter(m=>m.acts&&m.acts.length);save();render()},
  askdn(d){const p=P(+d.id);p.ask=+Math.max(valueOf(p)*.4,(p.ask||valueOf(p)*1.15)*.9).toFixed(2);save();render()},
  askup(d){const p=P(+d.id);p.ask=+Math.min(valueOf(p)*2.2,(p.ask||valueOf(p)*1.15)*1.1).toFixed(2);save();render()},
  askauto(){mailBox();G.mkt.auto=!G.mkt.auto;save();render()}
});
function mailHtml(){
  const L=mailBox();const md=S.modal;
  if(md.id){const m=L.find(x=>x.id===md.id);if(!m)return `<div class="wrap"><button class="btn ghost sm" data-a="mlist">← Caixa de entrada</button><p class="news">E-mail não encontrado.</p></div>`;
    return `<div class="wrap mail28"><button class="btn ghost sm" data-a="mlist">← Caixa de entrada</button><div class="card"><div class="k">T${m.s} · rodada ${m.r+1}</div><h3>${esc(m.title)}</h3>${String(m.body).split('\n').map(l=>`<p>${esc(l)}</p>`).join('')}${m.res?`<p><b>✔ ${esc(m.res)}</b></p>`:''}<div>${(m.acts||[]).map((a,i)=>`<button class="btn ${a.g?'ghost':''}" data-a="mact" data-m="${m.id}" data-k="${i}">${esc(a.l)}</button>`).join('')}</div></div></div>`}
  return `<div class="wrap"><button class="btn ghost sm" data-a="mxclose">← Voltar</button><h2>✉️ Caixa de entrada</h2>${L.length?L.map(m=>`<button class="mrow28 ${m.read?'':'un'}" data-a="mopen" data-id="${m.id}"><b>${esc(m.title)}</b><small>T${m.s} · rodada ${m.r+1}${m.acts&&m.acts.length?' · ⚡ precisa de resposta':''}</small></button>`).join('')+`<button class="btn ghost sm" data-a="mclear">Limpar lidos</button>`:'<p class="news">Nenhum e-mail ainda. Propostas, avisos do mercado e novidades chegam aqui.</p>'}</div>`;
}
/* barra no topo: janela + e-mails */
hookAround('render','rd28',function(next,__a){next();try{mailBar()}catch(e){console.error('mailBar '+e.message)}});
function mailBar(){
  if(!G||G.phase==='start'||S.match)return;
  const hd=document.querySelector('.top2');if(!hd)return;
  hd.querySelectorAll('.mbar').forEach(e=>e.remove());
  const w=winInfo();const n=unreadN();
  const txt=w.open?(w.left>=99?'Mercado aberto':'Mercado aberto · fecha em '+w.left+' rod.'):'Mercado fechado · abre em '+w.left+' rod.';
  hd.insertAdjacentHTML('beforeend',`<div class="mbar"><span class="dt2">${gdate()}</span><button class="wchip ${w.open?'':'off'}" data-a="nav" data-v="mercado">${w.open?'🟢':'🔴'} ${txt}</button><button class="mail" data-a="inbox">✉️${n?` <b>${n}</b>`:''}</button></div>`);
  const h=Math.round(hd.getBoundingClientRect().height);document.documentElement.style.setProperty('--hh',h+'px');
  if(typeof bind==='function')bind();
}

/* ======== mercado: interesse real nos jogadores à venda ======== */
function demand(p){
  const v=Math.max(.05,valueOf(p)),r=(p.ask||v*1.15)/v;let q=.62-(r-.9)*1.3;
  if(p.age>=33)q*=.55;else if(p.age>=30)q*=.8;else if(p.age<=23)q*=1.15;if(p.ovr<55)q*=.85;
  return clamp(q,.02,.7);
}
function demandTxt(p){const q=demand(p);return q>=.45?'alta':q>=.2?'média':'baixa'}
const _pl28=A.plist;
A.plist=function(d){
  const p=P(+d.id);const was=p.listed;_pl28.apply(this,arguments);
  try{if(!was&&p.listed){p.ask=+(valueOf(p)*1.15).toFixed(2);const w=winInfo();
    mail('list','📣 '+nameOf(p)+' anunciado','Colocado à venda pedindo '+mi(p.ask)+' (valor de mercado '+mi(valueOf(p))+').\n'+(w.open?'Os clubes olham o anúncio a cada rodada. Se não vier proposta eu te aviso e você decide: baixar o preço ou esperar.':'A janela está fechada: só chegam propostas quando ela abrir ('+w.txt.toLowerCase()+').'),[{l:'Ver jogador',k:'prof',p:{pid:p.id},g:1}],'list'+p.id);
    render()}
  }catch(e){console.error('plist28 '+e.message)}
};
function mtick(){
  ex();mailBox();const c=userClub();if(!winOpen())return;
  const listed=c.squad.map(id=>P(id)).filter(p=>p.listed&&!p.loan);
  if(!listed.length)return;
  let got=0;
  for(const p of listed){
    if(G.offers.length>=3)break;if(G.offers.some(o=>o.pid===p.id))continue;
    if(c.squad.length<=19)break;
    if(Math.random()>demand(p))continue;
    const fee0=Math.min(p.ask||valueOf(p)*1.15,(p.ask||1e9)),fee=+(Math.max(.05,fee0*rnd(.9,1)).toFixed(2));
    const cand=G.clubs.filter(x=>x.id!==c.id&&x.squad.length<28&&x.caixa>=fee*.7).sort(()=>Math.random()-.5).slice(0,24);
    let best=null,bw=0;
    for(const x of cand){const bs=x.squad.map(id=>P(id).ovr).sort((a,b)=>b-a);const gate=bs[Math.min(10,bs.length-1)]||50;let w=Math.exp((p.ovr-gate)/6);if(isRival(c,x))w*=.3;w*=Math.random();if(w>bw){bw=w;best=x}}
    if(!best)continue;
    const o={id:G.nextOfferId++,pid:p.id,buyer:best.id,fee,exp:G.round+3};G.offers.push(o);got++;
    mail('offer','💰 Proposta por '+nameOf(p),best.name+' oferece '+mi(fee)+' por '+nameOf(p)+' (você pediu '+mi(p.ask||fee)+'; valor de mercado '+mi(valueOf(p))+').\nA proposta vale por 3 rodadas.',[{l:'Aceitar '+mi(fee),k:'sell',p:{oid:o.id}},{l:'Recusar',k:'decline',p:{oid:o.id},g:1}],'off'+o.id);
  }
  const pend=listed.filter(p=>!G.offers.some(o=>o.pid===p.id));
  if(G.mkt.auto)pend.forEach(p=>{p.ask=+Math.max(valueOf(p)*.55,(p.ask||valueOf(p)*1.15)*.95).toFixed(2)});
  if(pend.length&&!got&&G.round-G.mkt.lastNo>=2){
    G.mkt.lastNo=G.round;
    mail('nooffer','📭 Nenhuma proposta para: '+pend.slice(0,3).map(p=>lastName(p.name)).join(', '),'Ninguém bateu o preço pedido:\n'+pend.map(p=>'• '+nameOf(p)+' — pede '+mi(p.ask||valueOf(p)*1.15)+' (valor '+mi(valueOf(p))+')').join('\n')+'\nPreço mais baixo atrai mais clubes. O que você quer fazer?'+(G.mkt.auto?'\n(Corte automático está ligado: baixei 5% desta rodada.)':''),[{l:'Baixar 10% de todos',k:'cut',p:{pct:10}},{l:'Baixar 20%',k:'cut',p:{pct:20}},G.mkt.auto?null:{l:'Cortar 5% por rodada',k:'auto',g:1},{l:'Esperar',k:'wait',g:1}].filter(Boolean),'nooffer');
  }
}
/* propostas aleatórias para quem NÃO está à venda ficam raras */
hookAround('genOffer','go28',function(next,__a){if(Math.random()<.3)return next()});
/* avisos de janela + tick por rodada */
hookAfter('finishRound','ext28_fr28',function(r,A){
  try{ex();mailBox();
    const wo=winOpen(),was=G._wm;
    if(was!==undefined&&was!==wo){const w=winInfo();mail('win',wo?'🟢 Janela de transferências ABERTA':'🔴 Janela de transferências FECHADA',wo?'O mercado abriu. Já dá para comprar, vender e receber propostas pelos jogadores à venda.\n'+w.txt:'O mercado fechou. Só jogador livre agora. '+w.txt,[{l:'Ir ao mercado',k:'goto',p:{v:'mercado'}}],'win')}
    G._wm=wo;
    mtick();copinhaReveal();
    const n=unreadN();if(n)S._newMail=n;
  }catch(e){console.error('fr28 '+e.message)}
  });
/* painel de preço no perfil do jogador à venda */
hookAround('vPerfil','vp28',function(next,__a){
  let h=next();
  try{const p=P(S.prof);if(p&&p.club===G.user&&p.listed){
    if(!p.ask)p.ask=+(valueOf(p)*1.15).toFixed(2);const v=valueOf(p),w=winInfo();
    const panel=`<div class="ask28"><div class="res"><span>Preço pedido</span><b>${mi(p.ask)}</b></div><div class="res"><span>Valor de mercado</span><b>${mi(v)} (${Math.round(p.ask/v*100)}%)</b></div><div class="res"><span>Interesse dos clubes</span><b>${demandTxt(p)}</b></div>${w.open?'':'<p class="news">🔴 Janela fechada: só chegam propostas quando abrir.</p>'}<button class="btn sm" data-a="askdn" data-id="${p.id}">−10%</button><button class="btn sm ghost" data-a="askup" data-id="${p.id}">+10%</button><button class="btn sm ghost" data-a="askauto">${G.mkt&&G.mkt.auto?'✔ Corte automático (−5%/rod.)':'Cortar 5% por rodada'}</button></div>`;
    h=h.replace(/(<button[^>]*data-a="plist"[^>]*>[^<]*<\/button>)/,'$1'+panel)}}catch(e){console.error('vp28 '+e.message)}
  return h;
});

/* ======== base dos outros clubes: negociação dura ======== */
buyYouth=function(cid,i){
  ex();const s=C(cid),y=s.youth[i],c=userClub();
  if(!y)return 'Jogador não encontrado.';
  if(!winOpen())return CLOSED;
  G.ylock=G.ylock||{};if(G.ylock[cid]>G.round)return s.name+' não quer papo sobre a base por enquanto.';
  const bi=baseIdx(s),rv=isRival(c,s);
  const fee=+(y.value*(2.4+bi/35+(y.stars>=4?.8:0)+(rv?1.2:0))).toFixed(2);
  if(G.fin.caixa<fee)return s.name+' pede '+mi(fee)+' pelo garoto. Caixa insuficiente.';
  if(c.squad.length>=30)return 'Elenco cheio (máximo 30).';
  const pAcc=clamp(.46-bi/260-Math.max(0,y.stars-3)*.09-(rv?.25:0)+(fee>y.value*3.2?.06:0),.05,.6);
  if(Math.random()>pAcc){G.ylock[cid]=G.round+3;mail('youth','🚫 '+s.name+' barrou a venda de '+y.name,s.name+' recusou vender a joia da base'+(rv?' (ainda mais sendo rival!)':'')+' e fechou a porta por 3 rodadas. Pediam '+mi(fee)+'.',[],'');return s.name+' recusou vender '+y.name+' e fechou a porta por 3 rodadas.'}
  s.youth.splice(i,1);fillYouth(s);G.fin.caixa=+(G.fin.caixa-fee).toFixed(2);
  const ovr=youthOvr91(y,trainerQ91(c),c);const p=mkPlayer(y.role,ovr,y.age,c.id,y.name,false);p.tr=y.tr.slice();p.form=s.id;
  c.squad.push(p.id);logX(p,s.id,c.id,fee);
  mail('youth','✅ '+y.name+' contratado da base do '+s.name,'Fechado por '+mi(fee)+' ('+y.stars+'★). Chegou no elenco principal.',[{l:'Ver jogador',k:'prof',p:{pid:p.id},g:1}],'');
  return null;
};
/* rivais travam negociação do usuário e entre si */
hookAround('negStart','ns_neg28',function(next,__a){let [pid]=__a;
  const p=P(pid),c=userClub();
  if(p&&p.club>=0&&p.club!==G.user&&winOpen()&&isRival(c,C(p.club))&&!(G.nlock&&G.nlock[pid]>G.round)){
    if(Math.random()<.5){G.nlock=G.nlock||{};G.nlock[pid]=G.round+4;return C(p.club).name+' não negocia com o rival. Tente de novo daqui a 4 rodadas.'}}
  return next();
});

/* ======== contratos de patrocínio travados ======== */
hookAround('signMaster','sm28',function(next,A){
  const [o,mode]=A;
  const y=S.spYrs===3?3:1;let o2=o;
  if(y===3)o2=Object.assign({},o,{fixed:+(o.fixed*1.05).toFixed(2),perWin:+((o.perWin||0)*1.05).toFixed(3),topBonus:+((o.topBonus||0)*1.05).toFixed(2),titleBonus:+((o.titleBonus||0)*1.05).toFixed(2)});
  next(o2,mode);
  if(G.sponsor){G.sponsor.yrs=y;G.sponsor.since=G.season;G.sponsor.until=G.season+y-1}
  S.spYrs=1;
});
function spLeft(x){const u=x.until===undefined?G.season:x.until;return Math.max(1,u-G.season+1)}
function spFee(val,left){return +Math.max(.3,val*.35*left).toFixed(1)}
function yrsToggle(){const y=S.spYrs===3?3:1;return `<div class="seg" style="margin:8px 0"><button class="${y===1?'on':''}" data-a="spyrs" data-v="1">1 temporada</button><button class="${y===3?'on':''}" data-a="spyrs" data-v="3">3 temporadas <small>+5%</small></button></div><p class="foot keep">Depois de assinado o contrato é travado: pra sair antes tem que pagar multa de ~35% do valor por temporada restante.</p>`}
hookAround('vModal','vm28',function(next,__a){
  const md=S.modal;
  if(md&&md.t==='inbox')return mailHtml();
  if(md&&md.t==='sponsor'&&G.sponsor&&!md.free){
    const s=G.sponsor,left=spLeft(s),fee=spFee(s.fixed,left);
    return `<div class="wrap lock28"><button class="btn ghost sm" data-a="mxclose">← Voltar</button><h2>🔒 Patrocínio master travado</h2><div class="card"><div class="res"><span>${esc(s.name)}</span><b>${mi(s.fixed)}/ano</b></div><div class="res"><span>Vigência</span><b>até a T${s.until!==undefined?s.until:G.season} (${left} temporada${left>1?'s':''})</b></div><div class="res"><span>Multa pra rescindir</span><b>${mi(fee)}</b></div><p class="news">Contrato assinado não muda no meio do caminho. Rescindir paga a multa agora e abre as ofertas de novo.</p><button class="btn big" data-a="sprescind">Rescindir pagando ${mi(fee)}</button><button class="btn big ghost" data-a="mxclose">Manter contrato</button></div></div>`}
  if(md&&md.t==='slotlock'){
    const s=G.mk.slots[md.slot];if(!s){S.modal=null;return next()}
    const left=spLeft(s),fee=spFee(s.val,left);
    return `<div class="wrap lock28"><button class="btn ghost sm" data-a="mxclose">← Voltar</button><h2>🔒 ${SLOTD[md.slot][0]} · contrato travado</h2><div class="card"><div class="res"><span>${esc(s.name)}</span><b>${mi(s.val)}/ano</b></div><div class="res"><span>Vigência</span><b>até a T${s.until!==undefined?s.until:G.season} (${left} temporada${left>1?'s':''})</b></div><div class="res"><span>Multa pra rescindir</span><b>${mi(fee)}</b></div><button class="btn big" data-a="slotresc" data-s="${md.slot}">Rescindir pagando ${mi(fee)}</button><button class="btn big ghost" data-a="mxclose">Manter contrato</button></div></div>`}
  if(md&&md.t==='naminglock'&&G.naming){
    const n=G.naming,fee=+Math.max(.5,n.val*.5*n.yrs).toFixed(1);
    return `<div class="wrap lock28"><button class="btn ghost sm" data-a="mxclose">← Voltar</button><h2>🔒 Naming rights</h2><div class="card"><div class="res"><span>${esc(n.name)}</span><b>${mi(n.val)}/ano</b></div><div class="res"><span>Falta</span><b>${n.yrs} temporada(s)</b></div><div class="res"><span>Multa pra rescindir</span><b>${mi(fee)}</b></div><button class="btn big" data-a="namresc">Rescindir pagando ${mi(fee)}</button><button class="btn big ghost" data-a="mxclose">Manter contrato</button></div></div>`}
  let h=next();
  try{
    if(md&&md.t==='sponsor'&&md.i!==undefined&&md.i!==null)h=h.replace(/(<p class="news">Como você quer receber[^<]*<\/p>)/,'$1'+yrsToggle());
    if(md&&md.t==='round'&&mailBox().length){const n=unreadN();if(n)h=h.replace(/<\/div>\s*$/,'<button class="btn big ghost" data-a="inbox" style="margin:8px 0">✉️ '+n+' e-mail(s) novo(s) na caixa de entrada</button></div>')}
  }catch(e){console.error('vm28 '+e.message)}
  return h;
});
Object.assign(A,{
  spyrs(d){S.spYrs=+d.v===3?3:1;render()},
  sprescind(){ex();const s=G.sponsor;if(!s)return;const fee=spFee(s.fixed,spLeft(s));if(G.fin.caixa<fee)return toast('Sem caixa pra pagar a multa de '+mi(fee)+'.');
    G.fin.caixa=+(G.fin.caixa-fee).toFixed(2);try{G.mk.acc.cost+=fee}catch(e){}G.sponsor=null;addNews('Multa de '+mi(fee)+' paga pra rescindir com '+s.name+'.');S.spYrs=1;S.modal={t:'sponsor',free:1};save();render()},
  slotresc(d){ex();const s=G.mk.slots[d.s];if(!s)return;const fee=spFee(s.val,spLeft(s));if(G.fin.caixa<fee)return toast('Sem caixa pra pagar a multa de '+mi(fee)+'.');
    G.fin.caixa=+(G.fin.caixa-fee).toFixed(2);try{G.mk.acc.cost+=fee}catch(e){}G.mk.slots[d.s]=null;G.mk.open={slot:d.s};S.modal=null;G.view='marketing';save();render();toast('Contrato rescindido (multa '+mi(fee)+'). Escolha um novo patrocinador.')},
  namresc(){ex();const n=G.naming;if(!n)return;const fee=+Math.max(.5,n.val*.5*n.yrs).toFixed(1);if(G.fin.caixa<fee)return toast('Sem caixa pra pagar a multa de '+mi(fee)+'.');
    G.fin.caixa=+(G.fin.caixa-fee).toFixed(2);G.naming=null;S.modal=null;save();render();toast('Naming rights rescindido (multa '+mi(fee)+').')},
  namlock(){S.modal={t:'naminglock'};render();window.scrollTo(0,0)},
  mkmode(d){ex();const sl=G.mk.open.slot,y=S.spYrs===3?3:1;let o=slotOffers(sl)[G.mk.open.i];
    if(y===3)o=Object.assign({},o,{val:+(o.val*1.05).toFixed(1),win:+((o.win||0)*1.05).toFixed(3),topBonus:+((o.topBonus||0)*1.05).toFixed(2),title:+((o.title||0)*1.05).toFixed(2)});
    o.mode=d.m;o.yrs=y;o.until=G.season+y-1;G.mk.slots[sl]=o;
    if(d.m==='vista'){const v=+(o.val*SPN_VISTA).toFixed(1);G.fin.caixa=+(G.fin.caixa+v).toFixed(1);G.mk.acc.spx+=v}
    G.mk.open=null;S.spYrs=1;save();render();toast(o.name+' fechou ('+MODEL24[d.m]+', '+y+' temp.).')}
});
const _mko28=A.mkopen;A.mkopen=function(d){
  ex();const s=G.mk.slots[d.s];
  if(s&&!(G.mk.open&&G.mk.open.slot===d.s)){S.modal={t:'slotlock',slot:d.s};render();window.scrollTo(0,0);return}
  return _mko28.apply(this,arguments);
};
/* continuidade entre temporadas */
hookAround('newSeason','ext28_ns28',function(next,A){
  const sp=G.sponsor;const r=next();
  try{ex();
    if(sp&&sp.until!==undefined&&sp.until>=G.season){G.sponsor=sp;
      if(sp.mode==='vista'){const v=+(sp.fixed*SPN_VISTA).toFixed(1);G.fin.caixa=+(G.fin.caixa+v).toFixed(1);G.mk.acc.sp+=v}
      mail('spon','🤝 '+sp.name+' continua como patrocinador master','Contrato travado até a T'+sp.until+'. Valor: '+mi(sp.fixed)+'/ano.',[],'')}
    for(const k in G.mk.slots){const s=G.mk.slots[k];
      if(s&&s.until!==undefined&&s.until<G.season){
        if(s.mode==='vista'){const v=+(s.val*SPN_VISTA).toFixed(1);G.fin.caixa=+(G.fin.caixa-v).toFixed(1);G.mk.acc.spx-=v}
        G.mk.slots[k]=null;addNews('Contrato de '+s.name+' ('+SLOTD[k][0]+') terminou.')}}
  }catch(e){console.error('ns28 '+e.message)}
  return r;
});
const _nsA28=A.newseason;A.newseason=function(){_nsA28.apply(this,arguments);if(G.sponsor&&S.modal&&S.modal.t==='sponsor'){S.modal=null;render()}};
const _tjA28=A.takejob;A.takejob=function(){_tjA28.apply(this,arguments);if(G.sponsor&&S.modal&&S.modal.t==='sponsor'){S.modal=null;render()}};
/* ao assumir outro clube, os contratos já estão assinados */
function prefillSpons(){
  const base=G.season+(G.round>=NR()?1:0),rg=rngS(hashN(G.user,G.season,77,5));
  const offs=sponsorOffers(),o=offs[Math.floor(rg()*offs.length)],y=1+Math.floor(rg()*3);
  G.sponsor=Object.assign({},o,{mode:'parc',pay:+payOf({mode:'parc',val:o.fixed}).toFixed(2),yrs:y,until:base+y-1,since:G.season,inherited:true});
  G.mk.slots={};G.mk.open=null;
  for(const sl in SLOTD){if(rg()<.85){const x=slotOffers(sl)[Math.floor(rg()*3)];const yy=1+Math.floor(rg()*3);x.mode='parc';x.yrs=yy;x.until=base+yy-1;G.mk.slots[sl]=x}}
}
hookAround('takeJob','tj28',function(next,__a){let [id]=__a;next();try{ex();prefillSpons();addNews('Você herdou os contratos de patrocínio do '+C(id).name+'.');save()}catch(e){console.error('prefill '+e.message)}});

/* ======== marketing: contratos + naming rights bem à vista ======== */
hookAround('vMarketing','vk28',function(next,__a){
  let h=next();
  try{ex();const sp=G.sponsor,rows=[];
    if(sp)rows.push(`<div class="res"><span>⭐ Master · ${esc(sp.name)}</span><b>${mi(sp.fixed)} · até T${sp.until!==undefined?sp.until:G.season}</b></div>`);
    for(const k in SLOTD){const s=G.mk.slots[k];if(s)rows.push(`<div class="res"><span>${SLOTD[k][0]} · ${esc(s.name)}</span><b>${mi(s.val)} · até T${s.until!==undefined?s.until:G.season}</b></div>`)}
    let nm;
    if(G.naming){const n=G.naming;nm=`<div class="res"><span>🏟️ ${esc(n.name)}</span><b>${mi(n.val)}/ano · mais ${n.yrs} temp.</b></div><button class="btn sm ghost" data-a="namlock">🔒 Contrato</button>`}
    else{nm=namingOffers().map((o,i)=>`<button class="off" data-a="nampick" data-i="${i}"><span><b>${esc(o.name)}</b><small>${o.yrs} anos · torcida −${o.hum} de humor</small></span><b>${mi(o.val)}/ano</b></button>`).join('')+'<p class="foot keep">Contrato longo e travado: rescindir custa multa.</p>'}
    const card=`<section class="sec card"><h3>Contratos<small>🔒 travados até o fim</small></h3>${rows.length?rows.join(''):'<p class="news">Nenhum contrato ainda.</p>'}<div class="k" style="margin-top:10px">Naming rights do estádio</div>${nm}</section>`;
    const idx=h.indexOf('Patrocínios na camisa');const j=idx>0?h.lastIndexOf('<section',idx):-1;
    h=j>0?h.slice(0,j)+card+h.slice(j):h.replace(/<\/div>\s*$/,card+'</div>');
    h=h.replace(/>Trocar<\/button>/g,'>🔒 Contrato</button>');
    h=h.replace(/(como receber [^<]*<\/div>)/,'$1'+yrsToggle());
  }catch(e){console.error('vk28 '+e.message)}
  return h;
});

/* ======== Copinha passiva: resultado chega depois ======== */
hookAround('addNews','an28',function(next,__a){let [t]=__a;if(G&&G._cpHold){(G._cpq=G._cpq||[]).push({n:t});return}return next()});
hookAround('paperLine','pln28',function(next,__a){let [h,sub]=__a;if(G&&G._cpHold){(G._cpq=G._cpq||[]).push({p:[h,sub]});return}return next()});
hookAround('copinhaRun','cr28',function(next,__a){G._cpHold=true;try{next()}finally{G._cpHold=false}const b=cpBox();if(b.cur&&b.cur.shown===undefined)b.cur.shown=false});
function copinhaReveal(){
  const b=cpBox(),r=b.cur;if(!r||r.shown)return;
  r.shown=true;(G._cpq||[]).forEach(x=>{if(x.n)addNews(x.n);else if(x.p)paperLine(x.p[0],x.p[1])});G._cpq=[];
  const ms=r.matches.map(m=>`• ${m.l}: ${m.a} ${m.ga} x ${m.gb} ${m.b}${m.pen?' (pên.)':''}`).join('\n');
  mail('cp','🏆 Copinha '+r.yr+': '+(r.out==='Campeão'?'SUA BASE É CAMPEÃ!':'sua base parou em '+r.out.toLowerCase()),'O técnico da base cuidou de tudo, você só recebe o resultado.\nCampeão: '+r.cname+'.\n'+ms+(r.top?'\nArtilheiro: '+r.top:'')+(r.rev?'\nRevelação: '+r.rev:'')+'\nPremiação: '+mi(r.prize),[{l:'Ver na Base',k:'goto',p:{v:'base'},g:1}],'cp');
}
hookAround('copinhaCard','cc28',function(next,__a){
  const b=cpBox();if(b.cur&&!b.cur.shown)return `<section class="sec card cp27"><h3>Copinha ${b.cur.yr}<small>Copa São Paulo Sub-20</small></h3><p class="news">Seus garotos estão na Copinha com o treinador da base. Você não joga nem assiste: o resultado chega por e-mail depois da próxima rodada.</p></section>`;
  return next();
});

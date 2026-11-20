/* ===== home estilo Brasfoot, barra de ícones, som, conquistas ===== */
const SND={on:true,ctx:null};try{SND.on=localStorage.getItem('rfc_snd')!=='0'}catch(e){}
function beep(freqs,dur=0.12,type='sine',vol=0.08){
  if(!SND.on)return;
  try{SND.ctx=SND.ctx||new(window.AudioContext||window.webkitAudioContext)();const t0=SND.ctx.currentTime;
    freqs.forEach((f,i)=>{const o=SND.ctx.createOscillator(),g=SND.ctx.createGain();o.type=type;o.frequency.value=f;g.gain.setValueAtTime(vol,t0+i*dur);g.gain.exponentialRampToValueAtTime(0.0001,t0+(i+1)*dur);o.connect(g);g.connect(SND.ctx.destination);o.start(t0+i*dur);o.stop(t0+(i+1)*dur+0.02)})}catch(e){}
}
const SFX={goal:()=>beep([523,659,784,1047,1319],0.1,'triangle',0.1),sad:()=>beep([330,262,196],0.17,'sawtooth',0.04),whistle:()=>beep([2300,2300,2300],0.13,'square',0.03),pen:()=>beep([440,440,440],0.2,'square',0.03)};
const vib=p=>{try{if(SND.on&&navigator.vibrate)navigator.vibrate(p)}catch(e){}};
const fmtK=v=>v<1?Math.round(v*1000)+' mil':(v>=10?v.toFixed(0):v.toFixed(1)).replace('.',',')+' mi';
const ROLEO={GOL:0,LAT:1,ZAG:2,VOL:3,MEI:4,PNT:5,ATA:6};
function vInicio(){
  const c=userClub();const fx=G.round<NR()?G.fixtures[G.round][userFixtureIdx()]:null;
  const opp=fx?C(fx[0]===c.id?fx[1]:fx[0]):null;const home=fx&&fx[0]===c.id;
  const conf=G.board.conf,hum=c.humor,pr=G.press;const tc=onC(c.color);
  const cl=opp&&isClassico(c.id,opp.id);
  let ids=c.squad.slice();
  const g={todos:null,gol:'GOL',def:'DEF',mei:'MEI',ata:'ATA'}[S.pg];
  if(g)ids=ids.filter(id=>{const r=P(id).role;return g==='DEF'?(r==='ZAG'||r==='LAT'):g==='MEI'?(r==='VOL'||r==='MEI'||r==='PNT'):g==='ATA'?r==='ATA':r==='GOL'});
  if(S.sort==='ovr')ids.sort((a,b)=>P(b).ovr-P(a).ovr);else if(S.sort==='age')ids.sort((a,b)=>P(a).age-P(b).age);else if(S.sort==='fit')ids.sort((a,b)=>P(b).fit[c.phil]-P(a).fit[c.phil]);
  else ids.sort((a,b)=>ROLEO[P(a).role]-ROLEO[P(b).role]||P(b).ovr-P(a).ovr);
  const sel=S.hsel&&P(S.hsel)&&P(S.hsel).club===c.id?P(S.hsel):null;
  const pc=`<aside class="cpanel" style="background:${c.color};color:${tc};--tc:${tc}">
   <div class="cp1">${crest(c,58)}<div><h2>${c.name}</h2><div class="sm">${G.coach} · ${G.asst?G.asst.name:''}</div></div></div>
   <button class="cp2" data-a="nav" data-v="clube"><span>💵 ${mi(G.fin.caixa)}</span><span>${pr?'💬 1':'💬'}</span></button><div class="sm">Dívida ${mi(c.debt||0)} · ${healthOf(c)[1]}${G.fx&&G.fx.ban?' · registro bloqueado':''}</div>
   <div class="sm">Brasileirão - Série A · ${posOf(c)}º lugar</div>
   <div class="bars"><div><small>Confiança diretoria</small><div class="bar2"><i style="width:${conf}%"></i><b>${Math.round(conf)}%</b></div></div><div><small>Confiança torcida</small><div class="bar2"><i style="width:${hum}%"></i><b>${Math.round(hum)}%</b></div></div></div>
   ${opp?`<div class="nx"><div class="nxh">Próximo jogo - ${home?'Casa':'Fora'}${cl?' · CLÁSSICO':''}</div><div class="nxb">${crest(opp,46)}<div><b>${opp.name}</b><div class="sm2">Brasileirão - Série A · ${G.round+1}ª rodada · ${posOf(opp)}º</div></div></div></div>
   <button class="bigbtn" data-a="nav" data-v="tatica">📋 Escalar Time</button>`:`<div class="nx"><div class="nxh">Temporada encerrada</div></div>`}
   ${sel?`<div class="pc"><div class="pch"><b>${esc(nameOf(sel))}</b><span>F:${sel.ovr}</span></div><div class="sm2">${ROLEABB[sel.role]} · ${sel.age} anos · ${sel.tr.map(t=>TN[t][0]).join(' / ')}</div><div class="pcg"><span>Valor ${fmtK(valueOf(sel))}</span><span>Salário ${fmtK(salOf(sel))}</span></div><div class="pcg"><span>Jogos ${sel.games}</span><span>Gols ${sel.goals}</span><span>Ass. ${sel.ast}</span><span>Nota ${sel.rn?(sel.rsum/sel.rn).toFixed(1):'--'}</span></div><div class="sm2">Toque de novo no jogador para abrir o perfil.</div></div>`:''}
  </aside>`;
  const tb=`<div class="seg sm"><button class="${S.pg==='todos'?'on':''}" data-a="pg" data-v="todos">Todos</button>${[['gol','GOL'],['def','DEF'],['mei','MEI'],['ata','ATA']].map(([k,l])=>`<button class="${S.pg===k?'on':''}" data-a="pg" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="seg sm">${[['pos','Posição'],['ovr','Força'],['age','Idade'],['fit','Encaixe']].map(([k,l])=>`<button class="${S.sort===k?'on':''}" data-a="sort" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="sqw"><table class="sq"><thead><tr><th>P</th><th class="nmc">Nome</th><th>F</th><th>Energia</th><th>Salário</th><th>Car.</th><th>Id</th><th>G</th><th>A</th><th>NM</th></tr></thead><tbody>
  ${ids.map(id=>{const p=P(id);const nm=p.rn?p.rsum/p.rn:null;return `<tr class="${S.hsel===id?'sel':''} ${p.inj>0?'hurt':''}" data-a="hrow" data-id="${id}"><td class="p">${roleLabel(p)}</td><td class="nmc">${esc(nameOf(p))}${p.inj>0?' 🩹':''}${p.listed?' 💲':''}${p.yc>=2?' 🟨':''}</td><td><b>${p.ovr}</b></td><td><span class="en" style="--c:${c.color}"><i style="width:${Math.round(p.en)}%"></i><u>${Math.round(p.en)}%</u></span></td><td>${fmtK(salOf(p))}</td><td>${trAbb(p)}</td><td class="${p.age>=33?'old':p.age<=21?'yng':''}">${p.age}</td><td>${p.goals}</td><td>${p.ast}</td><td class="${nm&&nm<5.5?'bad':''}">${nm?nm.toFixed(1):'--'}</td></tr>`}).join('')}
  </tbody></table></div>`;
  const extra=`${pr?`<div class="card press"><div class="k">Imprensa pergunta · ${esc(pr.who)}</div><p class="q">${esc(pr.q)}</p>${pr.opts.map((o,i)=>`<button class="opt" data-a="press" data-i="${i}">${esc(o.t)}</button>`).join('')}<button class="opt ghost" data-a="press" data-i="-1">Não responder</button></div>`:''}
  <button class="card paperc" data-a="paper"><div class="mast">${G.paper.length?esc(G.paper[0].paper):'Jornal'}</div>${G.paper.length?`<h3>${esc(G.paper[0].h)}</h3><p>${esc(G.paper[0].sub)}</p><div class="k">por ${esc(G.paper[0].by)} · ler o jornal</div>`:'<p>Sem manchetes ainda.</p>'}</button>
  ${G.lastRound?`<div class="card"><div class="k">Última rodada (${G.lastRound.n}) · sua forma ${formOf(c.id).map(r=>`<i class="fm ${r}">${r}</i>`).join('')}</div>${G.lastRound.results.map(r=>`<div class="res ${r.u?'me':''}"><span>${C(r.h).sig}</span><b>${r.hg} – ${r.ag}</b><span class="rt">${C(r.a).sig}</span></div>`).join('')}</div>`:''}`;
  return `<div class="home"><div class="hl">${pc}</div><div class="hr">${extra}${tb}</div></div>`;
}
function vOpcoes(){
  return `<div class="wrap"><h2>Opções</h2><div class="card"><div class="res"><span>Som e vibração</span><button class="btn sm ${SND.on?'':'ghost'}" data-a="snd">${SND.on?'Ligado':'Desligado'}</button></div><div class="res"><span>Tema</span><span><button class="btn sm ghost" data-a="theme" data-v="light">Claro</button> <button class="btn sm ghost" data-a="theme" data-v="dark">Escuro</button> <button class="btn sm ghost" data-a="theme" data-v="">Auto</button></span></div></div>
  <div class="card"><button class="btn ghost" data-a="reset">Reiniciar jogo</button></div><p class="foot">Resenha FC · demo v2 · Brasileirão Série A</p></div>`;
}
function vConquistas(){
  return `<div class="wrap"><button class="back" data-a="nav" data-v="opcoes">‹ Opções</button><h2>Conquistas · ${Object.keys(G.ach).length}/${Object.keys(ACH).length}</h2>${Object.entries(ACH).map(([id,[ic,t,d]])=>{const got=G.ach[id];return `<div class="card ach ${got?'got':''}"><span class="ai">${got?ic:'🔒'}</span><div><b>${t}</b><div class="k">${d}</div>${got?`<div class="k">Temporada ${got.s}, rodada ${got.r}</div>`:''}</div></div>`}).join('')}</div>`;
}
function confettiH(){const cols=['#ffd426','#2fd36f','#ff5a52','#4aa8ff','#fff'];return `<div class="confetti" aria-hidden="true">${Array.from({length:36},(_,i)=>`<s style="left:${(i*37)%100}%;background:${cols[i%5]};animation-delay:${(i%9)*0.18}s;animation-duration:${2.2+(i%5)*0.4}s"></s>`).join('')}</div>`}
function render(){
  const app=$('#app');
  if(!G||G.phase==='start'){app.innerHTML=vStart()+toastH();bind();return}
  if(S.match&&R){app.innerHTML=(S.panel?vPanel():vMatch())+flashH()+toastH();bind();return}
  ex();const c=userClub();
  const views={inicio:vInicio,elenco:vInicio,tatica:vTatica,liga:vLiga,mercado:vMercado,clube:vClube,times:vTimes,agenda:vAgenda,estadio:vEstadio,juniores:vJuniores,base:vBase,meutec:vMeuTec,medico:vMedico,dir:vDir,treino:vTreino,vest:vVest,assist:vAssist,staff:vStaff,comp:vComp,marketing:vMarketing,torcida:vTorcida,tecnicos:vTecnicos,historia:vHistoria,opcoes:vOpcoes};
  const icons=[['agenda','📅','Agenda'],['liga','🏆','Tabelas'],['meutec','🧠','Técnico'],['dir','🏛️','Diretoria'],['medico','🩺','Médico'],['treino','🏋️','Treino'],['vest','🗣️','Vestiário'],['assist','🧢','Auxiliar'],['staff','🧑‍💼','Comissão'],['comp','🌎','Copas'],['marketing','📣','Marketing'],['torcida','🔥','Torcida'],['estadio','🏟️','Estádio'],['base','🌱','Base'],['times','👕','Times'],['mercado','🔍','Procura'],['tecnicos','🧢','Técnicos'],['historia','📜','História'],['opcoes','⚙️','Opções']];
  let body;
  if(S.modal)body=vModal();else if(S.prof!==null)body=vPerfil();else if(S.paper)body=vJornal();else body=(views[G.view]||vInicio)();
  const ab=G.newAch&&G.newAch.length?`<button class="achb" data-a="achok">${G.newAch.map(id=>ACH[id][0]+' Conquista: '+ACH[id][1]).join(' · ')}</button>`:'';
  const cur=G.view==='elenco'?'inicio':G.view;
  const bottom=S.modal?'':`<nav class="nav2"><button class="${cur==='inicio'&&!S.paper&&S.prof===null?'on':''}" data-a="nav" data-v="inicio">🏠<small>Início</small></button><button class="${cur==='tatica'?'on':''}" data-a="nav" data-v="tatica">📋<small>Tática</small></button>${G.round<NR()?`<button class="go" data-a="pre">⚽<small>JOGAR</small></button>`:`<button class="go" data-a="nav" data-v="inicio">⚽<small>FIM</small></button>`}<button class="${cur==='mercado'?'on':''}" data-a="nav" data-v="mercado">🔍<small>Mercado</small></button><button data-a="paper">📰<small>Jornal</small></button></nav>`;
  app.innerHTML=`<header class="top2"><div class="ic">${icons.map(([k,e,l])=>`<button class="${cur===k&&!S.paper&&S.prof===null?'on':''}" data-a="nav" data-v="${k}"><span>${e}</span><small>${l}</small></button>`).join('')}</div><div class="dt">${gdate()}</div></header>${ab}
  <main class="main">${body}</main>${bottom}${toastH()}`;
  bind();
}
function flashH(){return S.flash&&Date.now()<S.flash.until?`<div class="flash ${S.flash.cls}"><b>${esc(S.flash.t)}</b>${S.flash.s?`<span>${esc(S.flash.s)}</span>`:''}</div>`:''}
Object.assign(A,{
 hrow(d){const id=+d.id;if(S.hsel===id){S.prof=id}else S.hsel=id;render()},
 snd(){SND.on=!SND.on;try{localStorage.setItem('rfc_snd',SND.on?'1':'0')}catch(e){}if(SND.on)SFX.whistle();render()},
 theme(d){const r=document.documentElement;if(d.v)r.setAttribute('data-theme',d.v);else r.removeAttribute('data-theme');render()},
 achok(){G.newAch=[];render()}
});

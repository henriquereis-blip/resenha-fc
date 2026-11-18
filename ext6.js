/* ext6: telas "cabem na tela" (tática, intervalo) + transmissão própria da partida */
const _render6=render;
render=function(){_render6();fitAll()};
window.addEventListener('resize',()=>fitAll());

function oppStrip(c){
  const fx=G.round<NR()?G.fixtures[G.round][userFixtureIdx()]:null;if(!fx)return '';
  const opp=C(fx[0]===c.id?fx[1]:fx[0]),home=fx[0]===c.id;
  const grass=grassFor(G.season,G.round,fx[0]);
  return `<div class="ostrip"><span class="kits"><s style="background:${kitBg(c)}"></s><s style="background:${kitBg(opp)}"></s></span>${crest(opp,26)}<div class="ot"><b>${opp.name}</b><small>${home?'em casa':'fora'} · ${posOf(opp)}º · força ${strength(opp).toFixed(0)} · ${opp.phil} · gramado ${grass}</small></div><div class="of">${formOf(opp.id).map(r=>`<i class="fm ${r}">${r}</i>`).join('')}</div></div>`;
}
const selH=(id,lab,arr,cur)=>`<label class="sl"><small>${lab}</small><select id="${id}">${arr.map(f=>`<option ${f===cur?'selected':''}>${f}</option>`).join('')}</select></label>`;



/* pressão do jogo: -1 (visitante) .. +1 (mandante), olhando os últimos 14 minutos */
function momentum(m){
  let h=0,a=0;const W={goal:3,miss:1.4,save:1.4,yellow:.3,red:-1};
  m.ev.forEach(e=>{if(e.side==='n'||m.min-e.min>14)return;const w=(W[e.type]??.5)*(1-(m.min-e.min)/18);if(e.type==='yellow'||e.type==='red'){if(e.side==='h')a+=Math.abs(w)*.5;else h+=Math.abs(w)*.5}else if(e.side==='h')h+=w;else a+=w});
  return (h-a)/(h+a+1.5);
}
function vMatch(){
  const m=R.ms[R.ui];const foc=R.ms[R.focus];const h=foc.h.club,a=foc.a.club;const mine=R.focus===R.ui;
  const mo=momentum(foc);const bx=50+mo*40;
  const evs=foc.ev.slice().reverse().slice(0,40);
  const ic={goal:'⚽',miss:'💨',save:'🧤',yellow:'🟨',red:'🟥',sub:'🔁',inj:'🚑'};
  const tl=foc.ev.filter(e=>e.side!=='n'&&(e.type==='goal'||e.type==='red'||e.type==='yellow')).map(e=>`<i class="tm ${e.side}" style="left:${Math.min(98,e.min/90*100)}%">${ic[e.type]}</i>`).join('');
  const pn=S.pen?penCard():'';
  const st=foc.stats,tot=(x,y)=>x+y||1;
  const bar=(lab,x,y)=>`<div class="sbar"><b>${x}</b><div class="bb"><i style="width:${x/tot(x,y)*100}%;background:${kitAcc(h)}"></i><s style="width:${y/tot(x,y)*100}%;background:${kitAcc(a)}"></s></div><b>${y}</b><small>${lab}</small></div>`;
  const dom=(st.sh*1+st.shT*1.5),dom2=(st.sa*1+st.saT*1.5);
  return `<div class="wrap fit mt">
  <div class="sb"><div class="tm1">${crest(h,38)}<b>${h.sig}</b></div><div class="mid"><b class="sc">${foc.hg} – ${foc.ag}</b><span class="clk ${foc.done?'end':''}">${foc.done?'FIM':foc.min+"'"}${S.paused&&!foc.done?' · pausado':''}</span></div><div class="tm1 r"><b>${a.sig}</b>${crest(a,38)}</div></div>
  <div class="live"><svg class="lines" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="rgba(255,255,255,.5)" stroke-width=".9"><rect x="2" y="2" width="196" height="96"/><line x1="100" y1="2" x2="100" y2="98"/><circle cx="100" cy="50" r="13"/><rect x="2" y="26" width="24" height="48"/><rect x="174" y="26" width="24" height="48"/></g></svg>
   <div class="ball" style="left:${bx}%"></div>${dotsOf(foc,'h')}${dotsOf(foc,'a')}${S.flash&&mine&&Date.now()<S.flash.until?'':''}</div>
  <div class="pres"><span>${h.sig}</span><div class="pb"><i style="left:${50+mo*50}%"></i></div><span>${a.sig}</span></div>
  <div class="tline"><div class="tk"><i style="width:${foc.min/90*100}%"></i></div>${tl}</div>
  <div class="ticker">${evs.length?evs.map(e=>e.side==='n'?`<div class="ev info"><span class="m">${e.min}' · ${esc(e.text)}</span></div>`:`<div class="tr2 ${e.side} ${e.type}"><span class="mn">${e.min}'</span><span class="ico">${ic[e.type]||'•'}</span><span class="tx">${esc(e.text)}</span></div>`).join(''):'<p class="news center">Bola rolando…</p>'}</div>
  <div class="sbars">${bar('Finalizações',st.sh,st.sa)}${bar('No gol',st.shT,st.saT)}</div>
  <div class="ctrl2">${m.done||roundDone()?`<button class="btn big" data-a="mend">Continuar ›</button>`:`<button class="btn" data-a="mtoggle">${S.paused?'Seguir':'Pausa'}</button><button class="btn ghost ${S.speed===1?'on':''}" data-a="spd" data-v="1">1×</button><button class="btn ghost ${S.speed===3?'on':''}" data-a="spd" data-v="3">3×</button><button class="btn ghost" data-a="mskip">Fim ⏩</button><button class="btn ghost" data-a="mtac">Tática</button>`}</div>
  <div class="gchips">${R.ms.map((x,i)=>`<button class="gc ${i===R.focus?'sel':''} ${i===R.ui?'me':''}" data-a="mfocus" data-i="${i}">${x.h.club.sig} <b>${x.hg}–${x.ag}</b> ${x.a.club.sig}</button>`).join('')}</div></div>${pn}`;
}
function kitAcc(c){return c.c1==='#ffffff'||c.c1==='#fff'?c.c2:c.c1}

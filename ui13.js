/* ui13: visual FIFA (tática/substituição), rodada ao vivo, treino, vestiário, assistente */
(function(){const st=document.createElement('style');st.textContent=`
.fifa{background:#15181b;border-radius:10px;padding:8px;color:#fff}
.fifa .pitch{background:#1d2024!important;border:1px solid #2c3136;border-radius:6px}
.fifa .pitch.lg{background:#5d9468!important;border-color:#86b890}.fifa .pitch.lg .lines g{stroke:rgba(255,255,255,.5)!important}
.fifa .pitch .lines g{stroke:rgba(255,255,255,.16)!important}
.fifa .tok{width:64px}
.fifa .tok .wt{position:absolute;top:-9px;left:50%;transform:translateX(-50%);font:700 8px var(--fb);text-decoration:none;color:#ffffffaa;background:#0006;border-radius:4px;padding:0 3px;letter-spacing:.04em}
.fs{display:flex;align-items:center;gap:2px;justify-content:center}
.fs svg{width:30px;height:30px;filter:drop-shadow(0 2px 2px #0008)}
.fs .rt{font:700 15px var(--fh);color:#fff;min-width:18px;text-align:left}
.fifa .tok.sel .fs svg,.fifa .bn.sel{outline:none;filter:drop-shadow(0 0 4px var(--accent2))}
.fifa .bn.sel{box-shadow:0 0 0 2px var(--accent2)}
.fifa .tok.hurt .fs svg{filter:grayscale(1)}
.fifa .tn i{font:700 10.5px var(--fb);color:#fff;max-width:64px}
.fifa .tn small{font:600 8.5px var(--fb);color:#9aa4ac}
.eb{display:block;width:30px;height:3px;background:#3a4047;border-radius:2px;margin-top:1px;overflow:hidden}.eb i{display:block;height:100%}
.fifa .side .sec{color:#9aa4ac}.fifa .bn{background:#22262a;border:0;color:#fff}.fifa .bn .bt small{color:#9aa4ac}.fifa .bn .bt i{color:#fff}
.fifa .abar{background:#22262a;color:#fff}
.fcards,.schips,.fxl{width:100%;max-width:100%;min-width:0;box-sizing:border-box;align-self:stretch}.fit .ostrip,.fit .ctl4{width:100%;box-sizing:border-box}
.fcards{display:flex;gap:6px;overflow-x:auto;padding:2px 0 4px;scroll-snap-type:x proximity;flex:0 0 auto;-webkit-overflow-scrolling:touch}
.fc{flex:0 0 84px;scroll-snap-align:start;background:#1f2327;border:1px solid #2c3136;border-radius:6px;color:#fff;padding:3px;text-align:center;position:relative;cursor:pointer}
.fc svg{display:block;width:100%;height:46px;background:#17402a;border-radius:3px}
.fc b{font:700 12px var(--fh);display:block;margin-top:2px}.fc small{font:600 9px var(--fb);color:#9aa4ac;display:block}
.fc.on{background:#f4f6f7;color:#14201a}.fc.on small{color:#4a5a50}.fc.on::after{content:'✓';position:absolute;right:3px;bottom:3px;background:var(--accent);color:#fff;width:15px;height:15px;border-radius:50%;font:800 10px/15px var(--fb)}
.schips{display:flex;gap:5px;overflow-x:auto;flex:0 0 auto}
.sch{flex:0 0 auto;font:700 11.5px var(--fb);padding:5px 9px;border-radius:14px;background:#22262a;color:#cfd6db;border:1px solid #2c3136;white-space:nowrap;cursor:pointer}.sch small{color:#8c97a0;margin-left:4px}.sch.on{background:var(--accent);color:#06210f;border-color:var(--accent)}.sch.on small{color:#06210f}
.fxl{display:flex;gap:5px;overflow-x:auto;flex:0 0 auto}.fxp{flex:0 0 auto;font:700 10.5px var(--fb);padding:2px 7px;border-radius:10px;background:#22262a;color:#cfd6db}.fxp.up{color:#5dff9a}.fxp.dn{color:#ff8a82}
.lvc{display:flex;flex-direction:column;gap:3px}
.lv{display:grid;grid-template-columns:34px 1fr 46px 1fr 56px;align-items:center;gap:4px;padding:6px 8px;border-radius:8px;background:var(--card);border:1px solid var(--line);font:700 13px var(--fb);color:var(--fg);text-align:left;cursor:pointer}
.lv .t{font:800 11px var(--fb);color:var(--mut)}.lv .h{display:flex;gap:5px;align-items:center}.lv .a{display:flex;gap:5px;align-items:center;justify-content:flex-end}.lv .s{font:800 16px var(--fh);text-align:center}
.lv .n{font:800 10px var(--fb);color:var(--bad);text-align:right}.lv.sel{border-color:var(--accent);box-shadow:0 0 0 1px var(--accent) inset}.lv.me{background:color-mix(in srgb,var(--accent2) 16%,var(--card))}
.lv.hot{animation:hotp 1.2s ease 2}@keyframes hotp{0%,100%{background:var(--card)}50%{background:color-mix(in srgb,var(--ok) 35%,var(--card))}}
.lvh{display:flex;align-items:center;justify-content:space-between;font:800 13px var(--fh);text-transform:uppercase;letter-spacing:.06em;color:var(--mut)}
.lvh b{color:var(--fg)}.gfeed{font:600 12.5px var(--fb);color:var(--fg);padding:2px 0}.gfeed span{color:var(--mut)}
.climag{height:10px;border-radius:6px;background:var(--line);overflow:hidden}.climag i{display:block;height:100%}
.tip{border:1px dashed var(--line);border-radius:10px;padding:10px;margin-top:8px;background:color-mix(in srgb,var(--accent2) 8%,var(--card))}
.tip p{margin:0 0 8px;font:600 14px var(--fb)}.tip .row{display:flex;gap:8px;flex-wrap:wrap}
.badge13{position:absolute;top:2px;right:2px;min-width:15px;height:15px;border-radius:8px;background:var(--bad);color:#fff;font:800 10px/15px var(--fb);text-align:center;padding:0 3px}
.ic button{position:relative}
.trg{display:grid;grid-template-columns:1fr 1fr;gap:6px}.trb{padding:10px;border-radius:10px;border:1.5px solid var(--line);background:var(--card);text-align:left;color:var(--fg);font:700 13px var(--fb)}.trb small{display:block;font:500 11px var(--fb);color:var(--mut)}.trb.on{border-color:var(--accent);background:color-mix(in srgb,var(--accent) 12%,var(--card))}
.fam{display:grid;grid-template-columns:96px 1fr 38px 50px;gap:6px;align-items:center;font:600 12.5px var(--fb);padding:3px 0}.fam .bar2{height:8px}
@media(max-width:520px){.fifa .tok{width:46px}.fs svg{width:22px;height:22px}.fs .rt{font-size:12.5px;min-width:14px}.fifa .tn i{font-size:9.5px;max-width:46px}.fifa .tn small{font-size:8px}.eb{width:22px}}
`;document.head.appendChild(st)})();

const ROLEKEY=f=>(f||'').replace(/ (def|Ofen\.|Alas)$/,'');
let svgN=0;
let shirtSvg=(c,kind)=>{const k=kitOf(c,kind||'home'),id='sg'+(svgN++),a=k.a,b=k.b;
  let fill=a,defs='';
  if(k.pat==='v'){defs=`<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${a}"/><rect width="4" height="8" fill="${b}"/></pattern>`;fill=`url(#${id})`}
  else if(k.pat==='h'){defs=`<pattern id="${id}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${a}"/><rect width="8" height="4" fill="${b}"/></pattern>`;fill=`url(#${id})`}
  else if(k.pat==='half'){defs=`<linearGradient id="${id}" x1="0" x2="1"><stop offset=".5" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/></linearGradient>`;fill=`url(#${id})`}
  const edge=lumOf(a)<.3?'#e5e7eb':lumOf(a)>.8?'#6b7280':b;
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><defs>${defs}</defs><path d="M13 3 5 8 1 17l7 3 3-4v21h18V16l3 4 7-3-4-9-8-5q-7 5-14 0z" fill="${fill}" stroke="${edge}" stroke-width="1.6" stroke-linejoin="round"/></svg>`};
const enCol=en=>en<45?'var(--bad)':en<70?'var(--warn)':'var(--accent)';

/* ---- pitch estilo FIFA ---- */
function pitchHTML(cfg){
  const c=cfg.club,pos=layout(cfg.slots,cfg.formation),sel=S.psel;
  const toks=cfg.lineup.map((id,i)=>{
    const p=P(id),sl=cfg.slots[i],wv=wantsOf(cfg.formation)[i],off=posOff(p,sl,wv),en=cfg.en&&cfg.en[id]!==undefined?cfg.en[id]:p.en,sent=cfg.sent&&cfg.sent.includes(id);
    const rt=cfg.rt&&cfg.rt[id]!==undefined?cfg.rt[id]:null;
    return `<button class="tok ${sel&&sel.k==='l'&&sel.i===i?'sel':''} ${p.inj>0?'hurt':''} ${sent?'sent':''}" data-drag data-drop data-k="l" data-i="${i}" style="left:${pos[i].x}%;top:${pos[i].y}%">
      <span class="fs">${shirtSvg(c,cfg.kind)}<b class="rt">${rt!==null?rt.toFixed(1):p.ovr}</b></span>
      <span class="tn"><i>${esc(lastName(p.name))}</i><small class="${off?'offpos':''}">${p.inj>0?'🩹 lesão · '+p.inj+' rod.':roleLabel(p)+'·'+footOf(p)+(rt!==null?' · F'+p.ovr:'')+(off&&p.inj<=0?' · vaga '+slotLvl87(p,sl,wv):'')}</small></span><u class="wt">${WLBL[wv]}</u><s class="eb"><i style="width:${clamp(en,0,100)}%;background:${enCol(en)}"></i></s></button>`}).join('');
  const bn=(ids,k)=>ids.map((id,i)=>{const p=P(id),en=cfg.en&&cfg.en[id]!==undefined?cfg.en[id]:p.en;
    const rt=cfg.rt&&cfg.rt[id]!==undefined&&cfg.mode==='match'?`<em class="nt">${cfg.rt[id].toFixed(1)}</em>`:'';
    return `<button class="bn ${sel&&sel.k===k&&sel.i===i?'sel':''} ${p.inj>0?'hurt':''}" data-drag data-drop data-k="${k}" data-i="${i}">
     <span class="shirt sm" style="background:none;border:0;box-shadow:none;width:26px;height:26px">${shirtSvg(c,'res')}</span><span class="bt"><i>${esc(lastName(p.name))}</i><small>${p.inj>0?'🩹 lesionado · '+p.inj+' rod.':roleLabel(p)+' · '+p.ovr+' · '+(en<45?'cansado':'E'+Math.round(en))}</small></span>${rt}</button>`}).join('');
  const lines=`<svg class="lines" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke-width="1.4"><rect x="6" y="6" width="288" height="388"/><line x1="6" y1="200" x2="294" y2="200"/><circle cx="150" cy="200" r="38"/><rect x="85" y="6" width="130" height="58"/><rect x="120" y="6" width="60" height="22"/><rect x="85" y="336" width="130" height="58"/><rect x="120" y="372" width="60" height="22"/></g></svg>`;
  const rsv=(cfg.reserves&&cfg.reserves.length)?`<div class="sec">Reservas</div><div class="reserves">${cfg.reserves.map((id,i)=>{const p=P(id);return `<button class="bn rs ${sel&&sel.k==='r'&&sel.i===i?'sel':''} ${p.inj>0?'hurt':''}" data-drag data-drop data-k="r" data-i="${i}"><span class="bt"><i>${esc(lastName(p.name))}</i><small>${roleLabel(p)} · ${p.ovr} · E${Math.round(p.en)}${p.inj>0?' · lesão':''}</small></span></button>`}).join('')}</div>`:'';
  let ab='';
  if(sel){const id=selId(cfg);ab=`<div class="abar abs"><span>${id?esc(nameOf(P(id))):''}</span><button class="btn sm" data-a="pprof">Perfil</button><button class="btn sm ghost" data-a="punsel">✕</button></div>`}
  return `<div class="tact fifa"><div class="tp"><div class="pitch ${lumOf(kitOf(c,cfg.kind).a)<.38?'lg':''}">${lines}${toks}</div>${ab}</div><aside class="side"><div class="sec">Banco</div><div class="bench">${bn(cfg.bench,'b')}</div>${rsv}</aside></div>`;
}

/* ---- cartões de formação, estilos e efeitos ---- */
function miniForm(f){
  const pos=layout(slotsOf(f),f);
  return `<svg viewBox="0 0 100 62" aria-hidden="true"><g fill="none" stroke="rgba(255,255,255,.25)" stroke-width=".8"><rect x="1" y="1" width="98" height="60"/><line x1="1" y1="31" x2="99" y2="31"/><rect x="28" y="1" width="44" height="12"/><rect x="28" y="49" width="44" height="12"/></g>${pos.map(q=>`<circle cx="${(q.x*.86+7).toFixed(1)}" cy="${(q.y*.6+1).toFixed(1)}" r="3.1" fill="#fff"/>`).join('')}</svg>`;
}
function fcards(cur,act,c){
  const list=FORMLIST.slice();const k=ROLEKEY(cur);if(!list.includes(k))list.unshift(k);
  return `<div class="fcards">${list.map(f=>`<button class="fc ${f===k?'on':''}" data-a="${act}" data-f="${f}">${miniForm(f)}<b>${f}</b><small>${famGet(c,'f',f)|0}% entrosado</small></button>`).join('')}</div>`;
}
function schips(cur,act,c){
  return `<div class="schips">${STYLES.map(s=>`<button class="sch ${s===cur?'on':''}" data-a="${act}" data-s="${s}">${s}<small>${famGet(c,'s',s)|0}%</small></button>`).join('')}</div>`;
}
function fxLine(s){
  const f=styleFactors(s);const pc=v=>{const x=(v-1)*100;return (x>=0?'+':'')+x.toFixed(1).replace('.',',')+'%'};
  const it=[['Entrosamento',f.fs*f.ff],['Elenco × estilo',f.fit],['Filosofia',f.coh],['Vestiário',f.vest],['Auxiliar',f.asst]];
  const why=styleWhy(s.club,s.style);
  return `<div class="fxl">${it.map(([n,v])=>`<span class="fxp ${v>1.0004?'up':v<.9996?'dn':''}">${n} ${pc(v)}</span>`).join('')}</div>${why?`<p class="news">${why}</p>`:''}`;
}
/* v98: explica a penalidade de filosofia na tela (ex.: Posse com filosofia Direto) */
function styleWhy(c,style){
  if(!c||styleCoh(c,style)>=1)return '';
  const DESC={Passe:'troca de passes',Direto:'bola longa e jogo físico',Pressão:'marcação alta',Pontas:'jogo pelos lados',Retranca:'bloco baixo','Contra-ataque':'contra-ataque'};
  return `Filosofia ${c.phil} (${DESC[c.phil]||c.phil.toLowerCase()}) não combina com ${style}: −2% em tudo que o time faz. Escolha um estilo que combine.`;
}

function vTatica(){
  const c=userClub();const ts=c.tsaved||[null,null,null];const side=mkSide(c);
  return `<div class="wrap fit tc">
  ${oppStrip(c)}
  ${pick87(`Formação · ${ROLEKEY(c.formation)} <small>${famGet(c,'f',ROLEKEY(c.formation))|0}% entrosado</small>`,fcards(c.formation,'setform',c))}
  ${pick87(`Estilo de jogo · ${c.style}`,schips(c.style,'setstyle',c))}
  ${quickRow87(c)}
  ${fxLine(side)}
  ${eraLine87()}
  ${tacCtl96(c)}
  ${pitchHTML(clubCfg())}
  ${S.tsv?`<div class="sheet card">${[0,1,2].map(i=>`<div class="res"><span>Tática ${i+1}${ts[i]?' · '+ts[i].formation+' · '+ts[i].style:' · vazia'}</span><span><button class="btn sm" data-a="tsave" data-i="${i}">Salvar</button> <button class="btn sm ghost" data-a="tload" data-i="${i}" ${ts[i]?'':'disabled'}>Carregar</button></span></div>`).join('')}</div>`:''}
  <div class="acts"><button class="btn ghost" data-a="tsv">Táticas</button><button class="btn ghost" data-a="auto">Auto</button><button class="btn ghost" data-a="ready">${G.ready===G.round+'-'+G.season?'✔ Pronto':'Confirmar'}</button>${G.round<NR()?`<button class="btn" data-a="play">Jogar ›</button>`:''}</div></div>`;
}
function vPanel(){
  const m=R.ms[R.ui],k=userSide(m),s=m[k],o=m[k==='h'?'a':'h'];const c=s.club;
  const title=m.min===45?'INTERVALO':m.min+"'";
  return `<div class="wrap fit tc">
  <div class="ph"><b>${title}</b><span>${m.hg} – ${m.ag}</span><span>Subs ${s.subs}/5</span><button class="btn sm" data-a="mgo">Voltar ao jogo ›</button></div>
  <div class="opp">Adversário: ${o.formation} · ${o.style} · ${o.club.phil}${o.reds?' · com '+(11-o.reds)+' em campo':''}</div>
  ${fcards(s.formation,'msetform',c)}
  ${schips(s.style,'msetstyle',c)}
  ${fxLine(s)}
  <div class="ctl4">${selH('mmark','Marcação',MARKS,s.mark)}${selH('mfocus','Ataques',FOCUS,s.focus)}</div>
  ${pitchHTML(matchCfg())}
  <div class="acts"><button class="btn" data-a="mgo">Voltar ao jogo ›</button></div></div>`;
}

/* ---- rodada ao vivo (outros jogos em destaque) ---- */
function liveTable(){
  const div=userClub().div,rows=tableRows(div).map(c=>({id:c.id,P:c.P,sg:c.GP-c.GC,gp:c.GP}));
  const base=rows.map(r=>r.id);
  const by=Object.fromEntries(rows.map(r=>[r.id,r]));
  R.ms.forEach(m=>{const h=by[m.h.club.id],a=by[m.a.club.id];if(!h||!a)return;
    h.sg+=m.hg-m.ag;a.sg+=m.ag-m.hg;h.gp+=m.hg;a.gp+=m.ag;
    if(m.hg>m.ag)h.P+=3;else if(m.hg<m.ag)a.P+=3;else{h.P++;a.P++}});
  const srt=rows.slice().sort((x,y)=>y.P-x.P||y.sg-x.sg||y.gp-x.gp);
  const u=G.user;return {now:srt.findIndex(r=>r.id===u)+1,was:base.indexOf(u)+1,top:srt.slice(0,3).map(r=>C(r.id).sig)};
}
function liveRoundHTML(){
  const lt=liveTable();const d=lt.was-lt.now;
  const rows=R.ms.map((x,i)=>{const lg=x.ev.filter(e=>e.type==='goal').slice(-1)[0];
    const hot=lg&&x.min-lg.min<=2&&!x.done;const red=x.ev.some(e=>e.type==='red'&&x.min-e.min<=3&&!x.done);
    return `<button class="lv ${i===R.focus?'sel':''} ${i===R.ui?'me':''} ${hot?'hot':''}" data-a="mfocus" data-i="${i}"><span class="t">${x.done?'FIM':x.min+"'"}</span><span class="h">${crest(x.h.club,18)}<b>${x.h.club.sig}</b></span><span class="s">${x.hg} – ${x.ag}</span><span class="a"><b>${x.a.club.sig}</b>${crest(x.a.club,18)}</span><span class="n">${hot?'⚽ GOL':red?'🟥':''}</span></button>`}).join('');
  const feed=R.ms.flatMap((x,i)=>x.ev.filter(e=>e.type==='goal').map(e=>({...e,i,x}))).sort((a,b)=>b.min-a.min).slice(0,4)
    .map(e=>`<div class="gfeed"><span>${e.min}'</span> ${e.x.h.club.sig} ${e.x.hg}–${e.x.ag} ${e.x.a.club.sig} · ${esc(e.text.replace('GOL! ',''))}</div>`).join('');
  return `<div class="card lvc"><div class="lvh"><span>Rodada ao vivo</span><b>${lt.now}º ${d>0?'▲':d<0?'▼':'='} <small style="color:var(--mut)">(era ${lt.was}º)</small></b></div>${rows}${feed?`<div class="lvh" style="margin-top:6px"><span>Últimos gols</span></div>${feed}`:''}</div>`;
}
hookAround('vMatch','vm13',function(next,__a){
  let h=next();
  h=h.replace(/<div class="gchips">[\s\S]*<\/div><\/div>$/,'</div>');
  h=h.replace('<div class="ticker">',liveRoundHTML()+'<div class="ticker">');
  return h;
});

/* ---- Treino ---- */
function famRow(lab,v,cur,btn){const col=v>=75?'var(--ok)':v>=55?'var(--warn)':'var(--bad)';const d=(famMul(v)-1)*100;
  return `<div class="fam"><span>${lab}${cur?' ★':''}</span><span class="bar2"><i style="width:${v}%;background:${col}"></i></span><b>${v|0}%</b>${btn||`<small class="k">${d>=0?'+':''}${d.toFixed(1)}%</small>`}</div>`}
function vTreino(){
  ex();const c=userClub(),t=trnBox();
  const fk=ROLEKEY(c.formation);
  return `<div class="wrap x9"><h2>Treinos · ${esc(c.name)}</h2>
  ${sec9('Foco da semana',`<div class="trg">${Object.keys(TRN_FOC).map(k=>`<button class="trb ${t.foc===k?'on':''}" data-a="trnfoc" data-k="${k}">${TRN_FOC[k][0]}<small>${TRN_FOC[k][1]}</small></button>`).join('')}</div>
   <div class="seg sm" style="margin-top:8px">${TRN_INT.map((n,i)=>`<button class="${t.int===i?'on':''}" data-a="trnint" data-k="${i}">${n}</button>`).join('')}</div>
   <p class="news">Intensidade pesada acelera o treino, mas cansa o elenco e aumenta o risco de lesão. Auxiliar nível ${G.asst?G.asst.q:'-'} e Treino do técnico ${typeof mgv==='function'?mgv('tre'):4} influenciam o ritmo.</p>`)}
  ${sec9('Entrosamento no estilo de jogo',STYLES.map(s=>famRow(s,famGet(c,'s',s),s===c.style,s===c.style?'':`<button class="btn sm ghost" data-a="setstyle" data-s="${s}">Usar</button>`)).join('')+`<p class="news">Entrosamento abaixo de 75% pesa contra você no jogo. Trocar de estilo ou de esquema custa jogos até o time aprender.</p>`)}
  ${sec9('Entrosamento nas formações',FORMLIST.map(f=>famRow(f,famGet(c,'f',f),f===fk,f===fk?'':`<button class="btn sm ghost" data-a="setform" data-f="${f}">Usar</button>`)).join(''))}
  </div>`;
}

/* ---- Vestiário ---- */
function vVest(){
  ex();const c=userClub(),v=vestBox();
  v.conf=v.conf.filter(x=>P(x.a)&&P(x.a).club===c.id&&(!x.b||(P(x.b)&&P(x.b).club===c.id)));
  const col=v.clima>=70?'var(--ok)':v.clima>=50?'var(--warn)':'var(--bad)';
  const players=c.squad.map(id=>pers(P(id))).sort((a,b)=>a.pm-b.pm).slice(0,10);
  return `<div class="wrap x9"><h2>Vestiário · ${esc(c.name)}</h2>
  <div class="card"><div class="k">Clima do grupo</div><div class="v" style="font:800 30px var(--fh);color:${col}">${Math.round(v.clima)}</div><div class="climag"><i style="width:${v.clima}%;background:${col}"></i></div>
   <p class="news">Clima ${v.clima>=70?'ótimo':v.clima>=50?'estável':'pesado'}: mexe até ${((v.clima-60)*.06).toFixed(1).replace('.',',')}% na força do time. Conflitos resolvidos: ${v.resolved}.</p></div>
  ${sec9('Psicólogo',`<div class="stf"><div class="ic" style="width:36px;height:36px;border-radius:9px;background:var(--line);display:grid;place-items:center;font-size:18px">🧠</div><div><b>Psicólogo · nível ${G.psi}/3</b><small class="k">Reduz conflitos e ajuda a resolver os que já existem (+2 por nível no dado).</small><div class="lvl">${[0,1,2].map(i=>`<i class="${i<G.psi?'on':''}"></i>`).join('')}</div></div>${G.psi<3?`<button class="btn sm" data-a="psiup">${mi(psiCost(G.psi))}</button>`:pill('máx.','ok')}</div>`)}
  ${sec9('Conflitos abertos',v.conf.length?v.conf.map(x=>`<div class="tip"><p>${confDesc(x)} <small class="k">· gravidade ${x.sev}/3</small></p><div class="row"><button class="btn sm" data-a="confix" data-id="${x.id}" data-how="conv">🎲 Conversar · ${rollInfo(confDC(x),bonusOf('mot')).pct}%</button><button class="btn sm ghost" data-a="confix" data-id="${x.id}" data-how="psi" ${G.psi<1?'disabled':''}>🎲 Psicólogo · ${rollInfo(confDC(x),G.psi*2).pct}%</button><button class="btn sm ghost" data-a="confix" data-id="${x.id}" data-how="venda">Vender</button></div></div>`).join(''):'<p class="news">Sem conflitos no momento.</p>')+(v.log.length?`<div class="k" style="margin-top:6px">${v.log.slice(0,3).map(l=>esc(l.t)).join('<br>')}</div>`:'')}
  ${sec9('Jogadores mais desmotivados',players.map(p=>`<div class="fam" style="grid-template-columns:1fr 90px 40px 70px"><span>${esc(nameOf(p))}<small class="k"> · ${PGN[p.pg]}</small></span><span class="bar2"><i style="width:${p.pm}%;background:${p.pm<45?'var(--bad)':p.pm<65?'var(--warn)':'var(--ok)'}"></i></span><b>${Math.round(p.pm)}</b><button class="btn sm ghost" data-a="promise" data-id="${p.id}">${PCN[p.pc||'R']}</button></div>`).join('')+`<p class="news">O botão à direita é o tempo de jogo combinado no contrato (Titular, Rodízio ou Reserva). Titular no banco azeda o clima rápido.</p>`)}
  </div>`;
}

/* ---- Assistente ---- */
function vAssist(){
  ex();tipBox();const c=userClub(),a=G.asst;const T=G.tipst;
  const open=G.tips.filter(t=>t.state==='new'),done=G.tips.filter(t=>t.state==='done').slice(-4).reverse();
  return `<div class="wrap x9"><h2>Assistente · ${a?esc(a.name):''}</h2>
  <div class="card"><div class="k">Confiabilidade</div><p class="news">Nível ${a?a.q:'-'} · filosofia ${a?a.phil:'-'}${a&&a.phil!==c.phil?' (diferente da sua, perde 1% no jogo)':''}. Acerta uns ${Math.round(asstAcc()*100)}% das dicas. Dicas seguidas: ${T.ok} ótimas, ${T.bad} furadas.</p>
   <p class="news">Seguir a dica é rolar um dado de 20: o resultado soma seus atributos de técnico contra a dificuldade. Ignorar não custa nada, mas problemas reais podem piorar.</p></div>
  ${sec9('Dicas do auxiliar',open.length?open.map(t=>`<div class="tip"><p>🎲 ${esc(t.txt)}</p><div class="row"><button class="btn sm" data-a="tipgo" data-id="${t.id}">🎲 Tentar</button><small class="k" style="align-self:center">${rollTxt(rollInfo(t.dc,bonusOf(t.bonus)+Math.round(((G.asst?G.asst.q:2)-3)*.5)))}</small><button class="btn sm ghost" data-a="tipno" data-id="${t.id}">Ignorar</button></div></div>`).join(''):'<p class="news">Nenhuma dica no momento. Ele fala com você a cada rodada ou duas.</p>')}
  ${done.length?sec9('Resolvidas',done.map(t=>`<div class="gfeed"><span>R${t.round+1}</span> ${esc(t.txt)}<br><span>${esc(t.res||'')}</span></div>`).join('')):''}
  </div>`;
}

/* ---- navegação e selo de dicas ---- */
hookAround('render','render13',function(next,__a){
  next();
  try{document.querySelectorAll('.fc.on,.sch.on').forEach(e=>{const p=e.parentElement;p.scrollLeft=e.offsetLeft-p.clientWidth/2+e.clientWidth/2})}catch(e){}
  try{if(G&&G.tips){const n=G.tips.filter(t=>t.state==='new').length;const b=document.querySelector('.ic [data-v="assist"]');
    if(b&&n&&!b.querySelector('.badge13')){const s=document.createElement('span');s.className='badge13';s.textContent=n;b.appendChild(s)}}
    if(G&&G.vest){const n=G.vest.conf.length;const b=document.querySelector('.ic [data-v="vest"]');if(b&&n&&!b.querySelector('.badge13')){const s=document.createElement('span');s.className='badge13';s.textContent=n;b.appendChild(s)}}}catch(e){}
});

/* personalidade no perfil do jogador */
hookAround('vPerfil','vp13',function(next,__a){
  let r=next();const p=P(S.prof);if(!p||p.club!==G.user)return r;pers(p);
  const mc=p.pm<45?'var(--bad)':p.pm<65?'var(--warn)':'var(--ok)';
  const ex_=`<div class="x9"><div class="card"><div class="k">Personalidade</div><p class="news"><b>${PGN[p.pg]}</b> · motivação <b style="color:${mc}">${Math.round(p.pm)}</b>/100 · contrato: <b>${PCN[p.pc||promiseFor(userClub(),p)]}</b></p><div class="row"><button class="btn sm ghost" data-a="promise" data-id="${p.id}">Mudar tempo de jogo combinado</button></div></div></div>`;
  return r.replace(/<\/div>$/,ex_+'</div>');
});

/* ui9: telas Marketing, Torcida, Estádio e Base */
(function(){const st=document.createElement('style');st.textContent=`
.x9 p,.x9 small,.x9 .foot,.x9 .k,.x9 .nm small{font-family:inherit}.x9 h2{margin:6px 0 8px}.x9 .sec{margin:12px 0}.x9 .sec>h3{font:800 20px var(--fh);letter-spacing:.04em;text-transform:uppercase;margin:0 0 6px;display:flex;align-items:center;gap:8px}
.x9 .sec>h3 small{font:600 12px var(--fh);color:var(--mut);letter-spacing:.06em;margin-left:auto}
.x9 .hero9{background:linear-gradient(160deg,var(--nav),#16392a);color:#fff;border-radius:16px;padding:14px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:8px;align-items:center}
.x9 .hero9 svg{width:100%;height:auto;max-height:260px}.x9 .hero9 .t{font:800 30px var(--fh);line-height:1}.x9 .hero9 .s{font-size:12px;opacity:.8}
.x9 .chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}.x9 .chip{background:rgba(255,255,255,.12);border-radius:20px;padding:4px 10px;font:700 13px var(--fh);letter-spacing:.03em}
.x9 .bigtxt{font:800 34px var(--fh);line-height:1}.x9 .row3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.x9 .row2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.x9 .tile9{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px;min-width:0}.x9 .tile9 .v{font:800 24px var(--fh);line-height:1.05}.x9 .tile9 .k{font-size:11px}
.x9 .slot{display:flex;gap:10px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)}.x9 .slot:last-child{border:0}.x9 .slot .ic{width:36px;height:36px;border-radius:9px;background:var(--line);display:grid;place-items:center;font-size:18px;flex:none}
.x9 .slot .nm{flex:1;min-width:0}.x9 .slot .nm b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.x9 .slot .nm small{color:var(--mut)}
.x9 .off{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:8px 10px;border:1.5px dashed var(--line);border-radius:10px;margin:6px 0;cursor:pointer;background:transparent;color:inherit;width:100%;text-align:left;font:inherit}
.x9 .off:hover{border-color:var(--accent)}.x9 .off small{color:var(--mut);display:block}.x9 .off b{font:800 18px var(--fh)}
.x9 .rank{display:grid;grid-template-columns:26px minmax(0,1fr) auto;gap:8px;align-items:center;padding:5px 0;font-size:14px}.x9 .rank .pb{height:9px;background:var(--line);border-radius:9px;overflow:hidden}.x9 .rank .pb i{display:block;height:100%;background:var(--accent)}
.x9 .rank.bad .pb i{background:var(--bad)}.x9 .rank .pn{display:flex;align-items:center;gap:6px;min-width:0}.x9 .rank .pn span{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.x9 .rank .n{font:800 16px var(--fh);text-align:right}.x9 .rank .pos{font:800 15px var(--fh);color:var(--mut)}
.x9 .heart{color:#ff4d6d;letter-spacing:1px}.x9 .heart .hd{color:var(--line)}.x9 p,.x9 .news,.x9 .foot,.x9 small{text-transform:none;letter-spacing:0}.x9 .news{font-size:13px;color:var(--mut);margin:6px 0}.x9 .pn.col{flex-direction:column;align-items:flex-start;gap:0}.x9 .pn.col small{white-space:normal}
.x9 .donut{width:132px;height:132px;border-radius:50%;position:relative;flex:none}.x9 .donut:after{content:"";position:absolute;inset:26px;background:var(--card);border-radius:50%}
.x9 .donut b{position:absolute;inset:0;display:grid;place-items:center;z-index:1;font:800 18px var(--fh);text-align:center;line-height:1.05}
.x9 .leg{flex:1;min-width:0;font-size:13px}.x9 .leg div{display:flex;align-items:center;gap:6px;padding:2px 0}.x9 .leg i{width:10px;height:10px;border-radius:3px;flex:none}.x9 .leg span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.x9 .bars{display:flex;align-items:flex-end;gap:4px;height:92px;margin-top:6px}.x9 .bars div{flex:1;min-width:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;height:100%}
.x9 .bars i{display:block;width:100%;background:var(--accent);border-radius:4px 4px 0 0;min-height:2px}.x9 .bars small{font-size:9px;color:var(--mut);margin-top:2px}
.x9 .gauge{position:relative;height:16px;border-radius:9px;background:linear-gradient(90deg,#d6322d,#e29a00 45%,#0a9a4a);margin:8px 0 2px}.x9 .gauge i{position:absolute;top:-4px;width:6px;height:24px;border-radius:3px;background:#fff;border:2px solid #111;transform:translateX(-3px)}
.x9 .alert9{border-left:5px solid var(--bad);background:rgba(214,50,45,.1)}.x9 .good9{border-left:5px solid var(--ok);background:rgba(10,154,74,.08)}
.x9 input[type=range]{width:100%}.x9 .spark{width:100%;height:46px}.x9 .stars{color:var(--accent2);letter-spacing:1px}
.x9 .proj{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid var(--line)}.x9 .proj:last-child{border:0}.x9 .lvl{display:flex;gap:3px;margin-top:3px}.x9 .lvl i{width:18px;height:6px;border-radius:3px;background:var(--line)}.x9 .lvl i.on{background:var(--accent)}.x9 .lvl i.bd{background:var(--warn)}
.x9 .pill{display:inline-block;padding:2px 8px;border-radius:12px;background:var(--line);font:700 12px var(--fh);letter-spacing:.04em}.x9 .pill.ok{background:rgba(10,154,74,.2);color:var(--ok)}.x9 .pill.bad{background:rgba(214,50,45,.2);color:var(--bad)}
.x9 .res5{display:flex;gap:5px;flex-wrap:wrap}.x9 .res5 span{background:var(--line);border-radius:8px;padding:4px 8px;font:700 14px var(--fh)}.x9 .res5 span.w{background:rgba(10,154,74,.25)}.x9 .res5 span.l{background:rgba(214,50,45,.22)}
.x9 .stad{width:100%;height:auto;max-height:220px}.x9 .mrow .col{display:flex;flex-direction:column;gap:4px}
`;document.head.appendChild(st)})();

const fmtN=n=>Math.round(n).toLocaleString('pt-BR');
const dec=(n,d=1)=>(+n).toFixed(d).replace('.',',');
const starsT=n=>starsTxt91(n);
const heartsH=v=>{const n=Math.round(v/20);return '<span class="heart">'+'♥'.repeat(n)+'<span class="hd">'+'♥'.repeat(5-n)+'</span></span>'};
const sec9=(h,inner,right='')=>`<section class="sec card"><h3>${h}<small>${right}</small></h3>${inner}</section>`;
function sparkH(arr,color='var(--accent)'){
  if(arr.length<2)return '<div class="k">Sem histórico ainda.</div>';
  const mn=Math.min(...arr),mx=Math.max(...arr),sp=(mx-mn)||1;
  const pts=arr.map((v,i)=>(i/(arr.length-1)*200).toFixed(1)+','+(40-((v-mn)/sp)*36).toFixed(1)).join(' ');
  return `<svg class="spark" viewBox="0 0 200 44" preserveAspectRatio="none"><polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.2" vector-effect="non-scaling-stroke"/></svg>`;
}
function donutH(parts,center){
  const tot=parts.reduce((s,p)=>s+p[1],0)||1;let acc=0;
  const g=parts.map(([n,v,col])=>{const a=acc/tot*360;acc+=v;return `${col} ${a}deg ${acc/tot*360}deg`}).join(',');
  return `<div class="row2" style="grid-template-columns:auto 1fr;align-items:center;gap:12px"><div class="donut" style="background:conic-gradient(${g})"><b>${center}</b></div><div class="leg">${parts.map(([n,v,col])=>`<div><i style="background:${col}"></i><span>${n}</span><b>${dec(v/tot*100,0)}%</b></div>`).join('')}</div></div>`;
}

/* camisa em SVG */
function shirtSVG(c,view){
  const mk=G.mk,sp=G.sponsor,id='cp'+view+c.id;
  const body='M62 8 L8 42 L28 96 L52 82 L52 212 L148 212 L148 82 L172 96 L192 42 L138 8 Q100 36 62 8Z';
  let ov='';
  const c2=c.c2,p=c.pat;
  if(p==='h')ov=[60,100,140,180].map(y=>`<rect x="0" y="${y}" width="200" height="20" fill="${c2}"/>`).join('');
  else if(p==='v')ov=[56,92,128].map(x=>`<rect x="${x}" y="0" width="18" height="220" fill="${c2}"/>`).join('');
  else if(p==='half')ov=`<rect x="100" y="0" width="100" height="220" fill="${c2}"/>`;
  else if(p==='tri')ov=`<rect x="0" y="0" width="200" height="30" fill="${c2}" opacity="0"/><rect x="66" y="0" width="34" height="220" fill="${c2}"/><rect x="134" y="0" width="0" height="0"/>`;
  else if(p==='hb')ov=`<rect x="0" y="92" width="200" height="30" fill="${c2}"/>`;
  else if(p==='diag')ov=`<polygon points="0,220 200,70 200,120 0,220" fill="${c2}"/><polygon points="40,220 200,100 200,150 100,220" fill="${c2}"/>`;
  const lab=(txt,y,fs,w)=>{if(!txt)return '';const t=txt.length>14?txt.slice(0,13)+'…':txt;const size=Math.min(fs,w/(t.length*.55));return `<rect x="${100-w/2-4}" y="${y-size}" width="${w+8}" height="${size+8}" rx="4" fill="rgba(0,0,0,.6)"/><text x="100" y="${y}" fill="#fff" font-size="${size}" font-weight="800" text-anchor="middle" font-family="InterE,Inter,sans-serif">${esc(t)}</text>`};
  let inner='';
  if(view==='f'){
    inner=lab(sp?sp.name:'MASTER',112,15,92)+
      (mk.slots.forn?`<text x="130" y="48" fill="${onC(c.c1)}" font-size="9" font-weight="800" text-anchor="middle" font-family="InterE,Inter,sans-serif">${esc(mk.slots.forn.name.slice(0,9).toUpperCase())}</text>`:'')+
      (mk.slots.manga?`<text transform="translate(176,66) rotate(58)" fill="${onC(c.c1)}" font-size="8" font-weight="800" text-anchor="middle" font-family="InterE,Inter,sans-serif">${esc(mk.slots.manga.name.slice(0,11).toUpperCase())}</text>`:'');
  }else{
    const top=shirtTop(c,1)[0];const nm=top?lastName(top.p.name).toUpperCase().slice(0,12):'CRAQUE';
    inner=`<text x="100" y="52" fill="${onC(c.c1)}" font-size="13" font-weight="800" text-anchor="middle" font-family="InterE,Inter,sans-serif" stroke="${c.c1}" stroke-width=".4">${esc(nm)}</text>
    <text x="100" y="128" fill="${onC(c.c1)}" font-size="68" font-weight="800" text-anchor="middle" font-family="InterE,Inter,sans-serif" stroke="${c.c1}" stroke-width=".6">${top&&top.p.num||10}</text>`+lab(mk.slots.costas?mk.slots.costas.name:'COSTAS',172,13,86);
  }
  return `<svg viewBox="0 0 200 224"><defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs><g clip-path="url(#${id})"><rect width="200" height="224" fill="${c.c1}"/>${ov}</g><path d="${body}" fill="none" stroke="rgba(0,0,0,.45)" stroke-width="2.5"/><path d="M62 8 Q100 36 138 8" fill="none" stroke="${c.c2}" stroke-width="5"/>${inner}</svg>`;
}

/* ============ MARKETING ============ */
function vMarketing(){
  ex();const c=userClub(),mk=G.mk,sh=mk.shirt,sp=G.sponsor;
  const slotIcons={manga:'💪',costas:'🔙',short:'🩳',forn:'👟'};
  const shA=shirtAnnual(c),socA=socAnnual(),slA=slotAnnual(),fol=folTotal(mk);
  const open=mk.open&&mk.open.slot;
  const rankFans=LG(c.div).sort((a,b)=>cdOf(b).f-cdOf(a).f).findIndex(x=>x.id===c.id)+1;
  const top=shirtTop(c,5);
  const acc=mk.acc,shown=[['Bilheteria',acc.gate,'#2fd36f'],['TV',acc.tv,'#4aa3ff'],['Patroc. master',acc.sp,'#ffcc00'],['Patroc. extras',acc.spx,'#ff9f1c'],['Camisas',acc.shirt,'#e63946'],['Sócios',acc.soc,'#b388ff'],['Naming',acc.naming,'#00c2a8'],['Redes',acc.social,'#ff6fb5']].filter(x=>x[1]>0.01);
  const totalAcc=shown.reduce((s,x)=>s+x[1],0);
  return `<div class="wrap x9"><h2>Marketing · ${esc(c.name)}</h2>
  <div class="hero9"><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">${shirtSVG(c,'f')}${shirtSVG(c,'b')}</div>
   <div><div class="k" style="color:#cfe">Receita de marketing / ano</div><div class="t">${mi(shA+socA+slA+folTotal(mk)*.09)}</div>
   <div class="s">Camisas ${mi(shA)} · Sócios ${mi(socA)} · Patroc. extras ${mi(slA)}</div>
   <div class="chips"><span class="chip">👕 ${fmtN(sh.units)} camisas</span><span class="chip">🎫 ${fmtN(socTotal(mk))} sócios</span><span class="chip">📱 ${dec(fol)} mi seguidores</span><span class="chip">🔥 torcida #${rankFans} do país</span></div></div></div>
  ${sec9('Patrocínios na camisa',`
    <div class="slot"><div class="ic">⭐</div><div class="nm"><b>${sp?esc(sp.name):'Sem master'}</b><small>Patrocínio master · peito</small></div><b>${sp?mi(sp.fixed)+'/ano':''}</b></div>${sp?`<p class="news">${spnSummary(sp)}</p>`:''}
    ${Object.keys(SLOTD).map(k=>{const s=mk.slots[k];const o=mk.open&&mk.open.slot===k?mk.open:null;const det=s?[s.win?'+'+mi(s.win)+'/vitória':'',s.topN?'+'+mi(s.topBonus)+' se '+(s.tgtTxt||'top '+s.topN):'',s.title?'+'+mi(s.title)+' título':'',MODEL24[s.mode||'parc']].filter(Boolean).join(' · '):'';return `<div class="slot"><div class="ic">${slotIcons[k]}</div><div class="nm"><b>${s?esc(s.name):'— vago —'}</b><small>${SLOTD[k][0]}${det?' · '+det:''}</small></div><span>${s?`<b>${mi(s.val)}/ano</b>`:''}<button class="btn sm ghost" data-a="mkopen" data-s="${k}">${o?'Fechar':s?'Trocar':'Vender'}</button></span></div>${o&&o.i===undefined?slotOffers(k).map((x,i)=>`<button class="off" data-a="mkpick" data-s="${k}" data-i="${i}"><span><b>${esc(x.name)}</b><small>${x.clause}${x.win?' · vitória +'+mi(x.win):''}${x.topN?' · '+x.tgtTxt+' +'+mi(x.topBonus):''}${x.title?' · título +'+mi(x.title):''}<br>Esperado no ano: ${mi(x.ev)} · teto ${mi(x.max)}</small></span><b>${mi(x.val)}<small>fixo</small></b></button>`).join(''):''}${o&&o.i!==undefined?(()=>{const x=slotOffers(k)[o.i];return `<button class="btn ghost sm" data-a="mkback">← Voltar</button><div class="k" style="margin:6px 0">${esc(x.name)}: como receber ${mi(x.val)}?</div>`+spnModes(x.val).map(m=>`<button class="off" data-a="mkmode" data-m="${m.m}"><span><b>${m.lbl}</b><small>${m.sub}</small></span><b>${mi(m.total)}</b></button>`).join('')})():''}`}).join('')}
    <p class="foot">Valores sobem com títulos, torcida feliz e torcida grande. Contratos renovam sozinhos com +3% a cada temporada.</p>`,mi(slA)+'/ano')}
  ${sec9('Venda de camisas',`
    <div class="row3"><div class="tile9"><div class="k">Vendidas (temp.)</div><div class="v">${fmtN(sh.units)}</div></div><div class="tile9"><div class="k">Receita (temp.)</div><div class="v">${mi(sh.rev)}</div></div><div class="tile9"><div class="k">Potencial/ano</div><div class="v">${mi(shA)}</div></div></div>
    <div class="k" style="margin-top:10px">Preço da camisa: R$ <span id="shpl">${sh.price}</span></div><input type="range" id="shp" min="${Math.round(shirtRefPrice(c)*.6)}" max="${Math.round(shirtRefPrice(c)*1.8)}" step="10" value="${sh.price}">
    <p class="news">Barato vende mais unidades; caro rende por camisa, mas passando de ~30% acima do preço de mercado a torcida desiste. Craque e ídolo no time puxam a venda (${dec(starPower(c)*100,0)}% de “efeito craque”). Loja oficial nível ${mk.stad.lvl.loja}.</p>
    <div class="k" style="margin-top:6px">Camisas mais vendidas</div>
    ${top.map((t,i)=>{const u=sh.by[t.p.id]||0;return `<div class="rank"><span class="pos">${i+1}º</span><div class="pn col"><span>${esc(nameOf(t.p))}</span><small class="k">${heartsH(favOf(t.p))}</small></div><div class="n">${fmtN(u)}</div></div><div class="pb" style="height:7px;background:var(--line);border-radius:6px;overflow:hidden"><i style="display:block;height:100%;width:${t.sh*100/top[0].sh}%;background:${c.c1==='#ffffff'?c.c2:c.c1};"></i></div>`}).join('')}
    <button class="btn big ghost" style="margin-top:10px" data-a="shspecial" ${sh.campUsed?'disabled':''}>${sh.camp>0?'Camisa especial em campanha ('+sh.camp+' rodadas)':sh.campUsed?'Camisa especial já lançada nesta temporada':'Lançar camisa especial · '+mi(scaleOf(c)*.03)}</button>`,fmtN(sh.units)+' un.')}
  ${sec9('Sócio-torcedor',`
    <div class="row3">${SOCN.map((n,i)=>`<div class="tile9"><div class="k">${n}</div><div class="v">${fmtN(mk.soc.n[i])}</div><div class="k">R$ <span id="spl${i}">${mk.soc.prices[i]}</span>/mês</div><input type="range" id="socp${i}" min="${SOCREF[i]*.4}" max="${SOCREF[i]*2.5}" step="${i===2?10:5}" value="${mk.soc.prices[i]}"></div>`).join('')}</div>
    <div class="row2" style="margin-top:8px"><div class="tile9"><div class="k">Total de sócios</div><div class="v">${fmtN(socTotal(mk))}</div></div><div class="tile9"><div class="k">Receita líquida/ano</div><div class="v">${mi(socA)}</div></div></div>
    ${sparkH(mk.soc.hist)}
    <p class="news">Meta de sócios hoje: ~${fmtN(socTarget(c))}. Preço alto afasta gente; torcida feliz, ídolo em campo e museu atraem. ${mk.exo.active?'<b class="bad">Êxodo em andamento: sócios fugindo.</b>':''}</p>
    <button class="btn big ghost" data-a="soccamp" ${mk.soc.camp>0?'disabled':''}>${mk.soc.camp>0?'Campanha rodando ('+mk.soc.camp+' rodadas)':'Campanha de adesão · '+mi(scaleOf(c)*.02)}</button>`,fmtN(socTotal(mk))+' sócios')}
  ${sec9('Redes sociais',`
    <div class="row2">${[['ig','Instagram','📸'],['tk','TikTok','🎵'],['x','X','✖️'],['yt','YouTube','▶️']].map(([k,n,e])=>`<div class="tile9"><div class="k">${e} ${n}</div><div class="v">${dec(mk.social.fol[k],2)} mi</div></div>`).join('')}</div>
    ${sparkH(mk.social.hist,'#ff6fb5')}
    <div class="k" style="margin-top:8px">Estratégia de conteúdo</div>
    <div class="seg sm scroll">${SOCPLAN.map((p,i)=>`<button class="${mk.social.plan===i?'on':''}" data-a="socplan" data-i="${i}">${p[0]}</button>`).join('')}</div>
    <p class="news">Custo ${mi(scaleOf(c)*SOCPLAN[mk.social.plan][1])}/ano · cada milhão de seguidores rende ~${mi(.09)}/ano em ativações. Vitória, craque e post viral aceleram o crescimento.</p>`,dec(fol)+' mi')}
  ${sec9('De onde vem o dinheiro (temporada)',totalAcc>0?donutH(shown.map(x=>[x[0],x[1],x[2]]),mi(totalAcc)):'<p class="news">Jogue algumas rodadas para ver o gráfico.</p>')}
  ${mk.last?`<div class="card"><div class="k">Última rodada · marketing</div><div class="res"><span>Camisas</span><b>+${mi(mk.last.shirt)}</b></div><div class="res"><span>Sócios</span><b>+${mi(mk.last.soc)}</b></div><div class="res"><span>Patroc. extras${mk.last.gateX?' + camarotes':''}</span><b>+${mi(mk.last.spx+mk.last.gateX)}</b></div><div class="res"><span>Redes</span><b>+${mi(mk.last.social)}</b></div><div class="res"><span>Custos (staff, redes)</span><b class="bad">−${mi(mk.last.cost)}</b></div></div>`:''}
  <p class="foot">Base de dados: Datafolha jul/2026 (torcida), levantamentos de sócios 2023 e valores de patrocínio máster 2026; onde não havia número público usamos estimativa.</p></div>`;
}

/* ============ TORCIDA ============ */
function vTorcida(){
  ex();const c=userClub(),mk=G.mk,d=cdOf(c);
  const rank=LG(c.div).sort((a,b)=>cdOf(b).f-cdOf(a).f).findIndex(x=>x.id===c.id)+1;
  const fav=c.squad.map(id=>P(id)).sort((a,b)=>favOf(b)-favOf(a)).slice(0,6);
  const hate=c.squad.map(id=>[P(id),hateOf(P(id),c)]).filter(x=>x[1].h>=22&&favOf(x[0])<75).sort((a,b)=>b[1].h-a[1].h).slice(0,4);
  const mood=c.humor>=75?'Apaixonada 😍':c.humor>=55?'Empolgada 🙂':c.humor>=40?'Desconfiada 😐':c.humor>=25?'Revoltada 😠':'Em guerra 🤬';
  const idol=IDOL[c.sig]||[];
  const bestShirt=shirtTop(c,1)[0];
  return `<div class="wrap x9"><h2>Torcida · ${esc(c.name)}</h2>
  <div class="card"><div class="row2" style="grid-template-columns:1fr 1fr"><div><div class="k">Tamanho estimado</div><div class="bigtxt">${dec(fansM(c))} mi</div><div class="k">${dec(d.f,d.f<2?1:0)}% do Brasil · #${rank}</div></div><div><div class="k">Humor</div><div class="bigtxt">${c.humor}</div><div class="k">${mood}</div></div></div>
   <div class="gauge"><i style="left:${c.humor}%"></i></div></div>
  ${mk.exo.active?`<div class="card alert9"><div class="k">🚨 Êxodo da torcida</div><p><b>${esc(c.name)} está perdendo a torcida.</b> Estádio esvaziando, sócios cancelando (${fmtN(mk.exo.lost)} perdidos nesta fase). Vença jogos, venda menos ídolos e baixe os preços para reconquistar.</p></div>`:mk.exo.lost?`<div class="card good9"><div class="k">Êxodo superado</div><p>A torcida voltou. Já foram ${fmtN(mk.exo.lost)} sócios perdidos na história recente — recupere com campanha de adesão.</p></div>`:''}
  ${sec9('Público nos jogos em casa',mk.att.length?`<div class="bars">${mk.att.map(a=>`<div><i style="height:${a.att/a.cap*100}%;${a.att/a.cap<.5?'background:var(--bad)':a.att/a.cap<.75?'background:var(--warn)':''}"></i><small>${a.op||a.r}</small></div>`).join('')}</div><p class="news">Última: ${fmtN(mk.att[mk.att.length-1].att)} (${Math.round(mk.att[mk.att.length-1].att/mk.att[mk.att.length-1].cap*100)}%). Vermelho = abaixo de 50%.</p>`:'<p class="news">Aguardando o primeiro jogo em casa.</p>')}
  ${sec9('Queridinhos da torcida',`${fav.map((p,i)=>`<div class="rank"><span class="pos">${i+1}</span><div class="pn col"><span>${esc(nameOf(p))}</span><small class="k">${roleLabel(p)} · ${p.ovr}</small></div><div>${heartsH(favOf(p))}</div></div>`).join('')}
    <p class="news">${bestShirt?'Camisa mais vendida: <b>'+esc(nameOf(bestShirt.p))+'</b>. ':''}Craque amado vende camisa e traz sócio; vendê-lo faz a torcida cancelar plano.</p>`)}
  ${sec9('Vaiados',hate.length?hate.map(([p,hh])=>`<div class="rank bad"><span class="pos">💢</span><div class="pn col"><span>${esc(nameOf(p))}</span><small class="k">${esc(hh.why)}</small></div><div class="pb"><i style="width:${hh.h}%"></i></div></div>`).join('')+'<p class="news">Torcedor vaia nota baixa, salário alto, expulsão e craque que não joga. Coloque no banco, venda ou recupere a confiança.</p>':'<p class="news">Ninguém no elenco está sendo vaiado agora. 👏</p>')}
  ${sec9('Galeria de ídolos',idol.length?`<div class="chips" style="margin:0">${idol.map(n=>`<span class="pill">🏆 ${esc(n)}</span>`).join('')}</div><p class="news">Lendas do clube. Quem entra na história aqui vira ídolo para sempre — lance os garotos da base e ganhe a arquibancada.</p>`:'<p class="news">Ainda sem lendas cadastradas. Escreva a sua história.</p>')}
  <p class="foot">Torcida segundo Datafolha jul/2026. “Queridinhos” combinam nível, gols, assistências, formação na base e carinho histórico.</p></div>`;
}

/* ============ ESTÁDIO ============ */
function stadSVG(c){
  const mk=G.mk,l=G.fin.last,occ=l&&l.home?clamp(l.att/(c.cap),0,1):.6;
  const sec=[['N',20,6,160,26],['S',20,108,160,26],['O',4,36,26,60],['L',170,36,26,60]];
  const lv=mk.stad.lvl;const shade=occ>.85?'#2fd36f':occ>.6?'#8ad67a':occ>.4?'#e0c24a':'#d6322d';
  return `<svg class="stad" viewBox="0 0 200 140"><rect x="0" y="0" width="200" height="140" rx="14" fill="#1a2a20"/>${sec.map(([n,x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${shade}" opacity="${.35+occ*.65}"/>`).join('')}
  <rect x="36" y="36" width="128" height="68" rx="4" fill="#237a33" stroke="#fff" stroke-width="1.4"/><line x1="100" y1="36" x2="100" y2="104" stroke="#fff" stroke-width="1"/><circle cx="100" cy="70" r="11" fill="none" stroke="#fff"/>
  ${lv.camarote?`<rect x="60" y="2" width="80" height="6" rx="3" fill="#ffcc00"/>`:''}${lv.telao?`<rect x="84" y="128" width="32" height="8" rx="2" fill="#4aa3ff"/>`:''}${lv.estac?`<rect x="2" y="2" width="14" height="10" rx="2" fill="#7a8a80"/>`:''}${lv.loja?`<rect x="184" y="128" width="12" height="10" rx="2" fill="#e63946"/>`:''}
  <text x="100" y="22" fill="#fff" font-size="9" text-anchor="middle" font-weight="700" font-family="InterE,Inter,sans-serif">${esc(G.naming?G.naming.name.toUpperCase():c.name.toUpperCase()+' · ESTÁDIO')}</text></svg>`;
}
vEstadio=function(){
  ex();const c=userClub(),mk=G.mk,l=G.fin.last,sec=stadSectors(c);
  const noff=S.nm?namingOffers():null;
  return `<div class="wrap x9"><h2>Estádio · ${fmtN(c.cap)} lugares</h2>
  <div class="card">${stadSVG(c)}<div class="res"><span>Ocupação no último jogo em casa</span><b>${l&&l.home?Math.round(l.att/(c.cap)*100)+'%':'–'}</b></div>
   <div class="row2" style="margin-top:6px">${Object.entries(sec).map(([k,v])=>`<div class="tile9"><div class="k">${k}</div><div class="v">${fmtN(v)}</div></div>`).join('')}</div></div>
  ${tierCard86(userClub())}
  ${sec9('Obras e melhorias',Object.keys(PROJ).map(k=>{const lvl=mk.stad.lvl[k],q=mk.stad.q.find(x=>x.k===k);return `<div class="proj"><div class="ic slot" style="padding:0"><div class="ic">${{camarote:'🥂',loja:'🛍️',telao:'📺',estac:'🅿️',museu:'🏛️',gramado:'🌱'}[k]}</div></div><div><b>${PROJ[k][0]}</b><div class="k" style="text-transform:none;letter-spacing:0">${PROJ[k][1]}</div><div class="lvl">${[0,1,2].map(i=>`<i class="${i<lvl?'on':q&&i===lvl?'bd':''}"></i>`).join('')}</div></div><div>${q?`<span class="pill">obra · ${q.left} rod.</span>`:lvl>=3?'<span class="pill ok">máx.</span>':`<button class="btn sm" data-a="projgo" data-k="${k}">${mi(projCost(k,lvl))}</button>`}</div></div>`}).join(''))}
  <div class="card"><div class="k">Ampliar arquibancada</div><p class="news">+2.000 lugares por ${mi(expandCost(c))}. Mais lugar = mais bilheteria potencial, mas também manutenção.</p><button class="btn big" data-a="expand">Expandir estádio</button></div>
  ${sec9('Naming rights',G.naming?`<div class="res"><span>${esc(G.naming.name)}</span><b>${mi(G.naming.val)}/ano</b></div><p class="news">Contrato por mais ${G.naming.yrs} temporada(s). A torcida não perdoa fácil.</p>`:(noff?noff.map((o,i)=>`<button class="off" data-a="nampick" data-i="${i}"><span><b>${esc(o.name)}</b><small>${o.yrs} anos · torcida −${o.hum} de humor</small></span><b>${mi(o.val)}/ano</b></button>`).join('')+'<button class="btn ghost sm" data-a="namclose">Cancelar</button>':'<p class="news">Venda o nome do estádio. Quanto maior o contrato, mais a torcida reclama.</p><button class="btn big ghost" data-a="namopen">Ver propostas</button>'))}</div>`;
};

/* ============ BASE ============ */
function baseRankList(){return LG(userClub().div).map(x=>[x,baseIdx(x)]).sort((a,b)=>b[1]-a[1])}
var vBase=function(){
  ex();const c=userClub(),mk=G.mk,b=mk.base,ix=baseIdx(c);
  const rk=baseRankList(),pos=rk.findIndex(x=>x[0].id===c.id)+1;
  const sub=LG(c.div).sort((a,z)=>(z.s20.P-a.s20.P)||((z.s20.GP-z.s20.GC)-(a.s20.GP-a.s20.GC)));
  const spos=sub.findIndex(x=>x.id===c.id)+1;
  const slots=14+(b.staff.ger?b.staff.ger.q*2:0)+b.ct;
  const hire=S.hire;
  const grads=c.squad.map(id=>P(id)).filter(p=>p.fromBase).sort((a,z)=>z.ovr-a.ovr).slice(0,6);
  return `<div class="wrap x9"><h2>Base · ${esc(c.name)}</h2>
  <div class="card"><div class="row2" style="grid-template-columns:1fr 1fr"><div><div class="k">Índice da base</div><div class="bigtxt">${ix}</div><div class="k">#${pos} entre os 20 · ${ix>=75?'referência mundial':ix>=55?'forte':ix>=40?'regular':'fraca'}</div></div><div><div class="k">Sub-20 (temporada)</div><div class="bigtxt">${spos}º</div><div class="k">${c.s20.P} pts · ${c.s20.J} jogos</div></div></div>
   <div class="gauge" style="background:linear-gradient(90deg,#6e7f75,#4aa3ff,#2fd36f)"><i style="left:${ix}%"></i></div>
   <p class="news">Níveis iniciais pela formação de craques e pelo ranking CIES 2025 de formadores. A sua base cresce com investimento.</p></div>
  ${sec9('Comissão da base',Object.keys(STAFFN).map(r=>{const s=b.staff[r];return `<div class="slot"><div class="ic">${{olh:'🔭',trei:'🧑‍🏫',ger:'📋'}[r]}</div><div class="nm"><b>${s?esc(s.name):'— vago —'}</b><small>${STAFFN[r][0]}${s?' · '+starsT(s.q)+' · '+mi(s.sal)+'/ano':''}<br>${STAFFN[r][1]}</small></div><button class="btn sm ${s?'ghost':''}" data-a="${s?'basefire':'basehire'}" data-r="${r}">${s?'Demitir':'Contratar'}</button></div>${hire===r?baseCands(r).map((x,i)=>`<button class="off" data-a="basepick" data-r="${r}" data-i="${i}"><span><b>${esc(x.name)}</b><small>${starsT(x.q)} (${x.q}/5)</small></span><b>${mi(x.sal)}/ano</b></button>`).join(''):''}`}).join('')+
   `<div class="slot"><div class="ic">🏗️</div><div class="nm"><b>Centro de treinamento · nível ${b.ct}/5</b><small>Mais vagas, evolução mais rápida e garotos melhores</small><div class="lvl">${[0,1,2,3,4].map(i=>`<i class="${i<b.ct?'on':''}"></i>`).join('')}</div></div>${b.ct<5?`<button class="btn sm" data-a="basect">${mi(ctCost())}</button>`:'<span class="pill ok">máx.</span>'}</div>
   <p class="foot">Custo anual da comissão: ${mi(staffCostYear())}. Quem investe hoje colhe craques daqui a 3-4 temporadas.</p>`,`${c.youth.length}/${slots} vagas`)}
  ${sec9('Resultados Sub-20',`${b.rev.length?`<div class="res5">${b.rev.slice(-8).map(r=>`<span class="${r.gf>r.gc?'w':r.gf<r.gc?'l':''}">${r.home?'':'@ '}${r.op} ${r.gf}–${r.gc}</span>`).join('')}</div>`:'<p class="news">Sem jogos ainda.</p>'}
    ${sub.slice(0,5).map((x,i)=>`<div class="rank ${x.id===c.id?'':''}"><span class="pos">${i+1}º</span><div class="pn">${crest(x,18)}<span style="${x.id===c.id?'font-weight:800':''}">${esc(x.name)}</span></div><div class="n">${x.s20.P}</div></div>`).join('')}
    ${spos>5?`<div class="rank"><span class="pos">${spos}º</span><div class="pn">${crest(c,18)}<span style="font-weight:800">${esc(c.name)}</span></div><div class="n">${c.s20.P}</div></div>`:''}
    ${b.champs.length?`<p class="news">Campeões Sub-20: ${b.champs.slice(-4).map(x=>'T'+x.s+' '+C(x.id).sig).join(' · ')}</p>`:''}`,'Brasileiro Sub-20')}
  ${sec9('Garotos da base',c.youth.length?c.youth.map((y,i)=>`<div class="mrow"><span class="pos">${ROLEABB[y.role]}</span><span class="nm">${esc(y.name)}<small>${y.age}a · ${y.tr.map(t=>TN[t][0]).join('/')} · ${starsT(y.stars)} · valor ${mi(y.value)}</small>${bar(y.dev)}</span><span class="col"><button class="btn sm ghost" data-a="yinfo" data-i="${i}">Prazo</button><button class="btn sm" data-a="ypromote" data-i="${i}">Promover</button><button class="btn sm ghost" data-a="ysell" data-i="${i}">Vender</button></span></div>`).join(''):'<p class="news">Base vazia.</p>',`${c.youth.length}`)}
  <button class="btn ghost big" data-a="yscout">Buscar jovem (olheiro · R$ 0,05 mi)</button>
  ${sec9('Formados em casa',grads.length?grads.map(p=>`<div class="rank"><span class="pos">${p.fromBase}</span><div class="pn"><span>${esc(nameOf(p))}</span><small class="k">${roleLabel(p)} · ${p.age}a</small></div><div class="n">${p.ovr}</div></div>`).join('')+'<p class="news">Vender cria da base rende bônus de formação de 20%.</p>':'<p class="news">Promova os melhores garotos para eles virarem “crias” do clube.</p>')}
  <p class="foot">Dados reais da base: ranking CIES 2025 (SAO 71,3 · COR 68,8 · FLA 67,4 · PAL 65,1 · SAN 57,6…) e a certificação “Clube Formador” da CBF. Onde não há número público, estimamos.</p></div>`;
};
vJuniores=vBase;

/* ---------- ações ---------- */
Object.assign(A,{
   shspecial(){const c=userClub(),k=+(scaleOf(c)*.03).toFixed(1);if(G.fin.caixa<k)return toast('Caixa insuficiente ('+mi(k)+').');G.fin.caixa=+(G.fin.caixa-k).toFixed(2);G.mk.acc.cost+=k;G.mk.shirt.camp=6;G.mk.shirt.campUsed=true;save();toast('Camisa especial lançada! Vendas +25% por 6 rodadas.')},
 soccamp(){const c=userClub(),k=+(scaleOf(c)*.02).toFixed(1);if(G.fin.caixa<k)return toast('Caixa insuficiente ('+mi(k)+').');G.fin.caixa=+(G.fin.caixa-k).toFixed(2);G.mk.acc.cost+=k;G.mk.soc.camp=8;save();toast('Campanha de adesão no ar por 8 rodadas.')},
 socplan(d){G.mk.social.plan=+d.i;save();render()},
 projgo(d){const r=startProj(d.k);save();toast(r||'Obra iniciada: '+PROJ[d.k][0]+' (4 rodadas).')},
 namopen(){S.nm=true;render()},namclose(){S.nm=false;render()},
 nampick(d){const r=sellNaming(+d.i);S.nm=false;save();toast(r||'Naming rights vendido.')},
 naming(){S.nm=true;render()},
 basehire(d){S.hire=S.hire===d.r?null:d.r;render()},
 basepick(d){const x=baseCands(d.r)[+d.i];G.mk.base.staff[d.r]={name:x.name,q:x.q,sal:x.sal};S.hire=null;save();toast(x.name+' é o novo '+STAFFN[d.r][0].toLowerCase()+'.')},
 basefire(d){G.mk.base.staff[d.r]=null;save();render()},
 basect(){const k=ctCost();if(G.fin.caixa<k)return toast('Caixa insuficiente ('+mi(k)+').');G.fin.caixa=+(G.fin.caixa-k).toFixed(2);G.mk.acc.cost+=k;G.mk.base.ct++;save();toast('Centro de treinamento evoluiu para o nível '+G.mk.base.ct+'.')},
 ysell(d){const r=sellYouth(+d.i);save();toast(r||'Garoto vendido.')}
});
hookAround('bind','bind9',function(next,__a){
  next();
  const sp=$('#shp');if(sp){sp.oninput=()=>{const e=$('#shpl');if(e)e.textContent=sp.value};sp.onchange=()=>{G.mk.shirt.price=+sp.value;save();render()}}
  for(let i=0;i<3;i++){const e=$('#socp'+i);if(e){e.oninput=()=>{const l=$('#spl'+i);if(l)l.textContent=e.value};e.onchange=()=>{G.mk.soc.prices[i]=+e.value;save();render()}}}
});
/* ya existe ypromote em ui2.js; garante render após promover */

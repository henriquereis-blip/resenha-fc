/* ===== tela História ===== */
S.hs='camp';S.h2=null;
function xiPitch(xi){
  if(!xi||!xi.length)return '<p class="news">Ainda não há dados.</p>';
  const pos=layout(XI_SLOTS);
  const toks=xi.map((x,i)=>{const c=C(x.c);return `<div class="tok" style="left:${pos[i].x}%;top:${pos[i].y}%"><span class="shirt" style="background:${kitBg(c)}"><b>${x.r.toFixed(1)}</b></span><span class="tn"><i>${esc(x.n.split(' ').slice(-1)[0])}</i><small>${c.sig}</small></span></div>`}).join('');
  return `<div class="pitch" style="touch-action:auto">${'<svg class="lines" viewBox="0 0 300 400" preserveAspectRatio="none"><g fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6"><rect x="6" y="6" width="288" height="388"/><line x1="6" y1="200" x2="294" y2="200"/><circle cx="150" cy="200" r="38"/><rect x="85" y="6" width="130" height="58"/><rect x="85" y="336" width="130" height="58"/></g></svg>'}${toks}</div>`;
}
function vHistoria(){
  ex2();
  const tabs=[['camp','Campeões'],['rank','Ranking clubes'],['bola','Bola de Ouro'],['tdr','Time da Rodada'],['tda','Time do Ano'],['conf','Confrontos']];
  let b='';
  if(S.hs==='camp'){
    b=G.champs.length?`<div class="tbl">${G.champs.slice().reverse().map(x=>`<div class="res" style="padding:8px 10px"><span><b>T${x.s}</b> · ${crest(C(x.cid),18)} ${x.champ}<br><small class="k">Vice ${x.vice} · Art. ${esc(x.scorer)} · Téc. ${esc(x.coach)}</small></span></div>`).join('')}</div>`:'<p class="news">A primeira temporada ainda não terminou.</p>';
  }else if(S.hs==='rank'){
    const L=G.clubs.slice().sort((a,b)=>b.tro.reduce((s,x)=>s+x,0)-a.tro.reduce((s,x)=>s+x,0)||b.rep-a.rep);
    b=`<div class="tbl"><div class="tr hd t2"><span>#</span><span class="tc">Clube</span><span>Br</span><span>Lib</span><span>Mun</span><span>CB</span></div>${L.map((c,i)=>`<div class="tr t2 ${c.id===G.user?'me':''}"><span>${i+1}</span><span class="tc">${crest(c,18)}${c.sig}</span>${c.tro.map(x=>`<span>${x}</span>`).join('')}</div>`).join('')}</div><p class="foot">Títulos do passado aproximados, de memória. Os da sua carreira se somam.</p>`;
  }else if(S.hs==='bola'){
    const L=bolaOuro();const roles=[['GOL','Goleiro'],['LAT','Lateral'],['ZAG','Zagueiro'],['VOL','Volante'],['MEI','Meia'],['PNT','Ponta'],['ATA','Atacante']];
    b=L.length?`<div class="card" style="border-color:var(--accent2)"><div class="k">🏅 Bola de Ouro · nota média + títulos, convocações e jogos decisivos</div>${L.slice(0,10).map((x,i)=>`<button class="res lk" data-a="prof" data-id="${x.p.id}"><span>${i+1}. ${esc(nameOf(x.p))} <small>${C(x.p.club).sig} · ${roleLabel(x.p)}</small></span><b>${x.v.toFixed(2)}</b></button>`).join('')}</div>`+roles.map(([r,l])=>`<div class="card"><div class="k">${l}</div>${L.filter(x=>x.p.role===r).slice(0,5).map((x,i)=>`<button class="res lk" data-a="prof" data-id="${x.p.id}"><span>${i+1}. ${esc(nameOf(x.p))} <small>${C(x.p.club).sig}</small></span><b>${x.v.toFixed(2)}</b></button>`).join('')||'<p class="news">–</p>'}</div>`).join(''):'<p class="news">Jogue algumas rodadas para a Bola de Ouro aparecer.</p>';
  }else if(S.hs==='tdr'){
    const t=G.tdrs.filter(x=>x.s===G.season);const sel=S.tdrI!==undefined&&t[S.tdrI]?S.tdrI:t.length-1;const x=t[sel];
    b=x?`<div class="tools"><label>Rodada<select id="tdrsel">${t.map((y,i)=>`<option value="${i}" ${i===sel?'selected':''}>${y.r}ª rodada</option>`).join('')}</select></label></div>${xiPitch(x.xi)}<p class="foot">Os números nas camisas são as notas da rodada.</p>`:'<p class="news">Jogue uma rodada primeiro.</p>';
  }else if(S.hs==='tda'){
    const t=G.toty.slice().reverse();
    b=t.length?t.map(x=>`<div class="sec">Temporada ${x.s}</div>${xiPitch(x.xi)}`).join(''):'<p class="news">O Time do Ano aparece no fim da primeira temporada.</p>';
  }else{
    const ids=G.clubs.slice().sort((a,b)=>a.name.localeCompare(b.name));
    const a=S.h2?S.h2[0]:G.user,bb=S.h2?S.h2[1]:ids.find(c=>c.id!==G.user).id;
    const h=h2hOf(a,bb);const A_=C(a),B_=C(bb);
    const sel=(id,n)=>`<select id="${n}">${ids.map(c=>`<option value="${c.id}" ${c.id===id?'selected':''}>${c.name}</option>`).join('')}</select>`;
    b=`<div class="tools"><label>Clube 1${sel(a,'h2a')}</label><label>Clube 2${sel(bb,'h2b')}</label></div>
    <div class="card"><div class="vsx" style="color:inherit"><span>${crest(A_,40)}<b>${A_.sig}</b></span><i>${h.wa} – ${h.wb}</i><span>${crest(B_,40)}<b>${B_.sig}</b></span></div>
    <div class="res"><span>Jogos</span><b>${h.L.length}</b></div><div class="res"><span>Vitórias ${A_.sig} / empates / ${B_.sig}</span><b>${h.wa} / ${h.d} / ${h.wb}</b></div><div class="res"><span>Gols</span><b>${h.ga} – ${h.gb}</b></div>
    <div class="res"><span>Maior vitória ${A_.sig}</span><b>${h.bigA?h.bigA[3]+'–'+h.bigA[4]+' (T'+h.bigA[1]+')':'–'}</b></div><div class="res"><span>Maior vitória ${B_.sig}</span><b>${h.bigB?h.bigB[4]+'–'+h.bigB[3]+' (T'+h.bigB[1]+')':'–'}</b></div></div>
    <div class="card"><div class="k">Jogos (do mais recente)</div>${h.L.slice().reverse().slice(0,30).map(x=>`<div class="res"><span>T${x[0]} R${x[1]}</span><span>${C(x[2]).sig} <b>${x[4]}–${x[5]}</b> ${C(x[3]).sig}</span></div>`).join('')||'<p class="news">Ainda não se enfrentaram.</p>'}</div>`;
  }
  return `<div class="wrap"><h2>História</h2><div class="seg sm scroll">${tabs.map(([k,l])=>`<button class="${S.hs===k?'on':''}" data-a="hs" data-v="${k}">${l}</button>`).join('')}</div>${b}</div>`;
}
A.hs=d=>{S.hs=d.v;render()};
document.addEventListener('change',e=>{
  if(e.target.id==='tdrsel'){S.tdrI=+e.target.value;render()}
  if(e.target.id==='h2a'||e.target.id==='h2b'){S.h2=[+$('#h2a').value,+$('#h2b').value];render()}
});

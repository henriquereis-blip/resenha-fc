/* ===== telas extras ===== */
S.open={br:true,serieA:true};S.team=null;S.tt='elenco';
const fixMine=r=>(G.fixtures[r]||[]).find(f=>f[0]===G.user||f[1]===G.user);
function vAgenda(){
  const out=[];for(let r=G.round;r<Math.min(NR(),G.round+10);r++){const f=fixMine(r);if(f)out.push([r,f])}
  return `<div class="wrap"><h2>Agenda</h2><div class="card"><div class="k">Próximos jogos · Brasileirão Série A</div>${out.map(([r,f])=>{const home=f[0]===G.user,o=C(home?f[1]:f[0]);return `<div class="res"><span>R${r+1} · ${home?'casa':'fora'}</span><span>${crest(o,18)} ${o.name}</span><b>${posOf(o)}º</b></div>`}).join('')||'<p class="news">Sem jogos.</p>'}</div>
  <div class="card"><div class="k">Resultados</div>${G.myres.length?G.myres.slice().reverse().slice(0,20).map(m=>`<div class="res"><span>T${m.s} R${m.r}</span><span>${C(m.h).sig} <b>${m.hg}–${m.ag}</b> ${C(m.a).sig}</span></div>`).join(''):'<p class="news">Nenhum jogo disputado.</p>'}</div></div>`;
}
function vEstadio(){
  const c=userClub(),sec=stadSectors(c),l=G.fin.last;
  return `<div class="wrap"><h2>${c.name} · ${(c.cap*1000).toLocaleString('pt-BR')} lugares</h2>
  <div class="card"><div class="k">Capacidade por setor</div>${Object.entries(sec).map(([k,v])=>`<div class="res"><span>${k}</span><b>${v.toLocaleString('pt-BR')}</b></div>`).join('')}</div>
  ${tierCard86(userClub())}
  <div class="card"><div class="k">Ampliar estádio</div><p class="news">+2.000 lugares por ${mi(expandCost(c))}. Mais obras = mais bilheteria, mas também mais manutenção.</p><button class="btn big" data-a="expand">Expandir estádio</button></div>
  <div class="card"><div class="k">Naming rights</div>${G.naming?`<div class="res"><span>${esc(G.naming.name)}</span><b>${mi(G.naming.val)}/ano</b></div>`:`<p class="news">Vende o nome do estádio e recebe por ano, mas a torcida odeia.</p><button class="btn big ghost" data-a="naming">Vender naming rights</button>`}</div>
  <p class="foot">Em breve: shows e eventos (com mando de campo prejudicado), reforma de setores, estacionamento.</p></div>`;
}
function vJuniores(){
  const c=userClub();
  return `<div class="wrap"><h2>Juniores · vagas ${c.youth.length}/20</h2>${c.youth.map((y,i)=>`<div class="mrow"><span class="pos">${ROLEABB[y.role]}</span><span class="nm">${esc(y.name)}<small>${y.age}a · ${y.tr.map(t=>TN[t][0]).join('/')} · valor ${mi(y.value)} · ${'★'.repeat(y.stars)}${'☆'.repeat(5-y.stars)}</small>${bar(y.dev)}</span><span class="col"><button class="btn sm" data-a="ypromote" data-i="${i}">Promover</button><button class="btn sm ghost" data-a="ydismiss" data-i="${i}">Dispensar</button></span></div>`).join('')}
  <button class="btn ghost" data-a="yscout">Buscar jovem (olheiro · R$ 0,05 mi)</button><p class="foot">Estrelas indicam o potencial. Desenvolvimento sobe com o tempo; promover cedo gera um jogador mais fraco.</p></div>`;
}
S.rk='geral';S.rs='pais';
function vTecnicos(){
  const L=coachRank(S.rk);const me=L.findIndex(x=>x.me);const key={geral:'tot',res:'res',imp:'imp',cri:'cri',tat:'tat'}[S.rk];const m=L[me];
  return `<div class="wrap"><h2>Ranking de técnicos</h2>
  <div class="seg sm"><button class="${S.rs==='pais'?'on':''}" data-a="rs" data-v="pais">🇧🇷 País</button><button class="${S.rs==='liga'?'on':''}" data-a="rs" data-v="liga">Liga</button><button class="${S.rs==='mundo'?'on':''}" data-a="rs" data-v="mundo">🌍 Mundial</button></div>
  <div class="seg sm scroll">${Object.entries(COACHK).map(([k,l])=>`<button class="${S.rk===k?'on':''}" data-a="rk" data-v="${k}">${l}</button>`).join('')}</div>
  <div class="card"><div class="k">${esc(G.uc.name)} · ${me+1}º</div><div class="res"><span>Resultados</span><b>${m.res}</b></div><div class="res"><span>Imprensa</span><b>${m.imp}</b></div><div class="res"><span>Gestão de crises</span><b>${m.cri}</b></div><div class="res"><span>Maestria tática</span><b>${m.tat}</b></div><div class="res"><span>Total</span><b>${m.tot}</b></div><p class="news">${G.uc.V}V ${G.uc.E}E ${G.uc.D}D · ${G.uc.titles} título(s)</p></div>
  <div class="tbl"><div class="tr hd t2"><span>#</span><span class="tc">Técnico · time</span><span>V</span><span>Tít</span><span></span><span>${S.rk==='geral'?'Total':COACHK[S.rk].slice(0,4)}</span></div>${L.map((x,i)=>`<div class="tr t2 ${x.me?'me':''}"><span>${i+1}</span><span class="tc">${esc(x.name)} · ${x.sig}</span><span>${x.V}</span><span>${x.titles}</span><span></span><b>${x[key]}</b></div>`).join('')}</div>
  <p class="foot">Resultados: vitória 3, empate 1, top 4 +15, título +60. Imprensa: respostas que sobem diretoria e torcida. Crises: reagir a má fase, evitar queda da diretoria. Maestria tática: trocas que mudam o placar a seu favor. Hoje só existe a Série A, então País, Liga e Mundial mostram a mesma lista.</p></div>`;
}
function vTimes(){
  if(S.team===null){
    const f=(k,l,cls='')=>`<button class="folder ${cls}" data-a="tree" data-k="${k}">${S.open[k]?'📂':'📁'} ${l}</button>`;
    let h=`<div class="wrap"><h2>Times</h2><div class="card" style="padding:0">`+f('br','🇧🇷 Brasil');
    if(S.open.br){
      h+=f('serieA','Brasileirão Série A','sub');
      if(S.open.serieA)h+=G.clubs.filter(c=>c.div===0).sort((a,b)=>b.rep-a.rep).map(c=>`<button class="folder sub2" data-a="openteam" data-id="${c.id}">${crest(c,16)} ${c.name}</button>`).join('');
      [1,2,3,100,101,102,103].filter(d=>d<4||G.rg).forEach(d=>{h+=f('div'+d,DIVN[d],'sub');if(S.open['div'+d])h+=G.clubs.filter(c=>c.div===d).sort((a,b)=>b.rep-a.rep).map(c=>`<button class="folder sub2" data-a="openteam" data-id="${c.id}">${crest(c,16)} ${c.name}</button>`).join('')});
    }
    h+=`<div class="folder" style="opacity:.45">📁 Internacionais (em breve)</div></div></div>`;return h;
  }
  const c=C(S.team),mine=c.id===G.user;
  const tabs=[['elenco','Elenco'],['juniores','Juniores'],['trofeus','Troféus'],['retro','Retrospecto'],['xfer','Transf.']];
  const val=c.squad.reduce((s,id)=>s+valueOf(P(id)),0);
  let b='';
  if(S.tt==='elenco')b=`<div class="plist">${c.squad.map(id=>{const p=P(id);return `<button class="prow" data-a="prof" data-id="${id}"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>${mi(valueOf(p))}</small></span><span class="car">${trAbb(p)}</span><span class="age">${p.age}</span><span class="ovr">${p.ovr}</span><span></span></button>`}).join('')}</div>`;
  else if(S.tt==='juniores')b=c.youth.map((y,i)=>`<div class="mrow"><span class="pos">${ROLEABB[y.role]}</span><span class="nm">${esc(y.name)}<small>${y.age}a · ${y.tr.map(t=>TN[t][0]).join('/')} · ${'★'.repeat(y.stars)} · valor ${mi(y.value)}</small>${bar(y.dev)}</span>${mine?'':`<button class="btn sm" data-a="ybuy" data-t="${c.id}" data-i="${i}">Proposta</button>`}</div>`).join('');
  else if(S.tt==='trofeus')b=`<div class="troph">${TROPN.map((n,i)=>`<div class="trp"><b>${c.tro[i]}</b>🏆 ${n}</div>`).join('')}</div><p class="foot">Títulos históricos aproximados, de memória. Os da sua carreira se somam.</p>`;
  else if(S.tt==='retro')b=`<div class="card">${(c.retro.length?c.retro.slice().reverse().map(r=>`<div class="res"><span>T${r.s} · ${r.pos}º</span><b>${r.J}J ${r.V}V ${r.E}E ${r.D}D · ${r.GP}:${r.GC}</b></div>`).join(''):'<p class="news">Sem temporadas concluídas.</p>')}${mine&&G.myres.length?`<div class="k" style="margin-top:8px">Últimos jogos</div>${G.myres.slice().reverse().slice(0,8).map(m=>`<div class="res"><span>T${m.s} R${m.r}</span><span>${C(m.h).sig} <b>${m.hg}–${m.ag}</b> ${C(m.a).sig}</span></div>`).join('')}`:''}</div>`;
  else b=`<div class="card">${G.xfers.filter(x=>x.from===c.id||x.to===c.id).map(x=>`<div class="res"><span>T${x.s} R${x.r} · ${esc(x.name)}<br><small class="k">${x.from>=0?C(x.from).sig:'Livre'} → ${C(x.to).sig}</small></span><b>${mi(x.fee)}</b></div>`).join('')||'<p class="news">Sem transferências registradas. Só aparecem as feitas durante o jogo.</p>'}</div>`;
  return `<div class="wrap"><button class="back" data-a="tree" data-k="close">‹ Times</button><div class="card pf">${crest(c,48)}<div class="pfi"><h3>${c.name}</h3><div class="k">🇧🇷 Brasil · Série A · ${posOf(c)}º · elenco ${mi(val)}</div></div></div>
  <div class="seg sm scroll">${tabs.map(([k,l])=>`<button class="${S.tt===k?'on':''}" data-a="tt" data-v="${k}">${l}</button>`).join('')}</div>${b}</div>`;
}
Object.assign(A,{
 rs(d){S.rs=d.v;render()},rk(d){S.rk=d.v;render()},
 tree(d){if(d.k==='close')S.team=null;else S.open[d.k]=!S.open[d.k];render()},
 openteam(d){S.team=+d.id;S.tt='elenco';render();window.scrollTo(0,0)},
 tt(d){S.tt=d.v;render()},
 ypromote(d){const r=promoteYouth(userClub(),+d.i);save();toast(r||'Promovido para o elenco.')},
 ydismiss(d){const c=userClub();c.youth.splice(+d.i,1);save();render()},
 yscout(){const c=userClub();if(c.youth.length>=20)return toast('Academia lotada.');if(G.fin.caixa<0.05)return toast('Sem caixa.');G.fin.caixa=+(G.fin.caixa-0.05).toFixed(2);c.youth.push(mkYouth());save();render()},
 ybuy(d){const r=buyYouth(+d.t,+d.i);save();toast(r||'Jovem contratado!')},
 expand(){const r=expandStadium();save();toast(r||'Obras concluídas.')},
 });

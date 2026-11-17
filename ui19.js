/* ui19: Copas — Copa do Brasil e competição continental */
(function(){const st=document.createElement('style');st.textContent=`
.cp19 .tie{display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:center;padding:8px 6px;border-bottom:1px solid #ffffff0b;font-size:13px}
.cp19 .tie:last-child{border:0}.cp19 .tie .h{text-align:right}.cp19 .tie b{font:800 15px var(--fh);padding:2px 10px;border-radius:8px;background:#ffffff0d}
.cp19 .tie.me{background:#35f0a012;border-radius:10px}.cp19 .tie .w{font-weight:800;color:var(--accent)}
.cp19 .stg{font:800 11px var(--fh);letter-spacing:.14em;text-transform:uppercase;color:var(--accent);margin:12px 0 4px}
.cp19 .gt{display:grid;grid-template-columns:22px 1fr 28px 28px 34px 34px;gap:4px;align-items:center;padding:7px 4px;border-bottom:1px solid #ffffff0b;font-size:13px}
.cp19 .gt.hd{font:700 10px var(--fh);letter-spacing:.1em;color:var(--mut)}.cp19 .gt.me{background:#35f0a012;border-radius:8px}.cp19 .gt.q{border-left:3px solid var(--accent)}
.cp19 .badge{display:inline-block;padding:3px 10px;border-radius:99px;font:800 11px var(--fh);letter-spacing:.08em;text-transform:uppercase}
.cp19 .badge.ok{background:#35f0a024;color:var(--accent)}.cp19 .badge.bad{background:#ff5c7024;color:var(--bad)}.cp19 .badge.gold{background:#ffd24a24;color:var(--accent2)}
.cupnote{padding:10px 12px;border-radius:12px;margin:8px 0;font:700 13px var(--fb)}.cupnote.ok{background:#35f0a01c;color:var(--accent)}.cupnote.bad{background:#ff5c701c;color:var(--bad)}
`;document.head.appendChild(st)})();
const tieRow=(r,me)=>`<div class="tie ${me?'me':''}"><span class="h ${r.w===r.h?'w':''}">${esc(C(r.h).name)}</span><b>${r.hg} – ${r.ag}${r.pen?` <small>(${r.pen[0]}–${r.pen[1]})</small>`:''}</b><span class="${r.w===r.a?'w':''}">${esc(C(r.a).name)}</span></div>`;
var vComp=function(){
  const tab=S.ctab||'cup',c=G.cup,k=G.cont;
  const tabs=`<div class="seg"><button class="${tab==='cup'?'on':''}" data-a="ctab" data-t="cup">Copa do Brasil</button><button class="${tab==='cont'?'on':''}" data-a="ctab" data-t="cont">Continental</button></div>`;
  let h=`<div class="wrap cp19"><h2>Copas</h2>${tabs}`;
  if(tab==='cup'){
    if(!c)return h+'<p class="news">Sem dados.</p></div>';
    const mine=c.pairs.find(([a,b])=>a===G.user||b===G.user);
    const status=c.champ!=null?`<span class="badge gold">${c.champ===G.user?'Você é o campeão!':'Campeão: '+esc(C(c.champ).name)}</span>`:mine?`<span class="badge ok">Você está vivo</span>`:`<span class="badge bad">Eliminado${c.out?' em '+c.out:''}</span>`;
    h+=`<div class="card"><div class="k">Copa do Brasil ${c.s} · 32 clubes · jogo único, empate vai para os pênaltis</div><div class="big">${c.st<5?CNAMES[c.st]:'Encerrada'}</div><p class="news">${status}${c.st<5?` · próxima fase na rodada ${CSL[c.st]+1} do campeonato`:''}</p>
     ${mine&&c.st<5?`<div class="res"><span>Seu próximo jogo</span><b>${esc(C(mine[0]===G.user?mine[1]:mine[0]).name)}</b></div>`:''}
     <div class="res"><span>Receita da copa até agora</span><b>${mi(c.prize||0)}</b></div>
     <p class="news">Prêmio cresce a cada fase: avançar paga mais, o título paga muito e dá vaga na Libertadores.</p></div>`;
    if(c.st<5)h+=`<div class="card"><div class="stg">${CNAMES[c.st]} · confrontos</div>${c.pairs.map(([a,b])=>`<div class="tie ${a===G.user||b===G.user?'me':''}"><span class="h">${esc(C(a).name)}</span><b>x</b><span>${esc(C(b).name)}</span></div>`).join('')}</div>`;
    for(const s of c.hist.slice().reverse())h+=`<div class="card"><div class="stg">${s.name}</div>${s.res.map(r=>tieRow(r,r.h===G.user||r.a===G.user)).join('')}</div>`;
    const ch=(G.cupHist||[]).slice().reverse();
    if(ch.length)h+=`<div class="card"><div class="k">Campeões anteriores</div>${ch.map(x=>`<div class="res"><span>${x.s}</span><b>${esc(C(x.champ).name)}</b></div>`).join('')}</div>`;
  }else{
    if(k){
      const rows=k.ids.slice().sort((p,q)=>k.tbl[q].P-k.tbl[p].P||(k.tbl[q].GP-k.tbl[q].GC)-(k.tbl[p].GP-k.tbl[p].GC)||k.tbl[q].GP-k.tbl[p].GP);
      const st=k.champ?'<span class="badge gold">Campeão!</span>':k.alive?`<span class="badge ok">${k.phase==='group'?'Fase de grupos':'Mata-mata'}</span>`:'<span class="badge bad">Eliminado</span>';
      h+=`<div class="card"><div class="k">${COMPN[k.comp]} ${k.s}</div><div class="big">${k.phase==='group'?'Grupo · rodada '+Math.min(6,k.md+1)+'/6':k.phase==='ko'?KNAMES[k.st]:k.champ?'Campeão':'Encerrada para você'}</div><p class="news">${st}${k.alive?` · próximo jogo na rodada ${((k.phase==='group'?GSL[k.md]:KSL[k.st])||0)+1} do campeonato`:''}</p><div class="res"><span>Receita continental</span><b>${mi(k.prize||0)}</b></div>
       <p class="news">Top 2 do grupo avançam. O mata-mata é jogo único e vale prêmio crescente.</p></div>
       <div class="card"><div class="stg">Seu grupo</div><div class="gt hd"><span>#</span><span>CLUBE</span><span>J</span><span>V</span><span>SG</span><span>P</span></div>
       ${rows.map((id,i)=>{const t=k.tbl[id];return `<div class="gt ${id===G.user?'me':''} ${i<2?'q':''}"><span>${i+1}</span><span>${esc(C(id).name)}</span><span>${t.J}</span><span>${t.V}</span><span>${t.GP-t.GC}</span><b>${t.P}</b></div>`}).join('')}</div>`;
      if(k.phase==='ko'&&k.opp[k.st]!=null)h+=`<div class="card"><div class="stg">${KNAMES[k.st]}</div><div class="res"><span>Adversário</span><b>${esc(C(k.opp[k.st]).name)}</b></div></div>`;
      for(const l of k.log)h+=`<div class="card"><div class="stg">${l.label}</div>${l.res.map(r=>tieRow(Object.assign({w:r.hg>r.ag?r.h:r.hg<r.ag?r.a:null},r),r.h===G.user||r.a===G.user)).join('')}</div>`;
    }else{
      const rk=userClub().div===0?tableRows(0):[];const lib=rk.slice(0,6),sul=rk.slice(6,12);
      h+=`<div class="card"><div class="k">Competição continental</div><div class="big">Fora desta temporada</div><p class="news">Libertadores: 5 melhores do Brasileirão mais o campeão da Copa do Brasil. Sul-Americana: os clubes logo atrás. Só vale para a Série A.</p></div>
       ${rk.length?`<div class="card"><div class="stg">Corrida pela Libertadores (hoje)</div>${lib.map((x,i)=>`<div class="res ${x.id===G.user?'me':''}"><span>${i+1}º ${esc(x.name)}</span><b>${x.P}</b></div>`).join('')}<div class="stg">Sul-Americana (hoje)</div>${sul.map((x,i)=>`<div class="res ${x.id===G.user?'me':''}"><span>${i+7}º ${esc(x.name)}</span><b>${x.P}</b></div>`).join('')}</div>`:''}`;
    }
    h+=`<p class="news">Troféus continentais: ${G.trophyCont||0} · Copas do Brasil: ${G.trophyCup||0}</p>`;
  }
  return h+'</div>';
};
Object.assign(A,{ctab(d){S.ctab=d.t;render()}});
const _vm19=vModal;vModal=function(){
  let h=_vm19();const md=S.modal;
  try{if(md&&md.t==='round'&&G.lastRound&&G.lastRound.cup){const x=G.lastRound.cup;
    h=h.replace(/<h3>[^<]*Fim da rodada \d+<\/h3>/,`<h3>${esc(x.label)}</h3><div class="cupnote ${x.adv===false?'bad':'ok'}">${esc(x.note||'')}${x.pen?' · Pênaltis '+x.pen[0]+'–'+x.pen[1]:''}${x.prize?' · Receita '+mi(x.prize):''}</div>`)}}catch(e){}
  return h;
};

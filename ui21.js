/* ui21: aba Estadual (séries por estado) e tons de fundo por competição */
(function(){const st=document.createElement('style');st.textContent=`
.cp19{--lt:#2ed08c;--lm:10%}
.cp19.tcup{--lt:#27ab78;--lm:9%}.cp19.test{--lt:#1f8a62;--lm:7%}
.cp19.tlib{--lt:#ffd24a;--lm:12%}.cp19.tsul{--lt:#c9d1dc;--lm:11%}.cp19.tuel{--lt:#c9d1dc;--lm:11%}.cp19.tcon{--lt:#8c96a4;--lm:11%}.cp19.tucl{--lt:#ffd24a;--lm:12%}
.cp19 .card{background:linear-gradient(180deg,color-mix(in srgb,var(--lt) var(--lm),var(--card)),color-mix(in srgb,var(--lt) calc(var(--lm)/3),var(--card)));border:1px solid color-mix(in srgb,var(--lt) 30%,transparent)}
.cp19 .stg,.cp19 .gt.hd{color:var(--lt)}.cp19 .gt.q{border-left:3px solid var(--lt)}
.cp19 .seg button.on{background:color-mix(in srgb,var(--lt) 22%,transparent);color:var(--lt)}
`;document.head.appendChild(st)})();
hookAround('vComp','vc21',function(next,__a){
  const tab=S.ctab||'cup',tabs3=t=>`<div class="seg"><button class="${t==='cup'?'on':''}" data-a="ctab" data-t="cup">Copa do Brasil</button><button class="${t==='cont'?'on':''}" data-a="ctab" data-t="cont">Continental</button><button class="${t==='est'?'on':''}" data-a="ctab" data-t="est">Estadual</button></div>`;
  if(tab!=='est'){
    let h=next().replace(/<div class="seg">[\s\S]*?<\/div>/,tabs3(tab));
    const cls=tab==='cup'?'tcup':(G.cont&&G.cont.comp==='SUL'?'tsul':'tlib');
    return h.replace('<div class="wrap cp19">','<div class="wrap cp19 '+cls+'">');
  }
  const e=G.est;let h=`<div class="wrap cp19 test"><h2>Copas</h2>${tabs3('est')}`;
  if(!e||!e.slots)return h+'<p class="news">Sem dados.</p></div>';
  const fmt=e.type==='grupos'?`${e.N} clubes em 2 grupos · ${e.sched.length} jogos na fase de grupos · ${e.Q/2} melhores de cada grupo vão ao mata-mata`:`${e.N} clubes · ${e.sched.length} jogos na fase de liga · top ${e.Q} vão ao mata-mata`;
  const nxt=e.phase==='liga'&&e.md<e.sched.length?`próximo jogo na rodada ${e.slots[e.md]+1} do campeonato`:e.phase==='ko'&&e.ko.pairs.some(p=>p.includes(G.user))?`${e.ko.names[e.ko.st]} na rodada ${e.slots[e.sched.length+e.ko.st]+1} do campeonato`:'';
  const alive=e.phase==='ko'&&e.ko.alive.includes(G.user);
  const st=e.champ!=null?(e.champ===G.user?'<span class="badge gold">Você é o campeão!</span>':'<span class="badge bad">Campeão: '+esc(C(e.champ).name)+'</span>'):e.phase==='ko'?(alive?'<span class="badge ok">Mata-mata</span>':'<span class="badge bad">Eliminado</span>'):'<span class="badge ok">Fase de classificação</span>';
  const rel=e.rel>0&&e.tier<e.tiers-1?`últimos ${e.rel} caem`:'';const acc=e.tier>0?'finalistas sobem':'';
  h+=`<div class="card"><div class="k">${esc(e.name)} ${2026+e.s} · ${e.tier+1}ª divisão do estado</div><div class="big">${e.champ!=null?'Encerrado':e.phase==='ko'?e.ko.names[e.ko.st]:'Rodada '+Math.min(e.sched.length,e.md+1)+'/'+e.sched.length}</div><p class="news">${st}${nxt?' · '+nxt:''}</p>
   <div class="res"><span>Formato</span><b style="font:600 12px var(--fb);text-align:right;max-width:70%">${fmt}</b></div>${(rel||acc)?`<div class="res"><span>Acesso e queda</span><b style="font:600 12px var(--fb)">${[acc,rel].filter(Boolean).join(' · ')}</b></div>`:''}
   <div class="res"><span>Receita do estadual</span><b>${mi(e.prize||0)}</b></div></div>`;
  const row=(id,i,q)=>{const t=e.tbl[id];return `<div class="gt ${id===G.user?'me':''} ${q(i)?'q':''}"><span>${i+1}</span><span>${esc(C(id).name)}</span><span>${t.J}</span><span>${t.V}</span><span>${t.GP-t.GC}</span><b>${t.P}</b></div>`};
  const hd='<div class="gt hd"><span>#</span><span>CLUBE</span><span>J</span><span>V</span><span>SG</span><span>P</span></div>';
  if(e.type==='grupos'){e.groups.forEach((g,gi)=>{const o=estOrder(g);h+=`<div class="card"><div class="stg">Grupo ${'AB'[gi]}</div>${hd}${o.map((id,i)=>row(id,i,j=>j<e.Q/2)).join('')}</div>`})}
  else{const o=estOrder();h+=`<div class="card"><div class="stg">Tabela</div>${hd}${o.map((id,i)=>row(id,i,j=>j<e.Q)).join('')}</div>`}
  if(e.phase==='ko'&&e.ko.pairs.length)h+=`<div class="card"><div class="stg">${e.ko.names[e.ko.st]} · confrontos</div>${e.ko.pairs.map(([a,b])=>`<div class="tie ${a===G.user||b===G.user?'me':''}"><span class="h">${esc(C(a).name)}</span><b>x</b><span>${esc(C(b).name)}</span></div>`).join('')}</div>`;
  for(const l of e.log)h+=`<div class="card"><div class="stg">${l.label}</div>${l.res.map(r=>tieRow(Object.assign({w:r.hg>r.ag?r.h:r.hg<r.ag?r.a:null},r),r.h===G.user||r.a===G.user)).join('')}</div>`;
  const hist=(G.estHist||[]).slice().reverse();
  if(hist.length)h+=`<div class="card"><div class="k">Campeões anteriores</div>${hist.map(x=>`<div class="res"><span>${x.s} · ${esc(x.name||'Estadual')}</span><b>${esc(C(x.champ)?C(x.champ).name:'—')}</b></div>`).join('')}</div>`;
  return h+`<p class="news">Títulos estaduais: ${G.trophyEst||0}</p></div>`;
});

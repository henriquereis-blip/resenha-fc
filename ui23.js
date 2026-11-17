/* ui23: Seleções — aba em Copas, convocações e banner no início */
(function(){const st=document.createElement('style');st.textContent=`
.cp19.tsel{--lt:#3fd07a;--lm:10%}
.sel23 .pl{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px 0;border-bottom:1px solid #ffffff0d}.sel23 .pl:last-child{border:0}
.sel23 .pl small{color:var(--mut);display:block;font-size:12px}.sel23 .pl .ask{display:flex;gap:6px;align-items:center}
.nt23{border:1px solid #ffd24a55;background:linear-gradient(135deg,#ffd24a14,#35f0a010)}.nt23 b{color:var(--accent2)}
`;document.head.appendChild(st)})();
const tabs4=t=>`<div class="seg"><button class="${t==='cup'?'on':''}" data-a="ctab" data-t="cup">Copa do Brasil</button><button class="${t==='cont'?'on':''}" data-a="ctab" data-t="cont">Continental</button><button class="${t==='est'?'on':''}" data-a="ctab" data-t="est">Estadual</button><button class="${t==='sel'?'on':''}" data-a="ctab" data-t="sel">Seleções</button></div>`;
const _vc23=vComp;vComp=function(){
  const tab=S.ctab||'cup';
  if(tab!=='sel')return _vc23().replace(/<div class="seg">[\s\S]*?<\/div>/,tabs4(tab));
  const b=ntBox(),pd=b.pend,y=cyOf(),yr=2026+G.season;
  const cyTxt=['Início do ciclo da Copa: amistosos e primeiras eliminatórias','Ano de Copa América + eliminatórias','Reta final das eliminatórias','Ano de Copa do Mundo'][y];
  let h=`<div class="wrap cp19 tsel sel23"><h2>Copas</h2>${tabs4('sel')}`;
  h+=`<div class="card"><div class="k">Seleção brasileira · ${yr}</div><div class="big">${cyTxt}</div><p class="news">Datas FIFA caem nas rodadas ${NTW.map(x=>x+1).join(', ')}. Amistosos e eliminatórias comuns dá pra negociar com a CBF. Copa América, Copa do Mundo e jogo decisivo de eliminatória: convocou, vai.</p>
   <div class="res"><span>Relação com a CBF</span><b>${Math.round(b.rel)}/100</b></div><div class="res"><span>Força da seleção (média dos 14 melhores)</span><b>${braRating().toFixed(1)}</b></div></div>`;
  if(pd){
    h+=`<div class="card"><div class="stg">Próxima data FIFA · ${WTYPE[pd.type]} · rodada ${pd.r+1}</div><p class="news">${pd.type==='ca'||pd.type==='wc'||pd.type==='dec'?'Não dá pra negociar: torneio ou jogo decisivo. Eles ficam fora por '+pd.aw+' rodada(s).':'Você pode pedir a liberação de cada jogador. Chance depende do tipo de jogo, do astro e da sua relação com a CBF. Quanto mais pedidos, menor a chance.'}</p>
     ${pd.ids.map(id=>{const p=P(id),nt=pd.neg[id],pc=ntAskPct(id);return `<div class="pl"><span>${esc(nameOf(p))}<small>${natOf(p)==='BRA'?'Seleção brasileira':'Seleção '+natOf(p)} · nota ${p.ovr}</small></span><span class="ask">${nt==='ok'?'<span class="badge ok">liberado</span>':nt==='no'?'<span class="badge bad">CBF recusou</span>':pc>0?`<button class="btn sm" data-a="ntask" data-id="${id}">Pedir dispensa ${Math.round(pc*100)}%</button>`:'<span class="badge">convocado</span>'}</span></div>`}).join('')}</div>`;
  }else h+=`<div class="card"><div class="stg">Próxima data FIFA</div><p class="news">${NTW.filter(x=>x>G.round).length?'Rodada '+(NTW.find(x=>x>G.round)+1)+' do campeonato. Os convocados são anunciados uma rodada antes.':'Sem mais datas FIFA nesta temporada.'}</p></div>`;
  const q=b.q;
  if(q){const o=ntQOrder();h+=`<div class="card"><div class="stg">Eliminatórias · ${q.md}/18 jogos${q.done?' · encerradas':''}</div><div class="gt hd"><span>#</span><span>SELEÇÃO</span><span>J</span><span>V</span><span>SG</span><span>P</span></div>${o.map((c,i)=>{const t=q.tbl[c];return `<div class="gt ${c==='BRA'?'me':''} ${i<6?'q':''}"><span>${i+1}</span><span>${NTN[c]}</span><span>${t.J}</span><span>${t.V}</span><span>${t.GP-t.GC}</span><b>${t.P}</b></div>`}).join('')}</div><p class="news">Os 6 primeiros vão à Copa do Mundo.</p>`}
  if(b.log.length)h+=`<div class="card"><div class="stg">Últimos jogos</div>${b.log.map(l=>`<div class="res"><span style="font-size:13px">${esc(l.t)}</span></div>`).join('')}</div>`;
  if(b.hist.length)h+=`<div class="card"><div class="stg">Torneios</div>${b.hist.map(x=>`<div class="res"><span>${x.s} · ${x.t}</span><b style="font:600 12px var(--fb);text-align:right;max-width:60%">${esc(x.r)}</b></div>`).join('')}</div>`;
  return h+'</div>';
};
const _vi23=vInicio;vInicio=function(){
  let h=_vi23();const b=G&&G.nt;
  try{
    if(b&&b.pend){const pd=b.pend;const nm=pd.ids.map(id=>lastName(P(id).name)).join(', ');
      const card=`<button class="card nt23" data-a="ntgo"><div class="k">🌎 Data FIFA · rodada ${pd.r+1}</div><div><b>${WTYPE[pd.type]}</b>: ${esc(nm)} convocado(s). ${pd.type==='ca'||pd.type==='wc'||pd.type==='dec'?'Sem negociação.':'Dá pra negociar a dispensa.'}</div></button>`;
      if(h.includes('<button class="card paperc"'))h=h.replace('<button class="card paperc"',card+'<button class="card paperc"');else h=h.replace(/<div class="wrap">/,'<div class="wrap">'+card);
    }
    const aw=userClub().squad.filter(id=>P(id).ntw>0);
    for(const id of aw){h=h.replace(new RegExp('(data-id="'+id+'"[^>]*><td class="p">[^<]*</td><td class="nmc">[^<]*)'),'$1 🎖️')}
  }catch(e){}
  return h;
};
Object.assign(A,{ntgo(){S.ctab='sel';G.view='comp';S.modal=null;render();window.scrollTo(0,0)}});

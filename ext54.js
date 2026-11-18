/* ext54: tela da CHAVE da copa nacional (carreira no exterior, ext53).
   Aparece na aba da copa em "Copas" (no lugar da Copa do Brasil quando o técnico está fora): colunas por fase, com placar,
   vencedor em negrito, o seu clube destacado, fases futuras com "?" e o seu próximo jogo. Só leitura; usa G.nc. */
(function(){const st=document.createElement('style');st.textContent=`
.br54{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 10px;-webkit-overflow-scrolling:touch}
.br54 .col{flex:0 0 164px;display:flex;flex-direction:column;justify-content:space-around;gap:8px}
.br54 .col h5{margin:0 0 2px;font:800 10px var(--fh);letter-spacing:.08em;text-transform:uppercase;color:var(--mut);position:sticky;top:0}
.br54 .m{border:1px solid var(--line);border-radius:10px;background:var(--card);overflow:hidden;font:600 12px var(--fb)}
.br54 .m.me{border-color:var(--lt,#27ab78);box-shadow:0 0 0 1px var(--lt,#27ab78) inset}
.br54 .m div{display:flex;justify-content:space-between;gap:6px;padding:5px 8px}
.br54 .m div+div{border-top:1px solid var(--line)}
.br54 .m span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.br54 .m b{font:800 12px var(--fh)}
.br54 .m .w{font-weight:800}.br54 .m .l{opacity:.55}
.br54 .m .u{color:var(--lt,#27ab78)}
.br54 .q{color:var(--mut);text-align:center;font:700 12px var(--fh);padding:9px 0}
`;document.head.appendChild(st)})();
function ncBracket54(nc,nm){
  nm=nm||(n=>NCN[n*2]||'Fase');
  const nmx=id=>{try{return C(id)&&C(id).name||'?'}catch(e){return '?'}};
  const cols=[];
  for(const h of nc.hist)cols.push({n:h.n,m:h.r.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,pen:r.pen,w:r.w,done:1}))});
  if(!nc.champ&&nc.pairs.length)cols.push({n:nm(nc.pairs.length),m:nc.pairs.map(p=>({h:p[0],a:p[1],done:0}))});
  /* fases futuras: só a contagem de jogos, sem nomes */
  let left=nc.champ?0:nc.pairs.length;const fut=[];while(left>1){left=Math.floor(left/2);fut.push({n:nm(left),m:Array.from({length:left},()=>null)})}
  const tm=(id,g,win,pen,u)=>`<div class="${win?'w':'l'} ${id===G.user?'u':''}"><span>${esc(nmx(id))}</span><b>${g==null?'':g}${pen!=null?' ('+pen+')':''}</b></div>`;
  const colH=c=>`<div class="col"><h5>${c.n}</h5>${c.m.map(m=>{
    if(!m)return '<div class="m"><div class="q">?</div></div>';
    const you=m.h===G.user||m.a===G.user;
    if(!m.done)return `<div class="m ${you?'me':''}"><div class="${m.h===G.user?'u':''}"><span>${esc(nmx(m.h))}</span><b></b></div><div class="${m.a===G.user?'u':''}"><span>${esc(nmx(m.a))}</span><b></b></div></div>`;
    return `<div class="m ${you?'me':''}">${tm(m.h,m.hg,m.w===m.h,m.pen?m.pen[0]:null)}${tm(m.a,m.ag,m.w===m.a,m.pen?m.pen[1]:null)}</div>`}).join('')}</div>`;
  return `<div class="br54">${cols.concat(fut).map(colH).join('')}${nc.champ!=null?`<div class="col"><h5>Campeão</h5><div class="m ${nc.champ===G.user?'me':''}"><div class="w ${nc.champ===G.user?'u':''}"><span>🏆 ${esc(nmx(nc.champ))}</span></div></div></div>`:''}</div>`;
}
/* chave do mata-mata de liguilla/playoff (G.po51): colunas por fase a partir do log + confrontos da fase atual */
function poBracket54(po){
  const nm=id=>{try{return C(id)&&C(id).name||'?'}catch(e){return '?'}};
  const cols=[],by={};
  for(const x of po.log||[]){const k=x.stage;if(!by[k]){by[k]={n:k,m:[]};cols.push(by[k])}by[k].m.push(x)}
  const sc=t=>{const r=String(t).match(/\d+–\d+(?: \(\d+–\d+ pên\.\))?(?: \/ \d+–\d+)*/);return r?r[0]:''};
  const done=c=>`<div class="col"><h5>${esc(c.n)}</h5>${c.m.map(x=>{const you=x.w===G.user||x.l===G.user;
    return `<div class="m ${you?'me':''}"><div class="w ${x.w===G.user?'u':''}"><span>${esc(nm(x.w))}</span><b>${esc(sc(x.t))}</b></div><div class="l ${x.l===G.user?'u':''}"><span>${esc(nm(x.l))}</span><b></b></div></div>`}).join('')}</div>`;
  let cur='';
  if(po.ties&&po.ties.length&&!po.champ)cur=`<div class="col"><h5>${esc(po.sn||'Agora')}</h5>${po.ties.map(t=>{const you=t.a===G.user||t.b===G.user;
    return `<div class="m ${you?'me':''}"><div class="${t.a===G.user?'u':''}"><span>${esc(nm(t.a))}</span><b></b></div><div class="${t.b===G.user?'u':''}"><span>${esc(nm(t.b))}</span><b></b></div></div>`}).join('')}</div>`;
  return `<div class="br54">${cols.map(done).join('')}${cur}</div>`;
}
const _vc54=vComp;vComp=function(){
  let h=_vc54.apply(this,arguments),poCard='';
  try{
    const tab=S.ctab||'cup';const nc=G&&G.abroad&&G.nc&&G.nc.s===G.season?G.nc:null;
    if(tab==='cup'&&G.po51&&G.po51.s===G.season&&(G.po51.log.length||G.po51.ties.length)){
      const po=G.po51,card=`<div class="card"><div class="k">Mata-mata · ${esc(po.label||'Playoffs')}</div>${poBracket54(po)}<p class="news">Fases já jogadas e o confronto atual. Seu clube fica destacado.</p></div>`;
      poCard=card;if(!(G.abroad&&G.nc&&G.nc.s===G.season)){const i=h.indexOf('</div>',h.indexOf('class="seg"'));if(i>0)h=h.slice(0,i+6)+card+h.slice(i+6)}
    }
    if(!nc){
      /* Brasil: chave da Copa do Brasil (G.cup) acima do conteúdo da aba */
      if(tab==='cup'&&!G.abroad&&G.cup&&G.cup.hist){
        const cp=G.cup,nmB=n=>({16:'1ª fase',8:'Oitavas',4:'Quartas',2:'Semifinal',1:'Final'}[n]||'Fase');
        const ob={hist:cp.hist.map(x=>({n:x.name,r:x.res})),pairs:cp.pairs||[],champ:cp.champ};
        const card=`<div class="card"><div class="k">Chave · Copa do Brasil ${2026+G.season}</div>${ncBracket54(ob,nmB)}<p class="news">Arraste pro lado pra ver as fases. Seu clube fica destacado.</p></div>`;
        const i=h.indexOf('</div>',h.indexOf('class="seg"'));
        if(i>0)return h.slice(0,i+6)+card+h.slice(i+6);
      }
      return h;
    }
    h=h.replace('Copa do Brasil</button>',esc(nc.name)+'</button>');
    if(tab!=='cup')return h;
    const sn=nc.champ!=null?'Encerrada':NCN[nc.pairs.length*2]||'Fase';
    const alive=!nc.out&&nc.champ==null;
    const slot=alive&&nc.slots[nc.st]!=null?`seu próximo jogo na rodada ${nc.slots[nc.st]+1} do campeonato`:'';
    const badge=nc.champ===G.user?'<span class="badge gold">Você é o campeão!</span>':nc.champ!=null?`<span class="badge bad">${nc.out?'Eliminado em '+esc(nc.out)+' · ':''}Campeão: ${esc(C(nc.champ).name)}</span>`:'<span class="badge ok">Você segue vivo</span>';
    const card=`<div class="card"><div class="k">${esc(nc.name)} · temporada ${2026+G.season} · ${nc.size} clubes</div><div class="big">${sn}</div><p class="news" style="margin:4px 0 8px">${badge}${slot?' · '+slot:''}</p>${ncBracket54(nc)}<p class="news">Mata-mata de jogo único, pênaltis se empatar. Arraste pro lado pra ver as fases.</p></div>`;
    const hist=(G.ncHist||[]).slice().reverse();
    const hh=hist.length?`<div class="card"><div class="k">Campeões anteriores</div>${hist.map(x=>`<div class="res"><span>${esc(x.n||nc.name)} · T${x.s}</span><b>${esc(x.champ||'—')}</b></div>`).join('')}</div>`:'';
    /* troca o conteúdo da Copa do Brasil pela chave da copa nacional, mantendo título e abas */
    const i=h.indexOf('</div>',h.indexOf('class="seg"'));
    const head=i>0?h.slice(0,i+6):h;
    return head+poCard+card+hh+'</div>';
  }catch(e){console.error('br54 '+e.message);return h}
};

/* ext49: favoritos. Estrela no canto do perfil de qualquer jogador (vazia = não favorito, cheia = favorito); aba "Favoritos" no Mercado com filtro por posição.
   Jogadores da aba Mundo (que ainda não são do jogo) viram um cartão guardado (G.favw) com a mesma estrela. */
const favs=()=>{if(!Array.isArray(G.fav))G.fav=[];return G.fav};
const wfavs=()=>{if(!Array.isArray(G.favw))G.favw=[];return G.favw};
const isFav=id=>favs().includes(+id);
const wkey=p=>p.n+'|'+p.club;
const isWfav=p=>wfavs().some(x=>wkey(x)===wkey(p));
(function(){const st=document.createElement('style');st.textContent=`
.card.pf{position:relative}.card.pf .pfi{padding-right:46px}
.starp49{position:absolute;top:8px;right:8px;width:42px;height:42px;display:flex;align-items:center;justify-content:center;font-size:28px;line-height:1;border:0;background:none;color:var(--mut);border-radius:12px;padding:0;margin:0}
.starp49.on{color:#ffd24a}
.fs49{font-style:normal;color:#ffd24a;margin-right:3px}
.chips49{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:4px 0 10px;padding-bottom:2px}.chips49::-webkit-scrollbar{display:none}
.chips49 button{flex:0 0 auto;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--mut);font:700 12px var(--fh)}
.chips49 button.on{background:color-mix(in srgb,#ffd24a 18%,transparent);border-color:#ffd24a;color:#ffd24a}`;document.head.appendChild(st)})();
const starBtn49=(on,attrs)=>`<button class="starp49 ${on?'on':''}" ${attrs} aria-label="${on?'Tirar dos favoritos':'Favoritar'}">${on?'★':'☆'}</button>`;
function keepY49(fn){const y=window.scrollY;fn();render();window.scrollTo(0,y)}
Object.assign(A,{
  fav(d){keepY49(()=>{const id=+d.id,L=favs(),i=L.indexOf(id);
    if(i>=0){L.splice(i,1);try{toast('Saiu dos favoritos')}catch(e){}}else{L.push(id);try{toast('⭐ Favoritado')}catch(e){}}
    try{save()}catch(e){}})},
  wfav(){const p=S.wp;if(!p)return;keepY49(()=>{const L=wfavs(),i=L.findIndex(x=>wkey(x)===wkey(p));
    if(i>=0){L.splice(i,1);try{toast('Saiu dos favoritos')}catch(e){}}else{L.push(Object.assign({},p));try{toast('⭐ Favoritado')}catch(e){}}
    try{save()}catch(e){}})},
  wprof(d){const W=wd();let p=d.k!==undefined?wfavs().find(x=>wkey(x)===d.k):(W.mk&&W.mk.l[+d.i]);
    if(!p)return;S.wp=Object.assign({},p);render();window.scrollTo(0,0)},
  wback(){S.wp=null;render()},
  favpos(d){S.favpos=d.v||'';render()}
});
/* ao sair da tela / trocar de aba, fecha o cartão de jogador do Mundo */
[['nav'],['tab'],['back']].forEach(([k])=>{const f=A[k];if(f)A[k]=function(){S.wp=null;return f.apply(this,arguments)}});
const _wb49=A.wbuy;if(_wb49)A.wbuy=function(d){
  const W=wd(),p=W.mk&&W.mk.l[+d.i],was=p&&isWfav(p),n0=userClub().squad.length;
  const r=_wb49.apply(this,arguments);S.wp=null;
  try{if(p&&userClub().squad.length>n0){
    if(was){const L=wfavs(),i=L.findIndex(x=>wkey(x)===wkey(p));if(i>=0)L.splice(i,1);
      const id=userClub().squad[userClub().squad.length-1];if(id!=null&&!isFav(id))favs().push(id)}}}catch(e){}
  return r};
hookAround('vMercado','vm49',function(next,__a){
  try{const L=favs();for(let i=L.length-1;i>=0;i--)if(!P(L[i]))L.splice(i,1)}catch(e){}
  const nf=favs().length+wfavs().length,tabBtn=on=>`<button class="${on?'on':''}" data-a="tab" data-t="fav">⭐ Favoritos (${nf})</button>`;
  const res=(k,v)=>`<div class="res"><span>${k}</span><b>${v}</b></div>`;
  /* cartão de jogador do Mundo */
  if(S.wp){const p=S.wp,W=wd(),idx=W.mk&&W.mk.l?W.mk.l.findIndex(x=>wkey(x)===wkey(p)):-1,op=winOpen();
    return `<div class="wrap"><button class="back" data-a="wback">‹ Voltar</button>
    <div class="card pf">${starBtn49(isWfav(p),'data-a="wfav"')}<div class="pfo"><b>${p.ovr}</b><small>OVR</small></div><div class="pfi"><h3>${esc(p.n)}</h3><div class="k">${ROLEABB[p.role]||p.role} · ${NTN[p.nat]||p.nat} · ${p.age} anos · ${esc(p.club)}</div></div></div>
    <div class="card"><div class="k">Negociação</div>${res('Preço pedido',mi(p.fee))}${res('Mercado',op?'🟢 aberto':'🔴 fechado')}
    ${idx>=0?`<button class="btn big" data-a="wbuy" data-i="${idx}" ${op?'':'disabled'}>Contratar por ${mi(p.fee)}</button>`:'<p class="news">Esse jogador não está mais na lista desta janela. Ele volta a aparecer quando a lista renovar.</p>'}</div></div>`}
  const mark=h=>h.replace(/<button class="mrow" data-a="prof" data-id="(\d+)">([\s\S]*?)<\/button>/g,(m,id)=>isFav(id)?m.replace('<span class="nm">','<span class="nm"><i class="fs49">★</i>'):m);
  if(S.tab!=='fav'){
    let h=next();
    if(S.tab==='mundo'){let i=0;h=h.replace(/<div class="mrow"><span class="pos">/g,()=>`<div class="mrow" data-a="wprof" data-i="${i++}"><span class="pos">`);
      try{const W=wd(),L=(W.mk&&W.mk.l)||[];h=h.replace(/(<div class="mrow" data-a="wprof" data-i="(\d+)"><span class="pos">[^<]*<\/span><span class="nm">)/g,(m,a,k)=>L[+k]&&isWfav(L[+k])?a+'<i class="fs49">★</i>':m)}catch(e){}}
    else h=mark(h);
    return h.replace(/(data-t="livres">[^<]*<\/button>)/,'$1'+tabBtn(false))}
  /* aba Favoritos */
  const saved=S.tab;S.tab='ofertas';let h;try{h=next()}finally{S.tab=saved}
  const m=h.match(/<div class="seg sm scroll">[\s\S]*?<\/div>/);
  const tabs=m?m[0].replace(/class="on"( data-a="tab" data-t="ofertas")/,'class=""$1').replace(/(data-t="livres">[^<]*<\/button>)/,'$1'+tabBtn(true)):'';
  const pos=S.favpos||'';
  const all=favs().map(id=>P(id)).filter(Boolean).map(p=>({r:p,w:0,ovr:p.ovr,role:p.role})).concat(wfavs().map(p=>({r:p,w:1,ovr:p.ovr,role:p.role})));
  const cnt=r=>all.filter(x=>x.role===r).length;
  const chips=`<div class="chips49"><button class="${pos?'':'on'}" data-a="favpos" data-v="">Todos (${all.length})</button>${Object.keys(ROLEABB).map(r=>`<button class="${pos===r?'on':''}" data-a="favpos" data-v="${r}">${ROLEABB[r]} (${cnt(r)})</button>`).join('')}</div>`;
  const L=all.filter(x=>!pos||x.role===pos).sort((a,b)=>b.ovr-a.ovr);
  const row=x=>{const p=x.r;
    if(x.w)return `<button class="mrow" data-a="wprof" data-k="${esc(wkey(p))}"><span class="pos">${ROLEABB[p.role]||p.role}</span><span class="nm"><i class="fs49">★</i>${esc(p.n)}<small>${esc(p.club)} · ${NTN[p.nat]||p.nat} · ${p.age}a · pedem ${mi(p.fee)}</small></span><span class="ovr">${p.ovr}</span></button>`;
    const mine=p.club===G.user,c=p.club>=0?C(p.club):null,tag=mine?'seu elenco':p.club<0?'livre':(p.listed?c.sig+' · à venda':c.sig);
    return `<button class="mrow" data-a="prof" data-id="${p.id}"><span class="pos">${roleLabel(p)}</span><span class="nm"><i class="fs49">★</i>${esc(nameOf(p))}<small>${tag} · ${p.age}a · ${trAbb(p)} · valor ${mi(valueOf(p))}</small></span><span class="ovr">${p.ovr}</span></button>`};
  const empty=!all.length?'<p class="news">Nenhum favorito ainda. Abre o perfil de um jogador e toca na ☆ no canto de cima pra guardar aqui.</p>':!L.length?'<p class="news">Nenhum favorito nessa posição.</p>':'';
  return `<div class="wrap">${typeof winBanner==='function'?winBanner():''}${tabs}<div class="hint">Seus jogadores de olho. Abre o perfil pra tirar da lista. Filtre por posição:</div>${chips}${L.map(row).join('')}${empty}</div>`});
/* estrela no perfil de qualquer jogador */
hookAround('vPerfil','vp49',function(next,__a){
  const h=next(),p=P(S.prof);if(!p)return h;
  return h.replace('<div class="card pf">','<div class="card pf">'+starBtn49(isFav(p.id),`data-a="fav" data-id="${p.id}"`))});

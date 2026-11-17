/* ext49: favoritos no Mercado: estrela em cada jogador (lista e perfil) + aba "Favoritos" com filtro por posição */
const favs=()=>{if(!Array.isArray(G.fav))G.fav=[];return G.fav};
const isFav=id=>favs().includes(+id);
(function(){const st=document.createElement('style');st.textContent=`
.fav49{display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;margin-left:6px;font-size:20px;line-height:1;color:var(--mut);opacity:.7;border-radius:10px;flex:none}
.fav49.on{color:#ffd24a;opacity:1}
.mrow .ovr{flex:none}
.btn.fav-p{margin:6px 0 0}
.chips49{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin:4px 0 10px;padding-bottom:2px}.chips49::-webkit-scrollbar{display:none}
.chips49 button{flex:0 0 auto;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--card);color:var(--mut);font:700 12px var(--fh)}
.chips49 button.on{background:color-mix(in srgb,#ffd24a 18%,transparent);border-color:#ffd24a;color:#ffd24a}`;document.head.appendChild(st)})();
Object.assign(A,{
  fav(d){const id=+d.id,L=favs(),i=L.indexOf(id),y=window.scrollY;
    if(i>=0){L.splice(i,1);try{toast('Saiu dos favoritos')}catch(e){}}else{L.push(id);try{toast('⭐ Adicionado aos favoritos')}catch(e){}}
    try{save()}catch(e){}render();window.scrollTo(0,y)},
  favpos(d){S.favpos=d.v||'';render()}
});
/* estrela em toda linha de jogador do Mercado */
const _vm49=vMercado;vMercado=function(){
  const clean=()=>{const L=favs();for(let i=L.length-1;i>=0;i--)if(!P(L[i]))L.splice(i,1)};
  try{clean()}catch(e){}
  const add=h=>h.replace(/(<button class="mrow" data-a="prof" data-id="(\d+)">[\s\S]*?)(<\/button>)/g,(m,a,id,z)=>a+`<span class="fav49 ${isFav(id)?'on':''}" data-a="fav" data-id="${id}">${isFav(id)?'★':'☆'}</span>`+z);
  const nf=favs().length,tabBtn=on=>`<button class="${on?'on':''}" data-a="tab" data-t="fav">⭐ Favoritos (${nf})</button>`;
  if(S.tab!=='fav'){
    const h=add(_vm49.apply(this,arguments));
    return h.replace(/(data-t="livres">[^<]*<\/button>)/,'$1'+tabBtn(false))}
  /* aba Favoritos: pega o cabeçalho/abas montados pelas camadas de baixo usando a aba "ofertas" */
  const saved=S.tab;S.tab='ofertas';let h;try{h=_vm49.apply(this,arguments)}finally{S.tab=saved}
  const m=h.match(/<div class="seg sm scroll">[\s\S]*?<\/div>/);
  let tabs=m?m[0].replace(/class="on"( data-a="tab" data-t="ofertas")/,'class=""$1').replace(/(data-t="livres">[^<]*<\/button>)/,'$1'+tabBtn(true)):'';
  const pos=S.favpos||'',all=favs().map(id=>P(id)).filter(Boolean);
  const cnt=r=>all.filter(p=>p.role===r).length;
  const chips=`<div class="chips49"><button class="${pos?'':'on'}" data-a="favpos" data-v="">Todos (${all.length})</button>${Object.keys(ROLEABB).map(r=>`<button class="${pos===r?'on':''}" data-a="favpos" data-v="${r}">${ROLEABB[r]} (${cnt(r)})</button>`).join('')}</div>`;
  const L=all.filter(p=>!pos||p.role===pos).sort((a,b)=>b.ovr-a.ovr);
  const row=p=>{const mine=p.club===G.user,c=p.club>=0?C(p.club):null;
    const tag=mine?'seu elenco':p.club<0?'livre':(p.listed?c.sig+' · à venda':c.sig);
    return `<button class="mrow" data-a="prof" data-id="${p.id}"><span class="pos">${roleLabel(p)}</span><span class="nm">${esc(nameOf(p))}<small>${tag} · ${p.age}a · ${trAbb(p)} · valor ${mi(valueOf(p))}</small></span><span class="ovr">${p.ovr}</span><span class="fav49 on" data-a="fav" data-id="${p.id}">★</span></button>`};
  const empty=!all.length?'<p class="news">Nenhum favorito ainda. Toque na ☆ ao lado de um jogador do Mercado (ou no perfil dele) pra guardar aqui.</p>':!L.length?'<p class="news">Nenhum favorito nessa posição.</p>':'';
  return `<div class="wrap">${typeof winBanner==='function'?winBanner():''}${tabs}<div class="hint">Seus jogadores de olho. Toque na ⭐ pra tirar da lista. Filtre por posição:</div>${chips}${L.map(row).join('')}${empty}</div>`};
/* botão Favoritar no perfil do jogador */
const _vp49=vPerfil;vPerfil=function(){
  const h=_vp49.apply(this,arguments),p=P(S.prof);if(!p)return h;
  const f=isFav(p.id);
  return h.replace('<button class="back" data-a="back">‹ Voltar</button>',`<button class="back" data-a="back">‹ Voltar</button><button class="btn sm ${f?'':'ghost'} fav-p" data-a="fav" data-id="${p.id}">${f?'★ Nos favoritos (tirar)':'☆ Favoritar jogador'}</button>`)};

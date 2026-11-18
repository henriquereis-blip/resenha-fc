/* ===== v37: home limpa (sem resultados), elenco em faixas por posição, fundo nas cores do clube ===== */
(function(){const st=document.createElement('style');st.textContent=
'.sq tbody tr.pb-g td{background:rgba(255,255,255,.17)}.sq tbody tr.pb-d td{background:rgba(0,0,0,.42)}.sq tbody tr.pb-m td{background:rgba(255,255,255,.17)}.sq tbody tr.pb-a td{background:rgba(0,0,0,.42)}'+
':root[data-theme="light"] .sq tbody tr.pb-g td,:root[data-theme="light"] .sq tbody tr.pb-m td{background:rgba(0,0,0,.05)}:root[data-theme="light"] .sq tbody tr.pb-d td,:root[data-theme="light"] .sq tbody tr.pb-a td{background:rgba(0,0,0,.17)}'+
'.sq tbody tr.sel td{background:rgba(47,211,111,.30)!important}.sq tbody tr.hurt td{box-shadow:inset 3px 0 0 var(--bad)}'+
'.res40 .res{padding:6px 0}';
document.head.appendChild(st)})();
function pbCls40(r){return r==='GOL'?'pb-g':(r==='ZAG'||r==='LAT')?'pb-d':r==='ATA'?'pb-a':'pb-m'}
function hexRgb40(h){h=(h||'#222').replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h,16);return[(n>>16)&255,(n>>8)&255,n&255]}
function sat40(h){const[r,g,b]=hexRgb40(h),mx=Math.max(r,g,b),mn=Math.min(r,g,b);return(mx-mn)+(mx<200?30:0)-(mn>215?60:0)}
function clubBg40(c){
  let a=c.c1||c.color,b=c.c2||c.color;if(sat40(b)>sat40(a)){const t=a;a=b;b=t}
  const base='#070b09';
  return 'linear-gradient(180deg,color-mix(in srgb,'+a+' 46%,'+base+') 0%,color-mix(in srgb,'+a+' 22%,'+base+') 38%,color-mix(in srgb,'+b+' 16%,'+base+') 100%)';
}
hookAround('vInicio','vi40',function(next,__a){
  let h=next();
  try{
    /* tira o bloco "Última rodada" da home */
    const i=h.indexOf('<div class="card"><div class="k">Última rodada (');
    if(i>=0){const j=h.indexOf('<div class="seg sm">',i);if(j>i)h=h.slice(0,i)+h.slice(j)}
    /* sobe o elenco: o jornal vai pra baixo da tabela */
    const k='<button class="card paperc"';const pi=h.indexOf(k);
    if(pi>=0){const pe=h.indexOf('</button>',pi)+9;const paper=h.slice(pi,pe);h=h.slice(0,pi)+h.slice(pe);
      const te=h.lastIndexOf('</table></div>');if(te>=0)h=h.slice(0,te+14)+paper+h.slice(te+14)}
    /* faixas por posição */
    h=h.replace(/<tr class="([^"]*)" data-a="hrow" data-id="(\d+)"/g,(m,cl,id)=>{const p=P(+id);return '<tr class="'+cl+' '+pbCls40(p?p.role:'MEI')+'" data-a="hrow" data-id="'+id+'"'});
  }catch(e){}
  return h;
});
/* última rodada continua acessível em Tabelas */
hookAround('vLiga','vl40',function(next,__a){
  let h=next();
  try{const c=userClub();if(G.lastRound&&G.lastRound.results){
    const card=`<div class="card res40"><div class="k">Resultados da última rodada (${G.lastRound.n}) · sua forma ${formOf(c.id).map(r=>`<i class="fm ${r}">${r}</i>`).join('')}</div>${G.lastRound.results.map(r=>`<div class="res ${r.u?'me':''}"><span>${C(r.h).sig}</span><b>${r.hg} – ${r.ag}</b><span class="rt">${C(r.a).sig}</span></div>`).join('')}</div>`;
    const k='<div class="tbl';const i=h.indexOf(k);h=i>=0?h.slice(0,i)+card+h.slice(i):h+card}}catch(e){}
  return h;
});
/* fundo da tela inicial nas cores do clube */
hookAround('render','r40',function(next,__a){
  const r=next();
  try{const home=G&&G.phase!=='start'&&!S.match&&!S.modal&&S.prof===null&&!S.paper&&(G.view==='inicio'||G.view==='elenco');
    const b=document.body;
    if(home){const c=userClub();b.style.background=clubBg40(c)+' fixed,var(--bg)';b.style.backgroundAttachment='fixed'}
    else{b.style.background='';b.style.backgroundAttachment=''}}catch(e){}
  return r;
});

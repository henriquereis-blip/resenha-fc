/* ext26: otimização para celular — telas rolam normal, Voltar em tudo, alvos de toque maiores */
(function(){const st=document.createElement('style');st.textContent=`
html{-webkit-text-size-adjust:100%}
button,.btn,select,[data-a]{touch-action:manipulation}
.fsel,select,input,textarea{font-size:16px}
.btn{min-height:44px}.btn.sm{min-height:38px;padding-inline:12px}
.nav2 button{min-height:48px}
.top2 .ic button{min-height:52px}
body:has(.nofit){padding-bottom:96px!important}
.fit.nofit{height:auto!important;overflow:visible!important;display:flex;flex-direction:column;gap:8px}
.nofit .tact{display:block!important;flex:none!important}
.nofit .tp{display:block!important;position:relative}
.nofit .tp .pitch,.nofit .pitch{height:auto!important;width:100%!important;max-width:560px!important;aspect-ratio:3/4!important;margin:0 auto}
.nofit .side{margin-top:10px;overflow:visible!important}
.nofit .side .bench,.nofit .side .reserves{display:grid!important;grid-template-columns:1fr 1fr;gap:6px}
.nofit .side .bn{padding:7px 8px;min-height:46px}
.nofit .side .bn .bt i{font-size:13px}.nofit .side .bn small{font-size:11px}
.nofit .tok{width:56px}.nofit .tok .tn i{font-size:10.5px;max-width:58px}.nofit .tok .tn small{font-size:8.5px}
.nofit .fs svg{width:26px;height:26px}.nofit .fs .rt{font-size:13.5px}
.nofit .abar.abs{position:sticky;bottom:90px;left:0;right:0;margin-top:6px}
.nofit .acts{position:sticky;bottom:84px;z-index:5;background:linear-gradient(180deg,transparent,var(--bg) 35%);padding:10px 0 6px;display:flex;gap:6px;flex-wrap:wrap}
.nofit .acts .btn{flex:1 1 auto}
.mt.nofit{padding-bottom:20px}
.nofit .ticker{flex:none!important;height:auto!important;min-height:140px;max-height:300px;overflow-y:auto!important}
.mt.nofit .ctrl2{position:sticky;bottom:0;z-index:6;background:linear-gradient(180deg,transparent,#07110b 30%);padding:12px 0 calc(8px + env(safe-area-inset-bottom,0px))}
.backbar{position:sticky;top:var(--hh,58px);z-index:6;display:flex;align-items:center;gap:6px;width:calc(100% + 24px);margin:0 -12px 8px;padding:8px 14px;background:rgba(6,10,20,.92);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-bottom:1px solid #ffffff14;color:var(--accent2);font:800 14px var(--fh);letter-spacing:.06em;text-transform:uppercase;text-align:left;min-height:44px}
.backbar b{font-size:20px;line-height:1}
.backbar small{margin-left:auto;color:var(--mut);font:600 12px var(--fb);text-transform:none;letter-spacing:0}
.top2 .ic button small{font-size:11px}
.tr,.gt{min-height:40px}
.sheet.card .res{flex-wrap:wrap;gap:6px}
`;document.head.appendChild(st)})();

function fitAll(){
  try{
    const els=document.querySelectorAll('.fit');if(!els.length)return;
    const narrow=window.innerWidth<760||window.innerHeight<720;
    if(narrow){els.forEach(el=>{el.classList.add('nofit');el.style.height=''});return}
    els.forEach(el=>el.classList.remove('nofit'));
    window.scrollTo(0,0);
    const nav=document.querySelector('.nav2');const nb=nav?nav.getBoundingClientRect().height+10:10;
    els.forEach(el=>{const r=el.getBoundingClientRect();const h=window.innerHeight-r.top-nb;el.style.height=Math.max(320,h)+'px'});
  }catch(e){}
}

/* ---- Voltar em todo lugar ---- */
const MAINV=['inicio','tatica','clube','elenco'];
const VNAME={agenda:'Agenda',liga:'Tabelas',meutec:'Técnico',dir:'Diretoria',medico:'Médico',treino:'Treino',vest:'Vestiário',assist:'Auxiliar',staff:'Comissão',comp:'Copas',marketing:'Marketing',torcida:'Torcida',estadio:'Estádio',base:'Base',juniores:'Juniores',tecnicos:'Técnicos',historia:'História',mercado:'Mercado',times:'Times',opcoes:'Opções'};
const _rd26=render;render=function(){
  try{if(G&&G.phase!=='start'&&!S.match){
    S.vstack=S.vstack||[];
    if(S._lv!==undefined&&G.view!==S._lv){if(!S._pop&&S._lv&&S.vstack[S.vstack.length-1]!==S._lv)S.vstack.push(S._lv);if(S.vstack.length>14)S.vstack.shift()}
    S._lv=G.view;S._pop=false}}catch(e){}
  _rd26();
  try{backBar()}catch(e){console.error('backBar '+e.message)}
};
function backBar(){
  if(!G||G.phase==='start'||S.match)return;
  const main=document.querySelector('.main');if(!main||main.querySelector('.backbar,.back'))return;
  const hdr=document.querySelector('.top2');if(hdr)document.documentElement.style.setProperty('--hh',Math.round(hdr.getBoundingClientRect().height)+'px');
  let lbl=null;
  if(S.modal){const t=S.modal.t;if(['round','fired','season'].includes(t))return;lbl='Voltar'}
  else if(S.prof!==null||S.paper)lbl='Voltar';
  else if(!MAINV.includes(G.view))lbl='Voltar';
  if(!lbl)return;
  const prev=!S.modal&&S.prof===null&&!S.paper?(S.vstack&&S.vstack.length?S.vstack[S.vstack.length-1]:'inicio'):null;
  const sub=prev?(prev==='inicio'?'Início':VNAME[prev]||prev==='tatica'&&'Tática'||prev==='clube'&&'Finanças'||''):'';
  main.insertAdjacentHTML('afterbegin',`<button class="backbar" data-a="back"><b>‹</b> Voltar${sub?`<small>${sub}</small>`:''}</button>`);
}
Object.assign(A,{
  back(){
    if(S.modal){S.modal=null}
    else if(S.prof!==null){S.prof=null}
    else if(S.paper){S.paper=false}
    else{const v=(S.vstack&&S.vstack.pop())||'inicio';G.view=v;S._pop=true}
    render();window.scrollTo(0,0)
  }
});
(function(){const st=document.createElement('style');st.textContent=`
.sp24 .res{display:flex;justify-content:space-between;gap:8px;align-items:baseline;padding:3px 0}
.sp24 .res b{display:inline!important;white-space:nowrap;font-size:15px!important;text-align:right}
.sp24>b:first-child{display:block;font-size:18px}
.sp24 small{display:block;color:var(--mut);font-size:12.5px;line-height:1.35;margin:2px 0 4px}
.sp24 .res.ev{border-top:1px dashed var(--line);margin-top:4px;padding-top:6px}
.x9 .off>b{white-space:nowrap;text-align:right;font-size:16px!important;flex:0 0 auto}
.x9 .off>b small{display:block;font-size:10px;font-weight:600;color:var(--mut)}
.x9 .off>span{min-width:0}
`;document.head.appendChild(st)})();

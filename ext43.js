/* ===== v41: TODO "voltar/fechar" devolve a tela na mesma altura em que estava (qualquer página) ===== */
var _pos43={},_ps43=null,_bk43=false,_bkT43=0;
function _sy43(){return window.scrollY||document.documentElement.scrollTop||document.body.scrollTop||0}
function _sig43(){
  if(!G||G.phase==='start')return 'start';
  const m=S.modal;
  return [G.view,S.tab,S.ctab,S.lig,G.view==='times'?S.team:'',G.view==='times'?S.tt:'',S.wc,S.hs,S.rk,S.rs,S.cdiv,S.pg,S.sort,S.prof,S.paper?1:0,m?(m.t||'m')+(m.pid||''):''].join('|');
}
function _rs43(y){
  const go=()=>{try{window.scrollTo(0,y)}catch(e){}};
  go();requestAnimationFrame(()=>{go();requestAnimationFrame(go)});setTimeout(go,60);setTimeout(go,180);
}
function _isBack43(b){
  try{
    const a=b.dataset.a||'';
    if(/^(back|stay|negclose|spnback|mkback|close|desist|achok)$/.test(a)||/back$/i.test(a))return true;
    if(a==='tree'&&b.dataset.k==='close')return true;
    if(b.classList.contains('back')||b.classList.contains('backbar')||b.classList.contains('bk32'))return true;
    if(/^\s*[‹←]/.test(b.textContent||''))return true;
  }catch(e){}
  return false;
}
document.addEventListener('click',e=>{
  const b=e.target&&e.target.closest?e.target.closest('[data-a]'):null;if(!b)return;
  if(_isBack43(b)){_bk43=true;clearTimeout(_bkT43);_bkT43=setTimeout(()=>{_bk43=false},500)}
},true);
const _r43=render;render=function(){
  let y=0;try{y=_sy43()}catch(e){}
  try{if(_ps43!=null)_pos43[_ps43]=y}catch(e){}
  const r=_r43.apply(this,arguments);
  try{
    const s=_sig43();
    if(_bk43){const t=_pos43[s];if(t>0)_rs43(t)}
    _ps43=s;
    const ks=Object.keys(_pos43);if(ks.length>60)delete _pos43[ks[0]];
  }catch(e){}
  return r;
};

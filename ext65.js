/* ext65 — v84: toque no celular durante a partida + desfazer substituição */
/* 1) Durante o jogo a tela re-renderiza a cada tick e destrói o botão antes do "click".
      Sintetizamos o toque no pointerup se o elemento sumiu do DOM. */
(function(){
  let rec=null;
  document.addEventListener('pointerdown',e=>{
    if(!S.match){rec=null;return}
    const t=e.target.closest&&e.target.closest('[data-a]');
    if(!t){rec=null;return}
    rec={a:t.dataset.a,ds:Object.assign({},t.dataset),x:e.clientX,y:e.clientY,t:Date.now(),el:t};
  },true);
  document.addEventListener('pointerup',e=>{
    const r=rec;rec=null;
    if(!r||!S.match)return;
    if(r.el.isConnected)return; // click nativo vai funcionar
    if(Math.hypot(e.clientX-r.x,e.clientY-r.y)>12||Date.now()-r.t>700)return;
    if(typeof A[r.a]!=='function')return;
    S._synth=Date.now();
    A[r.a](r.ds);
  },true);
  document.addEventListener('click',e=>{
    if(Date.now()-(S._synth||0)<800){e.stopPropagation();e.preventDefault()}
  },true);
})();

/* 2) Desfazer substituição (só na mesma pausa) */
const _sub65=subPlayer;
subPlayer=function(m,k,outId,inId){
  const s=m[k],j=s.bench.indexOf(inId),i=s.lineup.indexOf(outId);
  const ev0=m.ev.length;
  const r=_sub65(m,k,outId,inId);
  if(r&&R&&m===R.ms[R.ui]&&k===userSide(m)&&S.paused){
    (s.pend=s.pend||[]).push({out:outId,in:inId,j,i,ev:ev0,min:m.min});
  }
  return r;
};
const _mgo65=A.mgo;
A.mgo=function(){
  try{if(R&&R.ms)for(const m of R.ms)for(const k of['h','a'])if(m[k])m[k].pend=[]}catch(e){}
  return _mgo65.apply(this,arguments);
};
A.subundo=function(d){
  const m=R.ms[R.ui],k=userSide(m),s=m[k],oid=+d.id;
  const e=(s.pend||[]).find(x=>x.out===oid);
  if(!e||!S.paused){toast('Só dá pra desfazer na mesma parada.');return}
  const i=s.lineup.indexOf(e.in);if(i<0)return;
  s.lineup[i]=e.out;
  s.bench.splice(Math.min(e.j,s.bench.length),0,e.in);
  const ui=s.used.lastIndexOf(e.in);if(ui>=0)s.used.splice(ui,1);
  const oi=s.outs.lastIndexOf(e.out);if(oi>=0)s.outs.splice(oi,1);
  s.subs=Math.max(0,s.subs-1);
  for(let q=m.ev.length-1;q>=0;q--){const ev=m.ev[q];if(ev.type==='sub'&&ev.pid===e.in){m.ev.splice(q,1);break}}
  if(m.tac&&m.tac.length&&m.tac[m.tac.length-1].min===m.min)m.tac.pop();
  s.pend=s.pend.filter(x=>x!==e);S.psel=null;
  toast('Substituição desfeita ↩');render();
};
A.subnope=function(){toast('Esse já tá de agasalho — não volta mais.')};

/* bancada mostra quem saiu: escuro+↩ se dá pra desfazer, agasalho se não */
const _pitch65=pitchHTML;
pitchHTML=function(cfg){
  let h=_pitch65(cfg);
  try{
    if(!(S.match&&R&&R.ms&&cfg.mode==='match'))return h;
    const m=R.ms[R.ui],k=userSide(m),s=m[k];
    if(!s||!s.outs||!s.outs.length)return h;
    const pend=(s.pend||[]).map(x=>x.out);
    const tiles=s.outs.map(id=>{
      const p=P(id),can=S.paused&&pend.includes(id),sent=s.sent.includes(id);
      if(sent)return '';
      return `<button class="bn outp ${can?'undo':'done'}" data-a="${can?'subundo':'subnope'}" data-id="${id}"><span class="shirt sm" style="background:none;border:0;box-shadow:none;width:26px;height:26px">${shirtSvg(cfg.club,'res')}</span><span class="bt"><i>${esc(lastName(p.name))}</i><small>${can?'↩ desfazer':'🧥 saiu'}</small></span></button>`}).join('');
    if(!tiles)return h;
    h=h.replace(/(<div class="bench">[\s\S]*?)(<\/div>)/,(a,b,c)=>b+tiles+c);
  }catch(e){}
  return h;
};

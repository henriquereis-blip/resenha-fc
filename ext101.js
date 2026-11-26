/* ext101 (v140): seletor de liga na tela inicial. "Liga e clube" agora tem um seletor de país: Brasil (as 4 séries, como antes)
   ou qualquer liga do mundo (ext37 WLD). Em liga estrangeira a carreira começa direto no clube escolhido: o jogo inicia num clube
   brasileiro de força parecida (só para o setup) e logo muda para o clube de lá pelo mesmo caminho de "aceitar emprego no exterior". */
(function(){
const lgOpts=()=>`<label class="fld">País / liga<select id="lgsel">
  <option value="BRA" ${(S.cl||'BRA')==='BRA'?'selected':''}>🇧🇷 Brasil (Séries A a D)</option>
  ${WLD.map(w=>`<option value="${w.k}" ${S.cl===w.k?'selected':''}>${w.f} ${esc(w.n)} · ${esc(w.lg)}</option>`).join('')}</select></label>`;
function foreignList(){
  const W=wd(),L=W.lg[S.cl];if(!L)return '<p class="hint">Liga indisponível.</p>';
  const cl=L.cl.slice().sort((a,b)=>b.r-a.r);
  return `<div class="clubs">${cl.map(c=>`<button class="club ${S.fc&&S.fc.id===c.id?'sel':''}" data-a="pickfclub" data-id="${c.id}"><span class="cn">${esc(c.n)}<small>${esc(wlOf(S.cl).lg)}</small></span><span class="rep">${Math.round(c.r)}</span></button>`).join('')}</div>`;
}
hookAround('vClubStep','vcs101',function(next,__a){
  const cl=S.cl||'BRA';
  if(cl==='BRA'){S.fc=null;const h=next();return h.replace('<h2>Liga e clube</h2>','<h2>Liga e clube</h2>'+lgOpts())}
  return `<div class="wrap">${stepper('club')}<button class="back" data-a="step" data-v="coach">‹ Treinador</button><h2>Liga e clube</h2>${lgOpts()}
  <p class="hint">Você começa direto num clube de ${esc(wlOf(cl).n)}. A força é a nota do clube (58 a 93). Elenco e finanças aparecem depois que você assume.</p>${foreignList()}</div>`;
});
/* prévia simplificada do clube estrangeiro (ainda não existe elenco completo) */
hookAround('vPreview','vpv101',function(next,__a){
  if(!S.fc)return next();
  const f=S.fc;
  return `<div class="wrap pv20">${stepper('preview')}<button class="back" data-a="step" data-v="club">‹ Clubes</button>
  <div class="hd"><div><h2>${esc(f.n)}</h2><small>${esc(wlOf(f.k).n)} · ${esc(wlOf(f.k).lg)} · força ${Math.round(f.r)}</small></div></div>
  <div class="card"><div class="res"><span>País</span><b>${wlOf(f.k).f} ${esc(wlOf(f.k).n)}</b></div><div class="res"><span>Liga</span><b>${esc(wlOf(f.k).lg)}</b></div><div class="res"><span>Força do clube</span><b>${Math.round(f.r)}</b></div>
  <p class="news">Elenco, finanças e a cobrança da diretoria aparecem quando você assume. Clubes mais fortes cobram título; os mais fracos cobram fugir do rebaixamento.</p></div>
  <button class="btn big" data-a="step" data-v="setup">Escolher o ${esc(f.n)} ›</button></div>`;
});
hookAround('vSetup','vsu101',function(next,__a){
  const h=next();if(!S.fc)return h;
  const ph=C(S.sc).name;return h.split(ph).join(S.fc.n);
});
/* clube-base do setup: brasileiro da 1ª divisão com a força mais próxima do clube escolhido (objetivos e orçamento coerentes) */
function placeholder(r){
  return G.clubs.filter(c=>c.div===0).sort((a,b)=>Math.abs(a.rep-r)-Math.abs(b.rep-r))[0];
}
Object.assign(A,{
  pickfclub(d){
    const W=wd(),L=W.lg[S.cl],x=L&&L.cl.find(c=>c.id===+d.id);if(!x)return;
    S.fc={k:S.cl,id:x.id,n:x.n,r:x.r};S.sc=placeholder(x.r).id;S.cpv='res';S.sp=null;S.sa=null;S.obj=null;S.step='preview';render();window.scrollTo(0,0)}
});
document.addEventListener('change',e=>{const t=e.target;if(t&&t.id==='lgsel'&&G&&G.phase==='start'){S.cl=t.value;S.fc=null;S.sc=null;render()}});
/* começar: se escolheu clube estrangeiro, muda para ele logo depois de criar a carreira */
hookAfter('startCareer','sc101',function(){
  try{
    const f=S.fc;if(!f)return;S.fc=null;
    const sp=S.sp,ob=S.obj;
    if(typeof emigrate!=='function'||!emigrate(f.id))return;
    const c=userClub();if(c&&sp)c.phil=sp;
    try{if(ob)applyObj(ob)}catch(e){}
    addNews('Você começa a carreira no '+c.name+' ('+wlOf(f.k).n+').');
  }catch(e){console.error('sc101 '+e.message)}
});
})();

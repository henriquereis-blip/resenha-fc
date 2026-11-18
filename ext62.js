/* ext62: Multiplayer local ("passa o aparelho"): vários técnicos/primos no mesmo celular.
   Cada primo tem a própria carreira (um save próprio) e o jogo guarda o ranking entre eles (mesma pontuação da Liga dos Primos).
   Trocar de primo guarda o jogo atual e abre o do outro. Mesma liga compartilhada continua sendo a etapa 3 (reescrita do motor). */
const MPL_KEY='rfc_mpl',mplSlot=i=>SAVE_KEY+'_mpl'+i;
function mplGet(){try{return JSON.parse(SKV.getItem(MPL_KEY)||'[]')}catch(e){return[]}}
function mplSet(a){try{SKV.setItem(MPL_KEY,JSON.stringify(a));if(SKV.flush)SKV.flush()}catch(e){}}
function mplStash(){ /* guarda o jogo carregado no slot do primo dele e atualiza o placar */
  if(!G||G.mplId==null||G.phase==='start'||G.user==null)return;
  try{save();const raw=SKV.getItem(SAVE_KEY);if(!raw)return;SKV.setItem(mplSlot(G.mplId),raw);
    const a=mplGet(),e=a.find(x=>x.id===G.mplId);if(!e)return;
    Object.assign(e,mpScoreOf());mplSet(a);if(SKV.flush)SKV.flush()}catch(err){console.error('mplStash '+err.message)}
}
function mplLegacy(){ /* jogo avulso que já existia vira um "primo" pra não ser perdido */
  try{const raw=SKV.getItem(SAVE_KEY);if(!raw)return;if(/"mplId":\d+/.test(raw))return;
    const a=mplGet();if(a.some(x=>x.legacy))return;
    const id=1+Math.max(0,...a.map(x=>x.id));SKV.setItem(mplSlot(id),raw);
    let sc={};try{const g=JSON.parse(raw);const u=g.uc||{};const c=g.clubs&&g.clubs.find(x=>x.id===g.user);sc={club:c?c.name:'',season:g.season,round:g.round,pts:u.pts||0,titles:u.titles||0,v:u.V||0,e:u.E||0,d:u.D||0}}catch(e){}
    a.push(Object.assign({id,nick:'Jogo anterior',legacy:1},sc));mplSet(a)}catch(e){}
}
function vMpLocal(){
  const a=mplGet().slice().sort((x,y)=>(y.pts||0)-(x.pts||0));
  const rows=a.map((p,i)=>`<div class="res"><span>${i+1}º · ${esc(p.nick)}${G&&G.mplId===p.id&&G.phase!=='start'?' <small class="k">(jogando)</small>':''}<br><small>${esc(p.club||'sem clube')} · T${p.season||1}, rodada ${p.round||0} · ${p.titles||0} 🏆 · ${p.v||0}V ${p.e||0}E ${p.d||0}D</small></span><b>${p.pts||0} pts</b></div>
    <div style="display:flex;gap:6px;margin:0 0 8px"><button class="btn sm" data-a="mplplay" data-v="${p.id}">Jogar como ${esc(p.nick)}</button><button class="btn sm ghost" data-a="mpldel" data-v="${p.id}">Apagar</button></div>`).join('');
  return `<div class="wrap"><button class="back" data-a="step" data-v="home">‹ Início</button><h2>Multiplayer local</h2>
  <div class="card"><div class="k">👥 Passa o aparelho</div><p class="news">Cada primo cria a própria carreira (clube, liga e país à escolha) e vocês revezam no mesmo celular. O ranking compara os pontos de técnico de cada um: 60 por título, 15 por top 4 e o que mais ganhar jogando.</p>
  ${a.length>=5?'<p class="hint">Limite de 5 técnicos. Apague um pra criar outro.</p>':`<input id="mpl_nick" class="fsel" maxlength="24" placeholder="Nome do primo" style="margin-bottom:8px"><button class="btn" data-a="mplnew">Criar carreira de um primo</button>`}</div>
  ${a.length?`<div class="card"><div class="k">🏁 Ranking entre vocês</div>${rows}</div>`:''}
  <p class="hint">Cada um joga no seu ritmo (a liga de cada um é separada). Mesma liga ao mesmo tempo ainda não existe.</p></div>`;
}
Object.assign(A,{
  mplnew(){
    const v=((document.getElementById('mpl_nick')||{}).value||'').trim();if(v.length<2){toast('Escreve o nome do primo (2 a 24 letras).');return}
    mplStash();mplLegacy();
    const a=mplGet();const id=1+Math.max(0,...a.map(x=>x.id));
    S.mplNew={id,nick:v};S.coachName=v;A.newgame()
  },
  mplplay(el){
    const id=+(el&&el.v!==undefined?el.v:el);
    mplStash();const raw=SKV.getItem(mplSlot(id));if(!raw){toast('Save desse primo não encontrado.');return}
    SKV.setItem(SAVE_KEY,raw);loadSave();G.phase=G.phase||'play';S.modal=null;S.prof=null;S.match=null;G.view='inicio';render();window.scrollTo(0,0)
  },
  mpldel(el){
    const id=+(el&&el.v!==undefined?el.v:el);
    if(S.mplDel!==id){S.mplDel=id;toast('Toca de novo em Apagar pra confirmar.');return}
    S.mplDel=null;mplSet(mplGet().filter(x=>x.id!==id));try{SKV.removeItem(mplSlot(id))}catch(e){}
    if(G&&G.mplId===id){G.mplId=null}
    render()
  },
  mplsw(){mplStash();try{SKV.removeItem(SAVE_KEY)}catch(e){}G.phase='start';S.step='mpl';S.modal=null;S.match=null;render();window.scrollTo(0,0)}
});
const _bg62=A.begin;A.begin=function(){
  const n=S.mplNew;S.mplNew=null;
  const r=_bg62.apply(this,arguments);
  try{if(n&&G.user!=null&&G.phase==='play'){G.mplId=n.id;G.mplNick=n.nick;
    const a=mplGet();a.push(Object.assign({id:n.id,nick:n.nick},mpScoreOf()));mplSet(a);mplStash();render()}}catch(e){console.error('mpl begin '+e.message)}
  return r};
hookAfter('finishRound','ext62_fr62',()=>{if(G.mplId!=null)mplStash()});
/* botão flutuante pra trocar de primo */
hookAround('render','rd62',function(next,__a){next();
  try{let b=document.getElementById('mplsw62');
    const on=G&&G.mplId!=null&&G.phase!=='start'&&!S.match;
    if(!on){if(b)b.remove();return}
    if(!b){b=document.createElement('button');b.id='mplsw62';b.setAttribute('data-a','mplsw');
      b.style.cssText='position:fixed;left:8px;bottom:calc(8px + env(safe-area-inset-bottom,0px));z-index:50;padding:6px 10px;border-radius:16px;border:1px solid var(--bd,#8884);background:var(--card,#222);color:var(--fg,#fff);font-size:12px;opacity:.92';
      document.body.appendChild(b)}
    b.textContent='👥 '+(G.mplNick||'primo')+' · trocar'}catch(e){}
});

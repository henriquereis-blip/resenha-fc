/* ext63: Multiplayer local na MESMA LIGA (vários técnicos humanos no mesmo campeonato, passando o aparelho).
   Ideia: o mundo (clubes, jogadores, tabela, calendário, mercado) é um só; cada técnico tem o seu "contexto" (caixa, diretoria, caixa de e-mail,
   patrocínio, estádio, etc. = todas as chaves de G que não são do mundo). Ao trocar de técnico, o contexto é trocado.
   A rodada é simulada ao vivo uma vez (todos os jogos, com pausas em que cada humano mexe no seu time); depois o pós-jogo (finanças, diretoria, treino...)
   roda uma vez por técnico a partir do mesmo estado, e juntamos: mundo = passada do técnico 1; clube, jogadores e contexto de cada outro = passada dele.
   Regras: Brasil, todos na mesma divisão; ninguém é demitido; copas/continentais de cada um são resolvidas individualmente antes da rodada. */
const SH63=new Set(['v','phase','season','round','nextId','players','clubs','news','paper','free','dfx','coaches','toty','champs','tdrs','_t','mps']);
let MPB=false,MPP=false,MPH=null,MPT=null,MPLAST=-1;
const mpsOn=()=>!!(G&&G.mps&&G.mps.hs&&G.mps.hs.length>1&&G.phase!=='start');
const ckeys63=()=>Object.keys(G).filter(k=>!SH63.has(k));
const cl63=o=>JSON.parse(JSON.stringify(o));
function unx63(){if(G._lg){G.fixtures[G.round]=G._lg;G._lg=null;G._x=null}}
function cOut63(){unx63();const o={};for(const k of ckeys63()){o[k]=G[k];delete G[k]}return o}
function cIn63(o){for(const k in o)G[k]=o[k]}
function swapTo63(k){const m=G.mps;if(m.cur===k)return;if(m.cur>=0)m.hs[m.cur].ctx=cOut63();cIn63(m.hs[k].ctx);m.hs[k].ctx=null;m.cur=k}
function aip63(o,s){for(const k in o)if(!(k in s))delete o[k];Object.assign(o,s)}
function restore63(src){
  for(const k of Object.keys(G))if(!(k in src))delete G[k];
  for(const k in src){
    if(k==='clubs'){src.clubs.forEach((c,i)=>{if(G.clubs[i])aip63(G.clubs[i],c);else G.clubs[i]=c});G.clubs.length=src.clubs.length}
    else if(k==='players'){for(const id in G.players)if(!(id in src.players))delete G.players[id];for(const id in src.players){if(G.players[id])aip63(G.players[id],src.players[id]);else G.players[id]=src.players[id]}}
    else G[k]=src[k]
  }
}
/* roda fn() uma vez por técnico, sempre a partir do mesmo estado, e junta os resultados */
function passAll63(fn,isRound){
  swapTo63(0);const n=G.mps.hs.length,hk=G.mps.hs.map(h=>h.club);
  const pre=hk.map(c=>Object.values(G.players).filter(p=>p.club===c).map(p=>p.id));
  const S0=JSON.stringify(G),Rs=R,parts=[];let nid=G.nextId,out;
  const svv=save;save=function(){};MPB=true;
  try{
    for(let k=n-1;k>=0;k--){
      if(k<n-1)restore63(JSON.parse(S0));
      G.nextId=nid;swapTo63(k);
      if(isRound){R=Rs;const ix=Rs.ms.findIndex(x=>x.h.club.id===hk[k]||x.a.club.id===hk[k]);Rs.ui=ix;Rs.focus=ix}
      const o=fn();nid=G.nextId;
      if(k===0)out=o;
      else{
        const ids=new Set(pre[k]);for(const p of Object.values(G.players))if(p.club===hk[k])ids.add(p.id);
        const pl={};ids.forEach(id=>{pl[id]=G.players[id]?cl63(G.players[id]):null});
        parts[k]={club:cl63(G.clubs[hk[k]]),pl,ctx:cl63(cOut63())};
      }
    }
  }finally{save=svv;MPB=false}
  for(let k=1;k<n;k++){const pt=parts[k];aip63(G.clubs[hk[k]],pt.club);
    for(const id in pt.pl){const v=pt.pl[id];
      if(v===null)delete G.players[id];
      else{if(G.players[id])aip63(G.players[id],v);else G.players[id]=v;if(v.club<0&&!G.free.includes(+id))G.free.push(+id)}}
    G.mps.hs[k].ctx=pt.ctx}
  reconcile63();
  G.mps.cur=0;
  try{save()}catch(e){}
  return out;
}
/* depois de juntar: cada jogador pertence ao clube indicado nele; squads sem duplicados nem fantasmas; mercado sem ids inexistentes */
function reconcile63(){
  const has=G.clubs.map(()=>new Set());
  for(const c of G.clubs){const seen=new Set();c.squad=c.squad.filter(id=>{const p=G.players[id];if(!p||p.club!==c.id||seen.has(id))return false;seen.add(id);return true});c.squad.forEach(id=>has[c.id].add(id))}
  for(const p of Object.values(G.players)){if(p.club>=0&&G.clubs[p.club]&&!has[p.club].has(p.id)){G.clubs[p.club].squad.push(p.id);has[p.club].add(p.id)}}
  G.free=G.free.filter(id=>G.players[id]&&G.players[id].club<0);
}
const _fr63=finishRound;finishRound=function(){const a=arguments;if(!MPB&&mpsOn()&&R&&R.mpg)return passAll63(()=>_fr63.apply(null,a),true);return _fr63.apply(this,a)};
const _es63=endSeason;endSeason=function(){const a=arguments;if(!MPB&&mpsOn())return passAll63(()=>{const r=_es63.apply(null,a);if(G.summary){G.summary.fired=false;G.summary.jobs=[]}return r},false);return _es63.apply(this,a)};
function syncFx63(){const m=G.mps;m.hs.forEach((h,k)=>{const f=cl63(G.dfx[G.clubs[h.club].div]||[]);if(m.cur===k)G.fixtures=f;else if(h.ctx)h.ctx.fixtures=f})}
const _ns63=newSeason;newSeason=function(){const a=arguments;if(!MPB&&mpsOn()){const r=passAll63(()=>_ns63.apply(null,a),false);syncFx63();return r}return _ns63.apply(this,a)};
hookAround('shouldFire','sf63',function(next,__a){if(mpsOn())return false;return next()});
/* escalação dos outros humanos não pode ser sobrescrita pela IA ao preparar a rodada */
hookAround('autoPick','ap63',function(next,__a){let [c]=__a;if(MPP&&G.mps&&G.mps.hs.some(h=>h.club===c.id&&h.club!==G.user))return;return next()});
hookAround('prepareRound','pr63',function(next,__a){const was=MPP;MPP=true;
  try{next();if(G.mps)G.mps.hs.forEach(h=>{if(h.club!==G.user&&G.clubs[h.club]){try{fixLineup(G.clubs[h.club])}catch(e){}}})}finally{MPP=was}});
/* ---- rodada de grupo ---- */
function gBuild63(){
  const m=G.mps;swapTo63(0);
  R=startRound();R.mpg=true;R.xtra=false;
  R.divs=new Set([G.clubs[m.hs[0].club].div]);
  for(const h of m.hs){const d=G.clubs[h.club].div;if(!R.divs.has(d)){R.divs.add(d);for(const [a,b] of (G.dfx[d][G.round]||[]))R.ms.push(newMatch(C(a),C(b)))}}
  R.uis=m.hs.map(h=>R.ms.findIndex(x=>x.h.club.id===h.club||x.a.club.id===h.club));
  R.uis.forEach(i=>{R.ms[i].u=true});R.ui=R.uis[0];R.focus=R.ui;m.ready=[];MPT=null;MPLAST=-1;
  return R;
}
function gStart63(){gBuild63();S.seen={};S.flash=null;S.paused=false;S.panel=false;S.psel=null;S.match=true;render();tick()}
function hand63(k,msg,cb){MPH={k,msg,cb};render()}
function readyNext63(){
  const m=G.mps,n=m.hs.length;m.ready[m.cur]=true;
  const nx=[...Array(n).keys()].map(i=>(m.cur+1+i)%n).find(k=>!m.ready[k]);
  if(nx===undefined){gStart63();return}
  hand63(nx,m.hs[m.cur].nick+' está pronto ✔. Agora é a sua vez de preparar o time.',()=>{G.view='inicio'});
}
const _play63=A.play;
A.play=function(){
  if(!mpsOn())return _play63.apply(this,arguments);
  if(!G.sponsor){S.modal={t:'sponsor'};render();return}
  const was=MPP;MPP=true;let r;try{r=startRound()}finally{MPP=was}
  if(r.xtra)return _play63.apply(this,arguments);
  R=null;readyNext63();
};
function turnHand63(){
  const m=G.mps,k=MPT.i,mn=R.ms[R.uis[0]].min;
  hand63(k,'Ajuste tática e substituições do jogo (minuto '+mn+').',()=>{const ix=R.uis[k];R.ui=ix;R.focus=ix;S.paused=true;S.panel=true;S.psel=null});
}
function startTurns63(){MPT={i:0};turnHand63()}
function nextTurn63(){
  MPT.i++;
  if(MPT.i<G.mps.hs.length){turnHand63();return}
  MPT=null;swapTo63(0);R.ui=R.uis[0];R.focus=R.ui;S.paused=false;S.panel=false;S.psel=null;render();window.scrollTo(0,0);
}
const _mgo63=A.mgo,_mtg63=A.mtoggle;
A.mgo=function(){if(MPT&&mpsOn()){nextTurn63();return}return _mgo63.apply(this,arguments)};
A.mtoggle=function(){if(MPT&&mpsOn()&&S.paused){nextTurn63();return}return _mtg63.apply(this,arguments)};
hookAround('endMatch','em63',function(next,__a){
  if(mpsOn()&&R&&R.mpg){next();G.mps.rd={i:0,out:G.lastOutcome};return}
  return next()});
function seasonGroup63(){
  swapTo63(0);endSeason();G.phase='seasonEnd';G.mps.se={done:[]};
  hand63(0,'Resumo da temporada.',()=>{S.modal={t:'season'};G.view='inicio'});
}
const _rok63=A.roundok;
A.roundok=function(){
  if(!mpsOn()||!G.mps.rd)return _rok63.apply(this,arguments);
  const m=G.mps,rd=m.rd;S.modal=null;
  if(rd.i<m.hs.length-1){rd.i++;hand63(rd.i,'Veja como foi a rodada do seu time.',()=>{G.lastOutcome=rd.out;G.view='inicio';S.modal={t:'round',out:rd.out}})}
  else{m.rd=null;
    if(rd.out==='seasonEnd')seasonGroup63();
    else{m.ready=[];hand63(0,'Prepare a próxima rodada.',()=>{G.view='inicio'})}}
  render();
};
const _nsn63=A.newseason;
A.newseason=function(){
  if(!mpsOn()||!G.mps.se)return _nsn63.apply(this,arguments);
  const m=G.mps,se=m.se;se.done[m.cur]=true;S.modal=null;
  const nx=m.hs.findIndex((h,i)=>!se.done[i]);
  if(nx>=0)hand63(nx,'Resumo da temporada.',()=>{S.modal={t:'season'};G.view='inicio'});
  else{G.mps.se=null;swapTo63(0);newSeason();G.phase='play';G.mps.ready=[];hand63(0,'Nova temporada! Prepare o time.',()=>{S.modal={t:'sponsor'};G.view='inicio'})}
  render();
};
A.mphand=function(){const h=MPH;MPH=null;if(!h)return;swapTo63(h.k);S.modal=null;S.prof=null;S.panel=false;if(h.cb)h.cb();render();window.scrollTo(0,0)};
A.mpass=function(){const m=G.mps;if(!mpsOn()||S.match)return;const k=(m.cur+1)%m.hs.length;hand63(k,'Sua vez de mexer no clube.',()=>{G.view='inicio'})};
/* ---- render: tela de "passa o aparelho", pausas com turnos e botão de passar a vez ---- */
hookAround('render','rd63',function(next,__a){
  next();
  try{
    const app=document.getElementById('app');
    let pill=document.getElementById('mps63');
    if(MPH){const h=G.mps.hs[MPH.k];
      app.innerHTML=`<div class="wrap" style="text-align:center;padding-top:16vh"><div class="card"><div class="k">👥 Passa o aparelho</div><h2 style="margin:8px 0">${esc(h.nick)}</h2><p class="news">${esc(C(h.club).name)}</p><p class="hint">${esc(MPH.msg||'')}</p><button class="btn big" data-a="mphand">Sou o ${esc(h.nick)}</button></div></div>`;
      if(pill)pill.remove();return}
    if(S.match&&R&&R.mpg&&S.paused&&S.panel&&!MPT){const mn=R.ms[R.uis[0]].min;
      if(pauseMinutes().includes(mn)&&MPLAST!==mn){MPLAST=mn;startTurns63();return}}
    const on=mpsOn()&&!S.match&&!S.modal&&G.mps.cur>=0;
    if(!on){if(pill)pill.remove();return}
    if(!pill){pill=document.createElement('button');pill.id='mps63';pill.setAttribute('data-a','mpass');
      pill.style.cssText='position:fixed;left:8px;bottom:calc(84px + env(safe-area-inset-bottom,0px));z-index:50;padding:6px 10px;border-radius:16px;border:1px solid var(--bd,#8884);background:var(--card,#222);color:var(--fg,#fff);font-size:12px;opacity:.92';
      document.body.appendChild(pill)}
    const m=G.mps;pill.textContent='👥 '+m.hs[m.cur].nick+(m.ready&&m.ready[m.cur]?' ✔':'')+' · passar a vez';
  }catch(e){console.error('rd63 '+e.message)}
});
/* ---- criação do grupo: nomes, um por um escolhem clube na MESMA divisão ---- */
hookAround('vMpLocal','vml63',function(next,__a){
  let h=next();
  const card=`<div class="card"><div class="k">🏟️ Mesma liga</div><p class="news">Todos no mesmo campeonato (Brasil), cada um com um clube da mesma divisão, jogando uns contra os outros. Passem o aparelho: cada um prepara o time e, na rodada, cada um ajusta a tática no intervalo do seu jogo. Ninguém é demitido nesse modo.</p>
  <input id="mps_names" class="fsel" maxlength="90" placeholder="Nomes separados por vírgula (2 a 5). Ex.: Henrique, Rafa, Lipe" style="margin-bottom:8px"><button class="btn" data-a="mpsnew">Criar liga com os primos</button></div>`;
  h=h.replace('<div class="k">👥 Passa o aparelho</div>','<div class="k">👥 Ligas separadas</div>');
  h=h.replace('Cada um joga no seu ritmo (a liga de cada um é separada). Mesma liga ao mesmo tempo ainda não existe.','Em ligas separadas, cada primo joga a própria liga no seu ritmo.');
  return h.replace('<div class="card"><div class="k">👥 Ligas separadas</div>',card+'<div class="card"><div class="k">👥 Ligas separadas</div>');
});
A.mpsnew=function(){
  const v=((document.getElementById('mps_names')||{}).value||'');
  const names=[...new Set(v.split(/[,;\n]/).map(s=>s.trim()).filter(Boolean))].slice(0,5);
  if(names.length<2){toast('Escreve de 2 a 5 nomes separados por vírgula.');return}
  try{mplStash();mplLegacy()}catch(e){}
  newWorld();G.phase='start';S.mpSame={names,idx:0,tpl:null,div:null};S.coachName=names[0];A.newgame();
};
const _pc63=A.pickclub;
A.pickclub=function(d){
  const sm=S.mpSame;
  if(sm&&G.mps){const id=+d.id;
    if(G.mps.hs.some(h=>h.club===id)){toast('Esse clube já é de outro primo.');return}
    if(sm.div!=null&&C(id).div!==sm.div){toast('Todo mundo precisa estar na mesma divisão.');return}}
  return _pc63.apply(this,arguments)};
const _bg63=A.begin;
A.begin=function(){
  const sm=S.mpSame;if(!sm)return _bg63.apply(this,arguments);
  if(S.sc===null||!S.sp||S.sa===null||!S.obj)return;
  const k=sm.idx,names=sm.names,n=names.length;
  if(k===0)sm.tpl=JSON.stringify(Object.fromEntries(ckeys63().map(x=>[x,G[x]])));
  const g0=genAllFx;if(k>0)genAllFx=function(){};
  try{_bg63.apply(this,arguments)}finally{genAllFx=g0}
  if(!G.mps)G.mps={hs:[],cur:0,ready:[]};
  G.mps.hs[k]={nick:names[k],club:G.user,ctx:null};G.mps.cur=k;
  if(k===0)sm.div=userClub().div;
  if(k<n-1){
    G.mps.hs[k].ctx=cOut63();G.mps.cur=-1;cIn63(JSON.parse(sm.tpl));
    G.phase='start';sm.idx=k+1;S.coachName=names[k+1];S.mg=mgNew('equil');S.modal=null;S.step='coach';S.sc=null;S.sp=null;S.sa=null;S.obj=null;S.cdiv=sm.div;
    render();window.scrollTo(0,0);return}
  swapTo63(0);G.phase='play';S.mpSame=null;S.modal=null;G.mps.ready=[];
  try{save()}catch(e){}
  hand63(0,'Liga criada! Cada um prepara o time na sua vez.',()=>{G.view='inicio'});
};
const _stp63=A.step;
A.step=function(d){
  if(S.mpSame&&d&&d.v==='home'){S.mpSame=null;if(G.mps){newWorld();G.phase='start'}}
  return _stp63.apply(this,arguments)};

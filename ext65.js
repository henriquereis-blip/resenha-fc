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

/* ===== pênalti em etapas (v84): cartela central fixa, texto troca a cada etapa ===== */
function penScript(t,g,goal,team){
  const r=pk,side=['esquerdo','direito'];
  const dir=r(['esquerdo','direito','esquerdo','direito','meio']);
  const oc=goal?'goal':r(['save','save','post','out']);
  let dive;
  if(oc==='save')dive=dir;
  else if(oc==='goal')dive=dir==='meio'?r(side):(Math.random()<.2?dir:side.find(x=>x!==dir));
  else dive=r(side.concat(['meio']));
  const sty=dir==='meio'?r(['de cavadinha','com ousadia','de bico']):r(['rasteiro','forte','colocado','de chapa','cruzado']);
  const dv=dive==='meio'?'fica parado no meio do gol, apostando no chute central.':'se joga no canto '+dive+'!';
  const where=dir==='meio'?'no meio do gol':'no canto '+dir;
  let res,out;
  if(oc==='goal'){
    out='GOOOL!';
    res=dive===dir?`${t} bate forte ${where}. ${g} chega a tocar, mas a bola entra! GOL!`:`${t} bate ${sty} ${where}. ${g} foi pro lado contrário... GOL!`;
  }else if(oc==='save'){
    out='DEFENDEU!';
    res=dir==='meio'?`${t} bate ${sty}. ${g} esperou no meio e segura firme!`:`${t} bate ${sty} ${where}... ${g} voa e espalma! DEFENDEU!`;
  }else if(oc==='post'){
    out='NA TRAVE!';res=`${t} bate ${where}... a bola explode na trave! Que azar!`;
  }else{
    out='PRA FORA!';res=`${t} bate forte e isola! A bola vai por cima do gol.`;
  }
  return {head:'O juiz marcou pênalti para '+team+'!',oc,out,
    stages:[
      r(['O árbitro vai direto para a marca da cal. Não tem conversa.','Os jogadores cercam o juiz, mas ele não volta atrás.','Confusão na área... o árbitro apontou para a marca!']),
      `${t} se prepara pra chutar. `+r(['O estádio prende o fôlego.','Silêncio na arquibancada.','Ele ajeita a bola e respira fundo.','A torcida vaia forte, tentando atrapalhar.','Ele encara o gol, sem pressa.']),
      `Apito! ${t} corre pra bola... ${g} ${dv}`,
      res,
      ''
    ]};
}
const _mkPen65=mkPen;
mkPen=function(m,k){
  const hg=m.hg,ag=m.ag,sc=m.scorers.length,rt0=Object.assign({},m.rt),st0=Object.assign({},m.stats);
  const n0=m.ev.length;
  _mkPen65(m,k);
  const ev=m.ev[m.ev.length-1];
  if(m.ev.length===n0||!ev||!ev.pen)return;
  try{
    const O=m[k==='h'?'a':'h'],tp=P(ev.pid),gp=P(O.lineup[0]);
    const f=lastName;
    const sct=penScript(f(tp.name),f(gp.name),ev.pen.goal,m[k].club.name);
    sct.stages[4]=ev.pen.lines[4]||'';
    ev.pen.script=sct;
  }catch(e){return}
  const watch=typeof S!=='undefined'&&S.match&&!S._skip&&R&&R.ms&&m===R.ms[R.focus];
  if(!watch)return;
  const drt={},dst={};
  for(const id in m.rt)if(m.rt[id]!==rt0[id])drt[id]=m.rt[id]-(rt0[id]||0);
  for(const key in m.stats)if(m.stats[key]!==st0[key])dst[key]=m.stats[key]-(st0[key]||0);
  const q={ev,dh:m.hg-hg,da:m.ag-ag,sc:m.scorers.slice(sc),drt,dst};
  m.hg=hg;m.ag=ag;m.scorers.length=sc;m.ev.pop();
  for(const id in drt)m.rt[id]-=drt[id];
  for(const key in dst)m.stats[key]-=dst[key];
  m.penq=q;
}
function penApply(m){
  const q=m&&m.penq;if(!q||q.done)return;
  q.done=true;m.penq=null;
  m.hg+=q.dh;m.ag+=q.da;q.sc.forEach(x=>m.scorers.push(x));
  for(const id in q.drt)m.rt[id]=(m.rt[id]||0)+q.drt[id];
  for(const key in q.dst)m.stats[key]=(m.stats[key]||0)+q.dst[key];
  m.ev.push(q.ev);
}
function penFlushAll(){try{if(R&&R.ms)R.ms.forEach(penApply);S.pen=null}catch(e){}}
function penStart(q){
  q.shown=1;q.ev.seen=1;
  const sc=q.ev.pen.script,foc=R.ms[R.focus],fi=R.focus;
  S.pen={ev:q.ev,q,st:0,script:sc};
  if(typeof SFX!=='undefined')SFX.whistle();
  render();
  const d=S.speed===1?1:.6,dur=[2100,2300,2000,3000,2400];
  const go=()=>{
    if(!S.pen||S.pen.q!==q)return;
    if(S.pen.st<4){
      S.pen.st++;
      if(S.pen.st===3){
        penApply(foc);S.seen=S.seen||{};S.seen[fi]=foc.ev.length;
        if(typeof SFX!=='undefined'){q.ev.pen.goal?SFX.goal():SFX.sad()}
      }
      render();setTimeout(go,dur[S.pen.st]*d);
    }else{S.pen=null;render()}
  };
  setTimeout(go,dur[0]*d);
}
function penCard(){
  const p=S.pen,sc=p.script;if(!sc)return '';
  const goal=p.ev.pen.goal;
  return `<div class="pen card pc"><div class="k">🥅 PÊNALTI · ${p.ev.min}'</div><div class="pt">${esc(sc.head)}</div><p class="pl ${p.st===3?(goal?'ok':'bad'):''}" data-st="${p.st}">${esc(sc.stages[p.st]||'')}</p>${p.st===3?`<div class="po ${goal?'ok':'bad'}">${esc(sc.out)}</div>`:''}</div>`;
}
const _fr65=finishRound;
finishRound=function(){penFlushAll();return _fr65.apply(this,arguments)};
const _skip65=A.mskip;
A.mskip=function(){S._skip=true;penFlushAll();try{return _skip65.apply(this,arguments)}finally{S._skip=false;penFlushAll()}};

/* ===== v84: JOGAR abre a escalação (pré-jogo) com painel do adversário + olheiro ===== */
/* histórico tático compacto por clube: [oppId, casa?, gf, ga, formação, estilo, rodada] — últimos 5 */
function tlogRound65(){
  if(!R||!R.ms)return;
  for(const m of R.ms){
    if(!m||!m.h||!m.a)continue;
    for(const [k,s,o] of [['h',m.h,m.a],['a',m.a,m.h]]){
      const c=s.club;if(!c)continue;
      c.tlog=c.tlog||[];
      c.tlog.push([o.club.id,k==='h'?1:0,k==='h'?m.hg:m.ag,k==='h'?m.ag:m.hg,s.formation,s.style||c.style||'',G.round]);
      if(c.tlog.length>5)c.tlog.shift();
    }
  }
}
const _fr65b=finishRound;
finishRound=function(){try{tlogRound65()}catch(e){}return _fr65b.apply(this,arguments)};

const lineAvg65=(c,pos)=>{const L=c.squad.slice(0,11).map(P).filter(p=>p.pos===pos);return L.length?L.reduce((a,p)=>a+p.ovr,0)/L.length:0};
function scoutHtml65(opp,c){
  const L=opp.tlog||[];
  const chip=x=>{const r=x[2]>x[3]?'V':x[2]<x[3]?'D':'E';return `<i class="fm ${r}" title="${esc(C(x[0]).name)}">${x[2]}–${x[3]}</i>`};
  const chips=L.length?`<div class="sc65"><small>Últimos jogos</small>${L.slice().reverse().map(chip).join('')}</div>`:`<div class="sc65"><small>Últimos jogos</small>${formOf(opp.id).map(r=>`<i class="fm ${r}">${r}</i>`).join('')||'<span>—</span>'}</div>`;
  const btn=`<div class="sb65"><button class="btn sm ghost ${S.scout==='tac'?'on':''}" data-a="scout" data-v="tac">📋 Tática dos últimos jogos</button><button class="btn sm ghost ${S.scout==='olh'?'on':''}" data-a="scout" data-v="olh">🔭 Olheiro</button></div>`;
  let body='';
  if(S.scout==='tac'){
    body=`<div class="card sp65"><div class="k">Como ${esc(opp.name)} jogou nos últimos jogos</div>${L.length?L.slice().reverse().map(x=>`<div class="res"><span>${x[1]?'':'@ '}${esc(C(x[0]).name)} · ${x[2]}–${x[3]}</span><b>${esc(x[4])} · ${esc(x[5]||'—')}</b></div>`).join(''):`<p class="news">Ainda sem jogos registrados nesta temporada. Esquema atual: <b>${esc(opp.formation)}</b> · ${esc(opp.style||'—')}.</p>`}</div>`;
  }else if(S.scout==='olh'){
    const cnt=k=>{const m={};L.forEach(x=>m[x[k]]=(m[x[k]]||0)+1);return Object.entries(m).sort((a,b)=>b[1]-a[1])};
    const fo=L.length?cnt(4)[0]:[opp.formation,1],st=L.length?cnt(5)[0]:[opp.style||'—',1];
    const share=L.length?fo[1]/L.length:0;
    const conf=L.length<3?'baixa (poucos jogos vistos)':share>=.8?'alta':share>=.5?'média':'baixa (eles variam muito)';
    const XI=opp.squad.slice(0,11).map(P);
    const star=XI.slice().sort((a,b)=>b.ovr-a.ovr)[0];
    const art=Object.values(G.players).filter(p=>p.club===opp.id).sort((a,b)=>b.goals-a.goals)[0];
    const hurt=opp.squad.slice(0,18).map(P).filter(p=>p.inj>0).length;
    const ln=['ATA','MID','DEF'].map(p=>[p,lineAvg65(opp,p),lineAvg65(c,p)]);
    const lbl={ATA:'Ataque',MID:'Meio',DEF:'Defesa'};
    body=`<div class="card sp65"><div class="k">🔭 Relatório do olheiro · ${esc(opp.name)}</div>
      <p class="news">Provável esquema: <b>${esc(fo[0])}</b> · estilo <b>${esc(st[0])}</b> <small>(confiança ${conf})</small></p>
      <p class="news">⚠ É só uma previsão: o técnico pode mudar o time e o esquema pra esse confronto.</p>
      ${star?`<div class="res"><span>Craque</span><b>${esc(nameOf(star))} · ${star.pos} · ${star.ovr}</b></div>`:''}
      ${art&&art.goals>0?`<div class="res"><span>Artilheiro</span><b>${esc(nameOf(art))} · ${art.goals} gols</b></div>`:''}
      <div class="res"><span>Desfalques (lesão)</span><b>${hurt}</b></div>
      ${ln.map(([p,o,u])=>`<div class="res"><span>${lbl[p]} deles × o seu</span><b>${o.toFixed(0)} × ${u.toFixed(0)} ${o>u+2?'⚠':o<u-2?'✔':''}</b></div>`).join('')}
      <p class="news" style="margin-top:6px">Provável time: ${XI.map(p=>esc(lastName(p.name))+' '+p.ovr).join(' · ')}</p></div>`;
  }
  return `<div class="scout65">${chips}${btn}${body}</div>`;
}
const _opp65=oppStrip;
oppStrip=function(c){
  const h=_opp65(c);if(!h)return h;
  try{
    const fx=G.fixtures[G.round][userFixtureIdx()];const opp=C(fx[0]===c.id?fx[1]:fx[0]);
    const pre=S.pre?`<div class="pre65">⚽ PRÉ-JOGO · rodada ${G.round+1} — monte o time e, quando estiver pronto, toque em JOGAR</div>`:'';
    return pre+h+scoutHtml65(opp,c);
  }catch(e){return h}
};
A.scout=function(d){S.scout=S.scout===d.v?null:d.v;render()};
/* o JOGAR do rodapé primeiro leva pra escalação; já estando nela, começa o jogo */
A.pre=function(){
  if(G.view!=='tatica'||S.prof!==null||S.paper){S.pre=true;S.scout=null;A.nav({v:'tatica'});return}
  S.pre=false;A.play();
};
const _play65=A.play;
A.play=function(){S.pre=false;return _play65.apply(this,arguments)};

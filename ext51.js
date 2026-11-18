/* ext51: L1, formatos de campeonato na liga do exterior onde o técnico trabalha.
   - Apertura/Clausura (MEX, COL): meio da temporada = liguilla dos 8 melhores + tabela zerada; no fim, 2ª liguilla. Dois campeões por temporada.
   - MLS: 15 clubes por conferência; no fim, playoffs (9 por conferência: wild card, melhor de 3, semi e final de conferência, MLS Cup).
   Por enquanto as partidas dos outros clubes e as suas são simuladas na hora (resultado no jornal); jogar as partidas vem na próxima etapa (L1.2). */
const MLS_EAST=new Set(['Inter Miami','Columbus Crew','Philadelphia Union','FC Cincinnati','New York City FC','Atlanta United','New York Red Bulls','Orlando City','Nashville SC','New England Revolution','Toronto FC','Charlotte FC','Chicago Fire','CF Montréal','D.C. United']);
/* nº de classificados ao mata-mata: Argentina = 16 (8 por zona, aqui os 16 melhores da tabela), jogo único */
function po51n(I){return I.k==='ARG'?16:(I.R.po||8)}
/* classificados ao mata-mata: Argentina = 8 melhores de cada zona (G.argZ, ext55); demais = top N da tabela */
function top51(I,rows){
  try{if(I.k==='ARG'&&G.argZ&&G.argZ.d===I.div){const A=new Set(G.argZ.A),B=new Set(G.argZ.B);
    const sel=new Set(rows.filter(r=>A.has(r.id)).slice(0,8).concat(rows.filter(r=>B.has(r.id)).slice(0,8)));
    if(sel.size===16)return rows.filter(r=>sel.has(r))}}catch(e){}
  return rows.slice(0,po51n(I));
}
/* Equador: hexagonal final (6 melhores, ida e volta, pontos zerados); campeão = mais pontos */
function hexSim51(teams,ra){
  const pts=new Map(teams.map(t=>[t,{p:0,g:0}])),n=teams.length;
  for(const a of teams)for(const b of teams){if(a===b)continue;const g=wMatch({r:ra(a),f:1},{r:ra(b),f:1}),x=pts.get(a),y=pts.get(b);
    x.g+=g[0]-g[1];y.g+=g[1]-g[0];if(g[0]>g[1])x.p+=3;else if(g[0]<g[1])y.p+=3;else{x.p++;y.p++}}
  const tb=teams.slice().sort((a,b)=>pts.get(b).p-pts.get(a).p||pts.get(b).g-pts.get(a).g||teams.indexOf(a)-teams.indexOf(b));
  return {tb,pts}}
function hexRun51(I,label){
  const rows=allRows(I.div),top=rows.slice(0,6);if(top.length<6)return null;
  const h=hexSim51(top,rRat);const ch=h.tb[0];
  const log=[{stage:'Final',t:'Hexagonal: '+h.tb.map(t=>rn51(t)+' '+h.pts.get(t).p).join(' · '),w:ch,l:null}];
  award51(label,ch,log);return {champ:ch,log,label,qual:top.includes(userClub())}}
function lg51(){
  try{
    if(!G||!G.abroad||!G.pyr||G.user==null)return null;const u=G.clubs[G.user];if(!u||u.div<4||tierOf(u.div)!==1)return null;
    const k=G.pyr.k,R=WRULES[k]||{};
    if(k==='USA')return {k,R,div:u.div,kind:'mls'};
    if(R.fmt==='ac')return {k,R,div:u.div,kind:'ac'};
    if(R.fmt==='hex')return {k,R,div:u.div,kind:'hex'};
  }catch(e){}
  return null;
}
const rn51=r=>r.name||r.n;
/* jogo único; o melhor colocado joga em casa */
function one51(A,B){const g=wMatch({r:rRat(A),f:1},{r:rRat(B),f:1});let a=g[0],b=g[1],pen=null;
  if(a===b){pen=shootout(rRat(A),rRat(B))}
  const aw=pen?pen[0]>pen[1]:a>b;return {A,B,w:aw?A:B,l:aw?B:A,a,b,pen}}
const fmt51=m=>{const wa=m.w===m.A;return rn51(m.w)+' '+(wa?m.a:m.b)+'–'+(wa?m.b:m.a)+(m.pen?' ('+(wa?m.pen[0]:m.pen[1])+'–'+(wa?m.pen[1]:m.pen[0])+' pên.)':'')+' '+rn51(m.l)};
/* série melhor de 3 (mando: melhor colocado nos jogos 1 e 3) */
function bo3(A,B){let wa=0,wb=0,sc=[];while(wa<2&&wb<2){const h=(wa+wb)%2===0?A:B,aw=h===A?B:A,g=wMatch({r:rRat(h),f:1},{r:rRat(aw),f:1});let x=g[0],y=g[1];
    if(x===y){if(Math.random()<.5+(rRat(h)-rRat(aw))/90)x++;else y++}
    const winA=(h===A)?x>y:y>x;if(winA)wa++;else wb++;sc.push(h===A?[x,y]:[y,x])}
  const aw=wa>wb;return {w:aw?A:B,l:aw?B:A,sc:sc.map(([x,y])=>aw?x+'–'+y:y+'–'+x).join(' / ')}}
/* liguilla de 8: quartas, semi e final em 2 jogos (função tie do ext44) */
function liguilla51(top,single){
  const log=[];let cur=top.slice();let names={16:'Oitavas',8:'Quartas',4:'Semifinal',2:'Final'};
  while(cur.length>1){const nx=[],n=cur.length;
    for(let i=0;i<Math.floor(n/2);i++){if(single){const m=one51(cur[i],cur[n-1-i]);nx.push(m.w);log.push({stage:names[n]||'Fase',t:fmt51(m),w:m.w,l:m.l});continue}
      const r=tie(cur[i],cur[n-1-i],cur[i]);nx.push(r[0]);log.push({stage:names[n]||'Fase',t:rn51(r[0])+' '+r[2]+'–'+r[3]+' '+rn51(r[1]),w:r[0],l:r[1]})}
    cur=nx.sort((a,b)=>top.indexOf(a)-top.indexOf(b))}
  return {champ:cur[0],log};
}
function userStage51(log,champ){
  const c=G.clubs[G.user];if(!c)return null;
  const me=log.filter(x=>x.w===c||x.l===c);if(!me.length)return 'fora';
  if(champ===c)return 'campeão';
  const st=me[me.length-1].stage;
  if(st==='MLS Cup'||st==='Final')return 'vice-campeão';
  if(/^Final /.test(st))return 'eliminado na final de conferência';
  if(/^Semi/.test(st))return 'eliminado na semifinal'+(/ (Leste|Oeste)$/.test(st)?' de conferência':'');
  if(/^Quartas/.test(st))return 'eliminado nas quartas';
  if(/^Rodada 1/.test(st))return 'eliminado na primeira rodada';
  if(/^Wild Card/.test(st))return 'eliminado no wild card';
  return 'eliminado';
}
/* troféu, prêmio e humor quando o técnico é campeão; notícia do resultado */
function award51(name,champ,log,vice){
  const c=userClub();const sc=Math.max(.7,scaleOf(c)/100),me=champ===c;
  paperLine(rn51(champ)+' é campeão '+(/^MLS/.test(name)?'da ':'do ')+name,'Decisão: '+(log.filter(x=>x.stage==='Final'||x.stage==='MLS Cup').map(x=>x.t).join(' · ')||'—'));
  if(me){const prize=+(3*sc).toFixed(1);G.fin.caixa=+(G.fin.caixa+prize).toFixed(1);c.humor=clamp(c.humor+8,5,100);G.board.conf=clamp(G.board.conf+5,0,100);G.sqc=clamp((typeof sqcOf==='function'?sqcOf():60)+6,0,100);
    G.trophyEst=(G.trophyEst||0)+1;addNews('🏆 Campeão '+(/^MLS/.test(name)?'da ':'do ')+name+'! Prêmio R$ '+prize.toFixed(1)+' mi.')}
  else{const st=userStage51(log,champ);if(st&&st!=='fora')addNews((/^MLS/.test(name)?'Playoffs da MLS':'Liguilla do '+name)+': '+st+'.')}
  G.lg51=G.lg51||{};G.lg51.hist=(G.lg51.hist||[]);G.lg51.hist.push({s:G.season,n:name,champ:rn51(champ),log:log.map(x=>x.stage+': '+x.t)});G.lg51.hist=G.lg51.hist.slice(-12);
}
/* ---------- Apertura / Clausura ---------- */
function acRun51(I,label){
  const rows=allRows(I.div),top=top51(I,rows);
  if(po51n(I)===1&&top.length){const ch=top[0],log=[{stage:'Final',t:rn51(ch)+' (1º da tabela do '+label.split(' ')[0]+')',w:ch,l:null}];award51(label,ch,log);return {champ:ch,log,label,qual:ch===userClub()}}
  if(top.length<4)return null;
  const r=liguilla51(top,I.k==='ARG');award51(label,r.champ,r.log);return {champ:r.champ,log:r.log,label,qual:top.includes(userClub())}
}
function acHalf51(){
  const I=lg51();if(!I||I.kind!=='ac')return;
  G.lg51=G.lg51||{};if(G.lg51.half===G.season)return;
  const half=Math.floor(NR()/2);if(G.round!==half)return;
  G.lg51.half=G.season;
  const lab='Apertura';const top0=top51(I,allRows(I.div));
  const res=(typeof po51Init==='function'&&top0.length>=4&&top0.includes(userClub()))?po51Init(I,'ac',lab+' ('+wlOf(I.k).lg+')',true,top0):acRun51(I,lab+' ('+wlOf(I.k).lg+')');
  const first=allRows(I.div);G.lg51.first=first.slice(0,8).map(r=>r.name);
  for(const c of G.clubs.filter(c=>c.div===I.div&&!c.stub)){c.pp=(c.pp||0)+c.P;c.P=c.J=c.V=c.E=c.D=c.GP=c.GC=0}
  if(res)addNews('Começa o Clausura: tabela zerada.');
}
/* ---------- MLS ---------- */
function mlsConf51(rows){const E=[],W=[];rows.forEach(r=>(MLS_EAST.has(rn51(r))?E:W).push(r));if(!E.length||!W.length){const h=Math.ceil(rows.length/2);return [rows.slice(0,h),rows.slice(h)]}return [E,W]}
function mlsRun51(I){
  const rows=allRows(I.div),[E,W]=mlsConf51(rows),log=[];
  const side=(L,nm)=>{const T=L.slice(0,9);if(T.length<9)return T[0];
    const wc=one51(T[7],T[8]);log.push({stage:'Wild Card '+nm,t:fmt51(wc),w:wc.w,l:wc.l});
    const q=[[T[0],wc.w],[T[1],T[6]],[T[2],T[5]],[T[3],T[4]]],w1=[];
    for(const [a,b] of q){const s=bo3(a,b);w1.push(s.w);log.push({stage:'Rodada 1 '+nm,t:rn51(s.w)+' '+s.sc+' '+rn51(s.l),w:s.w,l:s.l})}
    const sf=[[w1[0],w1[3]],[w1[1],w1[2]]].map(([a,b])=>{const hi=L.indexOf(a)<L.indexOf(b)?a:b,lo=hi===a?b:a,m=one51(hi,lo);log.push({stage:'Semi '+nm,t:fmt51(m),w:m.w,l:m.l});return m.w});
    const hi=L.indexOf(sf[0])<L.indexOf(sf[1])?sf[0]:sf[1],lo=hi===sf[0]?sf[1]:sf[0],f=one51(hi,lo);
    log.push({stage:'Final '+nm,t:fmt51(f),w:f.w,l:f.l});return f.w};
  const ce=side(E,'Leste'),cw=side(W,'Oeste');
  if(!ce||!cw)return null;
  const hi=rows.indexOf(ce)<rows.indexOf(cw)?ce:cw,lo=hi===ce?cw:ce,cup=one51(hi,lo);
  log.push({stage:'MLS Cup',t:fmt51(cup),w:cup.w,l:cup.l});
  award51('MLS Cup',cup.w,log);return {champ:cup.w,log,label:'MLS Cup'};
}
/* ---------- ganchos ---------- */
hookAfter('finishRound','ext51_fr51',()=>{acHalf51()});
hookAround('endSeason','es51',function(next,__a){
  let res=null,I=null;
  try{I=lg51();if(G.lg51&&G.lg51.pres&&G.lg51.pres.s===G.season){res=G.lg51.pres}
    else if(I&&(!G.lg51||G.lg51.end!==G.season)){G.lg51=G.lg51||{};G.lg51.end=G.season;res=I.kind==='mls'?mlsRun51(I):I.kind==='hex'?hexRun51(I,'Hexagonal final ('+wlOf(I.k).lg+')'):acRun51(I,'Clausura ('+wlOf(I.k).lg+')')}}catch(e){console.error('end51 '+e.message)}
  const r=next();
  try{if(res&&G.summary){const nm=rn51(res.champ);
      G.summary.champ=nm;if(G.hist.length)G.hist[G.hist.length-1].champ=nm;
      G.summary.txt+=' '+res.label+': campeão '+nm+'.';G.summary.liguilla=res.log.map(x=>x.stage+': '+x.t);
      const ap=(G.lg51.hist||[]).filter(h=>h.s===G.season&&/Apertura/.test(h.n)).slice(-1)[0];if(ap)G.summary.txt+=' Apertura: '+ap.champ+'.'}}catch(e){console.error('sum51 '+e.message)}
  return r});

/* ext52: L1.2, liguilla (MEX/COL) e playoffs da MLS JOGÁVEIS quando o seu clube se classifica.
   Usa o mesmo truque das copas: a partida do playoff entra no lugar da rodada do campeonato (G._lg / G._x) e não consome rodada.
   No fim da temporada entra uma rodada "reserva" (placeholder) só para caber os jogos; ela some quando o mata-mata acaba.
   Os confrontos dos outros clubes são simulados na hora; só os seus jogos você joga (ida/volta, melhor de 3, jogo único).
   Estado salvo em G.po51 (só ids e números). */
const C52=id=>G.clubs[id];
const sim52=(h,a)=>{const g=wMatch({r:rRat(C52(h)),f:1},{r:rRat(C52(a)),f:1});return [g[0],g[1]]};
const pen52=(a,b)=>shootout(rRat(C52(a)),rRat(C52(b)));            // [pênaltis de a, pênaltis de b]
/* mando do jogo i da série */
function th52(t,i){return t.m==='single'?t.a:t.m==='two'?(i===0?t.b:t.a):(i%2===0?t.a:t.b)}
/* vencedor de um jogo (x,y,p orientados a–b) */
const gw52=(t,g)=>g[0]>g[1]?t.a:g[0]<g[1]?t.b:(g[2][0]>g[2][1]?t.a:t.b);
function add52(t,x,y,pen){
  if(t.m!=='two'&&x===y&&!pen)pen=pen52(t.a,t.b);
  t.res.push([x,y,pen||null]);
  if(t.m==='two'){
    if(t.res.length<2)return;
    const sa=t.res[0][0]+t.res[1][0],sb=t.res[0][1]+t.res[1][1];
    if(sa!==sb)t.w=sa>sb?t.a:t.b;
    else if(t.pk){t.pen=pen52(t.a,t.b);t.w=t.pen[0]>t.pen[1]?t.a:t.b}
    else t.w=t.a;                                  // melhor campanha avança
  }else if(t.m==='single'){t.w=gw52(t,t.res[0])}
  else{const wa=t.res.filter(g=>gw52(t,g)===t.a).length,wb=t.res.length-wa;if(wa>=2)t.w=t.a;else if(wb>=2)t.w=t.b}
}
function sim52t(t){while(t.w==null){const i=t.res.length,h=th52(t,i),aw=h===t.a?t.b:t.a,g=sim52(h,aw);add52(t,h===t.a?g[0]:g[1],h===t.a?g[1]:g[0])}}
const nm52=id=>rn51(C52(id));
/* texto do confronto, do ponto de vista do vencedor */
function tt52(t){
  const w=t.w,l=w===t.a?t.b:t.a,wa=w===t.a;
  if(t.m==='bo3')return nm52(w)+' '+t.res.map(g=>wa?g[0]+'–'+g[1]:g[1]+'–'+g[0]).join(' / ')+' '+nm52(l);
  if(t.m==='two'){const sa=t.res[0][0]+t.res[1][0],sb=t.res[0][1]+t.res[1][1];
    return nm52(w)+' '+(wa?sa:sb)+'–'+(wa?sb:sa)+(t.pen?' ('+(wa?t.pen[0]:t.pen[1])+'–'+(wa?t.pen[1]:t.pen[0])+' pên.)':'')+' '+nm52(l)}
  const g=t.res[0];return nm52(w)+' '+(wa?g[0]:g[1])+'–'+(wa?g[1]:g[0])+(g[2]?' ('+(wa?g[2][0]:g[2][1])+'–'+(wa?g[2][1]:g[2][0])+' pên.)':'')+' '+nm52(l);
}
/* monta os confrontos da fase atual; false = acabou */
function stage52(po){
  const mk=(a,b,m,tag)=>{if(po.rk[b]<po.rk[a])[a,b]=[b,a];return {a,b,m,res:[],pen:null,w:null,tag:tag||'',u:a===G.user||b===G.user,pk:po.cty==='COL'}};
  po.ties=[];
  if(po.kind==='ac'){
    const cur=po.al,n=cur.length;if(n<2){po.champ=cur[0];return false}
    po.sn={8:'Quartas',4:'Semifinal',2:'Final'}[n]||'Fase';
    for(let i=0;i<Math.floor(n/2);i++)po.ties.push(mk(cur[i],cur[n-1-i],'two'));
    po.bye=n%2?cur[(n-1)/2]:null;return true;
  }
  const S=[['E','Leste'],['W','Oeste']];
  if(po.ms===0){po.sn='Wild Card';for(const [s,nm] of S)po.ties.push(mk(po.T[s][7],po.T[s][8],'single',nm));return true}
  if(po.ms===1){po.sn='Rodada 1';for(const [s,nm] of S)for(const [a,b] of po.c[s])po.ties.push(mk(a,b,'bo3',nm));return true}
  if(po.ms===2){po.sn='Semi';for(const [s,nm] of S)for(const [a,b] of po.c[s])po.ties.push(mk(a,b,'single',nm));return true}
  if(po.ms===3){po.sn='Final';for(const [s,nm] of S)po.ties.push(mk(po.c[s][0][0],po.c[s][0][1],'single',nm));return true}
  if(po.ms===4){po.sn='MLS Cup';po.ties.push(mk(po.fin[0],po.fin[1],'single',''));return true}
  return false;
}
/* fecha a fase: registra no log e prepara a próxima */
function close52(po){
  for(const t of po.ties)po.log.push({stage:po.sn+(t.tag?' '+t.tag:''),t:tt52(t),w:t.w,l:t.w===t.a?t.b:t.a});
  const ws=po.ties.map(t=>t.w);
  if(po.kind==='ac'){po.al=ws.concat(po.bye!=null?[po.bye]:[]).sort((x,y)=>po.rk[x]-po.rk[y])}
  else{
    const side=(s)=>po.ties.filter(t=>t.tag===(s==='E'?'Leste':'Oeste')).map(t=>t.w);
    if(po.ms===0){for(const s of ['E','W']){const T=po.T[s],wc=side(s)[0];po.c[s]=[[T[0],wc],[T[1],T[6]],[T[2],T[5]],[T[3],T[4]]]}}
    else if(po.ms===1){for(const s of ['E','W']){const w=side(s);po.c[s]=[[w[0],w[3]],[w[1],w[2]]]}}
    else if(po.ms===2){for(const s of ['E','W']){const w=side(s);po.c[s]=[[w[0],w[1]]]}}
    else if(po.ms===3){po.fin=[side('E')[0],side('W')[0]]}
    else if(po.ms===4){po.champ=ws[0]}
    po.ms++;
  }
}
/* simula tudo que não depende de você; devolve true se acabou, false se falta um jogo seu */
function run52(po){
  for(let g=0;g<30;g++){
    if(!po.ties.length&&!stage52(po))return true;
    for(const t of po.ties)if(t.w==null&&!t.u)sim52t(t);
    if(po.ties.some(t=>t.w==null))return false;
    close52(po);po.ties=[];
  }
  return true;
}
function fin52(po){
  const logO=po.log.map(x=>({stage:x.stage,t:x.t,w:C52(x.w),l:C52(x.l)}));
  G.lg51=G.lg51||{};
  award51(po.label,C52(po.champ),logO);
  if(!po.mid)G.lg51.pres={s:G.season,label:po.label,champ:{name:nm52(po.champ)},log:logO.map(x=>({stage:x.stage,t:x.t}))};
  if(po.ph){ph52(false);po.ph=false}
  G.po51=null;
}
/* rodada reserva no fim da temporada (some quando o mata-mata acaba) */
function ph52(add){
  const div=G.clubs[G.user].div;
  for(const a of new Set([G.fixtures,G.dfx&&G.dfx[div]].filter(Boolean))){if(add)a.push((a[a.length-1]||[]).map(p=>p.slice()));else a.pop()}
}
/* começa um mata-mata jogável */
function po51Init(I,kind,label,mid,top){
  const po={kind,cty:I.k,label,mid:!!mid,s:G.season,ms:0,ties:[],log:[],rk:{},pend:false,ph:false};
  const rows=allRows(I.div);
  if(kind==='ac'){po.al=top.map(r=>r.id);top.forEach((r,i)=>po.rk[r.id]=i)}
  else{const [E,W]=mlsConf51(rows);rows.forEach((r,i)=>po.rk[r.id]=i);po.T={E:E.slice(0,9).map(r=>r.id),W:W.slice(0,9).map(r=>r.id)};po.c={E:[],W:[]}}
  G.po51=po;
  const done=run52(po);
  if(done){fin52(po);return {pending:false}}
  po.pend=true;if(!po.mid){ph52(true);po.ph=true}
  addNews('🏆 '+po.label+': seu clube está nos playoffs! Próximo jogo: '+po.sn+'.');
  return {pending:true};
}
/* o seu clube está entre os classificados no fim da temporada? */
function qual52(I){
  const rows=allRows(I.div),u=userClub();
  if(I.kind==='ac'){const top=rows.slice(0,I.R.po||8);return top.length>=4&&top.includes(u)?top:null}
  const [E,W]=mlsConf51(rows);if(E.length<9||W.length<9)return null;
  return (E.slice(0,9).includes(u)||W.slice(0,9).includes(u))?rows:null;
}
/* partida do técnico no lugar da rodada */
const _ex52=extraSync;extraSync=function(){
  try{
    const po=G&&G.po51;
    if(po&&po.pend&&G.phase==='play'&&G.user!=null&&!G._lg&&G.round<NR()){
      const t=po.ties.find(t=>t.u&&t.w==null);
      if(t){
        const i=t.res.length,h=th52(t,i),opp=h===G.user?(t.a===G.user?t.b:t.a):h,pair=h===G.user?[G.user,t.a===G.user?t.b:t.a]:[h,G.user];
        void opp;
        for(const [x,y] of [pair]){fcEnsure(x);fcEnsure(y)}
        const sn=po.sn+(t.tag?' '+t.tag:'')+(t.m==='two'?(i===0?' · ida':' · volta'):t.m==='bo3'?' · jogo '+(i+1):'');
        G._lg=G.fixtures[G.round];G.fixtures[G.round]=[pair];G._x={kind:'po51',ko:t.m!=='two',label:po.label+' · '+sn};return;
      }
    }
  }catch(e){console.error('extraSync52 '+e.message)}
  return _ex52.apply(this,arguments);
};
/* fim da partida do playoff */
function finishPo51(){
  const po=G.po51,x=G._x,um=R.ms[R.ui],us=userSide(um),c=userClub();
  const gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg;
  for(const m of R.ms)for(const [k,s] of [['h',m.h],['a',m.a]]){const club=s.club;if(club.fx)continue;
    const won=k==='h'?m.hg>m.ag:m.ag>m.hg,lost=k==='h'?m.hg<m.ag:m.ag<m.hg;
    for(const id of new Set([...s.lineup,...s.used,...s.outs])){const p=P(id);p.en=clamp(Math.round(m.en[id]-4),20,100);p.mor=clamp(p.mor+(won?3:lost?-3:0),30,100);if(Math.random()<(p.en<45?.06:.025))p.inj=ri(1,5)}}
  const t=po.ties.find(t=>t.u&&t.w==null);
  const aHome=um.h.club.id===t.a;
  let pen=null,hpen=null;
  if(um.hg===um.ag&&t.m!=='two'){hpen=shootout(um.h.club.rep,um.a.club.rep);pen=aHome?hpen:[hpen[1],hpen[0]]}
  add52(t,aHome?um.hg:um.ag,aHome?um.ag:um.hg,pen);
  G.fixtures[G.round]=G._lg;G._lg=null;G._x=null;      // devolve a rodada ANTES de fin52 tirar a reserva
  let prize=0,note='';
  if(us==='h')prize+=+(scaleOf(c)*.012).toFixed(1);
  G.fin.caixa=+(G.fin.caixa+prize).toFixed(1);
  const sn=po.sn;let adv=null;
  if(t.w==null){
    note=t.m==='two'?'Ida: '+gf+'–'+ga+'. A volta decide.':'Série: '+t.res.filter(g=>gw52(t,g)===G.user).length+'–'+t.res.filter(g=>gw52(t,g)!==G.user).length+'. Tem mais jogo.';
  }else{
    adv=t.w===G.user;
    const done=run52(po);
    if(done){
      const champ=po.champ===G.user;note=champ?'CAMPEÃO: '+po.label+'!':'Eliminado: '+sn+'.';
      po.pend=false;
    }else note='Você avançou! Próxima fase: '+po.sn+'.';
    if(done){fin52(po)}
  }
  const fim=!G.po51;
  const endSeasonNow=fim&&!po.mid;
  const um2=um;
  G.lastRound={n:G.round,results:[{h:um.h.club.id,a:um.a.club.id,hg:um.hg,ag:um.ag,u:true}],ratings:Object.assign({},um2.rt),scorers:um2.scorers,stats:um2.stats,user:{home:us==='h'},cup:{label:x.label,adv,pen:hpen,prize,note,ko:x.ko}};
  c.humor=clamp(c.humor+(gf>ga?3:gf<ga?-3:0),5,100);
  for(const p of Object.values(G.players))if(p.club>=0&&p.en<100)p.en=clamp(p.en+6,0,100);
  try{const sd=um[us];sqcTick(new Set([...sd.lineup,...sd.used]),gf,ga)}catch(e){}
  R=null;
  try{fcClean()}catch(e){}
  const out=endSeasonNow?'seasonEnd':'next';
  save();return out;
}
const _fr52=finishRound;finishRound=function(){
  if(G._lg&&G._x&&G._x.kind==='po51'&&R&&R.xtra)return finishPo51();
  const out=_fr52.apply(this,arguments);
  try{
    if(out==='seasonEnd'&&!G.po51){
      const I=lg51();
      if(I&&(!G.lg51||G.lg51.end!==G.season)){
        const q=qual52(I);
        if(q){G.lg51=G.lg51||{};G.lg51.end=G.season;
          const label=I.kind==='mls'?'MLS Cup':'Clausura ('+wlOf(I.k).lg+')';
          const r=po51Init(I,I.kind,label,false,q);
          if(r.pending){save();return 'next'}
        }
      }
    }
  }catch(e){console.error('end52 '+e.message)}
  return out;
};
const _ns52=newSeason;newSeason=function(){if(G.po51&&G.po51.ph){try{ph52(false)}catch(e){}}G.po51=null;return _ns52.apply(this,arguments)};

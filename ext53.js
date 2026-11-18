/* ext53: L2, copas nacionais JOGÁVEIS na carreira no exterior (FA Cup, Copa del Rey, Coppa Italia, DFB-Pokal, Coupe de France, Taça de Portugal, Copa Argentina).
   Mata-mata de jogo único com clubes COMPLETOS do país (as divisões que o jogo já carrega: a sua, a de cima e a de baixo).
   Mesmo truque das copas/playoffs: o jogo entra no lugar de uma rodada do campeonato (G._lg/G._x) sem consumir rodada.
   Estado salvo em G.nc (só ids). Outros jogos são simulados na hora, ao fim de cada fase. */
const NCUP={ENG:[64,'FA Cup'],ESP:[32,'Copa del Rey'],ITA:[32,'Coppa Italia'],GER:[32,'DFB-Pokal'],FRA:[32,'Coupe de France'],POR:[32,'Taça de Portugal'],ARG:[32,'Copa Argentina'],NED:[32,'KNVB Beker'],BEL:[32,'Croky Cup'],TUR:[32,'Copa da Turquia'],SCO:[16,'Scottish Cup'],JPN:[32,'Copa do Imperador'],KOR:[16,'Copa da Coreia'],CHN:[32,'Copa da China'],AUS:[8,'Australia Cup'],EGY:[16,'Copa do Egito'],MAR:[16,'Copa do Trono'],RSA:[16,'Nedbank Cup'],PAR:[8,'Copa Paraguay'],ECU:[16,'Copa Ecuador'],BOL:[16,'Copa Bolivia'],VEN:[8,'Copa Venezuela'],PER:[16,'Copa Bicentenario'],AUT:[16,'ÖFB-Cup'],SUI:[16,'Copa da Suíça'],GRE:[16,'Copa da Grécia'],DEN:[16,'Copa da Dinamarca']};
const NCUP2={ENG:[32,'EFL Cup']};NCUP.USA=[32,'US Open Cup'];
const NCN={64:'32 avos',32:'16 avos',16:'Oitavas',8:'Quartas',4:'Semifinal',2:'Final'};
const ncStage=nc=>NCN[nc.pairs.length*2]||'Fase';
function ncInit(cf){
  cf=cf||NCUP[G.abroad.k];if(!cf)return null;
  const CAN=G.abroad.k==='USA'?['Toronto FC','CF Montréal','Vancouver Whitecaps']:[];
  const rows=G.clubs.filter(c=>!c.stub&&c.div>=4&&c.div<99&&c.name&&!CAN.includes(c.name)||c.id===G.user).sort((a,b)=>tierOf(a.div)-tierOf(b.div)||b.rep-a.rep);
  let size=cf[0];while(size>rows.length)size/=2;if(size<8)return null;
  let t=rows.slice(0,size).map(c=>c.id);
  if(!t.includes(G.user)){t.pop();t.push(G.user)}
  t=shuffle(t);const pairs=[];for(let i=0;i<t.length;i+=2)pairs.push([t[i],t[i+1]]);
  const R=Math.round(Math.log2(size)),NRn=NR(),slots=[];
  for(let i=0;i<R;i++){let s=Math.max(1,Math.floor(NRn*(i+1)/(R+1)));if(i&&s<=slots[i-1])s=slots[i-1]+1;slots.push(s)}
  return {s:G.season,k:G.abroad.k,name:cf[1],size,st:0,pairs,slots,hist:[],out:null,champ:null};
}
function ncSim(h,a){const g=sim52(h,a);let w=g[0]>g[1]?h:g[0]<g[1]?a:null,pen=null;if(w===null){pen=pen52(h,a);w=pen[0]>pen[1]?h:a}return {h,a,hg:g[0],ag:g[1],pen,w}}
/* fecha a fase com o resultado do técnico (ou sem ele) e prepara a próxima */
function ncAdvance(nc,userRes){
  const sn=ncStage(nc);
  const res=nc.pairs.map(p=>p.includes(G.user)&&userRes?userRes:ncSim(p[0],p[1]));
  nc.hist.push({n:sn,r:res.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,pen:r.pen,w:r.w}))});nc.hist=nc.hist.slice(-8);
  const win=res.map(r=>r.w);nc.st++;
  if(win.length===1){nc.champ=win[0];nc.pairs=[]}
  else{nc.pairs=[];for(let i=0;i<win.length;i+=2)nc.pairs.push([win[i],win[i+1]])}
  return res;
}
function ncRest(nc){for(let g=0;g<8&&!nc.champ;g++)ncAdvance(nc,null)}
hookAround('extraSync','ex53',function(next,__a){
  try{
    if(G&&G.abroad&&G.user!=null&&G.phase==='play'&&!G._lg&&G.round<NR()&&!(G.po51&&G.po51.pend)){
      for(const [key,tab] of [['nc',NCUP],['nc2',NCUP2]]){
        const cf=tab[G.abroad.k];if(!cf)continue;
        if(!G[key]||G[key].s!==G.season)G[key]=ncInit(cf);
        const nc=G[key];
        if(nc&&!nc.champ&&!nc.out&&G.round>=nc.slots[nc.st]){
          const pr=nc.pairs.find(p=>p.includes(G.user));
          if(pr){G._lg=G.fixtures[G.round];G.fixtures[G.round]=[pr.slice()];G._x={kind:'nc',key,ko:true,label:nc.name+' · '+ncStage(nc)};return}
        }
      }
    }
  }catch(e){console.error('extraSync53 '+e.message)}
  return next();
});
function finishNc(){
  const x=G._x,nc=G[x.key||'nc'],um=R.ms[R.ui],us=userSide(um),c=userClub();
  const gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg;
  for(const m of R.ms)for(const [k,s] of [['h',m.h],['a',m.a]]){
    const won=k==='h'?m.hg>m.ag:m.ag>m.hg,lost=k==='h'?m.hg<m.ag:m.ag<m.hg;
    for(const id of new Set([...s.lineup,...s.used,...s.outs])){const p=P(id);p.en=clamp(Math.round(m.en[id]-2),20,100);p.mor=clamp(p.mor+(won?3:lost?-3:0),30,100);if(Math.random()<(p.en<45?.06:.025))p.inj=ri(1,5)}}
  let pen=null,w=um.hg>um.ag?um.h.club.id:um.hg<um.ag?um.a.club.id:null;
  if(w===null){pen=shootout(um.h.club.rep,um.a.club.rep);w=pen[0]>pen[1]?um.h.club.id:um.a.club.id}
  G.fixtures[G.round]=G._lg;G._lg=null;G._x=null;
  const adv=w===G.user,sn=ncStage(nc),st=nc.st,sc=Math.max(.7,scaleOf(c)/100);
  let prize=0,note='';
  if(us==='h')prize+=+(scaleOf(c)*.012).toFixed(1);
  if(adv)prize+=(0.25+0.3*st)*sc;
  ncAdvance(nc,{h:um.h.club.id,a:um.a.club.id,hg:um.hg,ag:um.ag,pen,w});
  if(!adv){nc.out=sn;ncRest(nc);note='Eliminado: '+nc.name+' ('+sn+').';addNews(nc.name+': você caiu na fase "'+sn+'". Campeão: '+nm52(nc.champ)+'.')}
  else if(nc.champ===G.user){
    prize+=3*sc;c.humor=clamp(c.humor+10,5,100);G.board.conf=clamp(G.board.conf+6,0,100);G.trophyCup=(G.trophyCup||0)+1;
    note='CAMPEÃO: '+nc.name+'!';paperLine(c.name+' é campeão da '+nc.name+'!','Título nacional de copa.');addNews('🏆 Campeão da '+nc.name+'!');
    G.ncHist=(G.ncHist||[]).concat({s:G.season,n:nc.name,champ:c.name}).slice(-12);
  }else{
    const pr=nc.pairs.find(p=>p.includes(G.user)),opp=pr?nm52(pr[0]===G.user?pr[1]:pr[0]):'?';
    note='Você avançou! '+ncStage(nc)+' contra '+opp+'.';addNews(nc.name+': '+note);
  }
  if(nc.champ&&nc.champ!==G.user){G.ncHist=(G.ncHist||[]).concat({s:G.season,n:nc.name,champ:nm52(nc.champ)}).slice(-12)}
  G.fin.caixa=+(G.fin.caixa+prize).toFixed(1);
  G.lastRound={n:G.round,results:[{h:um.h.club.id,a:um.a.club.id,hg:um.hg,ag:um.ag,u:true}],ratings:Object.assign({},um.rt),scorers:um.scorers,stats:um.stats,user:{home:us==='h'},cup:{label:x.label,adv,pen,prize,note,ko:true}};
  c.humor=clamp(c.humor+(gf>ga?3:gf<ga?-3:0),5,100);
  try{const sd=um[us];sqcTick(new Set([...sd.lineup,...sd.used]),gf,ga)}catch(e){}
  R=null;save();return 'next';
}
hookAround('finishRound','ext53_fr53',function(next,A){
  if(G._lg&&G._x&&G._x.kind==='nc'&&R&&R.xtra)return finishNc();
  return next();
});

/* ext38: seleções completas (ciclo FIFA 2027-2030), Champions/Europa/Libertadores lite, Mundial de Clubes, Copa Intercontinental, mercado mundial */
/* código: [nome, confederação, força] */
const NATS={
 FRA:['França','UEFA',85],ESP:['Espanha','UEFA',86],ENG:['Inglaterra','UEFA',84],POR:['Portugal','UEFA',82],GER:['Alemanha','UEFA',81],NED:['Holanda','UEFA',80],ITA:['Itália','UEFA',79],BEL:['Bélgica','UEFA',77],CRO:['Croácia','UEFA',77],SUI:['Suíça','UEFA',74],DEN:['Dinamarca','UEFA',74],AUT:['Áustria','UEFA',73],NOR:['Noruega','UEFA',74],TUR:['Turquia','UEFA',72],SRB:['Sérvia','UEFA',71],UKR:['Ucrânia','UEFA',70],SWE:['Suécia','UEFA',70],POL:['Polônia','UEFA',70],SCO:['Escócia','UEFA',70],CZE:['Tchéquia','UEFA',68],HUN:['Hungria','UEFA',68],WAL:['País de Gales','UEFA',66],SVK:['Eslováquia','UEFA',65],ROU:['Romênia','UEFA',65],GRE:['Grécia','UEFA',65],IRL:['Irlanda','UEFA',63],
 BRA:['Brasil','CONMEBOL',80],ARG:['Argentina','CONMEBOL',87],URU:['Uruguai','CONMEBOL',77],COL:['Colômbia','CONMEBOL',77],ECU:['Equador','CONMEBOL',73],PAR:['Paraguai','CONMEBOL',70],CHI:['Chile','CONMEBOL',66],PER:['Peru','CONMEBOL',64],BOL:['Bolívia','CONMEBOL',62],VEN:['Venezuela','CONMEBOL',63],
 MEX:['México','CONCACAF',74],USA:['EUA','CONCACAF',73],CAN:['Canadá','CONCACAF',68],PAN:['Panamá','CONCACAF',63],CRC:['Costa Rica','CONCACAF',61],JAM:['Jamaica','CONCACAF',60],HON:['Honduras','CONCACAF',58],HAI:['Haiti','CONCACAF',57],SLV:['El Salvador','CONCACAF',55],GUA:['Guatemala','CONCACAF',54],CUW:['Curaçao','CONCACAF',56],TRI:['Trinidad e Tobago','CONCACAF',53],SUR:['Suriname','CONCACAF',52],NCA:['Nicarágua','CONCACAF',48],CUB:['Cuba','CONCACAF',48],BER:['Bermudas','CONCACAF',46],
 MAR:['Marrocos','CAF',76],SEN:['Senegal','CAF',73],EGY:['Egito','CAF',70],NGA:['Nigéria','CAF',70],CIV:['Costa do Marfim','CAF',70],ALG:['Argélia','CAF',69],TUN:['Tunísia','CAF',66],CMR:['Camarões','CAF',67],GHA:['Gana','CAF',65],MLI:['Mali','CAF',66],RSA:['África do Sul','CAF',62],COD:['RD Congo','CAF',64],BFA:['Burkina Faso','CAF',62],ANG:['Angola','CAF',58],GAB:['Gabão','CAF',58],GUI:['Guiné','CAF',60],ZAM:['Zâmbia','CAF',57],UGA:['Uganda','CAF',56],TAN:['Tanzânia','CAF',54],KEN:['Quênia','CAF',54],BEN:['Benin','CAF',55],MOZ:['Moçambique','CAF',54],CPV:['Cabo Verde','CAF',60],EQG:['Guiné Equatorial','CAF',54],
 JPN:['Japão','AFC',76],KOR:['Coreia do Sul','AFC',72],IRN:['Irã','AFC',72],AUS:['Austrália','AFC',68],KSA:['Arábia Saudita','AFC',66],QAT:['Catar','AFC',63],UZB:['Uzbequistão','AFC',62],IRQ:['Iraque','AFC',62],JOR:['Jordânia','AFC',62],UAE:['Emirados Árabes','AFC',58],CHN:['China','AFC',58],OMA:['Omã','AFC',57],BHR:['Bahrein','AFC',56],SYR:['Síria','AFC',55],PLE:['Palestina','AFC',54],KGZ:['Quirguistão','AFC',53],IND:['Índia','AFC',52],THA:['Tailândia','AFC',54],VIE:['Vietnã','AFC',53],IDN:['Indonésia','AFC',55],LBN:['Líbano','AFC',50],TJK:['Tadjiquistão','AFC',52],
 NZL:['Nova Zelândia','OFC',56],FIJ:['Fiji','OFC',40],NCL:['Nova Caledônia','OFC',40]
};
for(const k in NATS){NTN[k]=NATS[k][0];if(k!=='BRA'&&NR0[k]===undefined)NR0[k]=NATS[k][2]}
function nBox(){if(!G.nt2)G.nt2={done:{},hist:[],pools:{},pre:{}};return G.nt2}
const yearOf=()=>2026+G.season;

/* simulação de seleção para torneios: mais fiel à diferença de força que a das eliminatórias */
function nSim(a,b,ko){
  const d=(ntRating(a)-ntRating(b))/14;const la=Math.max(.25,1.25*Math.exp(d)),lb=Math.max(.25,1.05*Math.exp(-d));
  const pois=l=>{const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};
  let ga=pois(la),gb=pois(lb),pen=null,w=ga>gb?a:ga<gb?b:null;
  if(w===null&&ko){pen=shootout(ntRating(a),ntRating(b));w=pen[0]>pen[1]?a:b}
  return {a,b,ga,gb,pen,w};
}
/* torneio genérico: grupos, melhores terceiros, mata-mata */
function nTour(name,pool,gN,advN,thirdsN){
  const gs=Math.round(pool.length/gN);const groups=ntGroups(pool,gN);const firsts=[],seconds=[],thirds=[];const tables=[];
  const hasB=pool.includes('BRA');let bra=null;
  for(const g of groups){const t={};g.forEach(c=>t[c]={c,P:0,GD:0,GF:0});
    for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++){const r=nSim(g[i],g[j],false);
      if(r.ga>r.gb)t[g[i]].P+=3;else if(r.ga<r.gb)t[g[j]].P+=3;else{t[g[i]].P++;t[g[j]].P++}t[g[i]].GD+=r.ga-r.gb;t[g[j]].GD+=r.gb-r.ga;t[g[i]].GF+=r.ga;t[g[j]].GF+=r.gb}
    const o=Object.values(t).sort((x,y)=>y.P-x.P||y.GD-x.GD||y.GF-x.GF);tables.push(o.map(x=>x.c));
    firsts.push(o[0]);if(advN>=2)seconds.push(o[1]);if(thirdsN)thirds.push(o[2])}
  const best3=thirds.sort((x,y)=>y.P-x.P||y.GD-x.GD||y.GF-x.GF).slice(0,thirdsN||0);
  let cur=shuffle([...firsts,...seconds,...best3].map(x=>x.c));
  if(hasB&&!cur.includes('BRA'))bra='Fase de grupos';
  const nm=n=>n===32?'16-avos':n===16?'Oitavas':n===8?'Quartas':n===4?'Semifinal':'Final';
  let vice=null;
  while(cur.length>1){const nx=[];const lab=nm(cur.length);
    for(let i=0;i<cur.length;i+=2){const r=nSim(cur[i],cur[i+1],true);nx.push(r.w);
      if(hasB&&(cur[i]==='BRA'||cur[i+1]==='BRA')&&r.w!=='BRA')bra=lab;
      if(cur.length===2)vice=r.w===cur[i]?cur[i+1]:cur[i]}
    cur=nx}
  if(hasB&&cur[0]==='BRA')bra='Campeão';
  return {name,champ:cur[0],vice,bra,n:pool.length};
}
function nPick(conf,n,must){
  const list=Object.keys(NATS).filter(k=>NATS[k][1]===conf&&k!=='BRA'||(k==='BRA'&&conf==='CONMEBOL'));
  const sc=list.map(k=>({k,s:(k==='BRA'?ntRating('BRA'):ntRating(k))+gauss()*3+(must&&must.includes(k)?99:0)})).sort((a,b)=>b.s-a.s);
  return sc.slice(0,n).map(x=>x.k);
}
function nPoolFor(id){
  const Y=yearOf();
  if(id==='asia')return nPick('AFC',24,['KSA']);
  if(id==='afcon')return nPick('CAF',24);
  if(id==='gold')return nPick('CONCACAF',16);
  if(id==='euro')return nPick('UEFA',24,['ENG','SCO','WAL','IRL']);
  if(id==='wc'){
    const b=ntBox(),brain=b.wcQ!==false;let pool=[];
    pool=pool.concat(nPick('UEFA',16,['ESP','POR']),nPick('CAF',9,['MAR']),nPick('AFC',8),nPick('CONCACAF',6,['USA','MEX','CAN']),nPick('OFC',1));
    const sa=nPick('CONMEBOL',6).filter(k=>k!=='BRA');if(brain)sa.unshift('BRA');pool=pool.concat(sa.slice(0,6));
    const rest=Object.keys(NATS).filter(k=>!pool.includes(k)&&k!=='BRA').sort((a,b)=>ntRating(b)-ntRating(a));
    while(pool.length<48)pool.push(rest.shift());
    return pool.slice(0,48);
  }
  return [];
}
/* calendário do ciclo (2027 = ciclo 0) */
const FCAL=[
 {cy:0,id:'asia',t:'Copa da Ásia',d:'jan–fev 2027 · Arábia Saudita',w:'start'},
 {cy:0,id:'afcon',t:'Copa Africana de Nações',d:'jun–jul 2027',w:1},
 {cy:0,id:'gold',t:'Copa Ouro da CONCACAF',d:'19 jun–11 jul 2027',w:1},
 {cy:1,id:'euro',t:'Eurocopa',d:'jun–jul 2028 · Reino Unido e Irlanda',w:1},
 {cy:1,id:'ca',t:'Copa América',d:'jun–jul 2028',w:1},
 {cy:2,id:'gold',t:'Copa Ouro da CONCACAF',d:'jun–jul 2029',w:1},
 {cy:2,id:'cwc',t:'Mundial de Clubes FIFA (32 times)',d:'verão 2029',w:'cwc'},
 {cy:3,id:'wc',t:'Copa do Mundo (48 seleções)',d:'jun–jul 2030 · Espanha, Portugal e Marrocos',w:1}
];
function fevOf(cy,w){return FCAL.filter(e=>e.cy===cy&&e.w===w&&e.id!=='ca'&&e.id!=='wc'&&e.id!=='cwc')}
function nRecord(t,r,extra){const B=nBox();B.hist.unshift(Object.assign({y:yearOf(),s:G.season,t,champ:r.champ,vice:r.vice,bra:r.bra},extra||{}));B.hist=B.hist.slice(0,40);
  paperLine(NTN[r.champ]+' é campeã: '+t,'Vice: '+(r.vice?NTN[r.vice]:'—')+'. '+yearOf());}
function nRunEvent(e){
  const B=nBox();const key=e.id+yearOf();if(B.done[key])return;B.done[key]=1;
  let pool=B.pools[key]||nPoolFor(e.id);
  if(e.id==='asia'||e.id==='afcon'||e.id==='euro'){const r=nTour(e.t,pool,6,2,4);nRecord(e.t,r)}
  else if(e.id==='gold'){const r=nTour(e.t,pool,4,2,0);nRecord(e.t,r)}
}
/* pré-lista e lista final de convocados do seu clube */
function nMine(codes){const c=userClub();return c.squad.map(P).filter(p=>p&&!(p.inj>0)).filter(p=>{const n=natOf(p);return codes.includes(n)&&(n==='BRA'?braSquad().includes(p.id):p.ovr>=ntRating(n)-14)})}
function nPreList(label,codes,fin){
  const mine=nMine(codes);
  const names=mine.map(p=>nameOf(p)+' ('+NTN[natOf(p)]+')');
  mail('dir',(fin?'🏁 Convocação final: ':'📋 Pré-lista: ')+label,fin?
   (mine.length?'Lista final de 26 de cada seleção divulgada. Jogadores seus convocados:\n'+names.join('\n')+'\nEles se apresentam e desfalcam o clube durante o torneio.':'Nenhum jogador seu foi convocado na lista final de '+label+'.')
   :(mine.length?'Pré-lista (35 a 55 nomes por seleção, só esses podem ser chamados depois como reposição por lesão). Seus jogadores citados:\n'+names.join('\n'):'Nenhum jogador seu aparece na pré-lista de '+label+'.'),[],'pl'+label+(fin?'f':'p')+yearOf());
}
/* ganchos */
hookAround('ntAnnounce','na38',function(next,__a){let [i]=__a;
  const cy=cyOf();
  try{
    if(i===0&&(cy===1||cy===3)){const codes=cy===3?nPoolFor('wc'):[...nPoolFor('euro'),...QT,'MEX','USA','CAN','CRC','PAN','JAM'];nBox().pre.codes=codes;nBox().pre.cy=cy;nPreList(cy===3?'Copa do Mundo':'Eurocopa e Copa América',codes,false)}
  }catch(e){console.error('pre38 '+e.message)}
  next();
  try{
    if(i===1){
      const B=nBox(),pd=ntBox().pend;let codes=[];
      for(const e of fevOf(cy,1)){const k=e.id+yearOf();B.pools[k]=nPoolFor(e.id);codes=codes.concat(B.pools[k])}
      if(cy===1){const eu=nPoolFor('euro');B.pools['euro'+yearOf()]=eu;codes=codes.concat(eu)}
      if(cy===3){const wc=nPoolFor('wc');B.pools['wc'+yearOf()]=wc;codes=codes.concat(wc)}
      codes=[...new Set(codes)];
      const c=userClub();const base=pd?pd.ids:[];const extra=nMine(codes).filter(p=>natOf(p)!=='BRA'&&!base.includes(p.id));
      if(extra.length){const np=ntBox().pend||(ntBox().pend={i:1,type:'ami',ids:[],aw:3,neg:{},r:NTW[1]});extra.forEach(p=>np.ids.push(p.id));np.fz=(np.fz||[]).concat(extra.map(p=>p.id));np.aw=Math.max(np.aw,3);addNews(extra.length+' jogador(es) estrangeiro(s) seu(s) convocado(s) para torneios das seleções.')}
      if(cy===1||cy===3||extra.length||(pd&&pd.ids.length))nPreList(cy===3?'Copa do Mundo':cy===1?'Eurocopa e Copa América':'torneios do meio do ano',codes,true);
    }
  }catch(e){console.error('fin38 '+e.message)}
});
hookAround('ntAskPct','ap38',function(next,__a){let [id]=__a;const pd=ntBox().pend;if(pd&&pd.fz&&pd.fz.includes(id))return 0;return next()});
hookAround('ntExecute','ne38',function(next,__a){
  const pd=ntBox().pend,i=pd?pd.i:-1;next();
  try{if(i===1){const cy=cyOf();for(const e of fevOf(cy,1))nRunEvent(e);if(cy===1)nRunEvent({id:'euro',t:'Eurocopa'})}}catch(e){console.error('run38 '+e.message)}
});
/* ntWC: 48 seleções */
ntWC=function(pd,goers){
  const b=ntBox();const pool=nBox().pools['wc'+yearOf()]||nPoolFor('wc');
  const r=nTour('Copa do Mundo',pool,12,2,8);
  b.wc={champ:r.champ,braOut:r.bra==='Campeão'?null:r.bra,title:'Copa do Mundo'};
  const bra=r.bra;const res=r.champ==='BRA'?'COPA DO MUNDO: Brasil é HEXA!':(bra?'Copa do Mundo: Brasil caiu em "'+bra+'". Campeão: '+NTN[r.champ]:'Copa do Mundo: o Brasil não disputou. Campeão: '+NTN[r.champ]);
  b.hist.unshift({s:G.season,t:'Copa do Mundo',r:r.champ==='BRA'?'Brasil campeão':(bra?'Brasil eliminado em '+bra:'Brasil fora')+' · campeão '+NTN[r.champ]});
  nBox().hist.unshift({y:yearOf(),s:G.season,t:'Copa do Mundo',champ:r.champ,vice:r.vice,bra:bra||'Não disputou'});
  paperLine(NTN[r.champ]+' é campeã do mundo','Final contra '+(r.vice?NTN[r.vice]:'—')+'. Copa de 48 seleções.');
  const aw=r.champ==='BRA'||bra==='Final'||bra==='Semifinal'?5:bra==='Fase de grupos'?3:4;pd.aw=aw;
  if(r.champ==='BRA'){const c=userClub();c.humor=clamp(c.humor+3,5,100);for(const id of goers){const p=P(id);if(p&&natOf(p)==='BRA'){p.ovr=clamp(p.ovr+1,40,95)}}}
  return res;
};
/* ---------- Champions (fase de liga), Europa League, Libertadores, CONCACAF, Ásia, África, Intercontinental, Mundial ---------- */
function wTeamsTop(k,a,b){return wTable(k).slice(a,b)}
function wPair(list){const out=[];const n=list.length;for(let i=0;i<n/2;i++)out.push([list[i],list[n-1-i]]);return out}
function wTie(a,b){const [g1,g2]=wMatch(a,b);const [h2,h1]=wMatch(b,a);const A=g1+h1,B=g2+h2;return A>B?a:B>A?b:(Math.random()<.5+(a.r-b.r)/70?a:b)}
function wBracket(list){let cur=list.slice();while(cur.length>1){cur=wPair(cur).map(([a,b])=>wTie(a,b))}return cur[0]}
wUcl=function(){
  let teams=[].concat(wTeamsTop('ENG',0,4),wTeamsTop('ESP',0,4),wTeamsTop('ITA',0,4),wTeamsTop('GER',0,4),wTeamsTop('FRA',0,3),wTeamsTop('POR',0,2),wTeamsTop('ENG',4,5),wTeamsTop('ESP',4,5),wTeamsTop('ITA',4,5),wTeamsTop('NED',0,2),wTeamsTop('BEL',0,1),wTeamsTop('TUR',0,2),wTeamsTop('SCO',0,1),wTeamsTop('AUT',0,1),wTeamsTop('SUI',0,1),wTeamsTop('GRE',0,1),wTeamsTop('DEN',0,1));
  teams=teams.sort((a,b)=>b.r*b.f-a.r*a.f).slice(0,24);
  const pts=new Map(teams.map(t=>[t,0]));
  for(let r=0;r<8;r++){const sh=shuffle(teams.slice());for(let i=0;i<sh.length-1;i+=2){const [a,b]=[sh[i],sh[i+1]];const [ga,gb]=wMatch(a,b);if(ga>gb)pts.set(a,pts.get(a)+3);else if(gb>ga)pts.set(b,pts.get(b)+3);else{pts.set(a,pts.get(a)+1);pts.set(b,pts.get(b)+1)}}}
  const order=teams.slice().sort((a,b)=>pts.get(b)-pts.get(a)||b.r*b.f-a.r*a.f);
  const direct=order.slice(0,8),play=order.slice(8,24);
  const pw=[];for(let i=0;i<8;i++)pw.push(wTie(play[i],play[15-i]));
  let cur=[...direct,...pw];let last=null;
  while(cur.length>1){const nx=[];const n=cur.length;for(let i=0;i<n/2;i++){const a=cur[i],b=cur[n-1-i];const w=wTie(a,b);nx.push(w);if(n===2)last=[w,w===a?b:a]}cur=nx}
  return {ch:cur[0],vice:last?last[1]:null};
};
function wUel(){
  const teams=[].concat(wTeamsTop('ENG',5,7),wTeamsTop('ESP',5,7),wTeamsTop('ITA',5,7),wTeamsTop('GER',5,7),wTeamsTop('FRA',3,5),wTeamsTop('POR',2,4),wTeamsTop('ENG',7,8),wTeamsTop('ESP',7,8),wTeamsTop('NED',2,4),wTeamsTop('BEL',1,3),wTeamsTop('TUR',2,3),wTeamsTop('SCO',1,2),wTeamsTop('AUT',1,3),wTeamsTop('SUI',1,3),wTeamsTop('GRE',1,3),wTeamsTop('DEN',1,3));
  return wBracket(teams.sort((a,b)=>b.r-a.r).slice(0,16));
}
function wSA(){
  const bra=tableRows(0).slice(0,6).map(c=>({n:c.name,sg:c.sig,r:c.rep,f:1,c1:c.c1,c2:c.c2,c3:c.c3,pat:c.pat,id:c.id,bra:1}));
  const t=[].concat(bra,wTeamsTop('ARG',0,4),wTeamsTop('URU',0,2),wTeamsTop('COL',0,2),wTeamsTop('CHI',0,2),wTeamsTop('PAR',0,2),wTeamsTop('ECU',0,2),wTeamsTop('PER',0,1),wTeamsTop('BOL',0,1),wTeamsTop('VEN',0,1));
  return t.sort((a,b)=>b.r*(b.f||1)-a.r*(a.f||1));
}
const XASIA=[{n:'Urawa Reds',r:64},{n:'Ulsan HD',r:63},{n:'Al Sadd',r:62},{n:'Shanghai Port',r:60}];
const XAFR=[{n:'Al Ahly',r:68},{n:'Pyramids',r:67},{n:'Mamelodi Sundowns',r:66},{n:'Wydad Casablanca',r:64},{n:'Espérance de Tunis',r:63},{n:'Zamalek',r:62},{n:'Raja Casablanca',r:62},{n:'TP Mazembe',r:60}];
const XOFC=[{n:'Auckland City',r:50}];
const xMk=o=>Object.assign({f:1,c1:'#444444',c2:'#ffffff',c3:'#444444',pat:'solid',id:9000+wHash(o.n)%900,sg:o.n.slice(0,3).toUpperCase()},o);
function wCont(){
  const W=G.wd;const rec=W.hist[W.hist.length-1];if(!rec||rec.s!==G.season)return;
  try{rec.uel=wUel().n}catch(e){console.error('uel '+e.message)}
  let lib=null;
  try{const sa=wSA();lib=wBracket(sa.slice(0,16).sort((a,b)=>b.r-a.r));
    if(G.cont&&G.cont.s===G.season&&G.cont.comp==='LIB'&&G.cont.champ){lib={n:userClub().name,sg:userClub().sig,r:userClub().rep,f:1,id:userClub().id,bra:1,c1:userClub().c1,c2:userClub().c2,c3:userClub().c3,pat:userClub().pat}}
    rec.lib=lib.n}catch(e){console.error('lib '+e.message)}
  let conc=null,asi=null,afr=null;
  try{conc=wBracket([].concat(wTeamsTop('MEX',0,4),wTeamsTop('USA',0,4)).sort((a,b)=>b.r-a.r));rec.conc=conc.n}catch(e){}
  try{asi=wBracket([].concat(wTeamsTop('KSA',0,3),wTeamsTop('JPN',0,2),wTeamsTop('KOR',0,1),wTeamsTop('CHN',0,1),XASIA.filter(x=>x.n==='Al Sadd').map(xMk)).sort((a,b)=>b.r-a.r));rec.asia=asi.n}catch(e){}
  try{afr=wBracket([].concat(wTeamsTop('EGY',0,2),wTeamsTop('MAR',0,2),wTeamsTop('RSA',0,2),XAFR.filter(x=>['Espérance de Tunis','TP Mazembe'].includes(x.n)).map(xMk)).sort((a,b)=>b.r-a.r));rec.afr=afr.n}catch(e){}
  // Copa Intercontinental (anual)
  try{const ucl=W.hist[W.hist.length-1].ucl;const uc=Object.values(W.lg).flatMap(l=>l.cl).find(c=>c.n===ucl);
    let ch=wBracket([conc,asi,afr,xMk(XOFC[0])].filter(Boolean));const sa=wTie(lib,ch);const fin=wTie(uc,sa);
    rec.inter=fin.n;rec.interv=fin===uc?sa.n:uc.n;
    paperLine(fin.n+' vence a Copa Intercontinental FIFA','Final contra '+rec.interv+'.');
    W.keep=W.keep||[];W.keep.push({s:G.season,ucl:uc&&uc.n,lib:lib&&lib.n,conc:conc&&conc.n,asi:asi&&asi.n,afr:afr&&afr.n});W.keep=W.keep.slice(-4)}catch(e){console.error('inter '+e.message)}
  // Mundial de Clubes a cada 4 anos (2029 = ciclo 2)
  try{if(cyOf()===2)wCwc()}catch(e){console.error('cwc '+e.message)}
}
function wCwc(){
  const W=G.wd;const res=n=>{if(!n)return null;for(const k in W.lg){const c=W.lg[k].cl.find(x=>x.n===n);if(c)return c}
    const g=G.clubs.find(x=>x.name===n);if(g)return {n:g.name,sg:g.sig,r:g.rep,f:1,id:g.id,bra:1,c1:g.c1,c2:g.c2,c3:g.c3,pat:g.pat};
    const x=[].concat(XAFR,XASIA,XOFC).find(y=>y.n===n);return x?xMk(x):null};
  const K=(W.keep||[]).map(k=>({s:k.s,ucl:res(k.ucl),lib:res(k.lib),conc:res(k.conc),asi:res(k.asi),afr:res(k.afr)}));const names=new Set();const uefa=[],sa=[],asia=[],caf=[],conc=[];
  const add=(arr,t,max)=>{if(t&&!names.has(t.n)&&arr.length<max){names.add(t.n);arr.push(t)}};
  for(const k of K.slice().reverse()){add(uefa,k.ucl,12);add(sa,k.lib,6);add(conc,k.conc,4);add(asia,k.asi,4);add(caf,k.afr,4)}
  const lg=k=>W.lg[k].cl.slice().sort((a,b)=>b.r-a.r);
  for(const c of [].concat(lg('ENG'),lg('ESP'),lg('GER'),lg('ITA'),lg('FRA'),lg('POR')).sort((a,b)=>b.r-a.r))add(uefa,c,12);
  for(const c of wSA())add(sa,c,6);
  for(const c of [].concat(lg('MEX'),lg('USA')).sort((a,b)=>b.r-a.r))add(conc,c,4);
  for(const c of [].concat(lg('KSA'),lg('JPN'),lg('KOR'),lg('CHN')).sort((a,b)=>b.r-a.r))add(asia,c,4);
  for(const c of [].concat(lg('EGY'),lg('MAR'),lg('RSA')).sort((a,b)=>b.r-a.r))add(caf,c,4);
  const host=lg('USA')[0];names.add(host.n);
  const oc=xMk(XOFC[0]);
  const all=[].concat(uefa,sa,asia,caf,conc,[oc,host]);
  const pool=shuffle(all.slice(0,32));
  const mine=pool.find(c=>c.bra&&c.id===G.user);const path=[];const sc=(a,b,x,y)=>a.n+' '+x+'–'+y+' '+b.n;
  const groups=Array.from({length:8},(_,i)=>pool.filter((_,j)=>j%8===i));
  const adv=[];
  for(const g of groups){const t=g.map(c=>({c,P:0,GD:0}));for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){const [a,b]=wMatch(g[i],g[j]);if(mine&&(g[i]===mine||g[j]===mine))path.push('Grupo: '+sc(g[i],g[j],a,b));if(a>b)t[i].P+=3;else if(b>a)t[j].P+=3;else{t[i].P++;t[j].P++}t[i].GD+=a-b;t[j].GD+=b-a}
    t.sort((x,y)=>y.P-x.P||y.GD-x.GD);adv.push(t[0].c,t[1].c)}
  let cur=shuffle(adv),stage='Oitavas',rank=1;const reach={};const u=G.user;let fin=null,vice=null;
  adv.forEach(c=>{reach[c.n]=1});
  while(cur.length>1){const nx=[];const lv=cur.length===16?2:cur.length===8?3:cur.length===4?4:5;
    for(let i=0;i<cur.length;i+=2){const a=cur[i],b=cur[i+1];const [ga,gb]=wMatch(a,b);const w=ga>gb?a:gb>ga?b:(Math.random()<.5+(a.r-b.r)/70?a:b);if(mine&&(a===mine||b===mine))path.push(['','Oitavas','Quartas','Semifinal','Final'][lv-1]+': '+sc(a,b,ga,gb)+(ga===gb?' (pên. '+w.n+')':''));nx.push(w);reach[w.n]=lv;if(cur.length===2)vice=w===a?b:a}
    cur=nx}
  fin=cur[0];reach[fin.n]=6;
  const rec=W.hist[W.hist.length-1];rec.cwc=fin.n;rec.cwcv=vice?vice.n:'';
  paperLine(fin.n+' é campeão do Mundial de Clubes','Final contra '+(vice?vice.n:'—')+'. Torneio com 32 times em '+yearOf()+'.');
  if(mine){const lv=reach[mine.n]||0;const prize=[20,40,70,110,160,230][lv]||20;G.fin.caixa=+(G.fin.caixa+prize).toFixed(1);
    const lab=['fase de grupos','oitavas','quartas','semifinal','final','campeão'][lv]||'fase de grupos';
    mail('win','🌍 Mundial de Clubes: '+(lv>=5?'CAMPEÃO!':'você foi até '+lab),'Seu clube disputou o Mundial de Clubes de 32 times e chegou em: '+lab+'.\n\nSeus jogos:\n'+path.join('\n')+'\n\nPremiação: '+mi(prize)+'.',[],'cwc'+G.season);
    userClub().humor=clamp(userClub().humor+(lv>=5?15:4),5,100)}
}
hookAround('wEnd','we38',function(next,__a){const was=G.wd&&G.wd.es===G.season;next();try{if(!was)wCont()}catch(e){console.error('wCont '+e.message)}});
/* início de temporada: Copa da Ásia (jan) no começo do ciclo; Gold Cup 2029 já vem pelo ciclo */
hookAround('finishRound','ext38_fr38',function(next,A){const rd=G.round;const r=next();try{if(rd===4&&cyOf()===0)nRunEvent(FCAL[0])}catch(e){console.error('asia38 '+e.message)}return r});

/* ---------- mercado mundial (aba Mundo em Procura) ---------- */
function wmRefresh(){
  const W=wd();const out=[];const all=[];for(const L of WLD)for(const c of W.lg[L.k].cl)all.push({c,k:L.k});
  const rep=userClub().rep;
  for(let i=0;i<36;i++){
    const x=pick(all);const ovr=clamp(Math.round(rep+ri(-14,6)+(x.c.r-70)*.15),52,86);
    const br=Math.random()<.22;const nat=br?'BRA':NAT37[x.k]?x.k:'ESP';
    const nm=br?pick(FN)+' '+pick(LN):wName(NAT37[x.k]?x.k:'ESP');
    const age=ri(19,32);const role=pick(['GOL','ZAG','ZAG','LAT','VOL','MEI','MEI','PNT','ATA','ATA']);
    const tmp={ovr,age};const fee=+(valueOf(tmp)*rnd(1.0,1.3)).toFixed(1);
    out.push({n:nm,role,ovr,age,nat,club:x.c.n,ck:x.k,fee});
  }
  W.mk={s:G.season,r:G.round,l:out.sort((a,b)=>b.ovr-a.ovr)};
}
hookAround('vMercado','vm38',function(next,__a){
  const saved=S.tab;
  if(saved!=='mundo'){
    const h0=next();const m0=h0.match(/<div class="seg sm scroll">[\s\S]*?<\/div>/);if(!m0)return h0;
    return h0.replace(m0[0],m0[0].replace(/(data-t="ofertas">[^<]*<\/button>)/,'$1<button class="" data-a="tab" data-t="mundo">Mundo</button>'));
  }
  S.tab='ofertas';let h;try{h=next()}finally{S.tab=saved}
  const m=h.match(/<div class="seg sm scroll">[\s\S]*?<\/div>/);if(!m)return h;
  let tabs=m[0].replace(/(data-t="ofertas">[^<]*<\/button>)/,'$1<button class="on" data-a="tab" data-t="mundo">Mundo</button>');
  tabs=tabs.replace(/class="on"( data-a="tab" data-t="ofertas")/,'class=""$1');
  const W=wd();if(!W.mk||W.mk.s!==G.season||W.mk.r+10<G.round)wmRefresh();
  const op=winOpen();
  const rows=W.mk.l.map((p,i)=>`<div class="mrow"><span class="pos">${ROLEABB[p.role]||p.role}</span><span class="nm">${esc(p.n)}<small>${esc(p.club)} · ${NTN[p.nat]||p.nat} · ${p.age}a · OVR ${p.ovr}</small></span><span class="col"><b>${mi(p.fee)}</b><button class="btn sm" data-a="wbuy" data-i="${i}" ${op?'':'disabled'}>Contratar</button></span></div>`).join('');
  return `<div class="wrap">${tabs}<div class="hint">Jogadores de clubes dos 10+ países do jogo. Só dá pra contratar com o mercado aberto. A lista renova a cada janela. Elenco: ${userClub().squad.length}/30. ${op?'':'🔴 Mercado fechado.'}</div>${rows}</div>`;
});
Object.assign(A,{wbuy(d){
  const W=wd(),p=W.mk&&W.mk.l[+d.i],c=userClub();
  if(!p){return}
  if(!winOpen()){toast('Mercado fechado.');return}
  if(c.squad.length>=30){toast('Elenco cheio (máximo 30).');return}
  if(G.fin.caixa<p.fee){toast('Caixa insuficiente.');return}
  const pl=mkPlayer(p.role,p.ovr,p.age,c.id,p.n,false);
  try{NATF[p.n]=p.nat}catch(e){}pl.nat=p.nat;
  G.fin.caixa=+(G.fin.caixa-p.fee).toFixed(2);c.squad.push(pl.id);pl.mor=75;
  W.mk.l.splice(+d.i,1);wLog(`${p.n} (${p.club}) → ${c.sig} (você)`,p.fee);
  paperLine(`${c.name} contrata ${p.n}, do ${p.club}`,`Negócio de R$ ${p.fee.toFixed(1)} mi.`);
  try{autoPick(c)}catch(e){}
  save();toast('Contratado: '+p.n);render();
}});

/* ---------- tela Mundo: calendário, regras, campeões ---------- */
const _vc38=vComp;vComp=function(){
  let h=_vc38();
  if(S.ctab!=='mundo')return h;
  const k=S.wc;
  if(k&&WRULES[k]){
    const R=WRULES[k];
    return h.replace(/<\/div>$/,`<div class="card"><div class="k">📘 Regras da liga</div>${R.txt.map(t=>`<p class="news">• ${esc(t)}</p>`).join('')}<p class="news">Simplificado do regulamento real. Aqui só a primeira divisão é simulada.</p></div></div>`);
  }
  const B=nBox(),cy=cyOf(),Y=yearOf();
  const cal=FCAL.map(e=>{const y=2027+e.cy+(Math.floor((G.season-1)/4)*4);const done=B.hist.find(x=>x.t===e.t.replace(/ \(.*\)/,'')&&Math.abs(x.y-y)<1)||(e.id==='ca'&&(B.hist.length&&ntBox().hist.find(x=>x.t==='Copa América'&&x.s===(e.cy+1+Math.floor((G.season-1)/4)*4))));
    const past=(G.season-1)%4>e.cy;const now=(G.season-1)%4===e.cy;
    return `<div class="res"><span>${e.cy+2027+Math.floor((G.season-1)/4)*4} · ${esc(e.t)}<br><small>${esc(e.d)}</small></span><b>${past?'✔':now?'este ano':'em breve'}</b></div>`}).join('');
  const hist=B.hist.slice(0,10).map(x=>`<div class="res"><span>${x.y} · ${esc(x.t)}<br><small>${x.bra?'Brasil: '+esc(x.bra):''}</small></span><b>${esc(NTN[x.champ]||x.champ)}</b></div>`).join('');
  const W=wd();const hs=W.hist.slice(-6).reverse();
  const cont=hs.length?`<div class="card"><div class="k">🏆 Campeões continentais e mundiais</div>${hs.map(x=>`<div class="res"><span>T${x.s}<br><small>Champions: ${esc(x.ucl||'—')} · Europa: ${esc(x.uel||'—')} · Liberta: ${esc(x.lib||'—')}<br>CONCACAF: ${esc(x.conc||'—')} · Ásia: ${esc(x.asia||'—')} · África: ${esc(x.afr||'—')}</small></span><b>${esc(x.inter||'—')}${x.cwc?'<br><small>Mundial: '+esc(x.cwc)+'</small>':''}</b></div>`).join('')}<p class="news">À direita: campeão da Copa Intercontinental (e do Mundial de Clubes nos anos de Mundial).</p></div>`:'';
  const card=`<div class="card"><div class="k">📅 Calendário FIFA do ciclo (4 anos)</div>${cal}<p class="news">Datas baseadas no calendário FIFA divulgado. Seus jogadores são convocados pelas seleções deles, com pré-lista e convocação final nos anos de Copa e Eurocopa.</p></div>${hist?`<div class="card"><div class="k">🌍 Campeões de seleções</div>${hist}</div>`:''}${cont}`;
  return h.replace(/<div class="card"><div class="k">🌎 Campeonatos<\/div>/,card+'<div class="card"><div class="k">🌎 Campeonatos</div>');
};

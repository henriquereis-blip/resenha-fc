/* ext23: Fase 5 (parte 3) — seleções: datas FIFA, convocações, eliminatórias, Copa América e Copa do Mundo */
const NTW=[6,17,25,29,34];            // rodada do campeonato em que cai cada data FIFA (mar, jun, set, out, nov)
const NATF={'Arrascaeta':'URU','De La Cruz':'URU','Gustavo Gómez':'PAR','Germán Cano':'ARG','Calleri':'ARG','Richard Ríos':'COL','Rodrigo Garro':'ARG','Jhon Arias':'COL','Savarino':'VEN','Flaco López':'ARG','Borré':'COL','Emiliano Martínez':'ARG','Rossi':'ARG','Agustín Rossi':'ARG','Ramón Sosa':'PAR','Enner Valencia':'ECU','Pulgar':'CHI','Memphis Depay':'NED'};
const natOf=p=>p.nat||NATF[String(p.name).replace('*','')]||'BRA';
const QT=['BRA','ARG','URU','COL','ECU','PAR','CHI','PER','BOL','VEN'];
const NR0={BRA:0,ARG:80,URU:76,COL:76,ECU:72,PAR:69,CHI:66,PER:64,BOL:62,VEN:63,FRA:84,ESP:83,ENG:82,POR:81,GER:80,ITA:79,NED:79,BEL:77,CRO:76,MEX:73,USA:72,JPN:72,KOR:70,SEN:71,MAR:72,CAN:66,CRC:61,PAN:61,JAM:59,AUS:68,SUI:73,DEN:74,TUR:72,SCO:70,AUT:72,GRE:66,CHN:58,EGY:70,RSA:62};
const FRI=['FRA','ESP','ENG','POR','GER','ITA','NED','BEL','CRO','MEX','USA','JPN','SEN','MAR','SUI','DEN','KOR','AUS'];
const NTN={BRA:'Brasil',ARG:'Argentina',URU:'Uruguai',COL:'Colômbia',ECU:'Equador',PAR:'Paraguai',CHI:'Chile',PER:'Peru',BOL:'Bolívia',VEN:'Venezuela',FRA:'França',ESP:'Espanha',ENG:'Inglaterra',POR:'Portugal',GER:'Alemanha',ITA:'Itália',NED:'Holanda',BEL:'Bélgica',CRO:'Croácia',MEX:'México',USA:'EUA',JPN:'Japão',KOR:'Coreia',SEN:'Senegal',MAR:'Marrocos',CAN:'Canadá',CRC:'Costa Rica',PAN:'Panamá',JAM:'Jamaica',AUS:'Austrália',SUI:'Suíça',DEN:'Dinamarca',TUR:'Turquia',SCO:'Escócia',AUT:'Áustria',GRE:'Grécia',CHN:'China',EGY:'Egito',RSA:'África do Sul'};
const WTYPE={ami:'Amistoso',elim:'Eliminatórias',dec:'Eliminatórias (jogo decisivo)',ca:'Copa América',wc:'Copa do Mundo'};

function ntBox(){
  if(!G.nt)G.nt={rel:60,pend:null,last:-1,q:null,hist:[],log:[],cy:0,wc:null,ca:null,asks:0,rt:{}};
  return G.nt;
}
const cyOf=()=>(G.season-1)%4;
/* v120: vices de Copa do Mundo corrigidos (Brasil: 1950 e 1998). Hungria 1938/1954, Suécia 1958 entram com o peso de vice. Títulos e vices conferidos com o histórico completo das Copas. */
/* v110: tradição da seleção = forma recente + história, buff de até +2 na força (ajuste leve; o principal é o nível dos jogadores).
   rec = pontos nas últimas 5 Copas do Mundo (2006–2022): campeão 3, vice 2, 3º 1,5, 4º 1, quartas 0,5.
   wc = títulos de Copa do Mundo · wcv = vices de Copa do Mundo · euro = Eurocopas · ca = Copas América.
   Fórmula: 0,3·rec + 0,15·wc + 0,05·wcv + 0,05·euro + 0,02·ca, teto 2. Títulos antigos pesam menos que a forma recente. */
const NT_TRAD={
  BRA:{rec:3,wc:5,wcv:2,euro:0,ca:9},  ARG:{rec:6,wc:3,wcv:3,euro:0,ca:16}, URU:{rec:1.5,wc:2,wcv:0,euro:0,ca:15},
  ITA:{rec:3,wc:4,wcv:2,euro:2,ca:0},  GER:{rec:6,wc:4,wcv:4,euro:3,ca:0}, FRA:{rec:7.5,wc:2,wcv:2,euro:2,ca:0},
  ESP:{rec:3,wc:1,wcv:0,euro:3,ca:0},  ENG:{rec:2,wc:1,wcv:0,euro:0,ca:0}, NED:{rec:4,wc:0,wcv:3,euro:0,ca:0},
  POR:{rec:1.5,wc:0,wcv:0,euro:1,ca:0}, BEL:{rec:2,wc:0,wcv:0,euro:0,ca:0}, CRO:{rec:3.5,wc:0,wcv:1,euro:0,ca:0},
  HUN:{rec:0,wc:0,wcv:2,euro:0,ca:0}, SWE:{rec:0,wc:0,wcv:1,euro:0,ca:0},
  CHI:{rec:0,wc:0,wcv:0,euro:0,ca:2}, PAR:{rec:0,wc:0,wcv:0,euro:0,ca:2}, COL:{rec:0,wc:0,wcv:0,euro:0,ca:1},
  PER:{rec:0,wc:0,wcv:0,euro:0,ca:2}, MEX:{rec:0,wc:0,wcv:0,euro:0,ca:1}
};
function ntTradBuff(code){const t=NT_TRAD[code];if(!t)return 0;return Math.min(2,0.3*t.rec+0.15*t.wc+0.05*t.wcv+0.05*t.euro+0.02*t.ca)}
function ntRating(code){const b=ntBox();const base=code==='BRA'?(b.braR!==undefined?b.braR:braRating()):(b.rt[code]!==undefined?b.rt[code]:NR0[code]);return base+ntTradBuff(code)}
function braSquad(){
  const all=Object.values(G.players).filter(p=>p.club>=0&&natOf(p)==='BRA'&&!p.retired);
  const q={GK:3,DEF:8,MID:8,ATA:7},out=[];
  for(const g of ['GK','DEF','MID','ATA']){out.push(...all.filter(p=>p.pos===g).sort((a,b)=>b.ovr-a.ovr).slice(0,q[g]).map(p=>p.id))}
  return out;
}
function braRating(){
  const s=braSquad().map(id=>P(id).ovr).sort((a,b)=>b-a).slice(0,14);
  return s.length?s.reduce((a,b)=>a+b,0)/s.length-1:78;
}
function ntSim(a,b,ko){
  const d=(ntRating(a)-ntRating(b))/24;const la=Math.max(.3,1.25*Math.exp(d)),lb=Math.max(.3,1.05*Math.exp(-d));
  const pois=l=>{const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};
  let ga=pois(la),gb=pois(lb),pen=null,w=ga>gb?a:ga<gb?b:null;
  if(w===null&&ko){pen=shootout(ntRating(a),ntRating(b));w=pen[0]>pen[1]?a:b}
  return {a,b,ga,gb,pen,w};
}
function ntQInit(){
  const b=ntBox();const arr=QT.slice(),n=10,rounds=[];
  for(let r=0;r<n-1;r++){const md=[];for(let i=0;i<n/2;i++){let h=arr[i],a=arr[n-1-i];if((r+i)%2)[h,a]=[a,h];md.push([h,a])}rounds.push(md);arr.splice(1,0,arr.pop())}
  const sched=[...rounds,...rounds.map(m=>m.map(([h,a])=>[a,h]))];
  const tbl={};QT.forEach(c=>tbl[c]={J:0,P:0,V:0,E:0,D:0,GP:0,GC:0});
  b.q={sched,tbl,md:0,done:false,qual:null};
  for(const c of QT)if(c!=='BRA')b.rt[c]=NR0[c]+rnd(-2,2);
}
function ntQDay(){
  const b=ntBox(),q=b.q;if(!q||q.md>=18)return null;let bra=null;
  for(const [h,a] of q.sched[q.md]){const r=ntSim(h,a,false);const t1=q.tbl[h],t2=q.tbl[a];t1.J++;t2.J++;t1.GP+=r.ga;t1.GC+=r.gb;t2.GP+=r.gb;t2.GC+=r.ga;
    if(r.ga>r.gb){t1.V++;t1.P+=3;t2.D++}else if(r.ga<r.gb){t2.V++;t2.P+=3;t1.D++}else{t1.E++;t2.E++;t1.P++;t2.P++}
    if(h==='BRA'||a==='BRA')bra=r}
  q.md++;
  if(q.md>=18){q.done=true;const o=ntQOrder();q.qual=o.slice(0,6);b.wcQ=q.qual.includes('BRA');
    b.log.unshift({t:'Eliminatórias encerradas: Brasil terminou em '+(o.indexOf('BRA')+1)+'º'+(b.wcQ?' e está na Copa do Mundo!':' e FICOU DE FORA da Copa.')});}
  return bra;
}
function ntQOrder(){const t=ntBox().q.tbl;return QT.slice().sort((x,y)=>t[y].P-t[x].P||(t[y].GP-t[y].GC)-(t[x].GP-t[x].GC)||t[y].GP-t[x].GP)}
function ntDecisive(){
  const q=ntBox().q;if(!q||q.md<16)return false;
  const o=ntQOrder(),t=q.tbl,left=18-q.md,inn=o.slice(0,6).includes('BRA');
  if(inn){const p7=Math.max(...o.slice(6).map(c=>t[c].P+3*left));return !(t.BRA.P>p7)}
  return t.BRA.P+3*left>=t[o[5]].P;
}
/* tipo da data FIFA de acordo com o ciclo de 4 anos (2027 = ciclo 0) */
function wTypeOf(i){
  const y=cyOf();
  if(y===0)return i>=2?'elim':'ami';
  if(y===1)return i===1?'ca':i===4||i===0||i===2||i===3?'elim':'ami';
  if(y===2)return (i===0||i===2)?'elim':'ami';
  return i===1&&ntBox().wcQ!==false?'wc':'ami';
}
function awayRounds(t){return t==='ca'?3:t==='wc'?4:1}
function ntAnnounce(i){
  const b=ntBox();b.braR=undefined;let type=wTypeOf(i);
  if(type==='elim'&&b.q&&b.q.md>=18)type='ami';
  if(type==='elim'&&ntDecisive())type='dec';
  const c=userClub();const bra=new Set(braSquad());
  const ids=c.squad.filter(id=>{const p=P(id);if(p.inj>0)return false;const n=natOf(p);
    if(n==='BRA')return bra.has(id);
    return p.ovr>=72&&Math.random()<.85});
  if(!ids.length)return;
  b.pend={i,type,ids,aw:awayRounds(type),neg:{},r:NTW[i]};
  addNews('Data FIFA: '+ids.length+' jogador(es) seu(s) convocado(s) ('+WTYPE[type]+').');
}
function ntAskPct(id){
  const b=ntBox(),pd=b.pend;if(!pd||pd.type==='ca'||pd.type==='wc'||pd.type==='dec')return 0;
  const p=P(id);let v=pd.type==='ami'?.7:.38;v+=(b.rel-60)/220;if(p.ovr>=82)v-=.12;v-=.08*(b.asks||0);
  return clamp(v,.05,.9);
}
function ntAsk(id){
  const b=ntBox(),pd=b.pend;if(!pd||pd.neg[id])return;
  const pc=ntAskPct(id);if(pc<=0)return;b.asks=(b.asks||0)+1;
  if(Math.random()<pc){pd.neg[id]='ok';b.rel=clamp(b.rel-2,0,100);const p=P(id);p.mor=clamp(p.mor-(p.ovr>=80?3:1),30,100);toast('CBF liberou '+nameOf(p)+'.')}
  else{pd.neg[id]='no';b.rel=clamp(b.rel-5,0,100);toast('CBF recusou a liberação.')}
  save();
}
/* executa a data FIFA: jogos das seleções e jogadores saem do clube */
function ntExecute(){
  const b=ntBox(),pd=b.pend;if(!pd)return;b.pend=null;b.braR=braRating();
  const type=pd.type;let res='';const goers=pd.ids.filter(id=>pd.neg[id]!=='ok');
  if(type==='ami'){const o=pick(FRI);const r=ntSim('BRA',o,false);res='Amistoso: Brasil '+r.ga+' x '+r.gb+' '+NTN[o];
    b.rt[o]=NR0[o]+rnd(-2,2)}
  else if(type==='elim'||type==='dec'){
    const r1=ntQDay();const r2=ntQDay();
    const s=[r1,r2].filter(Boolean).map(r=>NTN[r.a]+' '+r.ga+' x '+r.gb+' '+NTN[r.b]).join(' | ');res='Eliminatórias: '+s+' · Brasil em '+(ntQOrder().indexOf('BRA')+1)+'º';
  }else if(type==='ca'){res=ntCA(pd)}
  else if(type==='wc'){res=ntWC(pd,goers)}
  b.log.unshift({t:res,s:G.season,r:G.round});b.log=b.log.slice(0,14);
  for(const id of goers){const p=P(id);if(!p)continue;p.ntw=pd.aw;if(Math.random()<.05){p.inj=ri(2,6);addNews(nameOf(p)+' se lesiona na seleção.')}}
  b.last=pd.i;b.braR=undefined;
  if(goers.length)addNews('Seleção: '+goers.map(id=>lastName(P(id).name)).join(', ')+' se apresentam e desfalcam o clube por '+pd.aw+' rodada(s). '+res);
}
function ntGroups(codes,n){const arr=shuffle(codes.slice());return Array.from({length:n},(_,i)=>arr.filter((_,j)=>j%n===i))}
function ntTourney(pool,gN,title){
  const groups=ntGroups(pool,gN);let braPath='',braOut=null,games=0;
  const adv=[];
  for(const g of groups){const t={};g.forEach(c=>t[c]={P:0,GD:0});
    for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++){const r=ntSim(g[i],g[j],false);
      if(r.ga>r.gb)t[g[i]].P+=3;else if(r.ga<r.gb)t[g[j]].P+=3;else{t[g[i]].P++;t[g[j]].P++}t[g[i]].GD+=r.ga-r.gb;t[g[j]].GD+=r.gb-r.ga;
      if(g[i]==='BRA'||g[j]==='BRA')games++}
    const o=g.slice().sort((x,y)=>t[y].P-t[x].P||t[y].GD-t[x].GD);adv.push(o[0],o[1])}
  let cur=adv;const names=cur.length>=16?['Oitavas','Quartas','Semifinal','Final']:['Quartas','Semifinal','Final'];
  let stage='Fase de grupos';if(!cur.includes('BRA')){braOut='Fase de grupos'}
  while(cur.length>1){const nx=[];const nm=cur.length===16?'Oitavas':cur.length===8?'Quartas':cur.length===4?'Semifinal':'Final';
    for(let i=0;i<cur.length;i+=2){const r=ntSim(cur[i],cur[i+1],true);nx.push(r.w);if(cur[i]==='BRA'||cur[i+1]==='BRA'){games++;if(r.w!=='BRA'&&!braOut)braOut=nm}}
    cur=nx}
  const champ=cur[0];
  return {champ,braOut,games,title};
}
function ntCA(pd){
  const b=ntBox();const pool=[...QT,'MEX','USA','CAN','CRC','PAN','JAM'];
  const r=ntTourney(pool,4,'Copa América');
  b.ca=r;const res=r.champ==='BRA'?'COPA AMÉRICA: Brasil CAMPEÃO!':'Copa América: Brasil caiu na fase "'+r.braOut+'". Campeão: '+NTN[r.champ];
  b.hist.unshift({s:G.season,t:'Copa América',r:r.champ==='BRA'?'Brasil campeão':'Brasil eliminado em '+r.braOut+' · campeão '+NTN[r.champ]});
  const aw=r.champ==='BRA'||r.braOut==='Final'?4:r.braOut==='Fase de grupos'?2:3;pd.aw=aw;
  if(r.champ==='BRA'){const c=userClub();c.humor=clamp(c.humor+2,5,100)}
  return res;
}
function ntWC(pd,goers){
  const b=ntBox();const pool=Object.keys(NR0).filter(c=>c!=='BRA').slice(0,31);pool.unshift('BRA');
  const r=ntTourney(pool,8,'Copa do Mundo');
  b.wc=r;const res=r.champ==='BRA'?'COPA DO MUNDO: Brasil é HEXA!':'Copa do Mundo: Brasil caiu em "'+r.braOut+'". Campeão: '+NTN[r.champ];
  b.hist.unshift({s:G.season,t:'Copa do Mundo',r:r.champ==='BRA'?'Brasil campeão':'Brasil eliminado em '+r.braOut+' · campeão '+NTN[r.champ]});
  const aw=r.champ==='BRA'||r.braOut==='Final'?5:r.braOut==='Semifinal'?5:r.braOut==='Fase de grupos'?3:4;pd.aw=aw;
  if(r.champ==='BRA'){const c=userClub();c.humor=clamp(c.humor+3,5,100);for(const id of goers){const p=P(id);if(p&&natOf(p)==='BRA'){p.ovr=clamp(p.ovr+1,40,95)}}}
  return res;
}
/* disponibilidade dos jogadores na seleção */
hookAround('slotScore','ss23',function(next,__a){let [p,slot,phil]=__a;let s=next();if(p.ntw>0)s-=80;return s});
function ntFix(){
  const c=userClub();if(!c)return;
  for(let i=0;i<11;i++){const id=c.squad[i];if(!(P(id).ntw>0))continue;
    const slot=slotsOf(c.formation)[i],wnt=wantsOf(c.formation)[i];let best=null,bs=-1e9;
    for(const x of c.squad.slice(11)){const px=P(x);if(px.inj>0||px.ntw>0)continue;const sc=slotScore(px,slot,c.phil,wnt);if(sc>bs){bs=sc;best=x}}
    if(best){const j=c.squad.indexOf(best);[c.squad[i],c.squad[j]]=[c.squad[j],c.squad[i]]}}
}
hookBefore('startRound','ext23_sr23',function(){try{ntFix()}catch(e){}});
hookAround('finishRound','ext23_fr23',function(next,A){
  const wasLeague=!(G._lg&&G._x&&R&&R.xtra);const rBefore=G.round;
  const out=next();
  try{
    if(wasLeague&&G.round!==rBefore&&G.phase==='play'){
      const b=ntBox();
      // jogadores de volta
      for(const id of userClub().squad){const p=P(id);if(p.ntw>0){p.ntw--;if(p.ntw===0){delete p.ntw;p.en=clamp(p.en-12,20,100)}}}
      // executa a data deste turno e anuncia a próxima
      if(b.pend&&G.round>=b.pend.r)ntExecute();
      const i=NTW.indexOf(G.round+1);
      if(i>=0&&!b.pend&&b.last!==i&&G.round<NR())ntAnnounce(i);
    }
  }catch(e){console.error('ext23 '+e.message)}
  return out;
});
hookAfter('newSeason','ext23_ns23',function(r,A){try{const b=ntBox();b.pend=null;b.last=-1;b.asks=0;b.rel=clamp(b.rel+8,0,100);
  for(const p of Object.values(G.players))delete p.ntw;
  if(cyOf()===0&&(!b.q||b.q.done)){ntQInit();b.wcQ=undefined}}catch(e){console.error('ns23 '+e.message)}});
hookAround('startCareer','sc23',function(next,__a){G.nt=null;next();try{ntBox();ntQInit()}catch(e){console.error(e.message)}save()});
hookAround('takeJob','tj23',function(next,__a){const r=next();try{ntBox().pend=null;for(const p of Object.values(G.players))delete p.ntw}catch(e){}return r});
hookAround('loadSave','ls23',function(next,__a){const ok=next();if(ok&&G){try{ntBox();if(!G.nt.q)ntQInit()}catch(e){}}return ok});
Object.assign(A,{ntask(d){ntAsk(+d.id);render()}});

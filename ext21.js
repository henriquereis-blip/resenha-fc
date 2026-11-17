/* ext21: Fase 5 (parte 2) — campeonatos estaduais */
const STATE={PAL:'SP',COR:'SP',SAO:'SP',SAN:'SP',RBB:'SP',MIR:'SP',NOV:'SP',PON:'SP',BSP:'SP',FER:'SP',GUA:'SP',ILI:'SP',POR:'SP',AGU:'SP',XVP:'SP',
 FLA:'RJ',BOT:'RJ',FLU:'RJ',VAS:'RJ',VRE:'RJ',NIG:'RJ',CAM:'MG',CRU:'MG',AME:'MG',ATH:'MG',TOM:'MG',
 INT:'RS',GRE:'RS',JUV:'RS',YPI:'RS',CAX:'RS',SJO:'RS',PEL:'RS',BAH:'BA',VIT:'BA',JUA:'BA',JAC:'BA',
 CAP:'PR',CFC:'PR',OPE:'PR',LON:'PR',MAR:'PR',PAR:'PR',CHA:'SC',CRI:'SC',AVA:'SC',FIG:'SC',BRU:'SC',JOI:'SC',HER:'SC',
 SPO:'PE',NAU:'PE',STC:'PE',RET:'PE',FOR:'CE',CEA:'CE',FLO:'CE',GOI:'GO',ACG:'GO',APA:'GO',VNO:'GO',REM:'PA',PAY:'PA',
 CRB:'AL',BPB:'PB',TRE:'PB',CMP:'PB',CUI:'MT',OVG:'MT',ABC:'RN',AMA:'AM',HUM:'AM',CON:'SE',ITA:'SE',SAM:'MA',MOT:'MA',
 ALT:'PI',FPI:'PI',RNO:'ES',RBR:'AC'};
const ESTN={SP:'Paulistão',RJ:'Campeonato Carioca',MG:'Campeonato Mineiro',RS:'Gauchão',BA:'Baianão',PR:'Paranaense',SC:'Catarinense',PE:'Pernambucano',CE:'Cearense',GO:'Goianão',PA:'Parazão',AL:'Alagoano',PB:'Paraibano',MT:'Mato-Grossense',RN:'Potiguar',AM:'Amazonense',SE:'Sergipano',MA:'Maranhense',PI:'Piauiense',ES:'Capixaba',AC:'Acreano'};
/* formatos 2026 (1ª divisão pesquisada em GE/Gazeta/Goal; divisões abaixo aproximadas): [nome, clubes, tipo, jogos(liga)|grupos, classificados ao mata-mata, rebaixados] */
const ESTF={
 SP:[['Paulista Série A1',16,'liga',8,8,2],['Paulista Série A2',16,'liga',10,4,2],['Paulista Série A3',16,'liga',8,4,2],['Paulista Série A4',16,'liga',8,4,0]],
 RJ:[['Carioca Série A',12,'liga',6,8,1],['Carioca Série B1',12,'liga',8,4,2],['Carioca Série B2',12,'liga',8,4,0]],
 MG:[['Mineiro Módulo I',12,'liga',11,4,2],['Mineiro Módulo II',12,'liga',8,4,2],['Mineiro Segunda Divisão',12,'liga',8,4,0]],
 RS:[['Gauchão Série A1',12,'grupos',2,8,2],['Gaúcho Divisão de Acesso (A2)',12,'liga',8,4,2],['Gaúcho Segundona (A3)',12,'liga',8,4,0]],
 PR:[['Paranaense Série A',12,'grupos',2,8,2],['Paranaense Série Prata',12,'liga',8,4,2],['Paranaense Série Bronze',12,'liga',8,4,0]],
 SC:[['Catarinense Série A',12,'liga',11,8,2],['Catarinense Série B',12,'liga',8,4,2],['Catarinense Série C',12,'liga',8,4,0]],
 BA:[['Baiano Série A',10,'liga',9,4,2],['Baiano Série B',10,'liga',8,4,0]],
 GO:[['Goiano Série A',12,'liga',11,4,2],['Goiano Série B',12,'liga',8,4,2],['Goiano Série C',12,'liga',8,4,0]],
 CE:[['Cearense Série A',10,'grupos',2,4,2],['Cearense Série B',10,'liga',8,4,0]],
 PE:[['Pernambucano Série A1',10,'liga',9,4,2],['Pernambucano Série A2',10,'liga',8,4,0]],
 PA:[['Paraense Série A1',12,'liga',11,8,2],['Paraense Série A2',10,'liga',8,4,0]]};
const CITY={SP:['Itapira','Tupã','Marília','Bauru','Sorocaba','Araraquara','Votuporanga','Catanduva','Jaú','Taubaté','Americana','Mogi Mirim','Jundiaí','Lins','Rio Claro','Franca','Assis','Penápolis'],
 RJ:['Cabo Frio','Resende','Macaé','Angra','Petrópolis','Volta Grande','Itaboraí','Teresópolis','Campos','Duque de Caxias','Barra Mansa','Maricá'],
 MG:['Uberlândia','Poços de Caldas','Patrocínio','Nova Lima','Pouso Alegre','Ipatinga','Itabirito','Betim','Varginha','Divinópolis','Uberaba','Caldense'],
 RS:['Lajeado','Passo Fundo','Santa Cruz','Novo Hamburgo','Pelotas Sul','Esteio','Canoas','Santa Maria','Bagé','Erechim','Ijuí','Cachoeira'],
 PR:['Cascavel','Londrina Norte','Toledo','Foz','Ponta Grossa','Rio Branco do Sul','Arapongas','Paranavaí','Guarapuava','Apucarana','Campo Mourão','Umuarama'],
 SC:['Blumenau','Tubarão','Lages','Chapecó Oeste','Concórdia','Itajaí','Jaraguá','Camboriú','Criciúma Sul','São Bento','Caçador','Imbituba'],
 BA:['Feira de Santana','Vitória da Conquista','Alagoinhas','Itabuna','Jequié','Camaçari','Ilhéus','Juazeiro','Teixeira','Barreiras'],
 GO:['Anápolis','Itumbiara','Rio Verde','Catalão','Jataí','Trindade','Morrinhos','Luziânia','Caldas Novas','Goianésia','Formosa','Inhumas']};
const GENR=['Capital','Interior','Norte','Sul','Litoral','Sertão','Serra','Vale','Central','Planalto','Fronteira','Oeste','Leste','Fluvial'];
const PREF=['Atlético','EC','Sport Club','União','Associação','Grêmio','Operário','Ferroviário','Esporte','Comercial'];
const LOCCOL=[['#1d6fb8','#ffffff'],['#c0392b','#ffffff'],['#1e8449','#ffffff'],['#f1c40f','#1a1a1a'],['#6c3483','#ffffff'],['#111111','#ffffff'],['#e67e22','#ffffff'],['#17202a','#f1c40f']];
const natTier=x=>x.div<=2?0:1;
function estSpec(st,t){const F=ESTF[st]||[[(ESTN[st]||'Estadual')+' Série A',10,'liga',9,4,2],[(ESTN[st]||'Estadual')+' Série B',10,'liga',8,4,0]];return {F,sp:F[clamp(t,0,F.length-1)],t:clamp(t,0,F.length-1)}}
function locMake(name,sig,rep,ci){
  const cc=LOCCOL[ci%LOCCOL.length];
  FCPOOL.push([name,sig,rep,cc[0],cc[1],cc[1],'h']);
  try{return fcMake(sig,rep)}finally{FCPOOL.pop()}
}
function circle(ids,R){
  const arr=ids.slice(),n=arr.length,rounds=[];
  for(let r=0;r<Math.min(R,n-1);r++){const md=[];for(let i=0;i<n/2;i++){let h=arr[i],a=arr[n-1-i];if((r+i)%2)[h,a]=[a,h];md.push([h,a])}rounds.push(md);arr.splice(1,0,arr.pop())}
  return rounds;
}
function koNames(q){return q>=8?['Quartas de final','Semifinal','Final']:q>=4?['Semifinal','Final']:['Final']}
function estInit(){
  const c=userClub();if(!c)return;
  const st=STATE[c.sig]||'SP';
  if(G.estLv==null||G.estLvS!==st){G.estLv=natTier(c);G.estLvS=st}
  const {sp,t,F}=estSpec(st,G.estLv);G.estLv=t;
  const [tn,N,type,R,Q,rel]=sp;
  let reals=G.clubs.filter(x=>STATE[x.sig]===st&&x.id!==G.user&&natTier(x)===t).sort((a,b)=>b.rep-a.rep).map(x=>x.id);
  const ids=[G.user,...reals].slice(0,N);
  const cities=(CITY[st]||[]).concat(shuffle(GENR.map(x=>x+' '+st)));const used=new Set(ids.map(i=>C(i).name));
  let n=0,k=0;const base=t===0?50:t===1?42:t===2?37:33;
  while(ids.length<N){let nm;do{nm=PREF[(k*3+n)%PREF.length]+' '+(cities[(k++)%cities.length])}while(used.has(nm)&&k<80);used.add(nm);
    ids.push(locMake(nm,'L'+st+n,clamp(Math.round(base+rnd(-4,6)),28,62),n+st.charCodeAt(0)).id);n++}
  let groups=null,sched;
  if(type==='grupos'){const o=ids.slice().sort((a,b)=>C(b).rep-C(a).rep);groups=[[],[]];o.forEach((id,i)=>{const r=Math.floor(i/2);groups[(i+r)%2].push(id)});
    const gr=groups.map(g=>circle(g,99));sched=gr[0].map((_,i)=>gr.flatMap(g=>g[i]))}
  else sched=circle(ids,R);
  const nKo=koNames(Q).length,M=sched.length+nKo;
  const slots=Array.from({length:M},(_,i)=>Math.floor(i*12/M));
  const tbl={};ids.forEach(i=>tbl[i]={J:0,P:0,V:0,E:0,D:0,GP:0,GC:0});
  G.est={st,tier:t,name:tn,N,type,R,Q,rel,s:G.season,ids,groups,sched,tbl,md:0,phase:'liga',ko:null,fin:null,champ:null,prize:0,log:[],pos:null,slots,tiers:F.length,pr:null};
}
function estOrder(ids){const e=G.est;return (ids||e.ids).slice().sort((p,q)=>e.tbl[q].P-e.tbl[p].P||(e.tbl[q].GP-e.tbl[q].GC)-(e.tbl[p].GP-e.tbl[p].GC)||e.tbl[q].GP-e.tbl[p].GP||C(q).rep-C(p).rep)}
function fastSim(h,a,ko){
  const ch=C(h),ca=C(a),d=(ch.rep-ca.rep)/40;const lh=Math.max(.25,1.45*Math.exp(d)),la=Math.max(.2,1.05*Math.exp(-d));
  const pois=l=>{const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1};
  const hg=pois(lh),ag=pois(la);let pen=null,w=hg>ag?h:hg<ag?a:null;
  if(w===null&&ko){pen=shootout(ch.rep,ca.rep);w=pen[0]>pen[1]?h:a}
  return {h,a,hg,ag,pen,w};
}
function estTable(rs){const e=G.est;for(const r of rs){const a=e.tbl[r.h],b=e.tbl[r.a];if(!a||!b)continue;a.J++;b.J++;a.GP+=r.hg;a.GC+=r.ag;b.GP+=r.ag;b.GC+=r.hg;
  if(r.hg>r.ag){a.V++;a.P+=3;b.D++}else if(r.hg<r.ag){b.V++;b.P+=3;a.D++}else{a.E++;b.E++;a.P++;b.P++}}}
function estToKo(){
  const e=G.est;let q;
  if(e.type==='grupos'){const per=e.Q/2;q=e.groups.flatMap(g=>estOrder(g).slice(0,per));q=estOrder(q)}
  else q=estOrder().slice(0,e.Q);
  const all=estOrder();e.pos=all.indexOf(G.user)+1;e.finalOrder=all;
  const Q=e.Q,seed=[];const idx=Q===8?[[0,7],[3,4],[1,6],[2,5]]:Q===4?[[0,3],[1,2]]:[[0,1]];
  const pairs=idx.map(([a,b])=>[q[a],q[b]]);
  e.ko={st:0,alive:q.slice(),pairs,names:koNames(Q)};e.phase='ko';
  addNews(e.name+': fase de classificação encerrada. Você terminou em '+e.pos+'º'+(q.includes(G.user)?' e está no mata-mata!':' e ficou fora do mata-mata.'));
}
function koAdvance(res){
  const e=G.est,k=e.ko;k.alive=res.map(r=>r.w);
  e.log.unshift({label:k.names[k.st],res:res.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,pen:r.pen}))});
  if(k.pairs.length===1){e.champ=res[0].w;e.fin=[res[0].h,res[0].a];e.phase='done';G.estHist=G.estHist||[];G.estHist.push({s:G.season,name:e.name,champ:e.champ})}
  else{k.st++;const w=res.map(r=>r.w);k.pairs=[];for(let i=0;i<w.length;i+=2)k.pairs.push([w[i],w[i+1]])}
}
function estAutoKo(){
  const e=G.est;let g=0;while(e.phase==='ko'&&g++<5){const res=e.ko.pairs.map(([h,a])=>fastSim(h,a,true));koAdvance(res)}
}
function estDue(){
  const e=G.est;if(!e||e.phase==='done')return null;
  if(e.phase==='liga'){if(e.md<e.sched.length){const s=e.slots[e.md];return G.round>=s?s:null}estToKo()}
  if(e.phase==='ko'){
    if(!e.ko.pairs.some(p=>p.includes(G.user))){estAutoKo();return null}
    const s=e.slots[e.sched.length+e.ko.st];return G.round>=s?s:null;
  }
  return null;
}
const _es21=extraSync;extraSync=function(){
  if(!G||G.phase!=='play'||G.user==null||G.round>=NR()||G._lg)return;
  const e=G.est;
  if(e&&e.phase!=='done'){
    const d=estDue();
    if(d!=null){
      const c=G.cup;const dc=(c&&c.st<5&&userInPairs(c.pairs)&&G.round>=CSL[c.st])?CSL[c.st]:null,dk=contDue();
      if(d<=Math.min(dc==null?99:dc,dk==null?99:dk)){
        let pair,info;
        if(e.phase==='liga'){pair=e.sched[e.md].find(p=>p.includes(G.user));info={kind:'est',ko:false,label:e.name+' · rodada '+(e.md+1)+' de '+e.sched.length}}
        else{pair=e.ko.pairs.find(p=>p.includes(G.user));info={kind:'est',ko:true,label:e.name+' · '+e.ko.names[e.ko.st]}}
        for(const id of pair)fcEnsure(id);
        G._lg=G.fixtures[G.round];G.fixtures[G.round]=[pair.slice()];G._x=info;return;
      }
    }
  }
  return _es21();
};
function finishEst(){
  const x=G._x,um=R.ms[R.ui],us=userSide(um),c=userClub(),e=G.est;
  const gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg;const ko=x.ko;
  for(const [k,s] of [['h',um.h],['a',um.a]]){const club=s.club;if(club.fx)continue;
    const won=k==='h'?um.hg>um.ag:um.ag>um.hg,lost=k==='h'?um.hg<um.ag:um.ag<um.hg;
    for(const id of new Set([...s.lineup,...s.used,...s.outs])){const p=P(id);p.en=clamp(Math.round(um.en[id]-4),20,100);p.mor=clamp(p.mor+(won?3:lost?-3:0),30,100);if(Math.random()<(p.en<45?.06:.025))p.inj=ri(1,5)}}
  let pen=null,w=um.hg>um.ag?um.h.club.id:um.hg<um.ag?um.a.club.id:null;
  if(w===null&&ko){pen=shootout(um.h.club.rep,um.a.club.rep);w=pen[0]>pen[1]?um.h.club.id:um.a.club.id}
  const ur={h:um.h.club.id,a:um.a.club.id,hg:um.hg,ag:um.ag,pen,w,u:true};
  const home=us==='h';let prize=0,note='',adv=null;const sc=Math.max(.7,scaleOf(c)/100);
  if(home)prize+=+(scaleOf(c)*.006).toFixed(1);
  let shown=[ur];
  if(!ko){
    const others=e.sched[e.md].filter(p=>!p.includes(G.user)).map(([h,a])=>fastSim(h,a,false));
    estTable([ur,...others]);shown=[ur,...others];
    e.log.unshift({label:'Rodada '+(e.md+1),res:shown.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag}))});e.md++;
    if(gf>ga)prize+=.4*sc*(e.sp?1:1);
    const o=e.type==='grupos'?estOrder(e.groups.find(g=>g.includes(G.user))):estOrder();note='Você é o '+(o.indexOf(G.user)+1)+'º colocado'+(e.type==='grupos'?' do grupo':'')+'.';
    if(e.md>=e.sched.length){estToKo();note+=e.ko.alive.includes(G.user)?' Classificado ao mata-mata!':' Fora do mata-mata.'}
  }else{
    const others=e.ko.pairs.filter(p=>!p.includes(G.user)).map(([h,a])=>fastSim(h,a,true));
    const res=e.ko.pairs.map(p=>p.includes(G.user)?ur:others.find(r=>r.h===p[0]&&r.a===p[1]));
    adv=ur.w===G.user;const stg=e.ko.names[e.ko.st];koAdvance(res);
    if(adv){
      if(e.phase==='done'){prize+=4*sc;note='CAMPEÃO '+e.name.toUpperCase()+'!';c.humor=clamp(c.humor+8,5,100);G.board.conf=clamp(G.board.conf+5,0,100);G.sqc=clamp(sqcOf()+6,0,100);paperLine(c.name+' é campeão do '+e.name+'!','Primeiro título da temporada.');G.trophyEst=(G.trophyEst||0)+1}
      else{prize+=.8*sc;note='Você avançou: '+e.ko.names[e.ko.st]+'.'}
    }else note=(stg==='Final'?'Vice-campeão':'Eliminado nas '+stg.toLowerCase())+' do '+e.name+'.';
  }
  prize=+prize.toFixed(1);G.fin.caixa=+(G.fin.caixa+prize).toFixed(1);e.prize+=prize;
  G.lastRound={n:G.round,results:shown.slice(0,8).map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,u:!!r.u})),ratings:Object.assign({},um.rt),scorers:um.scorers,stats:um.stats,user:{home},cup:{label:x.label,adv,pen:ur.pen,prize,note,ko}};
  c.humor=clamp(c.humor+(gf>ga?2:gf<ga?-2:0),5,100);
  for(const p of Object.values(G.players))if(p.club>=0&&p.en<100)p.en=clamp(p.en+6,0,100);
  G.fixtures[G.round]=G._lg;G._lg=null;G._x=null;R=null;fcClean();save();return 'next';
}
const _fr21=finishRound;finishRound=function(){
  if(G._lg&&G._x&&G._x.kind==='est'&&R&&R.xtra){
    let played=new Set(),gf=0,ga=0;try{const um=R.ms[R.ui],us=userSide(um),sd=um[us];played=new Set([...sd.lineup,...sd.used]);gf=us==='h'?um.hg:um.ag;ga=us==='h'?um.ag:um.hg}catch(e){}
    const r=finishEst();try{sqcTick(played,gf,ga)}catch(e){}return r;
  }
  return _fr21.apply(this,arguments);
};
/* fim do estadual: acesso e rebaixamento dentro das séries do estado */
function estEnd(){
  const e=G.est;if(!e||e.rel===undefined)return;
  try{
    if(e.phase==='ko')estAutoKo();
    const rank=(e.finalOrder||estOrder()).indexOf(G.user)+1;
    if(e.tier>0&&e.fin&&e.fin.includes(G.user)){G.estLv=e.tier-1;addNews('Estadual: você chegou à final da '+e.name+' e foi PROMOVIDO para a divisão acima.')}
    else if(e.rel>0&&rank>e.N-e.rel&&e.tier<e.tiers-1){G.estLv=e.tier+1;addNews('Estadual: você terminou em '+rank+'º na '+e.name+' e foi REBAIXADO no estadual.')}
  }catch(er){console.error('estEnd '+er.message)}
}
const _ns21=newSeason;newSeason=function(){try{estEnd()}catch(e){}const r=_ns21();try{estInit()}catch(e){console.error('estInit '+e.message)}return r};
const _sc21=startCareer;startCareer=function(){G.estLv=null;_sc21.apply(this,arguments);try{G.estHist=[];G.estLv=null;estInit()}catch(e){console.error('estInit0 '+e.message)}save()};
const _tj21=takeJob;takeJob=function(){const r=_tj21.apply(this,arguments);try{G._lg=null;G._x=null;G.estLv=null;estInit()}catch(e){console.error('estInit1 '+e.message)}return r};
const _ls21=loadSave;loadSave=function(){const ok=_ls21();if(ok&&G&&(!G.est||!G.est.slots)){try{G.estLv=null;estInit()}catch(e){}}return ok};

/* ext11: lesões + departamento médico, metas variadas por clube, paciência e eleições */

/* ============ LESÕES ============ */
// [nome, grupo, mín, máx, peso]
const INJT=[
 ['Contusão','trauma',1,2,14],['Pancada no tornozelo','trauma',1,3,10],['Concussão','trauma',2,3,2],
 ['Edema muscular','musc',2,3,10],['Estiramento na coxa','musc',3,6,14],['Lesão na posterior de coxa','musc',5,9,10],['Lesão na panturrilha','musc',3,7,8],
 ['Entorse de tornozelo','lig',3,7,10],['Lesão no ligamento colateral do joelho','lig',6,12,5],
 ['Lesão de menisco','joelho',8,16,4],['Ruptura do ligamento cruzado (LCA)','joelho',28,38,1.2],
 ['Fratura no pé (metatarso)','osso',9,15,2],['Fratura na clavícula','osso',8,14,1],
 ['Pubalgia','over',4,9,5],['Tendinite','over',2,5,5],['Fascite plantar','over',3,6,2],
 ['Virose','doenca',1,2,5],['Dengue','doenca',2,4,1]
];
const INJW={
 jogo:{trauma:1.5,lig:1.3,joelho:1.2,osso:1.3,musc:1,over:.2,doenca:0},
 treino:{trauma:.25,lig:.8,joelho:.5,osso:.15,musc:1.5,over:1.5,doenca:1.4},
 fadiga:{trauma:.2,lig:.7,joelho:.5,osso:.1,musc:2.2,over:1.8,doenca:.2}
};
const MEDN={doc:['Médico do clube','🩺','Diagnostica certo e encurta o tempo de cada lesão (−5% por nível).'],
 fisio:['Fisioterapia','💆','Todo dia tem chance de adiantar a volta de quem está no DM (+7% por nível).'],
 prep:['Preparação física','🏋️','Menos lesões musculares e de fadiga (−6% por nível) e o elenco recupera mais rápido.']};
function sevOf(d){return d<=2?'leve':d<=6?'moderada':d<=12?'grave':'gravíssima'}

function medLv(c){
  if(c&&c.id===G.user&&G.med)return G.med;
  const l=clamp(Math.round((c.rep-60)/4),0,4);return {doc:l,fisio:l,prep:l};
}
function medCost(k,lv){const c=userClub();return +(scaleOf(c)*(.008+.006*lv)*(lv+1)/2).toFixed(2)}
function medMaint(){const m=G.med,c=userClub();return +((m.doc+m.fisio+m.prep)*scaleOf(c)*.00008).toFixed(3)}
function proneOf(p){if(p.prone===undefined)p.prone=+rnd(.65,1.5).toFixed(2);return p.prone}
function riskOf(p){
  const ageF=p.age<=20?.85:p.age<=29?1:1+(p.age-29)*.055;
  const enF=p.en<45?2.2:p.en<65?1.4:p.en<80?1.1:1;
  const posF=p.pos==='GK'?.45:1;
  const rtF=p.rtp>0?1.8:1;
  return proneOf(p)*ageF*enF*posF*rtF;
}
function injPick(cause){
  const W=INJW[cause]||INJW.jogo;let tot=0;const ws=INJT.map(t=>{const w=t[4]*(W[t[1]]||0);tot+=w;return w});
  let r=Math.random()*tot;for(let i=0;i<INJT.length;i++){r-=ws[i];if(r<=0)return INJT[i]}return INJT[0];
}
function giveInj(p,cause){
  const c=p.club>=0?C(p.club):null;const lv=c?medLv(c):{doc:0};
  let t=injPick(cause),relapse=false;
  if(p.rtp>0&&p.injT&&Math.random()<.4){const o=INJT.find(x=>x[0]===p.injT);if(o){t=o;relapse=true}}
  let d=ri(t[2],t[3])*(1-.05*lv.doc);
  if(p.age>=31)d*=1+(p.age-30)*.04;
  if(p.age<=20)d*=.85;
  if(relapse)d=Math.max(2,Math.round((p.injN||4)*.6));
  d=Math.max(1,Math.round(d));
  p.pp=0;p.inj=d;p.injN=d;p.injT=t[0];p.injG=t[1];p.injS=G.season;p.injR=G.round;p.surg=false;p.rtp=0;p.injHist=(p.injHist||0)+1;
  if(c&&c.id===G.user&&G.med){
    const m=G.med;m.hist.unshift({s:G.season,r:G.round,pid:p.id,n:p.name,t:t[0],d,rel:relapse,c:cause});m.hist=m.hist.slice(0,40);m.season.n++;m.season.days+=d;
  }
  return {t,d,relapse};
}
// as lesões agora acontecem ao vivo na partida
function ex11a(){
  if(!G||!G.clubs||!G.clubs.length||G.user===null||G.user===undefined)return false;
  if(!G.x11){G.x11=1;const l=medLv(userClub());G.med={doc:l.doc,fisio:l.fisio,prep:l.prep,hist:[],season:{n:0,days:0,surg:0},cost:0,seasons:[]};
    G.goals={season:G.season,list:[],att:{s:0,n:0},sold:0,homeP:0,unb:0,bestUnb:0,riv:{w:0,d:0,l:0},cash0:G.fin.caixa,debt0:userClub().debt,val0:0,hist:[],prevK:[]};
    G.pat={bd:50,fan:50};G.el=null}
  return true;
}

/* ---- lesões ao vivo na partida ---- */
const _sm11=stepMinute;stepMinute=function(m){
  _sm11(m);
  if(m.done)return;
  for(const k of ['h','a']){
    const s=m[k];if(!s||!s.lineup)continue;
    const c=s.club,lv=medLv(c);
    if(Math.random()>.0030*(1-.06*lv.prep))continue;
    const cand=s.lineup.filter(id=>!s.sent.includes(id)&&P(id).inj===0);if(!cand.length)continue;
    const id=pick(cand),p=P(id);
    if(Math.random()>riskOf(p)/2.1)continue;
    const r=giveInj(p,p.en<60?'fadiga':'jogo');
    m.rt[id]=(m.rt[id]||6)-.6;
    addEv(m,k,'inj',id,'🚑 '+p.name+' sente '+r.t[0].toLowerCase()+(r.relapse?' (recaída)':'')+' · '+sevOf(r.d));
    const isUser=c.id===G.user;
    if((!isUser||r.d>=6)&&s.subs<5){
      const rest=s.bench.filter(b=>P(b).inj===0&&!s.sent.includes(b));
      if(rest.length){
        const same=rest.filter(b=>P(b).pos===p.pos).sort((a,b)=>P(b).ovr-P(a).ovr)[0];
        const best=same||rest.sort((a,b)=>P(b).ovr-P(a).ovr)[0];
        if(subPlayer(m,k,id,best)&&isUser)addEv(m,k,'inj',id,'Sai de maca. '+lastName(p.name)+' vai para o departamento médico.');
      }
    }
  }
};

/* ---- fim da rodada: recuperação, treino, recaída, custos ---- */
const _fr11=finishRound;finishRound=function(){
  ex();ex11a();
  const um=R&&R.ms[R.ui],us=um?userSide(um):null;const sd=um?um[us]:null;
  const playedHurt=sd?[...new Set([...sd.lineup,...sd.used])].filter(id=>P(id).inj>0&&!sd.outs.includes(id)):[];
  const prev={};for(const p of Object.values(G.players))if(p.club>=0&&p.inj>0)prev[p.id]=p.inj;
  const h0=userClub().humor;
  const out=_fr11();
  try{
    const c=userClub(),m=G.med;
    for(const id of playedHurt){const p=P(id);if(p.club!==G.user)continue;
      if(Math.random()<.24*(1-.04*m.doc)){const add=ri(2,5);p.inj+=add;p.injN=(p.injN||0)+add;
        addNews(p.name+' piorou depois de jogar no sacrifício: +'+add+' rodadas fora.');paperLine('Departamento médico: '+p.name+' agravou lesão','Jogar machucado custou caro ao clube.')}}
    for(const p of Object.values(G.players)){
      if(p.club<0)continue;const lv=medLv(C(p.club));
      if(p.inj>1&&Math.random()<.07*lv.fisio)p.inj--;
      if(prev[p.id]&&p.inj===0){
        p.rtp=(p.injN||0)>=10?3:(p.injN||0)>=5?2:1;p.en=Math.min(p.en,70);
        if(p.club===G.user&&(p.injN||0)>=3)addNews(p.name+' recebeu alta do DM ('+(p.injT||'lesão').toLowerCase()+').');
      }else if(p.rtp>0&&p.inj===0){p.rtp--;p.en=Math.min(p.en,82)}
      if(p.inj===0&&Math.random()<.0045*riskOf(p)*(1-.06*lv.prep)){
        const r=giveInj(p,'treino');
        if(p.club===G.user){addNews('Treino: '+p.name+' sofre '+r.t[0].toLowerCase()+' ('+r.d+' rodada'+(r.d>1?'s':'')+').');
          if(r.d>=6&&p.ovr>=65)paperLine('Má notícia no CT: '+p.name+' com '+r.t[0].toLowerCase(),'Estimativa de '+r.d+' rodadas fora. Departamento médico avalia.')}
      }
      if(p.club!==G.user&&p.inj>0&&p.inj===p.injN&&p.ovr>=76&&p.injN>=8&&Math.random()<.5)paperLine(p.name+' ('+C(p.club).sig+') deve ficar fora por '+p.injN+' rodadas','Lesão: '+(p.injT||'').toLowerCase()+'.');
      if(p.inj===0)p.en=clamp(p.en+lv.prep*1.2,0,100);
    }
    const cost=medMaint();G.fin.caixa=+(G.fin.caixa-cost).toFixed(3);m.cost+=cost;
    if(c.humor<h0&&G.pat)c.humor=clamp(Math.round(c.humor+(h0-c.humor)*(G.pat.fan/200)),5,100);
    trackGoals();
  }catch(e){console.error('ext11 tick',e)}
  return out;
};

const _ns11=newSeason;newSeason=function(){
  ex11a();const snap={};for(const p of Object.values(G.players))if(p.inj>0)snap[p.id]=[p.inj,p.injN,p.injT];
  const m=G.med;if(m){m.seasons.push({s:G.season,n:m.season.n,days:m.season.days,surg:m.season.surg});m.season={n:0,days:0,surg:0}}
  _ns11();
  for(const id in snap){const p=P(+id);if(!p)continue;const r=snap[id][0]-8;if(r>0){p.inj=r;p.injN=snap[id][1];p.injT=snap[id][2]}}
  try{newSeasonGoals()}catch(e){console.error('goals',e)}
};

/* ---- ações médicas ---- */
Object.assign(A,{
 medup(d){ex();ex11a();const k=d.k,lv=G.med[k];if(lv>=5)return;const c=medCost(k,lv);if(G.fin.caixa<c)return toast('Caixa insuficiente ('+mi(c)+').');
   G.fin.caixa=+(G.fin.caixa-c).toFixed(2);G.med[k]=lv+1;G.med.cost+=c;save();toast(MEDN[k][0]+' evoluiu para o nível '+(lv+1)+'.')},
 medsurg(d){ex();const p=P(+d.id),c=+(scaleOf(userClub())*.012).toFixed(2);if(!p||p.surg||p.inj<8)return;
   if(G.fin.caixa<c)return toast('Caixa insuficiente ('+mi(c)+').');
   G.fin.caixa=+(G.fin.caixa-c).toFixed(2);G.med.cost+=c;p.surg=true;G.med.season.surg++;
   if(Math.random()<.06-.01*G.med.doc){const a=ri(3,6);p.inj+=a;toast('Complicação na cirurgia de '+lastName(p.name)+': +'+a+' rodadas.')}
   else{const n=Math.max(2,Math.round(p.inj*.7));toast('Cirurgia de '+lastName(p.name)+' deu certo: volta em '+n+' rodadas.');p.inj=n}
   save();render()},
});

/* ============ METAS VARIADAS ============ */
const RIVAL={FLA:['FLU','VAS','BOT'],FLU:['FLA','VAS','BOT'],VAS:['FLA','FLU','BOT'],BOT:['FLA','FLU','VAS'],PAL:['COR','SAO','SAN'],COR:['PAL','SAO','SAN'],SAO:['COR','PAL','SAN'],SAN:['COR','PAL','SAO'],GRE:['INT'],INT:['GRE'],CRU:['CAM'],CAM:['CRU'],BAH:['VIT'],VIT:['BAH'],CAP:['CFC'],CFC:['CAP']};
const GFLAV={PAL:['yth','soc','art'],FLA:['att','soc','cla'],COR:['dvd','soc','cla'],SAO:['yth','dvd','sel'],SAN:['yth','sel','val'],GRE:['hom','soc','cla'],INT:['yth','hom','cla'],
 CAM:['att','dvd','sup'],CRU:['sup','dvd','cla'],FLU:['yth','val','sel'],VAS:['sup','dvd','att'],BOT:['sup','def','yth'],BAH:['att','hom','sup'],VIT:['pts','yth','sel'],CAP:['def','hom','val'],
 CFC:['pts','def','sup'],RBB:['val','yth','sel'],MIR:['pts','def','hom'],CHA:['pts','dis','yth'],REM:['pts','att','sup']};
function rivalOf(c){
  const l=(RIVAL[c.sig]||[]).map(s=>G.clubs.find(x=>x.sig===s)).filter(Boolean);
  if(l.length)return {c:pick(l),real:true};
  const o=G.clubs.filter(x=>x.id!==c.id).sort((a,b)=>Math.abs(a.rep-c.rep)-Math.abs(b.rep-c.rep))[0];return {c:o,real:false};
}
function squadVal(c){return +c.squad.map(id=>valueOf(P(id))).sort((a,b)=>b-a).slice(0,18).reduce((s,x)=>s+x,0).toFixed(1)}
function genGoals(c){
  const rk=Math.round(expRank(c)),top=rk<=6,low=rk>=14,debtR=ratio0(c),bi=baseIdx(c);
  const prev=(G.goals&&G.goals.prevK)||[];
  const W={
   yth:1+bi/35,sup:debtR>=.8?2.6:.7,dvd:debtR>=1?2.6:debtR>=.7?1:.2,att:top?1.6:.8,soc:c.rep>=72?1.5:.7,sel:debtR>=.9?1.8:.6,
   def:rk>=6?1.6:.7,atk:rk<=10?1:.5,hom:1.1,inv:1,cla:1.2,art:top?1.3:.7,dis:1,val:1.2,pts:low?3:0.1
  };
  for(const k of (GFLAV[c.sig]||[]))W[k]*=2.6;
  for(const k of prev)if(W[k])W[k]*=.3;
  const n=top?3:2;const picked=[];
  while(picked.length<n){
    let tot=0;const ks=Object.keys(W).filter(k=>!picked.includes(k));ks.forEach(k=>tot+=W[k]);let r=Math.random()*tot;let sel=ks[0];
    for(const k of ks){r-=W[k];if(r<=0){sel=k;break}}picked.push(sel);
  }
  const mk=G.mk||{};
  const mkG=k=>{
    switch(k){
     case 'yth':{const N=bi>=60?3:bi>=40?2:1;return {k,t:'Dar minutos à base',d:`${N+1} jogadores até 21 anos com 8+ jogos na temporada.`,tgt:N+1}}
     case 'sup':return {k,t:'Fechar no azul',d:'Terminar a temporada com mais caixa do que começou.',tgt:1}
     case 'dvd':{const X=debtR>=1.4?6:debtR>=1?8:12;return {k,t:'Reduzir a dívida',d:`Baixar a dívida em ${X}% até o fim da temporada.`,tgt:X}}
     case 'att':{const X=top?78:65;return {k,t:'Casa cheia',d:`Média de público acima de ${X}% do estádio.`,tgt:X}}
     case 'soc':{const cur=mk.soc?mk.soc.n.reduce((a,b)=>a+b,0):0;const T=Math.max(Math.round(cur*1.1/500)*500,3000);return {k,t:'Crescer o sócio-torcedor',d:`Chegar a ${fmtN(T)} sócios.`,tgt:T}}
     case 'sel':{const X=+(scaleOf(c)*.10).toFixed(1);return {k,t:'Fazer caixa com vendas',d:`Gerar ${mi(X)} em vendas de jogadores.`,tgt:X}}
     case 'def':{const N=clamp(Math.round(rk*.6),3,9);return {k,t:'Defesa sólida',d:`Terminar entre as ${N} defesas menos vazadas.`,tgt:N}}
     case 'atk':{const N=clamp(Math.round(rk*.7),3,8);return {k,t:'Ataque forte',d:`Terminar entre os ${N} melhores ataques.`,tgt:N}}
     case 'hom':{const X=rk<=6?36:rk<=12?32:28;return {k,t:'Fortaleza em casa',d:`Somar ${X} pontos jogando em casa.`,tgt:X}}
     case 'inv':{const X=rk<=6?8:6;return {k,t:'Embalar',d:`Emendar ${X} jogos sem perder.`,tgt:X}}
     case 'cla':{const r=rivalOf(c);return {k,t:r.real?'Clássico':'Confronto direto',d:`Vencer o ${r.c.name} ao menos uma vez e não perder nenhum jogo contra ele.`,tgt:1,riv:r.c.id}}
     case 'art':{const X=top?14:10;return {k,t:'Ter um artilheiro',d:`Algum jogador do elenco com ${X}+ gols.`,tgt:X}}
     case 'dis':{const X=rk<=8?2:4;return {k,t:'Disciplina',d:`No máximo ${X} cartões vermelhos na temporada.`,tgt:X}}
     case 'val':return {k,t:'Valorizar o elenco',d:'Elevar em 5% o valor de mercado do elenco.',tgt:5}
     case 'pts':{const X=low?44:40;return {k,t:'Garantir a permanência',d:`Chegar a ${X} pontos.`,tgt:X}}
    }
  };
  return picked.map(mkG);
}
function newSeasonGoals(){
  if(!ex11a())return;const c=userClub();const g=G.goals;
  g.prevK=g.list.map(x=>x.k);g.season=G.season;g.list=genGoals(c);
  g.att={s:0,n:0};g.sold=0;g.homeP=0;g.unb=0;g.bestUnb=0;g.riv={w:0,d:0,l:0};g.cash0=G.fin.caixa;g.debt0=c.debt;g.val0=squadVal(c);
  const ln=g.list.map(x=>x.t).join(', ');addNews('Diretoria definiu as metas da temporada: '+ln+'.');
  paperLine('Diretoria do '+c.name+' traça metas para '+G.season,'Além da posição na tabela: '+ln.toLowerCase()+'.');
}
function trackGoals(){
  const g=G.goals;if(!g)return;const c=userClub();
  const lr=G.myres[G.myres.length-1];const l=G.fin.last;
  if(lr){
    const home=lr.h===G.user,gf=home?lr.hg:lr.ag,ga=home?lr.ag:lr.hg,pts=gf>ga?3:gf===ga?1:0;
    if(home)g.homeP+=pts;
    if(gf>=ga){g.unb++;g.bestUnb=Math.max(g.bestUnb,g.unb)}else g.unb=0;
    const oppId=home?lr.a:lr.h;const gl=g.list.find(x=>x.k==='cla');
    if(gl&&oppId===gl.riv){if(pts===3)g.riv.w++;else if(pts===1)g.riv.d++;else g.riv.l++}
  }
  if(l&&l.home&&c.cap){g.att.s+=l.att/c.cap;g.att.n++}
}
const _sp11=sellPlayer;sellPlayer=function(oid){
  const o=G.offers.find(x=>x.id===oid);const r=_sp11(oid);if(!r&&o&&G.goals)G.goals.sold+=o.fee;return r;
};
function goalProg(g){
  const G0=G.goals,c=userClub(),rows=G.clubs;let v=0,ok=false,txt='';
  switch(g.k){
   case 'yth':v=c.squad.map(id=>P(id)).filter(p=>p.age<=21&&p.games>=8).length;ok=v>=g.tgt;txt=v+' de '+g.tgt;break;
   case 'sup':v=+(G.fin.caixa-G0.cash0).toFixed(1);ok=v>=0;txt=(v>=0?'+':'')+mi(v);break;
   case 'dvd':v=+((1-c.debt/Math.max(G0.debt0,.1))*100).toFixed(1);ok=v>=g.tgt;txt=dec(v)+'% de '+g.tgt+'%';break;
   case 'att':v=G0.att.n?+(G0.att.s/G0.att.n*100).toFixed(1):0;ok=v>=g.tgt;txt=Math.round(v)+'% de '+g.tgt+'%';break;
   case 'soc':v=G.mk?G.mk.soc.n.reduce((a,b)=>a+b,0):0;ok=v>=g.tgt;txt=fmtN(v)+' de '+fmtN(g.tgt);break;
   case 'sel':v=+G0.sold.toFixed(1);ok=v>=g.tgt;txt=mi(v)+' de '+mi(g.tgt);break;
   case 'def':v=rows.slice().sort((a,b)=>a.GC-b.GC).findIndex(x=>x.id===c.id)+1;ok=v<=g.tgt;txt=v+'ª defesa (meta: top '+g.tgt+')';break;
   case 'atk':v=rows.slice().sort((a,b)=>b.GP-a.GP).findIndex(x=>x.id===c.id)+1;ok=v<=g.tgt;txt=v+'º ataque (meta: top '+g.tgt+')';break;
   case 'hom':v=G0.homeP;ok=v>=g.tgt;txt=v+' de '+g.tgt+' pts';break;
   case 'inv':v=G0.bestUnb;ok=v>=g.tgt;txt='melhor: '+v+' de '+g.tgt;break;
   case 'cla':v=G0.riv.w;ok=G0.riv.w>=1&&G0.riv.l===0;txt=`${G0.riv.w}V ${G0.riv.d}E ${G0.riv.l}D vs ${C(g.riv).sig}`;break;
   case 'art':v=Math.max(0,...c.squad.map(id=>P(id).goals));ok=v>=g.tgt;txt=v+' de '+g.tgt+' gols';break;
   case 'dis':v=c.squad.reduce((s,id)=>s+P(id).rc,0);ok=v<=g.tgt;txt=v+' (máx. '+g.tgt+')';break;
   case 'val':v=+((squadVal(c)/Math.max(G0.val0,.1)-1)*100).toFixed(1);ok=v>=g.tgt;txt=(v>=0?'+':'')+dec(v)+'% de '+g.tgt+'%';break;
   case 'pts':v=c.P;ok=v>=g.tgt;txt=v+' de '+g.tgt+' pts';break;
  }
  const rev=g.k==='def'||g.k==='atk'||g.k==='dis'||g.k==='sup'||g.k==='cla';
  const pct=rev?(ok?100:g.k==='def'||g.k==='atk'?clamp(100-(v-g.tgt)*14,8,92):g.k==='cla'?(G0.riv.l?0:G0.riv.d?45:15):25):clamp(v/Math.max(g.tgt,.001)*100,0,100);
  return {v,ok,txt,pct:Math.round(pct)};
}

/* ---- encerramento da temporada: balanço das metas, paciência, eleição ---- */
const _es11=endSeason;endSeason=function(){
  ex();ex11a();_es11();
  try{
    const c=userClub(),g=G.goals,s=G.summary;if(!s||!g)return;
    const met=s.pos<=s.meta;let cDelta=0,done=0,fail=0;
    const bal=g.list.map(x=>{const pr=goalProg(x);if(pr.ok){done++;cDelta+=3}else{fail++;cDelta-=2.5}return {k:x.k,t:x.t,d:x.d,ok:pr.ok,txt:pr.txt}});
    G.board.conf=clamp(G.board.conf+cDelta,0,100);
    const p=G.pat;
    p.bd=clamp(p.bd+(met?8:s.pos<=s.meta+3?-3:-9)+done*2-fail*1.5+(s.pos<=3?3:0),0,100);
    p.fan=clamp(p.fan+(s.pos===1?10:s.pos<=4?5:s.pos<=8?1:-4)+(c.humor>=70?3:c.humor<35?-4:0),0,100);
    s.goals=bal;s.pat={bd:Math.round(p.bd),fan:Math.round(p.fan)};s.conf=G.board.conf;
    g.hist.push({s:G.season,met,done,fail,pos:s.pos,list:bal});
    s.jobs=(met||s.pos<=6||G.board.conf>=70)?G.clubs.filter(x=>x.id!==c.id&&x.rep>=c.rep-1).sort((a,b)=>Math.abs(a.rep-(c.rep+3+rnd(-2,2)))-Math.abs(b.rep-(c.rep+3+rnd(-2,2)))).slice(0,2).map(x=>x.id):[];
    holdElection(s);
    save();
  }catch(e){console.error('endSeason11',e)}
};

/* ============ ELEIÇÕES ============ */
const PRESP=[
 {k:'austero',n:'Gestão austera',d:'Corta custos e paga dívida. Orçamento menor, mas mais paciência com o treinador.',bm:.88,pat:+10,meta:+1,hum:0},
 {k:'investidor',n:'Investidor ambicioso',d:'Abre o cofre e cobra título. Orçamento maior, meta mais dura e paciência curta.',bm:1.25,pat:-8,meta:-1,hum:+2},
 {k:'popular',n:'Candidato popular',d:'Fala com a arquibancada. Clima e sócios sobem, mas o gasto vai pra ídolos.',bm:1.0,pat:+3,meta:0,hum:+8},
 {k:'base',n:'Presidente da base',d:'Prioriza a categoria de base e a identidade. Menos mercado, mais paciência.',bm:.92,pat:+8,meta:+1,hum:+2},
 {k:'profissional',n:'Executivo profissional',d:'Estrutura, contratos e estabilidade. Poucas ondas, orçamento estável.',bm:1.05,pat:+5,meta:0,hum:0}
];
const PRESN=['Roberto','Marcelo','Antônio','Sérgio','Luiz','Eduardo','Paulo','Carlos','Augusto','Humberto','Fernando','Wilson','Maurício','Ricardo'];
const PRESS=['Albuquerque','Nogueira','Camargo','Prado','Medeiros','Tavares','Siqueira','Bastos','Lacerda','Rangel','Vilela','Peixoto','Barreto','Duarte'];
function newPres(excl){const p=pick(PRESP.filter(x=>x.k!==excl));return {name:pick(PRESN)+' '+pick(PRESS),pf:p.k,ap:ri(52,68),since:G.season}}
function presOf(k){return PRESP.find(x=>x.k===k)||PRESP[4]}
function ensureEl(){
  if(!ex11a())return;if(G.el)return;
  G.el={pres:newPres(),termEnd:G.season+ri(0,2),stance:null,asked:false,hist:[],last:null,pending:null};
}
function holdElection(s){
  ensureEl();const e=G.el,c=userClub();if(G.season<e.termEnd)return;
  const met=s.pos<=s.meta;
  const debtTrend=G.goals&&G.goals.debt0?(1-c.debt/Math.max(G.goals.debt0,.1)):0;
  let A=e.pres.ap*.35+32+(met?9:-6)+(s.pos===1?14:0)+(c.humor-50)*.3+clamp(debtTrend*40,-8,8)+(G.board.conf-50)*.15+rnd(-9,9);
  if(e.stance==='apoio')A+=5;
  A=clamp(A,15,88);
  const ch=[];const n=ri(1,2);const used=[e.pres.pf];
  for(let i=0;i<n;i++){const pf=pick(PRESP.filter(x=>!used.includes(x.k)));used.push(pf.k);ch.push({name:pick(PRESN)+' '+pick(PRESS),pf:pf.k})}
  const share=[A,...ch.map((_,i)=>(100-A)*(i===0?(n===1?1:.6):.4))];
  const win=A>=50||(A>=40&&n===2&&Math.random()<.6);
  const res={s:G.season,old:e.pres.name,pf:e.pres.pf,shares:share.map(x=>Math.round(x)),cands:ch,win,stance:e.stance};
  if(win){e.pres.ap=clamp(Math.round(A),40,90);e.termEnd=G.season+3;res.winner=e.pres.name;G.pat.bd=clamp(G.pat.bd+3,0,100);G.board.conf=clamp(G.board.conf+(e.stance==='apoio'?4:2),0,100);
    paperLine(e.pres.name+' é reeleito presidente do '+c.name,'Com '+res.shares[0]+'% dos votos, mantém o projeto. '+(e.stance==='apoio'?G.coach+' havia declarado apoio.':''))}
  else{const w=ch[0];e.pending={name:w.name,pf:w.pf,ap:ri(60,75),since:G.season+1};res.winner=w.name;res.newpf=w.pf;e.termEnd=G.season+3;
    paperLine(w.name+' vence eleição e será o novo presidente do '+c.name,presOf(w.pf).n+' assume em '+(G.season+1)+'. Derrota do grupo de '+e.pres.name+'.')}
  e.last=res;e.hist.push(res);e.asked=false;s.elec=res;
}
const _ns11b=newSeason;newSeason=function(){
  _ns11b();
  try{
    ensureEl();const e=G.el;const c=userClub();
    if(e.pending){const pf=presOf(e.pending.pf);
      e.pres=e.pending;e.pending=null;
      G.fin.caixa=+(G.fin.caixa+(pf.bm-1)*scaleOf(c)*.25).toFixed(2);
      G.pat.bd=clamp(G.pat.bd+pf.pat,0,100);c.humor=clamp(c.humor+pf.hum,5,100);
      G.board.meta=clamp(G.board.meta+pf.meta,1,17);G.board.metaTxt=metaText(G.board.meta);
      const lost=e.stance==='apoio';G.board.conf=clamp(60+G.pat.bd*.1-(lost?9:0),20,95);
      addNews('Novo presidente: '+e.pres.name+' ('+pf.n+'). '+(lost?'Você apoiou o derrotado: clima pesado.':'Ele promete apoiar o seu trabalho.'));
      e.stance=null;
    }else{G.board.conf=Math.max(G.board.conf,50+G.pat.bd*.25);if(e.stance&&G.season>e.termEnd-3)e.stance=null}
    if(G.pat.bd>60)G.fin.caixa=+(G.fin.caixa+scaleOf(c)*.01*(G.pat.bd-60)/40).toFixed(2);
  }catch(er){console.error('ns elec',er)}
};
const _gp11=genPress;genPress=function(um){
  _gp11(um);
  try{ensureEl();const e=G.el;
    if(!G.press&&G.season>=e.termEnd&&!e.asked&&G.round>=16){e.asked=true;
      G.press={who:'Eleição no clube',q:'A campanha esquenta no '+userClub().name+'. O presidente '+e.pres.name+' busca a reeleição. Você declara apoio?',id:G.round,
       opts:[{t:'Apoio o presidente. Estamos juntos neste projeto.',st:'apoio',fx:{conf:2,humor:0,mor:0}},{t:'Eleição é assunto dos sócios. Eu cuido do campo.',st:'neutro',fx:{conf:0,humor:1,mor:0}},{t:'Quem mandar, eu respeito o contrato.',st:'neutro',fx:{conf:-1,humor:0,mor:0}}],skip:{conf:-.5,humor:-1,mor:0}};
      paperLine('Campanha eleitoral esquenta no '+userClub().name,'Chapas disputam o voto dos sócios no fim da temporada.');
    }else if(G.season>=e.termEnd&&G.round>=24&&G.round%5===0)paperLine('Eleição no '+userClub().name+': bastidores agitados','Oposição critica a gestão, situação aposta no bom momento do time.');
  }catch(er){console.error('genPress11',er)}
};
const _ap11=answerPress;answerPress=function(i){const q=G.press;_ap11(i);if(q&&q.opts&&i>=0&&q.opts[i]&&q.opts[i].st&&G.el)G.el.stance=q.opts[i].st};
shouldFire=function(){
  if(![9,19,29,37].includes(G.round))return false;
  const pat=G.pat?G.pat.bd:50;const k=clamp(1.35-pat/125,.5,1.35);
  return Math.random()<k/(1+Math.exp((G.board.conf-32)/7));
};

const _sc11=startCareer;startCareer=function(id,coach,phil,asst){_sc11(id,coach,phil,asst);ex();G.x11=0;G.el=null;ex11a();G.pat={bd:55,fan:55};ensureEl();G.el.termEnd=G.season+2;newSeasonGoals();save()};
const _tj11=takeJob;takeJob=function(id){
  const r=_tj11(id);
  try{ex();ex11a();const l=medLv(userClub());G.med.doc=l.doc;G.med.fisio=l.fisio;G.med.prep=l.prep;
    G.pat={bd:48,fan:50};G.el=null;ensureEl();newSeasonGoals();G.goals.cash0=G.fin.caixa;G.goals.debt0=userClub().debt;save()}catch(e){console.error('tj11',e)}
  return r;
};

/* a confiança do técnico não fica "travada" em 100: ela volta devagar para a média */
const _br11=boardRound;boardRound=function(m){_br11(m);if(G.board)G.board.conf=clamp(+(G.board.conf+(62-G.board.conf)*0.012).toFixed(1),0,100)};

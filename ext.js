/* ===== extensões: história, troféus, juniores, estádio, técnicos, transferências ===== */
const TROPH={PAL:[12,3,1,4],FLA:[8,3,1,4],BOT:[2,1,0,0],CAM:[3,1,0,2],FLU:[4,0,0,1],SAO:[6,3,3,1],INT:[3,2,1,1],GRE:[2,3,1,5],COR:[7,1,2,3],CRU:[4,2,0,6],BAH:[2,0,0,1],VAS:[4,1,0,1],CAP:[1,0,0,1],SAN:[8,3,2,0],RBB:[0,0,0,0],VIT:[0,0,0,0],CFC:[1,0,0,1],MIR:[0,0,0,0],CHA:[0,0,0,0],REM:[0,0,0,0]};
const TROPN=['Brasileirão','Libertadores','Mundial','Copa do Brasil'];
function ex(){
  if(!G||!G.clubs.length)return;
  ex2();ex4();ex5();
  if(G.ext)return;
  G.ext=1;G.xfers=[];G.myres=[];G.naming=null;
  G.coaches={};
  G.clubs.forEach(c=>{
    c.tro=(TROPH[c.sig]||[0,0,0,0]).slice();c.retro=[];
    c.coach={name:pick(FN)+' '+pick(LN),pts:0,V:0,E:0,D:0,titles:0};
    c.youth=[];fillYouth(c);
  });
  G.uc={name:G.coach||'Técnico',pts:0,V:0,E:0,D:0,titles:0};
}
const YPOS=['GOL','ZAG','LAT','VOL','MEI','PNT','ATA'];
function mkYouth(){
  const role=pick(YPOS),stars=ri(1,5),age=ri(16,18);
  const v=+(0.02+stars*0.012+rnd(0,0.02)).toFixed(3);
  const pool=ROLETR[role].slice();const tr=[pool.splice(ri(0,pool.length-1),1)[0],pool.splice(ri(0,pool.length-1),1)[0]];
  return {name:pick(FN)+' '+pick(LN),role,age,dev:ri(15,45),stars,tr,value:+v.toFixed(2),sal:+(v*0.05+0.06).toFixed(2)};
}
function fillYouth(c,max=5){while(c.youth.length<max)c.youth.push(mkYouth())}
function promoteYouth(c,i){
  const y=c.youth[i];if(!y)return 'Jogador não encontrado.';
  if(c.squad.length>=30)return 'Elenco cheio (máximo 30).';
  const ovr=youthOvr91(y,trainerQ91(c));
  const p=mkPlayer(y.role,ovr,y.age,c.id,y.name,false);p.tr=y.tr.slice();p.pot=Math.round(youthT91(y.stars));
  c.squad.push(p.id);c.youth.splice(i,1);
  if(c===userClub())addNews(p.name+' foi promovido da base.');
  return null;
}
function logX(p,from,to,fee){G.xfers.unshift({s:G.season,r:G.round+1,name:nameOf(p),from,to,fee:+fee.toFixed(2)});G.xfers=G.xfers.slice(0,80)}
/* patches */
hookAround('makeBid','mk',function(next,__a){let [pid,fee]=__a;ex();const p=P(pid),from=p.club;const r=next(pid,fee);if(r.ok)logX(p,from,G.user,fee);return r});
hookAround('sellPlayer','sp',function(next,__a){let [id]=__a;ex();const o=G.offers.find(x=>x.id===id);const r=next(id);if(!r&&o)logX(P(o.pid),G.user,o.buyer,o.fee);return r});
hookAround('signFree','sf',function(next,__a){let [pid]=__a;ex();const lu=valueOf(P(pid))*0.1;const r=next(pid);if(!r)logX(P(pid),-1,G.user,lu);return r});
hookAround('finishRound','ext_fr',function(next,A){
  ex();const out=next();
  const res=G.lastRound.results;
  const lf=G.lastRound.n;
  for(const r of res){
    for(const [cid,gf,ga] of [[r.h,r.hg,r.ag],[r.a,r.ag,r.hg]]){
      const co=cid===G.user?G.uc:C(cid).coach;
      if(gf>ga){co.V++;co.pts+=3}else if(gf===ga){co.E++;co.pts+=1}else co.D++;
    }
    if(r.u)G.myres.push({s:G.season,r:lf,h:r.h,a:r.a,hg:r.hg,ag:r.ag});
  }
  if(G.naming&&G.round<=NR()){G.fin.caixa=+(G.fin.caixa+G.naming.val/38).toFixed(2)}
  for(const c of G.clubs){c.youth.forEach(y=>{y.dev=Math.min(100,y.dev+ri(0,2))})}
  return out;
});
hookAround('endSeason','es',function(next,__a){
  ex();const rows=tableRows();
  rows.forEach((c,i)=>{c.retro.push({s:G.season,pos:i+1,J:c.J,V:c.V,E:c.E,D:c.D,GP:c.GP,GC:c.GC});
    const co=c.id===G.user?G.uc:c.coach;
    if(i===0){c.tro[0]++;co.titles++;co.pts+=60}else if(i<4)co.pts+=15;
  });
  return next();
});
hookAround('newSeason','ext_ns',function(next,A){
  ex();
  for(const p of Object.values(G.players)){if(p.club>=0&&C(p.club)){p.car=p.car||[];p.car.push({s:G.season,club:C(p.club).sig,J:p.games,G:p.goals,A:p.ast,nm:p.rn?+(p.rsum/p.rn).toFixed(2):null})}}
  const r=next();
  for(const c of G.clubs){c.youth.forEach(y=>{y.age++;y.dev=Math.min(100,y.dev+ri(8,16))});c.youth=c.youth.filter(y=>y.age<22);fillYouth(c)}
  return r;
});
/* estádio */
function stadSectors(c){const t=c.cap*1000;return {Geral:Math.round(t*0.15),Arquibancada:Math.round(t*0.6),Cadeira:Math.round(t*0.22),Camarote:Math.round(t*0.03)}}
let expandCost=c=>+(1.5+c.cap*0.12).toFixed(1);
function expandStadium(){const c=userClub();ex();if(c.cap>=90)return 'Capacidade máxima da demo (90 mil).';const k=expandCost(c);if(G.fin.caixa<k)return 'Caixa insuficiente ('+k+' mi).';G.fin.caixa=+(G.fin.caixa-k).toFixed(2);c.cap=+(c.cap+2).toFixed(1);G.board.conf=clamp(G.board.conf+1,0,100);c.humor=clamp(c.humor+2,5,100);addNews('Obras: estádio do '+c.name+' ganha 2 mil lugares.');return null}
function sellNaming(){const c=userClub();ex();if(G.naming)return 'Já existe contrato de naming rights.';G.naming={name:pick(['Arena Fortuna','Neo Química','Allianz Bet','Estádio Vivo','Arena Cripto']),val:+(c.spBase*0.35).toFixed(1)};c.humor=clamp(c.humor-8,5,100);return null}

/* ===== pênaltis narrados ===== */
const PEN={
 pre:["{t} pega a bola, ajeita na marca da cal e respira fundo.","{t} está visivelmente nervoso. O estádio prende o fôlego.","{t} beija a bola e caminha devagar para a marca.","{g} conversa com a bola e encara {t}. Clima pesado.","{t} pede a cobrança para si, ninguém discute.","A torcida vaia forte enquanto {t} posiciona a bola."],
 ap:["O juiz apita. Silêncio no estádio.","Apito do árbitro autoriza a cobrança.","O árbitro olha para os dois lados e apita.","Apito! {g} abre os braços na linha do gol."],
 run:["{t} corre para a bola com passos curtos.","{t} vem em direção à bola, dá uma paradinha...","{t} corre sem hesitar, de olho no canto.","{t} corre... e {g} se mexe antes da hora?"],
 bat:{in:["{t} bate rasteiro no canto direito!","{t} bate forte no meio do gol!","{t} bate colocado no ângulo!","{t} bate de cavadinha, ousadia total!"],out:["{t} bate cruzado, mas mal colocado...","{t} bate de chapa, muito forte...","{t} bate e {g} já tinha escolhido o canto...","{t} bate de pé direito, sem convicção..."]},
 goal:["{g} pula para o lado errado... GOL!","GOL! A bola balança a rede!","GOL! {g} ainda tocou, mas não segurou.","É GOL! {t} não tremeu."],
 save:["{g} defende! Que pênalti perdido!","Na trave! Quase!","Para fora! {t} leva as mãos à cabeça.","{g} espalma e salva o time!"],
 cg:["{t} comemora provocando a torcida rival.","A torcida explode e {t} corre para o alambrado.","{t} comemora com a mão no ouvido. Estádio em festa.","A torcida riu da hesitação do goleiro."],
 cs:["A torcida rival ironiza {t}.","{t} lamenta, a cabeça baixa. A torcida se divide entre vaias e aplausos.","{g} é abraçado pelos companheiros.","A torcida riu do chute, mas aplaude o goleiro."]
};
const pk=a=>a[Math.floor(Math.random()*a.length)];
function mkPen(m,k){
  const S=m[k],O=m[k==='h'?'a':'h'];
  const cands=S.lineup.filter((id,i)=>S.slots[i]!=='GK'&&!S.sent.includes(id));
  const tk=cands.map(id=>{const p=P(id);return [id,p.ovr+(p.tr.includes('Fin')?6:0)+(p.tr.includes('Pen')?8:0)+Math.random()*8]}).sort((a,b)=>b[1]-a[1])[0][0];
  const gk=O.lineup[0],tp=P(tk),gp=P(gk);
  const pc=clamp(0.78+(tp.tr.includes('Fin')?0.04:0)-(gp.tr.includes('Pen')?0.07:0)+(tp.mor-70)/600,0.5,0.9);
  const goal=Math.random()<pc;
  const t=lastName(tp.name),g=lastName(gp.name);
  const f=s=>s.replace(/\{t\}/g,t).replace(/\{g\}/g,g);
  const lines=[f(pk(PEN.pre)),f(pk(PEN.ap)),f(pk(PEN.run))+' '+f(pk(goal?PEN.bat.in:PEN.bat.out)),f(pk(goal?PEN.goal:PEN.save)),f(pk(goal?PEN.cg:PEN.cs))];
  if(goal){if(k==='h')m.hg++;else m.ag++;m.scorers.push({pid:tk,ast:null,min:m.min,side:k});m.rt[tk]+=0.9;m.stats[k==='h'?'shT':'saT']++}
  else{m.rt[tk]-=0.8;m.rt[gk]+=0.8}
  m.stats[k==='h'?'sh':'sa']++;
  m.ev.push({min:m.min,side:k,type:goal?'goal':'miss',pid:tk,text:(goal?'GOL de pênalti! ':'Pênalti perdido por ')+(goal?nameOf(tp):nameOf(tp)),pen:{lines,goal,taker:t}});
}
const _smin=stepMinute;stepMinute=function(m){_smin(m);if(!m.done&&m.min>3&&m.min<90&&Math.random()<(TUNE.pen||0.0012)*2)mkPen(m,Math.random()<0.55?'h':'a')};
/* ===== técnicos: critérios múltiplos ===== */
hookAround('subPlayer','sub',function(next,__a){let [m,k,o,i]=__a;const r=next(m,k,o,i);if(r&&R&&m===R.ms[R.ui]&&k===userSide(m)){m.tac=m.tac||[];m.tac.push({min:m.min,diff:k==='h'?m.hg-m.ag:m.ag-m.hg})}return r});
hookAround('answerPress','ap',function(next,__a){let [i]=__a;ex();const b=G.board.conf,h=userClub().humor;next(i);G.uc.imp=(G.uc.imp||0)+(G.board.conf-b)+(userClub().humor-h)*0.5+(i<0?-1:0.5)});
hookAround('finishRound','ext_fr2',function(next,A){
  ex();const um=R.ms[R.ui],k=userSide(um);const tac=(um.tac||[]).slice();const fin=k==='h'?um.hg-um.ag:um.ag-um.hg;const cb=G.board.conf;
  const out=next();const u=G.uc;
  for(const x of tac){const d=fin-x.diff;u.tat=(u.tat||0)+(d>0?3:d<0?-1:0.5)}
  const st=fin>0?'w':fin<0?'l':'d';u.ls=st==='l'?(u.ls||0)+1:0;
  const dc=G.board.conf-cb;
  if(st==='w'&&(u.wasLow||0)>=2)u.cri=(u.cri||0)+4;
  u.wasLow=st==='l'?(u.wasLow||0)+1:(st==='w'?0:u.wasLow||0);
  if(st==='l'&&u.ls>=3)u.cri=(u.cri||0)-2;
  if(dc<-5)u.cri=(u.cri||0)-2;
  if(G.board.conf>70)u.cri=(u.cri||0)+0.3;
  if(out==='fired')u.cri=(u.cri||0)-30;
  /* v32: ganhos dos técnicos da IA agora por desempenho (ext32.coachTick) */
  return out;
});
const COACHK={geral:'Geral',res:'Resultados',imp:'Imprensa',cri:'Gestão de crises',tat:'Maestria tática'};
function coachRank(kind='geral'){
  ex();const L=G.clubs.map(c=>{const co=c.id===G.user?G.uc:c.coach;
    const res=co.pts,imp=+(co.imp||0).toFixed(1),cri=+(co.cri||0).toFixed(1),tat=+(co.tat||0).toFixed(1);
    const tot=+(res+imp*1.5+cri*1.5+tat*2).toFixed(1);
    return {name:co.name,club:c.name,sig:c.sig,id:c.id,V:co.V,E:co.E,D:co.D,titles:co.titles,res,imp,cri,tat,tot,me:c.id===G.user}});
  const key={geral:'tot',res:'res',imp:'imp',cri:'cri',tat:'tat'}[kind];
  return L.sort((a,b)=>b[key]-a[key]||b.tot-a.tot);
}

/* ext18: Fase 5 (parte 1) — Copa do Brasil jogável + Libertadores/Sul-Americana (grupo e mata-mata do seu clube) */
const FCPOOL=[['River Plate','RVP',79,'#ffffff','#d71920','#ffffff','diag'],['Boca Juniors','BOC',78,'#0b3d91','#ffd426','#0b3d91','h'],['Racing','RAC',74,'#7ec8ff','#ffffff','#7ec8ff','v'],['Estudiantes','ETU',72,'#d71920','#ffffff','#d71920','v'],['Independiente','IDP',72,'#d71920','#ffffff','#d71920','solid'],['San Lorenzo','SLO',70,'#0b3d91','#d71920','#0b3d91','v'],['Vélez Sarsfield','VEL',71,'#ffffff','#0b3d91','#ffffff','diag'],['Talleres','TAL',69,'#0b3d91','#ffffff','#0b3d91','h'],['Lanús','LAN',69,'#8a1538','#ffffff','#8a1538','solid'],['Peñarol','PEN',73,'#111111','#ffd426','#111111','v'],['Nacional (URU)','NAU',72,'#ffffff','#0b3d91','#d71920','tri'],['Colo-Colo','COL',70,'#ffffff','#111111','#ffffff','solid'],['Universidad Católica','UCA',68,'#ffffff','#0b3d91','#ffffff','half'],['LDU Quito','LDU',70,'#ffffff','#0b3d91','#d71920','solid'],['Independiente del Valle','IDV',72,'#111111','#7ec8ff','#111111','h'],['Barcelona SC','BSC',68,'#ffd426','#111111','#ffd426','solid'],['Olimpia','OLI',69,'#ffffff','#111111','#ffffff','h'],['Cerro Porteño','CER',68,'#0b3d91','#d71920','#0b3d91','h'],['Libertad','LIB',67,'#111111','#ffffff','#111111','v'],['Atlético Nacional','ANA',70,'#0b7a45','#ffffff','#0b7a45','solid'],['Millonarios','MIL',67,'#0b3d91','#ffffff','#0b3d91','solid'],['Bolívar','BLV',66,'#7ec8ff','#ffffff','#7ec8ff','solid'],['Alianza Lima','ALI',66,'#0b3d91','#ffffff','#0b3d91','v'],['Universitario','UNI',66,'#ffd426','#8a1538','#ffd426','solid'],['Sporting Cristal','SCR',65,'#7ec8ff','#ffffff','#7ec8ff','solid'],['Defensa y Justicia','DYJ',66,'#ffd426','#0b7a45','#ffd426','v']];
const CSL=[4,9,16,23,31],CNAMES=['1ª fase','Oitavas','Quartas','Semifinal','Final'],CPRIZE=[0.6,1.2,2.5,5,10];
const GSL=[6,11,15,20,25,29],KSL=[33,35,36,37],KNAMES=['Oitavas','Quartas','Semifinal','Final'];
const COMPN={LIB:'Libertadores',SUL:'Sul-Americana'};

/* ---------- clubes e jogadores estrangeiros (efêmeros) ---------- */
function fcMake(sig,rep){
  G.fc=G.fc||[];const d=FCPOOL.find(x=>x[1]===sig),id=100+G.fc.length;
  const c={id,name:d[0],sig:d[1],rep:rep||d[2],cap:35000,c1:d[3],c2:d[4],c3:d[5],pat:d[6],squad:[],formation:pick(['4-4-2','4-3-3','4-2-3-1','3-5-2']),style:pick(STYLES),phil:pick(PHN),humor:60,caixa:0,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,CH:0,div:9,fx:true,youth:[]};
  c.color=c.c1==='#ffffff'?c.c2:c.c1;G.fc.push(c);return c;
}
function fcEnsure(id){
  const c=C(id);if(!c||!c.fx||c.squad.length)return;
  G.fp=G.fp||{};const ids=genSquad(Object.assign({},c,{rep:c.rep+2}));
  c.squad=ids.map(i=>{const p=G.players[i];delete G.players[i];p.id=1e6+i;p.club=c.id;G.fp[p.id]=p;return p.id});
  autoPick(c);
}
function fcClean(){if(!G)return;if(G.fp&&G.fc)for(const c of G.fc){if(c.squad.length){c.squad.forEach(i=>{delete G.fp[i]});c.squad=[]}}
  if(G.fp)for(const k of Object.keys(G.fp))if(!G.fc||!G.fc.some(c=>c.squad.includes(+k)))delete G.fp[k]}

/* ---------- Copa do Brasil ---------- */
function cupInit(){
  const A=G.clubs.filter(c=>c.div===0).map(c=>c.id);
  const B=G.clubs.filter(c=>c.div===1).sort((a,b)=>b.rep-a.rep).slice(0,8).map(c=>c.id);
  const Cc=G.clubs.filter(c=>c.div===2).sort((a,b)=>b.rep-a.rep).slice(0,4).map(c=>c.id);
  let t=[...A,...B,...Cc];
  if(G.user!=null&&!t.includes(G.user)){t.pop();t.push(G.user)}
  t=shuffle(t);const pairs=[];for(let i=0;i<t.length;i+=2)pairs.push([t[i],t[i+1]]);
  G.cup={s:G.season,st:0,pairs,hist:[],champ:null,out:null,prize:0};
}
function userInPairs(p){return p.some(([h,a])=>h===G.user||a===G.user)}
function quickMatch(h,a,ko){
  const m=newMatch(C(h),C(a));while(!m.done)stepMinute(m);
  let w=m.hg>m.ag?h:m.hg<m.ag?a:null,pen=null;
  if(w===null&&ko){pen=shootout(C(h).rep,C(a).rep);w=pen[0]>pen[1]?h:a}
  return {h,a,hg:m.hg,ag:m.ag,pen,w};
}
function shootout(rh,ra){
  let h=0,a=0;const ph=.74+(rh-ra)/400,pa=.74+(ra-rh)/400;
  for(let i=0;i<5;i++){if(Math.random()<ph)h++;if(Math.random()<pa)a++}
  while(h===a){if(Math.random()<ph)h++;if(Math.random()<pa)a++}
  return [h,a];
}
function cupAdvance(results){
  const c=G.cup;c.hist.push({st:c.st,name:CNAMES[c.st],res:results.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,pen:r.pen,w:r.w}))});
  const win=results.map(r=>r.w);c.st++;
  if(c.st>=5){c.champ=win[0];c.pairs=[];G.cupHist=G.cupHist||[];const f=results[0];G.cupHist.push({s:G.season,champ:win[0],vice:f.h===win[0]?f.a:f.h})}
  else{c.pairs=[];for(let i=0;i<win.length;i+=2)c.pairs.push([win[i],win[i+1]])}
}
function cupAuto(){
  const c=G.cup;const res=c.pairs.map(([h,a])=>quickMatch(h,a,true));cupAdvance(res);
}

/* ---------- competição continental (só o seu grupo e o seu mata-mata) ---------- */
function contInit(comp){
  G.fc=[];G.fp={};
  const pool=shuffle(FCPOOL.slice());const g=pool.slice(0,3).map(d=>fcMake(d[1]).id);
  const ids=[G.user,...g];
  // turno e returno em 3 datas duplas: (0-1,2-3) (0-2,1-3) (0-3,1-2), depois invertido
  const base=[[[0,1],[2,3]],[[0,2],[1,3]],[[0,3],[1,2]]];
  const sched=[...base,...base].map((md,i)=>md.map(([x,y])=>i<3?[ids[x],ids[y]]:[ids[y],ids[x]]));
  const tbl={};ids.forEach(i=>tbl[i]={J:0,P:0,V:0,E:0,D:0,GP:0,GC:0});
  G.cont={comp,s:G.season,ids,sched,tbl,md:0,phase:'group',st:0,opp:[],log:[],alive:true,champ:false,prize:0,
    pool:pool.slice(3).map(d=>d[1])};
  G.fin.caixa=+(G.fin.caixa+(comp==='LIB'?8:3)).toFixed(1);G.cont.prize+=comp==='LIB'?8:3;
  addNews('Você disputa a '+COMPN[comp]+' '+G.season+'. Grupo: '+g.map(i=>C(i).name).join(', ')+'.');
}
function contQualify(){
  // chamado no fim da temporada, antes do reset da tabela
  const c=userClub();if(!c||c.div!==0)return null;
  const rows=tableRows(0).map(x=>x.id);const cupCh=G.cup&&G.cup.champ;
  let lib=rows.slice(0,5);if(cupCh!=null&&!lib.includes(cupCh))lib.push(cupCh);else lib.push(rows[5]);
  lib=[...new Set(lib)].slice(0,6);
  const sul=rows.filter(i=>!lib.includes(i)).slice(0,6);
  G.contNext={lib,sul};
  return lib.includes(G.user)?'LIB':sul.includes(G.user)?'SUL':null;
}
function contKoOpp(){
  const k=G.cont;if(!k.pool.length)k.pool=FCPOOL.map(d=>d[1]);
  const sig=k.pool.splice(Math.floor(Math.random()*k.pool.length),1)[0];const c=fcMake(sig,FCPOOL.find(d=>d[1]===sig)[2]+k.st*1.5);return c.id;
}
function contDue(){const k=G.cont;if(!k||!k.alive)return null;
  if(k.phase==='group'&&k.md<6&&G.round>=GSL[k.md])return GSL[k.md];
  if(k.phase==='ko'&&k.st<4&&G.round>=KSL[k.st])return KSL[k.st];return null}

/* ---------- sincronizar calendário ---------- */
function extraSync(){
  if(!G||G.phase!=='play'||G.user==null||G.round>=NR()||G._lg)return;
  for(let guard=0;guard<8;guard++){
    const c=G.cup;
    if(c&&c.st<5&&G.round>=CSL[c.st]&&!userInPairs(c.pairs)){cupAuto();continue}   // você já caiu: a copa corre sem você
    const dc=(c&&c.st<5&&userInPairs(c.pairs)&&G.round>=CSL[c.st])?CSL[c.st]:null,dk=contDue();
    if(dc==null&&dk==null)return;
    const pickCup=dk==null||(dc!=null&&dc<=dk);
    let pairs,info;
    if(pickCup){pairs=c.pairs.map(p=>p.slice());info={kind:'cup',label:'Copa do Brasil · '+CNAMES[c.st]}}
    else{const k=G.cont;
      if(k.phase==='group'){pairs=k.sched[k.md].map(p=>p.slice());info={kind:'cont',ko:false,label:COMPN[k.comp]+' · Grupo, rodada '+(k.md+1)+' de 6'}}
      else{if(!k.opp[k.st])k.opp[k.st]=contKoOpp();const o=k.opp[k.st];pairs=[k.st===3||k.st%2===0?[G.user,o]:[o,G.user]];info={kind:'cont',ko:true,label:COMPN[k.comp]+' · '+KNAMES[k.st]}}}
    for(const [h,a] of pairs){fcEnsure(h);fcEnsure(a)}
    G._lg=G.fixtures[G.round];G.fixtures[G.round]=pairs;G._x=info;return;
  }
}
const _sr18=startRound;startRound=function(){extraSync();const r=_sr18();if(G._lg)r.xtra=true;return r};
const _rd18=render;render=function(){try{extraSync()}catch(e){console.error('extraSync '+e.message)}_rd18();
  try{if(G&&G._lg&&G._x){const e=document.querySelector('.nxh');if(e)e.textContent=G._x.label}}catch(e){}};

/* ---------- fim da partida extra ---------- */
function finishExtra(){
  const x=G._x,um=R.ms[R.ui],us=userSide(um),c=userClub();
  const gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg;
  const ko=x.kind==='cup'||x.ko;
  const results=R.ms.map((m,i)=>{
    for(const [k,s] of [['h',m.h],['a',m.a]]){const club=s.club;if(club.fx)continue;
      const won=k==='h'?m.hg>m.ag:m.ag>m.hg,lost=k==='h'?m.hg<m.ag:m.ag<m.hg;
      for(const id of new Set([...s.lineup,...s.used,...s.outs])){const p=P(id);p.en=clamp(Math.round(m.en[id]-4),20,100);p.mor=clamp(p.mor+(won?3:lost?-3:0),30,100);if(Math.random()<(p.en<45?.06:.025))p.inj=ri(1,5)}}
    let pen=null,w=m.hg>m.ag?m.h.club.id:m.hg<m.ag?m.a.club.id:null;
    if(w===null&&ko){pen=shootout(m.h.club.rep,m.a.club.rep);w=pen[0]>pen[1]?m.h.club.id:m.a.club.id}
    return {h:m.h.club.id,a:m.a.club.id,hg:m.hg,ag:m.ag,pen,w,u:i===R.ui};
  });
  const ur=results.find(r=>r.u);const adv=ko?ur.w===G.user:null;
  const home=us==='h';let prize=0,note='';
  if(home){const g=+(scaleOf(c)*.012).toFixed(1);prize+=g}
  if(x.kind==='cup'){
    const cp=G.cup;
    if(adv){prize+=CPRIZE[cp.st]*Math.max(.7,scaleOf(c)/100);note=cp.st===4?'CAMPEÃO DA COPA DO BRASIL!':'Você avançou para '+CNAMES[cp.st+1]+'.'}else note='Eliminado da Copa do Brasil na fase "'+CNAMES[cp.st]+'".';
    if(adv&&cp.st===4){prize+=20*Math.max(.7,scaleOf(c)/100);c.humor=clamp(c.humor+12,5,100);G.board.conf=clamp(G.board.conf+8,0,100);paperLine(c.name+' é campeão da Copa do Brasil!','Troféu histórico e vaga na Libertadores.');G.trophyCup=(G.trophyCup||0)+1}
    // resolve todos os outros jogos da fase
    const full=results.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,pen:r.pen,w:r.w}));cupAdvance(full);
    if(!adv){cp.out=CNAMES[G.cup.st-1];if(G.cup.st<5)while(G.cup.st<5)cupAuto()}
    if(!adv)addNews('Copa do Brasil: você caiu na fase "'+CNAMES[(G.cup.hist[G.cup.hist.length-1]||{}).st]+'".');
    else if(G.cup.st<5)addNews('Copa do Brasil: sorteio da próxima fase definido.');
  }else{
    const k=G.cont,scl=k.comp==='LIB'?1:.4;
    if(!x.ko){
      for(const r of results){const a=k.tbl[r.h],b=k.tbl[r.a];if(!a||!b)continue;a.J++;b.J++;a.GP+=r.hg;a.GC+=r.ag;b.GP+=r.ag;b.GC+=r.hg;
        if(r.hg>r.ag){a.V++;a.P+=3;b.D++}else if(r.hg<r.ag){b.V++;b.P+=3;a.D++}else{a.E++;b.E++;a.P++;b.P++}}
      const win=(ur.h===G.user&&ur.hg>ur.ag)||(ur.a===G.user&&ur.ag>ur.hg);if(win)prize+=2*scl;
      k.log.unshift({label:'Grupo '+(k.md+1),res:results.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag}))});k.md++;
      if(k.md>=6){const order=k.ids.slice().sort((p,q)=>k.tbl[q].P-k.tbl[p].P||(k.tbl[q].GP-k.tbl[q].GC)-(k.tbl[p].GP-k.tbl[p].GC)||k.tbl[q].GP-k.tbl[p].GP);
        const pos=order.indexOf(G.user)+1;k.gpos=pos;
        if(pos<=2){k.phase='ko';k.st=0;note='Classificado às oitavas, '+pos+'º do grupo!';addNews(COMPN[k.comp]+': você passou de fase em '+pos+'º no grupo.')}
        else{k.phase='done';k.alive=false;note='Eliminado na fase de grupos ('+pos+'º lugar).';addNews(COMPN[k.comp]+': eliminação na fase de grupos.')}}
    }else{
      k.log.unshift({label:KNAMES[k.st],res:results.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,pen:r.pen}))});
      if(adv){prize+=[4,6,10,15][k.st]*scl;note=k.st===3?'CAMPEÃO DA '+COMPN[k.comp].toUpperCase()+'!':'Você avançou para '+KNAMES[k.st+1]+'.';
        if(k.st===3){prize+=(k.comp==='LIB'?35:14);k.champ=true;k.alive=false;k.phase='done';c.humor=clamp(c.humor+14,5,100);G.board.conf=clamp(G.board.conf+10,0,100);paperLine(c.name+' é campeão da '+COMPN[k.comp]+'!','Taça continental e festa da torcida.');G.trophyCont=(G.trophyCont||0)+1}
        else k.st++}
      else{note='Eliminado na fase "'+KNAMES[k.st]+'" da '+COMPN[k.comp]+'.';k.phase='done';k.alive=false;addNews(COMPN[k.comp]+': eliminação nas '+KNAMES[k.st].toLowerCase()+'.')}}
  }
  prize=+prize.toFixed(1);G.fin.caixa=+(G.fin.caixa+prize).toFixed(1);if(x.kind==='cup')G.cup.prize+=prize;else G.cont.prize+=prize;
  G.lastRound={n:G.round,results:results.map(r=>({h:r.h,a:r.a,hg:r.hg,ag:r.ag,u:r.u})),ratings:Object.assign({},um.rt),scorers:um.scorers,stats:um.stats,user:{home},cup:{label:x.label,adv,pen:ur.pen,prize,note,ko}};
  c.humor=clamp(c.humor+(gf>ga?3:gf<ga?-3:0),5,100);
  for(const p of Object.values(G.players))if(p.club>=0&&p.en<100)p.en=clamp(p.en+6,0,100);
  // restaura a rodada do campeonato
  G.fixtures[G.round]=G._lg;G._lg=null;G._x=null;R=null;
  fcClean();
  save();return 'next';
}
const _fr18=finishRound;finishRound=function(){if(G._lg&&G._x&&R&&R.xtra)return finishExtra();return _fr18.apply(this,arguments)};

/* ---------- ciclo da temporada ---------- */
const _ns18=newSeason;newSeason=function(){
  let q=null;try{q=contQualify()}catch(e){console.error('qual '+e.message)}
  G._lg=null;G._x=null;
  const r=_ns18();
  try{G.fc=[];G.fp={};cupInit();G.cont=null;if(q)contInit(q)}catch(e){console.error('ns18 '+e.message)}
  return r;
};
function qualInit(){ // início de carreira: tradição define a vaga continental
  const c=userClub();G.cupHist=[];G.cont=null;G.fc=[];G.fp={};G._lg=null;G._x=null;cupInit();
  if(c.div===0){const rk=G.clubs.filter(x=>x.div===0).sort((a,b)=>b.rep-a.rep).map(x=>x.id);const i=rk.indexOf(c.id);
    if(i<6)contInit('LIB');else if(i<12)contInit('SUL')}
}
const _sc18=startCareer;startCareer=function(){_sc18.apply(this,arguments);try{qualInit()}catch(e){console.error('qi '+e.message)}save()};
const _tj18=takeJob;takeJob=function(){const r=_tj18.apply(this,arguments);try{G._lg=null;G._x=null;fcClean();G.fc=[];G.cont=null;if(G.cup&&!userInPairs(G.cup.pairs)&&G.cup.st<5){}}catch(e){}return r};
const _ls18=loadSave;loadSave=function(){const ok=_ls18();if(ok){try{G._lg=null;G._x=null;if(!G.cup)cupInit()}catch(e){}}return ok};

const _sv18=save;save=function(){const sw=(G&&G._lg)?G.fixtures[G.round]:null;if(sw)G.fixtures[G.round]=G._lg;try{return _sv18.apply(this,arguments)}finally{if(sw)G.fixtures[G.round]=sw}};

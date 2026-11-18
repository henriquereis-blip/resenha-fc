/* ===== Resenha FC v2 — motor ===== */
const rnd=(a=0,b=1)=>a+Math.random()*(b-a);
const ri=(a,b)=>Math.floor(rnd(a,b+1));
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const gauss=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const FORMS={'4-4-2':[4,4,2],'4-3-3':[4,3,3],'3-5-2':[3,5,2],'4-5-1':[4,5,1],'3-4-3':[3,4,3],'5-3-2':[5,3,2]};
const STYLES=['Equilibrado','Ofensivo','Defensivo','Contra-ataque','Posse'];
const PHN=PHILS.map(x=>x[0]);
const TRG={GK:['Ref','Pes','Sai','Pen','Aer'],DEF:['Des','Mar','Cab','Ant','Lid','Cru','Vel','Apo','Pas'],MID:['Mar','Des','Pas','Vis','Arm','Fin','Dri','Fol','Cha'],ATA:['Fin','Cab','Vel','Dri','Pas','Pos','For','Cob']};
const slotsOf=f=>{const [d,m,a]=FORMS[f];return ['GK',...Array(d).fill('DEF'),...Array(m).fill('MID'),...Array(a).fill('ATA')]};
let G=null,R=null;
const SAVE_KEY='resenhafc_v2';
/* SKV: armazenamento dos saves. Memória + IndexedDB (sem o limite de ~5MB do localStorage); migra saves antigos do localStorage; se IDB falhar, usa localStorage puro. */
const SKV=(function(){
  const mem={};let ready=false,db=null,idbOk=false;const pend={};let tm=null;
  const isK=k=>String(k).indexOf(SAVE_KEY)===0;
  const LS={g:k=>{try{return localStorage.getItem(k)}catch(e){return null}},s:k=>0};
  function flush(){tm=null;if(!db)return;const ks=Object.keys(pend);if(!ks.length)return;
    try{const tx=db.transaction('kv','readwrite'),st=tx.objectStore('kv');
      ks.forEach(k=>{if(pend[k]===null)st.delete(k);else st.put(pend[k],k);delete pend[k]});
      tx.onerror=tx.onabort=()=>{idbOk=false;ks.forEach(k=>{try{if(mem[k]!=null)localStorage.setItem(k,mem[k])}catch(e){}})}}catch(e){idbOk=false}}
  function sched(now){if(now){clearTimeout(tm);flush()}else if(!tm)tm=setTimeout(flush,250)}
  const api={
    getItem(k){if(!isK(k))return LS.g(k);if(k in mem)return mem[k];return ready&&idbOk?null:LS.g(k)},
    setItem(k,v){v=String(v);if(!isK(k)){localStorage.setItem(k,v);return}
      mem[k]=v;
      if(idbOk){pend[k]=v;sched();try{localStorage.removeItem(k)}catch(e){}}
      else localStorage.setItem(k,v)},
    removeItem(k){if(!isK(k)){localStorage.removeItem(k);return}
      delete mem[k];try{localStorage.removeItem(k)}catch(e){}
      if(idbOk){pend[k]=null;sched()}},
    flush:()=>sched(true),
    info:()=>({idb:idbOk,ready,keys:Object.keys(mem).length})
  };
  function lsKeys(){const r=[];try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&isK(k))r.push(k)}}catch(e){}return r}
  function init(){
    let rq;try{rq=indexedDB.open('resenhafc',1)}catch(e){ready=true;return}
    rq.onupgradeneeded=()=>{try{rq.result.createObjectStore('kv')}catch(e){}};
    rq.onerror=rq.onblocked=()=>{ready=true};
    rq.onsuccess=()=>{
      db=rq.result;
      try{
        const st=db.transaction('kv','readonly').objectStore('kv'),cr=st.openCursor();
        cr.onsuccess=()=>{const c=cr.result;
          if(c){if(!(c.key in mem))mem[c.key]=c.value;c.continue();return}
          idbOk=true;
          /* migração: o que ainda está só no localStorage vai pro IDB; só apaga do localStorage depois de gravar */
          const tt=x=>{const m=x&&x.match(/"_t":(\d+)/);return m?+m[1]:0};lsKeys().forEach(k=>{const v=LS.g(k);if(v!=null&&(!(k in mem)||tt(v)>tt(mem[k])))mem[k]=v});
          const all=lsKeys();
          try{const tx=db.transaction('kv','readwrite'),s2=tx.objectStore('kv');
            Object.keys(mem).forEach(k=>{if(all.indexOf(k)>=0)s2.put(mem[k],k)});
            tx.oncomplete=()=>{all.forEach(k=>{try{if(LS.g(k)!=null&&mem[k]!=null)localStorage.removeItem(k)}catch(e){}})};
            tx.onerror=tx.onabort=()=>{};
          }catch(e){}
          ready=true;
          try{if(typeof G!=='undefined'&&G&&G.phase==='start'&&typeof render==='function')render()}catch(e){}
        };
        cr.onerror=()=>{ready=true};
      }catch(e){ready=true}
    };
  }
  init();
  try{if(navigator.storage&&navigator.storage.persist)navigator.storage.persist()}catch(e){}
  document.addEventListener('visibilitychange',()=>{if(document.hidden)api.flush()});
  window.addEventListener('pagehide',()=>api.flush());
  return api;
})();

const P=id=>id>=1e6?G.fp[id]:G.players[id],FCB=()=>(G&&G.rg)?1000:100,C=id=>(id>=FCB()&&id<1e6&&!(G&&G.abroad))?G.fc[id-FCB()]:G.clubs[id],userClub=()=>G.clubs[G.user];

/* ---------- jogadores ---------- */
function valueOf(p){const ageF=p.age<=21?1.35:p.age<=25?1.15:p.age<=29?1:p.age<=32?0.65:0.35;return +(0.7*Math.pow(1.17,p.ovr-50)*ageF).toFixed(2)}
function salOf(p){return +Math.max(0.2,valueOf(p)*0.11).toFixed(2)}
const NMS=new Set();
function uniqName(){let n;for(let i=0;i<40;i++){n=pick(FN)+' '+pick(LN);if(!NMS.has(n))break}NMS.add(n);return n}
function mkPlayer(role,ovr,age,club,name,real){if(name)NMS.add(name);
  ovr=clamp(Math.round(ovr),42,92);
  const pos=GROUP[role];
  const pool=ROLETR[role].slice();const tr=[];
  while(tr.length<2){tr.push(pool.splice(ri(0,pool.length-1),1)[0])}
  const pot=age<=20?clamp(ovr+ri(3,17),ovr,93):age<24?clamp(ovr+ri(1,10),ovr,92):clamp(ovr+ri(-1,2),40,94);
  const off={GK:[0,-8,-3,0,4],DEF:[2,0,-4,0,5],MID:[0,-1,4,3,-2],ATA:[0,3,3,-1,-12]}[pos];
  const at={FIS:ovr+off[0]+gauss()*3,VEL:ovr+off[1]+gauss()*3,TEC:ovr+off[2]+gauss()*3,INT:ovr+off[3]+gauss()*3,DEF:ovr+off[4]+gauss()*3};
  for(const t of tr){if(t==='Vel')at.VEL+=5;if(['Fin','Dri','Cob','Cha'].includes(t))at.TEC+=4;if(['Mar','Des','Ant'].includes(t))at.DEF+=4;if(['For','Fol'].includes(t))at.FIS+=5;if(['Vis','Arm','Pas','Pos'].includes(t))at.INT+=4}
  for(const k in at)at[k]=clamp(Math.round(at[k]),25,96);
  const fit={};
  for(const ph of PHN){
    let n=0;for(const t of tr)if(TN[t][2].includes(ph))n++;
    fit[ph]=clamp(Math.round(34+n*21+(age<25?3:0)+rnd(-8,12)),5,98);
  }
  const p={id:G.nextId++,name:name||uniqName(),real:!!real,pos,role,age,ovr,pot,en:ri(88,100),mor:ri(62,82),inj:0,goals:0,ast:0,games:0,rsum:0,rn:0,yc:0,rc:0,club,listed:false,tr,at,fit};
  G.players[p.id]=p;return p;
}
const STAR={'Neymar':83,'Arrascaeta':85,'Raphael Veiga':83,'Pedro':83,'Gerson':83,'Hulk':82,'Memphis Depay':82,'Yuri Alberto':82,'Gustavo Gómez':81,'De La Cruz':82,'Paulinho':82,'Germán Cano':80,'Gabigol':80,'Calleri':80,'Richard Ríos':80,'Rodrigo Garro':79,'Jhon Arias':79,'Savarino':79,'Bruno Henrique':79,'Igor Jesus':78,'Flaco López':78,'Borré':78,'Thiago Silva':77,'Alex Telles':77,'Léo Pereira':77,'Emiliano Martínez':77,'Ramón Sosa':77,'Enner Valencia':77,'Rony':77,'Fábio':76,'Rossi':76,'Agustín Rossi':76,'Gustavo Scarpa':76,'Alan Patrick':76,'Hugo Souza':76,'Vitor Roque':78,'Felipe Anderson':78,'Jorginho':73,'Danilo':72,'Erick Pulgar':74,'Weverton':74,'Philippe Coutinho':76,'Soteldo':75,'Lucas Moura':76,'Willian José':75,'Everton Cebolinha':76,'Matheus Pereira':76,'Cássio':72,'Kaio Jorge':75,'Luiz Araújo':77,'Gonzalo Plata':76,'Samuel Lino':76,'Alexander Barboza':76,'Léo Ortiz':76,'Andreas Pereira':77,'Aníbal Moreno':76,'Piquerez':76,'Bruno Fuchs':75,'Bruno Henrique@INT':72};
const baseOv=rep=>rep>=66?66+(rep-66)*0.5:rep;
function genSquad(c){
  const ids=[];const have={};
  const tierOff={1:9,2:4,3:-1,4:-5,5:-9};
  if(REAL[c.sig]){
    for(const e of REAL[c.sig].split(';')){
      const [name,pt,age]=e.split(',');const role=LETTER[pt[0]];const tier=+pt[1];
      const sv=STAR[name+'@'+c.sig]!==undefined?STAR[name+'@'+c.sig]:STAR[name];const o=sv!==undefined?sv+gauss()*.7:baseOv(c.rep)+1+tierOff[tier]+gauss()*2.6;
      const p=mkPlayer(role,o,+age,c.id,name,true);
      ids.push(p.id);have[role]=(have[role]||0)+1;
    }
  }
  for(const role in PLAN){
    for(let i=have[role]||0;i<PLAN[role];i++){
      const starter=i<({GOL:1,ZAG:2,LAT:2,VOL:2,MEI:2,PNT:2,ATA:2}[role]);
      const age=clamp(Math.round(26+gauss()*5),18,37);
      ids.push(mkPlayer(role,baseOv(c.rep)+(starter?2.5:-6)+gauss()*3.6,age,c.id).id);
    }
  }
  for(const id of ids){const p=P(id);p.fit[c.phil]=clamp(p.fit[c.phil]+10,5,99)}
  return ids;
}
function genFree(n){
  const out=[];
  for(let i=0;i<n;i++){const role=pick(['GOL','ZAG','ZAG','LAT','VOL','MEI','PNT','ATA']);out.push(mkPlayer(role,ri(58,72),ri(24,36),-1).id)}
  return out;
}
const nameOf=p=>p.name+(p.real?'*':'');
function roleLabel(p){return ROLEABB[p.role]}
function trAbb(p){return p.tr.map(t=>TN[t][1]).join('/')}

/* ---------- mundo ---------- */
function newWorld(){NMS.clear();
  G={v:2,phase:'start',season:1,round:0,nextId:1,players:{},clubs:[],fixtures:[],user:null,coach:'Técnico',view:'inicio',
     news:[],paper:[],press:null,free:[],offers:[],fin:{caixa:0,price:60,last:null},board:{conf:60,meta:10,metaTxt:''},sponsor:null,lastRound:null,summary:null,
     pauseExtra:false,nextOfferId:1,asst:null,hist:[]};
  CLUBS.forEach((c,i)=>{
    const club={id:i,name:c[0],sig:c[1],rep:c[2],cap:c[3],c1:c[4],c2:c[5],c3:c[6],pat:c[7],squad:[],formation:pick(['4-4-2','4-3-3','4-4-2','3-5-2','4-5-1']),style:pick(STYLES),
      phil:pick(PHN),humor:ri(50,70),caixa:0,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,CH:0};
    club.color=club.c1==='#ffffff'?club.c2:club.c1;
    const D=i<20?0:i<40?1:i<60?2:3;club.div=D;club.trad=(typeof TRAD!=='undefined'&&TRAD[c[1]])||40;
    if(D===0){club.tv=+(15+(club.rep-62)*5.5).toFixed(1);club.spBase=+(8+(club.rep-62)*4.3).toFixed(1)}
    else if(D===1){club.tv=+(15+(club.rep-62)*1.6).toFixed(1);club.spBase=+(9+(club.rep-62)*1.0).toFixed(1)}
    else if(D===2){club.tv=+(5.5+(club.rep-56)*.7).toFixed(1);club.spBase=+(3+(club.rep-56)*.4).toFixed(1)}
    else{club.tv=+(2.2+(club.rep-50)*.25).toFixed(1);club.spBase=+(1.2+(club.rep-50)*.15).toFixed(1)}
    G.clubs.push(club);
    club.squad=genSquad(club);
    club.caixa=+((club.tv+club.spBase+(D===0?25:D===1?8:D===2?3:1))*0.2*rnd(0.6,1.4)).toFixed(1);
    autoPick(club);
  });
  if(typeof regBuild==='function')regBuild();
  G.free=genFree(16);
  genAllFx();
}
function genFixtures(ids){
  const n=ids.length;let arr=shuffle(ids.slice());const rounds=[];
  for(let r=0;r<n-1;r++){
    const rd=[];
    for(let i=0;i<n/2;i++){const a=arr[i],b=arr[n-1-i];rd.push(r%2?[b,a]:[a,b])}
    rounds.push(rd);arr=[arr[0],arr[n-1],...arr.slice(1,n-1)];
  }
  return rounds.concat(rounds.map(rd=>rd.map(([h,a])=>[a,h])));
}
function strength(c){return c.squad.map(id=>P(id).ovr).sort((a,b)=>b-a).slice(0,11).reduce((s,v)=>s+v,0)/11}
function genAllFx(){G.dfx={};for(let d=0;d<4;d++)G.dfx[d]=genFixtures(G.clubs.filter(c=>c.div===d).map(c=>c.id));try{if(G.abroad)pyrFx()}catch(e){console.error('fx45',e)}const u=G.user!=null&&G.clubs[G.user]?G.clubs[G.user].div:0;G.fixtures=G.dfx[u]}
function rankByStrength(c){return G.clubs.filter(x=>x.div===c.div).sort((a,b)=>strength(b)-strength(a)).findIndex(x=>x.id===c.id)+1}
function metaFor(c){const rk=rankByStrength(c);return Math.min(16,Math.max(3,Math.round(rk*0.85)+1))}
function setMeta(){
  const mp=metaFor(userClub());G.board.meta=mp;
  G.board.metaTxt=mp<=3?'Brigar pelo título (top '+mp+')':mp<=6?'Classificar para a Libertadores (top '+mp+')':mp<=11?'Terminar na parte de cima (top '+mp+')':'Fugir do rebaixamento (top '+mp+')';
}
const ASST_NAMES=['Prof. Anselmo Ribas','Prof. Cláudio Vaz','Prof. Telmo Brandão','Prof. Nelson Pires','Prof. Zé Maurício','Prof. Wagner Leal','Prof. Dário Fontes'];
const ASAL=[0,0.3,0.6,1.0,1.6,2.4];
function asstCandidates(phil){
  const nm=shuffle(ASST_NAMES.slice());const others=shuffle(PHN.filter(x=>x!==phil));
  const qs=shuffle([1,2,3,4,5]);
  const L=[{phil,q:Math.max(2,qs[0])},{phil,q:qs[1]},{phil,q:qs[2]}].sort((a,b)=>b.q-a.q);
  L.push({phil:others[0],q:ri(3,5)});
  return L.map((a,i)=>({name:nm[i],phil:a.phil,q:a.q,sal:ASAL[a.q]}));
}
function startCareer(id,coach,phil,asst){
  G.user=id;G.coach=coach||'Técnico';G.phase='play';G.board.conf=60;
  const c=userClub();c.phil=phil;
  for(const pid of c.squad){const p=P(pid);p.fit[phil]=clamp(p.fit[phil]+4,5,99)}
  G.asst=asst;G.fin.caixa=c.caixa;setMeta();G.sponsor=null;
  addNews('Você assumiu o '+c.name+' com filosofia '+phil+'. '+G.board.metaTxt+'.');
  prepareRound();save();
}

/* ---------- escalação ---------- */
function slotScore(p,slot,phil,w){
  let s=p.ovr*(0.8+0.2*p.en/100)+(phil?(p.fit[phil]-55)/45*3:0);
  if(p.inj>0)s-=60;
  if(w&&macroOK(p,slot,w))s*=fitFine(p,w);
  else if(p.pos!==slot)s*=macroPen(p,slot);
  return s;
}
function bestForSlot(ids,slot,used,phil,w){let best=null,bs=-1e9;for(const id of ids){if(used.has(id))continue;const s=slotScore(P(id),slot,phil,w);if(s>bs){bs=s;best=id}}return best}
function autoPick(c){
  const slots=slotsOf(c.formation);const used=new Set();const xi=[];
  const wn=wantsOf(c.formation);for(const [i,sl] of slots.entries()){const id=bestForSlot(c.squad,sl,used,c.phil,wn[i]);xi.push(id);used.add(id)}
  const rest=c.squad.filter(id=>!used.has(id));const bench=[];
  const gk=rest.filter(id=>P(id).pos==='GK'&&P(id).inj===0).sort((a,b)=>P(b).ovr-P(a).ovr)[0];
  if(gk)bench.push(gk);
  const healthy=rest.filter(id=>!bench.includes(id)&&P(id).inj===0).sort((a,b)=>P(b).ovr-P(a).ovr);
  const hurt=rest.filter(id=>P(id).inj>0);
  while(bench.length<7&&healthy.length)bench.push(healthy.shift());
  c.squad=[...xi,...bench,...healthy,...hurt];
}
function fixLineup(c){
  const notes=[];
  for(let i=0;i<11;i++){
    const id=c.squad[i];
    if(P(id).inj>0){
      const slot=slotsOf(c.formation)[i],wnt=wantsOf(c.formation)[i];
      const cand=c.squad.slice(11).filter(x=>P(x).inj===0);
      let best=null,bs=-1e9;
      for(const x of cand){const s=slotScore(P(x),slot,c.phil,wnt);if(s>bs){bs=s;best=x}}
      if(best){const j=c.squad.indexOf(best);[c.squad[i],c.squad[j]]=[c.squad[j],c.squad[i]];notes.push(P(id).name+' está lesionado e foi trocado por '+P(best).name+'.')}
    }
  }
  return notes;
}
function reassign(side){
  const slots=slotsOf(side.formation);const pool=side.lineup.slice();const used=new Set();const out=[];
  const wn=wantsOf(side.formation);for(const [si,sl] of slots.entries()){let best=null,bs=-1e9;for(const id of pool){if(used.has(id))continue;const s=slotScore(P(id),sl,null,wn[si]);if(s>bs){bs=s;best=id}}out.push(best);used.add(best)}
  side.slots=slots;side.lineup=out;
}

/* ---------- partida ---------- */
function eff(p,slot,en,phil,w){
  let o=p.ovr;
  if(w&&macroOK(p,slot,w))o*=fitFine(p,w);
  else if(p.pos!==slot)o*=macroPen(p,slot);
  else{for(const t of p.tr)if(TRG[slot].includes(t))o+=0.9}
  if(p.inj>0)o*=0.8;
  o+=(p.fit[phil]-55)/45*3;
  return o*(0.78+0.22*en/100)*(0.94+0.06*p.mor/100);
}
function power(m,side){
  const sum={DEF:0,MID:0,ATA:0},cnt={DEF:0,MID:0,ATA:0};let gk=60;
  const WN=wantsOf(side.formation);side.lineup.forEach((id,i)=>{const sl=side.slots[i];const e=eff(P(id),sl,m.en[id],side.club.phil,WN[i]);if(sl==='GK')gk=e;else{sum[sl]+=e;cnt[sl]++}});
  const avg=s=>cnt[s]?sum[s]/cnt[s]:50;
  const def=avg('DEF'),mid=avg('MID'),atk=avg('ATA');
  const na=(cnt.ATA+0.45*cnt.MID)||1,nd=(cnt.DEF+0.3*cnt.MID)||1;
  const A=(atk*cnt.ATA+mid*0.45*cnt.MID)/na*Math.pow(na/3.9,0.35);
  const D=(def*cnt.DEF+mid*0.3*cnt.MID)/nd*Math.pow(nd/5.1,0.35);
  const rp=1-0.07*side.reds;
  return {gk:gk*rp,atk:A*rp,def:D*rp,mid:mid*rp};
}
function styleMod(my,opp){
  const m={atk:1,def:1,mid:1,rate:1};
  if(my==='Ofensivo'){m.atk=1.04;m.def=0.96;m.rate=1.08;if(opp==='Contra-ataque')m.def*=0.97}
  else if(my==='Defensivo'){m.atk=0.96;m.def=1.05;m.rate=0.9}
  else if(my==='Contra-ataque'){m.atk=(opp==='Ofensivo'||opp==='Posse')?1.06:0.98;m.def=1.01;m.rate=0.96}
  else if(my==='Posse'){m.mid=1.05;m.rate=1;if(opp==='Contra-ataque')m.def=0.96;if(opp==='Defensivo')m.atk=0.97}
  return m;
}
function mkSide(c){return {club:c,formation:c.formation,slots:slotsOf(c.formation),style:c.style,lineup:c.squad.slice(0,11),bench:c.squad.slice(11,18),subs:0,reds:0,sent:[],used:[],outs:[]}}
function newMatch(hc,ac){
  const m={h:mkSide(hc),a:mkSide(ac),min:0,hg:0,ag:0,ev:[],rt:{},en:{},scorers:[],stats:{sh:0,sa:0,shT:0,saT:0},done:false};
  for(const s of [m.h,m.a])for(const id of [...s.lineup,...s.bench]){m.rt[id]=6;m.en[id]=P(id).en}
  return m;
}
const addEv=(m,side,type,pid,text)=>m.ev.push({min:m.min,side,type,pid,text});
const lastName=n=>n.split(' ').slice(-1)[0];
function pickScorer(side){
  const w=side.lineup.map((id,i)=>{const sl=side.slots[i];if(sl==='GK'||side.sent.includes(id))return 0;const p=P(id);let x=(sl==='ATA'?6:sl==='MID'?3:0.8)*p.ovr/70;if(p.tr.includes('Fin'))x*=1.4;if(p.tr.includes('Cab')||p.tr.includes('Cha'))x*=1.1;return x});
  const tot=w.reduce((a,b)=>a+b,0);let r=Math.random()*tot;
  for(let i=0;i<w.length;i++){r-=w[i];if(r<=0)return side.lineup[i]}
  return side.lineup[10];
}
const TUNE={rate:0.128,ex:1.0,mx:0.3,hf:1.4,af:0.86,conv:0.095,cx:1.0,yc:0.02,rc:0.0002,yr:0.02,ymk:0.0005,pen:0.0012};
function stepMinute(m){
  m.min++;
  for(const s of [m.h,m.a])s.lineup.forEach((id,i)=>{m.en[id]=Math.max(10,m.en[id]-(s.slots[i]==='GK'?0.04:0.12)*mgrDrain(s))});
  const pw={h:power(m,m.h),a:power(m,m.a)};
  const md={h:styleMod(m.h.style,m.a.style),a:styleMod(m.a.style,m.h.style)};
  for(const k of ['h','a']){
    const o=k==='h'?'a':'h',S=m[k],O=m[o];
    const my={atk:pw[k].atk*md[k].atk,mid:pw[k].mid*md[k].mid};
    const op={def:pw[o].def*md[o].def,mid:pw[o].mid*md[o].mid,gk:pw[o].gk};
    m.fd=m.fd||{h:clamp(1+gauss()*0.07,0.86,1.14),a:clamp(1+gauss()*0.07,0.86,1.14)};
    let rate=m.fd[k]*TUNE.rate*Math.pow(my.atk/op.def,TUNE.ex)*Math.pow(my.mid/op.mid,TUNE.mx)*md[k].rate*(k==='h'?TUNE.hf:TUNE.af);
    rate=clamp(rate*mgrMatch(m,k),0.02,0.5);
    if(Math.random()<rate){
      const sc=pickScorer(S);const sp=P(sc);
      const gkTr=P(O.lineup[0]).tr.filter(t=>t==='Ref'||t==='Aer'||t==='Sai').length;
      const conv=clamp(TUNE.conv*Math.pow(my.atk/(0.6*op.def+0.4*op.gk),TUNE.cx)*(1-0.03*gkTr),0.02,0.35);
      m.stats[k==='h'?'sh':'sa']++;
      if(Math.random()<conv){
        if(k==='h')m.hg++;else m.ag++;
        m.stats[k==='h'?'shT':'saT']++;
        const outf=S.lineup.filter((x,i)=>x!==sc&&S.slots[i]!=='GK');
        const ast=Math.random()<0.62?pick(outf):null;
        addEv(m,k,'goal',sc,'GOL! '+nameOf(sp)+(ast?' (assist. '+lastName(P(ast).name)+')':''));
        m.scorers.push({pid:sc,ast,min:m.min,side:k});
        m.rt[sc]+=1.0;if(ast)m.rt[ast]+=0.5;
        S.lineup.forEach(id=>m.rt[id]+=0.12);
        O.lineup.forEach((id,i)=>{m.rt[id]-=(O.slots[i]==='GK'?0.3:O.slots[i]==='DEF'?0.2:0.08)});
      }else{
        const r=Math.random();const gkid=O.lineup[0];
        if(r<0.4){m.stats[k==='h'?'shT':'saT']++;if(Math.random()<0.7)addEv(m,k,'save',gkid,'Defesa de '+P(gkid).name+' em chute de '+lastName(sp.name));m.rt[gkid]+=0.35}
        else{if(Math.random()<0.4)addEv(m,k,'miss',sc,lastName(sp.name)+' chuta para fora');m.rt[sc]-=0.1}
      }
    }
    const yc=Math.random()<TUNE.yc,rc=!yc&&Math.random()<TUNE.rc;
    if(yc||rc){
      const cands=S.lineup.filter((id,i)=>S.slots[i]!=='GK'&&!S.sent.includes(id));const id=pick(cands);
      if(yc){addEv(m,k,'yellow',id,'Cartão amarelo para '+P(id).name);m.rt[id]-=0.4;if(Math.random()<TUNE.yr){addEv(m,k,'red',id,'EXPULSÃO! '+P(id).name);S.reds++;S.sent.push(id);m.rt[id]-=1.5}}
      else{addEv(m,k,'red',id,'EXPULSÃO! '+P(id).name);S.reds++;S.sent.push(id);m.rt[id]-=1.5}
    }
    for(const id of S.lineup)m.rt[id]+=(P(id).ovr-70)/70*0.004+(Math.random()-0.5)*0.01;
  }
  if(m.min>=90){m.done=true;for(const id in m.rt)m.rt[id]=clamp(+m.rt[id].toFixed(1),3,10)}
}
function subPlayer(m,k,outId,inId){
  const s=m[k];if(s.subs>=5||s.sent.includes(outId))return false;
  const i=s.lineup.indexOf(outId),j=s.bench.indexOf(inId);if(i<0||j<0)return false;
  s.lineup[i]=inId;s.bench.splice(j,1);s.used.push(inId);s.outs.push(outId);s.subs++;
  addEv(m,k,'sub',inId,'Substituição: sai '+P(outId).name+', entra '+P(inId).name);
  return true;
}
function applyMatch(m){
  const hc=m.h.club,ac=m.a.club;
  hc.J++;ac.J++;hc.GP+=m.hg;hc.GC+=m.ag;ac.GP+=m.ag;ac.GC+=m.hg;
  if(m.hg>m.ag){hc.V++;hc.P+=3;ac.D++}else if(m.hg<m.ag){ac.V++;ac.P+=3;hc.D++}else{hc.E++;ac.E++;hc.P++;ac.P++}
  for(const s of m.scorers){P(s.pid).goals++;if(s.ast)P(s.ast).ast++}
  for(const e of m.ev){if(e.type==='yellow')P(e.pid).yc++;if(e.type==='red')P(e.pid).rc++}
  for(const [k,s] of [['h',m.h],['a',m.a]]){
    const won=k==='h'?m.hg>m.ag:m.ag>m.hg,lost=k==='h'?m.hg<m.ag:m.ag<m.hg;
    for(const id of new Set([...s.lineup,...s.used,...s.outs])){
      const p=P(id);p.games++;p.rsum+=m.rt[id];p.rn++;
      p.en=clamp(Math.round(m.en[id]-2),20,100);
      p.mor=clamp(p.mor+(won?3:lost?-3:0),30,100);
      if(Math.random()<(p.en<45?0.07:0.03))p.inj=ri(1,6);
    }
  }
}
function simFast(hc,ac){const m=newMatch(hc,ac);while(!m.done)stepMinute(m);applyMatch(m);return m}

/* ---------- tabela e estatísticas ---------- */
function tableRows(div){if(div===undefined)div=(G.user!=null&&G.clubs[G.user])?G.clubs[G.user].div:0;return G.clubs.filter(c=>c.div===div).sort((a,b)=>b.P-a.P||b.V-a.V||(b.GP-b.GC)-(a.GP-a.GC)||b.GP-a.GP||a.id-b.id)}
function posOf(c){return tableRows(c.div).findIndex(x=>x.id===c.id)+1}
function leaders(kind,n=10){
  const ud=G.clubs[G.user]?G.clubs[G.user].div:0;const L=Object.values(G.players).filter(p=>p.club>=0&&G.clubs[p.club].div===ud);
  if(kind==='goals')return L.filter(p=>p.goals>0).sort((a,b)=>b.goals-a.goals||a.games-b.games).slice(0,n).map(p=>[p,p.goals]);
  if(kind==='ast')return L.filter(p=>p.ast>0).sort((a,b)=>b.ast-a.ast).slice(0,n).map(p=>[p,p.ast]);
  if(kind==='rating')return L.filter(p=>p.rn>=3).sort((a,b)=>b.rsum/b.rn-a.rsum/a.rn).slice(0,n).map(p=>[p,(p.rsum/p.rn).toFixed(2)]);
  if(kind==='cards')return L.filter(p=>p.yc+p.rc>0).sort((a,b)=>(b.yc+b.rc*2)-(a.yc+a.rc*2)).slice(0,n).map(p=>[p,p.yc+'A '+p.rc+'V']);
  return [];
}

/* ---------- rodada ---------- */
function addNews(t){G.news.unshift({r:G.round,s:G.season,t});G.news=G.news.slice(0,14)}
function prepareRound(){
  for(const c of G.clubs){if(c.id===G.user)continue;if(Math.random()<0.2)c.style=pick(STYLES);autoPick(c)}
  fixLineup(userClub()).forEach(addNews);
}
function userFixtureIdx(){return G.fixtures[G.round].findIndex(([h,a])=>h===G.user||a===G.user)}
function startRound(){
  prepareRound();
  R={ms:G.fixtures[G.round].map(([h,a])=>newMatch(C(h),C(a))),over:false,focus:0};
  R.ui=userFixtureIdx();R.focus=R.ui;R.ms[R.ui].u=true;
  return R;
}
function stepAll(){for(const m of R.ms)if(!m.done)stepMinute(m)}
const roundDone=()=>R.ms.every(m=>m.done);
function userSide(m){return m.h.club.id===G.user?'h':'a'}
function financeRound(m){
  const c=userClub(),f=G.fin;let inc=0;
  const tvr=c.tv/38,spr=(G.sponsor?(G.sponsor.pay!==undefined?G.sponsor.pay:G.sponsor.fixed):c.spBase*0.8)/38;
  inc+=tvr+spr;let att=0,gate=0;
  const home=m.h.club.id===c.id;
  if(home){
    const opp=m.a.club;
    let occ=0.35+(c.humor/100)*0.55-(f.price-60)/260+0.04*(opp.rep-68)/6;
    occ=clamp(occ,0.12,1);att=Math.round(c.cap*occ);gate=att*f.price/1e6;inc+=gate;
  }
  let bonus=0;const won=(home&&m.hg>m.ag)||(!home&&m.ag>m.hg);
  if(G.sponsor&&G.sponsor.perWin&&won)bonus+=G.sponsor.perWin;
  inc+=bonus;
  const sal=c.squad.reduce((s,id)=>s+salOf(P(id)),0)/38;
  const mant=c.cap/1000*0.25/38;const net=inc-sal-mant;
  f.caixa=+(f.caixa+net).toFixed(2);
  f.last={home,att,gate:+gate.toFixed(2),tv:+tvr.toFixed(2),sp:+spr.toFixed(2),bonus:+bonus.toFixed(2),sal:+sal.toFixed(2),mant:+mant.toFixed(2),net:+net.toFixed(2)};
}
function boardRound(m){
  const c=userClub(),home=m.h.club.id===c.id,opp=home?m.a.club:m.h.club;
  const gf=home?m.hg:m.ag,ga=home?m.ag:m.hg;const pts=gf>ga?3:gf===ga?1:0;
  const exp=clamp(1.4+(c.rep-opp.rep)*0.07+(home?0.2:-0.1),0.4,2.4);
  let d=(pts-exp)*2.2;
  if(G.round>=5)d+=clamp((G.board.meta-posOf(c))*0.35,-2,1.2);
  if(G.fin.caixa<0)d-=1.5;
  G.board.conf=clamp(+(G.board.conf+d).toFixed(1),0,100);
  c.humor=clamp(Math.round(c.humor+(pts===3?4:pts===1?0.5:-4.5)+(gf-ga)*0.4+(55-c.humor)*0.03),5,100);
  c.CH=pts===0?(c.CH>0?c.CH+1:1):pts===3?(c.CH<0?c.CH-1:-1):0;
  c.streak=pts===3?Math.max(1,(c.streak||0)+1):pts===0?Math.min(-1,(c.streak||0)-1):0;
  if(G.board.conf<35&&!G._warn){addNews('Diretoria: a confiança no seu trabalho está baixa.');G._warn=true}
  if(G.board.conf>45)G._warn=false;
}
function train(){
  const c=userClub();const a=G.asst;const match=a&&a.phil===c.phil;
  const g=(match?1.0:0.3)*((a?a.q:1)/2)*(0.9);
  for(const id of c.squad){const p=P(id);if(p.inj>0)continue;p.fit[c.phil]=clamp(+(p.fit[c.phil]+g*(p.age<26?1.2:0.8)).toFixed(1),5,100)}
  if(G.round%8===7&&!match&&a)addNews('O auxiliar '+a.name+' não domina sua filosofia ('+c.phil+'). O treino rende pouco.');
}
function genOffer(){
  const c=userClub();if(G.offers.length>=3||c.squad.length<=19)return;
  const listed=c.squad.filter(id=>P(id).listed);
  const pid=(listed.length&&Math.random()<0.6)?pick(listed):pick(c.squad);
  if(G.offers.some(o=>o.pid===pid))return;
  const b=pick(G.clubs.filter(x=>x.id!==c.id));
  const fee=+(valueOf(P(pid))*rnd(0.8,1.3)).toFixed(1);
  G.offers.push({id:G.nextOfferId++,pid,buyer:b.id,fee,exp:G.round+3});
}
function refill(c){
  const need=c.squad.length<20;
  if(need){const have={};c.squad.forEach(id=>have[P(id).role]=(have[P(id).role]||0)+1);
    for(const role in PLAN){if((have[role]||0)<Math.min(2,PLAN[role])){const p=mkPlayer(role,c.rep-7,ri(18,21),c.id);c.squad.push(p.id)}}}
}
function sellPlayer(offerId){
  const o=G.offers.find(x=>x.id===offerId);if(!o)return 'Oferta expirada.';
  const c=userClub();if(c.squad.length<=18)return 'Elenco precisa ter ao menos 18 jogadores.';
  const p=P(o.pid);
  const top=c.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr).slice(0,3).map(x=>x.id);
  c.squad=c.squad.filter(id=>id!==o.pid);const b=C(o.buyer);b.squad.push(o.pid);p.club=b.id;p.listed=false;
  G.fin.caixa=+(G.fin.caixa+o.fee).toFixed(2);
  if(top.includes(o.pid)){c.humor=clamp(c.humor-6,5,100);G.board.conf=clamp(G.board.conf-3,0,100);addNews('A torcida reclamou da venda de '+p.name+'.')}
  G.offers=G.offers.filter(x=>x.pid!==o.pid);
  return null;
}
function signFree(pid){
  const c=userClub(),p=P(pid);
  if(c.squad.length>=30)return 'Elenco cheio (máximo 30).';
  const lu=+(valueOf(p)*0.1).toFixed(2);
  if(G.fin.caixa<lu)return 'Caixa insuficiente para as luvas.';
  const chance=clamp(0.5+(c.rep-p.ovr)/20+(c.humor-50)/200,0.1,0.95);
  if(Math.random()>chance){if(Math.random()<0.5)G.free=G.free.filter(x=>x!==pid);return p.name+' recusou: não quis o projeto.'}
  G.fin.caixa=+(G.fin.caixa-lu).toFixed(2);G.free=G.free.filter(x=>x!==pid);
  p.club=c.id;c.squad.push(pid);p.mor=70;return null;
}
function importance(p){
  const c=C(p.club);const top=c.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr).slice(0,3).map(x=>x.id);
  return top.includes(p.id)?1.8:c.squad.slice(0,11).includes(p.id)?1.4:1.15;
}
const askPrice=p=>+(valueOf(p)*importance(p)*(p.listed?0.8:1)).toFixed(1);
function makeBid(pid,fee){
  const c=userClub(),p=P(pid);
  if(p.club===c.id||p.club<0)return {ok:false,msg:'Jogador indisponível.'};
  if(c.squad.length>=30)return {ok:false,msg:'Elenco cheio (máximo 30).'};
  if(G.fin.caixa<fee)return {ok:false,msg:'Caixa insuficiente.'};
  const seller=C(p.club);const ask=askPrice(p);const ratio=fee/ask;
  if(!G._force&&Math.random()>clamp((ratio-0.85)*2.4,0,0.97))return {ok:false,msg:seller.name+' recusou. Pedem perto de '+(ask*rnd(1.0,1.1)).toFixed(1).replace('.',',')+' mi.'};
  const ch=clamp(0.62+(c.rep-seller.rep)/22+(c.humor-50)/250+(p.age>=30?0.1:0),0.12,0.97);
  if(!G._force&&Math.random()>ch)return {ok:false,msg:p.name+' não quis se transferir para o '+c.name+'.'};
  seller.squad=seller.squad.filter(id=>id!==pid);refill(seller);
  p.club=c.id;p.listed=false;p.mor=72;c.squad.push(pid);
  G.fin.caixa=+(G.fin.caixa-fee).toFixed(2);
  p.fit[c.phil]=clamp(p.fit[c.phil],5,100);
  addNews('Contratação: '+p.name+' chega ao '+c.name+'.');
  return {ok:true,msg:p.name+' é o novo reforço!'};
}
function searchPlayers(f){
  const out=[];
  for(const p of Object.values(G.players)){
    if(p.club===G.user)continue;
    if(f.free!==undefined&&((p.club<0)!==f.free))continue;
    if(f.name&&!p.name.toLowerCase().includes(f.name.toLowerCase()))continue;
    if(f.role&&p.role!==f.role)continue;
    if(f.club!==undefined&&f.club!==''&&p.club!==+f.club)continue;
    if(f.minOvr&&p.ovr<f.minOvr)continue;
    if(f.maxAge&&p.age>f.maxAge)continue;
    if(f.tr&&!p.tr.includes(f.tr))continue;
    if(f.phil&&p.fit[f.phil]<f.philMin)continue;
    if(f.listed&&!p.listed)continue;
    out.push(p);
  }
  out.sort((a,b)=>b.ovr-a.ovr);return out.slice(0,60);
}
function shouldFire(){
  if(![9,19,29,37].includes(G.round))return false;
  return Math.random()<1/(1+Math.exp((G.board.conf-32)/7));
}
/* ---------- jornal ---------- */
function paperLine(h,sub){G.paper.unshift({r:G.round,s:G.season,paper:pick(PAPERS),by:pick(REPORTERS),h,sub:sub||''});G.paper=G.paper.slice(0,40)}
function genNews(results,um){
  const c=userClub();const us=userSide(um);const gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg;
  const opp=us==='h'?um.a.club:um.h.club;const pos=posOf(c);
  if(gf>ga)paperLine(c.name+' vence o '+opp.name+' por '+gf+' a '+ga,pos<=4?'Time chega ao '+pos+'º lugar e sonha alto.':'Vitória ajuda o clube a subir na tabela ('+pos+'º).');
  else if(gf<ga)paperLine(opp.name+' vence o '+c.name+' e aumenta a pressão sobre o técnico '+G.coach,'A torcida protestou após o apito final. Time é o '+pos+'º colocado.');
  else paperLine(c.name+' fica no empate com o '+opp.name+' ('+gf+' a '+ga+')','Resultado deixa o time em '+pos+'º. Técnico pede paciência.');
  const big=results.slice().sort((a,b)=>Math.abs(b.hg-b.ag)-Math.abs(a.hg-a.ag))[0];
  if(big&&Math.abs(big.hg-big.ag)>=3&&!big.u)paperLine('Goleada: '+C(big.h).name+' '+big.hg+' x '+big.ag+' '+C(big.a).name,'Resultado chama a atenção na rodada '+(G.round+1)+'.');
  const rows=tableRows();
  if(G.round>=2&&(!G._leader||G._leader!==rows[0].id)){G._leader=rows[0].id;paperLine(rows[0].name+' assume a liderança do campeonato','Com '+rows[0].P+' pontos, o time lidera após a rodada '+(G.round+1)+'.')}
  const best=Object.entries(um.rt).map(([id,r])=>[+id,r]).filter(([id])=>P(id).club===c.id).sort((a,b)=>b[1]-a[1])[0];
  if(best&&best[1]>=8)paperLine(nameOf(P(best[0]))+' é o nome do jogo no '+c.name,'Nota '+best[1].toFixed(1)+' na avaliação do Diário.');
  const hurt=c.squad.map(id=>P(id)).filter(p=>p.inj>=3).sort((a,b)=>b.ovr-a.ovr)[0];
  if(hurt&&!hurt.pp){hurt.pp=1;paperLine('Departamento médico: '+hurt.name+' fica fora por '+hurt.inj+' rodadas','Lesão preocupa a comissão técnica.')}
  if(G.fin.caixa<5)paperLine('Caixa do '+c.name+' acende alerta vermelho','Diretoria avalia corte de custos.');
  if(G.board.conf<35)paperLine('Bastidores: diretoria discute futuro do técnico','Fontes dizem que a paciência está acabando.');
  if(Math.random()<0.4){const star=pick(G.clubs.filter(x=>x.id!==c.id).flatMap(x=>x.squad.slice(0,3)).map(id=>P(id)));paperLine('Cobiçado, '+star.name+' ('+C(star.club).sig+') está no radar do mercado','Empresários já conversam com clubes interessados.')}
}
function genPress(um){
  if(G.press)return;
  const c=userClub();const us=userSide(um);const gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg;
  let q=null;
  if(c.streak<=-2)q={who:pick(REPORTERS)+' ('+pick(PAPERS)+')',q:'Já são '+(-c.streak)+' jogos sem vitória e a torcida cobra. O que o senhor diz?',opts:[
    {t:'Assumo a responsabilidade e vamos corrigir.',fx:{conf:2,humor:3,mor:-1}},{t:'Faltou comprometimento de alguns jogadores.',fx:{conf:-1,humor:1,mor:-6}},{t:'Vamos reconstruir com calma, é um processo.',fx:{conf:-2,humor:1,mor:2}}]};
  else if(gf-ga>=3)q={who:pick(REPORTERS)+' ('+pick(PAPERS)+')',q:'Goleada! O time está pronto para brigar por mais?',opts:[
    {t:'O mérito é dos jogadores, seguimos humildes.',fx:{conf:1,humor:2,mor:4}},{t:'Estamos prontos para o título.',fx:{conf:-1,humor:5,mor:1}},{t:'Ainda precisamos de reforços.',fx:{conf:-2,humor:0,mor:-2}}]};
  else if(G.round%6===3){const p=pick(c.squad.slice(0,6).map(id=>P(id)));q={who:pick(REPORTERS)+' ('+pick(PAPERS)+')',q:'Há rumores de que '+p.name+' quer sair. Ele fica?',opts:[
    {t:'Ele fica e é peça fundamental.',fx:{conf:0,humor:2,mor:3}},{t:'Se vier uma boa proposta, conversamos.',fx:{conf:1,humor:-2,mor:-4}},{t:'Não comento rumores.',fx:{conf:0,humor:0,mor:0}}]}}
  else if(G.round%6===0&&G.board.conf<50)q={who:'Coletiva da diretoria',q:'O presidente quer saber: você segura o time até o fim da temporada?',opts:[
    {t:'Tenho total confiança no meu trabalho.',fx:{conf:2,humor:1,mor:1}},{t:'Preciso de mais apoio no mercado.',fx:{conf:-3,humor:0,mor:0}},{t:'Deixo isso com a diretoria.',fx:{conf:-1,humor:0,mor:0}}]};
  if(q){q.id=G.round;q.skip={conf:-0.5,humor:-1,mor:0};G.press=q}
}
function answerPress(i){
  const q=G.press;if(!q)return;
  const fx=i<0?q.skip:q.opts[i].fx;
  G.board.conf=clamp(+(G.board.conf+(fx.conf||0)).toFixed(1),0,100);
  const c=userClub();c.humor=clamp(c.humor+(fx.humor||0),5,100);
  for(const id of c.squad){const p=P(id);p.mor=clamp(p.mor+(fx.mor||0),30,100)}
  if(i>=0)paperLine('Técnico '+G.coach+': “'+q.opts[i].t.replace(/\.$/,'')+'”','Declaração na entrevista coletiva repercute no clube.');
  G.press=null;save();
}
function finishRound(){
  const um=R.ms[R.ui];const results=R.ms.map((m,i)=>({h:m.h.club.id,a:m.a.club.id,hg:m.hg,ag:m.ag,u:i===R.ui}));
  for(const m of R.ms)applyMatch(m);
  const uc=userClub();const us=userSide(um);const s=um[us];
  userClub().formation=s.formation;userClub().style=s.style;
  financeRound(um);boardRound(um);train();
  for(const p of Object.values(G.players)){if(p.inj>0)p.inj--;if(p.club>=0)p.en=clamp(p.en+(p.pos==='GK'||p.role==='GOL'?18:15),0,100)}
  const rest=uc.squad.filter(id=>!s.lineup.includes(id)&&!s.bench.includes(id));
  uc.squad=[...s.lineup,...s.bench,...rest];
  G.offers=G.offers.filter(o=>o.exp>G.round);
  if(Math.random()<0.28)genOffer();
  if(G.round%6===5){G.free=G.free.filter(()=>Math.random()<0.6);G.free.push(...genFree(5))}
  G.lastRound={n:G.round+1,results,ratings:Object.assign({},um.rt),scorers:um.scorers,stats:um.stats,user:{home:us==='h'}};
  genNews(results,um);genPress(um);
  const fired=shouldFire();G.round++;
  let outcome='next';if(fired)outcome='fired';else if(G.round>=NR())outcome='seasonEnd';
  R=null;save();return outcome;
}
function endSeason(){
  const rows=tableRows();const c=userClub();const pos=posOf(c);
  const prize=+(Math.max(0,21-pos)*1.4*prizeMul(c.div||0)).toFixed(1);let sp=0;
  if(G.sponsor){if(pos<=(G.sponsor.topN||0))sp+=G.sponsor.topBonus||0;if(pos===1)sp+=G.sponsor.titleBonus||0}
  G.fin.caixa=+(G.fin.caixa+prize+sp).toFixed(1);
  let d=0,txt='';
  if(pos<=G.board.meta){d=10;txt='Meta cumprida. A diretoria está satisfeita.'}
  else if(pos<=G.board.meta+3){d=-5;txt='Meta não cumprida, mas por pouco. A diretoria cobra reação.'}
  else{d=-14;txt='Temporada abaixo do esperado. A diretoria está insatisfeita.'}
  if(c.div>=4?relPromo(c.div,pos).rel:pos>=17){d-=10;txt+=' Zona de rebaixamento.'}
  G.board.conf=clamp(G.board.conf+d,0,100);
  G.hist.push({season:G.season,club:c.name,pos,champ:rows[0].name});
  G.summary={season:G.season,champ:rows[0].name,pos,meta:G.board.meta,prize,sp,txt,conf:G.board.conf,
    scorers:leaders('goals',5).map(([p,g])=>({n:nameOf(p),g,c:C(p.club).sig}))};
  paperLine(rows[0].name+' é o campeão da temporada '+G.season,'Você terminou em '+pos+'º. '+txt);
  save();
}
function newSeason(){
  G.season++;G.round=0;G.offers=[];G.press=null;
  for(const c of G.clubs){c.P=c.J=c.V=c.E=c.D=c.GP=c.GC=0;c.streak=0;c.tv=+(c.tv*rnd(0.97,1.06)).toFixed(1)}
  for(const p of Object.values(G.players)){
    p.age++;p.goals=0;p.ast=0;p.games=0;p.rsum=0;p.rn=0;p.yc=0;p.rc=0;p.inj=0;p.en=100;
    if(p.age<=22)p.ovr=clamp(p.ovr+ri(1,5),44,p.pot);
    else if(p.age<=29)p.ovr=clamp(p.ovr+ri(-1,1),44,Math.max(p.pot,p.ovr));
    else if(p.age<=31)p.ovr=clamp(p.ovr+ri(-1,1),40,92);
    else if(p.age<=34)p.ovr=clamp(p.ovr-ri(0,1),40,92);
    else p.ovr=clamp(p.ovr-ri(0,2),40,92);
  }
  for(const c of G.clubs){
    const keep=[],drop=[];
    for(const id of c.squad){const p=P(id);if(p.age>=35&&Math.random()<(p.age>=39?1:p.age>=37?0.7:0.3))drop.push(id);else keep.push(id)}
    c.squad=keep;drop.forEach(id=>{delete G.players[id]});
    const have={};c.squad.forEach(id=>have[P(id).role]=(have[P(id).role]||0)+1);
    for(const role in PLAN)for(let i=have[role]||0;i<PLAN[role];i++)c.squad.push(mkPlayer(role,c.rep-8,ri(17,20),c.id).id);
    autoPick(c);
  }
  G.free=G.free.filter(id=>P(id)&&P(id).age<37);G.free.push(...genFree(6));
  genAllFx();
  G.summary=null;G.sponsor=null;setMeta();prepareRound();save();
}
function fireOffers(){
  const c=userClub();
  return shuffle(G.clubs.filter(x=>x.id!==c.id)).sort((a,b)=>Math.abs(a.rep-(c.rep+rnd(-3,3)))-Math.abs(b.rep-(c.rep+rnd(-3,3)))).slice(0,3).map(x=>x.id);
}
function takeJob(id){
  G.user=id;G.board.conf=55;G.fin.caixa=C(id).caixa;G.sponsor=null;G.offers=[];G.fin.last=null;G.press=null;
  setMeta();addNews('Você assumiu o '+C(id).name+'.');
  if(G.round>=NR()){if(!G.summary||G.summary.season!==G.season)endSeason();G.phase='seasonEnd'}else{G.phase='play';prepareRound()}
  save();
}
function save(){try{SKV.setItem(SAVE_KEY,JSON.stringify(G))}catch(e){}}
function loadSave(){try{const s=SKV.getItem(SAVE_KEY);if(!s)return false;G=JSON.parse(s);return !!G&&G.v===2}catch(e){return false}}
function wipe(){try{SKV.removeItem(SAVE_KEY)}catch(e){}}

function mgrMatch(m,k){return 1}
function mgrDrain(s){return 1}

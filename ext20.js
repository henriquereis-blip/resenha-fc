/* ext20: saves em slots, confiança do elenco, fadiga mais forte, seleção automática por critério */

/* ---------- saves em slots ---------- */
const SLOTN=3,slotKey=i=>SAVE_KEY+'_slot'+i;
function sumOf(raw){
  try{const g=JSON.parse(raw);if(!g||g.v!==2||g.user==null)return null;const c=g.clubs[g.user];
    return {club:c.name,sig:c.sig,div:c.div,season:g.season,round:g.round,coach:g.coach,cr:crest(c,30)}}catch(e){return null}
}
function slotInfo(i){try{const r=SKV.getItem(i===0?SAVE_KEY:slotKey(i));return r?sumOf(r):null}catch(e){return null}}
function slotSave(i){try{save();const r=SKV.getItem(SAVE_KEY);if(r)SKV.setItem(slotKey(i),r);return true}catch(e){return false}}
function slotLoad(i){try{const r=SKV.getItem(i===0?SAVE_KEY:slotKey(i));if(!r)return false;SKV.setItem(SAVE_KEY,r);return loadSave()}catch(e){return false}}
function slotDel(i){try{if(i===0)SKV.removeItem(SAVE_KEY);else SKV.removeItem(slotKey(i))}catch(e){}}

/* ---------- confiança do elenco ---------- */
function sqcOf(){if(!G)return 60;if(G.sqc===undefined)G.sqc=60;return G.sqc}
const sqcCls=v=>v>=65?'ok':v>=40?'warn':'bad';
const sqcTxt=v=>v>=75?'Elenco fechado com você':v>=60?'Elenco confiante':v>=45?'Elenco desconfiado':v>=30?'Elenco rachado':'Vestiário em guerra';
function sqcFx(){const v=sqcOf();return v<50?-(50-v)*.001:v>75?(v-75)*.0006:0}
hookAround('eff','eff20',function(next,__a){let [p,slot,en,phil]=__a;
  let o=next();
  if(en!==undefined&&en<70)o*=1-(70-en)*.0012;                 // cansaço forte
  if(G&&p.club===G.user)o*=1+sqcFx();                          // confiança do elenco
  return o;
});
function sqcTick(played,gf,ga){
  const c=userClub();if(!c)return;
  let d=gf>ga?2.4:gf<ga?-3:-.2;
  // sequência
  G.sqcSeq=G.sqcSeq||[];G.sqcSeq.push(gf>ga?'V':gf<ga?'D':'E');if(G.sqcSeq.length>5)G.sqcSeq.shift();
  const tail=G.sqcSeq.slice(-3).join('');
  if(tail==='DDD')d-=2.2;if(tail==='VVV')d+=1.4;
  // astros no banco
  const top=c.squad.slice().sort((a,b)=>P(b).ovr-P(a).ovr).slice(0,8);
  let ben=0;for(const id of top)if(!played.has(id)&&P(id).inj===0)ben++;
  d-=Math.min(2,ben*.35);
  // clima do vestiário e treinador motivador
  try{d+=(vestBox().clima-60)*.03}catch(e){}
  try{d+=.22*(mgd('mot')-4)}catch(e){}
  d+=(60-sqcOf())*.03;
  G.sqc=clamp(+(sqcOf()+d).toFixed(1),0,100);
}
function sqcFriction(){
  const v=sqcOf();if(v>=50)return;
  const c=userClub(),vb=vestBox();if(vb.conf.length>=4)return;
  if(Math.random()>(50-v)/50*.16+.02)return;
  const pl=c.squad.map(id=>P(id)).filter(p=>p.inj===0&&!vb.conf.some(x=>x.a===p.id||x.b===p.id));
  if(!pl.length)return;
  pl.sort((a,b)=>(a.pm??60)-(b.pm??60));
  const a=pl[0],r=Math.random();
  if(r<.45){const o=pl.filter(p=>p.id!==a.id&&p.pos===a.pos);if(o.length){addConf(c,'briga',a,pick(o));return}}
  addConf(c,r<.75?'desmot':'panela',a,null);
}
function sqcStart(v){G.sqc=v;G.sqcSeq=[]}
hookAround('finishRound','ext20_fr20',function(next,A){
  let played=new Set(),gf=0,ga=0,ok=false;
  try{const um=R&&R.ms[R.ui];if(um){const us=userSide(um),sd=um[us];played=new Set([...sd.lineup,...sd.used]);gf=us==='h'?um.hg:um.ag;ga=us==='h'?um.ag:um.hg;ok=true}}catch(e){}
  const out=next();
  try{if(ok){
    sqcTick(played,gf,ga);sqcFriction();
    const c=userClub();
    for(const id of c.squad){const p=P(id);if(played.has(id)){p.cons=(p.cons||0)+1;if(p.cons>=6&&p.pos!=='GK'&&p.role!=='GOL')p.en=clamp(p.en-Math.min(4,p.cons-5),15,100)}else p.cons=0}
  }}catch(e){console.error('ext20 '+e.message)}
  return out;
});
hookAround('startCareer','sc20',function(next,__a){next();sqcStart(62);G.autoMode={mode:'nota',val:{desc:75,jov:23},on:false};save()});
hookAround('takeJob','tj20',function(next,__a){const r=next();sqcStart(55);return r});
hookAround('loadSave','ls20',function(next,__a){const ok=next();if(ok&&G){if(G.sqc===undefined)sqcStart(62);if(!G.autoMode)G.autoMode={mode:'nota',val:{desc:75,jov:23},on:false}}return ok});

/* ---------- seleção automática por critério ---------- */
hookAround('slotScore','ss20',function(next,__a){let [p,slot,phil]=__a;
  let s=next();const a=G&&G._ap;
  if(a){
    if(a.mode==='desc'&&p.en<a.v)s-=(a.v-p.en)*.9+10;
    if(a.mode==='jov'&&p.age>a.v)s-=(p.age-a.v)*3.2;
  }
  return s;
});
function autoPickMode(c,mode,v){
  G._ap=mode==='nota'?null:{mode,v};
  try{autoPick(c)}finally{G._ap=null}
}
function modeLbl(m,v){return m==='desc'?'descansados (≥ '+v+'%)':m==='jov'?'jovens (até '+v+' anos)':'melhores por nota'}

/* ---------- menos aleatoriedade: a força do time pesa mais na tabela ---------- */
TUNE.ex=2.4;TUNE.rate=0.125;

/* ---------- IA rica reforça o elenco com estrelas (evita grande decaindo sem motivo) ---------- */
function aiStars(){
  if(!winOpen()||G.round>=NR())return;
  const rich=G.clubs.filter(c=>c.id!==G.user&&c.div===0&&c.caixa>scaleOf(c)*.3&&c.squad.length<29).sort((a,b)=>b.caixa/scaleOf(b)-a.caixa/scaleOf(a)).slice(0,6);
  for(const b of rich){
    if(Math.random()>.35)continue;
    const bs=b.squad.map(id=>P(id)).sort((x,y)=>y.ovr-x.ovr);const gate=bs[Math.min(5,bs.length-1)].ovr;
    let best=null,bv=-1;
    for(const s of G.clubs){if(s.id===G.user||s.id===b.id||s.rep>=b.rep||s.squad.length<=22)continue;
      for(const id of s.squad){const p=P(id);if(p.loan||p.ovr<gate+1||p.ovr>bs[0].ovr+1)continue;const fee=valueOf(p)*1.2;if(fee>b.caixa*.55)continue;if(p.ovr>bv){bv=p.ovr;best={p,s,fee}}}}
    if(!best)continue;
    const {p,s,fee}=best;const f=+fee.toFixed(1);
    s.squad=s.squad.filter(id=>id!==p.id);b.squad.push(p.id);p.club=b.id;p.listed=false;delete p.wage;
    b.caixa=+(b.caixa-f).toFixed(1);s.caixa=+(s.caixa+f*.9).toFixed(1);refill(s);
    if(b.squad.length>=29){const w=b.squad.map(id=>P(id)).sort((x,y)=>x.ovr-y.ovr)[0];b.squad=b.squad.filter(id=>id!==w.id);w.club=-1;G.free.push(w.id)}
    if(f>=8||s.div===userClub().div)addNews('Mercado: '+nameOf(p)+' deixa o '+s.name+' e vai para o '+b.name+' por '+mi(f)+'.');
  }
}
hookAfter('finishRound','ext20_fr20b',()=>{aiStars()});

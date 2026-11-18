/* ext13: formações modernas, estilo/formação treináveis, treino, personalidade e vestiário, assistente estilo mestre de D&D */

/* ============ FORMAÇÕES MODERNAS ============ */
Object.assign(FORMS,{'4-1-4-1':[4,5,1],'4-3-2-1':[4,5,1],'4-2-2-2':[4,4,2],'4-4-1-1':[4,5,1],'4-1-2-1-2':[4,4,2],'3-4-2-1':[3,6,1],'3-4-1-2':[3,5,2],'5-2-3':[5,2,3],'3-4-3 Losango':[3,4,3]});
// posições de meio e ataque (x,y) por esquema; zagueiros e goleiro vêm do layout padrão
const FPOS={
 '4-1-4-1':{m:[[50,57],[14,42],[38,42],[62,42],[86,42]],a:[[50,16]]},
 '4-3-2-1':{m:[[26,52],[50,55],[74,52],[36,33],[64,33]],a:[[50,15]]},
 '4-2-2-2':{m:[[36,54],[64,54],[16,35],[84,35]],a:[[38,15],[62,15]]},
 '4-4-1-1':{m:[[14,47],[38,49],[62,49],[86,47],[50,30]],a:[[50,14]]},
 '4-1-2-1-2':{m:[[50,57],[28,45],[72,45],[50,32]],a:[[38,15],[62,15]]},
 '3-4-2-1':{m:[[12,50],[38,53],[62,53],[88,50],[34,31],[66,31]],a:[[50,14]]},
 '3-4-1-2':{m:[[12,50],[38,52],[62,52],[88,50],[50,33]],a:[[38,15],[62,15]]},
 '5-2-3':{m:[[36,48],[64,48]],a:[[18,17],[50,13],[82,17]]},
 '4-2-3-1':{m:[[35,53],[65,53],[20,33],[50,31],[80,33]],a:[[50,14]]},
 '4-5-1':{m:[[14,44],[32,46],[50,48],[68,46],[86,44]],a:[[50,15]]}
};
FORMLIST.length=0;
FORMLIST.push('4-4-2','4-3-3','4-2-3-1','4-1-4-1','4-3-2-1','4-2-2-2','4-4-1-1','4-1-2-1-2','3-5-2','3-4-3','3-4-2-1','3-4-1-2','5-3-2','5-4-1','5-2-3');
hookAround('layout','lay13',function(next,__a){let [slots,form]=__a;
  const base=next(slots,form);const f=FPOS[(form||'').replace(/ (def|Ofen\.|Alas)$/,'')];if(!f)return base;
  let mi=0,ai=0;slots.forEach((s,i)=>{if(s==='MID'&&f.m&&f.m[mi])base[i]={x:f.m[mi][0],y:f.m[mi++][1]};else if(s==='ATA'&&f.a&&f.a[ai])base[i]={x:f.a[ai][0],y:f.a[ai++][1]}});
  return base;
});

/* ============ ENTROSAMENTO (estilo e formação são treinados) ============ */
const FAMBASE=75,STYLEFAM_START=72;
function famBox(c){if(!c.fam)c.fam={s:{},f:{}};return c.fam}
function famGet(c,kind,key){const b=famBox(c)[kind];if(b[key]===undefined)b[key]=(kind==='s'?c.style:c.formation)===key?STYLEFAM_START:44;return b[key]}
function famMul(v){return 1+(v-FAMBASE)*0.00055}
function styleFit(s){
  const pl=s.lineup.filter((id,i)=>s.slots[i]!=='GK'&&!s.sent.includes(id)).map(P);if(!pl.length)return 0;
  const av=a=>a.length?a.reduce((x,v)=>x+v,0)/a.length:0;const ov=a=>av(a.map(p=>p.ovr));
  const all=ov(pl),att=ov(pl.filter(p=>p.role==='ATA'||p.role==='PNT')),mid=ov(pl.filter(p=>p.role==='MEI'||p.role==='VOL')),def=ov(pl.filter(p=>p.role==='ZAG'||p.role==='LAT')),age=av(pl.map(p=>p.age));
  switch(s.style){
    case 'Ofensivo':return clamp((att-def)*.004+(att-all)*.003,-.03,.03);
    case 'Defensivo':return clamp((def-att)*.004+(def-all)*.003,-.03,.03);
    case 'Posse':return clamp((mid-all)*.008,-.03,.03);
    case 'Contra-ataque':return clamp((27.5-age)*.006+(att-all)*.003,-.03,.03);
    default:return 0}
}
const STY_OK={Posse:['Passe'],'Contra-ataque':['Contra-ataque'],Defensivo:['Retranca'],Ofensivo:['Pressão','Pontas','Direto'],Equilibrado:[]};
const STY_BAD={Posse:['Retranca','Direto'],'Contra-ataque':['Pressão'],Defensivo:['Pressão','Pontas'],Ofensivo:['Retranca'],Equilibrado:[]};
function styleCoh(c,style){const p=c.phil;return STY_OK[style].includes(p)?1.015:STY_BAD[style].includes(p)?0.98:1}
/* quanto cada fator mexe no jogo do usuário (para mostrar na tela) */
function styleFactors(s){
  const c=s.club,u=c.id===G.user;
  const fit=styleFit(s),coh=styleCoh(c,s.style);
  const fs=u?famMul(famGet(c,'s',s.style)):1,ff=u?famMul(famGet(c,'f',(s.formation||'').replace(/ (def|Ofen\.|Alas)$/,''))):1;
  const vest=u&&G.vest?1+(G.vest.clima-60)*0.0004:1;
  const asst=u&&G.asst&&G.asst.phil!==c.phil?0.99:1;
  return {fit:1+fit,coh,fs,ff,vest,asst};
}
const _pw13=power;power=function(m,s){
  const r=_pw13(m,s);if(!s.club)return r;
  const f=styleFactors(s);
  const g=f.coh*f.fs*f.ff*f.vest*f.asst;
  r.atk*=f.fit*g;r.mid*=(1+(f.fit-1)*.7)*g;r.def*=(1+(g-1)*.9);
  return r;
};

/* ============ TREINO ============ */
const TRN_FOC={estilo:['Estilo de jogo','Treina o jeito de jogar atual'],forma:['Formação','Entrosa o esquema tático escolhido'],fisico:['Físico','Recupera energia e reduz lesões'],tecnica:['Técnica','Evolui o encaixe na filosofia'],folga:['Folga','Descanso total, melhora clima e energia']};
const TRN_INT=['Leve','Normal','Pesada'];
function trnBox(){if(!G.trn)G.trn={foc:'estilo',int:1};return G.trn}
function trainTick(){
  const c=userClub();if(!c)return;const t=trnBox(),k=[.6,1,1.5][t.int];
  const q=G.asst?G.asst.q:2;const mul=k*(0.8+q*0.08)*(1+0.06*(typeof mgd==='function'&&G.mgr?mgd('tre'):0));
  const b=famBox(c),fk=(c.formation||'').replace(/ (def|Ofen\.|Alas)$/,'');
  // jogar o esquema já entrosa, treinar entrosa mais
  b.s[c.style]=clamp(famGet(c,'s',c.style)+.8+(t.foc==='estilo'?3.4*mul:0),0,100);
  b.f[fk]=clamp(famGet(c,'f',fk)+.8+(t.foc==='forma'?3.4*mul:0),0,100);
  for(const key of Object.keys(b.s))if(key!==c.style)b.s[key]=clamp(b.s[key]-.35,20,100);
  for(const key of Object.keys(b.f))if(key!==fk)b.f[key]=clamp(b.f[key]-.35,20,100);
  for(const id of c.squad){const p=P(id);if(p.inj>0)continue;
    if(t.foc==='fisico'){p.en=clamp(p.en+4*k,0,100)}
    else if(t.foc==='folga'){p.en=clamp(p.en+9,0,100);p.mor=clamp(p.mor+1,0,100);pers(p).pm=clamp(pers(p).pm+1,0,100)}
    else if(t.foc==='tecnica'){p.fit[c.phil]=clamp(+(p.fit[c.phil]+.35*mul).toFixed(1),5,100)}
    if(t.int===2&&t.foc!=='folga'){p.en=clamp(p.en-3,0,100);if(Math.random()<.0035)giveInj(p,'treino')}
    if(t.int===0&&t.foc!=='folga')p.en=clamp(p.en+1,0,100)}
}

/* ============ PERSONALIDADE E VESTIÁRIO ============ */
const PGN={'-1':'Problemático','0':'Neutro','1':'Bom de grupo','2':'Líder'};
const PCN={T:'Titular',R:'Rodízio',B:'Reserva'};
function hashId(id){let h=id*2654435761%4294967296;h^=h>>>13;h=Math.imul(h,1274126177)>>>0;return h/4294967296}
function pers(p){
  if(!p)return {pm:50,pg:0,pc:'R',pst:0};
  if(p.pm===undefined){const h=hashId(p.id+7),h2=hashId(p.id+91);
    p.pg=h<.07?2:h<.30?1:h<.45?-1:0;p.pm=Math.round(55+h2*25);p.pc=null;p.pst=0}
  return p;
}
function promiseFor(c,p){const need={GOL:1,ZAG:2,LAT:2,VOL:2,MEI:2,PNT:2,ATA:2},ids=c.squad.filter(id=>P(id).pos===p.pos).sort((a,b)=>P(b).ovr-P(a).ovr);const r=ids.indexOf(p.id),n=({GK:1,DEF:4,MID:4,ATA:2})[p.pos]||2;return r<n?'T':r<n+2?'R':'B'}
function vestBox(){if(!G.vest)G.vest={clima:62,conf:[],psi:0,seq:1,log:[],resolved:0};if(G.psi===undefined)G.psi=0;return G.vest}
function psiCost(lv){return +(scaleOf(userClub())*(.007+.005*lv)).toFixed(2)}
function addConf(c,kind,a,b){
  const v=vestBox();if(v.conf.length>=4)return;
  if(v.conf.some(x=>x.a===a.id||x.b===a.id))return;
  const o={id:v.seq++,kind,a:a.id,b:b?b.id:null,since:G.round,sev:1,s:G.season};v.conf.push(o);
  const nm=lastName(a.name),nb=b?lastName(b.name):'';
  const txt=kind==='briga'?`${nm} e ${nb} discutem no treino`:kind==='tempo'?`${nm} reclama de tempo de jogo`:kind==='panela'?`${nm} forma panelinha no vestiário`:`${nm} está desmotivado`;
  addNews('Vestiário: '+txt+'.');
  if(Math.random()<.6)paperLine('Clima pesado no CT: '+txt,'Bastidores apontam insatisfação no elenco.');
}
function confDesc(x){const a=P(x.a),b=x.b?P(x.b):null;
  return x.kind==='briga'?`${esc(nameOf(a))} × ${esc(nameOf(b))} · briga no treino`:x.kind==='tempo'?`${esc(nameOf(a))} · quer jogar mais (prometido: ${PCN[a.pc||'R']})`:x.kind==='panela'?`${esc(nameOf(a))} · panelinha no grupo`:`${esc(nameOf(a))} · desmotivado`;}
function climaOf(){
  const c=userClub(),v=vestBox();
  const ps=c.squad.map(id=>pers(P(id)));const n=ps.length||1;
  const mean=ps.reduce((s,p)=>s+p.pm,0)/n;
  const good=ps.filter(p=>p.pg>0).length+ps.filter(p=>p.pg===2).length,bad=ps.filter(p=>p.pg<0).length;
  const t=clamp(mean+(good-bad)*1.1-6*v.conf.reduce((s,x)=>s+x.sev,0)+2*G.psi+(c.humor-60)*.08,0,100);
  return t;
}
function vestTick(played,won,lost){
  const c=userClub(),v=vestBox();
  v.conf=v.conf.filter(x=>P(x.a)&&P(x.a).club===c.id&&(!x.b||(P(x.b)&&P(x.b).club===c.id)));
  const top=c.squad.slice().sort((a,b)=>P(b).ovr-P(a).ovr);
  for(const id of c.squad){const p=pers(P(id));
    if(!p.pc)p.pc=promiseFor(c,p);
    const pl=played.has(id);
    if(pl){p.pm=clamp(p.pm+(p.pc==='B'?2.5:1.8),0,100);p.pst=0}
    else{
      p.pst=(p.pst||0)+1;
      const rank=top.indexOf(id);
      if(p.pc==='T'&&p.inj===0)p.pm=clamp(p.pm-(rank<14?4.2:3),0,100);
      else if(p.pc==='R'&&p.pst>=3&&p.inj===0)p.pm=clamp(p.pm-1.8,0,100);
      else p.pm=clamp(p.pm+(p.pc==='B'?.4:-.2),0,100)}
    p.pm=clamp(p.pm+(won?.8:lost?-.8:0)*(pl?1:.4),0,100);
    p.mor=clamp(p.mor+(p.pm-62)*.012,30,100);
    if(p.pg<0&&Math.random()<.04)p.pm=clamp(p.pm-3,0,100)}
  // surge conflito
  const open=v.conf.length;
  if(open<3&&Math.random()<.07+(v.clima<50?.07:0)-(G.psi*.012)){
    const unh=c.squad.map(id=>P(id)).filter(p=>p.inj===0&&p.pm<45).sort((a,b)=>a.pm-b.pm);
    const bads=c.squad.map(id=>P(id)).filter(p=>p.pg<0);
    const r=Math.random();
    if(unh.length&&r<.55){const a=unh[0];addConf(c,a.pc==='T'?'tempo':'desmot',a,null)}
    else if(bads.length>=1){const a=pick(bads);const o=c.squad.map(id=>P(id)).filter(p=>p.id!==a.id&&(p.pos===a.pos||p.pg>0));if(o.length)addConf(c,'briga',a,pick(o))}
    else if(unh.length){addConf(c,'panela',unh[0],null)}}
  // conflitos antigos pioram
  for(const x of v.conf.slice()){
    const a=P(x.a);if(a.club!==c.id||(x.b&&P(x.b).club!==c.id)){v.conf=v.conf.filter(y=>y!==x);continue}
    if(G.round-x.since>=4&&G.round-x.since<=9&&Math.random()<.18&&x.sev<3){x.sev++;addNews('Vestiário: o climão com '+lastName(a.name)+' piorou.')}
    if(x.sev>=3&&Math.random()<.2){a.pm=clamp(a.pm-6,0,100);if(!a.listed&&Math.random()<.4){a.listed=true;addNews(lastName(a.name)+' pede para sair do clube.')}}
    if(x.sev>=2){a.mor=clamp(a.mor-1.5,30,100);if(x.b)P(x.b).mor=clamp(P(x.b).mor-1,30,100)}}
  v.clima=+(v.clima*.7+climaOf()*.3).toFixed(1);
}
hookAround('finishRound','ext13_fr13',function(next,A){
  const um=R&&R.ms[R.ui],us=um?userSide(um):null,sd=um?um[us]:null;
  const played=new Set(sd?[...sd.lineup,...sd.used]:[]);
  const gf=um?(us==='h'?um.hg:um.ag):0,ga=um?(us==='h'?um.ag:um.hg):0;
  const out=next();
  try{
    vestBox();trnBox();
    if(G.psi>0){const cost=+(scaleOf(userClub())*.00007*G.psi).toFixed(3);G.fin.caixa=+(G.fin.caixa-cost).toFixed(3)}
    trainTick();vestTick(played,gf>ga,gf<ga);tipTick();
  }catch(e){console.error('ext13 '+e.message)}
  return out;
});
Object.assign(A,{
 psiup(){vestBox();if(G.psi>=3)return;const cost=psiCost(G.psi);if(G.fin.caixa<cost)return toast('Caixa insuficiente ('+mi(cost)+').');G.fin.caixa=+(G.fin.caixa-cost).toFixed(2);G.psi++;save();toast('Psicólogo nível '+G.psi+' contratado.')},
 confix(d){const v=vestBox(),x=v.conf.find(y=>y.id===+d.id);if(!x)return;
   const how=d.how;let bonus=0,dc=11,cost=0;
   if(P(x.a).pg<0)dc+=2;dc+=x.sev-1;
   if(how==='conv'){bonus=(typeof mgd==='function'&&G.mgr?mgd('mot'):0)}
   else if(how==='psi'){if(G.psi<1)return toast('Contrate um psicólogo antes.');bonus=G.psi*2;cost=+(scaleOf(userClub())*.004).toFixed(2);if(G.fin.caixa<cost)return toast('Caixa insuficiente.');G.fin.caixa=+(G.fin.caixa-cost).toFixed(2)}
   else if(how==='venda'){const p=P(x.a);p.listed=true;v.conf=v.conf.filter(y=>y!==x);toast(nameOf(p)+' colocado à venda.');save();render();return}
   const roll=ri(1,20),tot=roll+bonus,ok=roll===20||(roll!==1&&tot>=dc);
   x.last={roll,bonus,dc,ok};
   const a=P(x.a);
   if(ok){a.pm=clamp(a.pm+14,0,100);if(x.b)P(x.b).pm=clamp(P(x.b).pm+8,0,100);v.conf=v.conf.filter(y=>y!==x);v.resolved++;v.log.unshift({s:G.season,r:G.round,t:`🎲 ${roll}${bonus?(bonus>0?'+':'')+bonus:''} vs ${dc}: resolvido (${how==='psi'?'psicólogo':'conversa'}).`});toast(`🎲 ${roll}${bonus?(bonus>0?'+':'')+bonus:''} contra ${dc}: resolvido!`)}
   else{if(roll===1){x.sev=Math.min(3,x.sev+1);a.pm=clamp(a.pm-4,0,100)}v.log.unshift({s:G.season,r:G.round,t:`🎲 ${roll}${bonus?(bonus>0?'+':'')+bonus:''} vs ${dc}: não deu certo.`});toast(`🎲 ${roll}${bonus?(bonus>0?'+':'')+bonus:''} contra ${dc}: não resolveu.`)}
   v.log=v.log.slice(0,12);save();render()},
 promise(d){const p=P(+d.id);pers(p);const order=['T','R','B'];const i=order.indexOf(p.pc||'R');const nx=order[(i+1)%3];
   p.pm=clamp(p.pm+(order.indexOf(nx)>i?-3:4),0,100);p.pc=nx;p.pst=0;save();render()},
 trnfoc(d){trnBox().foc=d.k;save();render()},
 trnint(d){trnBox().int=+d.k;save();render()},
 setform(d){const c=userClub();c.formation=d.f;autoPick(c);S.psel=null;save();render()},
 setstyle(d){userClub().style=d.s;save();render()},
 msetform(d){const m=R.ms[R.ui],s=m[userSide(m)];s.formation=d.f;reassign(s);S.psel=null;render()},
 msetstyle(d){const m=R.ms[R.ui];m[userSide(m)].style=d.s;render()}
});

/* ============ ASSISTENTE (mestre de D&D) ============ */
function tipBox(){if(!G.tips)G.tips=[];if(!G.tipst)G.tipst={ok:0,bad:0,seq:1};return G.tips}
function asstAcc(){const q=G.asst?G.asst.q:2;return clamp(.5+q*.08,.5,.92)}
function newTip(){
  const c=userClub(),v=vestBox();const acc=asstAcc();
  const real=Math.random()<acc;const T=G.tipst;
  const sq=c.squad.map(id=>P(id));
  const opts=[];
  // dicas reais (baseadas no que acontece)
  if(real){
    v.conf.forEach(x=>opts.push({k:'conf',a:x.a,b:x.b,cid:x.id,txt:x.b?`Professor, ${lastName(P(x.a).name)} e ${lastName(P(x.b).name)} estão brigando. Melhor falar com os dois.`:`${lastName(P(x.a).name)} está com a cabeça longe. Vale uma conversa.`,dc:11,bonus:'mot'}));
    sq.filter(p=>p.pm<48&&p.inj===0).forEach(p=>opts.push({k:'tempo',a:p.id,txt:`${lastName(p.name)} quer mais tempo de jogo e talvez não renove o contrato.`,dc:12,bonus:'mot'}));
    sq.filter(p=>p.en<58&&p.inj===0&&c.squad.indexOf(p.id)<11).forEach(p=>opts.push({k:'cansaco',a:p.id,txt:`${lastName(p.name)} está no limite físico. Poupe ele um jogo.`,dc:9,bonus:'tre'}));
    const fx=G.round<NR()?G.fixtures[G.round][userFixtureIdx()]:null;
    if(fx){const opp=C(fx[0]===c.id?fx[1]:fx[0]);const cnt={Ofensivo:'Contra-ataque','Contra-ataque':'Posse',Posse:'Defensivo',Defensivo:'Ofensivo',Equilibrado:'Equilibrado'};
      const sug=cnt[opp.style];if(sug&&sug!==c.style)opts.push({k:'tatica',s:sug,txt:`O ${opp.name} joga no estilo ${opp.style}. Contra isso, ${sug} costuma funcionar.`,dc:11,bonus:'tat'})}
    sq.filter(p=>p.age<=21&&p.ovr>=c.squad.map(id=>P(id).ovr).sort((a,b)=>b-a)[14]).forEach(p=>opts.push({k:'jovem',a:p.id,txt:`${lastName(p.name)} (${p.age}) está pronto. Dê minutos pra ele crescer.`,dc:10,bonus:'bas'}));
  }
  // dicas furadas (o auxiliar viu fantasma)
  if(!real||!opts.length){
    const p=pick(sq.filter(p=>p.inj===0));
    const f=[{k:'conf',a:p.id,b:null,cid:-1,txt:`Acho que ${lastName(p.name)} anda sentido. Vale conversar com ele.`,dc:9,bonus:'mot',fake:1},
             {k:'cansaco',a:p.id,txt:`${lastName(p.name)} parece cansado. Melhor poupar.`,dc:9,bonus:'tre',fake:1},
             {k:'tatica',s:pick(STYLES.filter(x=>x!==c.style)),txt:'Sinto que mudar o estilo de jogo agora vai render.',dc:12,bonus:'tat',fake:1}];
    opts.length=0;opts.push(pick(f))
  }
  const o=pick(opts);
  if(G.tips.some(t=>t.k===o.k&&t.a===o.a))return;
  G.tips.push(Object.assign({id:T.seq++,round:G.round,season:G.season,state:'new'},o));
}
function tipTick(){
  tipBox();
  G.tips=G.tips.filter(t=>t.state!=='done'||G.round-t.round<6);
  for(const t of G.tips)if(t.state==='new'&&G.round-t.round>=5){t.state='done';t.res='expirou';if(t.k==='conf'&&!t.fake){const x=vestBox().conf.find(y=>y.id===t.cid);if(x&&Math.random()<.4)x.sev=Math.min(3,x.sev+1)}}
  const open=G.tips.filter(t=>t.state==='new').length;
  if(G.round<NR()&&open<3&&Math.random()<.5)newTip();
}
function bonusOf(k){return (typeof mgd==='function'&&G.mgr)?mgd(k):0}
Object.assign(A,{
 tipgo(d){tipBox();const t=G.tips.find(x=>x.id===+d.id);if(!t||t.state!=='new')return;
   const c=userClub(),v=vestBox();
   if(t.a!==undefined&&(!P(t.a)||P(t.a).club!==c.id)){t.state='done';t.res='o jogador já saiu do clube';save();render();return}
   const roll=ri(1,20),b=bonusOf(t.bonus)+Math.round(((G.asst?G.asst.q:2)-3)*.5),tot=roll+b;
   const ok=roll===20||(roll!==1&&tot>=t.dc);const crit=roll===20,fumble=roll===1;
   const lab=`🎲 ${roll}${b?(b>0?'+':'')+b:''} vs ${t.dc}`;
   let res;
   if(t.fake){
     if(t.k==='tatica'){const old=c.style;c.style=t.s;res=ok?`${lab}: o ensaio funcionou, mas o auxiliar viu fantasma. Estilo mudou sem ganho real.`:`${lab}: o time estranhou o novo estilo.`;if(!ok){famBox(c).s[t.s]=famGet(c,'s',t.s)-4}}
     else{const p=P(t.a);if(!ok||fumble){p.pm=clamp(pers(p).pm-4,0,100);res=`${lab}: ${lastName(p.name)} não entendeu a conversa e se sentiu desconfiado.`}else res=`${lab}: nada demais, o auxiliar se enganou.`}
     G.tipst.bad++}
   else if(t.k==='conf'){const x=v.conf.find(y=>y.id===t.cid);
     if(x){if(ok){P(x.a).pm=clamp(P(x.a).pm+14,0,100);if(x.b)P(x.b).pm=clamp(P(x.b).pm+8,0,100);v.conf=v.conf.filter(y=>y!==x);v.resolved++;res=`${lab}: resolveu o climão.`;G.tipst.ok++}else{if(fumble)x.sev=Math.min(3,x.sev+1);res=`${lab}: a conversa não pegou.`}}
     else res=`${lab}: o assunto já tinha esfriado.`}
   else if(t.k==='tempo'){const p=P(t.a);pers(p);if(ok){p.pm=clamp(p.pm+14,0,100);p.pc='R';res=`${lab}: ${lastName(p.name)} entendeu o plano e ficou calmo.`;G.tipst.ok++}else{p.pm=clamp(p.pm-(fumble?5:2),0,100);res=`${lab}: ${lastName(p.name)} continua insatisfeito.`}}
   else if(t.k==='cansaco'){const p=P(t.a);if(ok){p.en=clamp(p.en+(crit?22:14),0,100);res=`${lab}: ${lastName(p.name)} descansou e volta inteiro.`;G.tipst.ok++}else{p.en=clamp(p.en+4,0,100);res=`${lab}: o descanso foi curto.`}}
   else if(t.k==='tatica'){const old=c.style;c.style=t.s;if(ok){famBox(c).s[t.s]=clamp(famGet(c,'s',t.s)+(crit?24:16),0,100);res=`${lab}: o time absorveu o plano contra o adversário.`;G.tipst.ok++}else{famBox(c).s[t.s]=clamp(famGet(c,'s',t.s)+3,0,100);res=`${lab}: a mudança não encaixou direito.`}}
   else if(t.k==='jovem'){const p=P(t.a);if(ok){p.mor=clamp(p.mor+6,30,100);p.pot=Math.min(99,p.pot+(crit?1:0));p.fit[c.phil]=clamp(+(p.fit[c.phil]+2).toFixed(1),5,100);res=`${lab}: ${lastName(p.name)} cresceu com os minutos.`;G.tipst.ok++}else res=`${lab}: o garoto ainda não está pronto.`}
   t.state='done';t.res=res;save();toast(res);render()},
 tipno(d){tipBox();const t=G.tips.find(x=>x.id===+d.id);if(!t||t.state!=='new')return;
   t.state='done';t.res='ignorada';
   if(!t.fake&&t.k==='conf'){const x=vestBox().conf.find(y=>y.id===t.cid);if(x&&Math.random()<.35)x.sev=Math.min(3,x.sev+1)}
   if(!t.fake&&t.k==='tempo'){const p=P(t.a);p.pm=clamp(pers(p).pm-3,0,100)}
   save();render()}
});
/* novo clube/temporada */
hookAround('startCareer','sc13',function(next,__a){let [id,coach,phil,asst]=__a;next(id,coach,phil,asst);G.trn={foc:'estilo',int:1};G.vest=null;G.tips=[];G.tipst={ok:0,bad:0,seq:1};G.psi=0;vestBox();save()});
hookAround('takeJob','tj13',function(next,__a){const r=next();try{G.vest=null;G.tips=[];G.psi=0;vestBox();G.trn={foc:'estilo',int:1}}catch(e){}return r});

/* ============ IA: estilo coerente com filosofia + adaptação ao adversário ============ */
const STY_BY_PHIL={Passe:'Posse','Contra-ataque':'Contra-ataque',Retranca:'Defensivo','Pressão':'Ofensivo',Pontas:'Ofensivo',Direto:'Equilibrado'};
const AIFORMS=['4-4-2','4-4-2','4-3-3','4-3-3','4-2-3-1','4-2-3-1','4-1-4-1','3-5-2','4-3-2-1','5-3-2','3-4-2-1','4-2-2-2'];
hookAround('newWorld','nw13',function(next,__a){
  next();
  for(const c of G.clubs){c.style=Math.random()<.75?(STY_BY_PHIL[c.phil]||'Equilibrado'):pick(STYLES);c.formation=pick(AIFORMS)}
});
hookAround('prepareRound','pr13',function(next,__a){
  const prev={};for(const c of G.clubs)prev[c.id]=c.style;
  next();
  for(const c of G.clubs){if(c.id===G.user)continue;c.style=prev[c.id];if(G.fixtures[G.round]===undefined)continue}
  for(const [h,a] of (G.fixtures[G.round]||[])){
    for(const [me,op] of [[C(h),C(a)],[C(a),C(h)]]){if(me.id===G.user)continue;
      const d=strength(op)-strength(me)+(me.id===h?-1.5:1.5);
      if(d>6&&Math.random()<.5)me.style=pick(['Defensivo','Contra-ataque']);
      else if(d<-6&&Math.random()<.4)me.style=pick(['Ofensivo','Posse']);
      else if(Math.random()<.06)me.style=pick(STYLES)}}
});

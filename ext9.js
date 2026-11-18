/* ext9: Base (olheiro/treinador/gerente/CT), Marketing (camisas, patrocínios, sócio-torcedor, redes), Torcida (ídolos, vaiados, êxodo) e Estádio */
/* dados reais: Datafolha jul/2026 (torcida %), sócios (levantamento 2023), CIES 2025 (base), master (valores 2026). "e" = estimado */
const CD={
 PAL:{f:7,s:185,b:65.1,m:100},FLA:{f:22,s:103,b:67.4,m:268},BOT:{f:1.2,s:61.6,b:45,m:55,e:1},CAM:{f:2,s:85.5,b:37.2,m:60},
 FLU:{f:2,s:66.7,b:55.2,m:52},SAO:{f:6,s:60.4,b:71.3,m:113},INT:{f:2,s:120.8,b:55.4,m:30,e:1},GRE:{f:3,s:113.9,b:56.4,m:30,e:1},
 COR:{f:14,s:116,b:68.8,m:150},CRU:{f:4,s:50.8,b:56,m:40},BAH:{f:1.3,s:50,b:40,m:25,e:1},VAS:{f:3,s:56,b:52,m:25,e:1},
 CAP:{f:1,s:40,b:44.5,m:25,e:1},SAN:{f:2,s:31.1,b:57.6,m:35},RBB:{f:.4,s:5,b:50,m:20,e:1},VIT:{f:1,s:25,b:38,m:20},
 CFC:{f:.6,s:20,b:40,m:10,e:1},MIR:{f:.2,s:5,b:30,m:9},CHA:{f:.3,s:8,b:32,m:6,e:1},REM:{f:1,s:20,b:30,m:12}
};
/* ídolos históricos (galeria) */
const IDOL={
 FLA:['Zico','Júnior','Leandro','Petkovic','Gabigol'],COR:['Sócrates','Neto','Marcelinho Carioca','Rivellino','Cássio'],
 PAL:['Ademir da Guia','Marcos','Evair','Dudu','Gustavo Gómez'],SAO:['Rogério Ceni','Raí','Kaká','Careca','Telê Santana'],
 SAN:['Pelé','Pepe','Robinho','Diego','Neymar'],GRE:['Renato Gaúcho','Danrlei','Everton','Luan','Hugo de León'],
 INT:['Falcão','Fernandão','D\'Alessandro','Valdomiro','Figueroa'],CRU:['Tostão','Dida','Alex','Piazza','Fábio'],
 CAM:['Reinaldo','Ronaldinho Gaúcho','Victor','Éder Aleixo','Hulk'],VAS:['Roberto Dinamite','Romário','Juninho Pernambucano','Edmundo','Pedrinho'],
 FLU:['Fred','Castilho','Rivellino','Romerito','Fábio'],BOT:['Garrincha','Nilton Santos','Jairzinho','Heleno de Freitas','Loco Abreu'],
 BAH:['Bobô','Charles','Everton Ribeiro'],CAP:['Paulo Baier','Alex Mineiro','Kléberson'],VIT:['Dida','Vampeta','Edílson'],
 CFC:['Alex','Krüger','Pachequinho'],CHA:['Danilo (goleiro)'],MIR:[],REM:[],RBB:[]
};
/* queridinhos atuais (bônus de carinho da torcida, 0-45) */
const FAVB={'Arrascaeta':30,'De La Cruz':18,'Pedro':16,'Gerson':12,'Bruno Henrique':20,'Gabigol':26,'Hulk':32,'Germán Cano':30,'Fábio':32,'Thiago Silva':34,'Jhon Arias':14,'Neymar':45,'Memphis Depay':18,'Yuri Alberto':16,'Rodrigo Garro':14,'Hugo Souza':10,'Raphael Veiga':20,'Gustavo Gómez':22,'Weverton':16,'Vitor Roque':14,'Felipe Anderson':10,'Calleri':20,'Oscar':16,'Lucas Moura':16,'Rafael':20,'Philippe Coutinho':26,'Payet':16,'Vegetti':18,'Everton Ribeiro':26,'Cássio':34,'Matheus Pereira':14,'Gustavo Scarpa':20,'Rony':12,'Paulinho':14,'Savarino':14,'Alan Patrick':16,'Enner Valencia':10,'Tomás Rincón':14,'Fernandinho':26,'Soteldo':12,'Gil':14,'Everson':16,'Jorginho':12,'Danilo':10,'Rossi':8,'Léo Pereira':8,'Martinelli':8};
const FANPOP=213; // milhões de brasileiros 16+ (base p/ % Datafolha)
const SC9=0.42;   // escala dinheiro real → dinheiro do jogo
const rng9=seed=>{let s=seed%2147483647;if(s<=0)s+=2147483646;return()=>(s=s*16807%2147483647)/2147483647};

function cdOf(c){return CD[c.sig]||{f:.3,s:5,b:35,m:8,e:1}}
const fansM=c=>+(cdOf(c).f*FANPOP/100*(0.9+c.humor/500)).toFixed(1);
const scaleOf=c=>(c.tv+c.spBase);
function ex9(){
  if(!G||!G.clubs||!G.clubs.length||G.user===undefined||G.user===null||!userClub())return;
  if(G.mk&&G.mk.v===1)return;
  const c=userClub(),d=cdOf(c),F=fansM(c);
  const fol0=(k)=>+(F*k).toFixed(2);
  G.mk={v:1,
    slots:{manga:null,costas:null,short:null,forn:null},open:null,
    shirt:{price:Math.round(180+c.rep*1.2),camp:0,campUsed:false,units:0,rev:0,by:{},hist:[]},
    soc:{prices:[25,60,150],n:[0,0,0],hist:[],camp:0},
    soc0:Math.round(d.s*1000),
    social:{plan:1,fol:{ig:fol0(.55),tk:fol0(.3),x:fol0(.28),yt:fol0(.12)},hist:[]},
    stad:{lvl:{camarote:0,loja:0,telao:0,estac:0,museu:0,gramado:0},q:[]},
    base:{ct:0,staff:{olh:null,trei:null,ger:null},cand:{},sub20:{},s20hist:[],grads:[],champs:[],rev:[]},
    acc:{gate:0,tv:0,sp:0,shirt:0,soc:0,spx:0,naming:0,social:0,cost:0},accH:[],
    att:[],exo:{streak:0,active:false,lost:0,why:'',hist:[]},last:null,news:[]};
  const mk=G.mk;
  const T=socTarget(c);const sh=[.62,.28,.10];mk.soc.n=sh.map(x=>Math.round(T*x));
  mk.soc.hist.push(mk.soc.n.reduce((a,b)=>a+b,0));
  mk.social.hist.push(folTotal(mk));
  G.clubs.forEach(x=>{x.bq=baseStart(x);x.s20={P:0,GP:0,GC:0,J:0}});
  G.mk.base.sub20={};
}
const _ex9=ex;ex=function(){_ex9();ex9()};

/* ---------- torcida: queridinhos e vaiados ---------- */
function favOf(p){
  let f=26+(p.ovr-60)*1.25+p.goals*1.5+p.ast*.8+(p.real?(FAVB[p.name]||0):0)+(p.age<=21&&p.pot>=84?12:0)+(p.fromBase?10:0);
  if(p.ovr>=85)f+=8;
  return clamp(Math.round(f),3,100);
}
function hateOf(p,c){
  const avg=p.rn?p.rsum/p.rn:6.6;
  const sals=c.squad.map(id=>salOf(P(id))).sort((a,b)=>a-b),med=sals[Math.floor(sals.length/2)]||1;
  let h=(6.6-avg)*34+p.rc*20+p.yc*1.2+(p.mor<45?10:0);
  const why=[];
  if(avg<6.2&&p.rn>2)why.push('nota média '+avg.toFixed(1));
  if(salOf(p)>med*1.7&&avg<6.7){h+=18;why.push('salário alto e rende pouco')}
  if(p.rc>0)why.push(p.rc+' expulsão(ões)');
  if(p.age>=33&&p.ovr<=66){h+=10;why.push('veterano em fim de linha')}
  if(p.games===0&&G.round>8&&p.ovr>=c.rep-4){h+=14;why.push('sumido, nunca joga')}
  return {h:clamp(Math.round(h),0,100),why:why.join(' · ')||'poucos motivos'};
}
function starPower(c){let s=0;for(const id of c.squad){const f=favOf(P(id));if(f>60)s+=(f-60)/110;if(P(id).ovr>=86)s+=.1}return clamp(s,0,1.2)}
function prest(c){const titles=(c.tro&&c.tro[0])||0;return clamp(.35+c.humor/200+Math.min(.4,fansM(c)/80)+Math.min(.25,titles/40),.35,1.5)}

/* ---------- camisas ---------- */
function shirtRefPrice(c){return Math.round(180+c.rep*1.2)}
function shirtAnnual(c){
  const mk=G.mk,sh=mk.shirt,ref=shirtRefPrice(c),r=sh.price/ref;
  let dem=Math.pow(1/r,.7);if(r>1.3)dem*=Math.pow(1.3/r,2);
  const loja=1+.12*mk.stad.lvl.loja,camp=sh.camp>0?1.25:1;
  return fansM(c)*.40*dem*(.7+.6*c.humor/100)*(1+starPower(c)*.9)*loja*camp*(mk.exo.active?.85:1)*r;
}
const shirtUnitsOf=(c,rev)=>Math.round(rev/(SC9*G.mk.shirt.price*.35*1e-6));
function shirtTop(c,n=5){
  const w=c.squad.map(id=>[P(id),Math.pow(favOf(P(id)),1.6)]);const tot=w.reduce((a,x)=>a+x[1],0)||1;
  return w.sort((a,b)=>b[1]-a[1]).slice(0,n).map(([p,x])=>({p,sh:x/tot}));
}
/* ---------- sócio-torcedor ---------- */
const SOCREF=[25,60,150],SOCSH=[.62,.28,.10],SOCN=['Torcedor','Arquibancada','Camarote Premium'];
function socTarget(c){
  const mk=G.mk,d=cdOf(c);
  return mk.soc0*(.45+c.humor/100)*(1+starPower(c)*.35)*(1+.04*mk.stad.lvl.museu)*(mk.exo.active?.8:1)*(mk.soc.camp>0?1.18:1);
}
function socTargets(c){
  const mk=G.mk,T=socTarget(c);
  return SOCREF.map((ref,i)=>T*SOCSH[i]*clamp(Math.pow(ref/mk.soc.prices[i],.9),.25,1.7));
}
const socTotal=mk=>mk.soc.n.reduce((a,b)=>a+b,0);
function socAnnual(){const mk=G.mk;return mk.soc.n.reduce((s,n,i)=>s+n*mk.soc.prices[i]*12*.18*SC9/1e6,0)}
/* ---------- redes ---------- */
const SOCPLAN=[['Só o básico',0,.002],['Institucional',.004,.005],['Memes e bastidores',.008,.009],['Influenciadores',.015,.013]];
const folTotal=mk=>+(mk.social.fol.ig+mk.social.fol.tk+mk.social.fol.x+mk.social.fol.yt).toFixed(2);
/* ---------- patrocínios extras ---------- */
const SLOTD={manga:['Manga',.08,['Cervejaria Três Rios','Seguradora Âncora','Construtora Alvorada','Cooperativa Planalto','Telecom Nova Era','Grupo Vale Verde']],
 costas:['Costas',.04,['Supermercados Preço Bom','Móveis Aurora','Farmácias Vida','Clínica Sorriso','Posto Serra Azul','Faculdade Horizonte']],
 short:['Calção',.03,['Tintas Rainha','Água Cristal','Auto Peças Veloz','Lanchonete Estação','Eletro Mundial']],
 forn:['Material esportivo',.15,['Umbro','Puma','Kappa','Topper','Penalty','Mizuno','Adidas','Nike','New Balance','Lupo']]};

/* ---------- estádio: projetos ---------- */
const PROJ={
 camarote:['Camarotes e lounge','Mais bilheteria nos jogos em casa (+5% por nível)',.06],
 loja:['Loja oficial e megastore','Vende mais camisa (+12% por nível)',.04],
 telao:['Telões e LED','Mais receita de placas e exposição (+3% patrocínio extra por nível)',.04],
 estac:['Estacionamento e acessos','Mais torcedores no jogo (+3% bilheteria por nível)',.03],
 museu:['Museu e tour do clube','Mais sócios (+4% por nível) e renda de visitação',.03],
 gramado:['Gramado híbrido','Torcida mais feliz e campo melhor (+1 humor por nível)',.03]
};
const projCost=(k,lvl)=>+(scaleOf(userClub())*PROJ[k][2]*(lvl+1)).toFixed(1);
function startProj(k){
  const mk=G.mk,lvl=mk.stad.lvl[k];if(lvl>=3)return 'Nível máximo.';
  if(mk.stad.q.some(x=>x.k===k))return 'Obra já em andamento.';
  const cost=projCost(k,lvl);if(G.fin.caixa<cost)return 'Caixa insuficiente ('+mi(cost)+').';
  G.fin.caixa=+(G.fin.caixa-cost).toFixed(2);mk.acc.cost+=cost;mk.stad.q.push({k,left:4});return null;
}
function namingOffers(){
  const c=userClub(),r=rng9(G.season*97+c.id);
  const pool=['Arena Fortuna','Neo Química','Allianz Parque Norte','Estádio Vivo','Arena Cripto','Banco Aurora Arena','Estádio TeleNova','Arena Planalto'];
  return [[3,.9,6],[5,1.05,10],[8,1.25,15]].map(([y,m,hu],i)=>({name:pool.splice(Math.floor(r()*pool.length),1)[0],yrs:y,hum:hu,val:+(scaleOf(c)*.2*m*(.6+.6*prest(c))).toFixed(1)}));
}
sellNaming=function(i){
  if(G.naming)return 'Já existe contrato de naming rights.';
  const o=namingOffers()[i||0];G.naming={name:o.name,val:o.val,yrs:o.yrs};userClub().humor=clamp(userClub().humor-o.hum,5,100);
  addNews('Estádio do '+userClub().name+' agora se chama '+o.name+'.');return null;
};

/* ---------- base ---------- */
const STAFFN={olh:['Olheiro da base','Descobre mais e melhores talentos (mais estrelas)'],trei:['Treinador da base','Acelera a evolução dos garotos'],ger:['Gerente da base','Mais vagas, menos garoto perdido e teto maior']};
function baseIdx(c){
  if(c.id!==G.user)return clamp(c.bq,5,100);
  const b=G.mk.base,q=r=>b.staff[r]?b.staff[r].q:0;
  return clamp(Math.round(c.bq*.65+b.ct*4+(q('olh')+q('trei')+q('ger'))*2.4),5,100);
}
function baseCands(r){
  const b=G.mk.base;if(b.cand[r]&&b.cand[r].s===G.season)return b.cand[r].l;
  const c=userClub(),g=rng9(G.season*53+r.length*7+c.id);
  const l=[1,2,3].map(()=>{const q=Math.min(5,1+Math.floor(g()*g()*5.3+g()*.9));
    return {name:FN[Math.floor(g()*FN.length)]+' '+LN[Math.floor(g()*LN.length)],q,sal:+(scaleOf(c)/120*(.12+q*.10)).toFixed(2)}});
  b.cand[r]={s:G.season,l};return l;
}
function ctCost(){const b=G.mk.base;return +(scaleOf(userClub())*.05*(b.ct+1)).toFixed(1)}
function staffCostYear(){const b=G.mk.base;return Object.values(b.staff).reduce((s,x)=>s+(x?x.sal:0),0)}
const _py9=promoteYouth;promoteYouth=function(c,i){
  const y=c.youth[i];const r=_py9(c,i);
  if(!r&&c.id===G.user){const id=c.squad[c.squad.length-1],p=P(id);const ix=baseIdx(c);
    p.ovr=clamp(p.ovr+Math.round(ix/28),44,82);p.pot=clamp(Math.max(p.pot,p.ovr)+Math.round(ix/30),p.ovr,94);p.fromBase=G.season;G.mk.base.grads.push({pid:id,s:G.season,stars:y?y.stars:3})}
  return r;
};
function sellYouth(i){
  const c=userClub(),y=c.youth[i];if(!y)return 'Jogador não encontrado.';
  const val=+(y.value*(2.2+baseIdx(c)/60)*(1+y.dev/120)).toFixed(2);
  G.fin.caixa=+(G.fin.caixa+val).toFixed(2);c.youth.splice(i,1);addNews('Base: '+y.name+' vendido por '+mi(val)+'.');return null;
}
function genYouth9(c,n){
  const ix=baseIdx(c),b=c.id===G.user?G.mk.base:null,q=r=>b&&b.staff[r]?b.staff[r].q:0;
  for(let i=0;i<n;i++){
    const y=mkYouth();
    const sc=clamp(Math.round(1+Math.pow(Math.random(),1.6-ix/110-q('olh')*.1)*4.4),1,5);
    y.stars=sc;y.dev=clamp(y.dev+ri(0,8)+q('trei')*2,10,70);
    y.value=+(0.02+sc*.012+rnd(0,.02)).toFixed(3);y.value=+(y.value*(1+ix/80)).toFixed(3);
    c.youth.push(y);
  }
}
hookAround('newSeason','ext9_ny9',function(next,A){
  ex();const c=userClub(),mk=G.mk;
  /* fechamento financeiro da temporada */
  const prevPos=posOf(c);
  mk.accH.push({s:G.season,acc:Object.assign({},mk.acc),soc:socTotal(mk),fol:folTotal(mk),pos:prevPos,shirts:mk.shirt.units});
  const bases=G.clubs.filter(x=>x.div===userClub().div).map(x=>[x.id,(x.s20?x.s20.P:0)]).sort((a,b)=>b[1]-a[1]);
  mk.base.champs.push({s:G.season,id:bases[0][0],mine:bases.findIndex(x=>x[0]===G.user)+1});
  const champs9=G.clubs.filter(x=>x.div===0).sort((a,b)=>b.P-a.P||(b.GP-b.GC)-(a.GP-a.GC)).slice(0,2).map(x=>x.id);
  const r=next();
  /* renova patrocínios, vence naming */
  for(const k in mk.slots)if(mk.slots[k])mk.slots[k].val=+(mk.slots[k].val*1.03).toFixed(1);
  if(G.naming){G.naming.yrs--;if(G.naming.yrs<=0){addNews('Contrato de naming rights do '+G.naming.name+' terminou.');G.naming=null}}
  mk.acc={gate:0,tv:0,sp:0,shirt:0,soc:0,spx:0,naming:0,social:0,cost:0};mk.shirt.units=0;mk.shirt.rev=0;mk.shirt.by={};mk.shirt.camp=0;mk.shirt.campUsed=false;mk.soc.camp=0;
  mk.open=null;
  G.clubs.forEach(x=>{x.s20={P:0,GP:0,GC:0,J:0}});
  /* torcida cresce ou encolhe com a campanha */
  const k=prevPos<=4?1.06:prevPos>=17?.93:1;mk.soc0=Math.round(mk.soc0*k);
  /* base: novos garotos conforme a qualidade da base */
  const ix=baseIdx(c),gb=mk.base.staff.ger?mk.base.staff.ger.q:0;
  genYouth9(c,2+Math.round(ix/30)+(gb>=3?1:0));
  c.youth.forEach(y=>{y.dev=Math.min(100,y.dev+(mk.base.staff.trei?mk.base.staff.trei.q:0)*1.5+mk.base.ct)});
  const slots=14+gb*2+mk.base.ct;
  if(c.youth.length>slots){c.youth.sort((a,b)=>(b.stars*30+b.dev)-(a.stars*30+a.dev));const lost=c.youth.splice(slots);if(lost.length&&!gb)addNews('Base lotada: '+lost.length+' garotos dispensados.')}
  champs9.forEach((id,i)=>{const x=C(id);if(x.id===G.user)return;
    const tops=x.squad.map(q=>P(q)).filter(p=>p.age<=31&&!p.loan).sort((a,b)=>b.ovr-a.ovr).slice(0,2);
    tops.forEach((top,j)=>{if(Math.random()<(i===0?.7:.4)-j*.25){x.squad=x.squad.filter(q=>q!==top.id);delete G.players[top.id];
      const np=mkPlayer(top.role,x.rep-8,ri(18,21),x.id);np.pot=clamp(np.ovr+ri(10,22),np.ovr,90);x.squad.push(np.id);
      if(top.real)addNews(nameOf(top)+' deixa o '+x.name+' após a temporada.')}});autoPick(x)});
  G.clubs.filter(x=>x.div===0).forEach(x=>{if(x.id===G.user)return;const ps=(x.retro&&x.retro.length)?x.retro[x.retro.length-1].pos:10;x.rep=+clamp(x.rep*.9+72*.1+rnd(-1.6,1.6)+(ps<=4?.9:ps>=17?-.9:0),58,82).toFixed(1)});
  /* IA: base melhora/piora, exportação de craques, prospectos conforme base */
  for(const x of G.clubs){if(x.id===G.user)continue;
    x.bq=clamp(Math.round(x.bq+rnd(-2,3)+(x.humor>65?1:0)),5,100);
    if(x.squad.length&&Math.random()<.5){
      const top=x.squad.map(id=>P(id)).filter(p=>p.ovr>=79&&p.age<=28&&!p.loan).sort((a,b)=>b.ovr-a.ovr)[0];
      if(top&&Math.random()<.35){x.squad=x.squad.filter(id=>id!==top.id);delete G.players[top.id];
        const np=mkPlayer(top.role,x.rep-9,ri(17,20),x.id);np.pot=clamp(np.ovr+ri(14,26),np.ovr,92);x.squad.push(np.id);
        if(top.ovr>=82&&top.real)addNews(nameOf(top)+' deixa o '+x.name+' rumo à Europa.')}
    }
    if(Math.random()<x.bq/160){const role=pick(['GOL','ZAG','LAT','VOL','MEI','PNT','ATA']);const p=mkPlayer(role,x.rep-12+(x.bq-50)/10,ri(17,19),x.id);p.pot=clamp(p.ovr+ri(14,30),p.ovr,94);x.squad.push(p.id);autoPick(x)}
  }
  save();return r;
});

/* ---------- fim de rodada ---------- */
hookAfter('finishRound','ext9_fr9',function(out,A){
  try{tick9()}catch(e){console.error('tick9',e)}
  });
function simSub20(){
  const fx=G.fixtures[G.round-1];if(!fx)return;const mk=G.mk;
  for(const f of fx){
    const a=C(f[0]),b=C(f[1]);const ia=baseIdx(a),ib=baseIdx(b);
    const la=1.35*Math.exp((ia-ib)/95)*1.07,lb=1.15*Math.exp((ib-ia)/95);
    const poi=l=>{let k=0,p=Math.exp(-l),s=p,u=Math.random();while(u>s&&k<9){k++;p*=l/k;s+=p}return k};
    const ga=poi(la),gb=poi(lb);
    for(const [x,gf,gc] of [[a,ga,gb],[b,gb,ga]]){x.s20=x.s20||{P:0,GP:0,GC:0,J:0};x.s20.J++;x.s20.GP+=gf;x.s20.GC+=gc;x.s20.P+=gf>gc?3:gf===gc?1:0}
    if(a.id===G.user||b.id===G.user){const me=a.id===G.user?a:b,op=me===a?b:a,gf=me===a?ga:gb,gc=me===a?gb:ga;mk.base.rev.push({r:G.round,op:op.sig,gf,gc,home:me===a});mk.base.rev=mk.base.rev.slice(-12)}
  }
}
function tick9(){
  ex9();const c=userClub(),mk=G.mk,l=G.fin.last;if(!c||!mk||!l)return;
  const hum=c.humor/100;
  /* camisas */
  const shA=shirtAnnual(c),shR=shA/38;
  mk.shirt.units+=shirtUnitsOf(c,shR);mk.shirt.rev+=shR;
  const top=shirtTop(c,10);top.forEach(t=>{mk.shirt.by[t.p.id]=(mk.shirt.by[t.p.id]||0)+Math.round(shirtUnitsOf(c,shR)*t.sh)});
  if(mk.shirt.camp>0)mk.shirt.camp--;if(mk.soc.camp>0)mk.soc.camp--;
  /* sócios */
  const tg=socTargets(c);mk.soc.n=mk.soc.n.map((n,i)=>Math.max(0,Math.round(n+(tg[i]-n)*.09)));
  const socR=socAnnual()/38;
  /* redes */
  const sp=SOCPLAN[mk.social.plan],lastRes=G.myres[G.myres.length-1];
  const win=lastRes&&((lastRes.h===G.user&&lastRes.hg>lastRes.ag)||(lastRes.a===G.user&&lastRes.ag>lastRes.hg));
  const g=1+sp[2]+(win?.006:0)+(hum>.7?.003:0)-(hum<.35?.004:0);
  for(const k in mk.social.fol)mk.social.fol[k]=+(mk.social.fol[k]*g).toFixed(3);
  const socialR=folTotal(mk)*.09/38,socialC=scaleOf(c)*sp[1]/38;
  /* patrocínios extras e estádio */
  const spx=slotAnnual()/38*(1+.03*mk.stad.lvl.telao);
  const winB=Object.values(mk.slots).reduce((s,x)=>s+(x&&x.win&&win?x.win:0),0);
  let gateX=0;if(l.home)gateX=l.gate*(.05*mk.stad.lvl.camarote+.03*mk.stad.lvl.estac);
  const staffC=staffCostYear()/38;
  const gain=shR+socR+socialR+spx+winB+gateX,cost=socialC+staffC;
  G.fin.caixa=+(G.fin.caixa+gain-cost).toFixed(2);
  const a=mk.acc;a.shirt+=shR;a.soc+=socR;a.social+=socialR;a.spx+=spx+winB;a.gate+=(l.home?l.gate:0)+gateX;a.tv+=l.tv;a.sp+=l.sp+l.bonus;a.naming+=G.naming?G.naming.val/38:0;a.cost+=cost;
  mk.last={shirt:shR,soc:socR,social:socialR,spx:spx+winB,gateX,cost,net:gain-cost};
  /* obras do estádio */
  for(const q of mk.stad.q)q.left--;
  mk.stad.q=mk.stad.q.filter(q=>{if(q.left<=0){mk.stad.lvl[q.k]++;if(q.k==='gramado')c.humor=clamp(c.humor+1,5,100);addNews('Obra concluída: '+PROJ[q.k][0]+' (nível '+mk.stad.lvl[q.k]+').');return false}return true});
  /* histórico de público */
  if(l.home){mk.att.push({r:G.round,att:l.att,cap:c.cap,op:lastRes?(lastRes.h===G.user?C(lastRes.a).sig:C(lastRes.h).sig):''});mk.att=mk.att.slice(-12)}
  mk.shirt.hist.push(Math.round(mk.shirt.rev*100)/100);mk.soc.hist.push(socTotal(mk));mk.social.hist.push(folTotal(mk));
  ['soc','social','shirt'].forEach(k=>{if(mk[k].hist.length>60)mk[k].hist=mk[k].hist.slice(-60)});
  /* êxodo */
  const ex_=mk.exo;
  if(c.humor<38)ex_.streak++;else ex_.streak=Math.max(0,ex_.streak-1);
  if(!ex_.active&&ex_.streak>=3){ex_.active=true;const lost=Math.round(socTotal(mk)*.1);mk.soc.n=mk.soc.n.map(n=>Math.round(n*.9));ex_.lost+=lost;ex_.why='sequência ruim e torcida irritada';
    addNews('ÊXODO: torcida do '+c.name+' abandona o estádio. ~'+lost.toLocaleString('pt-BR')+' sócios cancelam.');G.board.conf=clamp(G.board.conf-3,0,100)}
  else if(ex_.active&&c.humor>=55){ex_.active=false;addNews('A torcida do '+c.name+' voltou a lotar o estádio.')}
  ex_.hist.push(Math.round(c.humor));ex_.hist=ex_.hist.slice(-20);
  /* viral */
  if(win&&Math.random()<.12){const f=Math.round(folTotal(mk)*.01*100)/100;for(const k in mk.social.fol)mk.social.fol[k]=+(mk.social.fol[k]*1.012).toFixed(3);addNews('Viralizou! Post do '+c.name+' bomba nas redes (+'+f+' mi seguidores).')}
  /* revelação na base */
  if(Math.random()<.025+baseIdx(c)/2500){const y=mkYouth();genYouth9(c,0);c.youth.push(y);{const ix_=baseIdx(c);y.stars=ix_>=65?Math.max(y.stars,4):ix_>=45?Math.max(y.stars,3):(Math.random()<.05?4:Math.max(y.stars,2));y._b=1}if(c.youth.length>24)c.youth.shift();addNews('Revelação na base do '+c.name+': '+y.name+' ('+y.stars+'★) chama a atenção.')}
  simSub20();
  save();
}
/* venda de ídolo irrita a torcida; formador ganha bônus */
const _sp9=sellPlayer;sellPlayer=function(oid){
  ex();const of_=G.offers.find(x=>x.id===oid),id=of_?of_.pid:-1;const p=P(id),c=userClub();const fv=p?favOf(p):0,fb=p&&p.fromBase;const val=p?valueOf(p):0;
  const r=_sp9(oid);
  if(!r&&p&&c.id===G.user){
    if(fv>=72){G.mk.soc.n=G.mk.soc.n.map(n=>Math.round(n*.95));addNews('Torcida lamenta a saída de '+nameOf(p)+': sócios cancelam planos.')}
    if(fb){const b=+(val*.2).toFixed(2);G.fin.caixa=+(G.fin.caixa+b).toFixed(2);addNews('Bônus de formação: '+mi(b)+' pela venda de cria da base.')}
  }
  return r;
};

/* capacidade é em pessoas (corrige a escala antiga) */
stadSectors=function(c){const t=c.cap;return {Geral:Math.round(t*.15),Arquibancada:Math.round(t*.6),Cadeira:Math.round(t*.22),Camarote:Math.round(t*.03)}};
expandCost=function(c){return +(1.5+c.cap/1000*0.12).toFixed(1)};
expandStadium=function(){const c=userClub();ex();if(c.cap>=90000)return 'Capacidade máxima da demo (90 mil).';const k=expandCost(c);if(G.fin.caixa<k)return 'Caixa insuficiente ('+mi(k)+').';G.fin.caixa=+(G.fin.caixa-k).toFixed(2);c.cap+=2000;G.board.conf=clamp(G.board.conf+1,0,100);c.humor=clamp(c.humor+2,5,100);addNews('Obras: estádio do '+c.name+' ganha 2 mil lugares.');return null};

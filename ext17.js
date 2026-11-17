/* ext17: Fase 4 — nível das bases (pesquisa), janelas, negociação, valor, salário/contrato, comissão técnica, mercado da IA */

/* ---------- nível das bases: ranking CIES 2025 (formadores), títulos da Copinha e tradição ---------- */
const BASELV={SAN:95,SAO:94,FLU:86,FLA:84,PAL:82,COR:78,GRE:75,INT:75,CRU:72,CAP:70,CAM:66,VAS:62,RBB:62,BAH:58,BOT:52,VIT:46,CFC:44,MIR:38,CHA:36,REM:28};
const BASELVN=[['Portuguesa',58],['Ponte Preta',58],['Guarani',52],['Juventus',48],['América-MG',52],['Figueirense',46],['Paulista',40],['Santo André',44],['Marília',36],['Nacional',44]];
const BASEWHY={SAN:'Meninos da Vila: Pelé, Robinho, Neymar, Rodrygo',SAO:'Cotia: Kaká, Casemiro, Lucas Moura, Oscar',FLU:'Xerém: Marcelo, Gerson, Kayky',FLA:'Ninho do Urubu: Zico, Adriano, Vini Jr., Paquetá',PAL:'Academia: Gabriel Jesus, Endrick, Estevão',COR:'14ª base do mundo no CIES, 57 formados no exterior',GRE:'Ronaldinho Gaúcho, Lucas Leiva, Douglas Costa',INT:'Beira-Rio: Alexandre Pato e uma linha de revelações',CRU:'Toca da Raposa, 7º em formados no exterior',CAP:'CT do Caju, 10º em formados no exterior',CAM:'Cidade do Galo: Bernard e outras revelações',VAS:'Tradição de base em São Januário',RBB:'Projeto de formação e venda ao exterior'};
function baseStart(x){
  if(BASELV[x.sig]!==undefined)return BASELV[x.sig];
  const n=BASELVN.find(([k])=>x.name.indexOf(k)>=0);if(n)return n[1];
  return clamp(Math.round((cdOf(x).b-28)/48*100)*0.8,5,60);
}
const baseLv=c=>clamp(Math.ceil(baseIdx(c)/10),1,10);

/* ---------- janelas de transferência ---------- */
const WINS=[[0,5,'Janela de pré-temporada'],[19,23,'Janela do meio do ano']];
function winOpen(){if(!G)return true;return G.round>=NR()||WINS.some(([a,b])=>G.round>=a&&G.round<=b)}
function winInfo(){
  if(G.round>=NR())return {open:true,left:99,txt:'Janela de fim de temporada aberta'};
  for(const [a,b,n] of WINS)if(G.round>=a&&G.round<=b)return {open:true,left:b-G.round+1,txt:n+' aberta · fecha em '+(b-G.round+1)+' rodada(s)'};
  const nx=WINS.find(([a])=>a>G.round);return {open:false,left:nx?nx[0]-G.round:NR()-G.round,txt:'Janela fechada · '+(nx?'abre em '+(nx[0]-G.round)+' rodada(s)':'abre ao fim da temporada')};
}
const CLOSED='Janela fechada. Só dá para contratar jogador livre agora.';
const _go17=genOffer;genOffer=function(){if(!winOpen())return;return _go17()};
const _so17w=sellPlayer;sellPlayer=function(id){if(!winOpen())return CLOSED;const o=G.offers.find(q=>q.id===id);const r=_so17w(id);if(!r&&o){const p=P(o.pid),ag=+(o.fee*agentPct(p)*.8).toFixed(2);G.fin.caixa=+(G.fin.caixa-ag).toFixed(2);addNews('O empresário de '+lastName(p.name)+' levou '+mi(ag)+' da venda.')}return r};
if(typeof loanIn==='function'){const _li=loanIn;loanIn=function(pid){if(!winOpen())return CLOSED;return _li(pid)};const _lo=loanOut;loanOut=function(pid,i){if(!winOpen())return CLOSED;return _lo(pid,i)}}

/* ---------- valor de mercado: potencial pesa nos jovens ---------- */
const _vo17=valueOf;valueOf=function(p){
  let v=_vo17(p);
  if(p.age<=23&&p.pot>p.ovr)v*=Math.min(1.8,1+0.03*(p.pot-p.ovr));
  if(p.role==='GOL')v*=.85;else if(p.role==='ATA')v*=1.1;
  return +v.toFixed(2);
};

/* ---------- salário e contrato ---------- */
const _so17=salOf;salOf=function(p){return (p.wage!==undefined&&G&&p.club===G.user)?p.wage:_so17(p)};
const payroll=c=>c.squad.reduce((s,id)=>s+salOf(P(id)),0);
function wageBudget(){const c=userClub();if(G.wb===undefined)G.wb=+(payroll(c)*1.1).toFixed(2);return G.wb}
const wageFair=p=>+(_so17(p)).toFixed(2);
function wageAsk(p){const c=userClub();const f=clamp(1.12+(p.ovr-c.rep)/70-(c.humor-50)/300+(p.id%7)/60,.95,1.6);return +(wageFair(p)*f).toFixed(2)}

/* ---------- negociação ---------- */
function resvOf(p){
  const c=userClub(),seller=C(p.club);const wi=G.round>=19?1:0;
  const h=((p.id*2654435761+G.season*97+wi*13)>>>0)%1000/1000;
  let r=askPrice(p)*(0.9+0.15*h);
  const rank=seller.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr).findIndex(x=>x.id===p.id);
  if(rank<2&&seller.rep>c.rep+3)r*=1.5;          // estrela de clube maior: pedem muito
  return +r.toFixed(2);
}
const agentPct=p=>+clamp(.05+((p.id*37)%8)/100+(p.ovr>=75?.02:0),.05,.14).toFixed(3);
function negStart(pid){const p=P(pid);if(!winOpen())return CLOSED;if(G.nlock&&G.nlock[pid]>G.round)return C(p.club).name+' encerrou as conversas por enquanto.';
  S.neg={pid,stage:'fee',fee:+(askPrice(p)*1.0).toFixed(1),tries:0,msg:'',wage:0,ex:0};S.modal={t:'neg'};return null}
function negFee(){
  const n=S.neg,p=P(n.pid),c=userClub();const res=resvOf(p),fee=n.fee;
  if(c.squad.length>=30){n.msg='Elenco cheio (máximo 30).';return}
  if(G.fin.caixa<fee){n.msg='Caixa insuficiente.';return}
  if(fee>=res){n.stage='wage';n.wage=wageAsk(p);n.ex=0;n.msg=C(p.club).name+' aceita o valor. Agora falta o jogador.';return}
  n.tries++;
  if(fee>=res*.82&&n.tries<=3){n.ask=+(res*1.02).toFixed(1);n.msg=C(p.club).name+' pede '+mi(n.ask)+'. Rodada '+n.tries+' de 3.';n.fee=n.ask;return}
  G.nlock=G.nlock||{};G.nlock[n.pid]=G.round+4;S.modal=null;S.neg=null;toast(C(p.club).name+' recusou e encerrou as conversas por 4 rodadas.');
}
function negWage(){
  const n=S.neg,p=P(n.pid),c=userClub();const seller=C(p.club);
  const lu=+(wageFair(p)*.5).toFixed(2),ag=+(n.fee*agentPct(p)).toFixed(2);
  if(G.fin.caixa<n.fee+lu+ag){n.msg='Caixa não cobre luva e comissão do empresário ('+mi(lu+ag)+').';return}
  const bud=wageBudget(),pay=payroll(c)+n.wage;
  if(pay>bud*(1+(G.board.conf-50)/250)){n.msg='A diretoria barrou: a folha passaria do teto de '+mi(bud)+'.';return}
  const ch=clamp(.62+(c.rep-seller.rep)/22+(c.humor-50)/250+(p.age>=30?.1:0)+n.ex*.25,.12,.97);
  if(Math.random()>ch){G.nlock=G.nlock||{};G.nlock[n.pid]=G.round+4;S.modal=null;S.neg=null;toast(p.name+' não quis o projeto. Conversas travadas por 4 rodadas.');return}
  G._force=true;const r=makeBid(n.pid,n.fee);G._force=false;
  if(r.ok){p.wage=n.wage;G.fin.caixa=+(G.fin.caixa-lu-ag).toFixed(2);S.modal=null;S.neg=null;S.prof=null;toast(lastName(p.name)+' assinou: '+mi(n.wage)+'/ano, luvas '+mi(lu)+' e empresário levou '+mi(ag)+'.')}
  else{S.modal=null;S.neg=null;toast(r.msg)}
}
const _mb17=makeBid;makeBid=function(pid,fee){if(G._force)return _mb17(pid,fee);if(!winOpen())return {ok:false,msg:CLOSED};return _mb17(pid,fee)};

/* aumento pedido por jogador que evoluiu */
function wageTick(){
  const c=userClub();G.raises=(G.raises||[]).filter(r=>P(r.pid)&&P(r.pid).club===G.user);
  for(const r of G.raises){if(G.round-r.r>=6&&!r.done){r.done=1;const p=P(r.pid);const q=pers(p);q.pm=clamp(q.pm-8,0,100);p.mor=clamp(p.mor-5,30,100);addNews(lastName(p.name)+' ficou chateado: ninguém respondeu ao pedido de aumento.')}}
  G.raises=G.raises.filter(r=>!r.done);
  if(G.round%4!==1||G.raises.length>=3)return;
  const top=c.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr).slice(0,16);
  for(const p of top){if(p.wage===undefined||G.raises.some(r=>r.pid===p.id))continue;
    if(wageFair(p)*(G.salMult||1)>p.wage*1.3){G.raises.push({pid:p.id,ask:+(wageFair(p)*(G.salMult||1)*1.05).toFixed(2),r:G.round});addNews(lastName(p.name)+' evoluiu e pede aumento de salário.');break}}
}

/* ---------- comissão técnica ---------- */
const STAFF17={pf:['Preparador físico','🏃','Mais energia por rodada e lesões saem mais rápido'],ana:['Analista de desempenho','📊','Lê o adversário: pequeno ganho de força nos jogos'],gk:['Preparador de goleiros','🧤','Goleiros evoluem mais e envelhecem melhor'],chs:['Chefe de scouting','🔭','Relatórios mais certeiros sobre potencial dos jogadores']};
function stBox(){if(!G.st17)G.st17={pf:null,ana:null,gk:null,chs:null,pool:{},ps:''};return G.st17}
const stQ=r=>{const s=stBox()[r];return s?s.q:0};
const stCost=()=>Object.values(stBox()).reduce((s,x)=>s+(x&&x.sal?x.sal:0),0);
function stPool(){
  const b=stBox();const key=G.season+'-'+(G.round>=19?1:0)+'-'+G.user;if(b.ps===key)return b.pool;
  const c=userClub();b.pool={};
  for(const r in STAFF17)b.pool[r]=[1,2,3].map(()=>{const q=Math.min(5,1+Math.floor(Math.random()*Math.random()*5.3+Math.random()*.9));return {name:pick(FN)+' '+pick(LN),q,sal:+(scaleOf(c)/120*(.12+q*.10)).toFixed(2)}});
  b.ps=key;return b.pool;
}
function stHire(r,i){const b=stBox(),s=stPool()[r][i];if(!s)return 'Candidato indisponível.';
  const fee=+(s.sal*.4).toFixed(2);if(G.fin.caixa<fee)return 'Caixa não cobre a multa de rescisão do outro clube ('+mi(fee)+').';
  if(b[r])G.fin.caixa=+(G.fin.caixa-b[r].sal*.5).toFixed(2);
  G.fin.caixa=+(G.fin.caixa-fee).toFixed(2);b[r]=s;stPool()[r].splice(i,1);return null}
function stFire(r){const b=stBox();if(!b[r])return;G.fin.caixa=+(G.fin.caixa-b[r].sal*.5).toFixed(2);b[r]=null}
potTxt=function(p){
  const l=Math.min(5,scoutLvl()+(stQ('chs')>=3?1:0));if(!l)return '?';if(l>=4)return p.pot;const d=l>=2?4:7;const lo=Math.round(p.pot-d+(p.id%3)-1);return lo+'–'+(lo+2*d)};
const _pw17=power;power=function(m,s){let v=_pw17(m,s);try{if(s&&s.club&&s.club.id===G.user){const f=1+.0025*stQ('ana')+.0010*stQ('gk');v={gk:v.gk*f,atk:v.atk*f,def:v.def*f,mid:v.mid*f}}}catch(e){}return v};

/* ---------- mercado da IA ---------- */
function aiWindow(){
  if(!winOpen()||G.round>=NR())return;
  const n=Math.random()<.55?(Math.random()<.4?2:1):0;
  for(let k=0;k<n;k++){
    const buyers=G.clubs.filter(c=>c.id!==G.user&&c.squad.length<29&&c.rep>=60);
    if(!buyers.length)return;
    const b=pick(buyers);
    const sellers=G.clubs.filter(c=>c.id!==G.user&&c.id!==b.id&&c.rep<b.rep+1&&c.squad.length>22);
    if(!sellers.length)continue;
    const s=pick(sellers);
    const bs=b.squad.map(id=>P(id)).sort((x,y)=>y.ovr-x.ovr);const gate=bs[Math.min(9,bs.length-1)].ovr;
    const cand=s.squad.map(id=>P(id)).filter(p=>!p.loan&&p.ovr>=gate+1&&p.ovr<=bs[2].ovr+2);
    if(!cand.length)continue;
    const p=pick(cand),fee=+(valueOf(p)*rnd(.9,1.3)).toFixed(1);
    s.squad=s.squad.filter(id=>id!==p.id);b.squad.push(p.id);p.club=b.id;p.listed=false;delete p.wage;
    refill(s);
    if(b.squad.length>=29){const w=b.squad.map(id=>P(id)).sort((x,y)=>x.ovr-y.ovr)[0];b.squad=b.squad.filter(id=>id!==w.id);w.club=-1;G.free.push(w.id)}
    if(fee>=8||p.ovr>=76||s.div===userClub().div||b.div===userClub().div)addNews('Mercado: '+nameOf(p)+' deixa o '+s.name+' e vai para o '+b.name+' por '+mi(fee)+'.');
  }
}
const _fr17=finishRound;finishRound=function(){
  const out=_fr17.apply(this,arguments);
  try{
    const c=userClub();
    G.fin.caixa=+(G.fin.caixa-stCost()/38).toFixed(2);
    const q=stQ('pf');
    if(q){for(const id of c.squad){const p=P(id);p.en=clamp(p.en+q*.9,0,100);if(q>=3&&p.inj>0&&Math.random()<.35)p.inj--}}
    wageTick();aiWindow();
    const wi=winInfo();const was=G._wo;if(was!==wi.open&&wi.open&&G.round<NR())addNews('A janela de transferências abriu.');if(was!==wi.open&&!wi.open)addNews('A janela de transferências fechou.');G._wo=wi.open;
  }catch(e){console.error('ext17 '+e.message)}
  return out;
};
const _ns17=newSeason;newSeason=function(){
  const r=_ns17();
  try{const c=userClub();
    const k=1.02+(G.board.conf-50)/1000+(posOf(c)<=3?.05:0);G.wb=+(wageBudget()*k).toFixed(2);
    const gk=stQ('gk');for(const id of c.squad){const p=P(id);if(p.role==='GOL'&&gk&&Math.random()<gk*.1&&p.ovr<p.pot+3)p.ovr=Math.min(92,p.ovr+1)}
    stPool();
  }catch(e){}
  return r;
};
const _sc17=startCareer;startCareer=function(){_sc17.apply(this,arguments);G.wb=undefined;G.st17=null;G.raises=[];G.nlock={};G._wo=undefined;save()};
const _tj17=takeJob;takeJob=function(){const r=_tj17.apply(this,arguments);G.wb=undefined;G.st17=null;G.raises=[];G.nlock={};return r};
Object.assign(A,{
  negclose(){S.modal=null;S.neg=null;render()},
 negfee(){negFee();render()},
 negbump(d){const n=S.neg;n.fee=+(n.fee*(1+(+d.p)/100)).toFixed(1);render()},
 negwage(){negWage();save();render()},
 negup(){const n=S.neg;n.wage=+(n.wage*1.15).toFixed(2);n.ex++;n.msg='Você ofereceu mais salário: o jogador ficou mais animado.';render()},
 sthire(d){const r=stHire(d.r,+d.i);save();toast(r||'Contratado!')},
 stfire(d){stFire(d.r);save();render()},
 raiseyes(d){const r=(G.raises||[]).find(x=>x.pid===+d.id);if(!r)return;const p=P(r.pid);
   if(payroll(userClub())-salOf(p)+r.ask>wageBudget()*1.05){toast('A diretoria barrou: folha acima do teto.');return}
   p.wage=r.ask;G.raises=G.raises.filter(x=>x!==r);pers(p).pm=clamp(pers(p).pm+10,0,100);save();toast(lastName(p.name)+' renovou com aumento.')},
 raiseno(d){const r=(G.raises||[]).find(x=>x.pid===+d.id);if(!r)return;const p=P(r.pid);pers(p).pm=clamp(pers(p).pm-5,0,100);G.raises=G.raises.filter(x=>x!==r);save();toast(lastName(p.name)+' não gostou da resposta.')}
});
const _pl17=paperLine;paperLine=function(h,sub){return _pl17(typeof h==='string'?h.replace(/Técnico Técnico/g,'Técnico'):h,sub)};

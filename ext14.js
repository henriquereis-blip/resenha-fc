/* ext14: TV estilo Premier League, custo de clube grande, camisas (casa/fora/reserva/terceira), dado com chance visível */

/* ============ DINHEIRO: TV por mérito + torcida, custo da estrutura ============ */
// 50% igual para todos, 25% por colocação no ano anterior, 25% pelo tamanho da torcida (como na Premier League)
function tvIncome(c){
  const L=G.clubs.filter(x=>x.div===c.div),N=L.length;let pool=0,fsum=0;
  for(const x of L){pool+=x.tv;fsum+=cdOf(x).f}
  const pos=c.lastPos||rankByStrength(c);
  const wp=(N-pos+1)/(N*(N+1)/2),wf=cdOf(c).f/(fsum||1);
  return pool*(0.5/N+0.25*wp+0.25*wf);
}
const overheadRate=c=>0.06+0.012*Math.max(0,c.rep-60);        // folha administrativa, CT, base, segurança, viagens
const salPrem=c=>Math.max(0,c.rep-68)*0.012;                   // craque cobra mais para jogar em clube grande
function structCost(c){const pay=c.squad.reduce((s,id)=>s+salOf(P(id)),0);return (c.tv+c.spBase)*overheadRate(c)+pay*salPrem(c)}
hookAround('financeRound','fin14',function(next,__a){let [m]=__a;
  next(m);const c=userClub(),f=G.fin;
  const d=(tvIncome(c)-c.tv)/38-structCost(c)/38;
  f.caixa=+(f.caixa+d).toFixed(2);
  if(f.last){f.last.tv=+(tvIncome(c)/38).toFixed(2);f.last.mant=+(f.last.mant+structCost(c)/38).toFixed(2);f.last.net=+(f.last.net+d).toFixed(2)}
});
hookAround('aiFinance','ai14',function(next,__a){
  const before={};for(const c of G.clubs)if(c.id!==G.user)before[c.id]=c.caixa;
  next();
  for(const c of G.clubs){if(c.id===G.user)continue;c.caixa=+(c.caixa+((tvIncome(c)-c.tv)*1.3-structCost(c))/38).toFixed(2)}
});
hookBefore('newSeason','ext14_ns14',function(){
  for(const d of [0,1,2,3]){tableRows(d).forEach((c,i)=>{c.lastPos=i+1})}
  });

/* ============ CAMISAS ============ */
function lumOf(h){const m=/^#?([0-9a-f]{6})$/i.exec(h||'');if(!m)return .5;const n=parseInt(m[1],16);return (0.299*(n>>16)+0.587*((n>>8)&255)+0.114*(n&255))/255}
function rgbOf(h){const n=parseInt((h||'#888888').replace('#','').slice(0,6),16);return [n>>16,(n>>8)&255,n&255]}
function colDist(a,b){const x=rgbOf(a),y=rgbOf(b);return Math.hypot(x[0]-y[0],x[1]-y[1],x[2]-y[2])}
function kitOf(c,kind){
  if(kind==='res')return {a:'#cfd5da',b:'#9aa4ac',d:'#9aa4ac',pat:'plain'};
  if(kind==='home'||!kind)return {a:c.c1,b:c.c2,d:c.c3,pat:c.pat||'plain'};
  const away=()=>{const dark=lumOf(c.c1)<.5;return {a:dark?'#f2f2f2':'#1b2028',b:c.c1,d:c.c2,pat:'plain'}};
  if(kind==='third'){const k=c.id===G.user&&G.kit3&&G.kit3.cur;return k?{a:k.a,b:k.b,d:k.b,pat:k.pat}:away()}
  return away();
}
function matchKind(hc,ac,side){ // time visitante usa a camisa 2 se as cores batem
  if(side==='h')return 'home';
  return colDist(kitOf(hc,'home').a,kitOf(ac,'home').a)<110?'away':'home';
}
/* terceira camisa: uma por temporada, resultado de sucesso ou fracasso */
const K3_COLS=[['#0f172a','#38bdf8','Noite'],['#7c1d1d','#fbbf24','Grená'],['#14532d','#fde047','Mata'],['#f8fafc','#0f172a','Gelo'],['#6d28d9','#fde68a','Roxa'],['#f97316','#111827','Laranja'],['#111827','#e5e7eb','Grafite'],['#0ea5e9','#ffffff','Céu']];
const K3_PAT=[['plain','Lisa'],['v','Listras'],['h','Faixas'],['half','Metade']];
const K3_CON=[['retro','Retrô','Referência ao passado. Funciona melhor em clube de tradição.'],['ousada','Ousada','Aposta alta: pode bombar ou virar piada.'],['mini','Minimalista','Segura, resultado mais previsível.'],['home','Homenagem','Ídolos e história. Torcida costuma abraçar.']];
function kit3Cost(c){return +(scaleOf(c)*.012).toFixed(2)}
function kit3Make(opt){
  const c=userClub(),B=G.kit3||(G.kit3={season:-1,cur:null,hist:[],done:true});
  if(B.season===G.season)return toast('Só dá pra lançar uma terceira camisa por temporada.');
  const cost=opt.re?+(kit3Cost(c)*.5).toFixed(2):kit3Cost(c);
  if(G.fin.caixa<cost)return toast('Caixa insuficiente ('+mi(cost)+').');
  G.fin.caixa=+(G.fin.caixa-cost).toFixed(2);
  B.season=G.season;B.done=false;B.rd=G.round;
  B.cur={a:opt.a,b:opt.b,pat:opt.pat,name:opt.name,con:opt.con,src:opt.src||'custom'};
  let p=.38+(opt.con==='retro'||opt.con==='home'?c.trad/100*.28:0)+(opt.con==='mini'?.12:0)+(opt.con==='ousada'?.04:0)
        +(colDist(opt.a,c.c1)>130?.08:-.04)+(opt.src==='diretor'?.1:opt.src==='patro'?.05:0)+(opt.re&&opt.pastOk?.2:0)+0.03*(G.mgr?mgd('mid'):0);
  B.p=clamp(p,.12,.88);
  B.ok=Math.random()<B.p;B.mult=B.ok?rnd(1.15,1.7):rnd(.5,.95);
  save();toast('Terceira camisa lançada. O mercado responde nas próximas rodadas.');
}
function kit3Tick(){
  const B=G.kit3;if(!B||B.done||G.round<B.rd+5)return;
  B.done=true;const c=userClub(),gain=+(scaleOf(c)*(B.mult-1)*.05).toFixed(2);
  G.fin.caixa=+(G.fin.caixa+gain).toFixed(2);c.humor=clamp(c.humor+(B.ok?3:-2),5,100);
  B.hist.unshift({s:G.season,name:B.cur.name,a:B.cur.a,b:B.cur.b,pat:B.cur.pat,ok:B.ok,gain});B.hist=B.hist.slice(0,6);
  paperLine(B.ok?'Terceira camisa do '+c.name+' vira febre':'Terceira camisa do '+c.name+' não emplaca',B.ok?'Lojas vendem acima do esperado e rendem '+mi(gain)+'.':'Torcida reclama do desenho e a venda fica abaixo do esperado ('+mi(gain)+').');
  addNews(B.ok?'3ª camisa: sucesso de vendas ('+mi(gain)+').':'3ª camisa: fracasso de vendas ('+mi(gain)+').');
}
hookAfter('finishRound','ext14_fr14',()=>{kit3Tick()});
Object.assign(A,{
 k3col(d){S.k3=S.k3||{};S.k3.col=+d.i;render()},k3pat(d){S.k3=S.k3||{};S.k3.pat=d.p;render()},k3con(d){S.k3=S.k3||{};S.k3.con=d.c;render()},
 k3go(){const k=Object.assign({col:0,pat:'plain',con:'mini'},S.k3||{});const c=K3_COLS[k.col];kit3Make({a:c[0],b:c[1],pat:k.pat,con:k.con,name:'3ª '+c[2]+' '+G.season})},
 k3dir(){const c=userClub();kit3Make({a:lumOf(c.c1)<.5?'#f5f0e1':c.c2!==c.c1?c.c2:'#111827',b:c.c1,pat:'plain',con:'home',name:'Sugestão do diretor '+G.season,src:'diretor'})},
 k3patro(){const c=userClub();kit3Make({a:pick(['#0b1020','#16a34a','#f59e0b','#06b6d4']),b:'#ffffff',pat:pick(['v','h','half']),con:'ousada',name:'Sugestão do patrocinador '+G.season,src:'patro'})},
 k3re(d){const B=G.kit3,h=B&&B.hist[+d.i];if(!h)return;kit3Make({a:h.a,b:h.b,pat:h.pat,con:'retro',name:'Reedição '+h.name,re:1,pastOk:h.ok})}
});

/* ============ DADO: chance visível antes de tentar ============ */
function rollInfo(dc,bonus){const need=clamp(dc-bonus,2,20);const pct=clamp(Math.round((21-need)/20*100),5,95);
  const lab=pct>=75?'Fácil':pct>=50?'Média':pct>=30?'Difícil':'Muito difícil';return {need,pct,lab}}
const rollTxt=r=>`precisa ${r.need}+ no d20 · ${r.pct}% · ${r.lab}`;
function confDC(x){return 11+(P(x.a).pg<0?2:0)+(x.sev-1)}
hookAround('startCareer','sc14',function(next,__a){let [id,coach,phil,asst]=__a;next(id,coach,phil,asst);G.kit3={season:-1,cur:null,hist:[],done:true};save()});
hookAround('takeJob','tj14',function(next,__a){const r=next();try{G.kit3={season:-1,cur:null,hist:[],done:true}}catch(e){}return r});

/* caixa alto vira inflação salarial: elenco, agentes e diretoria cobram mais quando o clube está rico */
hookBefore('newSeason','ext14_ns14b',function(){
  try{const c=userClub(),sc=scaleOf(c);
    const ex=G.fin.caixa-sc*.3;
    if(ex>0){const pay=Math.min(c.debt||0,ex*.6);const obras=+(ex*(pay>0?.3:.55)).toFixed(1);
      c.debt=+Math.max(0,(c.debt||0)-pay).toFixed(1);G.fin.caixa=+(G.fin.caixa-pay-obras).toFixed(1);
      addNews('Diretoria usa o excesso de caixa: '+mi(pay)+' para abater dívida e '+mi(obras)+' em obras, bicho e reformas.')}
  }catch(e){}
  try{const c=userClub(),sc=scaleOf(c),r=G.fin.caixa/sc;
    if(r>.18){G.salMult=+((G.salMult||1)*(1+Math.min(.3,(r-.18)*.3))).toFixed(3);addNews('Elenco e empresários pedem reajuste: a folha sobe com o caixa cheio.')}
    else if(r<.15&&(G.salMult||1)>1)G.salMult=+Math.max(1,(G.salMult||1)*.96).toFixed(3)}catch(e){}
  });

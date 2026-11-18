/* ext10: técnico RPG (atributos que mexem no jogo), empréstimos e mercado mais cheio */
const MGA=[['tat','Tática','🧠'],['mot','Motivação','🔥'],['tre','Treino','🏋️'],['bas','Base','🌱'],['fin','Finanças','💼'],['mer','Mercado','🤝'],['mid','Mídia','🎤']];
const MGP={
 mago:{n:'Mago tático',e:'🧙',d:'Lê o jogo melhor que ninguém. Time mais letal e tática que muda o jogo.',a:{tat:8,mot:3,tre:4,bas:3,fin:3,mer:4,mid:5}},
 lutador:{n:'Lutador',e:'🥊',d:'Time que não desiste. Vira jogo nos minutos finais e quase não cansa.',a:{tat:4,mot:8,tre:4,bas:3,fin:3,mer:3,mid:5}},
 professor:{n:'Professor',e:'👨‍🏫',d:'Faz o elenco evoluir no treino e se recuperar rápido de lesão.',a:{tat:5,mot:4,tre:8,bas:4,fin:3,mer:3,mid:3}},
 formador:{n:'Formador',e:'🌱',d:'Transforma garoto em craque. A base dele vira fábrica.',a:{tat:3,mot:4,tre:5,bas:8,fin:3,mer:4,mid:3}},
 gestor:{n:'Gestor',e:'💼',d:'Faz o clube render: mais receita, folha menor e orçamento esticado.',a:{tat:3,mot:3,tre:3,bas:3,fin:8,mer:6,mid:4}},
 boleiro:{n:'Mercador',e:'🤝',d:'Negocia como ninguém: compra barato, vende caro, empréstimo na mão.',a:{tat:4,mot:3,tre:3,bas:4,fin:5,mer:8,mid:3}},
 midiatico:{n:'Midiático',e:'🎤',d:'A torcida o ama. Mais humor, patrocínio e seguidores.',a:{tat:3,mot:5,tre:3,bas:3,fin:4,mer:4,mid:8}},
 equil:{n:'Equilibrado',e:'⚖️',d:'Sem pontos fortes nem fracos. Sobram 2 pontos para você escolher.',a:{tat:4,mot:4,tre:4,bas:4,fin:4,mer:4,mid:4}}
};
const MGMAX0=8,MGPOOL0=30;
const mgSum=a=>Object.values(a).reduce((s,x)=>s+x,0);
function mgNew(p){const k=p||'equil';return {k,a:Object.assign({},MGP[k].a)}}
function mgrOf(){if(G&&!G.mgr){G.mgr={a:Object.assign({},MGP.equil.a),xp:0,lvl:1,pts:2,log:[]}}return G.mgr}
const mgv=k=>{const m=G&&G.mgr;return m?m.a[k]:4};
const mgd=k=>mgv(k)-4; // desvio vs neutro
function mgTitle(a){
  const e=Object.entries(a).sort((x,y)=>y[1]-x[1]);
  if(e[0][1]-e[2][1]<=1)return 'Técnico equilibrado';
  const map={tat:'Mago tático',mot:'Lutador',tre:'Professor',bas:'Formador',fin:'Gestor',mer:'Mercador',mid:'Midiático'};
  return map[e[0][0]]+(e[1][1]>=e[0][1]-1?' · '+map[e[1][0]]:'');
}
const dec1=n=>(Math.round(n*10)/10).toString().replace('.',',');
const MGFX={
 tat:v=>`${v>=4?'+':''}${dec1(1.6*(v-4))}% de gols do seu time e ${dec1(-1.2*(v-4))}% de gols do rival em todo jogo`,
 mot:v=>`${dec1(5*(v-4))}% menos desgaste físico · virada: ${dec1(2*(v-4))}% mais pressão quando perde após os 60' · moral do elenco ${v>=5?'sobe':'cai'} a cada rodada`,
 tre:v=>`treino ${dec1(12*(v-4))}% mais forte · ${v>=5?dec1(8*(v-4))+'% de chance por jogador de evoluir +1 no fim da temporada · ':''}lesões somem mais ${v>=5?'rápido':'devagar'}`,
 bas:v=>`índice da base ${v>=4?'+':''}${3*(v-4)} · garotos evoluem ${v>=5?'mais rápido':'mais devagar'}`,
 fin:v=>`contratos de TV/patrocínio ${dec1(2*(v-4))}% · folha ${dec1(-2*(v-4))}% · orçamento ${dec1(4*(v-4))}% · vendas rendem ${dec1(3*(v-4))}%`,
 mer:v=>`propostas aceitas com ${dec1(2*(v-4))}% a menos · empréstimos mais baratos · ${v>=7?'vê o potencial exato de todo jogador':'potencial aparece borrado'}`,
 mid:v=>`humor da torcida ${v>=5?'sobe':'cai'} a cada rodada · patrocínios ${dec1(3*(v-4))}% · redes crescem ${dec1(15*(v-4))}% mais rápido`
};
const mgXpNeed=l=>80+40*l;
function mgXp(n,why){
  const m=mgrOf();m.xp+=n;
  while(m.xp>=mgXpNeed(m.lvl)&&m.lvl<12){m.xp-=mgXpNeed(m.lvl);m.lvl++;m.pts++;addNews('Seu técnico subiu para o nível '+m.lvl+': +1 ponto de atributo disponível.')}
}
/* ---- criação ---- */
const _sc10=startCareer;startCareer=function(id,coach,phil,asst){
  _sc10(id,coach,phil,asst);
  const s=S.mg||mgNew('equil');
  G.mgr={a:Object.assign({},s.a),xp:0,lvl:1,pts:Math.max(0,MGPOOL0-mgSum(s.a)),log:[]};
  save();
};
/* ---- partida ---- */
mgrMatch=function(m,k){
  const S_=m[k];if(!S_.club||!G.mgr)return 1;
  if(S_.club.id!==G.user){const O=m[k==='h'?'a':'h'];return O.club&&O.club.id===G.user?1-.012*mgd('tat'):1}
  let f=1+.016*mgd('tat');
  const trailing=(k==='h'?m.hg<m.ag:m.ag<m.hg);
  if(trailing&&m.min>=60)f*=1+.02*mgd('mot');
  return f;
};
mgrDrain=function(s){return s.club&&s.club.id===G.user&&G.mgr?clamp(1-.05*mgd('mot'),.5,1.3):1};
/* ---- treino / lesão / moral / torcida / dinheiro por rodada ---- */
const _tr10=train;train=function(){
  _tr10();const c=userClub();if(!G.mgr)return;
  const d=mgd('tre');
  for(const id of c.squad){const p=P(id);if(p.inj>0)continue;p.fit[c.phil]=clamp(+(p.fit[c.phil]+d*.15*(p.age<26?1.2:.8)).toFixed(1),5,100)}
};
hookAfter('finishRound','ext10_fr10',function(out,A){
  try{
    ex();const c=userClub();if(!G.mgr||!c)return out;
    const l=G.fin.last;
    /* xp pela partida */
    const lr=G.myres[G.myres.length-1];
    if(lr){const w=(lr.h===G.user&&lr.hg>lr.ag)||(lr.a===G.user&&lr.ag>lr.hg),dd=lr.hg===lr.ag;mgXp(w?10:dd?4:1)}
    /* lesão: professor cura mais rápido, treino fraco demora */
    const dt=mgd('tre'),dm=mgd('mot'),dmi=mgd('mid');
    for(const id of c.squad){const p=P(id);if(p.inj>0&&Math.random()<Math.abs(dt)*.05){p.inj+=dt>0?-1:1;if(p.inj<0)p.inj=0}
      p.mor=clamp(p.mor+dm*.35,20,100)}
    c.humor=clamp(c.humor+dmi*.2+dm*.05,5,100);
    /* finanças: contratos de TV e patrocínio melhor negociados, folha enxuta */
    if(l){const df=mgd('fin');G.fin.caixa=+(G.fin.caixa+(l.tv+l.sp+(l.bonus||0))*.02*df+l.sal*.02*df).toFixed(2)}
    /* redes crescem mais rápido com mídia alta */
    if(G.mk&&l){const a_=G.mk.acc;a_.sal=(a_.sal||0)+l.sal;a_.mant=(a_.mant||0)+l.mant;G.mk.cash=G.mk.cash||[];G.mk.cash.push(+G.fin.caixa.toFixed(2));if(G.mk.cash.length>80)G.mk.cash.shift()}
    if(G.mk&&dmi)for(const k in G.mk.social.fol)G.mk.social.fol[k]=+(G.mk.social.fol[k]*(1+.0015*dmi)).toFixed(3);
  }catch(e){console.error('mgr tick',e)}
  });
const _ge10=genOffer;genOffer=function(){
  const n=G.offers.length;_ge10();
  if(G.offers.length>n&&G.mgr){const o=G.offers[G.offers.length-1];o.fee=+(o.fee*(1+.03*mgd('fin')+.015*mgd('mer'))).toFixed(1)}
};
const _mb10=makeBid;makeBid=function(pid,fee){
  if(!G.mgr)return _mb10(pid,fee);
  const boost=1+.02*mgd('mer')+.01*mgd('fin');
  const r=_mb10(pid,+(fee*boost).toFixed(2));
  if(r.ok){G.fin.caixa=+(G.fin.caixa+(fee*boost-fee)).toFixed(2)}
  return r;
};
const _sf10=signFree;signFree=function(pid){
  const p=P(pid),lu=p?valueOf(p)*.1:0;const r=_sf10(pid);
  if(!r&&G.mgr)G.fin.caixa=+(G.fin.caixa+lu*.05*Math.max(0,mgd('mer'))).toFixed(2);
  return r;
};
const _bi10=baseIdx;baseIdx=function(c){const v=_bi10(c);return c.id===G.user&&G.mgr?clamp(Math.round(v+3*mgd('bas')),5,100):v};
const _pr10=prest;prest=function(c){const v=_pr10(c);return c.id===G.user&&G.mgr?v*(1+.03*mgd('mid')):v};
const _so10=salOf;salOf=function(p){const v=_so10(p);return G&&G.mgr&&p.club===G.user?+(v*(1-.02*mgd('fin'))).toFixed(2):v};
const _bf10=budgetFor;budgetFor=function(c,o){const v=_bf10(c,o);return c.id===G.user&&G.mgr?+(v*(1+.04*mgd('fin'))).toFixed(1):v};
/* ---- fim de temporada: evolução do elenco, xp ---- */
hookAround('newSeason','ext10_ns10',function(next,A){
  ex();const c=userClub();const pos=posOf(c);
  const r=next();
  if(G.mgr){
    const c2=userClub();const dt=mgd('tre'),db=mgd('bas');
    for(const id of c2.squad){const p=P(id);
      if(p.age<=30&&dt>0&&Math.random()<.08*dt&&p.ovr<p.pot)p.ovr++;
      if(p.age<=22&&db>0&&Math.random()<.10*db&&p.ovr<p.pot)p.ovr++;
      if(p.age>=29&&dt<0&&Math.random()<.06*-dt)p.ovr--}
    c2.youth.forEach(y=>{y.dev=clamp(y.dev+db*1.5,5,100)});
    mgXp(40+(pos<=4?50:pos<=8?20:0)+(pos===1?120:0));
  }
  return r;
});
/* ---- empréstimos ---- */
/* p.loan={from,to,s} : jogador emprestado, volta ao fim da temporada */
function loanOuts(){return Object.values(G.players).filter(p=>p.loan&&p.loan.from===G.user)}
function loanIns(){return Object.values(G.players).filter(p=>p.loan&&p.loan.to===G.user)}
function loanOutOffers(pid){
  const p=P(pid),r=rng9(G.season*211+pid*13+G.round);
  const cs=G.clubs.filter(x=>x.id!==G.user&&x.squad.length<31).sort((a,b)=>b.rep-a.rep);
  const ok=cs.filter(x=>x.rep<=userClub().rep+2);
  const pool=(ok.length>=3?ok:cs);const out=[];const used=new Set();
  while(out.length<3&&used.size<pool.length){const x=pool[Math.floor(r()*pool.length)];if(used.has(x.id))continue;used.add(x.id);
    const v=valueOf(p),fee=+(v*(.04+r()*.06)*(1+.02*mgd('mer')+.02*mgd('fin'))).toFixed(2);
    out.push({club:x.id,fee,cover:Math.round(70+r()*30),games:p.ovr>=x.rep?'quase titular':'rodízio'})}
  return out;
}
function loanOut(pid,idx){
  const c=userClub(),p=P(pid);if(!p||p.club!==G.user)return 'Jogador não encontrado.';
  if(p.loan)return 'Já emprestado.';
  if(c.squad.length<=19)return 'Elenco precisa ter ao menos 19 jogadores para emprestar.';
  const o=loanOutOffers(pid)[idx];if(!o)return 'Proposta expirada.';
  const b=C(o.club);
  c.squad=c.squad.filter(id=>id!==pid);b.squad.push(pid);p.club=b.id;p.loan={from:G.user,to:b.id,s:G.season,r:G.round};p.listed=false;
  G.fin.caixa=+(G.fin.caixa+o.fee).toFixed(2);
  autoPick(c);addNews(nameOf(p)+' é emprestado ao '+b.name+' até o fim da temporada.');return null;
}
function loanInOffer(pid){
  const p=P(pid),r=rng9(G.season*97+pid);
  const v=valueOf(p),fee=+(v*(.08+r()*.05)*(1-.02*mgd('mer'))).toFixed(2);
  return {fee,buy:+(askPrice(p)*.9*(1-.02*mgd('mer'))).toFixed(1)};
}
function loanIn(pid){
  const c=userClub(),p=P(pid);if(!p||p.club<0||p.club===G.user)return 'Jogador indisponível.';
  if(!p.loanable)return 'Esse jogador não está liberado para empréstimo.';
  if(c.squad.length>=30)return 'Elenco cheio (máximo 30).';
  const o=loanInOffer(pid);if(G.fin.caixa<o.fee)return 'Caixa insuficiente ('+mi(o.fee)+').';
  const s=C(p.club);s.squad=s.squad.filter(id=>id!==pid);refill(s);
  p.loan={from:s.id,to:G.user,s:G.season,r:G.round};p.loanable=false;p.listed=false;p.club=G.user;p.mor=72;c.squad.push(pid);
  p.fit[c.phil]=clamp(p.fit[c.phil],5,100);
  G.fin.caixa=+(G.fin.caixa-o.fee).toFixed(2);addNews('Empréstimo: '+nameOf(p)+' chega ao '+c.name+' até o fim da temporada.');return null;
}
function loanBuy(pid){
  const p=P(pid);if(!p||!p.loan||p.loan.to!==G.user)return 'Sem empréstimo ativo.';
  const o=loanInOffer(pid);if(G.fin.caixa<o.buy)return 'Caixa insuficiente ('+mi(o.buy)+').';
  G.fin.caixa=+(G.fin.caixa-o.buy).toFixed(2);const from=p.loan.from;delete p.loan;
  addNews('Opção de compra exercida: '+nameOf(p)+' é do '+userClub().name+' por '+mi(o.buy)+'.');return null;
}
function loanReturn(){
  for(const p of Object.values(G.players)){if(!p.loan)continue;
    const holder=C(p.loan.to),owner=C(p.loan.from);
    if(holder.id===p.club){holder.squad=holder.squad.filter(id=>id!==p.id);if(!owner.squad.includes(p.id))owner.squad.push(p.id);p.club=owner.id}
    if(p.loan.from===G.user&&p.age<=24&&p.ovr<p.pot){p.ovr=Math.min(p.pot,p.ovr+ri(1,2));addNews(nameOf(p)+' volta do empréstimo mais experiente (OVR '+p.ovr+').')}
    delete p.loan;
    autoPick(holder);autoPick(owner);
  }
}
hookBefore('newSeason','ext10_nl10',function(){loanReturn();});
/* IA coloca jogadores à venda e para empréstimo em volume */
aiListing=function(){
  for(const c of G.clubs){if(c.id===G.user)continue;
    for(const id of c.squad){const p=P(id);
      if(p.listed&&p.lst!==undefined&&p.lst<=G.round){p.listed=false;delete p.lst}
      if(p.loanable&&p.lnx!==undefined&&p.lnx<=G.round){p.loanable=false;delete p.lnx}}
    const want=c.rep<70?6:4;
    const n=c.squad.filter(id=>P(id).listed).length;
    if(n<want&&c.squad.length>20&&Math.random()<.55){
      const cand=c.squad.filter(id=>!P(id).listed&&!P(id).loan&&(c.squad.indexOf(id)>=9||P(id).age>=30||Math.random()<.08));
      if(cand.length){const id=pick(cand);P(id).listed=true;P(id).lst=G.round+ri(5,12)}}
    const nl=c.squad.filter(id=>P(id).loanable).length;
    if(nl<3&&c.squad.length>20&&Math.random()<.45){
      const cand=c.squad.filter(id=>{const p=P(id);return !p.loan&&!p.loanable&&p.age<=23&&c.squad.indexOf(id)>=11});
      if(cand.length){const id=pick(cand);P(id).loanable=true;P(id).lnx=G.round+ri(6,14)}}
  }
};
/* na virada de temporada, janela: cada clube abre várias vagas */
hookAfter('newSeason','ext10_nw10',function(r,A){
  for(const c of G.clubs){if(c.id===G.user)continue;
    const cand=c.squad.filter(id=>!P(id).loan).sort(()=>Math.random()-.5).slice(0,5);
    cand.forEach((id,i)=>{const p=P(id);if(i<3){p.listed=true;p.lst=ri(4,14)}else{p.loanable=true;p.lnx=ri(8,20)}});
  }
  });

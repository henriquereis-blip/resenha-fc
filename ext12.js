/* ext12: divisões (A/B/C/D), acesso e rebaixamento, tradição, finanças reais da IA, salários */
const DIVN=['Série A','Série B','Série C','Série D','1ª divisão','2ª divisão'];
const RBAND=[[58,82],[52,76],[46,66],[40,58],[56,93],[48,70]];
const LG=d=>G.clubs.filter(c=>c.div===d);
const userDiv=()=>(G.user!=null&&G.clubs[G.user])?G.clubs[G.user].div:0;
function tradRank(c){return LG(c.div).sort((a,b)=>b.trad-a.trad).findIndex(x=>x.id===c.id)+1}
function expRank(c){return .6*rankByStrength(c)+.4*tradRank(c)}
metaFor=function(c){return Math.min(16,Math.max(c.div===0?3:2,Math.round(expRank(c)*0.85)+1))};
hookAround('metaText','mt12',function(next,__a){let [mp]=__a;const d=userDiv();return d>0&&mp<=1?'Ser campeão da '+DIVN[d]:d>0&&d!==4&&mp<=4?'Brigar pelo acesso (top '+mp+')':next(mp)});
hookAround('newWorld','nw12',function(next,__a){next();for(const c of G.clubs)if(c.div>0&&!FINREAL[c.sig]){const inc=c.tv+c.spBase,rev=Math.round(inc*8);FINREAL[c.sig]=[+(rev*rnd(.15,1.3)).toFixed(1),rev,'ok']}});
/* salários: potencial, idade, desempenho e peso no clube */
salOf=function(p){
  const v=valueOf(p)*0.11*1.6;
  const age=p.age>=33?.9:p.age<=20?.85:1;
  const perf=p.rn>=5?clamp(.92+(p.rsum/p.rn-6.3)*.08,.9,1.18):1;
  const pot=p.pot&&p.age<=23?1+clamp((p.pot-p.ovr)/80,0,.2):1;
  return +Math.max(.06,v*age*perf*pot).toFixed(2);
};
/* dinheiro da IA: sem caixa infinito */
function aiFinance(){
  for(const c of G.clubs){
    if(c.id===G.user)continue;
    const inc=(c.tv+c.spBase)/38*1.3;
    const pay=c.squad.reduce((s,id)=>s+salOf(P(id)),0)/38;
    c.caixa=+(c.caixa+inc-pay-c.cap/1000*0.25/38).toFixed(2);
  }
}
function aiSeasonEnd(){
  for(const c of G.clubs){
    if(c.id===G.user)continue;
    let g=0;
    while(c.caixa<-(c.tv+c.spBase)*0.2&&g++<3&&c.squad.length>21){
      const cand=c.squad.map(id=>P(id)).filter(p=>!p.loan).sort((a,b)=>valueOf(b)-valueOf(a))[0];if(!cand)break;
      const fee=+(valueOf(cand)*.9).toFixed(2);
      const b=G.clubs.filter(x=>x.id!==c.id&&x.id!==G.user&&x.div<=c.div&&x.squad.length<30&&x.caixa>fee*.8).sort((a,z)=>z.caixa-a.caixa)[0];
      if(!b)break;
      c.squad=c.squad.filter(id=>id!==cand.id);b.squad.push(cand.id);cand.club=b.id;cand.listed=false;b.caixa=+(b.caixa-fee).toFixed(2);c.caixa=+(c.caixa+fee).toFixed(2);
      G.finSales=(G.finSales||0)+1;
      if(cand.real||cand.ovr>=72)paperLine(c.name+' vende '+cand.name+' ao '+b.name+' para fechar as contas','Clube negocia o atleta por '+mi(fee)+' em meio a problemas de caixa.');
    }
    if(c.caixa<0){c.debt=+((c.debt||0)-c.caixa*0.6).toFixed(1);c.caixa=0}
    else c.caixa=+(c.caixa*.7).toFixed(1);
  }
}
/* acesso e rebaixamento */
function promoRel(){
  const T=[0,1,2,3].map(d=>tableRows(d));const mv=[];
  for(let d=0;d<3;d++){T[d].slice(-4).forEach(c=>mv.push([c,d+1]));T[d+1].slice(0,4).forEach(c=>mv.push([c,d]))}
  G.moves=[];
  for(const [c,nd] of mv){
    const up=nd<c.div;const old=c.div;c.div=nd;
    c.divHist=c.divHist||[];c.divHist.push({s:G.season,to:nd});
    c.tv=+(c.tv*(up?(old===1?2.2:1.8):.5)).toFixed(1);c.spBase=+(c.spBase*(up?(old===1?2.2:1.8):.5)).toFixed(1);
    if(up&&c.id!==G.user){for(let k=0;k<3;k++){const role=pick(['ZAG','LAT','VOL','MEI','PNT','ATA']);c.squad.push(mkPlayer(role,c.rep+3,ri(23,29),c.id).id)}autoPick(c)}
    c.humor=clamp(c.humor+(up?15:-15),5,100);
    G.moves.push({id:c.id,name:c.name,from:old,to:nd});
    if(!up){
      c.squad.map(id=>P(id)).filter(p=>p.ovr>=68&&!p.loan).sort((a,b)=>b.ovr-a.ovr).slice(0,2).forEach(p=>{
        if(Math.random()<.5&&c.id!==G.user){const b=G.clubs.filter(x=>x.div<nd&&x.id!==G.user&&x.squad.length<30)[ri(0,10)];if(b){c.squad=c.squad.filter(i=>i!==p.id);b.squad.push(p.id);p.club=b.id;if(p.real)addNews(nameOf(p)+' deixa o '+c.name+' após o rebaixamento.')}}});
      if(c.trad>=55||c.id===G.user)paperLine(c.name.toUpperCase()+' É REBAIXADO','Queda para a '+DIVN[nd]+' abala o clube. A torcida exige reação imediata.');
    }else if(c.trad>=55)paperLine(c.name+' conquista o acesso à '+DIVN[nd],'Volta por cima e retorno à divisão superior.');
  }
}
hookAround('newSeason','ext12_ns12',function(next,A){
  aiSeasonEnd();promoRel();
  next();
  G.clubs.forEach(x=>{if(x.id===G.user)return;const t=50+x.trad*.28,tvT=[null,0,0,0],rb=RBAND[x.div];if(!rb)return;x.rep=+clamp(x.rep*.93+t*.07,rb[0],rb[1]).toFixed(1)});
});
hookAround('finishRound','ext12_fr12',function(next,A){
  const rd=G.round,ud=userDiv();
  try{for(let d=0;d<=12;d++){if(d===ud||!G.dfx[d]||(R&&R.mpg&&R.divs&&R.divs.has(d)))continue;for(const [h,a] of (G.dfx[d][rd]||[]))simFast(C(h),C(a))}}catch(e){console.error('divs',e)}
  const out=next();
  try{aiFinance()}catch(e){console.error('aifin',e)}
  return out;
});
hookAround('endSeason','es12',function(next,__a){
  next();
  try{const c=userClub(),s=G.summary,d=c.div;if(!s)return;
    s.div=d;s.divName=DIVN[d];{const rp=relPromo(d,s.pos);s.rel=rp.rel;s.promo=rp.promo}
    if(s.rel){G.board.conf=clamp(G.board.conf-(10+c.trad*.45),0,100);if(G.pat){G.pat.bd=clamp(G.pat.bd-12,0,100);G.pat.fan=clamp(G.pat.fan-8,0,100)}
      s.txt+=' REBAIXADO para a '+lowerName(d)+'!';s.fired=(c.trad>=60&&Math.random()<.85)||G.board.conf<28||Math.random()<.35;
      s.jobs=[]}
    if(s.promo){G.board.conf=clamp(G.board.conf+10,0,100);s.txt+=' ACESSO conquistado: sobe para a '+upperName(d)+'!'}
    s.conf=G.board.conf;
  }catch(e){console.error('es12',e)}
});
fireOffers=function(){
  const c=userClub();
  return shuffle(G.clubs.filter(x=>x.id!==c.id&&x.div>=c.div&&x.div-c.div<=1)).sort((a,b)=>Math.abs(a.rep-(c.rep+rnd(-3,3)))-Math.abs(b.rep-(c.rep+rnd(-3,3)))).slice(0,3).map(x=>x.id);
};
hookAround('startCareer','sc12',function(next,__a){let [id,coach,phil,asst]=__a;next(id,coach,phil,asst);genAllFx();save()});
hookAround('takeJob','tj12',function(next,__a){let [id]=__a;const r=next(id);genAllFx();G.round<NR()&&prepareRound();save();return r});
Object.assign(A,{cdiv(d){S.cdiv=+d.v;S.sc=null;render()},firedgo(){S.modal={t:'fired'};render()}});

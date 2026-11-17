/* ===== tática completa: formações, marcação, foco, gramado, forma ===== */
Object.assign(FORMS,{'5-4-1':[5,4,1],'4-4-2 def':[4,4,2],'4-4-2 Ofen.':[4,4,2],'4-3-3 def':[4,3,3],'4-2-3-1':[4,5,1],'4-2-3-1 Alas':[4,5,1]});
const FORMLIST=['5-4-1','5-3-2','4-5-1','4-4-2','4-4-2 def','4-4-2 Ofen.','4-3-3','4-3-3 def','3-5-2','3-4-3','4-2-3-1','4-2-3-1 Alas'];
const MARKS=['Leve','Pesada','Muito pesada'],FOCUS=['Pelo meio','Pelas laterais'];
const grassFor=(s,r,h)=>{const x=(s*131+r*17+h*7)%10;return x<2?'Excelente':x<5?'Muito Boa':x<8?'Boa':x<9?'Regular':'Ruim'};
function formOf(id,n=5){
  const L=G.h2h.filter(x=>x[2]===id||x[3]===id).slice(-n);
  return L.map(([s,r,h,a,hg,ag])=>{const f=h===id?hg:ag,c=h===id?ag:hg;return f>c?'V':f<c?'D':'E'});
}
const _mk3=mkSide;mkSide=function(c){const s=_mk3(c);s.mark=c.mark||'Leve';s.focus=c.focus||'Pelo meio';return s};
const _nm3=newMatch;newMatch=function(hc,ac){const m=_nm3(hc,ac);m.grass=grassFor(G.season,G.round,hc.id);return m};
const _pw=power;power=function(m,s){
  const r=_pw(m,s);const mi=MARKS.indexOf(s.mark||'Leve');
  r.def*=1+0.025*mi;r.mid*=1+0.01*mi;
  const f=s.formation||'';
  if(/def$/.test(f)){r.def*=1.03;r.atk*=0.97}
  if(/Ofen/.test(f)){r.atk*=1.03;r.def*=0.97}
  const pl=s.lineup.map(P);const lat=pl.filter(p=>p.role==='LAT'||p.role==='PNT'),mid=pl.filter(p=>p.role==='MEI'||p.role==='VOL');
  const avg=a=>a.length?a.reduce((x,p)=>x+p.ovr,0)/a.length:60;
  const diff=clamp((avg(lat)-avg(mid))*0.003,-0.03,0.03);
  r.atk*=(s.focus==='Pelas laterais'||/Alas/.test(f))?1+diff:1-diff;
  if((m.grass==='Regular'||m.grass==='Ruim')&&s.style==='Posse')r.mid*=m.grass==='Ruim'?0.95:0.98;
  return r;
};
const _sm3=stepMinute;stepMinute=function(m){
  _sm3(m);
  for(const k of ['h','a']){const s=m[k],mi=MARKS.indexOf(s.mark||'Leve');if(!mi)continue;
    for(const id of s.lineup)m.en[id]=Math.max(10,m.en[id]-0.06*mi);
    if(Math.random()<TUNE.ymk*mi){const c=s.lineup.filter((id,i)=>s.slots[i]!=='GK'&&!s.sent.includes(id));if(c.length){const id=pick(c);addEv(m,k,'yellow',id,'Cartão amarelo para '+P(id).name);m.rt[id]-=0.4}}}
};
const _fr4=finishRound;finishRound=function(){
  const um=R.ms[R.ui],s=um[userSide(um)],uc=userClub();uc.mark=s.mark;uc.focus=s.focus;
  return _fr4();
};
function saveTactic(i){const c=userClub();c.tsaved=c.tsaved||[null,null,null];c.tsaved[i]={formation:c.formation,style:c.style,mark:c.mark||'Leve',focus:c.focus||'Pelo meio',lineup:c.squad.slice(0,11)}}
function loadTactic(i){
  const c=userClub(),t=(c.tsaved||[])[i];if(!t)return 'Tática vazia.';
  c.formation=t.formation;c.style=t.style;c.mark=t.mark;c.focus=t.focus;
  const ok=t.lineup.filter(id=>c.squad.includes(id)&&P(id).inj===0);
  if(ok.length<11){autoPick(c);return 'Formação carregada. Alguns titulares estavam indisponíveis, o resto foi escalado no automático.'}
  const rest=c.squad.filter(id=>!ok.includes(id));c.squad=[...ok,...rest];return null;
}

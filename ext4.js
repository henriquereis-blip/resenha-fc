/* ===== lista de transferência + olheiros ===== */
const SSAL=[0,0.2,0.4,0.7,1.1,1.6],SPEC=['Jovens talentos','Reforço imediato','Custo-benefício','Livres no mercado'];
function ex4(){if(!G)return;G.scouts=G.scouts||[];G.recs=G.recs||[];if(!G.spool)G.spool=genScoutPool(4)}
function genScoutPool(n){const L=[];for(let i=0;i<n;i++){const q=ri(1,5);L.push({name:pick(FN)+' '+pick(LN),q,spec:pick(SPEC),sal:SSAL[q]})}return L}
const scoutLvl=()=>{ex4();return G.scouts.reduce((m,s)=>Math.max(m,s.q),0)};
function hireScout(i){ex4();if(G.scouts.length>=3)return 'Máximo de 3 olheiros.';const s=G.spool[i];if(!s)return 'Candidato indisponível.';G.scouts.push(s);G.spool.splice(i,1);G.spool.push(...genScoutPool(1));refreshRecs();return null}
function fireScout(i){ex4();G.scouts.splice(i,1);G.recs=G.recs.filter(r=>G.scouts.some(s=>s.name===r.scout))}
function refreshRecs(){
  ex4();const uc=userClub();G.recs=[];const ours=new Set(uc.squad);
  const all=Object.values(G.players).filter(p=>p.club>=0&&p.club!==G.user);
  const free=G.free.map(P);
  const lineup=uc.squad.slice(0,11).map(P);
  const need=p=>{const m=lineup.filter(x=>x.role===p.role).map(x=>x.ovr);return m.length?Math.min(...m):0};
  for(const s of G.scouts){
    const n=1+(s.q>=3?1:0)+(s.q>=5?1:0)+1;const noise=(6-s.q)*1.6;let pool,key;
    if(s.spec==='Jovens talentos'){pool=all.filter(p=>p.age<=21);key=p=>p.pot}
    else if(s.spec==='Reforço imediato'){pool=all.filter(p=>p.ovr>need(p)+1&&valueOf(p)<=Math.max(2,G.fin.caixa*1.1));key=p=>p.ovr}
    else if(s.spec==='Custo-benefício'){pool=all.filter(p=>p.ovr>=need(p)-3&&valueOf(p)<=Math.max(1,G.fin.caixa));key=p=>p.ovr/Math.max(0.5,valueOf(p))*10}
    else{pool=free;key=p=>p.ovr}
    const sorted=pool.map(p=>[p,key(p)+gauss()*noise]).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
    let k=0;for(const p of sorted){if(k>=n)break;if(G.recs.some(r=>r.pid===p.id))continue;G.recs.push({pid:p.id,scout:s.name,spec:s.spec,q:s.q,r:G.round+1});k++}
  }
}
function recNote(r){const p=P(r.pid);if(!p)return '';const uc=userClub();
  const fit=Math.round(p.fit[uc.phil]);
  const t={'Jovens talentos':'Promessa. Pode crescer muito.','Reforço imediato':'Entra e já melhora o time.','Custo-benefício':'Rende mais do que custa.','Livres no mercado':'Sem custo de transferência.'}[r.spec];
  return t+' Encaixe '+(r.q>=2?fit+'%':'?')+' na sua filosofia.'}
/* ia coloca jogadores na lista */
function aiListing(){
  for(const c of G.clubs){if(c.id===G.user)continue;
    for(const id of c.squad){const p=P(id);if(p.listed&&p.lst!==undefined&&p.lst<=G.round){p.listed=false;delete p.lst}}
    const n=c.squad.filter(id=>P(id).listed).length;
    if(n<3&&c.squad.length>20&&Math.random()<0.18){
      const top=c.squad.slice(0,11);
      const cand=c.squad.filter(id=>!P(id).listed&&(c.squad.indexOf(id)>=11||P(id).age>=31));
      if(cand.length){const id=pick(cand);P(id).listed=true;P(id).lst=G.round+ri(4,10)}}}
}
const _fr5=finishRound;finishRound=function(){
  ex();ex4();const out=_fr5();
  if(G.scouts.length){const tot=G.scouts.reduce((s,x)=>s+x.sal,0);G.fin.caixa=+(G.fin.caixa-tot/38).toFixed(2);if(G.round%3===0)refreshRecs()}
  aiListing();return out;
};
const _ns5=newSeason;newSeason=function(){const r=_ns5();ex4();if(G.scouts.length)refreshRecs();return r};

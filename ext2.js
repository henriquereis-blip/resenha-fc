/* ===== história: confrontos, campeões, time da rodada/ano, bola de ouro ===== */
function ex2(){if(!G)return;G.h2h=G.h2h||[];G.champs=G.champs||[];G.tdrs=G.tdrs||[];G.toty=G.toty||[]}
const XI_SLOTS=['GK','DEF','DEF','DEF','DEF','MID','MID','MID','MID','ATA','ATA'];
function pickXI(cands){ // cands: [{p,score}]
  const by=r=>cands.filter(x=>r.includes(x.p.role)).sort((a,b)=>b.score-a.score);
  const take=(r,n)=>by(r).slice(0,n);
  const g=take(['GOL'],1),lat=take(['LAT'],2),zag=take(['ZAG'],2),mid=take(['VOL','MEI','PNT'],4),ata=take(['ATA'],2);
  const arr=[...g,lat[0],zag[0],zag[1],lat[1],...mid,...ata].filter(Boolean);
  return arr.map(x=>({n:nameOf(x.p),c:x.p.club,r:+x.score.toFixed(2),role:x.p.role,pos:x.p.pos}));
}
hookAround('finishRound','ext2_fr3',function(next,A){
  ex();ex2();
  const cands=[];
  for(const m of R.ms){for(const k of ['h','a']){const s=m[k];for(const id of new Set([...s.lineup,...s.used,...s.outs])){if(m.rt[id]!==undefined&&P(id))cands.push({p:P(id),score:m.rt[id]})}}}
  const n=G.round+1,season=G.season;
  const out=next();
  G.tdrs.push({s:season,r:n,xi:pickXI(cands)});if(G.tdrs.length>80)G.tdrs.shift();
  if(G.asst&&G.asst.sal)G.fin.caixa=+(G.fin.caixa-G.asst.sal/38).toFixed(2);
  for(const r of G.lastRound.results)G.h2h.push([season,n,r.h,r.a,r.hg,r.ag]);
  return out;
});
hookAround('endSeason','es3',function(next,__a){
  ex();ex2();const rows=tableRows();
  const ld=leaders('goals',1)[0];
  const champ=rows[0];const co=champ.id===G.user?G.uc:champ.coach;
  const cands=Object.values(G.players).filter(p=>p.club>=0&&p.rn>=Math.min(15,Math.floor(G.round*0.4))).map(p=>({p,score:p.rsum/p.rn}));
  const r=next();
  if(!G.champs.find(x=>x.s===G.season)){
    G.champs.push({s:G.season,champ:champ.name,cid:champ.id,vice:rows[1].name,vid:rows[1].id,scorer:ld?nameOf(ld[0])+' ('+ld[1]+')':'–',coach:co.name});
    G.toty.push({s:G.season,xi:pickXI(cands)});
  }
  return r;
});
function bolaOuro(){
  const min=Math.max(1,Math.floor(G.round*0.5));
  return Object.values(G.players).filter(p=>p.club>=0&&p.rn>=min).map(p=>({p,v:awardOf(p)})).sort((a,b)=>b.v-a.v);
}
function h2hOf(a,b){
  const L=G.h2h.filter(x=>(x[2]===a&&x[3]===b)||(x[2]===b&&x[3]===a));
  let wa=0,wb=0,d=0,ga=0,gb=0,bigA=null,bigB=null;
  for(const [s,r,h,aw,hg,ag] of L){const fa=h===a?hg:ag,fb=h===a?ag:hg;ga+=fa;gb+=fb;
    if(fa>fb){wa++;if(!bigA||fa-fb>bigA[0])bigA=[fa-fb,s,r,fa,fb]}else if(fb>fa){wb++;if(!bigB||fb-fa>bigB[0])bigB=[fb-fa,s,r,fa,fb]}else d++}
  return {L,wa,wb,d,ga,gb,bigA,bigB};
}

// Mundo: K temporadas inteiras. Coleta campeões por liga, surpresas (campeão fora do esperado pela força base) e
// anomalias (clubes que terminaram muito acima/abaixo da posição esperada pela força base).
// Também coleta a tabela da liga brasileira jogável (G.clubs) e a média de avaliação dos jogadores por ovr.
const {open}=require('./setup_common');
const K=+(process.argv[2]||8);
const START=process.argv[3]||'Juventude';
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({K,START})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const id=G.clubs.find(c=>c.name===START).id;
  startCareer(id,'Mundo','Direto',null);ex();G.phase='play';S.modal=null;
  const seasons=[];
  const DIVN_=DIVN;
  const xi=c=>c.squad.map(i=>P(i)).sort((a,b)=>b.ovr-a.ovr);
  for(let s=0;s<K;s++){
    let g=0,out;
    while(g++<200){
      if(G.round%6===3)autoPick(userClub());
      startRound();while(!roundDone())stepAll();out=finishRound();
      if(out==='fired'){break}
      if(out==='seasonEnd')break}
    if(!G.summary||G.summary.season!==G.season){endSeason()}
    const W=wd();const rec=W.hist[W.hist.length-1]||{};
    // mundo abstrato: tabela final por liga, força base (b) e posição esperada
    const leagues={};
    for(const k in W.lg){
      const T=wTable(k);const byB=W.lg[k].cl.slice().sort((a,b)=>b.b-a.b);
      const rows=T.map((c,i)=>({n:c.n,pos:i+1,exp:byB.findIndex(x=>x.id===c.id)+1,b:c.b,P:c.P,GP:c.GP,GC:c.GC}));
      leagues[k]={champ:rec.ch?rec.ch[k]:null,vice:rec.vi?rec.vi[k]:null,
        champB:rec.ch?(byB.findIndex(x=>x.n===rec.ch[k])+1):null,
        cp:rec.cp?rec.cp[k]:null,rows};
    }
    // campeão da Champions abstrata
    // Brasil jogável: tabela da Série A (G.clubs div 0), força média do XI x posição
    const BR=G.clubs.filter(c=>c.div===0).map(c=>{const t=xi(c).slice(0,11);return {n:c.name,pos:posOf(c),ovr:+(t.reduce((a,x)=>a+x.ovr,0)/t.length).toFixed(1),P:c.P,GP:c.GP,GC:c.GC,user:c.id===G.user}});
    // avaliação de jogadores (ovr vs nota média, mínimo 10 jogos)
    const pl=[];for(const c of G.clubs)for(const id of c.squad){const q=P(id);if(q&&q.games>=10)pl.push({n:q.name,club:c.name,ovr:q.ovr,nota:+(q.rsum/q.rn).toFixed(2),g:q.goals,a:q.ast,jogos:q.games,age:q.age,pos:q.pos,role:q.role,sea:s})}
    seasons.push({season:G.season,userClub:userClub().name,userPos:(G.summary&&G.summary.pos)||null,userChamp:(G.summary&&G.summary.champ)||null,fired:out==='fired',leagues,ucl:rec.ucl||null,uclv:rec.uclv||null,BR,pl});
    // zera estatísticas de jogador por temporada para medir só essa
    for(const c of G.clubs)for(const id of c.squad){const q=P(id);if(q){q.rsum=0;q.rn=0;q.games=0;q.goals=0;q.ast=0;q.yc=0;q.rc=0}}
    if(out==='fired'){const of=fireOffers();takeJob(of[0])}
    newSeason();G.phase='play';S.modal=null;
  }
  return {seasons,ucl:(G.wd.hist||[]).map(h=>[h.s,h.ucl,h.uclv])};
},{K,START});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

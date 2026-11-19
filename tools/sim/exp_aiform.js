// IA e formação: mede variedade de formações, encaixe (xiScore) da formação escolhida vs a melhor possível,
// e as trocas por má fase (quantas, e se o clube que trocou subiu na tabela nas 6 rodadas seguintes).
// Uso: node tools/sim/exp_aiform.js K [clube]   (K temporadas)
const {open}=require('./setup_common');
const K=+(process.argv[2]||2);
const START=process.argv[3]||'Juventude';
const PSW=process.argv[4]!==undefined?+process.argv[4]:1; /* chance de troca na má fase (0.5 = experimento A/B) */
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({K,START,PSW})=>{
  if(typeof AIF81!=='undefined')AIF81.pSwitch=PSW;
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  startCareer(G.clubs.find(c=>c.name===START).id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const xi=(c,f)=>{const slots=slotsOf(f),wn=wantsOf(f),used=new Set();let t=0;slots.forEach((sl,i)=>{const id=bestForSlot(c.squad,sl,used,c.phil,wn[i]);if(id!=null){used.add(id);t+=slotScore(P(id),sl,c.phil,wn[i])}});return t};
  const snap=tag=>{const ai=G.clubs.filter(c=>c.id!==G.user);const dist={};let gap=0,rank=0;
    for(const c of ai){dist[c.formation]=(dist[c.formation]||0)+1;const sc=FORMLIST.map(f=>xi(c,f)).sort((a,b)=>b-a);const cur=xi(c,c.formation);gap+=sc[0]-cur;rank+=sc.filter(v=>v>cur+1e-9).length+1}
    return {tag,distinct:Object.keys(dist).length,top:Object.entries(dist).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x.join(':')).join(' '),gapMedio:+(gap/ai.length).toFixed(2),rankMedio:+(rank/ai.length).toFixed(2)}};
  const out={snaps:[snap('inicio')],sw:[],divP:null,bad:0};
  const pend=[],seen=new Set();
  for(let s=0;s<K;s++){let g=0,o;
    while(g++<200){
      /* má fase medida antes do startRound; a troca da IA (ext81) acontece dentro dele. Uma vez por rodada. */
      const r0=G.round,key=G.season*100+r0,bad=[];
      if(r0%6===0&&r0>0&&!seen.has(key)){seen.add(key);
        for(const c of G.clubs)if(c.id!==G.user&&posOf(c)-rankByStrength(c)>=5)bad.push({c,f:c.formation,pos0:posOf(c),exp:rankByStrength(c)})}
      startRound();
      for(const x of bad){out.bad++;pend.push({id:x.c.id,r:r0,s:G.season,pos0:x.pos0,exp:x.exp,from:x.f,to:x.c.formation,sw:x.c.formation!==x.f})}
      while(!roundDone())stepAll();o=finishRound();
      for(const x of pend)if(x.pos1===undefined&&x.s===G.season&&G.round>=x.r+6){x.pos1=posOf(C(x.id))}
      if(o==='fired'||o==='seasonEnd')break}
    if(s===0)out.divP=[0,1,2,3].map(d=>G.clubs.filter(c=>c.div===d).reduce((a,c)=>a+c.J,0));
    if(!G.summary||G.summary.season!==G.season)endSeason();
    if(o==='fired'){const of=fireOffers();takeJob(of[0])}
    newSeason();G.phase='play';S.modal=null;out.snaps.push(snap('temporada '+G.season));
  }
  const done=pend.filter(x=>x.pos1!==undefined);
  const g=l=>l.length?+(l.reduce((a,x)=>a+(x.pos0-x.pos1),0)/l.length).toFixed(2):null;
  const sw=done.filter(x=>x.sw),ns=done.filter(x=>!x.sw);
  out.sw={maFase:pend.length,trocaram:pend.filter(x=>x.sw).length,ganhoPosTrocou:g(sw),nTrocou:sw.length,ganhoPosNaoTrocou:g(ns),nNaoTrocou:ns.length,ex:pend.filter(x=>x.sw).slice(0,4)};
  return out;
},{K,START,PSW});
console.log(JSON.stringify(res,null,1));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

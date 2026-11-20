const h=require('./h');
(async()=>{const {b,p,errs}=await h.open('Flamengo',{rounds:3});
const r=await p.evaluate(()=>{const c=userClub();const ps=c.squad.map(id=>P(id));const o={};
 o.cts=[...new Set(ps.map(x=>ctOf(x)-G.season))].sort().join(',');
 const x=ps[0];x.ct=G.season;S.prof=x.id;G.view='inicio';render();
 o.card=document.body.innerText.toLowerCase().includes('vence esta temporada');
 o.btns=document.querySelectorAll('[data-a="rnw"]').length;
 const w0=salOf(x),cx=G.fin.caixa;G.fin.caixa+=500;A.rnw({id:x.id,y:'3'});
 o.renew={ct:x.ct-G.season,wageDelta:+(x.wage-w0).toFixed(2),caixaGasta:+(cx+500-G.fin.caixa).toFixed(2)};
 const y=ps[5];y.ct=G.season-0;const n0=c.squad.length;
 const sq=c.squad.length;
 const alerts=staffAlerts().filter(a=>a.k==='ct').length;o.alertSeen=alerts;
 return o});
console.log(JSON.stringify(r));
// fim de temporada: quem vence sai
const r2=await p.evaluate(()=>{const c=userClub();const p=c.squad.map(id=>P(id)).find(x=>x.ct>=G.season);const victim=c.squad.map(id=>P(id)).filter(x=>x.ct===G.season&&x!==p)[0]||P(c.squad[3]);victim.ct=G.season;const vid=victim.id;
 let n=0;while(G.phase==='play'&&n++<60){startRound();while(!roundDone())stepAll();const o=finishRound();if(o==='fired'){takeJob(fireOffers()[0]);G._t114fired=1;break}if(o==='seasonEnd')break}
 try{endSeason&&endSeason()}catch(e){}try{newSeason()}catch(e){return 'err '+e.message}
 return {season:G.season,victimClub:P(vid).club,victimLivre:G.free.includes(vid)?1:0,squad:userClub().squad.length,demitidoNoTeste:!!G._t114fired}});
console.log(JSON.stringify(r2),errs);await b.close()})();

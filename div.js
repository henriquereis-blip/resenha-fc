const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const errs=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};const ce=w.console.error;w.console.error=(...a)=>errs.push(a.map(x=>x&&x.message||String(x)).join(' ').slice(0,160))}});const w=dom.window;
const t0=Date.now();
const o=JSON.parse(w.eval(`(function(){S.obj=null;const u=G.clubs.find(c=>c.sig==='${process.argv[2]||'SPO'}');startCareer(u.id,'T','Direto',null);const out=[];
 for(let s=0;s<${process.argv[3]||6};s++){
  for(let i=0;i<38;i++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];autoPick(userClub());startRound();while(!roundDone())stepAll();const r=finishRound();if(G.round>=38)break}
  const A=tableRows(0),B=tableRows(1);
  endSeason();const sm=G.summary;
  out.push({s:G.season,user:userClub().sig,div:userClub().div,pos:sm.pos,meta:sm.meta,rel:sm.rel,promo:sm.promo,fired:sm.fired,conf:Math.round(G.board.conf),
   A1:A[0].sig,A20:A[19].sig,B1:B[0].sig,B20:B[19].sig,upA:B.slice(0,4).map(c=>c.sig).join(','),downA:A.slice(-4).map(c=>c.sig).join(','),caixa:Math.round(G.fin.caixa),
   ovrA:+(tableRows(0).reduce((a,c)=>a+strength(c),0)/20).toFixed(1),ovrB:+(tableRows(1).reduce((a,c)=>a+strength(c),0)/20).toFixed(1),ovrD:+(tableRows(3).reduce((a,c)=>a+strength(c),0)/20).toFixed(1),
   cashNeg:G.clubs.filter(c=>c.id!==G.user&&c.caixa<0).length,sales:G.finSales||0,debtMax:Math.max(...G.clubs.map(c=>c.debt||0)),meta2:G.board.metaTxt});
  if(sm.fired){const o2=fireOffers();takeJob(o2[0]);}
  newSeason();
 }
 return JSON.stringify(out)})()`));
for(const r of o)console.log(JSON.stringify(r));
console.log('errs',[...new Set(errs)].slice(0,5),'ms',Date.now()-t0);process.exit(0)

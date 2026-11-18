const {chromium}=require('playwright');
const [label,start,seasons,ek,ec]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/resenha-fc/resenha-fc-v2.html');await p.waitForTimeout(400);
await p.evaluate(([start,ek,ec])=>{
 localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
 const id=G.clubs.find(c=>c.name===start)?G.clubs.find(c=>c.name===start).id:3;
 startCareer(id,'Bot','Direto',null);ex();G.phase='play';S.modal=null;
 window.LOG=[];window.EV={sold:0,bought:0,fail:0,fired:0,spent:0,earned:0,inj:0};
 if(ek){const lc=wd().lg[ek].cl.find(c=>c.n===ec);if(lc){ro0();ro0();emigrate(lc.id)}}
 function ro0(){startRound();while(!roundDone())stepAll();return finishRound()}
 window.ro0=ro0;
 window.xi=c=>c.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr);
 window.window_=function(){
   const c=userClub();
   // vender oferta boa / sobra
   for(const o of G.offers.slice()){const pl=P(o.pid);if(!pl)continue;const top=xi(c).slice(0,14).map(x=>x.id);
     if((!top.includes(pl.id)||o.fee>=1.5*valueOf(pl))&&c.squad.length>22){const f=o.fee;if(!sellPlayer(o.id)){EV.sold++;EV.earned+=f}}}
   // contratar
   for(let k=0;k<5;k++){
     if(c.squad.length>=28)break;
     const budget=G.fin.caixa*0.65;if(budget<1)break;
     let best=null;
     const need={};for(const r of ['GOL','ZAG','LAT','VOL','MEI','PNT','ATA']){
       const l=c.squad.map(id=>P(id)).filter(x=>x.role===r).sort((a,b)=>b.ovr-a.ovr);need[r]=l[Math.min(l.length,{GOL:1,ZAG:2,LAT:2,VOL:2,MEI:2,PNT:2,ATA:2}[r])-1]||{ovr:40}}
     for(const r in need){
       const list=searchPlayers({role:r,minOvr:need[r].ovr+3,maxAge:32,free:false});
       for(const pl of list.slice(0,25)){const price=askPrice(pl)*1.08;if(price>budget)continue;
         const gain=(pl.ovr-need[r].ovr)/Math.max(price,0.5);
         if(!best||gain>best.gain)best={pl,price,gain}}}
     if(!best)break;
     const before=G.fin.caixa;
     const res=makeBid(best.pl.id,+best.price.toFixed(1));
     if(res.ok){EV.bought++;EV.spent+=before-G.fin.caixa}else EV.fail++;
   }
   // agentes livres
   try{for(const pid of (G.free||[]).slice(0,40)){const pl=P(pid);if(!pl||c.squad.length>=28)continue;
     const l=c.squad.map(id=>P(id)).filter(x=>x.role===pl.role).sort((a,b)=>b.ovr-a.ovr);
     if(pl.ovr>(l[1]?l[1].ovr:0)+2&&G.fin.caixa>valueOf(pl)*0.1*3){if(!signFree(pid)){EV.bought++}}}}catch(e){}
   autoPick(c);
 };
 return 1},[start,ek,ec]);
const seasonsN=+seasons;
for(let s=0;s<seasonsN;s++){
  const r=await p.evaluate(()=>{
    window_();let out,g=0,injMax=0,fired=0;
    while(g++<160){
      if(G.round===Math.floor(NR()/2))window_();
      if(G.round%6===3)autoPick(userClub());
      G.board.conf=G.board.conf; out=ro0();
      injMax=Math.max(injMax,userClub().squad.filter(id=>P(id).inj>0).length);
      if(out==='fired'){fired=1;EV.fired++;break}
      if(out==='seasonEnd')break}
    if(!G.summary||G.summary.season!==G.season){endSeason()}
    const c=userClub(),sm=G.summary||{};
    const rows=tableRows();
    const top=xi(c).slice(0,13);const avg=top.reduce((a,x)=>a+x.ovr,0)/top.length;
    const lg=G.clubs.filter(x=>x.div===c.div);const avgs=lg.map(x=>{const t=xi(x).slice(0,13);return t.reduce((a,y)=>a+y.ovr,0)/t.length}).sort((a,b)=>b-a);
    const rankStr=avgs.findIndex(v=>v<=avg+1e-9)+1;
    const rec={season:G.season,club:c.name,div:DIVN[c.div]||c.div,tier:tierOf(c.div),pos:sm.pos,champ:sm.champ,meta:sm.meta,nClubs:rows.length,titulo:sm.pos===1,fired,caixa:+G.fin.caixa.toFixed(1),conf:G.board.conf,avgXI:+avg.toFixed(1),rankForca:rankStr,injMax,prize:sm.prize,squad:c.squad.length,ev:JSON.parse(JSON.stringify(EV))};
    LOG.push(rec);
    // próxima
    try{
      if(fired){const of=fireOffers();takeJob(of[0])}
      endSeason&&0;newSeason();G.phase='play';S.modal=null;
    }catch(e){rec.err=e.message}
    return rec});
  console.log(JSON.stringify(r));
}
console.log('ERROS',[...new Set(errs)].slice(0,5));
await b.close()})();

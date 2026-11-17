const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
function run(sig,obj,seasons=3){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
 const w=dom.window;
 return w.eval(`(function(){
  const c=G.clubs.find(x=>x.sig==='${sig}');S.obj='${obj}';ex7();
  startCareer(c.id,'T','Posse',asstCandidates('Posse')[0]);ex();
  const out=[];const b0=G.fin.caixa,d0=c.debt;out.push('start caixa '+b0.toFixed(1)+' debt '+d0.toFixed(0)+' meta '+G.board.meta);
  for(let s=0;s<${seasons};s++){
    let minC=1e9,lost=false;
    for(let r=0;r<38;r++){ex();
      if(!G.sponsor)G.sponsor=sponsorOffers()[0];
      startRound();while(!roundDone())stepAll();finishRound();
      minC=Math.min(minC,G.fin.caixa);
      if(G.modalFired||G.phase==='fired'){lost=true}
    }
    const pos=posOf(userClub());
    out.push('T'+(s+1)+' pos '+pos+' caixa '+G.fin.caixa.toFixed(1)+' (min '+minC.toFixed(1)+') debt '+c.debt.toFixed(0)+' conf '+Math.round(G.board.conf)+(G.fx.ban?' BAN':'')+(G.fx.warned?' warn':'')+(G.user!==c.id?' DEMITIDO':''));
    if(G.user!==c.id)break;
    if(!G.summary)endSeason();newSeason();G.sponsor=null;
  }
  return out.join(' | ');
 })()`);
}
for(const [s,o] of [['CAM','rec'],['COR','rec'],['COR','apo'],['SAO','equ'],['PAL','tit'],['FLA','tit'],['REM','pro'],['MIR','lib']]){try{console.log(s,o,'=>',run(s,o))}catch(e){console.log(s,o,"ERR",e.stack.split("\n").slice(0,4).join(" | "))}}
process.exit(0)

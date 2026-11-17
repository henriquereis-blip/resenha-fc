const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const runs=+process.argv[2]||3,ns=+process.argv[3]||10;const pos={};
for(let r=0;r<runs;r++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
 const o=JSON.parse(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='CHA').id,'T','Direto',null);const out={};
  for(let s=0;s<${ns};s++){for(let i=0;i<38;i++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();if(G.round>=38)break}
   const t=tableRows(0);t.forEach((c,i)=>{(out[c.sig]=out[c.sig]||[]).push(i+1)});endSeason();newSeason()}
  return JSON.stringify(out)})()`));
 for(const k in o)(pos[k]=pos[k]||[]).push(...o[k]);
}
const sd=a=>{const m=a.reduce((x,y)=>x+y,0)/a.length;return Math.sqrt(a.reduce((x,y)=>x+(y-m)**2,0)/a.length)};
for(const k of ['FLA','PAL','SAN','SAO','COR','FLU','CAM','INT','GRE','BOT'])if(pos[k])console.log(k,'mean',(pos[k].reduce((a,b)=>a+b,0)/pos[k].length).toFixed(1),'sd',sd(pos[k]).toFixed(1),'worst',Math.max(...pos[k]),'top3%',Math.round(pos[k].filter(x=>x<=3).length/pos[k].length*100),'seq',pos[k].slice(0,12).join(','));
process.exit(0)

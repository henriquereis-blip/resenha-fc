const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const ex=+process.argv[2],fdv=process.argv[3]||'';const runs=+process.argv[4]||2;
let rho=[],goals=[],fla=[];
for(let r=0;r<runs;r++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
 const o=JSON.parse(w.eval(`(function(){TUNE.ex=${ex};S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='CHA').id,'T','Direto',null);const R_=[],g=[],fl=[];
  for(let s=0;s<8;s++){const pre=G.clubs.filter(c=>c.div===0).sort((a,b)=>strength(b)-strength(a)).map(c=>c.id);
   let gg=0,n=0;for(let i=0;i<38;i++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();if(G.lastRound&&!G.lastRound.cup){G.lastRound.results.forEach(x=>{gg+=x.hg+x.ag;n++})}if(G.round>=38)break}
   const t=tableRows(0).map(c=>c.id);let d=0;pre.forEach((id,i)=>{d+=(i-t.indexOf(id))**2});R_.push(1-6*d/(20*(400-1)));g.push(gg/Math.max(n,1));fl.push(t.indexOf(G.clubs.find(c=>c.sig==='FLA').id)+1);endSeason();newSeason()}
  return JSON.stringify({R_,g,fl})})()`));
 rho.push(...o.R_);goals.push(...o.g);fla.push(...o.fl);
}
const m=a=>a.reduce((x,y)=>x+y,0)/a.length;const sd=a=>Math.sqrt(m(a.map(x=>(x-m(a))**2)));
console.log('ex',ex,'rho',m(rho).toFixed(2),'goals/jogo',m(goals).toFixed(2),'FLA mean',m(fla).toFixed(1),'sd',sd(fla).toFixed(1),fla.join(','));
process.exit(0)

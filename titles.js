const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const cnt={},pts=[],inj=[];let runs=+process.argv[2]||6,dist=[];
for(let r=0;r<runs;r++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
 const o=JSON.parse(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='CHA').id,'T','Direto',null);const ch=[],pl=[],ij=[];
  for(let s=0;s<10;s++){for(let i=0;i<38;i++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];autoPick(userClub());startRound();while(!roundDone())stepAll();ij.push(G.clubs.reduce((a,c)=>a+c.squad.filter(id=>P(id).inj>0).length,0)/20);finishRound();if(G.round>=38)break}
   const t=tableRows(0);ch.push(t[0].sig);pl.push([t[0].P,t[19].P]);endSeason();newSeason()}
  return JSON.stringify({ch,pl,ij:ij.reduce((a,b)=>a+b,0)/ij.length})})()`));
 o.ch.forEach(c=>cnt[c]=(cnt[c]||0)+1);pts.push(...o.pl);inj.push(o.ij);dist.push(new Set(o.ch).size);
}
console.log(JSON.stringify(cnt),'distinct/run',dist.join(','),'champ avg',(pts.reduce((a,b)=>a+b[0],0)/pts.length).toFixed(1),'last avg',(pts.reduce((a,b)=>a+b[1],0)/pts.length).toFixed(1),'inj avg/club',(inj.reduce((a,b)=>a+b,0)/inj.length).toFixed(2));
process.exit(0)

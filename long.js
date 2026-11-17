const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const ns=+process.argv[2]||50,out=process.argv[3]||'/tmp/long.json';
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
const t0=Date.now();
const r=w.eval(`(function(){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.filter(c=>c.div===3)[5].id,'T','Direto',null);const rec=[];
 for(let s=0;s<${ns};s++){const sr=G.clubs.filter(c=>c.div===0).sort((a,b)=>strength(b)-strength(a)).map(c=>c.sig);
  for(let i=0;i<38;i++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();if(G.round>=38)break}
  const t=tableRows(0);rec.push({sr,pos:t.map(c=>c.sig),rep:Object.fromEntries(G.clubs.filter(c=>c.div===0).map(c=>[c.sig,c.rep])),caixa:Object.fromEntries(G.clubs.filter(c=>c.div===0).map(c=>[c.sig,Math.round(c.caixa)]))});
  endSeason();newSeason()}
 return JSON.stringify(rec)})()`);
fs.writeFileSync(out,r);console.log('done',((Date.now()-t0)/1000).toFixed(0)+'s');process.exit(0)

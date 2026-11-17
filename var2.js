const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='CHA').id,'T','Direto',null);const out=[];
 for(let s=0;s<14;s++){const rk=G.clubs.filter(c=>c.div===0).sort((a,b)=>strength(b)-strength(a)).map(c=>c.sig);
  const f=G.clubs.find(c=>c.sig==='FLA'),sa=G.clubs.find(c=>c.sig==='SAN');
  const top=c=>c.squad.map(i=>P(i).ovr).sort((a,b)=>b-a).slice(0,5).join('/');
  out.push('S'+s+' start: FLA str '+strength(f).toFixed(1)+' rk'+(rk.indexOf('FLA')+1)+' top5 '+top(f)+' cx '+f.caixa.toFixed(0)+' dv '+(f.div)+' | SAN str '+strength(sa).toFixed(1)+' rk'+(rk.indexOf('SAN')+1)+' top5 '+top(sa)+' cx '+sa.caixa.toFixed(0));
  for(let i=0;i<38;i++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();if(G.round>=38)break}
  const t=tableRows(0);out[out.length-1]+=' => pos FLA '+(t.findIndex(c=>c.sig==='FLA')+1)+' SAN '+(t.findIndex(c=>c.sig==='SAN')+1);endSeason();newSeason()}
 return out.join('\\n')})()`));process.exit(0)

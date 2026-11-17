const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/noext7.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window;
console.log(w.eval(`(function(){const log=[];const c=G.clubs.find(x=>x.sig==='CAM');S.obj='rec';startCareer(c.id,'T','Posse',asstCandidates('Posse')[0]);
for(let r=0;r<38;r++){if(!G.sponsor)G.sponsor=sponsorOffers()[0];startRound();while(!roundDone())stepAll();finishRound();}
log.push('summary '+!!G.summary+' phase '+G.phase);
try{log.push('pos '+posOf(userClub()))}catch(e){log.push('posERR '+e.stack.split('\\n').slice(0,8).join(' | '))}
try{if(!G.summary)endSeason();newSeason();log.push('ns ok')}catch(e){log.push('nsERR '+e.stack.split('\\n').slice(0,10).join(' | '))}
return log.join('\\n')})()`));

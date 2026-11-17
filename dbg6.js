const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window;
console.log(w.eval(`(function(){const c=G.clubs.find(x=>x.sig==='CAM');S.obj='rec';ex7();startCareer(c.id,'T','Posse',asstCandidates('Posse')[0]);ex();
for(let r=0;r<38;r++){if(!G.sponsor)G.sponsor=sponsorOffers()[0];startRound();while(!roundDone())stepAll();finishRound();}
const seen={},dups=[];G.clubs.forEach(cc=>cc.squad.forEach(id=>{if(seen[id])dups.push(id+':'+seen[id]+'/'+cc.sig+' club='+(P(id)&&P(id).club));else seen[id]=cc.sig}));
const free=G.free.filter(id=>G.clubs.some(cc=>cc.squad.includes(id))).length;
return 'dups '+dups.length+' '+dups.slice(0,5).join(', ')+' freeInSquad '+free+' round '+G.round})()`));

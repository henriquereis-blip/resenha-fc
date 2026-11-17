const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='PAL').id,'T','Direto',null);const o=[];
for(let g=0;g<200&&G.round<38;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();const lab=G._x?G._x.label:'liga';autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();const ur=G.lastRound.results.find(q=>q.u);o.push(lab.split(' · ')[0].slice(0,4)+':'+ur.hg+'-'+ur.ag)}
const cupAll=G.cup.hist.flatMap(s=>s.res.map(r=>r.hg+r.ag));
return o.join(' ')+' | cup goals avg '+(cupAll.reduce((a,b)=>a+b,0)/cupAll.length).toFixed(2)+' n='+cupAll.length})()`));
process.exit(0)

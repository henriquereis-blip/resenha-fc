const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='PAL').id,'T','Direto',null);const o=[];let W=0,D=0,L=0;
for(let g=0;g<80&&G.round<38;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();const u=G.lastRound.results.find(r=>r.u);const us=u.h===G.user;const gf=us?u.hg:u.ag,ga=us?u.ag:u.hg;if(gf>ga)W++;else if(gf<ga)L++;else D++;o.push(Math.round(G.sqc))}
return 'W'+W+' D'+D+' L'+L+' sqc '+o.join(',')+' pos '+(tableRows(0).findIndex(c=>c.id===G.user)+1)})()`));process.exit(0)

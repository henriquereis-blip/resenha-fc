const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='PAL').id,'T','Direto',null);const o=[];
for(let g=0;g<6;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();const m=R.ms[R.ui];o.push(m.h.club.sig+' '+m.hg+'-'+m.ag+' lineup '+m.h.lineup.length+' '+m.a.lineup.length+' ovr '+m.h.lineup.map(i=>P(i).ovr).join(',').slice(0,20)+' others '+R.ms.map(x=>x.hg+'-'+x.ag).join(' '));finishRound()}
return o.join('\\n')})()`));process.exit(0)

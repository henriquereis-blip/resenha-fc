const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='PAL').id,'T','Direto',null);let ug=0,og=0,un=0,on=0,ud=0;
for(let g=0;g<30;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();
R.ms.forEach((m,i)=>{if(i===R.ui){ug+=m.hg+m.ag;un++;if(m.hg===m.ag)ud++}else{og+=m.hg+m.ag;on++}});finishRound()}
return 'user goals/g '+(ug/un).toFixed(2)+' draws '+ud+'/'+un+' other '+(og/on).toFixed(2)+' ; mgrMatch '+typeof mgrMatch+' mgd mot '+mgd('mot')+' sqc '+G.sqc})()`));process.exit(0)

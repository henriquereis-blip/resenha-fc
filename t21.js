const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});const w=dom.window;
console.log(w.eval(`(function(){const o=[];S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='${process.argv[2]||'PAL'}').id,'T','Direto',null);
const E=()=>G.est;o.push(E().name+' N'+E().N+' '+E().type+' R'+E().sched.length+' Q'+E().Q+' ids '+E().ids.map(i=>C(i).name).join(','));
let labs=0;
for(let s=0;s<3;s++){
for(let g=0;g<90&&G.round<38;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();if(G._x&&G._x.kind==='est')labs++;autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();if(G.round>=38)break}
o.push('S'+s+' est '+E().name+' phase '+E().phase+' champ '+(E().champ!=null?C(E().champ).name:null)+' pos '+E().pos+' prize '+E().prize.toFixed(1)+' userEstGames '+labs+' lv '+G.estLv);
S.ctab='est';G.view='comp';S.modal=null;render();o.push('tab ok '+document.querySelectorAll('.gt').length);
endSeason();newSeason();o.push('next '+E().name+' lv '+G.estLv+' fc '+G.fc.length+' s '+E().s);labs=0}
return o.join('\\n')})()`));console.log('ERR',errs.slice(0,4));process.exit(0)

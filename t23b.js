const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});const w=dom.window;
console.log(w.eval(`(function(){const o=[];S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='${process.argv[2]||'FLA'}').id,'T','Direto',null);
for(let s=0;s<${process.argv[3]||5};s++){
 for(let g=0;g<120&&G.round<38;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();
  if(G.nt.pend&&!G.nt._seen){const pd=G.nt.pend;o.push('S'+G.season+' r'+G.round+' pend '+pd.type+' ids '+pd.ids.map(i=>P(i).name).join('/'));if(pd.type==='ami'||pd.type==='elim'){const id=pd.ids[0];if(id)ntAsk(id);o.push(' ask -> '+pd.neg[id])}G.nt._seen=1}
  autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound();if(!G.nt.pend)G.nt._seen=0;if(G.round>=38)break}
 o.push('S'+G.season+' away now '+userClub().squad.filter(i=>P(i).ntw>0).length+' q md '+G.nt.q.md+' BRA pos '+(ntQOrder().indexOf('BRA')+1)+' wcQ '+G.nt.wcQ);
 endSeason();newSeason()}
o.push(G.nt.log.slice(0,6).map(l=>l.t).join('\\n'));o.push(JSON.stringify(G.nt.hist));
S.ctab='sel';G.view='comp';S.modal=null;render();o.push('tab '+document.querySelectorAll('.pl').length+' '+document.querySelectorAll('.gt').length);
return o.join('\\n')})()`));console.log('ERR',errs.slice(0,5));process.exit(0)

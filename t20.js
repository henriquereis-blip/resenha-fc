const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const errs=[];const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.addEventListener('error',e=>errs.push(e.message));w.console.error=(...a)=>errs.push(a.join(' '))}});const w=dom.window;
const r=w.eval(`(function(){const o=[];
const clk=(a,d)=>{A[a](d||{});};
o.push(document.body.textContent.slice(0,80).replace(/\\n/g,'|'));
A.newgame();o.push('coach:'+(document.querySelector('.st20')?1:0));
A.step({v:'club'});o.push('club:'+document.querySelectorAll('.club').length);
const id=G.clubs.find(c=>c.sig==='SAO').id;A.pickclub({id});o.push('prev:'+document.querySelector('.pv20 .hd h2').textContent);
A.cpvt({v:'sq'});o.push('sqrows:'+document.querySelectorAll('.sq20 tbody tr').length);A.cpvt({v:'fin'});o.push('fin:'+document.querySelectorAll('.pv20 .res').length);
A.step({v:'setup'});A.pickphil({p:'Passe'});A.pickasst({i:0});S.obj=objOptions(C(id))[0].id;render();o.push('begin enabled:'+!document.querySelector('[data-a=begin]').disabled);
A.begin();S.modal=null;o.push('phase:'+G.phase+' sqc:'+G.sqc);
G.view='tatica';render();o.push('ap panel:'+!!document.querySelector('.ap20'));
A.apgo({m:'desc'});A.apgo({m:'jov'});A.apgo({m:'nota'});A.apon();
G.view='inicio';render();o.push('bar:'+/Confiança elenco/.test(document.body.innerHTML));
G.view='vest';render();o.push('vest card:'+/Confiança do elenco/.test(document.body.innerHTML));
G.view='liga';render();o.push('tone:'+/tbl lt0/.test(document.body.innerHTML));
G.view='opcoes';render();o.push('slots:'+document.querySelectorAll('[data-a=slsave]').length);
A.slsave({i:1});A.tomenu();o.push('menu:'+/Continuar carreira/.test(document.body.innerHTML)+' '+G.phase);
A.step({v:'saves'});o.push('slotrows:'+document.querySelectorAll('.sl20').length);
A.slload({i:1});o.push('loaded:'+G.phase+' '+userClub().sig);
for(let i=0;i<12;i++){if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound()}
o.push('sqc after 12:'+G.sqc+' cons:'+userClub().squad.slice(0,3).map(i=>P(i).cons));
return o.join('\\n')})()`);
console.log(r);console.log('ERRS',errs.slice(0,5));process.exit(0)

const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'T','Direto',null);ex();G.sponsor=sponsorOffers()[0];
const T=posTable30();o.push(T.to.join(' '));T.rows.forEach(r=>o.push(r.join(' ')));
A.leave();o.push('jobq '+JSON.stringify(G.jobq));
let der=0;for(let r=0;r<10;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();}
o.push('mails '+G.inbox.map(m=>m.kind).join(','));
const jm=G.inbox.find(m=>m.kind==='job'&&m.acts.length);if(jm){o.push(jm.body);const nm=C(jm.acts[0].p.id).name;A.mact({m:jm.id,k:0});o.push('now '+userClub().name+' (wanted '+nm+') phase '+G.phase+' sponsor '+(G.sponsor&&G.sponsor.inherited))}
o.push('presH '+JSON.stringify(G.pH.map(x=>x.name+'/'+x.pf+'/'+x.pr.t)));
S.modal={t:'posrules'};render();o.push('posrules html '+document.body.innerHTML.includes('Regras de posição'));
G.view='dir';S.modal=null;render();o.push('dir has pres '+document.body.innerHTML.includes('Presidentes'));
G.view='historia';render();o.push('hist has classicos '+document.body.innerHTML.includes('Clássicos'));
return o.join('\\n')})()`));console.log(errs.slice(0,6));process.exit(0)

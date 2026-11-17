const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '));w.addEventListener('error',e=>errs.push('WERR '+e.message))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'T','Direto',null);ex();
G.sponsor=null;
o.push('win '+JSON.stringify(winInfo()));
const c=userClub();const ids=c.squad.slice(12,15);ids.forEach(id=>A.plist({id}));
o.push('inbox after list '+G.inbox.length+' '+G.inbox.map(m=>m.title).join(' | '));
for(let r=0;r<6;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();}
o.push('round '+G.round+' offers '+G.offers.length+' inbox '+G.inbox.length);G.inbox.forEach(m=>o.push(' - '+m.kind+': '+m.title+' acts '+m.acts.length));
const off=G.inbox.find(m=>m.kind==='nooffer');
if(off){const n0=userClub().squad.filter(id=>P(id).listed).map(id=>P(id).ask);A.mact({m:off.id,k:0});o.push('cut '+n0+' -> '+userClub().squad.filter(id=>P(id).listed).map(id=>P(id).ask))}
const of2=G.inbox.find(m=>m.kind==='offer'&&m.acts.length);if(of2){const cx=G.fin.caixa;A.mact({m:of2.id,k:0});o.push('sold: caixa '+cx+' -> '+G.fin.caixa)}
S.modal={t:'inbox'};render();o.push('inbox html '+document.body.innerHTML.includes('Caixa de entrada')+' bar '+!!document.querySelector('.mbar'));
if(G.inbox[0]){S.modal={t:'inbox',id:G.inbox[0].id};render();}
// patrocínio
S.modal=null;G.sponsor=null;S.modal={t:'sponsor'};A.pickspon({i:0});S.spYrs=3;A.spnmode({m:'parc'});o.push('sponsor '+JSON.stringify([G.sponsor.fixed,G.sponsor.yrs,G.sponsor.until,G.season]));
S.modal={t:'sponsor'};o.push('locked modal '+vModal().includes('travado'));
G.mk.open={slot:'manga'};S.spYrs=1;A.mkpick({s:'manga',i:0});A.mkmode({m:'parc'});o.push('slot '+JSON.stringify([G.mk.slots.manga.until,G.mk.slots.manga.val]));
A.mkopen({s:'manga'});o.push('slot lock '+S.modal.t);
G.view='marketing';S.modal=null;render();o.push('mkt has contratos '+document.body.innerHTML.includes('Contratos')+' naming '+document.body.innerHTML.includes('Naming rights do estádio'));
// temporada
G.round=38;endSeason();const sp0=G.sponsor.name;newSeason();G.phase='play';o.push('after newSeason sponsor kept '+(G.sponsor&&G.sponsor.name===sp0)+' manga '+(G.mk.slots.manga&&G.mk.slots.manga.until));
for(let s=0;s<3;s++){G.round=38;endSeason();newSeason()}
o.push('3 seasons later sponsor '+(G.sponsor?G.sponsor.name:null)+' manga '+(G.mk.slots.manga?1:0));
// takeJob
const other=G.clubs.find(x=>x.id!==G.user&&x.div===0);takeJob(other.id);o.push('takeJob sponsor '+(G.sponsor&&G.sponsor.inherited)+' slots '+Object.values(G.mk.slots).filter(Boolean).length);
// copinha
o.push('cp shown '+G.cp.cur.shown);
return o.join('\\n')})()`));console.log(errs.slice(0,8));process.exit(0)

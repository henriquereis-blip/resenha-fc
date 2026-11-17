const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'T','Direto',null);ex();G.sponsor=sponsorOffers()[0];
const c=userClub();
// cansa todos os zagueiros titulares e confere que modo descansados mantém zagueiros
c.squad.map(id=>P(id)).forEach(p=>{if(p.pos==='DEF')p.en=30;else p.en=95});
autoPickMode(c,'desc',75);
const xi=c.squad.slice(0,11).map(id=>P(id));o.push('desc XI pos '+xi.map(p=>p.pos+(p.pos==='DEF'?'/'+p.en:'')).join(' '));
// sem goleiro reserva etc: tira todos os atacantes e vê se improvisa
const atk=c.squad.filter(id=>P(id).pos==='ATA');atk.slice(1).forEach(id=>{P(id).inj=5});autoPick(c);
o.push('xi ATA count '+c.squad.slice(0,11).filter(id=>P(id).pos==='ATA').length+' formation '+c.formation);
for(let r=0;r<12;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();}
o.push('dir mails '+G.inbox.filter(m=>m.kind==='dir').map(m=>m.title).join(' | '));
const dm=G.inbox.find(m=>m.kind==='dir');if(dm){o.push(dm.body);}
o.push('slot4 '+(!!localStorage.getItem(slotKey(4)))+' _t '+(/"_t":\\d+/.test(localStorage.getItem(SAVE_KEY))));
R=R||null;
return o.join('\\n')})()`));console.log(errs.slice(0,6));process.exit(0)

const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';
startCareer(1,'T','Direto',null);ex();const dm=Math.max(...G.clubs.map(c=>c.div));const low=G.clubs.filter(c=>c.div===dm).sort((a,b)=>a.rep-b.rep)[3];startCareer(low.id,'T','Direto',null);ex();
const c=userClub();o.push('clube '+c.name+' rep '+c.rep+' div '+c.div+' cap '+coachCap34(true).toFixed(1));
let mx=0,names=new Set();for(let i=0;i<200;i++){jobOffers(true).forEach(id=>{mx=Math.max(mx,C(id).rep);names.add(C(id).name)})}
o.push('maxrep ofertado '+mx+' ; clubes distintos '+names.size);
const topc=G.clubs.slice().sort((a,b)=>b.rep-a.rep)[0];o.push('top '+topc.name+' rep '+topc.rep+' ofertado? '+names.has(topc.name));
// email persistência
mail('info','Contrato expira','Fulano termina contrato',[], 'x');
for(let r=0;r<12;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();}
o.push('contrato ainda no inbox: '+G.inbox.some(m=>m.title==='Contrato expira')+' total '+G.inbox.length);
return o.join('\\n')})()`));console.log(errs.slice(0,6));process.exit(0)

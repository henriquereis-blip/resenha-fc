const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='FLA').id,'T','Direto',null);ex();
for(const f of ['4-4-2','4-3-3','4-2-3-1','3-5-2','5-3-2','3-4-3','4-1-4-1'])o.push(f+' '+wantsOf(f).join(' '));
const c=userClub();c.formation='4-2-3-1';autoPick(c);o.push(c.squad.slice(0,11).map((id,i)=>wantsOf(c.formation)[i]+':'+lastName(P(id).name)+'('+roleLabel(P(id))+footOf(P(id))+')').join(' | '));
const cnt={};for(const p of Object.values(G.players)){const s=subOf(p);cnt[s]=(cnt[s]||0)+1}o.push(JSON.stringify(cnt));
const lat=Object.values(G.players).filter(p=>p.role==='LAT');o.push('LE foot E '+lat.filter(p=>p.sub==='LE'&&p.foot==='E').length+'/'+lat.filter(p=>p.sub==='LE').length);
S.modal=null;G.view='tatica';render();o.push('tatica ok '+document.querySelectorAll('.tok').length+' '+document.querySelectorAll('.wt').length);
return o.join('\\n')})()`));console.log(errs.slice(0,4));process.exit(0)

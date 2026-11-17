const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();
for(let s=0;s<6;s++){for(let r=0;r<40&&!G.summary;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();if(G.summary||G.phase==='end')break}
 if(!G.summary)endSeason();newSeason();}
const L=coachRank('geral');const by={};L.forEach(x=>{const d=G.clubs[x.id].div;(by[d]=by[d]||[]).push(x.tot)});
Object.keys(by).forEach(d=>{const a=by[d].sort((x,y)=>y-x);o.push('div '+d+' n='+a.length+' max '+a[0]+' mediana '+a[a.length>>1])});
o.push(L.slice(0,8).map(x=>x.name+' '+x.sig+'(d'+G.clubs[x.id].div+') '+x.tot).join(' | '));
return o.join('\\n')})()`));console.log(errs.slice(0,6));process.exit(0)

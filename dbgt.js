const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='CHA').id,'T','Direto',null);const me=userClub();
 const r=[];for(const c of [me,G.clubs[0],G.clubs[10]]){autoPick(c);r.push([c.sig,strength(c).toFixed(1),c.squad.length,c.squad.slice(0,11).map(id=>P(id).pos+P(id).ovr+(P(id).inj?'i':'')).join(' ')])}
 let pts=0;for(let i=0;i<30;i++){const op=G.clubs[i%19+1===me.id?0:i%19+1];const m=simFast(me,op);pts+=m.hg>m.ag?3:m.hg===m.ag?1:0}
 return JSON.stringify([r,pts/30])})()`));process.exit(0)

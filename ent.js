const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window,ev=s=>w.eval(s);
ev(`startCareer(${ev("G.clubs.find(c=>c.sig==='COR').id")},'T','Direto',null)`);
const r=ev(`(function(){const out=[];for(let i=0;i<38;i++){startRound();
 const ens=R.ms.flatMap(m=>[...m.h.lineup,...m.a.lineup].map(id=>P(id).en));const u=userClub();const ue=R.ms[R.ui][userSide(R.ms[R.ui])].lineup.map(id=>P(id).en);
 out.push([Math.round(ens.reduce((a,b)=>a+b,0)/ens.length),Math.round(ue.reduce((a,b)=>a+b,0)/ue.length)]);
 while(!roundDone())stepAll();finishRound();}return out})()`);
console.log(r.map(x=>x.join('/')).join(' '));process.exit(0)

const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/'});
const w=dom.window;
console.log(w.eval(`(function(){const c=G.clubs.find(x=>x.sig==='COR');S.obj='equ';startCareer(c.id,'T','Posse',asstCandidates('Posse')[0]);ex();
 const out=G.clubs.map(x=>[x.sig,x.rep,x.cap,x.tv,x.spBase,+(x.humor),strength(x).toFixed(1)].join(' ')).join('\\n');
 return out+'\\n'+JSON.stringify(G.fin)+'\\n'+JSON.stringify(sponsorOffers()[0])+'\\n'+JSON.stringify(Object.keys(userClub()))+'\\n'+budgetFor.toString().slice(0,600)})()`));
process.exit(0)

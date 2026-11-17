const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/'});
console.log(dom.window.eval(`(function(){const c=G.clubs.find(x=>x.sig==='COR');S.obj='equ';S.mg=mgNew('gestor');startCareer(c.id,'T','Direto',asstCandidates('Direto')[0]);ex();
 for(let i=0;i<4;i++){startRound();while(!roundDone())stepAll();finishRound()}
 const u=userClub();const mine=u.squad.map(P).filter(p=>p.age<=22).sort((a,b)=>b.pot-a.pot)[0]||P(u.squad[25]);
 const n0=u.squad.length;const r1=loanOut(mine.id,0);
 const lo=Object.values(G.players).filter(p=>p.loanable&&p.club>=0&&p.club!==G.user)[0];const r2=lo?loanIn(lo.id):'none';
 const mid=u.squad.length;
 let dbg='';for(let r=0;r<34;r++){try{startRound()}catch(e){dbg=r+' '+G.clubs.filter(c=>c.squad.some(id=>!P(id))).map(c=>c.sig+':'+c.squad.map((id,i)=>P(id)?'':i+'#'+id).join(',')).join(' | ');break};while(!roundDone())stepAll();finishRound()}
 if(dbg)return dbg;
 const sizes=[n0,mid];
 newSeason();const bad=G.clubs.filter(c=>c.squad.some(id=>!P(id))).map(c=>c.sig+':'+c.squad.filter(id=>!P(id)).join('/')+' sz'+c.squad.length);
 return JSON.stringify({bad,r1,r2,sizes,after:userClub().squad.length,back:P(mine.id).club===G.user,loanLeft:Object.values(G.players).filter(p=>p.loan).length,lvl:G.mgr.lvl,xp:G.mgr.xp,caixa:G.fin.caixa})})()`));
process.exit(0)

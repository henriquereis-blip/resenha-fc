const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const cfgs={equil:null,mago:{tat:9,mot:3,tre:3,bas:3,fin:3,mer:3,mid:3},fraco:{tat:1,mot:4,tre:4,bas:4,fin:4,mer:4,mid:4}};
const W=+process.argv[2]||10;const res={};
for(const k in cfgs){let pts=[],cx=[];
 for(let w0=0;w0<W;w0++){
  const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/'});
  const r=JSON.parse(dom.window.eval(`(function(){const c=G.clubs.find(x=>x.sig==='CAP');S.obj='equ';S.mg=mgNew('equil');${cfgs[k]?`S.mg.a=${JSON.stringify(cfgs[k])};`:''}startCareer(c.id,'T','Direto',asstCandidates('Direto')[0]);ex();G.sponsor=sponsorOffers()[0];
   for(let r=0;r<38;r++){startRound();while(!roundDone())stepAll();finishRound()}
   const u=userClub();return JSON.stringify({p:u.P,cx:G.fin.caixa})})()`));
  pts.push(r.p);cx.push(r.cx);dom.window.close()}
 const m=a=>a.reduce((x,y)=>x+y,0)/a.length;res[k]={pts:+m(pts).toFixed(1),caixa:+m(cx).toFixed(1)};}
console.log(JSON.stringify(res));process.exit(0)

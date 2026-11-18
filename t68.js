const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["NED",4],["BEL",5],["TUR",6],["SCO",4]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()}
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(k,await T(()=>userClub().name+' tier'+tierOf(userClub().div)+' NR='+NR()+' clubs='+G.clubs.slice(BRN).length+' pyrL='+(G.pyr?G.pyr.L.length:0)));
for(let s=0;s<3;s++){
 const r=await T(()=>{let g=0,out;while(g++<140){out=ro();if(out==='seasonEnd')break}
  const u=userClub();const res='T'+G.season+' '+u.name+' div'+u.div+' pos?'+(typeof posOf==='function'?posOf(u.id):'')+' J='+u.J+' P='+u.P;
  endSeason();newSeason();G.phase='play';render();return res+' -> '+userClub().name+' tier'+tierOf(userClub().div)});
 console.log(r);if(!r)break}
const j=await T(()=>{G=JSON.parse(JSON.stringify(G));render();return 'json ok '+userClub().name});console.log(j);
await T(()=>{const W=wd();return wSA().length});
console.log(k,'lib',await T(()=>wSA().filter(x=>['PAR','ECU','PER','BOL','VEN'].some(c=>wd().lg[c].cl.some(y=>y.n===x.n))).map(x=>x.n).join(',')));
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

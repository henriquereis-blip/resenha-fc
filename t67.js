const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx,boost] of [["ENG",5,1],["ESP",8,1],["ITA",10,0],["GER",8,1],["FRA",8,0],["POR",5,1],["ARG",10,1]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx,boost])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.BO=boost;window.bst=()=>{if(!window.BO)return;for(const id of userClub().squad){const q=P(id);q.ovr=99;for(const a in q.at)q.at[a]=99;q.en=100;q.inj=0}}
 window.ro=()=>{G.board.conf=95;bst();startRound();const x=G._x&&G._x.kind==='nc'?G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x,note:G.lastRound&&G.lastRound.cup&&G.lastRound.cup.note}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx,boost]);
console.log(k,await T(()=>userClub().name+' tier'+tierOf(userClub().div)));
for(let s=0;s<3;s++){
 const r=await T(()=>{let po=[],g=0,out,maxJ=0;
  while(g++<140){const r=ro();if(r.x)po.push(r.x.replace(/^.*· /,'')+(r.note?'→'+r.note.slice(0,40):''));out=r.o;maxJ=Math.max(maxJ,userClub().J);if(out==='seasonEnd')break}
  const nc=G.nc,res='T'+G.season+' '+(nc?nc.name+' size'+nc.size+' champ='+(nc.champ!=null?nm52(nc.champ):'?')+' out='+nc.out:'sem copa')+' jogos='+po.length+' maxJ='+maxJ+' NR='+NR()+' left='+!!G._lg+'\n   '+po.join(' | ');
  endSeason();newSeason();G.phase='play';return res});
 console.log(r);if(!r)break}
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

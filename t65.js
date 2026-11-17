const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["ESP",19],["ENG",16]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();const x=G._x&&G._x.kind==='po51'?G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x,note:G.lastRound&&G.lastRound.cup&&G.lastRound.cup.note}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(k,await T(()=>userClub().name+' tier'+tierOf(userClub().div)));
for(let s=0;s<7;s++){
 const r=await T(()=>{const t0=tierOf(userClub().div);let po=[],g=0,out;
  while(g++<140){const r=ro();if(r.x)po.push(r.x.replace(/^.*· /,'')+(r.note?'→'+r.note:''));out=r.o;if(out==='seasonEnd')break}
  const left=!!G.po51,pos=posOf(userClub()),nr=NR();endSeason();const mv=(G.moves||[]).filter(m=>m.id===G.user).map(m=>m.from+'>'+m.to);
  const forcedLeft=!!(G.pyr&&G.pyr.forced);
  const res='T'+G.season+' tier'+t0+' pos'+pos+' po='+po.length+' '+po.join(' | ')+' left='+left+' NR'+nr+' forcedLeft='+forcedLeft+' moves='+mv+' pyrlog='+((G.pyr.log||[]).filter(x=>/acesso/.test(x)).slice(0,1).join('').slice(0,90));
  newSeason();G.phase='play';return res});
 console.log(r);if(!r)break}
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["FRA",14],["GER",15]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();const x=G._x&&G._x.kind==='po51'?G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x,note:G.lastRound&&G.lastRound.cup&&G.lastRound.cup.note}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
for(let s=0;s<6;s++){
 const r=await T(()=>{const t0=tierOf(userClub().div);let po=[],g=0,out;
  while(g++<140){ if(t0===2&&G.round===NR()-1){const rows=allRows(userClub().div),c=userClub();c.P=rows[2].P+(rows[2]===c?0:1)} const r=ro();if(r.x)po.push(r.x.replace(/^.*· /,'')+(r.note?'→'+r.note:''));out=r.o;if(out==='seasonEnd')break}
  const pos=posOf(userClub());const left=!!G.po51;endSeason();const mv=(G.moves||[]).filter(m=>m.id===G.user).map(m=>m.from+'>'+m.to);
  const res='T'+G.season+' tier'+t0+' pos'+pos+' po='+po.length+' '+po.join(' | ').slice(0,200)+' left='+left+' f2='+!!(G.pyr.forced2)+' moves='+mv;
  newSeason();G.phase='play';return res});
 console.log(r);if(!r)break}
await p.close()}
console.log([...new Set(errs)].slice(0,10));await b.close()})();

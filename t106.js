const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["AUT",5],["SUI",4],["GRE",6],["DEN",5]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log(k,'FALHA',e.message.slice(0,200));return null}};
await T(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()}
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id)},[k,idx]);
console.log(k,await T(()=>userClub().name+' tier'+tierOf(userClub().div)+' NR='+NR()+' clubs='+G.clubs.slice(brn()).length+' pyrL='+(G.pyr?G.pyr.L.length:0)+' league='+DIVN[userClub().div]));
for(let s=0;s<3;s++){
 const r=await T(()=>{let g=0,out;while(g++<140){out=ro();if(out==='seasonEnd')break}
  const u=userClub();const res='T'+G.season+' '+u.name+' div'+u.div+' J='+u.J+' P='+u.P+' cup='+(G.nc?JSON.stringify(G.nc).length:0);
  endSeason();newSeason();G.phase='play';render();return res+' -> '+userClub().name+' tier'+tierOf(userClub().div)});
 console.log(r);if(!r)break}
console.log(k,await T((k)=>{G=JSON.parse(JSON.stringify(G));render();const W=wd();const h=W.hist[W.hist.length-1]||{};return 'json ok '+userClub().name+' ucl='+h.ucl+' uel='+h.uel+' cupNome='+(NCUP[k]||[])[1]},k));
await p.close()}
console.log('ERROS',[...new Set(errs)].slice(0,10));await b.close()})();

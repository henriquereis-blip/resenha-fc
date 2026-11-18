const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["NED",4],["BEL",5],["TUR",6],["SCO",4],["JPN",5],["KOR",3],["CHN",4],["AUS",4],["EGY",3],["MAR",5],["RSA",4],["PAR",3],["ECU",5],["PER",6],["BOL",4],["VEN",5]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(200);
const r=await p.evaluate(([k,idx])=>{try{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id);const out=[];
 for(let s=0;s<2;s++){let g=0;while(g++<80){if(ro()==='seasonEnd')break}const n=G.nc;out.push(n?n.name+' size'+n.size+' champ='+(n.champ!=null)+' out='+n.out+' st'+n.st:'sem copa');endSeason();newSeason();G.phase='play'}
 G=JSON.parse(JSON.stringify(G));render();return out.join(' | ')}catch(e){return 'ERRO '+e.message}},[k,idx]);
console.log(k,r);await p.close()}
console.log([...new Set(errs)].slice(0,8));await b.close()})();

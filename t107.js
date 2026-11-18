// t107: todos os países de fora (menos ENG/SEL/MEX/USA/AUS): 3 temporadas, conservação de clubes por divisão, nomes únicos, divisão-reserva escondida, 0 erro
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];let bad=0;
const KS=(process.argv[2]||'ESP,ITA,GER,FRA,POR,ARG,JPN,SCO,URU,COL,CHI,KSA,NED,BEL,TUR,PAR,ECU,PER,KOR,CHN,RSA,AUT,SUI,GRE,DEN,BOL,VEN,EGY,MAR').split(',');
for(const k of KS){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(250);
const T=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){bad++;console.log(k,'FALHA',e.message.slice(0,160));return null}};
await T(([k])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};
 window.cnt=()=>{const m={};for(const c of G.clubs.slice(brn()))if(!c.stub&&c.div>=4&&c.div<99)m[c.div]=(m[c.div]||0)+1;for(const s of (G.pyr?G.pyr.L:[]))m[s.div]=(m[s.div]||0)+1;return JSON.stringify(m)};
 window.dups=()=>{const n=[...G.clubs.slice(brn()).filter(c=>!c.stub&&c.div>=4&&c.div<99).map(c=>c.name),...G.pyr.L.map(s=>s.n)];return n.length-new Set(n).size};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[Math.min(5,wd().lg[k].cl.length-1)].id)},[k]);
const c0=await T(()=>cnt()+' dups='+dups()+' tiers='+PYR[G.pyr.k].length+' res='+PYR[G.pyr.k].filter(t=>t.res).length);
let line=k+' '+c0;
for(let s=0;s<3;s++){
 const r=await T(()=>{let g=0,out;while(g++<160){out=ro();if(out==='seasonEnd')break}
  endSeason();newSeason();G.phase='play';render();return cnt()+' d='+dups()+' u='+tierOf(userClub().div)});
 line+=' | '+r;if(!r)break}
const tabs=await T(()=>{S.tab&&0;const h=vLiga();return (h.match(/data-a="abd"/g)||[]).length+'/'+G.pyr.dv.length});
console.log(line+' | abas='+tabs);
await T(()=>{G=JSON.parse(JSON.stringify(G));render();return 1});
await p.close()}
console.log('FALHAS',bad,'ERROS',[...new Set(errs)].slice(0,10));await b.close()})();

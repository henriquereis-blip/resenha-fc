const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,nm] of [['ESP','Real Madrid'],['KSA','Al-Hilal'],['ARG','Boca Juniors'],['MEX','Club América'],['ITA','Napoli'],['ENG','Arsenal'],['POR','Porto']]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const r=await p.evaluate(([k,nm])=>{const o={};localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};
 ro();ro();
 const lc=wd().lg[k].cl.find(c=>c.n===nm);emigrate(lc.id);const u=userClub();
 o.sq=u.name+' n='+u.squad.length+' reais='+u.squad.filter(id=>P(id).real).length+' top='+u.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr).slice(0,3).map(p=>p.name+p.ovr).join(',');
 for(let i=0;i<4;i++)ro();
 G.view='elenco';render();
 return o},[k,nm]);
console.log(k,JSON.stringify(r));await p.close()}
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(JSON.stringify(await p.evaluate(()=>{const o={};localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const L=wd().lg.ENG.cl.find(c=>c.n==='Arsenal');S.wt={k:'ENG',id:L.id};G.view='times';render();
 o.times=document.querySelector('.plist').innerText.split('\n').slice(0,8).join(' | ');o.foot=document.querySelector('.foot').innerText.slice(0,50);
 wmRefresh();o.mk=wd().mk.l.slice(0,8).map(p=>p.n+'/'+p.club+'/'+p.ovr).join(', ');return o})));
console.log('ERROS',[...new Set(errs)].slice(0,8));await b.close()})();

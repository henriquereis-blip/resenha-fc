const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(900);
const shot=async n=>{await p.waitForTimeout(200);await p.screenshot({path:'mp_'+n+'.png'})};
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');G.phase='start';S.step='mpl';render();document.getElementById('mps_names').value='Henrique, Rafa, Lipe';A.mpsnew();
 for(const club of [3,5,9]){A.pickclub({id:club});S.sp='Direto';S.asst=asstCandidates('Direto');S.sa=0;S.obj='equ';A.begin()}
 window.playUntilReady=()=>{for(let g=0;g<40;g++){if(MPH)A.mphand();if(!G.sponsor)G.sponsor={name:'Patro',fixed:12,pay:12,topN:4,topBonus:2,titleBonus:5};
   A.play();if(S.match&&R&&!R.mpg){clearInterval(S.timer);S.paused=false;S.panel=false;while(!roundDone())stepAll();A.mend();A.roundok();continue}break}};
 for(let i=0;i<3;i++)playUntilReady()});
await p.evaluate(()=>{clearInterval(S.timer);while(R.ms[R.uis[0]].min<45)stepAll();S.paused=true;S.panel=true;render()});
await shot('8_intervalo_passa');
await p.click('[data-a="mphand"]');await shot('9_intervalo_painel');
await p.evaluate(()=>{A.mgo()});await p.click('[data-a="mphand"]');await p.evaluate(()=>{A.mgo()});await p.click('[data-a="mphand"]');await p.evaluate(()=>{A.mgo()});
await p.evaluate(()=>{clearInterval(S.timer);S.paused=false;S.panel=false;while(!roundDone())stepAll();A.mend()});
await shot('10_fim_rodada');
console.log(errs.slice(0,5));await b.close()})();

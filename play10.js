const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 for(const s of ['[data-a="pickclub"][data-id="0"]','[data-a="pickphil"]','[data-a="pickasst"]','[data-a="pickobj"]','[data-a="begin"]','[data-a="pickspon"]'])await p.click(s);
 const log=[];
 for(let i=0;i<10;i++){
  const t0=Date.now();
  // tática: confere se cabe sem rolar
  await p.click('.nav2 [data-v="tatica"]');await p.waitForTimeout(150);
  const fit=await p.evaluate(()=>{const pt=document.querySelector('.pitch').getBoundingClientRect();return {scroll:document.documentElement.scrollHeight>innerHeight+2,pitchBottom:pt.bottom|0,vh:innerHeight}});
  if(i===4)await p.screenshot({path:'a_tatica.png'});
  await p.click('.nav2 [data-v="inicio"]');
  await p.click('[data-a="play"]');
  let half=false,shots=0;
  const t1=Date.now();
  while(true){
    await p.waitForTimeout(500);
    const st=await p.evaluate(()=>({panel:!!document.querySelector('.ph'),done:!!document.querySelector('[data-a="mend"]'),pen:!!document.querySelector('.pen')}));
    if(i===2&&shots===0&&!st.panel){await p.waitForTimeout(3500);await p.screenshot({path:'a_jogo.png'});shots=1}
    if(st.panel){half=true;if(i===2)await p.screenshot({path:'a_inter.png'});await p.click('[data-a="mgo"]');}
    if(st.done)break;
    if(Date.now()-t1>90000){log.push('TIMEOUT');break}
  }
  const dur=(Date.now()-t1)/1000;
  const sc=await p.evaluate(()=>{const m=R.ms[R.ui];return {h:m.h.club.sig,a:m.a.club.sig,hg:m.hg,ag:m.ag,ev:m.ev.length,pen:m.ev.filter(e=>e.pen).length,red:m.ev.filter(e=>e.type==='red').length,yc:m.ev.filter(e=>e.type==='yellow').length,sh:m.stats.sh+m.stats.sa}});
  await p.click('[data-a="mend"]');await p.waitForTimeout(200);
  if(i===2)await p.screenshot({path:'a_fim.png'});
  const modalTxt=await p.evaluate(()=>document.body.innerText.slice(0,0));
  await p.click('[data-a="roundok"]').catch(()=>{});await p.waitForTimeout(200);
  // possíveis modais extras
  for(const s of ['[data-a="pickspon"]','[data-a="achok"]'])if(await p.$(s))await p.click(s).catch(()=>{});
  const pos=await p.evaluate(()=>({pos:posOf(userClub()),pts:userClub().P,caixa:G.fin.caixa.toFixed(1),conf:Math.round(G.board.conf),press:!!G.press,ach:Object.keys(G.ach).length}));
  log.push({r:i+1,...sc,dur,half,fit,...pos});
  if(await p.$('[data-a="press"]'))await p.click('[data-a="press"][data-i="0"]').catch(()=>{});
 }
 console.log(JSON.stringify(log,null,0).replace(/\},\{/g,'},\n{'));console.log('errs',errs);
 await b.close();
})();

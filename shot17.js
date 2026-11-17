const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
 const b=await chromium.launch();const errs=[];const man=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 // stats: gerar muitas perguntas
 const st=await p.evaluate(()=>{const seen=new Set();let n=0,tones={};
  for(let i=0;i<30;i++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();
   if(G.press){n++;seen.add(G.press.q);G.press.opts.forEach(o=>tones[o.tone]=(tones[o.tone]||0)+1);
    if(i%3===2)answerPress(-1);else answerPress(Math.floor(Math.random()*G.press.opts.length))}}
  return {n,uniq:seen.size,tones,silence:G.jr.silence,moods:G.jr.reps.map(r=>r.mood),approx:jrCount(),sample:[...seen].slice(0,6)}});
 console.log(JSON.stringify(st,null,1));
 // novo cenário para screenshot: forçar pergunta aberta
 await p.evaluate(()=>{G.press=null;startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();if(!G.press){genPress(R.ms[R.ui])}
   if(!G.press){G.round++;}S.paper=true;render();window.scrollTo(0,0)});
 await p.waitForTimeout(200);await p.screenshot({path:'p5/01_jornal.png'});
 await p.evaluate(()=>{window.scrollTo(0,99999)});await p.waitForTimeout(100);await p.screenshot({path:'p5/02_jornal_meio.png'});
 await p.evaluate(()=>{A.repopen({i:2})});await p.waitForTimeout(100);await p.evaluate(()=>{window.scrollTo(0,0)});await p.screenshot({path:'p5/03_imprensa.png'});
 console.log('errs',errs);await b.close();
})();

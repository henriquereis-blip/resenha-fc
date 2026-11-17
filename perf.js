const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const T=(f,n=1)=>{const t=performance.now();for(let i=0;i<n;i++)f();return +((performance.now()-t)/n).toFixed(1)};
 const o={};
 o.saveMs=T(()=>save(),3);o.saveKB=Math.round(JSON.stringify(G).length/1024);
 for(const v of ['inicio','tatica','liga','mercado','clube','comp','tecnicos','historia','times']){G.view=v;o['render_'+v]=T(()=>render(),3)}
 G.view='inicio';
 o.round=T(()=>{startRound();while(!roundDone())stepAll();finishRound();ex()},3);
 // ações de clique
 o.clickPlay=0;return JSON.stringify(o)}));console.log(errs);await b.close()})();

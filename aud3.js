const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 for(let i=0;i<6;i++){startRound();while(!roundDone())stepAll();finishRound();ex()}G.phase='play';S.modal=null;
 window.__snap=JSON.stringify(G);window.__s=JSON.stringify(S);window.__restore=()=>{G=JSON.parse(window.__snap);const s=JSON.parse(window.__s);for(const k of Object.keys(S))delete S[k];Object.assign(S,s)}});
const views=['inicio','tatica','liga','mercado','clube','times','agenda','estadio','juniores','base','meutec','medico','dir','treino','vest','assist','staff','comp','marketing','torcida','tecnicos','historia'];
const out=[];
for(const v of views){
  await p.evaluate(v=>{__restore();G.view=v;render()},v);
  const subs=await p.evaluate(()=>{const o=[];document.querySelectorAll('[data-a]').forEach(e=>{const a=e.dataset.a;if(/^(tab|ctab|lig|cdiv|hs|rk|rs|wc)$/.test(a))o.push({a,d:{...e.dataset},t:e.textContent.trim().slice(0,22)})});return o});
  const seen=new Map();
  for(const s of subs){
    const h=await p.evaluate(([v,s])=>{__restore();G.view=v;render();const e=[...document.querySelectorAll('[data-a="'+s.a+'"]')].find(x=>JSON.stringify({...x.dataset})===JSON.stringify(s.d));if(!e)return 'noel';e.click();
      const m=document.querySelector('#app');const body=[...m.children].filter(x=>!x.matches('.top2,.nav2')).map(x=>x.outerHTML).join('');
      // remove marcação de aba ativa pra comparar só o conteúdo
      const clean=body.replace(/class="on"/g,'class=""').replace(/class="seg[^"]*"/g,'');
      return body.length+':'+clean.split('').reduce((h,c)=>(h*31+c.charCodeAt(0))|0,0)},[v,s]);
    out.push([v,s.a+':'+(s.d.t||s.d.v||s.d.k||''),s.t,h]);
    if(seen.has(h))out.push(['  ⚠ IGUAL A',v,s.t,'=',seen.get(h)]);else seen.set(h,s.t)}}
console.log(out.filter(x=>x[0]==='  ⚠ IGUAL A').map(x=>x.slice(1).join(' ')).join('\n')||'nenhuma aba repetida');
console.log(out.filter(x=>x[3]==='noel').length,'sem elemento');console.log('erros',errs);await b.close()})();

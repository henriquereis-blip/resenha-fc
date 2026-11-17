const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text().slice(0,160))});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 // joga 6 rodadas pra ter dados
 for(let i=0;i<6;i++){startRound();while(!roundDone())stepAll();const o=finishRound();ex()}
 G.phase='play';S.modal=null;S.prof=null;S.paper=false;window.__snap=JSON.stringify(G);window.__s=JSON.stringify(S);
 window.__restore=()=>{G=JSON.parse(window.__snap);const s=JSON.parse(window.__s);for(const k of Object.keys(S))delete S[k];Object.assign(S,s)};
 window.__sig=()=>document.body.innerHTML.length+'|'+document.body.innerHTML.slice(0,3000).split('').reduce((h,c)=>(h*31+c.charCodeAt(0))|0,0)+'|'+JSON.stringify(G).length+'|'+JSON.stringify(S).length+'|'+(document.querySelector('.toast')?document.querySelector('.toast').textContent:'')});
const SKIP=new Set(['reset','wipe','play','leave','resign','expfile','impfile','newseason','takejob','fire','firedgo','save','load','delslot','expcloud','impcloud']);
const views=await p.evaluate(()=>['inicio','tatica','liga','mercado','clube','times','agenda','estadio','juniores','base','meutec','medico','dir','treino','vest','assist','staff','comp','marketing','torcida','tecnicos','historia','opcoes','conquistas']);
const dead=[];let total=0;
for(const v of views){
  await p.evaluate(v=>{__restore();G.view=v;render()},v);
  // sub-abas
  const subs=await p.evaluate(()=>{const o=[];document.querySelectorAll('[data-a]').forEach(e=>{const a=e.dataset.a;if(/^(tab|ctab|lig|cdiv|pg|sort|wc|mtab|stab|ttab)$/.test(a))o.push([a,{...e.dataset}])});return o});
  const states=[[null]].concat(subs.map(s=>[s]));
  for(const st of states){
    await p.evaluate(([v,st])=>{__restore();G.view=v;render();if(st){const e=[...document.querySelectorAll('[data-a="'+st.a+'"]')].find(x=>JSON.stringify({...x.dataset})===JSON.stringify(st.d));if(e)e.click()}},[v,st[0]?{a:st[0][0],d:st[0][1]}:null]);
    const btns=await p.evaluate(()=>{const seen={};const o=[];[...document.querySelectorAll('[data-a]')].forEach((e,i)=>{const k=e.dataset.a+'|'+(e.dataset.t||e.dataset.v||e.dataset.how||e.dataset.m||'');seen[k]=(seen[k]||0)+1;if(seen[k]<=2)o.push({i,a:e.dataset.a,txt:(e.textContent||'').trim().slice(0,28),dis:e.disabled||false})});return o});
    for(const bt of btns){
      if(SKIP.has(bt.a)||bt.dis)continue;total++;
      const r=await p.evaluate(([v,st,i])=>{__restore();G.view=v;render();
        if(st){const e=[...document.querySelectorAll('[data-a="'+st.a+'"]')].find(x=>JSON.stringify({...x.dataset})===JSON.stringify(st.d));if(e)e.click()}
        const el=document.querySelectorAll('[data-a]')[i];if(!el)return 'gone';
        const s0=__sig();let err=null;try{el.click()}catch(e){err=e.message}
        const s1=__sig();return err?'ERR '+err:(s0===s1?'DEAD':'ok')},[v,st[0]?{a:st[0][0],d:st[0][1]}:null,bt.i]);
      if(r!=='ok')dead.push(v+(st[0]?' ['+st[0][0]+':'+JSON.stringify(st[0][1])+']':'')+' → '+bt.a+' "'+bt.txt+'" '+r)}
  }}
console.log('cliques',total);console.log(dead.join('\n'));console.log('erros página:',[...new Set(errs)].slice(0,15));await b.close()})();

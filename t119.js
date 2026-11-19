const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file:///home/claude/resenha-fc/index.html');await p.waitForTimeout(500);
const ok=[];const chk=(n,c)=>ok.push(n+':'+(c?'ok':'FALHOU'));
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.name==='Flamengo').id,'T','Direto',null);ex();G.phase='play';S.modal=null;G.view='inicio';render()});
const m=await p.evaluate(()=>{const cats=document.querySelectorAll('header.top2 .c46 > button').length;const sub=document.querySelectorAll('header.top2 .s46 button').length;
 const p46=document.getElementById('p46');if(p46)p46.hidden=false;const grid=[...new Set([...document.querySelectorAll('#p46 button[data-v]')].map(b=>b.dataset.v))];if(p46)p46.hidden=true;
 const bottom=[...document.querySelectorAll('.nav2 button[data-v]')].map(b=>b.dataset.v);
 return {cats,sub,reach:[...new Set([...grid,...bottom])]}});
chk('barra de cima: 5 categorias + Tudo',m.cats===6);
chk('sub-abas no máximo 5',m.sub<=5);
const need=['agenda','liga','dir','meutec','tatica','treino','vest','medico','assist','staff','marketing','torcida','estadio','base','times','mercado','comp','tecnicos','historia','conquistas','opcoes'];
const miss=need.filter(v=>!m.reach.includes(v));chk('toda tela tem caminho no menu',miss.length===0);
const bad=[];for(const v of need.concat(['juniores'])){const e=await p.evaluate(v=>{try{G.view=v;S.prof=null;S.modal=null;render();return ''}catch(e){return e.message}},v);if(e)bad.push(v)}
chk('todas as telas renderizam',bad.length===0);
console.log(ok.join(' | '),'miss',miss,'errs',JSON.stringify(errs.slice(0,2)));await b.close()})();

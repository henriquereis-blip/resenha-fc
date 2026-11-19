const h=require(__dirname+'/h.js');
(async()=>{const {b,p,errs}=await h.open('Portuguesa',{rounds:3});
const r=await p.evaluate(()=>{
 const o={};G.view='times';S.team=null;S.wt=null;S.open={};render();
 o.placeholder=document.body.innerText.includes('em breve');
 A.tree({k:'world'});A.tree({k:'w_ENG'});
 o.btns=document.querySelectorAll('[data-a=wtopen]').length;
 const bt=document.querySelector('[data-a=wtopen]');A.wtopen({k:bt.dataset.k,id:bt.dataset.id});
 o.rows=document.querySelectorAll('.plist .prow').length;o.title=document.querySelector('.pfi h3').textContent;o.sub=document.querySelector('.pfi .k').textContent;
 o.stars=document.querySelectorAll('.plist .nm').length&&[...document.querySelectorAll('.plist .nm')].filter(x=>x.textContent.includes('*')).length;
 const a=document.querySelector('.plist').innerText;A.wtclose();render();A.wtopen({k:bt.dataset.k,id:bt.dataset.id});o.estavel=a===document.querySelector('.plist').innerText;
 A.tree({k:'close'});render();o.volta=!!document.querySelector('[data-a=tree]');
 // todas as ligas
 let bad=[];for(const L of WLD){if(L.k==='SEL'||!G.wd.lg[L.k])continue;for(const c of G.wd.lg[L.k].cl){S.wt={k:L.k,id:c.id};try{const v=vTimes();if(!/plist/.test(v))bad.push(c.n)}catch(e){bad.push(c.n+':'+e.message)}}}
 o.bad=bad.slice(0,5);o.nbad=bad.length;
 // sigla
 o.crest=crest({name:'Santos FC',sig:'LSP1',c1:'#fff',c2:'#000',c3:'#fff',pat:'solid',id:1},30).match(/>([A-Z0-9]+)<\/text>/)[1];
 // balanço
 return o});
console.log(JSON.stringify(r),errs);await b.close()})();

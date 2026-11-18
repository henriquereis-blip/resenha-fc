const h=require('./h');
(async()=>{
const {b,p,errs,shot}=await h.open('Flamengo',{rounds:3});
const go=async f=>{await p.evaluate(f);await p.waitForTimeout(150)};
await go(()=>{document.querySelector('[data-a="nav"][data-v="clube"]').click()});await go(()=>{document.querySelector('[data-a="nav"][data-v="marketing"]').click()});
let ok=await p.evaluate(()=>!!document.querySelector('[data-a="k3xp"]'));console.log('criador visivel',ok);
if(!ok){console.log(await p.evaluate(()=>[G.view,S.sub,S.club,S.tab].join('|')));}
// tocar de verdade
const pat=await p.$('[data-a="k3xp"][data-p="diag"]');if(pat){await pat.scrollIntoViewIfNeeded();await pat.tap()}
await p.waitForTimeout(200);
const sw=await p.$$('[data-a="k3xa"]');await sw[0].tap();await p.waitForTimeout(200);
const sb=await p.$$('[data-a="k3xb"]');await sb[2].tap();await p.waitForTimeout(200);
console.log(await p.evaluate(()=>JSON.stringify(S.k3x)));
await p.screenshot({path:'o_camisa67.png'});
await p.evaluate(()=>{window.scrollTo(0,0)});
// socio
await p.evaluate(()=>{const e=document.getElementById('socp0');e.value=+e.value+25;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}))});
await p.waitForTimeout(300);
console.log('socundo',await p.evaluate(()=>!!document.querySelector('[data-a="socundo"]')),await p.evaluate(()=>G.mk.soc.prices.join('/')+' orig '+(G.mk.soc.orig||[]).join('/')));
const un=await p.$('[data-a="socundo"]');if(un){await un.scrollIntoViewIfNeeded();await un.tap();await p.waitForTimeout(200)}
console.log('depois',await p.evaluate(()=>G.mk.soc.prices.join('/')));
// continuar
await p.evaluate(()=>{G.view='inicio';render();G.board.conf=95;startRound();while(!roundDone())stepAll();const out=finishRound();G.lastOutcome=out;S.modal={t:'round',out};render()});
await p.waitForTimeout(300);
console.log('continuar pos',await p.evaluate(()=>{const b=document.querySelector('[data-a="roundok"]');const j=[...document.querySelectorAll('.card')].find(x=>/jornal|Manchete|paper/i.test(x.className+x.textContent.slice(0,40)));const pc=document.querySelector('.paperc');return b&&pc?(b.compareDocumentPosition(pc)&4?'botao ANTES do jornal':'botao depois'):'sem paper'}));
await p.screenshot({path:'o_cont67.png'});
// versao
await p.evaluate(()=>{S.modal=null;G.view='opcoes';render()});
console.log('versao',await p.evaluate(()=>/versão do jogo/i.test(document.body.innerText)&&/v90/.test(document.body.innerText)));
console.log('errs',errs.slice(0,5));await b.close()})();

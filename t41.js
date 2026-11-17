const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},hasTouch:true});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;G.view='mercado';S.tab='livres';render()});
for(const t of ['venda','ofertas','buscar','olheiros','livres','venda']){
 const bt=await p.$('[data-a="tab"][data-t="'+t+'"]');if(!bt){console.log('sem botão',t);continue}
 await bt.scrollIntoViewIfNeeded();await bt.click();await p.waitForTimeout(150);
 console.log(t,'->',await p.evaluate(()=>S.tab),'on:',await p.evaluate(()=>[...document.querySelectorAll('.seg button.on')].map(x=>x.textContent).join('|')))}
console.log(errs);await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true});const p=await ctx.newPage();
await p.goto('file://'+__dirname+'/resenha-fc-test.html');await p.waitForTimeout(300);
await p.evaluate(()=>{S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();G.phase='play';G.view='mercado';S.tab='livres';render()});
console.log(await p.evaluate(()=>{const o={};for(const s of ['html','body','#app','.main','.top2']){const e=document.querySelector(s);const c=getComputedStyle(e);o[s]={ov:c.overflowY,pos:c.position,h:e.scrollHeight,ch:e.clientHeight}}o.doc=document.scrollingElement.scrollHeight;o.inner=innerHeight;return JSON.stringify(o)}));
await p.evaluate(()=>{const m=document.querySelector('.main');m.scrollTop=800;document.scrollingElement.scrollTop=800});await p.waitForTimeout(200);
console.log(await p.evaluate(()=>({de:document.scrollingElement.scrollTop,mainSt:document.querySelector('.main').scrollTop,top:Math.round(document.querySelector('.top2').getBoundingClientRect().top)})));await b.close()})();

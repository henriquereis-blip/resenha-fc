const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},isMobile:true,hasTouch:true});const p=await ctx.newPage();
await p.goto('file://'+__dirname+'/resenha-fc-test.html');await p.waitForTimeout(300);
await p.evaluate(()=>{S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();G.phase='play';G.view='mercado';S.tab='livres';render()});
console.log(await p.evaluate(()=>{const t=document.querySelector('.top2');let c=t,o=[];while(c){o.push(c.tagName+'.'+c.className+' h='+c.scrollHeight+' ov='+getComputedStyle(c).overflow);c=c.parentElement}return o.join('\n')}));
await p.evaluate(()=>{const d=document.createElement('div');d.style.height='3000px';d.id='sp';document.querySelector('.top2').parentElement.appendChild(d)});
await p.evaluate(()=>window.scrollTo(0,900));await p.waitForTimeout(200);
console.log(await p.evaluate(()=>({sy:scrollY,top:Math.round(document.querySelector('.top2').getBoundingClientRect().top)})));await b.close()})();

const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780},hasTouch:true})).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;G.view='liga';render();window.scrollTo(0,500)});
await p.waitForTimeout(100);
console.log(await p.evaluate(()=>{const e=document.querySelector('[data-a="clk"]');return e?e.outerHTML.slice(0,150):'none'}));
await p.evaluate(()=>{document.querySelector('[data-a="clk"]').click()});await p.waitForTimeout(150);
console.log(await p.evaluate(()=>[scrollY,G.view,S.team,S.tt,JSON.stringify(S.modal)&&JSON.stringify(S.modal).slice(0,60),[...document.querySelectorAll('[data-a]')].slice(0,6).map(x=>x.dataset.a).join(',')]));
await b.close()})();

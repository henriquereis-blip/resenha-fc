const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},deviceScaleFactor:2,isMobile:false,hasTouch:true});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const ids=[0,3,9];let n=0;
for(const cid of ids){await p.evaluate((cid)=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(cid,'T','Direto',null);ex();G.phase='play';G.view='inicio';S.modal=null;render()},cid);
 await p.waitForTimeout(200);await p.screenshot({path:'../../p17/h40_'+(n++)+'.png'});
 await p.evaluate(()=>window.scrollTo(0,420));await p.waitForTimeout(100);await p.screenshot({path:'../../p17/h40_'+(n++)+'.png'})}
console.log(errs);await b.close()})();

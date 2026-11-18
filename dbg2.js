const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('PE',e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();return JSON.stringify(P(userClub().squad[0]))}));await b.close()})();

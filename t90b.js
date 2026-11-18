const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(900);
console.log(await p.evaluate(()=>{localStorage.clear();G.phase='start';S.step='mpl';render();return [typeof vMpLocal, vMpLocal.toString().slice(0,60), document.body.innerText.slice(0,200)]}));await b.close()})();

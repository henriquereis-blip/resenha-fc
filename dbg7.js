const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:820}});
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
await p.evaluate(()=>{G.view='tatica';render()});await p.waitForTimeout(200);
console.log(await p.evaluate(()=>{const o={doc:[document.documentElement.scrollWidth,innerWidth,document.documentElement.scrollLeft,document.body.scrollLeft]};
 for(const s of ['.main','.fit','.fcards','.schips','.fxl','.ostrip','.ctl4','.tact']){const e=document.querySelector(s);if(e){const r=e.getBoundingClientRect();o[s]=[Math.round(r.x),Math.round(r.width),e.scrollWidth,e.scrollLeft]}}return JSON.stringify(o)}));await b.close()})();

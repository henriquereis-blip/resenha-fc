const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:180,height:180}});
await p.setContent(`<body style="margin:0;width:180px;height:180px;background:linear-gradient(160deg,#0b1220,#050810);display:flex;flex-direction:column;align-items:center;justify-content:center;font-family:Inter,Arial Black,sans-serif;font-weight:900">
<div style="color:#eef2ff;font-size:30px;letter-spacing:1px;line-height:1">RESENHA</div>
<div style="margin-top:10px;background:#34f0a0;color:#06140d;font-size:58px;line-height:1;padding:6px 18px;border-radius:14px">FC</div></body>`);
await p.screenshot({path:'icon180.png'});await b.close()})();

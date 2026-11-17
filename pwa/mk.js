const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const svg=fs.readFileSync('pwa/icon.svg','utf8');
for(const s of [180,192,512]){const p=await b.newPage({viewport:{width:s,height:s}});await p.setContent('<body style="margin:0">'+svg.replace('<svg ','<svg width="'+s+'" height="'+s+'" ')+'</body>');await p.screenshot({path:'pwa/icon-'+s+'.png'});}
await b.close()})();

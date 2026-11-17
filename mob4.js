const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:375,height:667}});
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='FLA').id,'H','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;ex();extraSync();startMatch()});
await p.waitForTimeout(7000);
console.log(await p.evaluate(()=>[...document.querySelector('.mt').children].map(e=>e.className+' h='+Math.round(e.getBoundingClientRect().height)+' fl='+getComputedStyle(e).flex+' ov='+getComputedStyle(e).overflow+' pos='+getComputedStyle(e).position).join('\n')));await b.close()})();

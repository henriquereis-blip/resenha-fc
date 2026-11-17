const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780}});
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
console.log(await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'H','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;G.view='inicio';render();
const e=[...document.querySelectorAll('#app b')].find(x=>/^\d+%$/.test(x.textContent.trim())&&getComputedStyle(x).color==='rgb(4, 7, 13)');return e?e.parentElement.outerHTML.slice(0,400)+' || '+e.parentElement.parentElement.className:'none'}));await b.close()})();

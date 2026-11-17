const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:375,height:667},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/^https?:\/\/(?!file)/,r=>r.abort());
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='FLA').id,'H','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;G.view='inicio';render();ex();extraSync();startMatch()});
await p.evaluate(()=>{window.__sp=3});
for(let i=0;i<6;i++){await p.waitForTimeout(1500);}
const a=await p.evaluate(()=>({min:R&&R.ms[R.ui].min,h:document.documentElement.scrollHeight,vh:innerHeight,y:scrollY}));
await p.evaluate(()=>window.scrollTo(0,300));await p.waitForTimeout(2500);
const c=await p.evaluate(()=>({min:R&&R.ms[R.ui].min,y:scrollY,h:document.documentElement.scrollHeight}));
console.log(JSON.stringify(a),JSON.stringify(c));await p.screenshot({path:'m_jogo2.png'});
await p.evaluate(()=>window.scrollTo(0,99999));await p.waitForTimeout(300);await p.screenshot({path:'m_jogo3.png'});console.log(errs);await b.close()})();

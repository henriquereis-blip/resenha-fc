const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780},deviceScaleFactor:1});
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='FLA').id,'H','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;G.view='tatica';render()});
const r=await p.evaluate(()=>{const o=[];let e=document.querySelector('.pitch');while(e&&e!==document.body){const cs=getComputedStyle(e),r=e.getBoundingClientRect();o.push(e.tagName+'.'+e.className+' h='+Math.round(r.height)+' w='+Math.round(r.width)+' disp='+cs.display+' pos='+cs.position+' ov='+cs.overflow+' flex='+cs.flex+' ar='+cs.aspectRatio+' mh='+cs.minHeight+' hh='+cs.height);e=e.parentElement}return o.join('\n')});console.log(r);await b.close()})();

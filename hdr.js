const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},hasTouch:true,isMobile:true});const p=await ctx.newPage();
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-test.html');
await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'H','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;G.view='inicio';render()});
console.log(await p.evaluate(()=>{const h=document.querySelector('.top2');const cs=getComputedStyle(h);return JSON.stringify({disp:cs.display,fd:cs.flexDirection,ov:cs.overflowX,pos:cs.position,kids:[...h.children].map(e=>e.className+':'+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)+' '+getComputedStyle(e).display),h:h.getBoundingClientRect().height})}));
await p.screenshot({path:'hdr.png',clip:{x:0,y:0,width:390,height:160}});await b.close()})();

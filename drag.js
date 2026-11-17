const {chromium}=require('playwright');
(async()=>{
 const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:400,height:820}});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 await p.evaluate(()=>{G.view='tatica';render()});
 const before=await p.evaluate(()=>userClub().squad.slice(11,20).join(','));
 const r=await p.locator('[data-k="r"][data-i="0"]');await r.scrollIntoViewIfNeeded();
 const rb=await r.boundingBox();const tb=await p.locator('[data-k="b"][data-i="0"]').boundingBox();
 // se o alvo está fora da tela, usa a página rolada
 await p.mouse.move(rb.x+20,rb.y+10);await p.mouse.down();await p.mouse.move(rb.x+30,rb.y-20,{steps:3});
 const tb2=await p.locator('[data-k="b"][data-i="0"]').boundingBox();
 await p.mouse.move(tb2.x+20,tb2.y+10,{steps:6});await p.mouse.up();
 const after=await p.evaluate(()=>userClub().squad.slice(11,20).join(','));
 console.log('antes',before);console.log('depois',after,'mudou',before!==after);
 // toque: reserva -> titular
 await p.locator('[data-k="r"][data-i="1"]').click();await p.locator('[data-k="l"][data-i="3"]').click();
 console.log('toque ok',await p.evaluate(()=>userClub().squad.slice(0,11).includes(userClub().squad[0])),errs);await b.close();
})();

const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:780},deviceScaleFactor:1,hasTouch:true,isMobile:true});const p=await ctx.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-test.html');
fs.mkdirSync('p15',{recursive:true});let n=0;const man=[];
const shot=async(cap,full)=>{n++;const f='p15/'+String(n).padStart(2,'0')+'.png';await p.screenshot({path:f,fullPage:!!full});man.push({f,c:cap})};
const tap=async(sel,txt)=>{const ok=await p.evaluate(([sel,txt])=>{const e=[...document.querySelectorAll(sel)].find(x=>!txt||x.textContent.includes(txt));if(e){e.click();return true}return false},[sel,txt]);await p.waitForTimeout(300);return ok};
await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'Henrique','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;G.view='inicio';ex();render()});
await shot('Início');await tap('[data-a="play"]');await p.waitForTimeout(2500);await shot('Partida começando');
await p.waitForTimeout(4000);await shot('Partida rolando');
await tap('[data-a="spd"][data-v="3"]');
for(let i=0;i<80;i++){await p.waitForTimeout(500);const bk=await p.$('[data-a="mgo"]');if(bk){await shot('Intervalo');await tap('[data-a="mgo"]');}if(await p.$('.clk.end'))break}
await p.waitForTimeout(500);await shot('Fim de jogo');
await tap('[data-a="mend"]');await p.waitForTimeout(500);await shot('Resumo da rodada');
await p.evaluate(()=>window.scrollTo(0,1200));await shot('Resumo (rolado)');
fs.writeFileSync('p15/manifest.json',JSON.stringify(man));console.log(errs.slice(0,5),n);await b.close()})();

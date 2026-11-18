const h=require('/home/claude/resenha-fc/h.js');
(async()=>{const {b,p,errs,shot}=await h.open('Portuguesa',{rounds:4});
const r=await p.evaluate(()=>{const o={};const c=userClub();G.med.doc=0;G.med.fisio=0;G.med.prep=0;G.med.season.n=4;
 c.squad.slice(11,14).forEach(id=>{P(id).inj=4;P(id).injN=4});
 G.view='inicio';render();
 const al=staffAlerts();o.alerts=al.map(a=>a.k+':'+a.txt.slice(0,70));
 o.card=document.body.innerText.includes('avisa');
 o.badge=!!document.querySelector('.badge13');
 G.view='assist';render();o.dado=/🎲|rolar um dado|Tentar/.test(document.querySelector("#app").innerHTML);o.pend=document.body.innerText.includes('Pendências da comissão');
 G.view='vest';render();o.dadoV=/🎲/.test(document.querySelector("#app").innerHTML);
 // formacao
 const f=al.find(a=>a.k==='form');if(f){const old=c.formation;A.auxform({f:f.f});o.form=[old,c.formation]}
 // tip
 tipBox();G.tips.push({id:999,round:G.round,season:G.season,state:'new',k:'cansaco',a:c.squad[0],txt:'x',dc:1,bonus:'tre'});A.tipgo({id:999});o.res=G.tips.find(t=>t.id===999).res;
 return o});
console.log(JSON.stringify(r,null,1),errs);
await p.evaluate(()=>{G.view='inicio';render()});await shot('aux');await b.close()})();

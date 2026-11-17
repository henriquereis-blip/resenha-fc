const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780}});
await p.route(/^https?:\/\/(?!file)/,r=>r.abort());await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='VAS').id,'H','Passe',null);G.sponsor=sponsorOffers()[0];S.modal=null;G.view='inicio';render();ex();extraSync()});
const views=(process.argv[2]||'inicio,tatica,liga,mercado,clube,agenda,estadio,base,tecnicos,historia,meutec,medico,dir,treino,vest,assist,staff,comp,marketing,torcida,times,opcoes,jornal,prof,roundmodal').split(',');
const res={};
for(const v of views){
 await p.evaluate(v=>{S.modal=null;S.prof=null;S.paper=false;S.panel=false;G.view='inicio';
  if(v==='jornal'){S.paper=true;}else if(v==='prof'){S.prof=userClub().squad[3]}else if(v==='roundmodal'){startRound();while(!roundDone())stepAll();finishRound();S.modal={t:'round'}}else G.view=v;
  render()},v);
 const bad=await p.evaluate(()=>{
  const parse=s=>{const m=s&&s.match(/rgba?\(([^)]+)\)/);if(!m)return null;const a=m[1].split(/[ ,\/]+/).map(Number);return {r:a[0],g:a[1],b:a[2],a:a[3]===undefined?1:a[3]}};
  const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c.r)+.7152*f(c.g)+.0722*f(c.b)};
  const bgOf=e=>{let acc=null;while(e){const cs=getComputedStyle(e);let c=parse(cs.backgroundColor);if((!c||c.a<.5)&&cs.backgroundImage&&cs.backgroundImage!=='none'){const g=cs.backgroundImage.match(/rgba?\([^)]+\)/);if(g)c=parse(g[0])}
    if(c&&c.a>=.5)return c;e=e.parentElement}return {r:7,g:11,b:20,a:1}};
  const out=[];const seen=new Set();
  for(const e of document.querySelectorAll('#app *')){
    if(e.children.length&&![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))continue;
    const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ').trim();if(!t)continue;
    const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0)continue;
    const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;
    const fg=parse(cs.color),bg=bgOf(e);if(!fg)continue;
    const o=+cs.opacity;const L1=lum(fg),L2=lum(bg);const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
    if(cr<3.6){const k=e.className+'|'+t.slice(0,20);if(seen.has(k))continue;seen.add(k);out.push(cr.toFixed(1)+' '+e.tagName+'.'+e.className+' "'+t.slice(0,28)+'" fg='+cs.color+' bg=rgb('+bg.r+','+bg.g+','+bg.b+')')}
  }return out.slice(0,14)});
 res[v]=bad;
}
for(const v in res)if(res[v].length){console.log('== '+v);console.log(res[v].join('\n'))}
await b.close()})();

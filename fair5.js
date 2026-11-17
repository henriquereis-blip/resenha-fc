const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const N=+process.argv[2]||12,SEAS=+process.argv[3]||8;
const res={};let errs=0;
for(let run=0;run<N;run++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.addEventListener('error',()=>errs++)}});
 const w=dom.window,ev=s=>w.eval(s);
 const d=w.document;const click=sel=>{const e=d.querySelector(sel);if(!e)throw new Error('no '+sel);e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}))};const A=(a,x='')=>click(`[data-a="${a}"]${x}`);
 A('newgame');d.querySelector('#coach').value='T';d.querySelector('#coach').dispatchEvent(new w.Event('input',{bubbles:true}));
 const id0=ev(`G.clubs.find(c=>c.sig==='CHA').id`);
 A('step','[data-v="club"]');{const dv=ev(`G.clubs[${id0}].div`);if(dv)A('cdiv',`[data-v="${dv}"]`);}A('pickclub',`[data-id="${id0}"]`);A('cpvt','[data-v="sq"]');A('step','[data-v="setup"]');A('pickphil');A('pickasst');A('pickobj','[data-o="equ"]');A('begin');A("spnpick");A("spnmode");
 // user = CHA, force pure auto for user
 const init=JSON.parse(ev(`JSON.stringify(G.clubs.filter(c=>c.div===0).map(c=>[c.sig,+strength(c).toFixed(1)]))`));
 const rank={};init.sort((a,b)=>b[1]-a[1]).forEach((x,i)=>rank[x[0]]=i+1);
 try{
 for(let s=0;s<SEAS;s++){
  for(let r=0;r<38;r++){ev(`(function(){const c=userClub();autoPick(c);startRound();stepAll();finishRound();})()`);}
  const cf=JSON.parse(ev(`JSON.stringify((G.cfx||[]).filter(x=>x.s===G.season).map(x=>[x.div,x.off?1:0]))`));const dvc=[0,0,0,0],offc=[0,0,0,0];cf.forEach(([d,o])=>{dvc[d]++;if(o)offc[d]++});(res.cf=res.cf||[]).push(dvc.join('/')+' off '+offc.join('/'));const champ=ev(`tableRows(0)[0].sig`);(globalThis.CH=globalThis.CH||{})[run]=(globalThis.CH[run]||[]);globalThis.CH[run].push(champ);
  ev(`endSeason();newSeason()`);
  if(process.env.SW&&(s===1||s===3||s===5)){try{ev(`(function(){const c=userClub();const o=jobOffers(true);takeJob(o[0]);G.phase='play';S.modal=null})()`)}catch(e){console.log('sw err',e.message)}}
 }}catch(e){console.log('err',run,e.stack.slice(0,500));break}
 console.log('STAT',ev(`JSON.stringify((function(){const sz=G.clubs.map(c=>c.squad.length),cx=G.clubs.map(c=>c.caixa||0);const bad=G.clubs.filter(c=>c.squad.some(id=>!G.players[id]||G.players[id].club!==c.id)).length;return {aix:G.aix||0,minSq:Math.min(...sz),maxSq:Math.max(...sz),minCx:Math.min(...cx),maxCx:Math.max(...cx),badClubs:bad,nan:cx.some(x=>x!==x)}})())`),'ch',ev(`(function(){const L=[];G.champs.forEach(x=>L.push(x.champ.slice(0,3)));return L.join(',')})()`));0&&console.log('TOT',ev(`JSON.stringify((function(){const o={};(G.cfx||[]).forEach(x=>{const k=x.s+'-'+x.div+(x.off?'o':'i');o[k]=(o[k]||0)+1});return o})())`)),0&&console.log(ev(`JSON.stringify(G.paper.filter(x=>/demite/.test(x.h)).slice(0,4))`)),console.log(ev(`JSON.stringify(Object.entries(G.cfc||{}).length)`));dom.window.close();
}
console.log('errs',errs);console.log('CH',Object.values(globalThis.CH).map(a=>{const m={};a.forEach(x=>m[x]=(m[x]||0)+1);return a.join(',')+' max='+Math.max(...Object.values(m))}).join(' || '));try{}catch(e){}

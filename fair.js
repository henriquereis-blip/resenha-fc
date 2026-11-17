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
  const champ=ev(`tableRows(0)[0].sig`);(res[champ]=res[champ]||{n:0,rk:rank[champ]}).n++;
  ev(`endSeason();newSeason()`);
 }}catch(e){console.log('err',run,e.stack.slice(0,500));break}
 dom.window.close();
}
console.log(Object.entries(res).sort((a,b)=>b[1].n-a[1].n).map(([k,v])=>k+':'+v.n+' (rank ini '+v.rk+')').join(' | '),'errs',errs);

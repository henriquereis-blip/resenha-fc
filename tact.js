const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
const o=JSON.parse(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='${process.argv[2]||'SAO'}').id,'T','Direto',null);const me=userClub();const others=G.clubs.filter(c=>c.id!==me.id);others.forEach(c=>autoPick(c));
 const res=[];const N=36;
 for(const f of FORMLIST)for(const st of STYLES)for(const mk of MARKS)for(const fo of FOCUS){
  me.formation=f;me.style=st;me.mark=mk;me.focus=fo;autoPick(me);let pts=0,gf=0,ga=0;
  for(let i=0;i<N;i++){const op=others[i%others.length];const hm=i%2===0;const m=hm?simFast(me,op):simFast(op,me);
   const g=hm?[m.hg,m.ag]:[m.ag,m.hg];gf+=g[0];ga+=g[1];pts+=g[0]>g[1]?3:g[0]===g[1]?1:0}
  res.push([f,st,mk,fo,+(pts/N).toFixed(2),+(gf/N).toFixed(2),+(ga/N).toFixed(2)])}
 return JSON.stringify(res)})()`));
const avg=o.reduce((a,b)=>a+b[4],0)/o.length;console.log('media pts/jogo',avg.toFixed(2),'combos',o.length);
const by=(i)=>{const m={};o.forEach(r=>{(m[r[i]]=m[r[i]]||[]).push(r[4])});return Object.entries(m).map(([k,v])=>k+':'+(v.reduce((a,b)=>a+b,0)/v.length).toFixed(2)).join(' | ')};
console.log('FORM',by(0));console.log('ESTILO',by(1));console.log('MARC',by(2));console.log('FOCO',by(3));
o.sort((a,b)=>b[4]-a[4]);console.log('TOP',o.slice(0,6).map(r=>r.join(',')).join('\n'));console.log('BOTTOM',o.slice(-4).map(r=>r.join(',')).join('\n'));process.exit(0)

const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='SAO').id,'T','Direto',null);const me=userClub();const others=G.clubs.filter(c=>c.id!==me.id&&c.div===0);others.forEach(c=>autoPick(c));
 const out=[];const N=1900;
 const run=(lab,st,f,fs,ff,vest)=>{me.formation=f;me.style=st;me.fam={s:{[st]:fs},f:{[f]:ff}};G.vest.clima=vest;autoPick(me);let pts=0,gf=0,ga=0;
  for(let i=0;i<N;i++){if(i%5===0)Object.values(G.players).forEach(p=>{p.en=100;p.inj=0;p.mor=70;p.yc=0;p.rc=0});const op=others[i%others.length];const hm=i%2===0;const m=hm?simFast(me,op):simFast(op,me);const g=hm?[m.hg,m.ag]:[m.ag,m.hg];gf+=g[0];ga+=g[1];pts+=g[0]>g[1]?3:g[0]===g[1]?1:0}
  out.push(lab+': '+(pts/N).toFixed(2)+' pts/jogo, gols '+(gf/N).toFixed(2)+'-'+(ga/N).toFixed(2))};
 run('Equilibrado 4-4-2 entrosado 75','Equilibrado','4-4-2',75,75,60);
 run('Equilibrado 4-4-2 entrosado 100','Equilibrado','4-4-2',100,100,60);
 run('Equilibrado 4-4-2 desentrosado 44','Equilibrado','4-4-2',44,44,60);
 return out.join('\\n')})()`));

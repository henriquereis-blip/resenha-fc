const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){const r=[];for(let d=0;d<4;d++){const L=G.clubs.filter(c=>c.div===d);const f=L.map(c=>{const pay=c.squad.reduce((s,id)=>s+salOf(P(id)),0);const inc=(c.tv+c.spBase)*1.3;return pay/inc});
 r.push([d,'ratio folha/receita',(f.reduce((a,b)=>a+b,0)/f.length).toFixed(2),Math.min(...f).toFixed(2),Math.max(...f).toFixed(2),'ovr',(L.reduce((a,c)=>a+strength(c),0)/L.length).toFixed(1),'tv',(L.reduce((a,c)=>a+c.tv,0)/L.length).toFixed(1)])}return JSON.stringify(r)})()`));process.exit(0)

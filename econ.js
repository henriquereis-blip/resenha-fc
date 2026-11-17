const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window;
console.log(w.eval(`G.clubs.map(c=>{const sal=c.squad.reduce((s,id)=>s+salOf(P(id)),0);const inc=c.tv+c.spBase*0.8+19*c.cap*(0.35+0.55*0.6)*60/1e6;const mant=c.cap/1000*0.25;return c.sig+' rep'+c.rep+' tv'+c.tv+' sp'+c.spBase.toFixed(0)+' sal'+sal.toFixed(0)+' inc'+inc.toFixed(0)+' mant'+mant.toFixed(0)+' net'+(inc-sal-mant).toFixed(0)+' caixa'+c.caixa}).join('\\n')`));

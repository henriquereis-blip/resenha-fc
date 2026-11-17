const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window;const ev=s=>w.eval(s);
w.document.querySelector('[data-a="newgame"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
console.log(ev(`(function(){const L=G.clubs.filter(c=>c.div===0).map(c=>({s:c.sig,rep:c.rep,str:+strength(c).toFixed(1),top11:+c.squad.map(id=>P(id).ovr).sort((a,b)=>b-a).slice(0,14).reduce((a,b)=>a+b,0)/14,caixa:+(c.caixa||0).toFixed(0),n:c.squad.length,hum:c.humor,tro:(c.tro||[]).join('/')}));
 L.sort((a,b)=>b.str-a.str);return L.map(x=>[x.s,x.rep,x.str,x.top11.toFixed(1),x.caixa,x.n,x.tro].join(' ')).join('\\n')})()`));

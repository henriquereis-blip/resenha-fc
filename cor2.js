const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const out=[];
for(let i=0;i<12;i++){const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
w.document.querySelector('[data-a="newgame"]').dispatchEvent(new w.MouseEvent('click',{bubbles:true}));
out.push(JSON.parse(w.eval(`JSON.stringify((function(){const L=G.clubs.filter(c=>c.div===0).sort((a,b)=>strength(b)-strength(a));return [L.findIndex(c=>c.sig==='COR')+1,+strength(G.clubs.find(c=>c.sig==='COR')).toFixed(1),+strength(L[0]).toFixed(1),L[0].sig,G.xfers?G.xfers.length:-1]})())`)));dom.window.close()}
console.log(JSON.stringify(out));

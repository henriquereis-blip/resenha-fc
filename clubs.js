const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
console.log(dom.window.eval(`[0,1,2,3].map(d=>d+': '+G.clubs.filter(c=>c.div===d).map(c=>c.sig+'='+c.name).join(', ')).join('\\n')`));process.exit(0)

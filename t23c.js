const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
console.log(dom.window.eval(`(function(){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='FLA').id,'T','Direto',null);ex();return 'bra '+braRating().toFixed(1)+' '+QT.map(c=>c+':'+ntRating(c).toFixed(1)).join(' ')})()`));process.exit(0)

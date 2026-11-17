const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){const id=G.clubs.find(c=>c.sig==='SAO').id;S.obj='equ';startCareer(id,'T','Passe',null);
const t=vTatica();const i=t.indexOf('data-a="tsv"');const l=vLiga();const o=vOpcoes();
return [t.slice(i-80,i+40),'||',(l.match(/<div class="tbl[^>]*>/)||['none'])[0],'||',o.slice(0,200),'|| views:',Object.keys(window).filter(k=>/^v[A-Z]/.test(k)).length, typeof vOpcoes, (render.toString().match(/opcoes[^,]*/g)||[]).join(';')].join('\\n')})()`));process.exit(0)

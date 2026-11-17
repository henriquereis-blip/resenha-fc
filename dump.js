const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const d=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'file:///x.html'});const w=d.window;
w.eval('newWorld()');
const out=w.eval(`JSON.stringify(Object.values(G.players).filter(p=>p.club>=0&&p.club<20).map(p=>[p.name,C(p.club).sig,p.ovr,p.age,p.real?1:0,p.pot]))`);
fs.writeFileSync('/tmp/dump.json',out);
const a=JSON.parse(out);a.sort((x,y)=>y[2]-x[2]);
console.log('top40');a.slice(0,40).forEach(x=>console.log(x.join(' ')));
const dist={};a.forEach(x=>{const b=Math.floor(x[2]/5)*5;dist[b]=(dist[b]||0)+1});console.log(dist);
console.log(a.filter(x=>/Thiago|Neymar|Pulgar/.test(x[0])).map(x=>x.join(' ')).join('\n'));
process.exit(0)

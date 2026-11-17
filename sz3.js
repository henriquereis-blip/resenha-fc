const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;const ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};
 const F=()=>{const o={},n=Object.keys(G.players).length;for(const q of Object.values(G.players))for(const k of Object.keys(q))o[k]=(o[k]||0)+JSON.stringify(q[k]).length;return {n,o}};
 const a=F();for(let s=0;s<3;s++){let g=0;while(G.round<38&&g++<60)ro();endSeason();newSeason();G.phase='play'}const c=F();
 return 'jogadores '+a.n+' -> '+c.n+'\n'+Object.keys(c.o).map(k=>[k,c.o[k],c.o[k]-(a.o[k]||0)]).sort((x,y)=>y[2]-x[2]).slice(0,8).map(x=>x.join(' ')).join('\n')}));await b.close()})();

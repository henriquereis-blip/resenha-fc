const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;const ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};
 const sz=()=>{const o={};for(const k of Object.keys(G)){try{o[k]=JSON.stringify(G[k]).length}catch(e){}}return o};
 const a=sz();for(let s=0;s<2;s++){let g=0;while(G.round<38&&g++<60)ro();endSeason();newSeason();G.phase='play'}const c=sz();
 return Object.keys(c).map(k=>[k,c[k],c[k]-(a[k]||0)]).filter(x=>x[2]>20000).sort((x,y)=>y[2]-x[2]).map(x=>x.join(' ')).join('\n')+'\nTOTAL '+JSON.stringify(G).length}));await b.close()})();

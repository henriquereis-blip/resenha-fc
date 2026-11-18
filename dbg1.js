const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('PE',e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 window.ro=()=>{startRound();const x=G._x?G._x.kind+':'+G._x.label:null;while(!roundDone())stepAll();const o=finishRound();return {o,x}};
 for(let i=0;i<2;i++)ro();emigrate(wd().lg['COL'].cl[1].id);const log=[];
 try{for(let g=0;g<60;g++){const before=G.round;const r=ro();log.push(before+'>'+G.round+(r.x?'['+r.x+']':'')+r.o+' len'+G.fixtures.length+'/'+G.dfx[userClub().div].length)}}catch(e){log.push('ERR '+e.message+' round'+G.round+' fx'+G.fixtures.length+' dfx'+G.dfx[userClub().div].length+' NR'+NR()+' po '+JSON.stringify(G.po51&&{ph:G.po51.ph,pend:G.po51.pend,mid:G.po51.mid}))}
 return log.slice(-14).join('\n')}));await b.close()})();

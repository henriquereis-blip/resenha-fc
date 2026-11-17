const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
for(const k of ['URU','URU','URU']){console.log(await p.evaluate((k)=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();return finishRound()};
 for(let i=0;i<3;i++)ro();
 const lite=wd().lg[k].cl[3];emigrate(lite.id);
 const o=[k,'n4',G.clubs.filter(x=>x.div===4).length,'fx4',G.dfx[4].length,'NR',NR(),'user',G.user,'div',userClub().div,'fixlen',G.fixtures.length];
 try{for(let i=0;i<40;i++){o.push(G.round+':'+NR()+':'+G.user+':'+(G.abroad&&G.abroad.k));if(G.round>=NR()){o.push('fim em '+G.round+' fase '+G.phase);break}ro()}}catch(e){o.push('CRASH r'+G.round+' '+e.message+' fxlen '+G.fixtures.length+' NR '+NR())}
 return o.join(' ')},k))}
await b.close()})();

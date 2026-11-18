const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:400,height:800}})).newPage();p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(900);
const run=(f,a)=>p.evaluate(f,a);
console.log(await run(()=>{localStorage.clear();G.phase='start';S.step='mpl';render();return document.body.innerText.toLowerCase().includes('passa o aparelho')}));
for(const [nick,club] of [['Rafa',3],['Lipe',10]]){
 await run(()=>{if(G.mplId!=null)A.mplsw()});await run(n=>{S.step='mpl';render();document.getElementById('mpl_nick').value=n;A.mplnew()},nick);
 await p.waitForTimeout(200);
 await run(c=>{S.mg=mgNew('equil');S.obj='equ';S.sc=c;S.sp='Direto';S.sa=0;S.asst=S.asst||[null];A.begin()},club);
 await p.waitForTimeout(300);
 console.log(nick,await run(()=>({id:G.mplId,nick:G.mplNick,btn:!!document.getElementById('mplsw62'),user:G.user})));
 await run(()=>{S.modal=null;for(let i=0;i<4;i++){try{A.play&&A.play()}catch(e){}}});
}
console.log(await run(()=>JSON.stringify(mplGet())));
await run(()=>A.mplsw());await p.waitForTimeout(200);
console.log('titulo',await run(()=>document.body.innerText.toLowerCase().includes('ranking entre vocês')));
await run(()=>A.mplplay({v:1}));await p.waitForTimeout(300);
console.log('voltou',await run(()=>({n:G.mplNick,club:userClub().name})));
await run(()=>A.mplsw());await run(()=>A.mplplay({v:2}));await p.waitForTimeout(300);
console.log('segundo',await run(()=>({n:G.mplNick,club:userClub().name})));
console.log(errs.slice(0,3));await b.close()})();

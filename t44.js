const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
for(const k of ['URU','GER','ENG','USA','CHI','MEX','ARG','KSA']){await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(250);
const o=await p.evaluate((k)=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();const o=finishRound();ex();return o};
 for(let i=0;i<3;i++)ro();
 const lite=wd().lg[k].cl[3];emigrate(lite.id);
 const out=[k+' clubes '+G.clubs.filter(x=>x.div===4).length+' NR '+NR()+' fx '+G.fixtures.length];
 let n=0,ended=null;while(n<60){if(G.round>=NR()){ended=G.round;break}ro();n++}
 out.push('terminou na rodada '+ended+' fase '+G.phase+' jogos user '+userClub().J+' NaN '+JSON.stringify(G).includes('NaN'));
 const tb=G.clubs.filter(x=>x.div===4).sort((a,c)=>c.P-a.P);out.push('lider '+tb[0].name+' '+tb[0].P+'pts J'+tb[0].J);
 return out.join(' | ')},k);console.log(o)}
console.log([...new Set(errs)].slice(0,8));await b.close()})();

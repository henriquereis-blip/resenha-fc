const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('C '+m.text().slice(0,200))});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const o=await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();const o=finishRound();ex();return o};
 for(let i=0;i<14;i++)ro();
 const out=[];
 // e-mail de propostas
 G.uc.titles=3;G.uc.peak=85;G.board.conf=90;userClub().rep=80;
 let m;for(let t=0;t<30&&!m;t++){G.jobq={at:G.round};jobResolve();const x=G.inbox.find(y=>y.tag==='jobs');if(x&&x.acts.some(a=>a.k==='fjob'))m=x}
 out.push('email com proposta de fora: '+!!m);
 if(m){const a=m.acts.find(a=>a.k==='fjob');out.push('act '+a.l);const r=MACT.fjob(a.p);out.push('resultado '+JSON.stringify(r)+' clube '+userClub().name+' pais '+G.abroad.k)}
 const first=G.abroad&&G.abroad.k;
 for(let i=0;i<6;i++)ro();
 // abroad -> outro país
 const other=Object.keys(wd().lg).find(k=>k!==first);const lite=wd().lg[other].cl[6];
 const ok=emigrate(lite.id);out.push('abroad→'+other+' '+ok+' '+userClub().name+' natives '+G.clubs.filter(x=>x.div===4).length+' clubs '+G.clubs.length+' ctry '+userClub().ctry);
 for(let i=0;i<6;i++)ro();
 // save + reload
 save();const raw=localStorage.getItem(SAVE_KEY);out.push('save KB '+Math.round(raw.length/1024));
 const g0=userClub().name,pos0=posOf(userClub());
 loadSave();render();out.push('reload '+userClub().name+' = '+g0+' abroad '+(G.abroad&&G.abroad.k));
 for(let i=0;i<4;i++)ro();
 // abroad → clube nativo da mesma liga (takeJob)
 const nat=G.clubs.find(x=>x.div===4&&x.id!==G.user);takeJob(nat.id);out.push('takeJob nativo '+userClub().name+' ainda abroad '+G.abroad.k);
 for(let i=0;i<3;i++)ro();
 out.push('NaN '+JSON.stringify(G).includes('NaN')+' fx '+G.fixtures.length);
 return out.join('\n')});
console.log(o);console.log([...new Set(errs)].slice(0,8));await b.close()})();

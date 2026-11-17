const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:780}})).newPage();const errs=[];p.on('pageerror',e=>errs.push('PE '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push('C '+m.text().slice(0,200))});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const code=process.argv[2]||'ENG';
console.log(await p.evaluate((code)=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(25,'T','Direto',null);ex();G.phase='play';S.modal=null;
 const ro=()=>{startRound();while(!roundDone())stepAll();const o=finishRound();ex();return o};
 for(let i=0;i<8;i++)ro();
 const W=wd();const lite=W.lg[code].cl.slice().sort((a,b)=>a.r-b.r)[4];
 const ok=emigrate(lite.id);const c=userClub();
 const out=['emigrou '+ok+' → '+c.name+' div'+c.div+' sig '+c.sig+' elenco '+c.squad.length+' caixa '+c.caixa+' tv '+c.tv+' id '+c.id+' natives '+G.clubs.filter(x=>x.div===4).length+' fix '+G.fixtures.length+' round '+G.round+' J '+c.J];
 let n=0,last;while(G.round<38&&n<60){last=ro();n++;if(last==='fired'){out.push('DEMITIDO r'+G.round);break}}
 out.push('rodadas jogadas '+n+' round '+G.round+' pos '+posOf(userClub())+' P '+userClub().P+' J '+userClub().J);
 const tb=tableRows(4).slice(0,3).map(x=>x.sig+x.P+'/'+x.J).join(' ');out.push('tabela '+tb);
 const lt=wTable(code).slice(0,3).map(x=>x.sg+x.P+'/'+x.J).join(' ');out.push('lite sync '+lt);
 if(!G.summary||G.summary.season!==G.season)endSeason();out.push('summary '+JSON.stringify(G.summary&&{pos:G.summary.pos,champ:G.summary.champ,prize:G.summary.prize,txt:G.summary.txt}));
 newSeason();G.phase='play';out.push('temp2 round '+G.round+' season '+G.season+' ligaP '+userClub().P+' wd champ '+JSON.stringify(wd().hist.slice(-1)[0].ch[code]));
 for(let i=0;i<10;i++)ro();out.push('t2 r10 pos '+posOf(userClub()));
 // volta ao Brasil
 const br=G.clubs.find(x=>x.div===1&&x.id<80);takeJob(br.id);out.push('voltou '+userClub().name+' div'+userClub().div+' abroad '+G.abroad+' clubs '+G.clubs.length+' nat '+(wd().nat));
 for(let i=0;i<5;i++)ro();out.push('ok pos '+posOf(userClub()));
 return out.join('\n')},code));
console.log([...new Set(errs)].slice(0,10));await b.close()})();

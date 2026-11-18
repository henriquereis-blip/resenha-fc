const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
const u=G.clubs[G.user];wd();G.wd.hist=[{s:G.season}];G.wd.keep=[{s:1,ucl:null,lib:u.name,conc:null,asi:null,afr:null}];
const cy=cyOf;window.cyOf=()=>2;G.mail=G.mail||[];
try{wCwc()}catch(e){return 'ERR '+e.message}
const m=(G.inbox||G.mail||[]).filter(x=>/Mundial/.test(JSON.stringify(x))).map(x=>JSON.stringify(x).slice(0,700));return m.join('\n')||'sem mail; keys='+Object.keys(G).filter(k=>/mail|inbox/.test(k))}));
console.log(errs.slice(0,3));await b.close()})();

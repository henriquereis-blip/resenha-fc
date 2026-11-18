const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const r=await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
const clubsAll=new Set();for(const L of WLD)for(const c of L.cl)clubsAll.add(c[0]);
const miss=[...new Set(STARS57.map(s=>s[2]))].filter(n=>![...clubsAll].some(x=>x.replace(/-[A-Z]{3}$/,'')===n||x===n));
const found={};
for(const k of ['ENG','ESP','GER','ITA','FRA','USA','KSA']){emigrate(wd().lg[k].cl[0].id);const st=G.clubs.slice(BRN).flatMap(c=>c.squad.map(id=>G.players[id]).filter(p=>p.real&&STARS57.some(s=>s[0]===p.name)).map(p=>p.name+' '+p.ovr));found[k]=st.length+': '+st.slice(0,6).join(', ')}
const names=STARS57.map(s=>s[0]);return JSON.stringify({miss,found,n:names.length,dup:names.length-new Set(names).size})});
console.log(r);console.log(errs.slice(0,5));await b.close()})();

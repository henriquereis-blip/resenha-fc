const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await (await b.newContext({viewport:{width:400,height:820},deviceScaleFactor:2})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(800);
const shot=async(n)=>{await p.waitForTimeout(150);await p.screenshot({path:'/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/scratchpad/v2/th_'+n+'.png'})};
await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;G.view='liga';S.lig='tabela';render()});await shot('br_liga');
await p.evaluate(()=>{G.view='comp';S.ctab='cont';render()});await shot('br_cont');
await p.evaluate(()=>{S.ctab='cup';render()});await shot('br_cup');
// banner showcase
await p.evaluate(()=>{const names=['UEFA Champions League','Libertadores','Sul-Americana','Europa League','Premier League','LaLiga','Serie A','Bundesliga','Ligue 1','Liga Profesional','MLS','Liga MX','Saudi Pro League','Eredivisie','Copa América','Mundial de Clubes','Liga Paraguaya X','J1 League'];
document.getElementById('app').innerHTML='<div class="wrap" style="padding:14px">'+names.map(n=>banner60(n,'temporada 2027')).join('')+'</div>'});await shot('show');
console.log(errs.slice(0,5));await b.close()})();

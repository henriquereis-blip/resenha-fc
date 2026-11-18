const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const [k,idx] of [["SEL",1]]){
const p=await (await b.newContext()).newPage();p.on('pageerror',e=>errs.push(k+' '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(k+' '+m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(300);
const r=await p.evaluate(([k,idx])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);ex();G.phase='play';S.modal=null;
window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};for(let i=0;i<2;i++)ro();emigrate(wd().lg[k].cl[idx].id);
const out=[];for(let s=0;s<2;s++){let g=0;while(g++<160&&ro()!=='seasonEnd');
 out.push('T'+G.season+' '+userClub().name+' nc='+(G.nc?G.nc.name+':'+(G.nc.champ?'ok':'?'):'-')+' nc2='+(G.nc2?G.nc2.name+':'+(G.nc2.champ?'ok':'?')+' size'+G.nc2.size:'-'));
 endSeason();newSeason();G.phase='play';render()}
out.push('squad='+userClub().squad.slice(0,5).map(id=>G.players[id].name+'('+G.players[id].nat+')').join(', '));out.push('super='+JSON.stringify((G.superHist||[]).map(x=>x.n+' '+x.champ)));out.push('hist='+JSON.stringify((G.ncHist||[]).map(x=>x.n+' '+x.champ)));
S.tab='comp';S.ctab='cup';try{render()}catch(e){out.push('render '+e.message)}
G=JSON.parse(JSON.stringify(G));render();return out.join('\n')},[k,idx]).catch(e=>'FALHA '+e.message.slice(0,200));
console.log(k+'\n'+r);await p.close()}
console.log([...new Set(errs)].slice(0,8));await b.close()})();

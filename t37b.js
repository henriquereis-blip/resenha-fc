const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();
let n=0;for(let i=0;i<40&&!G.inbox.some(m=>m.acts&&m.acts[0]&&m.acts[0].k==='xsell');i++){xMarket37(8,'mid');n++}
const xm=G.inbox.find(m=>m.acts&&m.acts[0]&&m.acts[0].k==='xsell');o.push('tentativas '+n+' mail '+!!xm);
const pid=xm.acts[0].p.pid,nm=P(pid).name,cx=G.fin.caixa,sq=userClub().squad.length;mailAct(xm.id,0);
o.push('venda '+nm+' caixa '+cx+'->'+G.fin.caixa+' elenco '+sq+'->'+userClub().squad.length+' no elenco '+userClub().squad.includes(pid)+' player existe '+!!G.players[pid]+' res '+xm.res);
for(let i=0;i<3;i++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound()}
o.push('ok rodadas pos venda');
return o.join('\\n')})()`));console.log(errs.slice(0,8));process.exit(0)

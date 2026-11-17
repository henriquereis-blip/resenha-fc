const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();
for(let s=0;s<5;s++){for(let r=0;r<40&&!G.summary;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();if(G.summary||G.phase==='end')break}
 if(!G.summary)endSeason();
 const h=G.wd.hist.slice(-1)[0];o.push('T'+G.season+' ('+(2026+G.season)+') UCL '+h.ucl+' UEL '+h.uel+' LIB '+h.lib+' CONC '+h.conc+' ASIA '+h.asia+' AFR '+h.afr+' INTER '+h.inter+(h.cwc?' CWC '+h.cwc:''));
 newSeason();}
o.push('--- seleções'); (G.nt2.hist||[]).slice().reverse().forEach(x=>o.push(x.y+' '+x.t+': '+(NTN[x.champ]||x.champ)+' (vice '+(NTN[x.vice]||x.vice)+') Brasil: '+x.bra));
o.push('mails pl: '+G.inbox.filter(m=>/^pl/.test(m.tag||'')).map(m=>m.title).join(' | '));
o.push('Mexico '+G.wd.lg.MEX.ti.map(x=>x.n).join(' ; '));o.push('USA '+G.wd.lg.USA.ti.map(x=>x.n).join(' ; '));o.push('KSA '+G.wd.lg.KSA.ti.map(x=>x.n).join(' ; '));
o.push('save '+JSON.stringify(G).length);
G.view='comp';S.ctab='mundo';S.wc=null;render();o.push('mundo html calendario '+document.body.innerHTML.includes('Calendário FIFA')+' campeoes '+document.body.innerHTML.includes('Campeões continentais'));
S.wc='MEX';render();o.push('MEX regras '+document.body.innerHTML.includes('Regras da liga'));
G.view='mercado';S.tab='mundo';render();o.push('mercado mundo '+document.body.innerHTML.includes('Contratar'));
return o.join('\\n')})()`));console.log(errs.slice(0,10));process.exit(0)

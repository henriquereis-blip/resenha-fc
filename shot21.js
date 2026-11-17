const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const errs=[];const man=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/ERR_FAILED/.test(m.text()))errs.push(m.text())});
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="1"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 let n=0;const shot=async(name,cap)=>{n++;const f='p8/'+String(n).padStart(2,'0')+'_'+name+'.png';await p.screenshot({path:f});man.push({f,c:cap})};
 const go=async(v)=>{await p.evaluate(v=>{S.modal=null;S.prof=null;S.paper=false;G.view=v;render();window.scrollTo(0,0)},v);await p.waitForTimeout(120)};
 console.log('cont start',await p.evaluate(()=>G.cont&&{comp:G.cont.comp,ids:G.cont.ids.map(i=>C(i).name)}));
 await go('inicio');await shot('inicio','Início com próximo jogo normal');
 // joga até a primeira fase da copa
 const log=await p.evaluate(()=>{const out=[];for(let g=0;g<400&&G.round<38;g++){const x=extraSync();render();const lab=G._x?G._x.label:null;startRound();autoPick(userClub());while(!roundDone())stepAll();const r=finishRound();if(G.press)answerPress(-1);if(lab)out.push(lab+' | '+G.lastRound.results.filter(q=>q.u).map(q=>C(q.h).sig+' '+q.hg+'-'+q.ag+' '+C(q.a).sig).join('')+' | '+(G.lastRound.cup&&G.lastRound.cup.note));if(r!=='next')break;if(out.length>=2&&!window.__s){window.__s=1;break}}return out});
 console.log(log.join('\n'));
 await p.evaluate(()=>{extraSync();render()});
 await go('inicio');await shot('proximo_extra','Início quando o próximo jogo é de copa: o painel mostra a competição e a fase');
 await go('comp');await shot('copas_cup','Copas: Copa do Brasil, fase atual, seu confronto e resultados');
 await p.evaluate(()=>{S.ctab='cont';render();window.scrollTo(0,0)});await shot('copas_cont','Copas: competição continental, seu grupo com tabela');
 // continua até fim da temporada
 const log2=await p.evaluate(()=>{const out=[];for(let g=0;g<400&&G.round<38;g++){extraSync();const lab=G._x?G._x.label:null;startRound();autoPick(userClub());while(!roundDone())stepAll();G.board.conf=100;const r=finishRound();G.board.conf=100;if(G.press)answerPress(-1);if(lab)out.push(lab+' | '+(G.lastRound.cup&&G.lastRound.cup.note));if(r==='fired')break}return {out,cup:G.cup.st,champ:G.cup.champ,cont:G.cont&&{phase:G.cont.phase,alive:G.cont.alive,md:G.cont.md,st:G.cont.st,champ:G.cont.champ,prize:G.cont.prize},caixa:G.fin.caixa,round:G.round,nfp:Object.keys(G.fp||{}).length}});
 console.log(JSON.stringify(log2,null,1));
 await go('comp');await shot('copas_fim','Copas no fim da temporada');
 await p.evaluate(()=>{S.ctab='cont';render();window.scrollTo(0,0)});await shot('cont_fim','Continental no fim da temporada');
 // vira temporada
 const ns=await p.evaluate(()=>{if(!G.summary||G.summary.season!==G.season)endSeason();const q=G.contNext;newSeason();return {cup:G.cup.st,pairs:G.cup.pairs.length,cont:G.cont&&G.cont.comp,q:q&&q.lib.includes(G.user)}});console.log(JSON.stringify(ns));
 fs.writeFileSync('p8/manifest.json',JSON.stringify(man,null,1));console.log('errs',errs);await b.close()})();

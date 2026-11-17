const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const errs=[];const man=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/ERR_FAILED/.test(m.text()))errs.push(m.text())});
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 let n=0;const shot=async(name,cap,full)=>{n++;await p.evaluate(()=>{const t=document.querySelector('.toast');if(t)t.remove()});const f='p9/'+String(n).padStart(2,'0')+'_'+name+'.png';await p.screenshot({path:f,fullPage:!!full});man.push({f,c:cap})};
 const sc=()=>p.evaluate(()=>{window.scrollTo(0,0);S.toast='';render&&0});
 // salva um jogo anterior para o título mostrar "Continuar"
 await p.evaluate(()=>{S.mg=mgNew('equil');S.obj='equ';const id=G.clubs.find(c=>c.sig==='SAN').id;startCareer(id,'Henrique','Passe',null);slotSave(1);G=null;});
 await p.reload();await p.waitForTimeout(200);
 await shot('titulo','Tela inicial: Continuar carreira, Novo jogo e Saves');
 await p.click('[data-a="step"][data-v="saves"]');await shot('saves','Saves: automático e 3 slots, com clube, temporada e rodada');
 await p.click('[data-a="step"][data-v="home"]');await p.click('[data-a="newgame"]');await sc();await shot('treinador','Passo 1: criar o treinador (nome e atributos que mudam o jogo)');
 await p.evaluate(()=>window.scrollTo(0,900));await shot('treinador_b','Passo 1: distribuição de pontos do treinador');
 await p.click('[data-a="step"][data-v="club"]');await sc();await shot('liga_clube','Passo 2: escolher a liga (Série A–D) e o clube');
 await p.click('[data-a="cdiv"][data-v="1"]');await shot('serie_b','Passo 2: trocando para a Série B');
 await p.click('[data-a="cdiv"][data-v="0"]');
 const id=await p.evaluate(()=>G.clubs.find(c=>c.sig==='SAN').id);
 await p.click(`[data-a="pickclub"][data-id="${id}"]`);await sc();await shot('previa_resumo','Prévia do clube (antes de escolher): resumo, força, base, expectativa e destaques');
 await p.click('[data-a="cpvt"][data-v="sq"]');await shot('previa_elenco','Prévia: elenco completo com posição, idade, nota, potencial e valor');
 await p.click('[data-a="cpvt"][data-v="fin"]');await shot('previa_fin','Prévia: finanças do clube antes de decidir');
 await p.click('[data-a="step"][data-v="setup"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');await p.click('[data-a="pickobj"]');await sc();await shot('filosofia','Passo 3: filosofia, auxiliar e reunião com a diretoria');
 await p.evaluate(()=>window.scrollTo(0,1400));await shot('diretoria','Passo 3: situação financeira e objetivo da diretoria');
 await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');await sc();
 await p.evaluate(()=>{S.modal=null;G.view='inicio';render()});await shot('inicio','Início: agora com confiança de diretoria, ELENCO e torcida');
 await p.evaluate(()=>{G.sqc=28;G.view='vest';render();window.scrollTo(0,0)});await shot('vest_confianca','Vestiário: card de confiança do elenco (aqui em 28, rendendo menos)');
 await p.evaluate(()=>{G.view='tatica';render();window.scrollTo(0,0)});await p.evaluate(()=>window.scrollTo(0,600));await shot('tatica_auto','Tática: seleção automática (nota, descansados, jovens) e opção de aplicar ao trocar formação');
 await p.evaluate(()=>{const c=userClub();c.squad.slice(0,6).forEach(i=>P(i).en=48)});
 await p.click('[data-a="apgo"][data-m="desc"]');await p.evaluate(()=>window.scrollTo(0,0));await shot('tatica_desc','Depois de montar por descansados: os cansados (48%) saem do time');
 for(const d of [0,1,2,3]){await p.evaluate(d=>{S.toast='';newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';const c=G.clubs.filter(x=>x.div===d).sort((a,b)=>b.rep-a.rep)[d===0?4:3];startCareer(c.id,'Henrique','Passe',null);S.modal=null;G.view='liga';S.lig='tabela';render();window.scrollTo(0,0)},d);await p.waitForTimeout(150);await shot('tabela_'+'ABCD'[d],'Tabela da Série '+'ABCD'[d]+': cada campeonato com seu próprio tom de fundo')}
 await p.evaluate(()=>{newWorld();G.phase='play';S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='SAN').id,'Henrique','Passe',null);S.modal=null;S.ctab='est';G.view='comp';render();window.scrollTo(0,0)});await shot('estadual','Copas > Estadual: tabela do campeonato estadual e próxima rodada');
 // joga o primeiro jogo do estadual com banner
 await p.evaluate(()=>{ex();extraSync();render()});
 await p.evaluate(()=>{G.view='inicio';S.modal=null;render();window.scrollTo(0,0)});await shot('prox_estadual','Início: o próximo jogo é do estadual (rodada 1 de 5)');
 const rr=await p.evaluate(()=>{const o=[];for(let g=0;g<400&&G.round<38;g++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];extraSync();const lab=G._x?G._x.label:null;startRound();autoPick(userClub());while(!roundDone())stepAll();G.board.conf=100;finishRound();if(lab&&/Paulist|Carioc|Mineiro|Ga[uú]cho/.test(lab)&&G.lastRound.cup)o.push(lab+' => '+G.lastRound.cup.note)}return o});
 console.log(rr.join('\n'));
 await p.evaluate(()=>{S.ctab='est';G.view='comp';S.modal=null;render();window.scrollTo(0,0)});await shot('estadual_fim','Estadual no fim da temporada: tabela final, final e campeão');
 await p.evaluate(()=>{G.view='opcoes';S.modal=null;render();window.scrollTo(0,0)});await shot('opcoes','Opções: salvar em slots e voltar ao menu principal');
 fs.writeFileSync('p9/manifest.json',JSON.stringify(man,null,1));console.log('errs',errs);await b.close()})();

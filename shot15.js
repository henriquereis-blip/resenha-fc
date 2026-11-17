const {chromium}=require('playwright');const fs=require('fs');
(async()=>{
 const b=await chromium.launch();const errs=[];const man=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="8"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 await p.evaluate(()=>{for(let i=0;i<11;i++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound()}
   const c=userClub();const v=vestBox();const sq=c.squad.map(id=>P(id));const a=sq[3],b2=sq[5];pers(a).pg=-1;addConf(c,'briga',a,b2);tipTick();tipTick();tipTick();render()});
 let n=0;const shot=async(name,cap)=>{n++;const f='p3/'+String(n).padStart(2,'0')+'_'+name+'.png';await p.screenshot({path:f});man.push({f,c:cap})};
 const go=async v=>{await p.evaluate(v=>{G.view=v;render()},v);await p.waitForTimeout(150)};
 await go('tatica');await shot('tatica','Tática nova (estilo FIFA): cartões de formação com entrosamento, estilos, efeitos no jogo e campo flat com camisa, nota e energia');
 await p.evaluate(()=>{const c=userClub();c.formation='4-2-3-1';c.style='Posse';autoPick(c);render()});await p.waitForTimeout(100);await shot('tatica_troca','Mesma tela depois de trocar para 4-2-3-1 e Posse: entrosamento baixo e efeito negativo aparecem nos chips');
 await go('treino');await shot('treino','Treinos: foco da semana, intensidade e entrosamento por estilo/formação');
 await go('vest');await shot('vestiario','Vestiário: clima do grupo, psicólogo, conflitos abertos com botão de dado');
 await p.evaluate(()=>{window.scrollTo(0,9999)});await p.waitForTimeout(100);await shot('vestiario_baixo','Vestiário (parte de baixo): jogadores desmotivados e tempo de jogo combinado no contrato');
 await go('assist');await shot('auxiliar','Auxiliar estilo mestre de D&D: dicas que podem estar certas ou erradas; seguir = rolar d20 contra CD');
 await p.evaluate(()=>{const t=G.tips.find(x=>x.state==='new');if(t)A.tipgo({id:t.id})});await p.waitForTimeout(150);await shot('auxiliar_dado','Depois de seguir uma dica: resultado do dado aparece no aviso e a dica vai para Resolvidas');
 await p.evaluate(()=>{window.scrollTo(0,0);G.view='tatica';render()});await p.click('[data-a="play"]');await p.evaluate(()=>{S.speed=2});
 for(const [min,name,cap] of [[12,'jogo_min12','Durante o jogo (12\'): placar, campo, pressão e a nova Rodada ao vivo com todos os jogos'],[34,'jogo_min34','Durante o jogo (34\'): rodada ao vivo destaca gols recentes e sua posição na tabela em tempo real'],[45,'intervalo','Intervalo: tela de tática com visual FIFA, cartões de formação e estilo ajustáveis'],[68,'jogo_min68','Durante o jogo (68\'): placares dos outros jogos mudando e feed de últimos gols']]){
  await p.waitForFunction(m=>R&&R.ms[R.ui].min>=m,min,{timeout:90000});await p.waitForTimeout(300);await shot(name,cap);
  if(name==='intervalo'){await p.evaluate(()=>{S.speed=2});await p.click('[data-a="mgo"]').catch(()=>{})}}
 fs.writeFileSync('p3/manifest.json',JSON.stringify(man,null,1));console.log(errs,man.length);await b.close();
})();

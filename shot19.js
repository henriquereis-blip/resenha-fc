const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const errs=[];const man=[];
 const p=await b.newPage({viewport:{width:400,height:820},deviceScaleFactor:2});
 await p.route(/^https?:\/\/(?!file)/,r=>r.abort());p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/ERR_FAILED/.test(m.text()))errs.push(m.text())});
 await p.goto('file://'+__dirname+'/resenha-fc-v2.html');
 await p.click('[data-a="pickclub"][data-id="5"]');await p.click('[data-a="pickphil"]');await p.click('[data-a="pickasst"]');
 await p.click('[data-a="pickobj"]');await p.click('[data-a="begin"]');await p.click('[data-a="pickspon"]');
 let n=0;const shot=async(name,cap)=>{n++;const f='p6/'+String(n).padStart(2,'0')+'_'+name+'.png';await p.screenshot({path:f});man.push({f,c:cap})};
 const go=async v=>{await p.evaluate(v=>{S.modal=null;S.prof=null;S.paper=false;G.view=v;render();window.scrollTo(0,0)},v);await p.waitForTimeout(150)};
 await go('staff');await shot('comissao','Comissão e contratos (janela aberta): folha vs teto da diretoria, comissão técnica com 4 cargos');
 await p.evaluate(()=>{A.hire17({r:'pf'})});await p.waitForTimeout(100);await shot('candidatos','Candidatos a preparador físico: estrelas e salário anual');
 const hire=await p.evaluate(()=>{const r=stHire('pf',0);return r});console.log('hire',hire);
 await p.evaluate(()=>{S.hire17=null;render()});await shot('comissao_contratado','Comissão com preparador físico contratado');
 // mercado: janela
 await go('mercado');await shot('mercado_janela','Mercado com o aviso de janela de transferências (verde = aberta)');
 // negociação
 const info=await p.evaluate(()=>{G.fin.caixa=300;const c=userClub();const t=G.clubs.filter(x=>x.id!==G.user&&x.rep<c.rep).map(x=>x.squad.map(id=>P(id))).flat().filter(q=>q.ovr>=c.rep-6&&q.ovr<=c.rep+1&&q.age<=29)[0];A.negopen({id:t.id});return {n:t.name,ovr:t.ovr,res:resvOf(t),ask:askPrice(t)}});console.log(info);
 await p.waitForTimeout(150);await shot('negociacao_clube','Negociação etapa 1: proposta ao clube vendedor, botões −5% / +5% / +15%');
 const log=[];
 for(let i=0;i<4&&S0();i++){}
 function S0(){return false}
 await p.evaluate(()=>{S.neg.fee=+(S.neg.fee*0.7).toFixed(1);A.negfee();});await p.waitForTimeout(120);
 const st1=await p.evaluate(()=>S.neg?{stage:S.neg.stage,msg:S.neg.msg,fee:S.neg.fee}:{closed:true,lock:G.nlock});console.log('baixa',JSON.stringify(st1));
 await p.evaluate(()=>{if(!S.neg){const t=Object.keys(G.nlock)[0];G.nlock={};A.negopen({id:+t})}S.neg.fee=+(resvOf(P(S.neg.pid))*0.9).toFixed(1);A.negfee();render()});await p.waitForTimeout(120);await shot('contraproposta','Contraproposta do clube: pedem mais, rodada 1 de 3');
 await p.evaluate(()=>{S.neg.fee=+(resvOf(P(S.neg.pid))*1.01+.05).toFixed(1);A.negfee();render()});await p.waitForTimeout(120);await shot('negociacao_jogador','Negociação etapa 2: salário pedido, luvas e folha depois da contratação vs teto');
 const res=await p.evaluate(()=>{const pid=S.neg.pid;const bef=userClub().squad.length;const cx=G.fin.caixa;S.neg.ex=3;A.negwage();return {ok:userClub().squad.includes(pid),wage:P(pid).wage,bef,aft:userClub().squad.length,dcx:+(G.fin.caixa-cx).toFixed(2),neg:!!S.neg,toast:S.toast}});console.log(JSON.stringify(res));
 // janela fechada
 await p.evaluate(()=>{G.round=10;S.modal=null;S.neg=null;render()});await go('mercado');await shot('janela_fechada','Janela fechada (rodada 10): só jogador livre');
 const cl=await p.evaluate(()=>{const t=P(G.clubs.find(x=>x.id!==G.user).squad[0]);return negStart(t.id)});console.log('closed',cl);
 await go('base');await p.evaluate(()=>window.scrollTo(0,99999));await p.waitForTimeout(150);await shot('base_nivel','Base: nível 1–10 de cada clube segundo pesquisa (CIES, Copinha, tradição)');
 // simulação com janela: contar negócios da IA
 const ai=await p.evaluate(()=>{G.round=0;let deals=0;const old=addNews;const arr=[];window.addNews=function(t){if(/^Mercado:/.test(t))arr.push(t);return old(t)};
  for(let i=0;i<24;i++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();if(G.press)answerPress(-1)}
  window.addNews=old;return {deals:arr.length,sample:arr.slice(0,4),wb:G.wb,pay:payroll(userClub()),raises:G.raises.length,sizes:Math.max(...G.clubs.map(c=>c.squad.length))}});
 console.log(JSON.stringify(ai));
 await p.evaluate(()=>{S.paper=false;S.modal=null;G.view='inicio';render()});
 const lks=await p.evaluate(()=>({go:document.querySelectorAll('.go15').length,lk:document.querySelectorAll('.lk').length}));console.log(lks);
 fs.writeFileSync('p6/manifest.json',JSON.stringify(man,null,1));console.log('errs',errs);await b.close();
})();

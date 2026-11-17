/* ui17: Fase 4 — Comissão & contratos, negociação em rodadas, janela, nível das bases, cliques extras */
(function(){const st=document.createElement('style');st.textContent=`
.win17{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;margin:8px 0;font-size:13px;font-weight:600}
.win17.on{background:#1f6f43;color:#fff}.win17.off{background:#6b3b2a;color:#fff}.win17 small{display:block;font-weight:400;opacity:.85}
.neg17 .big{font-size:30px;font-weight:800;margin:6px 0}.neg17 .row{display:flex;gap:8px;margin:8px 0}.neg17 .row .btn{flex:1}
.neg17 .msg{padding:8px 10px;border-radius:10px;background:#00000012;margin:8px 0;font-size:13px}
.st17 .rl{display:flex;align-items:center;gap:10px;padding:8px 0;border-top:1px solid #00000014}.st17 .rl:first-of-type{border-top:0}
.st17 .rl .e{font-size:24px}.st17 .rl b{display:block;font-size:13px}.st17 .rl small{opacity:.7;display:block}
.tries17{display:flex;gap:6px;margin:8px 0}.tries17 i{flex:1;height:7px;border-radius:4px;background:var(--accent)}.tries17 i.used{background:#ffffff22}
.lv17{display:inline-block;padding:2px 8px;border-radius:10px;background:#2fd36f22;font-weight:700;font-size:12px}
.bl17 .rr{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-top:1px solid #00000012;font-size:13px}.bl17 .rr small{display:block;opacity:.65}
`;document.head.appendChild(st)})();
const wbar=(pay,bud)=>{const r=Math.min(130,Math.round(pay/bud*100));return `<div class="meter"><i class="${r>100?'bad':r>88?'warn':'ok'}" style="width:${Math.min(100,r)}%"></i></div>`};
function winBanner(){const w=winInfo();return `<div class="win17 ${w.open?'on':'off'}" data-a="nav" data-v="staff"><span>${w.open?'🟢':'🔴'}</span><span>${w.txt}<small>${w.open?'Compras, vendas e empréstimos liberados.':'Só jogadores livres. Toque para ver comissão e contratos.'}</small></span></div>`}
var vStaff=function(){
  const c=userClub(),b=stBox(),pool=stPool(),pay=payroll(c),bud=wageBudget();
  const rs=Object.keys(STAFF17).map(r=>{const s=b[r],[nm,ic,ds]=STAFF17[r];
   return `<div class="rl"><span class="e">${ic}</span><span style="flex:1"><b>${s?esc(s.name):'— vago —'}</b><small>${nm}${s?' · '+starsT(s.q)+' · '+mi(s.sal)+'/ano':''}</small><small>${ds}</small></span>${s?`<button class="btn sm ghost" data-a="stfire" data-r="${r}">Demitir</button>`:''}</div>
   ${S.hire17===r?`<div style="padding:0 0 8px 34px">${pool[r].length?pool[r].map((x,i)=>`<div class="res"><span>${esc(x.name)}<br><small class="k">${starsT(x.q)} · ${mi(x.sal)}/ano</small></span><button class="btn sm" data-a="sthire" data-r="${r}" data-i="${i}">Contratar</button></div>`).join(''):'<p class="news">Sem candidatos nesta janela.</p>'}</div>`:''}
   <button class="btn sm ghost" style="margin:0 0 6px 34px" data-a="hire17" data-r="${r}">${S.hire17===r?'Fechar candidatos':s?'Trocar':'Ver candidatos'}</button>`}).join('');
  const rz=(G.raises||[]).map(r=>{const p=P(r.pid);return `<div class="res"><span>${esc(nameOf(p))}<br><small class="k">pede ${mi(r.ask)}/ano (hoje ${mi(salOf(p))}) · responda em ${Math.max(0,6-(G.round-r.r))} rodada(s)</small></span><span><button class="btn sm" data-a="raiseyes" data-id="${p.id}">Dar</button> <button class="btn sm ghost" data-a="raiseno" data-id="${p.id}">Negar</button></span></div>`}).join('');
  const top=c.squad.map(id=>P(id)).sort((a,z)=>salOf(z)-salOf(a)).slice(0,6);
  return `<div class="wrap st17"><h2>Comissão e contratos</h2>${winBanner()}
  <div class="card"><div class="k">Folha salarial · teto da diretoria</div><div class="bigtxt">${mi(pay)} <small>de ${mi(bud)}</small></div>${wbar(pay,bud)}<p class="news">Contratar acima do teto exige confiança alta da diretoria. O teto sobe com bons resultados e receita.</p></div>
  <div class="card"><div class="k">Comissão técnica · ${mi(stCost())}/ano</div>${rs}</div>
  ${rz?`<div class="card"><div class="k">Pedidos de aumento</div>${rz}</div>`:''}
  <div class="card"><div class="k">Maiores salários</div>${top.map(p=>`<div class="res"><span>${esc(nameOf(p))}</span><b>${mi(salOf(p))}</b></div>`).join('')}</div></div>`;
};
Object.assign(A,{hire17(d){S.hire17=S.hire17===d.r?null:d.r;render()},
 bidopen(d){const r=negStart(+d.id);if(r){toast(r);return}render();window.scrollTo(0,0)}});
const _vm17=vModal;vModal=function(){
  const md=S.modal;
  if(md&&md.t==='neg'&&S.neg){
    const n=S.neg,p=P(n.pid),c=userClub(),seller=C(p.club);
    if(n.stage==='fee')return `<div class="wrap neg17"><button class="back" data-a="negclose">‹ Desistir</button><div class="card"><h3>Negociação por ${esc(nameOf(p))}</h3>
     <div class="k">${esc(seller.name)} · OVR ${p.ovr} · ${p.age} anos · valor de mercado ${mi(valueOf(p))}</div>
     <div class="k">Etapa 1 de 2 · Clube vendedor · <b>${3-n.tries} tentativa(s) restante(s)</b> de 3</div><div class="big">${mi(n.fee)}</div>
     ${n.msg?`<div class="msg">${esc(n.msg)}</div>`:''}
     <div class="row"><button class="btn ghost" data-a="negbump" data-p="-5">−5%</button><button class="btn ghost" data-a="negbump" data-p="5">+5%</button><button class="btn ghost" data-a="negbump" data-p="15">+15%</button></div>
     <div class="tries17">${[0,1,2].map(i=>`<i class="${i<n.tries?'used':''}"></i>`).join('')}</div><p class="news">Até 3 rodadas de proposta. Muito abaixo do pedido o clube encerra a conversa por 4 rodadas. Caixa: ${mi(G.fin.caixa)}.</p>
     <button class="btn big" data-a="negfee">Enviar proposta</button></div></div>`;
    const lu=+(wageFair(p)*.5).toFixed(2),pay=payroll(c)+n.wage;
    return `<div class="wrap neg17"><button class="back" data-a="negclose">‹ Desistir</button><div class="card"><h3>${esc(nameOf(p))} · conversa com o jogador</h3>
     <div class="k">Etapa 2 de 2 · Salário e luvas</div>
     <div class="res"><span>Valor acertado com o clube</span><b>${mi(n.fee)}</b></div>
     <div class="res"><span>Salário pedido</span><b>${mi(n.wage)}/ano</b></div>
     <div class="res"><span>Luvas</span><b>${mi(lu)}</b></div>
     <div class="res"><span>Comissão do empresário (${Math.round(agentPct(p)*100)}% do valor)</span><b>${mi(+(n.fee*agentPct(p)).toFixed(2))}</b></div>
     <div class="res"><span>Chance do jogador aceitar</span><b>${Math.round(clamp(.62+(c.rep-seller.rep)/22+(c.humor-50)/250+(p.age>=30?.1:0)+n.ex*.25,.12,.97)*100)}%</b></div>
     <div class="k">Você tem 1 tentativa com o jogador. Mais salário aumenta a chance.</div>
     <div class="k">Folha depois: ${mi(pay)} de ${mi(wageBudget())}</div>${wbar(pay,wageBudget())}
     ${n.msg?`<div class="msg">${esc(n.msg)}</div>`:''}
     <div class="row"><button class="btn ghost" data-a="negup">Oferecer +15% de salário</button></div>
     <button class="btn big" data-a="negwage">Fechar contrato</button></div></div>`;
  }
  return _vm17();
};
const _vme17=vMercado;vMercado=function(){const h=_vme17();return h.replace(/(<div class="wrap[^"]*">)/,'$1'+winBanner())};
const _vb17=vBase;vBase=function(){
  const h=_vb17();const c=userClub();
  const list=G.clubs.filter(x=>x.div===0).map(x=>[x,baseLv(x)]).sort((a,b)=>b[1]-a[1]).slice(0,12);
  const card=`<div class="card bl17"><div class="k">Nível da base · <span class="lv17">${baseLv(c)}/10</span></div><p class="news">Os níveis iniciais seguem o ranking CIES 2025 de formadores, os títulos da Copinha e a tradição de cada clube. Investir muda o seu nível ao longo das temporadas.</p>
   ${list.map(([x,l])=>`<div class="rr"><span><b>${esc(x.name)}</b><small>${esc(BASEWHY[x.sig]||'')}</small></span><span class="lv17">${l}/10</span></div>`).join('')}</div>`;
  const ix=h.lastIndexOf('</div>');return h.slice(0,ix)+card+h.slice(ix);
};
/* cliques extras: cabeçalhos de card levam à tela do assunto; linhas de tabela abrem o clube */
const KW17=[[/Diretoria/i,'dir'],[/Patroc|Camisas|Marketing/i,'marketing'],[/Torcida|sócio/i,'torcida'],[/Estádio|ingresso/i,'estadio'],[/Base|Sub-20/i,'base'],[/Médic|lesion|DM/i,'medico'],[/Treino/i,'treino'],[/Vesti[aá]rio|clima/i,'vest'],[/Comiss|Folha salarial|Salário|aumento/i,'staff'],[/Olheiro|Mercado|Transfer/i,'mercado'],[/Tática|Formação/i,'tatica'],[/Agenda|Calend/i,'agenda'],[/Hist[oó]ria|Conquista/i,'historia']];
const _r17=render;render=function(){_r17();if(S.match)return;
  try{const root=document.querySelector('#app');if(!root)return;
    root.querySelectorAll('.card > .k:first-child, .card > h3:first-child, .sec9 h3, .sec9 > .k').forEach(e=>{if(e.dataset.a||e.closest('[data-a]'))return;const t=e.textContent;const cur=G.view;
      for(const [re,v] of KW17){if(re.test(t)&&v!==cur){e.dataset.a='nav';e.dataset.v=v;e.classList.add('go15');e.style.cursor='pointer';e.insertAdjacentHTML('beforeend',' <span style="opacity:.5">›</span>');break}}});
    root.querySelectorAll('.rank').forEach(r=>{if(r.dataset.a)return;const n=r.querySelector('.pn span:last-child,.pn');if(!n)return;const nm=n.textContent.trim();const cl=G.clubs.find(x=>x.name===nm);if(cl){r.dataset.a='clk';r.dataset.id=cl.id;r.classList.add('go15')}});
    root.querySelectorAll('.res').forEach(r=>{if(r.dataset.a||r.querySelector('[data-a]'))return;const t=r.firstElementChild&&r.firstElementChild.textContent||'';
      if(/Folha|Sal[aá]rios/.test(t)){r.dataset.a='nav';r.dataset.v='staff';r.classList.add('go15')}else if(/Patroc|Camisa/.test(t)){r.dataset.a='nav';r.dataset.v='marketing';r.classList.add('go15')}else if(/Ingresso|Bilheteria|Estádio/.test(t)){r.dataset.a='nav';r.dataset.v='estadio';r.classList.add('go15')}});
  }catch(e){console.error('click17 '+e.message)}
};

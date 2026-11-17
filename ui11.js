/* ui11: Departamento Médico e Diretoria (metas, paciência, eleição) */
(function(){const st=document.createElement('style');st.textContent=`
.x9 .pbar{height:9px;background:var(--line);border-radius:9px;overflow:hidden;margin-top:4px}.x9 .pbar i{display:block;height:100%;background:var(--accent);border-radius:9px}
.x9 .pbar.bad i{background:var(--bad)}.x9 .pbar.warn i{background:var(--warn)}.x9 .pbar.ok i{background:var(--ok)}
.x9 .inj{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:8px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}.x9 .inj:last-child{border:0}
.x9 .inj .rd{font:800 22px var(--fh);text-align:center;line-height:1}.x9 .inj .rd small{display:block;font:600 10px var(--fh);color:var(--mut)}
.x9 .inj b{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.x9 .inj small{color:var(--mut)}
.x9 .goal{padding:9px 0;border-bottom:1px solid var(--line)}.x9 .goal:last-child{border:0}.x9 .goal .gh{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.x9 .goal .gh b{font:800 17px var(--fh);letter-spacing:.02em}.x9 .goal small{color:var(--mut);display:block;margin-top:2px}
.x9 .pill.warn{background:rgba(226,154,0,.22);color:var(--warn)}
.x9 .stf{display:grid;grid-template-columns:36px minmax(0,1fr) auto;gap:10px;align-items:center;padding:9px 0;border-bottom:1px solid var(--line)}.x9 .stf:last-child{border:0}
.x9 .elec{border:1.5px solid var(--accent);border-radius:12px;padding:10px;background:rgba(0,0,0,.03)}
.x9 .vote{display:flex;height:20px;border-radius:6px;overflow:hidden;margin:6px 0}.x9 .vote i{display:grid;place-items:center;font:700 11px var(--fh);color:#fff}

.x9 .stf b,.x9 .inj b,.x9 .rank .pn span,.x9 .goal .gh b,.x9 .slot .nm b,.x9 .elec b{text-transform:none;letter-spacing:0;font-family:inherit;font-weight:700;font-size:15px}
.x9 .rank{grid-template-columns:36px minmax(0,1fr) auto}.x9 .stf b{display:block}.x9 .inj .rd{font-family:var(--fh),sans-serif}.x9 .rank .pn span{font-weight:600}.x9 .stf small,.x9 .goal small,.x9 .inj small{display:block}
`;document.head.appendChild(st)})();

const pill=(t,c='')=>`<span class="pill ${c}">${t}</span>`;
const barH=(p,cls='')=>`<div class="pbar ${cls}"><i style="width:${clamp(Math.round(p),0,100)}%"></i></div>`;
const lvdots=n=>`<div class="lvl">${[0,1,2,3,4].map(i=>`<i class="${i<n?'on':''}"></i>`).join('')}</div>`;

function vMedico(){
  ex();ex11a();const c=userClub(),m=G.med;
  const hurt=c.squad.map(id=>P(id)).filter(p=>p.inj>0).sort((a,b)=>b.inj-a.inj);
  const back=c.squad.map(id=>P(id)).filter(p=>p.inj===0&&p.rtp>0);
  const risk=c.squad.map(id=>P(id)).filter(p=>p.inj===0).map(p=>({p,r:riskOf(p)})).sort((a,b)=>b.r-a.r).slice(0,6);
  const avgInj=m.season.n?(m.season.days/m.season.n).toFixed(1):'0';
  const key=hurt.filter(p=>p.ovr>=c.squad.map(id=>P(id).ovr).sort((a,b)=>b-a)[11]);
  return `<div class="wrap x9"><h2>Departamento médico · ${esc(c.name)}</h2>
  <div class="card"><div class="row3"><div class="tile9"><div class="k">No DM agora</div><div class="v" style="color:${hurt.length>=5?'var(--bad)':'inherit'}">${hurt.length}</div></div>
   <div class="tile9"><div class="k">Lesões na temporada</div><div class="v">${m.season.n}</div></div>
   <div class="tile9"><div class="k">Média de recuperação</div><div class="v">${avgInj}</div><div class="k">rodadas</div></div></div>
   ${key.length?`<p class="news">Titulares fora: ${key.map(p=>esc(lastName(p.name))).join(', ')}.</p>`:''}</div>
  ${sec9('Comissão médica',Object.keys(MEDN).map(k=>{const lv=m[k],cost=medCost(k,lv);return `<div class="stf"><div class="ic" style="width:36px;height:36px;border-radius:9px;background:var(--line);display:grid;place-items:center;font-size:18px">${MEDN[k][1]}</div><div><b>${MEDN[k][0]} · nível ${lv}/5</b><small class="k">${MEDN[k][2]}</small>${lvdots(lv)}</div>${lv<5?`<button class="btn sm" data-a="medup" data-k="${k}">${mi(cost)}</button>`:pill('máx.','ok')}</div>`}).join('')+`<p class="foot">Manutenção da comissão: ${mi(medMaint()*38)} por temporada.</p>`,'investimento')}
  ${sec9('Lesionados',hurt.length?hurt.map(p=>{const tot=p.injN||p.inj,ret=Math.min(NR(),G.round+p.inj);
    const surg=(p.injG==='joelho'||p.injG==='osso')&&p.inj>=8&&!p.surg;
    return `<div class="inj"><div class="rd">${p.inj}<small>rod.</small></div><div><b><a data-a="medprof" data-id="${p.id}" style="text-decoration:underline">${esc(nameOf(p))}</a></b><small>${roleLabel(p)} · F${p.ovr} · ${esc(p.injT||'lesão')} · ${sevOf(tot)}${p.surg?' · operado':''}</small>${barH((1-p.inj/tot)*100)}<small>${ret>=38?'volta só na próxima temporada':'volta na rodada '+(ret+1)}</small></div>${surg?`<button class="btn sm" data-a="medsurg" data-id="${p.id}">Operar · ${mi(scaleOf(c)*.012)}</button>`:pill(sevOf(tot),tot>12?'bad':tot>6?'warn':'')}</div>`}).join(''):'<p class="news">Ninguém no DM. Departamento médico de folga.</p>',`${hurt.length}`)}
  ${back.length?sec9('Em retorno',back.map(p=>`<div class="inj"><div class="rd">${p.rtp}<small>rod.</small></div><div><b>${esc(nameOf(p))}</b><small>Sem ritmo de jogo: risco de recaída ×1,8 e fôlego limitado</small></div>${pill('cuidado','warn')}</div>`).join(''),'recondicionando'):''}
  ${sec9('Risco de lesão',risk.map(({p,r})=>`<div class="rank"><span class="pos">${roleLabel(p)}</span><div class="pn"><span>${esc(nameOf(p))}</span><small class="k">${p.age}a · E${Math.round(p.en)}${p.en<65?' · cansado':''}${p.rtp>0?' · retorno':''}</small></div><div class="n" style="color:${r>1.6?'var(--bad)':r>1.2?'var(--warn)':'inherit'}">${r>1.6?'alto':r>1.2?'médio':'baixo'}</div></div>`).join('')+'<p class="foot">Quem joga cansado, tem mais de 30 anos ou acabou de voltar de lesão corre mais risco. Poupe no banco antes de jogo decisivo.</p>','prevenção')}
  ${sec9('Histórico',m.hist.length?m.hist.slice(0,8).map(h=>`<div class="rank"><span class="pos">R${h.r+1}</span><div class="pn"><span>${esc(h.n)}</span><small class="k">${esc(h.t)}${h.rel?' · recaída':''}</small></div><div class="n">${h.d}</div></div>`).join(''):'<p class="news">Sem lesões registradas.</p>',`${m.seasons.length?m.seasons.length+' temp. anteriores':''}`)}
  <p class="foot">Tempos de recuperação baseados em casos reais: estiramentos 3 a 6 rodadas, entorse 3 a 7, fratura 9 a 15, menisco 8 a 16 e ruptura de LCA entre 6 e 8 meses (quase uma temporada inteira).</p></div>`;
}

function goalRow(g,main){
  if(main){const pos=posOf(userClub()),ok=pos<=G.board.meta;
    return `<div class="goal"><div class="gh"><b>🎯 Meta principal</b>${pill(ok?'no alvo':'abaixo',ok?'ok':pos<=G.board.meta+3?'warn':'bad')}</div><small>${esc(G.board.metaTxt)}. Hoje: ${pos}º.</small>${barH(clamp(100-(pos-G.board.meta)*9,5,100),ok?'ok':pos<=G.board.meta+3?'warn':'bad')}</div>`}
  const pr=goalProg(g);const late=G.round>=26&&!pr.ok;
  return `<div class="goal"><div class="gh"><b>${esc(g.t)}</b>${pill(pr.ok?'no alvo':late?'em risco':'em curso',pr.ok?'ok':late?'warn':'')}</div><small>${esc(g.d)}</small>${barH(pr.pct,pr.ok?'ok':late?'warn':'')}<small>${esc(pr.txt)}</small></div>`;
}
function elecBlock(){
  ensureEl();const e=G.el,pf=presOf(e.pres.pf);const camp=G.season>=e.termEnd;
  const lastH=e.last;
  let h=`<div class="slot"><div class="ic">🏛️</div><div class="nm"><b>${esc(e.pres.name)}</b><small>${pf.n} · aprovação ${e.pres.ap}% · desde ${e.pres.since}</small></div></div><p class="news">${esc(pf.d)}</p>`;
  h+=camp?`<div class="elec"><b>🗳️ Eleição ao fim desta temporada</b><p class="news">Mandato do presidente termina agora. ${e.stance==='apoio'?'Você declarou apoio à situação.':e.stance==='neutro'?'Você ficou neutro.':'Você ainda não se posicionou (pergunta chega na coletiva).'}</p>${G.press&&G.press.who==='Eleição no clube'?'<p class="news">Responda a pergunta do clube na tela do jornal.</p>':''}</div>`:`<p class="news">Próxima eleição: ao fim da temporada ${e.termEnd}. Fase boa e contas em dia ajudam o presidente; ele manda no orçamento e na pressão por resultado.</p>`;
  if(lastH)h+=`<div class="k">Última eleição · ${lastH.s}</div><div class="vote"><i style="width:${lastH.shares[0]}%;background:var(--ok)">${lastH.shares[0]}%</i>${lastH.shares.slice(1).map((x,i)=>`<i style="width:${x}%;background:${i?'#6b7a90':'var(--bad)'}">${x}%</i>`).join('')}</div><p class="news">${lastH.win?'Reeleito: '+esc(lastH.winner):'Derrota da situação. Novo presidente: '+esc(lastH.winner)+' ('+presOf(lastH.newpf).n+')'}.</p>`;
  return h;
}
function vDir(){
  ex();ex11a();ensureEl();const c=userClub(),g=G.goals,p=G.pat,conf=G.board.conf;
  const hist=g.hist.slice(-6).reverse();
  return `<div class="wrap x9"><h2>Diretoria · ${esc(c.name)}</h2>
  <p class="news">${DIVN[c.div]} · tradição ${c.trad}/100 · ${c.trad>=80?'clube gigante: rebaixamento é inaceitável.':c.trad>=60?'clube tradicional: a torcida cobra acesso rápido.':'clube de projeto: a queda dói, mas não é o fim do mundo.'}</p>
  <div class="card"><div class="row2"><div><div class="k">Confiança no técnico</div><div class="bigtxt">${Math.round(conf)}</div>${barH(conf,conf<35?'bad':conf<55?'warn':'ok')}</div>
   <div><div class="k">Paciência da diretoria</div><div class="bigtxt">${Math.round(p.bd)}</div>${barH(p.bd,p.bd<35?'bad':p.bd<55?'warn':'ok')}<div class="k" style="margin-top:6px">Paciência da torcida ${Math.round(p.fan)}</div>${barH(p.fan,p.fan<35?'bad':p.fan<55?'warn':'ok')}</div></div>
   <p class="news">Paciência é crédito acumulado: resultado bom e metas cumpridas aumentam. Com crédito alto, a diretoria demora a demitir, o clube ganha folga de caixa e a torcida perdoa fases ruins.</p></div>
  ${sec9('Metas da temporada '+G.season,goalRow(null,true)+g.list.map(x=>goalRow(x,false)).join(''),G.round+'/'+NR())}
  ${sec9('Presidência e eleição',elecBlock())}
  ${sec9('Balanço das temporadas',hist.length?hist.map(h=>`<div class="goal"><div class="gh"><b>Temporada ${h.s} · ${h.pos}º</b>${pill(h.met?'meta batida':'meta falhou',h.met?'ok':'bad')}</div>${h.list.map(x=>`<small>${x.ok?'✅':'❌'} ${esc(x.t)} · ${esc(x.txt)}</small>`).join('')}</div>`).join(''):'<p class="news">O primeiro balanço sai no fim da temporada.</p>')}
  <div class="row2"><button class="btn ghost big" data-a="paper">📰 Jornal</button><button class="btn ghost big" data-a="leave">🚪 Deixar o clube</button></div></div>`;
}

/* injury info in player profile */
const _vp11=vPerfil;vPerfil=function(){
  let r=_vp11();const p=P(S.prof);if(!p)return r;
  if(p.club<0)return r;
  let ex_='';
  if(p.inj>0)ex_=`<div class="x9"><div class="card alert9"><div class="k">🚑 Lesionado</div><b>${esc(p.injT||'Lesão')}</b> · ${sevOf(p.injN||p.inj)} · volta em ${p.inj} rodada${p.inj>1?'s':''}${p.surg?' · operado':''}</div></div>`;
  else if(p.rtp>0)ex_=`<div class="x9"><div class="card"><div class="k">Em retorno de lesão (${p.rtp} rod.): sem ritmo e risco de recaída.</div></div></div>`;
  if(p.injHist&&p.club===G.user)ex_+=`<div class="x9"><div class="k" style="margin:6px 0">Histórico: ${p.injHist} lesão${p.injHist>1?'ões':''} na carreira · propenso: ${proneOf(p)>1.25?'sim':proneOf(p)<.85?'não':'normal'}</div></div>`;
  return r.replace(/<\/div>$/,ex_+'</div>');
};

/* balanço de metas no fim da temporada */
const _vm11=vModal;vModal=function(){
  const h=_vm11();const md=S.modal;
  if(!md||md.t!=='season'||!G.summary||!G.summary.goals)return h;
  const s=G.summary;
  const ex_=`<div class="x9"><div class="card"><h3>Balanço das metas</h3>${s.goals.map(x=>`<div class="goal"><div class="gh"><b>${x.ok?'✅':'❌'} ${esc(x.t)}</b></div><small>${esc(x.txt)}</small></div>`).join('')}
   <p class="news">Paciência: diretoria ${s.pat.bd} · torcida ${s.pat.fan}.</p>
   ${s.elec?`<div class="elec"><b>🗳️ Eleição no clube</b><div class="vote"><i style="width:${s.elec.shares[0]}%;background:var(--ok)">${s.elec.shares[0]}%</i>${s.elec.shares.slice(1).map((x,i)=>`<i style="width:${x}%;background:${i?'#6b7a90':'var(--bad)'}">${x}%</i>`).join('')}</div><p class="news">${s.elec.win?esc(s.elec.winner)+' foi reeleito.':esc(s.elec.winner)+' ('+presOf(s.elec.newpf).n+') venceu e assume na próxima temporada.'}</p></div>`:''}</div></div>`;
  return h.replace('<button class="btn big" data-a="newseason">',ex_+'<button class="btn big" data-a="newseason">');
};

Object.assign(A,{medprof(d){S.prof=+d.id;render();window.scrollTo(0,0)}});

/* propostas de outros clubes (sucesso) e pedido de demissão voluntário */
function jobOffers(good){
  const c=userClub();const base=c.rep+(good?3:0);
  return G.clubs.filter(x=>x.id!==c.id).map(x=>({x,d:Math.abs(x.rep-(base+rnd(-2.5,2.5)))})).sort((a,b)=>a.d-b.d).slice(0,3).map(o=>o.x.id);
}
const _vm11b=vModal;vModal=function(){
  const md=S.modal;let h=_vm11b();
  if(md&&md.t==='fired'&&md.resign){
    h=h.replace('Você foi demitido','Procurar novo clube').replace(/<p class="news">A diretoria[^<]*<\/p>/,'<p class="news">Você pediu para sair do '+esc(userClub().name)+'. Estes clubes querem conversar. Seu histórico de técnico vai com você; elenco, caixa, paciência e metas começam do zero no novo clube.</p>')
     .replace(/<\/div>$/,'<button class="btn ghost big" data-a="stay">Ficar no '+esc(userClub().name)+'</button></div>');
  }
  if(md&&md.t==='season'&&G.summary&&G.summary.jobs&&G.summary.jobs.length){
    const ex_=`<div class="x9"><div class="card"><h3>📨 Propostas de outros clubes</h3><p class="news">O bom trabalho chamou atenção. Aceitar encerra sua passagem pelo ${esc(userClub().name)}.</p>${G.summary.jobs.map(id=>`<button class="offer" data-a="takejob" data-id="${id}"><b>${crest(C(id),22)} ${esc(C(id).name)}</b><span>reputação ${C(id).rep}</span><small>${posOf(C(id))}º na tabela · caixa ${mi(C(id).caixa)}</small></button>`).join('')}</div></div>`;
    h=h.replace('<button class="btn big" data-a="newseason">',ex_+'<button class="btn big" data-a="newseason">');
  }
  return h;
};
Object.assign(A,{leave(){ex();S.modal={t:'fired',offs:jobOffers(false),resign:true};render();window.scrollTo(0,0)},stay(){S.modal=null;render()}});

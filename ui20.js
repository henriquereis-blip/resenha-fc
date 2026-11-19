/* ui20: fluxo inicial (título, saves, treinador, liga e clube com elenco), confiança do elenco, seleção automática, tom das tabelas */
(function(){const st=document.createElement('style');st.textContent=`
.st20{display:flex;gap:6px;margin:4px 0 2px}.st20 span{flex:1;text-align:center;font:700 11px var(--fh);letter-spacing:.08em;text-transform:uppercase;padding:7px 4px;border-radius:10px;background:#ffffff0a;color:var(--mut);border-bottom:2px solid transparent}
.st20 span.on{color:var(--accent);background:#35f0a014;border-color:var(--accent)}.st20 span.ok{color:var(--text)}
.ti20{display:flex;flex-direction:column;gap:10px;align-items:stretch;min-height:78vh;justify-content:center}
.ti20 .logo{text-align:center;margin-bottom:2px}.ti20 .lead{text-align:center}
.ti20 .mb20{display:flex;align-items:center;gap:12px;text-align:left;padding:14px 16px;border-radius:16px;border:1px solid var(--line);background:var(--card);color:inherit;font:700 15px var(--fb)}
.ti20 .mb20 b{font:800 17px var(--fh);letter-spacing:.02em;text-transform:uppercase;display:block}.ti20 .mb20 small{color:var(--mut);font:500 12px var(--fb)}
.ti20 .mb20.pri{background:linear-gradient(135deg,#35f0a0,#16b873);color:#03150d;border:0}.ti20 .mb20.pri small{color:#03150dcc}.ti20 .mb20 .ic{font-size:24px}
.sl20{display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;padding:12px;border:1px solid var(--line);border-radius:14px;background:var(--card)}
.sl20 .cr{display:flex;gap:10px;align-items:center;min-width:0}.sl20 .cr div{min-width:0}.sl20 b{display:block;font:800 15px var(--fh)}.sl20 small{color:var(--mut)}
.sl20 .bt{display:flex;gap:6px}.sl20.em{opacity:.6}
.pv20 .hd{display:flex;gap:12px;align-items:center;padding:14px;border-radius:16px;background:linear-gradient(135deg,#ffffff10,#ffffff04);border:1px solid var(--line)}
.pv20 .hd h2{margin:0;font:800 22px var(--fh)}.pv20 .hd small{color:var(--mut);display:block}
.pv20 .tabs{display:flex;gap:6px}.pv20 .tabs button{flex:1;padding:9px 4px;border-radius:10px;border:1px solid var(--line);background:transparent;color:var(--mut);font:700 12px var(--fh);letter-spacing:.06em;text-transform:uppercase}
.pv20 .tabs button.on{background:#35f0a014;border-color:var(--accent);color:var(--accent)}
.pv20 .sq20{width:100%;border-collapse:collapse;font-size:13px}.pv20 .sq20 th{font:700 10px var(--fh);letter-spacing:.1em;text-transform:uppercase;color:var(--mut);text-align:left;padding:4px}
.pv20 .sq20 td{padding:6px 4px;border-top:1px solid #ffffff0d}.pv20 .sq20 .o{font:800 14px var(--fh);color:var(--accent)}.pv20 .sq20 .g{color:var(--mut)}
.pv20 .sq20 td.pp{font:700 11px var(--fh);color:var(--accent2)}
.btnrow20{display:flex;gap:8px}.btnrow20 .btn{flex:1}
.ap20{min-width:0;overflow:hidden}.ap20 .opts{display:grid;gap:8px}.ap20 .opt20{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;padding:8px 10px;border:1px solid var(--line);border-radius:12px}.ap20 .opt20>span{min-width:0}.ap20 .opt20 small{display:block;color:var(--mut);font:500 12px var(--fb);text-transform:none;letter-spacing:0;line-height:1.5;white-space:normal}.ap20 .opt20 b{text-transform:none;letter-spacing:0;font:700 14px var(--fb)}.ap20 .chk{display:flex;gap:8px;align-items:flex-start;font-size:12px;text-transform:none;letter-spacing:0;white-space:normal}
.ap20 .opt20.sel{border-color:var(--accent);background:#35f0a010}.ap20 select{background:var(--card);color:inherit;border:1px solid var(--line);border-radius:8px;padding:6px}
.sqc20 .meter{margin:6px 0}
.tbl.lt0{--lt:#35f0a0;--lm:17%}.tbl.lt1{--lt:#2ed08c;--lm:12%}.tbl.lt2{--lt:#27ab78;--lm:8%}.tbl.lt3{--lt:#1f8a62;--lm:5%}
.tbl[class*=lt]{background:linear-gradient(180deg,color-mix(in srgb,var(--lt) var(--lm),var(--card)),color-mix(in srgb,var(--lt) calc(var(--lm)/3),var(--card)));border:1px solid color-mix(in srgb,var(--lt) 28%,transparent);border-radius:16px;overflow:hidden}
.tbl[class*=lt] .tr.hd{color:var(--lt);background:color-mix(in srgb,var(--lt) 10%,transparent)}.tbl[class*=lt] .tr.me{background:color-mix(in srgb,var(--lt) 20%,transparent)}
`;document.head.appendChild(st)})();

const STEPS20=[['coach','Treinador'],['club','Clube'],['setup','Diretoria']];
function stepper(cur){const i=cur==='preview'?1:STEPS20.findIndex(x=>x[0]===cur);return `<div class="st20">${STEPS20.map((s,k)=>`<span class="${k===i?'on':k<i?'ok':''}">${k+1} · ${s[1]}</span>`).join('')}</div>`}
function slotRow(i){
  const f=slotInfo(i),nm=i===0?'Automático':'Slot '+i;
  if(!f)return `<div class="sl20 em"><div class="cr"><div><b>${nm}</b><small>vazio</small></div></div><div class="bt"></div></div>`;
  const dv=['Série A','Série B','Série C','Série D'][f.div];
  return `<div class="sl20"><div class="cr">${f.cr}<div><b>${esc(f.club)}</b><small>${esc(f.coach)} · ${dv} · temporada ${f.season}, rodada ${Math.min(f.round+1,38)}</small></div></div><div class="bt"><button class="btn sm" data-a="slload" data-i="${i}">Carregar</button><button class="btn sm ghost" data-a="sldel" data-i="${i}">🗑</button></div></div>`;
}
function vTitle(){
  const f=slotInfo(0);
  return `<div class="wrap ti20"><div class="logo"><b>RESENHA</b><span>FC</span></div><p class="lead">Melhor que Brasfoot, menos burocrático que Football Manager.</p>
  ${f?`<button class="mb20 pri" data-a="cont"><span class="ic">▶</span><span><b>Continuar carreira</b><small>${esc(f.club)} · temporada ${f.season}, rodada ${Math.min(f.round+1,38)}</small></span></button>`:''}
  <button class="mb20 ${f?'':'pri'}" data-a="newgame"><span class="ic">✨</span><span><b>Novo jogo</b><small>Crie seu treinador, escolha liga e clube</small></span></button>
  <button class="mb20" data-a="step" data-v="saves"><span class="ic">💾</span><span><b>Saves</b><small>Carregar ou apagar jogos salvos</small></span></button>
  <p class="foot">Elencos baseados em dados de memória (podem estar desatualizados). Atributos e escudos são inventados.</p></div>`;
}
function vSaves(){
  return `<div class="wrap"><button class="back" data-a="step" data-v="home">‹ Início</button><h2>Saves</h2>${[0,1,2,3].map(slotRow).join('')}<p class="foot">Dentro do jogo, em Opções, você salva nos slots 1 a 3. O automático é gravado a cada rodada.</p></div>`;
}
function vCoachStep(){
  return `<div class="wrap">${stepper('coach')}<button class="back" data-a="step" data-v="home">‹ Início</button>
  <label class="fld">Nome do técnico<input id="coach" value="${esc(S.coachName)}" placeholder="Ex.: Henrique" maxlength="24"></label>
  ${mgCreator()}
  <button class="btn big" data-a="step" data-v="club">Escolher liga e clube ›</button></div>`;
}
function vClubStep(){
  const list=G.clubs.filter(c=>c.div===(S.cdiv||0)).sort((a,b)=>b.rep-a.rep);
  return `<div class="wrap">${stepper('club')}<button class="back" data-a="step" data-v="coach">‹ Treinador</button><h2>Liga e clube</h2>
  <p class="hint">Toque num clube para ver elenco, finanças e expectativas antes de decidir.</p>
  <div class="seg sm">${['A','B','C','D'].map((x,i)=>`<button class="${(S.cdiv||0)===i?'on':''}" data-a="cdiv" data-v="${i}">Série ${x}</button>`).join('')}</div>
  <div class="clubs">${list.map(c=>`<button class="club ${S.sc===c.id?'sel':''}" data-a="pickclub" data-id="${c.id}">${crest(c,34)}<span class="cn">${c.name}<small>${finTag(c)}</small></span><span class="rep">${c.rep}</span></button>`).join('')}</div></div>`;
}
function vPreview(){
  const c=C(S.sc);ex7();const tab=S.cpv||'res';
  const rk=G.clubs.filter(x=>x.div===c.div).sort((a,b)=>b.rep-a.rep).findIndex(x=>x.id===c.id)+1;
  const sq=c.squad.map(id=>P(id));const top=sq.slice().sort((a,b)=>b.ovr-a.ovr);
  const avg=Math.round(top.slice(0,14).reduce((s,p)=>s+p.ovr,0)/14);
  const f=fr(c),r=ratio0(c);const hc=r>=1.5?['bad','Crítica']:r>=.8?['warn','Atenção']:['ok','Saudável'];
  let b='';
  if(tab==='res'){
    const exp=rk<=3?'Brigar pelo título':rk<=6?'Vaga em torneio continental':rk<=12?'Parte de cima da tabela':'Fugir do rebaixamento';
    b=`<div class="card"><div class="res"><span>Divisão</span><b>${DIVN[c.div]}</b></div><div class="res"><span>Força do elenco (top 14)</span><b>${avg}</b></div><div class="res"><span>Ranking na divisão</span><b>${rk}º de ${G.clubs.filter(x=>x.div===c.div).length}</b></div><div class="res"><span>Tradição</span><b>${c.trad}/100</b></div><div class="res"><span>Estádio</span><b>${(c.cap||0).toLocaleString('pt-BR')} lugares</b></div><div class="res"><span>Base (nível)</span><b>${(()=>{const v=BASELV[c.sig];if(v)return Math.ceil(v/10)+'/10';const q=baseLv(c);return isNaN(q)?'–':q+'/10'})()}</b></div><div class="res"><span>Expectativa</span><b>${exp}</b></div></div>
    <div class="card"><div class="k">Destaques</div>${top.slice(0,5).map(p=>`<div class="res"><span>${esc(nameOf(p))} <small class="k">· ${p.age} anos</small></span><b>${p.ovr}</b></div>`).join('')}</div>`;
  }else if(tab==='sq'){
    const ord={GOL:0,ZAG:1,LAT:2,VOL:3,MEI:4,PNT:5,ATA:6};
    const rows=sq.slice().sort((a,b)=>(ord[a.role]??9)-(ord[b.role]??9)||b.ovr-a.ovr);
    b=`<div class="card"><table class="sq20"><thead><tr><th>Pos</th><th>Jogador</th><th>Pé</th><th>Id</th><th>Nota</th><th>Pot.</th><th>Valor</th></tr></thead><tbody>${rows.map(p=>`<tr><td class="pp">${roleLabel(p)}</td><td>${esc(nameOf(p))}</td><td class="g">${footOf(p)}</td><td class="g">${p.age}</td><td class="o">${p.ovr}</td><td class="g">${p.age<=22?p.pot:'–'}</td><td class="g">${mi(valueOf(p))}</td></tr>`).join('')}</tbody></table></div>`;
  }else{
    b=`<div class="card fin"><div class="k">Situação financeira</div><div class="res"><span>Dívida real (dez/2025)</span><b>${bi(f[0])}</b></div><div class="res"><span>Receita 2025${f[3]?' (estimada)':''}</span><b>${bi(f[1])}</b></div><div class="res"><span>Dívida / receita</span><b class="${hc[0]}">${r.toFixed(1)}× · ${hc[1]}</b></div><div class="res"><span>Fair Play Financeiro</span><b style="font:600 13px var(--fb);text-align:right;max-width:62%">${FPTXT[f[2]]}</b></div><div class="res"><span>Orçamento inicial (base)</span><b>${mi(budgetFor(c,null))}</b></div></div>`;
  }
  return `<div class="wrap pv20">${stepper('preview')}<button class="back" data-a="step" data-v="club">‹ Clubes</button>
  <div class="hd">${crest(c,52)}<div><h2>${c.name}</h2><small>${DIVN[c.div]} · ${rk}º em força · ${finTag(c)}</small></div></div>
  <div class="tabs">${[['res','Resumo'],['sq','Elenco'],['fin','Finanças']].map(([k,l])=>`<button class="${tab===k?'on':''}" data-a="cpvt" data-v="${k}">${l}</button>`).join('')}</div>${b}
  <button class="btn big" data-a="step" data-v="setup">Escolher o ${c.name} ›</button></div>`;
}
function vSetup(){
  const c=C(S.sc);
  return `<div class="wrap">${stepper('setup')}<button class="back" data-a="step" data-v="preview">‹ ${c.name}</button>
  <h2>Filosofia do clube</h2><p class="hint">Define o estilo do clube. Jogadores com bom encaixe rendem mais; o encaixe evolui com o treino.</p><div class="phils">${PHILS.map(([n,d])=>`<button class="phil ${S.sp===n?'sel':''}" data-a="pickphil" data-p="${n}"><b>${n}</b><small>${d}</small></button>`).join('')}</div>
  ${S.sp&&S.asst?`<h2>Auxiliar técnico</h2><p class="hint">Só treina bem a filosofia que ele domina. Se for diferente da sua, o treino rende pouco.</p><div class="phils">${S.asst.map((a,i)=>`<button class="phil ${S.sa===i?'sel':''}" data-a="pickasst" data-i="${i}"><b>${a.name}</b><small>Domina: ${a.phil} · qualidade ${'★'.repeat(a.q)} · salário ${mi(a.sal)}/ano · ${S.sp===a.phil?'combina com o clube':'não combina'}</small></button>`).join('')}</div>`:''}
  ${S.sp&&S.sa!==null?objStep(S.sc).replace('4 · Reunião','Reunião'):''}
  <button class="btn big" data-a="begin" ${S.sp&&S.sa!==null&&S.obj?'':'disabled'}>Começar carreira</button></div>`;
}
vStart=function(){
  if(!S.mg)S.mg=mgNew('equil');
  const st=S.step||'home';
  return st==='home'?vTitle():st==='saves'?vSaves():st==='coach'?vCoachStep():st==='club'?vClubStep():st==='preview'&&S.sc!==null?vPreview():st==='setup'&&S.sc!==null?vSetup():vTitle();
};
Object.assign(A,{
  step(d){S.step=d.v;S.confirmReset=false;render();window.scrollTo(0,0)},
  newgame(){S.step='coach';S.sc=null;S.sp=null;S.sa=null;S.obj=null;render();window.scrollTo(0,0)},
  pickclub(d){S.sc=+d.id;S.cpv='res';S.sp=null;S.sa=null;S.obj=null;S.step='preview';render();window.scrollTo(0,0)},
  cpvt(d){S.cpv=d.v;render()},
  slload(d){if(slotLoad(+d.i)){if(G.round>=38){if(!G.summary)endSeason();G.phase='seasonEnd';S.modal={t:'season'}}render()}else toast('Não consegui carregar esse save.')},
  sldel(d){slotDel(+d.i);render()},
  slsave(d){if(slotSave(+d.i))toast('Salvo no slot '+d.i+'.');render()},
  tomenu(){save();newWorld();G.phase='start';S.step='home';S.modal=null;render();window.scrollTo(0,0)},
    apgo(d){const c=userClub(),m=G.autoMode;const sel=document.getElementById('ap_'+d.m);if(sel&&d.m==='desc')m.val.desc=+sel.value;m.val.jov=23;m.mode=d.m;
    autoPickMode(c,d.m,d.m==='nota'?0:m.val[d.m]);S.psel=null;save();toast('Time montado: '+modeLbl(d.m,m.val[d.m])+'.');render()},
  apon(){G.autoMode.on=!G.autoMode.on;save();render()},
});
const _sf20=A.setform;A.setform=function(d){_sf20.call(this,d);try{const m=G.autoMode;if(m&&m.on&&m.mode!=='nota'){autoPickMode(userClub(),m.mode,m.val[m.mode]);save();render()}}catch(e){}};

/* ---------- tática: painel de seleção automática ---------- */
hookAround('vTatica','vt20',function(next,__a){
  let h=next();const m=G.autoMode||{mode:'nota',val:{desc:75,jov:23},on:false};
  const sel=(id,vals,cur,suf)=>`<select id="${id}">${vals.map(v=>`<option value="${v}" ${v===cur?'selected':''}>${v}${suf}</option>`).join('')}</select>`;
  const p=`<div class="card ap20"><div class="k">Seleção automática</div><div class="opts">
   <div class="opt20 ${m.mode==='nota'?'sel':''}"><span><b>Melhores por nota</b><small>Os 11 de maior nota para cada posição.</small></span><button class="btn sm" data-a="apgo" data-m="nota">Montar</button></div>
   <div class="opt20 ${m.mode==='desc'?'sel':''}"><span><b>Descansados</b><small>Só quem está com fôlego acima de ${sel('ap_desc',[60,70,75,80,90],m.val.desc,'%')}</small></span><button class="btn sm" data-a="apgo" data-m="desc">Montar</button></div>
   <div class="opt20 ${m.mode==='jov'?'sel':''}"><span><b>Jovens</b><small>Prioriza quem tem até 23 anos (os mais velhos só entram se não houver opção)</small></span><button class="btn sm" data-a="apgo" data-m="jov">Montar</button></div></div>
   <label class="chk" style="margin-top:8px"><input type="checkbox" ${m.on?'checked':''} data-a="apon"> Aplicar o último critério (${modeLbl(m.mode,m.val[m.mode])}) sempre que eu trocar a formação</label></div>`;
  const k='<div class="acts"><button class="btn ghost" data-a="tsv">';
  return h.includes(k)?h.replace(k,p+k):h+p;
});

/* ---------- confiança do elenco na interface ---------- */
hookAround('vInicio','vi20',function(next,__a){
  let h=next();const v=sqcOf();
  const bar=`<div><small>Confiança elenco</small><div class="bar2"><i style="width:${v}%"></i><b>${Math.round(v)}%</b></div></div>`;
  const k='<div><small>Confiança torcida</small>';
  return h.includes(k)?h.replace(k,bar+k):h;
});
hookAround('vVest','vv20',function(next,__a){
  let h=next();const v=sqcOf();
  const card=`<div class="card sqc20"><div class="k">Confiança do elenco</div><div class="v" style="font:800 30px var(--fh)" ><span class="${sqcCls(v)}">${Math.round(v)}</span> <small class="k">${sqcTxt(v)}</small></div><div class="meter"><i class="${sqcCls(v)}" style="width:${v}%"></i></div>
   <p class="news">Sobe com vitórias e sequência boa, desce com derrotas e com craques no banco. Abaixo de 50 o time rende menos (até −5%) e surgem mais atritos no vestiário. Acima de 75 rende um pouco mais (até +1,5%). Treinador motivador ajuda.</p></div>`;
  const k='<div class="card"><div class="k">Clima do grupo</div>';
  return h.includes(k)?h.replace(k,card+k):h.replace('</h2>','</h2>'+card);
});

/* ---------- tom da tabela por campeonato ---------- */
hookAround('vLiga','vl20',function(next,__a){let h=next();return h.replace('<div class="tbl">','<div class="tbl lt'+userDiv()+'">')});
hookAround('vOpcoes','vo20',function(next,__a){
  let h=next();
  const slots=`<div class="card"><div class="k">Salvar jogo</div>${[1,2,3].map(i=>{const f=slotInfo(i);return `<div class="res"><span>Slot ${i} <small class="k">${f?esc(f.club)+' · T'+f.season+' R'+Math.min(f.round+1,38):'vazio'}</small></span><button class="btn sm" data-a="slsave" data-i="${i}">Salvar</button></div>`}).join('')}<div class="res"><span>Voltar ao menu principal</span><button class="btn sm ghost" data-a="tomenu">Menu</button></div></div>`;
  return h.replace('<div class="card"><button class="btn ghost" data-a="reset">',slots+'<div class="card"><button class="btn ghost" data-a="reset">');
});

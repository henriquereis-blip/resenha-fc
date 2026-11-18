/* ext30: regras completas de jogador fora de posição + Fase 6 (propostas de emprego, rivalidades, presidentes com história) */

/* ================= REGRAS DE POSIÇÃO (todas) =================
   Eixo de profundidade: ZAG 1 · LAT 1,4 · VOL 2,1 · MEI 2,8 · MAT 3,4 · PONTA 3,6 · CA 4,2
   multiplicador = 1 − 0,18·Δprofundidade^1,15 (mín. 0,45) − lado/perna
   Goleiro ↔ linha: 0,25 (a maior do jogo). Lateral/ponta como ala ou meia aberto: quase sem perda. */
const DEPTH30={ZAG:1,LE:1.4,LD:1.4,VOL:2.1,MEI:2.8,MAT:3.4,PE:3.6,PD:3.6,CA:4.2};
const WDEPTH30={ZE:1,ZD:1,ZAG:1,LE:1.4,LD:1.4,ALE:1.6,ALD:1.6,WE:2.7,WD:2.7,VOL:2.1,MEI:2.8,MAT:3.4,PE:3.6,PD:3.6,CA:4.2};
const WSIDE30={ZE:-.5,ZD:.5,LE:-1,LD:1,ALE:-1,ALD:1,WE:-1,WD:1,PE:-1,PD:1};
function srcSide30(p,n){if(n==='LE'||n==='PE')return -1;if(n==='LD'||n==='PD')return 1;if(n==='ZAG')return p.foot==='E'?-.5:p.foot==='D'?.5:0;return 0}
function fitFine(p,w){
  const n=subOf(p);
  if(n==='GOL'||w==='GOL')return n==='GOL'&&w==='GOL'?1:.25;
  const same=n===w||(n==='ZAG'&&(w==='ZE'||w==='ZD'));
  const ws=WSIDE30[w]||0,ss=srcSide30(p,n);
  if(same&&n==='ZAG'){return Math.abs(ss-ws)>.4&&p.foot!=='A'?.94:1}
  if(same)return 1;
  if((w==='ALE'||w==='ALD'||w==='WE'||w==='WD')&&(n==='LE'||n==='LD'||n==='PE'||n==='PD'))return Math.abs(ss-ws)>1.2?(p.foot==='A'?.96:.92):.98;
  const dd=Math.abs(DEPTH30[n]-WDEPTH30[w]);let pen=.18*Math.pow(dd,1.15);
  const sd=Math.abs(ss-ws);
  if(sd>1.2){const wf=ws<0?'E':'D';pen+=p.foot==='A'?.03:p.foot===wf?.06:.12}
  else if(sd>.4)pen+=.03;
  return Math.max(.45,+(1-pen).toFixed(3));
}
macroOK=(p,slot,w)=>!(slot==='GK'||p.pos==='GK');
macroPen=function(p,slot){return .25};
function posTable30(){
  const from=['ZAG','LE','LD','VOL','MEI','MAT','PE','PD','CA'],to=['GOL','ZAG','LE','LD','VOL','MEI','MAT','PE','PD','CA'];
  const row=n=>to.map(w=>Math.round(fitFine({sub:n,foot:n==='LE'||n==='PE'?'E':'D',id:1},w)*100));
  return {from,to,rows:from.map(n=>[n].concat(row(n))).concat([['GOL'].concat(to.map(w=>w==='GOL'?100:25))])};
}
Object.assign(A,{posrules(){S.modal={t:'posrules'};render();window.scrollTo(0,0)}});

/* ================= FASE 6 ================= */
/* --- ouvir propostas em vez de "deixar o clube" --- */
A.leave=function(){
  ex();mailBox();
  if(G.jobq){toast('Você já avisou que ouve propostas. Respostas chegam por e-mail.');return}
  G.jobq={at:G.round+2,s:G.season};
  mail('job','📨 Você avisou que ouve propostas','Seu empresário espalhou a notícia. As respostas chegam em cerca de 2 rodadas (~2 semanas)'+(G.round>=NR()?'.':', enquanto você segue no '+userClub().name+'.'),[],'jobq');
  save();toast('📨 Respostas em ~2 rodadas. Fica de olho no ✉️.');
};
function jobResolve(){
  const jq=G.jobq;if(!jq)return;
  const c=userClub(),ids=jobOffers(G.board.conf>=70);
  const lines=ids.map(id=>{const x=C(id);const dv=['Série A','Série B','Série C','Série D'][x.div]||'';return '• '+x.name+' ('+dv+', reputação '+Math.round(x.rep)+')'+(isRival(c,x)?' ⚠️ RIVAL do '+c.name+': a torcida vai te odiar':'')});
  const acts=ids.map(id=>({l:'Aceitar: '+C(id).name,k:'job',p:{id}}));acts.push({l:'Ficar no '+c.name,k:'wait',g:1});
  mail('job','📨 Propostas de emprego chegaram',(G.board.conf>=70?'Seu trabalho chamou atenção.':'O mercado de técnicos tá frio pro seu currículo.')+'\nClubes interessados:\n'+lines.join('\n')+'\nAceitar encerra sua passagem pelo '+c.name+'.',acts,'jobs');
  G.jobq=null;
}
Object.assign(MACT,{job(p){
  const old=userClub();const nw=C(p.id);const rv=isRival(old,nw);
  takeJob(p.id);G.jobq=null;
  if(rv){const c=userClub();c.humor=clamp(c.humor-10,5,100);G.board.conf=clamp(G.board.conf-6,0,100);addNews('Torcida do '+c.name+' desconfia do técnico que veio do rival '+old.name+'.')}
  S.modal=G.phase==='seasonEnd'?{t:'season'}:null;S.prof=null;G.view='inicio';
  return {ok:true,t:'Você assumiu o '+nw.name+'.'}}});

/* --- rivalidades: clássicos --- */
function rivBox(){if(!G.riv)G.riv={};return G.riv}
function derbyCheck(){
  const lr=G.lastRound;if(!lr||!lr.results)return;const ur=lr.results.find(r=>r.u);if(!ur)return;
  const c=userClub(),oid=ur.h===G.user?ur.a:ur.h,o=C(oid);if(!isRival(c,o))return;
  const my=ur.h===G.user?ur.hg:ur.ag,th=ur.h===G.user?ur.ag:ur.hg;
  const b=rivBox(),k=o.sig;b[k]=b[k]||{w:0,e:0,l:0,gf:0,ga:0};const r=b[k];r.gf+=my;r.ga+=th;
  let res,hum,conf;
  if(my>th){r.w++;res='vitória';hum=5;conf=3}else if(my<th){r.l++;res='derrota';hum=-6;conf=-3}else{r.e++;res='empate';hum=-1;conf=0}
  c.humor=clamp(c.humor+hum,5,100);G.board.conf=clamp(G.board.conf+conf,0,100);
  const t='Clássico contra o '+o.name+': '+my+' x '+th;
  if(my>th)paperLine('Clássico é do '+c.name+'! '+my+' x '+th+' no '+o.name,'Torcida em festa depois do clássico.');else if(my<th)paperLine('Clássico dói: '+o.name+' vence o '+c.name+' por '+th+' x '+my,'Pressão cresce sobre o técnico.');
  mail('derby','🔥 '+t+' ('+res+')','Clássico é clássico: '+res+' mexe com a torcida ('+(hum>0?'+':'')+hum+' de humor) e com a diretoria.\nRetrospecto na sua passagem contra o '+o.name+': '+r.w+'V '+r.e+'E '+r.l+'D, gols '+r.gf+':'+r.ga+'.',[],'');
}
hookAround('vHistoria','vh30',function(next,__a){
  let h=next();
  try{const c=userClub(),rs=(typeof RIVAL!=='undefined'&&RIVAL[c.sig]||[]).map(s=>G.clubs.find(x=>x.sig===s)).filter(Boolean);
    const b=rivBox();
    const card=`<section class="sec card"><h3>🔥 Clássicos<small>rivais do ${esc(c.name)}</small></h3>${rs.length?rs.map(x=>{const r=b[x.sig];return `<div class="res"><span>${esc(x.name)}</span><b>${r?r.w+'V '+r.e+'E '+r.l+'D · '+r.gf+':'+r.ga:'sem jogos'}</b></div>`}).join(''):'<p class="news">Sem rival histórico definido.</p>'}<p class="foot keep">Vencer o rival anima a torcida e a diretoria; perder dói em dobro. Contratar do rival é mais difícil e técnico que vem do rival é mal visto.</p></section>`;
    h=h.replace(/<\/div>\s*$/,card+'</div>')}catch(e){console.error('vh30 '+e.message)}
  return h;
});

/* --- presidentes com história e promessas --- */
function presBox(){ex();ensureEl();if(!G.pH)G.pH=[];return G.pH}
function presCheck(){
  const H=presBox(),e=G.el;if(!e||!e.pres)return;
  const cur=H[0];
  if(!cur||cur.name!==e.pres.name||cur.cid!==G.user){
    if(cur&&cur.cid===G.user&&!cur.e)cur.e=G.season;
    const pf=presOf(e.pres.pf);
    const types=['verba','estadio','base'];const t=pick(types),sc=scaleOf(userClub());
    const pr={t,x:+(sc*.04).toFixed(1),due:G.round+(t==='verba'?0:8),done:false};
    H.unshift({name:e.pres.name,pf:pf.n,s:G.season,cid:G.user,club:userClub().name,pr,ap:e.pres.ap});
    if(H.length>14)H.pop();
    if(t==='verba'){G.fin.caixa=+(G.fin.caixa+pr.x).toFixed(2);pr.done=true;mail('pres','🏛️ '+e.pres.name+' assume a presidência','Perfil: '+pf.n+'. Promessa de campanha cumprida na largada: verba de '+mi(pr.x)+' pra reforços.',[],'')}
    else mail('pres','🏛️ '+e.pres.name+' assume a presidência','Perfil: '+pf.n+'. Promessa: '+(t==='estadio'?'ampliar o estádio em 1.500 lugares':'investir na base (+evolução dos garotos)')+' nas próximas rodadas, se o trabalho for bom.',[],'');
  }
  const p=H[0]&&H[0].pr;
  if(p&&!p.done&&G.round>=p.due){
    p.done=true;
    if(G.board.conf>=40){
      if(p.t==='estadio'){userClub().cap+=1500;mail('pres','🏗️ Presidente cumpriu a promessa','Estádio ampliado em 1.500 lugares.',[],'')}
      else{userClub().youth.forEach(y=>{y.dev=Math.min(100,y.dev+6)});mail('pres','🌱 Presidente cumpriu a promessa','Investimento na base: garotos evoluíram.',[],'')}
    }else{userClub().humor=clamp(userClub().humor-3,5,100);mail('pres','💥 Promessa do presidente quebrou','Com a confiança baixa, o presidente deixou a promessa de lado. A torcida notou.',[],'')}
  }
  /* efeito contínuo do estilo */
  const sty=e.pres.pf,last=G.lastRound&&G.lastRound.results&&G.lastRound.results.find(r=>r.u);
  if(last){const my=last.h===G.user?last.hg-last.ag:last.ag-last.hg;
    if(sty==='investidor'&&my<0)G.board.conf=clamp(G.board.conf-1.5,0,100);
    if((sty==='austero'||sty==='base')&&my<0)G.board.conf=clamp(G.board.conf+1,0,100);
    if(sty==='investidor'&&my===0)G.board.conf=clamp(G.board.conf-1,0,100)}
}
hookAround('vDir','vd30',function(next,__a){
  let h=next();
  try{const H=presBox();
    const card=`<section class="sec card"><h3>🏛️ Presidentes<small>história no clube</small></h3>${H.length?H.slice(0,8).map(x=>`<div class="res"><span>${esc(x.name)} <small class="k">${esc(x.pf)} · ${esc(x.club)} · T${x.s}${x.e?'–T'+x.e:''}</small></span><b>${x.pr?(x.pr.done?'✅':'⏳')+' '+({verba:'verba',estadio:'estádio',base:'base'})[x.pr.t]:''}</b></div>`).join(''):'<p class="news">Sem histórico ainda.</p>'}<p class="foot keep">Cada presidente chega com perfil e uma promessa. Se a confiança na diretoria estiver abaixo de 40 quando a promessa vencer, ela quebra.</p></section>`;
    h=h.replace('<div class="row2"><button class="btn ghost big" data-a="paper">',card+'<div class="row2"><button class="btn ghost big" data-a="paper">')}catch(e){console.error('vd30 '+e.message)}
  return h;
});

/* --- ganchos --- */
hookAfter('finishRound','ext30_fr30',function(r,A){
  try{ex();derbyCheck();presCheck();if(G.jobq&&(G.round>=G.jobq.at||G.round>=NR()))jobResolve()}catch(e){console.error('fr30 '+e.message)}
  });
hookAround('startCareer','sc30',function(next,__a){const r=next();try{presCheck()}catch(e){}return r});
hookAround('takeJob','tj30',function(next,__a){const r=next();try{G.jobq=null;presCheck()}catch(e){}return r});
hookAround('vModal','vm30',function(next,__a){
  const md=S.modal;
  if(md&&md.t==='posrules'){const T=posTable30();
    return `<div class="wrap"><button class="btn ghost sm" data-a="mxclose">← Voltar</button><h2>📐 Regras de posição</h2><p class="news">Quanto o jogador rende fora da função (100% = posição natural). Pé errado em lateral/ponta/zagueiro tira mais. Goleiro↔linha é a pior troca do jogo (25%). As automações (mais forte, descansados, jovens) só improvisam quando não há ninguém da função.</p><div style="overflow-x:auto"><table class="tbl" style="font-size:12px;width:100%"><tr><th>de ↓ / pra →</th>${T.to.map(x=>`<th>${x}</th>`).join('')}</tr>${T.rows.map(r=>`<tr>${r.map((v,i)=>i?`<td style="text-align:center;color:${v>=95?'var(--ok)':v>=80?'var(--fg)':v>=65?'var(--warn)':'var(--bad)'}">${v}</td>`:`<th>${v}</th>`).join('')}</tr>`).join('')}</table></div><p class="foot keep">Referência com perna natural. Ala/meia aberto (ALE/ALD/MAE/MAD): lateral e ponta rendem 92–98%.</p></div>`}
  return next();
});
hookAround('vOpcoes','vo30',function(next,__a){return next().replace('<div class="card"><div class="k">Salvar jogo</div>','<div class="card"><button class="btn ghost" data-a="posrules">📐 Regras de jogador fora de posição</button></div><div class="card"><div class="k">Salvar jogo</div>')});
hookAround('render','rd30',function(next,__a){next();try{document.querySelectorAll('[data-a="leave"]').forEach(b=>{b.textContent='📨 Ouvir propostas'})}catch(e){}});

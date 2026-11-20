/* ===== v39 / Fase 7D: carreira no exterior =====
   Clube estrangeiro vira clube completo (div 4, ids 80..99) com a liga inteira do país jogando 38 rodadas.
   O Brasil segue sendo simulado pelo servidor. A liga lite do país é sincronizada com a tabela real. */
const brn=()=>(G&&G.rg)?80+REGN:80;
const LFAC={ENG:1.3,ESP:1.25,GER:1.2,ITA:1.2,FRA:1,POR:.8,ARG:.7,URU:.55,COL:.6,CHI:.6,JPN:.8,KOR:.7,CHN:.65,AUS:.6,EGY:.6,MAR:.55,RSA:.55,NED:.85,BEL:.8,TUR:.85,SCO:.7,AUT:.75,SUI:.8,GRE:.7,DEN:.8,PAR:.55,ECU:.55,PER:.5,BOL:.45,VEN:.45,MEX:.9,USA:.9,KSA:1,SEL:.9};
for(const k in LFAC)LFAC[k]=+(1+(LFAC[k]-1)*0.6).toFixed(3); /* v114: gap financeiro Europa x América do Sul comprimido em 40% (1,30→1,18 ENG; 0,45→0,67 BOL) */
function wlOf(k){return WLD.find(x=>x.k===k)}
function liteById(id){const W=G.wd;if(!W)return null;for(const k in W.lg){const x=W.lg[k].cl.find(c=>c.id===id);if(x)return {x,k}}return null}
function uniqSig42(sg){let s=String(sg||'XXX').slice(0,3).toUpperCase(),i=0;const base=s;while(G.clubs.some(c=>c.sig===s)){s=base.slice(0,2)+String.fromCharCode(65+(i%26));i++}return s}
function natNat42(k){
  if(Math.random()<.74||!NMP[k])return k;
  const ks=Object.keys(NMP).filter(x=>x!==k);return pick(ks);
}
/* cria um clube nativo completo (div 4 = 1ª divisão do país, 5 = 2ª) */
function mkNat42(lc,id,k,div,tmpl,LF,live){
  const c=JSON.parse(JSON.stringify(tmpl));
  const band=RBAND[div]||[58,93];
  const rep=+clamp(lc.r,band[0],band[1]).toFixed(1);
  const tv=+(Math.max(6,(15+(rep-62)*5.5)*LF)).toFixed(1),sp=+(Math.max(4,(8+(rep-62)*4.3)*LF)).toFixed(1);
  Object.assign(c,{id,name:lc.n,sig:uniqSig42(lc.sig||lc.sg),rep,cap:Math.round(clamp(22000+(rep-60)*1500,15000,90000)/500)*500,
    c1:lc.c1,c2:lc.c2,c3:lc.c3||lc.c1,pat:lc.pat||'solid',formation:pick(['4-4-2','4-3-3','4-2-3-1','3-5-2']),style:pick(STYLES),phil:pick(PHN),humor:ri(50,72),
    P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,CH:0,div,ctry:k,lid:div===4&&lc.id!=null?lc.id:null,trad:Math.round(clamp(((lc.b||rep)-52)*1.7,15,96)),tv,spBase:sp,
    debt:+(rnd(0,.5)*tv).toFixed(1),tro:[0,0,0,0],retro:[],youth:[],coach:{name:wName(k),pts:0,V:0,E:0,D:0,titles:0},bq:ri(25,70),s20:{P:0,GP:0,GC:0,J:0},ct:0,cp:-2.5});
  c.color=c.c1==='#ffffff'?c.c2:c.c1;
  delete c._lp;delete c.divHist;delete c.streak;delete c.fam;delete c.mark;delete c.focus;delete c.fx;
  if(live){c.P=lc.P||0;c.J=lc.J||0;c.V=lc.V||0;c.E=lc.E||0;c.D=lc.D||0;c.GP=lc.GP||0;c.GC=lc.GC||0}
  if(id<G.clubs.length)G.clubs[id]=c;else G.clubs.push(c);
  c.squad=genSquad(Object.assign({},c,{sig:'~'+k+id}));
  for(const pid of c.squad){const p=G.players[pid];const nat=natNat42(k);const nm=wName(nat);p.name=nm;p.real=false;p.nat=nat;try{NATF[nm]=nat}catch(e){}}
  c.caixa=+((tv+sp+25)*.2*rnd(.6,1.4)).toFixed(1);
  fillYouth(c);autoPick(c);
  return c;
}
/* cria os clubes completos do país k; devolve o id do clube escolhido (tid = id lite) */
function natify(k,tid){
  const W=wd();if(G.abroad)denat();
  G.clubs.length=brn();
  const L=W.lg[k],tgt=L.cl.find(x=>x.id===tid);
  let sel=L.cl.slice().sort((a,b)=>b.r-a.r).slice(0,(PYR[k]&&PYR[k][0].c-(PD1X[k]?pList(PD1X[k]).length:0))||20);
  if(tgt&&!sel.includes(tgt))sel[sel.length-1]=tgt;
  if(sel.length%2){for(let i=sel.length-1;i>=0;i--){if(sel[i]!==tgt){sel.splice(i,1);break}}}
  const tmpl=G.clubs.find(c=>c.div===0&&c.id!==G.user)||G.clubs[1];
  const LF=LFAC[k]||.8;let nid=null;
  const live=W.s===G.season&&G.round<38;           // meio de temporada: herda a tabela atual
  sel.forEach((lc,i)=>{const c=mkNat42(lc,brn()+i,k,4,tmpl,LF,live);if(lc===tgt)nid=c.id});
  G.abroad={k,from:G.season,n:sel.length};pyrInit(k,tmpl,LF);
  W.nat={k,s:(G.round>=38?G.season+1:G.season)};
  return nid;
}
/* nº de rodadas da liga do usuário (38 no Brasil; real no exterior) */
function NR(){try{if(G&&G.abroad&&G.clubs[G.user]&&G.clubs[G.user].div>=4&&G.dfx&&G.dfx[G.clubs[G.user].div])return G.dfx[G.clubs[G.user].div].length}catch(e){}return 38}
/* desfaz o país nativo: clubes e jogadores somem, a liga lite assume de novo */
function denat(){
  if(!G.abroad)return;
  for(let i=brn();i<G.clubs.length;i++){for(const id of G.clubs[i].squad)delete G.players[id]}
  for(const p of Object.values(G.players)){if(p.club>=brn()){p.club=-1}if(p.loan&&p.loan.from>=brn())delete p.loan}
  G.clubs.length=brn();G.free=(G.free||[]).filter(id=>G.players[id]);
  G.h2h=(G.h2h||[]).filter(x=>x[2]<brn()&&x[3]<brn());
  G.offers=(G.offers||[]).filter(o=>!o.pid||G.players[o.pid]);
  if(G.wd)G.wd.nat=null;G.abroad=null;G.pyr=null;
}
function natSync(){
  const W=G&&G.wd;if(!W||!W.nat||!G.abroad||G.season<W.nat.s)return;
  const L=W.lg[W.nat.k];if(!L)return;
  for(const c of G.clubs){if(c.div!==4||c.lid==null)continue;const l=L.cl.find(x=>x.id===c.lid);if(l){l.P=c.P;l.J=c.J;l.V=c.V;l.E=c.E;l.D=c.D;l.GP=c.GP;l.GC=c.GC}}
}
hookAround('wRound','wr42',function(next,__a){let [rd]=__a;
  const W=G.wd;
  if(W&&W.nat&&G.abroad&&G.season>=W.nat.s&&W.lg[W.nat.k]){
    const k=W.nat.k,hold=W.lg[k];delete W.lg[k];
    try{next(rd)}finally{W.lg[k]=hold}
  }else next(rd);
});
hookAfter('finishRound','ext42_fr42',()=>{natSync()});
hookAround('wEnd','we42',function(next,__a){try{natSync()}catch(e){}return next()});

/* ---------- aceitar emprego fora ---------- */
function emigrate(lid){
  const f=liteById(lid);if(!f)return false;
  const nid=natify(f.k,lid);if(nid==null)return false;
  takeJob(nid);G.lastRound=null;
  genAllFx();if(G.round<NR())prepareRound();
  const c=userClub();addNews('Você se mudou para '+wlOf(f.k).n+' para comandar o '+c.name+'.');
  save();return true;
}
hookAround('takeJob','tj42',function(next,__a){let [id]=__a;
  const r=next();
  try{if(G.abroad&&G.user<brn()){denat();genAllFx();if(G.round<NR())prepareRound();save()}else if(G.abroad&&G.pyr){pyrSync();genAllFx();if(G.round<NR())prepareRound();save()}if(G.abroad){G.est=null;G._lg=null;G._x=null;G.cont=null}}catch(e){console.error('tj42 '+e.message)}
  return r;
});
/* propostas de clubes de fora (só chega do que a reputação do técnico segura) */
function fjobOffers(good){
  const out=[];try{
    const W=wd(),c=userClub(),cap=coachCap34(good)-2,ref=c.rep+(good?3:0);
    for(const k of shuffle(WLD.map(w=>w.k)).filter(k=>!(G.abroad&&G.abroad.k===k))){
      if(out.length>=2)break;if(Math.random()>.6)continue;
      const cl=W.lg[k].cl.filter(x=>x.r<=cap&&x.r>=ref-9).sort((a,b)=>Math.abs(a.r-ref)-Math.abs(b.r-ref));
      if(cl.length)out.push(cl[Math.min(cl.length-1,ri(0,1))].id);
    }
  }catch(e){console.error('fjob42 '+e.message)}
  return out;
}
function fjobHtml(ids){
  if(!ids||!ids.length)return '';
  return `<div class="card"><h3>🌍 Propostas do exterior</h3><p class="news">Aceitar muda você de país: elenco, caixa, metas e liga começam do zero. O Brasil segue rodando sem você.</p>${ids.map(id=>{const f=liteById(id);if(!f)return '';const w=wlOf(f.k);
    return `<button class="offer" data-a="fjobgo" data-id="${id}"><b>${w.f} ${esc(f.x.n)}</b><span>reputação ${Math.round(f.x.r)}</span><small>${esc(w.lg)} · ${esc(w.n)}</small></button>`}).join('')}</div>`;
}
hookAround('vModal','vm42',function(next,__a){
  let h=next();const md=S.modal;
  try{
    if(md&&md.t==='fired'){
      md.foffs=md.foffs||fjobOffers(!md.resign&&false);const card=fjobHtml(md.foffs);
      if(card){const k='<button class="btn ghost big" data-a="stay">';h=h.includes(k)?h.replace(k,card+k):h.replace(/<\/div>$/,card+'</div>')}
    }
    if(md&&md.t==='season'&&G.summary){
      G.summary.fjobs=G.summary.fjobs||fjobOffers(G.board.conf>=70);const card=fjobHtml(G.summary.fjobs);
      const k='<button class="btn big" data-a="newseason">';if(card&&h.includes(k))h=h.replace(k,card+k);
    }
  }catch(e){console.error('vm42 '+e.message)}
  return h;
});
Object.assign(A,{fjobgo(d){
  if(emigrate(+d.id)){if(G.summary&&G.summary.fired)G.summary.fired=false;S.modal=G.phase==='seasonEnd'?{t:'season'}:{t:'sponsor'};G.view='inicio';render();window.scrollTo(0,0)}
  else toast('Proposta não está mais disponível.');
}});
/* e-mail "Propostas de emprego": acrescenta clubes de fora */
hookAround('jobResolve','jr42',function(next,__a){
  next();
  try{const m=(G.inbox||[]).find(x=>x.tag==='jobs');
    if(m&&!m.f42){m.f42=1;const ids=fjobOffers(G.board.conf>=70);
      if(ids.length){const lines=ids.map(id=>{const f=liteById(id),w=wlOf(f.k);return '• 🌍 '+w.f+' '+f.x.n+' ('+w.lg+', reputação '+Math.round(f.x.r)+') — muda de país'});
        m.body=m.body.replace('\nAceitar encerra',  '\n'+lines.join('\n')+'\nAceitar encerra');
        const wi=m.acts.findIndex(a=>a.k==='wait');const acts=ids.map(id=>({l:'Aceitar: 🌍 '+liteById(id).x.n,k:'fjob',p:{lid:id}}));
        m.acts.splice(wi<0?m.acts.length:wi,0,...acts)}}}catch(e){console.error('jr42 '+e.message)}
});
Object.assign(MACT,{fjob(p){
  const ok=emigrate(p.lid);S.modal=G.phase==='seasonEnd'?{t:'season'}:null;S.prof=null;G.view='inicio';
  return ok?{ok:true,t:'Você assumiu o '+userClub().name+' ('+(wlOf(G.abroad.k).n)+').'}:{ok:false,t:'Proposta expirou.'};
}});

/* ---------- textos: "Brasileirão" vira o nome da liga do país ---------- */
function ligaNome42(){const c=userClub();return c&&c.ctry?wlOf(c.ctry).lg:null}
hookAround('render','r42',function(next,__a){
  const r=next();
  try{const nm=G&&G.phase!=='start'&&G.user!=null?ligaNome42():null;
    if(nm){const root=document.getElementById('app');if(root){const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const list=[];while((n=tw.nextNode()))if(/Brasileirão|Série A/.test(n.nodeValue))list.push(n);
      list.forEach(t=>{t.nodeValue=t.nodeValue.replace(/Brasileirão\s*-\s*Série A/g,nm).replace(/Brasileirão/g,nm).replace(/Série A/g,nm)})}}}catch(e){}
  return r;
});
hookAround('setMeta','sm42',function(next,__a){next();try{if(G.abroad&&G.board.metaTxt)G.board.metaTxt=G.board.metaTxt.replace('Libertadores','competições continentais')}catch(e){}});

/* no exterior as copas e estaduais do Brasil rodam sem você (Copa do Brasil segue no automático) */
hookAround('extraSync','es42',function(next,__a){
  if(G&&G.abroad){
    try{for(let g=0;g<8;g++){const c=G.cup;if(c&&c.st<5&&G.round>=CSL[c.st])cupAuto();else break}}catch(e){console.error('es42 '+e.message)}
    return;
  }
  return next();
});
hookAround('estInit','ei42',function(next,__a){if(G&&G.abroad){G.est=null;return}return next()});

function ligaHead(){const c=userClub();const w=c&&c.ctry?wlOf(c.ctry):null;
  const t=w?`${w.f} ${esc(w.n)} · ${esc((_vd44&&_vd44>4&&pdiv(_vd44)&&pdiv(_vd44).t>1?pdiv(_vd44).name:w.lg))}`:`🇧🇷 Brasil · Brasileirão ${DIVN[userDiv()]}`;
  return `<div class="card"><div class="k">${t}</div><button class="btn sm ghost" data-a="mundogo">🌍 Ver ligas de outros países</button></div>`}
Object.assign(A,{mundogo(){S.ctab='mundo';G.view='comp';render();window.scrollTo(0,0)}});

(function(){const st=document.createElement('style');st.textContent='.tbl.lt4{--lt:#35f0a0;--lm:17%}';document.head.appendChild(st)})();

/* ext24: patrocínios coerentes — valor esperado parecido entre ofertas, regras por clube e pagamento à vista / parcelado / por jogo */
const SPN_POOL=['Banco Seguro S.A.','Arena Bet Esportes','Rede Vitória Supermercados','Telecom Nova Era','Cervejaria Três Rios','Construtora Alvorada','Seguradora Âncora','Aérea Horizonte','Cooperativa Planalto','Grupo Vale Verde','Energia Sol Forte','Postos Serra Azul','Faculdade Horizonte','Eletro Mundial','Farmácias Vida','Montadora Terra Brasil','Fintech Pix Já','Frigorífico Boi Forte','Universidade Nova Etapa','Banco do Povo','Móveis Aurora','Clínica Sorriso','Água Cristal','Auto Peças Veloz'];
const SPN_VISTA=.85,SPN_JOGO=1.04;
const hashN=(...a)=>{let h=2166136261;for(const x of a){h^=+x||0;h=Math.imul(h,16777619)}return h>>>0};
function rngS(seed){let s=seed||1;return()=>{s=Math.imul(s^s>>>15,2246822507)>>>0;s^=s>>>13;s=Math.imul(s,3266489909)>>>0;return ((s^s>>>16)>>>0)/4294967296}}
function expPosOf(c){const l=G.clubs.filter(x=>x.div===c.div).sort((a,b)=>b.rep-a.rep||a.id-b.id);return Math.max(1,l.findIndex(x=>x.id===c.id)+1)}
const pTopN=(e,n)=>clamp(1/(1+Math.exp((e-n-.5)/2)),.04,.97);
const pTitleE=e=>clamp(.34*Math.exp(-(e-1)*.55),.01,.4);
const expWinsE=e=>clamp(23.5-(e-1)*.8,6,25);
const spnEV=(o,e)=>o.fixed+o.perWin*expWinsE(e)+(o.topN?o.topBonus*pTopN(e,o.topN):0)+o.titleBonus*pTitleE(e);
const spnMax=o=>o.fixed+o.perWin*38+o.topBonus+o.titleBonus;
function spnBuild(kind,b,e,N,div,rg){
  const o={kind,perWin:0,topN:0,topBonus:0,titleBonus:0,fixed:b};
  const surv=N-4;
  const tgt=div>0&&e<=8?4:clamp(Math.round(e-2),3,surv);
  if(kind==='fixo'){o.fixed=b*1.0}
  if(kind==='meta'){o.fixed=b*.72;o.topN=tgt;o.topBonus=.28*b/pTopN(e,tgt)}
  if(kind==='vitoria'){o.fixed=b*.70;o.perWin=.30*b/expWinsE(e)}
  if(kind==='titulo'){o.fixed=b*.72;o.topN=4;o.topBonus=.12*b/pTopN(e,4);o.titleBonus=.16*b/pTitleE(e)}
  if(kind==='misto'){o.fixed=b*.74;o.perWin=.11*b/expWinsE(e);o.topN=tgt;o.topBonus=.15*b/pTopN(e,tgt)}
  // normaliza: o valor esperado de cada oferta fica perto do mesmo número
  const want=b*(.97+rg()*.08);o.fixed=Math.max(b*.5,o.fixed+(want-spnEV(o,e)));
  for(const k of ['fixed','topBonus','titleBonus'])o[k]=+o[k].toFixed(1);o.perWin=+o.perWin.toFixed(2);
  o.ev=+spnEV(o,e).toFixed(1);o.max=+spnMax(o).toFixed(1);
  o.tgtTxt=o.topN?(div>0&&o.topN===4?'acesso (top 4)':o.topN>=N-4?'permanência (não cair)':'top '+o.topN):'';
  return o;
}
function spnKinds(e,div,rg){
  const sets=e<=4?[['fixo','titulo','vitoria'],['misto','titulo','meta'],['fixo','titulo','misto']]
   :e<=12?[['fixo','meta','vitoria'],['misto','meta','titulo'],['fixo','misto','vitoria']]
   :[['fixo','meta','vitoria'],['fixo','misto','meta'],['vitoria','meta','fixo']];
  return sets[Math.floor(rg()*sets.length)];
}
function sponsorOffers(){
  const c=userClub(),e=expPosOf(c),N=G.clubs.filter(x=>x.div===c.div).length,rg=rngS(hashN(c.id,G.season,7));
  const pool=SPN_POOL.slice(),kinds=spnKinds(e,c.div,rg);
  return kinds.map(k=>{
    const nm=pool.splice(Math.floor(rg()*pool.length),1)[0];
    const o=spnBuild(k,c.spBase,e,N,c.div,rg);o.name=nm;o.val=o.fixed;
    o.desc={fixo:'Valor fixo alto, sem bônus. Dinheiro garantido.',meta:'Fixo menor + bônus se cumprir a meta de posição.',vitoria:'Fixo menor + bônus por vitória no campeonato.',titulo:'Fixo menor + bônus de G4 e de título.',misto:'Fixo médio + bônus por vitória e por meta.'}[k];
    return o;
  });
}
/* modos de pagamento: valor anual V */
function spnModes(V){return [
  {m:'vista',lbl:'À vista',sub:'Entra tudo agora, com desconto de 15%.',total:+(V*SPN_VISTA).toFixed(1),now:+(V*SPN_VISTA).toFixed(1)},
  {m:'parc',lbl:'Parcelado',sub:'Valor cheio, pingando a cada rodada. Garantido.',total:+V.toFixed(1),now:0},
  {m:'jogo',lbl:'Por jogo',sub:'+4% por partida oficial. Copa, estadual e continental também pagam, então compensa mais a longo prazo.',total:+(V*SPN_JOGO).toFixed(1),now:0}]}
function payOf(x){const m=x.mode||'parc',v=x.val!==undefined?x.val:x.fixed;return m==='vista'?0:m==='jogo'?v*SPN_JOGO:v}
function signMaster(o,mode){
  const s=Object.assign({},o,{mode});s.fixed=+o.fixed.toFixed(1);s.pay=+payOf({mode,val:o.fixed}).toFixed(2);
  G.sponsor=s;
  if(mode==='vista'){const v=+(o.fixed*SPN_VISTA).toFixed(1);G.fin.caixa=+(G.fin.caixa+v).toFixed(2);s.paidNow=v;try{ex();G.mk.acc.sp+=v}catch(e){}}
  save();
}
/* master: pagamento por rodada usa pay */
// (logic.js lê G.sponsor.pay quando existe)
const MODEL24={vista:'à vista',parc:'parcelado',jogo:'por jogo'};
/* partidas oficiais fora da liga também pagam o modo "por jogo" */
function jogoPay(){
  let t=0;const sp=G.sponsor;if(sp&&sp.mode==='jogo')t+=sp.fixed*SPN_JOGO/38;
  const mk=G.mk;if(mk)for(const k in mk.slots){const s=mk.slots[k];if(s&&s.mode==='jogo')t+=s.val*SPN_JOGO/38}
  if(t>0){G.fin.caixa=+(G.fin.caixa+t).toFixed(2);try{ex();G.mk.acc.spx+=t}catch(e){}}
  return t;
}
const _fx24=finishExtra;finishExtra=function(){const r=_fx24.apply(this,arguments);try{jogoPay()}catch(e){console.error('jogoPay '+e.message)}return r};
if(typeof finishEst==='function'){const _fe24=finishEst;finishEst=function(){const r=_fe24.apply(this,arguments);try{jogoPay()}catch(e){}return r}}

/* ---------- patrocínios extras (manga, costas, calção, material) ---------- */
function slotOffers(sl){
  const c=userClub(),d=SLOTD[sl],e=expPosOf(c),N=G.clubs.filter(x=>x.div===c.div).length;
  const rg=rngS(hashN(c.id,G.season,Object.keys(SLOTD).indexOf(sl)*31+3,(G.mk.open&&G.mk.open.re)||0));
  const b0=scaleOf(c)*d[1]*(.6+.6*prest(c));const pool=d[2].slice();
  const kinds=e<=6?[['fixo','titulo','vitoria'],['fixo','misto','titulo']][Math.floor(rg()*2)]:[['fixo','meta','vitoria'],['fixo','misto','meta'],['vitoria','meta','fixo']][Math.floor(rg()*3)];
  return kinds.map(k=>{
    const nm=pool.splice(Math.floor(rg()*pool.length),1)[0];
    const o=spnBuild(k,+b0.toFixed(2),e,N,c.div,rg);
    const s={name:nm,val:o.fixed,win:o.perWin,topN:o.topN,topBonus:o.topBonus,title:o.titleBonus,ev:o.ev,max:o.max,tgtTxt:o.tgtTxt,kind:k};
    s.clause={fixo:'Valor fixo, sem bônus',meta:'Fixo menor + bônus de meta',vitoria:'Fixo menor + bônus por vitória',titulo:'Fixo menor + bônus de G4 e título',misto:'Fixo + bônus por vitória e meta'}[k];
    return s;
  });
}
function slotAnnual(){return Object.values(G.mk.slots).reduce((s,x)=>s+(x?payOf(x):0),0)}
const _es24=endSeason;endSeason=function(){
  const r=_es24.apply(this,arguments);
  try{ex();const c=userClub(),pos=posOf(c);let b=0;
    for(const k in G.mk.slots){const s=G.mk.slots[k];if(!s)continue;if(s.topN&&pos<=s.topN)b+=s.topBonus||0;if(pos===1)b+=s.title||0}
    if(b>0){b=+b.toFixed(1);G.fin.caixa=+(G.fin.caixa+b).toFixed(1);G.mk.acc.spx+=b;if(G.summary)G.summary.sp=+((G.summary.sp||0)+b).toFixed(1)}}catch(e){console.error('es24 '+e.message)}
  return r;
};
hookAfter('newSeason','ext24_ns24',function(r,A){
  try{ex();let t=0;for(const k in G.mk.slots){const s=G.mk.slots[k];if(s&&s.mode==='vista')t+=s.val*SPN_VISTA}
    if(t>0){t=+t.toFixed(1);G.fin.caixa=+(G.fin.caixa+t).toFixed(1);G.mk.acc.spx+=t;addNews('Patrocínios extras renovados à vista: entrou '+mi(t)+'.')}}catch(e){}
  });

/* ---------- modal do master ---------- */
function spnOfferHtml(o,i){
  const lines=[`<div class="res"><span>Fixo garantido</span><b>${mi(o.fixed)}</b></div>`];
  if(o.perWin)lines.push(`<div class="res"><span>Por vitória (liga)</span><b>+${mi(o.perWin)}</b></div>`);
  if(o.topN)lines.push(`<div class="res"><span>Meta: ${o.tgtTxt}</span><b>+${mi(o.topBonus)}</b></div>`);
  if(o.titleBonus)lines.push(`<div class="res"><span>Título</span><b>+${mi(o.titleBonus)}</b></div>`);
  return `<button class="offer sp24" data-a="spnpick" data-i="${i}"><b>${esc(o.name)}</b><small>${o.desc}</small>${lines.join('')}<div class="res ev"><span>Valor esperado no ano</span><b>${mi(o.ev)}</b></div><small>Teto se tudo der certo: ${mi(o.max)}</small></button>`;
}
const _vm24=vModal;vModal=function(){
  const md=S.modal;
  if(!md||md.t!=='sponsor')return _vm24.apply(this,arguments);
  const offs=sponsorOffers();
  if(md.i===undefined||md.i===null)return `<div class="wrap"><h2>Patrocinador master</h2><p class="news">Contrato de uma temporada. As ofertas têm valor esperado parecido: o que muda é o risco. Fixo é tranquilo; bônus paga mais se o time render acima do esperado e menos se render abaixo.</p>${offs.map(spnOfferHtml).join('')}</div>`;
  const o=offs[md.i];
  return `<div class="wrap"><button class="btn ghost sm" data-a="spnback">← Voltar às ofertas</button><h2>${esc(o.name)}</h2><p class="news">Como você quer receber o fixo de ${mi(o.fixed)}? Bônus (se houver) entram à parte, quando forem conquistados.</p>${spnModes(o.fixed).map(m=>`<button class="offer sp24" data-a="spnmode" data-m="${m.m}"><b>${m.lbl}</b><small>${m.sub}</small><div class="res"><span>${m.now?'Entra agora':'Total no ano (liga)'}</span><b>${mi(m.total)}</b></div></button>`).join('')}</div>`;
};
Object.assign(A,{
  pickspon(d){S.modal={t:'sponsor',i:+d.i};render();window.scrollTo(0,0)},
  spnpick(d){S.modal={t:'sponsor',i:+d.i};render();window.scrollTo(0,0)},
  spnback(){S.modal={t:'sponsor'};render()},
  spnmode(d){const o=sponsorOffers()[S.modal.i];signMaster(o,d.m);S.modal=null;render();toast(o.name+' fechou ('+MODEL24[d.m]+').')},
  /* extras */
  mkopen(d){ex();G.mk.open=G.mk.open&&G.mk.open.slot===d.s?null:{slot:d.s};render()},
  mkpick(d){ex();G.mk.open={slot:d.s,i:+d.i};render()},
    mkback(){ex();G.mk.open={slot:G.mk.open.slot};render()}
});
/* mostra o modo no card do master */
function spnSummary(sp){
  if(!sp)return '';
  const m=MODEL24[sp.mode||'parc'];
  const b=[];if(sp.perWin)b.push('+'+mi(sp.perWin)+' por vitória');if(sp.topN)b.push('+'+mi(sp.topBonus)+' se '+(sp.tgtTxt||'top '+sp.topN));if(sp.titleBonus)b.push('+'+mi(sp.titleBonus)+' pelo título');
  return `Pagamento ${m}. ${b.length?'Bônus: '+b.join(' · ')+'.':'Sem cláusulas de bônus.'}`;
}

/* ext67 (v86): base balanceada por nível do clube, IA usando a base, Continuar no topo, camisa com prévia, vendas por camisa, sócio com projeção/desfazer, versão do jogo */
const APP_VER='v89';
const APP_DATE='18/11/2026';

/* ============ BASE: estrelas e overall dependem do nível da base do clube ============ */
function starCap67(ix){return ix<25?2:ix<45?3:ix<65?4:5}
function ix67(c){try{return baseIdx(c)}catch(e){return clamp(c.bq||40,5,100)}}
function balYouth67(c){
  if(!c||!c.youth||typeof c.bq!=='number')return;const ix=ix67(c),cap=starCap67(ix);
  for(const y of c.youth){
    if(y._b)continue;y._b=1;
    if(y.stars>cap){
      const rare=ix<25?.03:ix<45?.05:.08;
      y.stars=Math.random()<rare?Math.min(5,cap+(Math.random()<.35?2:1)):ri(Math.max(1,cap-1),cap);
    }
    y.value=+(0.02+y.stars*.012+rnd(0,.02)).toFixed(3);y.value=+(y.value*(1+ix/80)).toFixed(3);
  }
}
function balAll67(){try{for(const c of G.clubs)balYouth67(c)}catch(e){console.error('bal67 '+e.message)}}
const _fy67=fillYouth;fillYouth=function(c,max){const r=_fy67.apply(this,arguments);balYouth67(c);return r};
const _gy67=genYouth9;genYouth9=function(c,n){const r=_gy67.apply(this,arguments);balYouth67(c);return r};

/* overall ao subir: depende do nível da base (um 5★ de base pobre != 5★ de base rica) */
const _py67=promoteYouth;promoteYouth=function(c,i){
  const y=c.youth[i];if(y)balYouth67(c);
  const yy=c.youth[i];
  const before=c.squad.length;const r=_py67(c,i);
  if(r||!yy||c.squad.length!==before+1)return r;
  try{
    const ix=ix67(c),oldId=c.squad[c.squad.length-1],old=P(oldId);
    const ovr=38+ix*0.14+yy.stars*2.4+yy.dev*0.08;
    const np=mkPlayer(yy.role,ovr,yy.age,c.id,yy.name,false);
    np.tr=yy.tr.slice();np.pot=clamp(Math.round(np.ovr+yy.stars*4+ix/10+4),np.ovr,92);
    if(old&&old.fromBase)np.fromBase=old.fromBase;
    c.squad[c.squad.length-1]=np.id;delete G.players[oldId];
    if(c.id===G.user&&G.mk&&G.mk.base&&G.mk.base.grads){const g=G.mk.base.grads.find(x=>x.pid===oldId);if(g)g.pid=np.id}
    G.yLog=G.yLog||{n:0,rows:[]};
    G.yLog.n++;G.yLog.rows.push({s:G.season,club:c.sig||c.name,user:c.id===G.user?1:0,ix:Math.round(ix),st:yy.stars,ovr:np.ovr,pot:np.pot,rep:c.rep});
    if(G.yLog.rows.length>1500)G.yLog.rows.shift();
  }catch(e){console.error('py67 '+e.message)}
  return r;
};

/* clubes da IA passam a usar a base: sobem 1–2 garotos por temporada */
function aiPromote67(){
  for(const c of G.clubs){
    if(c.id===G.user||!c.youth||!c.youth.length||c.squad.length>=27)continue;
    balYouth67(c);
    const n=c.squad.length<24?2:1;
    for(let k=0;k<n;k++){
      let best=-1,bs=-1;
      c.youth.forEach((y,i)=>{if(y.age>=18){const s=y.stars*3+y.dev/10;if(s>bs){bs=s;best=i}}});
      if(best<0)break;
      const y=c.youth[best];if(y.stars<2&&c.squad.length>=24)break;
      promoteYouth(c,best);
    }
  }
}
const _ns67=newSeason;newSeason=function(){
  const r=_ns67.apply(this,arguments);
  try{balAll67();aiPromote67()}catch(e){console.error('ai67 '+e.message)}
  return r;
};
const _fr67=finishRound;finishRound=function(){
  const o=_fr67.apply(this,arguments);
  try{balAll67();if(G.mk&&G.mk.soc)G.mk.soc.orig=null}catch(e){}
  return o;
};
window.youthReport=function(){
  const rows=(G.yLog&&G.yLog.rows)||[],bands={'<25':[],'25-44':[],'45-64':[]," >=65":[]};
  rows.forEach(r=>{(r.ix<25?bands['<25']:r.ix<45?bands['25-44']:r.ix<65?bands['45-64']:bands[' >=65']).push(r)});
  const out={};for(const k in bands){const a=bands[k];out[k]={n:a.length,ovr:a.length?+(a.reduce((s,x)=>s+x.ovr,0)/a.length).toFixed(1):0,max:a.length?Math.max(...a.map(x=>x.ovr)):0,st:a.length?+(a.reduce((s,x)=>s+x.st,0)/a.length).toFixed(2):0,s45:a.filter(x=>x.st>=4).length}}
  return out;
};

/* ============ Versão do jogo + verificar atualização ============ */
const _vo67=vOpcoes;vOpcoes=function(){
  let h=_vo67.apply(this,arguments);
  const card=`<div class="card"><div class="k">Versão do jogo</div><div class="res"><span>Você está na</span><b>${APP_VER} · ${APP_DATE}</b></div>
   ${S.upd?`<p class="news">Tem versão nova: <b>${esc(S.upd)}</b>.</p><button class="btn big" data-a="doupd">Atualizar agora</button>`:`<button class="btn big ghost" data-a="chkup">Verificar atualização</button>`}
   <p class="news">Seu save não se perde ao atualizar.</p></div>`;
  return h.replace(/<\/div>\s*$/,card+'</div>');
};
Object.assign(A,{
  async chkup(){
    toast('Verificando…');
    try{
      const r=await fetch(location.pathname+'?_='+Date.now(),{cache:'no-store'});const t=await r.text();
      const m=/APP_VER\s*=\s*'(v[0-9]+)'/.exec(t);
      if(!m){toast('Não consegui checar agora.');return}
      if(+m[1].slice(1)>+APP_VER.slice(1)){S.upd=m[1];render()}
      else toast('Você já tá na última: '+APP_VER);
    }catch(e){toast('Sem conexão pra checar.')}
  },
  async doupd(){
    try{save()}catch(e){}
    try{const rs=await navigator.serviceWorker.getRegistrations();for(const r of rs)await r.unregister()}catch(e){}
    try{const ks=await caches.keys();for(const k of ks)await caches.delete(k)}catch(e){}
    location.reload();
  }
});

/* ============ Fim de rodada: Continuar em cima do jornal ============ */
const _vm67=vModal;vModal=function(){
  let h=_vm67.apply(this,arguments);
  try{
    const md=S.modal;
    if(md&&md.t==='round'){
      const re=/<button class="btn big" data-a="roundok">[^<]*<\/button>/;
      const m=re.exec(h);
      if(m){
        h=h.replace(re,'');
        const btn=m[0].replace('btn big','btn big top67');
        const mk_=['<div class="card paperc"','<div class="card"><div class="k">💰'];
        let at=-1;for(const t of mk_){at=h.indexOf(t);if(at>=0)break}
        h=at>=0?h.slice(0,at)+btn+h.slice(at):h.replace(/<\/div>\s*$/,btn+'</div>');
      }
    }
  }catch(e){}
  return h;
};

/* ============ Camisas: criador com prévia ao vivo ============ */
const COL67=['#111111','#f8fafc','#dc2626','#7f1d1d','#1d4ed8','#0f1f4d','#38bdf8','#16a34a','#14532d','#facc15','#f97316','#7e22ce','#ec4899','#6b7280','#b8860b','#e7d9b5','#0d9488','#a3e635'];
const COLN67={'#111111':'Preto','#f8fafc':'Branco','#dc2626':'Vermelho','#7f1d1d':'Grená','#1d4ed8':'Azul','#0f1f4d':'Marinho','#38bdf8':'Celeste','#16a34a':'Verde','#14532d':'Verde escuro','#facc15':'Amarelo','#f97316':'Laranja','#7e22ce':'Roxo','#ec4899':'Rosa','#6b7280':'Cinza','#b8860b':'Dourado','#e7d9b5':'Creme','#0d9488':'Turquesa','#a3e635':'Limão'};
const PAT67=[['plain','Lisa'],['v','Listrada'],['vw','Listras largas'],['h','Horizontal'],['half','Metade'],['band','Faixa'],['diag','Faixa diagonal']];
const SHP67='M13 3 5 8 1 17l7 3 3-4v21h18V16l3 4 7-3-4-9-8-5q-7 5-14 0z';
let svgN67=0;
function kitSvg67(k){
  const id='k67_'+(svgN67++),a=k.a,b=k.b||k.a;let body=`<rect width="40" height="40" fill="${a}"/>`;
  switch(k.pat){
    case 'v':for(let x=1;x<40;x+=8)body+=`<rect x="${x+4}" y="0" width="4" height="40" fill="${b}"/>`;break;
    case 'vw':body+=`<rect x="8" y="0" width="8" height="40" fill="${b}"/><rect x="24" y="0" width="8" height="40" fill="${b}"/>`;break;
    case 'h':for(let y=3;y<40;y+=8)body+=`<rect x="0" y="${y+4}" width="40" height="4" fill="${b}"/>`;break;
    case 'half':body+=`<rect x="20" y="0" width="20" height="40" fill="${b}"/>`;break;
    case 'band':body+=`<rect x="0" y="17" width="40" height="9" fill="${b}"/>`;break;
    case 'diag':body+=`<polygon points="4,0 16,0 40,34 40,44 28,44 0,8" fill="${b}"/>`;break;
  }
  const edge=lumOf(a)<.3?'#e5e7eb':lumOf(a)>.8?'#6b7280':b;
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><defs><clipPath id="${id}"><path d="${SHP67}"/></clipPath></defs><g clip-path="url(#${id})">${body}</g><path d="${SHP67}" fill="none" stroke="${edge}" stroke-width="1.6" stroke-linejoin="round"/></svg>`;
}
const _ss67=shirtSvg;
shirtSvg=function(c,kind,kk){
  const k=kk||kitOf(c,kind||'home');
  return kitSvg67({a:k.a,b:k.b,pat:k.pat});
};
const _kc67=kitCss;kitCss=function(k){
  if(k.pat==='vw')return `repeating-linear-gradient(90deg,${k.a} 0 5px,${k.b} 5px 10px)`;
  if(k.pat==='band')return `linear-gradient(0deg,${k.a} 0 35%,${k.b} 35% 65%,${k.a} 65%)`;
  if(k.pat==='diag')return `linear-gradient(135deg,${k.a} 0 38%,${k.b} 38% 62%,${k.a} 62%)`;
  return _kc67(k);
};
function k3x67(){S.k3x=S.k3x||{pat:'v',a:'#111111',b:'#f8fafc',con:'mini'};return S.k3x}
function swatch67(act,sel){return COL67.map(x=>`<button class="sw67 ${sel===x?'on':''}" data-a="${act}" data-c="${x}" title="${COLN67[x]}" aria-label="${COLN67[x]}" style="background:${x}"></button>`).join('')}
function keep67(f){const y=window.scrollY;f();render();setTimeout(()=>window.scrollTo(0,y),0)}
Object.assign(A,{
  k3xp(d){keep67(()=>{k3x67().pat=d.p})},
  k3xa(d){keep67(()=>{k3x67().a=d.c})},
  k3xb(d){keep67(()=>{k3x67().b=d.c})},
  k3xc(d){keep67(()=>{k3x67().con=d.c})},
  k3xgo(){
    const k=k3x67(),pn=(PAT67.find(p=>p[0]===k.pat)||[0,''])[1];
    kit3Make({a:k.a,b:k.pat==='plain'?k.a:k.b,pat:k.pat,con:k.con,name:'3ª '+(COLN67[k.a]||'')+(k.pat==='plain'?'':' '+pn.toLowerCase())+' '+G.season});
    S.k3x=null;render();
  }
});
/* vendas por camisa: casa / fora / 3ª */
const _t9_67=tick9;tick9=function(){
  const mk=G.mk,u0=mk&&mk.shirt?mk.shirt.units:0;
  const r=_t9_67.apply(this,arguments);
  try{
    const d=mk.shirt.units-u0;
    if(d>0){
      const K=mk.shirt.kits=(mk.shirt.kits&&mk.shirt.kits.s===G.season)?mk.shirt.kits:{s:G.season,home:0,away:0,third:0};
      const B=G.kit3,w3=B&&B.cur?.3*(B.done?B.mult:1):0,tot=1+.45+w3;
      K.home+=d/tot;K.away+=d*.45/tot;K.third+=d*w3/tot;
    }
  }catch(e){}
  return r;
};
const _vmk67=vMarketing;vMarketing=function(){
  let r=_vmk67();
  try{
    const re=/<div class="x9"><section class="sec card"><h3>Camisas<small>[\s\S]*?<\/section><\/div>/;
    r=r.replace(re,'');
    const c=userClub(),B=G.kit3||{season:-1,hist:[],cur:null},k=k3x67(),used=B.season===G.season;
    const home=kitOf(c,'home'),away=kitOf(c,'away');
    const prev={a:k.a,b:k.pat==='plain'?k.a:k.b,pat:k.pat};
    const third=used&&B.cur?kitOf(c,'third'):prev;
    const sh=(kit,lab,dash)=>`<div style="text-align:center"><div style="width:58px;margin:0 auto${dash?';filter:drop-shadow(0 0 3px var(--accent))':''}">${shirtSvg(c,null,kit)}</div><small class="k">${lab}</small></div>`;
    const near=colDist(prev.a,home.a)<90;
    const kits=(G.mk.shirt.kits&&G.mk.shirt.kits.s===G.season)?G.mk.shirt.kits:{home:0,away:0,third:0};
    const tt=kits.home+kits.away+kits.third;const pc=x=>tt?Math.round(x/tt*100):0;
    const row=(n,v)=>`<div class="res"><span>${n}</span><b>${fmtN(v)} un. · ${pc(v)}%</b></div><div class="pb" style="height:6px;margin:0 0 6px"><i style="width:${pc(v)}%"></i></div>`;
    let verdict='Sem terceira camisa nesta temporada.';
    if(B.cur){
      const p3=pc(kits.third);
      verdict=!B.done?'A terceira acabou de sair, o mercado ainda está reagindo.':p3>=11?'<b class="ok">A terceira está vendendo bem</b> ('+p3+'% das camisas).':p3>=7?'A terceira vende na média ('+p3+'%).':'<b class="bad">A terceira está encalhada</b> ('+p3+'%).';
    }
    const topP=Object.entries(G.mk.shirt.by||{}).map(([id,u])=>[P(+id),u]).filter(x=>x[0]).sort((a,b)=>b[1]-a[1]).slice(0,3);
    const card=`<div class="x9"><section class="sec card"><h3>Camisas<small>casa · fora · terceira</small></h3>
     <div class="row3">${sh(home,'Casa')}${sh(away,'Fora')}${sh(third,used?'3ª':'3ª (prévia)',!used)}</div>
     ${used?`<p class="news">Terceira camisa desta temporada já lançada${B.done?'':' (resultado de vendas ainda em apuração)'}.</p>`:`
     <div class="k" style="margin-top:8px">Estilo</div><div class="schips" style="flex-wrap:wrap">${PAT67.map(p=>`<button class="sch ${k.pat===p[0]?'on':''}" data-a="k3xp" data-p="${p[0]}">${p[1]}</button>`).join('')}</div>
     <div class="k" style="margin-top:8px">${k.pat==='plain'?'Cor':'Cor base'}</div><div class="sws67">${swatch67('k3xa',k.a)}</div>
     ${k.pat==='plain'?'':`<div class="k" style="margin-top:8px">Cor da ${k.pat==='band'||k.pat==='diag'?'faixa':'listra'}</div><div class="sws67">${swatch67('k3xb',k.b)}</div>`}
     ${near?'<p class="news bad">Muito parecida com a camisa 1: a torcida pode achar sem graça.</p>':''}
     <div class="k" style="margin-top:8px">Conceito</div><div class="schips" style="flex-wrap:wrap">${K3_CON.map(x=>`<button class="sch ${k.con===x[0]?'on':''}" data-a="k3xc" data-c="${x[0]}" title="${x[2]}">${x[1]}</button>`).join('')}</div>
     <div class="row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn sm" data-a="k3xgo">Lançar · ${mi(kit3Cost(c))}</button><button class="btn sm ghost" data-a="k3dir">Sugestão do diretor</button><button class="btn sm ghost" data-a="k3patro">Sugestão do patrocinador</button></div>
     <p class="news">Sucesso ou fracasso depende do conceito, da tradição do clube, do contraste com a camisa 1 e do seu atributo de Mídia. Só uma por temporada.</p>`}
     <div class="k" style="margin-top:10px">Vendas por camisa (temporada)</div>
     ${tt?row('Casa',kits.home)+row('Fora',kits.away)+(B.cur?row('3ª camisa',kits.third):''):'<p class="news">Jogue algumas rodadas para ver as vendas.</p>'}
     <p class="news">${verdict}</p>
     ${topP.length?`<div class="k">Camisas de jogador mais vendidas</div>${topP.map(([p,u],i)=>`<div class="res"><span>${i+1}. ${esc(nameOf(p))}</span><b>${fmtN(u)} un.</b></div>`).join('')}`:''}
     ${B.hist.length&&!used?`<div class="k" style="margin-top:8px">Reedições</div><div class="schips">${B.hist.map((h,i)=>`<button class="sch" data-a="k3re" data-i="${i}">${esc(h.name)}${h.ok?' ✔':''}</button>`).join('')}</div>`:''}
     ${B.hist.length?`<div class="k" style="margin-top:8px">${B.hist.map(h=>`${h.s}: ${esc(h.name)} ${h.ok?'sucesso':'fracasso'} (${mi(h.gain)})`).join('<br>')}</div>`:''}
    </section></div>`;
    r=r.replace(/<\/div>$/,card+'</div>');
    /* sócio: projeção e desfazer */
    const mk=G.mk,pr=mk.soc.prices,orig=mk.soc.orig;
    const marker='<div class="row2" style="margin-top:8px"><div class="tile9"><div class="k">Total de sócios</div>';
    if(r.includes(marker))r=r.replace(marker,socProj67(pr,orig)+marker);
  }catch(e){console.error('vmk67 '+e.message)}
  return r;
};
function socCalc67(prices){
  const c=userClub(),mk=G.mk,T=socTarget(c);
  const n=SOCREF.map((ref,i)=>T*SOCSH[i]*clamp(Math.pow(ref/prices[i],.9),.25,1.7));
  const rev=n.reduce((s,x,i)=>s+x*prices[i]*12*.18*SC9/1e6,0);
  return {n:n.reduce((a,b)=>a+b,0),rev};
}
function socProjHTML67(prices,orig){
  const base=orig||G.mk.soc.prices,a=socCalc67(base),b=socCalc67(prices);
  const dn=b.n-a.n,dr=b.rev-a.rev;
  const cl=x=>x>0.5?'ok':x<-0.5?'bad':'';
  const same=prices.every((p,i)=>p===base[i]);
  return same?`<div class="k">Se você mexer nos preços</div><p class="news">Arraste um valor e aqui aparece o efeito: quantos sócios a torcida banca e quanto rende por ano (chega lá aos poucos, em ~15 rodadas).</p>`
   :`<div class="k">Efeito estimado das mudanças</div>
   <div class="res"><span>Sócios (no equilíbrio)</span><b>${fmtN(a.n)} → ${fmtN(b.n)} <span class="${cl(dn)}">(${dn>=0?'+':''}${fmtN(dn)})</span></b></div>
   <div class="res"><span>Receita líquida/ano</span><b>${mi(a.rev)} → ${mi(b.rev)} <span class="${cl(dr)}">(${dr>=0?'+':''}${mi(dr)})</span></b></div>`;
}
function socProj67(prices,orig){
  const ch=orig&&orig.some((p,i)=>p!==prices[i]);
  return `<div class="card" id="socproj" style="margin-top:8px">${socProjHTML67(prices,orig)}</div>${ch?`<button class="btn sm ghost" style="margin-top:6px" data-a="socundo">↩ Voltar aos preços de antes (${orig.map(p=>'R$ '+p).join(' · ')})</button>`:''}`;
}
Object.assign(A,{socundo(){const s=G.mk.soc;if(s.orig){s.prices=s.orig.slice();s.orig=null;save();toast('Preços de volta ao que era.')}}});
document.addEventListener('change',e=>{
  const t=e.target;
  if(t&&/^socp[0-2]$/.test(t.id)&&G&&G.mk&&G.mk.soc&&!G.mk.soc.orig)G.mk.soc.orig=G.mk.soc.prices.slice();
},true);
document.addEventListener('input',e=>{
  const t=e.target;
  if(t&&/^socp[0-2]$/.test(t.id)){
    try{
      const pr=[0,1,2].map(i=>+document.getElementById('socp'+i).value),box=document.getElementById('socproj');
      if(box)box.innerHTML=socProjHTML67(pr,G.mk.soc.orig||G.mk.soc.prices);
    }catch(err){}
  }
},true);

/* css */
(function(){const st=document.createElement('style');st.textContent=`
.sws67{display:flex;flex-wrap:wrap;gap:8px;margin-top:4px}
.sw67{width:30px;height:30px;border-radius:50%;border:2px solid var(--line);padding:0;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(0,0,0,.25)}
.sw67.on{border-color:var(--accent);box-shadow:0 0 0 2px var(--accent)}
.btn.top67{margin:0 0 10px}
`;document.head.appendChild(st)})();

/* ext29: save na nuvem + autosave a cada 3 partidas, escalação automática por posição, tática pelo jogo ao vivo, diretor de futebol */

/* ---- localStorage de emergência (webview do celular às vezes bloqueia/limpa) ---- */
(function(){let ok=true;try{localStorage.setItem('__rfc','1');localStorage.removeItem('__rfc')}catch(e){ok=false}
  if(!ok){const m={};const shim={getItem:k=>(k in m?m[k]:null),setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]},clear:()=>{for(const k in m)delete m[k]},key:i=>Object.keys(m)[i]||null,get length(){return Object.keys(m).length}};
    try{Object.defineProperty(window,'localStorage',{value:shim,configurable:true})}catch(e){}}})();

/* ---- penalidade de posição graduada (goleiro↔linha é a maior) ---- */
function macroPen(p,slot){
  if(slot==='GK'||p.pos==='GK')return .3;
  const T={DEF:{MID:.7,ATA:.56},MID:{DEF:.68,ATA:.7},ATA:{MID:.64,DEF:.52}};
  return ((T[p.pos]||{})[slot])||.65;
}
/* automações: só improvisa fora de posição se não houver ninguém da função */
const _ss29=slotScore;slotScore=function(p,slot,phil,w){
  let s=_ss29.apply(this,arguments);
  if(slot&&p.pos!==slot&&G&&G._hard)s-=400;
  return s;
};
const _ap29=autoPick;autoPick=function(c){G._hard=true;try{return _ap29.apply(this,arguments)}finally{G._hard=false}};
const _fl29=fixLineup;fixLineup=function(c){G._hard=true;try{return _fl29.apply(this,arguments)}finally{G._hard=false}};

/* ---- clicar no meu jogo na rodada ao vivo = pausa + tática ---- */
const _mf29=A.mfocus;A.mfocus=function(d){
  try{if(R&&+d.i===R.ui&&!S.panel){R.focus=R.ui;A.mtac();return}}catch(e){}
  return _mf29.apply(this,arguments);
};

/* ---- save na nuvem (db privado por usuário) ---- */
const CL={db:null,id:null,ok:false,tm:null,last:0,at:0,busy:false,err:'',n:0};
const _save29=save;save=function(){try{if(G&&G.v===2)G._t=Date.now()}catch(e){}_save29();cloudSched()};
async function gz29(str){
  if(typeof CompressionStream==='undefined')return {z:0,s:str};
  const cs=new CompressionStream('gzip');const w=cs.writable.getWriter();w.write(new TextEncoder().encode(str));w.close();
  const u=new Uint8Array(await new Response(cs.readable).arrayBuffer());let b='';for(let i=0;i<u.length;i+=8192)b+=String.fromCharCode.apply(null,u.subarray(i,i+8192));return {z:1,s:btoa(b)};
}
async function ungz29(s,z){
  if(!z)return s;const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);
  const ds=new DecompressionStream('gzip');const w=ds.writable.getWriter();w.write(u);w.close();return await new Response(ds.readable).text();
}
async function cloudInit(){
  try{if(typeof claude==='undefined'||!claude.use)return;
    const db=await claude.use('db'),us=await claude.use('user');if(!db||!us)return;
    CL.id=await us.id();if(!CL.id)return;CL.db=db;CL.ok=true;await cloudRestore()}catch(e){CL.err=String(e&&e.message||e)}
}
const cdoc=k=>CL.db.collection('data/users/'+CL.id).doc('sv_'+String(k).replace(/[^A-Za-z0-9_-]/g,'_'));
async function cloudSave(force){
  if(!CL.ok||CL.busy||!G||G.phase==='start'||G.v!==2)return false;
  CL.busy=true;
  try{const raw=JSON.stringify(G),g=await gz29(raw),SZ=190000,n=Math.ceil(g.s.length/SZ);
    for(let i=0;i<n;i++)await cdoc('c'+i).set({d:g.s.slice(i*SZ,(i+1)*SZ)});
    await cdoc('meta').set({t:G._t||Date.now(),n,z:g.z,club:userClub().name,season:G.season,round:G.round});
    CL.at=Date.now();CL.last=CL.at;CL.err='';return true}
  catch(e){CL.err=String(e&&e.message||e);return false}
  finally{CL.busy=false}
}
function cloudSched(){
  if(!CL.ok||CL.tm)return;const wait=Math.max(6000,25000-(Date.now()-CL.last));
  CL.tm=setTimeout(()=>{CL.tm=null;cloudSave()},wait);
}
async function cloudRestore(force){
  const m=await cdoc('meta').get();if(!m.exists)return false;const md=m.data();
  let lt=0;try{const raw=SKV.getItem(SAVE_KEY);if(raw){const x=raw.match(/"_t":(\d+)/);lt=x?+x[1]:1}}catch(e){}
  if(!force&&!(md.t>lt))return false;
  if(!force&&G&&G.phase!=='start')return false;
  let s='';for(let i=0;i<md.n;i++){const c=await cdoc('c'+i).get();if(!c.exists)return false;s+=c.data().d}
  const raw=await ungz29(s,md.z);JSON.parse(raw);SKV.setItem(SAVE_KEY,raw);CL.n++;
  if(force){loadSave();G.phase=G.phase||'play'}
  try{render()}catch(e){}return true;
}
Object.assign(A,{
  cloudnow(){cloudSave(true).then(ok=>{toast(ok?'☁️ Backup salvo na nuvem.':'Nuvem indisponível: '+(CL.err||'sem conexão com o artefato'))})},
  cloudload(){cloudRestore(true).then(ok=>{toast(ok?'☁️ Jogo restaurado da nuvem.':'Nenhum backup na nuvem.');if(ok){S.modal=null;S.prof=null;G.view='inicio';render()}}).catch(e=>toast('Falha: '+e.message))}
});
setTimeout(cloudInit,600);
/* a cada 3 partidas: cópia extra (slot automático 4) + nuvem na hora; ao sair do app também guarda */
hookAfter('finishRound','ext29_fr29',function(r,A){
  try{if(G.round>0&&G.round%3===0){save();const raw=SKV.getItem(SAVE_KEY);if(raw)SKV.setItem(slotKey(4),raw);cloudSave(true)}else save()}catch(e){}
  });
const _sm29=startMatch;startMatch=function(){try{save()}catch(e){}return _sm29.apply(this,arguments)};
document.addEventListener('visibilitychange',()=>{try{if(document.hidden&&G&&G.phase!=='start'&&!S.match){save();cloudSave(true)}}catch(e){}});
window.addEventListener('pagehide',()=>{try{if(G&&G.phase!=='start'&&!S.match)save()}catch(e){}});
const _sr29=slotRow;slotRow=function(i){let h=_sr29.apply(this,arguments);return i===4?h.replace('Slot 4','Auto · a cada 3 partidas'):h};
const _vs29=vSaves;vSaves=function(){return _vs29.apply(this,arguments).replace('<p class="foot keep">',slotRow(4)+'<p class="foot keep">')};
const _vo29=vOpcoes;vOpcoes=function(){
  let h=_vo29.apply(this,arguments);
  const st=CL.ok?(CL.at?'último backup há '+Math.max(1,Math.round((Date.now()-CL.at)/60000))+' min':'ativo — salva sozinho a cada rodada'):'indisponível neste app (usando só o armazenamento do aparelho)';
  const card=`<div class="card"><div class="k">☁️ Backup na nuvem</div><p class="news">Se o app do celular apagar o jogo, ele volta da nuvem. Autosave a cada 3 partidas. Status: ${st}.${CL.err?' ('+esc(CL.err)+')':''}</p><button class="btn sm" data-a="cloudnow">Salvar agora</button> <button class="btn sm ghost" data-a="cloudload">Restaurar da nuvem</button></div>`;
  return h.replace('<div class="card"><div class="k">Salvar jogo</div>',card+'<div class="card"><div class="k">Salvar jogo</div>');
};

/* ---- Diretor de futebol (NPC fixo) ---- */
const DIRN=['Seu Waldemar','Ademir Lopes','Jorge Pimentel','Nelson Calixto','Valdir Moura','Osmar Teixeira','Cláudio Ferrão','Gilberto Sá'];
function dirBox(){ex();if(!G.dir)G.dir={name:pick(DIRN),since:G.season,low:0,last:-9,tips:0};return G.dir}
function dirTip(){
  const d=dirBox(),c=userClub();if(G.round-d.last<3)return;
  const q=clamp(.35+G.board.conf/100*.5,.3,.85),good=Math.random()<q;
  const squad=c.squad.map(id=>P(id)),xi=squad.slice(0,11),bench=squad.slice(11).filter(p=>p.inj===0&&!p.loan);
  const wi=winOpen(),cx=G.fin.caixa,PN={GK:'goleiro',DEF:'defesa',MID:'meio-campo',ATA:'ataque'};
  const avg=(l)=>l.length?l.reduce((s,p)=>s+p.ovr,0)/l.length:0;
  const info=['GK','DEF','MID','ATA'].map(ps=>{const x=xi.filter(p=>p.pos===ps),b=bench.filter(p=>p.pos===ps);const minB={GK:1,DEF:2,MID:2,ATA:1}[ps];
    return {ps,x,b,gate:avg(x),low:x.length?Math.min(...x.map(p=>p.ovr)):0,gap:Math.max(0,minB-b.length),n:squad.filter(p=>p.pos===ps).length}});
  const acts=[];let body='',title='';
  const budget=Math.max(0,cx);
  /* 1) caixa curto ou elenco inchado: a dica é vender */
  const surplus=info.map(i=>({i,ex:i.b.filter(p=>!p.listed&&(p.age>=30||p.ovr<i.low-4))})).filter(o=>o.ex.length&&o.i.b.length>({GK:1,DEF:2,MID:2,ATA:1})[o.i.ps]);
  const broke=budget<scaleOf(c)*.03||c.squad.length>=27;
  if(broke||(surplus.length&&Math.random()<.4)){
    let cand=null;
    if(surplus.length)cand=surplus[Math.floor(Math.random()*surplus.length)].ex.sort((a,b)=>valueOf(b)-valueOf(a))[0];
    if(!cand)cand=bench.filter(p=>!p.listed&&p.age>=29).sort((a,b)=>valueOf(b)-valueOf(a))[0];
    if(!cand)return;
    title='sugere uma venda';
    body=d.name+' aqui. '+(broke?(c.squad.length>=27?'Elenco tá inchado ('+c.squad.length+' jogadores) e ':'O caixa tá curto (R$ '+budget.toFixed(1).replace('.',',')+' mi) e ')+'a gente precisa respirar. ':'Tem gente sobrando. ')+'Sugiro negociar '+nameOf(cand)+' ('+cand.age+' anos, OVR '+cand.ovr+', '+PN[cand.pos]+', valor '+mi(valueOf(cand))+'): é reserva e não faz falta no time.'+(good?'':' Dá pra pedir um pouco acima do valor.')+(wi?'':'\nJanela fechada: só dá pra fazer quando abrir.');
    acts.push({l:'Colocar à venda',k:'dlist',p:{pid:cand.id}},{l:'Ver jogador',k:'prof',p:{pid:cand.id},g:1},{l:'Ignorar',k:'wait',g:1});
  }else{
    /* 2) reforço: carência de banco primeiro, depois titular mais fraco; sempre dentro do orçamento */
    const gapPos=info.filter(i=>i.gap>0).sort((a,b)=>b.gap-a.gap)[0];
    const weak=info.filter(i=>i.x.length).sort((a,b)=>a.gate-b.gate)[0];
    const tgt=gapPos&&(Math.random()<.65||!good)?gapPos:weak;const isDepth=tgt===gapPos;
    const maxFee=budget*(isDepth?.25:.55);
    const lim=isDepth?tgt.low-3:tgt.low;
    let pool=[];for(const x of G.clubs){if(x.id===c.id||x.squad.length<=20)continue;for(const id of x.squad){const p=P(id);if(p.pos!==tgt.ps||p.loan||p.age>(isDepth?33:31))continue;pool.push(p)}}
    const free=G.free.map(id=>P(id)).filter(p=>p&&p.pos===tgt.ps&&p.ovr>=lim-3);
    let cand=null,fee=0;
    const ok=pool.filter(p=>valueOf(p)<=maxFee&&p.ovr>=lim&&p.ovr<=tgt.gate+8);
    if(ok.length){ok.sort((a,b)=>good?((b.ovr-valueOf(b)*.5)-(a.ovr-valueOf(a)*.5)):(valueOf(b)-valueOf(a)));cand=ok[0];fee=valueOf(cand)}
    else if(free.length){cand=free.sort((a,b)=>b.ovr-a.ovr)[0];fee=0}
    if(!cand){
      d.last=G.round;mail('dir','🧑‍💼 '+d.name+': sem grana pra reforço',d.name+' aqui. Falta '+(isDepth?'um reserva de ':'reforço no ')+PN[tgt.ps]+', mas pelo orçamento atual (R$ '+budget.toFixed(1).replace('.',',')+' mi) nada que valha a pena. Melhor segurar e vender alguém antes.',[],'dir');return}
    title='sugere um reforço';
    body=d.name+' aqui. '+(isDepth?'Nosso banco tá curto de '+PN[tgt.ps]+' ('+tgt.b.length+' reserva(s)).':'O ponto mais fraco do time titular é o '+PN[tgt.ps]+' (média '+Math.round(tgt.gate)+').')+' Olha '+nameOf(cand)+(cand.club>=0?' do '+C(cand.club).name:' (livre no mercado)')+': '+cand.age+' anos, OVR '+cand.ovr+', '+(fee?'custa uns '+mi(fee)+', cabe no orçamento (sobram '+mi(budget-fee)+').':'sem custo de transferência, só salário.')+(cand.ovr>tgt.low?' Ele briga por vaga no time.':' Serve de reserva.')+(wi?'':'\nA janela está fechada: ele só vem quando abrir.');
    acts.push(cand.club>=0?{l:'Abrir negociação',k:'neg',p:{pid:cand.id}}:{l:'Contratar livre',k:'sign',p:{pid:cand.id}},{l:'Ver jogador',k:'prof',p:{pid:cand.id},g:1},{l:'Ignorar',k:'wait',g:1});
  }
  d.last=G.round;d.tips++;
  mail('dir','🧑‍💼 '+d.name+' (Diretor de futebol) '+title,body+'\n(O diretor olha elenco e orçamento, mas nem toda dica é boa. Confira antes.)',acts,'dir');
}
Object.assign(MACT,{
  dlist(p){const q=P(p.pid);q.listed=true;q.ask=+(valueOf(q)*1.1).toFixed(2);return {ok:true,t:nameOf(q)+' colocado à venda por '+mi(q.ask)+'.'}},
  sign(p){const r=signFree(p.pid);return r?{ok:false,t:r}:{ok:true,t:'Contratado!'}},
  neg(p){const r=negStart(p.pid);if(r){return {ok:false,t:r}}S.prof=null;return {ok:true,t:'',keep:true}}
});
hookAfter('finishRound','ext29_fr29b',function(r,A){
  try{const d=dirBox();
    if(G.board.conf<30){d.low++}else d.low=Math.max(0,d.low-1);
    if(d.low>=3){const old=d.name;d.name=pick(DIRN.filter(x=>x!==old));d.low=0;d.since=G.season;mail('dir','🔄 Presidente trocou o diretor de futebol',old+' foi demitido pela pressão. Novo diretor: '+d.name+'.',[],'dirx')}
    if(G.round>=1&&Math.random()<.5)dirTip()}catch(e){console.error('dir29 '+e.message)}
  });

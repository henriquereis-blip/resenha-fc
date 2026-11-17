/* ext45: conta + save na nuvem (Supabase). Só funciona quando o jogo roda de uma página normal (GitHub Pages / app instalado). */
const SB={url:'https://rpfkszmptmtrczeezrgw.supabase.co',key:'sb_publishable_brkn6E7sdygrpaE79G3F7A__FeKXY3W',ses:null,msg:'',busy:false,info:null,last:0};
try{SB.ses=JSON.parse(localStorage.getItem('rfc_sb')||'null')}catch(e){}
const sbOk=()=>/^https?:/.test(location.protocol)&&/github\.io|localhost|127\.0\.0\.1/.test(location.hostname);
function sbStore(s){SB.ses=s;try{s?localStorage.setItem('rfc_sb',JSON.stringify(s)):localStorage.removeItem('rfc_sb')}catch(e){}}
async function sbReq(path,o){
  o=o||{};const h=Object.assign({apikey:SB.key,'content-type':'application/json'},o.headers||{});
  if(o.auth!==false&&SB.ses)h.authorization='Bearer '+SB.ses.access_token;
  let r=await fetch(SB.url+path,{method:o.method||'GET',headers:h,body:o.body});
  if(r.status===401&&o.auth!==false&&SB.ses&&SB.ses.refresh_token&&!o.retry){
    const rr=await fetch(SB.url+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:SB.key,'content-type':'application/json'},body:JSON.stringify({refresh_token:SB.ses.refresh_token})});
    if(rr.ok){const j=await rr.json();sbStore(sbSes(j));return sbReq(path,Object.assign({},o,{retry:true}))}
    sbStore(null)}
  return r;
}
const sbSes=j=>({access_token:j.access_token,refresh_token:j.refresh_token,uid:j.user&&j.user.id,email:j.user&&j.user.email,exp:Date.now()+(j.expires_in||3600)*1e3});
async function sbAuth(kind,em,pw){
  const path=kind==='up'?'/auth/v1/signup':'/auth/v1/token?grant_type=password';
  const r=await sbReq(path,{method:'POST',auth:false,body:JSON.stringify({email:em,password:pw})});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(sbErr(j));
  if(!j.access_token)throw new Error('Cadastro criado, mas o Supabase ainda pede confirmação por e-mail. Confirma o e-mail ou desliga a confirmação no painel.');
  sbStore(sbSes(j));SB.tried=0;
}
function sbErr(j){const m=(j&&(j.msg||j.error_description||j.message||j.error))||'erro';
  if(/Invalid login/i.test(m))return 'E-mail ou senha errados.';if(/already registered|already exists/i.test(m))return 'Esse e-mail já tem conta. Usa Entrar.';
  if(/at least|weak|short/i.test(m))return 'Senha fraca: usa 6+ caracteres.';if(/valid email|invalid.*email/i.test(m))return 'E-mail inválido.';
  if(/rate limit/i.test(m))return 'Muitas tentativas. Espera uns minutos.';return String(m).slice(0,120)}
/* compressão gzip + base64 (save de vários MB vira algumas centenas de KB) */
async function sbPack(s){
  try{if(typeof CompressionStream==='undefined')return s;
    const buf=await new Response(new Blob([s]).stream().pipeThrough(new CompressionStream('gzip'))).arrayBuffer();
    const u=new Uint8Array(buf);let b='';for(let i=0;i<u.length;i+=32768)b+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return 'gz:'+btoa(b)}catch(e){return s}}
async function sbUnpack(d){
  if(d.slice(0,3)!=='gz:')return d;
  const bin=atob(d.slice(3)),u=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);
  return await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream('gzip'))).text()}
async function sbPush(cs,quiet){
  if(!SB.ses||!sbOk()||SB.busy)return false;SB.busy=true;
  try{save();SKV.flush();const raw=SKV.getItem(SAVE_KEY);if(!raw)throw new Error('sem save local');
    const c=userClub(),sea=G.season,rnd=G.round,data=await sbPack(raw);
    const r=await sbReq('/rest/v1/saves?on_conflict=user_id,slot',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify({user_id:SB.ses.uid,slot:cs,data,club:c?c.name:null,season:sea,round:rnd,updated_at:new Date().toISOString()})});
    if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(sbErr(j))}
    SB.last=Date.now();SB.msg=quiet?SB.msg:(cs?'Salvo no slot '+cs+' ✔':'Salvo ✔');return true}
  catch(e){SB.msg='Falha ao salvar: '+e.message;return false}
  finally{SB.busy=false}
}
async function sbList(){
  if(!SB.ses||!sbOk())return;
  try{const r=await sbReq('/rest/v1/saves?select=slot,club,season,round,updated_at&order=slot.asc');if(r.ok){SB.list=await r.json();SB.listOk=1;
    if(typeof render==='function'&&G&&(G.phase==='start'||G.view==='opcoes'))render()}}catch(e){}
}
async function sbPull(cs){
  const r=await sbReq('/rest/v1/saves?select=data&slot=eq.'+cs);if(!r.ok)throw new Error('falha ao baixar');
  const a=await r.json();if(!a.length)return null;const raw=await sbUnpack(a[0].data);JSON.parse(raw);return raw}
const sbRow=cs=>(SB.list||[]).find(x=>x.slot===cs);
const sbName=cs=>cs===0?'Automático':'Slot '+cs;
const sbWhen=t=>{try{return new Date(t).toLocaleString('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}catch(e){return ''}};
Object.assign(A,{
  sbin(){sbDo('in')},sbup(){sbDo('up')},
  sbout(){sbStore(null);SB.list=null;SB.listOk=0;SB.msg='Saiu da conta.';render()},
  sbsave(d){const cs=+d.i;SB.msg='Salvando…';render();sbPush(cs).then(ok=>{render();if(ok)sbList()})},
  sbload(d){const cs=+d.i;SB.msg='Baixando…';render();sbPull(cs).then(raw=>{
    if(!raw){SB.msg='Slot vazio.';render();return}
    SKV.setItem(SAVE_KEY,raw);S.modal=null;S.prof=null;S.match=null;SB.msg='Carregado da nuvem ✔';
    if(loadSave()){G.phase=G.phase||'play';if(G.round>=NR()){if(!G.summary)endSeason();G.phase='seasonEnd';S.modal={t:'season'}}G.view='inicio'}
    render();window.scrollTo(0,0)
  }).catch(e=>{SB.msg='Falha: '+e.message;render()})},
  sbdel(d){const cs=+d.i;sbReq('/rest/v1/saves?slot=eq.'+cs,{method:'DELETE'}).then(r=>{SB.msg=r.ok?'Apagado ✔':'Falha ao apagar';return sbList()}).then(()=>render())}
});
function sbDo(kind){
  const em=(document.getElementById('sb_em')||{}).value||'',pw=(document.getElementById('sb_pw')||{}).value||'';
  if(!em||!pw){SB.msg='Preenche e-mail e senha.';render();return}
  SB.msg='Entrando…';render();
  sbAuth(kind,em.trim(),pw).then(()=>{SB.msg=kind==='up'?'Conta criada ✔':'Logado ✔';SB.tried=0;sbList();render()}).catch(e=>{SB.msg=(e&&e.message==='Failed to fetch'?'Sem conexão com o servidor (Failed to fetch). ':'')+(e&&e.message||'erro');render()})
}
function sbLogin(){return `<p class="news">Entra pra guardar seus saves na nuvem (5 slots + automático) e jogar de qualquer aparelho. ${esc(SB.msg)}</p><input id="sb_em" class="fsel" type="email" placeholder="e-mail" autocomplete="email" style="margin-bottom:6px"><input id="sb_pw" class="fsel" type="password" placeholder="senha (6+ caracteres)" autocomplete="current-password" style="margin-bottom:8px"><button class="btn sm" data-a="sbin">Entrar</button> <button class="btn sm ghost" data-a="sbup">Criar conta</button>`}
function sbSlots(ingame){
  if(!SB.listOk&&!SB.tried){SB.tried=1;sbList()}
  return [0,1,2,3,4,5].map(cs=>{const r=sbRow(cs);if(cs===0&&!r&&!ingame)return '';
    const nm=r?`${sbName(cs)} · ${esc(r.club||'?')}`:`${sbName(cs)}`,sub=r?`temporada ${r.season}, rodada ${r.round} · ${sbWhen(r.updated_at)}`:'vazio';
    const bt=(r?`<button class="btn sm" data-a="sbload" data-i="${cs}">Carregar</button>`:'')+(ingame&&cs>0?`<button class="btn sm ${r?'ghost':''}" data-a="sbsave" data-i="${cs}">${r?'Sobrescrever':'Salvar aqui'}</button>`:'')+(r&&cs>0?`<button class="btn sm ghost" data-a="sbdel" data-i="${cs}">🗑</button>`:'');
    return `<div style="border:1px solid var(--line);border-radius:12px;padding:9px 11px;margin:0 0 8px;${r?'':'opacity:.75'}"><div style="font-weight:700">${nm}</div><div class="hint" style="margin:2px 0 ${bt?'8px':'0'}">${sub}</div>${bt?`<div style="display:flex;gap:6px;flex-wrap:wrap">${bt}</div>`:''}</div>`}).join('')}
function sbCard(ingame){
  const t=`<div class="k">☁️ Saves na nuvem${SB.ses?' · '+esc(SB.ses.email||''):''}</div>`;
  if(!sbOk())return `<div class="card">${t}<p class="news">Saves na nuvem funcionam na versão do site: <b>henriquereis-blip.github.io/resenha-fc</b>. Abre por lá.</p></div>`;
  if(!SB.ses)return `<div class="card">${t}${sbLogin()}</div>`;
  return `<div class="card">${t}<p class="news">${esc(SB.msg)||'Seus jogos guardados online.'}</p>${sbSlots(ingame)}<button class="btn sm ghost" data-a="sbout">Sair da conta</button></div>`}
const _vo45=vOpcoes;vOpcoes=function(){
  return _vo45.apply(this,arguments).replace('<div class="card"><div class="k">Salvar jogo</div>',sbCard(true)+'<div class="card"><div class="k">Salvar jogo</div>')};
const _vsv45=vSaves;vSaves=function(){return _vsv45.apply(this,arguments).replace('<p class="foot keep">',sbCard(false)+'<p class="foot keep">').replace(/(<p class="foot">Dentro do jogo)/,sbCard(false)+'$1')};
const _vt45=vTitle;vTitle=function(){
  let h=_vt45.apply(this,arguments);
  const n=(SB.list||[]).length,sub=!sbOk()?'Disponível na versão do site':SB.ses?(SB.listOk?(n?n+' save'+(n>1?'s':'')+' na nuvem · '+esc(SB.ses.email||''):'Nenhum save na nuvem ainda'):'Buscando…'):'Entre pra guardar seus saves online';
  if(SB.ses&&!SB.listOk&&!SB.tried){SB.tried=1;sbList()}
  return h.replace('<p class="foot">','<button class="mb20" data-a="step" data-v="saves"><span class="ic">☁️</span><span><b>Saves na nuvem</b><small>'+sub+'</small></span></button><p class="foot">')};
/* autosave na nuvem: a cada 3 rodadas e ao sair do app (só logado) */
const _fr45=finishRound;finishRound=function(){const r=_fr45.apply(this,arguments);try{if(SB.ses&&!sbOk()&&G.round>0&&G.round%3===0&&Date.now()-SB.last>20000)sbPush(0,true)}catch(e){}return r};
document.addEventListener('visibilitychange',()=>{try{if(document.hidden&&SB.ses&&G&&G.phase!=='start'&&!S.match&&Date.now()-SB.last>20000)sbPush(0,true)}catch(e){}});

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
  sbStore(sbSes(j));
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
async function sbPush(slot,quiet){
  if(!SB.ses||!sbOk()||SB.busy)return false;SB.busy=true;
  try{save();SKV.flush();const raw=SKV.getItem(slot?slotKey(slot):SAVE_KEY);if(!raw)throw new Error('sem save local');
    const c=userClub(),data=await sbPack(raw);
    const r=await sbReq('/rest/v1/saves?on_conflict=user_id,slot',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify({user_id:SB.ses.uid,slot,data,club:c?c.name:null,season:G.season,round:G.round,updated_at:new Date().toISOString()})});
    if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(sbErr(j))}
    SB.last=Date.now();SB.msg=quiet?SB.msg:'Salvo na nuvem ✔';return true}
  catch(e){SB.msg='Falha ao salvar: '+e.message;return false}
  finally{SB.busy=false}
}
async function sbInfo(){
  if(!SB.ses||!sbOk())return;
  try{const r=await sbReq('/rest/v1/saves?select=slot,club,season,round,updated_at&slot=eq.0');if(r.ok){const a=await r.json();SB.info=a[0]||null;if(typeof render==='function'&&G&&G.view==='opcoes')render()}}catch(e){}
}
async function sbPull(slot){
  const r=await sbReq('/rest/v1/saves?select=data&slot=eq.'+slot);if(!r.ok)throw new Error('falha ao baixar');
  const a=await r.json();if(!a.length)return null;const raw=await sbUnpack(a[0].data);JSON.parse(raw);return raw}
Object.assign(A,{
  sbin(){sbDo('in')},sbup(){sbDo('up')},
  sbout(){sbStore(null);SB.info=null;SB.msg='Saiu da conta.';render()},
  sbsave(){SB.msg='Salvando…';render();sbPush(0).then(()=>render())},
  sbload(){SB.msg='Baixando…';render();sbPull(0).then(raw=>{
    if(!raw){SB.msg='Nenhum save na nuvem ainda.';render();return}
    SKV.setItem(SAVE_KEY,raw);loadSave();G.phase=G.phase||'play';S.modal=null;S.prof=null;S.match=null;G.view='inicio';SB.msg='Jogo carregado da nuvem ✔';render()
  }).catch(e=>{SB.msg='Falha: '+e.message;render()})}
});
function sbDo(kind){
  const em=(document.getElementById('sb_em')||{}).value||'',pw=(document.getElementById('sb_pw')||{}).value||'';
  if(!em||!pw){SB.msg='Preenche e-mail e senha.';render();return}
  SB.msg='Entrando…';render();
  sbAuth(kind,em.trim(),pw).then(()=>{SB.msg=kind==='up'?'Conta criada ✔':'Logado ✔';sbInfo();render()}).catch(e=>{SB.msg=(e&&e.message==='Failed to fetch'?'Sem conexão com o servidor (Failed to fetch). ':'')+(e&&e.message||'erro');render()})
}
const _vo45=vOpcoes;vOpcoes=function(){
  let h=_vo45.apply(this,arguments),card;
  if(!sbOk())card=`<div class="card"><div class="k">👤 Conta online</div><p class="news">Login e save na nuvem funcionam na versão do site: <b>henriquereis-blip.github.io/resenha-fc</b>. Abre por lá.</p></div>`;
  else if(!SB.ses)card=`<div class="card"><div class="k">👤 Conta online <span class="hint">(v46.1)</span></div><p class="news">Cria uma conta pra guardar o save na nuvem e jogar de qualquer aparelho. ${esc(SB.msg)}</p><input id="sb_em" class="fsel" type="email" placeholder="e-mail" autocomplete="email" style="margin-bottom:6px"><input id="sb_pw" class="fsel" type="password" placeholder="senha (6+ caracteres)" autocomplete="current-password" style="margin-bottom:8px"><button class="btn sm" data-a="sbin">Entrar</button> <button class="btn sm ghost" data-a="sbup">Criar conta</button></div>`;
  else{const i=SB.info,t=i?new Date(i.updated_at).toLocaleString('pt-BR'):null;
    card=`<div class="card"><div class="k">👤 ${esc(SB.ses.email||'Conta online')}</div><p class="news">${i?`Na nuvem: <b>${esc(i.club||'?')}</b>, temporada ${i.season}, rodada ${i.round} (${t}).`:'Nada salvo na nuvem ainda.'} ${esc(SB.msg)}</p><button class="btn sm" data-a="sbsave">Salvar na nuvem</button> <button class="btn sm ghost" data-a="sbload">Carregar da nuvem</button> <button class="btn sm ghost" data-a="sbout">Sair</button></div>`;
    if(!SB.info&&!SB.tried){SB.tried=1;sbInfo()}}
  return h.replace('<div class="card"><div class="k">Salvar jogo</div>',card+'<div class="card"><div class="k">Salvar jogo</div>');
};
/* autosave na nuvem: a cada 3 rodadas e ao sair do app (só logado) */
const _fr45=finishRound;finishRound=function(){const r=_fr45.apply(this,arguments);try{if(SB.ses&&G.round>0&&G.round%3===0&&Date.now()-SB.last>20000)sbPush(0,true)}catch(e){}return r};
document.addEventListener('visibilitychange',()=>{try{if(document.hidden&&SB.ses&&G&&G.phase!=='start'&&!S.match&&Date.now()-SB.last>20000)sbPush(0,true)}catch(e){}});

/* ext48: modo "nuvem primeiro" (só no site): login obrigatório, saves só na nuvem; o celular guarda só uma cópia escondida de segurança */
const cloud48=()=>sbOk();
const _sv48=save;save=function(){try{if(G&&G.phase!=='start')G._t=Date.now()}catch(e){}return _sv48.apply(this,arguments)};
const localT48=()=>{try{const r=SKV.getItem(SAVE_KEY);if(!r)return 0;const m=r.match(/"_t":(\d+)/);return m?+m[1]:1}catch(e){return 0}};
function localWipe48(){try{SKV.removeItem(SAVE_KEY);for(let i=1;i<=4;i++)SKV.removeItem(slotKey(i));SKV.flush()}catch(e){}}
async function sbPutRaw(cs,raw){
  const f=sumOf(raw);if(!f)return false;
  const data=await sbPack(raw);
  const r=await sbReq('/rest/v1/saves?on_conflict=user_id,slot',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},
    body:JSON.stringify({user_id:SB.ses.uid,slot:cs,data,club:f.club,season:f.season,round:f.round,updated_at:new Date().toISOString()})});
  return r.ok}
/* sobe saves antigos que ainda estão no aparelho e limpa o que subiu */
async function migrate48(){
  if(!cloud48()||!SB.ses||!SB.listOk||SB.mig)return;SB.mig=1;let n=0;
  try{
    const free=()=>{for(let i=1;i<=5;i++)if(!sbRow(i))return i;return 0};
    for(let i=1;i<=3;i++){const raw=SKV.getItem(slotKey(i));if(!raw)continue;
      const cs=!sbRow(i)?i:free();if(!cs)continue;
      if(await sbPutRaw(cs,raw)){SB.list=(SB.list||[]).concat([{slot:cs}]);SKV.removeItem(slotKey(i));n++}}
    SKV.removeItem(slotKey(4));SKV.flush();
  }catch(e){}
  if(n){await sbList();SB.msg='';try{toast('☁️ '+n+' save(s) antigo(s) enviado(s) pra nuvem.')}catch(e){}}
}
/* tela de entrada obrigatória */
function vGate(){
  return `<div class="wrap ti20"><div class="logo"><b>RESENHA</b><span>FC</span></div><p class="lead">Melhor que Brasfoot, menos burocrático que Football Manager.</p>
  <div class="card"><div class="k">👤 Entre pra jogar</div>${sbLogin()}</div>
  <p class="hint">${navigator.onLine?"":"📴 Sem internet? Pode entrar mesmo assim: o jogo fica no aparelho e sobe quando a conexão voltar. "}Seu jogo fica salvo na sua conta, na nuvem: dá pra continuar de qualquer aparelho e nada se perde se o celular limpar os dados.</p></div>`;
}
const _vs48=vStart;vStart=function(){
  if(cloud48()&&!SB.ses)return vGate();
  return _vs48.apply(this,arguments)};
/* tela inicial no modo nuvem */
const _vt48=vTitle;vTitle=function(){
  if(!cloud48())return _vt48.apply(this,arguments);
  if(SB.ses&&!SB.listOk&&!SB.tried){SB.tried=1;sbList()}
  migrate48();sync48();
  const r0=sbRow(0),lt=localT48(),hasLocal=lt>0&&(()=>{try{return !!sumOf(SKV.getItem(SAVE_KEY))}catch(e){return false}})();
  const n=(SB.list||[]).length;
  let cont='';
  if(hasLocal&&(!r0||lt>Date.parse(r0.updated_at)+2000)){const f=sumOf(SKV.getItem(SAVE_KEY));cont=`<button class="mb20 pri" data-a="cont48"><span class="ic">▶</span><span><b>Continuar carreira</b><small>${esc(f.club)} · temporada ${f.season}, rodada ${Math.min(f.round+1,NR())} · ${st48()}</small></span></button>`}
  else if(r0)cont=`<button class="mb20 pri" data-a="cont48"><span class="ic">▶</span><span><b>Continuar carreira</b><small>${esc(r0.club||'')} · temporada ${r0.season}, rodada ${r0.round+1} · ☁️ na nuvem</small></span></button>`;
  return `<div class="wrap ti20"><div class="logo"><b>RESENHA</b><span>FC</span></div><p class="lead">Melhor que Brasfoot, menos burocrático que Football Manager.</p>
  ${cont}
  <button class="mb20 ${cont?'':'pri'}" data-a="newgame"><span class="ic">✨</span><span><b>Começar jogo novo</b><small>Crie seu treinador, escolha liga e clube</small></span></button>
  <button class="mb20" data-a="step" data-v="saves"><span class="ic">💾</span><span><b>Saves</b><small>${SB.listOk?(n?n+' save'+(n>1?'s':'')+' na nuvem':'Nenhum save ainda'):(navigator.onLine?'Buscando seus saves…':'📴 sem internet')} · ${esc(SB.ses.email||'')}</small></span></button>
  <div class="k" style="margin:16px 4px 6px">Multiplayer</div>
  <button class="mb20" data-a="step" data-v="mpl"><span class="ic">👥</span><span><b>Multiplayer local</b><small>Vários técnicos no mesmo aparelho · em breve</small></span></button>
  <button class="mb20" data-a="mpo"><span class="ic">🌐</span><span><b>Multiplayer online</b><small>Conectado como ${esc((SB.prof&&SB.prof.nick)||SB.ses.email||'')} · em breve</small></span></button>
  <button class="btn sm ghost" data-a="sbout" style="margin:10px 0 0">Sair da conta</button>
  <p class="foot">Elencos baseados em dados de memória (podem estar desatualizados). Atributos e escudos são inventados.</p></div>`};
const _cont48=A.cont;
Object.assign(A,{
  cont48(){
    const r0=sbRow(0),lt=localT48();
    if(lt>0&&(!r0||lt>Date.parse(r0.updated_at)+2000||!navigator.onLine||synced48())){_cont48();return}
    SB.msg='Baixando…';toast('☁️ Baixando seu jogo…');
    sbPull(0).then(raw=>{if(!raw){toast('Save não encontrado na nuvem.');return}SKV.setItem(SAVE_KEY,raw);setSync48(localT48(),r0&&r0.updated_at);_cont48()}).catch(e=>toast('Falha: '+e.message))}
});
/* Saves: só os da nuvem */
const _vsv48=vSaves;vSaves=function(){
  if(!cloud48())return _vsv48.apply(this,arguments);
  return `<div class="wrap"><button class="back" data-a="step" data-v="home">‹ Início</button><h2>Saves</h2>${sbCard(false)}<p class="foot">Dentro do jogo, em Opções, você salva nos slots 1 a 5. O jogo salva no aparelho a cada rodada e sobe pra nuvem sozinho; sem internet você joga normal e ele sincroniza quando voltar. ${st48()}</p></div>`};
/* Opções: sem save local */
const _rd48=render;render=function(){_rd48.apply(this,arguments);
  try{if(cloud48()&&G&&G.phase!=='start'&&G.view==='opcoes')document.querySelectorAll('.main .card').forEach(c=>{const k=(c.querySelector('.k')||{}).textContent||'';if(k==='Salvar jogo'||/Backup na nuvem/.test(k)&&!/Saves/.test(k))c.remove()})}catch(e){}};
/* voltar ao menu: o jogo continua no aparelho e sobe pra nuvem assim que der */
const _tm48=A.tomenu;A.tomenu=function(){
  const go=cloud48()&&SB.ses&&G&&G.phase!=='start';
  const r=_tm48.apply(this,arguments);if(go)setTimeout(()=>sync48(1),50);return r};
/* autosave na nuvem a cada rodada (e ao sair do app) */
const _fr48=finishRound;finishRound=function(){const r=_fr48.apply(this,arguments);try{if(cloud48()&&SB.ses){sync48(0,1)}}catch(e){}return r};

/* ===== OFFLINE-FIRST: o aparelho é o save principal; a nuvem recebe cópia sempre que tiver internet ===== */
function syncRec48(){try{return JSON.parse(localStorage.getItem('rfc_sync_'+(SB.ses&&SB.ses.uid))||'{}')}catch(e){return {}}}
function setSync48(t,c){try{localStorage.setItem('rfc_sync_'+(SB.ses&&SB.ses.uid),JSON.stringify({t:t||0,cloud:c||''}))}catch(e){}}
function synced48(){const lt=localT48(),sy=syncRec48(),r0=sbRow(0);return lt>0&&sy.t>=lt&&!!r0&&sy.cloud===r0.updated_at}
function st48(){if(!SB.ses)return '';if(!navigator.onLine)return '📴 sem internet, salvo no aparelho';return synced48()?'☁️ sincronizado':'⏳ subindo pra nuvem'}
async function sync48(tm,quiet){
  if(!cloud48()||!SB.ses||!navigator.onLine||SB.sy)return;
  if(quiet&&Date.now()-(SB.syLast||0)<15000)return;
  SB.sy=1;SB.syLast=Date.now();
  try{
    if(G&&G.phase!=='start'&&!S.match)try{save()}catch(e){}
    if(!SB.listOk){SB.tried=1;await sbList()}
    if(!SB.listOk)return;
    const raw=SKV.getItem(SAVE_KEY);if(!raw||!sumOf(raw))return;
    const lt=localT48(),sy=syncRec48(),r0=sbRow(0);
    if(synced48())return;
    if(r0&&Date.parse(r0.updated_at)>lt+2000&&sy.cloud!==r0.updated_at)return; /* nuvem mais nova (outro aparelho): ela ganha */
    if(await sbPutRaw(0,raw)){await sbList();const n=sbRow(0);setSync48(lt,n&&n.updated_at);
      if(tm){try{toast('☁️ Jogo salvo na nuvem')}catch(e){}}
      if(SB.wasOff){SB.wasOff=0;try{toast('☁️ Internet voltou: jogo sincronizado')}catch(e){}}
      if(G&&G.phase==='start'&&typeof render==='function')render()}
  }catch(e){}
  finally{SB.sy=0}
}
const _sp48=sbPush;sbPush=async function(cs){
  if(!navigator.onLine){SB.wasOff=1;SB.msg='Sem internet: o jogo fica salvo no aparelho e sobe sozinho quando voltar.';return false}
  const ok=await _sp48.apply(this,arguments);
  if(ok&&cs===0){await sbList();const n=sbRow(0);setSync48(localT48(),n&&n.updated_at)}
  return ok};
window.addEventListener('online',()=>{SB.tried=0;SB.syLast=0;sync48()});
window.addEventListener('offline',()=>{SB.wasOff=1;try{if(G&&G.phase==='start')render()}catch(e){}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden){SB.syLast=0;sync48()}});
setInterval(()=>sync48(0,1),60000);
/* ===== LOGIN SEM INTERNET ===== */
/* guarda um "verificador" da senha (hash PBKDF2) neste aparelho depois de um login que deu certo; a senha em si nunca fica salva */
const lvKey=em=>'rfc_lv_'+String(em||'').trim().toLowerCase();
async function lvHash(pw,salt){
  const k=await crypto.subtle.importKey('raw',new TextEncoder().encode(pw),'PBKDF2',false,['deriveBits']);
  const b=await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:100000},k,256);
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
async function lvSet(em,pw,uid){try{const salt=Math.random().toString(36).slice(2)+Date.now().toString(36);
  localStorage.setItem(lvKey(em),JSON.stringify({salt,hash:await lvHash(pw,salt),uid:uid||''}))}catch(e){}}
const lvGet=em=>{try{return JSON.parse(localStorage.getItem(lvKey(em))||'null')}catch(e){return null}};
const _ss48=sbStore;sbStore=function(s){try{if(s&&s.email&&s.access_token)localStorage.setItem('rfc_sbl_'+s.email.toLowerCase(),JSON.stringify(s))}catch(e){}return _ss48.apply(this,arguments)};
const _sa48=sbAuth;sbAuth=async function(kind,em,pw){await _sa48.apply(this,arguments);try{await lvSet(em,pw,SB.ses&&SB.ses.uid)}catch(e){}};
async function offLogin48(){
  const em=((document.getElementById('sb_em')||{}).value||'').trim().toLowerCase(),pw=(document.getElementById('sb_pw')||{}).value||'';
  if(!em||!pw){SB.msg='Preenche e-mail e senha.';render();return}
  const lv=lvGet(em);
  if(lv){
    let ok=false;try{ok=(await lvHash(pw,lv.salt))===lv.hash}catch(e){}
    if(!ok){SB.msg='E-mail ou senha errados.';render();return}
    let last=null;try{last=JSON.parse(localStorage.getItem('rfc_sbl_'+em)||'null')}catch(e){}
    sbStore(last||{email:em,uid:lv.uid,pend:true});
    SB.msg='Entrou sem internet com a conta salva neste aparelho.'}
  else{sbStore({email:em,pend:true});SB.msg='Sem internet: você joga no aparelho e, quando a internet voltar, eu peço a senha pra subir o jogo.'}
  SB.tried=0;SB.listOk=0;SB.mig=0;render()}
const _sd48=sbDo;sbDo=function(kind){if(cloud48()&&!navigator.onLine){offLogin48();return}return _sd48.apply(this,arguments)};
/* conta "pendente" (entrou offline sem sessão válida) não fala com o servidor até confirmar a senha */
const pend48=()=>!!(SB.ses&&SB.ses.pend);
const _sl48=sbList;sbList=async function(){if(pend48())return;return _sl48.apply(this,arguments)};
const _sp48b=sbPush;sbPush=async function(){if(pend48()){SB.msg='Confirma a senha na tela inicial pra subir o jogo.';return false}return _sp48b.apply(this,arguments)};
const _sy48=sync48;sync48=async function(){if(pend48())return;return _sy48.apply(this,arguments)};
/* aviso na tela inicial quando a internet volta e ainda falta confirmar a senha */
const _vt48b=vTitle;vTitle=function(){
  let h=_vt48b.apply(this,arguments);
  if(cloud48()&&pend48()&&navigator.onLine)h=h.replace('<button class="mb20',`<div class="card"><div class="k">☁️ Confirma sua conta</div><p class="news">A internet voltou! Digita a senha pra subir seu jogo pra nuvem. ${esc(SB.msg)}</p><input id="sb_em" class="fsel" type="email" value="${esc(SB.ses.email)}" readonly style="margin-bottom:6px"><input id="sb_pw" class="fsel" type="password" placeholder="senha" autocomplete="current-password" style="margin-bottom:8px"><button class="btn" data-a="sbin">Entrar</button></div><button class="mb20`);
  return h};
/* conflito: se o save do aparelho ainda não subiu e a nuvem tem um mais novo, guarda o do aparelho num slot livre antes de baixar */
const _c48b=A.cont48;A.cont48=function(){
  const lt=localT48(),r0=sbRow(0);
  if(lt>0&&r0&&navigator.onLine&&!synced48()&&Date.parse(r0.updated_at)>lt+2000&&!pend48()){
    const raw=SKV.getItem(SAVE_KEY);let fr=0;for(let i=1;i<=5;i++)if(!sbRow(i)){fr=i;break}
    if(fr&&raw){sbPutRaw(fr,raw).then(ok=>{if(ok){try{toast('💾 Seu jogo do aparelho foi guardado no slot '+fr)}catch(e){}return sbList()}}).catch(()=>{})}}
  return _c48b.apply(this,arguments)};

/* ext50: Multiplayer online, etapa 1: salas com código (criar, entrar, escolher clube, iniciar). Dados em rooms/room_members (Supabase), tela atualiza por polling de 3 s. */
const MP={code:null,room:null,members:[],msg:'',mine:null,mineTried:0,busy:0,sig:''};
try{MP.code=localStorage.getItem('rfc_room')||null}catch(e){}
async function mpRpc(fn,args){
  const r=await sbReq('/rest/v1/rpc/'+fn,{method:'POST',body:JSON.stringify(args||{})});
  const t=await r.text();let j=null;try{j=t?JSON.parse(t):null}catch(e){}
  if(!r.ok)throw new Error((j&&(j.message||j.hint))||('erro '+r.status));return j}
async function mpGet(path){const r=await sbReq('/rest/v1/'+path);if(!r.ok)throw new Error('falha ao buscar');return r.json()}
const mpRen=()=>{if(typeof S!=='undefined'&&S.step==='mpo'&&G&&G.phase==='start')render()};
function mpSetCode(c){MP.code=c;try{c?localStorage.setItem('rfc_room',c):localStorage.removeItem('rfc_room')}catch(e){}}
async function mpPoll(){
  if(!MP.code||!SB.ses||SB.ses.pend||MP.busy)return;MP.busy=1;
  try{const code=MP.code;
    const [rm,mb]=await Promise.all([mpGet('rooms?select=code,host,status&code=eq.'+code),mpGet('room_members?select=user_id,nick,club,joined_at&room_code=eq.'+code+'&order=joined_at.asc')]);
    if(!rm.length||!mb.some(m=>m.user_id===SB.ses.uid)){mpSetCode(null);MP.room=null;MP.members=[];MP.msg=rm.length?'Você não está mais nessa sala.':'Essa sala foi encerrada.';MP.mineTried=0;mpRen();return}
    const sig=JSON.stringify([rm[0],mb]);MP.room=rm[0];MP.members=mb;
    if(sig!==MP.sig){MP.sig=sig;mpRen()}
  }catch(e){}finally{MP.busy=0}
}
async function mpMine(){
  MP.mineTried=1;
  try{const mm=await mpGet('room_members?select=room_code,club&user_id=eq.'+SB.ses.uid);
    if(!mm.length){MP.mine=[];mpRen();return}
    const rs=await mpGet('rooms?select=code,status,host&code=in.('+mm.map(m=>m.room_code).join(',')+')');
    MP.mine=rs;mpRen()}catch(e){MP.mine=[]}
}
const mpClub=id=>{const c=G.clubs.find(x=>x.id===id);return c?c.name:'Clube '+id};
const mpIsHost=()=>!!(MP.room&&SB.ses&&MP.room.host===SB.ses.uid);
function mpScreen(){
  const back='<button class="back" data-a="step" data-v="home">‹ Início</button>';
  const nick=(SB.prof&&SB.prof.nick)||'';
  if(!navigator.onLine)return `<div class="wrap">${back}<h2>Multiplayer online</h2><div class="card"><p class="news">📴 Sem internet. O multiplayer precisa de conexão. Seu jogo solo continua funcionando offline.</p></div></div>`;
  if(typeof pend48==='function'&&pend48())return `<div class="wrap">${back}<h2>Multiplayer online</h2><div class="card"><p class="news">Confirma sua senha na tela inicial pra usar o multiplayer.</p></div></div>`;
  if(!MP.code){
    if(!MP.mineTried)mpMine();
    const mine=(MP.mine||[]).map(r=>`<button class="mrow" data-a="mpopen" data-c="${esc(r.code)}"><span class="pos">${r.host===SB.ses.uid?'👑':'👥'}</span><span class="nm">Sala ${esc(r.code)}<small>${r.status==='lobby'?'aberta, esperando jogadores':'liga em andamento'}</small></span><span class="ovr">›</span></button>`).join('');
    return `<div class="wrap">${back}<h2>Multiplayer online</h2>
    <p class="hint">Você é <b>${esc(nick)}</b>. Crie uma sala e passe o código pros primos, ou entre numa sala com o código que te mandaram.</p>
    ${MP.msg?`<p class="news" style="color:var(--bad,#ff6b6b)">${esc(MP.msg)}</p>`:''}
    <div class="card"><div class="k">Nova sala</div><p class="news">Você vira o dono: escolhe quando a liga começa.</p><button class="btn" data-a="mpnew">Criar sala</button></div>
    <div class="card"><div class="k">Entrar com código</div><input id="mp_code" class="fsel" maxlength="4" placeholder="Ex.: BKTR" autocapitalize="characters" style="text-transform:uppercase;letter-spacing:.3em;text-align:center;font-size:22px;margin-bottom:8px"><button class="btn" data-a="mpjoin">Entrar</button></div>
    ${mine?`<div class="card"><div class="k">Suas salas</div>${mine}</div>`:''}
    <button class="btn sm ghost" data-a="sbout" style="margin-top:6px">Sair da conta</button></div>`}
  /* dentro de uma sala */
  if(!MP.room){mpPoll();return `<div class="wrap">${back}<h2>Sala ${esc(MP.code)}</h2><p class="hint">Carregando…</p></div>`}
  const me=MP.members.find(m=>m.user_id===SB.ses.uid)||{},taken=new Set(MP.members.filter(m=>m.user_id!==SB.ses.uid&&m.club!=null).map(m=>m.club));
  const playing=MP.room.status==='playing',host=mpIsHost();
  const list=MP.members.map(m=>`<div class="res"><span>${m.user_id===MP.room.host?'👑 ':''}${esc(m.nick)}${m.user_id===SB.ses.uid?' <small class="k">(você)</small>':''}</span><b>${m.club!=null?esc(mpClub(m.club)):'<small>escolhendo clube…</small>'}</b></div>`).join('');
  const opts=[0,1,2,3].map(d=>`<optgroup label="Série ${'ABCD'[d]}">${G.clubs.filter(c=>c.div===d&&c.id<80).sort((a,b)=>b.rep-a.rep).map(c=>`<option value="${c.id}" ${me.club===c.id?'selected':''} ${taken.has(c.id)?'disabled':''}>${esc(c.name)}${taken.has(c.id)?' (ocupado)':''}</option>`).join('')}</optgroup>`).join('');
  const allPick=MP.members.every(m=>m.club!=null);
  return `<div class="wrap">${back}<h2>Sala</h2>
  <div class="card" style="text-align:center"><div class="k">Código da sala</div><div style="font:800 44px var(--fh);letter-spacing:.25em;margin:6px 0 2px">${esc(MP.code)}</div><p class="news">Manda esse código pros primos: Multiplayer online → Entrar com código.</p><button class="btn sm" data-a="mpshare">Compartilhar código</button></div>
  ${MP.msg?`<p class="news" style="color:var(--bad,#ff6b6b)">${esc(MP.msg)}</p>`:''}
  <div class="card"><div class="k">Jogadores (${MP.members.length}/8)</div>${list}</div>
  ${playing?`<div class="card"><div class="k">🏁 Liga iniciada</div><p class="news">A sala está fechada com ${MP.members.length} técnico(s). A próxima etapa é jogar junto: a rodada só avança quando todos derem OK. Isso vem logo a seguir.</p></div>`
  :`<div class="card"><div class="k">Seu clube</div><select id="mp_club" class="fsel" style="margin-bottom:8px"><option value="">Escolha…</option>${opts}</select><button class="btn sm" data-a="mpclub">Confirmar clube</button></div>
  ${host?`<div class="card"><div class="k">Começar</div><p class="news">${allPick?(MP.members.length<2?'Dá pra começar sozinho pra testar, mas o legal é chamar os primos.':'Todo mundo já escolheu. Pode iniciar.'):'Espera todo mundo escolher um clube.'}</p><button class="btn" data-a="mpstart" ${allPick?'':'disabled'}>Iniciar liga</button></div>`:'<p class="hint">Quando todos escolherem o clube, o dono da sala inicia a liga.</p>'}`}
  <button class="btn sm ghost" data-a="mpleave">Sair da sala</button></div>`}
const _vmo50=vMpOnline;vMpOnline=function(){const h=_vmo50.apply(this,arguments);return h.includes('Tudo pronto')?mpScreen():h};
Object.assign(A,{
  mpnew(){MP.msg='';mpRpc('create_room',{p_nick:SB.prof.nick}).then(c=>{mpSetCode(c);MP.room=null;MP.sig='';mpPoll();mpRen()}).catch(e=>{MP.msg=e.message;mpRen()});toast('Criando sala…')},
  mpjoin(){const c=((document.getElementById('mp_code')||{}).value||'').trim().toUpperCase();
    if(c.length!==4){MP.msg='O código tem 4 letras.';mpRen();return}
    MP.msg='';mpRpc('join_room',{p_code:c,p_nick:SB.prof.nick}).then(()=>{mpSetCode(c);MP.room=null;MP.sig='';mpPoll();mpRen()}).catch(e=>{MP.msg=e.message;mpRen()})},
  mpopen(d){mpSetCode(d.c);MP.room=null;MP.sig='';MP.msg='';mpPoll();mpRen()},
  mpclub(){const v=(document.getElementById('mp_club')||{}).value;if(v===''||v==null){MP.msg='Escolhe um clube na lista.';mpRen();return}
    MP.msg='';mpRpc('set_room_club',{p_code:MP.code,p_club:+v}).then(()=>{toast('Clube confirmado ✔');MP.sig='';return mpPoll()}).catch(e=>{MP.msg=e.message;mpRen()})},
  mpstart(){MP.msg='';mpRpc('start_room',{p_code:MP.code}).then(()=>{MP.sig='';return mpPoll()}).catch(e=>{MP.msg=e.message;mpRen()})},
  mpleave(){const c=MP.code;mpRpc('leave_room',{p_code:c}).catch(()=>{}).then(()=>{mpSetCode(null);MP.room=null;MP.members=[];MP.sig='';MP.mine=null;MP.mineTried=0;MP.msg='';mpRen()})},
  mpshare(){const t='Entra na minha liga no Resenha FC! Site: https://henriquereis-blip.github.io/resenha-fc/ → Multiplayer online → Entrar com código: '+MP.code;
    try{if(navigator.share){navigator.share({text:t}).catch(()=>{});return}}catch(e){}
    try{navigator.clipboard.writeText(t).then(()=>toast('Convite copiado ✔'),()=>toast('Código: '+MP.code))}catch(e){toast('Código: '+MP.code)}}
});
/* ao abrir a tela, volta pra sala em que estava; polling a cada 3 s enquanto a tela está aberta */
const _mpo50=A.mpo;A.mpo=function(){MP.msg='';MP.mine=null;MP.mineTried=0;MP.sig='';if(MP.code)MP.room=null;return _mpo50.apply(this,arguments)};
setInterval(()=>{try{if(S.step==='mpo'&&MP.code&&!document.hidden&&navigator.onLine)mpPoll()}catch(e){}},3000);

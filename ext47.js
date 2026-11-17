/* ext47: nova tela inicial (Novo jogo, Saves, Multiplayer local, Multiplayer online com login primeiro) */
SB.prof=null;SB.profTried=0;
async function sbProf(){
  if(!SB.ses||!sbOk())return;
  try{const r=await sbReq('/rest/v1/profiles?select=nick');if(r.ok){const a=await r.json();SB.prof=a[0]||{nick:null};SB.profTried=1;if(G&&G.phase==='start')render()}}catch(e){}
}
async function sbSetNick(n){
  const r=await sbReq('/rest/v1/profiles?on_conflict=id',{method:'POST',headers:{Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({id:SB.ses.uid,nick:n})});
  if(!r.ok){const j=await r.json().catch(()=>({}));throw new Error(/check|violates/i.test(JSON.stringify(j))?'O apelido precisa ter de 2 a 24 letras.':sbErr(j))}
  SB.prof={nick:n}
}
const _sbs47=sbStore;sbStore=function(s){_sbs47(s);if(!s){SB.prof=null;SB.profTried=0}};
vTitle=function(){
  const f=slotInfo(0),n=(SB.list||[]).length;
  if(SB.ses&&sbOk()&&!SB.listOk&&!SB.tried){SB.tried=1;sbList()}
  const cl=!sbOk()?'':SB.ses?(SB.listOk?(n?' · ☁️ '+n+' na nuvem':' · ☁️ conectado'):''):' · entre pra usar a nuvem';
  return `<div class="wrap ti20"><div class="logo"><b>RESENHA</b><span>FC</span></div><p class="lead">Melhor que Brasfoot, menos burocrático que Football Manager.</p>
  ${f?`<button class="mb20 pri" data-a="cont"><span class="ic">▶</span><span><b>Continuar carreira</b><small>${esc(f.club)} · temporada ${f.season}, rodada ${Math.min(f.round+1,NR())}</small></span></button>`:''}
  <button class="mb20 ${f?'':'pri'}" data-a="newgame"><span class="ic">✨</span><span><b>Começar jogo novo</b><small>Crie seu treinador, escolha liga e clube</small></span></button>
  <button class="mb20" data-a="step" data-v="saves"><span class="ic">💾</span><span><b>Saves</b><small>Carregar ou apagar jogos${cl}</small></span></button>
  <div class="k" style="margin:16px 4px 6px">Multiplayer</div>
  <button class="mb20" data-a="step" data-v="mpl"><span class="ic">👥</span><span><b>Multiplayer local</b><small>Vários técnicos no mesmo aparelho</small></span></button>
  <button class="mb20" data-a="mpo"><span class="ic">🌐</span><span><b>Multiplayer online</b><small>${SB.ses?'Conectado como '+esc((SB.prof&&SB.prof.nick)||SB.ses.email||''):'Entre na conta pra jogar com os primos'}</small></span></button>
  <p class="foot">Elencos baseados em dados de memória (podem estar desatualizados). Atributos e escudos são inventados.</p></div>`;
};
function vMpLocal(){
  return `<div class="wrap"><button class="back" data-a="step" data-v="home">‹ Início</button><h2>Multiplayer local</h2>
  <div class="card"><div class="k">👥 Em construção</div><p class="news">Vai ser pra jogar com os primos no mesmo celular, cada um com seu time, passando o aparelho de mão em mão. Todo mundo escolhe escalação e tática, e a rodada só roda quando todos confirmarem.</p>
  <p class="hint">Previsto: 2 a 5 técnicos, um clube cada, ranking entre vocês, pausas nos jogos entre humanos (25 min, intervalo e 70 min).</p></div></div>`;
}
function vMpOnline(){
  const back='<button class="back" data-a="step" data-v="home">‹ Início</button>';
  if(!sbOk())return `<div class="wrap">${back}<h2>Multiplayer online</h2><div class="card"><p class="news">O online só funciona na versão do site: <b>henriquereis-blip.github.io/resenha-fc</b>. Abre por lá.</p></div></div>`;
  if(!SB.ses)return `<div class="wrap">${back}<h2>Multiplayer online</h2><div class="card"><div class="k">1 · Entre na conta</div>${sbLogin()}</div><p class="hint">É por ela que o jogo sabe quem é cada primo, guarda seu clube e seu save online.</p></div>`;
  if(!SB.profTried){sbProf();return `<div class="wrap">${back}<h2>Multiplayer online</h2><p class="hint">Carregando seu perfil…</p></div>`}
  if(!SB.prof||!SB.prof.nick)return `<div class="wrap">${back}<h2>Multiplayer online</h2><div class="card"><div class="k">2 · Seu apelido</div><p class="news">Como os primos vão te ver nas salas. ${esc(SB.msg)}</p><input id="sb_nick" class="fsel" maxlength="24" placeholder="Ex.: Henrique" style="margin-bottom:8px"><button class="btn sm" data-a="nick47">Salvar apelido</button></div></div>`;
  return `<div class="wrap">${back}<h2>Multiplayer online</h2><div class="card"><div class="k">🌐 Tudo pronto, ${esc(SB.prof.nick)}</div><p class="news">Conta: ${esc(SB.ses.email||'')}. Quando as salas ficarem prontas, você cria uma sala, passa o código pros primos e vocês jogam juntos, com a rodada só avançando quando todos derem OK.</p></div>
  <div class="card"><div class="k">Salas</div><button class="btn sm" disabled>Criar sala · em breve</button> <button class="btn sm ghost" disabled>Entrar com código · em breve</button></div>
  <div class="card"><button class="btn sm ghost" data-a="sbout">Sair da conta</button></div></div>`;
}
const _vs47=vStart;vStart=function(){const st=S.step||'home';if(st==='mpl')return vMpLocal();if(st==='mpo')return vMpOnline();return _vs47.apply(this,arguments)};
Object.assign(A,{
  mpo(){S.step='mpo';render();window.scrollTo(0,0)},
  nick47(){const v=((document.getElementById('sb_nick')||{}).value||'').trim();if(v.length<2){SB.msg='Escreve um apelido (2 a 24 letras).';render();return}
    SB.msg='Salvando…';render();sbSetNick(v).then(()=>{SB.msg='';render()}).catch(e=>{SB.msg=e.message;render()})}
});
/* depois de logar/sair pela tela do online, re-render certinho */
const _sdo47=sbDo;sbDo=function(k){_sdo47(k);if(S.step==='mpo')setTimeout(()=>{SB.profTried=0;render()},1200)};

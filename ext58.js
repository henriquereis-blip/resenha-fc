/* ext58: Multiplayer online, etapa 2: "Liga dos Primos" (competição assíncrona).
   Depois que o dono inicia a sala, cada um começa a própria carreira no clube que escolheu (no aparelho dele) e o jogo manda a pontuação do técnico
   (pontos, títulos, vitórias/empates/derrotas, temporada e rodada) pra sala a cada rodada. A sala mostra o ranking ao vivo.
   Rodar a MESMA liga juntos (jogos entre os primos, rodada que só avança com todos prontos) é a etapa 3 e exige reescrever o motor pra vários técnicos. */
MP.scores=[];MP.scSig='';
const mpScoreOf=()=>{const u=G.uc||{};return {club:userClub().name,season:G.season,round:G.round,pts:u.pts||0,titles:u.titles||0,v:u.V||0,e:u.E||0,d:u.D||0}};
let _scLast=0;
async function mpPush(force){
  try{if(!G||!G.mpRoom||G.user==null||!SB.ses||SB.ses.pend||!navigator.onLine)return;
    const now=Date.now();if(!force&&now-_scLast<4000)return;_scLast=now;
    const s=mpScoreOf();
    await mpRpc('push_score',{p_code:G.mpRoom,p_club:s.club,p_season:s.season,p_round:s.round,p_pts:s.pts,p_titles:s.titles,p_v:s.v,p_e:s.e,p_d:s.d});
  }catch(e){}
}
hookAfter('finishRound','ext58_fr58',()=>{mpPush(false)});
hookAround('endSeason','es58',function(next,__a){const r=next();try{mpPush(true)}catch(e){}return r});
const _mpp58=mpPoll;mpPoll=async function(){
  await _mpp58.apply(this,arguments);
  try{if(MP.code&&MP.room&&MP.room.status==='playing'){
    const sc=await mpGet('room_scores?select=user_id,club_name,season,round,pts,titles,v,e,d,updated_at&room_code=eq.'+MP.code+'&order=pts.desc');
    const sg=JSON.stringify(sc);if(sg!==MP.scSig){MP.scSig=sg;MP.scores=sc;mpRen()}}
  }catch(e){}
};
function mpBoard(){
  const nm=id=>(MP.members.find(m=>m.user_id===id)||{}).nick||'Técnico';
  const rows=MP.scores.map((s,i)=>`<div class="res"><span>${i+1}º · ${esc(nm(s.user_id))}${s.user_id===SB.ses.uid?' <small class="k">(você)</small>':''}<br><small>${esc(s.club_name||'')} · T${s.season}, rodada ${s.round} · ${s.titles} 🏆 · ${s.v}V ${s.e}E ${s.d}D</small></span><b>${s.pts} pts</b></div>`).join('');
  const waiting=MP.members.filter(m=>!MP.scores.some(s=>s.user_id===m.user_id)).map(m=>esc(m.nick));
  return rows+(waiting.length?`<p class="hint">Ainda não jogaram: ${waiting.join(', ')}.</p>`:'');
}
hookAround('vMpOnline','vmo58',function(next,__a){
  const h=next();
  try{if(!(MP.room&&MP.room.status==='playing'&&MP.code))return h;
    const me=MP.members.find(m=>m.user_id===SB.ses.uid)||{};
    const linked=G.mpRoom===MP.code;
    const has=(()=>{try{return !!SKV.getItem(SAVE_KEY)}catch(e){return false}})();
    const card=`<div class="card"><div class="k">🏁 Liga dos Primos · ranking ao vivo</div>${MP.scores.length?mpBoard():'<p class="news">Ninguém pontuou ainda. Cada técnico joga a carreira no seu aparelho e a pontuação sobe pra cá a cada rodada.</p>'}
      <p class="news" style="margin-top:8px">Pontos do técnico: 60 por título, 15 por top 4 e o que mais ele ganha jogando. ${me.club!=null?'Seu clube: <b>'+esc(mpClub(me.club))+'</b>.':''}</p>
      <button class="btn" data-a="mpgo">${has?'Começar minha carreira na liga':'Começar minha carreira na liga'}</button>
      ${has?'<p class="hint">Já tem um jogo salvo? Pra continuar uma carreira da liga, use Continuar na tela inicial; ela continua mandando pontos.</p>':''}</div>`;
    return h.replace(/<div class="card"><div class="k">🏁 Liga iniciada<\/div>.*?<\/p><\/div>/s,card);
  }catch(e){console.error('mp58 '+e.message);return h}
});
Object.assign(A,{
  mpgo(){
    const me=MP.members.find(m=>m.user_id===SB.ses.uid);
    if(!me||me.club==null){toast('Escolha seu clube na sala primeiro.');return}
    if(G.phase!=='start'){toast('Volta pra tela inicial pra começar.');return}
    S.mpRoom=MP.code;S.coachName=(SB.prof&&SB.prof.nick)||S.coachName||'Técnico';
    A.pickclub({id:me.club})
  }
});
const _bg58=A.begin;A.begin=function(){
  const code=S.mpRoom;S.mpRoom=null;
  const r=_bg58.apply(this,arguments);
  try{if(code&&G.user!=null&&G.phase==='play'){G.mpRoom=code;save();mpPush(true)}}catch(e){}
  return r};

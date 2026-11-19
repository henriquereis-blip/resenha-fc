/* ext81 (v96): IA escolhe formação pelo encaixe com o elenco + filosofia do técnico, com variação, e troca quando vai mal.
   Antes: formação sorteada uma vez em AIFORMS (ext13, newWorld) e nunca mudava.
   Agora:
   - nota de cada formação = xiScore (encaixe do XI, ext70) + bônus da filosofia + ruído (variação entre clubes parecidos);
   - novo mundo: escolhe pela nota; nova temporada: reavalia (elenco mudou), com inércia a favor da atual;
   - nas rodadas %6==0: clube da IA que está ≥5 posições abaixo do esperado (força do elenco) troca de formação. */
(function(){
/* formações que combinam com cada filosofia (bônus em pontos de xiScore; ~1 ponto ≈ 1 de ovr em uma vaga) */
const PHIL_FORMS={
  Passe:['4-3-3','4-2-3-1','4-1-4-1','4-3-2-1','3-4-2-1'],
  'Contra-ataque':['4-4-2','4-2-3-1','4-4-1-1','3-5-2','5-2-3'],
  'Pressão':['4-3-3','4-2-3-1','3-4-3','4-2-2-2'],
  Pontas:['4-3-3','4-4-2','3-4-3','4-2-3-1'],
  Retranca:['5-3-2','5-4-1','4-1-4-1','3-5-2','4-4-1-1'],
  Direto:['4-4-2','3-5-2','4-1-2-1-2','3-4-1-2','4-4-1-1']
};
const AIF_PHIL=3,AIF_NOISE=3,AIF_KEEP=4,AIF_BAD=5,AIF_EVERY=6;
const noise=()=>(Math.random()+Math.random()-1)*AIF_NOISE; /* triangular em [-3,3] */
function aiFormScore(c,f){return xiScore(c,f)+((PHIL_FORMS[c.phil]||[]).includes(f)?AIF_PHIL:0)}
/* escolhe a formação; keep = bônus para a atual; avoid = formação proibida (a que está dando errado) */
function aiPickForm(c,keep,avoid){
  let best=null,bs=-1e9;
  for(const f of FORMLIST){if(f===avoid||!FORMS[f])continue;
    const s=aiFormScore(c,f)+noise()+(keep&&f===c.formation?keep:0);
    if(s>bs){bs=s;best=f}}
  return best||c.formation;
}
function aiSetForm(c,f){if(!f||f===c.formation)return false;c.formation=f;autoPick(c);return true}
globalThis.aiPickForm=aiPickForm;
globalThis.AIF81={pSwitch:1}; /* só para experimento (tools/sim/exp_aiform.js): chance de a IA trocar na má fase */

hookAfter('newWorld','nw81',function(){
  for(const c of G.clubs){try{aiSetForm(c,aiPickForm(c,0,null))}catch(e){console.error('nw81 '+e.message)}}
});
hookAfter('newSeason','ns81',function(){
  for(const c of G.clubs){if(c.id===G.user)continue;try{aiSetForm(c,aiPickForm(c,AIF_KEEP,null))}catch(e){console.error('ns81 '+e.message)}}
});
/* má fase: checa nas rodadas múltiplas de 6 (antes do autoPick da rodada) */
hookBefore('prepareRound','pr81',function(){
  if(!G||!G.round||G.round%AIF_EVERY!==0)return;
  if(G.fsw81===G.season*100+G.round)return; /* prepareRound pode rodar mais de uma vez na mesma rodada */
  G.fsw81=G.season*100+G.round;
  const ud=G.user!=null&&G.clubs[G.user]?G.clubs[G.user].div:-1;let news=null;
  for(const c of G.clubs){if(c.id===G.user)continue;
    try{
      const gap=posOf(c)-rankByStrength(c);if(gap<AIF_BAD)continue;
      if(AIF81.pSwitch<1&&Math.random()>=AIF81.pSwitch)continue;
      const old=c.formation;
      if(aiSetForm(c,aiPickForm(c,0,old))){c.fsw={s:G.season,r:G.round,from:old};
        if(c.div===ud&&(!news||gap>news.gap))news={c,gap,old}}
    }catch(e){console.error('pr81 '+e.message)}}
  if(news)addNews(`Pressionado pela má fase, o ${news.c.name} abandona o ${news.old} e passa a jogar no ${news.c.formation}.`);
});
})();

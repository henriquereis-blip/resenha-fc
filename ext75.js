/* ext75 (v91): economia calibrada pela folha (clube grande não quebra), diretoria avisa antes de demitir, caixa negativo não zera a confiança */
(function(){
function calib75(){
  try{
    const c=userClub();if(!c||!G.fin)return;
    const cost=payroll(c)+c.cap/1000*0.25;
    if(G.fin.caixa<cost*0.12)G.fin.caixa=+(cost*0.12).toFixed(1);
  }catch(e){console.error('calib75 '+e.message)}
}
/* receitas globais (marca, excursões, direitos internacionais): cobre o rombo estrutural dos clubes grandes (folha alta), sobra de 3% */
const _fr=financeRound;financeRound=function(m){
  const f=G.fin,c0=f.caixa;
  _fr.apply(this,arguments);
  try{const c=userClub(),pay=payroll(c);if(pay<25)return;
    const d=f.caixa-c0,tgt=pay*0.03/38;
    if(d<tgt){const g=+(tgt-d).toFixed(2);f.caixa=+(f.caixa+g).toFixed(2);if(f.last){f.last.sp=+(f.last.sp+g).toFixed(2);f.last.net=+(f.last.net+g).toFixed(2)}}
  }catch(e){console.error('gap75 '+e.message)}
};
globalThis.calib75=calib75;
const _em=emigrate;emigrate=function(){const r=_em.apply(this,arguments);if(r)calib75();return r};
const _tj=takeJob;takeJob=function(){const r=_tj.apply(this,arguments);calib75();return r};
const _ns=newSeason;newSeason=function(){const r=_ns.apply(this,arguments);calib75();G._warned91=false;return r};
/* caixa negativo: a diretoria cobra, mas não derruba a confiança a cada rodada. Favorito não é punido por não golear (expectativa limitada) */
const _br=boardRound;boardRound=function(m){
  const neg=G.fin.caixa<0;_br.apply(this,arguments);
  try{
    const c=userClub(),home=m.h.club.id===c.id,opp=home?m.a.club:m.h.club;
    const gf=home?m.hg:m.ag,ga=home?m.ag:m.hg,pts=gf>ga?3:gf===ga?1:0;
    const exp=clamp(1.4+(c.rep-opp.rep)*0.07+(home?0.2:-0.1),0.4,2.4),exp2=Math.min(exp,1.8);
    let adj=(exp-exp2)*2.2;
    if(G.round>=5){const pen=clamp((G.board.meta-posOf(c))*0.35,-2,1.2);if(pen<0&&posOf(c)<=G.board.meta+2)adj+=-pen*0.6}
    if(neg)adj+=1.2;
    if(adj)G.board.conf=clamp(+(G.board.conf+adj).toFixed(1),0,100);
  }catch(e){}
};
/* primeiro aperto da diretoria = aviso (carta); só na segunda checagem ruim vem a demissão. Time dentro da meta tem tolerância */
const _sf=shouldFire;shouldFire=function(){
  if(![9,19,29,37].includes(G.round))return false;
  const c=userClub(),conf=G.board.conf;
  if(conf>=40)return false;
  if(!G._warned91){G._warned91=true;
    try{addNews('A diretoria deu um ultimato: "Professor, ou o time reage ou a gente troca o comando."');if(typeof toast==='function')toast('Ultimato da diretoria: reaja nos próximos jogos ou será demitido.')}catch(e){}
    return false}
  let p=_sf.apply(this,arguments);
  if(p&&c&&posOf(c)<=G.board.meta+2&&Math.random()<0.8)p=false;
  return p;
};
})();

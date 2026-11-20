/* v106: multiplicador da demissão pelo tempo no cargo e pelos títulos conquistados nele (1 = base, menor = mais protegido).
   1ª temporada: 1,0 · 2ª: 0,55 · 3ª em diante: 0,35. Cada título na passagem: ×0,8, piso 0,4. */
function tenureMult(c){
  if(!c||!G.ten||G.ten.club!==c.id)return 1;
  const n=G.season-G.ten.from;
  let m=n<=0?1:n===1?0.55:0.35;
  const f=G.ten.from;
  const tit=(G.champs||[]).filter(x=>x.s>=f&&x.cid===c.id).length+(G.cupHist||[]).filter(x=>x.s>=f&&x.champ===c.id).length+(G.estHist||[]).filter(x=>x.s>=f&&x.champ===c.id).length;
  return clamp(m*Math.pow(0.8,tit),0.4*m,1);
}
globalThis.tenureMult=tenureMult;
function tenureStart(){if(G.user!=null)G.ten={club:G.user,from:G.season}}
hookAfter('startCareer','ten75a',function(){tenureStart()});
hookAfter('takeJob','ten75b',function(){tenureStart()});
/* v106: antes da demissão, a imprensa avisa que a diretoria está avaliando o técnico (uma vez por temporada) */
hookAfter('boardRound','press75',function(){
  try{const c=userClub();if(!c||G.board.conf>=35||G._press106===G.season)return;
    G._press106=G.season;paperLine('Diretoria avalia o técnico '+G.coach,'Bastidores falam em reunião da diretoria. Resultado é a única coisa que segura o cargo.')}catch(e){}
});
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
hookAround('financeRound','fr',function(next,__a){let [m]=__a;
  const f=G.fin,c0=f.caixa;
  next();
  try{const c=userClub(),pay=payroll(c);if(pay<25)return;
    const d=f.caixa-c0,tgt=pay*0.03/38;
    if(d<tgt){const g=+(tgt-d).toFixed(2);f.caixa=+(f.caixa+g).toFixed(2);if(f.last){f.last.sp=+(f.last.sp+g).toFixed(2);f.last.net=+(f.last.net+g).toFixed(2)}}
  }catch(e){console.error('gap75 '+e.message)}
});
globalThis.calib75=calib75;
hookAround('emigrate','em',function(next,__a){const r=next();if(r)calib75();return r});
hookAround('takeJob','tj',function(next,__a){const r=next();calib75();return r});
hookAfter('newSeason','ext75_ns',function(r,A){calib75();G._warned91=false;});
/* caixa negativo: a diretoria cobra, mas não derruba a confiança a cada rodada. Favorito não é punido por não golear (expectativa limitada) */
hookAround('boardRound','br',function(next,__a){let [m]=__a;
  const neg=G.fin.caixa<0;next();
  try{
    const c=userClub(),home=m.h.club.id===c.id,opp=home?m.a.club:m.h.club;
    const gf=home?m.hg:m.ag,ga=home?m.ag:m.hg,pts=gf>ga?3:gf===ga?1:0;
    const exp=clamp(1.4+(c.rep-opp.rep)*0.07+(home?0.2:-0.1),0.4,2.4),exp2=Math.min(exp,1.8);
    let adj=(exp-exp2)*2.2;
    if(G.round>=5){const pen=clamp((G.board.meta-posOf(c))*0.35,-2,1.2);if(pen<0&&posOf(c)<=G.board.meta+2)adj+=-pen*0.6}
    if(neg)adj+=1.2;
    if(adj)G.board.conf=clamp(+(G.board.conf+adj).toFixed(1),0,100);
  }catch(e){}
});
/* primeiro aperto da diretoria = aviso (carta); só na segunda checagem ruim vem a demissão. Time dentro da meta tem tolerância */
hookAround('shouldFire','sf',function(next,__a){
  if(![9,19,29,37].includes(G.round))return false;
  const c=userClub(),conf=G.board.conf;
  if(conf>=40)return false;
  if(!G._warned91){G._warned91=true;
    try{addNews('A diretoria deu um ultimato: "Professor, ou o time reage ou a gente troca o comando."');if(typeof toast==='function')toast('Ultimato da diretoria: reaja nos próximos jogos ou será demitido.')}catch(e){}
    return false}
  let p=next();
  if(!p)return p;
  /* v106: tempo no cargo protege. Temporada 1 é a mais arriscada; depois cai; títulos na passagem seguram mais */
  if(Math.random()>=tenureMult(c))return false;
  /* v105: proteção na primeira temporada até a rodada 19 (só cai com confiança abaixo de 15) */
  if(G.season===1&&G.round<=19&&conf>=15)return false;
  /* v105: tolerância de meta+3 (era meta+2) */
  if(c&&posOf(c)<=G.board.meta+3&&Math.random()<0.8)p=false;
  return p;
});
})();

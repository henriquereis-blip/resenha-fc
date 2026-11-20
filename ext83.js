/* ext83 (v108): eras táticas. Cada era dura 3 a 5 temporadas e dá um pequeno impulso a um jeito de jogar (até +4% de força).
   Não é regra fixa: o efeito cai em clube tradicional (que mantém a própria ideia), e o time pode jogar fora da moda sem punição
   além do efeito pequeno. A força continua sendo, de longe, o nível dos jogadores. */
const ERA_AMP=0.04;
const ERAS=[
  {k:'tresZag',n:'Era dos três zagueiros',d:'Três atrás e alas abertos estão em alta.'},
  {k:'pressao',n:'Era da pressão',d:'Marcação alta e intensidade o jogo todo estão em moda.'},
  {k:'posse',n:'Era da posse',d:'Quem troca passes e controla o jogo leva vantagem.'},
  {k:'contra',n:'Era do contra-ataque',d:'Transição rápida decide os jogos.'},
  {k:'bloco',n:'Era do bloco baixo',d:'Solidez defensiva e bola parada valem mais.'}
];
function eraRoll(){
  const prev=G.era&&G.era.cur;
  const cand=ERAS.filter(e=>!prev||e.k!==prev.k);
  const cur=pick(cand);
  G.era={cur,from:G.season,to:G.season+3+Math.floor(Math.random()*3)};
  addNews('Nova tendência tática: '+cur.n+'. '+cur.d);
}
/* o clube "encaixa" na era pelo estilo, pela filosofia ou pelo esquema */
function eraFit(c,k){
  const sty=c.style,ph=c.phil,f=FORMS[c.formation],d=f?f[0]:4;
  if(k==='tresZag')return d===3?1:0;
  if(k==='pressao')return (sty==='Ofensivo'||ph==='Pressão'||ph==='Pontas')?1:0;
  if(k==='posse')return (sty==='Posse'||ph==='Passe')?1:0;
  if(k==='contra')return (sty==='Contra-ataque'||ph==='Contra-ataque')?1:0;
  if(k==='bloco')return (sty==='Defensivo'||ph==='Retranca')?1:0;
  return 0;
}
/* clube tradicional segue a moda menos (tradição 92 → 40% do efeito; tradição ~20 → quase tudo) */
function eraFlex(c){return clamp(1.2-(c.trad||40)/100,0.4,1)}
hookAfter('newWorld','era83a',function(){eraRoll()});
hookAfter('newSeason','era83b',function(){if(G.era&&G.season>G.era.to)eraRoll()});
hookAfter('power','era83p',function(r,__a){
  const s=__a[1];if(!s||!s.club||!G)return;
  if(!G.era)eraRoll(); /* save antigo ou carreira já em andamento: sorteia a era na hora */
  const m=1+(globalThis.ERA_ON===false?0:ERA_AMP)*eraFit(s.club,G.era.cur.k)*eraFlex(s.club);
  r.atk*=m;r.mid*=m;r.def*=m;
});

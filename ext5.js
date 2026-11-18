/* ===== sabor: conquistas, clássicos, lances de torcida, data ===== */
const ACH={
 win1:['🏅','Estreia vitoriosa','Vença seu primeiro jogo.'],st3:['🔥','Embalado','3 vitórias seguidas.'],st5:['🚀','Imparável','5 vitórias seguidas.'],
 big:['💥','Goleada histórica','Vença por 4 ou mais gols de diferença.'],virada:['🔄','Virada épica','Vença depois de ter ficado atrás no placar.'],
 muralha:['🧱','Muralha','3 jogos seguidos sem sofrer gol.'],invicto:['🛡️','Invicto','8 jogos sem perder.'],
 clasico:['⚔️','Rei dos clássicos','Vença um clássico.'],titulo:['🏆','Campeão!','Seja campeão brasileiro.'],g4:['🥇','Zona de Libertadores','Termine no G4.'],
 cria:['🌱','Cria da casa','Promova um jogador da base.'],peso:['💰','Contratação de peso','Pague 10 mi ou mais por um jogador.'],
 olho:['🔭','Olho clínico','Contrate um olheiro.'],negocio:['🤝','Bom negócio','Venda um jogador por 20% acima do valor.'],
 job:['🔁','Segunda chance','Assuma um novo clube depois de ser demitido.'],
 crise:['🧯','Apagador de incêndio','Vença depois de 3 derrotas seguidas.']
};
const RIV=[['FLA','VAS'],['FLA','FLU'],['FLA','BOT'],['FLU','VAS'],['FLU','BOT'],['PAL','COR'],['PAL','SAO'],['SAO','COR'],['SAO','SAN'],['COR','SAN'],['GRE','INT'],['CAM','CRU'],['BAH','VIT'],['CAP','CFC'],['VAS','BOT']];
const isClassico=(a,b)=>RIV.some(([x,y])=>(C(a).sig===x&&C(b).sig===y)||(C(a).sig===y&&C(b).sig===x));
function award(id){ex5();if(G.ach[id])return;G.ach[id]={s:G.season,r:G.round+1};G.newAch.push(id)}
function ex5(){if(!G)return;G.ach=G.ach||{};G.newAch=G.newAch||[];G.stk=G.stk||{w:0,u:0,cs:0,l:0}}
const ymd=(r)=>{const d=new Date(Date.UTC(2026+G.season,3,4+7*r));return String(d.getUTCDate()).padStart(2,'0')+'/'+String(d.getUTCMonth()+1).padStart(2,'0')+'/'+d.getUTCFullYear()};
const gdate=()=>ymd(Math.min(G.round,38));
hookAround('finishRound','ext5_fr6',function(next,A){
  ex();ex5();
  const um=R.ms[R.ui],k=userSide(um),opp=k==='h'?um.a.club.id:um.h.club.id;
  let d=0,trail=false;for(const sc of um.scorers){d+=(sc.side===k?1:-1);if(d<0)trail=true}
  const gf=k==='h'?um.hg:um.ag,ga=k==='h'?um.ag:um.hg,cl=isClassico(G.user,opp);
  const out=next();const s=G.stk;
  if(gf>ga){if(s.l>=3)award('crise');s.w++;s.u++;s.l=0;award('win1');if(s.w>=3)award('st3');if(s.w>=5)award('st5');if(gf-ga>=4)award('big');if(trail)award('virada');if(cl)award('clasico')}
  else if(gf===ga){s.w=0;s.u++;s.l=0}else{s.w=0;s.u=0;s.l++}
  if(ga===0)s.cs++;else s.cs=0;if(s.cs>=3)award('muralha');if(s.u>=8)award('invicto');
  return out;
});
const _es6=endSeason;endSeason=function(){ex();ex5();const r=_es6();const p=G.summary.pos;if(p===1)award('titulo');if(p<=4)award('g4');return r};
const _pr=promoteYouth;promoteYouth=function(c,i){const r=_pr(c,i);if(!r&&c===userClub())award('cria');return r};
const _mb=makeBid;makeBid=function(pid,fee){const r=_mb(pid,fee);if(r.ok&&fee>=10)award('peso');return r};
const _hs=hireScout;hireScout=function(i){const r=_hs(i);if(!r)award('olho');return r};
const _sl=sellPlayer;sellPlayer=function(id){const o=G.offers.find(x=>x.id===id);const v=o?valueOf(P(o.pid)):0;const r=_sl(id);if(!r&&o&&o.fee>=v*1.2)award('negocio');return r};
const _tj=takeJob;takeJob=function(id){const r=_tj(id);award('job');return r};
/* lances de torcida e clima */
const FLV=["A torcida canta alto no estádio.","Árbitro conversa com os capitães.","Bandeirinha marca impedimento duvidoso.","Maqueiros entram rapidamente em campo.","Jogador pede atendimento e o jogo para por instantes.","Clima quente na arquibancada.","Torcida faz festa nas arquibancadas.","O técnico reclama muito à beira do campo.","Chuva fina começa a cair.","Bola na arquibancada, o jogo fica parado."];
const _sm5=stepMinute;stepMinute=function(m){
  _sm5(m);if(m.done||m.min%3)return;
  const cl=isClassico(m.h.club.id,m.a.club.id);
  if(Math.random()<(cl?0.14:0.07)){
    let t=pick(FLV);const d=m.hg-m.ag;
    if(cl&&Math.random()<0.5)t=pick(['Clássico pegando fogo!','As duas torcidas se provocam sem parar.','Jogo truncado, muita bola dividida.','Clima de decisão no clássico.']);
    else if(m.min>60&&d>=2)t='Torcida do mandante canta olé!';
    else if(m.min>60&&d<=-2)t='Torcida visitante canta olé!';
    m.ev.push({min:m.min,side:'n',type:'info',pid:null,text:t});
  }
};

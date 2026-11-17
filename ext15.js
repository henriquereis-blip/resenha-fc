/* ext15: dificuldade — custo real de gerir clube, bicho, cobrança proporcional ao tamanho, paridade no topo */

// Flamengo abria 1 ponto de vantagem no time titular e 10 dos 30 melhores jogadores: aparar o topo
const _nw15=newWorld;newWorld=function(){
  _nw15.apply(this,arguments);
  for(const [sg,d] of [['FLU',2],['BOT',1],['CAM',1]]){const cl=G.clubs.find(c=>c.sig===sg);
    if(cl)cl.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr).slice(0,13).forEach(p=>{if(p.name!=='Neymar')p.ovr=Math.max(50,p.ovr-d)})}
  const all=Object.values(G.players).filter(p=>p.club>=0),ney=all.find(p=>p.name==='Neymar');
  if(ney){const best=Math.max(...all.filter(p=>p!==ney).map(p=>p.ovr));ney.ovr=best+1;ney.pot=Math.max(ney.pot,ney.ovr)}
};

// quem gere o clube de verdade paga a conta de ter estrutura: mais 45% de custo operacional, bicho por vitória e premiação de título
const bichoBase=c=>scaleOf(c)*0.0045;
const _fin15=financeRound;financeRound=function(m){
  _fin15(m);
  const c=userClub(),f=G.fin;
  const home=m.h.club.id===c.id,gf=home?m.hg:m.ag,ga=home?m.ag:m.hg;
  const extra=structCost(c)*0.75/38+(gf>ga?bichoBase(c):gf===ga?bichoBase(c)*.25:0);
  f.caixa=+(f.caixa-extra).toFixed(2);
  if(f.last){f.last.mant=+(f.last.mant+extra).toFixed(2);f.last.net=+(f.last.net-extra).toFixed(2)}
};
// expectativa da diretoria cresce com o tamanho do clube: empatar em casa com o Corinthians não é a mesma coisa que no Chapecoense
const _bd15=boardRound;boardRound=function(m){
  const c=userClub(),before=G.board.conf;
  _bd15(m);
  const ex2=Math.max(0,c.rep-66)*0.028;
  G.board.conf=clamp(+(G.board.conf-ex2*2.2*0.5).toFixed(1),0,100);
};
// campeão dá bicho de título
const _es15=endSeason;endSeason=function(){
  const c=userClub(),champ=tableRows()[0];
  const r=_es15.apply(this,arguments);
  try{if(champ&&champ.id===G.user){const b=+(scaleOf(c)*.06).toFixed(1);G.fin.caixa=+(G.fin.caixa-b).toFixed(1);addNews('Bicho do título: '+mi(b)+' pagos ao elenco e comissão.')}}catch(e){}
  return r;
};

/* ext79 (v93→v94): seleções. (1) Copa do Mundo com formato de 48 seleções: 12 grupos de 4, os 2 primeiros + 8 melhores terceiros, mata-mata de 32.
   (2) Eliminatórias Europeias (SEU) jogáveis: 10 seleções, 18 rodadas ida e volta, mesmo motor da SEL sul-americana.
   Aproximação: as 9 seleções extras (IRN QAT UZB JOR IRQ NZL CPV HAI CUW) têm ratings estimados e não passam pelo playoff intercontinental. */
Object.assign(NR0,{IRN:68,QAT:60,UZB:60,JOR:58,IRQ:56,NZL:55,CPV:56,HAI:50,CUW:50});
Object.assign(NTN,{IRN:'Irã',QAT:'Catar',UZB:'Uzbequistão',JOR:'Jordânia',IRQ:'Iraque',NZL:'Nova Zelândia',CPV:'Cabo Verde',HAI:'Haiti',CUW:'Curaçao'});
const WC48=[...Object.keys(NR0)];
/* 48 seleções: BRA + as 47 com rating */
function wcPool48(){const p=WC48.slice(0,48);return p}
/* terceiros: pega os 8 melhores (P, depois saldo, depois gols pró) */
function ntTourney48(pool,title){
  const groups=ntGroups(pool,12);let braOut=null,games=0;
  const firsts=[],seconds=[],thirds=[];
  for(const g of groups){const t={};g.forEach(c=>t[c]={P:0,GD:0,GF:0});
    for(let i=0;i<g.length;i++)for(let j=i+1;j<g.length;j++){const r=ntSim(g[i],g[j],false);
      if(r.ga>r.gb)t[g[i]].P+=3;else if(r.ga<r.gb)t[g[j]].P+=3;else{t[g[i]].P++;t[g[j]].P++}
      t[g[i]].GD+=r.ga-r.gb;t[g[j]].GD+=r.gb-r.ga;t[g[i]].GF+=r.ga;t[g[j]].GF+=r.gb;
      if(g[i]==='BRA'||g[j]==='BRA')games++}
    const o=g.slice().sort((x,y)=>t[y].P-t[x].P||t[y].GD-t[x].GD||t[y].GF-t[x].GF);
    firsts.push(o[0]);seconds.push(o[1]);thirds.push({c:o[2],P:t[o[2]].P,GD:t[o[2]].GD,GF:t[o[2]].GF})}
  thirds.sort((a,b)=>b.P-a.P||b.GD-a.GD||b.GF-a.GF);
  const adv=[...firsts,...seconds,...thirds.slice(0,8).map(x=>x.c)];
  const outG=!adv.includes('BRA');if(outG)braOut='Fase de grupos';
  let cur=adv.sort(()=>Math.random()-0.5);
  while(cur.length>1){const nm=cur.length===32?'Dezesseis-avos':cur.length===16?'Oitavas':cur.length===8?'Quartas':cur.length===4?'Semifinal':'Final';
    const nx=[];for(let i=0;i<cur.length;i+=2){const r=ntSim(cur[i],cur[i+1],true);nx.push(r.w);
      if(cur[i]==='BRA'||cur[i+1]==='BRA'){games++;if(r.w!=='BRA'&&!braOut)braOut=nm}}
    cur=nx}
  return {champ:cur[0],braOut,games,title};
}
/* substitui o torneio de 32 pelo de 48 (mesmo retorno e recompensas) */
ntWC=function(pd,goers){
  const b=ntBox();
  const r=ntTourney48(wcPool48(),'Copa do Mundo');
  b.wc=r;const res=r.champ==='BRA'?'COPA DO MUNDO: Brasil é HEXA!':'Copa do Mundo: Brasil caiu em "'+r.braOut+'". Campeão: '+NTN[r.champ];
  b.hist.unshift({s:G.season,t:'Copa do Mundo (48 seleções)',r:r.champ==='BRA'?'Brasil campeão':'Brasil eliminado em '+r.braOut+' · campeão '+NTN[r.champ]});
  const aw=r.champ==='BRA'||r.braOut==='Final'?5:r.braOut==='Semifinal'?5:r.braOut==='Fase de grupos'?3:4;pd.aw=aw;
  if(r.champ==='BRA'){const c=userClub();c.humor=clamp(c.humor+3,5,100);for(const id of goers){const p=P(id);if(p&&natOf(p)==='BRA'){p.ovr=clamp(p.ovr+1,40,95)}}}
  return res;
};

/* ---- Eliminatórias Europeias jogáveis ---- */
const SEU_NAT={'Inglaterra':'ENG','Espanha':'ESP','França':'FRA','Alemanha':'GER','Itália':'ITA','Portugal':'POR','Holanda':'NED','Bélgica':'BEL','Croácia':'CRO','Suíça':'SUI'};
Object.assign(SELNAT,SEU_NAT);
Object.assign(NMP,{SEU:NMP.ENG});
NCUP.SEU=[8,'Liga das Nações'];
const SEU_LG={k:'SEU',n:'Seleções Europeias',f:'🇪🇺',lg:'Eliminatórias Europeias',cl:[['Espanha',83],['França',84],['Inglaterra',82],['Portugal',81],['Alemanha',80],['Itália',79],['Holanda',79],['Bélgica',77],['Croácia',76],['Suíça',73]]};
const SEU_RULE={fmt:'liga',rd:18,rel:0,lib:0,sul:0,txt:['Você treina uma seleção europeia: 10 seleções, 18 rodadas (ida e volta) nas Eliminatórias.','As 8 melhores seguem para a fase final em mata-mata, jogo único.','Sem descenso. Elenco gerado com jogadores da nacionalidade da seleção.']};
(function(){
  try{
    if(typeof WLD!=='undefined'&&!WLD.some(x=>x.k==='SEU')){const i=WLD.findIndex(x=>x.k==='SEL');WLD.splice(i>=0?i+1:WLD.length,0,SEU_LG)}
    if(typeof WRULES!=='undefined')WRULES.SEU=SEU_RULE;
    if(typeof PYR!=='undefined'&&!PYR.SEU)PYR.SEU=[{n:'Eliminatórias Europeias',c:10}];
  }catch(e){console.error('seu79 '+e.message)}
})();
/* elenco da seleção europeia: como a SEL */
hookAround('mkNat42','mkSEU79',function(next,__a){let [lc,id,k]=__a;
  const c=next();
  try{if(k==='SEU'){const nat=SEU_NAT[lc.n]||'ENG';
    for(const pid of c.squad){const p=G.players[pid];if(!p)continue;p.nat=nat;p.name=NMP[nat]?wName(nat):uniqName();p.real=false;try{NATF[p.name]=nat}catch(e){}}
    c.coach=Object.assign(c.coach||{},{name:'Técnico (seleção)'})}}catch(e){console.error('seu79 '+e.message)}
  return c});

/* ext66 — v85: Divisão Regional = 5ª divisão do Brasil.
   4 zonas de 20 clubes reais (nomes tirados dos estaduais recentes), 38 rodadas, ninguém cai.
   Campeão de cada zona sobe pra Série D; os 4 últimos da D descem (cada um pra zona da sua região). */
const REGD0=100;
const REGZ=['Regional Sudeste','Regional Sul','Regional Nordeste','Regional Norte/C-Oeste'];
/* nome, sigla, rep, capacidade, cor1, cor2, padrão, tradição, UF */
const REGRAW=[
 [ // Sudeste
  ['Ituano','ITU',49,10000,'#d71920','#111111','h',24,'SP'],['Santo André','SAD',49,18000,'#1f4fa3','#ffffff','h',30,'SP'],['São Bento','SBE',48,9000,'#1f4fa3','#e8b800','h',22,'SP'],['Grêmio Prudente','GPR',46,8000,'#1f4fa3','#ffffff','solid',15,'SP'],
  ['Linense','LIN',47,12000,'#d71920','#111111','h',22,'SP'],['Juventus-SP','JUS',47,5000,'#7a1a1a','#ffffff','h',28,'SP'],['Taubaté','TAU',46,15000,'#e8b800','#1f4fa3','h',20,'SP'],['Votuporanguense','VOT',46,9000,'#d71920','#ffffff','v',18,'SP'],
  ['São Bernardo','SBC',47,12000,'#e8b800','#111111','h',16,'SP'],['Bangu','BAN',48,15000,'#d71920','#ffffff','h',38,'RJ'],['Madureira','MAD',48,8000,'#e8b800','#1f4fa3','h',30,'RJ'],['Boavista','BOA',46,6000,'#111111','#ffffff','h',15,'RJ'],
  ['Maricá','MRC',45,5000,'#d71920','#ffffff','solid',8,'RJ'],['Democrata-GV','DEM',45,9000,'#d71920','#ffffff','v',20,'MG'],['Itabirito','ITB',44,5000,'#1f4fa3','#ffffff','h',10,'MG'],['North','NOR',45,6000,'#1f4fa3','#ffffff','solid',12,'MG'],
  ['Pouso Alegre','PSA',45,6000,'#e8b800','#1f4fa3','h',14,'MG'],['URT','URT',45,8000,'#e8b800','#111111','v',16,'MG'],['Rio Branco-ES','RBE',44,8000,'#0b7a45','#ffffff','h',18,'ES'],['Desportiva Ferroviária','DFE',44,8000,'#d71920','#ffffff','h',16,'ES']
 ],[ // Sul
  ['Paranavaí','PVA',46,10000,'#e8b800','#1f4fa3','h',14,'PR'],['FC Cascavel','CAS',46,10000,'#d71920','#111111','h',12,'PR'],['Foz do Iguaçu','FOZ',45,6000,'#d71920','#ffffff','h',12,'PR'],['Rio Branco-PR','RBP',44,6000,'#d71920','#ffffff','solid',14,'PR'],
  ['Azuriz','AZU',45,5000,'#1f4fa3','#ffffff','solid',8,'PR'],['Cianorte','CIA',45,6000,'#d71920','#ffffff','h',12,'PR'],['Prudentópolis','PRU',43,4000,'#0b7a45','#ffffff','h',8,'PR'],['Barra','BAR',45,5000,'#d71920','#ffffff','solid',8,'SC'],
  ['Camboriú','CBU',44,5000,'#e8b800','#0b7a45','h',8,'SC'],['Carlos Renaux','CRE',46,7000,'#1f4fa3','#ffffff','h',22,'SC'],['Concórdia','CNC',44,5000,'#0b7a45','#ffffff','solid',10,'SC'],['Marcílio Dias','MDI',47,12000,'#d71920','#1f4fa3','v',28,'SC'],
  ['Metropolitano','MET',46,6000,'#d71920','#111111','h',18,'SC'],['Santa Catarina','SCA',43,4000,'#1f4fa3','#ffffff','solid',6,'SC'],['Avenida','AVE',46,8000,'#1f4fa3','#ffffff','h',20,'RS'],['Guarany de Bagé','GBA',46,10000,'#d71920','#111111','h',22,'RS'],
  ['Inter de Santa Maria','ISM',46,10000,'#d71920','#ffffff','solid',18,'RS'],['Monsoon','MON',43,4000,'#0b7a45','#111111','solid',5,'RS'],['Novo Hamburgo','NHA',47,12000,'#e8b800','#d71920','h',24,'RS'],['São Luiz','SLU',46,8000,'#d71920','#ffffff','h',20,'RS']
 ],[ // Nordeste
  ['Jaguar','JAG',44,4000,'#e8b800','#111111','h',6,'PE'],['Maguary','MGY',44,4000,'#d71920','#111111','h',8,'PE'],['Vitória das Tabocas','VDT',45,10000,'#0b7a45','#ffffff','h',14,'PE'],['Decisão','DEC',43,3000,'#1f4fa3','#ffffff','solid',4,'PE'],
  ['Bahia de Feira','BDF',46,14000,'#1f4fa3','#ffffff','h',20,'BA'],['Barcelona de Ilhéus','BAI',44,6000,'#1f4fa3','#d71920','h',12,'BA'],['Atlético de Alagoinhas','AAL',46,8000,'#d71920','#111111','v',22,'BA'],['Ferroviário','FEC',48,18000,'#d71920','#111111','v',38,'CE'],
  ['Maracanã','MRN',45,6000,'#1f4fa3','#ffffff','solid',12,'CE'],['Iguatu','IGU',44,8000,'#d71920','#ffffff','h',14,'CE'],['Caucaia','CAU',44,6000,'#d71920','#ffffff','solid',10,'CE'],['Sousa','SOU',45,10000,'#d71920','#ffffff','h',16,'PB'],
  ['Nacional de Patos','NPA',44,6000,'#1f4fa3','#ffffff','h',12,'PB'],['América-RN','AMR',47,12000,'#d71920','#ffffff','solid',32,'RN'],['Potiguar de Mossoró','POT',44,8000,'#e8b800','#1f4fa3','h',14,'RN'],['Sergipe','SER',45,9000,'#d71920','#ffffff','h',20,'SE'],
  ['CSA','CSA',49,18000,'#1f4fa3','#ffffff','solid',44,'AL'],['ASA','ASA',47,15000,'#111111','#ffffff','v',28,'AL'],['Imperatriz','IMP',45,8000,'#d71920','#ffffff','h',16,'MA'],['River-PI','RVP',46,12000,'#d71920','#ffffff','solid',24,'PI']
 ],[ // Norte / Centro-Oeste
  ['Tuna Luso','TUN',47,12000,'#1f4fa3','#ffffff','h',32,'PA'],['Águia de Marabá','AGM',45,10000,'#e8b800','#111111','h',16,'PA'],['Cametá','CMT',44,6000,'#d71920','#e8b800','h',12,'PA'],['Manaus','MNS',47,10000,'#1f4fa3','#ffffff','solid',14,'AM'],
  ['Fast Clube','FAS',45,8000,'#1f4fa3','#ffffff','h',18,'AM'],['Galvez','GAL',43,4000,'#1f4fa3','#ffffff','solid',10,'AC'],['Real Ariquemes','RAR',43,4000,'#1f4fa3','#ffffff','h',6,'RO'],['São Raimundo-RR','SRR',43,4000,'#1f4fa3','#e8b800','h',8,'RR'],
  ['Trem','TRM',43,5000,'#e8b800','#111111','solid',8,'AP'],['Palmas','PLM',43,5000,'#e8b800','#1f4fa3','h',6,'TO'],['Anápolis','ANA',46,15000,'#d71920','#ffffff','h',26,'GO'],['Goiânia','GOE',46,10000,'#1f4fa3','#ffffff','h',22,'GO'],
  ['CRAC','CRA',45,8000,'#d71920','#ffffff','h',16,'GO'],['Mixto','MIX',47,15000,'#111111','#d71920','h',28,'MT'],['Luverdense','LUV',47,10000,'#0b7a45','#ffffff','solid',14,'MT'],['Sinop','SIN',44,6000,'#0b7a45','#e8b800','h',8,'MT'],
  ['Operário-MS','OPM',45,10000,'#111111','#ffffff','v',22,'MS'],['Costa Rica','COS',44,6000,'#1f4fa3','#d71920','h',10,'MS'],['Brasiliense','BSL',47,12000,'#e8b800','#1f4fa3','h',20,'DF'],['Gama','GAM',47,20000,'#0b7a45','#ffffff','solid',30,'DF']
 ]];
const REGN=REGRAW.reduce((a,z)=>a+z.length,0);
const UFZ={SP:0,RJ:0,MG:0,ES:0,PR:1,SC:1,RS:1,BA:2,PE:2,CE:2,PB:2,RN:2,SE:2,AL:2,MA:2,PI:2};
const zoneOfUF=uf=>UFZ[uf]!==undefined?UFZ[uf]:3;
const isReg=d=>d>=REGD0&&d<REGD0+4;
REGRAW.forEach(z=>z.forEach(e=>{STATE[e[1]]=e[8]}));
REGZ.forEach((n,i)=>{DIVN[REGD0+i]=n;RBAND[REGD0+i]=[34,50]});

function regBuild(){
  if(G.rg)return;G.rg=1;G.rgS=1;
  REGRAW.forEach((z,zi)=>z.forEach(e=>{
    const [name,sig,rep,cap,c1,c2,pat,trad]=e;const id=G.clubs.length;
    const club={id,name,sig,rep,cap,c1,c2,c3:c1,pat,squad:[],formation:pick(['4-4-2','4-3-3','4-4-2','3-5-2','4-5-1']),style:pick(STYLES),
      phil:pick(PHN),humor:ri(50,70),caixa:0,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,CH:0,div:REGD0+zi,trad};
    club.color=c1==='#ffffff'?c2:c1;
    club.tv=+(.9+(rep-44)*.2).toFixed(1);club.spBase=+(.5+(rep-44)*.12).toFixed(1);
    G.clubs.push(club);
    club.squad=genSquad(club);
    club.caixa=+((club.tv+club.spBase+.5)*0.2*rnd(0.6,1.4)).toFixed(1);
    autoPick(club);
  }));
}
/* calendário: cada zona = 20 clubes, ida e volta, 38 rodadas (igual às outras divisões) */
const _gaf66=genAllFx;
genAllFx=function(){
  _gaf66.apply(this,arguments);
  if(!G.rg)return;
  for(let z=0;z<4;z++){const d=REGD0+z;G.dfx[d]=genFixtures(G.clubs.filter(c=>c.div===d).map(c=>c.id))}
  const u=G.user!=null&&G.clubs[G.user]?G.clubs[G.user].div:0;
  if(isReg(u))G.fixtures=G.dfx[u];
};
/* as zonas que o usuário não joga são simuladas rodada a rodada */
const _fr66=finishRound;
finishRound=function(){
  try{
    if(G.rg&&!(G._lg&&G._x&&R&&R.xtra)){const rd=G.round,ud=userDiv();
      for(let z=0;z<4;z++){const d=REGD0+z;if(d===ud||!G.dfx[d]||(R&&R.mpg&&R.divs&&R.divs.has(d)))continue;for(const [h,a] of (G.dfx[d][rd]||[]))simFast(C(h),C(a))}}
  }catch(e){console.error('reg',e)}
  return _fr66.apply(this,arguments);
};
/* acesso e rebaixamento com a Série D */
const _pr66=promoRel;
promoRel=function(){
  if(!G.rg||(G.rgS||1)>G.season)return _pr66.apply(this,arguments);
  const dn=tableRows(3).slice(-4).reverse();                       // pior primeiro
  const ch=[0,1,2,3].map(z=>tableRows(REGD0+z)[0]).filter(Boolean);
  _pr66.apply(this,arguments);
  const mv=(c,nd,up)=>{
    const old=c.div;c.div=nd;c.divHist=c.divHist||[];c.divHist.push({s:G.season,to:nd});
    const f=up?1.8:.5;c.tv=+(c.tv*f).toFixed(1);c.spBase=+(c.spBase*f).toFixed(1);
    c.humor=clamp(c.humor+(up?15:-15),5,100);
    G.moves.push({id:c.id,name:c.name,from:old,to:nd});
    if(up&&c.id!==G.user){for(let k=0;k<3;k++){const role=pick(['ZAG','LAT','VOL','MEI','PNT','ATA']);c.squad.push(mkPlayer(role,c.rep+3,ri(23,29),c.id).id)}autoPick(c)}
    if(up)paperLine(c.name+' conquista o acesso à '+DIVN[nd],'Campeão da '+DIVN[old]+' e agora na Série D.');
    else if(c.id===G.user||c.trad>=40)paperLine(c.name.toUpperCase()+' É REBAIXADO','Queda para a '+DIVN[nd]+'. O clube vai disputar o regional.');
  };
  const free=[0,1,2,3];
  const zoneFreed=new Set(ch.map(c=>c.div));
  ch.forEach(c=>mv(c,3,true));
  const left=[];
  dn.forEach(c=>{const want=zoneOfUF(STATE[c.sig]);if(zoneFreed.has(REGD0+want)){zoneFreed.delete(REGD0+want);mv(c,REGD0+want,false)}else left.push(c)});
  left.forEach(c=>{const z=[...zoneFreed][0];zoneFreed.delete(z);mv(c,z,false)});
};
/* nome, premiação, meta e resumo da rodada tratam a Regional como divisão sem queda */
const _rp66=relPromo;
relPromo=function(d,pos){if(isReg(d))return {rel:false,promo:pos===1};return _rp66.apply(this,arguments)};
const _pm66=prizeMul;
prizeMul=function(d){if(isReg(d))return .015;return _pm66.apply(this,arguments)};
const _mt66=metaText;
metaText=function(mp){const d=userDiv();if(isReg(d))return mp<=2?'Ser campeão da '+DIVN[d]+' e subir pra Série D':mp<=8?'Ficar entre os 8 primeiros':'Fazer campanha tranquila (a Regional não tem queda)';return _mt66(mp)};
const _es66=endSeason;
endSeason=function(){
  const r=_es66.apply(this,arguments);
  try{const c=userClub();if(c&&isReg(c.div)&&G.summary&&/ Zona de rebaixamento\./.test(G.summary.txt||'')){G.summary.txt=G.summary.txt.replace(' Zona de rebaixamento.','');G.board.conf=clamp(G.board.conf+10,0,100)}}catch(e){}
  return r;
};
/* escolha de clube: botão Regional + 4 zonas */
const _vcs66=vClubStep;
vClubStep=function(){
  let h=_vcs66.apply(this,arguments);
  const cd=S.cdiv||0,reg=isReg(cd);
  const seg=`<div class="seg sm">${['A','B','C','D'].map((x,i)=>`<button class="${cd===i?'on':''}" data-a="cdiv" data-v="${i}">Série ${x}</button>`).join('')}<button class="${reg?'on':''}" data-a="cdiv" data-v="${REGD0}">Regional</button></div>${reg?`<div class="seg sm">${REGZ.map((n,i)=>`<button class="${cd===REGD0+i?'on':''}" data-a="cdiv" data-v="${REGD0+i}">${n.replace('Regional ','')}</button>`).join('')}</div>`:''}`;
  return h.replace(/<div class="seg sm">[\s\S]*?<\/div>/,seg);
};

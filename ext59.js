/* ext59: seleções jogáveis (versão 1). Você pode assumir uma seleção sul-americana: o "campeonato" são as Eliminatórias (10 seleções, ida e volta),
   e no fim a fase final em mata-mata (Copa América simplificada) usa o motor das copas nacionais. Elenco gerado com nomes da nacionalidade. */
Object.assign(WCOL,{'Argentina':['#75aadb','#ffffff','#75aadb','v'],'Brasil':['#ffdf00','#009c3b','#ffdf00','solid'],'Uruguai':['#6cb4e8','#111111','#6cb4e8','solid'],'Colômbia':['#fcd116','#003893','#ce1126','solid'],'Equador':['#fcd116','#034ea2','#ed1c24','solid'],'Paraguai':['#d52b1e','#ffffff','#0038a8','v'],'Chile':['#d52b1e','#ffffff','#0039a6','solid'],'Peru':['#ffffff','#d91023','#ffffff','diag'],'Bolívia':['#007934','#ffe000','#d52b1e','solid'],'Venezuela':['#7b1e3a','#ffffff','#ffd100','solid']});
const SELNAT={'Argentina':'ARG','Brasil':'BRA','Uruguai':'URU','Colômbia':'COL','Equador':'ECU','Paraguai':'PAR','Chile':'CHI','Peru':'PER','Bolívia':'BOL','Venezuela':'VEN'};
NMP.SEL=NMP.ARG;NCUP.SEL=[8,'Copa América'];
hookAround('mkNat42','mk59',function(next,__a){let [lc,id,k]=__a;
  const c=next();
  try{if(k==='SEL'){const nat=SELNAT[lc.n]||'ARG';
    for(const pid of c.squad){const p=G.players[pid];if(!p)continue;p.nat=nat;p.name=NMP[nat]?wName(nat):uniqName();p.real=false;try{NATF[p.name]=nat}catch(e){}}
    c.coach=Object.assign(c.coach||{},{name:'Técnico (seleção)'})}}catch(e){console.error('sel59 '+e.message)}
  return c});

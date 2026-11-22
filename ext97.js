/* ext97 (v132): ajustes manuais de overall do dono (MAN72, gerado por tools/gen_ext72.py a partir de ajustes_manuais_overall_v2.9.2.csv)
   também valem no Brasil, onde o overall vem das faixas do data.js. Roda no fim do newWorld (depois do ext15, que fazia o Neymar ser o melhor +1).
   Casamento por nome exato; apelidos explícitos para nomes que o data.js escreve curto (não casa sobrenome solto). */
const ALIAS97={'Giorgian de Arrascaeta':'Arrascaeta'};
hookAfter('newWorld','ext97_nw',function(){
  try{
    if(typeof MAN72==='undefined')return;
    const want={};for(const k in MAN72)want[ALIAS97[k]||k]=MAN72[k];
    for(const p of Object.values(G.players)){const o=want[p.name];if(o){p.ovr=o;p.pot=Math.max(p.pot||o,o)}}
  }catch(e){console.error('ext97 '+e.message)}
});

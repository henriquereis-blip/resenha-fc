/* ext61: correção: o pool de rivais da Libertadores/Sul-Americana (FCPOOL) tinha ganhado clubes da Europa, Ásia e África quando as ligas novas entraram.
   Agora a Libertadores e a Sul-Americana só sorteiam clubes das ligas sul-americanas. */
const SA61=new Set(['ARG','URU','COL','CHI','PAR','ECU','PER','BOL','VEN']);
const SANAMES61=(()=>{const s=new Set();for(const L of WLD)if(SA61.has(L.k))for(const c of L.cl)s.add(c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'));return s})();
function onlySA61(fn,self,args){
  const keep=FCPOOL.slice(),sa=keep.filter(d=>SANAMES61.has(d[0]));
  if(sa.length<12)return fn.apply(self,args);
  FCPOOL.length=0;sa.forEach(d=>FCPOOL.push(d));
  try{return fn.apply(self,args)}finally{FCPOOL.length=0;keep.forEach(d=>FCPOOL.push(d))}
}
const _ci61=contInit;contInit=function(){return onlySA61(_ci61,this,arguments)};
const _ck61=contKoOpp;contKoOpp=function(){return onlySA61(_ck61,this,arguments)};

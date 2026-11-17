/* ext35: forma de temporada por clube (menos dominância fixa de um time só) */
function seasonForm35(){if(!G)return;G.clubs.forEach(c=>{c.sf=clamp(1+gauss()*(typeof SF35==='number'?SF35:0.04),0.92,1.08)})}
const _ns35=newSeason;newSeason=function(){const r=_ns35.apply(this,arguments);try{seasonForm35()}catch(e){console.error('sf35 '+e.message)}return r};
const _sc35=startCareer;startCareer=function(){const r=_sc35.apply(this,arguments);try{seasonForm35()}catch(e){}return r};
const _mm35=mgrMatch;mgrMatch=function(m,k){let f=_mm35.apply(this,arguments);try{const c=m[k]&&m[k].club;if(c&&c.sf)f*=c.sf}catch(e){}return f};

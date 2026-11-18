/* ext35: forma de temporada por clube (menos dominância fixa de um time só) */
function seasonForm35(){if(!G)return;G.clubs.forEach(c=>{c.sf=clamp(1+gauss()*(typeof SF35==='number'?SF35:0.04),0.92,1.08)})}
hookAfter('newSeason','ext35_ns35',()=>{seasonForm35()});
hookAround('startCareer','sc35',function(next,__a){const r=next();try{seasonForm35()}catch(e){}return r});
hookAround('mgrMatch','mm35',function(next,__a){let [m,k]=__a;let f=next();try{const c=m[k]&&m[k].club;if(c&&c.sf)f*=c.sf}catch(e){}return f});

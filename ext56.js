/* ext56: supercopas (campeão da liga x campeão da copa) nos países com carreira no exterior.
   Disputada na virada da temporada, em jogo único (pênaltis se empatar). Se o campeão da liga também levou a copa, o vice entra no lugar.
   Simulada na hora: sai no jornal e no histórico. Se o seu clube joga, o prêmio e a moral entram. */
const SUPER56={ENG:'Community Shield',ESP:'Supercopa de España',ITA:'Supercoppa Italiana',GER:'DFL-Supercup',FRA:'Trophée des Champions',POR:'Supertaça Cândido de Oliveira',ARG:'Supercopa Argentina',NED:'Johan Cruyff Schaal',BEL:'Supercopa da Bélgica',TUR:'Süper Kupa',EGY:'Supercopa do Egito',KSA:'Supercopa Saudita'};
hookAround('newSeason','ext56_ns56',function(next,A){
  let prev=null;
  try{if(G&&G.abroad&&SUPER56[G.abroad.k]&&G.hist&&G.hist.length){prev={s:G.season,champ:G.hist[G.hist.length-1].champ,k:G.abroad.k}}}catch(e){}
  const r=next();
  try{if(prev&&G.abroad&&G.abroad.k===prev.k){
    const cup=(G.ncHist||[]).filter(x=>x.s===prev.s&&!/EFL|Liga/.test(x.n||'')).slice(-1)[0];
    const find=n=>G.clubs.find(c=>!c.stub&&c.div>=4&&c.name===n);
    let A=find(prev.champ),B=cup?find(cup.champ):null;
    if(A&&B&&A===B){const rows=G.clubs.filter(c=>!c.stub&&tierOf(c.div)===1&&c.name&&c!==A).sort((a,b)=>b.rep-a.rep);B=rows[0]||null}
    if(A&&B&&A!==B){
      const g=wMatch({r:rRat(A),f:1},{r:rRat(B),f:1});let pen=null,w=g[0]>g[1]?A:g[0]<g[1]?B:null;
      if(!w){pen=shootout(rRat(A),rRat(B));w=pen[0]>pen[1]?A:B}
      const nm=SUPER56[prev.k],me=G.clubs[G.user];
      const txt=A.name+' '+g[0]+'–'+g[1]+' '+B.name+(pen?' ('+pen[0]+'–'+pen[1]+' pên.)':'');
      paperLine(w.name+' conquista a '+nm,txt);
      G.superHist=(G.superHist||[]).concat({s:prev.s,n:nm,champ:w.name,t:txt}).slice(-12);
      if(me&&(me===A||me===B)){
        if(w===me){const pz=+(1.5*Math.max(.7,scaleOf(me)/100)).toFixed(1);G.fin.caixa=+(G.fin.caixa+pz).toFixed(1);me.humor=clamp(me.humor+5,5,100);G.trophyEst=(G.trophyEst||0)+1;addNews('🏆 Campeão da '+nm+'! Prêmio R$ '+pz+' mi. ('+txt+')')}
        else addNews('Você perdeu a '+nm+': '+txt+'.')}
      else addNews(nm+': '+w.name+' levou ('+txt+').')}
  }}catch(e){console.error('super56 '+e.message)}
  return r});

/* Campeón de Campeones (MEX: campeão do Apertura x campeão do Clausura) e final nacional do Peru (mesmos dois campeões). Jogo único na virada da temporada. */
const DUEL56={MEX:'Campeón de Campeones',PER:'Final do Campeonato Peruano'};
hookAround('newSeason','ext56_ns56b',function(next,A){
  let prev=null;
  try{if(G&&G.abroad&&DUEL56[G.abroad.k]){const h=(G.lg51&&G.lg51.hist||[]).filter(x=>x.s===G.season);
    const ap=h.find(x=>/Apertura/.test(x.n)),cl=h.find(x=>/Clausura/.test(x.n));if(ap&&cl)prev={s:G.season,k:G.abroad.k,a:ap.champ,c:cl.champ}}}catch(e){}
  const r=next();
  try{if(prev&&G.abroad&&G.abroad.k===prev.k){
    const find=n=>G.clubs.find(c=>!c.stub&&c.div>=4&&c.name===n),A=find(prev.a),B=find(prev.c),nm=DUEL56[prev.k],me=G.clubs[G.user];
    if(prev.a===prev.c){if(A){paperLine(A.name+' é bicampeão do ano','Venceu Apertura e Clausura: '+nm+' decidido na tabela.');G.superHist=(G.superHist||[]).concat({s:prev.s,n:nm,champ:A.name,t:'Apertura e Clausura'}).slice(-12)}}
    else if(A&&B){
      const g=wMatch({r:rRat(A),f:1},{r:rRat(B),f:1});let pen=null,w=g[0]>g[1]?A:g[0]<g[1]?B:null;
      if(!w){pen=shootout(rRat(A),rRat(B));w=pen[0]>pen[1]?A:B}
      const txt=A.name+' '+g[0]+'–'+g[1]+' '+B.name+(pen?' ('+pen[0]+'–'+pen[1]+' pên.)':'');
      paperLine(w.name+' vence a '+nm,txt);G.superHist=(G.superHist||[]).concat({s:prev.s,n:nm,champ:w.name,t:txt}).slice(-12);
      if(me&&(me===A||me===B)){
        if(w===me){const pz=+(2*Math.max(.7,scaleOf(me)/100)).toFixed(1);G.fin.caixa=+(G.fin.caixa+pz).toFixed(1);me.humor=clamp(me.humor+6,5,100);G.trophyEst=(G.trophyEst||0)+1;addNews('🏆 '+nm+'! Prêmio R$ '+pz+' mi. ('+txt+')')}
        else addNews('Você perdeu a '+nm+': '+txt+'.')}
      else addNews(nm+': '+w.name+' levou ('+txt+').')}
  }}catch(e){console.error('duel56 '+e.message)}
  return r});

/* v32: ranking de técnicos pesa a divisão + campanhas surpreendentes */
const DW36=[1,.6,.4,.25,.9,.4];
function coachOf36(c){return c.id===G.user?G.uc:c.coach}
const _fr36=finishRound;finishRound=function(){
  const before=G.clubs.map(c=>{const co=coachOf36(c);return co?co.pts:0});
  const r=_fr36.apply(this,arguments);
  try{G.clubs.forEach((c,i)=>{const co=coachOf36(c);if(!co)return;const d=co.pts-before[i];if(d>0){const w=DW36[c.div||0]||.25;co.pts=+(before[i]+d*w).toFixed(1)}})}catch(e){console.error('fr36 '+e.message)}
  return r;
};
const _es36=endSeason;endSeason=function(){
  const ud=G.clubs[G.user]?G.clubs[G.user].div:0;
  const urows=tableRows(ud);
  const r=_es36.apply(this,arguments);
  try{
    if(G.dw36!==G.season){
      G.dw36=G.season;
      // desfaz o bônus fixo da divisão do usuário (ext.js) e aplica o ponderado
      urows.forEach((c,i)=>{const co=coachOf36(c);if(!co)return;if(i===0){co.pts-=60;co.titles--}else if(i<4)co.pts-=15});
      const divs=[...new Set(G.clubs.map(c=>c.div||0))];
      divs.forEach(d=>{
        const w=DW36[d]||.25;
        const rows=tableRows(d);
        const byRep=rows.slice().sort((a,b)=>b.rep-a.rep);
        rows.forEach((c,i)=>{
          const co=coachOf36(c);if(!co)return;
          let b=0;
          if(i===0){b+=60*w;co.titles++}else if(i<4)b+=15*w;
          const exp=byRep.findIndex(x=>x.id===c.id);const s=exp-i;
          if(s>=3)b+=s*3*(.6+.4*w);
          else if(s<=-5)b-=Math.abs(s)*1.5*w;
          if(d>0&&i<4)b+=10*(d===1?1:.8); // acesso
          co.pts=+(co.pts+b).toFixed(1);
        });
      });
    }
  }catch(e){console.error('es36 '+e.message)}
  return r;
};

/* ext22: ciclos dos clubes (fases boas e ruins) — impede dinastia eterna e abre espaço para crescimento de outros times */
function cycTick(){
  G.cyc=G.cyc||{};G.cycA=G.cycA||{};
  const rk=G.clubs.filter(c=>c.div===0).sort((a,b)=>strength(b)-strength(a)).map(c=>c.id);
  for(const c of G.clubs){
    if(c.id===G.user||!c.squad.length)continue;
    let g=G.cyc[c.id]||0;const r=rk.indexOf(c.id);
    g=g*.78+gauss()*.62;
    if(r>=0&&r<3)g-=.22;else if(r>=14)g+=.18;                       // quem está no topo tende a cair, quem está no fundo tende a reagir
    if(c.rep<70&&Math.random()<.035)g+=1.5;                           // projeto de um clube menor engrena
    g=clamp(g,-2,2);G.cyc[c.id]=g;
    let T0=g*3.1;if(T0<0&&c.rep>=75)T0*=.55;const T=Math.round(T0),ap=G.cycA[c.id]||0,d=T-ap;
    if(d){
      const top=c.squad.map(id=>P(id)).filter(p=>p).sort((a,b)=>b.ovr-a.ovr).slice(0,15);
      for(const p of top){p.ovr=clamp(p.ovr+d,38,92);if(p.pot!==undefined)p.pot=Math.max(p.pot,p.ovr)}
      G.cycA[c.id]=T;
    }
    if(g<-1.5)c.caixa=+(c.caixa-Math.abs(g)*scaleOf(c)*.02).toFixed(1);
    if(g>1.5)c.caixa=+(c.caixa+g*scaleOf(c)*.015).toFixed(1);
  }
}
hookAfter('newSeason','ext22_ns22',function(r,A){try{cycTick()}catch(e){console.error('cyc '+e.message)}});

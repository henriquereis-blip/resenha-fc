/* ext102 (v140): clube do técnico CRESCE (ou encolhe) com o que entrega. Antes só a IA ganhava/perdia reputação por resultado
   (ext12/ext9) e o patrocínio-base do clube do usuário só mudava por subida/queda de divisão: clube fraco que ia bem não virava marca.
   No fim de cada temporada, comparando a posição final com a meta:
     reputação: +0,12 por posição acima da meta (de -0,8 a +1,2); campeão da liga +0,8; Copa/estadual não contam (já têm humor e prêmio)
     patrocínio-base e TV-base: ×(1 + 1,2% por posição acima da meta), de -6% a +10%
   A reputação respeita a faixa da divisão (RBAND), então o crescimento é gradual e a subida de divisão continua sendo o grande salto. */
hookBefore('newSeason','ext102_ns',function(){
  try{
    const c=userClub(),sm=G.summary;if(!c||!sm||sm.season!==G.season||sm.pos==null||sm.meta==null)return;
    if(G._grow102===sm.season)return;G._grow102=sm.season;
    const d=sm.meta-sm.pos;                       // positivo = ficou acima da meta
    let dr=clamp(d*0.12,-0.8,1.2)+(sm.champ?0.8:0);
    const fac=1+clamp(d*0.012,-0.06,0.10);
    const rb=RBAND[c.div]||[40,95],old=c.rep;
    c.rep=+clamp(c.rep+dr,rb[0],rb[1]).toFixed(1);
    c.spBase=+(c.spBase*fac).toFixed(1);c.tv=+(c.tv*(1+(fac-1)*0.5)).toFixed(1);
    G.growLog=G.growLog||[];G.growLog.push({s:sm.season,club:c.name,pos:sm.pos,meta:sm.meta,rep:[old,c.rep],fac:+fac.toFixed(3)});if(G.growLog.length>20)G.growLog.shift();
    if(c.rep-old>=0.5)addNews(c.name+' cresce como marca: reputação sobe com a temporada acima do esperado.');
    else if(old-c.rep>=0.5)addNews(c.name+' perde peso como marca depois de uma temporada abaixo do esperado.');
  }catch(e){console.error('ext102 '+e.message)}
});

/* ext89 (v115, fase D): SAF. Em cada temporada, 0 a 2 clubes da Série A viram SAF (aporte para pagar dívida).
   Se for o seu clube, a proposta vai pra comissão e só vira SAF se você aprovar. SAF pode voltar ao modelo associativo, raramente. */
const SAF89={pRound:0.45,pTwo:0.15,pRevert:0.04,aporte:0.4};
function safAplica89(c,motivo){
  const debt=c.debt||0,val=Math.round(debt*SAF89.aporte*10)/10;
  c.debt=+(debt-val).toFixed(1);c.modelo='saf';
  addNews('🏦 '+c.name+' vira SAF'+(motivo?' '+motivo:'')+': aporte de R$ '+val.toFixed(1)+' mi para pagar dívidas.');
  return val;
}
hookAfter('newSeason','ext89_ns',function(){
  try{
    const A=G.clubs.filter(c=>c.div===0&&c.id!==G.user&&c.modelo!=='saf');
    const n=Math.random()<SAF89.pTwo?2:Math.random()<SAF89.pRound?1:0;
    for(let i=0;i<n&&A.length;i++){const k=Math.floor(Math.random()*A.length);const c=A.splice(k,1)[0];safAplica89(c)}
    const u=userClub();
    if(u&&u.modelo!=='saf'&&Math.random()<SAF89.pRound*0.25){G.safOffer={s:G.season,amt:+(Math.max(0,u.debt||0)*SAF89.aporte).toFixed(1)}}else G.safOffer=null;
    for(const c of G.clubs)if(c.modelo==='saf'&&c.id!==G.user&&Math.random()<SAF89.pRevert){c.modelo='associativo';addNews(c.name+' volta ao modelo associativo.')}
  }catch(e){console.error('ext89 '+e.message)}
});
hookAfter('staffAlerts','ext89_sa',function(out){
  try{const o=G.safOffer;if(o&&o.s===G.season)out.push({k:'saf',sev:1,ic:'🏦',txt:`Proposta: investidores querem transformar o clube em SAF com aporte de R$ ${o.amt.toFixed(1)} mi para pagar dívidas. Aprovar tira o clube do modelo associativo.`,btn:'Aprovar SAF',a:'safyes'})}catch(e){}
  return out;
});
Object.assign(A,{safyes(){const u=userClub();const o=G.safOffer;if(!u||!o||o.s!==G.season)return;G.safOffer=null;safAplica89(u,'(aprovado pelo técnico)');save();render();toast('SAF aprovada.')}});

/* ext90 (v117): prazo do garoto da base = anos até o desenvolvimento máximo (aos 21), pela curva de ext91.
   Mostra: ovr hoje (ao subir agora), ovr final (T pelas estrelas) e quanto tempo falta, com o treinador da base. */
function youthEta90(c,y){
  const q=trainerQ91(c);
  const ovr=youthOvr91(y,q,c),T=Math.round(youthT91(y.stars,c,y.rare));
  const anos=Math.max(0,21-y.age-q*0.2);
  return {ovr,T,anos:Math.ceil(anos),pronto:anos<=0,trainer:(G.mk&&G.mk.base&&G.mk.base.staff&&G.mk.base.staff.trei)||null};
}
globalThis.youthEta90=youthEta90;
Object.assign(A,{yinfo(d){const c=userClub();const y=c&&c.youth[+d.i];if(!y)return;
  const e=youthEta90(c,y);
  const quem=e.trainer?'treinador da base '+e.trainer.name+' (qualidade '+e.trainer.q+')':'sem treinador da base (evolução mais lenta)';
  const msg=y.name+' · '+starsTxt91(y.stars)+': hoje ovr '+e.ovr+', chega a '+e.T+' no desenvolvimento máximo.'
    +(e.pronto?' Já está no máximo.':' Faltam ~'+e.anos+' ano(s) até os 21, segundo '+quem+'.')
    +' Subir antes é possível, mas ele sobe mais fraco.';
  toast(msg)}});

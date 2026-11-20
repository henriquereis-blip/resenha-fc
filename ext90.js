/* ext90 (v116): prazo do garoto da base. Mostra quanto falta pra ele ficar pronto para subir, segundo a evolução real do jogo:
   ovr ao subir = 44 + dev·0,22 + estrelas·2,5 (promoteYouth). Pronto = ovr ≥ 62. Cada rodada dá +0..2 de dev (média 1),
   cada temporada dá +12 (idade) e o treinador da base dá 1,5 × qualidade + centro de treinamento. Quem sobe antes sobe mais fraco. */
const READY90=62;
function youthEta90(c,y){
  const b=G.mk&&G.mk.base;const tr=b&&b.staff&&b.staff.trei?b.staff.trei:null;
  const q=tr?tr.q:0,ct=b?b.ct:0;
  const ovr=Math.round(44+y.dev*0.22+y.stars*2.5);
  if(ovr>=READY90)return {ready:true,ovr,trainer:tr,rounds:0,seasons:0};
  const targetDev=(READY90-44-y.stars*2.5)/0.22;
  const gap=Math.max(0,targetDev-y.dev);
  const perRound=1+12/38+(1.5*q+ct)/38;
  const rounds=Math.ceil(gap/perRound);
  return {ready:false,ovr,trainer:tr,rounds,seasons:Math.ceil(rounds/38)};
}
globalThis.youthEta90=youthEta90;
Object.assign(A,{yinfo(d){const c=userClub();const y=c&&c.youth[+d.i];if(!y)return;
  const e=youthEta90(c,y);
  const quem=e.trainer?e.trainer.name+' (qualidade '+e.trainer.q+')':'sem treinador da base (evolução mais lenta)';
  const msg=e.ready?y.name+': pronto para subir (ovr '+e.ovr+'). Pode promover quando quiser.'
    :y.name+': falta ~'+e.rounds+' rodada(s)'+(e.seasons>1?' (~'+e.seasons+' temporadas)':'')+' para ficar pronto, segundo '+quem+'. Subir antes é possível, mas ele sobe mais fraco (ovr '+e.ovr+' hoje).';
  toast(msg)}});

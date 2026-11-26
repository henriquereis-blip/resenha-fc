// v140: confere o mínimo da diretoria no painel de dívida (clube muito endividado x clube saudável).
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
for(const cl of ['Corinthians','Palmeiras','Remo']){
 await p.reload();await p.waitForTimeout(300);
 const r=await p.evaluate((cl)=>{localStorage.clear();S.mg=mgNew('equil');S.obj='rec';startCareer(G.clubs.find(c=>c.name===cl).id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const c=userClub(),m=boardMin7();G.fx.pay=0;G.fx.sd=0;const html=finCard();
  return {cl,debt:c.debt,minPay:m.pay,minSd:m.sd,k:m.k,efetivoPay:payEff7(),efetivoSd:sdEff7(),sliderMin:/id="paysl" min="(\d+)"/.exec(html)[1],obj:G.fx.obj}},cl);
 console.log(JSON.stringify(r))}
console.log(errs);await b.close()})();

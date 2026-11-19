/* ext77 (v92): diretoria firme — orçamento de salários cresce com superávit e encolhe com déficit, reserva mínima de caixa (veto de compra), avisos */
(function(){
const reserve=()=>{const c=userClub();return +(payroll(c)*0.06).toFixed(1)};
globalThis.cashReserve=reserve;
/* 1) fecho de temporada: orçamento reage ao resultado financeiro do ano */
hookBefore('newSeason','dir77',function(){try{G._cx1=G.fin.caixa}catch(e){}});
hookAfter('newSeason','dir77',function(){
  try{
    const c=userClub();if(!c||G._cx0===undefined){G._cx0=G.fin.caixa;return}
    const prof=G._cx1-G._cx0;G._cx0=G.fin.caixa;
    const pay=Math.max(1,payroll(c)),r=prof/pay;
    const g=clamp(1+r*0.5,0.92,1.16);
    const old=wageBudget();G.wb=+(old*g).toFixed(2);
    if(Math.abs(g-1)>=0.01){
      const up=g>1;
      addNews(up?`Diretoria aprova orçamento maior: teto de salários sobe para ${mi(G.wb)} (superávit de ${mi(prof)} na temporada).`
               :`Diretoria corta o orçamento: teto de salários cai para ${mi(G.wb)} (déficit de ${mi(-prof)} na temporada).`);
    }
    G.dirMsg={s:G.season,prof:+prof.toFixed(1),wb:G.wb,g:+g.toFixed(3)};
  }catch(e){console.error('dir77 '+e.message)}
});
hookAfter('startCareer','dir77',function(){G._cx0=G.fin.caixa;G._cx1=G.fin.caixa});
hookAfter('takeJob','dir77',function(){G._cx0=G.fin.caixa;G._cx1=G.fin.caixa});
/* 2) veto: compra que deixa o caixa abaixo da reserva mínima */
hookAround('makeBid','dir77',function(next,__a){
  let [pid,fee]=__a;
  try{const c=userClub();if(c&&fee>0&&G.fin.caixa-fee<reserve()){
    const r=reserve();
    return {ok:false,msg:'A diretoria vetou: a compra deixaria o caixa em '+mi(Math.max(0,G.fin.caixa-fee))+' (reserva mínima do clube: '+mi(r)+').'}}}catch(e){}
  return next(pid,fee);
});
hookAround('negStart','dir77',function(next,__a){
  let [pid]=__a;
  try{const p=P(pid),c=userClub();if(p&&c&&p.club>=0&&p.club!==G.user&&askPrice(p)*0.85>G.fin.caixa-reserve())return 'A diretoria já avisou: com o caixa em '+mi(G.fin.caixa)+' (reserva mínima '+mi(reserve())+') não dá pra bancar '+nameOf(p)+' (pedem ~'+mi(askPrice(p))+').'}catch(e){}
  return next(pid);
});
/* crescimento de clube pequeno: bônus de desempenho (quem supera a meta ganha caixa) + caixa mínimo ao assumir */
hookAfter('endSeason','grow77',function(){
  try{const sm=G.summary,c=userClub();if(!sm||!c||sm.bonus!==undefined)return;
    const pay=payroll(c);let b=0;
    if(sm.pos<sm.meta)b+=(sm.meta-sm.pos)*0.035*pay;
    if(sm.pos===1)b+=0.12*pay;
    b=+Math.min(b,0.3*pay).toFixed(1);sm.bonus=b;
    if(b>0){G.fin.caixa=+(G.fin.caixa+b).toFixed(1);sm.txt+=' Bônus de desempenho da temporada: +'+mi(b)+'.';addNews('Bônus de desempenho: +'+mi(b)+' no caixa por superar a meta.')}
  }catch(e){console.error('grow77 '+e.message)}
});
const floor77=()=>{try{const c=userClub(),m=payroll(c)*0.2;if(G.fin.caixa<m)G.fin.caixa=+m.toFixed(1)}catch(e){}};
hookAfter('startCareer','floor77',floor77);
hookAfter('takeJob','floor77',floor77);
/* 3) avisos do diretor */
hookAfter('staffAlerts','dir77',function(out){
  try{const c=userClub();if(!c)return;
    const r=reserve();
    if(G.fin.caixa>=0&&G.fin.caixa<r*1.5)out.push({k:'dircx',sev:2,ic:'🏦',txt:`Diretor financeiro: o caixa (${mi(G.fin.caixa)}) tá perto da reserva mínima de ${mi(r)}. Acima disso a diretoria veta compras.`,btn:'Ver Clube',a:'nav',v:'clube'});
    const pay=payroll(c),bud=wageBudget();
    if(pay>bud*0.97&&pay<=bud*1.02)out.push({k:'dirfolha',sev:1,ic:'🏦',txt:`Diretor financeiro: a folha (${mi(pay)}) bateu no teto de ${mi(bud)}. Pra contratar mais, vende ou deixa alguém sair.`,btn:'Ver Comissão',a:'nav',v:'staff'});
    if(G.dirMsg&&G.dirMsg.s===G.season&&G.round<=3&&Math.abs(G.dirMsg.g-1)>=0.01)out.push({k:'dirbud',sev:1,ic:'🏦',txt:G.dirMsg.g>1?`Diretoria: o ano passado fechou com superávit de ${mi(G.dirMsg.prof)}, então o teto de salários subiu pra ${mi(G.dirMsg.wb)}.`:`Diretoria: o ano passado fechou no vermelho (${mi(G.dirMsg.prof)}), então o teto de salários caiu pra ${mi(G.dirMsg.wb)}.`,btn:'Ver Clube',a:'nav',v:'clube'});
    out.sort((a,b)=>b.sev-a.sev);
  }catch(e){}
});
})();

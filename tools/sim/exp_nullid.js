// v140: caça a origem do id vazio nos elencos. Joga carreiras que emigram e voltam, com transferências do usuário, e confere
// a invariante depois de cada rodada: todo id de elenco existe em G.players e aponta para o clube certo. Imprime a 1ª violação e as ações antes dela.
// Uso: node tools/sim/exp_nullid.js [semente_de_carreiras]
const {open}=require('./setup_common');
const N=+(process.argv[2]||6);
(async()=>{const {b,p,errs}=await open();
const out=[];
for(let i=0;i<N;i++){
 await p.reload();await p.waitForTimeout(300);
 const r=await p.evaluate((i)=>{
  const log=[];const bad=[];
  function inv(tag){
    for(const c of G.clubs){if(!c)continue;
      for(const id of c.squad){
        if(id==null){bad.push({tag,club:c.name,div:c.div,erro:'id nulo'});return true}
        const pl=P(id);if(!pl){bad.push({tag,club:c.name,div:c.div,erro:'id sem jogador',id,abroad:!!G.abroad,len:c.squad.length});return true}
        if(pl.club!==c.id&&!(pl.loan)){bad.push({tag,club:c.name,div:c.div,erro:'jogador de outro clube',id,pclub:pl.club,abroad:!!G.abroad});return true}}
      if(c.squad.length<11&&c.div<100){bad.push({tag,club:c.name,div:c.div,erro:'elenco curto',len:c.squad.length,abroad:!!G.abroad});return true}}
    return false}
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const A0=G.clubs.filter(c=>c.div===0);startCareer(A0[(i*3)%A0.length].id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  for(let s=0;s<4&&!bad.length;s++){
    log.push('temp '+G.season+' clube '+userClub().name+(G.abroad?' (exterior '+G.abroad.k+')':''));
    let g=0,o;
    while(g++<200&&!bad.length){
      startRound();while(!roundDone())stepAll();o=finishRound();
      if(inv('rodada '+G.round+' temp '+G.season))break;
      /* ações do usuário: vender e emprestar */
      if(G.round%7===3){try{const c=userClub();const pl=c.squad.map(P).filter(Boolean).sort((a,b)=>b.ovr-a.ovr)[3];if(pl&&c.squad.length>21){const of=G.offers&&G.offers[0];if(of){sellPlayer(of.id);log.push('vendeu oferta '+of.id)}}}catch(e){log.push('erro venda '+e.message)}}
      if(o==='fired'||o==='seasonEnd')break}
    if(bad.length)break;
    if(o==='fired'){const of=fireOffers();takeJob(of[0]);log.push('demitido->'+userClub().name)}
    else{if(!G.summary||G.summary.season!==G.season)endSeason()}
    if(inv('fim temp '+G.season))break;
    /* a cada 2 temporadas: muda de país e volta */
    if(s===1){try{const W=wd();const k=['ENG','ESP','POR','ARG'][i%4];const x=W.lg[k].cl[3];log.push('emigra '+k);emigrate(x.id)}catch(e){log.push('erro emigrar '+e.message)}
      if(inv('apos emigrar'))break}
    if(s===2&&G.abroad){try{const of=fireOffers();log.push('volta (ofertas '+of.length+')');if(of.length)takeJob(of[0])}catch(e){log.push('erro volta '+e.message)}
      if(inv('apos voltar'))break}
    newSeason();G.phase='play';S.modal=null;
    if(inv('apos newSeason '+G.season))break}
  return {i,bad:bad[0]||null,log:log.slice(-8)}},i);
 out.push(r);console.log(JSON.stringify(r))}
console.log('ERR',JSON.stringify(errs.slice(0,3)));await b.close()})();

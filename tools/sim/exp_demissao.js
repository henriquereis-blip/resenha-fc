// Demissões: técnico do usuário em várias carreiras (clubes de diferentes forças), K temporadas por carreira.
// Conta demissões por temporada e a rodada em que cada uma ocorreu. Demitido: pega um novo emprego (takeJob), como o world_sim.
// Uso: node tools/sim/exp_demissao.js CARREIRAS K [offset]
const {open}=require('./setup_common');
const CAR=+(process.argv[2]||12),K=+(process.argv[3]||3),OFF=+(process.argv[4]||0);
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({CAR,K,OFF})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const A=G.clubs.filter(c=>c.div===0).sort((a,b)=>b.rep-a.rep);
  const pick_=[A[0],A[4],A[9],A[14],A[19]];
  const out={carreiras:0,temporadas:0,demissoes:[],porTemporada:[0,0,0],rodadaDemissao:{},primeiraAntes19:0};
  for(let c=0;c<CAR;c++){
    const club=pick_[(c+OFF)%pick_.length];
    startCareer(club.id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;out.carreiras++;
    for(let s=0;s<K;s++){let g=0,o;
      while(g++<200){startRound();while(!roundDone())stepAll();o=finishRound();if(o==='fired'||o==='seasonEnd')break}
      out.temporadas++;
      if(o==='fired'){out.demissoes.push({clube:club.name,rep:club.rep,temp:G.season,rodada:G.round});
        out.porTemporada[Math.min(2,s)]++;out.rodadaDemissao[G.round]=(out.rodadaDemissao[G.round]||0)+1;
        if(G.season===1&&G.round<=19)out.primeiraAntes19++;
        const of=fireOffers();takeJob(of[0]);}
      else{if(!G.summary||G.summary.season!==G.season)endSeason();}
      if(o!=='fired'&&o!=='seasonEnd'){/* nunca */}
      if(o==='seasonEnd'&&!(G.summary&&G.summary.season===G.season))endSeason();
      newSeason();G.phase='play';S.modal=null}
  }
  return out;
},{CAR,K,OFF});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

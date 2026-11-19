// Carreira de verdade (com decisões): modo 'auto' (só autoPick a cada 6 rodadas, sem mexer em tática)
// ou 'ativo' (escolhe a formação de maior encaixe, estilo pela força relativa da liga e escala o XI toda rodada).
// Uso: node play_career.js <modo> <clube> <temporadas> [PAÍS:clube]
const {open}=require('./setup_common');
const [MODE,START,SEAS,EMI]=process.argv.slice(2);
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({MODE,START,SEAS,EMI})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const idOf=n=>{const c=G.clubs.find(x=>x.name===n);return c?c.id:null};
  startCareer(idOf(START),'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const log=[];
  const xiLocal=(c,f)=>{const slots=slotsOf(f),wn=wantsOf(f),used=new Set();let t=0;slots.forEach((sl,i)=>{const id=bestForSlot(c.squad,sl,used,c.phil,wn[i]);if(id!=null){used.add(id);t+=slotScore(P(id),sl,c.phil,wn[i])}});return t};
  const medOvr=()=>{const L=G.clubs.filter(c=>c.div===userClub().div).map(c=>c.squad.slice(0,11).map(i=>P(i).ovr).reduce((a,x)=>a+x,0)/11).sort((a,b)=>a-b);return L[Math.floor(L.length/2)]};
  const ativo=()=>{const c=userClub();
    let best=c.formation,bs=xiLocal(c,c.formation);
    for(const f of Object.keys(FORMS)){const s=xiLocal(c,f);if(s>bs+5){bs=s;best=f}}
    if(best!==c.formation){c.formation=best;}
    const my=c.squad.slice(0,11).map(i=>P(i).ovr).reduce((a,x)=>a+x,0)/11;const md=medOvr();
    c.style=my>=md+3?'Ofensivo':my<=md-3?'Contra-ataque':'Equilibrado';
    autoPick(c);};
  let g=0;
  const playSeason=()=>{let out;let rounds=0;
    while(rounds++<200){
      if(MODE==='auto'){if(G.round%6===3)autoPick(userClub())}else ativo();
      startRound();while(!roundDone())stepAll();out=finishRound();
      if(out==='fired'||out==='seasonEnd')break}
    return out};
  for(let s=0;s<+SEAS;s++){
    if(s===0&&EMI){ // duas rodadas no clube de origem, depois muda de país (como o bot)
      for(let k=0;k<2;k++){if(MODE==='auto'){if(G.round%6===3)autoPick(userClub())}else ativo();startRound();while(!roundDone())stepAll();finishRound()}
      const [pk,cn]=EMI.split(':');const W=wd();let lc=null;for(const k in W.lg){if(k!==pk)continue;lc=W.lg[k].cl.find(c=>c.n===cn)}
      const ok=lc?emigrate(lc.id):false;log.push({emigrou:ok,para:cn});
    }
    const out=playSeason();
    const c=userClub();const sm=G.summary||{};
    const xi=c.squad.slice(0,11).map(i=>P(i));
    log.push({temp:G.season,clube:c.name,div:c.div,pos:posOf(c),P:c.P,GP:c.GP,GC:c.GC,V:c.V,E:c.E,D:c.D,
      formacao:c.formation,estilo:c.style,ovrXI:+(xi.reduce((a,p)=>a+p.ovr,0)/11).toFixed(1),
      energiaMedia:+(xi.reduce((a,p)=>a+p.en,0)/11).toFixed(0),lesionadosXI:xi.filter(p=>p.inj>0).length,
      caixa:+G.fin.caixa.toFixed(1),conf:+G.board.conf.toFixed(0),saida:out});
    if(out==='fired'){const of=fireOffers();if(of&&of.length)takeJob(of[0]);else{log.push({sem:'sem propostas, fim'});break}}
    if(!G.summary||G.summary.season!==G.season){endSeason()}
    newSeason();G.phase='play';S.modal=null;
  }
  return log;
},{MODE,START,SEAS:+SEAS,EMI});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

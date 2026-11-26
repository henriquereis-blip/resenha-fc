// v140: testa o seletor de liga: começa carreira em clube de vários países e joga uma rodada. Uso: node tools/sim/exp_ligas.js
const {open}=require('./setup_common');
(async()=>{const {b,p,errs}=await open();
for(const [k,nome] of [['ENG','Arsenal'],['ESP','Girona'],['JPN',null],['ARG',null],['USA',null]]){
 await p.reload();await p.waitForTimeout(300);
 const r=await p.evaluate(([k,nome])=>{localStorage.clear();S.mg=mgNew('equil');S.step='club';S.cl=k;S.coachName='Teste';
  const v1=vClubStep().length;const W=wd();const L=W.lg[k].cl.slice().sort((a,b)=>b.r-a.r);const x=(nome&&L.find(c=>c.n===nome))||L[Math.floor(L.length/2)];
  A.pickfclub({id:x.id});const v2=vPreview().length;S.sp=PHILS[0][0];S.asst=asstCandidates(S.sp);
  S.step='setup';const v3=vSetup().length;
  S.obj=objOptions(C(S.sc))[1].id;S.sa=0;
  startCareer(S.sc,'Teste',S.sp,S.asst&&S.asst[0]);ex();G.phase='play';S.modal=null;
  let g=0,o;while(g++<3){startRound();while(!roundDone())stepAll();o=finishRound()}
  const c=userClub();return {pais:k,esperado:x.n,clube:c.name,abroad:G.abroad&&G.abroad.k,div:c.div,phil:c.phil,rodada:G.round,v:[v1,v2,v3]}},[k,nome]);
 console.log(JSON.stringify(r))}
console.log(errs.slice(0,3));await b.close()})();

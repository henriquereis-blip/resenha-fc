// v139: mede o efeito dos modificadores de torcida (ext100). Uso: node tools/sim/exp_torcida.js [temporadas por clube]
// 1) teste de venda de ídolo; 2) humor ao longo de temporadas completas com e sem os modificadores de jogo (casa e sequência).
const {open}=require('./setup_common');
const N=+process.argv[2]||2,CL=['Palmeiras','Flamengo','Vasco','Bahia','Coritiba','Chapecoense'];
(async()=>{const {b,p,errs}=await open();
const venda=await p.evaluate(()=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  startCareer(G.clubs.find(c=>c.name==='Palmeiras').id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const c=userClub(),L=c.squad.map(P).sort((a,b)=>favOf(b)-favOf(a));const out=[];
  for(const [lab,pl] of [['mais amado',L[0]],['10º',L[9]],['último',L[L.length-1]]]){const h=c.humor,cf=G.board.conf;fanSale100(pl,c,false);out.push({lab,nome:pl.name,fav:favOf(pl),base:!!pl.fromBase,dHumor:c.humor-h,dConf:+(G.board.conf-cf).toFixed(1)});c.humor=h;G.board.conf=cf}
  return out});
console.log('VENDA',JSON.stringify(venda));
const res={};
for(const off of [true,false]){res[off?'sem':'com']=[];
 for(const cl of CL)for(let k=0;k<N;k++){
  await p.reload();await p.waitForTimeout(300);
  const r=await p.evaluate(({cl,off})=>{globalThis.FAN100_OFF=off;localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
    startCareer(G.clubs.find(c=>c.name===cl).id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
    const h=[];let g=0,o,exo=0;while(g++<80){startRound();while(!roundDone())stepAll();o=finishRound();h.push(userClub().humor);if(G.mk&&G.mk.exo.active)exo++;if(o==='seasonEnd'||o==='fired')break}
    return {media:h.reduce((a,x)=>a+x,0)/h.length,min:Math.min(...h),max:Math.max(...h),exo:exo}},{cl,off});
  res[off?'sem':'com'].push(r)}}
const f=a=>({media:+(a.reduce((s,x)=>s+x.media,0)/a.length).toFixed(1),min:+(a.reduce((s,x)=>s+x.min,0)/a.length).toFixed(1),max:+(a.reduce((s,x)=>s+x.max,0)/a.length).toFixed(1),rodadasExodo:+(a.reduce((s,x)=>s+x.exo,0)/a.length).toFixed(1),n:a.length});
console.log('SEM modificadores',JSON.stringify(f(res.sem)));console.log('COM modificadores',JSON.stringify(f(res.com)));
console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

// Uma carreira nova (elenco e adversários sorteados), testando formação (todas), estilo (5) e filosofia (6)
// contra dois adversários (um médio e um forte). Restaura o estado do jogador após cada partida.
const {open}=require('./setup_common');
const N=+(process.argv[2]||600);const TAG=process.argv[3]||'x';
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({N,TAG})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const byName=n=>G.clubs.find(c=>c.name===n);
  const pool=G.clubs.filter(c=>c.div===1);const userC=pool[(+TAG*7)%pool.length];
  startCareer(userC.id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const U=userClub();
  const oppsAll=G.clubs.filter(c=>c.div===0&&c.id!==U.id);
  const mid=oppsAll[(+TAG*3)%oppsAll.length], top=oppsAll.slice().sort((a,b)=>b.ovr-a.ovr||0)[0];
  const playMatch=(H,A)=>{const snap=[...H.squad,...A.squad].map(i=>[i,JSON.stringify(P(i))]);const m=newMatch(H,A);while(!m.done)stepMinute(m);for(const [i,s] of snap)Object.assign(P(i),JSON.parse(s));return m};
  const play=(opp,n)=>{let W=0,D=0,L=0,gf=0,ga=0;for(let i=0;i<n;i++){const home=i%2===0;const m=home?playMatch(U,opp):playMatch(opp,U);const uf=home?m.hg:m.ag,ua=home?m.ag:m.hg;gf+=uf;ga+=ua;if(uf>ua)W++;else if(uf===ua)D++;else L++}return {pts:+((3*W+D)/n).toFixed(3),gf:+(gf/n).toFixed(2),ga:+(ga/n).toFixed(2)}};
  const xiOvr=c=>+(c.squad.slice(0,11).map(i=>P(i).ovr).reduce((a,x)=>a+x,0)/11).toFixed(1);
  const out={tag:TAG,user:U.name,userOvr:xiOvr(U),mid:mid.name,midOvr:xiOvr(mid),top:top.name,topOvr:xiOvr(top),forms:[],styles:[],phils:[]};
  const baseF=U.formation,baseS=U.style,baseP=U.phil;
  for(const f of Object.keys(FORMS)){U.formation=f;U.fam={s:{},f:{}};autoPick(U);
    out.forms.push({f,mid:play(mid,N),top:play(top,N)})}
  U.formation=baseF;autoPick(U);
  for(const s of STYLES){U.style=s;U.fam={s:{},f:{}};out.styles.push({s,mid:play(mid,N),top:play(top,N)})}
  U.style=baseS;
  for(const ph of PHN){U.phil=ph;autoPick(U);out.phils.push({ph,mid:play(mid,N),top:play(top,N)})}
  return out;
},{N,TAG});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

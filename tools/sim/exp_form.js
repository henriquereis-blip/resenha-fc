// Formações: N partidas por formação e por adversário; campo sempre o mesmo elenco (autoPick em cada formação).
const {open}=require('./setup_common');
const N=+(process.argv[2]||1500);
const USER=process.argv[3]||'Juventude';
const OPPS=(process.argv[4]||'Fortaleza,Ceará,Sport').split(',');
(async()=>{const {b,p,errs}=await open();
const res=await p.evaluate(({N,USER,OPPS})=>{
  localStorage.clear();S.mg=mgNew('equil');S.obj='equ';
  const byName=n=>G.clubs.find(c=>c.name===n);
  startCareer(byName(USER).id,'Teste','Direto',null);ex();G.phase='play';S.modal=null;
  const U=userClub();
  const xiLocal=(c,f)=>{const slots=slotsOf(f),wn=wantsOf(f),used=new Set();let t=0;slots.forEach((sl,i)=>{const id=bestForSlot(c.squad,sl,used,c.phil,wn[i]);if(id!=null){used.add(id);t+=slotScore(P(id),sl,c.phil,wn[i])}});return t};
  const playMatch=(H,A)=>{const snap=[...H.squad,...A.squad].map(i=>[i,JSON.stringify(P(i))]);const m=newMatch(H,A);while(!m.done)stepMinute(m);for(const [i,s] of snap)Object.assign(P(i),JSON.parse(s));return m};
  const play=(hc,ac,n)=>{let W=0,D=0,L=0,gf=0,ga=0;
    for(let i=0;i<n;i++){const home=i%2===0;const H=home?hc:ac,A=home?ac:hc;
      const m=playMatch(H,A);
      const uf=home?m.hg:m.ag,ua=home?m.ag:m.hg;gf+=uf;ga+=ua;
      if(uf>ua)W++;else if(uf===ua)D++;else L++}
    return {n,W,D,L,gf,ga}};
  const forms=Object.keys(FORMS);const out={user:{name:U.name,phil:U.phil,style:U.style,ovr:+(U.squad.slice(0,11).map(id=>P(id).ovr).reduce((a,x)=>a+x,0)/11).toFixed(1)},rows:[]};
  for(const f of forms){
    U.formation=f;U.fam={s:{},f:{}};U.squad=U.squad.slice();autoPick(U);
    const row={f,xi:+xiLocal(U,f).toFixed(1),per:[]};
    for(const on of OPPS){const opp=byName(on);
      // campo sempre com o mesmo estilo/filosofia padrão do clube
      const r=play(U,opp,N);row.per.push({opp:on,...r})}
    out.rows.push(row);
  }
  return out;
},{N,USER,OPPS});
console.log(JSON.stringify(res));console.log('ERR '+JSON.stringify(errs.slice(0,3)));await b.close()})();

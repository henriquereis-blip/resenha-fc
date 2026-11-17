const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const tune=JSON.parse(process.argv[2]||'{}');const W=+process.argv[3]||6;
function sp(a,b){const n=a.length;const rk=x=>{const s=x.map((v,i)=>[v,i]).sort((p,q)=>p[0]-q[0]);const r=[];s.forEach(([v,i],k)=>r[i]=k+1);return r};const ra=rk(a),rb=rk(b);let d=0;for(let i=0;i<n;i++)d+=(ra[i]-rb[i])**2;return 1-6*d/(n*(n*n-1))}
const agg={champ:[],second:[],fourth:[],tenth:[],last:[],gpg:[],H:[],D:[],A:[],yc:[],rc:[],pen:[],corr:[],zz:[],big:[],topfirst:[]};
for(let w0=0;w0<W;w0++){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
 const w=dom.window;
 const r=JSON.parse(w.eval(`(function(){Object.assign(TUNE,${JSON.stringify(tune)});const c=G.clubs.find(x=>x.sig==='COR');S.obj='equ';startCareer(c.id,'T','Posse',asstCandidates('Posse')[0]);ex();
  const str=G.clubs.map(x=>[x.sig,strength(x)]);let hw=0,dw=0,aw=0,goals=0,n=0,yc=0,rc=0,pen=0,zz=0,big=0;
  for(let r=0;r<38;r++){ex();if(!G.sponsor)G.sponsor=sponsorOffers()[0];startRound();while(!roundDone())stepAll();
   for(const m of R.ms){n++;goals+=m.hg+m.ag;if(m.hg>m.ag)hw++;else if(m.hg===m.ag)dw++;else aw++;if(m.hg+m.ag===0)zz++;if(m.hg+m.ag>=5)big++;for(const e of m.ev){if(e.type==='yellow')yc++;if(e.type==='red')rc++;if(e.pen)pen++}}
   finishRound();if(G.round>=38)break}
  const t=tableRows();const pos=Object.fromEntries(t.map((x,i)=>[x.sig,i+1]));
  return JSON.stringify({pts:t.map(x=>x.P),str,pos,hw,dw,aw,goals,n,yc,rc,pen,zz,big,topfirst:str.slice().sort((a,b)=>b[1]-a[1])[0][0]===t[0].sig||str.slice().sort((a,b)=>b[1]-a[1])[1][0]===t[0].sig})})()`));
 agg.champ.push(r.pts[0]);agg.second.push(r.pts[1]);agg.fourth.push(r.pts[3]);agg.tenth.push(r.pts[9]);agg.last.push(r.pts[19]);
 agg.gpg.push(r.goals/r.n);agg.H.push(r.hw/r.n);agg.D.push(r.dw/r.n);agg.A.push(r.aw/r.n);agg.yc.push(r.yc/r.n);agg.rc.push(r.rc/r.n);agg.pen.push(r.pen/r.n);agg.zz.push(r.zz/r.n);agg.big.push(r.big/r.n);agg.topfirst.push(r.topfirst?1:0);
 agg.corr.push(sp(r.str.map(x=>-x[1]),r.str.map(x=>r.pos[x[0]])));
}
const m=a=>(a.reduce((x,y)=>x+y,0)/a.length);
console.log(JSON.stringify(Object.fromEntries(Object.entries(agg).map(([k,v])=>[k,+(['H','D','A','zz','big'].includes(k)?m(v)*100:m(v)).toFixed(2)]))));
process.exit(0)

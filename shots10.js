// teste completo: 10 temporadas pelo caminho da UI, 3+ trocas de clube, varredura de telas, erros, NaN, métricas
const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const [sig0,obj0,NS,out]=[process.argv[2]||'SAN',process.argv[3]||'equ',+process.argv[4]||10,process.argv[5]||'/tmp/full10.json'];
const errs=[];const bad=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.addEventListener('error',e=>errs.push(e.message+' @'+e.lineno));const ce=w.console.error;w.console.error=(...a)=>{errs.push('console.error '+a.map(x=>x&&x.message||String(x)).join(' ').slice(0,200))}}});
const w=dom.window,d=w.document;
const ev=s=>w.eval(s);
let clicks=0,perSeason=0;
const click=sel=>{const e=d.querySelector(sel);if(!e)throw new Error('no '+sel+' @ '+d.body.textContent.slice(0,120));clicks++;perSeason++;e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}))};
const A=(a,x='')=>click(`[data-a="${a}"]${x}`);
const has=a=>!!d.querySelector(`[data-a="${a}"]`);
const scan=(tag)=>{const t=d.querySelector('#app').textContent;const m=t.match(/NaN|undefined|Infinity|\[object|null\b/);if(m)bad.push(tag+': '+m[0]+' …'+t.slice(Math.max(0,t.indexOf(m[0])-60),t.indexOf(m[0])+40).replace(/\s+/g,' '))};
const NAV=['inicio','tatica','agenda','liga','dir','medico','treino','vest','assist','meutec','marketing','torcida','estadio','base','times','mercado','tecnicos','historia','opcoes','conquistas','clube'];
let r9=0;const monkey=(tag)=>{r9++;
  for(const v of NAV){const b=d.querySelector(`[data-a="nav"][data-v="${v}"]`);if(!b)continue;A('nav',`[data-v="${v}"]`);scan(tag+'/'+v);if(v==='assist'&&has('tipgo')){A('tipgo');scan(tag+'/tip')}if(v==='vest'&&has('confix')){A('confix','[data-how="conv"]');scan(tag+'/conf')}if(v==='treino'&&r9%2===0)A('trnfoc',`[data-k="${['estilo','forma','fisico','tecnica'][r9%4]}"]`)}
  A('nav','[data-v="inicio"]');
  if(has('paper')){A('paper');scan(tag+'/jornal');A('back')}
};
const id0=ev(`G.clubs.find(c=>c.sig==='${sig0}').id`);
A('newgame');d.querySelector('#coach').value='Teste';d.querySelector('#coach').dispatchEvent(new w.Event('input',{bubbles:true}));
A('step','[data-v="club"]');{const dv=ev(`G.clubs[${id0}].div`);if(dv)A('cdiv',`[data-v="${dv}"]`);}A('pickclub',`[data-id="${id0}"]`);A('cpvt','[data-v="sq"]');A('step','[data-v="setup"]');A('pickphil');A('pickasst');A('pickobj',`[data-o="${obj0}"]`);A('begin');A("spnpick");A("spnmode");
const PRE=`(function(){if(G.round%8!==0&&G.round>0){autoPick(userClub());return 'keep'}const c=userClub(),fx=G.fixtures[G.round][userFixtureIdx()],home=fx[0]===c.id,opp=C(fx[0]===c.id?fx[1]:fx[0]);
 const dd=strength(c)-strength(opp)+(home?1.5:-1.5);let f,st,mk;
 if(dd>=3){f='4-3-3';st='Ofensivo';mk='Leve'}else if(dd>=-2){f='4-4-2';st='Equilibrado';mk='Leve'}else if(dd>=-6){f='4-5-1';st='Contra-ataque';mk='Pesada'}else{f='5-4-1';st='Defensivo';mk='Muito pesada'}
 c.formation=f;c.style=st;c.mark=mk;c.focus=(f==='4-3-3')?'Pelas laterais':'Pelo meio';autoPick(c);return f})()`;
const MID=min=>`(function(){const m=R.ms[R.ui],k=userSide(m),s=m[k];while(m.min<${min}&&!m.done)stepAll();if(m.done)return 'done';
 const gf=k==='h'?m.hg:m.ag,ga=k==='h'?m.ag:m.hg;const dif=gf-ga;
 let n=0;const idx=s.lineup.map((id,i)=>[id,i]).filter(([id,i])=>s.slots[i]!=='GK'&&!s.sent.includes(id)).sort((a,b)=>(m.en[a[0]]??P(a[0]).en)-(m.en[b[0]]??P(b[0]).en));
 for(const [id,i] of idx){if(n>=2||s.subs>=5)break;const en=m.en[id]??P(id).en;if(en>=55&&!(P(id).inj>0))continue;
  const g=P(id).pos;const cand=s.bench.filter(b=>P(b).pos===g&&P(b).inj===0).sort((a,b)=>P(b).ovr-P(a).ovr)[0];if(cand&&subPlayer(m,k,id,cand))n++}
 return n})()`;

const SNAPX=`JSON.stringify((function(){const out={divs:[]};
 for(let dv=0;dv<4;dv++){const t=tableRows(dv);const L=Object.values(G.players).filter(p=>p.club>=0&&G.clubs[p.club].div===dv);
  const sc=L.filter(p=>p.goals>0).sort((a,b)=>b.goals-a.goals||a.games-b.games).slice(0,5).map(p=>({n:p.name,c:G.clubs[p.club].sig,g:p.goals,j:p.games,pos:p.pos,age:p.age,ovr:p.ovr}));
  const as=L.filter(p=>p.ast>0).sort((a,b)=>b.ast-a.ast).slice(0,3).map(p=>({n:p.name,c:G.clubs[p.club].sig,a:p.ast}));
  const rt=L.filter(p=>p.rn>=15).sort((a,b)=>b.rsum/b.rn-a.rsum/a.rn).slice(0,3).map(p=>({n:p.name,c:G.clubs[p.club].sig,r:+(p.rsum/p.rn).toFixed(2),pos:p.pos}));
  const gkw=L.filter(p=>p.pos==='GOL'&&p.goals>0).map(p=>({n:p.name,g:p.goals}));
  out.divs.push({dv,tab:t.map(c=>[c.sig,c.P,c.V,c.E,c.D,c.GP,c.GC]),sc,as,rt,gkw,
   cards:L.reduce((a,p)=>a+p.yc,0),reds:L.reduce((a,p)=>a+p.rc,0),goalsTot:t.reduce((a,c)=>a+c.GP,0),games:t.reduce((a,c)=>a+c.V+c.E+c.D,0)/2});}
 const H=G.h2h.filter(x=>x[0]===G.season);
 out.big=H.map(x=>({m:Math.abs(x[4]-x[5]),t:x[4]+x[5],h:C(x[2]).sig,a:C(x[3]).sig,hg:x[4],ag:x[5]})).sort((a,b)=>b.m-a.m||b.t-a.t).slice(0,3);
 out.hi=H.map(x=>({t:x[4]+x[5],h:C(x[2]).sig,a:C(x[3]).sig,hg:x[4],ag:x[5]})).sort((a,b)=>b.t-a.t).slice(0,2);
 out.nh=H.length;
 const all=Object.values(G.players);out.topOvr=all.sort((a,b)=>b.ovr-a.ovr).slice(0,3).map(p=>({n:p.name,o:p.ovr,a:p.age,pos:p.pos,c:p.club>=0?G.clubs[p.club].sig:'-'}));
 out.coach=coachRank('geral').slice(0,5).map(x=>({n:x.name,c:x.sig,V:x.V,E:x.E,D:x.D,t:x.titles,tot:x.tot}));
 out.champsAll=G.champs.slice(-1)[0]||null;
 return out})())`;
const seasons=[];let sdone=0,guard=0,switches=0,lastSwitch=0;const switchAt=new Set([3,6,8]);
const T0=Date.now();
const snap=()=>JSON.parse(ev(`JSON.stringify((function(){const u=userClub(),t=tableRows();const hurt=u.squad.filter(id=>P(id).inj>0).length;
 return {club:u.sig,pos:posOf(u),pts:u.P,meta:G.board.meta,conf:+G.board.conf.toFixed(1),caixa:+G.fin.caixa.toFixed(1),debt:+u.debt.toFixed(1),humor:u.humor,pat:G.pat,
 goals:G.goals.list.map(x=>x.k),med:G.med.season,medLv:[G.med.doc,G.med.fisio,G.med.prep],pres:G.el.pres.pf,champ:t[0].sig,squad:u.squad.length,
 inj:G.clubs.map(c=>c.squad.filter(id=>P(id).inj>0).length).reduce((a,b)=>a+b,0)/20,ovrTop:Math.max(...Object.values(G.players).map(p=>p.ovr)),
 goalsTot:t.reduce((s,c)=>s+c.GP,0)/380}})())`));
const injLog={sum:0,n:0,max:0};
while(sdone<NS&&guard++<6000){
  if(has('newseason')){
    const s=snap();try{s.X=JSON.parse(ev(SNAPX))}catch(e){s.Xerr=String(e)}s.clicks=perSeason;s.secs=Math.round((Date.now()-T0)/1000);seasons.push(s);sdone++;perSeason=0;
    // pegar propostas de outros clubes se houver
    if(sdone>=NS)break;
    A('newseason');
    if(switchAt.has(sdone)&&switches<3){if(has('spnpick')){A('spnpick');A('spnmode')}A('nav','[data-v="dir"]');scan('dir/pre-leave');A('leave');scan('leave modal');const offs=d.querySelectorAll('[data-a="takejob"]');if(offs.length){click(offs[offs.length-1]?`[data-a="takejob"][data-id="${offs[offs.length-1].dataset.id}"]`:'x');switches++;lastSwitch=sdone}}
    continue}
  if(has('spnpick')){A('spnpick');A('spnmode');scan('spon');continue}
  if(has('takejob')){const o=d.querySelectorAll('[data-a="takejob"]');click(`[data-a="takejob"][data-id="${o[0].dataset.id}"]`);switches++;continue}
  if(has('firedgo')){A('firedgo');scan('firedgo');continue}
  if(has('roundok')){A('roundok');continue}
  if(has('mend')){A('mend');continue}
  if(has('play')){
    const r=ev('G.round');
    if(r%9===0)monkey('S'+(sdone+1)+'R'+r);
    if(has('press')){A('press','[data-i="0"]')}
    ev(PRE);
    A('play');ev('clearInterval(S.timer)');
    ev(MID(45));ev(MID(70));
    A('mskip');continue}
  throw new Error('stuck '+d.body.textContent.slice(0,200));
}
const final=JSON.parse(ev(`JSON.stringify({el:G.el,goalsHist:G.goals.hist.map(h=>({s:h.s,pos:h.pos,met:h.met,l:h.list.map(x=>x.k+(x.ok?'+':'-')).join(' ')})),players:Object.keys(G.players).length,clubs:G.clubs.map(c=>[c.sig,c.div,c.rep,+(c.caixa||0).toFixed(0),+(c.debt||0).toFixed(0)]),medHist:G.med.hist.length,uc:G.uc,xfers:G.xfers.length})`));


fs.mkdirSync('/tmp/views',{recursive:true});
ev(`S.modal=null;G.phase='play'`);
const VW=[['historia','camp'],['historia','rank'],['historia','bola'],['historia','tda'],['tecnicos',null],['conquistas',null],['liga',null],['times',null]];
let vi=0;for(const [v,hs] of VW){try{ev(`G.view='${v}';${hs?`S.hs='${hs}';`:''}S.modal=null;render()`);
 const c=d.cloneNode(true);c.querySelectorAll('script').forEach(x=>x.remove());fs.writeFileSync('/tmp/views/'+(++vi)+'_'+v+(hs?'_'+hs:'')+'.html','<!doctype html>'+c.documentElement.outerHTML);}catch(e){console.log('view fail',v,e.message)}}
let FX={};try{FX=JSON.parse(ev(`JSON.stringify({champs:G.champs,toty:G.toty.map(t=>({s:t.s,xi:(t.xi||[]).map(p=>p&&p.p?p.p.name:null)})),coach:coachRank('geral').slice(0,15).map(x=>({n:x.name,c:x.sig,V:x.V,E:x.E,D:x.D,t:x.titles,res:x.res,imp:x.imp,cri:x.cri,tat:x.tat,tot:x.tot,me:x.me})),tro:G.clubs.slice(0,20).map(c=>[c.sig,c.tro])})`))}catch(e){FX={err:String(e)}}
fs.writeFileSync(out,JSON.stringify({FX,seasons,final,errs:[...new Set(errs)].slice(0,20),bad:[...new Set(bad)].slice(0,30),switches,clicks,secs:Math.round((Date.now()-T0)/1000)},null,1));
console.log('seasons',seasons.length,'switches',switches,'errs',errs.length,'bad',bad.length,'clicks',clicks);process.exit(0);

/* ext69 (v89): sigla do escudo sempre com 3 letras; Times > Internacionais (elenco de clubes de fora, estimado pela força) */
(function(){
/* ---------- 1) escudo: sempre 3 letras a partir do nome ---------- */
function sig3(nm){
  const raw=String(nm||'').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/\([A-Z]{3}\)/g,'');
  const w=raw.replace(/^(Al[- ]|FC |CF |SC |AC |AS |CD |CA |Real |Club |Atletico |Deportivo |Deportes |Sporting |Racing |Santiago |Universidad de |Union |AFC |St\. )/i,'').replace(/[^A-Za-z]/g,'').toUpperCase();
  return (w+'XXX').slice(0,3);
}
globalThis.sig3=sig3;
const _cr69=crest;
crest=function(c,s){
  try{if(c&&!/^[A-Z]{3}$/.test(c.sig||'')){c=Object.assign({},c,{sig:sig3(c.name||c.n)})}}catch(e){}
  return _cr69.call(this,c,s);
};

/* ---------- 2) elenco estimado de clube de fora ---------- */
function rng(seed){let a=seed>>>0;return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function wSquad69(k,lc){
  const W=G.wd;W.sq=W.sq||{};
  const cached=W.sq[lc.id];if(cached&&cached.s===G.season&&cached.r===Math.round(lc.r))return cached.l;
  /* clube que o usuário já "naturalizou" (carreira no exterior): usa o elenco de verdade */
  const real=G.clubs.find(c=>c.name===lc.n&&c.squad&&c.squad.length>=18&&c.id>=brn());
  const RR=(typeof real73==='function')?real73(lc.n):null;
  let l;
  if(RR&&!real){l=RR.map(r=>({n:r.n,role:r.role,age:r.age,ovr:r.ovr,nat:r.nat,real:true}))}
  else if(real){l=real.squad.map(id=>{const p=P(id);return {n:p.name,role:p.role,age:p.age,ovr:p.ovr,nat:p.nat||k,real:p.real}})}
  else{
    const R=rng(wHash(lc.n)*7+G.season*131),g=()=>{let u=0,v=0;while(!u)u=R();v=R();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
    const rp=lc.r,bo=rp>=66?66+(rp-66)*0.5:rp;
    const nmk=NMP[k]||NMP.BRA||Object.values(NMP)[0];
    const ri2=(a,b)=>a+Math.floor(R()*(b-a+1));
    l=[];const used=new Set();
    for(const role in PLAN){
      const nst={GOL:1,ZAG:2,LAT:2,VOL:2,MEI:2,PNT:2,ATA:2}[role];
      for(let i=0;i<PLAN[role];i++){
        let nat=k;if(R()>.74){const ks=Object.keys(NMP);nat=ks[ri2(0,ks.length-1)]}
        const nm=NMP[nat]||nmk;let name='';
        for(let t=0;t<20;t++){name=nm[0][ri2(0,nm[0].length-1)]+' '+nm[1][ri2(0,nm[1].length-1)];if(!used.has(name))break}
        used.add(name);
        l.push({n:name,role,age:Math.max(18,Math.min(37,Math.round(26+g()*5))),ovr:Math.max(42,Math.min(92,Math.round(bo+(i<nst?2.5:-6)+g()*3.6))),nat,real:false});
      }
    }
    /* craques reais que jogam nesse clube entram no lugar do melhor gerado da posição */
    try{for(const s of STARS57){
      if(s[2]!==lc.n)continue;
      const cand=l.filter(x=>x.role===s[1]&&!x.real).sort((a,b)=>b.ovr-a.ovr)[0];
      const it={n:s[0],role:s[1],age:s[4],ovr:s[3],nat:s[5],real:true};
      if(cand)l[l.indexOf(cand)]=it;else l.push(it)}}catch(e){}
  }
  const ord={GOL:0,ZAG:1,LAT:2,VOL:3,MEI:4,PNT:5,ATA:6};
  l.sort((a,b)=>ord[a.role]-ord[b.role]||b.ovr-a.ovr);
  W.sq[lc.id]={s:G.season,r:Math.round(lc.r),l};
  return l;
}
function findWT(){
  const s=S.wt;if(!s)return null;
  const L=G.wd&&G.wd.lg[s.k];if(!L)return null;
  const lc=L.cl.find(c=>c.id===s.id);return lc?{k:s.k,L,lc}:null;
}
function wtView(){
  const f=findWT();if(!f){S.wt=null;return null}
  const {k,lc}=f,meta=WLD.find(x=>x.k===k)||{};
  const sq=wSquad69(k,lc);const isR=typeof real73==='function'&&!!real73(lc.n);
  const val=sq.reduce((s,p)=>s+valueOf(p),0);
  const pos=f.L.cl.slice().sort((a,b)=>(b.P||0)-(a.P||0)||(b.GP-b.GC)-(a.GP-a.GC)).findIndex(c=>c.id===lc.id)+1;
  const rows=sq.map(p=>`<div class="prow"><span class="pos">${ROLEABB[p.role]}</span><span class="nm">${esc(p.n)}${p.real&&!isR?'*':''}<small>${mi(valueOf(p))} · ${esc(p.nat||k)}</small></span><span class="age">${p.age}</span><span class="ovr">${p.ovr}</span><span></span></div>`).join('');
  return `<div class="wrap"><button class="back" data-a="wtclose">‹ Times</button><div class="card pf">${crest(lc,48)}<div class="pfi"><h3>${esc(lc.n)}</h3><div class="k">${meta.f||''} ${esc(meta.n||k)} · ${pos}º · força ${lc.r.toFixed(0)} · elenco ${mi(val)}</div></div></div><div class="plist">${rows}</div><p class="foot">${isR?'Elenco real da base de dados (posição da janela de jul/2026). Overalls próprios do jogo.':'Elenco estimado pela força do clube (craques reais marcados com *). Muda a cada temporada.'}</p></div>`;
}
const _vt69=vTimes;
vTimes=function(){
  if(S.wt){const v=wtView();if(v)return v}
  let h=_vt69.apply(this,arguments);
  try{
    if(S.team===null&&G.wd&&G.wd.lg){
      const mk=`<div class="folder" style="opacity:.45">📁 Internacionais (em breve)</div>`;
      let w=`<button class="folder" data-a="tree" data-k="world">${S.open.world?'📂':'📁'} 🌍 Internacionais</button>`;
      if(S.open.world){
        for(const L of WLD){
          if(L.k==='SEL'||!G.wd.lg[L.k])continue;
          w+=`<button class="folder sub" data-a="tree" data-k="w_${L.k}">${S.open['w_'+L.k]?'📂':'📁'} ${L.f||''} ${esc(L.n)}</button>`;
          if(S.open['w_'+L.k])w+=G.wd.lg[L.k].cl.slice().sort((a,b)=>b.r-a.r).map(c=>`<button class="folder sub2" data-a="wtopen" data-k="${L.k}" data-id="${c.id}">${crest(c,16)} ${esc(c.n)}</button>`).join('');
        }
      }
      h=h.replace(mk,w);
    }
  }catch(e){}
  return h;
};
Object.assign(A,{
  wtopen(d){S.wt={k:d.k,id:+d.id};render();window.scrollTo(0,0)},
  wtclose(){S.wt=null;render()}
});
const _tr69=A.tree;
A.tree=function(d){if(d&&d.k==='close')S.wt=null;return _tr69.apply(this,arguments)};
})();

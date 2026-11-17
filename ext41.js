/* ===== v38: ranking de técnicos com País / Liga / Mundial de verdade ===== */
(function(){
  const _cr=coachRank;
  function hN(s){let h=7;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}
  function coB(W,c,k){W.co=W.co||{};let o=W.co[c.id];if(!o){const pool=(typeof NMP!=='undefined'&&NMP[k])||NMP.ENG||NMP[Object.keys(NMP)[0]];
    o=W.co[c.id]={name:pool[0][hN(c.n)%pool[0].length]+' '+pool[1][hN(c.n+'x')%pool[1].length],V:0,E:0,D:0,titles:0,res:0}}return o}
  function lgW(W,k){const cl=W.lg[k].cl;const avg=cl.reduce((s,c)=>s+(c.b||70),0)/cl.length;return Math.max(.55,Math.min(1.05,avg/78))}
  /* no fim da temporada soma os resultados reais do servidor na carreira do técnico de cada clube */
  const _we=wEnd;
  wEnd=function(){
    const W=wd();const was=W&&W.es===G.season;
    _we.apply(this,arguments);
    try{if(!was&&W.xp41!==G.season){W.xp41=G.season;
      const rec=W.hist[W.hist.length-1]||{};
      for(const k in W.lg){const w=lgW(W,k),T=wTable(k);
        T.forEach((c,i)=>{const o=coB(W,c,k);o.V+=c.V;o.E+=c.E;o.D+=c.D;o.res=+(o.res+((3*c.V+c.E)+(i<4?15:0)+(rec.cp&&rec.cp[k]===c.n?60:0))*w).toFixed(1);if(rec.cp&&rec.cp[k]===c.n)o.titles++})}}}catch(e){console.error('co41 '+e.message)}
  };
  function foreign(L){
    const out=[];let W;try{W=wd()}catch(e){return out}
    if(!W||!W.lg)return out;
    const top=L.slice(0,12);const avg=k=>top.length?top.reduce((s,x)=>s+(x[k]||0),0)/top.length:0;
    const r0=avg('res')||1;const R={imp:avg('impC')/r0,cri:avg('criC')/r0,tat:avg('tatC')/r0};
    for(const w0 of (typeof WLD!=='undefined'?WLD:[])){
      const k=w0.k,lg=W.lg[k];if(!lg)continue;const w=lgW(W,k);
      for(const c of lg.cl){
        const o0=coB(W,c,k);
        const res=+(o0.res+(3*c.V+c.E)*w).toFixed(1);
        const o={name:w0.f+' '+o0.name,club:c.n,sig:c.sig||c.sg,id:-1,V:o0.V+c.V,E:o0.E+c.E,D:o0.D+c.D,titles:o0.titles,res,me:false};
        o.imp=o.impC=+(res*R.imp).toFixed(1);o.cri=o.criC=+(res*R.cri).toFixed(1);o.tat=o.tatC=+(res*R.tat).toFixed(1);
        o.tot=+(o.res+o.impC*1.5+o.criC*1.5+o.tatC*2).toFixed(1);
        out.push(o);
      }
    }
    return out;
  }
  coachRank=function(kind='geral'){
    let L=_cr(kind);const sc=(typeof S!=='undefined'&&S.rs)||'pais';
    if(sc==='pais')return L;
    const key={geral:'tot',res:'res',imp:'imp',cri:'cri',tat:'tat'}[kind]||'tot';
    if(sc==='liga'){
      const ud=G.clubs[G.user]?G.clubs[G.user].div:0;
      return L.filter(x=>x.me||(G.clubs[x.id]&&G.clubs[x.id].div===ud));
    }
    const base=_cr('geral');
    const all=L.concat(foreign(base));
    return all.sort((a,b)=>b[key]-a[key]||b.tot-a.tot);
  };
  const _vt=vTecnicos;
  vTecnicos=function(){
    let h=_vt();
    try{
      const sc=S.rs||'pais';
      h=h.replace(/Hoje só existe a Série A, então País, Liga e Mundial mostram a mesma lista\./,
        sc==='pais'?'País: todos os técnicos do Brasil (4 divisões, com peso por divisão).':
        sc==='liga'?'Liga: só técnicos da sua divisão.':
        'Mundial: brasileiros + técnicos dos 13 países do jogo. Os estrangeiros acumulam os resultados reais das rodadas do servidor (você só não assiste), com peso pela força da liga; imprensa, crise e tática deles são proporcionais aos resultados.');
      if(sc==='mundo')h=h.replace(/<span class="tc">([^<]*) · ([A-Z0-9]{2,4})<\/span>/g,(m,n,s)=>m);
    }catch(e){}
    return h;
  };
})();

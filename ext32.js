/* ext32: menu de baixo com Voltar, técnicos da IA demitidos/contratados com pressão da diretoria e manchetes, ranking de técnicos justo */
function coachNew32(){const n=uniqCoachName32();return {name:n,pts:0,V:0,E:0,D:0,titles:0,imp:rnd(0,12),cri:rnd(-4,6),tat:rnd(0,12),hired:G.season}}
function uniqCoachName32(){const used=new Set(G.clubs.map(c=>c.coach&&c.coach.name));(G.cpool||[]).forEach(x=>used.add(x.co.name));let n;for(let i=0;i<30;i++){n=pick(FN)+' '+pick(LN);if(!used.has(n))break}return n}
function coachHire32(c){
  G.cpool=G.cpool||[];
  const cand=G.cpool.filter(x=>x.co&&x.out!==c.id).sort((a,b)=>(b.co.pts+b.co.titles*40)-(a.co.pts+a.co.titles*40));
  const want=c.trad>=75||c.rep>=72;
  let hire=null,from='mercado';
  if(cand.length&&(want?Math.random()<0.7:Math.random()<0.5)){const i=want?0:ri(0,Math.min(cand.length-1,3));hire=cand.splice(cand.indexOf(cand[i]),1)[0];G.cpool=G.cpool.filter(x=>x!==hire);hire=hire.co;from='desempregado'}
  if(!hire){hire=coachNew32();from='novo'}
  hire.hired=G.season;return {co:hire,from};
}
function coachFire32(c,why,off){
  const old=c.coach;if(!old)return;
  G.cpool=G.cpool||[];
  const h=coachHire32(c);
  G.cpool.push({co:old,out:c.id,since:G.season});if(G.cpool.length>14)G.cpool.shift();
  c.coach=h.co;c.ct=0;c.cp=-2.5;
  G.cfx=G.cfx||[];G.cfx.unshift({s:G.season,r:G.round,club:c.sig,div:c.div,old:old.name,nw:h.co.name,why,off:!!off});G.cfx=G.cfx.slice(0,300);
  G.cfc=G.cfc||{};G.cfc[c.id]=(G.cfc[c.id]||0)+1;
  const big=c.div<=1||c.trad>=60;
  if(big){
    const rec=h.from==='desempregado'?(h.co.titles?` Ele tem ${h.co.titles} título(s) no currículo.`:' Estava livre no mercado desde a última demissão.'):' Aposta da diretoria em nome novo.';
    paperLine(`${c.name} demite ${old.name} e anuncia ${h.co.name}`,`${why}.${rec}`);
  }
  if(c.id!==G.user&&G.rival&&0){}
}
function coachTick32(){
  if(!G||G.user==null)return;
  const rd=G.round;
  const byDiv=[0,1,2,3].map(d=>G.clubs.filter(c=>c.div===d));
  for(let d=0;d<4;d++){
    const L=byDiv[d];if(!L.length)continue;
    const tb=L.slice().sort((a,b)=>b.P-a.P||b.V-a.V||(b.GP-b.GC)-(a.GP-a.GC)||a.id-b.id);
    const sr=L.slice().sort((a,b)=>strength(b)-strength(a));
    const N=L.length;
    for(const c of L){
      if(c.id===G.user||!c.coach)continue;
      const co=c.coach;
      const pts=c.P-(c._lp||0);c._lp=c.P;
      // evolução dos indicadores do técnico por desempenho
      const perf=pts/3;
      co.imp=(co.imp||0)+rnd(0.1,1.3)*(0.4+perf*1.2);
      co.cri=(co.cri||0)+(pts===3?rnd(0.1,0.8):pts===0?rnd(-1.2,0.1):rnd(-0.3,0.4));
      co.tat=(co.tat||0)+rnd(0.3,3)*(0.3+perf);
      c.ct=(c.ct||0)+1;
      if(rd<6)continue;
      const pos=tb.indexOf(c)+1,exp=Math.min(N,Math.max(1,Math.round((sr.indexOf(c)+1)*0.9)));
      const delta=pos-exp;
      let p=(c.cp||0)*0.9;
      if(pos>=N-3&&rd>=10)p+=0.55;
      if(delta>=7)p+=0.5;else if(delta>=5)p+=0.15;
      if(exp<=4&&pos>=9&&rd>=10)p+=0.5;
      if(c.streak<=-3)p+=1.0;else if(c.streak<=-2)p+=0.3;
      if(delta<=0)p-=1.2;else if(delta<=2)p-=0.4;
      if(c.trad>=78)p+=0.15;
      c.cp=p;
      if(c.ct>=8&&p>=4.6&&Math.random()<0.3){
        const why=pos>=N-2?`Time na zona de rebaixamento (${pos}º) e diretoria sob pressão`:c.streak<=-2?`${-c.streak} jogos sem vencer e o ${pos}º lugar derrubaram o treinador`:`Time ocupa o ${pos}º lugar, abaixo do que a diretoria esperava (${exp}º)`;
        coachFire32(c,why);
      }
    }
  }
}
hookAfter('finishRound','ext32_fr32',()=>{coachTick32()});
/* virada de temporada: fim de ciclo, rebaixamento e convites por títulos */
hookAround('newSeason','ext32_ns32',function(next,A){
  try{
    for(let d=0;d<4;d++){
      const tb=tableRows(d);const N=tb.length;const sr=G.clubs.filter(c=>c.div===d).sort((a,b)=>strength(b)-strength(a));
      tb.forEach((c,i)=>{
        if(c.id===G.user||!c.coach)return;
        const pos=i+1,exp=Math.max(1,Math.round((sr.indexOf(c)+1)*0.9)),delta=pos-exp;
        if(c.coach.hired===G.season&&c.ct<20)return;
        let pr=0.03,why='Saída de comum acordo no fim da temporada';
        if(pos>=N-2){pr=0.4;why=`Rebaixamento ou campanha na zona de queda (${pos}º). Fim de ciclo`}
        else if(delta>=6){pr=0.3;why=`Campanha muito abaixo do esperado (${pos}º, previsto ${exp}º). Fim de ciclo`}
        else if(delta>=3){pr=0.12;why=`Temporada abaixo da meta (${pos}º). Diretoria opta por renovar o comando`}
        else if(pos===1){pr=0.03;why='Técnico campeão recebe proposta e deixa o clube'}
        if(Math.random()<pr){c.coach.pts=c.coach.pts;coachFire32(c,why,true)}
      });
    }
    G.cpool=(G.cpool||[]).filter(x=>G.season-x.since<=2);
  }catch(e){console.error('newSeason32 '+e.message)}
  return next();
});
/* ranking de técnicos: teto para imprensa/crise/tática, para o técnico do jogador não passar sozinho */
(function(){
  const _cr=coachRank;
  coachRank=function(kind='geral'){
    const L=_cr(kind);
    for(const x of L){
      const cap=Math.max(120,0.6*Math.abs(x.res));
      const cc=v=>Math.max(-cap,Math.min(cap,v));
      x.impC=+cc(x.imp).toFixed(1);x.criC=+cc(x.cri).toFixed(1);x.tatC=+cc(x.tat).toFixed(1);
      x.tot=+(x.res+x.impC*1.5+x.criC*1.5+x.tatC*2).toFixed(1);
    }
    const key={geral:'tot',res:'res',imp:'imp',cri:'cri',tat:'tat'}[kind];
    return L.sort((a,b)=>b[key]-a[key]||b.tot-a.tot);
  };
})();
/* menu de baixo: Voltar|Jornal, Início, JOGAR, Tática, Clube */
function nav32(){
  const nav=document.querySelector('.nav2');if(!nav||!G||G.phase==='start')return;
  const q=s=>nav.querySelector(s);
  const ini=q('[data-v="inicio"]'),tat=q('[data-v="tatica"]'),go=q('.go'),clu=q('[data-v="clube"]'),pap=q('[data-a="paper"]');
  if(!ini||!tat||!go||!clu||!pap)return;
  const home=(G.view==='inicio'||G.view==='elenco')&&!S.paper&&S.prof===null&&!S.modal;
  let first;
  if(home)first=pap;
  else{first=document.createElement('button');first.setAttribute('data-a','back');first.className='bk32';first.innerHTML='<span style="font-size:24px;line-height:20px">‹</span><small>Voltar</small>'}
  while(nav.firstChild)nav.removeChild(nav.firstChild);
  [first,ini,go,tat,clu].forEach(b=>nav.appendChild(b));
  if(!home)document.querySelectorAll('.backbar,.main .back,.wrap>.back').forEach(x=>x.remove());
}
const _rd32=render;render=function(){_rd32.apply(this,arguments);try{nav32()}catch(e){console.error('nav32 '+e.message)}};
(function(){const st=document.createElement('style');st.textContent=`.nav2 .bk32{color:#ffd24a;opacity:1}.nav2 .bk32 small{color:#ffd24a}`;document.head.appendChild(st)})();

/* Dança das cadeiras: histórico de demissões/contratações (as manchetes do Jornal saem rápido) */
function cadeiras32(n=8){
  const L=(G.cfx||[]).filter(x=>x.div<=1).slice(0,n);if(!L.length)return '';
  return `<div class="card"><div class="k">🔄 Dança das cadeiras · Séries A e B</div>${L.map(x=>`<div class="res"><span><b>${esc(x.club)}</b> · T${x.s} R${x.r}<br><small class="k">${esc(x.old)} saiu · ${esc(x.nw)} chegou</small></span></div>`).join('')}</div>`;
}
const _vj32=vJornal;vJornal=function(){const h=_vj32.apply(this,arguments);try{const c=cadeiras32();return c?h.replace(/<\/div>\s*$/,c+'</div>'):h}catch(e){return h}};
const _vt32=vTecnicos;vTecnicos=function(){const h=_vt32.apply(this,arguments);try{const c=cadeiras32(10);return c?h.replace(/<\/div>\s*$/,c+'</div>'):h}catch(e){return h}};

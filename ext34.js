/* ext34: mercado entre clubes da IA, técnico da IA mexe no jogo, vaga vira proposta, backup em arquivo, cabeçalho menor */
function aiMarket34(n){
  if(!G||G.user==null)return;
  const cl=G.clubs.filter(c=>c.id!==G.user);const done=new Set();let made=0,heads=0;
  for(let t=0;t<n*8&&made<n;t++){
    const b=pick(cl);if(done.has(b.id)||(b.caixa||0)<2||b.squad.length>=31)continue;
    const sl=cl.filter(s=>s.id!==b.id&&!done.has(s.id)&&s.squad.length>=22&&Math.abs((s.div||0)-(b.div||0))<=1);
    if(!sl.length)continue;const s=pick(sl);
    const bs=b.squad.map(P).filter(Boolean);
    const cand=s.squad.map(P).filter(p=>p&&!p.loan&&p.age>=20&&p.age<=32&&p.ovr>=b.rep-4&&p.ovr<=b.rep+7).filter(p=>{
      const same=bs.slice(0,11).filter(x=>x.pos===p.pos);if(!same.length)return false;
      return p.ovr>=Math.min(...same.map(x=>x.ovr))+3;
    }).sort((a,b2)=>b2.ovr-a.ovr);
    if(!cand.length)continue;
    const p=cand[0],fee=+(valueOf(p)*rnd(0.9,1.3)).toFixed(1);
    if(fee>b.caixa*0.8)continue;
    s.squad=s.squad.filter(id=>id!==p.id);b.squad.push(p.id);p.club=b.id;p.mor=70;p.listed=false;
    b.caixa=+(b.caixa-fee).toFixed(1);s.caixa=+((s.caixa||0)+fee*0.9).toFixed(1);
    done.add(b.id);done.add(s.id);made++;
    if(b.squad.length>30){const extra=b.squad.map(P).filter(Boolean).sort((a,b2)=>a.ovr-b2.ovr)[0];if(extra&&extra.id!==p.id){b.squad=b.squad.filter(id=>id!==extra.id);extra.club=-1;G.free.push(extra.id)}}
    try{autoPick(b);autoPick(s)}catch(e){}
    G.aix=(G.aix||0)+1;
    if((p.ovr>=76||fee>=14)&&heads<4){heads++;
      try{logX(p,s.id,b.id,fee)}catch(e){}
      paperLine(`${p.name} deixa o ${s.name} e vai para o ${b.name}`,`Negócio avaliado em R$ ${fee.toFixed(1)} mi.`);
    }
  }
}
const _ns34=newSeason;newSeason=function(){try{aiMarket34(28)}catch(e){console.error('aiMarket34 '+e.message)}return _ns34.apply(this,arguments)};
const _fr34=finishRound;finishRound=function(){const r=_fr34.apply(this,arguments);try{if(G.round===19)aiMarket34(10)}catch(e){console.error('aiMarket34b '+e.message)}return r};
/* técnico da IA: efeito pequeno no jogo, por maestria tática por jogo coached */
const _mm34=mgrMatch;mgrMatch=function(m,k){
  let f=_mm34.apply(this,arguments);
  try{const c=m[k]&&m[k].club;if(c&&c.id!==G.user&&c.coach){const co=c.coach,g=Math.max(30,(co.V||0)+(co.E||0)+(co.D||0)),rate=(co.tat||0)/g;f*=1+clamp((rate-1.6)*0.006,-0.012,0.012)}}catch(e){}
  return f;
};
/* vaga: clubes que trocaram de técnico há pouco entram nas propostas */
/* v31: reputação do técnico limita quais clubes podem chamar */
function coachCap34(good){
  const c=userClub(),u=G.uc||{};
  const peak=Math.max(c.rep,u.peak||0);
  const ti=(u.titles&&u.titles.length!==undefined)?u.titles.length:(+u.titles||0);
  return Math.min(100,c.rep+(good?5:2)+Math.min(10,ti*2.5)+Math.min(4,(peak-c.rep)*0.3));
}
const _jo34=jobOffers;jobOffers=function(good){
  const c=userClub(),cap=coachCap34(good);
  try{G.uc.peak=Math.max(G.uc.peak||0,c.rep)}catch(e){}
  const ok=id=>{const x=G.clubs.find(y=>y.id===id);return x&&x.rep<=cap};
  let base=_jo34.apply(this,arguments).filter(ok);
  try{
    const ref=c.rep+(good?3:0);
    const rec=(G.cfx||[]).filter(x=>(G.season-x.s)*40+(G.round-x.r)<=45).map(x=>G.clubs.find(y=>y.sig===x.club)).filter(x=>x&&x.id!==c.id&&Math.abs(x.rep-ref)<=8&&x.rep<=cap);
    const pickv=rec.sort(()=>Math.random()-.5).slice(0,2).map(x=>x.id);
    G.vacq=pickv.map(id=>C(id).name);
    const out=[...pickv];base.forEach(id=>{if(!out.includes(id))out.push(id)});
    if(out.length<3){G.clubs.filter(x=>x.id!==c.id&&x.rep<=cap&&!out.includes(x.id)).sort((a,b)=>Math.abs(a.rep-ref)-Math.abs(b.rep-ref)).slice(0,3-out.length).forEach(x=>out.push(x.id))}
    return out.slice(0,3);
  }catch(e){return base}
};
const _jr34=jobResolve;jobResolve=function(){
  _jr34.apply(this,arguments);
  try{const m=(G.inbox||[]).find(x=>x.tag==='jobs');if(m)(G.vacq||[]).forEach(n=>{m.body=m.body.replace('• '+n,'• 🔔 trocou de técnico há pouco: '+n)})}catch(e){}
};
/* backup em arquivo */
async function expStr34(){const g=await gz29(JSON.stringify(G));return JSON.stringify({rfc:1,z:g.z,s:g.s,club:userClub().name,season:G.season,round:G.round})}
async function impStr34(txt){
  const o=JSON.parse(String(txt).trim());if(!o||o.rfc!==1)throw new Error('arquivo não é um backup do Resenha FC');
  const raw=await ungz29(o.s,o.z);const g=JSON.parse(raw);if(!g||g.v!==2)throw new Error('backup inválido');
  SKV.setItem(SAVE_KEY,raw);loadSave();G.phase=G.phase||'play';S.modal=null;S.prof=null;S.match=null;G.view='inicio';render();
}
Object.assign(A,{
  expfile(){
    if(!G||G.phase==='start'){toast('Comece um jogo antes.');return}
    expStr34().then(async s=>{
      let saved=false;
      try{const bl=new Blob([s],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(bl);a.download='resenha-fc-save-T'+G.season+'-R'+G.round+'.json';document.body.appendChild(a);a.click();a.remove();saved=true}catch(e){}
      try{await navigator.clipboard.writeText(s);toast(saved?'💾 Arquivo gerado (e código copiado).':'📋 Código do save copiado. Cole num bloco de notas.')}catch(e){S.expt=s;toast(saved?'💾 Arquivo gerado.':'Copie o código mostrado em Opções.');render()}
    }).catch(e=>toast('Falha ao exportar: '+e.message));
  },
  imptxt(){const t=document.getElementById('impt');if(!t||!t.value.trim()){toast('Cole o código do backup no campo.');return}impStr34(t.value).then(()=>toast('💾 Backup importado.')).catch(e=>toast('Falha: '+e.message))}
});
document.addEventListener('change',e=>{
  const t=e.target;if(!t||t.id!=='impf'||!t.files||!t.files[0])return;
  const r=new FileReader();r.onload=()=>impStr34(r.result).then(()=>toast('💾 Backup importado.')).catch(er=>toast('Falha: '+er.message));r.readAsText(t.files[0]);
});
const _vo34=vOpcoes;vOpcoes=function(){
  let h=_vo34.apply(this,arguments);
  const card=`<div class="card"><div class="k">💾 Backup em arquivo</div><p class="news">Leva seu jogo pra outro aparelho: exporta num arquivo (ou copia o código) e importa de volta.</p><button class="btn sm" data-a="expfile">Exportar</button> <label class="btn sm ghost" style="display:inline-block;cursor:pointer">Importar arquivo<input type="file" id="impf" accept=".json,.txt" style="display:none"></label><textarea id="impt" placeholder="Ou cole o código aqui" style="width:100%;margin-top:8px;height:54px;background:var(--card);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:6px"></textarea><button class="btn sm ghost" data-a="imptxt">Importar código colado</button>${S.expt?`<textarea readonly style="width:100%;margin-top:8px;height:70px">${esc(S.expt)}</textarea>`:''}</div>`;
  return h.replace('<div class="card"><div class="k">Salvar jogo</div>',card+'<div class="card"><div class="k">Salvar jogo</div>');
};
(function(){const st=document.createElement('style');st.textContent=`
@media (max-width:759px){.top2 .ic button{padding-top:1px!important;padding-bottom:1px!important;min-height:38px!important;height:auto!important}.top2 .ic{padding-top:1px!important;padding-bottom:1px!important}.top2 .ic small{font-size:9px!important}.top2 .ic button span{font-size:17px!important}.top2 .mbar{padding-top:1px!important;padding-bottom:3px!important}}
`;document.head.appendChild(st)})();

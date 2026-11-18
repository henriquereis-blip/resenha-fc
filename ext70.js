/* ext70 (v89): o auxiliar e a comissão avisam e sugerem (sem dado na tela). O dado continua só por dentro do motor.
   Pilares: 1) jogo de técnico (tática, elenco)  2) financeiro  3) comissão/auxiliares que avisam o que falta. O jogador decide; o auxiliar só alerta. */
(function(){
const hurtN=c=>c.squad.filter(id=>P(id).inj>0).length;
function xiScore(c,f){
  const slots=slotsOf(f),wn=wantsOf(f),used=new Set();let t=0;
  slots.forEach((sl,i)=>{const id=bestForSlot(c.squad,sl,used,c.phil,wn[i]);if(id!=null){used.add(id);t+=slotScore(P(id),sl,c.phil,wn[i])}});
  return t;
}
globalThis.staffAlerts=function(){
  const out=[];
  try{
    const c=userClub();if(!c||!G.med)return out;
    const m=G.med,hurt=hurtN(c),n=m.season.n;
    const miss=[];if(!m.doc)miss.push('médico');if(!m.fisio)miss.push('fisioterapeuta');if(!m.prep)miss.push('preparador físico');
    if(miss.length&&(hurt>=1||n>=2)){
      out.push({k:'med',sev:hurt>=3?3:2,ic:'🩺',txt:`Professor, a gente tá sem ${miss.join(' e ')} e já são ${n} lesões na temporada${hurt?` (${hurt} no DM agora)`:''}. Sem essa estrutura o pessoal demora mais pra voltar e se machuca mais.`,btn:'Ver Médico',a:'nav',v:'medico'});
    }else if((m.fisio<=1||m.doc<=1)&&hurt>=4){
      out.push({k:'med',sev:2,ic:'🩺',txt:`${hurt} jogadores no departamento médico. Vale reforçar a comissão médica.`,btn:'Ver Médico',a:'nav',v:'medico'});
    }
    const st=(typeof stBox==='function')?stBox():null;
    const xi=c.squad.slice(0,11).map(id=>P(id));const en=xi.reduce((s,p)=>s+p.en,0)/Math.max(1,xi.length);
    if(st&&!st.pf&&en<72)out.push({k:'pf',sev:2,ic:'🏃',txt:`Sem preparador físico e o time titular tá com energia média de ${Math.round(en)}%. Contrate um na Comissão.`,btn:'Ver Comissão',a:'nav',v:'staff'});
    const tired=xi.filter(p=>p.en<55&&p.inj===0);
    if(tired.length>=2)out.push({k:'cans',sev:2,ic:'😮‍💨',txt:`${tired.slice(0,3).map(p=>lastName(p.name)).join(', ')} ${tired.length>1?'estão':'está'} no limite físico. Considere poupar no próximo jogo.`,btn:'Ver Tática',a:'nav',v:'tatica'});
    for(const role of ['GOL','ZAG','LAT','VOL','MEI','PNT','ATA']){
      const ok=c.squad.filter(id=>P(id).role===role&&P(id).inj===0).length,need={GOL:2,ZAG:3,LAT:2,VOL:2,MEI:2,PNT:2,ATA:2}[role];
      if(ok<need){out.push({k:'pos'+role,sev:2,ic:'🔍',txt:`Elenco curto de ${ROLEABB[role]}: só ${ok} saudável(is). Procure reforço no mercado.`,btn:'Ver Procura',a:'nav',v:'mercado'});break}
    }
    /* formação melhor para o elenco */
    const cur=xiScore(c,c.formation);let best=c.formation,bs=cur;
    for(const f of Object.keys(FORMS)){const s=xiScore(c,f);if(s>bs+0.01){bs=s;best=f}}
    if(best!==c.formation&&bs-cur>=6)out.push({k:'form',sev:1,ic:'📋',txt:`Olhando o seu elenco, o ${best} encaixa melhor que o ${c.formation} (time titular uns ${Math.round(bs-cur)} pontos mais forte).`,btn:'Usar '+best,a:'auxform',f:best});
    try{const pay=payroll(c),bud=wageBudget();if(pay>bud*1.02)out.push({k:'folha',sev:2,ic:'💸',txt:`A folha (${mi(pay)}) tá acima do teto da diretoria (${mi(bud)}). Cuidado com novas contratações.`,btn:'Ver Comissão',a:'nav',v:'staff'})}catch(e){}
    if(G.fin&&G.fin.caixa<0)out.push({k:'caixa',sev:3,ic:'🚨',txt:`Caixa negativo (${mi(G.fin.caixa)}). A diretoria vai cobrar. Segura as contratações.`,btn:'Ver Clube',a:'nav',v:'clube'});
  }catch(e){}
  return out.sort((a,b)=>b.sev-a.sev);
};
const cardHtml=(l,max)=>l.slice(0,max).map(a=>`<div class="tip"><p>${a.ic} ${esc(a.txt)}</p><div class="row"><button class="btn sm" data-a="${a.a}"${a.v?` data-v="${a.v}"`:''}${a.f?` data-f="${esc(a.f)}"`:''}>${esc(a.btn)}</button></div></div>`).join('');
Object.assign(A,{auxform(d){const c=userClub();if(!FORMS[d.f])return;c.formation=d.f;autoPick(c);save();toast('Formação trocada pra '+d.f);render()}});

/* Início: até 3 avisos do auxiliar */
const _vi70=vInicio;vInicio=function(){
  let h=_vi70.apply(this,arguments);
  try{const l=staffAlerts();if(l.length){const nm=G.asst?G.asst.name:'Auxiliar';
    const card=`<div class="card x9"><div class="k">🧢 ${esc(nm)} avisa</div>${cardHtml(l,3)}${l.length>3?`<button class="btn sm ghost" data-a="nav" data-v="assist">Ver todos os avisos (${l.length})</button>`:''}</div>`;
    h=h.replace('<div class="hl">',m=>m+card)}}catch(e){}
  return h;
};

/* tela do Auxiliar: sem dado; avisos fixos no topo + dicas do dia a dia */
const clean=h=>String(h).replace(/🎲 ?\d+[+\-−]?\d* vs \d+:? ?/g,'').replace(/<small class="k" style="align-self:center">[^<]*<\/small>/g,'').replace(/🎲 ?/g,'').replace(/>Tentar</g,'>Aplicar<')
  .replace(/<p class="news">Seguir a dica é rolar[^<]*<\/p>/,'<p class="news">O auxiliar aponta o que ele viu. Quem decide é você: aplicar a dica ou ignorar.</p>');
const _va70=vAssist;vAssist=function(){
  let h=clean(_va70.apply(this,arguments));
  try{const l=staffAlerts();if(l.length)h=h.replace(/(<h2>[^<]*<\/h2>)/,'$1<div class="card x9"><div class="k">Pendências da comissão</div>'+cardHtml(l,8)+'</div>')}catch(e){}
  return h;
};
if(typeof vVest==='function'){const _vv70=vVest;vVest=function(){return clean(_vv70.apply(this,arguments))}}
/* mensagens de resultado sem o rastro do dado */
const _t70=toast;toast=function(t){return _t70(String(t).replace(/🎲 ?\d+[+\-−]?\d* vs \d+:? ?/,''))};
const _tg70=A.tipgo;A.tipgo=function(d){const r=_tg70.apply(this,arguments);try{for(const t of G.tips)if(t.res)t.res=t.res.replace(/🎲 ?\d+[+\-−]?\d* vs \d+:? ?/,'')}catch(e){}return r};

/* selo no ícone do Auxiliar: dicas novas + avisos */
const _r70=render;render=function(){
  _r70.apply(this,arguments);
  try{const n=staffAlerts().length;const b=document.querySelector('.ic [data-v="assist"]');
    if(b&&n){let s=b.querySelector('.badge13');if(!s){s=document.createElement('span');s.className='badge13';b.appendChild(s)}s.textContent=String((G.tips||[]).filter(t=>t.state==='new').length+n)}}catch(e){}
};
})();

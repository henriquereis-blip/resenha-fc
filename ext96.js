/* ext96 (v131): táticas redesenhadas, em camadas que não repetem o estilo de jogo.
   Estilo de jogo (já existia): o plano COM a bola (Equilibrado, Ofensivo, Defensivo, Contra-ataque, Posse).
   Marcação (nova): COMO o time defende — Zona (padrão), Individual (gruda no craque deles), Pressão alta (rouba a bola lá na frente).
   Intensidade (era "marcação" Leve/Pesada/Muito pesada): QUANTO o time corre. Mais intensidade = mais força sem a bola, mais cansaço e cartão.
   Caminho do ataque: Pelo meio, Pelas laterais e (novo) Pelo alto (cruzamento e bola parada).
   Ritmo (novo): o que fazer com o placar — Normal, Controlar o jogo (vencendo, segura nos 20 minutos finais) e Abafa no fim (perdendo, vai pra cima nos 15 finais).
   Coerência: combinar com o estilo dá +1%; contradizer (ex.: Contra-ataque com Pressão alta) dá −2% e a tela explica o porquê. */
const MARC96=['Zona','Individual','Pressão alta'];
const RITMO96=['Normal','Controlar o jogo','Abafa no fim'];
if(!FOCUS.includes('Pelo alto'))FOCUS.push('Pelo alto');
/* combinações: estilo → o que combina (+1%) e o que contradiz (−2%), com o motivo */
const COH96={
  'Ofensivo':{ok:['Pressão alta','Abafa no fim','Pelas laterais'],bad:{'Controlar o jogo':'quem joga pra frente não segura resultado recuando'}},
  'Defensivo':{ok:['Individual','Controlar o jogo','Pelo alto'],bad:{'Pressão alta':'bloco baixo e pressão alta puxam o time pra lados opostos','Abafa no fim':'o time não foi montado pra atacar em bloco'}},
  'Contra-ataque':{ok:['Zona','Pelas laterais'],bad:{'Pressão alta':'contra-ataque precisa de espaço nas costas do adversário; pressionar lá na frente tira esse espaço'}},
  'Posse':{ok:['Pressão alta','Pelo meio','Controlar o jogo'],bad:{'Pelo alto':'bola longa e cruzamento jogam fora a posse'}},
  'Equilibrado':{ok:['Zona'],bad:{}}
};
function tacOf96(s){return {marc:s.marc||'Zona',ritmo:s.ritmo||'Normal',focus:s.focus||'Pelo meio',style:s.style||'Equilibrado'}}
function cohOf96(s){
  const t=tacOf96(s),r=COH96[t.style]||{ok:[],bad:{}};
  const picks=[t.marc,t.focus,t.ritmo];let m=1;const why=[];
  for(const x of picks){if(r.ok.includes(x))m*=1.01;else if(r.bad[x]){m*=0.98;why.push(x+' com '+t.style+': '+r.bad[x]+'.')}}
  return {m,why};
}
globalThis.cohOf96=cohOf96;
/* lado de cada partida carrega a marcação e o ritmo do clube */
hookAround('mkSide','mk96',function(next,__a){const s=next(...__a);const c=__a[0];s.marc=c.marc||'Zona';s.ritmo=c.ritmo||'Normal';return s});
/* força: aplica marcação, ataque pelo alto, ritmo e coerência */
const aerial96=pl=>pl.filter(p=>p&&(p.tr||[]).some(t=>t==='Aer'||t==='For')).length;
hookAfter('power','pw96',function(r,__a){
  const m=__a[0],s=__a[1];if(!s||!s.club||!m||!m.h||!m.a)return;
  const o=m.h===s?m.a:m.h;
  const me=tacOf96(s),op=tacOf96(o);
  // a marcação DO ADVERSÁRIO mexe no nosso ataque/meio
  if(op.marc==='Individual'){
    const pl=s.lineup.map(P).filter(Boolean);const av=pl.reduce((a,p)=>a+p.ovr,0)/Math.max(1,pl.length);
    const star=Math.max(...pl.filter(p=>['ATA','PNT','MEI'].includes(p.role)).map(p=>p.ovr),0);
    r.atk*=star-av>=5?0.95:0.99;                 // anula o craque; se não houver craque, quase não muda
  }
  if(op.marc==='Pressão alta'){r.mid*=me.style==='Posse'?0.94:0.97}  // aperta a saída de bola
  // a nossa marcação mexe na nossa defesa/meio
  if(me.marc==='Individual')r.def*=0.98;          // marcador sai de posição e abre espaço
  if(me.marc==='Pressão alta'){
    if(op.style==='Contra-ataque'){r.def*=0.97}else{r.def*=1.03;r.mid*=1.03}  // contra-ataque explora as costas
  }
  // ataque pelo alto: atacantes e zagueiros fortes no alto contra a zaga deles
  if(me.focus==='Pelo alto'){
    const mine=aerial96(s.lineup.map(P).filter(p=>p&&(p.role==='ATA'||p.role==='ZAG')));
    const theirs=aerial96(o.lineup.map(P).filter(p=>p&&p.role==='ZAG'));
    r.atk*=1+clamp((mine-theirs)*0.012,-0.03,0.04);
  }
  // ritmo: só vale no fim do jogo, conforme o placar
  const gf=m.h===s?m.hg:m.ag,ga=m.h===s?m.ag:m.hg;
  if(me.ritmo==='Controlar o jogo'&&m.min>=70&&gf>ga){r.atk*=0.85;r.def*=1.08}
  if(me.ritmo==='Abafa no fim'&&m.min>=75&&gf<ga){r.atk*=1.10;r.def*=0.92}
  // coerência com o estilo
  const k=cohOf96(s).m;r.atk*=k;r.mid*=k;r.def*=k;
});
/* cansaço: individual e pressão alta correm mais; controlar o jogo poupa */
hookAfter('stepMinute','sm96',function(r,__a){
  const m=__a[0];if(!m||!m.h)return;
  for(const k of ['h','a']){const s=m[k],t=tacOf96(s);
    const gf=k==='h'?m.hg:m.ag,ga=k==='h'?m.ag:m.hg;
    let d=0;if(t.marc==='Individual')d+=0.02;if(t.marc==='Pressão alta')d+=0.05;
    if(t.ritmo==='Controlar o jogo'&&m.min>=70&&gf>ga)d-=0.03;
    if(d)for(const id of s.lineup)m.en[id]=clamp(m.en[id]-d,10,100);
  }
});
/* IA: escolhe marcação e ritmo coerentes com o próprio estilo (com variação) */
hookAfter('prepareRound','pr96',function(){
  try{for(const c of G.clubs){if(c.id===G.user)continue;
    const st=c.style||'Equilibrado',u=Math.random();
    c.marc=st==='Ofensivo'||st==='Posse'?(u<0.45?'Pressão alta':'Zona'):st==='Defensivo'?(u<0.4?'Individual':'Zona'):'Zona';
    c.ritmo=st==='Posse'||st==='Defensivo'?(u<0.5?'Controlar o jogo':'Normal'):st==='Ofensivo'?(u<0.4?'Abafa no fim':'Normal'):'Normal';
  }}catch(e){}
});
/* tela: seletores e a explicação de coerência */
function tacCtl96(c){
  const t=tacOf96(c),coh=cohOf96(c);
  return `<div class="ctl4">${selH('marc','Marcação',MARC96,t.marc)}${selH('mark','Intensidade',MARKS,c.mark||'Leve')}${selH('focus','Caminho do ataque',FOCUS,t.focus)}${selH('ritmo','Ritmo do jogo',RITMO96,t.ritmo)}</div>${coh.why.length?`<div class="warn96">⚠️ ${coh.why.map(esc).join(' ')} (−2% em tudo)</div>`:''}`;
}
globalThis.tacCtl96=tacCtl96;
hookAfter('bind','bd96',function(){
  const mc=$('#marc');if(mc)mc.onchange=()=>{userClub().marc=mc.value;save();render()};
  const rt=$('#ritmo');if(rt)rt.onchange=()=>{userClub().ritmo=rt.value;save();render()};
});

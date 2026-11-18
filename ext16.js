/* ext16: Fase 3 — imprensa viva: repórteres com humor, perguntas por contexto, silêncio, tom das matérias */

const REP_STYLES={sens:'Sensacionalista',tec:'Técnico',amigo:'Amigo da casa',crit:'Crítico'};
const REP_DEF=[
 ['Marcos Vilela','Diário do Apito','sens'],['Paula Brandão','A Gazeta da Bola','tec'],['Régis Tavares','Tribuna da Arquibancada','crit'],
 ['Dani Cavalcanti','Jornal Escanteio','amigo'],['Otávio Prado','Folha do Gramado','sens'],['Letícia Nogueira','A Gazeta da Bola','tec'],
 ['Cláudio Mattos Jr.','Diário do Apito','crit'],['Beto Fontoura','Tribuna da Arquibancada','amigo']];
function jrBox(){
  if(!G.jr)G.jr={reps:REP_DEF.map(([n,o,s])=>({n,o,s,mood:s==='amigo'?15:s==='crit'?-12:0,last:'',cnt:0})),silence:0,used:{},tone:[],n:0,ans:0,skips:0,log:[]};
  return G.jr;
}
const moodFace=m=>m>=30?'😊':m>=8?'🙂':m>-8?'😐':m>-30?'😠':'🤬';
const moodTxt=m=>m>=30?'Aliado':m>=8?'Simpático':m>-8?'Neutro':m>-30?'Desconfiado':'Inimigo';
function repMoodAvg(){const r=jrBox().reps;return r.reduce((s,x)=>s+x.mood,0)/r.length}

/* ---------- contexto do jogo ---------- */
function jrCtx(um){
  const c=userClub(),us=userSide(um),gf=us==='h'?um.hg:um.ag,ga=us==='h'?um.ag:um.hg,opp=us==='h'?um.a.club:um.h.club;
  const tags=[];const diff=gf-ga;
  if(diff>=3)tags.push('goleada');else if(diff>0)tags.push('vitoria');else if(diff===0)tags.push('empate');else if(diff<=-3)tags.push('atropelo');else tags.push('derrota');
  if(c.streak<=-3)tags.push('crise');else if(c.streak<=-2)tags.push('seca');
  if(c.streak>=4)tags.push('sequencia');
  if(typeof isClassico==='function'&&isClassico(c.id,opp.id))tags.push('classico');
  const side=um[us];if(side.sent.length)tags.push('vermelho');
  const hurt=c.squad.map(id=>P(id)).filter(p=>p.inj>=3&&c.squad.indexOf(p.id)<14).sort((a,b)=>b.ovr-a.ovr)[0];if(hurt)tags.push('lesao');
  if(G.vest&&G.vest.conf.length)tags.push('vestiario');
  if(G.board.conf<42)tags.push('pressao');
  if(G.fin.caixa<5||c.debt>scaleOf(c)*1.5)tags.push('dinheiro');
  const pos=posOf(c);if(G.round>=24&&pos<=3)tags.push('titulo');if(G.round>=24&&pos>=tableRows().length-4)tags.push('rebaixa');
  const mur=c.squad.map(id=>P(id)).filter(p=>{try{return pers(p).pm<42&&p.inj===0}catch(e){return false}})[0];if(mur)tags.push('descontente');
  const jov=c.squad.map(id=>P(id)).filter(p=>p.age<=20&&side.lineup.includes(p.id))[0];if(jov)tags.push('jovem');
  const star=c.squad.map(id=>P(id)).sort((a,b)=>b.ovr-a.ovr)[0];
  try{if(famGet(c,'s',c.style)<55)tags.push('estilo')}catch(e){}
  const best=Object.entries(um.rt).filter(([id])=>side.lineup.includes(+id)).sort((a,b)=>b[1]-a[1])[0];
  return {tags,diff,gf,ga,opp,c,hurt,mur,jov,star,best:best?P(+best[0]):star,pos};
}

/* ---------- banco de frases: abertura × núcleo × fecho ---------- */
const OPEN={
 geral:['Professor,','Treinador,','Boa noite, {t}.','Uma pergunta rápida:','Sem rodeios:','Pra fechar a coletiva:','Pelo que se viu em campo,','Falando em nome da torcida,','O que o senhor tem a dizer sobre isso?','Na saída do vestiário, a pergunta que não cala:'],
 pos:['Bela atuação!','Foi um jogo bom de ver.','Clima de festa no estádio.','Os três pontos caíram bem.'],
 neg:['Foi um jogo difícil de engolir.','A torcida saiu irritada.','Dia complicado.','O clima ficou pesado.']
};
const CLOSE=['O que responde à torcida?','Como o senhor encara isso?','Alguma mudança à vista?','O grupo está com o senhor?','Isso muda algo na sua semana?','O que ficou dessa noite?','Qual a mensagem pro torcedor?'];
const CORE={
 goleada:['O {c} goleou o {o} por {s}. Isso é o retrato do time ou o adversário ajudou?','{s} em cima do {o}: o time já pode sonhar mais alto?','Placar de {s}. O senhor esperava um jogo tão tranquilo?'],
 vitoria:['A vitória sobre o {o} veio apertada, por {s}. Faltou brilho?','Três pontos contra o {o}, mas o time sofreu. Dá pra confiar nesse desempenho?','Vitória por {s} com {b} em destaque. Ele é a peça do time?'],
 empate:['O {c} só empatou com o {o}, {s}. Dois pontos perdidos ou ponto ganho?','{s} contra o {o}: faltou ousadia?','Empate sem sabor. O time está estagnado?'],
 derrota:['Derrota para o {o} por {s}. Onde o jogo escapou?','O {c} perdeu de {s} e a torcida cobra. De quem é a culpa?','Perder para o {o} dói. O senhor errou na escalação?'],
 atropelo:['{s} para o {o}: foi vexame?','A derrota por {s} foi a pior do ano? O senhor pensa em pedir demissão?','O {o} passou por cima. O que aconteceu com o time?'],
 crise:['São {n} jogos sem vencer. A situação é de crise?','A sequência negativa já passa de {n} jogos. O cargo está em risco?','A torcida pede mudanças depois de {n} rodadas ruins. O que muda?'],
 seca:['Dois jogos sem vitória. É só uma fase ruim?','O time perdeu o ritmo. O senhor viu queda física?'],
 sequencia:['{n} jogos de invencibilidade. O senhor teme a pressão de ser favorito?','O time embalou. Qual o segredo dessa fase?'],
 classico:['Clássico contra o {o}. O que esse resultado significa pra torcida?','Contra o {o} nada é só três pontos. Como o grupo viveu a semana?'],
 vermelho:['Com um jogador expulso, o jogo mudou. A arbitragem pesou?','A expulsão atrapalhou o plano. Faltou cabeça fria?'],
 lesao:['{h} está no departamento médico. O elenco aguenta a falta dele?','A lesão de {h} muda os planos pra temporada?','O DM está cheio. Falta preparo físico?'],
 vestiario:['Circulam histórias de climão no vestiário. É verdade?','Fontes falam em briga no treino. O senhor confirma?'],
 pressao:['A diretoria discute o seu futuro, segundo bastidores. O senhor sente a pressão?','Corre a notícia de que o cargo balança. O que diz?'],
 dinheiro:['O caixa do clube preocupa. O senhor tem verba para reforçar?','A dívida assusta a torcida. Dá pra brigar por algo assim?'],
 titulo:['O {c} está na briga. O senhor admite o sonho do título?','Faltam poucas rodadas e o time aparece lá em cima. É hora de falar em título?'],
 rebaixa:['O fantasma do rebaixamento ronda o {c}. Como o senhor lida com isso?','A zona de perigo está perto. Dá pra se salvar?'],
 descontente:['{d} anda insatisfeito com o tempo de jogo. O senhor conversou com ele?','Surgem rumores de que {d} quer sair. Ele fica?'],
 jovem:['{j} jogou de novo e foi bem. O senhor aposta na base?','Um garoto de {a} anos entre os titulares. É a nova geração?'],
 camisa:['A terceira camisa saiu e dividiu opiniões. O senhor teve voz no processo?'],
 estilo:['O time parece perdido taticamente. A troca de estilo foi precipitada?','O {c} muda de jeito de jogar o tempo todo. Falta identidade?']
};
const STANCE={ // texto das respostas
 humilde:['Assumo a parte que me cabe e vamos trabalhar.','O mérito é do grupo, seguimos com os pés no chão.','Respeito o adversário e a torcida, é um dia de cada vez.','Sem pose: a gente precisa evoluir.'],
 confiante:['Confio muito no que construímos. O time vai responder.','Estamos no caminho certo e vamos provar isso.','Sou o primeiro a acreditar, e o grupo também.','Quem duvidar vai se surpreender.'],
 culpa_time:['Faltou entrega de alguns jogadores. Vou cobrar.','O que foi treinado não apareceu em campo.','Tem gente que precisa mostrar mais comprometimento.'],
 culpa_arbitro:['A arbitragem interferiu demais no resultado.','Pelo que vi, o juiz foi decisivo hoje.','Não adianta, a arbitragem pesou.'],
 elogia_imprensa:['Vocês acompanham o dia a dia e enxergam o trabalho. Obrigado pelo respeito.','Reconheço que a imprensa tem sido justa com a gente.','Gente como você ajuda o futebol brasileiro a crescer.'],
 elogia_torcida:['A torcida é o nosso combustível, merece esse time.','Nosso torcedor foi fantástico, vamos retribuir.','O apoio de vocês faz diferença dentro de campo.'],
 tecnico:['Foi uma questão de organização: pressão, linhas e ocupação de espaço.','O desenho tático funcionou até a bola parada e ajustamos depois.','Analisamos os vídeos e já sabemos o que corrigir.'],
 polemico:['Digam o que quiserem, eu sei o que faço.','Com todo respeito, essa pergunta já traz a resposta pronta.','Tem muita opinião de quem nunca entrou num vestiário.'],
 evasivo:['Não vou comentar isso agora.','Falo disso internamente, não aqui.','Prefiro falar só do próximo jogo.']
};
// efeitos-base por tom da resposta (quanto vale na melhor situação)
const SEF={humilde:{conf:1.5,humor:2,pm:2,rep:3},confiante:{conf:1,humor:4,pm:1,rep:1},culpa_time:{conf:1,humor:-1,pm:-6,rep:2},culpa_arbitro:{conf:-1,humor:2,pm:1,rep:-3},
  elogia_imprensa:{conf:0,humor:0,pm:-3,rep:10},elogia_torcida:{conf:.5,humor:4,pm:0,rep:1},tecnico:{conf:1.5,humor:.5,pm:1,rep:4},polemico:{conf:-2,humor:3,pm:-1,rep:0},evasivo:{conf:-.5,humor:-.5,pm:0,rep:-2}};
// quanto cada contexto muda o valor de cada tom (>1 melhora, <0 vira ruim)
const FIT={
 goleada:{confiante:1.3,humilde:1.1,elogia_torcida:1.2,culpa_time:-1,polemico:.6},
 vitoria:{confiante:1.1,humilde:1,tecnico:1.2,elogia_torcida:1},
 empate:{confiante:.5,humilde:1,tecnico:1.3,culpa_arbitro:.5},
 derrota:{confiante:-.8,humilde:1.4,culpa_time:.3,culpa_arbitro:-.3,tecnico:1.2,polemico:-.7},
 atropelo:{confiante:-1.6,humilde:1.5,culpa_time:-.2,polemico:-1.4,evasivo:-1.2},
 crise:{confiante:-1,humilde:1.3,tecnico:1.2,polemico:-1.3,evasivo:-1.5,elogia_imprensa:.8},
 seca:{humilde:1.2,tecnico:1.2,confiante:-.2},
 sequencia:{confiante:1.2,humilde:1.3,elogia_torcida:1.3,polemico:.4},
 classico:{elogia_torcida:1.5,confiante:1.2,polemico:1.1},
 vermelho:{culpa_arbitro:1.2,humilde:1,tecnico:1},
 lesao:{tecnico:1.4,culpa_time:-1.2,humilde:1},
 vestiario:{evasivo:.2,tecnico:.8,culpa_time:-2,humilde:1.2,polemico:-1.2},
 pressao:{confiante:.6,humilde:1,polemico:-1.5,culpa_time:-1.2},
 dinheiro:{tecnico:1,humilde:1.2,polemico:-1},
 titulo:{confiante:1.3,humilde:1.2,polemico:.5},
 rebaixa:{humilde:1.5,confiante:-.6,culpa_time:-1,evasivo:-1},
 descontente:{humilde:1,tecnico:1.2,polemico:-1.2,evasivo:-.3,culpa_time:-1.5},
 jovem:{tecnico:1.4,humilde:1.1,elogia_torcida:1},
 camisa:{elogia_torcida:1.3,tecnico:.8},
 estilo:{tecnico:1.3,humilde:1.3,confiante:-.6,polemico:-1}
};
const fitOf=(tags,tone)=>{let f=1,n=0;for(const t of tags){const x=FIT[t]&&FIT[t][tone];if(x!==undefined){f+=x;n++}}return n?f/(n+1)*1.8:1};

function pickNovel(arr,key){
  const J=jrBox();const used=J.used[key]||(J.used[key]=[]);
  let c=arr.filter(x=>!used.includes(x));if(!c.length){used.length=0;c=arr}
  const v=pick(c);used.push(v);if(used.length>Math.max(2,arr.length-2))used.shift();return v;
}
const fillTxt=(s,x)=>s.replace(/\{c\}/g,x.c.name).replace(/\{o\}/g,x.opp.name).replace(/\{s\}/g,x.gf+'–'+x.ga).replace(/\{n\}/g,Math.abs(x.c.streak)||x.c.streak)
  .replace(/\{h\}/g,x.hurt?lastName(x.hurt.name):'o camisa 9').replace(/\{d\}/g,x.mur?lastName(x.mur.name):'um titular').replace(/\{j\}/g,x.jov?lastName(x.jov.name):'o garoto').replace(/\{a\}/g,x.jov?x.jov.age:'19')
  .replace(/\{b\}/g,x.best?lastName(x.best.name):'o camisa 10').replace(/\{t\}/g,G.coach||'professor');
const PRIO=['crise','atropelo','vermelho','pressao','rebaixa','titulo','vestiario','lesao','descontente','classico','camisa','estilo','dinheiro','jovem','sequencia','seca','goleada','derrota','empate','vitoria'];

function genPressV2(um){
  if(G.press)return;
  try{genPressV2b(um)}catch(e){console.error('genPress16 '+e.message)}
}
function genPressV2b(um){
  const J=jrBox();const x=jrCtx(um);
  // quase toda rodada tem pergunta, mas contextos fortes aparecem mais
  const strong=x.tags.some(t=>['crise','atropelo','vermelho','pressao','rebaixa','titulo','vestiario','classico','camisa'].includes(t));
  if(Math.random()>(strong?.85:.45))return;
  const tags=x.tags.slice().sort((a,b)=>PRIO.indexOf(a)-PRIO.indexOf(b));
  const main=pick(tags.slice(0,2).length?tags.slice(0,2):['empate']);
  const core=fillTxt(pickNovel(CORE[main],'core:'+main),x);
  const open=pickNovel(OPEN.geral.concat(x.diff>0?OPEN.pos:OPEN.neg),'open');const close=Math.random()<.6?' '+pickNovel(CLOSE,'close'):'';
  const ri_=Math.floor(Math.random()*J.reps.length),r=J.reps[ri_];
  // repórter hostil tende a pegar mais pesado; amigo, mais ameno
  const text=fillTxt(open,x)+' '+core+close;
  // escolhe 3 ou 4 tons coerentes e não repetidos
  const pool=['humilde','confiante','culpa_time','culpa_arbitro','elogia_imprensa','elogia_torcida','tecnico','polemico','evasivo'];
  const tones=[];const must=r.s==='tec'?'tecnico':r.s==='sens'?'polemico':r.s==='amigo'?'elogia_imprensa':'humilde';
  tones.push(must);
  const rest=shuffle(pool.filter(t=>t!==must&&!(t==='culpa_arbitro'&&!x.tags.includes('vermelho')&&x.diff>=0)&&!(t==='culpa_time'&&x.diff>=2)&&!(t==='confiante'&&x.tags.includes('atropelo'))));
  while(tones.length<3+(Math.random()<.35?1:0)&&rest.length)tones.push(rest.pop());
  const opts=shuffle(tones).map(tn=>{
    const b=SEF[tn],f=fitOf(x.tags,tn);
    let rep=b.rep*(f>0?1:.5);
    if(tn==='polemico')rep=(r.s==='sens'?7:r.s==='crit'?-6:-3);
    if(tn==='tecnico'&&r.s==='tec')rep+=3;if(tn==='elogia_imprensa'&&r.s==='crit')rep-=4;
    return {t:fillTxt(pickNovel(STANCE[tn],'st:'+tn),x),tone:tn,fx:{conf:+(b.conf*f).toFixed(1),humor:Math.round(b.humor*f),mor:0,pm:Math.round(b.pm*(tn==='culpa_time'||tn==='elogia_imprensa'?1:Math.abs(f)))},rep:Math.round(rep)}});
  G.press={who:r.n+' ('+r.o+')',q:text,id:G.round,ri:ri_,ctx:main,opts,skip:{conf:-.5,humor:-1,mor:0}};
}
hookAround('genPress','gp16',function(next,__a){let [um]=__a;next(um);if(G.press&&G.press.who==='Eleição no clube')return;G.press=null;genPressV2(um)});

/* ---------- depois da resposta ---------- */
hookAround('answerPress','ap16',function(next,__a){let [i]=__a;
  const q=G.press;const J=jrBox();
  next(i);
  if(!q)return;
  try{
    const c=userClub(),r=q.ri!==undefined?J.reps[q.ri]:null;
    if(i>=0&&q.opts&&q.opts[i]){
      const o=q.opts[i];J.silence=0;J.ans++;
      const mult=r?(r.s==='amigo'?1.3:r.s==='crit'?(o.rep>0?.6:1.3):1):1;
      if(r){r.mood=clamp(r.mood+o.rep*mult,-100,100);r.cnt++}
      // elogio à imprensa irrita os outros repórteres e o vestiário
      if(o.tone==='elogia_imprensa')J.reps.forEach(x=>{if(x!==r&&x.s!=='amigo')x.mood=clamp(x.mood-1.5,-100,100)});
      if(o.fx.pm)for(const id of c.squad){const p=pers(P(id));p.pm=clamp(p.pm+o.fx.pm,0,100)}
      J.log.unshift({s:G.season,r:G.round,who:r?r.n:'',tone:o.tone,ctx:q.ctx});J.log=J.log.slice(0,20);
    }else{
      J.silence++;J.skips++;
      if(r)r.mood=clamp(r.mood-1,-100,100);
      if(J.silence>=3){
        J.reps.forEach(x=>x.mood=clamp(x.mood-(J.silence>=5?4:2.5),-100,100));
        if(J.silence===3||J.silence===5){paperLine('Técnico '+G.coach+' foge da imprensa',J.silence>=5?'Silêncio prolongado irrita jornalistas e é lido como falta de liderança.':'Repórteres reclamam das últimas coletivas em que o treinador não respondeu.');c.humor=clamp(c.humor-(J.silence>=5?3:1),5,100);G.board.conf=clamp(G.board.conf-(J.silence>=5?2:.8),0,100)}
      }
    }
  }catch(e){console.error('press16 '+e.message)}
});

/* ---------- tom das matérias e repórteres de verdade ---------- */
const TONE_POS=['Texto elogioso destaca o trabalho do comando técnico.','Bastidores apontam clima positivo no clube.','A coluna enxerga evolução e deseja continuidade.','Análise reconhece o mérito do treinador.','Imprensa vê time confiante e bem treinado.','Fontes ouvidas confirmam ambiente saudável.','Repórter cita equilíbrio e leitura de jogo do professor.'];
const TONE_NEG=['O texto questiona as escolhas do treinador.','A coluna fala em improviso e falta de padrão.','Fontes apontam desgaste na relação com o grupo.','Análise duvida da capacidade de reação do time.','A matéria lembra que o cargo ficou mais exposto.','Repórter cobra respostas que o professor não deu.','Bastidores falam em insatisfação com o trabalho.'];
const TONE_NEU=['Matéria descreve os fatos sem tomar partido.','A reportagem ouviu os dois lados do vestiário.','Texto segue a linha factual.','Cobertura de rotina, sem grandes adjetivos.','Nada de novo nos bastidores, segundo a apuração.'];
const _pl16=paperLine;paperLine=function(h,sub){
  const J=jrBox();
  // escolhe repórter: repórteres hostis aparecem mais quando o clube vai mal e vice-versa
  const bad=(G.board&&G.board.conf<50);
  const w=J.reps.map(r=>1+(bad?Math.max(0,-r.mood)/40:Math.max(0,r.mood)/50));
  let t=w.reduce((a,b)=>a+b,0)*Math.random(),idx=0;for(;idx<w.length;idx++){t-=w[idx];if(t<=0)break}idx=Math.min(idx,J.reps.length-1);
  const r=J.reps[idx];
  const tone=r.mood>=22?'pos':r.mood<=-22?'neg':'neu';
  const bank=tone==='pos'?TONE_POS:tone==='neg'?TONE_NEG:TONE_NEU;
  const line=pickNovel(bank,'tone:'+tone);
  _pl16(h,(sub?sub+' ':'')+(tone==='neu'&&Math.random()<.6?'':line));
  const e=G.paper[0];if(e){e.paper=r.o;e.by=r.n;e.tone=tone}
};
// repórteres hostis soltam matéria ácida depois de rodadas ruins; amigos protegem
hookAround('finishRound','ext16_fr16',function(next,A){
  const um=R&&R.ms[R.ui],us=um?userSide(um):null;const gf=um?(us==='h'?um.hg:um.ag):0,ga=um?(us==='h'?um.ag:um.hg):0;
  const out=next();
  try{
    const J=jrBox(),c=userClub();J.n++;
    for(const r of J.reps){r.mood=+(r.mood+(gf>ga?(r.s==='amigo'?1.2:.4):gf<ga?(r.s==='crit'?-1.2:-.5):0)).toFixed(1);r.mood=+(r.mood*0.985).toFixed(1)}
    const hostile=J.reps.filter(r=>r.mood<=-35);
    if(gf<ga&&hostile.length&&Math.random()<.35){const r=pick(hostile);
      const s=pick(['Fontes: vestiário divide opinião sobre o professor','Opinião: o treinador perdeu o controle do jogo','Coluna do dia: é hora de rever o comando técnico']);
      _pl16(s,'Texto de '+r.n+' ('+r.o+') ganha força nas redes.');G.paper[0].by=r.n;G.paper[0].paper=r.o;G.paper[0].tone='neg';
      c.humor=clamp(c.humor-1,5,100);G.board.conf=clamp(G.board.conf-.6,0,100)}
    const friends=J.reps.filter(r=>r.mood>=35);
    if(gf>ga&&friends.length&&Math.random()<.25){const r=pick(friends);_pl16(pick(['Coluna: o trabalho do professor tem lógica','Bastidores: grupo fechado com o técnico']),'Texto de '+r.n+' ('+r.o+') aponta evolução.');G.paper[0].by=r.n;G.paper[0].paper=r.o;G.paper[0].tone='pos';c.humor=clamp(c.humor+.8,5,100)}
  }catch(e){console.error('jr '+e.message)}
  return out;
});
hookAround('startCareer','sc16',function(next,__a){let [id,coach,phil,asst]=__a;next(id,coach,phil,asst);G.jr=null;jrBox();save()});
hookAround('takeJob','tj16',function(next,__a){const r=next();try{jrBox().reps.forEach(x=>{x.mood*=.4});jrBox().silence=0}catch(e){}return r});
Object.assign(A,{
 repopen(d){S.rep=S.rep===+d.i?-1:+d.i;render()}
});

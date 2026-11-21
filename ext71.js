/* ext71 (v89): tutorial rápido. Todo save novo oferece "Fazer tutorial" ou "Pular"; dá pra refazer em Opções. */
(function(){
const STEPS=[
 {v:'inicio',t:'1/7 · Seu clube',b:'Aqui é a base: elenco, caixa, próximo jogo e os avisos do auxiliar. Toda decisão do jogo parte daqui.'},
 {v:'tatica',t:'2/7 · Tática',b:'Escolha a formação, o estilo e quem joga. Troque jogadores tocando neles. O jogo mostra quem encaixa melhor em cada posição.'},
 {v:'mercado',t:'3/7 · Contratar e vender',b:'Em Procura, abra a aba Buscar, digite o nome (ou deixe em branco), escolha os filtros e toque em Procurar (botão lá embaixo do campo). Cada clube pede um preço: ofereça, e se aceitar, o jogador é seu. Dá pra vender quem sobra também.'},
 {v:'clube',t:'4/7 · Dinheiro',b:'O clube tem caixa, folha salarial e dívida. A diretoria cobra resultado e limita gastos. Às vezes a meta é só ficar no meio da tabela e fechar no azul.'},
 {v:'staff',t:'5/7 · Comissão técnica',b:'Contrate preparador físico, analista, scouting. Sem médico e fisioterapeuta o time se lesiona mais. O auxiliar avisa quando falta alguém.'},
 {v:'assist',t:'6/7 · Auxiliar',b:'Ele dá dicas e alerta sobre elenco, lesões e formação. Quem decide é você: aplica a dica ou ignora.'},
 {v:'inicio',t:'7/7 · Bora jogar',b:'Toque em JOGAR (botão verde embaixo) para ir pra partida. Depois de cada rodada você vê o balanço financeiro e o jornal. Seu save é automático.'}
];
const css='.tut71{position:fixed;left:0;right:0;bottom:72px;z-index:99999;display:flex;justify-content:center;padding:0 12px;pointer-events:none}.tut71 .bx{pointer-events:auto;max-width:460px;width:100%;background:var(--card,#fff);color:var(--fg,#14201a);border:2px solid var(--accent,#0a9a4a);border-radius:16px;padding:14px 14px 12px;box-shadow:0 10px 40px rgba(0,0,0,.45)}.tut71 h3{margin:0 0 6px;font-size:16px}.tut71 p{margin:0 0 10px;font-size:14px;line-height:1.4}.tut71 .row{display:flex;gap:8px;flex-wrap:wrap}.tut71.ask{bottom:0;top:0;align-items:center;background:rgba(0,0,0,.55);pointer-events:auto}.tut71.min .bx{padding:8px 12px}.tut71.min p{display:none}.tut71.min .row .btn:not([data-a=tutmin]){display:none}.tut71.min h3{margin:0;font-size:14px}body.tut71on #app{padding-bottom:190px}';
function overlay(){
  let el=document.getElementById('tut71');if(el)el.remove();
  const t=S.tut;if(!t)return;
  el=document.createElement('div');el.id='tut71';
  if(t.ask){el.className='tut71 ask';el.innerHTML=`<div class="bx"><h3>⚽ Quer um tutorial rápido?</h3><p>Leva 1 minutinho e explica o básico: tática, mercado, dinheiro e comissão. Dá pra refazer depois em Opções.</p><div class="row"><button class="btn" data-a="tutgo">Fazer tutorial</button><button class="btn ghost" data-a="tutskip">Pular</button></div></div>`}
  else{const s=STEPS[t.i];if(!s){S.tut=null;return}
    el.className='tut71';el.innerHTML=`<div class="bx"><h3>${esc(s.t)}</h3><p>${esc(s.b)}</p><div class="row">${t.i>0?'<button class="btn sm ghost" data-a="tutprev">‹ Voltar</button>':''}<button class="btn sm ghost" data-a="tutmin">${S.tutMin?'Mostrar':'Minimizar'}</button><button class="btn sm" data-a="tutnext">${t.i===STEPS.length-1?'Terminar':'Próximo ›'}</button><button class="btn sm ghost" data-a="tutskip">Sair</button></div></div>`}
  if(!t.ask&&S.tutMin)el.classList.add('min');
  document.body.classList.toggle('tut71on',!t.ask&&!S.tutMin);
  document.body.appendChild(el);
  el.querySelectorAll('[data-a]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();const f=A[b.dataset.a];if(f)f({...b.dataset})});
}
function go(i){const s=STEPS[i];S.tut={i};G.view=s.v;S.modal=null;S.prof=null;S.paper=false;render();window.scrollTo(0,0)}
Object.assign(A,{
  tutgo(){go(0)},
  tutnext(){const i=(S.tut&&S.tut.i||0)+1;if(i>=STEPS.length){A.tutskip();toast('Tutorial concluído. Boa sorte, professor!');return}go(i)},
  tutprev(){go(Math.max(0,(S.tut&&S.tut.i||0)-1))},
  tutmin(){S.tutMin=!S.tutMin;overlay()},
  tutskip(){S.tut=null;try{G.tutDone=true;save()}catch(e){}render()},
  tutopen(){S.modal=null;go(0)}
});
if(!document.getElementById('tutcss71')){const st=document.createElement('style');st.id='tutcss71';st.textContent=css;document.head.appendChild(st)}
/* save novo pela tela de criação: pergunta se quer o tutorial */
const _bg71=A.begin;A.begin=function(){const mp=!!(S.mpSame||G&&G.mps);const r=_bg71.apply(this,arguments);
  try{if(!mp&&!S.mpSame&&!(G&&G.mps)&&G&&G.user!=null&&!G.tutDone&&!G._tutAsked){G._tutAsked=true;S.tut={ask:true};render()}}catch(e){}return r};
hookAround('render','r71',function(next,__a){next();try{overlay()}catch(e){}});
hookAround('vOpcoes','vo71',function(next,__a){let h=next();
  return h.replace(/<\/div>\s*$/,`<div class="card"><div class="k">Tutorial</div><p class="news">Rever o passo a passo básico do jogo.</p><button class="btn big ghost" data-a="tutopen">📘 Fazer o tutorial</button></div></div>`)});
})();

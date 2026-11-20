/* ext87 (v113, fase C): tela de tática mais limpa. Formação e estilo viram um botão recolhível mostrando a escolha atual;
   linha de atalhos para montar o time (melhores, descansados, jovens). Marcação e ataques ganham nomes mais claros. */
const pick87=(label,html)=>`<details class="pick87"><summary>${label}</summary>${html}</details>`;
globalThis.pick87=pick87;
function quickRow87(c){
  const mode=G.autoMode&&G.autoMode.mode||'nota';
  const chip=(m,t)=>`<button class="btn sm ${mode===m?'':'ghost'}" data-a="quickxi" data-m="${m}">${t}</button>`;
  return `<div class="quick87"><span class="k">Montar o time:</span>${chip('nota','Melhores')}${chip('desc','Descansados')}${chip('jov','Jovens')}</div>`;
}
globalThis.quickRow87=quickRow87;
Object.assign(A,{quickxi(d){const c=userClub();if(!c)return;
  const m=d.m;const v=m==='desc'?80:m==='jov'?23:0;
  G.autoMode={on:true,mode:m,val:{desc:80,jov:23}};
  autoPickMode(c,m,v);save();toast('Time montado: '+modeLbl(m,v)+'.');render()}});
/* nível que o jogador tem na vaga (mesma conta do motor, função eff): fora de posição perde a fração do macroPen */
function slotLvl87(p,slot,w){
  let f=1;if(w&&macroOK(p,slot,w))f=fitFine(p,w);else if(p.pos!==slot)f=macroPen(p,slot);
  return Math.round(p.ovr*f);
}
globalThis.slotLvl87=slotLvl87;
try{const st=document.createElement('style');st.textContent='.tok small.offpos{color:#ffb020;font-weight:800}';document.head.appendChild(st)}catch(e){}

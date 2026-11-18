/* ext39: menu de cima fixo e que não volta pra esquerda ao trocar de tela */
(function(){const st=document.createElement('style');st.textContent='@media (max-width:759px){.top2{position:sticky!important;top:env(safe-area-inset-top,0px)!important;z-index:30!important;background:rgba(4,7,13,.97)!important}}';document.head.appendChild(st)})();
var _icL39=0;
hookAround('render','r39',function(next,__a){
  try{const ic=document.querySelector('.top2 .ic');if(ic)_icL39=ic.scrollLeft}catch(e){}
  const r=next();
  try{const ic=document.querySelector('.top2 .ic');if(ic){ic.scrollLeft=_icL39;
    // garante que o setor ativo fique visível sem arrastar o resto
    const on=ic.querySelector('button.on');if(on){const a=on.offsetLeft,b=a+on.offsetWidth;if(a<ic.scrollLeft)ic.scrollLeft=a-8;else if(b>ic.scrollLeft+ic.clientWidth)ic.scrollLeft=b-ic.clientWidth+8}
    _icL39=ic.scrollLeft}}catch(e){}
  return r;
});

/* ext100 (v139): torcida com mais causas e efeito.
   1) VENDA: ídolo ou xodó vendido derruba o humor pelo carinho que a torcida tinha (favOf), não só por ser top 3 em overall.
      Ídolo = favOf >= 72, ou cria da base com favOf >= 60 (xodó). Top 3 que a torcida não ama pesa pouco.
   2) JOGO EM CASA: perder em casa dói mais (e pior ainda para time inferior ou por 2+ gols); ganhar em casa soma um pouco.
   3) SEQUÊNCIA: 3+ derrotas seguidas pioram a cada jogo extra; 3+ vitórias seguidas melhoram.
   Tudo passa por bump100, que registra o motivo (G.humLog) para a tela da Torcida mostrar "por que o clima mudou". */
(function(){
const LOGN=10;
function bump100(c,d,why){
  if(!d)return 0;const h0=c.humor;c.humor=clamp(Math.round(c.humor+d),5,100);const real=c.humor-h0;
  if(real){G.humLog=G.humLog||[];G.humLog.push({s:G.season,r:G.round,why,d:real});if(G.humLog.length>LOGN)G.humLog.shift()}
  return real}
const isIdol=(p,fv)=>fv>=72||(p.fromBase&&fv>=60);
/* venda: chamada de logic.js (sellPlayer) e ext37.js (xsell) */
function fanSale100(p,c,wasTop){
  try{
    if(!p||!c)return;
    const fv=typeof favOf==='function'?favOf(p):50,nm=p.name;
    if(isIdol(p,fv)){
      const h=-clamp((fv-58)/4,3.5,11)-(p.fromBase?2:0);
      bump100(c,h,'Venda de '+nm+(p.fromBase?' (xodó, cria da base)':' (ídolo)'));
      G.board.conf=clamp(G.board.conf-(fv>=85?3:2),0,100);
      addNews('Torcida revoltada com a venda de '+nm+(p.fromBase?', cria da casa':', ídolo do clube')+'.');
    }else if(wasTop){
      bump100(c,-2,'Venda de '+nm+' (titular importante)');G.board.conf=clamp(G.board.conf-1,0,100);
      addNews('A torcida estranhou a venda de '+nm+'.');
    }
  }catch(e){console.error('fanSale100 '+e.message)}
}
globalThis.fanSale100=fanSale100;
/* resultado do jogo do técnico: casa e sequência */
hookAfter('boardRound','fan100_br',function(ret,__a){
  try{
    if(globalThis.FAN100_OFF)return;   // só para medir (tools/sim/exp_torcida.js)
    const m=__a[0],c=userClub();if(!m||!c)return;
    const home=m.h.club.id===c.id,opp=home?m.a.club:m.h.club,gf=home?m.hg:m.ag,ga=home?m.ag:m.hg,gd=gf-ga;
    const weaker=(c.rep-opp.rep)>=4;
    if(home&&gd<0)bump100(c,gd<=-2||weaker?-3:-1.5,'Derrota em casa'+(weaker?' para time inferior':gd<=-2?' por goleada':''));
    else if(home&&gd>0)bump100(c,gd>=3?1.8:1,'Vitória em casa');
    else if(!home&&gd<0&&weaker)bump100(c,-1.2,'Derrota fora para time inferior');
    const s=c.CH||0;   // CH>0: derrotas seguidas; CH<0: vitórias seguidas (logic.js boardRound)
    if(s>=3)bump100(c,-clamp(s-2,1,2),s+' derrotas seguidas');
    else if(s<=-3)bump100(c,clamp(-s-2,1,2),(-s)+' vitórias seguidas');
  }catch(e){console.error('fan100 '+e.message)}
});
/* tela da Torcida: mostra por que o clima mudou */
hookAfter('vTorcida','fan100_ui',function(ret){
  try{
    const L=(G.humLog||[]).slice(-6).reverse();if(!L.length||typeof ret!=='string')return ret;
    const card='<div class="card"><div class="k">Por que o clima da torcida mudou</div>'+L.map(x=>'<div class="res"><span>'+esc(x.why)+' <small>('+x.s+'ª temp., rod. '+x.r+')</small></span><b class="'+(x.d>0?'ok':'bad')+'">'+(x.d>0?'+':'')+x.d+'</b></div>').join('')+'<p class="news">Ídolo vendido, derrota em casa e sequências ruins pesam mais. Vitórias em sequência e em casa levantam o clima.</p></div>';
    const i=ret.lastIndexOf('</div>');return i<0?ret:ret.slice(0,i)+card+ret.slice(i);
  }catch(e){console.error('fan100ui '+e.message);return ret}
});
})();

/* ext94 (v128): clube formador recebe 5% de toda transferência futura do jogador (como o mecanismo de solidariedade da FIFA).
   O formador é o clube de onde o jogador subiu da base (promoção, inclusive da IA) ou o clube que vendeu o garoto da base.
   O valor sai do que o vendedor recebe. Se o formador for o próprio vendedor, não há repasse. */
const FORM94=0.05;
hookAround('promoteYouth','ext94_py',function(next,__a){
  const c=__a[0];const antes=c&&c.squad?c.squad.length:0;const r=next(...__a);
  try{if(!r&&c&&c.squad.length>antes){const p=P(c.squad[c.squad.length-1]);if(p&&p.form==null)p.form=c.id}}catch(e){}
  return r;
});
hookAfter('logX','ext94_lx',function(r,__a){
  try{
    const [p,from,to,fee]=__a;if(!p||p.form==null||!(fee>0))return;
    const f=p.form;if(f===from||f===to)return;
    const amt=+(fee*FORM94).toFixed(2);if(amt<=0)return;
    if(from===G.user)G.fin.caixa=+(G.fin.caixa-amt).toFixed(2);else if(from>=0&&C(from))C(from).caixa=+((C(from).caixa||0)-amt).toFixed(2);
    if(f===G.user){G.fin.caixa=+(G.fin.caixa+amt).toFixed(2);addNews('💰 Direito de formação: '+lastName(p.name)+' foi negociado e o clube recebeu R$ '+amt.toFixed(2)+' mi (5%).')}
    else if(C(f))C(f).caixa=+((C(f).caixa||0)+amt).toFixed(2);
  }catch(e){console.error('ext94 '+e.message)}
});

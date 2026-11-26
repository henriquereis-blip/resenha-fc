/* ext85 (v111, fase A): objetivos da diretoria por posição, orçamento ligado ao resultado, demissão pesa zona e clube grande.
   Objetivos (N = clubes da divisão; rebaixam os 4 últimos):
     Brigar pelo título: meta até 2º · Libertadores/Champions: vaga direta · Sul-Americana/Europa League: vaga continental
     Meio de tabela: até N−6 (14º no Brasileirão) · Fugir do rebaixamento: 14º a 16º (a zona começa no N−3).
   Ano a ano: o resultado do ano anterior mexe no orçamento. Manter ou melhorar: sobe. Perder a meta: cai. */
function objSpots(c){
  const N=tableRows(c.div).length||20;
  if(c.div===0&&!G.abroad)return {N,lib:4,sul:6,rel:4};
  const L=c.ctry?wlOf(c.ctry):null;
  if(!c.ctry&&!G.abroad)return {N,lib:0,sul:0,rel:4}; /* Séries B/C/D: continua o objetivo de acesso (ext12) */
  return {N,lib:L&&L.ucl?L.ucl:4,sul:L&&L.uel?L.uel:2,rel:4};
}
function objOf(c){
  const S=objSpots(c),meta=metaFor(c);
  let key,label;
  if(meta<=2){key='titulo';label='Brigar pelo título (top '+meta+')'}
  else if(meta<=S.lib){key='lib';label=(c.div===0&&!G.abroad?'Classificar para a Libertadores':'Vaga direta na competição europeia/continental')+' (top '+meta+')'}
  else if(meta<=S.lib+S.sul){key='sul';label=(c.div===0&&!G.abroad?'Vaga na Sul-Americana':'Vaga na Europa League/Conference')+' (top '+meta+')'}
  else if(meta<=S.N-S.rel-2){key='meio';label='Meio de tabela (até o '+meta+'º)'}
  else{key='fuga';label='Fugir do rebaixamento (até o '+meta+'º)'}
  return {meta,key,label,S};
}
globalThis.objOf=objOf;
hookAfter('setMeta','ext85_sm',function(){const c=userClub();if(c&&(c.div===0||c.ctry||G.abroad))G.board.metaTxt=objOf(c).label});
hookAround('metaText','ext85_mt',function(next,__a){let [mp]=__a;const c=userClub();if(c&&(c.div===0||c.ctry||G.abroad))return objOf(c).label;return next(mp)});
/* orçamento de salários: último resultado frente à meta */
/* v140: o hook lia G.summary depois do newSeason (que o zera) e nunca agia. Agora lê antes (hookBefore) e aplica depois como fator
   sobre o teto de salários (o ext77 já ajusta o teto pelo superávit): 1,04 se bateu a meta, 1,0 se ficou perto, 0,97 se errou feio. */
hookBefore('newSeason','ext85_nsb',function(){
  try{const c=userClub(),sm=G.summary;if(!c||!sm||sm.season!==G.season){G._wbMul=1;return}
    const d=sm.pos-sm.meta;G._wbMul=d<=0?1.04:d<=2?1.0:0.97;
  }catch(e){G._wbMul=1;console.error('ext85 orc '+e.message)}
});
hookAfter('newSeason','ext85_ns',function(){
  try{const c=userClub();if(!c)return;G.wbMul=G._wbMul||1;
    if(G.wbMul!==1){G.wb=+(wageBudget()*G.wbMul).toFixed(2)}
  }catch(e){console.error('ext85 orc '+e.message)}
});
/* demissão: zona de rebaixamento pesa mais (clube grande pesa mais ainda); fugir do rebaixamento é objetivo, então pesa menos */
hookAround('shouldFire','ext85_sf',function(next,__a){
  const p=next();if(!p)return p;
  const c=userClub();if(!c)return p;
  const o=objOf(c),S=o.S,pos=posOf(c);
  const top=tableRows(c.div).slice(0,4).reduce((a,x)=>Math.min(a,x.rep),999);
  const big=c.rep>=top;
  let f=1;
  if(pos>S.N-S.rel){f*=o.key==='fuga'?1.1:big?1.6:1.3}
  if(pos>o.meta+3)f*=1.15;
  f=clamp(f,0,2);
  return Math.random()<clamp(f,0,1)?true:false;
});

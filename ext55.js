/* ext55: Argentina com ZONA A e ZONA B (carreira no exterior).
   30 clubes em 2 zonas de 15 (distribuídos em serpentina pela reputação, com sorteio no par). Cada torneio (Apertura/Clausura) tem 15 rodadas:
   14 jogos dentro da zona + 1 jogo interzonal (no lugar da folga, que num grupo de 15 sobra uma por rodada). Total 30 rodadas por temporada.
   Os 8 melhores de cada zona vão ao mata-mata de 16 (top51 em ext51). A aba Tabelas ganha o seletor Geral / Zona A / Zona B.
   Estado: G.argZ={s,d,A:[ids],B:[ids]}. */
function rr55(ids){
  let arr=shuffle(ids.slice());if(arr.length%2)arr.push(null);const n=arr.length,rounds=[];
  for(let r=0;r<n-1;r++){const rd=[];for(let i=0;i<n/2;i++){const a=arr[i],b=arr[n-1-i];rd.push(r%2?[b,a]:[a,b])}rounds.push(rd);arr=[arr[0],arr[n-1],...arr.slice(1,n-1)]}
  return rounds;
}
function zoneFx55(A,B){
  const ra=rr55(A),rb=rr55(B),out=[];
  for(let r=0;r<ra.length;r++){
    const pa=ra[r].filter(p=>p[0]!=null&&p[1]!=null),pb=rb[r].filter(p=>p[0]!=null&&p[1]!=null);
    const ia=(ra[r].find(p=>p[0]==null||p[1]==null)||[]).find(x=>x!=null),ib=(rb[r].find(p=>p[0]==null||p[1]==null)||[]).find(x=>x!=null);
    const m=pa.concat(pb);if(ia!=null&&ib!=null)m.push(r%2?[ib,ia]:[ia,ib]);
    out.push(m);
  }
  return out.concat(out.map(rd=>rd.map(([h,a])=>[a,h])));
}
function zoneAssign55(ids){
  const rows=ids.map(id=>({id,rep:C(id).rep})).sort((a,b)=>b.rep-a.rep),A=[],B=[];
  for(let i=0;i<rows.length;i+=2){const p=Math.random()<.5?[rows[i],rows[i+1]]:[rows[i+1],rows[i]];if(p[0])A.push(p[0].id);if(p[1])B.push(p[1].id)}
  return [A,B];
}
hookAround('pyrFx','pf55',function(next,__a){
  next();
  try{
    if(!G.pyr||G.pyr.k!=='ARG'||!G.abroad)return;
    const x=G.pyr.dv.find(v=>v.t===1);if(!x)return;
    const ids=G.clubs.filter(c=>c.div===x.d&&!c.stub).map(c=>c.id);
    if(ids.length!==30){G.argZ=null;return}
    const z=zoneAssign55(ids);G.argZ={s:G.season,d:x.d,A:z[0],B:z[1]};
    G.dfx[x.d]=zoneFx55(z[0],z[1]);
  }catch(e){console.error('zfx55 '+e.message)}
});
const zoneOf55=id=>G&&G.argZ?(G.argZ.A.includes(id)?'A':G.argZ.B.includes(id)?'B':null):null;
/* Tabelas: filtro por zona na 1ª divisão */
let _zf55=null;
hookAround('tableRows','tr55',function(next,__a){
  const r=next();
  try{if(_zf55&&G.argZ&&Array.isArray(r)&&r.length&&r.every(c=>c&&c.div===G.argZ.d)){const set=new Set(_zf55==='A'?G.argZ.A:G.argZ.B);return r.filter(c=>set.has(c.id))}}catch(e){}
  return r;
});
hookAround('vLiga','vl55',function(next,__a){
  const on=G.abroad&&G.pyr&&G.pyr.k==='ARG'&&G.argZ&&userDiv()>=4&&(S.abd?S.abd:userDiv())===G.argZ.d&&G.clubs.some(c=>c.div===G.argZ.d&&!c.stub);
  if(!on)return next();
  const z=S.zt==='A'||S.zt==='B'?S.zt:null;
  _zf55=z;let h;try{h=next()}finally{_zf55=null}
  const mine=zoneOf55(G.user);
  const seg=`<div class="seg sm"><button class="${!z?'on':''}" data-a="zt" data-v="">Geral</button><button class="${z==='A'?'on':''}" data-a="zt" data-v="A">Zona A${mine==='A'?' ★':''}</button><button class="${z==='B'?'on':''}" data-a="zt" data-v="B">Zona B${mine==='B'?' ★':''}</button></div>`;
  const note=`<p class="foot">15 clubes por zona: 14 jogos na zona + 1 interzonal por torneio. Os 8 melhores de cada zona vão ao mata-mata de 16 (jogo único).</p>`;
  return h.replace(/(<div class="seg sm scroll">)/,seg+'$1').replace(/(<p class="foot">[\s\S]*?<\/p>)/,'$1'+note);
});
Object.assign(A,{zt(d){S.zt=d.v||null;render()}});

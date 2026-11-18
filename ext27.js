/* ext27: Copinha (Copa São Paulo de Futebol Júnior) — torneio de base, 32 clubes, grupos + mata-mata */
function cpBox(){if(!G.cp)G.cp={hist:[],cur:null};return G.cp}
const CPN=['Fase de grupos','Oitavas','Quartas','Semifinal','Final'];
function cpStr(c){
  const ix=baseIdx(c);let q=11.4;
  if(c.id===G.user&&c.youth.length){const ys=c.youth.slice().sort((a,b)=>(b.stars*30+b.dev)-(a.stars*30+a.dev)).slice(0,14);q=ys.reduce((s,y)=>s+y.stars*2.2+y.dev*.12,0)/ys.length}
  return 38+ix*.55+q;
}
function cpPlay(a,b,ko,str){
  const la=1.35*Math.exp((str[a]-str[b])/24),lb=1.1*Math.exp((str[b]-str[a])/24);
  const poi=l=>{let k=0,p=Math.exp(-l),s=p,u=Math.random();while(u>s&&k<9){k++;p*=l/k;s+=p}return k};
  const ga=poi(la),gb=poi(lb);let pen=null,w=ga>gb?a:ga<gb?b:null;
  if(w===null&&ko){const pa=.5+(str[a]-str[b])/180;w=Math.random()<pa?a:b;pen=w===a?[5,4]:[4,5]}
  return {a,b,ga,gb,pen,w};
}
function cpScorers(c,n){
  const ys=c.youth.slice().sort((a,b)=>(b.stars*30+b.dev)-(a.stars*30+a.dev)).slice(0,16);if(!ys.length)return [];
  const wt=y=>({ATA:5,PNT:3,MEI:2,VOL:.7,LAT:.6,ZAG:.5,GOL:0}[y.role]||1)*(1+y.stars*.15);
  const out=[];for(let i=0;i<n;i++){let t=ys.reduce((s,y)=>s+wt(y),0)*Math.random();for(const y of ys){t-=wt(y);if(t<=0){out.push(y);break}}}
  return out;
}
function copinhaRun(){
  if(!G||G.user==null||!userClub())return;ex();const b=cpBox(),yr=2026+G.season;
  if(b.cur&&b.cur.s===G.season)return;
  const me=userClub();
  const all=G.clubs.filter(x=>x.id!==me.id).map(x=>[x,baseIdx(x)+rnd(0,28)]).sort((a,z)=>z[1]-a[1]).slice(0,31).map(x=>x[0]);
  const field=[me,...all];const str={};field.forEach(x=>str[x.id]=cpStr(x)+rnd(-3,3));
  // sorteio dos grupos (embaralha)
  const sh=field.slice();for(let i=sh.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[sh[i],sh[j]]=[sh[j],sh[i]]}
  const groups=[];for(let g=0;g<8;g++)groups.push(sh.slice(g*4,g*4+4).map(x=>x.id));
  const tbl={};field.forEach(x=>tbl[x.id]={P:0,J:0,GP:0,GC:0});
  const log=[];const mine=[];
  const rec=(r,label)=>{if(r.a===me.id||r.b===me.id)mine.push(Object.assign({label},r))};
  for(const g of groups){for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){const r=cpPlay(g[i],g[j],false,str);
    for(const [x,gf,gc] of [[r.a,r.ga,r.gb],[r.b,r.gb,r.ga]]){const t=tbl[x];t.J++;t.GP+=gf;t.GC+=gc;t.P+=gf>gc?3:gf===gc?1:0}rec(r,'Grupos')}}
  const adv=[];groups.forEach(g=>{const o=g.slice().sort((a,z)=>tbl[z].P-tbl[a].P||(tbl[z].GP-tbl[z].GC)-(tbl[a].GP-tbl[a].GC)||tbl[z].GP-tbl[a].GP);adv.push(o[0],o[1])});
  let alive=adv.slice(),st=1,out=me.id===adv.find(x=>x===me.id)?null:'Fase de grupos';
  if(!alive.includes(me.id))out='Fase de grupos';
  // chaveamento: 1ºA x 2ºB etc.
  let br=[];for(let g=0;g<8;g+=2){br.push([adv[g*2],adv[(g+1)*2+1]],[adv[(g+1)*2],adv[g*2+1]])}
  let champ=null;
  while(st<=4){
    const next=[];for(const [a,z] of br){const r=cpPlay(a,z,true,str);rec(r,CPN[st]);next.push(r.w);
      if((a===me.id||z===me.id)&&r.w!==me.id&&!out)out=CPN[st]}
    alive=next;if(alive.length===1){champ=alive[0];break}
    br=[];for(let i=0;i<alive.length;i+=2)br.push([alive[i],alive[i+1]]);st++;
  }
  if(champ===me.id)out='Campeão';
  // consequências para a base do usuário
  const gain=out==='Campeão'?4:out==='Final'?3:out==='Semifinal'?2:out==='Quartas'?1.5:1;
  const played=cpScorers(me,0);const ys=me.youth.slice().sort((a,z)=>(z.stars*30+z.dev)-(a.stars*30+a.dev)).slice(0,18);
  ys.forEach(y=>{y.dev=Math.min(100,y.dev+ri(1,Math.round(1+gain)))});
  let goals=0;mine.forEach(m=>goals+=m.a===me.id?m.ga:m.gb);
  const gs=cpScorers(me,goals);const cnt={};gs.forEach(y=>{cnt[y.name]=(cnt[y.name]||0)+1});
  const top=Object.entries(cnt).sort((a,z)=>z[1]-a[1])[0];
  let rev=null;
  if(ys.length){const best=ys.slice().sort((a,z)=>(z.stars*20+z.dev+(cnt[z.name]||0)*8+Math.random()*10)-(a.stars*20+a.dev+(cnt[a.name]||0)*8+Math.random()*10))[0];
    best.dev=Math.min(100,best.dev+ri(3,8));best.stars=Math.min(5,best.stars+(Math.random()<.18?1:0));best.value=+(best.value*1.25).toFixed(3);rev=best.name+' ('+best.stars+'★)'}
  const sc=scaleOf(me),prize=+(sc*.0015*(out==='Campeão'?14:out==='Final'?8:out==='Semifinal'?5:out==='Quartas'?3:out==='Oitavas'?2:1)).toFixed(2);
  G.fin.caixa=+(G.fin.caixa+prize).toFixed(2);
  if(out==='Campeão'){me.humor=clamp(me.humor+3,5,100);G.board.conf=clamp(G.board.conf+2,0,100);paperLine('Garotos do '+me.name+' são campeões da Copinha '+yr+'!','A base vira assunto nacional.')}
  const cname=champ===me.id?me.name:C(champ).name;
  const res={s:G.season,yr,out,champ:champ,cname,prize,top:top?top[0]+' ('+top[1]+' gols)':null,rev,matches:mine.map(m=>({l:m.label,a:C(m.a).sig,b:C(m.b).sig,ga:m.ga,gb:m.gb,pen:m.pen,me:m.a===me.id?'a':'b'}))};
  b.cur=res;b.hist.push({s:res.s,yr,out,cname});if(b.hist.length>30)b.hist.shift();
  addNews('Copinha '+yr+': '+(out==='Campeão'?'a base do '+me.name+' é campeã!':'o '+me.name+' parou em '+out.toLowerCase()+'. Campeão: '+cname+'.')+(rev?' Revelação: '+rev+'.':''));
}
const _sc27=startCareer;startCareer=function(){const r=_sc27.apply(this,arguments);try{copinhaRun()}catch(e){console.error('copinha '+e.message)}return r};
hookAfter('newSeason','ext27_ns27',()=>{copinhaRun()});
const _ls27=loadSave;loadSave=function(){const ok=_ls27();if(ok&&G&&!G.cp)G.cp={hist:[],cur:null};return ok};
/* UI na Base */
function copinhaCard(){
  const b=cpBox(),r=b.cur;if(!r)return '';
  const cls=r.out==='Campeão'?'gold':r.out==='Final'||r.out==='Semifinal'?'ok':'';
  const ms=r.matches.map(m=>`<div class="res"><span style="font-size:13px">${m.l} · ${m.me==='a'?'<b>'+m.a+'</b> x '+m.b:m.a+' x <b>'+m.b+'</b>'}</span><b style="font-size:14px">${m.ga} – ${m.gb}${m.pen?' <small>(pên.)</small>':''}</b></div>`).join('');
  const h=b.hist.slice(0,-1).reverse().slice(0,6);
  return `<section class="sec card cp27"><h3>Copinha ${r.yr}<small>Copa São Paulo Sub-20</small></h3>
   <p class="news"><span class="badge ${cls}">${r.out==='Campeão'?'Campeão!':'Parou em: '+r.out}</span><br>32 clubes, 8 grupos de 4, mata-mata em jogo único. Campeã: ${esc(r.cname)}.</p>
   ${ms}
   ${r.top?`<div class="res"><span>Artilheiro da base</span><b>${esc(r.top)}</b></div>`:''}${r.rev?`<div class="res"><span>Revelação</span><b>${esc(r.rev)}</b></div>`:''}
   <div class="res"><span>Premiação</span><b>+${mi(r.prize)}</b></div>
   ${h.length?`<p class="news">Anteriores: ${h.map(x=>x.yr+' '+(x.out==='Campeão'?'🏆':x.out)).join(' · ')}</p>`:''}
   <p class="foot">Quanto melhor a base e mais jovens de potencial, mais longe você vai. Participar acelera a evolução dos garotos.</p></section>`;
}
const _vb27=vBase;vBase=function(){let h=_vb27();try{const k=copinhaCard();if(k){const i=h.indexOf('<p class="foot">Dados reais da base');h=i>0?h.slice(0,i)+k+h.slice(i):h.replace(/<\/div>\s*$/,k+'</div>')}}catch(e){console.error('cp ui '+e.message)}return h};

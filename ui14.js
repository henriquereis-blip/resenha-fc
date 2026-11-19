/* ui14: camisas na tela, terceira camisa no Marketing */
function clubCfg(){
  const c=userClub();
  return {club:c,mode:'club',kind:'home',formation:c.formation,slots:slotsOf(c.formation),lineup:c.squad.slice(0,11),bench:c.squad.slice(11,18),reserves:c.squad.slice(18)};
}
function matchCfg(){
  const m=R.ms[R.ui],k=userSide(m),s=m[k];
  return {club:s.club,mode:'match',kind:matchKind(m.h.club,m.a.club,k),formation:s.formation,slots:s.slots,lineup:s.lineup,bench:s.bench,reserves:null,rt:m.rt,en:m.en,sent:s.sent};
}
function kitCss(k){
  if(k.pat==='v')return `repeating-linear-gradient(90deg,${k.a} 0 3px,${k.b} 3px 6px)`;
  if(k.pat==='h')return `repeating-linear-gradient(0deg,${k.a} 0 3px,${k.b} 3px 6px)`;
  if(k.pat==='half')return `linear-gradient(90deg,${k.a} 50%,${k.b} 50%)`;
  return k.a;
}
function dotsOf(m,k){
  const s=m[k],pos=layout(s.slots,s.formation),c=s.club;const kit=kitOf(c,matchKind(m.h.club,m.a.club,k));
  return s.lineup.map((id,i)=>{if(s.sent.includes(id))return '';const y=pos[i].y,x=pos[i].x;
    const px=k==='h'?(100-y)*0.52:100-(100-y)*0.52,py=x;const en=m.en[id]!==undefined?m.en[id]:P(id).en;
    return `<i class="dt ${k}" style="left:${px}%;top:${py}%;background:${kitCss(kit)};border-color:${en<45?'#ff5a52':lumOf(kit.a)>.8?'#6b7280':'#fff'}"></i>`}).join('');
}
/* marketing: camisas */
hookAround('vMarketing','vmk14',function(next,__a){
  let r=next();const c=userClub(),B=G.kit3||{season:-1,hist:[],cur:null},k=Object.assign({col:0,pat:'plain',con:'mini'},S.k3||{});
  const used=B.season===G.season;
  const sh=(kind,lab)=>`<div style="text-align:center"><div style="width:54px;margin:0 auto">${shirtSvg(c,kind)}</div><small class="k">${lab}</small></div>`;
  const cols=K3_COLS.map((x,i)=>`<button class="sch ${k.col===i?'on':''}" data-a="k3col" data-i="${i}" style="background:${x[0]};color:${x[1]};border-color:${x[1]}">${x[2]}</button>`).join('');
  const pats=K3_PAT.map(p=>`<button class="sch ${k.pat===p[0]?'on':''}" data-a="k3pat" data-p="${p[0]}">${p[1]}</button>`).join('');
  const cons=K3_CON.map(x=>`<button class="sch ${k.con===x[0]?'on':''}" data-a="k3con" data-c="${x[0]}" title="${x[2]}">${x[1]}</button>`).join('');
  const prev=K3_COLS[k.col],third={a:prev[0],b:prev[1],pat:k.pat};
  const card=`<div class="x9"><section class="sec card"><h3>Camisas<small>casa · fora · terceira</small></h3>
   <div class="row3">${sh('home','Casa')}${sh('away','Fora')}${B.cur?sh('third','3ª '+(B.cur.src==='custom'?'':'sug.')):`<div style="text-align:center;color:var(--mut)"><div style="width:54px;height:54px;margin:0 auto;border:2px dashed var(--line);border-radius:10px"></div><small class="k">3ª vazia</small></div>`}</div>
   <p class="news">Reservas usam camisa cinza padrão. O visitante troca para a camisa 2 se as cores baterem.</p>
   ${used?`<p class="news">Terceira camisa desta temporada já lançada${B.done?'':' (resultado de vendas ainda em apuração)'}.</p>`:`
   <div class="k">Cor</div><div class="schips" style="flex-wrap:wrap">${cols}</div>
   <div class="k" style="margin-top:6px">Padrão</div><div class="schips" style="flex-wrap:wrap">${pats}</div>
   <div class="k" style="margin-top:6px">Conceito</div><div class="schips" style="flex-wrap:wrap">${cons}</div>
   <div class="row" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px"><button class="btn sm" data-a="k3go">Lançar · ${mi(kit3Cost(c))}</button><button class="btn sm ghost" data-a="k3dir">Sugestão do diretor</button><button class="btn sm ghost" data-a="k3patro">Sugestão do patrocinador</button></div>
   <p class="news">Sucesso ou fracasso depende do conceito, da tradição do clube, do contraste com a camisa 1 e do seu atributo de Mídia. Só uma por temporada.</p>`}
   ${B.hist.length&&!used?`<div class="k" style="margin-top:6px">Reedições</div><div class="schips">${B.hist.map((h,i)=>`<button class="sch" data-a="k3re" data-i="${i}">${h.name}${h.ok?' ✔':''}</button>`).join('')}</div>`:''}
   ${B.hist.length?`<div class="k" style="margin-top:6px">${B.hist.map(h=>`${h.s}: ${esc(h.name)} ${h.ok?'sucesso':'fracasso'} (${mi(h.gain)})`).join('<br>')}</div>`:''}
  </section></div>`;
  return r.replace(/<\/div>$/,card+'</div>');
});

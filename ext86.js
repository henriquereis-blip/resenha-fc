/* ext86 (v112, fase B): ingresso automático. Você escolhe só o nível de preço (tier), e o jogo põe o preço padrão de cada competição/fase.
   Preço padrão (R$): estadual é barato, Brasileirão médio, copa e continental mais caros, e as fases decisivas mais caras ainda.
   Tier (A1 = padrão): A2/A3 sobem o preço e tiram público (com torcida boa, o público se mantém); B1/B2/B3 descem o preço e enchem mais.
   Demanda: jogo decisivo enche mais. Não há input por partida, então o preço não escala sozinho. */
const TIERS86={A1:1,A2:1.25,A3:1.5,B1:0.85,B2:0.7,B3:0.55};
const TIER_NAME86={A1:'Padrão',A2:'Premium',A3:'Premium+',B1:'Popular',B2:'Popular+',B3:'Promoção'};
const PRICE86={
  estadual:[20,25,35,50],          // grupo, oitavas, semi, final
  liga:[40],                        // Série A (divisões menores têm preço menor, ver divFac86)
  copa:[40,45,55,70,90],            // 1ª fase, oitavas, quartas, semi, final
  cont:[55,65,80,100,130]           // grupo, oitavas, quartas, semi, final
};
const DEM86={estadual:0.8,liga:1,copa:1.1,cont:1.15};
const divFac86=d=>[1,0.6,0.4,0.3][Math.min(3,d||0)];
/* contexto da partida do usuário nesta rodada */
function ctxOf86(c){
  try{
    const e=G.est;if(e&&e.phase!=='done'&&estDue()){const ph=e.phase==='liga'?0:Math.max(1,(e.st||0)+1);return {kind:'estadual',stage:Math.min(3,ph)}}
    const cd=contDue();if(cd!==null&&cd!==undefined&&G.cont&&G.cont.alive){const st=G.cont.phase==='group'?0:Math.min(4,1+(G.cont.st||0));return {kind:'cont',stage:st}}
    if(G.cup&&!G.cup.champ&&CSL.includes(G.round)&&userInPairs(G.cup.pairs)){return {kind:'copa',stage:Math.min(4,G.cup.st||0)}}
  }catch(e){}
  return {kind:'liga',stage:0};
}
function ticketInfo86(c,m){
  const ctx=ctxOf86(c),tier=(G.fin&&G.fin.tier)||'A1';
  const arr=PRICE86[ctx.kind],std=(arr[Math.min(arr.length-1,ctx.stage)])*(ctx.kind==='liga'?divFac86(c.div):1);
  const price=Math.round(std*TIERS86[tier]);
  const demand=DEM86[ctx.kind]*(ctx.kind==='liga'?1:1+0.1*ctx.stage);
  const fill=Math.pow(TIERS86[tier],-0.8);
  return {kind:ctx.kind,stage:ctx.stage,std,price,demand,fill,tier};
}
globalThis.ticketInfo86=ticketInfo86;
/* tela: tabela de preços por competição com o tier atual */
function tierTable86(c){
  const tier=(G.fin&&G.fin.tier)||'A1';
  const rows=[['Estadual (grupo)',PRICE86.estadual[0]],['Brasileirão (Série A)',PRICE86.liga[0]],['Copa (1ª fase)',PRICE86.copa[0]],['Copa (final)',PRICE86.copa[4]],['Libertadores (grupo)',PRICE86.cont[0]],['Libertadores (final)',PRICE86.cont[4]]];
  return rows.map(([n,p])=>`<div class="res"><span>${n}</span><b>R$ ${Math.round(p*TIERS86[tier])}</b></div>`).join('');
}
/* nome do estádio (oficial ou popular). Brasil: Série A; demais ligas entram depois */
const STAD86={'Palmeiras':'Allianz Parque','Flamengo':'Maracanã','Botafogo':'Estádio Nilton Santos','Atlético-MG':'Arena MRV','Fluminense':'Maracanã','São Paulo':'Morumbi','Internacional':'Beira-Rio','Grêmio':'Arena do Grêmio','Corinthians':'Neo Química Arena','Cruzeiro':'Mineirão','Bahia':'Arena Fonte Nova','Vasco':'São Januário','Athletico-PR':'Ligga Arena','Santos':'Vila Belmiro','Bragantino':'Nabi Abi Chedid','Vitória':'Barradão','Coritiba':'Couto Pereira','Mirassol':'Estádio José Maria de Campos Maia','Chapecoense':'Arena Condá','Remo':'Estádio Evandro Almeida'};
const stadName86=c=>STAD86[c.name]||'Estádio do clube';
globalThis.stadName86=stadName86;
function tierCard86(c){
  const tier=(G.fin&&G.fin.tier)||'A1';
  const l=G.fin&&G.fin.last;
  return `<div class="card"><div class="k">${stadName86(c)} · ${c.cap.toLocaleString('pt-BR')} lugares</div><div class="k">Preço do ingresso · ${tier} (${TIER_NAME86[tier]})</div><p class="news">O preço de cada jogo sai automático pela competição e pela fase. Você escolhe só o nível: torcida boa aguenta preço mais alto; preço baixo enche o estádio. Torcida ${c.humor}/100.${l&&l.home?' Último público: '+l.att.toLocaleString('pt-BR')+' ('+Math.round(l.att/c.cap*100)+'% de ocupação).':''}</p><div class="seg sm">${Object.keys(TIERS86).map(t=>`<button class="${t===tier?'on':''}" data-a="tier" data-t="${t}">${t}</button>`).join('')}</div>${tierTable86(c)}</div>`;
}
globalThis.tierCard86=tierCard86;
Object.assign(A,{tier(d){G.fin.tier=d.t;save();render()}});

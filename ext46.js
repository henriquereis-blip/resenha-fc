/* ext46: menu do topo = 5 categorias coloridas + abas sublinhadas + botão "Tudo" (grade com todas as telas) */
const CAT46=[
  ['clube','🏟️','Clube','dir',['clube','dir','estadio','base','torcida','marketing'],'#f0b43a'],
  ['equipe','👔','Equipe','meutec',['meutec','assist','staff','medico','treino','vest'],'#35f0a0'],
  ['comp','🏆','Torneios','agenda',['agenda','liga','comp'],'#5ab0ff'],
  ['mundo','🌎','Mundo','mercado',['mercado','times','tecnicos'],'#c58bff'],
  ['mais','⋯','Mais','opcoes',['historia','opcoes'],'#aab4c0']
];
const IC46={dir:'🏛️',estadio:'🏟️',base:'🌱',torcida:'🔥',marketing:'📣',meutec:'🧠',assist:'🎲',staff:'🧑‍💼',medico:'🩺',treino:'🏋️',vest:'🗣️',agenda:'📅',liga:'🏆',comp:'🌎',mercado:'🔍',times:'👕',tecnicos:'🧢',historia:'📜',opcoes:'⚙️'};
const NM46={dir:'Diretoria',estadio:'Estádio',base:'Base',torcida:'Torcida',marketing:'Marketing',meutec:'Técnico',assist:'Auxiliar',staff:'Comissão',medico:'Médico',treino:'Treino',vest:'Vestiário',agenda:'Agenda',liga:'Tabelas',comp:'Copas',mercado:'Procura',times:'Times',tecnicos:'Técnicos',historia:'História',opcoes:'Opções'};
IC46.clube='💵';NM46.clube='Finanças';
(function(){const st=document.createElement('style');st.textContent=`
.top2 .ic.n46{display:block;overflow:visible!important;padding:2px 4px 0!important}
.n46 .c46{display:grid;grid-template-columns:repeat(6,1fr);gap:2px}
.n46 .c46 button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-width:0!important;min-height:46px!important;padding:4px 1px 3px!important;margin:2px 0!important;border-radius:12px;opacity:.65}
.n46 .c46 button span{font-size:20px;line-height:1}
.n46 .c46 button small{font:700 9px var(--fh)!important;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.n46 .c46 button.on{opacity:1;background:color-mix(in srgb,var(--cc) 17%,transparent)!important;color:var(--cc)!important}
.top2 .ic.n46 .c46 button.on::after{content:"";position:absolute;left:26%;right:26%;bottom:1px;height:2px;border-radius:2px;background:var(--cc)}
.n46 .c46 button.all{opacity:1;color:var(--fg);background:color-mix(in srgb,var(--fg) 8%,transparent)}
.n46 .s46{display:flex;overflow-x:auto;scrollbar-width:none;border-top:1px solid var(--line);margin-top:2px;padding:0 2px}
.n46 .s46::-webkit-scrollbar{display:none}
.n46 .s46 button{flex:1 0 auto;min-width:0!important;min-height:34px!important;padding:8px 9px!important;margin:0!important;border-radius:0!important;opacity:1!important;background:none!important;color:var(--mut)!important;font:700 12px var(--fh)!important;white-space:nowrap;position:relative;box-shadow:none!important;border:0!important}
.n46 .s46 button.on{color:var(--fg)!important}
.top2 .ic.n46 .s46 button.on::before{display:none!important}
.top2 .ic.n46 .s46 button.on::after{display:block!important;content:"";position:absolute;left:8px;right:8px;bottom:0;top:auto;height:3px;border-radius:3px;background:var(--cc)}
.p46{display:block;position:fixed;left:0;right:0;bottom:0;z-index:60;overflow:auto;background:color-mix(in srgb,var(--bg) 96%,#000);padding:10px 12px calc(14px + env(safe-area-inset-bottom,0px));-webkit-overflow-scrolling:touch}
.p46[hidden]{display:none!important}
.p46 h4{margin:12px 0 6px;font:800 11px var(--fh);letter-spacing:.1em;text-transform:uppercase}
.p46 .g{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}
.p46 .g button{display:flex;flex-direction:column;align-items:center;gap:3px;padding:11px 4px;border-radius:13px;border:1px solid var(--line);background:var(--card);color:var(--fg);font:700 12px var(--fh);min-height:0!important;margin:0!important;opacity:1!important}
.p46 .g button span{font-size:22px}
.p46 .g button.on{border-color:var(--cc);background:color-mix(in srgb,var(--cc) 14%,var(--card))}
.p46 .cl{display:block;width:100%;margin-top:14px;padding:11px;border-radius:12px;border:0;background:color-mix(in srgb,var(--fg) 10%,transparent);color:var(--fg);font:800 13px var(--fh);min-height:0!important}
`;document.head.appendChild(st)})();
function cat46(v){return CAT46.find(c=>c[4].indexOf(v)>=0)}
function menu46(){
  try{
    const ic=document.querySelector('.top2 .ic');if(!ic||ic.classList.contains('n46'))return;
    const cur=G.view==='elenco'?'inicio':G.view,free=S.paper||S.prof!==null,ct=free?null:cat46(cur);
    let h='<div class="c46">'+CAT46.map(c=>`<button style="--cc:${c[5]}" class="${ct&&ct[0]===c[0]?'on':''}" data-a="nav" data-v="${c[3]}"><span>${c[1]}</span><small>${c[2]}</small></button>`).join('')+'<button class="all" data-a="m46"><span>⊞</span><small>Tudo</small></button></div>';
    if(ct)h+=`<div class="s46" style="--cc:${ct[5]}">`+ct[4].map(v=>`<button class="${v===cur?'on':''}" data-a="nav" data-v="${v}">${NM46[v]}</button>`).join('')+'</div>';
    let ph='<div class="g0">'+CAT46.map(c=>`<h4 style="color:${c[5]}">${c[1]} ${c[2]}</h4><div class="g" style="--cc:${c[5]}">${c[4].map(v=>`<button class="${v===cur?'on':''}" data-a="nav" data-v="${v}"><span>${IC46[v]}</span>${NM46[v]}</button>`).join('')}</div>`).join('')+'<button class="cl" data-a="m46">Fechar</button></div>';
    let pn=document.getElementById('p46');if(!pn){pn=document.createElement('div');pn.id='p46';pn.className='p46';document.body.appendChild(pn)}pn.innerHTML=ph;pn.hidden=true;
    ic.classList.add('n46');ic.innerHTML=h;
    const on=ic.querySelector('.s46 .on');if(on&&on.scrollIntoView){const sc=ic.querySelector('.s46');sc.scrollLeft=Math.max(0,on.offsetLeft-sc.clientWidth/2+on.offsetWidth/2)}
  }catch(e){console.error('menu46 '+e.message)}
}
Object.assign(A,{m46(){const p=document.getElementById('p46');if(!p)return;
  if(p.hidden){const hd=document.querySelector('.top2');p.style.top=Math.round((hd?hd.getBoundingClientRect().bottom:60))+'px';p.hidden=false}else p.hidden=true}});
const _rd46=render;render=function(){_rd46.apply(this,arguments);if(G&&G.phase!=='start'&&!S.match)menu46()};

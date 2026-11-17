/* ext46: menu do topo em 5 categorias + subabas (substitui a fila de 19 abas) */
const CAT46=[
  ['clube','🏟️','Clube','dir',['dir','estadio','base','torcida','marketing']],
  ['equipe','👔','Equipe','meutec',['meutec','assist','staff','medico','treino','vest']],
  ['comp','🏆','Torneios','agenda',['agenda','liga','comp']],
  ['mundo','🌎','Mundo','mercado',['mercado','times','tecnicos']],
  ['mais','⋯','Mais','opcoes',['historia','opcoes']]
];
(function(){const st=document.createElement('style');st.textContent=`
.top2 .ic.n46{display:block;overflow:visible!important;padding:2px 4px 0!important}
.n46 .c46{display:grid;grid-template-columns:repeat(5,1fr);gap:2px}
.n46 .c46 button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-width:0!important;min-height:46px!important;padding:4px 2px 3px!important;margin:2px 0!important;border-radius:12px;opacity:.62}
.n46 .c46 button span{font-size:20px;line-height:1}
.n46 .c46 button small{font:700 9.5px var(--fh)!important;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}
.n46 .c46 button.on{opacity:1;background:#35f0a01a;color:var(--accent)}
.n46 .c46 button.on::after{content:"";position:absolute;left:28%;right:28%;bottom:1px;height:2px;border-radius:2px;background:var(--accent)}
.n46 .s46{display:grid;gap:5px;padding:5px 2px 7px;border-top:1px solid var(--line);margin-top:2px}
.n46 .s46 button{min-width:0!important;min-height:30px!important;padding:5px 10px!important;margin:0!important;border-radius:999px;opacity:1!important;background:color-mix(in srgb,var(--fg) 8%,transparent);font:700 12px var(--fh)!important;white-space:nowrap}
.n46 .s46 button.on{background:var(--accent)!important;color:#04150b!important}
.top2 .ic.n46 .s46 button.on::after,.top2 .ic.n46 .s46 button.on::before{display:none!important}.top2 .ic.n46 .s46 button.on{box-shadow:none!important;border:0!important}
`;document.head.appendChild(st)})();
function cat46(v){return CAT46.find(c=>c[4].indexOf(v)>=0)}
function menu46(){
  try{
    const ic=document.querySelector('.top2 .ic');if(!ic||ic.classList.contains('n46'))return;
    const lab={};ic.querySelectorAll('button[data-v]').forEach(b=>{lab[b.dataset.v]=[b.querySelector('span')?b.querySelector('span').textContent:'',b.querySelector('small')?b.querySelector('small').textContent:b.textContent]});
    const cur=G.view==='elenco'?'inicio':G.view,free=S.paper||S.prof!==null,ct=free?null:cat46(cur);
    let h='<div class="c46">'+CAT46.map(c=>`<button class="${ct&&ct[0]===c[0]?'on':''}" data-a="nav" data-v="${c[3]}"><span>${c[1]}</span><small>${c[2]}</small></button>`).join('')+'</div>';
    if(ct)h+='<div class="s46" style="grid-template-columns:repeat('+(ct[4].length>=5?3:ct[4].length)+',1fr)">'+ct[4].map(v=>`<button class="${v===cur?'on':''}" data-a="nav" data-v="${v}">${(lab[v]&&lab[v][1])||v}</button>`).join('')+'</div>';
    ic.classList.add('n46');ic.innerHTML=h;
  }catch(e){console.error('menu46 '+e.message)}
}
const _rd46=render;render=function(){_rd46.apply(this,arguments);if(G&&G.phase!=='start'&&!S.match)menu46()};

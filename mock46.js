const {chromium}=require('playwright');
const out='/tmp/claude-0/-home-claude/3a2f51d8-d6d5-5ddb-9a29-e3f98b6d4e3c/p18/m/';require('fs').mkdirSync(out,{recursive:true});
const NAMES={agenda:'Agenda',liga:'Tabelas',meutec:'Técnico',dir:'Diretoria',medico:'Médico',treino:'Treino',vest:'Vestiário',assist:'Auxiliar',staff:'Comissão',comp:'Copas',marketing:'Marketing',torcida:'Torcida',estadio:'Estádio',base:'Base',times:'Times',mercado:'Procura',tecnicos:'Técnicos',historia:'História',opcoes:'Opções'};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:400,height:760},deviceScaleFactor:2});p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/resenha-fc-v2.html');await p.waitForTimeout(500);
await p.evaluate(()=>{G.user=G.clubs.findIndex(c=>c.div===0);G.phase='play';G.view='inicio';render()});
const states=[['geral','inicio'],['clube','dir'],['equipe','vest'],['torneios','liga'],['mundo','mercado'],['mais','historia']];
// variante 2 e 3 reescrevem o .ic depois do render
await p.addStyleTag({content:`
.v2 .s46{display:flex!important;gap:0!important;overflow-x:auto;padding:0 4px!important;border-top:1px solid var(--line)}
.v2 .s46 button{background:none!important;border-radius:0!important;flex:0 0 auto;padding:9px 12px!important;color:var(--mut)!important;min-height:36px!important;position:relative}
.v2 .s46 button.on{background:none!important;color:var(--fg)!important}
.v2 .s46 button.on::after{display:block!important;content:"";position:absolute;left:10px;right:10px;bottom:0;height:3px;border-radius:3px;background:var(--cc,var(--accent))}
.v2 .c46 button.on{background:color-mix(in srgb,var(--cc) 16%,transparent)!important;color:var(--cc)!important}
.v3 .t3{display:flex;align-items:center;gap:8px;padding:6px 6px 2px}
.v3 .t3 .mn{display:flex;align-items:center;gap:6px;background:var(--accent);color:#04150b;border:0;border-radius:12px;padding:9px 13px;font:800 13px var(--fh);cursor:pointer}
.v3 .t3 .cr{font:800 14px var(--fh);color:var(--fg)}.v3 .t3 .cr small{color:var(--mut);font:600 12px var(--fb);margin-left:6px}
.v3 .sc{display:flex;gap:6px;overflow-x:auto;padding:4px 6px 8px}
.v3 .sc button{flex:0 0 auto;border:0;border-radius:999px;padding:7px 13px;background:color-mix(in srgb,var(--fg) 9%,transparent);color:var(--fg);font:700 12px var(--fh);min-height:0!important;margin:0!important}
.v3 .sc button.on{background:var(--accent);color:#04150b}
.v3 .gr{padding:8px 8px 10px}.v3 .gr h4{margin:8px 0 5px;font:800 11px var(--fh);letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}
.v3 .gr .g{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}
.v3 .gr .g button{display:flex;flex-direction:column;align-items:center;gap:3px;padding:9px 4px;border-radius:12px;border:1px solid var(--line);background:var(--card);color:var(--fg);font:700 11px var(--fh);min-height:0!important;margin:0!important;opacity:1!important}
.v3 .gr .g button span{font-size:20px}`});
const ICON={dir:'🏛️',estadio:'🏟️',base:'🌱',torcida:'🔥',marketing:'📣',meutec:'🧠',assist:'🎲',staff:'🧑‍💼',medico:'🩺',treino:'🏋️',vest:'🗣️',agenda:'📅',liga:'🏆',comp:'🌎',mercado:'🔍',times:'👕',tecnicos:'🧢',historia:'📜',opcoes:'⚙️'};
const COL={clube:'#f0b43a',equipe:'#35f0a0',comp:'#5ab0ff',mundo:'#c58bff',mais:'#aab4c0'};
for(const v of [1,2,3]){
 for(const [nm,view] of states){
  await p.evaluate(({v,view,NAMES,ICON,COL,nm})=>{
    G.view=view;S.paper=false;S.prof=null;render();window.scrollTo(0,0);
    document.body.classList.remove('v2','v3');const ic=document.querySelector('.top2 .ic');
    const ct=CAT46.find(c=>c[4].includes(view));
    if(v===2){document.body.classList.add('v2');ic.style.setProperty('--cc',ct?COL[ct[0]]:'#35f0a0');
      ic.querySelectorAll('.c46 button').forEach((b,i)=>b.style.setProperty('--cc',COL[CAT46[i][0]]))}
    if(v===3){document.body.classList.add('v3');
      if(nm==='geral'){ic.innerHTML=`<div class="t3"><button class="mn">☰ MENU</button><div class="cr">Início<small>Palmeiras</small></div></div><div class="gr">${CAT46.map(c=>`<h4>${c[1]} ${c[2]}</h4><div class="g">${c[4].map(x=>`<button><span>${ICON[x]}</span>${NAMES[x]}</button>`).join('')}</div>`).join('')}</div>`}
      else{ic.innerHTML=`<div class="t3"><button class="mn">☰ MENU</button><div class="cr">${ct[1]} ${ct[2]}<small>› ${NAMES[view]}</small></div></div><div class="sc">${ct[4].map(x=>`<button class="${x===view?'on':''}">${ICON[x]} ${NAMES[x]}</button>`).join('')}</div>`}}
  },{v,view,NAMES,ICON,COL,nm});
  await p.waitForTimeout(150);
  const h=(v===3&&nm==='geral')?560:(v===1&&nm==='geral'?190:260);
  await p.screenshot({path:out+`v${v}_${nm}.png`,clip:{x:0,y:0,width:400,height:h}});
 }}
await b.close()})();

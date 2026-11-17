/* ext31: faxina de UX — cabeçalho, textão vira "Como funciona", notas de rodapé escondidas, rótulos legíveis */
(function(){const st=document.createElement('style');st.textContent=`
.bar2 i{background:linear-gradient(90deg,#1fd18a,#7be3b4)!important}
.top2{flex-wrap:wrap}
.top2 .ic{flex:1 1 0;min-width:0;overflow-x:auto;scrollbar-width:none}.top2 .ic::-webkit-scrollbar{display:none}
.top2 .dt{display:none}
.top2 .mbar{order:3;flex:0 0 100%;box-sizing:border-box;padding:2px 10px 6px}
.mbar button{min-height:28px;padding:3px 10px;font-size:11px}.top2 .mbar{padding:0 10px 5px}
.logo{font-size:clamp(34px,13vw,52px)!important;white-space:nowrap}
.main .foot:not(.keep){display:none}
details.how31{margin:6px 0;border:1px solid var(--line);border-radius:10px;background:#ffffff06}
details.how31>summary{cursor:pointer;list-style:none;padding:8px 12px;font:700 12px var(--fh);color:var(--mut);letter-spacing:.04em;text-transform:uppercase;min-height:20px}
details.how31>summary::-webkit-details-marker{display:none}
details.how31[open]>summary{color:var(--accent)}
details.how31>p{margin:0;padding:0 12px 10px}
.res small.k{text-transform:none;letter-spacing:0;display:block;margin-top:2px}
.sec .res span{text-transform:none}
`;document.head.appendChild(st)})();
function tidy31(){
  try{
    if(!G||G.phase==='start'||S.match)return;
    const root=document.querySelector('.main');if(!root)return;
    root.querySelectorAll('p.news,p.hint').forEach(p=>{
      if(p.closest('.mail28,details,.mrow28,.lock28,.elec,.pt,.press'))return;
      const t=p.textContent.trim();
      if(/CIES|Dados reais|de memória|ranking Fair Play|Sports Value|Datafolha/i.test(t)){p.style.display='none';return}
      if(!S.modal&&t.length>130){const d=document.createElement('details');d.className='how31';const s=document.createElement('summary');s.textContent='ℹ️ Como funciona';p.replaceWith(d);d.append(s,p)}
    });
  }catch(e){console.error('tidy31 '+e.message)}
}
const _rd31=render;render=function(){_rd31();tidy31()};
(function(){const st=document.createElement('style');st.textContent=`
@media (max-width:759px){.top2{position:relative!important}:root{--hh:0px!important}}
.seg button{white-space:nowrap}.seg{overflow-x:auto;scrollbar-width:none}
`;document.head.appendChild(st)})();

/* ext74 (v90): contador de uso (só local, dentro do save): quais telas e botões o técnico mais usa e quais nunca abriu.
   Aparece em Opções > "Como você joga". Serve para o Henrique/Claude ver funções escondidas. */
(function(){
const VN={inicio:'Início',tatica:'Tática',mercado:'Procura',clube:'Clube',staff:'Comissão',assist:'Auxiliar',times:'Times',tabela:'Tabelas',vest:'Vestiário',opcoes:'Opções',base:'Base',dir:'Diretoria',medico:'Médico',fin:'Finanças',jornal:'Jornal',mundo:'Mundo',copa:'Copas'};
const use=()=>{if(!G)return null;return G.use=G.use||{a:{},v:{},n:0}};
document.addEventListener('click',ev=>{try{const b=ev.target.closest&&ev.target.closest('[data-a]');if(!b||!G)return;const u=use(),a=b.dataset.a;if(!u||!a)return;u.a[a]=(u.a[a]||0)+1;u.n++;if(a==='nav'&&b.dataset.v)u.v[b.dataset.v]=(u.v[b.dataset.v]||0)+1}catch(e){}},true);
hookAround('vOpcoes','vo74',function(next,__a){let h=next();
  try{const u=use();if(u&&u.n>20){
    const top=Object.entries(u.a).sort((a,b)=>b[1]-a[1]).slice(0,10).map(([k,n])=>`<tr><td>${esc(k)}</td><td>${n}</td></tr>`).join('');
    const vs=Object.entries(u.v).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${esc(VN[k]||k)} ${n}`).join(' · ');
    const nunca=Object.keys(VN).filter(k=>!u.v[k]).map(k=>VN[k]).join(', ');
    const card=`<div class="card"><div class="k">Como você joga (uso neste save)</div><p class="news">${u.n} toques. Telas mais abertas: ${vs||'—'}.</p>${nunca?`<p class="news">Nunca abriu: ${esc(nunca)}.</p>`:''}<table class="tbl"><tr><th>Botão</th><th>Toques</th></tr>${top}</table></div>`;
    h=h.replace(/<\/div>\s*$/,card+'</div>')}}catch(e){}
  return h});
})();

/* ext33: Treino enxuto (top 3 formações), caixa de e-mail que se limpa, estados vazios amigáveis */
/* v31: e-mails importantes ficam até o jogador apagar; sem faxina automática */
function inboxClean33(){}
const _fr33=finishRound;finishRound=function(){const r=_fr33.apply(this,arguments);inboxClean33();return r};
function tidy33(){
  if(!G||G.phase==='start'||S.modal)return;
  try{
    // Treino: formações demais viram "ver todas"
    document.querySelectorAll('.main .card, .main .sec').forEach(box=>{
      const rows=[...box.children].filter(x=>x.classList&&x.classList.contains('fam'));
      if(rows.length<=6||box.querySelector('details.fam33'))return;
      const val=r=>parseFloat((r.querySelector('b')||{}).textContent)||0;
      const keep=new Set(rows.filter(r=>r.textContent.includes('★')));
      rows.slice().sort((a,b)=>val(b)-val(a)).slice(0,Math.max(3,keep.size+2)).forEach(r=>keep.add(r));
      const rest=rows.filter(r=>!keep.has(r));
      if(!rest.length)return;
      const d=document.createElement('details');d.className='how31 fam33';
      const s=document.createElement('summary');s.textContent='Ver todas as formações ('+rows.length+')';d.appendChild(s);
      rest.forEach(r=>d.appendChild(r));
      box.appendChild(d);
    });
    // Agenda: card de resultados vazio some
    document.querySelectorAll('.main .card').forEach(c=>{
      const k=c.querySelector('.k');
      if(k&&/^Resultados$/i.test(k.textContent.trim())&&/Nenhum jogo disputado/i.test(c.textContent))c.style.display='none';
    });
    document.querySelectorAll('.main .card .k').forEach(k=>{if(/^Próximos jogos/.test(k.textContent)&&!k.dataset.t33){k.dataset.t33=1;k.textContent+=' · número = posição do adversário'}});
    // Tabelas antes da 1ª rodada
    if(G.view==='liga'&&G.round===0&&!document.querySelector('.empty33')){
      const t=document.querySelector('.main .tbl');
      if(t){const p=document.createElement('div');p.className='card empty33';p.innerHTML='🏁 <b>Campeonato ainda não começou.</b> Aperte JOGAR pra rodar a 1ª rodada e a tabela começa a andar.';t.parentNode.insertBefore(p,t)}
    }
  }catch(e){console.error('tidy33 '+e.message)}
}
const _rd33=render;render=function(){_rd33.apply(this,arguments);tidy33()};

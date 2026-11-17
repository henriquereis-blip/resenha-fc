/* ui16: Fase 3 — tela de imprensa */
(function(){const st=document.createElement('style');st.textContent=`
.prc .xr{display:flex;align-items:center;gap:10px;padding:9px 6px;border-top:1px solid #ffffff14;cursor:pointer}
.prc .xf{display:block;background:none!important;border:0!important;width:auto!important;height:auto!important;padding:0!important;box-shadow:none!important}.prc .xm{flex:0 0 70px;display:block;height:6px;border-radius:3px;background:#ffffff1c;overflow:hidden;margin-left:auto}.prc .xm i{display:block;height:100%}.prc .xs{display:flex;gap:4px;margin:6px 0}.prc .xs i{flex:1;height:5px;border-radius:3px;background:#ffffff1c;display:block}.prc .xr .xf{font-size:22px}.prc .xr b{display:block;font-size:13px}.prc .xr small{opacity:.65}
.prc .xr .xm{margin-left:auto;width:70px;height:6px;border-radius:3px;background:#ffffff1c;overflow:hidden}.prc .xr .xm i{display:block;height:100%}
.prc .xd{padding:2px 6px 10px 38px;font-size:12px;opacity:.85}
.tn-pos{border-left:3px solid #3fbf6a;padding-left:6px}.tn-neg{border-left:3px solid #e0524a;padding-left:6px}
.opt .tg{display:inline-block;font-size:10px;opacity:.6;margin-left:6px}
.xs{display:flex;gap:4px;margin:6px 0}.xs i{flex:1;height:5px;border-radius:3px;background:#ffffff1c}.xs i.on{background:#e0a23a}.xs i.hot{background:#e0524a}
`;document.head.appendChild(st)})();
const TONE_LBL={humilde:'🙏 Humilde',confiante:'💪 Confiante',culpa_time:'👉 Culpa elenco',culpa_arbitro:'🟨 Culpa juiz',elogia_imprensa:'📰 Elogia imprensa',elogia_torcida:'📣 Elogia torcida',tecnico:'📋 Técnico',polemico:'🔥 Polêmico',evasivo:'🤐 Evasivo'};
const _vj16=vJornal;vJornal=function(){
  let h=_vj16();
  try{
    const J=jrBox();
    // rótulo do tom nas opções
    h=h.replace(/(<button class="opt" data-a="press" data-i="(\d+)">)([\s\S]*?)(<\/button>)/g,(m,a,i,t,z)=>{const o=G.press&&G.press.opts[+i];return a+t+(o&&o.tone?`<span class="tg">${TONE_LBL[o.tone]}</span>`:'')+z});
    const avg=repMoodAvg();
    const card=`<div class="card prc"><div class="k">Relação com a imprensa · ${moodFace(avg)} ${moodTxt(avg)}</div>
    <div class="xs" title="Coletivas seguidas sem responder">${[0,1,2,3,4].map(n=>`<i class="${J.silence>n?(n>=2?'hot':'on'):''}"></i>`).join('')}</div>
    <p class="news">${J.silence?`${J.silence} coletiva(s) seguida(s) sem resposta. ${J.silence>=3?'A imprensa já reclama.':'Uma de vez em quando não pesa, mas repetir cobra caro.'}`:'Responder bem rende clima; ficar mudo muitas vezes irrita todo mundo.'}</p>
    ${J.reps.map((r,i)=>`<div class="xr" data-a="repopen" data-i="${i}"><span class="xf">${moodFace(r.mood)}</span><span><b>${esc(r.n)}</b><small>${esc(r.o)} · ${REP_STYLES[r.s]}</small></span><span class="xm"><i style="width:${Math.round((r.mood+100)/2)}%;background:${r.mood>=8?'#3fbf6a':r.mood>-8?'#9aa0a6':'#e0524a'}"></i></span></div>
    ${S.rep===i?`<div class="xd">${moodTxt(r.mood)} (${r.mood>0?'+':''}${Math.round(r.mood)}). ${r.s==='sens'?'Adora polêmica e manchete forte.':r.s==='tec'?'Valoriza respostas táticas e técnicas.':r.s==='amigo'?'Costuma ser camarada, mas elogio demais soa puxa-saco pros outros.':'Duro com discurso vazio e culpa em juiz.'} ${r.cnt} resposta(s) a ele.</div>`:''}`).join('')}</div>`;
    const ix=h.lastIndexOf('</div>');h=h.slice(0,ix)+card+h.slice(ix);
    // tom das matérias
    let k=0;h=h.replace(/<article>/g,()=>{const n=G.paper[1+k++];return `<article class="${n&&n.tone==='pos'?'tn-pos':n&&n.tone==='neg'?'tn-neg':''}">`});
  }catch(e){console.error('vJornal16 '+e.message)}
  return h;
};

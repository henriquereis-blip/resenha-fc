/* ext60: identidade visual por competição. Cada liga/copa ganha faixa própria com paleta inspirada no clima da competição e um emblema ORIGINAL desenhado aqui (nada de logotipo oficial):
   Champions = azul-noite com anel de estrelas; Libertadores = preto e dourado com louros; Premier = roxo e verde-neon; etc.
   Aparece no topo de Tabela (liga) e de Copas (copa nacional, Copa do Brasil, continental, mundo). Ligas sem tema próprio ganham paleta e emblema gerados pelo nome. */
(function(){const st=document.createElement('style');st.textContent=`
.cmp60{display:flex;align-items:center;gap:12px;margin:0 0 12px;padding:12px 14px;border-radius:16px;color:var(--fg2,#fff);background:linear-gradient(135deg,var(--a) 0%,var(--b) 100%);box-shadow:0 6px 18px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.12);position:relative;overflow:hidden}
.cmp60 svg.em{flex:0 0 46px;width:46px;height:46px;filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
.cmp60 .tx{min-width:0}
.cmp60 b{display:block;font:800 15px var(--fh);letter-spacing:.09em;text-transform:uppercase;color:var(--c);line-height:1.15}
.cmp60 small{display:block;margin-top:3px;font:600 11px var(--fb);color:var(--c);opacity:.78;letter-spacing:.02em}
.cmp60::after{content:"";position:absolute;right:-26px;top:-26px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.16),transparent 65%)}
`;document.head.appendChild(st)})();
/* [regex no nome sem acento, cor A, cor B, cor do texto/emblema, motivo] */
const TH60=[
[/libertadores/,'#050505','#2a1f05','#e8c24a','laurel'],
[/sul-?americana/,'#062a3d','#0a5b66','#7fe0e6','wave'],
[/champions|liga dos campeoes/,'#050f33','#0e2a78','#dbe4ff','starring'],
[/europa league|liga europa/,'#15110d','#a63a05','#ffb27a','diamond'],
[/concacaf|copa dos campeoes/,'#06162e','#0b4a3a','#9be8c8','starring'],
[/intercontinental|mundial/,'#1a1203','#7a5a10','#ffe9a0','burst'],
[/copa america|eliminatorias/,'#07204a','#b8890b','#ffe27a','rays'],
[/copa do brasil/,'#06402a','#0b6b3a','#ffd84a','bands'],
[/brasileirao|serie [abcd]/,'#063a1f','#0b5e9c','#ffe45e','bands'],
[/premier league/,'#2b0033','#6a0a7a','#00ff85','burst'],
[/championship|league one|league two|national league/,'#1b1033','#3a2a6a','#c9b8ff','chevron'],
[/fa cup|efl cup/,'#3a0008','#8a1020','#ffd3d8','diamond'],
[/laliga|la liga|primera division|segunda|primera federacion/,'#2a0505','#c4161c','#ffe3e3','bands'],
[/copa del rey|supercopa de espana/,'#2a0612','#7a1230','#f3d28a','crown'],
[/serie a|serie b|serie c|coppa italia|supercoppa/,'#05213f','#0a5a8a','#bfe9ff','bands'],
[/bundesliga|dfb|dfl/,'#2a0305','#d20515','#ffffff','dots'],
[/ligue|coupe de france|trophee/,'#07122e','#1c2f66','#e1ef35','chevron'],
[/liga portugal|primeira liga|taca de portugal|supertaca/,'#05230f','#0d6b32','#ff5a4d','bands'],
[/liga profesional|primera nacional|copa argentina|supercopa argentina/,'#0b3b66','#74acdf','#ffffff','rays'],
[/mls|major league|us open cup|usl/,'#07142b','#16346b','#ff5b63','stars3'],
[/liga mx|expansion|campeon de campeones/,'#042a1a','#0a6a3d','#ffd0d0','dots'],
[/saudita|saudi|arabia/,'#03271c','#0a6a45','#ffe08a','diamond'],
[/eredivisie|knvb/,'#2a1103','#c75a0b','#fff0d6','chevron'],
[/pro league|croky/,'#1a1a1a','#7a1212','#ffd84a','bands'],
[/super lig|turk/,'#2a0507','#b3151f','#ffffff','stars3'],
[/premiership|scottish|championship escoc/,'#06223f','#0d4f94','#ffffff','chevron'],
[/j1|j2|j league/,'#1a0508','#9d1230','#ffffff','burst'],
[/k league/,'#06133a','#1a3f9c','#ffffff','rays']
];
const noAcc60=s=>String(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
function theme60(name){
  const n=noAcc60(name);
  for(const t of TH60)if(t[0].test(n))return {a:t[1],b:t[2],c:t[3],m:t[4]};
  /* fallback: paleta e emblema gerados pelo nome */
  let h=7;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))>>>0;
  const hue=h%360,ms=['burst','chevron','dots','rays','diamond','bands','wave','crown','stars3'];
  return {a:`hsl(${hue} 55% 12%)`,b:`hsl(${(hue+18)%360} 50% 28%)`,c:`hsl(${(hue+170)%360} 80% 82%)`,m:ms[(h>>3)%ms.length]};
}
function emblem60(m,c){
  const S=(inner)=>`<svg class="em" viewBox="0 0 48 48" fill="none" aria-hidden="true">${inner}</svg>`;
  const star=(x,y,r)=>{let p='';for(let i=0;i<10;i++){const rr=i%2?r*.42:r,a=-Math.PI/2+i*Math.PI/5;p+=(i?'L':'M')+(x+rr*Math.cos(a)).toFixed(1)+' '+(y+rr*Math.sin(a)).toFixed(1)}return `<path d="${p}Z" fill="${c}"/>`};
  switch(m){
    case 'starring':{let s='';for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=star(24+17*Math.cos(a),24+17*Math.sin(a),5)}return S(s+`<circle cx="24" cy="24" r="9" stroke="${c}" stroke-width="2.5"/><path d="M24 15v18M15 24h18" stroke="${c}" stroke-width="1.4" opacity=".6"/>`)}
    case 'laurel':{let s='';for(let i=0;i<6;i++){const y=38-i*5.4,dx=6+Math.sin(i/5*Math.PI)*4;s+=`<ellipse cx="${24-dx-3}" cy="${y}" rx="2.6" ry="5" transform="rotate(${-28+i*5} ${24-dx-3} ${y})" fill="${c}"/><ellipse cx="${24+dx+3}" cy="${y}" rx="2.6" ry="5" transform="rotate(${28-i*5} ${24+dx+3} ${y})" fill="${c}"/>`}return S(s+star(24,22,7))}
    case 'wave':return S(`<path d="M5 16q6-8 12 0t12 0 14 0M5 26q6-8 12 0t12 0 14 0M5 36q6-8 12 0t12 0 14 0" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/>`);
    case 'burst':{let s='';for(let i=0;i<12;i++){const a=i*Math.PI/6;s+=`<path d="M${24+7*Math.cos(a)} ${24+7*Math.sin(a)}L${24+19*Math.cos(a)} ${24+19*Math.sin(a)}" stroke="${c}" stroke-width="${i%2?2:3.6}" stroke-linecap="round"/>`}return S(s+`<circle cx="24" cy="24" r="5" fill="${c}"/>`)}
    case 'chevron':return S(`<path d="M8 12l16 12L8 36M22 12l16 12-16 12" stroke="${c}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`);
    case 'bands':return S(`<path d="M9 40L29 6M18 42L38 8M27 44L45 12" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`);
    case 'dots':{let s='';for(let r=0;r<3;r++)for(let q=0;q<3;q++)s+=`<circle cx="${12+q*12}" cy="${12+r*12}" r="${r===1&&q===1?5:3.2}" fill="${c}"/>`;return S(s)}
    case 'rays':{let s='';for(let i=0;i<16;i++){const a=i*Math.PI/8;s+=`<path d="M${24+10*Math.cos(a)} ${24+10*Math.sin(a)}L${24+(i%2?15:20)*Math.cos(a)} ${24+(i%2?15:20)*Math.sin(a)}" stroke="${c}" stroke-width="2.4" stroke-linecap="round"/>`}return S(s+`<circle cx="24" cy="24" r="7.5" fill="${c}"/>`)}
    case 'diamond':return S(`<path d="M24 5l17 19-17 19L7 24z" stroke="${c}" stroke-width="3.4" stroke-linejoin="round"/><path d="M24 15l8 9-8 9-8-9z" fill="${c}"/>`);
    case 'crown':return S(`<path d="M9 35V16l9 9 6-12 6 12 9-9v19z" fill="${c}"/><rect x="9" y="38" width="30" height="3.6" rx="1.8" fill="${c}"/>`);
    case 'stars3':return S(star(13,28,8)+star(24,18,9)+star(35,28,8));
    default:return S(`<circle cx="24" cy="24" r="16" stroke="${c}" stroke-width="3.5"/>`);
  }
}
function banner60(name,sub){
  const t=theme60(name);
  return `<div class="cmp60" style="--a:${t.a};--b:${t.b};--c:${t.c}">${emblem60(t.m,t.c)}<div class="tx"><b>${esc(name)}</b>${sub?`<small>${esc(sub)}</small>`:''}</div></div>`;
}
/* ---------- Tabela: faixa da liga ---------- */
const _lh60=ligaHead;ligaHead=function(){
  const h=_lh60.apply(this,arguments);
  try{const m=h.match(/<div class="k">(.*?)<\/div>/);if(!m)return h;
    const raw=m[1].replace(/&amp;/g,'&').replace(/<[^>]+>/g,'');
    const parts=raw.split('·').map(x=>x.trim());const flagCtry=parts[0]||'',lg=parts[1]||parts[0]||'';
    const sub=(flagCtry+' · temporada '+(2026+G.season-(G.season>0?0:0))).replace(/^ · /,'');
    return banner60(lg,sub)+h.replace(/<div class="k">.*?<\/div>/,'');
  }catch(e){return h}
};
/* ---------- Copas: faixa da competição aberta ---------- */
const _vc60=vComp;vComp=function(){
  let h=_vc60.apply(this,arguments);
  try{const tab=S.ctab||'cup';let name=null,sub='Temporada '+(2026+G.season);
    if(tab==='cup'){name=G.abroad&&G.nc&&G.nc.s===G.season?G.nc.name:'Copa do Brasil'}
    else if(tab==='cont'){name=G.cont&&G.cont.comp?COMPN[G.cont.comp]:'Competições continentais';if(!G.cont)sub='Seu clube não disputa neste ano'}
    else if(tab==='mundo'){name=S.wc&&WLD.find(x=>x.k===S.wc)?WLD.find(x=>x.k===S.wc).lg:'Mundo: ligas e copas internacionais';sub=S.wc?'Todas as ligas do jogo':'Ligas, continentais e Mundial'}
    if(name)h=h.replace(/<h2>Copas<\/h2>/,banner60(name,sub));
  }catch(e){console.error('th60 '+e.message)}
  return h};

const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();
const sigs=[];for(const L of WLD)for(const c of L.cl)sigs.push(WSIG[c[0]]);o.push('clubes mundo '+sigs.length+' sigs unicos '+new Set(sigs).size+' FCPOOL '+FCPOOL.length);
const sq0=G.clubs.reduce((s,c)=>s+c.squad.length,0);
for(let s=0;s<3;s++){for(let r=0;r<40&&!G.summary;r++){startRound();autoPick(userClub());while(!roundDone())stepAll();finishRound();if(G.summary||G.phase==='end')break;
 if(r===10&&s===0){S.ctab='mundo';S.wc=null;render();o.push('mundo home html '+document.body.innerHTML.includes('Campeonatos'));S.wc='ENG';render();o.push('ENG tabela '+document.body.innerHTML.includes('Manchester City'));S.wc=null;S.ctab='cup'}}
 if(!G.summary)endSeason();
 o.push('T'+G.season+' ENG '+G.wd.hist.slice(-1)[0].ch.ENG+' ESP '+G.wd.hist.slice(-1)[0].ch.ESP+' ARG '+G.wd.hist.slice(-1)[0].ch.ARG+' UCL '+G.wd.hist.slice(-1)[0].ucl);
 newSeason();}
o.push('xp '+G.wd.xp.length+': '+G.wd.xp.slice(0,3).map(x=>x.t+' '+x.fee).join(' | '));
o.push('mails xo '+G.inbox.filter(m=>/^xo/.test(m.tag||'')).length);
const sq1=G.clubs.reduce((s,c)=>s+c.squad.length,0);o.push('elencos total '+sq0+' -> '+sq1+' players '+Object.keys(G.players).length);
const sz=JSON.stringify(G).length;o.push('save size '+sz);
const xm=G.inbox.find(m=>m.acts&&m.acts[0]&&m.acts[0].k==='xsell');if(xm){const pid=xm.acts[0].p.pid,nm=P(pid).name;const cx=G.fin.caixa;mailAct(xm.id,0);o.push('venda ext '+nm+' caixa '+cx+'->'+G.fin.caixa+' ainda no elenco '+userClub().squad.includes(pid)+' res '+xm.res)}
G.view='comp';S.ctab='mundo';render();o.push('render final ok '+document.body.innerHTML.includes('Transfer'));
return o.join('\\n')})()`));console.log(errs.slice(0,8));process.exit(0)

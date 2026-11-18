const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await (await b.newContext({viewport:{width:400,height:800}})).newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(900);
const E=async(f,a)=>{try{return await p.evaluate(f,a)}catch(e){console.log('FALHA',e.message.slice(0,300));process.exitCode=1;return null}};
const NR_=+process.argv[2]||6;
console.log('setup',await E(()=>{localStorage.clear();S.mg=mgNew('equil');G.phase='start';S.step='mpl';render();
 document.getElementById('mps_names').value='Rafa, Lipe, Gui';A.mpsnew();
 for(const club of [3,5,9]){A.pickclub({id:club});S.sp='Direto';S.asst=asstCandidates('Direto');S.sa=0;S.obj='equ';A.begin()}
 window.playUntilReady=()=>{for(let g=0;g<40;g++){if(MPH)A.mphand();if(!G.sponsor)G.sponsor={name:'Patro',fixed:12,pay:12,topN:4,topBonus:2,titleBonus:5};
   A.play();if(S.match&&R&&!R.mpg){clearInterval(S.timer);S.paused=false;S.panel=false;while(!roundDone())stepAll();A.mend();A.roundok();continue}break}};
 window.bad=()=>{const o=[];G.clubs.forEach(c=>{const m=c.squad.filter(id=>!G.players[id]);if(m.length)o.push(c.sig+':'+m.length)});const f=G.free.filter(id=>!G.players[id]).length;if(f)o.push('free:'+f);const cn=Object.values(G.players).filter(p=>p.club>=0&&(!G.clubs[p.club]||!G.clubs[p.club].squad.includes(p.id))).length;if(cn)o.push('orfaos:'+cn);return o.join(',')};
 window.state=()=>{const m=G.mps,cl=G.clubs;return {round:G.round,season:G.season,cur:m.cur,cx:m.hs.map(h=>Math.round((h.ctx?h.ctx.fin.caixa:G.fin.caixa)*10)/10),J:[0,1,2,3].map(d=>[...new Set(cl.filter(c=>c.div===d).map(c=>c.J))].join('/')).join('|'),P:[3,5,9].map(i=>cl[i].P).join('/'),d:[3,5,9].map(i=>cl[i].div).join(''),np:Object.keys(G.players).length,idsOk:Object.keys(G.players).every(k=>G.players[k].id==k)}};
 return G.phase+' '+G.mps.hs.length}));
let r=0,seasonEnds=0;
for(let it=0;it<NR_;it++){
 const info=await E(()=>{for(let i=0;i<G.mps.hs.length;i++){playUntilReady()}return {m:S.match,mpg:R&&R.mpg,uis:R&&R.uis,round:G.round}});
 if(!info||!info.mpg){console.log('nao virou rodada de grupo',JSON.stringify(info));break}
 if(it===0){console.log('pausa',await E(()=>{clearInterval(S.timer);while(R.ms[R.uis[0]].min<45)stepAll();S.paused=true;S.panel=true;render();const seq=[MPH&&MPH.k];
   for(let t=0;t<3;t++){A.mphand();seq.push('ui'+R.ui+'/'+G.user+(S.panel?'P':''));A.mgo();seq.push(MPH?('h'+MPH.k):'fim:'+S.paused)}return seq.join(' ')}))}
 await E(()=>{clearInterval(S.timer);S.paused=false;S.panel=false;while(!roundDone())stepAll();A.mend()});
 const o=await E(()=>{const rd=G.mps.rd;const a=[];for(let i=0;i<3;i++){if(MPH)A.mphand();a.push(G.lastRound?(()=>{const u=G.lastRound.results.find(x=>x.u);return C(u.h).sig+' '+u.hg+'x'+u.ag+' '+C(u.a).sig})():'-');A.roundok()}return {rd:JSON.stringify(rd),res:a.join(' | '),st:state(),bad:bad(),phase:G.phase,mph:!!MPH}});
 console.log('rodada',it,JSON.stringify(o&&o.st),o&&o.res,o&&o.bad);
 if(o&&o.phase==='seasonEnd'){seasonEnds++;
 console.log('dbg',await E(()=>{const m=G.mps;const out=[];out.push('cur'+m.cur);for(const c of G.clubs){const miss=c.squad.filter(id=>!G.players[id]);if(miss.length)out.push(c.sig+' div'+c.div+' miss '+miss.join('/'))}return out.join(' ; ')+' || hs='+m.hs.map(h=>h.club+':'+!!h.ctx).join(',')+' bad='+bad()}));
   const n=await E(()=>{const lg=[];for(let i=0;i<3;i++){if(MPH)A.mphand();lg.push('s'+G.season+'c'+G.mps.cur+'se'+JSON.stringify(G.mps.se));A.newseason();lg.push('->s'+G.season)}if(MPH)A.mphand();return lg.join(' ')+JSON.stringify(state())+' phase='+G.phase});console.log('nova temporada',n)}
}
console.log('json',await E(()=>{const g=JSON.parse(JSON.stringify(G));return 'tam '+JSON.stringify(G).length+' ctx1 '+Object.keys(g.mps.hs[1].ctx||{}).length}));
console.log(errs.slice(0,5));await b.close()})();

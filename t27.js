const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];const cnt={};
for(const sg of ['SAN','FLA','CHA']){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig===sg).id,'T','Direto',null);ex();
 for(let s=0;s<12;s++){const r=G.cp.cur;cnt[sg+':'+r.out]=(cnt[sg+':'+r.out]||0)+1;if(s<2)o.push(sg+' '+r.yr+' '+r.out+' camp '+r.cname+' '+r.matches.map(m=>m.a+m.ga+'-'+m.gb+m.b).join(' ')+' rev '+r.rev+' top '+r.top);
  G.sponsor=sponsorOffers()[0];for(let g=0;g<2;g++){}
  G.round=38;endSeason();newSeason();G.phase='play';}
}
o.push(JSON.stringify(cnt));
S.modal=null;G.view='base';render();o.push('base html cp '+document.body.innerHTML.includes('Copinha'));
return o.join('\\n')})()`));console.log(errs.slice(0,5));process.exit(0)

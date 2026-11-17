const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});const w=dom.window;
console.log(w.eval(`(function(){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='PAL').id,'T','Direto',null);const pal=userClub(),sao=G.clubs.find(c=>c.sig==='SAO');
const m=newMatch(pal,sao);return m.h.lineup.map((id,i)=>{const p=P(id);return p.pos+':'+eff(p,m.h.slots[i],m.en[id],pal.phil)+' en'+m.en[id]+' fit'+p.fit[pal.phil]+' mor'+p.mor}).join(' | ')})()`));process.exit(0)

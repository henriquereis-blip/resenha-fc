const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];
for(const sg of ['FLA','CAP','SAN','CHA']){S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig===sg).id,'T','Direto',null);ex();
 o.push(sg+' e='+expPosOf(userClub())+' base='+userClub().spBase);
 for(const x of sponsorOffers())o.push('  '+x.kind+' '+x.name+' fixo '+x.fixed+' pw '+x.perWin+' top'+x.topN+':'+x.topBonus+' tit '+x.titleBonus+' EV '+x.ev+' max '+x.max)
 for(const k of ['manga','forn']){for(const x of slotOffers(k))o.push('   slot '+k+' '+x.kind+' val '+x.val+' EV '+x.ev)}}
// modos
S.mg=mgNew('equil');S.obj='equ';startCareer(G.clubs.find(c=>c.sig==='SAN').id,'T','Direto',null);ex();
const c0=G.fin.caixa;S.modal={t:'sponsor'};A.pickspon({i:0});o.push('modal2 '+vModal().length);A.spnmode({m:'vista'});o.push('vista caixa '+c0+' -> '+G.fin.caixa+' pay '+G.sponsor.pay);
G.mk.open={slot:'manga'};A.mkpick({s:'manga',i:1});A.mkmode({m:'jogo'});o.push('slot '+JSON.stringify(G.mk.slots.manga));
const cx=G.fin.caixa;for(let g=0;g<400&&G.round<38;g++){ex();extraSync();autoPick(userClub());startRound();while(!roundDone())stepAll();G.board.conf=100;finishRound()}
o.push('fim '+G.round+' sp acc '+G.mk.acc.sp.toFixed(1)+' spx '+G.mk.acc.spx.toFixed(1));
endSeason();o.push('summary sp '+G.summary.sp);newSeason();o.push('nova '+JSON.stringify(G.sponsor)+' '+G.fin.caixa);
return o.join('\\n')})()`));console.log(errs.slice(0,4));process.exit(0)

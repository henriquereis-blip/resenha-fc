const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');const errs=[];
const dom=new JSDOM(fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8'),{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.console.error=(...a)=>errs.push(a.join(' '))}});
console.log(dom.window.eval(`(function(){const o=[];S.mg=mgNew('equil');S.obj='equ';startCareer(1,'T','Direto',null);ex();
const cnt={};const bra={};for(let i=0;i<300;i++){G.nt2=null;ntBox().wcQ=true;const r=nTour('wc',nPoolFor('wc'),12,2,8);cnt[r.champ]=(cnt[r.champ]||0)+1;bra[r.bra]=(bra[r.bra]||0)+1}
o.push('WC campeões(300): '+Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,10).map(x=>x[0]+' '+x[1]).join(', '));
o.push('Brasil: '+Object.entries(bra).sort((a,b)=>b[1]-a[1]).map(x=>x[0]+' '+x[1]).join(', '));
const c2={};for(let i=0;i<200;i++){const r=nTour('gold',nPoolFor('gold'),4,2,0);c2[r.champ]=(c2[r.champ]||0)+1}
o.push('Gold(200): '+Object.entries(c2).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x[0]+' '+x[1]).join(', '));
return o.join('\\n')})()`));console.log(errs.slice(0,5));process.exit(0)

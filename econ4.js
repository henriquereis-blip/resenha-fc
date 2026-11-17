const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const [sig,obj]=process.argv.slice(2);
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
const w=dom.window,d=w.document;
const click=sel=>{const e=d.querySelector(sel);if(!e)throw new Error('no '+sel);e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}))};
const A=(a,x='')=>click(`[data-a="${a}"]${x}`);
const id=w.eval(`G.clubs.find(c=>c.sig==='${sig}').id`);
A('pickclub',`[data-id="${id}"]`);A('pickphil');A('pickasst');A('pickobj',`[data-o="${obj}"]`);A('begin');A('pickspon');
for(let g=0;g<300;g++){
 if(d.querySelector('[data-a="pickspon"]')){A('pickspon');continue}
 if(d.querySelector('[data-a="takejob"]')){console.log('DEMITIDO round',w.eval('G.round'),'caixa',w.eval('G.fin.caixa'));break}
 if(d.querySelector('[data-a="roundok"]')){A('roundok');continue}
 if(d.querySelector('[data-a="mend"]')){A('mend');continue}
 if(d.querySelector('[data-a="play"]')){if(d.querySelector('[data-a="press"]'))A('press','[data-i="0"]');A('play');A('mskip');
  const r=w.eval(`(function(){const l=G.fin.last||{};const f=l.fin||{};return 'r'+G.round+' pos'+posOf(userClub())+' caixa '+G.fin.caixa.toFixed(1)+' debt '+userClub().debt.toFixed(0)+' conf '+Math.round(G.board.conf)+' net '+(l.net||0).toFixed(2)+' enc '+(f.enc||0).toFixed(2)+' pay '+(f.pay||0).toFixed(2)+' sal '+(l.sal||0).toFixed(2)})()`);if(w.eval('G.round')%4===0||w.eval('G.round')<4)console.log(r);continue}
 break}
process.exit(0)

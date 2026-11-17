const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
function run(sig,obj){
 const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{}}});
 const w=dom.window,d=w.document;
 const click=sel=>{const e=typeof sel==='string'?d.querySelector(sel):sel;if(!e)throw new Error('no '+sel);e.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true}))};
 const A=(a,x='')=>click(`[data-a="${a}"]${x}`);
 const id=w.eval(`G.clubs.find(c=>c.sig==='${sig}').id`);
 A('pickclub',`[data-id="${id}"]`);A('pickphil');A('pickasst');A('pickobj',`[data-o="${obj}"]`);A('begin');A('pickspon');
 const out=[];const snap=()=>w.eval(`(function(){const c=userClub();return {pos:posOf(c),caixa:+G.fin.caixa.toFixed(1),debt:+c.debt.toFixed(0),conf:Math.round(G.board.conf),ban:G.fx.ban,warn:G.fx.warned,user:G.user,meta:G.board.meta}})()`);
 out.push('T1 start '+JSON.stringify(snap()));
 let seasons=0,minC=1e9;
 for(let g=0;g<900;g++){
  if(d.querySelector('[data-a="newseason"]')){const s=snap();out.push('fim T'+(seasons+1)+' '+JSON.stringify(s)+' minCaixa '+minC.toFixed(1));seasons++;minC=1e9;if(seasons>=3)break;A('newseason');continue}
  if(d.querySelector('[data-a="pickspon"]')){A('pickspon');continue}
  if(d.querySelector('[data-a="takejob"]')){out.push('DEMITIDO');return out.join('\n')}
  if(d.querySelector('[data-a="roundok"]')){A('roundok');continue}
  if(d.querySelector('[data-a="mend"]')){A('mend');continue}
  if(d.querySelector('[data-a="play"]')){if(d.querySelector('[data-a="press"]'))A('press','[data-i="0"]');A('play');A('mskip');minC=Math.min(minC,w.eval('G.fin.caixa'));continue}
  throw new Error('stuck '+d.body.textContent.slice(0,120));
 }
 return out.join('\n');
}
for(const [s,o] of JSON.parse(process.argv[2])){try{console.log('== '+s+' '+o);console.log(run(s,o))}catch(e){console.log('ERR',e.message)}}
process.exit(0)

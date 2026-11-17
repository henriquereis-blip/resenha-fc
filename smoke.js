const {JSDOM}=require('../node_modules/jsdom');const fs=require('fs');
const html=fs.readFileSync(__dirname+'/resenha-fc-v2.html','utf8');
const errs=[];
const dom=new JSDOM(html,{runScripts:'dangerously',pretendToBeVisual:true,url:'https://x.test/',beforeParse(w){w.scrollTo=()=>{};w.addEventListener('error',e=>errs.push(e.message+' @'+e.lineno))}});
const w=dom.window,d=w.document;
const click=sel=>{const e=typeof sel==='string'?d.querySelector(sel):sel;if(!e)throw new Error('no '+sel+' @ '+w.eval('G.view+"/"+S.prof+"/"+S.paper+"/"+JSON.stringify(S.modal)'));e.dispatchEvent(new w.MouseEvent('click',{bubbles:true}))};
const A=(a,extra='')=>click(`[data-a="${a}"]${extra}`);
try{
 d.querySelector('#coach').value='Teste';d.querySelector('#coach').dispatchEvent(new w.Event('input',{bubbles:true}));
 A('pickclub','[data-id="3"]');A('pickphil');A('pickasst');A('pickobj');
 A('begin');A('pickspon');
 for(const v of ['inicio','tatica','liga','mercado','clube','opcoes','conquistas'])A('nav',`[data-v="${v}"]`);A('nav','[data-v="inicio"]');A('hrow');if(d.querySelector('[data-a="hrow"]'))A('hrow');A('back');A('nav','[data-v="inicio"]');
 for(const l of ['tabela','rodada','gols','ast','nota','cart','times']){A('nav','[data-v="liga"]');A('lig',`[data-v="${l}"]`)}
 A('nav','[data-v="inicio"]');A('hrow');if(d.querySelector('[data-a="hrow"]'))A('hrow');A('back');
 A('nav','[data-v="mercado"]');A('tab','[data-t="venda"]');A('tab','[data-t="olheiros"]');A('hscout','[data-i="0"]');A('tab','[data-t="buscar"]');A('search');A('tab','[data-t="olheiros"]');if(d.querySelector('[data-a="fscout"]')&&Math.random()<0.5)A('fscout');
 A('nav','[data-v="inicio"]');
 const sub=v=>{A('nav','[data-v="clube"]');if(!d.querySelector('[data-v="'+v+'"]'))console.log('DBG',w.eval('G.view+"/"+JSON.stringify(S.modal)'),d.body.textContent.slice(0,150));A('nav',`[data-v="${v}"]`)};
 const tour=()=>{
  for(const v of ['agenda','estadio','base','marketing','torcida','tecnicos'])sub(v);sub('historia');for(const t of ['camp','rank','bola','tdr','tda','conf'])A('hs',`[data-v="${t}"]`);A('nav','[data-v="times"]');
  sub('estadio');A('expand');if(d.querySelector('[data-a="naming"]'))A('naming');
  sub('base');A('ypromote');A('yscout');if(d.querySelector('[data-a="ysell"]'))A('ysell');sub('marketing');A('shspecial');A('soccamp');A('mkopen','[data-s="manga"]');A('mkpick','[data-s="manga"]');A('socplan','[data-i="2"]');sub('estadio');A('projgo');if(d.querySelector('[data-a="namopen"]')){A('namopen');A('nampick')}sub('base');if(d.querySelector('[data-a="basehire"]')){A('basehire');A('basepick')}A('basect');
  A('nav','[data-v="times"]');A('openteam','[data-id="0"]');
  for(const t of ['elenco','juniores','trofeus','retro','xfer'])A('tt',`[data-v="${t}"]`);
  A('tt','[data-v="juniores"]');if(d.querySelector('[data-a="ybuy"]'))A('ybuy');
  A('tt','[data-v="elenco"]');A('prof');A('back');A('tree','[data-k="close"]');
  A('nav','[data-v="tatica"]');A('ready');
  A('nav','[data-v="inicio"]');
 };
 tour();
let seasons=0,rounds=0,want=0;
 for(let guard=0;guard<400&&seasons<2;guard++){
  if(d.querySelector('[data-a="newseason"]')){A('newseason');seasons++;want=1;continue}
  if(d.querySelector('[data-a="firedgo"]')){A('firedgo');continue}
  if(d.querySelector('[data-a="pickspon"]')){A('pickspon');continue}
  if(d.querySelector('[data-a="takejob"]')){A('takejob');continue}
  if(d.querySelector('[data-a="roundok"]')){A('roundok');continue}
  if(d.querySelector('[data-a="mend"]')){A('mend');continue}
  if(d.querySelector('[data-a="play"]')){
    if(want){tour();want=0}
    if(d.querySelector('[data-a="press"]'))A('press','[data-i="0"]');
    A('play');rounds++;
    if(rounds===3){A('mtac');A('mgo');A('mskip')}
    else {A('mskip')}
    continue}
  throw new Error('stuck: '+JSON.stringify({ph:w.eval('G.phase'),md:w.eval('S.modal&&S.modal.t'),r:w.eval('G.round'),p:w.eval('S.prof'),pa:w.eval('S.paper'),v:w.eval('G.view')})+d.body.textContent.slice(0,80));
 }
 console.log('rounds',rounds,'seasons',seasons,'errs',errs);
}catch(e){console.log('FAIL',e.message,errs,w.eval('JSON.stringify(G.mk.base.staff)'),d.querySelector('.x9')?d.querySelector('.x9').innerHTML.slice(0,300):d.body.innerHTML.slice(0,400));}
process.exit(0)

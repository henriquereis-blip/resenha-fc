// utilitário comum: abre o jogo já com uma carreira iniciada no clube indicado
const {chromium}=require('playwright');
const path=require('path');const GAME='file://'+path.resolve(__dirname,'..','..','resenha-fc-v2.html');
async function open(){
  const b=await chromium.launch();
  const errs=[];
  const p=await (await b.newContext()).newPage();
  p.on('pageerror',e=>errs.push(e.message));
  await p.goto(GAME);await p.waitForTimeout(400);
  return {b,p,errs};
}
module.exports={open,chromium,GAME};

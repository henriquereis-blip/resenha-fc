const {chromium}=require('playwright');
exports.open=async function(club,{rounds=0,w=390,h=800}={}){
  const b=await chromium.launch();const errs=[];const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1,hasTouch:true,isMobile:true});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file://'+__dirname+'/index.html');await p.waitForTimeout(1200);
  await p.evaluate(([club,rounds])=>{localStorage.clear();S.mg=mgNew('equil');S.obj='equ';startCareer(3,'T','Direto',null);
    const id=G.clubs.find(c=>c.name===club).id;S.mg=mgNew('equil');startCareer(id,'T','Direto',null);ex&&ex();G.phase='play';S.modal=null;
    window.ro=()=>{G.board.conf=95;startRound();while(!roundDone())stepAll();return finishRound()};
    for(let i=0;i<rounds;i++)ro();render()},[club,rounds]);
  const shot=async n=>{await p.waitForTimeout(200);await p.screenshot({path:'o_'+n+'.png'})};
  return {b,p,errs,shot};
};

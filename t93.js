const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const ctx=await b.newContext({viewport:{width:390,height:800},deviceScaleFactor:1});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+__dirname+'/resenha-fc-v2.html');await p.waitForTimeout(900);
const shot=async n=>{await p.waitForTimeout(150);await p.screenshot({path:'mp_'+n+'.png'})};
const clk=async(s)=>{await p.click(s,{timeout:4000})};
await p.evaluate(()=>{localStorage.clear();});
await p.reload();await p.waitForTimeout(900);
await clk('[data-a="step"][data-v="mpl"]');await shot('1_menu');
await p.fill('#mps_names','Henrique, Rafa, Lipe');await clk('[data-a="mpsnew"]');await shot('2_coach');
for(const [i,club] of [[0,3],[1,5],[2,9]]){
  console.log('humano',i,await p.evaluate(()=>S.step+' '+S.coachName+' phase='+G.phase));
  await clk('[data-a="step"][data-v="club"]');
  if(i===1)await shot('3_clube');
  await clk(`[data-a="pickclub"][data-id="${club}"]`);
  if(i===1){ // tenta clube repetido
    await p.evaluate(()=>{A.step({v:'club'})});await clk('[data-a="pickclub"][data-id="3"]');console.log('repetido ->',await p.evaluate(()=>S.step+' toast='+(S.toast||'')));
  }
  await p.evaluate(()=>{A.step({v:'setup'})});
  await clk('[data-a="pickphil"]');await clk('[data-a="pickasst"]');
  await p.evaluate(()=>{S.obj='equ';render()});
  await clk('[data-a="begin"]');
}
await shot('4_passa');
console.log('fim setup',await p.evaluate(()=>G.phase+' hs='+G.mps.hs.map(h=>h.nick+':'+h.club).join(',')+' MPH='+(MPH&&G.mps.hs[MPH.k].nick)));
await clk('[data-a="mphand"]');await p.waitForTimeout(300);await shot('5_home');
console.log('home',await p.evaluate(()=>({modal:S.modal&&S.modal.t,pill:!!document.getElementById('mps63'),txt:(document.getElementById('mps63')||{}).textContent})));
await p.evaluate(()=>{G.sponsor={name:'Patro',fixed:12,pay:12,topN:4,topBonus:2,titleBonus:5};S.modal=null;render()});
await shot('6_home_pill');
await clk('#mps63');await shot('7_passa2');
console.log(errs.slice(0,5));await b.close()})();

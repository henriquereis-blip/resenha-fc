const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext();const url='file://'+process.cwd()+'/resenha-fc-v2.html';
let p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto(url);await p.waitForTimeout(500);
// make a legacy save in localStorage

const r1=await p.evaluate(()=>{const c=G.clubs.findIndex(c=>c.div===0);G.user=c;G.phase='play';G.coach=G.coach||'Teste';save();SKV.flush();return JSON.stringify(SKV.info())+' ls='+!!localStorage.getItem(SAVE_KEY)});console.log('after save',r1);
await p.waitForTimeout(600);
// legacy migration: put straight into localStorage on a fresh context page
const raw=await p.evaluate(()=>JSON.stringify(G));
const ctx2=await b.newContext();const p2=await ctx2.newPage();p2.on('pageerror',e=>console.log('ERR2',e.message));
await p2.goto(url);await p2.waitForTimeout(400);
await p2.evaluate(r=>{localStorage.setItem('resenhafc_v2',r);localStorage.setItem('resenhafc_v2_slot2',r)},raw);
await p2.reload();await p2.waitForTimeout(800);
console.log('migrated',await p2.evaluate(()=>JSON.stringify(SKV.info())+' lsMain='+!!localStorage.getItem('resenhafc_v2')+' loadOK='+loadSave()+' slot2='+!!slotInfo(2)));
await p2.reload();await p2.waitForTimeout(800);
console.log('after 2nd reload',await p2.evaluate(()=>JSON.stringify(SKV.info())+' lsMain='+!!localStorage.getItem('resenhafc_v2')+' loadOK='+loadSave()+' slot2='+!!slotInfo(2)));
// big save >6MB
console.log('big',await p2.evaluate(()=>{const pad='x'.repeat(7e6);G.pad=pad;save();SKV.flush();return SKV.getItem(SAVE_KEY).length}));
await p2.waitForTimeout(800);await p2.reload();await p2.waitForTimeout(800);
console.log('big reload',await p2.evaluate(()=>{const ok=loadSave();return ok+' pad='+(G.pad&&G.pad.length)}));
// wipe
console.log('wipe',await p2.evaluate(()=>{wipe();return !!SKV.getItem(SAVE_KEY)}));
await p2.waitForTimeout(500);await p2.reload();await p2.waitForTimeout(800);
console.log('wipe reload',await p2.evaluate(()=>loadSave()));
await b.close()})();

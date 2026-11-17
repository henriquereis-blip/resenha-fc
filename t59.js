const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const mt={'.html':'text/html','.js':'text/javascript','.png':'image/png','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let f=q.url.split('?')[0];if(f.endsWith('/'))f+='index.html';const p=path.join(process.cwd(),f);fs.readFile(p,(e,d)=>{if(e){r.writeHead(404);r.end()}else{r.writeHead(200,{'content-type':mt[path.extname(p)]||'text/plain'});r.end(d)}})}).listen(8133,async()=>{
const b=await chromium.launch();
const rooms={},members=[],profiles={};const cors={'access-control-allow-origin':'*','access-control-allow-headers':'*','access-control-allow-methods':'*'};
const J=(rt,s,o)=>rt.fulfill({status:s,headers:cors,contentType:'application/json',body:JSON.stringify(o)});
async function mk(email,nick){
  const c=await b.newContext({viewport:{width:400,height:850},deviceScaleFactor:2});const p=await c.newPage();p.on('pageerror',e=>console.log('ERR',email,e.message));
  const uid='u_'+email.split('@')[0];profiles[uid]={id:uid,nick};
  await c.route('**/*.supabase.co/**',async rt=>{const u=rt.request().url(),m=rt.request().method();
    if(m==='OPTIONS')return rt.fulfill({status:204,headers:cors});
    if(u.includes('/auth/v1/'))return J(rt,200,{access_token:'t',refresh_token:'r',expires_in:3600,user:{id:uid,email}});
    if(u.includes('/profiles')){if(m==='GET')return J(rt,200,[profiles[uid]]);return J(rt,200,[profiles[uid]])}
    if(u.includes('/rpc/')){const fn=u.split('/rpc/')[1].split('?')[0],a=JSON.parse(rt.request().postData()||'{}');
      const err=msg=>J(rt,400,{message:msg});
      if(fn==='create_room'){const code='BKTR'.slice(0,3)+'ABCDFGH'[Object.keys(rooms).length];rooms[code]={code,host:uid,status:'lobby'};members.push({room_code:code,user_id:uid,nick:a.p_nick,club:null,joined_at:Date.now()});return J(rt,200,code)}
      if(fn==='join_room'){const code=(a.p_code||'').toUpperCase();if(!rooms[code])return err('Sala não encontrada. Confere o código.');if(!members.find(x=>x.room_code===code&&x.user_id===uid))members.push({room_code:code,user_id:uid,nick:a.p_nick,club:null,joined_at:Date.now()});return J(rt,200,rooms[code].status)}
      if(fn==='set_room_club'){if(members.find(x=>x.room_code===a.p_code&&x.club===a.p_club&&x.user_id!==uid))return err('Outro jogador já pegou esse clube.');members.find(x=>x.room_code===a.p_code&&x.user_id===uid).club=a.p_club;return rt.fulfill({status:204,headers:cors})}
      if(fn==='start_room'){if(rooms[a.p_code].host!==uid)return err('Só o dono da sala pode iniciar.');if(members.some(x=>x.room_code===a.p_code&&x.club==null))return err('Todo mundo precisa escolher um clube antes.');rooms[a.p_code].status='playing';return rt.fulfill({status:204,headers:cors})}
      if(fn==='leave_room'){const i=members.findIndex(x=>x.room_code===a.p_code&&x.user_id===uid);if(i>=0)members.splice(i,1);return rt.fulfill({status:204,headers:cors})}
    }
    if(u.includes('/rest/v1/room_members')){const rc=(u.match(/room_code=eq\.(\w+)/)||[])[1],ui=(u.match(/user_id=eq\.(\w+)/)||[])[1];
      return J(rt,200,members.filter(x=>(!rc||x.room_code===rc)&&(!ui||x.user_id===ui)).sort((a,b)=>a.joined_at-b.joined_at))}
    if(u.includes('/rest/v1/rooms')){const c1=(u.match(/code=eq\.(\w+)/)||[])[1],inn=(u.match(/code=in\.\(([^)]*)\)/)||[])[1];
      return J(rt,200,Object.values(rooms).filter(r=>(!c1||r.code===c1)&&(!inn||inn.split(',').includes(r.code))))}
    return J(rt,200,[])});
  await p.goto('http://localhost:8133/');await p.waitForTimeout(700);
  await p.fill('#sb_em',email);await p.fill('#sb_pw','123456');await p.click('[data-a=sbup]');await p.waitForTimeout(1800);
  await p.click('[data-a=mpo]');await p.waitForTimeout(1500);
  return p}
const A=await mk('ana@x.com','Ana'),B=await mk('beto@x.com','Beto');
console.log('1 lobby home',await A.evaluate(()=>/Criar sala/i.test(app.innerText)&&/Entrar com código/i.test(app.innerText)));
await A.click('[data-a=mpnew]');await A.waitForTimeout(1500);
const code=await A.evaluate(()=>MP.code);console.log('2 sala criada',code,await A.evaluate(()=>MP.members.length));
await A.screenshot({path:'f59_a.png'});
await B.fill('#mp_code','zzzz');await B.click('[data-a=mpjoin]');await B.waitForTimeout(800);
console.log('3 código errado',await B.evaluate(()=>MP.msg));
await B.fill('#mp_code',code.toLowerCase());await B.click('[data-a=mpjoin]');await B.waitForTimeout(1500);
console.log('4 beto entrou',await B.evaluate(()=>MP.members.length));
await A.waitForTimeout(3500);console.log('5 ana vê 2 jogadores (polling)',await A.evaluate(()=>MP.members.length));
await A.selectOption('#mp_club','5');await A.click('[data-a=mpclub]');await A.waitForTimeout(1200);
await B.selectOption('#mp_club','5').catch(()=>{});
console.log('6 clube ocupado desabilitado',await B.evaluate(()=>{const o=document.querySelector('#mp_club option[value="5"]');return o&&o.disabled}));
await B.selectOption('#mp_club','6');await B.click('[data-a=mpclub]');await B.waitForTimeout(1200);
await A.waitForTimeout(3500);
console.log('7 ana vê clubes',await A.evaluate(()=>MP.members.map(m=>m.club).join()));
await B.screenshot({path:'f59_b.png'});
console.log('8 beto não tem botão iniciar',await B.evaluate(()=>!document.querySelector('[data-a=mpstart]')));
await A.click('[data-a=mpstart]');await A.waitForTimeout(1500);
await B.waitForTimeout(3500);
console.log('9 status playing p/ ambos',await A.evaluate(()=>MP.room.status),await B.evaluate(()=>MP.room.status));
await A.screenshot({path:'f59_c.png'});
await B.click('[data-a=mpleave]');await B.waitForTimeout(1000);
console.log('10 beto saiu: volta ao lobby',await B.evaluate(()=>!MP.code&&/Criar sala/i.test(app.innerText)));
await b.close();srv.close()});

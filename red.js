const fs=require('fs');const order=fs.readFileSync('build.sh','utf8').match(/cat (data\.js[^;]*);/)[1].split(/\s+/).filter(Boolean);
const src={};let all='';for(const f of order){src[f]=fs.readFileSync(f,'utf8');all+=src[f]+'\n'}
console.log('arquivos',order.length,'bytes',all.length);
// (a) funções declaradas mais de uma vez
const decl=Object.create(null);for(const f of order){for(const m of src[f].matchAll(/^function\s+([A-Za-z_$][\w$]*)\s*\(/gm)){(decl[m[1]]=decl[m[1]]||[]).push(f)}}
const dup=Object.entries(decl).filter(([n,a])=>a.length>1);
console.log('\n(a) funções declaradas >1 vez (as anteriores são código morto):',dup.length);dup.forEach(([n,a])=>console.log('  ',n,a.join(' > ')));
// (b) funções sem nenhuma referência
const cnt=n=>(all.match(new RegExp('(?<![\\w$.])'+n.replace(/\$/g,'\\$')+'(?![\\w$])','g'))||[]).length;
const unused=Object.keys(decl).filter(n=>cnt(n)<=decl[n].length);
console.log('\n(b) funções nunca chamadas:',unused.length);unused.forEach(n=>console.log('  ',n,decl[n].join(',')));
// (c) consts nunca usadas
const cons=[];for(const f of order){for(const m of src[f].matchAll(/^const\s+([A-Za-z_$][\w$]*)\s*=/gm)){cons.push([m[1],f])}}
const uc=cons.filter(([n])=>cnt(n)<=1);
console.log('\n(c) consts nunca usadas:',uc.length);uc.forEach(([n,f])=>console.log('  ',n,f));
// (d) handlers A.* duplicados
const hk=Object.create(null);for(const f of order){for(const blk of src[f].matchAll(/Object\.assign\(A,\{([\s\S]*?)\}\);?/g)){for(const m of blk[1].matchAll(/(?:^|[,{\s])([a-zA-Z_]\w*)\s*\(([^)]*)\)\s*\{/g)){(hk[m[1]]=hk[m[1]]||[]).push(f)}}}
const hd=Object.entries(hk).filter(([n,a])=>a.length>1);
console.log('\n(d) handlers A.* definidos >1 vez:',hd.length);hd.slice(0,60).forEach(([n,a])=>console.log('  ',n,a.join(' > ')));
// (e) wrappers que capturam o original e nunca o chamam (o anterior vira código morto)
console.log('\n(e) wrappers que não usam o original capturado:');
let ne=0;for(const f of order){for(const m of src[f].matchAll(/const\s+(_[\w$]+)\s*=\s*([A-Za-z_$][\w$.]*)\s*;\s*\2\s*=\s*function/g)){
  const re=new RegExp('(?<![\\w$])'+m[1].replace(/\$/g,'\\$')+'(?![\\w$])','g');const c=(all.match(re)||[]).length;
  if(c<=1){ne++;console.log('  ',f,m[2],m[1])}}}
console.log('total',ne);

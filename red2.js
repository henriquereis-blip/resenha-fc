const fs=require('fs');const order=fs.readFileSync('build.sh','utf8').match(/cat (data\.js[^;]*);/)[1].split(/\s+/).filter(Boolean);
let all='';for(const f of order)all+=fs.readFileSync(f,'utf8')+'\n';
const names=new Set();for(const blk of all.matchAll(/Object\.assign\(A,\{([\s\S]*?)\}\);?/g)){for(const m of blk[1].matchAll(/(?:^|[,{\s])([a-zA-Z_]\w*)\s*\([^)]*\)\s*\{/g))names.add(m[1])}
for(const m of all.matchAll(/\bA\.([a-zA-Z_]\w*)\s*=\s*function/g))names.add(m[1]);
const dead=[];for(const n of names){if(['if','for','while','switch','catch','function'].includes(n))continue;
  const used=new RegExp('data-a=\\\\?["\']'+n+'\\\\?["\']|data-a=\\$\\{[^}]*\\}|\\bA\\.'+n+'\\b(?!\\s*=)|A\\[[\'"]'+n+'[\'"]\\]|dataset\\.a\\s*=\\s*[\'"]'+n+'[\'"]|[\'"`]'+n+'[\'"`]').test(all.replace(new RegExp('\\b'+n+'\\s*\\([^)]*\\)\\s*\\{','g'),''));
  if(!used)dead.push(n)}
console.log('handlers sem uso aparente:',dead.length,dead.join(', '));

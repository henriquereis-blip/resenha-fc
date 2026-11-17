const fs=require('fs');const acorn=require('../node_modules/acorn');
const order=fs.readFileSync('build.sh','utf8').match(/cat (data\.js[^;]*);/)[1].split(/\s+/).filter(Boolean);
// operações: [arquivo, tipo, nome]
const ops=[['ext17.js','prop','negopen'],['ui20.js','prop','apmode']];
const byFile={};for(const o of ops)(byFile[o[0]]=byFile[o[0]]||[]).push(o);
let removed=0,saved=0;
for(const [f,list] of Object.entries(byFile)){
  let s=fs.readFileSync(f,'utf8');const ast=acorn.parse(s,{ecmaVersion:'latest',allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true});
  const cut=[];
  for(const [,kind,name] of list){
    let hit=null;
    if(kind==='fn'){hit=ast.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name===name)}
    else if(kind==='const'){hit=ast.body.find(n=>n.type==='VariableDeclaration'&&n.declarations.length===1&&n.declarations[0].id.name===name)}
    else{ // propriedade dentro de Object.assign(A,{...})
      for(const st of ast.body){if(st.type!=='ExpressionStatement')continue;const e=st.expression;
        if(e.type==='CallExpression'&&e.callee.type==='MemberExpression'&&e.callee.property.name==='assign'&&e.arguments[0]&&e.arguments[0].name==='A'&&e.arguments[1]&&e.arguments[1].type==='ObjectExpression'){
          const idx=e.arguments[1].properties.findIndex(p=>p.key&&p.key.name===name);
          if(idx>=0){const props=e.arguments[1].properties,p=props[idx];let end=p.end;const rest=s.slice(end);const m=rest.match(/^\s*,/);if(m)end+=m[0].length;hit={start:p.start,end};break}}}}
    if(!hit){console.log('NÃO ACHEI',f,kind,name);continue}
    // inclui quebra de linha final
    let end=hit.end;while(s[end]===' '||s[end]==='\t')end++;if(s[end]==='\n')end++;
    cut.push([hit.start,end]);
  }
  cut.sort((a,b)=>b[0]-a[0]);for(const [a,b] of cut){saved+=b-a;removed++;s=s.slice(0,a)+s.slice(b)}
  fs.writeFileSync(f,s);
}
console.log('removidos',removed,'bytes',saved);

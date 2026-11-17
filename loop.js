const fs=require('fs');const acorn=require('../node_modules/acorn');
const order=fs.readFileSync('build.sh','utf8').match(/cat (data\.js[^;]*);/)[1].split(/\s+/).filter(Boolean);
let total=0;
for(let it=0;it<6;it++){
  const src={};let all='';for(const f of order){src[f]=fs.readFileSync(f,'utf8');all+=src[f]+'\n'}
  const cnt=n=>(all.match(new RegExp('(?<![\\w$.])'+n.replace(/\$/g,'\\$')+'(?![\\w$])','g'))||[]).length;
  let n0=0;
  for(const f of order){
    let s=src[f];let ast;try{ast=acorn.parse(s,{ecmaVersion:'latest',allowReturnOutsideFunction:true})}catch(e){continue}
    const cut=[];
    for(const nd of ast.body){
      let name=null;
      if(nd.type==='FunctionDeclaration')name=nd.id.name;
      else if(nd.type==='VariableDeclaration'&&nd.declarations.length===1&&nd.declarations[0].id.type==='Identifier'&&nd.kind==='const'){const d=nd.declarations[0];if(d.init&&/Function|Arrow|Literal|Object|Array|Template|Call|New/.test(d.init.type))name=d.id.name}
      if(!name)continue;
      if(nd.type==='VariableDeclaration'&&/^\s*(?:const)\s+\w+\s*=\s*(?:\w+)\(/.test(s.slice(nd.start,nd.end))&&false)continue;
      // só remove se só aparece 1x no bundle (a própria declaração)
      if(cnt(name)<=1){let e=nd.end;while(s[e]===' '||s[e]==='\t')e++;if(s[e]==='\n')e++;cut.push([nd.start,e,name])}
    }
    cut.sort((a,b)=>b[0]-a[0]);for(const [a,b,n] of cut){console.log('rm',f,n,b-a);total+=b-a;n0++;s=s.slice(0,a)+s.slice(b)}
    if(cut.length)fs.writeFileSync(f,s);
  }
  if(!n0)break;
}
console.log('bytes removidos',total);

const fs=require('fs');const acorn=require('../node_modules/acorn');
const order=fs.readFileSync('build.sh','utf8').match(/cat (data\.js[^;]*);/)[1].split(/\s+/).filter(Boolean);
// operações: [arquivo, tipo, nome]
const ops=[];
const dupFn={sponsorOffers:['logic.js'],pitchHTML:['ui.js'],clubCfg:['ui.js'],matchCfg:['ui.js'],vInicio:['ui.js'],vTatica:['ui.js','ext6.js'],vMatch:['ui.js'],vPanel:['ui.js','ext6.js'],render:['ui.js'],fitAll:['ext6.js'],dotsOf:['ext6.js'],slotOffers:['ext9.js'],slotAnnual:['ext9.js'],fitFine:['ext25.js']};
for(const [n,fs_] of Object.entries(dupFn))for(const f of fs_)ops.push([f,'fn',n]);
for(const [f,n] of [['logic.js','fit38'],['ui.js','hdrClub'],['ext11.js','injRoll'],['ext16.js','repOf'],['ext16.js','jrCount'],['ext25.js','lineupWants'],['ext37.js','wLive']])ops.push([f,'fn',n]);
for(const [f,n] of [['ui5.js','RL'],['ui9.js','starsH'],['ext13.js','FNOTE'],['ext17.js','_pot17'],['ext20.js','SLOTN'],['ext28.js','_by28'],['ext28.js','SPYR_TXT'],['ext32.js','CPR'],['ext38.js','NCONF']])ops.push([f,'const',n]);
for(const [f,n] of [['ui2.js','naming'],['ui9.js','mkopen'],['ui9.js','mkpick'],['ext24.js','mkmode']])ops.push([f,'prop',n]);
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

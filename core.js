/* core (v92): registro de ganchos. REGRA: recurso novo NÃO embrulha função de outro arquivo (nada de `const _x=fn;fn=function`). Use:
   hookAfter(fn,'nome',function(retorno,args){…})   roda depois
   hookBefore(fn,'nome',function(){…})              roda antes
   hookAround(fn,'nome',function(next,args){… return next() …})  envolve (pode pular next() ou mexer no retorno)
   Entradas ficam numa lista ÚNICA por função, em ordem de registro (a última é a mais externa), com try/catch e rótulo nos hooks before/after.
   Se alguém embrulhar a função "na mão" no meio, abre-se uma nova camada (ordem preservada). HOOKS_LIST() mostra tudo no console. */
const HOOKS={};
function hookMk(fname){
  let h=HOOKS[fname];
  if(h&&globalThis[fname]===h.layer)return h;
  const inner=globalThis[fname],list=[];
  const layer=function(){
    const self=this,a=arguments;let nx=ar=>inner.apply(self,ar||a);
    for(const e of list){const prev=nx;
      nx=e.t==='after'?ar=>{const r=prev(ar);try{e.fn.call(self,r,ar||a)}catch(x){console.error(e.label+' '+x.message)}return r}
        :e.t==='before'?ar=>{try{e.fn.apply(self,ar||a)}catch(x){console.error(e.label+' '+x.message)}return prev(ar)}
        :ar=>e.fn.call(self,function(){return prev(arguments.length?arguments:ar)},ar||a)}
    return nx();
  };
  h=HOOKS[fname]={layer,list,fname};globalThis[fname]=layer;return h;
}
function hookAfter(fname,label,fn){hookMk(fname).list.push({t:'after',label,fn})}
function hookBefore(fname,label,fn){hookMk(fname).list.push({t:'before',label,fn})}
function hookAround(fname,label,fn){hookMk(fname).list.push({t:'around',label,fn})}
function HOOKS_LIST(){return Object.values(HOOKS).map(h=>h.fname+' ['+h.list.length+']: '+h.list.map(x=>x.t[0]+':'+x.label).join(', '))}

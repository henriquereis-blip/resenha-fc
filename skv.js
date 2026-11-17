/* SKV: armazenamento dos saves. Memória + IndexedDB (sem o limite de ~5MB do localStorage); migra saves antigos do localStorage; se IDB falhar, usa localStorage puro. */
const SKV=(function(){
  const mem={};let ready=false,db=null,idbOk=false;const pend={};let tm=null;
  const isK=k=>String(k).indexOf(SAVE_KEY)===0;
  const LS={g:k=>{try{return localStorage.getItem(k)}catch(e){return null}},s:k=>0};
  function flush(){tm=null;if(!db)return;const ks=Object.keys(pend);if(!ks.length)return;
    try{const tx=db.transaction('kv','readwrite'),st=tx.objectStore('kv');
      ks.forEach(k=>{if(pend[k]===null)st.delete(k);else st.put(pend[k],k);delete pend[k]});
      tx.onerror=tx.onabort=()=>{idbOk=false;ks.forEach(k=>{try{if(mem[k]!=null)localStorage.setItem(k,mem[k])}catch(e){}})}}catch(e){idbOk=false}}
  function sched(now){if(now){clearTimeout(tm);flush()}else if(!tm)tm=setTimeout(flush,250)}
  const api={
    getItem(k){if(!isK(k))return LS.g(k);if(k in mem)return mem[k];return ready&&idbOk?null:LS.g(k)},
    setItem(k,v){v=String(v);if(!isK(k)){localStorage.setItem(k,v);return}
      mem[k]=v;
      if(idbOk){pend[k]=v;sched();try{localStorage.removeItem(k)}catch(e){}}
      else localStorage.setItem(k,v)},
    removeItem(k){if(!isK(k)){localStorage.removeItem(k);return}
      delete mem[k];try{localStorage.removeItem(k)}catch(e){}
      if(idbOk){pend[k]=null;sched()}},
    flush:()=>sched(true),
    info:()=>({idb:idbOk,ready,keys:Object.keys(mem).length})
  };
  function lsKeys(){const r=[];try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&isK(k))r.push(k)}}catch(e){}return r}
  function init(){
    let rq;try{rq=indexedDB.open('resenhafc',1)}catch(e){ready=true;return}
    rq.onupgradeneeded=()=>{try{rq.result.createObjectStore('kv')}catch(e){}};
    rq.onerror=rq.onblocked=()=>{ready=true};
    rq.onsuccess=()=>{
      db=rq.result;
      try{
        const st=db.transaction('kv','readonly').objectStore('kv'),cr=st.openCursor();
        cr.onsuccess=()=>{const c=cr.result;
          if(c){if(!(c.key in mem))mem[c.key]=c.value;c.continue();return}
          idbOk=true;
          /* migração: o que ainda está só no localStorage vai pro IDB; só apaga do localStorage depois de gravar */
          const mig=lsKeys().filter(k=>!(k in mem)||k in mem&&false);
          lsKeys().forEach(k=>{const v=LS.g(k);if(v!=null&&!(k in mem))mem[k]=v});
          const all=lsKeys();
          try{const tx=db.transaction('kv','readwrite'),s2=tx.objectStore('kv');
            Object.keys(mem).forEach(k=>{if(all.indexOf(k)>=0)s2.put(mem[k],k)});
            tx.oncomplete=()=>{all.forEach(k=>{try{if(LS.g(k)===mem[k])localStorage.removeItem(k)}catch(e){}})};
            tx.onerror=tx.onabort=()=>{};
          }catch(e){}
          ready=true;
          try{if(typeof G!=='undefined'&&G&&G.phase==='start'&&typeof render==='function')render()}catch(e){}
        };
        cr.onerror=()=>{ready=true};
      }catch(e){ready=true}
    };
  }
  init();
  document.addEventListener('visibilitychange',()=>{if(document.hidden)api.flush()});
  window.addEventListener('pagehide',()=>api.flush());
  return api;
})();

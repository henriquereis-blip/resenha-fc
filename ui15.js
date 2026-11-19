/* ui15: tudo é clicável — nomes de jogadores e clubes viram links, painéis levam para a tela certa */
(function(){const st=document.createElement('style');st.textContent=`
.lk{cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px;text-decoration-color:color-mix(in srgb,currentColor 55%,transparent)}
.lk:hover{text-decoration-style:solid}
.go15{cursor:pointer}.go15:hover{filter:brightness(1.08)}
`;document.head.appendChild(st)})();
let LKC={key:'',pl:null,plre:null,cl:null,clre:null};
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function lkBuild(){
  const key=G.season+'-'+Object.keys(G.players).length+'-'+G.user;if(LKC.key===key)return;
  const pl=new Map(),names=[];
  for(const p of Object.values(G.players)){if(p.club<0&&!p.club===undefined)continue;const n=nameOf(p);if(n.length<6)continue;
    const cur=pl.get(n);if(!cur||p.club===G.user)pl.set(n,p.id);if(!cur)names.push(n)}
  names.sort((a,b)=>b.length-a.length);
  const cl=new Map(),cn=[];
  for(const c of G.clubs){cl.set(c.name,c.id);cn.push(c.name)}
  cn.sort((a,b)=>b.length-a.length);
  LKC={key,pl,plre:new RegExp('('+names.map(reEsc).join('|')+')','g'),cl,clre:new RegExp('('+cn.map(reEsc).join('|')+')','g')};
}
function linkify(){
  if(!G||!G.clubs||!G.clubs.length)return;
  const root=document.querySelector('#app');if(!root)return;lkBuild();
  const SKIP='button,a,select,option,input,textarea,script,style,.lk,[data-a],svg,label,th';
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,null);const nodes=[];
  while(w.nextNode()){const n=w.currentNode;if(n.nodeValue.trim().length<4)continue;const p=n.parentElement;if(!p||p.closest(SKIP))continue;nodes.push(n)}
  for(const n of nodes){
    const txt=n.nodeValue;if(txt.length>220)continue;
    const re=[[LKC.plre,LKC.pl,'plk'],[LKC.clre,LKC.cl,'clk']];
    let hit=null;
    for(const [rx,map,act] of re){rx.lastIndex=0;const m=rx.exec(txt);if(m){hit=[rx,map,act];break}}
    if(!hit)continue;
    const [rx,map,act]=hit;rx.lastIndex=0;
    const frag=document.createDocumentFragment();let last=0,m;
    while((m=rx.exec(txt))){
      if(m.index>last)frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
      const a=document.createElement('span');a.className='lk';a.dataset.a=act;a.dataset.id=map.get(m[1]);a.textContent=m[1];frag.appendChild(a);last=m.index+m[1].length;
    }
    if(last<txt.length)frag.appendChild(document.createTextNode(txt.slice(last)));
    n.parentNode.replaceChild(frag,n);
  }
  // painéis e chips
  const go=(el,v,extra)=>{if(!el||el.dataset.a)return;el.dataset.a='nav';el.dataset.v=v;el.classList.add('go15');if(extra)Object.assign(el.dataset,extra)};
  const q=(s)=>[...root.querySelectorAll(s)];
  q('.cpanel .bars>div').forEach((e,i)=>go(e,i===0?'dir':'torcida'));
  q('.cpanel .sm').forEach(e=>{const t=e.textContent;if(/lugar/.test(t))go(e,'liga');else if(/Dívida/.test(t))go(e,'clube')});
  q('.fxp').forEach(e=>{const t=e.textContent;go(e,/Vestiário/.test(t)?'vest':/Auxiliar/.test(t)?'assist':'treino')});
  q('.pres,.pb').forEach(e=>go(e,'liga'));
  q('.ostrip').forEach(e=>{if(e.dataset.a)return;const c=userClub();const fx=G.round<NR()?G.fixtures[G.round][userFixtureIdx()]:null;if(fx){e.dataset.a='clk';e.dataset.id=fx[0]===c.id?fx[1]:fx[0];e.classList.add('go15')}});
  q('.tile9').forEach(e=>{const t=e.textContent;if(/lesõ|DM/i.test(t))go(e,'medico')});
}
Object.assign(A,{
 plk(d){S.prof=+d.id;S.paper=false;S.psel=null;render();window.scrollTo(0,0)},
 clk(d){G.view='times';S.team=+d.id;S.tt='elenco';S.prof=null;S.paper=false;render();window.scrollTo(0,0)}
});
hookAround('render','r15',function(next,__a){next();if(!S.match){try{linkify()}catch(e){console.error('linkify '+e.message)}}});

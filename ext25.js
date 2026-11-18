/* ext25: perna do jogador e posições específicas (LE/LD, ZAG canhoto/destro, VOL/MEI/MAT, PE/PD) */
const SUBN={GOL:'Goleiro',ZAG:'Zagueiro',LE:'Lateral esquerdo',LD:'Lateral direito',VOL:'Volante',MEI:'Meia',MAT:'Meia-atacante',PE:'Ponta esquerda',PD:'Ponta direita',CA:'Centroavante'};
const FOOTN={E:'Canhoto',D:'Destro',A:'Ambidestro'};
const FOOTKNOWN={'Arrascaeta':'E','Gerson':'E','Ayrton Lucas':'E','Piquerez':'E','Alex Sandro':'E','Filipe Luís':'E','Hulk':'E','Messi':'E','Lionel Messi':'E','Gabigol':'E','Gabriel Barbosa':'E','Matheus Pereira':'E','Marcos Rocha':'D','Gustavo Gómez':'D','Neymar':'D','Raphael Veiga':'D','Veiga':'D','Pedro':'D','Cano':'D'};
const hs25=n=>{let h=n*2654435761>>>0;h^=h>>>15;h=Math.imul(h,2246822507)>>>0;h^=h>>>13;return (h>>>0)/4294967296};
function subOf(p){
  if(p.sub!==undefined)return p.sub;
  const r=hs25(p.id+11),r2=hs25(p.id*7+3),role=p.role,tr=p.tr||[];
  let sub=role==='GOL'?'GOL':role,foot;
  if(role==='LAT'){sub=r<.5?'LE':'LD';foot=r2<.88?(sub==='LE'?'E':'D'):(sub==='LE'?'D':'E')}
  else if(role==='PNT'){sub=r<.5?'PE':'PD';foot=r2<.55?(sub==='PE'?'D':'E'):(sub==='PE'?'E':'D')}
  else if(role==='MEI'){sub=(tr.some(t=>['Fin','Dri','Cha'].includes(t))&&r<.55)||r<.12?'MAT':'MEI';foot=r2<.22?'E':'D'}
  else if(role==='ATA'){sub='CA';foot=r2<.2?'E':'D'}
  else if(role==='ZAG'){foot=r2<.3?'E':'D'}
  else foot=r2<.18?'E':'D';
  if(hs25(p.id*13+5)<.05)foot='A';
  if(p.real||p.nm){}
  const nm=(p.name||'').replace(/\*/g,'');for(const k in FOOTKNOWN)if(nm===k||nm.endsWith(' '+k)){foot=FOOTKNOWN[k];if(sub==='LE'&&foot==='D'||sub==='LD'&&foot==='E'){}}
  p.sub=sub;p.foot=foot;return sub;
}
const footOf=p=>{subOf(p);return p.foot};
const SUBL={GOL:'GOL',ZAG:'ZAG',LE:'LE',LD:'LD',VOL:'VOL',MEI:'MEI',MAT:'MAT',PE:'PE',PD:'PD',CA:'ATA'};
hookAround('roleLabel','rl25',function(next,__a){let [p]=__a;return SUBL[subOf(p)]||next(p)});
Object.assign(FPOS,{'4-4-2':{a:[[38,15],[62,15]]},'3-5-2':{a:[[38,15],[62,15]]},'4-3-3':{m:[[30,44],[50,54],[70,44]]},'5-3-2':{m:[[30,44],[50,52],[70,44]],a:[[38,15],[62,15]]},'4-1-4-1':FPOS['4-1-4-1']});
/* o que cada vaga do campinho pede */
const WCACHE={};
function wantsOf(f){
  if(WCACHE[f])return WCACHE[f];
  const sl=slotsOf(f),pos=layout(sl,f),nd=sl.filter(x=>x==='DEF').length,nm=sl.filter(x=>x==='MID').length,out=[];
  sl.forEach((s,i)=>{const {x,y}=pos[i];let w;
    if(s==='GK')w='GOL';
    else if(s==='DEF'){
      if(nd===3)w=x<38?'ZE':x>62?'ZD':'ZAG';
      else if(x<=22)w='LE';else if(x>=78)w='LD';
      else w=nd===5&&Math.abs(x-50)<8?'ZAG':x<50?'ZE':'ZD'}
    else if(s==='MID'){const wide=nm>=4&&(x<=24||x>=76);w=wide?((nd===4?'W':'AL')+(x<50?'E':'D')):y>=53?'VOL':y<=36?'MAT':'MEI'}
    else w=x<=25?'PE':x>=75?'PD':'CA';
    out.push(w)});
  return WCACHE[f]=out;
}
const WLBL={WE:'MAE',WD:'MAD',GOL:'GOL',ZE:'ZAG',ZD:'ZAG',ZAG:'ZAG',LE:'LE',LD:'LD',ALE:'ALE',ALD:'ALD',VOL:'VOL',MEI:'MEI',MAT:'MAT',PE:'PE',PD:'PD',CA:'ATA'};
var macroOK=(p,slot,w)=>p.pos===slot||((w==='ALE'||w==='ALD'||w==='WE'||w==='WD')&&(p.role==='LAT'||p.role==='PNT'));
/* fora de posição? (para pintar o rótulo) */
function posOff(p,slot,w){if(slot==='GK'||p.pos==='GK')return p.pos!==slot;return !macroOK(p,slot,w)||fitFine(p,w)<.96}
/* encaixe de posição de cada jogador para a vaga */

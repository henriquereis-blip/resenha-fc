#!/usr/bin/env python3
"""Gera ext68.js: simplificação das divisões (só 1ª e 2ª; Brasil e Inglaterra ficam como estão).
- países de 2 divisões: 2ª divisão ganha descenso e um pool escondido de clubes "reserva" (jogadores gerados) que sobem quando os outros caem
- países com 3ª divisão real (ESP ITA GER FRA POR ARG JPN SCO): a 3ª vira o pool escondido (nomes reais, enxuto)
- países de 1 divisão sem lista (BOL VEN EGY MAR): ganham 2ª divisão gerada, para a 1ª ter rebaixamento
Uso: python3 tools/gen_ext68.py  (rodar na raiz do repo)"""
import json
# k: (N sobe/desce, [padrões], [cidades])
RES2 = {
 'URU':(2,['Atlético {t}','Deportivo {t}','Club {t}','Juventud {t}'],['Paysandú','Salto','Rivera','Artigas','Melo','Durazno','Florida','Mercedes','Colonia','Minas','Rocha','Treinta y Tres']),
 'COL':(2,['Atlético {t}','Deportivo {t}','Real {t}','Club {t}'],['Girardot','Neiva','Montería','Sincelejo','Tunja','Yopal','Florencia','Pasto','Armenia','Villavicencio','Buenaventura','Ibagué']),
 'CHI':(2,['Deportes {t}','Club {t}','Unión {t}','Atlético {t}'],['Ovalle','Linares','Curicó','Calama','Coquimbo','Vallenar','Ancud','Punta Arenas','Osorno','Valdivia','Quilpué','Melipilla']),
 'PAR':(2,['Club {t}','Atlético {t}','Deportivo {t}','Sportivo {t}'],['Pilar','Villarrica','Caacupé','Concepción','Coronel Oviedo','Luque','Itauguá','Areguá','Caaguazú','Hernandarias','Salto del Guairá','Pedro Juan Caballero']),
 'ECU':(2,['Deportivo {t}','Club {t}','Atlético {t}','Sport {t}'],['Ibarra','Riobamba','Loja','Ambato','Esmeraldas','Machala','Babahoyo','Latacunga','Tulcán','Macas','Quevedo','Manta']),
 'PER':(2,['Deportivo {t}','Club {t}','Sport {t}','Atlético {t}'],['Chiclayo','Piura','Tarapoto','Huaraz','Puno','Pucallpa','Tumbes','Ica','Chimbote','Arequipa','Trujillo','Iquitos']),
 'KSA':(2,['Al-{t}'],['Tuwaiq','Nahda','Safa','Kawkab','Sahel','Jubail','Sakaka','Mujazzal','Yanbu','Bisha','Shoulla','Sharq']),
 'NED':(2,['VV {t}','SV {t}','FC {t}','ASV {t}'],['Katwijk','Spakenburg','Rijnsburg','Hoogeveen','Genemuiden','Barendrecht','Scheveningen','Harkemase','Hoek','Lisse','Terneuzen','Kampen']),
 'BEL':(1,['KFC {t}','RFC {t}','K {t}','Royal {t}'],['Hamme','Tienen','Visé','Knokke','Berchem','Heist','Wetteren','Geel','Turnhout','Ninove','Waremme','Namur']),
 'TUR':(3,['{t}spor'],['Karacabey','Kırklareli','Niğde','Kırşehir','Nevşehir','Çankaya','Darıca','Sultanbeyli','Düzce','Ergene','Altay','Bergama']),
 'KOR':(1,['{t} FC','{t} Citizen'],['Pyeongtaek','Pocheon','Yangju','Icheon','Gyeongju','Mokpo','Jinju','Namyangju','Siheung','Yeoju','Gangneung','Gumi']),
 'CHN':(1,['{t} FC','{t} City'],['Guizhou','Hohhot','Liuzhou','Nantong','Suzhou','Xinjiang','Jiangxi','Baoding','Heilongjiang','Zibo','Wuxi','Lanzhou']),
 'RSA':(2,['{t} United','{t} Rovers','{t} Stars'],['Mthatha','Nelspruit','Rustenburg','Kimberley','Welkom','George','Witbank','Vryheid','Pietermaritzburg','Mahikeng','Tzaneen','Bethlehem']),
 'AUT':(1,['SV {t}','FC {t}','SC {t}','ASK {t}'],['Dornbirn','Lochau','Kufstein','Wörgl','Leoben','Gmunden','Steyr','Horn','Oberwart','Ebreichsdorf','Neusiedl','Parndorf']),
 'SUI':(1,['FC {t}','SC {t}'],['Bellinzona','Chiasso','Locarno','Köniz','Baden','Schaffhausen','Biel','Kreuzlingen','Wohlen','Delémont','Fribourg','Monthey']),
 'GRE':(2,['{t} FC'],['Ioannina','Chania','Rethymno','Kavala','Veria','Lamia','Trikala','Chalkida','Komotini','Rhodes','Edessa','Larissa Nea']),
 'DEN':(2,['{t} IF','{t} BK','{t} FC'],['Skive','Thisted','Holbæk','Næstved','Roskilde','Helsingør','Hjørring','Nykøbing','Slagelse','Svendborg','Brabrand','Kalundborg']),
}
# países de 1 divisão: ganham 2ª gerada (N sobem/descem, nº de clubes)
GEN2 = {
 'BOL':(2,12,['Club {t}','Deportivo {t}','Real {t}','Atlético {t}'],['Sucre','Tarija','Trinidad','Cobija','Montero','Warnes','Camiri','Villazón','Uyuni','Llallagua','Riberalta','Yacuiba']),
 'VEN':(2,10,['Club {t}','Deportivo {t}','Atlético {t}','Unión {t}'],['Maturín','Barinas','Cumaná','Barquisimeto','Valencia','Maracay','Mérida','Punto Fijo','Guanare','Coro','Acarigua','San Cristóbal']),
 'EGY':(3,12,['{t} SC','{t} Club'],['Tanta','Mansoura','Damietta','Fayoum','Beni Suef','Minya','Sohag','Qena','Luxor','Aswan','Ismailia','Suez']),
 'MAR':(3,12,['{t} FC','Olympique {t}','Union {t}'],['Oujda','Safi','Nador','Laayoune','Khouribga','Kenitra','Settat','Beni Mellal','Larache','Taza','Errachidia','Ouarzazate']),
}
# 3ª divisão real vira pool escondido: k -> (c, up, extra)
REAL3 = {'ESP':(16,4,{}),'ITA':(16,4,{}),'GER':(16,2,{'chal':[3,3]}),'FRA':(18,3,{}),'POR':(16,2,{}),'ARG':(16,2,{}),'JPN':(16,3,{}),'SCO':(10,1,{})}


# v89: nomes REAIS (decisão do Henrique: nada de clube com nome inventado). Divisões inferiores de cada país.
REALN = {
 'URU':['Albion','Atenas de San Carlos','Colón','Oriental de Montevideo','Rampla Juniors','Uruguay Montevideo','Villa Teresa','Central Español','Salus','Frontera Rivera','Huracán (URU)','Deportivo Colonia'],
 'COL':['Llaneros','Boca Juniors de Cali','Real Cartagena','Cortuluá','Atlético FC','Barranquilla FC','Real Santander','Orsomarso','Bogotá FC','Fortaleza CEIF','Tigres FC','Unión Magdalena'],
 'CHI':['Santiago Morning','Deportes Temuco','Santiago Wanderers','Deportes Recoleta','Rangers de Talca','Deportes Santa Cruz','Deportes Copiapó','Deportes Puerto Montt','Deportes Iberia','San Marcos de Arica','Magallanes','Deportes Limache'],
 'PAR':['Guaireña','General Caballero JLM','Sportivo Carapeguá','Fernando de la Mora','Atlético Colegiales','12 de Octubre','Martín Ledesma','Sportivo Iteño','Deportivo Capiatá','Resistencia SC','Tembetary','River Plate (PAR)'],
 'ECU':['Imbabura','9 de Octubre','Atlético Santo Domingo','Deportivo Quito','Fuerza Amarilla','Libertad FC','Manta FC','Clan Juvenil','Santa Rita','Cumbayá FC','Gualaceo SC','Guayaquil City'],
 'PER':['Juan Pablo II College','Deportivo Coopsol','Santos de Nasca','Alianza Universidad','Comerciantes Unidos','ADT','Pirata FC','Sport Chavelines','Los Chankas','Deportivo Llacuabamba','Atlético Grau','Unión Comercio'],
 'KSA':['Al-Kawkab','Al-Sahel','Al-Jubail','Al-Mujazzal','Al-Nahda','Al-Shoulla','Al-Thoqbah','Al-Taraji','Hajer','Al-Sharq','Al-Qous','Al-Najma','Al-Tai','Al-Zulfi','Al-Jandal','Al-Washm','Al-Diriyah','Al-Arabi (KSA)','Al-Bukayriyah','Al-Anwar','Al-Jabalain','Al-Ain (KSA)','Al-Safa','Al-Qaisumah'],
 'NED':['Katwijk','Spakenburg','Rijnsburgse Boys','Hoogeveen','GVVV','Barendrecht','Kozakken Boys','Hoek','Lisse','Quick Boys','IJsselmeervogels','Scheveningen'],
 'BEL':['Dessel Sport','Heist','Knokke','RFC Liège','Lierse','Patro Eisden','Tienen','Olympic Charleroi','Francs Borains','Seraing','Rupel Boom','Hamme'],
 'TUR':['Altınordu','Amed SK','Bandırmaspor','Menemenspor','Sarıyer','Sakaryaspor','Kırklarelispor','Karacabey Belediyespor','Fethiyespor','Ankaraspor','Somaspor','Beyoğlu Yeni Çarşı'],
 'KOR':['Gyeongju KHNP','Daejeon Korail','Gimhae FC','Mokpo City','Pocheon Citizen','Yangju Citizen','Siheung Citizen','Gangneung City','Chuncheon FC','Pyeongtaek Citizen','Yeoju FC','Namyangju Citizen'],
 'CHN':['Hubei Istar','Shaanxi Union','Sichuan Jiuniu','Jiangxi Lushan','Guangxi Pingguo','Shijiazhuang Gongfu','Yunnan Yukun','Foshan Nanshi','Taizhou Yuanda','Wuxi Wugou','Nantong Zhiyun','Beijing Rongchang'],
 'RSA':['Cape Town Spurs','Milford FC','Hungry Lions','Upington City','Kruger United','Pretoria Callies','Black Leopards','Tshakhuma Tsha Madzivhandila','JDR Stars','Orbit College','Venda FC','Moroka Swallows'],
 'AUT':['Dornbirn','Kapfenberger SV','SV Horn','SV Lafnitz','Vorwärts Steyr','Stripfing','Admira Wacker','Wacker Innsbruck','Kufstein','Oberwart','Gleisdorf','Leoben'],
 'SUI':['Bellinzona','Chiasso','Wohlen','Kriens','Schaffhausen','Biel-Bienne','Étoile Carouge','Stade Nyonnais','Cham','Breitenrain','Baden','Köniz'],
 'GRE':['Ionikos','Panachaiki','Apollon Smyrnis','Egaleo','Anagennisi Karditsa','Kallithea','Niki Volos','Panserraikos','Chania','Ergotelis','Doxa Drama','Panegialios'],
 'DEN':['Skive IK','Thisted FC','Holbæk B&I','Næstved BK','Roskilde','HB Køge','Fremad Amager','B93','Kolding IF','Nykøbing FC','Hobro IK','Esbjerg fB'],
 'BOL':['Ciclón','Guabirá','Atlético Bermejo','Fancesa','Deportivo Kenty','Universitario de Pando','Mamoré','Stormers','Nacional Potosí','Ayacucho FC','Vaca Díez','Gran Mamoré'],
 'VEN':['Hermanos Colombo','Titanes FC','Yaracuyanos','UCV FC','Atlético El Vigía','Estudiantes de Caracas','Rayo Zuliano','Ureña SC','Llaneros de Guanare','Real Frontera'],
 'EGY':['Tanta','Haras El Hodoud','Telecom Egypt','Aswan SC','Mansoura','Petrojet','El Entag El Harby','Kahrabaa Ismailia','Nasr Cairo','Dayrout','Qena SC','Minya SC'],
 'MAR':['Olympic Safi','Chabab Atlas Khénifra','Union Touarga','Rachad Bernoussi','Kawkab Marrakech','Raja Beni Mellal','Mouloudia Oujda','Racing Casablanca','Union Sidi Kacem','Chabab Mohammédia','Ittihad Khemisset','Widad Témara'],
}
import re as _re
_TXT=open('ext37.js',encoding='utf-8').read()+open('ext44.js',encoding='utf-8').read()
def _exists(n):
    return bool(_re.search(r"(?<![\w])"+_re.escape(n)+r"(?: \d+)?[,'\"\]]",_TXT))
def real_list(k,n):
    """só nomes reais que ainda não existem no jogo; nº par; se sobrar pouco, sem pool (a 2ª divisão fica sem descenso)"""
    l=[x for x in REALN[k] if not _exists(x)][:n]
    if len(l)%2:l=l[:-1]
    return l
def real_names(k,l,top,step):
    return ','.join('%s %d'%(x,round(top-i*step)) for i,x in enumerate(l))
RESL={k:real_list(k,12) for k in RES2}
RES2={k:v for k,v in RES2.items() if len(RESL[k])>=6}
GENL={k:real_list(k,c) for k,(n,c,p,t) in GEN2.items()}
GEN2={k:(n,len(GENL[k]),p,t) for k,(n,c,p,t) in GEN2.items()}
print('pools reais:',{k:len(v) for k,v in RESL.items()},'| sem pool:',[k for k in RESL if k not in RES2])
def names(pats, towns, n, top, step):
    out=[]
    for i,t in enumerate(towns[:n]):
        nm=pats[i%len(pats)].format(t=t)
        out.append('%s %d'%(nm, round(top-i*step)))
    return ','.join(out)

pool={k:real_names(k,RESL[k],47,.4) for k in RES2}
gen2={k:real_names(k,GENL[k],52,.5) for k in GEN2}
cfg={'res2':{k:v[0] for k,v in RES2.items()},'resc':{k:len(RESL[k]) for k in RES2},
     'gen2':{k:[v[0],v[1]] for k,v in GEN2.items()},
     'real3':{k:{'c':v[0],'up':v[1],**v[2]} for k,v in REAL3.items()}}
js="""/* ext68 (GERADO por tools/gen_ext68.py, não editar à mão): simplificação das divisões.
   Só Brasil e Inglaterra têm mais de 2 divisões. Nos demais países a 2ª divisão tem descenso e um pool escondido
   (clubes "reserva" com jogadores gerados, ou a 3ª divisão real enxuta) repõe quem cai. A divisão-reserva só aparece nas tabelas se o técnico cair nela. */
(function(){
const CFG=%s;
const POOL=%s;
const GEN2=%s;
/* v133: nomes reais das divisões (antes 'Divisão inferior' e 'Segunda divisão' genéricos). A Austrália não tem 2ª divisão (liga fechada). */
const NM3={URU:'Primera División Amateur',PAR:'Primera B',ECU:'Segunda Categoría',KSA:'Segunda Divisão saudita',NED:'Tweede Divisie',BEL:'Nationale 1',TUR:'TFF 2. Lig',KOR:'K3 League',CHN:'China League Two',RSA:'SAFA Second Division',AUT:'Regionalliga',SUI:'Promotion League',GRE:'Gamma Ethniki',DEN:'2ª Divisão dinamarquesa'};
const NM2={BOL:'Copa Simón Bolívar',VEN:'Liga FUTVE 2',EGY:'Egyptian Second Division',MAR:'Botola Pro 2'};
const WR_TXT={BOL:'Rebaixamento: os 2 últimos caem para a Copa Simón Bolívar.',VEN:'Rebaixamento: os 2 últimos caem para a Liga FUTVE 2.',EGY:'Rebaixamento: os 3 últimos caem para a Egyptian Second Division.',MAR:'Rebaixamento: os 3 últimos caem para a Botola Pro 2.'};
for(const k in CFG.res2){const n=CFG.res2[k],T=PYR[k];if(!T||T.length!==2)continue;
  T[1].dn=n;T.push({n:NM3[k]||'Divisão inferior',c:CFG.resc[k],up:n,res:1});PD[k]=PD[k]||[0];PD[k][2]=POOL[k]}
for(const k in CFG.gen2){const [n,c]=CFG.gen2[k],T=PYR[k];if(!T||T.length!==1)continue;
  T[0].dn=n;T.push({n:NM2[k]||'Segunda divisão',c,up:n});PD[k]=[0,GEN2[k]];
  if(WRULES[k]){WRULES[k].rel=n;WRULES[k].txt=(WRULES[k].txt||[]).filter(x=>!/rebaix|2ª divis|descenso/i.test(x)).concat([WR_TXT[k]])}}
for(const k in CFG.real3){const c=CFG.real3[k],T=PYR[k];if(!T||T.length!==3)continue;const t=T[2];
  t.g=1;t.c=c.c;t.up=c.up;delete t.po;delete t.pool;if(c.chal)t.chal=c.chal;else delete t.chal;t.res=1;T[1].dn=c.up}
/* saves antigos no exterior: acrescenta as divisões que faltam */
globalThis.pyrMig68=function(){const P=G&&G.pyr;if(!P)return;const all=pdivs(P.k);if(all.length<=P.dv.length)return;
  for(const x of all.slice(P.dv.length)){P.dv.push(x);const i=Math.min(x.t-1,4);DIVN[x.d]=x.name;RBAND[x.d]=TBAND[i].slice();DW36[x.d]=TDW[i];
    const src=PD[P.k]&&PD[P.k][x.t-1],str=Array.isArray(src)?src[x.j]:src;if(str)for(const e of pList(str).slice(0,x.c))P.L.push(stubOf(e,x.d))}};
hookAround('pyrFinish','pf68',function(next,__a){try{pyrMig68()}catch(e){console.error('mig68 '+e.message)}return next()});
/* tabelas: esconde a divisão-reserva, a não ser que o técnico esteja nela */
hookAround('vLiga','vl68',function(next,__a){
  const P=G&&G.abroad&&G.pyr;if(!P||userDiv()<4)return next();
  try{pyrMig68()}catch(e){}
  const T=PYR[P.k]||[],ut=tierOf(userDiv()),hide=P.dv.filter(x=>T[x.t-1]&&T[x.t-1].res&&ut<x.t);
  if(S.abd&&hide.some(x=>x.d===S.abd))S.abd=userDiv();
  let h=next();
  for(const x of hide)h=h.replace(new RegExp('<button[^>]*data-a="abd" data-v="'+x.d+'"[^>]*>[^<]*</button>'),'');
  return h;
});
})();
""" % (json.dumps(cfg,ensure_ascii=False), json.dumps(pool,ensure_ascii=False), json.dumps(gen2,ensure_ascii=False))
open('ext68.js','w',encoding='utf-8').write(js)
print('ext68.js gerado:',len(js),'bytes;',len(RES2),'países com pool,',len(GEN2),'com 2ª gerada,',len(REAL3),'com 3ª real enxuta')

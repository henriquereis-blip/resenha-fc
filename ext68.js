/* ext68 (GERADO por tools/gen_ext68.py, não editar à mão): simplificação das divisões.
   Só Brasil e Inglaterra têm mais de 2 divisões. Nos demais países a 2ª divisão tem descenso e um pool escondido
   (clubes "reserva" com jogadores gerados, ou a 3ª divisão real enxuta) repõe quem cai. A divisão-reserva só aparece nas tabelas se o técnico cair nela. */
(function(){
const CFG={"res2": {"URU": 2, "PAR": 2, "ECU": 2, "KSA": 2, "NED": 2, "BEL": 1, "TUR": 3, "KOR": 1, "CHN": 1, "RSA": 2, "AUT": 1, "SUI": 1, "GRE": 2, "DEN": 2}, "resc": {"URU": 6, "PAR": 6, "ECU": 8, "KSA": 12, "NED": 12, "BEL": 8, "TUR": 10, "KOR": 12, "CHN": 6, "RSA": 6, "AUT": 8, "SUI": 8, "GRE": 8, "DEN": 8}, "gen2": {"BOL": [2, 8], "VEN": [2, 8], "EGY": [3, 10], "MAR": [3, 10]}, "real3": {"ESP": {"c": 16, "up": 4}, "ITA": {"c": 16, "up": 4}, "GER": {"c": 16, "up": 2, "chal": [3, 3]}, "FRA": {"c": 18, "up": 3}, "POR": {"c": 16, "up": 2}, "ARG": {"c": 16, "up": 2}, "JPN": {"c": 16, "up": 3}, "SCO": {"c": 10, "up": 1}}};
const POOL={"URU": "Atenas de San Carlos 47,Oriental de Montevideo 47,Salus 46,Frontera Rivera 46,Huracán (URU) 45,Deportivo Colonia 45", "PAR": "Atlético Colegiales 47,12 de Octubre 47,Martín Ledesma 46,Sportivo Iteño 46,Resistencia SC 45,River Plate (PAR) 45", "ECU": "Imbabura 47,Atlético Santo Domingo 47,Deportivo Quito 46,Fuerza Amarilla 46,Manta FC 45,Clan Juvenil 45,Santa Rita 45,Cumbayá FC 44", "KSA": "Al-Kawkab 47,Al-Sahel 47,Al-Jubail 46,Al-Mujazzal 46,Al-Nahda 45,Al-Shoulla 45,Al-Thoqbah 45,Al-Taraji 44,Hajer 44,Al-Sharq 43,Al-Qous 43,Al-Washm 43", "NED": "Katwijk 47,Spakenburg 47,Rijnsburgse Boys 46,Hoogeveen 46,GVVV 45,Barendrecht 45,Kozakken Boys 45,Hoek 44,Lisse 44,Quick Boys 43,IJsselmeervogels 43,Scheveningen 43", "BEL": "Dessel Sport 47,Heist 47,Knokke 46,Lierse 46,Tienen 45,Olympic Charleroi 45,Rupel Boom 45,Hamme 44", "TUR": "Altınordu 47,Amed SK 47,Menemenspor 46,Sakaryaspor 46,Kırklarelispor 45,Karacabey Belediyespor 45,Fethiyespor 45,Ankaraspor 44,Somaspor 44,Beyoğlu Yeni Çarşı 43", "KOR": "Gyeongju KHNP 47,Daejeon Korail 47,Gimhae FC 46,Mokpo City 46,Pocheon Citizen 45,Yangju Citizen 45,Siheung Citizen 45,Gangneung City 44,Chuncheon FC 44,Pyeongtaek Citizen 43,Yeoju FC 43,Namyangju Citizen 43", "CHN": "Hubei Istar 47,Sichuan Jiuniu 47,Jiangxi Lushan 46,Guangxi Pingguo 46,Taizhou Yuanda 45,Wuxi Wugou 45", "RSA": "Cape Town Spurs 47,Milford FC 47,Pretoria Callies 46,Tshakhuma Tsha Madzivhandila 46,JDR Stars 45,Venda FC 45", "AUT": "Dornbirn 47,SV Horn 47,SV Lafnitz 46,Vorwärts Steyr 46,Stripfing 45,Kufstein 45,Oberwart 45,Gleisdorf 44", "SUI": "Bellinzona 47,Chiasso 47,Wohlen 46,Schaffhausen 46,Biel-Bienne 45,Cham 45,Breitenrain 45,Baden 44", "GRE": "Ionikos 47,Panachaiki 47,Apollon Smyrnis 46,Egaleo 46,Chania 45,Ergotelis 45,Doxa Drama 45,Panegialios 44", "DEN": "Skive IK 47,Thisted FC 47,Holbæk B&I 46,Næstved BK 46,Roskilde 45,Fremad Amager 45,B93 45,Nykøbing FC 44"};
const GEN2={"BOL": "Ciclón 52,Atlético Bermejo 52,Fancesa 51,Deportivo Kenty 50,Universitario de Pando 50,Mamoré 50,Stormers 49,Vaca Díez 48", "VEN": "Hermanos Colombo 52,Titanes FC 52,Yaracuyanos 51,UCV FC 50,Atlético El Vigía 50,Estudiantes de Caracas 50,Ureña SC 49,Llaneros de Guanare 48", "EGY": "Tanta 52,Haras El Hodoud 52,Telecom Egypt 51,Aswan SC 50,Mansoura 50,El Entag El Harby 50,Kahrabaa Ismailia 49,Nasr Cairo 48,Dayrout 48,Qena SC 48", "MAR": "Olympic Safi 52,Chabab Atlas Khénifra 52,Union Touarga 51,Rachad Bernoussi 50,Raja Beni Mellal 50,Mouloudia Oujda 50,Racing Casablanca 49,Union Sidi Kacem 48,Chabab Mohammédia 48,Ittihad Khemisset 48"};
const WR_TXT={BOL:'Rebaixamento: os 2 últimos caem para a Segunda divisão.',VEN:'Rebaixamento: os 2 últimos caem para a Segunda divisão.',EGY:'Rebaixamento: os 3 últimos caem para a Segunda divisão.',MAR:'Rebaixamento: os 3 últimos caem para a Segunda divisão.'};
for(const k in CFG.res2){const n=CFG.res2[k],T=PYR[k];if(!T||T.length!==2)continue;
  T[1].dn=n;T.push({n:'Divisão inferior',c:CFG.resc[k],up:n,res:1});PD[k]=PD[k]||[0];PD[k][2]=POOL[k]}
for(const k in CFG.gen2){const [n,c]=CFG.gen2[k],T=PYR[k];if(!T||T.length!==1)continue;
  T[0].dn=n;T.push({n:'Segunda divisão',c,up:n});PD[k]=[0,GEN2[k]];
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

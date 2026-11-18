/* ===== v45 (7E etapa 3A): pirâmide real de cada país (até 3 divisões; Inglaterra até 5) ===== */
/* c = clubes por grupo, g = grupos, dn = rebaixados, up = promovidos (diretos, playoffs entram na 3B), rd = rodadas */
const PYR={
 ENG:[{n:'Premier League',c:20,dn:3},{n:'Championship',c:24,up:2,po:[3,6],dn:3},{n:'League One',c:24,up:2,po:[3,6],dn:4},{n:'League Two',c:24,up:3,po:[4,7],dn:2},{n:'National League',c:24,up:1,po:[2,7]}],
 ESP:[{n:'La Liga',c:20,dn:3},{n:'La Liga 2',c:22,up:2,po:[3,6],dn:4},{n:'Primera Federación',g:2,c:20,up:2,po:[2,5]}],
 ITA:[{n:'Serie A',c:20,dn:3},{n:'Serie B',c:20,up:2,po:[3,8],dn:4},{n:'Serie C',g:3,c:20,up:3,po:[2,5],pool:1}],
 GER:[{n:'Bundesliga',c:18,dn:2,rpo:1},{n:'2. Bundesliga',c:18,up:2,chal:[3,3],dn:2,rpo:1},{n:'3. Liga',c:20,up:2,chal:[3,3]}],
 FRA:[{n:'Ligue 1',c:18,dn:2,rpo:1},{n:'Ligue 2',c:18,up:2,chal:[3,5],dn:3},{n:'National',c:18,up:3}],
 POR:[{n:'Primeira Liga',c:18,dn:2,rpo:1},{n:'Liga Portugal 2',c:18,up:2,chal:[3,3],dn:2},{n:'Liga 3',c:20,up:2}],
 ARG:[{n:'Liga Profesional',c:30,rd:30,dn:2},{n:'Primera Nacional',g:2,c:18,up:2,dn:2},{n:'Primera B',c:20,up:2}],
 URU:[{n:'Primera División',c:16,dn:2},{n:'Segunda División',c:16,up:2}],
 COL:[{n:'Liga BetPlay',c:20,dn:2},{n:'Primera B',c:20,up:2}],
 CHI:[{n:'Primera División',c:16,dn:2},{n:'Primera B',c:16,up:2}],
 JPN:[{n:'J1 League',c:20,dn:3},{n:'J2 League',c:20,up:3}],
 KOR:[{n:'K League 1',c:12,rd:22,dn:1},{n:'K League 2',c:16,up:1}],
 CHN:[{n:'Super League',c:16,dn:1},{n:'League One',c:16,up:1}],
 AUS:[{n:'A-League Men',c:12,rd:22}],
 EGY:[{n:'Egyptian Premier League',c:20}],
 MAR:[{n:'Botola Pro',c:16}],
 RSA:[{n:'Betway Premiership',c:16,dn:2},{n:'Motsepe Foundation Championship',c:16,up:2}],
 NED:[{n:'Eredivisie',c:18,dn:2},{n:'Eerste Divisie',c:16,up:2}],
 BEL:[{n:'Pro League',c:18,dn:2},{n:'Challenger Pro League',c:10,up:2}],
 TUR:[{n:'Süper Lig',c:18,dn:3},{n:'TFF 1. Lig',c:20,up:3}],
 SCO:[{n:'Scottish Premiership',c:12,rd:22,dn:1},{n:'Scottish Championship',c:10,rd:18,up:1}],
 PAR:[{n:'Primera División',c:12,dn:2},{n:'División Intermedia',c:16,up:2}],
 ECU:[{n:'Liga Pro',c:16,dn:2},{n:'Serie B',c:12,up:2}],
 PER:[{n:'Liga 1',c:18,dn:2},{n:'Liga 2',c:18,up:2}],
 BOL:[{n:'División Profesional',c:16}],
 VEN:[{n:'Liga FUTVE',c:14}],
 KSA:[{n:'Saudi Pro League',c:18,dn:3},{n:'Divisão 1 saudita',c:18,up:3}],
 MEX:[{n:'Liga MX',c:18}],
 USA:[{n:'MLS',c:30,rd:34}]
};
const PROM={ARG:1,URU:1,COL:1,PAR:1}; /* descenso por média de pontos (3 temporadas) */
const PD1X={ARG:'Gimnasia La Plata 66,Instituto 64,Atlético Tucumán 64,Unión de Santa Fe 64,Independiente Rivadavia 64,Sarmiento 63,Barracas Central 63,Deportivo Riestra 60,Aldosivi 60,San Martín de San Juan 58'};
const PD={
ENG:[0,'Leicester City 66,Southampton 65,West Bromwich Albion 64,Middlesbrough 64,Norwich City 63,Sheffield United 63,Watford 62,Coventry City 62,Stoke City 61,Swansea City 60,Blackburn Rovers 60,Bristol City 59,Hull City 59,Millwall 59,Preston North End 58,Cardiff City 58,Queens Park Rangers 57,Derby County 57,Portsmouth 57,Plymouth Argyle 55,Oxford United 57,Luton Town 57,Charlton Athletic 56,Sheffield Wednesday 56',
 'Birmingham City 61,Wrexham 60,Huddersfield Town 56,Stockport County 56,Bolton Wanderers 56,Reading 56,Wycombe Wanderers 55,Barnsley 55,Blackpool 54,Lincoln City 55,Peterborough United 55,Rotherham United 54,Mansfield Town 54,Burton Albion 53,Exeter City 54,Leyton Orient 55,Northampton Town 53,Wigan Athletic 55,Bristol Rovers 52,Stevenage 53,Crawley Town 51,Cambridge United 51,Shrewsbury Town 50,Port Vale 52',
 'Doncaster Rovers 53,Bradford City 53,Notts County 52,Walsall 52,Grimsby Town 51,Salford City 50,Chesterfield 52,Gillingham 50,Crewe Alexandra 50,Swindon Town 50,AFC Wimbledon 50,Milton Keynes Dons 50,Colchester United 49,Fleetwood Town 49,Barrow 48,Harrogate Town 48,Tranmere Rovers 49,Bromley 49,Newport County 48,Carlisle United 48,Accrington Stanley 47,Cheltenham Town 47,Oldham Athletic 46,Morecambe 46',
 'Forest Green Rovers 46,Rochdale 45,Southend United 46,Yeovil Town 45,Halifax Town 44,York City 44,Altrincham 44,Aldershot Town 44,Eastleigh 44,Solihull Moors 44,Boreham Wood 43,Woking 43,Braintree Town 42,Hartlepool United 44,Gateshead 43,Wealdstone 42,Dagenham & Redbridge 43,Sutton United 43,Maidenhead United 41,Tamworth 41,Ebbsfleet United 41,Truro City 40,Scunthorpe United 42,Oxford City 40'],
ESP:[0,'Las Palmas 63,Almería 62,Granada 62,Real Valladolid 62,Leganés 62,Deportivo La Coruña 61,Málaga 60,Racing de Santander 60,Sporting de Gijón 60,Eibar 60,Cádiz 60,Real Zaragoza 58,Huesca 58,Castellón 58,Tenerife 57,Albacete 56,Burgos 56,Mirandés 55,Cartagena 54,Ceuta 54,Andorra 56,Eldense 54',
 ['Real Madrid Castilla 55,Racing de Ferrol 54,Ponferradina 54,Unionistas 50,Cultural Leonesa 52,Zamora 49,Celta Fortuna 52,Deportivo Fabril 50,Barakaldo 49,Sestao River 48,Bilbao Athletic 51,Osasuna Promesas 49,Real Unión 49,Arenteiro 48,Pontevedra 49,Lugo 51,Compostela 48,Real Avilés 47,Gimnástica Segoviana 47,Tarazona 48',
  'Barcelona Atlètic 55,Sabadell 52,Nàstic de Tarragona 53,Hércules 52,Alcoyano 49,Atlético Baleares 50,Ibiza 51,Teruel 48,Antequera 49,Alcorcón 52,Córdoba 55,Murcia 54,San Fernando 48,Betis Deportivo 52,Sevilla Atlético 52,Linares 47,Intercity 49,Recreativo de Huelva 50,Villarreal B 52,Juventud Torremolinos 47']],
ITA:[0,'Palermo 63,Sampdoria 62,Venezia 62,Monza 62,Empoli 61,Spezia 60,Bari 60,Frosinone 60,Catanzaro 58,Modena 57,Cesena 57,Brescia 56,Salernitana 56,Südtirol 55,Reggiana 55,Juve Stabia 54,Cittadella 54,Padova 54,Mantova 53,Carrarese 53',
 ['Vicenza 53,Triestina 50,Lecco 49,Arzignano 48,Trento 49,Renate 49,Pro Vercelli 49,Novara 51,Pro Patria 48,Alcione 47,Virtus Verona 47,Legnago 47,Union Clodiense 47,Giana Erminio 46,Lumezzane 48,AlbinoLeffe 49,FeralpiSalò 51,Inter U23 50,Atalanta U23 51,Juventus Next Gen 51',
  'Arezzo 52,Torres 50,Ternana 52,Perugia 53,Pontedera 49,Gubbio 49,Pianese 48,Pescara 53,Ascoli 52,Campobasso 48,Carpi 49,Vis Pesaro 48,Rimini 48,Lucchese 49,Sambenedettese 48,Virtus Entella 51,Livorno 50,Guidonia 46,Milan Futuro 50,Forlì 46',
  'Avellino 54,Benevento 55,Casertana 49,Cavese 47,Crotone 52,Foggia 51,Giugliano 48,Latina 49,Messina 50,Monopoli 48,Picerno 47,Potenza 47,Sorrento 47,Taranto 49,Trapani 50,Altamura 47,Catania 54,Cosenza 51,Siracusa 46,Cerignola 47']],
GER:[0,'Schalke 04 64,Hertha BSC 63,Hannover 96 62,Fortuna Düsseldorf 62,Paderborn 61,Kaiserslautern 61,Nürnberg 60,Karlsruher SC 60,Darmstadt 98 60,Holstein Kiel 60,VfL Bochum 60,Elversberg 59,Eintracht Braunschweig 58,Greuther Fürth 58,Magdeburg 58,Arminia Bielefeld 57,Preußen Münster 56,Hansa Rostock 56',
 'Dynamo Dresden 58,1860 München 57,Saarbrücken 53,Erzgebirge Aue 54,Waldhof Mannheim 53,Viktoria Köln 52,SV Sandhausen 52,Rot-Weiss Essen 53,Alemannia Aachen 52,Hallescher FC 51,Ingolstadt 54,Verl 50,Wehen Wiesbaden 52,Osnabrück 53,Energie Cottbus 52,Jahn Regensburg 52,Stuttgart II 50,Borussia Dortmund II 50,Hoffenheim II 48,Schweinfurt 47'],
FRA:[0,'Reims 63,Saint-Étienne 62,Montpellier 62,Bordeaux 60,Troyes 58,Guingamp 58,Bastia 58,Clermont 58,Caen 57,Amiens 57,Rodez 55,Pau 54,Laval 54,Grenoble 54,Dunkerque 54,Red Star 54,Annecy 53,Martigues 53',
 'Nancy 54,Sochaux 54,Le Mans 52,Quevilly-Rouen 50,Nîmes 51,Valenciennes 51,Concarneau 49,Orléans 50,Versailles 48,Villefranche 48,Aubagne 47,Châteauroux 50,Paris 13 Atletico 47,Fleury 48,Avranches 47,Bourg-en-Bresse 48,Stade Briochin 47,Cassis 46'],
POR:[0,'Marítimo 58,Paços de Ferreira 58,Vizela 57,Farense 57,Chaves 57,Portimonense 57,Leixões 56,Torreense 56,Académica 56,Académico de Viseu 55,Penafiel 55,Feirense 55,Belenenses 55,Benfica B 55,Porto B 55,Mafra 53,Oliveirense 53,Varzim 52',
 'Sporting Covilhã 52,União de Leiria 52,Sporting Braga B 52,Trofense 51,Lusitânia dos Açores 50,Felgueiras 50,Amarante 50,Vilaverdense 50,Vitória SC B 50,Anadia 50,Fafe 49,Caldas 49,Sanjoanense 48,Tirsense 48,Rebordosa 47,Torres Novas 47,Mirandela 47,União Santarém 47,Lourosa 47,Pevidém 46'],
ARG:[0,['Colón 62,Quilmes 58,Ferro Carril Oeste 57,Chacarita 56,Atlanta 55,Almirante Brown 54,Nueva Chicago 54,All Boys 54,Defensores de Belgrano 54,Temperley 54,Gimnasia y Esgrima de Mendoza 54,Mitre 53,Estudiantes de Río Cuarto 53,Deportivo Madryn 53,Chaco For Ever 52,Gimnasia de Jujuy 52,Guillermo Brown 52,Central Norte 50',
  'Patronato 58,San Martín de Tucumán 57,Racing de Córdoba 55,Atlético Rafaela 54,Agropecuario 53,Alvarado 53,Brown de Adrogué 53,Maipú 52,Tristán Suárez 52,Cipolletti 51,Deportivo Morón 50,Ciudad de Bolívar 50,San Telmo 50,Villa Dálmine 50,Midland 49,Sportivo Italiano 49,Defensores Unidos 48,Deportivo Armenio 48'],
 'Los Andes 47,Argentino de Merlo 47,Deportivo Merlo 47,Estudiantes de Buenos Aires 47,Flandria 47,Excursionistas 46,Sacachispas 46,Talleres de Remedios de Escalada 46,Colegiales 46,Comunicaciones 46,Laferrere 46,Dock Sud 45,Ituzaingó 45,Acassuso 45,Fénix 45,Berazategui 45,Deportivo Español 45,Cañuelas 44,Claypole 44,Argentino de Quilmes 44'],
URU:[0,'Torque 53,Rampla Juniors 53,Miramar Misiones 52,Villa Española 52,Deportivo Maldonado 52,Rentistas 52,Bella Vista 51,Atenas 51,Central Español 50,Sud América 50,Uruguay Montevideo 50,Tacuarembó 50,Villa Teresa 49,Canadian 49,Artigas 48,Salto 48'],
COL:[0,'Deportivo Pereira 58,Patriotas 55,Unión Magdalena 55,Atlético Huila 54,Cortuluá 54,Real Cartagena 53,Barranquilla FC 53,Atlético FC 53,Real Santander 53,Tigres FC 52,Internacional de Palmira 52,Orsomarso 52,Quindío 52,Bogotá FC 52,Valledupar 51,Boca Juniors de Cali 51,Universitario Popayán 51,Leones 50,Real Soacha 50,Deportivo Rionegro 50'],
CHI:[0,'Santiago Wanderers 56,Magallanes 55,Universidad de Concepción 55,Deportes Temuco 54,Deportes Copiapó 54,Deportes Antofagasta 54,San Luis de Quillota 53,Rangers de Talca 53,Santiago Morning 53,Deportes Limache 53,Deportes Recoleta 52,Deportes Puerto Montt 52,Deportes Concepción 52,Unión San Felipe 52,Barnechea 50,San Marcos de Arica 50'],
JPN:[0,'Yokohama FC 55,Shonan Bellmare 56,Albirex Niigata 55,Júbilo Iwata 55,Hokkaido Consadole Sapporo 56,Vegalta Sendai 55,Sagan Tosu 54,Tokushima Vortis 53,Ventforet Kofu 53,RB Omiya Ardija 53,Montedio Yamagata 52,Oita Trinita 52,Blaublitz Akita 51,Fujieda MYFC 51,FC Imabari 50,Iwaki FC 50,Kataller Toyama 50,Tochigi City 49,Vanraure Hachinohe 48,Tegevajaro Miyazaki 48'],
KOR:[0,'Suwon Samsung Bluewings 56,Suwon FC 55,Daegu FC 54,Seongnam FC 53,Busan IPark 53,Seoul E-Land 52,Jeonnam Dragons 52,Gyeongnam FC 51,Chungnam Asan 51,Chungbuk Cheongju 50,Gimpo FC 50,Ansan Greeners 49,Cheonan City 49,Gimhae FC 2008 49,Paju Frontier 48,Hwaseong FC 48'],
CHN:[0,'Changchun Yatai 52,Guangdong GZ-Power 51,Meizhou Hakka 51,Dalian K\'un City 50,Nanjing City 50,Nantong Zhiyun 50,Ningbo 49,Shenzhen Juniors 49,Shijiazhuang Gongfu 49,Yanbian Longding 49,Foshan Nanshi 48,Guangxi Hengchen 48,Shaanxi Union 48,Jiangxi Dingnan United 47,Suzhou Dongwu 47,Wuxi Wugo 47'],
RSA:[0,'Cape Town City 54,Magesi 52,Orbit College 50,Casric Stars 50,Hungry Lions 49,Highbury 49,Upington City 48,Lerumo Lions 48,Venda 48,The Bees 47,University of Pretoria 50,Leicesterford City 47,Gomora United 47,Midlands Wanderers 47,Black Leopards 48,Baroka 49'],
NED:[0,'NAC Breda 57,Heracles Almelo 57,Volendam 56,Vitesse 56,De Graafschap 55,RKC Waalwijk 55,Roda JC Kerkrade 54,Almere City 53,Emmen 52,VVV-Venlo 52,Den Bosch 51,Dordrecht 51,Eindhoven 50,MVV Maastricht 50,TOP Oss 49,Helmond Sport 49'],
BEL:[0,'Dender 58,Eupen 55,Beerschot VA 55,Sporting Hasselt 54,Lokeren 53,Seraing 52,RFC Liège 52,Lierse SK 52,Patro Eisden 51,Francs Borains 50'],
TUR:[0,'Kayserispor 60,Antalyaspor 60,Fatih Karagümrük 60,Bursaspor 58,Sivasspor 57,Bodrumspor 55,Keçiörengücü 54,Pendikspor 54,Esenler Erokspor 53,İstanbulspor 53,Iğdır 52,Batman Petrolspor 52,Muğlaspor 52,Bandırmaspor 52,Manisa 52,Sarıyer 52,Ümraniyespor 52,Boluspor 52,Mardin 1969 51,Vanspor 50'],
SCO:[0,'Dunfermline Athletic 55,Partick Thistle 54,Livingston 53,Inverness Caledonian Thistle 52,Raith Rovers 52,Ayr United 50,Arbroath 50,Queen\'s Park 50,Greenock Morton 50,Stenhousemuir 47'],
PAR:[0,'Sol de América 52,Tacuary 51,12 de Junio 51,Resistencia 49,3 de Noviembre 50,General Caballero JLM 50,Guaireña 50,Deportivo Capiatá 50,Deportivo Santaní 49,Independiente CG 49,Sportivo Carapeguá 48,Encarnación 48,Fernando de la Mora 48,Paraguarí 47,Tembetary 47,Benjamín Aceval 47'],
ECU:[0,'El Nacional 53,Independiente Juniors 52,9 de Octubre 50,Gualaceo 50,Cumbayá 49,San Antonio 48,Atlético Vinotinto 48,Cuenca Juniors 48,Liga de Portoviejo 48,Vargas Torres 47,22 de Julio 47,Mineros de Bolívar 47'],
PER:[0,'Universidad César Vallejo 53,Carlos Mannucci 52,Universidad San Martín 51,Deportivo Binacional 51,Academia Cantolao 50,Unión Comercio 50,Ayacucho FC 50,ADA de Jaén 49,Pirata FC 49,Alianza Universidad 49,Bentín Tacna Heroica 48,Comerciantes FC 48,Deportivo Llacuabamba 48,FC San Marcos 47,Santos FC Nazca 47,Unión Minas 46,Estudiantil CNI 46,Sport Huancayo II 46'],
KSA:[0,'Al-Wehda 58,Al-Raed 58,Abha 57,Al-Faisaly 57,Al-Orobah 56,Al-Tai 55,Jeddah Club 55,Al-Batin 54,Al-Adalah 54,Al-Akhdoud 54,Al-Arabi 54,Al-Zulfi 53,Al-Diriyah 53,Al-Jabalain 52,Al-Qaisumah 52,Al-Bukayriyah 52,Al-Anwar 52,Al-Jandal 51']
};
const TBAND=[[56,93],[48,70],[40,60],[34,54],[30,50]],TDW=[.9,.4,.25,.15,.1],TPRZ=[1,.3,.12,.06,.03];
function pList(s){return s.split(',').map(x=>{const i=x.lastIndexOf(' ');return {n:x.slice(0,i).trim(),b:+x.slice(i+1)}})}
function pdivs(k){const T=PYR[k];if(!T)return [];const out=[];let d=4;T.forEach((t,i)=>{const g=t.g||1;for(let j=0;j<g;j++)out.push({d:d++,t:i+1,g,j,name:t.n+(g>1?' · Grupo '+String.fromCharCode(65+j):''),tn:t.n,c:t.c,rd:t.rd||2*(t.c-1),up:t.up||0,dn:t.dn||0})});return out}
const pdiv=d=>G&&G.pyr?G.pyr.dv.find(x=>x.d===d):null;
const tierOf=d=>{const x=pdiv(d);return x?x.t:1};
function pSig(n){return n.replace(/^(Al-|FC |CF |Real |Club |Atlético |Deportivo |Deportes |Sporting |Racing |Santiago |Universidad de |Unión |AFC |St\. )/i,'').replace(/[^A-Za-zÀ-ÿ]/g,'').slice(0,3).toUpperCase()||'XXX'}
function prizeMul(d){if(d<4)return [1,.25,.1,.04][d]||1;return TPRZ[tierOf(d)-1]||.03}
function lowerName(d){if(G.abroad&&G.pyr&&d>=4){const x=pdiv(d),T=PYR[G.pyr.k];return T[x.t]?T[x.t].n:'divisão inferior'}return DIVN[d+1]}
function upperName(d){if(G.abroad&&G.pyr&&d>=4){const x=pdiv(d),T=PYR[G.pyr.k];return T[x.t-2]?T[x.t-2].n:'divisão superior'}return DIVN[d-1]}
function mkStub(id){return {id,name:'–',sig:'---',stub:true,div:99,rep:0,caixa:0,squad:[],c1:'#333333',c2:'#333333',c3:'#333333',pat:'solid',color:'#333333',tv:0,spBase:0,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,CH:0,trad:0,humor:50,debt:0,cap:1000,tro:[0,0,0,0],retro:[],youth:[],coach:{name:'-',pts:0,V:0,E:0,D:0,titles:0},formation:'4-4-2',style:STYLES[0],phil:PHN[0],s20:{P:0,GP:0,GC:0,J:0},ct:0,cp:0,bq:0}}
function lcOf(x){const p=WPAL[wHash(x.n)%WPAL.length],w=WCOL[x.n];return {n:x.n,r:x.b,b:x.b,c1:w?w[0]:p[0],c2:w?w[1]:p[1],c3:w?w[2]:p[0],pat:w?w[3]:p[2],sg:pSig(x.n)}}
function stubOf(x,d){const l=lcOf(x);return {k:G.pyr.kid++,n:l.n,sig:l.sg,c1:l.c1,c2:l.c2,c3:l.c3,pat:l.pat,b:x.b,r:x.b,div:d,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,trad:Math.round(clamp((x.b-52)*1.7,10,96)),f:1,pav:[]}}
/* monta a pirâmide do país: 1ª (e extras) e 2ª viram clubes completos, o resto fica "leve" */
function pyrInit(k,tmpl,LF){
  G.pyr={k,dv:pdivs(k),L:[],free:[],kid:1};
  PYR[k].forEach((t,i)=>{const bd=TBAND[Math.min(i,4)];pdivs(k).filter(x=>x.t===i+1).forEach(x=>{DIVN[x.d]=x.name;RBAND[x.d]=bd.slice();DW36[x.d]=TDW[Math.min(i,4)]})});
  if(PD1X[k])for(const x of pList(PD1X[k]))mkNat42(lcOf(x),G.clubs.length,k,4,tmpl,LF,false);
  for(const x of G.pyr.dv.filter(v=>v.t>1)){const src=PD[k]&&PD[k][x.t-1];const str=Array.isArray(src)?src[x.j]:src;if(!str)continue;for(const e of pList(str).slice(0,x.c))G.pyr.L.push(stubOf(e,x.d))}
  pyrSync();
}
const pTmpl=()=>G.clubs.find(c=>c.div===0&&c.id!==G.user)||G.clubs[1];
/* mantém completos só os clubes da divisão do técnico e das vizinhas (economiza save) */
function pyrSync(){
  const P=G.pyr;if(!P)return;const k=P.k,u=G.clubs[G.user];const tU=u&&u.div>=4?tierOf(u.div):1,LF=LFAC[k]||.8,tm=pTmpl();
  const want=t=>t===tU||t===tU-1||(tU===1&&t===2);
  for(const c of G.clubs.slice(BRN)){if(c.stub||c.id===G.user||c.div<4)continue;if(!want(tierOf(c.div)))liteify(c)}
  for(let i=P.L.length-1;i>=0;i--){const s=P.L[i];if(want(tierOf(s.div))){P.L.splice(i,1);materialize(s,tm,LF)}}
  G.free=(G.free||[]).filter(id=>G.players[id]);G.offers=(G.offers||[]).filter(o=>!o.pid||G.players[o.pid]);
}
function liteify(c){
  const P=G.pyr;P.L.push({k:P.kid++,n:c.name,sig:c.sig,c1:c.c1,c2:c.c2,c3:c.c3,pat:c.pat,b:c.trad?52+c.trad/1.7:c.rep,r:c.rep,div:c.div,P:c.P,J:c.J,V:c.V,E:c.E,D:c.D,GP:c.GP,GC:c.GC,trad:c.trad,f:1,pav:c.pav||[],lid:c.lid});
  for(const id of c.squad)delete G.players[id];
  for(const p of Object.values(G.players))if(p.loan&&p.loan.from===c.id)p.loan=null;
  G.clubs[c.id]=mkStub(c.id);P.free.push(c.id);
}
function materialize(s,tm,LF){
  const P=G.pyr,id=P.free.length?P.free.pop():G.clubs.length;
  const c=mkNat42({n:s.n,r:s.r,b:s.b,sg:s.sig,c1:s.c1,c2:s.c2,c3:s.c3,pat:s.pat,id:s.lid,P:s.P,J:s.J,V:s.V,E:s.E,D:s.D,GP:s.GP,GC:s.GC},id,P.k,s.div,tm,LF,s.J>0);
  c.trad=s.trad;c.pav=s.pav||[];c.lid=s.lid==null?null:s.lid;return c;
}
const cmpRow=(a,b)=>b.P-a.P||b.V-a.V||(b.GP-b.GC)-(a.GP-a.GC)||b.GP-a.GP||(a.id||a.k)-(b.id||b.k);
const allRows=d=>[...G.clubs.filter(c=>c.div===d&&!c.stub),...(G.pyr?G.pyr.L.filter(s=>s.div===d):[])].sort(cmpRow);
const avgKey=r=>{const h=r.pav||[];return (h.reduce((s,v)=>s+v,0)+(r.J?(r.pp?(r.pp+r.P)/(2*r.J):r.P/r.J):0))/(h.length+1)};
/* fixtures das divisões completas */
function pyrFx(){const P=G.pyr;if(!P)return;for(const x of P.dv){const ids=G.clubs.filter(c=>c.div===x.d&&!c.stub).map(c=>c.id);if(ids.length>=4)G.dfx[x.d]=genFixtures(ids).slice(0,x.rd)}}
/* rodada das divisões leves */
function liteRounds(rd){
  const P=G.pyr;if(!P||!G.abroad)return;
  for(const x of P.dv){if(rd>=x.rd)continue;const L=P.L.filter(s=>s.div===x.d);if(L.length<4)continue;
    for(const [a,b] of wRfx(L.length,rd)){const A=L[a],B=L[b],g=wMatch({r:A.r,f:A.f},{r:B.r,f:B.f});
      A.J++;B.J++;A.GP+=g[0];A.GC+=g[1];B.GP+=g[1];B.GC+=g[0];
      if(g[0]>g[1]){A.V++;A.P+=3;B.D++}else if(g[0]<g[1]){B.V++;B.P+=3;A.D++}else{A.E++;B.E++;A.P++;B.P++}}}
}
/* termina as rodadas que faltam e decide playoffs + quem sobe/desce (plano do fim de temporada) */
function pyrFinish(){
  const P=G.pyr;if(!P||!G.abroad)return;
  if(P.planS===G.season)return;
  const nr=NR();
  for(const x of P.dv){for(let r=Math.max(nr,0);r<x.rd;r++){
    const fx=G.dfx[x.d];if(fx){for(const [h,a] of (fx[r]||[]))simFast(C(h),C(a))}else liteRounds(r)}}
  P.plan=pyrPlan();P.planS=G.season;
}
const rKey=r=>r.name?'c'+r.id:'s'+r.k,rName=r=>r.name||r.n,rRat=r=>r.rep!=null?r.rep:r.r;
/* mata-mata de 2 jogos pela força (campeão da fase decidido por Poisson + moral de mando) */
function tie(A,B,seedAdv){
  const g=(h,a)=>wMatch({r:rRat(h),f:1},{r:rRat(a),f:1});
  const x=g(A,B),y=g(B,A);let a=x[0]+y[1],b=x[1]+y[0];
  if(a===b){const pa=rRat(A)+rnd(-4,4)+(seedAdv===A?1.5:0),pb=rRat(B)+rnd(-4,4)+(seedAdv===B?1.5:0);return pa>=pb?[A,B,a,b]:[B,A,b,a]}
  return a>b?[A,B,a,b]:[B,A,b,a];
}
function bracket(list,log){
  let cur=list.slice();
  while(cur.length>1){const nx=[];const n=cur.length;
    for(let i=0;i<Math.floor(n/2);i++){const w=tie(cur[i],cur[n-1-i],cur[i]);nx.push(w[0]);log.push(rName(w[0])+' '+w[2]+'–'+w[3]+' '+rName(w[1]))}
    if(n%2)nx.push(cur[Math.floor(n/2)]);cur=nx.sort((a,b)=>list.indexOf(a)-list.indexOf(b))}
  return cur[0];
}
function pyrPlan(){
  const P=G.pyr,k=P.k,T=PYR[k],plan=new Map(),log=[];
  const relRank=(t,d)=>{const rows=allRows(d);return (t===1&&(PROM[k]||(WRULES[k]||{}).fmt==='ac'))?rows.slice().sort((a,b)=>avgKey(b)-avgKey(a)):rows};
  const put=(r,d)=>plan.set(rKey(r),[r,d]);
  for(let t=1;t<T.length;t++){
    const up=T[t-1],lo=T[t],n=up.dn||0;if(!n)continue;
    const U=P.dv.filter(x=>x.t===t),L=P.dv.filter(x=>x.t===t+1);
    const rel=[],relBy={};
    U.forEach(u=>{const share=Math.round(n/U.length),rows=relRank(t,u.d),rs=rows.slice(rows.length-share);rs.forEach(r=>rel.push(r));relBy[u.d]=rs.length});
    const pro=[],dirN=Math.floor((lo.up||0)/L.length),inPo=new Set();
    L.forEach(l=>allRows(l.d).slice(0,dirN).forEach(r=>pro.push(r)));
    if(pro.length<(lo.up||0)){const cand=L.flatMap(l=>allRows(l.d).slice(dirN,dirN+1)).sort((a,b)=>(b.J?b.P/b.J:0)-(a.J?a.P/a.J:0));cand.slice(0,(lo.up||0)-pro.length).forEach(r=>{pro.push(r);inPo.add(r)})}
    /* playoff de acesso (vencedor sobe) */
    if(lo.po){
      const lg=[];
      if(lo.pool){const pl=L.flatMap(l=>allRows(l.d).slice(lo.po[0]-1,lo.po[1]).filter(r=>!pro.includes(r))).sort((a,b)=>(b.J?b.P/b.J:0)-(a.J?a.P/a.J:0)).slice(0,4);if(pl.length>1){const w=bracket(pl,lg);pro.push(w);log.push(lo.n+' · playoff de acesso: '+lg.join(' · '))}}
      else L.forEach(l=>{const pl=allRows(l.d).slice(lo.po[0]-1,lo.po[1]).filter(r=>!pro.includes(r));if(pl.length>1){const lg2=[];const w=bracket(pl,lg2);pro.push(w);log.push((L.length>1?l.name:lo.n)+' · playoff de acesso: '+lg2.join(' · '))}});
    }
    const toL=L.flatMap(l=>Array(pro.filter(r=>r.div===l.d).length).fill(l.d)),toU=U.flatMap(u=>Array(relBy[u.d]).fill(u.d));
    shuffle(rel).forEach((r,i)=>put(r,toL[i]!=null?toL[i]:L[0].d));
    shuffle(pro).forEach((r,i)=>put(r,toU[i]!=null?toU[i]:U[0].d));
    /* repescagem: 16º da elite contra o 3º/vencedor do playoff da divisão de baixo */
    if(up.rpo&&lo.chal&&U.length===1&&L.length===1){
      const ur=relRank(t,U[0].d),def=ur[ur.length-n-1],lr=allRows(L[0].d).filter(r=>!pro.includes(r));
      const lg=[];let ch;const pl=lr.slice(0,Math.max(1,lo.chal[1]-lo.chal[0]+1));
      if(def&&pl.length){ch=pl.length>1?bracket(pl,lg):pl[0];
        const w=tie(def,ch,def);log.push('Repescagem '+up.n+' x '+lo.n+': '+rName(w[0])+' '+w[2]+'–'+w[3]+' '+rName(w[1]));
        if(w[0]===ch){put(def,L[0].d);put(ch,U[0].d)}}
    }
  }
  P.log=log;return plan;
}
const _pr44=promoRel;promoRel=function(){
  _pr44();
  try{
    const P=G.pyr;if(!G.abroad||!P)return;
    pyrFinish();
    const recs=[...G.clubs.filter(c=>c.div>=4&&c.div<99&&!c.stub),...P.L];
    G.moves=G.moves||[];
    for(const [r,nd] of (P.plan||new Map()).values()){
      const old=r.div,isUp=tierOf(nd)<tierOf(old);if(nd===old)continue;r.div=nd;
      if(!r.name)continue;
      r.divHist=r.divHist||[];r.divHist.push({s:G.season,to:nd});
      r.tv=+(r.tv*(isUp?1.5:.65)).toFixed(1);r.spBase=+(r.spBase*(isUp?1.5:.65)).toFixed(1);r.humor=clamp(r.humor+(isUp?15:-15),5,100);
      if(isUp&&r.id!==G.user){for(let i=0;i<2;i++)r.squad.push(mkPlayer(pick(['ZAG','LAT','VOL','MEI','PNT','ATA']),r.rep+3,ri(23,29),r.id).id);autoPick(r)}
      G.moves.push({id:r.id,name:r.name,from:old,to:nd});
      if(!isUp&&(r.trad>=55||r.id===G.user))paperLine(r.name.toUpperCase()+' É REBAIXADO','Queda para a '+DIVN[nd]+' abala o clube.');
      else if(isUp&&(r.trad>=55||r.id===G.user))paperLine(r.name+' conquista o acesso','Sobe para a '+DIVN[nd]+'.');
    }
    for(const r of recs){const ppg=r.J?r.P/r.J:0;r.pav=(r.pav||[]).concat(+ppg.toFixed(3)).slice(-2)}
    for(const s of P.L){s.f=clamp(1+gauss()*.05,.92,1.08)}
    for(const l of (P.log||[]))addNews(l);
    P.plan=null;pyrSync();
    for(const s of P.L){s.P=s.J=s.V=s.E=s.D=s.GP=s.GC=0}
  }catch(e){console.error('pr44 '+e.message)}
};
/* o técnico sobe/cai conforme o plano (inclui média de pontos e playoffs) */
function relPromo(d,pos){
  if(G.abroad&&d>=4&&G.pyr){const x=pdiv(d);if(x){
    try{pyrFinish()}catch(e){}
    const pl=G.pyr.plan&&G.pyr.plan.get('c'+G.user);
    if(pl){const nd=pl[1];return {rel:tierOf(nd)>x.t,promo:tierOf(nd)<x.t}}
    return {rel:false,promo:false}}}
  return {rel:d<3&&pos>=17,promo:d>0&&pos<=4};
}
/* nada de copas/continentais de fora criando clubes id>=100 enquanto o técnico está no exterior */
const _ci44=contInit;contInit=function(){if(G&&G.abroad)return;return _ci44.apply(this,arguments)};
const _fr44=finishRound;finishRound=function(){const rd=G.round;const r=_fr44.apply(this,arguments);try{liteRounds(rd)}catch(e){console.error('lr44 '+e.message)}return r};
const _es44=endSeason;endSeason=function(){try{pyrFinish()}catch(e){console.error('pf44 '+e.message)}const r=_es44.apply(this,arguments);try{const c=userClub(),ls=(G.pyr&&G.pyr.log||[]).filter(l=>l.includes(c.name));if(ls.length&&G.summary)G.summary.txt+=' Playoffs: '+ls.join(' | ')+'.'}catch(e){}return r};

/* Tabelas: seletor de divisões do país + zonas de acesso e rebaixamento */
let _vd44=null;
const _tr44=tableRows;tableRows=function(div){return _tr44(div===undefined&&_vd44!=null?_vd44:div)};
const _vl44=vLiga;vLiga=function(){
  const ab=G.abroad&&G.pyr&&userDiv()>=4;
  if(!ab)return _vl44();
  const P=G.pyr,k=P.k,vd=S.abd&&pdiv(S.abd)?S.abd:userDiv(),x=pdiv(vd);
  const lite=!G.clubs.some(c=>c.div===vd&&!c.stub);
  _vd44=vd;let h;try{h=_vl44()}finally{_vd44=null}
  if(lite){/* divisão leve: monta a tabela a partir dos dados leves */
    const rows=allRows(vd);
    const tb=S.lig==='tabela'?`<div class="tbl"><div class="tr hd"><span>#</span><span class="tc">Clube</span><span>J</span><span>V</span><span>SG</span><span>P</span></div>${rows.map((c,i)=>`<div class="tr"><span>${i+1}</span><span class="tc">${crest(c,20)}${esc(c.n)}</span><span>${c.J}</span><span>${c.V}</span><span>${c.GP-c.GC}</span><b>${c.P}</b></div>`).join('')}</div><p class="foot"></p>`:'<p class="news">Divisão leve: só a classificação é detalhada. Os jogos dela são simulados em segundo plano.</p>';
    h=h.replace(/(<div class="seg sm scroll">[\s\S]*?<\/div>)[\s\S]*$/,'$1')+tb+'</div>';
  }
  if(vd!==userDiv()){const a=h.indexOf('<div class="card res40"'),z=h.indexOf('<div class="tbl');if(a>=0&&z>a)h=h.slice(0,a)+h.slice(z)}
  const tr=PYR[k][x.t-1],dn=tr.dn?Math.round(tr.dn/x.g):0,up=tr.up?Math.floor(tr.up/x.g):0;
  if(S.lig==='tabela'){
    let i=0;const n=allRows(vd).length;
    h=h.replace(/<div class="tr ([^"]*)">/g,(m,cl)=>{if(/\bhd\b/.test(cl))return m;const z=i<up?'g4':(dn&&i>=n-dn?'z4':'');i++;return `<div class="tr ${cl.replace(/\b(g4|z4)\b/g,'').trim()} ${z}">`});
    const bits=[];if(up)bits.push(`Verde: sobe para a ${upperName(vd)} (top ${up})`);if(tr.po&&!tr.pool)bits.push(`Posições ${tr.po[0]}–${tr.po[1]}: playoff de acesso`);if(dn)bits.push(`Vermelho: cai para a ${lowerName(vd)} (últimos ${dn})`);
    h=h.replace(/<p class="foot">[\s\S]*?<\/p>/,`<p class="foot">${bits.join(' · ')||'Liga fechada: sem acesso nem rebaixamento.'}</p>`);
  }
  const tabs=P.dv.length>1?`<div class="seg sm scroll">${P.dv.map(v=>`<button class="${vd===v.d?'on':''}" data-a="abd" data-v="${v.d}">${esc(v.t>1||v.g>1?v.name:'1ª divisão')}</button>`).join('')}</div>`:'';
  return h.replace(/(<div class="seg sm scroll">)/,tabs+'$1');
};
Object.assign(A,{abd(d){S.abd=+d.v;render()}});
/* economia de save: histórico de carreira só com temporadas jogadas e limitado às 6 últimas */
const _ns45=newSeason;newSeason=function(){const r=_ns45.apply(this,arguments);try{for(const p of Object.values(G.players)){if(p.car&&p.car.length)p.car=p.car.filter(x=>x.J>0||p.club===G.user).slice(-6)}}catch(e){console.error('car45 '+e.message)}return r};

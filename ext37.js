/* ext37: Fase 7A — Mundo: 10 países com clubes reais, campeonatos simulados junto, tela Mundo, mercado internacional, Champions */
const WLD=[
{k:'ENG',n:'Inglaterra',f:'🏴',lg:'Premier League',cl:[['Manchester City',91],['Arsenal',90],['Liverpool',90],['Chelsea',86],['Manchester United',85],['Tottenham',84],['Newcastle',83],['Aston Villa',82],['Brighton',78],['West Ham',77],['Crystal Palace',76],['Fulham',75],['Brentford',75],['Bournemouth',74],['Nottingham Forest',74],['Wolverhampton',73],['Everton',73],['Leeds United',72],['Sunderland',70],['Burnley',68]]},
{k:'ESP',n:'Espanha',f:'🇪🇸',lg:'La Liga',cl:[['Real Madrid',92],['Barcelona',91],['Atlético de Madrid',87],['Athletic Bilbao',82],['Real Sociedad',81],['Villarreal',80],['Real Betis',80],['Sevilla',77],['Valencia',76],['Girona',75],['Celta de Vigo',74],['Osasuna',73],['Getafe',72],['Mallorca',72],['Rayo Vallecano',72],['Espanyol',70],['Alavés',69],['Levante',67],['Elche',66],['Real Oviedo',65]]},
{k:'ITA',n:'Itália',f:'🇮🇹',lg:'Serie A',cl:[['Inter de Milão',88],['Napoli',87],['Juventus',87],['Milan',86],['Atalanta',85],['Roma',83],['Lazio',82],['Fiorentina',79],['Bologna',79],['Torino',74],['Genoa',72],['Udinese',72],['Como',72],['Sassuolo',70],['Cagliari',69],['Parma',69],['Lecce',68],['Hellas Verona',67],['Cremonese',65],['Pisa',65]]},
{k:'GER',n:'Alemanha',f:'🇩🇪',lg:'Bundesliga',cl:[['Bayern de Munique',91],['Bayer Leverkusen',87],['Borussia Dortmund',86],['RB Leipzig',85],['Eintracht Frankfurt',80],['Stuttgart',80],['Freiburg',76],['Hoffenheim',75],['Wolfsburg',74],['Borussia Mönchengladbach',74],['Werder Bremen',73],['Mainz 05',72],['Union Berlin',72],['Augsburg',70],['Köln',68],['St. Pauli',68],['Hamburgo',68],['Heidenheim',67]]},
{k:'FRA',n:'França',f:'🇫🇷',lg:'Ligue 1',cl:[['Paris Saint-Germain',90],['Monaco',80],['Olympique de Marselha',80],['Lille',79],['Lyon',79],['Lens',77],['Nice',76],['Rennes',76],['Strasbourg',72],['Toulouse',70],['Brest',70],['Nantes',68],['Auxerre',66],['Lorient',65],['Angers',64],['Le Havre',64],['Paris FC',64],['Metz',63]]},
{k:'POR',n:'Portugal',f:'🇵🇹',lg:'Primeira Liga',cl:[['Sporting CP',84],['Benfica',83],['Porto',83],['Braga',78],['Vitória de Guimarães',72],['Famalicão',68],['Gil Vicente',67],['Estoril',67],['Moreirense',64],['Casa Pia',64],['Rio Ave',64],['Santa Clara',64],['Arouca',63],['Boavista',63],['Nacional da Madeira',62],['Estrela da Amadora',61],['Alverca',59],['Tondela',59]]},
{k:'ARG',n:'Argentina',f:'🇦🇷',lg:'Liga Profesional',cl:[['River Plate',79],['Boca Juniors',78],['Racing',74],['Estudiantes',72],['Independiente',72],['Vélez Sarsfield',71],['San Lorenzo',70],['Rosario Central',70],['Talleres',69],['Lanús',69],['Argentinos Juniors',68],['Newell\'s Old Boys',67],['Belgrano',67],['Defensa y Justicia',66],['Huracán',66],['Banfield',65],['Godoy Cruz',65],['Tigre',64],['Platense',63],['Central Córdoba',62]]},
{k:'URU',n:'Uruguai',f:'🇺🇾',lg:'Primera División',cl:[['Peñarol',73],['Nacional (URU)',72],['Defensor Sporting',64],['Liverpool-URU',63],['Montevideo Wanderers',62],['Danubio',62],['River Plate-URU',61],['Cerro Largo',59],['Boston River',58],['Racing-URU',58],['Plaza Colonia',57],['Fénix',56],['Cerro',56],['Albion',55],['Juventud',54],['Progreso',54]]},
{k:'COL',n:'Colômbia',f:'🇨🇴',lg:'Liga BetPlay',cl:[['Atlético Nacional',70],['Junior',68],['Millonarios',67],['América de Cali',66],['Independiente Medellín',66],['Deportes Tolima',66],['Santa Fe',65],['Deportivo Cali',64],['Once Caldas',62],['Atlético Bucaramanga',62],['Águilas Doradas',60],['La Equidad',57],['Boyacá Chicó',57],['Deportivo Pasto',58],['Alianza FC',56],['Envigado',56],['Fortaleza CEIF',55],['Jaguares',54],['Llaneros',54],['Cúcuta Deportivo',54]]},
{k:'CHI',n:'Chile',f:'🇨🇱',lg:'Primera División',cl:[['Colo-Colo',70],['Universidad Católica',68],['Universidad de Chile',68],['Huachipato',62],['Palestino',62],['O\'Higgins',62],['Unión Española',61],['Coquimbo Unido',61],['Cobreloa',60],['Cobresal',60],['Everton de Viña',60],['Audax Italiano',59],['Ñublense',59],['Deportes Iquique',56],['Curicó Unido',56],['Deportes La Serena',56]]},
{k:'MEX',n:'México',f:'🇲🇽',lg:'Liga MX',cl:[['Club América',76],['Tigres UANL',76],['Monterrey',76],['Cruz Azul',75],['Guadalajara',74],['Toluca',74],['Pachuca',72],['Pumas UNAM',70],['León',70],['Santos Laguna',68],['Atlas',66],['Necaxa',65],['Tijuana',64],['Querétaro',62],['Atlético San Luis',62],['FC Juárez',61],['Mazatlán',60],['Puebla',60]]},
{k:'USA',n:'Estados Unidos',f:'🇺🇸',lg:'MLS',cl:[['Inter Miami',74],['LAFC',72],['LA Galaxy',70],['Seattle Sounders',70],['Columbus Crew',69],['Philadelphia Union',69],['FC Cincinnati',69],['New York City FC',68],['Atlanta United',67],['New York Red Bulls',66],['Orlando City',66],['Portland Timbers',66],['Nashville SC',66],['Real Salt Lake',65],['Vancouver Whitecaps',65],['San Diego FC',65],['Austin FC',64],['Minnesota United',64],['New England Revolution',64],['Sporting Kansas City',63],['Houston Dynamo',63],['FC Dallas',63],['Colorado Rapids',63],['St. Louis City',63],['Toronto FC',62],['Charlotte FC',62],['Chicago Fire',62],['CF Montréal',61],['D.C. United',61],['San Jose Earthquakes',60]]},
{k:'KSA',n:'Arábia Saudita',f:'🇸🇦',lg:'Saudi Pro League',cl:[['Al-Hilal',79],['Al-Nassr',77],['Al-Ittihad',77],['Al-Ahli',76],['Al-Qadsiah',70],['Al-Shabab',68],['Al-Ettifaq',68],['Al-Taawoun',65],['Al-Fateh',63],['Al-Fayha',63],['Al-Khaleej',62],['Damac',62],['Al-Riyadh',60],['Al-Okhdood',60],['Al-Kholood',59],['NEOM SC',59],['Al-Najma',58],['Al-Hazem',57]]},
{k:'PAR',n:'Paraguai',f:'🇵🇾',lg:'Primera División',cl:[['Cerro Porteño',69],['Olimpia',69],['Libertad',68],['Guaraní',64],['Nacional-PAR',63],['Sportivo Trinidense',58],['2 de Mayo',56],['Recoleta',56],['Sportivo Ameliano',56],['Sportivo Luqueño',56],['Rubio Ñu',54],['San Lorenzo-PAR',53]]},
{k:'ECU',n:'Equador',f:'🇪🇨',lg:'Liga Pro',cl:[['LDU Quito',67],['Independiente del Valle',66],['Barcelona SC',65],['Emelec',62],['Macará',59],['Universidad Católica-ECU',59],['Libertad FC',57],['Técnico Universitario',57],['Delfín',57],['Deportivo Cuenca',56],['Orense',56],['Aucas',55],['Mushuc Runa',54],['Manta',54],['Guayaquil City',53],['Leones FC',52]]},
{k:'PER',n:'Peru',f:'🇵🇪',lg:'Liga 1',cl:[['Alianza Lima',66],['Universitario',66],['Sporting Cristal',64],['Melgar',62],['Cusco FC',58],['Cienciano',58],['Deportivo Garcilaso',58],['Alianza Atlético',55],['Sport Boys',54],['Atlético Grau',54],['Los Chankas',54],['Sport Huancayo',53],['Juan Pablo II College',52],['UTC',52],['Comerciantes Unidos',51],['ADT',51],['Cajamarca',50],['Deportivo Moquegua',50]]},
{k:'BOL',n:'Bolívia',f:'🇧🇴',lg:'División Profesional',cl:[['Bolívar',62],['The Strongest',62],['Always Ready',60],['Oriente Petrolero',55],['Real Potosí',54],['Aurora',54],['Blooming',54],['Guabirá',53],['Nacional Potosí',52],['Independiente Petrolero',52],['San Antonio Bulo Bulo',50],['Totora Real Oruro',49],['ABB',48],['Universitario de Vinto',48],['Real Tomayapo',47],['Gualberto Villarroel',47]]},
{k:'VEN',n:'Venezuela',f:'🇻🇪',lg:'Liga FUTVE',cl:[['Deportivo Táchira',60],['Carabobo',60],['Caracas',60],['Metropolitanos',58],['Deportivo La Guaira',57],['Academia Puerto Cabello',56],['Portuguesa',55],['Monagas SC',55],['Zamora FC',55],['Universidad Central',54],['Estudiantes de Mérida',54],['Rayo Zuliano',52],['Trujillanos',52],['Anzoátegui',51]]},
{k:'NED',n:'Holanda',f:'🇳🇱',lg:'Eredivisie',cl:[['PSV Eindhoven',82],['Ajax',79],['Feyenoord',79],['AZ',77],['Twente',75],['Utrecht',72],['N.E.C.',69],['Go Ahead Eagles',68],['Sparta Rotterdam',68],['Heerenveen',68],['Groningen',64],['Fortuna Sittard',62],['PEC Zwolle',62],['Willem II',62],['Excelsior',60],['Telstar',58],['Cambuur',58],['ADO Den Haag',58]]},
{k:'BEL',n:'Bélgica',f:'🇧🇪',lg:'Pro League',cl:[['Club Brugge',78],['Union SG',76],['Anderlecht',76],['Genk',73],['Gent',72],['Antwerp',70],['Standard Liège',68],['Charleroi',66],['Mechelen',66],['Westerlo',64],['OH Leuven',64],['Sint-Truiden',64],['Cercle Brugge',63],['Zulte Waregem',61],['Beveren',60],['Kortrijk',59],['La Louvière',58],['Lommel SK',57]]},
{k:'TUR',n:'Turquia',f:'🇹🇷',lg:'Süper Lig',cl:[['Galatasaray',82],['Fenerbahçe',81],['Beşiktaş',77],['Trabzonspor',74],['Başakşehir',70],['Samsunspor',66],['Göztepe',66],['Konyaspor',62],['Alanyaspor',62],['Rizespor',62],['Eyüpspor',62],['Kasımpaşa',61],['Kocaelispor',60],['Gaziantep',59],['Gençlerbirliği',59],['Amedspor',58],['Çorum',56],['Erzurumspor',56]]},
{k:'SCO',n:'Escócia',f:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',lg:'Scottish Premiership',cl:[['Celtic',74],['Rangers',72],['Heart of Midlothian',66],['Aberdeen',64],['Hibernian',64],['Motherwell',60],['Dundee United',58],['Kilmarnock',57],['St Mirren',57],['Falkirk',56],['Dundee',56],['St Johnstone',53]]},
{k:'JPN',n:'Japão',f:'🇯🇵',lg:'J1 League',cl:[['Vissel Kobe',68],['Kashima Antlers',68],['Sanfrecce Hiroshima',66],['Machida Zelvia',66],['Kawasaki Frontale',66],['Urawa Red Diamonds',65],['Yokohama F. Marinos',65],['Kashiwa Reysol',64],['FC Tokyo',62],['Cerezo Osaka',62],['Gamba Osaka',62],['Nagoya Grampus',62],['Kyoto Sanga',60],['Shimizu S-Pulse',59],['Avispa Fukuoka',58],['Fagiano Okayama',57],['Tokyo Verdy',57],['V-Varen Nagasaki',57],['JEF United Chiba',56],['Mito HollyHock',55]]},
{k:'KOR',n:'Coreia do Sul',f:'🇰🇷',lg:'K League 1',cl:[['Ulsan HD',66],['Jeonbuk Hyundai Motors',66],['FC Seoul',63],['Pohang Steelers',62],['Gangwon FC',60],['Daejeon Hana Citizen',60],['Gimcheon Sangmu',60],['Gwangju FC',58],['Jeju SK',58],['Incheon United',57],['FC Anyang',56],['Bucheon FC 1995',54]]},
{k:'CHN',n:'China',f:'🇨🇳',lg:'Super League',cl:[['Shanghai Port',62],['Shanghai Shenhua',61],['Beijing Guoan',61],['Shandong Taishan',61],['Chengdu Rongcheng',60],['Zhejiang',58],['Tianjin Jinmen Tiger',56],['Henan',56],['Qingdao West Coast',55],['Qingdao Hainiu',54],['Dalian Yingbo',54],['Shenzhen Peng City',54],['Liaoning Tieren',53],['Yunnan Yukun',53],['Wuhan Three Towns',53],['Chongqing Tonglianglong',52]]},
{k:'AUS',n:'Austrália',f:'🇦🇺',lg:'A-League Men',cl:[['Melbourne City',60],['Sydney FC',59],['Auckland FC',58],['Melbourne Victory',58],['Adelaide United',57],['Central Coast Mariners',56],['Brisbane Roar',55],['Western Sydney Wanderers',55],['Macarthur FC',54],['Wellington Phoenix',54],['Newcastle Jets',53],['Perth Glory',53]]},
{k:'EGY',n:'Egito',f:'🇪🇬',lg:'Egyptian Premier League',cl:[['Al Ahly',70],['Pyramids FC',68],['Zamalek SC',66],['Ceramica Cleopatra',60],['Al Masry',60],['National Bank of Egypt',58],['Al Ittihad Alexandria',58],['Tala\'ea El Gaish',57],['Modern Sport FC',57],['Petrojet',56],['El Gouna',56],['ZED FC',56],['Smouha',55],['Wadi Degla',55],['El Mokawloon El Arab',54],['Eastern Enppi',53],['Abu Qir Fertilizers',52],['Asyut Petroleum',52],['El Qanah',52],['Ghazl El Mahalla',51]]},
{k:'MAR',n:'Marrocos',f:'🇲🇦',lg:'Botola Pro',cl:[['Raja Casablanca',62],['Wydad Casablanca',62],['RS Berkane',62],['AS FAR',60],['Maghreb Fez',58],['DH El Jadida',55],['Ittihad Tanger',55],['FUS Rabat',55],['MA Tétouan',54],['Kawkab Marrakech',53],['COD Meknes',52],['RCA Zemamra',52],['Hassania Agadir',52],['UTS Rabat',51],['Wydad Témara',50],['Amal Tiznit',49]]},
{k:'RSA',n:'África do Sul',f:'🇿🇦',lg:'Betway Premiership',cl:[['Mamelodi Sundowns',66],['Orlando Pirates',65],['Kaizer Chiefs',61],['Stellenbosch',58],['AmaZulu',57],['Sekhukhune United',57],['Golden Arrows',55],['Polokwane City',54],['Durban City',54],['Siwelele',53],['Richards Bay',53],['TS Galaxy',53],['Chippa United',52],['Marumo Gallants',50],['Kruger United',50],['Milford',49]]},
];
/* cores e padrões (escudos inventados, mas com as cores certas dos grandes) */
const WCOL={'Manchester City':['#6cabdd','#ffffff','#6cabdd','solid'],'Arsenal':['#e30613','#ffffff','#e30613','solid'],'Liverpool':['#c8102e','#ffffff','#c8102e','solid'],'Chelsea':['#034694','#ffffff','#034694','solid'],'Manchester United':['#da291c','#111111','#da291c','solid'],'Tottenham':['#ffffff','#132257','#ffffff','solid'],'Newcastle':['#111111','#ffffff','#111111','v'],'Aston Villa':['#670e36','#95bfe5','#670e36','half'],
'Real Madrid':['#ffffff','#d4af37','#ffffff','solid'],'Barcelona':['#a50044','#004d98','#a50044','v'],'Atlético de Madrid':['#cb3524','#ffffff','#1b2f6b','v'],'Athletic Bilbao':['#ee2523','#ffffff','#ee2523','v'],'Sevilla':['#ffffff','#d71920','#ffffff','solid'],'Valencia':['#ffffff','#111111','#ffffff','solid'],'Real Betis':['#0bb363','#ffffff','#0bb363','v'],
'Inter de Milão':['#0068a8','#111111','#0068a8','v'],'Milan':['#fb090b','#111111','#fb090b','v'],'Juventus':['#111111','#ffffff','#111111','v'],'Napoli':['#12a0d7','#ffffff','#12a0d7','solid'],'Roma':['#8e1f2f','#f0bc42','#8e1f2f','solid'],'Lazio':['#87d8f7','#ffffff','#87d8f7','solid'],'Atalanta':['#1e71b8','#111111','#1e71b8','v'],'Fiorentina':['#5b2d82','#ffffff','#5b2d82','solid'],
'Bayern de Munique':['#dc052d','#ffffff','#0066b2','solid'],'Borussia Dortmund':['#fde100','#111111','#fde100','solid'],'Bayer Leverkusen':['#e32221','#111111','#e32221','solid'],'RB Leipzig':['#ffffff','#dd0741','#ffffff','solid'],
'Paris Saint-Germain':['#004170','#da291c','#ffffff','v'],'Olympique de Marselha':['#2faee0','#ffffff','#2faee0','solid'],'Lyon':['#ffffff','#1b3f8f','#d71920','solid'],'Monaco':['#e30613','#ffffff','#e30613','diag'],
'Benfica':['#e30613','#ffffff','#e30613','solid'],'Porto':['#003e7e','#ffffff','#003e7e','v'],'Sporting CP':['#008057','#ffffff','#008057','h'],'Braga':['#e30613','#ffffff','#e30613','solid'],
'River Plate':['#ffffff','#d71920','#ffffff','diag'],'Boca Juniors':['#0b3d91','#ffd426','#0b3d91','h'],'Peñarol':['#f9d71c','#111111','#f9d71c','v'],'Nacional (URU)':['#ffffff','#1f4fa3','#d71920','tri'],'Colo-Colo':['#ffffff','#111111','#ffffff','solid'],'Atlético Nacional':['#0b7a45','#ffffff','#0b7a45','v'],'Millonarios':['#1f4fa3','#ffffff','#1f4fa3','solid'],'Junior':['#d71920','#ffffff','#d71920','v'],'Universidad de Chile':['#1f4fa3','#d71920','#1f4fa3','solid'],'Al-Hilal':['#0b3d91','#ffffff','#0b3d91','solid'],'Al-Nassr':['#f9d71c','#0b3d91','#f9d71c','solid'],'Al-Ittihad':['#f9d71c','#111111','#f9d71c','v'],'Al-Ahli':['#0b7a45','#ffffff','#0b7a45','solid'],'Club América':['#f9d71c','#0b3d91','#f9d71c','solid'],'Guadalajara':['#d71920','#ffffff','#0b3d91','v'],'Cruz Azul':['#1f4fa3','#ffffff','#1f4fa3','solid'],'Tigres UANL':['#f9d71c','#1f4fa3','#f9d71c','solid'],'Monterrey':['#0b3d91','#ffffff','#0b3d91','v'],'Inter Miami':['#f7b5cd','#111111','#f7b5cd','solid'],'LA Galaxy':['#ffffff','#0b3d91','#f9d71c','solid'],'LAFC':['#111111','#d4af37','#111111','v']};
const WPAL=[['#1f4fa3','#ffffff','v'],['#d71920','#ffffff','h'],['#0b7a45','#ffffff','solid'],['#111111','#d4af37','v'],['#6a2c91','#ffffff','solid'],['#e8890c','#111111','h'],['#0a7a8c','#ffffff','half'],['#8a1538','#ffffff','solid'],['#2a2a72','#ffd426','v'],['#c1121f','#111111','half'],['#0b3d91','#ffffff','h'],['#e8b800','#1f4fa3','solid']];
function wHash(s){let h=7;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))>>>0;return h}
function wSigGen(){
  const used=new Set((typeof FCPOOL!=='undefined'?FCPOOL:[]).map(x=>x[1]));const out={};
  for(const L of WLD)for(const c of L.cl){
    const fc=(typeof FCPOOL!=='undefined'?FCPOOL:[]).find(x=>x[0]===c[0]);
    if(fc){out[c[0]]=fc[1];continue}
    const raw=c[0].normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z ]/g,'').toUpperCase();
    const ws=raw.split(' ').filter(Boolean);const letters=ws.join('');
    let cand=[ws[0].slice(0,3),(ws[0][0]||'')+(ws[1]?ws[1].slice(0,2):ws[0].slice(1,3)),letters.slice(0,3)];
    let sg=cand.find(x=>x.length===3&&!used.has(x));
    for(let i=1;!sg&&i<letters.length-2;i++){const t=letters[0]+letters[1]+letters[i+1];if(t.length===3&&!used.has(t))sg=t}
    if(!sg){for(let i=0;i<26&&!sg;i++){const t=letters.slice(0,2)+String.fromCharCode(65+i);if(!used.has(t))sg=t}}
    used.add(sg);out[c[0]]=sg;
  }
  return out;
}
const WSIG=wSigGen();
/* clubes sul-americanos novos entram no pool da Libertadores/Sul-Americana */
(function(){
  const have=new Set(FCPOOL.map(x=>x[0]));
  for(const L of WLD){if(!['ARG','URU','COL','CHI','PAR','ECU','PER','BOL','VEN','NED','BEL','TUR','SCO','JPN','KOR','CHN','AUS','EGY','MAR','RSA'].includes(L.k))continue;
    for(const c of L.cl){if(have.has(c[0]))continue;const col=WCOL[c[0]]||[...WPAL[wHash(c[0])%WPAL.length],''];
      const a=WCOL[c[0]]?col:[col[0],col[1],col[0],col[2]];FCPOOL.push([c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'),WSIG[c[0]],c[1],a[0],a[1],a[2],a[3]])}}
})();

/* regras específicas de cada liga (simplificadas do real) */
const WRULES={
 ENG:{fmt:'liga',rd:38,rel:3,ucl:4,uel:2,txt:['20 clubes, turno e returno (38 rodadas), 3 rebaixados.','Desempate: saldo de gols.','4 vagas na Champions e 2 na Liga Europa.','Elenco principal de 25: mínimo 8 formados no país; sem limite de estrangeiros.']},
 ESP:{fmt:'liga',rd:38,rel:3,ucl:4,uel:2,txt:['20 clubes, 38 rodadas, 3 rebaixados.','Desempate: confronto direto antes do saldo de gols.','4 vagas na Champions e 2 na Liga Europa.','Elenco principal de 25: no máximo 3 jogadores de fora da UE sem passaporte europeu.']},
 ITA:{fmt:'liga',rd:38,rel:3,ucl:4,uel:2,txt:['20 clubes, 38 rodadas, 3 rebaixados.','Desempate: confronto direto.','4 vagas na Champions e 2 na Liga Europa.','Elenco de 25 com 4 formados no clube e 4 formados no país.']},
 GER:{fmt:'liga',rd:34,rel:2,ucl:4,uel:2,txt:['18 clubes, 34 rodadas; 2 rebaixados direto e o 16º disputa repescagem.','Desempate: saldo de gols.','4 vagas na Champions e 2 na Liga Europa.','Regra 50+1: o clube pertence majoritariamente aos sócios.']},
 FRA:{fmt:'liga',rd:34,rel:2,ucl:3,uel:2,txt:['18 clubes, 34 rodadas, 2 rebaixados e repescagem pro 16º.','Desempate: saldo de gols.','3 vagas na Champions e 2 na Liga Europa/Conference.','Sem limite de estrangeiros.']},
 POR:{fmt:'liga',rd:34,rel:2,ucl:2,uel:2,txt:['18 clubes, 34 rodadas, 2 rebaixados.','Desempate: confronto direto.','2 vagas na Champions e 2 na Liga Europa/Conference.','Mínimo de formados no país no elenco de 25.']},
 ARG:{fmt:'ac',rd:38,rel:2,lib:4,sul:3,po:8,txt:['Dois torneios por ano (Apertura e Clausura), cada um com mata-mata dos 8 melhores; 2 campeões por temporada.','Descenso por média de pontos de três temporadas.','Libertadores: 4 vagas; Sul-Americana: 3.','Limite de estrangeiros por clube.']},
 URU:{fmt:'liga',rd:30,rel:2,lib:4,sul:3,txt:['16 clubes, 30 rodadas; título pela tabela (simplificado).','Libertadores: 4 vagas; Sul-Americana: 3.','Descenso por média de pontos.']},
 COL:{fmt:'ac',rd:38,rel:2,lib:4,sul:3,po:8,txt:['Duas campanhas (Apertura e Finalización) com playoff dos 8 melhores; 2 campeões por temporada.','Libertadores: 4 vagas; Sul-Americana: 3.','Descenso por média de pontos.']},
 CHI:{fmt:'liga',rd:30,rel:2,lib:4,sul:3,txt:['16 clubes, 30 rodadas; campeão por pontos corridos.','Libertadores: 4 vagas; Sul-Americana: 3.','2 rebaixados.']},
 MEX:{fmt:'ac',rd:34,rel:0,conc:4,po:8,txt:['Dois torneios curtos (Apertura e Clausura), cada um com liguilla dos 8 melhores; 2 campeões por temporada.','Sem descenso (liga fechada).','Vagas na Copa dos Campeões da CONCACAF para campeões e melhores campanhas.','Limite de estrangeiros por jogo e formação mínima de mexicanos.']},
 USA:{fmt:'liga',rd:34,rel:0,conc:4,po:16,txt:['Liga fechada, sem rebaixamento; 34 rodadas.','Playoffs da MLS Cup entre os 16 melhores, jogo único com mando do melhor colocado.','Teto salarial com jogadores franquia (Designated Players).','8 vagas de estrangeiros por clube, negociáveis entre clubes.']},
 KSA:{fmt:'liga',rd:34,rel:3,aco:3,txt:['18 clubes, 34 rodadas, 3 rebaixados.','Máximo de 10 estrangeiros por clube (8 por jogo).','Desempate: confronto direto.','Vagas na Champions Asiática para os melhores colocados.']},
 PAR:{fmt:'liga',rd:22,rel:2,lib:4,sul:4,txt:['12 clubes, 22 rodadas; título pela tabela (simplificado: o real tem Apertura e Clausura).','Libertadores: 4 vagas; Sul-Americana: 4.','Descenso por média de pontos de três temporadas (2 caem).']},
 ECU:{fmt:'liga',rd:30,rel:2,lib:4,sul:4,txt:['16 clubes, 30 rodadas; título pela tabela (simplificado: o real tem hexagonal final).','Libertadores: 4 vagas; Sul-Americana: 4.','2 rebaixados.']},
 PER:{fmt:'liga',rd:34,rel:2,lib:4,sul:4,txt:['18 clubes, 34 rodadas; título pela tabela (simplificado: o real tem Apertura, Clausura e final).','Libertadores: 4 vagas; Sul-Americana: 4.','2 rebaixados pela tabela acumulada.']},
 BOL:{fmt:'liga',rd:30,rel:0,lib:4,sul:3,txt:['16 clubes, 30 rodadas; título pela tabela (simplificado).','Libertadores: 4 vagas; Sul-Americana: 3.','Sem descenso por enquanto: a segunda divisão boliviana (Copa Simón Bolívar) ainda não está no jogo.']},
 VEN:{fmt:'liga',rd:26,rel:0,lib:3,sul:3,txt:['14 clubes, 26 rodadas; título pela tabela (simplificado).','Libertadores: 3 vagas; Sul-Americana: 3.','Sem descenso por enquanto: a segunda divisão venezuelana ainda não está no jogo.']},
 NED:{fmt:'liga',rd:34,rel:2,ucl:2,uel:2,txt:['18 clubes, 34 rodadas, 2 rebaixados (o 16º joga repescagem na vida real; aqui simplificado).','Champions: 2 vagas; Europa/Conference: 2.']},
 BEL:{fmt:'liga',rd:34,rel:2,ucl:1,uel:2,txt:['18 clubes, 34 rodadas, sem playoffs a partir de 2026-27; 2 rebaixados.','Champions: 1 vaga; Europa/Conference: 2.']},
 TUR:{fmt:'liga',rd:34,rel:3,ucl:2,uel:2,txt:['18 clubes, 34 rodadas, 3 rebaixados.','Champions: 2 vagas; Europa/Conference: 2.','Limite de estrangeiros no elenco.']},
 SCO:{fmt:'liga',rd:22,rel:1,ucl:1,uel:2,txt:['12 clubes. Real: 33 rodadas + divisão em dois grupos de 6 (38 jogos); aqui simplificado em 22 rodadas (ida e volta).','Champions: 1 vaga; Europa/Conference: 2.','1 rebaixado.']},
 JPN:{fmt:'liga',rd:38,rel:3,aco:3,txt:['20 clubes, 38 rodadas, 3 rebaixados. A J1 passa a jogar de agosto a junho a partir de 2026-27.','Máximo de estrangeiros por clube (cota de 5 em campo).']},
 KOR:{fmt:'liga',rd:22,rel:1,aco:1,txt:['12 clubes. Real: 33 rodadas + divisão em dois grupos de 6 (38 jogos); aqui simplificado em 22 rodadas.','1 rebaixado (real: o 12º ainda disputa repescagem).']},
 CHN:{fmt:'liga',rd:30,rel:1,aco:1,txt:['16 clubes, 30 rodadas, 1 rebaixado.','Limite de estrangeiros em campo.']},
 AUS:{fmt:'liga',rd:22,rel:0,txt:['12 clubes. Real: 26 rodadas (22 + 4 extras) e finais com os 6 melhores; aqui 22 rodadas.','Liga fechada: sem rebaixamento nem 2ª divisão.']},
 EGY:{fmt:'liga',rd:38,rel:0,txt:['20 clubes. Real: 19 rodadas + grupo do título (6) e grupo de rebaixamento; aqui ida e volta (38).','Sem 2ª divisão no jogo ainda, então sem rebaixamento.']},
 MAR:{fmt:'liga',rd:30,rel:0,txt:['16 clubes, 30 rodadas; 3 caem na vida real.','Sem 2ª divisão no jogo ainda, então sem rebaixamento.']},
 RSA:{fmt:'liga',rd:30,rel:2,aco:2,txt:['16 clubes, 30 rodadas, 2 rebaixados.','Segunda divisão: Motsepe Foundation Championship.']}
};

function wRnd(){return Math.random()}
function wPois(l){const L=Math.exp(-l);let k=0,p=1;do{k++;p*=Math.random()}while(p>L);return k-1}
function wMatch(a,b){const d=(a.r*a.f-b.r*b.f)+3;return [wPois(clamp(1.3*Math.exp(d/24),.25,3.6)),wPois(clamp(1.1*Math.exp(-d/24),.2,3.2))]}
function wRfx(n,r){const h=n-1,leg=r>=h,rr=r%h;const rot=[0];for(let i=1;i<n;i++)rot.push(1+((i-1+rr)%(n-1)));const out=[];for(let i=0;i<n/2;i++){let a=rot[i],b=rot[n-1-i];if((rr+i)%2){const t=a;a=b;b=t}if(leg){const t=a;a=b;b=t}out.push([a,b])}return out}
function worldInit(){
  let id=5000;const lg={};
  for(const L of WLD){
    lg[L.k]={cl:L.cl.map(c=>{const col=WCOL[c[0]]||(()=>{const p=WPAL[wHash(c[0])%WPAL.length];return [p[0],p[1],p[0],p[2]]})();
      return {id:id++,n:c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'),sg:WSIG[c[0]],sig:WSIG[c[0]],b:c[1],r:c[1],c1:col[0],c2:col[1],c3:col[2],pat:col[3],f:1,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0}}),ti:[]};
  }
  G.wd={s:G.season,es:0,lg,hist:[],xp:[]};
  wFormReset();
}
function wd(){if(!G)return null;if(!G.wd)worldInit();wMissing();if(G.wd.s!==G.season)wNew();return G.wd}
function wMissing(){const W=G.wd;let id=5000+Object.values(W.lg).reduce((s,l)=>s+l.cl.length,0)+20;for(const L of WLD){if(W.lg[L.k])continue;W.lg[L.k]={cl:L.cl.map(c=>{const col=WCOL[c[0]]||(()=>{const p=WPAL[wHash(c[0])%WPAL.length];return [p[0],p[1],p[0],p[2]]})();return {id:id++,n:c[0].replace(/-(URU|PAR|ECU)$/,' ($1)'),sg:WSIG[c[0]],sig:WSIG[c[0]],b:c[1],r:c[1],c1:col[0],c2:col[1],c3:col[2],pat:col[3],f:1,P:0,J:0,V:0,E:0,D:0,GP:0,GC:0,pp:0}}),ti:[]}}}
function wFormReset(){for(const k in G.wd.lg)for(const c of G.wd.lg[k].cl)c.f=clamp(1+gauss()*0.05,.92,1.08)}
function wNew(){const W=G.wd;W.s=G.season;for(const k in W.lg)for(const c of W.lg[k].cl){c.P=c.J=c.V=c.E=c.D=c.GP=c.GC=0;c.pp=0}wFormReset()}
function wTable(k){return G.wd.lg[k].cl.slice().sort((a,b)=>b.P-a.P||(b.GP-b.GC)-(a.GP-a.GC)||b.GP-a.GP||b.r-a.r)}
function wRound(rd){
  const W=wd();
  for(const k in W.lg){const cl=W.lg[k].cl,n=cl.length,R=WRULES[k]||{},tot=Math.min(R.rd||2*(n-1),2*(n-1));if(rd>=tot)continue;
    if(R.fmt==='ac'){const h=Math.floor(tot/2);if(rd===h)wHalf(k)}
    for(const [i,j] of wRfx(n,rd)){const a=cl[i],b=cl[j],[ga,gb]=wMatch(a,b);a.J++;b.J++;a.GP+=ga;a.GC+=gb;b.GP+=gb;b.GC+=ga;
      if(ga>gb){a.V++;a.P+=3;b.D++}else if(ga<gb){b.V++;b.P+=3;a.D++}else{a.E++;b.E++;a.P++;b.P++}}}
}
/* mata-mata simples (jogo único, mando do melhor colocado) */
function wKO(teams){let cur=teams.slice();while(cur.length>1){const nx=[];const n=cur.length;for(let i=0;i<n/2;i++){const a=cur[i],b=cur[n-1-i];const [ga,gb]=wMatch(a,b);nx.push(ga>gb?a:gb>ga?b:(Math.random()<.5+(a.r-b.r)/70?a:b))}cur=nx}return cur[0]}
/* fim do primeiro turno em ligas Apertura/Clausura: liguilla e zera a tabela */
function wHalf(k){
  const L=G.wd.lg[k],R=WRULES[k]||{},T=wTable(k);
  const ch=wKO(T.slice(0,R.po||8));L.hf=(L.hf||[]);L.hf.push({s:G.season,n:ch.n});
  paperLine(ch.n+' é campeão do Apertura ('+WLD.find(x=>x.k===k).lg+')','Liguilla decidida entre os 8 melhores.');
  for(const c of L.cl){c.pp=(c.pp||0)+c.P;c.P=c.J=c.V=c.E=c.D=c.GP=c.GC=0}
}
function wUcl(){
  const W=G.wd;const pick4=(k,n)=>wTable(k).slice(0,n);
  let teams=[].concat(pick4('ENG',4),pick4('ESP',4),pick4('ITA',4),pick4('GER',4),pick4('FRA',2),pick4('POR',2));
  teams=teams.map(t=>({t,s:t.r*t.f+gauss()*3})).sort((a,b)=>b.s-a.s).slice(0,16).map(x=>x.t);
  teams=shuffle(teams);let last=null;
  while(teams.length>1){const nx=[];for(let i=0;i<teams.length;i+=2){const a=teams[i],b=teams[i+1];let [ga,gb]=wMatch(a,b);const [g2,g1]=wMatch(b,a);ga+=g1;gb+=g2;
      let w=ga>gb?a:gb>ga?b:(wRnd()<.5+(a.r-b.r)/80?a:b);nx.push(w);if(teams.length===2)last=[w,w===a?b:a]}teams=nx}
  return {ch:teams[0],vice:last?last[1]:null};
}
function wEnd(){
  const W=wd();if(W.es===G.season)return;W.es=G.season;
  const rec={s:G.season,ch:{},vi:{}};
  for(const k in W.lg){const R=WRULES[k]||{};let T=wTable(k);
    let champ=T[0];
    if(R.fmt==='ac'){const c2=wKO(T.slice(0,R.po||8));const a=(W.lg[k].hf||[]).filter(x=>x.s===G.season).slice(-1)[0];champ=c2;rec.ch[k]=(a?a.n+' / ':'')+c2.n;rec.vi[k]=''}
    else if(R.po){champ=wKO(T.slice(0,R.po));rec.ch[k]=champ.n;rec.vi[k]=T[0].n}
    else{rec.ch[k]=T[0].n;rec.vi[k]=T[1]?T[1].n:''}
    rec.cp=rec.cp||{};rec.cp[k]=champ.n;
    T.forEach(c=>{c.P2=(c.pp||0)+c.P});T.sort((a,b)=>b.P2-a.P2||(b.GP-b.GC)-(a.GP-a.GC));
    const byB=W.lg[k].cl.slice().sort((a,b)=>b.b-a.b);
    T.forEach((c,i)=>{const exp=byB.findIndex(x=>x.id===c.id);c.r=+clamp(c.r*.82+c.b*.18+(exp-i)*.12,c.b-6,c.b+6).toFixed(1)});
    W.lg[k].ti.push({s:G.season,n:rec.ch[k],sg:champ.sg});
  }
  try{const u=wUcl();rec.ucl=u.ch.n;rec.uclv=u.vice?u.vice.n:'';rec.uclc=u.ch.sg;
    paperLine(u.ch.n+' é campeão da Champions League','Final contra '+(u.vice?u.vice.n:'—')+'. Temporada '+G.season+'.')}catch(e){console.error('ucl '+e.message)}
  W.hist.push(rec);W.hist=W.hist.slice(-40);
}
/* gancho nas rodadas e na virada */
const _fr37=finishRound;finishRound=function(){
  const rd=G.round;
  const out=_fr37.apply(this,arguments);
  /* só avança o mundo quando foi rodada de liga (estadual/copas não mexem em G.round) */
  try{if(rd<40&&G.round>rd)wRound(rd)}catch(e){console.error('wRound '+e.message)}
  return out;
};
const _es37=endSeason;endSeason=function(){const r=_es37.apply(this,arguments);try{wEnd()}catch(e){console.error('wEnd '+e.message)}return r};
const _ns37=newSeason;newSeason=function(){try{wEnd()}catch(e){}try{xMarket37(8,'start')}catch(e){console.error('xm37 '+e.message)}const r=_ns37.apply(this,arguments);try{wNew();G.wd.s=G.season}catch(e){}return r};
const _fr37b=finishRound;finishRound=function(){const r=_fr37b.apply(this,arguments);try{if(G.round===19)xMarket37(6,'mid')}catch(e){console.error('xm37b '+e.message)}return r};

/* ---------- mercado internacional ---------- */
const NAT37={ARG:[28,'ARG'],URU:[14,'URU'],COL:[14,'COL'],CHI:[11,'CHI'],POR:[12,'POR'],ESP:[9,'ESP'],ITA:[5,'ITA'],FRA:[4,'FRA'],ENG:[2,'ENG'],GER:[1,'GER'],MEX:[6,'MEX'],USA:[4,'USA'],KSA:[2,'KSA'],PAR:[10,'PAR'],ECU:[9,'ECU'],PER:[6,'PER'],BOL:[3,'BOL'],VEN:[4,'VEN'],NED:[6,'NED'],BEL:[4,'BEL'],TUR:[5,'TUR'],SCO:[3,'SCO'],JPN:[4,'JPN'],KOR:[3,'KOR'],CHN:[3,'CHN'],AUS:[2,'AUS'],EGY:[3,'EGY'],MAR:[3,'MAR'],RSA:[2,'RSA']};
const NMP={
 PAR:[['Derlis','Óscar','Gustavo','Fabián','Ángel','Júnior','Richard','Alan'],['Benítez','Giménez','Villalba','Cáceres','Ayala','Duarte','Bobadilla','Samudio']],
 ECU:[['Kevin','Jhon','Byron','Joao','Gonzalo','Pervis','Moisés','Ángelo'],['Caicedo','Estupiñán','Preciado','Mina','Plata','Cifuentes','Sornoza','Arboleda']],
 PER:[['Edison','Yoshimar','Christian','Renato','Luis','Alex','Wilder','Paolo'],['Flores','Yotún','Cueva','Tapia','Advíncula','Carrillo','Quispe','Sánchez']],
 BOL:[['Marcelo','Carlos','Ramiro','Henry','Jaime','Roberto','Erwin','Diego'],['Quispe','Mamani','Vaca','Justiniano','Arce','Saucedo','Chura','Condori']],
 VEN:[['Yeferson','Darwin','Josef','Salomón','Jhon','Néstor','Jefferson','Wuilker'],['Rondón','Soteldo','Martínez','Machís','Savarino','Cásseres','Rincón','Bello']],
 NED:[['Daan','Sven','Jesse','Thijs','Lars','Bram','Joey','Tijjani'],['de Jong','van Dijk','Bakker','Visser','Smit','Mulder','de Vries','Janssen']],
 BEL:[['Thomas','Wout','Dries','Jelle','Yannick','Arne','Koen','Hans'],['Peeters','Janssens','Maes','Jacobs','Mertens','Willems','Claes','Goossens']],
 TUR:[['Emre','Burak','Mehmet','Arda','Cenk','Hakan','Kerem','Orkun'],['Yılmaz','Kaya','Demir','Çelik','Şahin','Yıldız','Öztürk','Aydın']],
 SCO:[['Callum','Kieran','Lewis','Ryan','Scott','Craig','Jamie','Euan'],['McGregor','Campbell','Stewart','Robertson','Henderson','Murray','Reid','Fraser']],
 JPN:[['Takumi','Kaito','Ryota','Daichi','Yuki','Shota','Haruto','Sora'],['Sato','Suzuki','Takahashi','Tanaka','Watanabe','Ito','Yamamoto','Nakamura']],
 KOR:[['Min-jae','Seung-ho','Jae-sung','Hyun-woo','Dong-jun','Young-woo','Tae-hyun','Ji-hoon'],['Kim','Lee','Park','Choi','Jung','Kang','Cho','Yoon']],
 CHN:[['Wei','Lei','Jian','Hao','Yang','Bo','Ming','Chen'],['Wang','Li','Zhang','Liu','Zhao','Wu','Zhou','Xu']],
 AUS:[['Jack','Mitch','Riley','Connor','Harry','Nick','Jordan','Ryan'],['Smith','Jones','Williams','Brown','Wilson','Taylor','Anderson','Thompson']],
 EGY:[['Mohamed','Ahmed','Mahmoud','Omar','Ali','Mostafa','Karim','Hossam'],['Hassan','Ibrahim','Salah','Abdelrahman','Farouk','Mansour','Said','Gamal']],
 MAR:[['Youssef','Achraf','Hakim','Brahim','Sofiane','Walid','Ayoub','Anas'],['Benali','El Idrissi','Amrabat','Bennani','Tazi','Alaoui','Chaoui','Fassi']],
 RSA:[['Themba','Siyabonga','Lebo','Percy','Thulani','Khama','Bongani','Lehlohonolo'],['Mokoena','Nkosi','Dlamini','Zungu','Khumalo','Mabaso','Ngcobo','Sithole']],
 ARG:[['Matías','Nicolás','Franco','Facundo','Lautaro','Santiago','Agustín','Gonzalo','Ezequiel','Julián','Maximiliano','Leandro'],['Fernández','Gómez','Romero','Acosta','Benítez','Herrera','Giménez','Sosa','Medina','Ledesma','Paredes','Villalba']],
 URU:[['Maximiliano','Federico','Nicolás','Darwin','Brian','Mathías','Facundo','Rodrigo'],['Rodríguez','Silva','Techera','Olivera','Viña','Cabrera','Píriz','Bentancur']],
 COL:[['Juan','Jhon','Duván','Yerry','Wilmar','Cristian','Brayan','Luis'],['Martínez','Ramírez','Cuesta','Mosquera','Cuadrado','Borja','Córdoba','Murillo']],
 CHI:[['Esteban','Claudio','Mauricio','Nicolás','Gary','Diego','Marcelo','Alexis'],['Vargas','Contreras','Pizarro','Saavedra','Araya','Valdés','Carmona','Fuenzalida']],
 POR:[['Rúben','Tiago','Nuno','Diogo','Bruno','Rafael','Gonçalo','Hugo'],['Carvalho','Mendes','Pinto','Sousa','Fernandes','Ferreira','Moreira','Barros']],
 ESP:[['Álvaro','Sergio','Iván','Raúl','Adrián','Pablo','Jesús','Marcos'],['García','Navarro','Ortega','Molina','Delgado','Cano','Iglesias','Santana']],
 ITA:[['Marco','Luca','Andrea','Matteo','Simone','Davide','Federico','Riccardo'],['Rossi','Ferrari','Bianchi','Conti','De Luca','Moretti','Greco','Fontana']],
 FRA:[['Mathieu','Antoine','Julien','Kevin','Théo','Hugo','Maxime','Lucas'],['Dubois','Lefèvre','Moreau','Girard','Fontaine','Perrin','Roux','Blanc']],
 ENG:[['Jack','Harry','Callum','Oliver','Ben','Tom','Jordan','Reece'],['Walker','Hughes','Palmer','Barnes','Foster','Hamilton','Stone','Wright']],
 MEX:[['Luis','Carlos','Jesús','Miguel','Diego','Erick','Hirving','Edson'],['Hernández','Ramírez','Torres','Flores','Salcedo','Vega','Gallardo','Chávez']],
 USA:[['Tyler','Brandon','Cole','Chris','Matt','Ryan','Josh','Jordan'],['Miller','Turner','Reyna','Adams','Brooks','Weah','Carter','Morris']],
 KSA:[['Salem','Abdullah','Mohammed','Fahad','Yasser','Nawaf','Saud','Turki'],['Al-Dawsari','Al-Shehri','Al-Faraj','Al-Owais','Al-Harbi','Al-Ghamdi','Al-Najjar','Al-Buraikan']],
 GER:[['Lukas','Jonas','Felix','Moritz','Niklas','Tim','Jan','Leon'],['Müller','Becker','Hoffmann','Schäfer','Koch','Richter','Wolf','Neumann']]
};
function wName(k){const [f,l]=NMP[k];for(let i=0;i<30;i++){const n=pick(f)+' '+pick(l);if(!NMS.has(n)){NMS.add(n);return n}}for(let i=0;i<80;i++){const n=pick(f)+' '+String.fromCharCode(65+ri(0,25))+'. '+pick(l);if(!NMS.has(n)){NMS.add(n);return n}}return pick(f)+' '+pick(l)+' '+ri(2,9)}
function wNatPick(){const tot=Object.values(NAT37).reduce((s,x)=>s+x[0],0);let r=Math.random()*tot;for(const k in NAT37){r-=NAT37[k][0];if(r<=0)return k}return 'ARG'}
function wBuyer(p){
  const all=[];for(const k in G.wd.lg)for(const c of G.wd.lg[k].cl)all.push({c,k});
  let best=null,bw=0;
  for(const x of all){const w=Math.exp(-Math.pow((x.c.r-(p.ovr+7))/7,2))*Math.random();if(w>bw){bw=w;best=x}}
  return best;
}
function wLog(t,fee){const W=G.wd;W.xp.unshift({s:G.season,r:G.round+1,t,fee:+fee.toFixed(1)});W.xp=W.xp.slice(0,30)}
function wRole(c,pos){return {GK:'GOL',DEF:pick(['ZAG','ZAG','LAT']),MID:pick(['VOL','MEI']),ATA:pick(['PNT','ATA'])}[pos]||'MEI'}
function xMarket37(n,when){
  if(!G||G.user==null)return;wd();
  const seasonMin=when==='start';
  /* 1) saídas: brasileiros vão pra fora */
  let out=0,heads=0;
  const pool=[];
  for(const c of G.clubs){if(c.id===G.user)continue;
    for(const id of c.squad){const p=P(id);if(p&&!p.loan&&p.age>=18&&p.age<=30&&p.ovr>=66)pool.push([c,p])}}
  shuffle(pool);
  for(const [c,p] of pool){
    if(out>=n)break;if(c.squad.length<=21)continue;
    const top=c.squad.map(P).filter(Boolean).sort((a,b)=>b.ovr-a.ovr).slice(0,3).map(x=>x.id);
    const chance=.18*(p.ovr>=74?1.6:1)*(p.age<=24?1.4:1)*(top.includes(p.id)?.7:1);
    if(Math.random()>chance)continue;
    const by=wBuyer(p);if(!by)continue;
    const fee=+(valueOf(p)*rnd(1.0,1.4)).toFixed(1);
    c.squad=c.squad.filter(i=>i!==p.id);delete G.players[p.id];G.free=(G.free||[]).filter(i=>i!==p.id);
    c.caixa=+((c.caixa||0)+fee*.9).toFixed(1);
    try{const np=mkPlayer(p.role,Math.max(p.ovr-9,c.rep-6),ri(19,22),c.id);c.squad.push(np.id)}catch(e){}
    try{autoPick(c)}catch(e){}
    out++;G.aix=(G.aix||0)+1;
    wLog(`${p.name} (${c.sig}) → ${by.c.n} (${by.k})`,fee);
    if((p.ovr>=76||fee>=18)&&heads<3){heads++;paperLine(`${p.name} deixa o ${c.name} e vai para o ${by.c.n}`,`Negócio de R$ ${fee.toFixed(1)} mi fecha a saída para ${WLD.find(x=>x.k===by.k).n}.`)}
  }
  /* 2) chegadas: estrangeiros reforçam clubes brasileiros */
  let inn=0;
  const cl=shuffle(G.clubs.filter(c=>c.id!==G.user&&c.squad.length<30&&(c.caixa||0)>1.5));
  for(const b of cl){
    if(inn>=n)break;
    const chance=b.div===0?.55:b.div===1?.35:b.div===2?.2:.1;if(Math.random()>chance)continue;
    const bs=b.squad.map(P).filter(Boolean);
    const pos=pick(['GK','DEF','DEF','MID','MID','ATA']);
    const same=bs.filter(x=>x.pos===pos).sort((a,b2)=>b2.ovr-a.ovr);
    const base=same.length?same[Math.min(same.length-1,pos==='GK'?0:2)].ovr:b.rep-8;
    const ovr=clamp(Math.round(base+ri(2,6)),44,b.rep+8);
    const nat=wNatPick();const role=wRole(b,pos);
    const nm=wName(nat);
    const p=mkPlayer(role,ovr,ri(22,31),b.id,nm,false);
    const fee=+(valueOf(p)*rnd(.7,1)).toFixed(1);
    if(fee>b.caixa*.6){delete G.players[p.id];continue}
    b.caixa=+(b.caixa-fee).toFixed(1);b.squad.push(p.id);
    try{NATF[nm]=nat}catch(e){}p.nat=nat;
    if(b.squad.length>30){const extra=b.squad.map(P).filter(Boolean).sort((a,b2)=>a.ovr-b2.ovr)[0];if(extra&&extra.id!==p.id){b.squad=b.squad.filter(i=>i!==extra.id);extra.club=-1;G.free.push(extra.id)}}
    try{autoPick(b)}catch(e){}
    inn++;
    if(p.ovr>=74)wLog(`${nm} (${nat}) → ${b.name}`,fee);
  }
  /* 3) propostas de fora para o seu elenco, por e-mail */
  try{
    const c=userClub();if(c.squad.length>=21){
      const cands=c.squad.map(P).filter(p=>p&&!p.loan&&p.age>=19&&p.age<=30&&p.ovr>=68).sort((a,b)=>b.ovr-a.ovr);
      let sent=0;
      for(const p of cands){if(sent>=1)break;
        const chance=.28*(p.ovr>=74?1.5:1)*(p.listed?2:1);if(Math.random()>chance)continue;
        const by=wBuyer(p);if(!by)continue;
        const fee=+(valueOf(p)*rnd(1.0,1.4)).toFixed(1);
        const exp=G.season*40+G.round+4;
        mail('offer','🌍 '+by.c.n+' quer '+nameOf(p),`${by.c.n} (${WLD.find(x=>x.k===by.k).n}) oferece ${mi(fee)} por ${nameOf(p)} (OVR ${p.ovr}, ${p.age} anos). Valor de mercado: ${mi(valueOf(p))}.\nProposta vale por 4 rodadas. Se vender, o jogador sai do país.`,[{l:'Aceitar '+mi(fee),k:'xsell',p:{pid:p.id,fee,cn:by.c.n,ck:by.k,exp}},{l:'Recusar',k:'xdec',p:{},g:1}],'xo'+p.id);
        sent++;
      }
    }
  }catch(e){console.error('xoffer '+e.message)}
}
Object.assign(MACT,{
  xsell(p,m){
    const c=userClub(),pl=P(p.pid);
    if(!pl||c.squad.indexOf(p.pid)<0)return {ok:false,t:'Esse jogador não está mais no elenco.'};
    if(G.season*40+G.round>p.exp)return {ok:false,t:'A proposta expirou.'};
    if(c.squad.length<=19)return {ok:false,t:'Elenco precisa ter ao menos 19 jogadores para vender.',keep:true};
    const top=c.squad.map(P).filter(Boolean).sort((a,b)=>b.ovr-a.ovr).slice(0,3).map(x=>x.id);
    c.squad=c.squad.filter(i=>i!==p.pid);G.fin.caixa=+(G.fin.caixa+p.fee).toFixed(2);
    wLog(`${pl.name} (${c.sig}) → ${p.cn} (${p.ck})`,p.fee);
    if(top.includes(p.pid)){c.humor=clamp(c.humor-6,5,100);G.board.conf=clamp(G.board.conf-3,0,100);addNews('A torcida reclamou da venda de '+pl.name+'.')}
    paperLine(`${pl.name} deixa o ${c.name} e vai para o ${p.cn}`,`Negócio de R$ ${p.fee.toFixed(1)} mi.`);
    delete G.players[p.pid];G.offers=G.offers.filter(o=>o.pid!==p.pid);
    try{autoPick(c)}catch(e){}
    return {ok:true,t:'Venda fechada: '+mi(p.fee)};
  },
  xdec(){return {ok:true,t:'Proposta recusada.'}}
});

/* ---------- tela Mundo (dentro de Copas) ---------- */
const _vc37=vComp;vComp=function(){
  if(S.ctab!=='mundo'){
    let h=_vc37();
    return h.replace(/(data-t="cont">Continental<\/button>)/,'$1<button data-a="ctab" data-t="mundo">Mundo</button>');
  }
  const W=wd();
  const tabs=`<div class="seg"><button data-a="ctab" data-t="cup">Copa do Brasil</button><button data-a="ctab" data-t="cont">Continental</button><button class="on" data-a="ctab" data-t="mundo">Mundo</button></div>`;
  let h=`<div class="wrap cp19"><h2>Copas</h2>${tabs}`;
  const k=S.wc;
  if(k&&W.lg[k]){
    const L=WLD.find(x=>x.k===k),T=wTable(k);
    h+=`<button class="btn ghost sm" data-a="wc" data-k="">← Mundo</button><div class="card"><div class="k">${L.f} ${esc(L.lg)} · ${esc(L.n)} · T${G.season}</div>
    <div class="tbl"><div class="tr hd"><span>#</span><span class="tc">Clube</span><span>J</span><span>V</span><span>SG</span><span>P</span></div>${T.map((c,i)=>`<div class="tr ${i<4?'g4':((WRULES[k]||{}).rel&&i>=T.length-(WRULES[k].rel))?'z4':''}"><span>${i+1}</span><span class="tc">${crest(c,20)}${esc(c.n)}</span><span>${c.J}</span><span>${c.V}</span><span>${c.GP-c.GC}</span><b>${c.P}</b></div>`).join('')}</div></div>`;
    const ti=W.lg[k].ti.slice().reverse().slice(0,10);
    if(ti.length)h+=`<div class="card"><div class="k">Campeões anteriores</div>${ti.map(x=>`<div class="res"><span>T${x.s}</span><b>${esc(x.n)}</b></div>`).join('')}</div>`;
    return h+'</div>';
  }
  h+=`<p class="news">Os campeonatos do mundo rolam junto com o seu. Os melhores times da Europa disputam a Champions no fim da temporada, e os mercados se mexem: brasileiros saem, estrangeiros chegam.</p><div class="card"><div class="k">🌎 Campeonatos</div>`;
  for(const L of WLD){const T=wTable(L.k),ld=T[0],last=W.lg[L.k].ti.slice(-1)[0];
    h+=`<button class="offer" data-a="wc" data-k="${L.k}"><b>${L.f} ${esc(L.n)} · ${esc(L.lg)}</b><span>${G.round?'líder: '+esc(ld.n)+' ('+ld.P+' pts)':'começa na 1ª rodada'}</span><small>${last?'campeão T'+last.s+': '+esc(last.n):'sem campeão ainda'}</small></button>`}
  h+='</div>';
  const top=[];for(const L of WLD)for(const c of W.lg[L.k].cl)top.push([c,L]);top.sort((a,b)=>b[0].r-a[0].r);
  h+=`<div class="card"><div class="k">Ranking de clubes do mundo</div>${top.slice(0,12).map(([c,L],i)=>`<div class="res"><span>${i+1}. ${crest(c,16)} ${esc(c.n)} ${L.f}</span><b>${c.r.toFixed(0)}</b></div>`).join('')}</div>`;
  const hs=W.hist.slice(-8).reverse().filter(x=>x.ucl);
  if(hs.length)h+=`<div class="card"><div class="k">🏆 Champions League · campeões</div>${hs.map(x=>`<div class="res"><span>T${x.s}</span><b>${esc(x.ucl)}</b></div>`).join('')}</div>`;
  if(W.xp.length)h+=`<div class="card"><div class="k">💸 Transferências internacionais</div>${W.xp.slice(0,10).map(x=>`<div class="res"><span>${esc(x.t)}<br><small>T${x.s} · rodada ${x.r}</small></span><b>${mi(x.fee)}</b></div>`).join('')}</div>`;
  return h+'</div>';
};
Object.assign(A,{wc(d){S.wc=d.k||null;S.ctab='mundo';render();window.scrollTo(0,0)}});
const _ls37=loadSave;loadSave=function(){const ok=_ls37.apply(this,arguments);return ok};

try{const st=document.createElement('style');st.textContent='.cp19 .tr .tc{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}';document.head.appendChild(st)}catch(e){}

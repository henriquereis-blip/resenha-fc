/* ===== Resenha FC v2 — dados ===== */
// nome, sigla, reputação, capacidade, cor1, cor2, cor3, padrão do escudo
const CLUBS=[
 ['Palmeiras','PAL',76,43000,'#0b6b38','#ffffff','#0b6b38','solid'],
 ['Flamengo','FLA',76,60000,'#d0112b','#111111','#d0112b','h'],
 ['Botafogo','BOT',75,44000,'#111111','#ffffff','#111111','v'],
 ['Atlético-MG','CAM',75,46000,'#111111','#ffffff','#111111','v'],
 ['Fluminense','FLU',74,78000,'#8a1538','#0a7a3d','#ffffff','tri'],
 ['São Paulo','SAO',74,66000,'#e30613','#ffffff','#111111','hb'],
 ['Internacional','INT',74,50000,'#e30613','#ffffff','#e30613','half'],
 ['Grêmio','GRE',74,55000,'#1b86c8','#111111','#ffffff','tri'],
 ['Corinthians','COR',73,49000,'#111111','#ffffff','#111111','solid'],
 ['Cruzeiro','CRU',73,61000,'#1f4fa3','#ffffff','#1f4fa3','solid'],
 ['Bahia','BAH',72,47000,'#1c63b7','#e30613','#ffffff','tri'],
 ['Vasco','VAS',71,21000,'#111111','#ffffff','#111111','diag'],
 ['Athletico-PR','CAP',71,42000,'#d71920','#111111','#d71920','v'],
 ['Santos','SAN',70,16000,'#ffffff','#111111','#ffffff','solid'],
 ['Bragantino','RBB',70,17000,'#ffffff','#d71920','#ffffff','solid'],
 ['Vitória','VIT',68,35000,'#d71920','#111111','#d71920','half'],
 ['Coritiba','CFC',66,40000,'#0b7a45','#ffffff','#0b7a45','v'],
 ['Mirassol','MIR',65,15000,'#e8b800','#0b7a45','#e8b800','h'],
 ['Chapecoense','CHA',64,20000,'#0b8a3f','#ffffff','#0b8a3f','solid'],
 ['Remo','REM',64,15000,'#1d3f8f','#ffffff','#1d3f8f','h']
];

/* ===== Séries B, C e D (composição aproximada; jogadores fictícios) ===== */
const TRAD={FLA:92,PAL:90,SAO:90,COR:89,GRE:88,INT:88,SAN:86,VAS:85,CAM:85,CRU:84,FLU:82,BOT:80,BAH:75,VIT:66,CFC:64,CAP:62,REM:55,RBB:40,CHA:38,MIR:25};
// nome,sigla,rep,cap,cor1,cor2,padrão,tradição
const LOWER_RAW=[
 ['Fortaleza','FOR',66,60000,'#1f4fa3','#d71920','h',70],['Ceará','CEA',65,60000,'#111111','#ffffff','v',62],['Sport','SPO',65,32000,'#d71920','#111111','h',70],['Juventude','JUV',64,19000,'#0b7a45','#ffffff','solid',52],
 ['Goiás','GOI',64,28000,'#0b7a45','#ffffff','solid',62],['Atlético-GO','ACG',63,12000,'#d71920','#111111','h',45],['América-MG','AME',63,20000,'#0b7a45','#111111','solid',58],['Cuiabá','CUI',63,44000,'#e8b800','#0b7a45','solid',30],
 ['Criciúma','CRI',62,19000,'#e8b800','#111111','h',48],['Avaí','AVA',62,17000,'#1f4fa3','#ffffff','h',52],['Vila Nova','VNO',62,11000,'#d71920','#ffffff','solid',40],['Novorizontino','NOV',62,16000,'#e8b800','#111111','solid',25],
 ['Operário-PR','OPE',61,34000,'#111111','#ffffff','v',30],['Ponte Preta','PON',61,19000,'#111111','#ffffff','v',58],['Botafogo-SP','BSP',61,29000,'#d71920','#ffffff','h',40],['Paysandu','PAY',61,15000,'#1f4fa3','#ffffff','h',52],
 ['CRB','CRB',61,19000,'#d71920','#ffffff','v',55],['Athletic-MG','ATH',60,8000,'#111111','#ffffff','h',20],['Londrina','LON',60,30000,'#1f4fa3','#ffffff','solid',28],['Ferroviária','FER',60,15000,'#7a1a1a','#ffffff','h',35],
 ['Náutico','NAU',59,19000,'#d71920','#ffffff','h',60],['Santa Cruz','STC',59,60000,'#d71920','#111111','v',58],['Figueirense','FIG',58,19000,'#111111','#ffffff','v',50],['Brusque','BRU',58,19000,'#e8b800','#1f4fa3','solid',25],
 ['Volta Redonda','VRE',58,12000,'#e8b800','#111111','h',25],['Ypiranga-RS','YPI',57,12000,'#e8b800','#1f4fa3','h',25],['ABC','ABC',57,18000,'#111111','#ffffff','v',40],['Amazonas','AMA',57,9000,'#e8b800','#0b7a45','solid',20],
 ['Confiança','CON',57,15000,'#1f4fa3','#ffffff','v',30],['Guarani','GUA',57,29000,'#0b7a45','#ffffff','h',55],['Tombense','TOM',56,5000,'#d71920','#ffffff','solid',15],['Operário-VG','OVG',56,10000,'#d71920','#ffffff','v',20],
 ['Caxias','CAX',56,22000,'#7a1a1a','#1f4fa3','h',35],['Inter de Limeira','ILI',56,20000,'#d71920','#ffffff','solid',30],['Aparecidense','APA',56,5000,'#d71920','#ffffff','solid',12],['Floresta','FLO',56,10000,'#d71920','#ffffff','solid',12],
 ['Maringá','MAR',56,21000,'#e8b800','#111111','solid',22],['Sampaio Corrêa','SAM',56,20000,'#d71920','#ffffff','solid',45],['Botafogo-PB','BPB',56,16000,'#111111','#ffffff','v',40],['Paraná','PAR',56,20000,'#1f4fa3','#d71920','h',48],
 ['Retrô','RET',52,8000,'#d71920','#111111','solid',10],['Treze','TRE',52,16000,'#111111','#ffffff','v',35],['Campinense','CMP',52,19000,'#d71920','#111111','h',35],['Moto Club','MOT',52,20000,'#1f4fa3','#ffffff','h',28],
 ['Altos','ALT',52,6000,'#e8b800','#111111','solid',15],['Fluminense-PI','FPI',52,6000,'#8a1538','#0a7a3d','tri',20],['Juazeirense','JUA',52,8000,'#1f4fa3','#ffffff','solid',12],['Jacuipense','JAC',52,6000,'#1f4fa3','#ffffff','solid',10],
 ['Itabaiana','ITA',52,10000,'#1f4fa3','#ffffff','v',25],['Portuguesa','POR',52,18000,'#d71920','#0b7a45','v',55],['Água Santa','AGU',51,10000,'#d71920','#111111','solid',12],['XV de Piracicaba','XVP',51,19000,'#111111','#ffffff','v',38],
 ['São José-RS','SJO',51,10000,'#111111','#ffffff','h',20],['Pelotas','PEL',51,16000,'#e8b800','#111111','h',30],['Joinville','JOI',51,22000,'#111111','#ffffff','v',40],['Hercílio Luz','HER',50,8000,'#d71920','#111111','solid',25],
 ['Real Noroeste','RNO',50,6000,'#1f4fa3','#ffffff','solid',10],['Humaitá','HUM',50,10000,'#d71920','#ffffff','solid',10],['Rio Branco-AC','RBR',50,12000,'#111111','#ffffff','v',30],['Nova Iguaçu','NIG',50,8000,'#e8b800','#d71920','solid',15]
];
LOWER_RAW.forEach(r=>CLUBS.push([r[0],r[1],r[2],r[3],r[4],r[5],r[4],r[6]]));
LOWER_RAW.forEach(r=>{TRAD[r[1]]=r[7]});
// Elencos de memória (aproximados): nome,PosiçãoTier,idade. Pos: G goleiro, Z zagueiro, L lateral, V volante, M meia, P ponta, A atacante. Tier 1 estrela … 5 base.
const REAL={
PAL:'Weverton,G2,38;Carlos Miguel,G3,27;Gustavo Gómez,Z1,33;Murilo,Z2,28;Bruno Fuchs,Z2,27;Micael,Z4,22;Khellven,L3,25;Giay,L2,22;Piquerez,L2,27;Vanderlan,L4,22;Aníbal Moreno,V2,26;Richard Ríos,V1,25;Gabriel Menino,V3,25;Emiliano Martínez,M2,23;Raphael Veiga,M1,30;Andreas Pereira,M2,30;Facundo Torres,P3,25;Ramón Sosa,P2,26;Felipe Anderson,P2,33;Vitor Roque,A1,21;Flaco López,A2,25;Paulinho,A2,26',
FLA:'Agustín Rossi,G2,31;Matheus Cunha,G4,27;Léo Pereira,Z1,30;Léo Ortiz,Z1,30;Danilo,Z2,35;Varela,L2,33;Wesley,L2,22;Ayrton Lucas,L2,28;Alex Sandro,L3,35;Erick Pulgar,V2,32;Jorginho,V2,34;Saul,V3,31;Allan,V3,29;Gerson,M1,28;De La Cruz,M1,29;Arrascaeta,M1,31;Lorran,M4,20;Pedro,A1,29;Bruno Henrique,A2,35;Gonzalo Plata,P2,25;Luiz Araújo,P2,30;Samuel Lino,P2,26;Everton Cebolinha,P3,30',
BOT:'John,G2,30;Léo Linck,G3,26;Alexander Barboza,Z2,30;Bastos,Z2,34;Adryelson,Z3,28;Jair Cunha,Z3,20;Vitinho,L3,26;Cuiabano,L3,23;Alex Telles,L2,33;Marlon Freitas,V2,29;Danilo Barbosa,V3,29;Gregore,V3,31;Santiago Rodríguez,M2,25;Savarino,P1,29;Matheus Martins,P2,22;Artur,P2,28;Júnior Santos,A2,31;Arthur Cabral,A3,27;Igor Jesus,A2,25',
CAM:'Everson,G2,35;Gabriel Delfim,G4,25;Lyanco,Z2,29;Ruan,Z3,27;Vitor Hugo,Z3,35;Natanael,L3,28;Caio Paulista,L2,27;Renan Lodi,L2,28;Mariano,L4,39;Alan Franco,V2,28;Otávio,V3,29;Igor Gomes,M3,27;Gustavo Scarpa,M1,32;Bernard,M3,33;Hulk,A1,39;Paulinho,A1,26;Rony,A2,31;Cuello,P3,25;Biel,P3,25',
FLU:'Fábio,G2,45;Vitor Eudes,G4,24;Thiago Silva,Z1,41;Freytes,Z2,27;Ignácio,Z3,27;Manoel,Z3,34;Samuel Xavier,L3,35;Gabriel Fuentes,L2,28;Renê,L3,34;Hércules,V2,26;Martinelli,V2,24;Nonato,V3,25;Facundo Bernal,V3,23;Lima,M2,28;Jhon Arias,P1,28;Germán Cano,A1,38;Kevin Serna,P2,25;Keno,P2,36;Everaldo,A3,34;John Kennedy,A3,23;Canobbio,P2,27',
SAO:'Rafael,G2,36;Arboleda,Z2,34;Sabino,Z2,28;Ferraresi,Z2,27;Rafael Tolói,Z3,35;Wendell,L2,32;Cédric Soares,L3,34;Igor Vinícius,L2,29;Pablo Maia,V3,23;Marcos Antônio,V2,25;Michel Araújo,M2,29;Oscar,M1,34;Lucas Moura,P2,33;Luciano,A2,32;Calleri,A1,32;André Silva,A3,29;Ryan Francisco,P3,23;Wellington Rato,P3,34',
COR:'Hugo Souza,G2,27;Matheus Donelli,G3,20;Cacá,Z3,26;André Ramalho,Z2,34;Gustavo Henrique,Z2,32;Félix Torres,Z2,29;Hugo,L3,34;Matheuzinho,L3,25;Fagner,L3,36;Raniele,V3,28;Breno Bidon,V3,20;Maycon,M3,29;Rodrigo Garro,M1,27;Memphis Depay,P1,32;Yuri Alberto,A1,25;Romero,P2,33;Talles Magno,P3,24;Héctor Hernández,A3,26',
GRE:'Tiago Volpi,G2,35;Kannemann,Z2,35;Jemerson,Z3,33;Gustavo Martins,Z3,31;Viery,Z3,29;Mayk,L3,29;Marlon,L3,28;Reinaldo,L3,36;Villasanti,V2,29;Arthur,M2,30;Cristaldo,M1,31;Carballo,M2,29;Alysson,P2,25;Amuzu,P2,26;Carlos Vinícius,A2,31;Pavón,P2,30;Edenílson,M3,35',
INT:'Sergio Rochet,G2,32;Anthoni,G3,22;Vitão,Z2,25;Juninho,Z3,28;Gabriel Mercado,Z3,38;Clayton Sampaio,Z2,29;Hugo Mallo,L3,35;Bruno Henrique,V2,35;Fernando,V2,28;Thiago Maia,V3,29;Ricardo Mathias,V3,22;Alan Patrick,M1,35;Wanderson,P2,31;Borré,A1,30;Enner Valencia,A1,36;Alerrandro,A2,26;Carlos de Pena,M2,24',
CRU:'Cássio,G2,39;Fabrício Bruno,Z2,30;Villalba,Z3,25;Jonathan Jesus,Z3,28;Kaiki Bruno,L3,23;Wesley Gasolina,L2,22;Lucas Romero,V2,31;Christian,V3,31;Lucas Silva,V3,32;Matheus Pereira,M1,30;Kaio Jorge,A2,24;Gabigol,A1,29;Bruno Rodrigues,A2,28;Arthur Gomes,P3,28',
BAH:'Marcos Felipe,G2,28;Gabriel Xavier,Z2,26;David Duarte,Z3,31;Luciano Juba,L2,26;Gilberto,L2,32;Jean Lucas,V2,27;Everton Ribeiro,M1,37;Cauly,M2,30;Willian José,A2,34;Erick Pulga,P2,26;Ademir,P2,25',
VAS:'León,G2,31;Léo,Z2,31;Robert Renan,Z2,22;João Victor,Z3,28;Paulo Henrique,L2,28;Lucas Piton,L2,25;Hugo Moura,V2,28;Jair,V3,30;Philippe Coutinho,M1,34;Rayan,P2,19;Vegetti,A1,33;David,A2,25;Payet,M2,38;Nuno Moreira,P2,26',
CAP:'Santos,G2,31;Thiago Heleno,Z3,38;Lucas Belezi,Z4,24;Léo Godoy,L3,30;Esquivel,L3,27;Fernandinho,V2,40;Christian,V3,28;Bruno Zapelli,M2,28;Cuello,M3,26;Mastriani,A2,27;Pablo,A2,34;Zapelli,M2,28',
SAN:'Brazão,G2,25;Gil,Z2,38;João Basso,Z3,29;Zé Ivaldo,Z3,28;JP Chermont,L3,24;Escobar,L3,27;Tomás Rincón,V2,38;Neymar,A1,34;Guilherme,M3,27;Soteldo,P2,28;Julio Furch,A2,36;Willian Arão,V3,34',
RBB:'Cleiton,G2,30;Eduardo Santos,Z3,26;Gustavo Marques,Z3,29;Juninho Capixaba,L3,30;Nathan Mendes,L3,23;Jhon Jhon,V3,24;Eric Ramires,V3,28;Lincoln,A2,26;Eduardo Sasha,A2,33;Thiago Borbas,A2,25;Helinho,P3,28',
VIT:'Lucas Arcanjo,G2,32;Camutanga,Z3,35;Neris,Z3,28;Zeca,L3,31;Raúl Cáceres,L3,26;Willian Oliveira,V3,31;Matheuzinho,V3,28;Osvaldo,P2,31;Renato Kayzer,A2,30;Erick,V3,29;Janderson,A3,26;Alerrandro,A2,26',
CFC:'Pedro Rangel,G2,25;Maurício Antônio,Z3,31;Jacy,Z3,29;Tinga,L3,31;Thiago Santos,V3,27;Sebastián Gómez,M2,32;Alef Manga,P2,30;Josué,V3,32;Pedro Rocha,A2,30;Gustavo Coutinho,M3,25'
};
const FN=['Gabriel','Lucas','Matheus','Pedro','João','Rafael','Bruno','Thiago','Felipe','Gustavo','Vinícius','Leonardo','Caio','Diego','Rodrigo','Eduardo','Henrique','Igor','Marcos','André','Carlos','Wesley','Davi','Arthur','Victor','Renan','Yuri','Éverton','Lucca','Ramon','Jonathan','Fabrício','Murilo','Otávio','Kaique','Alan','Ítalo','Nathan','Cauã','Ruan'];
const LN=['Silva','Santos','Oliveira','Souza','Lima','Pereira','Costa','Ribeiro','Alves','Barbosa','Rocha','Dias','Cardoso','Teixeira','Moreira','Nunes','Araújo','Martins','Gomes','Ferreira','Carvalho','Mendes','Freitas','Campos','Batista','Pinto','Lopes','Correia','Cavalcanti','Machado','Vieira','Andrade','Monteiro','Fonseca','Duarte','Nascimento','Borges','Melo','Rezende','Tavares'];
const PAPERS=['Diário do Apito','A Gazeta da Bola','Tribuna da Arquibancada','Jornal Escanteio','Folha do Gramado'];
const REPORTERS=['Marcos Vilela','Paula Brandão','Régis Tavares','Dani Cavalcanti','Otávio Prado','Letícia Nogueira','Cláudio Mattos Jr.'];
const PHILS=[['Direto','Bola longa, jogo físico e área cheia'],['Passe','Posse, troca de passes e paciência'],['Contra-ataque','Recuar e sair em velocidade'],['Pressão','Marcação alta e intensidade o jogo todo'],['Pontas','Jogo pelos lados e cruzamentos'],['Retranca','Bloco baixo, solidez e bola parada']];
// características: código → [nome, abreviação, filosofias que ela favorece]
const TN={
Ref:['Reflexo','Ref',['Retranca']],Pes:['Jogo com os pés','Pés',['Passe']],Sai:['Saída do gol','Sai',['Direto']],Pen:['Defesa de pênalti','Pên',[]],Aer:['Jogo aéreo','Aér',['Direto','Retranca']],
Des:['Desarme','Des',['Pressão','Retranca']],Mar:['Marcação','Mar',['Pressão','Retranca']],Cab:['Cabeceio','Cab',['Direto','Retranca']],Ant:['Antecipação','Ant',['Contra-ataque','Retranca']],Lid:['Liderança','Lid',['Retranca']],
Cru:['Cruzamento','Cru',['Pontas']],Vel:['Velocidade','Vel',['Contra-ataque','Pontas','Pressão']],Apo:['Apoio ao ataque','Apo',['Pontas','Passe']],Pas:['Passe','Pas',['Passe']],
Vis:['Visão de jogo','Vis',['Passe','Contra-ataque']],Arm:['Armação','Arm',['Passe']],Fin:['Finalização','Fin',['Contra-ataque','Direto']],Dri:['Drible','Dri',['Pontas','Passe','Contra-ataque']],
Fol:['Fôlego','Fôl',['Pressão']],Cha:['Chute de longe','Chu',['Direto']],Pos:['Posicionamento','Pos',['Passe','Contra-ataque']],For:['Força','For',['Direto','Pressão']],Cob:['Bola parada','Bpa',['Direto']]
};
const ROLETR={GOL:['Ref','Pes','Sai','Pen','Aer'],ZAG:['Des','Mar','Cab','Ant','Lid'],LAT:['Cru','Vel','Apo','Mar','Pas'],VOL:['Mar','Des','Fol','Pas','For'],MEI:['Vis','Arm','Pas','Dri','Cha','Fin'],PNT:['Vel','Dri','Cru','Fin'],ATA:['Fin','Cab','Pos','For','Vel','Dri']};
const GROUP={GOL:'GK',ZAG:'DEF',LAT:'DEF',VOL:'MID',MEI:'MID',PNT:'ATA',ATA:'ATA'};
const ROLEABB={GOL:'GOL',ZAG:'ZAG',LAT:'LAT',VOL:'VOL',MEI:'MEI',PNT:'PON',ATA:'ATA'};
const LETTER={G:'GOL',Z:'ZAG',L:'LAT',V:'VOL',M:'MEI',P:'PNT',A:'ATA'};
const PLAN={GOL:3,ZAG:5,LAT:4,VOL:3,MEI:4,PNT:3,ATA:4};

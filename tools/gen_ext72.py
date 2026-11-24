# Gera ext72.js: elencos REAIS (base de dados do chat de pesquisa) para as ligas principais.
# Uso (na raiz do repo): python3 -I tools/gen_ext72.py   -> escreve ext72.js ; depois bash build.sh
# Entradas em tools/data/: jogadores_jogo_v2.csv, overall_corrigido_v2.9.2.csv,
# transferencias_aplicadas_v2.9.csv (todos do Drive, pasta Resenha FC), wld.json (nomes dos clubes do jogo; gerado por tools/dump_wld.js).
# Quando o Henrique subir jogadores_jogo_v2_9_1.csv no Drive, trocar jog_v2.csv por ele e dispensar ovr292/transf.
import csv,json,re,unicodedata,collections,sys
D='tools/data/'
rd=lambda f:list(csv.DictReader(open(D+f,encoding='utf-8-sig')))
J=rd('jogadores_jogo_v2.csv');O=rd('overall_corrigido_v2.9.2.csv');T=rd('transferencias_aplicadas_v2.9.csv')
W=json.load(open(D+'wld.json'))
W['BRA']={'cl':['Palmeiras','Flamengo','Botafogo','Atlético-MG','Fluminense','São Paulo','Internacional','Grêmio','Corinthians','Cruzeiro','Bahia','Vasco','Athletico-PR','Santos','Bragantino','Vitória','Coritiba','Mirassol','Chapecoense','Remo']}  # v135: nomes do jogo (data.js CLUBS)
LG={'ENG':'GB1','ESP':'ES1','ITA':'IT1','GER':'L1','FRA':'FR1','POR':'PO1','ARG':'ARG1','MEX':'MEX1','KSA':'SA1',
    # v132: mais 12 ligas com elenco real na base. ATENÇÃO: Coreia é RSK1; KR1 na base é a CROÁCIA (supersport-hnl).
    'BRA':'BRA1',   # v135: Brasileirão Série A (elencos antigos do data.js saem)
    'NED':'NL1','BEL':'BE1','TUR':'TR1','SCO':'SC1','GRE':'GR1','DEN':'DK1','SUI':'C1','AUT':'A1','JPN':'JAP1','KOR':'RSK1','AUS':'AUS1','USA':'MLS1'}
def norm(s):
    s=unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()
    s=re.sub(r"[^a-z0-9 ]"," ",s)
    return ' '.join(w for w in s.split() if w not in('fc','cf','sc','ac','club','de','del','la','el','the','football','futbol','calcio','sad','cd','ud','rcd','ca','as','us','ss','ssc','afc','sv','vfb','vfl','fsv','tsg','1','1909','1907','1846','1899','1913','04','29','balompie','sporting','saudi','sport','sporting'))
# ---------- 1) estado "v2.9.2": base v2 + ajustes manuais + transferências ----------
P={x['player_id']:x for x in J}
for x in O:
    if x['player_id'] in P:
        P[x['player_id']].update(overall=x['overall'],potencial=x['potencial'],clube=x['clube'],liga_id=x['liga_id'])
ov={x['player_id'] for x in O}
nt=0
for x in T:
    p=P.get(x['player_id'])
    if p and x['player_id'] not in ov:
        p['clube']=x['clube_depois'];nt+=1
clubs_liga={}
for x in J:clubs_liga.setdefault(x['clube'],x['liga_id'])   # clube -> liga (pela base original)
# ---------- 2) mapa clube(base) -> clube(jogo) ----------
MAN={ # nome do jogo -> nome da base (casos difíceis)
 # v135: Brasil
 'Palmeiras':'Sociedade Esportiva Palmeiras','Flamengo':'Clube de Regatas do Flamengo','Botafogo':'S. A. F. Botafogo','Atlético-MG':'Clube Atlético Mineiro','Fluminense':'Fluminense Football Club','São Paulo':'São Paulo Futebol Clube','Internacional':'Sport Club Internacional','Grêmio':'Grêmio Foot-Ball Porto Alegrense','Corinthians':'Sport Club Corinthians Paulista','Cruzeiro':'Cruzeiro Esporte Clube','Bahia':'Esporte Clube Bahia','Vasco':'Club de Regatas Vasco da Gama','Athletico-PR':'Clube Atlético Paranaense','Santos':'Santos Futebol Clube','Bragantino':'Red Bull Bragantino','Vitória':'Esporte Clube Vitória','Coritiba':'Coritiba Foot Ball Club','Mirassol':'Mirasol Futebol Clube','Chapecoense':'Associação Chapecoense de Futebol','Remo':'Clube do Remo',
 'Inter de Milão':'Inter Milan','Milan':'AC Milan','Bayern de Munique':'Bayern Munich','Olympique de Marselha':'Olympique Marseille','Lyon':'Olympique Lyon',
 'Paris Saint-Germain':'Paris Saint-Germain','Tottenham':'Tottenham Hotspur','Newcastle':'Newcastle United','West Ham':'West Ham United','Brighton':'Brighton & Hove Albion',
 'Wolverhampton':'Wolverhampton Wanderers','Estudiantes':'Club Estudiantes de La Plata','Central Córdoba':'Club Atlético Central Córdoba','Racing':'Racing Club Asociación Civil de Avellaneda',
 'Independiente':'Club Atlético Independiente de Avellaneda','Vélez Sarsfield':'Club Atlético Vélez Sársfield','San Lorenzo':'Club Atlético San Lorenzo de Almagro','Huracán':'Club Atlético Huracán',
 'Atlético de San Luis':'Atlético de San Luis','Atlético San Luis':'Atlético de San Luis','Club América':'CF América','Guadalajara':'Deportivo Guadalajara','Pumas UNAM':'UNAM Pumas','León':'Club León FC','Atlas':'Atlas Guadalajara',
 'Toluca':'Deportivo Toluca','Pachuca':'CF Pachuca','Cruz Azul':'CD Cruz Azul','Monterrey':'CF Monterrey','Tijuana':'Club Tijuana','Necaxa':'Club Necaxa','NEOM SC':'Neom Sports Club',
 'Damac':'Damac Football Club','Al-Khaleej':'Al-Khaleej Club (Saihat)','Al-Riyadh':'Al-Riyadh Saudi Club','Borussia Mönchengladbach':'Borussia Mönchengladbach','Hamburgo':'Hamburger SV','Köln':'1.FC Köln','Stuttgart':'VfB Stuttgart',
 'Estrela da Amadora':'CF Estrela Amadora','Nacional da Madeira':'CD Nacional','Alverca':'FC Alverca','Vitória de Guimarães':'Vitória Guimarães SC','Famalicão':'FC Famalicão','Mainz 05':'1.FSV Mainz 05','Union Berlin':'1.FC Union Berlin','St. Pauli':'FC St. Pauli','Heidenheim':'1. Fußballclub Heidenheim 1846',
 'Hoffenheim':'TSG 1899 Hoffenheim','Girona':'Girona FC','Real Betis':'Real Betis Balompié','Espanyol':'RCD Espanyol Barcelona','Alavés':'Deportivo Alavés','Osasuna':'CA Osasuna','Celta de Vigo':'Celta de Vigo','Barcelona':'FC Barcelona','Lazio':'Società Sportiva Lazio S.p.A.','Roma':'Associazione Sportiva Roma','Juventus':'Juventus FC','Napoli':'SSC Napoli',
 'Sassuolo':'US Sassuolo','Pisa':'Pisa Sporting Club','Bologna':'Bologna Football Club 1909','Parma':'Parma Calcio 1913','Atalanta':'Atalanta BC','Como':'Como 1907','Genoa':'Genoa CFC','Cremonese':'US Cremonese','Lecce':'US Lecce','Udinese':'Udinese Calcio','Cagliari':'Cagliari Calcio',
 'Brest':'Stade Brestois 29','Rennes':'Stade Rennais FC','Toulouse':'FC Toulouse','Monaco':'AS Monaco','Lille':'LOSC Lille','Strasbourg':'RC Strasbourg Alsace','Auxerre':'AJ Auxerre','Nice':'OGC Nice','Lens':'RC Lens','Le Havre':'Le Havre AC','Metz':'FC Metz','Lorient':'FC Lorient','Nantes':'FC Nantes','Angers':'Angers SCO','Paris FC':'Paris FC',
 # v132: novas ligas
 'Ajax':'Ajax Amsterdam','N.E.C.':'NEC Nijmegen','Union SG':'Union Saint-Gilloise','OH Leuven':'Oud-Heverlee Leuven','Cercle Brugge':'Cercle Brugge',
 'Fenerbahçe':'Fenerbahce','Kasımpaşa':'Kasimpasa','Olympiacos':'Olympiakos Syndesmos Filathlon Peiraios','AEK Athens':'Athlitiki Enosi Konstantinoupoleos',
 'PAOK':'Panthessalonikios Athlitikos Omilos Konstantinoupoliton','OFI':'Omilos Filathlon Irakliou FC','Volos':'Volou Neos Podosferikos Syllogos',
 'Nordsjælland':'FC Nordsjaelland','Brøndby':'Bröndby IF','AGF':'Aarhus GF','OB':'Odense Boldklub','Sønderjyske':'Sönderjyske Fodbold',
 'Grasshoppers':'Grasshopper Club Zurich','Rapid Wien':'Rapid Vienna','Austria Wien':'Austria Vienna','GAK':'Grazer AK 1902',
 'Yokohama F. Marinos':'Yokohama Marinos','Kyoto Sanga':'Kyoto Purple Sanga','Ulsan HD':'Ulsan Hyundai Football Club','Newcastle Jets':'Newcastle United Jets',
 'Inter Miami':'Club Internacional de Fútbol Miami','LAFC':'Los Angeles Football Club','New York Red Bulls':'Red Bull New York','Orlando City':'Orlando City Soccer Club',
 'San Diego FC':'San Diego Football Club','CF Montréal':'Club de Foot Montréal',
 'Sunderland':'Sunderland AFC','Villarreal':'Villarreal CF','Levante':'Levante UD','Werder Bremen':'SV Werder Bremen',"Newell's Old Boys":'Club Atlético Newell’s Old Boys','Al-Ahli':'Al-Ahli Saudi Football Club','Braga':'SC Braga','Porto':'FC Porto','Benfica':'SL Benfica','Estoril':'GD Estoril Praia','Casa Pia':'Casa Pia AC','Arouca':'FC Arouca','Rio Ave':'Rio Ave FC','Gil Vicente':'Gil Vicente FC','Moreirense':'Moreirense FC','Santa Clara':'CD Santa Clara','Tondela':'CD Tondela','Boavista':'Boavista FC',
}
alldb=sorted({x['clube'] for x in J if x['gerado']=='0'})
def find(game,k):
    cand=[c for c in alldb if clubs_liga.get(c)==LG[k]]
    if game in MAN and MAN[game] in alldb:return MAN[game]
    g=norm(game)
    ex=[c for c in cand if norm(c)==g]
    if ex:return ex[0]
    sub=[c for c in cand if g and (g in norm(c) or norm(c) in g)]
    if len(sub)==1:return sub[0]
    if sub:return sorted(sub,key=lambda c:abs(len(norm(c))-len(g)))[0]
    return None
mp={};miss=[]
for k in LG:
    for g in W[k]['cl']:
        d=find(g,k)
        if d:mp[g]=(k,d)
        else:miss.append((k,g))
import os
if os.environ.get('MAPA'):print({g:d for g,(k,d) in mp.items() if k in os.environ['MAPA'].split(',')});print('clubes mapeados:',len(mp),'| sem par:',miss)
# ---------- 3) papéis ----------
def role(x):
    s=x['subposicao'];p=x['posicao']
    if p=='GK':return 'GOL'
    if s=='Centre-Back':return 'ZAG'
    if s in('Left-Back','Right-Back'):return 'LAT'
    if s=='Defensive Midfield':return 'VOL'
    if s in('Central Midfield','Attacking Midfield'):return 'MEI'
    if s in('Left Winger','Right Winger','Left Midfield','Right Midfield'):return 'PNT'
    if s in('Centre-Forward','Second Striker'):return 'ATA'
    return {'DEF':'ZAG','MEI':'MEI','ATA':'ATA'}.get(p)   # v132: sem posição na base = fica de fora (antes virava meia, inclusive goleiro)
PLAN={'GOL':3,'ZAG':5,'LAT':4,'VOL':3,'MEI':4,'PNT':3,'ATA':4}
NAT={'England':'ENG','Germany':'GER','Argentina':'ARG','Portugal':'POR','Netherlands':'NED','Spain':'ESP','Brazil':'BRA','France':'FRA','Angola':'ANG','Italy':'ITA','Croatia':'CRO','Bosnia-Herzegovina':'BIH','Mexico':'MEX','Poland':'POL','Saudi Arabia':'KSA','Belgium':'BEL','Chile':'CHI','Switzerland':'SUI','Finland':'FIN','Uruguay':'URU','United States':'USA','Wales':'WAL','Austria':'AUT','Slovenia':'SVN','Armenia':'ARM','Hungary':'HUN','Gabon':'GAB',"Cote d'Ivoire":'CIV','Canada':'CAN','Ireland':'IRL','Denmark':'DEN','Norway':'NOR','Colombia':'COL','Serbia':'SRB','Slovakia':'SVK','Ecuador':'ECU','Luxembourg':'LUX','Costa Rica':'CRC','Venezuela':'VEN','Algeria':'ALG','Albania':'ALB','Senegal':'SEN','Czech Republic':'CZE','Morocco':'MAR','Kosovo':'KOS','New Zealand':'NZL','Cameroon':'CMR','Egypt':'EGY','Sweden':'SWE','Scotland':'SCO','Tunisia':'TUN','Greece':'GRE','Türkiye':'TUR','DR Congo':'COD','Mali':'MLI','Central African Republic':'CTA','Australia':'AUS','Honduras':'HON','Burkina Faso':'BFA','Cape Verde':'CPV','Estonia':'EST','Equatorial Guinea':'EQG','Japan':'JPN','Romania':'ROU','Togo':'TOG','Nigeria':'NGA','North Macedonia':'MKD','Guadeloupe':'GLP','French Guiana':'GUF','Guinea':'GUI','Tanzania':'TAN','Georgia':'GEO','Suriname':'SUR','Montenegro':'MNE','Syria':'SYR','Mauritania':'MTN','Ghana':'GHA','Ukraine':'UKR','Paraguay':'PAR','Dominican Republic':'DOM','Benin':'BEN','Mozambique':'MOZ','Panama':'PAN','New Caledonia':'NCL','Indonesia':'IDN','Russia':'RUS','Korea, South':'KOR','Cyprus':'CYP','Iceland':'ISL','Congo':'CGO','Guinea-Bissau':'GNB','Jamaica':'JAM','Niger':'NIG','Bulgaria':'BUL','Comoros':'COM','Haiti':'HAI','Lithuania':'LTU','South Africa':'RSA','Israel':'ISR','Zimbabwe':'ZIM','The Gambia':'GAM','Zambia':'ZAM','Northern Ireland':'NIR','Libya':'LBY','Malaysia':'MAS','Jordan':'JOR','Iraq':'IRQ','Latvia':'LVA','Belarus':'BLR','Burundi':'BDI','Puerto Rico':'PUR','Uzbekistan':'UZB','Curacao':'CUW','Madagascar':'MAD','Moldova':'MDA','Peru':'PER','Yemen':'YEM','Trinidad and Tobago':'TRI','Kenya':'KEN','Sierra Leone':'SLE','Thailand':'THA','Guatemala':'GUA','Lebanon':'LIB','Sudan':'SDN','Cuba':'CUB'}
def nat3(n):return NAT.get(n) or (re.sub('[^A-Z]','',n.upper())+'XXX')[:3]
# ---------- 4) craques calibrados (ext57) por cima ----------
st=open('ext57.js',encoding='utf-8').read()
STARS=[(a,b,c,int(d),int(e),f) for a,b,c,d,e,f in re.findall(r"\['([^']+)','(\w{3})','([^']+)',(\d+),(\d+),'(\w+)'\]",st)]
def key(s):
    t=norm(s).split()
    return t[-1] if t else ''
MANUAL={norm(x['nome']) for x in O if x.get('ajuste_manual')=='1'}
# v132: ajustes manuais do dono (ajustes_manuais_overall_v2.9.2.csv) têm a palavra final sobre o overall
AJ=rd('ajustes_manuais_overall_v2.9.2.csv')
MANOV={norm(x['jogador']):int(x['overall']) for x in AJ if x.get('overall','').strip().isdigit()}
DONO={'Marc-André ter Stegen':79}  # v135: decisão do Henrique no chat (mínimo 75; emprestado ao Ajax)
MANOV.update({norm(k):v for k,v in DONO.items()})
MANUAL|=set(MANOV)
# ---------- 5) monta elencos ----------
by=collections.defaultdict(list)
for x in P.values():
    if x['gerado']!='0':continue
    by[x['clube']].append(x)
out={};short=[]
for g,(k,d) in mp.items():
    pl=[]
    for x in by.get(d,[]):
        try:ovr=int(float(x['overall']));pot=int(float(x['potencial'] or ovr))
        except:continue
        if not role(x):continue
        pl.append(dict(n=x['nome'],r=role(x),a=int(round(float(x['idade']))),o=ovr,p=max(ovr,pot),nat=nat3(x['nacionalidade']),v=round(float(x['valor_eur'] or 0)/1e6,1)))
    for p in pl:
        if norm(p['n']) in MANOV:p['o']=MANOV[norm(p['n'])];p['p']=max(p['p'],p['o'])
    names={norm(p['n']):p for p in pl}
    for (nm,r,club,o,a,nt) in STARS:
        if club!=g:continue
        if norm(nm) in MANUAL:continue   # v132: ajuste manual do dono (overall_corrigido, ajuste_manual=1) vale mais que o craque calibrado antigo
        c=[p for p in pl if norm(p['n'])==norm(nm)] or [p for p in pl if key(p['n'])==key(nm) and p['r']==r]
        if c:c[0].update(o=o,a=a,r=r,nat=nt,p=max(o,c[0]['p']),n=nm)
        else:pl.append(dict(n=nm,r=r,a=a,o=o,p=o,nat=nt,v=round(max(5,(o-60)*(o-60)/6.0),1)))
    sel=[]
    for r,n in PLAN.items():
        sel+=sorted([p for p in pl if p['r']==r],key=lambda p:-p['o'])[:n]
    # sobras: melhores restantes entram como reservas extras (até 30)
    rest=sorted([p for p in pl if p not in sel],key=lambda p:-p['o'])[:max(0,30-len(sel))]
    sel+=rest
    cnt=collections.Counter(p['r'] for p in sel)
    if len(pl)<20:short.append((g,len(pl)))
    if len(pl)<18:continue   # v132: clube sem elenco de verdade na base (ex.: ligado por engano) fica com o elenco gerado
    out[g]=';'.join('|'.join(map(str,[p['n'].replace(';',',').replace('|','/'),p['r'][0] if p['r']!='PNT' else 'P',p['a'],p['o'],p['p'],p['nat'],p['v']])) for p in sel)
print('elencos:',len(out),'| curtos:',short)
MAN72={x['jogador']:int(x['overall']) for x in AJ if x.get('overall','').strip().isdigit()}
MAN72.update(DONO)
js='/* ext72 (v89+, v132): elencos REAIS (ENG ESP ITA GER FRA POR ARG MEX KSA NED BEL TUR SCO GRE DEN SUI AUT JPN KOR AUS USA). GERADO por tools/gen_ext72.py: não editar à mão.\n   Formato: "Nome|papel|idade|overall|potencial|nacionalidade|valor R$ mi equivalente (EUR mi)";... papel: G Z L V M P A */\nconst RS72='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n/* ajustes manuais do dono (nome -> overall), aplicados também no Brasil por ext97 */\nconst MAN72='+json.dumps(MAN72,ensure_ascii=False,separators=(',',':'))+';\n'
# v134: estádio real (nome) dos clubes ligados à base, vindo de clubes_jogo_v2.9.csv. Só nome; a capacidade do jogo não muda (mexeria em receita).
CJ={x['clube']:x for x in rd('clubes_jogo_v2.9.csv')}
STAD72={g:CJ[d]['estadio'] for g,(k,d) in mp.items() if d in CJ and CJ[d]['estadio'].strip() and CJ[d]['gerado']=='0'}
js+="\n/* v134: estádios reais (nome) por clube do jogo */\nconst STAD72="+json.dumps(STAD72,ensure_ascii=False)+";\n"
print('estádios:',len(STAD72))
open('ext72.js','w',encoding='utf-8').write(js)
print('ext72.js',len(js),'bytes')

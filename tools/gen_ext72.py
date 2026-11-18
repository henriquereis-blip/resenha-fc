# Gera ext72.js: elencos REAIS (base de dados do chat de pesquisa) para as ligas principais.
# Uso (na raiz do repo): python3 -I tools/gen_ext72.py   -> escreve ext72.js ; depois bash build.sh
# Entradas em tools/data/: jog_v2.csv (jogadores_jogo_v2.csv do Drive), ovr292.csv (overall_corrigido_v2.9.2),
# transf.csv (transferencias_aplicadas_v2.9), wld.json (nomes dos clubes do jogo; gerado por tools/dump_wld.js).
# Quando o Henrique subir jogadores_jogo_v2_9_1.csv no Drive, trocar jog_v2.csv por ele e dispensar ovr292/transf.
import csv,json,re,unicodedata,collections,sys
D='tools/data/'
rd=lambda f:list(csv.DictReader(open(D+f,encoding='utf-8-sig')))
J=rd('jog_v2.csv');O=rd('ovr292.csv');T=rd('transf.csv')
W=json.load(open(D+'wld.json'))
LG={'ENG':'GB1','ESP':'ES1','ITA':'IT1','GER':'L1','FRA':'FR1','POR':'PO1','ARG':'ARG1','MEX':'MEX1','KSA':'SA1'}
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
print({g:d for g,(k,d) in mp.items() if k in('ARG','MEX','KSA','POR')});print('clubes mapeados:',len(mp),'| sem par:',miss)
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
    return {'DEF':'ZAG','MEI':'MEI','ATA':'ATA'}.get(p,'MEI')
PLAN={'GOL':3,'ZAG':5,'LAT':4,'VOL':3,'MEI':4,'PNT':3,'ATA':4}
NAT={'England':'ENG','Germany':'GER','Argentina':'ARG','Portugal':'POR','Netherlands':'NED','Spain':'ESP','Brazil':'BRA','France':'FRA','Angola':'ANG','Italy':'ITA','Croatia':'CRO','Bosnia-Herzegovina':'BIH','Mexico':'MEX','Poland':'POL','Saudi Arabia':'KSA','Belgium':'BEL','Chile':'CHI','Switzerland':'SUI','Finland':'FIN','Uruguay':'URU','United States':'USA','Wales':'WAL','Austria':'AUT','Slovenia':'SVN','Armenia':'ARM','Hungary':'HUN','Gabon':'GAB',"Cote d'Ivoire":'CIV','Canada':'CAN','Ireland':'IRL','Denmark':'DEN','Norway':'NOR','Colombia':'COL','Serbia':'SRB','Slovakia':'SVK','Ecuador':'ECU','Luxembourg':'LUX','Costa Rica':'CRC','Venezuela':'VEN','Algeria':'ALG','Albania':'ALB','Senegal':'SEN','Czech Republic':'CZE','Morocco':'MAR','Kosovo':'KOS','New Zealand':'NZL','Cameroon':'CMR','Egypt':'EGY','Sweden':'SWE','Scotland':'SCO','Tunisia':'TUN','Greece':'GRE','Türkiye':'TUR','DR Congo':'COD','Mali':'MLI','Central African Republic':'CTA','Australia':'AUS','Honduras':'HON','Burkina Faso':'BFA','Cape Verde':'CPV','Estonia':'EST','Equatorial Guinea':'EQG','Japan':'JPN','Romania':'ROU','Togo':'TOG','Nigeria':'NGA','North Macedonia':'MKD','Guadeloupe':'GLP','French Guiana':'GUF','Guinea':'GUI','Tanzania':'TAN','Georgia':'GEO','Suriname':'SUR','Montenegro':'MNE','Syria':'SYR','Mauritania':'MTN','Ghana':'GHA','Ukraine':'UKR','Paraguay':'PAR','Dominican Republic':'DOM','Benin':'BEN','Mozambique':'MOZ','Panama':'PAN','New Caledonia':'NCL','Indonesia':'IDN','Russia':'RUS','Korea, South':'KOR','Cyprus':'CYP','Iceland':'ISL','Congo':'CGO','Guinea-Bissau':'GNB','Jamaica':'JAM','Niger':'NIG','Bulgaria':'BUL','Comoros':'COM','Haiti':'HAI','Lithuania':'LTU','South Africa':'RSA','Israel':'ISR','Zimbabwe':'ZIM','The Gambia':'GAM','Zambia':'ZAM','Northern Ireland':'NIR','Libya':'LBY','Malaysia':'MAS','Jordan':'JOR','Iraq':'IRQ','Latvia':'LVA','Belarus':'BLR','Burundi':'BDI','Puerto Rico':'PUR','Uzbekistan':'UZB','Curacao':'CUW','Madagascar':'MAD','Moldova':'MDA','Peru':'PER','Yemen':'YEM','Trinidad and Tobago':'TRI','Kenya':'KEN','Sierra Leone':'SLE','Thailand':'THA','Guatemala':'GUA','Lebanon':'LIB','Sudan':'SDN','Cuba':'CUB'}
def nat3(n):return NAT.get(n) or (re.sub('[^A-Z]','',n.upper())+'XXX')[:3]
# ---------- 4) craques calibrados (ext57) por cima ----------
st=open('ext57.js',encoding='utf-8').read()
STARS=[(a,b,c,int(d),int(e),f) for a,b,c,d,e,f in re.findall(r"\['([^']+)','(\w{3})','([^']+)',(\d+),(\d+),'(\w+)'\]",st)]
def key(s):
    t=norm(s).split()
    return t[-1] if t else ''
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
        pl.append(dict(n=x['nome'],r=role(x),a=int(round(float(x['idade']))),o=ovr,p=max(ovr,pot),nat=nat3(x['nacionalidade']),v=round(float(x['valor_eur'] or 0)/1e6,1)))
    names={norm(p['n']):p for p in pl}
    for (nm,r,club,o,a,nt) in STARS:
        if club!=g:continue
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
    out[g]=';'.join('|'.join(map(str,[p['n'].replace(';',',').replace('|','/'),p['r'][0] if p['r']!='PNT' else 'P',p['a'],p['o'],p['p'],p['nat'],p['v']])) for p in sel)
print('elencos:',len(out),'| curtos:',short)
js='/* ext72 (v89+): elencos REAIS das ligas principais (ENG ESP ITA GER FRA POR ARG MEX KSA). GERADO por tools/gen_ext72.py: não editar à mão.\n   Formato: "Nome|papel|idade|overall|potencial|nacionalidade|valor R$ mi equivalente (EUR mi)";... papel: G Z L V M P A */\nconst RS72='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';\n'
open('ext72.js','w',encoding='utf-8').write(js)
print('ext72.js',len(js),'bytes')

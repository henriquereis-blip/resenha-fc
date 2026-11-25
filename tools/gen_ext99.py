# Gera ext99.js: elencos REAIS (Wikipedia, via tools/wiki_squads.py) das ligas que a base do chat de pesquisa não cobre.
# Uso (raiz do repo): python3 -I tools/gen_ext99.py   -> escreve ext99.js ; depois bash build.sh
# A Wikipedia não tem overall: o overall é distribuído em tempo de jogo (ext99.js) a partir da força que o jogo já calibra para o clube.
import json,hashlib,collections,sys
sys.path.insert(0,'tools');import fifa   # v138: overall do FC26 é a fonte principal; o que não casa fica estimado no jogo
D='tools/data/'
R=json.load(open(D+'wiki_squads.json'))
def h(s,n):return int(hashlib.md5(s.encode()).hexdigest(),16)%n
def roles(sq):
    """posição Wikipedia (G/D/M/F) + número da camisa -> papel do jogo (G Z L V M P A)."""
    out=[]
    for p in sq:
        n=p['num'];ps=p['pos']
        if ps=='G':r='G'
        elif ps=='D':r='L' if n in(2,3,13,15,16,17,21,22,23,26,28) and h(p['n'],3)>0 else 'Z'
        elif ps=='M':r='V' if n in(5,6,8,14,15,18,20,21,23,25,29) and h(p['n'],3)>0 else 'M'
        else:r='P' if n in(7,11,10,17,19,20,21,22,27,30,31,37) and h(p['n'],3)>0 else 'A'
        out.append(r)
    return out
def mkage(p):
    return p['age'] if p.get('age') and 15<=p['age']<=42 else 20+h(p['n'],13)   # sem idade na Wikipedia: 20 a 32, estável por nome
out={};skip=[];FN=[0,0]
for key,v in R.items():
    k,name=key.split('/',1)
    sq=sorted(v['sq'],key=lambda p:p['num'])[:32]   # elenco grande demais (base e reservas) é cortado: camisas baixas primeiro
    if len(sq)<18:skip.append((key,len(sq)));continue
    rs=roles(sq)
    fo=[fifa.lookup(p['n'],p.get('age')) for p in sq]
    FN[0]+=sum(1 for x in fo if x);FN[1]+=len(fo)
    out[name]=';'.join('|'.join(map(str,[p['n'].replace(';',',').replace('|','/'),r,mkage(p),p['nat'],p['num'],o or 0])) for p,r,o in zip(sq,rs,fo))
# ---------- v138: divisões baixas montadas DIRETO do FC26 (sem Wikipedia): ENG3 (League One), ENG4 (League Two), GER3 (3. Liga) ----------
import csv,re,ast,unicodedata
W2=json.load(open(D+'wld2.json'))
NATD=ast.literal_eval(re.search(r"^NAT=(\{.*\})$",open('tools/gen_ext72.py',encoding='utf-8').read(),re.M).group(1))
NATD.update({'Holland':'NED','Korea Republic':'KOR','China PR':'CHN','Republic of Ireland':'IRL','Turkey':'TUR',"Côte d'Ivoire":'CIV','Bosnia and Herzegovina':'BIH','Congo DR':'COD','Cape Verde Islands':'CPV','Gambia':'GAM','Curaçao':'CUW','Bolivia':'BOL','India':'IND','Azerbaijan':'AZE','Peru':'PER','Korea, South':'KOR'})
ROLE={'GK':'G','CB':'Z','RB':'L','LB':'L','CDM':'V','CM':'M','CAM':'M','LM':'P','RM':'P','LW':'P','RW':'P','ST':'A','CF':'A'}
FR=list(csv.DictReader(open(D+'ea_fc26_players.csv',encoding='utf-8-sig')))
LGS={'ENG3':('England',{'Premier League','EFL Championship','EFL League One','EFL League Two'}),'ENG4':('England',{'Premier League','EFL Championship','EFL League One','EFL League Two'}),
     'GER3':('Germany',{'Bundesliga','Bundesliga 2','3. Liga'})}
ALIAS={'Milton Keynes Dons':'MK Dons','Cambridge United':'Cambridge Utd','Wycombe Wanderers':'Wycombe','Ingolstadt':'FC Ingolstadt 04','Erzgebirge Aue':'Erzgebirge Aue','Wehen Wiesbaden':'Wehen Wiesbaden',
       'Hallescher FC':'Hallescher FC','Viktoria Köln':'Viktoria Köln','Osnabrück':'VfL Osnabrück','Jahn Regensburg':'SSV Jahn Regensburg','Saarbrücken':'1. FC Saarbrücken','1860 München':'1860 München'}
GEN={'fc','afc','sc','sv','vfl','vfb','ssv','tsv','fsv','fcn','cf','the','1','04','ii'}
def nn(x):
    x=unicodedata.normalize('NFD',x).encode('ascii','ignore').decode().lower();return {w for w in re.findall('[a-z0-9]+',x) if w not in GEN}
direct={};dmiss=[]
for key,(ctry,lgset) in LGS.items():
    teams=collections.defaultdict(list)
    for r in FR:
        if r['leagueName'] in lgset:teams[r['team']].append(r)
    tn={t:nn(t) for t in teams}
    for g in W2.get(key,{}).get('cl',[]):
        if g.endswith(' II'):dmiss.append((key,g,'reserva'));continue
        gn=nn(ALIAS.get(g,g));c=[t for t in teams if tn[t]==gn] or [t for t in teams if tn[t] and (tn[t]<=gn or gn<=tn[t]) and len(tn[t]&gn)>=1]
        if len(c)!=1:dmiss.append((key,g,c));continue
        pl=sorted(teams[c[0]],key=lambda r:-int(r['overallRating']))[:32]
        if len(pl)<18:dmiss.append((key,g,len(pl)));continue
        rows=[]
        for r in pl:
            nm=(r['commonName'] or (r['firstName']+' '+r['lastName'])).strip().replace(';',',').replace('|','/')
            yr=int(re.search(r'/(\d{4})',r['birthdate']).group(1))
            rows.append('|'.join(map(str,[nm,ROLE.get(r['position'],'M'),2026-yr,NATD.get(r['nationality'],re.sub('[^A-Z]','',r['nationality'].upper())[:3] or 'XXX'),99,int(r['overallRating'])])))
        direct[g]=';'.join(rows)
out.update({k:v for k,v in direct.items() if k not in out})
print('direto do FC26:',len(direct),'clubes | sem par:',dmiss)
js=('/* ext99 (v136): elencos REAIS (nome, posição, idade, nacionalidade) de ligas fora da base do chat de pesquisa. GERADO por tools/gen_ext99.py a partir de tools/wiki_squads.py (Wikipedia): não editar à mão.\n'
    '   Formato: "Nome|papel|idade|nat|camisa|overall". Overall = FC26 quando casou (0 = não casou): aí o hook distribui o overall que o jogo já calibrou para o clube (melhor camisa/idade = melhor overall). */\n'
    'const RSW='+json.dumps(out,ensure_ascii=False)+';\n')
js+=open('tools/ext99_tpl.js').read()
open('ext99.js','w',encoding='utf-8').write(js)
print('FC26 casou',FN[0],'de',FN[1],'jogadores');print('ext99.js',len(js),'bytes;',len(out),'clubes; pulados (<18 jogadores):',skip)

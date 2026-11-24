# Coleta elencos REAIS (nome, posição, nacionalidade, idade) da Wikipedia para as ligas que a base do chat de pesquisa não cobre.
# Uso (raiz do repo): python3 -I tools/wiki_squads.py [LIGA ...]   -> escreve tools/data/wiki_squads.json
# Precisa de en.wikipedia.org liberado na rede. NÃO traz overall: ele é estimado depois (tools/gen_ext99.py).
import json,re,subprocess,sys,html,urllib.parse,datetime,os,concurrent.futures as cf
D='tools/data/'
W=json.load(open(D+'wld.json'))
OUT=D+'wiki_squads.json'
CTRY={'URU':'Uruguay','COL':'Colombia','CHI':'Chile','PAR':'Paraguay','ECU':'Ecuador','PER':'Peru','BOL':'Bolivia','VEN':'Venezuela','CHN':'China','EGY':'Egypt','MAR':'Morocco','RSA':'South Africa',
      'POR':'Portugal','ARG':'Argentina','NED':'Netherlands','BEL':'Belgium','TUR':'Turkey','SCO':'Scotland','KOR':'South Korea','AUT':'Austria','SUI':'Switzerland','GRE':'Greece','DEN':'Denmark'}
# clubes soltos de ligas que já têm elenco real na base, mas ficaram sem (menos de 18 jogadores)
LOOSE={'POR':['Boavista'],'ARG':['Godoy Cruz'],'NED':['Willem II','Cambuur','ADO Den Haag'],'BEL':['Beveren','Kortrijk','Lommel SK'],'TUR':['Amedspor','Çorum','Erzurumspor'],
       'SCO':['St Johnstone'],'KOR':['Daejeon Hana Citizen'],'AUT':['Austria Lustenau'],'SUI':['Vaduz'],'GRE':['Iraklis','Kalamata'],'DEN':['Horsens','Lyngby']}
LEAGUES=['URU','COL','CHI','PAR','ECU','PER','BOL','VEN','CHN','EGY','MAR','RSA']+list(LOOSE)
TITLE={}   # ajuste manual: nome do jogo -> título exato na Wikipedia (preencher quando a busca errar)
if os.path.exists(D+'wiki_titles.json'):TITLE=json.load(open(D+'wiki_titles.json'))
def get(url,t=25):
    r=subprocess.run(['curl','-s','-L','-m',str(t),'-A','ResenhaFC-data/1.0 (jogo de futebol, uso educativo)',url],capture_output=True)
    return r.stdout.decode('utf-8','ignore')
def api(**kw):
    return json.loads(get('https://en.wikipedia.org/w/api.php?format=json&'+urllib.parse.urlencode(kw)) or '{}')
def find_title(name,k):
    if name in TITLE:return TITLE[name]
    base=re.sub(r'\s*\(.*?\)|-[A-Z]{3}$','',name).strip()
    for q in (base+' '+CTRY[k]+' football club',base+' F.C. '+CTRY[k],base+' football club'):
        j=api(action='query',list='search',srsearch=q,srlimit=5)
        for h in j.get('query',{}).get('search',[]):
            tl=h['title'];sn=re.sub('<.*?>','',h.get('snippet',''))
            if re.search(r'season|league|cup|derby|list of|history|ultras|Copa|Primera|Super|Division',tl,re.I):continue
            if re.search(r'football|soccer|club',sn+tl,re.I):return tl
    return None
POS={'GK':'G','DF':'D','MF':'M','FW':'F'}
def squad(title):
    h=get('https://en.wikipedia.org/wiki/'+urllib.parse.quote(title.replace(' ','_')),40)
    out=[]
    for tb in re.findall(r'<table class="wikitable football-squad.*?</table>',h,re.S):
        for tr in re.findall(r'<tr class="vcard agent">(.*?)</tr>',tb,re.S):
            tds=re.findall(r'<td[^>]*>(.*?)</td>',tr,re.S)
            if len(tds)<4:continue
            num=re.sub('<.*?>','',tds[0]).strip();pos=re.search(r'<abbr title="[^"]*">([A-Z]{2})</abbr>',tds[1])
            nat=re.findall(r'>([A-Z]{3})</a>',tds[2]);nm=re.search(r'class="fn">(.*?)</span>',tds[3],re.S)
            if not(pos and nm):continue
            link=re.search(r'href="https://en\.wikipedia\.org/wiki/([^"#]+)"',nm.group(1))
            out.append({'n':html.unescape(re.sub('<.*?>','',nm.group(1))).strip(),'pos':POS.get(pos.group(1),'M'),'nat':nat[0] if nat else 'XXX','num':int(num) if num.isdigit() else 99,
                        'pg':urllib.parse.unquote(link.group(1)) if link and 'redlink' not in nm.group(1) else None})
        if out:break   # primeira tabela de elenco = elenco principal (as seguintes são emprestados/sub-20)
    return out
def age(pg):
    if not pg:return None
    j=json.loads(get('https://en.wikipedia.org/api/rest_v1/page/summary/'+urllib.parse.quote(pg),20) or '{}')
    m=re.search(r'born[^0-9]{0,12}(\d{1,2} \w+ )?(\d{4})',j.get('extract',''))
    if not m:return None
    return datetime.date(2026,11,24).year-int(m.group(2))
def one(item):
    k,name=item
    t=find_title(name,k)
    if not t:return k,name,None,[]
    s=squad(t)
    with cf.ThreadPoolExecutor(8) as ex:ages=list(ex.map(lambda p:age(p['pg']),s))
    for p,a in zip(s,ages):p['age']=a;p.pop('pg')
    return k,name,t,s
if __name__=='__main__':
    sel=sys.argv[1:] or LEAGUES
    res=json.load(open(OUT)) if os.path.exists(OUT) else {}
    items=[(k,c) for k in sel for c in (W[k]['cl'] if k in W and k not in LOOSE else LOOSE.get(k,[]))]
    items+=[(k,c) for k in sel if k in LOOSE and k in W for c in LOOSE[k]] if False else []
    items=[(k,c) for k,c in items if f'{k}/{c}' not in res or not res[f'{k}/{c}']['sq']] if os.environ.get('RETRY') else items
    with cf.ThreadPoolExecutor(6) as ex:
        for k,name,t,s in ex.map(one,items):
            res[f'{k}/{name}']={'title':t,'sq':s};print(k,name,'->',t,len(s),'idade ok:',sum(1 for p in s if p['age']),flush=True)
    json.dump(res,open(OUT,'w'),ensure_ascii=False,indent=0)

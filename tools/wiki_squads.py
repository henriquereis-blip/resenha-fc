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
import time
LAST=[0.0]
def get(url,t=40):
    # educado com a Wikipedia: no máximo ~1 requisição por segundo, espera e tenta de novo no 429
    for tent in range(6):
        w=1.1-(time.time()-LAST[0])
        if w>0:time.sleep(w)
        LAST[0]=time.time()
        r=subprocess.run(['curl','-s','-L','-m',str(t),'-A','ResenhaFC-data/1.0 (jogo de futebol, uso educativo)',url],capture_output=True)
        txt=r.stdout.decode('utf-8','ignore')
        if 'too many requests' in txt.lower() or not txt.strip():time.sleep(20*(tent+1));continue
        return txt
    return ''
def api(**kw):
    try:return json.loads(get('https://en.wikipedia.org/w/api.php?format=json&'+urllib.parse.urlencode(kw)) or '{}')
    except Exception:return {}
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
    """Aceita os dois modelos de tabela da Wikipedia (football-squad novo e a tabela antiga 'Current squad')."""
    h=get('https://en.wikipedia.org/wiki/'+urllib.parse.quote(title.replace(' ','_')),40)
    ft=h.find('wikitable football-squad')
    hp=[m.start() for m in re.finditer(r'<h2[^>]*>\s*(?:<[^>]*>)*\s*(?:Players|Squad|Current squad|First[- ]team)',h)]
    i0=hp[-1] if hp else (ft-60 if ft>=0 else -1)
    if i0<0:return []
    seg=h[i0:];end=len(seg)
    for m in re.finditer(r'<h([23])[^>]*>(.*?)</h\1>',seg[10:],re.S):
        t=re.sub('<.*?>','',m.group(2))
        if m.group(1)=='2' and not re.match(r'\s*(Players|Squad|Current squad|First)',t) or re.search(r'loan|other|youth|academy|reserve|former|retired|transfer|manag|coach|out\b',t,re.I):end=m.start()+10;break
    seg=seg[:end]
    out=[]
    for tr in re.findall(r'<tr[^>]*>(.*?)</tr>',seg,re.S):
        tds=re.findall(r'<td[^>]*>(.*?)</td>',tr,re.S)
        if len(tds)<4:continue
        num=re.sub('<.*?>','',tds[0]).strip()
        if not num.isdigit():continue
        txt=[re.sub('<.*?>','',t).strip() for t in tds[:3]]
        pos=next((x for x in txt[1:] if x in POS),None);nat=next((x for x in txt[1:] if re.fullmatch(r'[A-Z]{3}',x) and x not in POS),'XXX')
        nm=re.search(r'class="fn">(.*?)</span>',tds[3],re.S)
        if not(pos and nm):continue
        link=re.search(r'href="https://en\.wikipedia\.org/wiki/([^"#]+)"',nm.group(1))
        out.append({'n':html.unescape(re.sub('<.*?>','',nm.group(1))).strip(),'pos':POS[pos],'nat':nat,'num':int(num),
                    'pg':urllib.parse.unquote(link.group(1)) if link and 'redlink' not in nm.group(1) else None})
    return out
def ages(pgs):
    """pgs: lista de títulos (ou None). Devolve {titulo: idade} usando 'born ... AAAA' do resumo; 20 títulos por requisição."""
    out={};ts=[p for p in pgs if p]
    for i in range(0,len(ts),20):
        j=api(action='query',prop='extracts',exintro=1,explaintext=1,exlimit=20,redirects=1,titles='|'.join(ts[i:i+20]))
        Q=j.get('query',{});red={r['from']:r['to'] for r in Q.get('redirects',[])+Q.get('normalized',[])}
        ex={p['title']:p.get('extract','') for p in Q.get('pages',{}).values()}
        for t in ts[i:i+20]:
            m=re.search(r'born[^0-9]{0,14}(?:\d{1,2} \w+ |\w+ \d{1,2}, )?(\d{4})',ex.get(red.get(t,t),ex.get(t.replace('_',' '),'')) or '')
            if m:out[t]=2026-int(m.group(1))
    return out
def one(item):
    k,name=item
    t=find_title(name,k)
    if not t:return k,name,None,[]
    s=squad(t);A=ages([p['pg'] for p in s])
    for p in s:p['age']=A.get(p['pg']);p.pop('pg')
    return k,name,t,s
if __name__=='__main__':
    sel=sys.argv[1:] or LEAGUES
    res=json.load(open(OUT)) if os.path.exists(OUT) else {}
    items=[(k,c) for k in sel for c in (LOOSE[k] if k in LOOSE else W[k]['cl'])]
    for k,name in items:
        if len(res.get(f'{k}/{name}',{}).get('sq') or [])>=18:continue   # já coletado: retoma de onde parou
        k,name,t,s=one((k,name));res[f'{k}/{name}']={'title':t,'sq':s}
        print(k,name,'->',t,len(s),'idade ok:',sum(1 for p in s if p['age']),flush=True)
        json.dump(res,open(OUT,'w'),ensure_ascii=False,indent=0)

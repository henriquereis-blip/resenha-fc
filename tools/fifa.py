# Overall do EA Sports FC 26 (tools/data/ea_fc26_players.csv, do Kaggle 'justdhia/ea-sports-fc-26-player-ratings') como FONTE PRINCIPAL de overall.
# A pesquisa (planilhas do chat de pesquisa, Wikipedia) só preenche o que o FC26 não tem. Decisão do Henrique (25/11/2026).
# Os ajustes manuais do dono (MANOV) continuam valendo acima de tudo (tratados fora daqui).
# Uso: from fifa import lookup ; lookup(nome, idade_ou_None) -> overall ou None. Rodar com python3 -I a partir da raiz (sys.path inclui tools/).
import csv,re,unicodedata,collections,os
_F=None
def norm(s):
    s=unicodedata.normalize('NFD',s).encode('ascii','ignore').decode().lower()
    return ' '.join(re.findall('[a-z0-9]+',s))
def _load():
    global _F
    if _F is not None:return _F
    p=os.path.join('tools','data','ea_fc26_players.csv')
    full=collections.defaultdict(list);ini=collections.defaultdict(list)
    if os.path.exists(p):
        for r in csv.DictReader(open(p,encoding='utf-8-sig')):
            try:o=int(r['overallRating']);yr=int(re.search(r'/(\d{4})',r['birthdate']).group(1))
            except Exception:continue
            age=2026-yr
            e=(o,age,norm(r['team']))
            for k in {norm((r['firstName']+' '+r['lastName']).strip()),norm(r['commonName'])}:
                if k:full[k].append(e)
            fn=norm(r['firstName']).split();ln=norm(r['lastName']).split()
            if fn and ln:ini[fn[0][0]+' '+ln[-1]].append(e)
    _F=(full,ini);return _F
def lookup(name,age=None):
    full,ini=_load();k=norm(name)
    c=full.get(k)
    if not c:
        t=k.split()
        if len(t)>=2:c=ini.get(t[0][0]+' '+t[-1])
        strict=True
    else:strict=False
    if not c:return None
    if age is not None:
        near=[e for e in c if abs(e[1]-age)<=(1 if strict else 2)]
        if len(near)>=1:return max(near)[0] if len(near)==1 else sorted(near,key=lambda e:abs(e[1]-age))[0][0]
        return None if (strict or len(c)>1) else c[0][0]
    return c[0][0] if len(c)==1 and not strict else None

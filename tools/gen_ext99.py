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
js=('/* ext99 (v136): elencos REAIS (nome, posição, idade, nacionalidade) de ligas fora da base do chat de pesquisa. GERADO por tools/gen_ext99.py a partir de tools/wiki_squads.py (Wikipedia): não editar à mão.\n'
    '   Formato: "Nome|papel|idade|nat|camisa|overall". Overall = FC26 quando casou (0 = não casou): aí o hook distribui o overall que o jogo já calibrou para o clube (melhor camisa/idade = melhor overall). */\n'
    'const RSW='+json.dumps(out,ensure_ascii=False)+';\n')
js+=open('tools/ext99_tpl.js').read()
open('ext99.js','w',encoding='utf-8').write(js)
print('FC26 casou',FN[0],'de',FN[1],'jogadores');print('ext99.js',len(js),'bytes;',len(out),'clubes; pulados (<18 jogadores):',skip)

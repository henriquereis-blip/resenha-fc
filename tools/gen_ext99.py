# Gera ext99.js: elencos REAIS (Wikipedia, via tools/wiki_squads.py) das ligas que a base do chat de pesquisa não cobre.
# Uso (raiz do repo): python3 -I tools/gen_ext99.py   -> escreve ext99.js ; depois bash build.sh
# A Wikipedia não tem overall: o overall é distribuído em tempo de jogo (ext99.js) a partir da força que o jogo já calibra para o clube.
import json,hashlib,collections
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
out={};skip=[]
for key,v in R.items():
    k,name=key.split('/',1)
    sq=sorted(v['sq'],key=lambda p:p['num'])[:32]   # elenco grande demais (base e reservas) é cortado: camisas baixas primeiro
    if len(sq)<18:skip.append((key,len(sq)));continue
    rs=roles(sq)
    out[name]=';'.join('|'.join(map(str,[p['n'].replace(';',',').replace('|','/'),r,mkage(p),p['nat'],p['num']])) for p,r in zip(sq,rs))
js=('/* ext99 (v136): elencos REAIS (nome, posição, idade, nacionalidade) de ligas fora da base do chat de pesquisa. GERADO por tools/gen_ext99.py a partir de tools/wiki_squads.py (Wikipedia): não editar à mão.\n'
    '   Formato: "Nome|papel|idade|nat|camisa". Overall NÃO vem da fonte: o hook distribui o overall que o jogo já calibrou para o clube (melhor camisa/idade = melhor overall). */\n'
    'const RSW='+json.dumps(out,ensure_ascii=False)+';\n')
js+=open('tools/ext99_tpl.js').read()
open('ext99.js','w',encoding='utf-8').write(js)
print('ext99.js',len(js),'bytes;',len(out),'clubes; pulados (<18 jogadores):',skip)

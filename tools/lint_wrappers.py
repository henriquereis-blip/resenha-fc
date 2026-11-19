# trava wrappers crus novos: o número só pode DIMINUIR. Recurso novo usa hookAfter/hookBefore/hookAround (core.js).
import re,glob,sys
LIM=13
n=0;where=[]
for f in sorted(glob.glob('ext*.js')+glob.glob('ui*.js')):
    k=len(re.findall(r'const _\w+=(\w+);\1=function',open(f,encoding='utf-8').read()))
    if k:where.append((f,k));n+=k
print('wrappers crus:',n,'(limite',LIM,')')
if n>LIM:print('FALHA: wrapper cru novo. Use hookAfter/hookBefore/hookAround.');sys.exit(1)

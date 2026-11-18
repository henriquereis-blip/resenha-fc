# converte wrappers empilhados (const _x=fn;fn=function(params){...}) em hookAround/hookAfter/hookBefore. Preserva ordem.
import re,glob,sys
SKIP=set('stepMinute power salOf ex valueOf P C clamp mi'.split())
files=[f for f in sorted(glob.glob('ext*.js'))]
decl=set()
for f in glob.glob('*.js'):
    if re.match(r'(data|logic|ext\d*|ui\d*)\.js$',f):
        decl|=set(re.findall(r'(?:^|\n)function (\w+)\(',open(f,encoding='utf-8').read()))
tot=0;skipped=[]
pat=re.compile(r'const (_\w+)=(\w+);\2=function\(([^)]*)\)\{')
for f in files:
    s=open(f,encoding='utf-8').read();out=[];pos=0;ch=False
    while True:
        m=pat.search(s,pos)
        if not m:out.append(s[pos:]);break
        var,fn,pr=m.group(1),m.group(2),m.group(3).strip()
        i=m.end();d=1
        while d and i<len(s):
            c=s[i]
            if c=='{':d+=1
            elif c=='}':d-=1
            elif c in '\'"`':
                q=c;i+=1
                while i<len(s) and s[i]!=q:
                    if s[i]=='\\':i+=1
                    i+=1
            i+=1
        body=s[m.end():i-1];end=i
        if s[end:end+1]==';':end+=1
        calls=re.findall(re.escape(var)+r'(?:\.apply\([^()]*\)|\.call\([^()]*\)|\([^()]*\))?',body)
        ok=fn in decl and fn not in SKIP and body.count(var)==len(re.findall(re.escape(var)+r'(?:\.apply\((?:this|null),[^()]*\)|\([^()]*\))',body)) and len(calls)>=1 and '...' not in pr and 'const a=arguments' not in body and not re.search(r'\b_?%s\b(?!\s*\()'%re.escape(var),re.sub(re.escape(var)+r'(?:\.apply\([^()]*\)|\([^()]*\))','',body))
        if ok:
            def rep(mm):
                t=mm.group(0)
                am=re.match(re.escape(var)+r'\.apply\((?:this|null),\s*(.*)\)$',t,re.S)
                if am:
                    x=am.group(1).strip()
                    return 'next()' if x=='arguments' else 'next(...%s)'%x
                return 'next(%s)'%t[len(var)+1:-1]
            inner=re.sub(re.escape(var)+r'(?:\.apply\((?:this|null),[^()]*\)|\([^()]*\))',rep,body)
            inner=re.sub(r'\barguments\b','A',inner)
            pre=('let [%s]=A;'%pr) if pr else ''
            lab=f[:-3]+'_'+var.lstrip('_')
            out.append(s[pos:m.start()]+"hookAround('%s','%s',function(next,A){%s%s});"%(fn,lab,pre,inner))
            tot+=1;ch=True
        else:
            skipped.append((f,var,fn));out.append(s[pos:end])
        pos=end
    if ch:open(f,'w',encoding='utf-8').write(''.join(out))
print('convertidos',tot,'pulados',len(skipped))
for x in skipped:print(' ',x)

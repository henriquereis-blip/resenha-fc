# converte wrappers empilhados (const _x=fn;fn=function(params){...}) em hookAround. Preserva ordem; confere sintaxe e tenta wrapper a wrapper.
import re,glob,subprocess,tempfile,os
SKIP=set('stepMinute power salOf valueOf P C clamp mi'.split())
decl=set()
for f in glob.glob('*.js'):
    if re.match(r'(data|logic|ext\d*|ui\d*)\.js$',f):
        t=open(f,encoding='utf-8').read()
        decl|=set(re.findall(r'(?:^|\n)function (\w+)\(',t))|set(re.findall(r'(?:^|\n)var (\w+)\s*=',t))|set(re.findall(r'(?:^|\n)(\w+)=function\(',t))
pat=re.compile(r'const (_\w+)=(\w+);\2=function\(([^)]*)\)\{')
def syntax_ok(txt):
    fd,p=tempfile.mkstemp(suffix='.js');os.write(fd,txt.encode());os.close(fd)
    r=subprocess.run(['node','--check',p],capture_output=True);os.unlink(p);return r.returncode==0
def match_end(s,i):
    d=1;prev=''
    while d and i<len(s):
        c=s[i]
        if c=='/' and s[i+1:i+2]=='/':
            i=s.find('\n',i);i=len(s) if i<0 else i;continue
        if c=='/' and s[i+1:i+2]=='*':
            i=s.find('*/',i+2)+2;continue
        if c=='/' and prev in '(,=:[!&|?{};\n' :
            i+=1
            while i<len(s) and s[i]!='/' :
                if s[i]=='\\':i+=1
                elif s[i]=='[':
                    while s[i]!=']':
                        if s[i]=='\\':i+=1
                        i+=1
                i+=1
            i+=1;prev='x';continue
        if c in '\'"`':
            q=c;i+=1
            while i<len(s) and s[i]!=q:
                if s[i]=='\\':i+=1
                i+=1
            i+=1;prev='x';continue
        if c=='{':d+=1
        elif c=='}':d-=1
        if not c.isspace():prev=c
        i+=1
    return i
def convert(s,allowed):
    out=[];pos=0;idx=-1;conv=[];skipped=[]
    while True:
        m=pat.search(s,pos)
        if not m:out.append(s[pos:]);break
        idx+=1
        var,fn,pr=m.group(1),m.group(2),m.group(3).strip()
        i=match_end(s,m.end());body=s[m.end():i-1];end=i
        body=re.sub(r'const a=arguments;','',body)
        if s[end:end+1]==';':end+=1
        callre=re.escape(var)+r'(?:\.apply\((?:this|null),[^()]*\)|\([^()]*\))'
        n_all=len(re.findall(re.escape(var)+r'\b',body))
        ok=(allowed is None or idx in allowed) and fn in decl and fn not in SKIP and n_all>=1 and n_all==len(re.findall(callre,body)) and '...' not in pr and 'const a=arguments' not in body
        if ok:
            def rep(mm):
                t=mm.group(0)
                am=re.match(re.escape(var)+r'\.apply\((?:this|null),\s*(.*)\)$',t,re.S)
                if am:
                    x=am.group(1).strip()
                    return 'next()' if x in ('arguments','a') else 'next(...%s)'%x
                return 'next(%s)'%t[len(var)+1:-1]
            inner=re.sub(callre,rep,body)
            inner=re.sub(r'\barguments\b','__a',inner)
            pre=('let [%s]=__a;'%pr) if pr else ''
            lab=var.lstrip('_')
            out.append(s[pos:m.start()]+"hookAround('%s','%s',function(next,__a){%s%s});"%(fn,lab,pre,inner))
            conv.append(idx)
        else:
            skipped.append((idx,var,fn));out.append(s[pos:end])
        pos=end
    return ''.join(out),conv,skipped
tot=0;allskip=[]
for f in sorted(glob.glob('ext*.js'))+sorted(glob.glob('ui*.js')):
    s=open(f,encoding='utf-8').read()
    new,conv,sk=convert(s,None)
    if not conv:allskip+= [(f,)+x for x in sk];continue
    if not syntax_ok(new):
        acc=set()
        for k in conv:
            t,c2,_=convert(s,acc|{k})
            if syntax_ok(t):acc.add(k)
        new,conv,sk=convert(s,acc)
    if conv:
        open(f,'w',encoding='utf-8').write(new);tot+=len(conv)
    allskip+=[(f,)+x for x in sk]
print('convertidos',tot,'pulados',len(allskip))
for x in allskip:print(' ',x[0],x[2],x[3])

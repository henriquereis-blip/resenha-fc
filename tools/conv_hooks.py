# converte wrappers "pós" multi-linha em hookAfter (ordem preservada). Uso: python3 -I tools/conv_hooks.py nomeDaFuncao...
import re,glob,sys
fns=sys.argv[1:]
tot=0;skipped=[]
for f in sorted(glob.glob('ext*.js')):
    s=open(f,encoding='utf-8').read();out=[];pos=0;ch=False
    for fn in fns:
        pass
    pat=re.compile(r'const (_\w+)=(%s);\2=function\(\)\{'%'|'.join(fns))
    while True:
        m=pat.search(s,pos)
        if not m:out.append(s[pos:]);break
        # brace match
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
        var,fn=m.group(1),m.group(2)
        mm=re.match(r'\s*const (\w+)=%s(?:\.apply\(this,arguments\)|\.apply\(null,\w+\)|\(\));'%re.escape(var),body)
        mr=re.search(r'return (\w+);?\s*$',body)
        if mm and mr and mr.group(1)==mm.group(1) and body.count(var)==1:
            rv=mm.group(1);inner=body[mm.end():mr.start()]
            inner=re.sub(r'\barguments\b','A',inner)
            lab=f[:-3]+'_'+var.lstrip('_')
            out.append(s[pos:m.start()]+"hookAfter('%s','%s',function(%s,A){%s});"%(fn,lab,rv,inner))
            tot+=1;ch=True
        elif re.search(r'return %s(?:\.apply\(this,arguments\)|\(\));?\s*$'%re.escape(var),body) and body.count(var)==1 and 'return' not in body[:body.rfind('return')] and 'arguments' not in body[:body.rfind('return')]:
            inner=body[:body.rfind('return')]
            lab=f[:-3]+'_'+var.lstrip('_')
            out.append(s[pos:m.start()]+"hookBefore('%s','%s',function(){%s});"%(fn,lab,inner))
            tot+=1;ch=True
        elif len(re.findall(r'%s(?:\.apply\((?:this|null),(?:arguments|\w+)\)|\(\))'%re.escape(var),body))==1 and body.count(var)==1 and not re.search(r'\barguments\b',re.sub(r'%s\.apply\(this,arguments\)'%re.escape(var),'',body)) and not re.search(r'const a=arguments',body):
            inner=re.sub(r'%s(?:\.apply\((?:this|null),(?:arguments|\w+)\)|\(\))'%re.escape(var),'next()',body)
            lab=f[:-3]+'_'+var.lstrip('_')
            out.append(s[pos:m.start()]+"hookAround('%s','%s',function(next,A){%s});"%(fn,lab,inner))
            tot+=1;ch=True
        else:
            skipped.append((f,var));out.append(s[pos:end])
        pos=end
    if ch:open(f,'w',encoding='utf-8').write(''.join(out))
print('convertidos',tot,'pulados',len(skipped))
for x in skipped:print(' ',x)

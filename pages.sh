#!/bin/bash
# gera index.html (versão PWA pro GitHub Pages) a partir do standalone
cd "$(dirname "$0")"; bash standalone.sh ../Resenha-FC.html >/dev/null
python3 - <<'PY'
s=open('../Resenha-FC.html').read()
s=s.replace('<meta name="theme-color"','<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icon-192.png"><meta name="theme-color"',1)
s=s.replace('</body>','<script>if("serviceWorker"in navigator&&/^https?:/.test(location.protocol))addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}))</script></body>',1)
open('index.html','w').write(s)
PY
cp pwa/manifest.webmanifest pwa/sw.js pwa/icon-180.png pwa/icon-192.png pwa/icon-512.png .

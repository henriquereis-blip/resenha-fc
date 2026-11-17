/* ui18: revisão completa de design — tema escuro estilo FIFA, tipografia única, cards limpos, navegação em pílulas */
(function(){const st=document.createElement('style');st.id='ds18';st.textContent=`
:root,:root:not([data-theme="light"]),:root[data-theme="dark"],:root[data-theme="light"]{
 --bg:#070b14;--card:#0e1525;--card2:#141d33;--fg:#eef2ff;--mut:#8d99b8;--line:#1f2b47;--accent:#35f0a0;--accent2:#ffd24a;--blue:#4f8cff;
 --bad:#ff5c70;--warn:#ffb84d;--ok:#35f0a0;--nav:#04070d;--navfg:#e8ecf8;--pitch:#2a8a3c;color-scheme:dark;
 --r:18px;--glow:0 6px 22px rgba(53,240,160,.28)}
html{background:#070b14}
body{background:radial-gradient(130% 55% at 50% -8%,#18294f 0%,#0b1226 42%,#070b14 75%) fixed;color:var(--fg);font-family:var(--fb);font-feature-settings:'tnum' 1,'kern' 1;-webkit-font-smoothing:antialiased;letter-spacing:.005em}
h2{font:800 22px/1.1 var(--fh);letter-spacing:.02em;text-transform:uppercase;margin:10px 0 2px;display:flex;align-items:center;gap:10px}
h2::before{content:"";width:5px;height:20px;border-radius:3px;background:linear-gradient(var(--accent),var(--blue));flex:0 0 auto}
h3{font:800 17px/1.15 var(--fh);letter-spacing:.01em;margin:0 0 6px}
.k,.sec,.fld{font:700 10.5px/1.2 var(--fh);letter-spacing:.12em;text-transform:uppercase;color:var(--mut)}
.news,.hint,.foot{color:var(--mut);font-size:12.5px;line-height:1.45}
.card{background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid #ffffff0e;border-radius:var(--r);padding:14px;box-shadow:0 10px 28px #0006,inset 0 1px 0 #ffffff0a}
.card .k:first-child{margin-bottom:8px}
.big,.bigtxt{font:800 30px/1 var(--fh);letter-spacing:-.01em}
.btn{background:linear-gradient(180deg,#52f7b4,#22d98a);color:#03150d;font:800 14px var(--fh);letter-spacing:.08em;border-radius:14px;padding:12px 18px;box-shadow:var(--glow);border:0;transition:transform .12s}
.btn:active{transform:scale(.97)}
.btn.big{font-size:15px;padding:15px}
.btn.sm{padding:7px 12px;font-size:11.5px;border-radius:10px}
.btn.ghost{background:#ffffff08;color:var(--fg);box-shadow:none;border:1px solid #ffffff1f}
.btn.ghost.on,.btn.on{border-color:var(--accent);color:var(--accent);background:#35f0a014}
.pill,.chip{font-family:var(--fh);font-weight:700;border-radius:99px;background:#35f0a01c;color:var(--accent);letter-spacing:.02em}
.meter,.mini{background:#ffffff12;height:7px;border-radius:9px}
.meter i,.mini i{background:linear-gradient(90deg,var(--blue),var(--accent));border-radius:9px}
.meter i.bad{background:linear-gradient(90deg,#ff8a5c,var(--bad))}.meter i.warn{background:linear-gradient(90deg,#ffd24a,var(--warn))}
.res{border-bottom:1px solid #ffffff0b;padding:9px 0;font-size:13.5px}.res:last-child{border-bottom:0}
.res b{font:800 15px var(--fh)}
.res.me{background:#35f0a012;border-radius:10px;padding-inline:8px}
.seg{background:#ffffff0a;border:0;border-radius:14px;padding:4px}
.seg button{font:700 12px var(--fh);letter-spacing:.06em;text-transform:uppercase;border-radius:10px;color:var(--mut);padding:9px 4px}
.seg button.on,.seg button.sel{background:linear-gradient(180deg,#52f7b4,#22d98a);color:#03150d;box-shadow:var(--glow)}
.back{font:700 12px var(--fh);letter-spacing:.1em;text-transform:uppercase;color:var(--mut);padding:6px 0}
.opt,.phil,.offer,.club,.mrow{background:#ffffff08;border:1px solid #ffffff12;border-radius:14px}
.opt:hover,.club.sel,.phil.sel{border-color:var(--accent);background:#35f0a010}
.plist,.tbl,.sqw{background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid #ffffff0e;border-radius:var(--r);box-shadow:0 10px 28px #0006}
.prow,.tr{border-bottom:1px solid #ffffff09}.prow.hd,.tr.hd{font:700 10px var(--fh);letter-spacing:.1em;color:var(--mut)}
.pos{color:var(--accent);font-family:var(--fh)}.ovr{font-family:var(--fh)}
input,select,textarea{background:#ffffff0a !important;color:var(--fg) !important;border:1px solid #ffffff1a !important;border-radius:12px !important}
input[type=range]{accent-color:var(--accent)}
.toast{background:#eef2ff;color:#070b14;font-family:var(--fh);letter-spacing:.02em;box-shadow:0 10px 30px #000a}
/* barra superior */
.top2{background:rgba(4,7,13,.86);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid #ffffff0f}
.top2 .ic{padding:2px 4px;gap:2px}
.top2 .ic button{min-width:54px;padding:6px 6px 5px;border-radius:12px;margin:3px 1px;opacity:.62;position:relative;transition:.15s}
.top2 .ic button span{font-size:19px;filter:saturate(.9)}
.top2 .ic button small{font:700 9.5px var(--fh);letter-spacing:.08em;text-transform:uppercase}
.top2 .ic button.on{opacity:1;background:#35f0a01a;color:var(--accent)}
.top2 .ic button.on::after{content:"";position:absolute;left:30%;right:30%;bottom:1px;height:2px;border-radius:2px;background:var(--accent)}
.top2 .dt{font:800 12px var(--fh);color:var(--accent2);letter-spacing:.06em}
/* navegação inferior */
.nav2{background:rgba(4,7,13,.9);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-top:1px solid #ffffff10}
.nav2 button{opacity:.6}.nav2 button.on{color:var(--accent);opacity:1}.nav2 small{font:700 9.5px var(--fh);letter-spacing:.1em;text-transform:uppercase}
.nav2 .go{background:linear-gradient(180deg,#52f7b4,#1fd283);color:#03150d;border-radius:20px;box-shadow:0 8px 26px rgba(53,240,160,.4);opacity:1}
.nav2 .go small{font-size:12px;letter-spacing:.14em}
/* faixa de conquistas */
.achb{background:linear-gradient(90deg,#ffd24a1f,#ffd24a0a);color:var(--accent2);font:700 11px var(--fh);letter-spacing:.06em;text-transform:uppercase;padding:6px 12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-bottom:1px solid #ffd24a26}
/* painel do clube na home */
.cpanel{border-radius:22px;box-shadow:0 14px 34px #0008,inset 0 1px 0 #ffffff22;border:1px solid #ffffff18}
.cpanel h2{font:800 28px var(--fh);text-transform:none;letter-spacing:-.01em}.cpanel h2::before{display:none}
.cp2{background:#0004;border-radius:12px;font-family:var(--fb)}
.bar2{border-radius:8px;border:0;background:#0006}
.nx{background:#05070d;border-radius:16px;border:1px solid #ffffff10}
.nxh{background:transparent;font-family:var(--fh);letter-spacing:.12em}
.bigbtn{background:linear-gradient(180deg,#52f7b4,#1fd283);color:#03150d;border:0;border-radius:14px;font:800 15px var(--fh);letter-spacing:.1em;box-shadow:var(--glow)}
.pc{background:#0005;border-radius:14px}
.hero{background:linear-gradient(135deg,#142a52,#0b4a3a);border:1px solid #ffffff14}
/* jornal moderno */
.gazeta{background:linear-gradient(180deg,#1a2543,#101a30);color:var(--fg);border:1px solid #ffffff10;border-left:4px solid var(--accent);border-radius:var(--r);padding:16px}
.mast,.mast.big{font:800 12px var(--fh);letter-spacing:.2em;text-transform:uppercase;color:var(--accent);border:0;text-align:left;margin:0 0 4px}
.dateline{font:600 10.5px var(--fh);letter-spacing:.12em;color:var(--mut);text-align:left;margin-bottom:10px}
.mh{font:800 26px/1.08 var(--fh);letter-spacing:-.01em;text-transform:none}
.gazeta .mh{display:block}
.by{font:600 11.5px var(--fb);font-style:normal;color:var(--mut);margin-top:8px}.sub{font-family:var(--fb);color:#c9d3ee;line-height:1.5;font-size:14px}
.cols article{background:linear-gradient(180deg,var(--card2),var(--card));color:var(--fg);border:1px solid #ffffff0d;border-radius:14px;padding:12px}
.cols h4{font:800 16px/1.2 var(--fh);margin:4px 0}.cols p{font-family:var(--fb);color:#b6c1de;font-size:13px}.cols small{color:var(--mut);font-size:11px}
.pp{font:700 10px var(--fh);letter-spacing:.14em;text-transform:uppercase;color:var(--accent)}
.paperc{background:linear-gradient(180deg,#1a2543,#101a30);color:var(--fg);border:1px solid #ffffff10}.paperc p{font-family:var(--fb)}.paperc .k{color:var(--mut)}
/* seletor de clube e início de carreira */
.logo{font:800 52px var(--fh);letter-spacing:-.02em}.logo span{background:linear-gradient(180deg,#52f7b4,#1fd283);color:#03150d}
.lead{color:var(--mut)}
/* troféus, conquistas */
.trp{background:linear-gradient(160deg,#4a3b12,#2a2108);color:var(--accent2);border:1px solid #ffd24a44}
.ach{background:linear-gradient(180deg,var(--card2),var(--card))}.ach.got{border-color:var(--accent2)}
/* cards de tela */
.x9 .kp,.x9 .fh{border-radius:var(--r)}
.x9 .fh{background:linear-gradient(150deg,#16305e,#0c4a3a)}
.x9 .sec9,.sec9{font:800 11px var(--fh);letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}
.k .fm,.fm{display:inline-grid;place-items:center;vertical-align:middle;margin-left:3px;letter-spacing:0}
.bar2 i{background:linear-gradient(90deg,#fff9,#fff)}
.bar2 b{font:800 11px var(--fh);color:#04070d;mix-blend-mode:normal;text-shadow:0 0 3px #fff8}
.card h3,.sec9 h3{font:800 14px/1.2 var(--fh);letter-spacing:.07em;text-transform:uppercase;color:#dfe6fb}
h2 .lk,h3 .lk,.mh .lk,.cpanel .lk{text-decoration:none}
.go15{cursor:pointer}
@media(min-width:760px){.wrap{max-width:900px}}
`;document.head.appendChild(st)})();

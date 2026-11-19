#!/bin/bash
# Regressão rápida do Resenha FC. Uso: bash test-all.sh [--base]  (--base grava a linha de base)
cd "$(dirname "$0")"
bash build.sh && bash pages.sh >/dev/null 2>&1
T="t75 t68 t73 t80 t90 t91 t92 t93 t94 t104 t105 t106 t108 t109 t110 t111 t112 t113 t114 t115 t116 t117 t118 t119"
OUT=.testout; mkdir -p $OUT; : > $OUT/summary.txt
run(){ timeout 600 node $1.js > $OUT/$1.txt 2>&1; echo "exit=$?" >> $OUT/$1.txt; }
i=0; for t in $T; do run $t & i=$((i+1)); if [ $((i%4)) -eq 0 ]; then wait; fi; done; wait
python3 -I tools/lint_wrappers.py || echo "== LINT FALHOU =="
fail=0
for t in $T; do
  f=$OUT/$t.txt
  bad=$(grep -ciE "TypeError|ReferenceError|is not defined|Cannot read|FALHA|Error:" $f)
  ex=$(grep -c "exit=0" $f)
  nf=$(grep -c "false" $f)
  echo "$t bad=$bad exit0=$ex falses=$nf" >> $OUT/summary.txt
done
if [ "$1" = "--base" ]; then cp $OUT/summary.txt $OUT/base.txt; fi
cat $OUT/summary.txt
if [ -f $OUT/base.txt ]; then diff $OUT/base.txt $OUT/summary.txt > $OUT/diff.txt && echo "== IGUAL À BASE ==" || { echo "== DIFERENTE DA BASE =="; cat $OUT/diff.txt; }; fi
grep -q "bad=[1-9]\|exit0=0" $OUT/summary.txt && echo "== TEM FALHA ==" || echo "== SEM FALHA =="

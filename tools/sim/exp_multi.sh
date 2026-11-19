#!/bin/bash
# Repete formação e estilo em várias carreiras (cada uma com elenco e IA diferentes), para separar efeito real de ruído.
cd "$(dirname "$0")"
for c in 1 2 3 4; do
  node exp_career.js 600 "$c" > multi_$c.json 2> multi_$c.err
  echo "career $c exit=$?"
done
echo ALLDONE

#!/bin/bash
cd /home/claude/sim
while ! grep -q ALLDONE /tmp/claude-0/-home-claude/13ae7e21-72ae-54ab-8b5e-c02163c86154/tasks/bo4m4avow.output 2>/dev/null; do sleep 10; done
for m in auto ativo; do
  node play_career.js $m Juventude 3 > v94/car_${m}_BRB.json 2>/dev/null
  node play_career.js $m Juventude 3 "ARG:Racing" > v94/car_${m}_ARG.json 2>/dev/null
  node play_career.js $m Juventude 3 "ENG:Brighton" > v94/car_${m}_ENG.json 2>/dev/null
done
echo PLAYDONE

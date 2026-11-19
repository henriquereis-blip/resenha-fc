# Resenha FC — instruções para o Claude Code

Jogo de manager de futebol estilo Brasfoot/Elifoot, em português do Brasil, celular primeiro.
Dono do projeto: Henrique. Ele prefere respostas diretas, em tom informal (gíria leve, sem formalidade).

## Regras de trabalho (obrigatórias)

- Responda em português informal e curto. Não faça relatório de esforço; diga o resultado e o próximo passo.
- Encadeie os passos sem perguntar, a menos que a decisão seja cara de desfazer ou ambígua. Quando escolher algo, diga qual escolheu.
- Antes de mudar código, rode a regressão. Depois de mudar, rode de novo.
- Cada mudança vira um commit com explicação do que mudou e por quê (e os números, se for balanceamento).
- Nunca commite direto na `main`. Crie uma branch (`vNN-assunto`), commite e dê push.
- Não peça para o Henrique testar até você estar 100% satisfeito com a versão.
- Não gere `resenha-fc-v2.html` no commit (já está no .gitignore) e não commite PNG.

## Comandos

- Build: `bash build.sh` (gera `resenha-fc-v2.html` a partir dos arquivos fonte).
- Páginas: `bash pages.sh` (gera `index.html`; pode retornar código diferente de zero, não encadeie com `&&`).
- Regressão completa: `bash test-all.sh` (build + pages + lint + 24 testes). Demora vários minutos e estoura o limite de 10 minutos de uma chamada normal. Rode em segundo plano:
  `nohup bash test-all.sh > /home/claude/sim/vNN_testX.log 2>&1 &`
  e acompanhe com Monitor procurando "SEM FALHA", "TEM FALHA", "LINT FALHOU" ou "DIFERENTE".
- Saídas da regressão: `.testout/` (linha de base em `.testout/base.txt`).
- Para regravar a linha de base quando o balanceamento mudou de propósito: `bash test-all.sh --base` (justifique no commit).
- Lint: o limite de wrappers crus é 13. Não crie `const _x = fn; fn = function...`; use os hooks de `core.js`.

## Mapa do código

Todos os arquivos `.js` são concatenados pelo `build.sh` na ordem: `head.html`, `data.js`, `logic.js`, `core.js`, `ext*.js`, `ui*.js`, `tail.js`.

- `data.js`: dados base (clubes, jogadores, ligas).
- `logic.js`: motor de partida e de campeonato.
  - `FORMS`: formações.
  - `power(m, side)`: força de cada lado da partida (ponto sensível de balanceamento).
  - `styleMod(my, opp)`: modificadores de estilo de jogo (Posse, Contra-ataque, Defensivo etc.).
  - `stepMinute(m)`: avanço de cada minuto, energia, lesões e notas.
  - `shouldFire(c)` e `boardRound(...)`: demissão e avaliação da diretoria.
- `core.js`: sistema de hooks (`hookBefore`, `hookAfter`, `hookAround`). Quase toda extensão usa hook, não edita a função original.
- `ext13.js`: escolha de formação e estilo dos times de IA (`AIFORMS`, `STY_BY_PHIL`, hook `newWorld`, hook `prepareRound`).
- `ext70.js`: `xiScore(c, f)` (encaixe do elenco na formação) e ações de auxiliar.
- `ext75.js`: proteção de demissão por hook de `shouldFire`.
- `ext11.js`: lesões dentro da partida.
- `ui*.js`: telas.
- `tools/`: scripts de dados.
- `supabase/`: login e saves na nuvem.

## Simulação para medir balanceamento

Ferramentas em `tools/sim/` (Playwright headless sobre o HTML gerado; rodar a partir da raiz do repo, precisa de `npm i playwright` e do chromium):
- `exp_form.js N` (medir formações; N partidas por par).
- `exp_career.js`, `exp_multi.sh` (carreiras de teste).
- `world_sim.js K` (K temporadas, mede campeões e anomalias).
- `play_career.js`.

Sempre que medir, guarde a saída em `tools/sim/out/` com o número da versão no nome e cite os números no commit.

## Estado atual

- Branch `v95-potencia-sem-vies-formacao`: `power()` sem bônus por contagem de jogadores (corrige viés de 3 zagueiros) v96 (formação da IA por encaixe, `ext81.js`) e v97 (nota do goleiro), v98 (zagueiro, Posse, explicação na tela), v99 (Bola de Ouro com títulos, convocações e jogos decisivos).
- Próximos itens da revisão, em ordem:
  1. ~~IA escolhe formação~~ feito na v96 (`ext81.js`): encaixe (`xiScore`) + filosofia + ruído; reavalia na nova temporada; troca na má fase (≥5 abaixo, rodadas %6==0). Medição: `tools/sim/exp_aiform.js`.
  2. ~~Goleiro com nota própria~~ feito na v97 (`logic.js` `stepMinute`): sem bônus de gol do time, defesa +0.15, gol sofrido −0.35. Medição: `tools/sim/exp_notas.js` e `exp_premios.js`. 
  3. ~~Posse com retorno real~~ feito na v98 (`styleMod` em `logic.js`, `styleWhy` em `ui13.js`): mid 1.12, def 1.04, rate 1.06; penalidade Filosofia×Estilo explicada na tela. Medição: `tools/sim/exp_estilo.js`. Pendente: Posse ainda não é o estilo mais forte (Ofensivo lidera).
  3b. Bola de Ouro (v99, `ext82.js`): nota média + títulos (+0.25 liga, +0.2 copa) + convocações (+0.03 por data, teto 0.15) + semifinal/final de copa. Pendente: Champions e finais estaduais ainda não contam jogo decisivo.
  4. Auxiliar com custo defensivo ou aviso (`ext70.js`).
  5. Calibragem de demissão (`ext75.js` e `shouldFire`): tolerância de meta+3 e proteção na primeira temporada até a rodada 19, a menos que a confiança seja menor que 15.
  6. Revisar notas de EUA e Austrália (valores de `r` e `b` no mundo).
  7. Testar a hipótese de formação fixa vs aleatória para IA, com experimento.

Documentos de referência do projeto (no Claude/Projeto): `claude/revisao-grande-v94.md`.

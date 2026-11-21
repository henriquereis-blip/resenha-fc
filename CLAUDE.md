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

## Base de dados (regra)

- As planilhas da pasta "Resenha FC" no Drive (clubes_jogo_v2, competicoes_clubes_v2, overall_corrigido_v2.x, ajustes_manuais_overall) foram montadas em OUTRO chat, por pesquisa. Servem de base, mas não são verdade absoluta: confira antes de usar.
- O dono do projeto dá a palavra final sobre dados. Se encontrar defeito numa planilha, sinalize e corrija com ele, não copie cegamente.
- Quando faltar dado (jogador, nome, elenco), pode gerar jogadores com nomes inventados do país, sem dizer que são reais.
- Não abrir nem usar planilhas de senhas pessoais (existe uma no Drive; não deve ser lida pelo projeto).

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

- Branch `v95-potencia-sem-vies-formacao`: `power()` sem bônus por contagem de jogadores (corrige viés de 3 zagueiros) v96 (formação da IA por encaixe, `ext81.js`) e v97 (nota do goleiro), v98 (zagueiro, Posse, explicação na tela), v99 (Bola de Ouro com títulos, convocações e jogos decisivos), v100 (aviso de formação com custo de zagueiro), v101 (Bola de Ouro com estadual e seleção), v102 (Posse mais forte), v103 (notas de Austrália e EUA), v104 (experimento de formação da IA), v105 (calibragem de demissão), v106 (demissão com tempo no cargo e aviso da diretoria), v107 (Bola de Ouro por torneio e tradição da seleção), v108 (eras táticas), v109 (Supercopa do Brasil), v110 (tradição das seleções pela forma recente), v111 (fase A: objetivos da diretoria por posição, orçamento ligado ao resultado, demissão pesa zona e clube grande), v112 (fase B: ingresso automático por competição com tiers A1/A2/B3), v113 (fase C: tutorial minimizável, tática mais limpa, aviso de fora de posição), v114 (fase D: estilo do jogador, SAF, gap financeiro comprimido, estádios do Brasil), v115 (Conquistas removida), v116 (prazo do garoto da base), v117 (garotos em meia estrela, curva de desenvolvimento até 21 anos), v118 (meta do garoto proporcional aos titulares do clube, superestrela rara), v119–v120 (contrato vencido no clube antigo; SAF estabiliza; vices de Copa; tutorial de busca), v121 (mundo abstrato menos dominado), v122 (finanças legíveis, era na tática, estádios de ENG e ARG), v123–v124 (carreiras de teste; impacto medido das táticas), v125–v127 (estabilidade do técnico; correção de elenco com id vazio).
- Pendências (atualizado v122):
  - Decisão do dono: opções de marcação e ataque (ver lista na conversa; nada implementado).
  - Decisão do dono: "conoleto" (não entendi o que é).
  - Painel de dívida 50%/30%: não existe no código (verificado: só pagamento automático em `ext14.js`).
  - Mundo simulado com partidas reais em todas as ligas: tarefa grande, não confirmada.
  - Estádios: ENG e ARG feitos; demais ligas e divisões inferiores não.
  - Base de dados: 18 países com nome de divisão genérico ("Divisão inferior"), AUS/SEL/SEU sem 2ª divisão, elencos reais só em 9 ligas. Aguardando decisão sobre geração de jogadores.
  - Demissão: 54% das temporadas em 3 carreiras de teste (`tools/sim/out/v123_carreira_*.json`). Após a regra de estabilidade (v125–v127): 54% a 58% em 16 carreiras, ainda acima da meta de 25–35%. A confiança da diretoria é o principal motor: falta decidir como ela cai e sobe.
  - BUG DE ORIGEM EM INVESTIGAÇÃO: elenco com id vazio (null) gerava crash na virada de temporada. Corrigido por proteção (`autoPick` e `newSeason` filtram ids inexistentes; `ext92` mantém 20 jogadores). A origem ainda não foi isolada (suspeitos: ids soltos de empréstimo e de clubes de cópia).
  - Caixa acumula sem sumidouro (Flamengo chegou a 357 mi no teste).
  - Teste de carreira usa script sem mercado nem renovação: o declínio do elenco é parcialmente artefato.
- Itens anteriores da revisão (já feitos):
  1. ~~IA escolhe formação~~ feito na v96 (`ext81.js`): encaixe (`xiScore`) + filosofia + ruído; reavalia na nova temporada; troca na má fase (≥5 abaixo, rodadas %6==0). Medição: `tools/sim/exp_aiform.js`.
  2. ~~Goleiro com nota própria~~ feito na v97 (`logic.js` `stepMinute`): sem bônus de gol do time, defesa +0.15, gol sofrido −0.35. Medição: `tools/sim/exp_notas.js` e `exp_premios.js`. 
  3. ~~Posse com retorno real~~ feito na v98 e ajustado na v102 (`styleMod` em `logic.js`, `styleWhy` em `ui13.js`): mid 1.18, def 1.06, rate 1.10. Pontos/jogo vs Equilibrado: 1,67 → 1,83. Ofensivo continua em 1,99 (é o estilo forte por desenho). Medição: `tools/sim/exp_estilo.js`.
  3b. Bola de Ouro (v99 e v101, `ext82.js`): nota média + títulos (+0.25 liga, +0.2 copa, +0.15 estadual) + convocações (+0.03 por data, teto 0.15) + semifinal/final de copa + fase do Brasil na Copa do Mundo e na Copa América (campeão +0.2). Não entram: Champions (simulada de forma abstrata e não tem clubes brasileiros), desempenho por jogo na seleção.
  4. ~~Auxiliar com custo defensivo~~ feito na v100 (`auxPick` em `ext70.js`): cada zagueiro que a sugestão tira da linha desconta 4 pontos; o aviso diz quantos saem. Medição: `tools/sim/exp_aux.js` (efeito na simulação não comprovado, dentro do ruído).
  5. ~~Calibragem de demissão~~ feito na v105 (`ext75.js`): proteção na primeira temporada até a rodada 19 (cai só com confiança < 15); tolerância meta+3. Medição (`tools/sim/exp_demissao.js`): NÃO reduziu demissões (85% → 92% das temporadas, dentro do ruído com 16 carreiras). Causa provável fora da regra: a confiança da diretoria cai rápido. Pendente: investigar a confiança (`G.board.conf`).
  6. ~~Revisar notas de EUA e Austrália~~ feito na v103: seleção AUS 66→68 (`NR0` em `ext23.js`, único valor usado nas partidas); clubes da A-League +3 (`ext37.js`, top 4 58,8→61,8); EUA mantido em 72 (o 73 de `ext38.js` era valor morto, virou 72).
  7. ~~Formação fixa vs dinâmica para IA~~ feito na v104: sem diferença na liga (correlação força×posição 0,689 fixa x 0,671 dinâmica; desvio 3,55 x 3,52; anomalias 13 x 13; 6 temporadas, 120 clubes). Mantida a dinâmica (`AIF81.on`, `tools/sim/exp_formIA.js`).

Documentos de referência do projeto (no Claude/Projeto): `claude/revisao-grande-v94.md`.

# Perguntas para o Henrique (bateria v139–v141)

Responda só o que quiser mudar. Onde eu decidi sozinho, digo o que escolhi.

## A. Decisões que eu tomei (confirme ou mande trocar)

1. **Demissão em 34%** (31 de 90 temporadas simuladas; meta 25–35%). Escolhi: consertar a regra de estabilidade (que nunca gravava nada) e limitar a "segunda chance" às datas oficiais. Faz sentido, ou você quer mais ou menos demissão?
2. **Clube do técnico cresce com o resultado** (`ext102`): +0,12 de reputação e +1,2% de patrocínio por posição acima da meta, campeão +0,8. Está forte, fraco ou bom?
3. **Orçamento de salários pelo resultado** (`ext85`, que nunca tinha agido): fator ×1,04 se bateu a meta, ×1,0 se ficou perto, ×0,97 se errou. Ok?
4. **Torcida** (`ext100`): ídolo vendido −3,5 a −11 de humor; derrota em casa −1 (−2 se time inferior ou goleada); sequência de 3+ ±0,75 a 1,5. Medição: humor médio 48,9 → 46,5 e mais rodadas em êxodo (12,3 → 15,6). Está bom ou quer mais leve?
5. **Painel de dívida:** o mínimo da diretoria é o do objetivo escolhido × fator pela dívida (1,0 / 0,8 / 0,5). Corinthians fica com 55% do superávit e 60% das vendas, Palmeiras com 10%. Aceita, ou quer outra regra (por exemplo teto de 70%)?
6. **Seletor de liga:** começar numa liga estrangeira pula a prévia do elenco (mostra só nome e força do clube). Quer que eu gere o elenco na prévia também?

## B. Base de dados

7. **Notas do FIFA (FC26) são +2,8 mais altas** que a planilha antiga. Deixo assim (ligas com FC26 ficam um pouco acima das sem) ou calibro para baixo para manter a escala antiga?
8. **Uso público do arquivo da EA:** se o jogo for sair para o público, melhor eu usar as notas só como referência de calibragem e não embutir. Quer que eu prepare essa versão?
9. **Clubes sem elenco real:** ~28 clubes pequenos (Egito, Marrocos, África do Sul, Peru, Bolívia etc.), a **Série D do Brasil (0 de 20 na Wikipedia)**, 11 clubes da Série C e 2 da Série B, e as divisões abaixo da 2ª na Europa seguem com nome inventado. A Série B (18 de 20) e a C (9 de 20) já têm elenco real. Aceita, ou quer que eu corra atrás de mais fontes?
10. **Capacidade real dos estádios:** hoje só o nome é real (mudar a capacidade altera receita). Quer a capacidade real também?

## C. Equilíbrio do mundo

11. **Dominância:** PSG 14 de 15 títulos, Salzburg 12, Celtic 10. Quer que eu comprima as forças dessas ligas como fiz com o Brasil?
12. **Japão e MLS são muito equilibradas** (forças entre 55–68 e 60–74). Quer um favorito mais claro?

## D. Pendências grandes (ordem sugerida)

13. Mundo com partidas reais em todas as ligas (grande).
14. Merge: a `main` ainda está na v100. Faço o merge/PR quando você mandar.
15. `endMatch` no `ext63` (hook morto do multiplayer): apago?

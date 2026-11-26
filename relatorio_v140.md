# Relatório da v140 — três pontos de vista

Base: mundo simulado de 15 temporadas (`tools/sim/world_sim.js`, Juventude), 45 temporadas de técnico em 15 carreiras (`exp_demissao.js`), 48 carreiras de torcida (`exp_torcida.js`) e auditoria de hooks (`exp_hooks.js`). Saídas em `tools/sim/out/v140_*`.

## 1. Visão do técnico (quem joga)

- **Demissão:** caiu de **42% para 34%** das temporadas (duas amostras: 13 de 45 e 18 de 45, juntas 31 de 90; meta 25–35%; meu bot não faz mercado nem tática, então no jogo real deve ser menor). Só acontece nas datas oficiais (rodadas 9, 19, 29, 37) e nunca na primeira metade da primeira temporada. Os mais demitidos são os clubes grandes cobrados por título (Palmeiras, Fluminense) e o Remo; o meio de tabela quase não cai.
- **A regra de estabilidade finalmente funciona.** Quem bate a meta ano após ano fica mais protegido; quem erra feio em sequência fica mais exposto. Antes ela não gravava nada (veja a visão 3).
- **Torcida:** vender o ídolo dói de verdade (Vitor Roque: −5 de humor, −2 de confiança); perder em casa pesa mais que fora; 3 resultados iguais seguidos viram sequência. A tela da Torcida mostra "por que o clima mudou".
- **Dívida:** a diretoria impõe um mínimo (Corinthians 55% do superávit e 60% das vendas; Palmeiras e Remo 10%). Você só pode aumentar.
- **Clube que supera a meta cresce:** a reputação e o patrocínio-base do seu clube sobem com a temporada (+0,12 de reputação e +1,2% de patrocínio por posição acima da meta; campeão +0,8). Antes só a IA fazia isso.
- **Liga:** na etapa "Liga e clube" dá pra escolher qualquer país; a carreira começa direto no clube de lá (testado: Arsenal, Girona, Gamba Osaka, Argentinos, San Diego).

## 2. Visão do jornalista (o que a temporada conta)

**Brasileirão em 15 temporadas:** Palmeiras 4 títulos, Fluminense 3, Flamengo 2, Atlético-MG 2, Grêmio 2, Vasco 1, Botafogo 1. Sete campeões diferentes, e 29 de 300 clubes-temporada (9,7%) terminaram 10 ou mais posições longe da força: dentro dos "10% fora da curva" que você disse ser normal. A força do elenco explica a tabela (correlação −0,59).

**Mundo (campeões em 15 temporadas):**
| Liga | Campeão mais frequente | Campeões diferentes |
|---|---|---|
| França | PSG 14 | 2 |
| Áustria | Salzburg 12 | 3 |
| Escócia | Celtic 10 | 2 |
| Alemanha | Bayern 9 | 5 |
| Turquia | Fenerbahçe 9 | 4 |
| Espanha | Real Madrid 5 | 3 |
| Inglaterra | Liverpool 4 | 5 |
| Itália | Napoli 3 | 9 |
| EUA (MLS) | Seattle 3 | 11 |
| Japão | Yokohama 5 | 8 |

- **Champions:** Liverpool, Chelsea e Atlético de Madrid 2 vezes cada; boa variedade.
- **Manchete ruim:** o PSG ganhar 14 de 15 é exagero (Ligue 1 real tem mais variação). Salzburg e Celtic também estão muito dominantes. O resto está plausível.
- **J‑League e MLS parecem aleatórias** (campeão com força média na 9,7ª e na 13,7ª posição). Investiguei: não é bug, é o desenho dos dados. As forças dos clubes japoneses ficam todas entre 55 e 68 (as da MLS entre 60 e 74), então a liga é naturalmente mais equilibrada, e a MLS ainda decide em playoff. Se quiser um Japão com dominante claro (tipo Kashima/Vissel), é só abrir a dispersão das notas em `ext37.js`.

## 3. Minha visão (o que eu acho)

**Bugs sérios que a bateria achou (eram invisíveis):**
1. `ext93` (estabilidade do técnico, v125–v127) lia `G.summary` depois de o `newSeason` zerá-lo. **Nunca gravou nada**; foi por isso que a demissão não baixou nas versões anteriores. Agora lê antes.
2. `ext85` (orçamento de salários pelo resultado, v111) tinha o mesmo defeito e nunca agiu. Agora é um fator moderado (×1,04 / 1,0 / 0,97) sobre o teto que o `ext77` já ajusta.
3. Dentro do `ext93`, a "segunda chance de demitir" valia em **qualquer rodada**. Ao ativar a estabilidade ela derrubou 58% das temporadas, com demissões na rodada 2. Restringi às datas oficiais.
4. Reputação e patrocínio do clube do técnico nunca acompanhavam o desempenho. Corrigi no `ext102`.

**Auditoria de hooks:** de 353 hooks, 216 disparam em 3 temporadas; os 137 restantes são de tela, eventos raros ou multiplayer. O único morto de verdade é `endMatch` no `ext63` (função que não existe; só afeta o multiplayer).

**Riscos que eu vejo:**
- As notas do FC26 são mais altas que as da planilha (+2,8 em média). As ligas com FC26 ficam um pouco acima das sem FC26; vale conferir a escala entre ligas jogando.
- O arquivo do FIFA é da EA. Para uso público, melhor tratar as notas como referência de calibragem.
- Meu teste de carreira não faz mercado nem renovação; a demissão em partida real depende de como você monta o time.
- ~28 clubes pequenos e as divisões abaixo da 2ª seguem com nome inventado.

**O que eu jogaria primeiro:** começar numa liga estrangeira pelo seletor, vender um ídolo e ver a torcida reagir, e conferir o painel de dívida com um clube muito endividado.

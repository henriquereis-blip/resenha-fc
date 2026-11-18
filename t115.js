const h=require('./h');
(async()=>{const {b,p,errs}=await h.open('Flamengo',{rounds:3});
const r=await p.evaluate(()=>{const o={};const c=userClub();
 o.reserve=cashReserve();G.fin.caixa=o.reserve+1;
 const t=searchPlayers({free:false,minOvr:70})[0];o.veto=makeBid(t.id,5);o.negveto=typeof negStart(t.id);
 G.fin.caixa=c.caixa+300;o.stillOk=makeBid(t.id,0.5)&&1;
 const w0=wageBudget();G._cx1=0;G._cx0=-300;// superávit simulado
 G.fin.caixa=1000;G._cx0=0;G._cx1=0;
 // fim de temporada com superavit: set cx0 baixo
 G._cx0=G.fin.caixa-200;
 let n=0;while(n++<60){startRound();while(!roundDone())stepAll();const x=finishRound();if(x==='seasonEnd'||x==='fired')break}
 try{endSeason()}catch(e){}newSeason();
 o.wb={antes:w0,depois:wageBudget(),msg:G.dirMsg};return o});
console.log(JSON.stringify(r),errs);await b.close()})();

const fs=require('fs');
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
eval(fs.readFileSync('data.js','utf8')+fs.readFileSync('logic.js','utf8')+`;
newWorld();
console.log('clubes',G.clubs.length,'jogadores',Object.keys(G.players).length);
console.log(G.clubs.slice(0,3).map(c=>c.sig+' '+c.squad.length+' '+strength(c).toFixed(1)).join(' | '));
const ps=Object.values(G.players).filter(p=>p.real).slice(0,3);console.log(ps.map(p=>nameOf(p)+' '+p.role+' '+p.ovr+' '+trAbb(p)+' '+JSON.stringify(p.fit)).join('\\n'));
startCareer(1,'T','Passe',asstCandidates()[0]);
let goals=0,games=0;
for(let s=0;s<2;s++){
 while(G.round<38){startRound();while(!roundDone())stepAll();R.ms.forEach(m=>{goals+=m.hg+m.ag;games++});const o=finishRound();if(o==='fired'){takeJob(fireOffers()[0]);}if(o==='seasonEnd'||G.round>=38)break;}
 endSeason();const rows=tableRows();console.log('S'+G.season,rows.slice(0,3).map(c=>c.sig+c.P).join(' '),'user',posOf(userClub()),'caixa',G.fin.caixa,'conf',G.board.conf);
 console.log('gols/jogo',(goals/games).toFixed(2));
 console.log('news',G.paper.slice(0,3).map(n=>n.paper+': '+n.h).join(' || '));
 console.log('leaders',leaders('goals',3).map(([p,v])=>nameOf(p)+' '+v).join(', '),'| rating',leaders('rating',2).map(([p,v])=>nameOf(p)+' '+v).join(', '));
 newSeason();G.phase='play';
}
G.press=null;
console.log('search',searchPlayers({role:'ATA',minOvr:75}).slice(0,3).map(p=>nameOf(p)+' '+p.ovr).join(', '));
const t=searchPlayers({minOvr:70})[0];console.log(makeBid(t.id,askPrice(t)*1.3));
`);

const fs=require('fs');
function sp(a,b){const n=a.length;const rk=x=>{const s=x.map((v,i)=>[v,i]).sort((p,q)=>p[0]-q[0]);const r=[];s.forEach(([v,i],k)=>r[i]=k+1);return r};const ra=rk(a),rb=rk(b);let d2=0;for(let i=0;i<n;i++)d2+=(ra[i]-rb[i])**2;return 1-6*d2/(n*(n*n-1))}
for(const f of process.argv.slice(2)){
 const L=JSON.parse(fs.readFileSync(f));console.log('\n##### '+f+' (técnico-robô '+L.seasons[0].userStart+') demissões:',L.fired);
 console.log('decisões pré-jogo',JSON.stringify(L.decisions.pre));console.log('decisões 45/70',JSON.stringify(L.decisions.mid));
 let tot={hw:0,dw:0,aw:0,goals:0,n:0,zz:0,big:0},champs={};const rows=[];let corr=[],champRank=[],yc=0,rc=0,pen=0;
 for(const s of L.seasons){
  const t=s.table,ch=t[0],ru=t[1],last=t[19];champs[ch[0]]=(champs[ch[0]]||0)+1;
  for(const k of ['hw','dw','aw','goals','n','zz','big'])tot[k]+=s.res[k];yc+=s.yc;rc+=s.rc;pen+=s.pen;
  const str=s.strengths;const rankStr=Object.fromEntries(str.slice().sort((a,b)=>b[1]-a[1]).map((x,i)=>[x[0],i+1]));
  const pos=Object.fromEntries(t.map((x,i)=>[x[0],i+1]));
  corr.push(sp(str.map(x=>-x[1]),str.map(x=>pos[x[0]])));champRank.push(rankStr[ch[0]]);
  rows.push(`T${rows.length+1} campeão ${ch[0]} ${ch[1]}pts (força #${rankStr[ch[0]]}) | vice ${ru[0]} ${ru[1]} | 4º ${t[3][1]} | 10º ${t[9][1]} | lanterna ${last[0]} ${last[1]} | gols/j ${(s.res.goals/s.res.n).toFixed(2)} | casa/emp/fora ${(s.res.hw/s.res.n*100).toFixed(0)}/${(s.res.dw/s.res.n*100).toFixed(0)}/${(s.res.aw/s.res.n*100).toFixed(0)}% | robô ${s.user[0]} ${s.user[1]}º ${s.user[2]}pts | ovr≥85:${s.ovr85} ovrMed ${s.ovrAvg} idade ${s.ageAvg} jog ${s.n} | caixa ${s.caixa} dívida ${s.debt}`);
 }
 console.log(rows.join('\n'));
 console.log('--- agregado ---');
 console.log('gols/jogo',(tot.goals/tot.n).toFixed(2),'| mandante/empate/visitante',(tot.hw/tot.n*100).toFixed(1),(tot.dw/tot.n*100).toFixed(1),(tot.aw/tot.n*100).toFixed(1),'| 0x0',(tot.zz/tot.n*100).toFixed(1)+'%','| 5+ gols',(tot.big/tot.n*100).toFixed(1)+'%');
 console.log('amarelos/jogo(user)',(yc/(L.seasons.length*38)).toFixed(2),'vermelhos/jogo(user)',(rc/(L.seasons.length*38)).toFixed(3),'pênaltis/jogo(user)',(pen/(L.seasons.length*38)).toFixed(3));
 console.log('títulos',JSON.stringify(champs),'| campeões distintos',Object.keys(champs).length);
 console.log('Spearman força pré-temporada x posição final (média)',(corr.reduce((a,b)=>a+b,0)/corr.length).toFixed(2),'por temp',corr.map(x=>x.toFixed(2)).join(' '));
 console.log('rank de força do campeão',champRank.join(','));
 const ps=L.seasons.map(s=>s.table[0][1]);console.log('pts campeão min/méd/max',Math.min(...ps),(ps.reduce((a,b)=>a+b,0)/ps.length).toFixed(1),Math.max(...ps));
 const sc=L.seasons.map(s=>s.top[0][1]);console.log('artilheiro gols por temp',sc.join(','));
}

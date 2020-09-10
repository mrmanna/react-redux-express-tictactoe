const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
const GAME_STATE = {
	WON:'won',
	DRAW:'draw',
	PLAYING:'running'
}
const USERS ={
	FIRST_USER:'first',
	SECOND_USER:'second',
	NONE:'none'
}
const Game = (id,gamestate,currentUser,winner)=>({id:id,gamestate:gamestate,currentUser:currentUser,winner:winner});
const GameCache =new Set();
const GameStore = {
	save:(game)=>GameCache.add(game),
	getGame:(id)=>Array.from(GameCache).find(g=>g.id===id),
	nextGame:()=>{ 
		const id = (GameCache.size>0)?parseInt(Array.from(GameCache).map(a=>a.id).reduce((a,b)=>Math.max(a, b)))+1:1;
		 const g = Game(id+'',GAME_STATE.PLAYING,USERS.FIRST_USER,USERS.NONE);
		 GameStore.save(g);
		return g;
	             }
 }

const Move = (gameId,index,user,selected) => ({gameId:gameId,index:index,user:user,selected:selected});
const MoveCache =[];
const MoveStore = {
	save:(move)=>MoveCache.push(move),
	gameMoves:(id)=>{return MoveCache.filter(m=>m.gameId===id);}
} 

app.get('/api/newOrlastgame', (req, res) => {
  const q = url.parse(req.url,true).query;
  console.log(q);
  const gamedata = (q.id==='0')
  				   ?GameStore.nextGame()
  				   :(GameStore.getGame(q.id)===undefined)
  				   		?GameStore.nextGame():GameStore.getGame(q.id);
  const game={game:gamedata,moves:MoveStore.gameMoves(gamedata.id)};
  console.log(game);
  res.send(game);
});

app.post('/api/move', (req, res) => {
  console.log(req.body); 
  const move =Move(req.body.gameId,req.body.index,req.body.user,req.body.selected);
  MoveStore.save(move);
  res.send(move);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
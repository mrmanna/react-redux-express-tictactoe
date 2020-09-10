import React from 'react';
import Box from '../components/Box'
import { USERS,GAME_STATE,API,API_START, API_END, ACCESS_DENIED, API_ERROR,LAST_OR_NEW_GAME_CALL,NEW_LAST_GAME }  from '../actions/constants'
import {fetchLastOrNewGame} from '../actions/actions'


const elems = [];
  for (var i = 1; i < 10; i++) {
			 elems[i] = (<Box key={i-1} selected={false} index={i} selectAction={()=>{}}/>);
			}
const initialState = {
	boxes: elems,
	currentUser:USERS.FIRST_USER,
	gamestate:GAME_STATE.PLAYING,
	winner:USERS.NONE,
	id:'0'
}
const newstate =(boxes,currentUser,gamestate,winner,id)=>({
	boxes: boxes,
	currentUser:currentUser,
	gamestate:gamestate,
	winner:winner,
	id:id
})
const moveprops = (index,selected,user,gameId)=>(
				{
				   index:index,
				   selected:selected,
			       user:user,
			       gameId:gameId
			      }
				)
export const boxReducer = (state=initialState, action) =>{
	
		switch (action.type){
			case NEW_LAST_GAME:
				const res = action.payload;
				localStorage.setItem("gameId",res.game.id);
				const boxes=(res.moves.length>0)
								?state.boxes.map(box=>{
									let dbbox=res.moves.find(r=>r.index===box.props.index)
									let dbIndex = (dbbox===undefined)?-1:dbbox.index;
		    						return (box.props.index===dbIndex)
		    						?{  ...box,
		    							props:moveprops(box.props.index,dbbox.selected,dbbox.user,res.game.id)
		    						 }
		    						 :box
		    						})
								:state.boxes;
				if(determineGameState(boxes)[0]!==GAME_STATE.PLAYING){
						localStorage.clear();
			    	    window.location.reload();
				}					
				return  newstate(boxes,res.game.currentUser,res.game.gamestate,res.game.winner,res.game.id);
				          
			case 'RESET_GAME':
			    localStorage.clear();
			    window.location.reload();
			    break;
			case 'SELECT':
			const latestBoxes = state.boxes.map(box=>
		    						(box.props.index===action.payload.index)
		    						?{  ...box,
		    							props:moveprops(box.props.index,true,state.currentUser,state.id)
		    						 }
		    						:{  ...box,
		    							props:moveprops(box.props.index,box.props.selected,box.props.user,state.id)
		    						 }
		    						);
			const results = determineGameState(latestBoxes);
			return  newstate(latestBoxes,(state.currentUser===USERS.FIRST_USER)?USERS.SECOND_USER:USERS.FIRST_USER,results[0],results[1],state.id);
	
			case API_START:
				      if (action.payload ===LAST_OR_NEW_GAME_CALL) {
				        return {
				          ...state,
				          isLoadingData: true
				        };
				      }
				      break;
			case API_END:
				      if (action.payload === LAST_OR_NEW_GAME_CALL) {
				        return {
				          ...state,
				          isLoadingData: false
				        };
				      }
				      break;  
			default:
	   		return state;
		}
	}
	/*
WINNER RULE
Horizontal: [1, 2, 3] [4, 5, 6] [7, 8, 9]

Vertical: [1, 4, 7] [2, 5, 8] [3, 6, 9]

Diagonal: [1, 5, 9] [3, 5, 7]*/
const winingrule = [
					  [1, 2, 3],
					  [4, 5, 6],
					  [7, 8, 9],
					  [1, 4, 7],
					  [2, 5, 8],
					  [3, 6, 9],
					  [1, 5, 9],
					  [3, 5, 7]
				   ];
function determineGameState(boxes){

		const allMarked = boxes.every(box=>box.props.selected===true)

		const firstuserboxes = 	boxes.filter(box=>box.props.user===USERS.FIRST_USER).map(box=>box.props.index);	
		const seconduserboxes = boxes.filter(box=>box.props.user===USERS.SECOND_USER).map(box=>box.props.index);	
        
        const firstuserIsWinner= winingrule.some(r=>
                               r.every(rr=>
                                         firstuserboxes.indexOf(rr)>=0));

        const seconduserIsWinner= winingrule.some(r=>
                               r.every(rr=>
                                         seconduserboxes.indexOf(rr)>=0));


        const won = firstuserIsWinner || seconduserIsWinner; 

        const draw = (won===false && allMarked ===true);

        const playing = (won ===false && draw === false);
        const gamestate = (playing)
				        		?GAME_STATE.PLAYING
				        		:(won)
				        				?GAME_STATE.WON
				        				:GAME_STATE.DRAW;
		const winner = (won)
							?((firstuserIsWinner)?USERS.FIRST_USER:USERS.SECOND_USER):USERS.NONE;	
								        				

        return [gamestate,winner];
}
     
export default boxReducer
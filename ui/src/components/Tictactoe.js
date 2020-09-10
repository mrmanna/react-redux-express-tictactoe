import React, { Component } from 'react';
import Session from './Session'
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import {fetchLastOrNewGame,startgame,userSelected,resetgame,saveMove,updateState} from '../actions/actions'
import ReactDOM from "react-dom";
import Box from './Box'
import {USERS, GAME_STATE} from '../actions/constants'
class Tictactoe extends Component{
 static propTypes = {
   loadGame:propTypes.func.isRequired,
  boxes: propTypes.arrayOf(propTypes.shape({
    index: propTypes.number.isRequired,
    selected:propTypes.bool.isRequired,
    isFrstUsr: propTypes.bool.isRequired
  }).isRequired).isRequired,
  selectBox: propTypes.func.isRequired,
  currentUser : propTypes.string.isRequired,
  gamestate : propTypes.string.isRequired,
  id:propTypes.string.isRequired
}
  componentDidMount(){
    let {loadGame,boxes} = this.props;
    loadGame();
  }

	render(){
		let {boxes,selectBox,currentUser,gamestate,winner,resetGame,id, updateGame} = this.props;
		const resetbutton = ()=>resetGame();
    return (<div className="tictactoe-board">
  				<Session user={currentUser} gamestate={gamestate} winner={winner} resetAction={resetbutton}/>
  				<div id="board" className="game-panel">
  							{boxes.map(box=>
  								{ 
  								   let {index,selected,user} = box.props;
  								 	 return <Box key={index-1} 
                                 gameId={id} 
                                 index={index} 
                                 selected={selected} 
                                 selectAction={moveAction(id,index,user,currentUser,gamestate,selectBox,selected)} 
                                 user={user}/>
  								 }    
  								)  								
  						    }
  				</div>
  			</div>);
  		}

}
 const moveAction = (id,index,user,currentUser,gamestate,selectBox,selected)=>
        {
                 const nullaction = ()=>{};
                 const validaction =()=>{selectBox(move(id,index,(user===undefined)?currentUser:user))};
                 return (selected)?nullaction:(gamestate===GAME_STATE.PLAYING)?validaction:nullaction;                
        }
const move = (id,index,user)=>({
    gameId:id,
    index:index,
    selected:true,
    user:user
})

const mapStateToProps = state => ( 
  {
  	boxes:state.boxReducer.boxes,
  	currentUser:state.boxReducer.currentUser,
  	gamestate:state.boxReducer.gamestate,
  	winner:state.boxReducer.winner,
  	isLoadingData:state.boxReducer.isLoadingData,
    id:state.boxReducer.id
  }
)


const mapDispatchToProps = dispatch=> ({
  loadGame: ()=> dispatch(fetchLastOrNewGame()),
  resetGame: ()=> dispatch(resetgame()),
  selectBox: box => dispatch(saveMove(box)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Tictactoe)
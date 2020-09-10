import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import propTypes from 'prop-types'
import {USERS, GAME_STATE} from '../actions/constants'

const frstUsrIcon = <FontAwesomeIcon icon={faCircle}/>;
const scndUsrIcon = <FontAwesomeIcon icon={faTimesCircle}/>;
const Session = ({user, gamestate, winner , resetAction}) =>
                  (<div className="user-panel">
                        <div>
                            <div className="label">First player</div>
                            <div>{frstUsrIcon}</div> 
                        </div>
                        <div>
                            <div className="label">| Second player</div> 
                            <div>{scndUsrIcon}</div> 
                        </div>
                        <div  className={(gamestate===GAME_STATE.PLAYING)?'':'hideSelection'}>
                            <div className='label now'>Move for:</div> 
                            <div> {(user===USERS.FIRST_USER)?frstUsrIcon:scndUsrIcon}</div> 
                        </div>
                        <div>
                            <div className="label now">Game is:</div> 
                            <div className="label"> {gamestate}</div> 
                        </div>
                        <div className={(gamestate!==GAME_STATE.PLAYING)?'':'hideSelection'}>
                            <div className="label now">{(gamestate===GAME_STATE.WON)?'by '+winner :'' } </div> 
                        </div>
                         <div className="button">
                            <button  onClick={resetAction}>reset</button> 
                        </div>
                    </div>)
  

Session.propTypes = {
user : propTypes.string.isRequired,
gamestate : propTypes.string.isRequired,
winner : propTypes.string.isRequired,
resetAction:propTypes.func.isRequired
}
  
export default Session;
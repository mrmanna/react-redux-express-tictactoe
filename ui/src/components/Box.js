
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle,faTimesCircle} from '@fortawesome/free-regular-svg-icons'
import propTypes from 'prop-types'
import {USERS} from '../actions/constants'

 export default class Box extends Component{
  static frstUsrIcon = <FontAwesomeIcon icon={faCircle}/>;
  static scndUsrIcon = <FontAwesomeIcon icon={faTimesCircle}/>;
  static propTypes = {
  	    index : propTypes.number.isRequired,
  	    selected:propTypes.bool.isRequired,
		selectAction : propTypes.func.isRequired,
		user : propTypes.string.isRequired,
    gameId:propTypes.string.isRequired
	}
  render(){
  let {index, selected,selectAction, user } = this.props;

          return (<div id={index} onClick={selectAction}>           
	           <span className={ (selected)?'':'hideSelection'}> 
	           	  {(user===USERS.FIRST_USER)?Box.frstUsrIcon:Box.scndUsrIcon}
	           </span> 
           </div>)
	
  }
}

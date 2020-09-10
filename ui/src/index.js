import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logo from './logo.svg';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.css';
import Tictactoe from './components/Tictactoe'
import {boxReducer} from './reducers/boxReducer'
import Box from './components/Box'
import apiMiddleware from "./middleware/api";

      const rootReducer = combineReducers({boxReducer});
      const store =  createStore(rootReducer,applyMiddleware(apiMiddleware));
 
      const App = ()=>(
                        <div className="App">
                              <div className="App-content">
                                  <Tictactoe></Tictactoe>
                             </div>
                       </div>
                      )


        ReactDOM.render(
            <Provider store={store}>
             <App/>
           </Provider>,
            document.getElementById('root')
        );



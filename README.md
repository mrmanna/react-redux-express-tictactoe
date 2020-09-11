
# tictactoe - react-redux , express
A simple tictactoe game using flex box with reactjs and redux state management and simple API by nodejs express

 - [ ]  **Prerequisite**
 - Docker 
 - Stop if anything is running on port 80
 
 - [ ] **Setup**

From command line:

    git clone https://github.com/mrmanna/react-redux-express-tictactoe.git
    cd react-redux-express-tictactoe
    docker-compose build
    docker-compose up   


> Browse http://localhost 
> Enjoy TicTacToe!


    TODO: Test cases
 
 - [ ] **Test Cases :: need to be tested**
 1. **Action creators** 
 *(expect correct action is returned or not):* 
  1.1. UserSelected 
  1.2. StartGame
  1.3  ResetGame
 2. **Async Action creators**, along with middleware and store
 *(expect fetching http request correctly):* 
  2.1. FetchNewOrLastGame
  2.2. SaveMove 
  3. **Reducers** 
 *( expect correct state returned according to action types)* 
  3.1. This game has only one Reducer named *BoxReducer* with three cases 
  4. **Components**
  *(expect callbacks works properly)*
   4.1 BoxComponent::onClick
   5. **Connect**
        *(expect state inject worked)*
       5.1. *Tictactoe* a container Component 
       
 - [ ] **Notes**

This is a learning project to understand state management with Redux. State management in a large web applications is really a very complex issue, Redux makes it easy by Providing 
1. State Store
2. Global Action Dispatching control
3. Application objects and components property mapping with its state through Reducing functions
4. And Middleware for wrapping async calls

In this application you can find the whole game state is managed from a top container component Tictactoe and decides what actions should go to what component. e.g. the main **action** of this game is **selectingbox** (either O or X by a user) and if once the box is selected other can not undo it. On selection we have to check is it a winning move or not.  So on this action what are the states that changes:

 -  GAME_STATE => RUNNING| DRAW | WON
 -  CURRENT_USER_STATE  =>  FIRST USER (O) | SECOND USER (X)
 -  WINNER_STATE => FIRST USER (O) | SECOND USER (X) | NONE
 
**So what properties can define these states:**

 - BOX => {BOX NO, IS_SELECTED, WHO_SELECTED}
 - SESSION => {CURRENT_USER, GAME_ID, GAME_CURRENT_STATE}
That's all !

Oh! There is always a big challenge for any application that is called - **INITIALIZATION** - means booting/bootstrapping  and we can consider it as another big **action** called **LOAD_GAME** In this application I have used a backend memory based API through express server so if you refresh the browser or get back any time later to play the game you can find it exactly where you left it. And you can play multiple games from multiple browsers.

 - [ ] **Technology Stack:**
 
*#ReactJS
#Redux
#Nodejs Server (Express)
#Docker
#Nginx*

You can also get from here single composition of multiple dockers.

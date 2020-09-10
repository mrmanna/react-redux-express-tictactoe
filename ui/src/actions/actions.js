import { API,API_START, API_END, ACCESS_DENIED, API_ERROR,LAST_OR_NEW_GAME_CALL,NEW_LAST_GAME }  from './constants'

export function fetchLastOrNewGame() {
  let id = localStorage.getItem("gameId");
  id = (null===id)?0:id;
  return apiAction({
    url: "http://localhost/api/newOrLastgame?id="+id,
    onSuccess: startgame,
    onFailure: () => console.log("Error occured loading game"),
    label: LAST_OR_NEW_GAME_CALL
  });
}
export function saveMove(data) {
  return apiAction({
    url: "/api/move",
    method: "POST",
    data :data,
    onSuccess: userSelected,
    onFailure: () => console.log("Error occured loading game"),
    label: LAST_OR_NEW_GAME_CALL
  });
}

              
function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}

export const userSelected = index => ({
			type:'SELECT',
			payload:index
              })

export const startgame = data => ({
			type:NEW_LAST_GAME,
			payload: data
              })

export const resetgame = () => ({
			type:'RESET_GAME'
              })



export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: API_ERROR,
  error
});
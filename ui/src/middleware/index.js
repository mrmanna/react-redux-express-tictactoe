import { SET_ARTICLE_DETAILS, API, LOAD_NEW_GAME} from "../actions/constants";

export function getNewGame() {
  return apiAction({
    url: "http://localhost:500/api/newOrlastgame",
    onSuccess: setNewGame,
    onFailure: () => console.log("Error occured loading articles"),
    label: LOAD_NEW_GAME
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
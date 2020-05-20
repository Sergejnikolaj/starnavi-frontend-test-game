export const setInitFields = (data) => {
  return {
    type: "SET_INIT_FIELDS",
    payload: data,
  };
};

export const setGameFields = (data) => {
  return {
    type: "SET_GAME_FIELDS",
    payload: data,
  };
};

export const setGamesState = (val) => {
  return {
    type: "SET_GAMES_STATE",
    payload: val,
  };
};

export const changeFieldsArray = (data) => {
  return {
    type: "CHANGE_FIELDS_ARRAY",
    payload: data,
  };
};

export const getRandomElFromArr = (arr) => {
  return {
    type: "GET_RANDOM_ELEMENT_FROM_ARRAY",
    payload: arr,
  };
};

export const increaseScore = (gamer) => {
  return {
    type: "INCREASE_SCORE",
    payload: gamer,
  };
};

export const setLeaderBoard = (list) => {
  return {
    type: "SET_LEADER_BOARD",
    payload: list,
  };
};

export const setGamersName = (name) => {
  return {
    type: "SET_GAMERS_NAME",
    payload: name,
  };
};

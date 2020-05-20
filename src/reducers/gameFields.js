import _ from "lodash";

export const initialState = {
  initFieldsLength: [],
  freeFields: [],
  usedFields: [],
  leaderBoard: [],
  activeBlock: null,
  gamersName: "",
  userScore: 0,
  compScore: 0,
  gameOver: true,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case "SET_GAMES_STATE":
      return { ...state, gameOver: action.payload };
    case "GET_RANDOM_ELEMENT_FROM_ARRAY":
      let arrForRand = state.freeFields.slice();
      const rand = Math.floor(Math.random() * arrForRand.length);
      const usedArr = state.usedFields.slice();
      usedArr.push(arrForRand[rand]);
      return { ...state, activeBlock: arrForRand[rand], usedFields: usedArr };
    case "SET_INIT_FIELDS":
      return {
        ...state,
        freeFields: action.payload,
        initFieldsLength: action.payload.length,
      };
    case "SET_GAME_FIELDS":
      return { ...state, freeFields: action.payload };
    case "SET_GAMERS_NAME":
      return { ...state, gamersName: action.payload };
    case "CHANGE_FIELDS_ARRAY":
      let arr = state.freeFields.slice();
      _.remove(arr, function (el) {
        return el === action.payload;
      });
      return { ...state, freeFields: arr };
    case "SET_LEADER_BOARD":
      return { ...state, leaderBoard: action.payload };
    case "INCREASE_SCORE":
      if (action.payload === "user") {
        return { ...state, userScore: state.userScore + 1 };
      } else if (action.payload === "comp") {
        return { ...state, compScore: state.compScore + 1 };
      }
    default:
      return state;
  }
}

import _ from "lodash";

export const initialState = {
  freeFields: [],
  usedFields: [],
  activeBlock: null,
  userScore: 0,
  compScore: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
	case "GET_RANDOM_ELEMENT_FROM_ARRAY":
	
	let arrForRand = state.freeFields.slice();
  const rand = Math.floor(Math.random() * arrForRand.length);
  const usedArr = state.usedFields.slice();
  console.log('MMM REDUX REDUCER arrForRand[rand] ',arrForRand[rand]);
  usedArr.push(arrForRand[rand]);
      return {...state, activeBlock: arrForRand[rand], usedFields: usedArr };
    case "SET_GAME_FIELDS":
      return { ...state, freeFields: action.payload };
	case "CHANGE_FIELDS_ARRAY":
	  let arr = state.freeFields.slice();
	  console.log('@@@ REDUX reducer state ',state);
	  _.remove(arr, function (el) {
        return el === action.payload;
      });
	  return { ...state, freeFields: arr };
	  case "INCREASE_SCORE":
	  if(action.payload === 'user') {
		  return { ...state, userScore: state.userScore + 1 };
	  } else if (action.payload === 'comp') {
	   return { ...state, compScore: state.compScore + 1 };
	  }
    default:
      return state;
  }
}

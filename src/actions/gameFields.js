export const setGameFields = (data) => {
  return {
    type: "SET_GAME_FIELDS",
    payload: data,
  };
};

export const changeFieldsArray = (data) => {
  //console.log('XXX REDUX actCre data ', data);
  return {
    type: "CHANGE_FIELDS_ARRAY",
    payload: data,
  };
};

export const getRandomElFromArr = (arr) => {
  //alert('Action');
  console.log('XXX REDUX actCre ARR ', arr);
  return {
    //type: "GET",
    type: "GET_RANDOM_ELEMENT_FROM_ARRAY",
    payload: arr,
  };
};

export const increaseScore = (gamer) => {
  //console.log('XXX REDUX actCre ARR ', arr);
  return {
    type: "INCREASE_SCORE",
    payload: gamer,
  };
};

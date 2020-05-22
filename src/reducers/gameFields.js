export const initialState = {
  initFieldsLength: 0,
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
  const gameScore = state.initFieldsLength / 2;
  const scoreToWin = Math.ceil(gameScore);
  const userScore = state.userScore;
  const compScore = state.compScore;
  const nextLeaderBoard = state.leaderBoard.slice();
  const gameOver = state.gameOver;
  const arrForRand = state.freeFields.slice();
  const nextFreeFields = state.freeFields.slice();
  const usedArr = state.usedFields.slice();
  let arr = [];

  switch (action.type) {
    case "SET_GAMES_STATE":
      return { ...state, gameOver: action.payload };
    case "GET_RANDOM_ELEMENT_FROM_ARRAY":
      if (gameOver === false) {
        const rand = Math.floor(Math.random() * arrForRand.length);
        usedArr.push(arrForRand[rand]);
        nextFreeFields.splice(rand, 1);

        if (userScore === scoreToWin || compScore === scoreToWin) {
          const id = Math.random();
          const winner =
            state.userScore === scoreToWin ? state.gamersName : "Computer";
          const dateObj = new Date();
          const hours =
            dateObj.getHours() < 10
              ? `0${dateObj.getHours()}`
              : dateObj.getHours();
          const minutes =
            dateObj.getMinutes() < 10
              ? `0${dateObj.getMinutes()}`
              : dateObj.getMinutes();
          const day = dateObj.getDate();
          const year = dateObj.getFullYear();
          const output = ` ${hours}:${minutes}; ${day} May ${year}`;
          const result = { id: id, winner: winner, date: output };
          const url =
            "https://starnavi-frontend-test-task.herokuapp.com/winners";

          nextLeaderBoard.push(result);

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(result),
          };
          fetch(url, requestOptions)
            .then(async (response) => {
              const data = await response.json();
              if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
              }
            })
            .catch((error) => {
              console.error("There was an error POST request!", error);
            });

          return {
            ...state,
            leaderBoard: nextLeaderBoard,
            gameOver: true,
            freeFields: arr,
          };
        }

        return {
          ...state,
          activeBlock: arrForRand[rand],
          freeFields: nextFreeFields,
          usedFields: usedArr,
          compScore: state.compScore + 1,
        };
      }
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

    case "SET_LEADER_BOARD":
      return { ...state, leaderBoard: action.payload };
    case "INCREASE_SCORE":
      if (action.payload === "user") {
        return {
          ...state,
          userScore: state.userScore + 1,
          compScore: state.compScore - 1,
        };
      } else if (action.payload === "comp") {
      }
    default:
      return state;
  }
}

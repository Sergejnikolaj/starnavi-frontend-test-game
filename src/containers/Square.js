import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFieldsArray,
  increaseScore,
  setGamesState,
  setGameFields,
  setLeaderBoard,
} from "../actions/gameFields";
import "../index.css";

export const Square = (props) => {
  const [flag, setFlag] = useState(null);
  const [inGame, toggleInGame] = useState(true);
  const randInd = useSelector((state) => state.freeFields.activeBlock);
  const gameOver = useSelector((state) => state.freeFields.gameOver);
  const userScore = useSelector((state) => state.freeFields.userScore);
  const compScore = useSelector((state) => state.freeFields.compScore);
  const initLength = useSelector((state) => state.freeFields.initFieldsLength);
  const leaderBoard = useSelector((state) => state.freeFields.leaderBoard);
  const gamersName = useSelector((state) => state.freeFields.gamersName);
  const dispatch = useDispatch();

  const { data } = props;

  const handleClick = () => {
    const gameScore = initLength / 2;
    const scoreToWin = Math.floor(gameScore);

    if (gameOver === false && data === randInd && inGame) {
      setFlag(true);

      dispatch(increaseScore("user"));
    } else if (gameOver === false && data !== randInd && inGame) {
      setFlag(false);

      dispatch(increaseScore("comp"));
    }
    gameOver === false && toggleInGame(false);
    gameOver === false && dispatch(changeFieldsArray(data));

    if (userScore === scoreToWin || compScore === scoreToWin) {
      let arr = [];
      const nextLeaderBoard = [...leaderBoard];
      const id = Math.random();
      const winner = userScore === scoreToWin ? gamersName : "Computer";
      const dateObj = new Date();
      const hours =
        dateObj.getHours() < 10 ? `0${dateObj.getHours()}` : dateObj.getHours();
      const minutes =
        dateObj.getMinutes() < 10
          ? `0${dateObj.getMinutes()}`
          : dateObj.getMinutes();
      const day = dateObj.getDate();
      const year = dateObj.getFullYear();
      const output = ` ${hours}:${minutes}; ${day} May ${year}`;
      const result = { id: id, winner: winner, date: output };
      const url = "https://starnavi-frontend-test-task.herokuapp.com/winners";

      nextLeaderBoard.push(result);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      };
      fetch(url, requestOptions)
        .then(async (response) => {
          const data = await response.json();
          dispatch(setLeaderBoard(nextLeaderBoard));
          if (!response.ok) {
            const error = (data && data.message) || response.status;
            return Promise.reject(error);
          }
        })
        .catch((error) => {
          console.error("There was an error POST request!", error);
        });

      dispatch(setGameFields(arr));
      dispatch(setGamesState(true));
    }
  };
  return (
    <button
      className={`square ${
        data === randInd
          ? "blue"
          : flag === true
          ? "green"
          : flag === false
          ? "red"
          : ""
      }`}
      onClick={() => handleClick()}
    >
      {data}
    </button>
  );
};

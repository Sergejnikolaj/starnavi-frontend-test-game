import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFieldsArray,
  increaseScore,
  setGamesState,
  setGameFields,
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
  const dispatch = useDispatch();

  const handleClick = () => {
    if (gameOver === false && props.data === randInd && inGame) {
      setFlag(true);

      dispatch(increaseScore("user"));
    } else if (gameOver === false && props.data !== randInd && inGame) {
      setFlag(false);

      dispatch(increaseScore("comp"));
    }
    gameOver === false && toggleInGame(false);

    gameOver === false && dispatch(changeFieldsArray(props.data));
    const gameScore = initLength / 2;
    const scoreToWin = Math.floor(gameScore);
    if (userScore === scoreToWin || compScore === scoreToWin) {
      let arr = [];
      dispatch(setGameFields(arr));
      dispatch(setGamesState(true));
    }
  };
  return (
    <button
      className={`square ${
        props.data === randInd
          ? "blue"
          : flag === true
          ? "green"
          : flag === false
          ? "red"
          : ""
      }`}
      onClick={() => handleClick()}
    >
      {props.data}
    </button>
  );
};

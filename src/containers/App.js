import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Board } from "./Board";
import {
  changeFieldsArray,
  setGameFields,
  getRandomElFromArr,
  increaseScore,
} from "../actions/gameFields";
import "../index.css";
console.log("SSS changeFieldsArray ", changeFieldsArray);


export default function App() {
  const userScore = useSelector((state) => state.freeFields.userScore);
  const compScore = useSelector((state) => state.freeFields.compScore);
  const freeFields = useSelector((state) => state.freeFields.freeFields);

  console.log("APP freeF / 2 + 1 ", freeFields.length / 2);
  const gameScore = freeFields.length / 2;

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>
          <li>user score: {userScore}</li>
          <li>comp score: {compScore}</li>
          <li>
            GAME RESULT:{" "}
            {userScore > gameScore
              ? "YOU WON"
              : compScore > gameScore
              ? "COMP WON"
              : "game is going..."}
          </li>
        </ol>
      </div>
    </div>
  );
}

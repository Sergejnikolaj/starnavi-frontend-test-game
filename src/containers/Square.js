import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseScore } from "../actions/gameFields";
import "../index.css";

export const Square = (props) => {
  const [flag, setFlag] = useState(false);
  const randInd = useSelector((state) => state.freeFields.activeBlock);
  const gameOver = useSelector((state) => state.freeFields.gameOver);
  const usedFields = useSelector((state) => state.freeFields.usedFields);
  const initFieldsLength = useSelector(
    (state) => state.freeFields.initFieldsLength
  );
  const dispatch = useDispatch();

  const { data } = props;
  const isUsed = usedFields.includes(data);

  const handleClick = () => {
    if (gameOver === false && data === randInd && flag === false) {
      setFlag(true);
      dispatch(increaseScore("user"));
    }
  };
  const bigScreen = initFieldsLength > 100;

  return (
    <button
      className={`square ${bigScreen === true && "hard-board-squre"} ${
        data === randInd && flag === false
          ? "free-point"
          : isUsed === true && flag === false
          ? "comp-point"
          : flag === true
          ? "user-point"
          : ""
      }`}
      onClick={() => handleClick()}
    >
      {""}
    </button>
  );
};

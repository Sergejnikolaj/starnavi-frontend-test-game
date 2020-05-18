import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFieldsArray,
  setGameFields,
  getRandomElFromArr,
  increaseScore,
} from "../actions/gameFields";
import "../index.css";
console.log("SSS changeFieldsArray ", changeFieldsArray);

export const Square = (props) => {
  const [flag, setFlag] = useState(null);
  const [inGame, toggleInGame] = useState(true);
  const [clicked, toggleClicked] = useState(false);
  const randInd = useSelector((state) => state.freeFields.activeBlock);
  const usedFields = useSelector((state) => state.freeFields.usedFields);
  const dispatch = useDispatch();

  const handleClick = () => {
    
    if (props.runGame && props.data === randInd && inGame) {
      setFlag(true);

      dispatch(increaseScore("user"));
    } else if (props.runGame && props.data !== randInd && inGame) {
      setFlag(false);

      dispatch(increaseScore("comp"));
    }
	toggleClicked(true);
    props.runGame && toggleInGame(false);

    props.runGame && dispatch(changeFieldsArray(props.data));
  };
  console.log('XXX props.data ',props.data);
  console.log('XXX randInd ',randInd);
  console.log('XXX clicked ',clicked);
  console.log('XXX usedFields includes ',usedFields.includes(randInd));
  //usedFields.includes(randInd) === true && alert(randInd);
  return (
    <button
      className={`square ${
        props.data === randInd
		  ? "blue"
		  //: usedFields.includes(randInd) === true && clicked === false
		  //? "red"
		  //: usedFields.includes(randInd) === false
		  //? "green"
		  //: ""
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

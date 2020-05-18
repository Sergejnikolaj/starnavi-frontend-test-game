import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Square } from "./Square";
import {
  changeFieldsArray,
  setGameFields,
  getRandomElFromArr,
  increaseScore,
} from "../actions/gameFields";
import "../index.css";
console.log("SSS changeFieldsArray ", changeFieldsArray);

export const Board = (props) => {
  const [arrFields, setFields] = useState(null);
  const [settings, setSettings] = useState(null);
  const [selectValue, setSelectValue] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [randEl, getRandEl] = useState(null);
  const [isRun, setRunGame] = useState(false);
  const [activeSq, toggleSquare] = useState(true);
  const store = useSelector((state) => state);
  const freeFields = useSelector((state) => state.freeFields.freeFields);
  
  const dispatch = useDispatch();

  useEffect(() => {
    const url =
      "https://starnavi-frontend-test-task.herokuapp.com/game-settings";
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        const blockQty = result.easyMode.field * result.easyMode.field;
        let arr = [];
        arr.length = blockQty;
        for (let i = 0; i < arr.length; i++) {
          arr[i] = i;
        }
        dispatch(setGameFields(arr));
        setFields(arr);
        setSettings(result);
      })

      .catch((e) => console.log(e));
  }, []);

  //const runGame = (callback) => {
	const runGame = () => {
    console.log("%%% runGame freeFields ", freeFields);
    setRunGame(true);

    const timerID = setInterval(
      () => dispatch(getRandomElFromArr(freeFields)),
      1000
    );
    return function cleanup() {
	  clearInterval(timerID);
	  //callback();
    };
  };

  const onChangeSelect = (e) => {
    setSelectValue(e.target.value);
    setGameMode(e.target.value);
    const blocksQty =
      e.target.value === "easyMode"
        ? 25
        : e.target.value === "normalMode"
        ? 100
        : 225;

    let arr = [];
    arr.length = blocksQty;
    for (let i = 0; i < arr.length; i++) {
      arr[i] = i;
    }
    setFields(arr);
  };

  console.log("FFF BOARD store =  ", store);
  console.log("FFF BOARD activeSq =  ", activeSq);
  return (
    <div>
      <div className="status">ZZZ</div>
      {arrFields !== null && <button onClick={() => runGame()}>Play</button>}
      <div
        className={`"board-row" ${
          gameMode === "normalMode"
            ? "normal-board"
            : gameMode === "hardMode"
            ? "hard-board"
            : "easy-board"
        }`}
      >
        {arrFields !== null &&
          arrFields.map(function (el, ind) {
            return (
              <Square data={el} key={ind} randInd={randEl} runGame={isRun} activeSq={activeSq} />
            );
          })}
        {
          <select
            value={selectValue}
            onChange={onChangeSelect}
            className="form-control"
          >
            <option value="First">Pick Game mode</option>
            <option value={settings && Object.keys(settings)[0]}>Easy</option>
            <option value={settings && Object.keys(settings)[1]}>medium</option>
            <option value={settings && Object.keys(settings)[2]}>Hard</option>
          </select>
        }
      </div>
    </div>
  );
};

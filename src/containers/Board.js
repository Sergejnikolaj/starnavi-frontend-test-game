import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Square } from "./Square";
import { Alert } from "../components/Alert";
import {
  setInitFields,
  getRandomElFromArr,
  setGamersName,
  setGamesState,
} from "../actions/gameFields";
import "../index.css";

export const Board = () => {
  const [arrFields, setFields] = useState(null);
  const [settings, setSettings] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [selectVal, setSelectVal] = useState("");
  const freeFields = useSelector((state) => state.freeFields.freeFields);
  const gamersName = useSelector((state) => state.freeFields.gamersName);
  const gameOver = useSelector((state) => state.freeFields.gameOver);
  const compScore = useSelector((state) => state.freeFields.compScore);
  const userScore = useSelector((state) => state.freeFields.userScore);
  const hasScores = userScore > 0 || compScore > 0;

  const dispatch = useDispatch();

  useEffect(() => {
    const url =
      "https://starnavi-frontend-test-task.herokuapp.com/game-settings";

    fetch(url)
      .then(async (response) => {
        const data = await response.json();
        setSettings(data);
        if (!response.ok) {
          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("There was an error GET request !", error);
      });
  }, []);

  const runGame = () => {
    dispatch(setGamesState(false));
    const delay =
      gameMode === "easyMode" ? 2000 : gameMode === "normalMode" ? 1000 : 900;
    const timerID = setInterval(
      () => dispatch(getRandomElFromArr(freeFields)),
      delay
      //1000
    );
    return timerID;
    // return function cleanup() {
    // clearInterval(timerID);
    // // //callback();
    // };
  };

  const onChangeInput = (e) => {
    dispatch(setGamersName(e.target.value));
  };

  const onChangeSelect = (e) => {
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
    setSelectVal(e.target.value);
    dispatch(setInitFields(arr));
  };
  return (
    <div className="header-wrapper">
      <div className="header">
        {gameOver === true && hasScores === false && (
          <FormControl className="game-mode">
            <InputLabel className="select-game">
              {selectVal === "" && "PICK GAME MODE"}
            </InputLabel>
            <Select value={selectVal} onChange={onChangeSelect}>
              {settings &&
                Object.keys(settings).map((el, ind) => {
                  return (
                    <MenuItem key={ind} value={el}>
                      {el}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        )}
        {gameOver === true && arrFields !== null && hasScores === false && (
          <div style={{ padding: "0px 30px" }}>
            <TextField onChange={onChangeInput} label="Enter your name" />
          </div>
        )}
        {gameOver === true && gamersName.length > 1 && hasScores === false && (
          <Button variant="contained" color="primary" onClick={() => runGame()}>
            Play
          </Button>
        )}
        {gameOver === true && hasScores === true && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => document.location.reload(true)}
          >
            Play Again
          </Button>
        )}
      </div>
      <div>
        {gameOver === true && userScore > 0 ? (
          <Alert data={gamersName} />
        ) : gameOver === true && compScore > 0 ? (
          <Alert data={"Computer"} />
        ) : null}
      </div>
      <div className="board-wrapper">
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
              return <Square data={el} key={ind} />;
            })}
        </div>
      </div>
    </div>
  );
};
